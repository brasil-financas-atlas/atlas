/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Supabase Client & Backend Integration
   Fallback gracioso para LocalStorage caso o Supabase não esteja configurado.
   ========================================================================== */

let SUPABASE_URL = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || window?.VITE_SUPABASE_URL || localStorage.getItem('BFA_VITE_SUPABASE_URL') || '';
let SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || window?.VITE_SUPABASE_ANON_KEY || localStorage.getItem('BFA_VITE_SUPABASE_ANON_KEY') || '';

let supabaseClient = null;

function initSupabase(url, key) {
  if (typeof window !== 'undefined' && window.supabase && url && key) {
    try {
      const cleanUrl = url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
      supabaseClient = window.supabase.createClient(cleanUrl, key);
      console.log('[BFA Supabase] Backend Supabase conectado com sucesso!');
      return true;
    } catch (err) {
      console.warn('[BFA Supabase] Erro ao inicializar cliente Supabase:', err);
    }
  }
  return false;
}

if (!initSupabase(SUPABASE_URL, SUPABASE_ANON_KEY)) {
  console.log('[BFA Supabase] Supabase não configurado ou CDN indisponível. Utilizando armazenamento local (LocalStorage).');
}

/**
 * Define novas credenciais e salva no localStorage para persistência.
 */
function setCredentials(url, key) {
  if (url && key) {
    localStorage.setItem('BFA_VITE_SUPABASE_URL', url);
    localStorage.setItem('BFA_VITE_SUPABASE_ANON_KEY', key);
    window.VITE_SUPABASE_URL = url;
    window.VITE_SUPABASE_ANON_KEY = key;
    return initSupabase(url, key);
  }
  return false;
}

/**
 * Retorna true se o Supabase estiver configurado e ativo.
 */
function isSupabaseConfigured() {
  return !!supabaseClient;
}

/**
 * Registra ou atualiza o progresso de uma aula para o usuário logado.
 */
async function syncLessonProgress(userId, lessonId, completed, timeSpent = 0) {
  if (!supabaseClient || !userId) return false;
  try {
    const { error } = await supabaseClient
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed: completed,
        completed_at: completed ? new Date().toISOString() : null,
        time_spent_seconds: timeSpent,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('[BFA Supabase Sync Error]:', err);
    return false;
  }
}

/**
 * Registra o resultado de uma tentativa de quiz.
 */
async function saveQuizAttempt(userId, lessonId, score, maxScore, answers = {}) {
  if (!supabaseClient || !userId) return false;
  try {
    const { error } = await supabaseClient
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        score: score,
        max_score: maxScore,
        answers_json: answers,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('[BFA Supabase Quiz Error]:', err);
    return false;
  }
}

/**
 * Busca todo o progresso do usuário no banco Supabase.
 */
async function fetchUserProgress(userId) {
  if (!supabaseClient || !userId) return null;
  try {
    const { data, error } = await supabaseClient
      .from('lesson_progress')
      .select('lesson_id, completed, completed_at')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('[BFA Supabase Fetch Error]:', err);
    return null;
  }
}

/**
 * Autentica o colaborador ou Admin Chief no Supabase Auth.
 */
async function signInUser(email, password) {
  if (!supabaseClient) return { success: false, error: 'Supabase não conectado' };
  try {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email: cleanEmail, password });
    if (error) throw error;

    // Busca perfil com role
    let userRole = data.user.user_metadata?.role || data.user.app_metadata?.role || 'student';
    let fullName = data.user.user_metadata?.full_name || data.user.email;

    try {
      let { data: profile } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (!profile) {
        const { data: profileByEmail } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('email', cleanEmail)
          .maybeSingle();
        if (profileByEmail) profile = profileByEmail;
      }

      if (profile && profile.role) {
        userRole = String(profile.role).trim().toLowerCase();
        fullName = profile.full_name || fullName;
      }
    } catch (pErr) {
      console.warn('[BFA Supabase] Falha ao consultar tabela profiles:', pErr);
    }

    userRole = String(userRole).trim().toLowerCase().replace(/[\s-]+/g, '_');
    console.log(`[BFA Supabase Auth] Login com sucesso: ${cleanEmail} | Papel: ${userRole}`);

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: fullName,
        role: userRole
      }
    };
  } catch (err) {
    console.error('[BFA Supabase Auth Error]:', err);
    return { success: false, error: err.message || 'Erro na autenticação' };
  }
}

/**
 * Encerra a sessão. Sem isto o "sair" só limpava a tela, e o token de acesso
 * continuava válido no navegador.
 */
async function signOutUser() {
  if (!supabaseClient) return false;
  try {
    await supabaseClient.auth.signOut();
    return true;
  } catch (err) {
    console.error('[BFA Supabase] Erro ao encerrar sessão:', err);
    return false;
  }
}

/**
 * Recupera a sessão já existente no navegador, se houver.
 *
 * É o que faz o login sobreviver a um F5 sem que o app guarde usuário por
 * conta própria: quem mantém a sessão é o Supabase, e o papel vem do banco a
 * cada carregamento — não de algo salvo no navegador, que o usuário poderia
 * editar à mão para se declarar admin.
 */
