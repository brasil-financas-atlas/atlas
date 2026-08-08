/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Supabase Client & Backend Integration
   Fallback gracioso para LocalStorage caso o Supabase não esteja configurado.
   ========================================================================== */

const SUPABASE_URL = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || window?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || window?.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient = null;

if (typeof window !== 'undefined' && window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[BFA Supabase] Backend Supabase conectado com sucesso!');
  } catch (err) {
    console.warn('[BFA Supabase] Erro ao inicializar cliente Supabase:', err);
  }
} else {
  console.log('[BFA Supabase] Supabase não configurado ou CDN indisponível. Utilizando armazenamento local (LocalStorage).');
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

window.BfaSupabase = {
  client: supabaseClient,
  isConfigured: isSupabaseConfigured,
  syncLessonProgress,
  saveQuizAttempt,
  fetchUserProgress
};