async function restoreSession() {
  if (!supabaseClient) return null;
  try {
    const { data } = await supabaseClient.auth.getSession();
    const user = data?.session?.user;
    if (!user) return null;

    let userRole = user.user_metadata?.role || user.app_metadata?.role || 'student';
    let fullName = user.user_metadata?.full_name || user.email;

    try {
      let { data: profile } = await supabaseClient
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile) {
        const { data: profileByEmail } = await supabaseClient
          .from('profiles')
          .select('full_name, role')
          .eq('email', user.email)
          .maybeSingle();
        if (profileByEmail) profile = profileByEmail;
      }

      if (profile && profile.role) {
        userRole = String(profile.role).trim().toLowerCase();
        fullName = profile.full_name || fullName;
      }
    } catch (pErr) {
      console.warn('[BFA Supabase] Falha ao ler perfil na restauração da sessão:', pErr);
    }

    userRole = String(userRole).trim().toLowerCase().replace(/[\s-]+/g, '_');
    console.log(`[BFA Supabase Auth] Sessão ativa restaurada: ${user.email} | Papel: ${userRole}`);

    return {
      id: user.id,
      email: user.email,
      name: fullName,
      role: userRole
    };
  } catch (err) {
    console.warn('[BFA Supabase] Não foi possível recuperar a sessão:', err);
    return null;
  }
}

/* --------------------------------------------------------------------------
   CONTEÚDO DO SITE — substitui o overrides.json e o token do GitHub

   Leitura é pública (qualquer visitante precisa ver o conteúdo editado).
   Escrita é barrada no banco pela política "Somente admin altera conteúdo".
   Ou seja: a permissão de publicar não depende de nada que o navegador
   carregue — depende do papel gravado no banco.
   -------------------------------------------------------------------------- */

async function fetchSiteContent() {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient
      .from('site_content')
      .select('data, updated_at')
      .eq('id', 1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    // O updated_at do banco vira o lastUpdated que o app usa para decidir
    // quem está mais atual: o publicado ou o rascunho deste navegador.
    return { ...(data.data || {}), lastUpdated: data.updated_at || null };
  } catch (err) {
    console.warn('[BFA Supabase] Não foi possível ler o conteúdo do site:', err);
    return null;
  }
}

async function saveSiteContent(conteudo) {
  if (!supabaseClient) return { success: false, error: 'Supabase não conectado' };
  try {
    const user = (await supabaseClient.auth.getUser())?.data?.user;
    if (!user) return { success: false, error: 'Faça login para publicar' };

    const { error } = await supabaseClient
      .from('site_content')
      .update({ data: conteudo, updated_by: user.id, updated_at: new Date().toISOString() })
      .eq('id', 1);

    // Erro 42501 é a política do banco recusando: quem tentou não é admin.
    if (error) {
      const semPermissao = error.code === '42501' || /policy|permission/i.test(error.message || '');
      return {
        success: false,
        error: semPermissao
          ? 'Sua conta não tem permissão de administrador para publicar.'
          : (error.message || 'Erro ao publicar')
      };
    }
    return { success: true };
  } catch (err) {
    console.error('[BFA Supabase] Erro ao gravar conteúdo:', err);
    return { success: false, error: err.message || 'Erro ao publicar' };
  }
}

/**
 * Envia uma edição realizada por colaborador para a fila de aprovação.
 */
async function submitPendingEdit(resourceType, resourceId, changesJson, authorName = 'Colaborador') {
  if (!supabaseClient) return false;
  try {
    const user = (await supabaseClient.auth.getUser())?.data?.user;
    // Sem usuário a política do banco recusa (ela exige author_id = auth.uid()),
    // então é melhor parar aqui do que gravar um pedido órfão que vai falhar.
    if (!user) {
      console.warn('[BFA Supabase] Sugestão de edição sem sessão ativa — ignorada.');
      return false;
    }
    const { error } = await supabaseClient
      .from('pending_edits')
      .insert({
        author_id: user?.id || null,
        author_name: authorName,
        resource_type: resourceType,
        resource_id: resourceId,
        changes_json: changesJson,
        status: 'pending'
      });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('[BFA Supabase Pending Edit Error]:', err);
    return false;
  }
}

/**
 * Busca todas as edições pendentes para o Admin Chief revisar.
 */
async function fetchPendingEdits() {
  if (!supabaseClient) return [];
  try {
    const { data, error } = await supabaseClient
      .from('pending_edits')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('[BFA Supabase Fetch Pending Error]:', err);
    return [];
  }
}

/**
 * Atualiza o status de aprovação de uma edição pendente.
 */
async function updatePendingEditStatus(editId, status, notes = '') {
  if (!supabaseClient) return false;
  try {
    const user = (await supabaseClient.auth.getUser())?.data?.user;
    const { error } = await supabaseClient
      .from('pending_edits')
      .update({
        status: status, // 'approved' | 'rejected'
        reviewed_by: user?.id || null,
        review_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', editId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('[BFA Supabase Update Pending Error]:', err);
    return false;
  }
}

window.BfaSupabase = {
  get client() { return supabaseClient; },
  initSupabase,
  setCredentials,
  isConfigured: isSupabaseConfigured,
  syncLessonProgress,
  saveQuizAttempt,
  fetchUserProgress,
  signInUser,
  signOutUser,
  restoreSession,
  fetchSiteContent,
  saveSiteContent,
  submitPendingEdit,
  fetchPendingEdits,
  updatePendingEditStatus
};
