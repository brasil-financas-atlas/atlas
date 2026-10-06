import React from 'react';
import { BfaSupabase } from '../utils/supabaseClient.js';

/* Não existe lista de usuários aqui, e isso é de propósito.
   Antes havia quatro pares usuário/senha escritos no código — e como este site
   é servido como arquivo estático, "escrito no código" significa "publicado na
   internet". Quem autentica agora é o Supabase Auth, e o papel (aluno/admin) é
   lido do banco a cada carregamento.
   Para criar o primeiro admin, veja a seção 11 de src/data/schema.sql. */

const PAPEIS_ADMIN = ['admin', 'admin_chief'];
// Quem tem acesso ao painel e ao modo de edicao (professores e colaboradores
// editam, mas suas edicoes vao para aprovacao do admin chefe).
const PAPEIS_EQUIPE = ['admin_chief', 'admin', 'teacher', 'collaborator'];
const ROTAS_DE_LOGIN = ['/login', '/auth', '/admin/login', '/confirmacao', '/confirmacao-email', '/auth-confirm', '/auth/confirm', '/auth/callback'];

function ehEquipe(usuario) {
  return !!usuario && PAPEIS_EQUIPE.includes(normalizarPapel(usuario.role));
}
const LOCAL_STORAGE_CMS_KEY = 'bfa_cms_overrides';
const LOCAL_STORAGE_INLINE_EDIT_KEY = 'bfa_inline_edit_mode';
const LOCAL_STORAGE_THEME_KEY = 'bfa_theme_preference';

function normalizarPapel(role) {
  if (!role) return 'student';
  const r = String(role).trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (r === 'adminchief' || r === 'admin_chief' || r === 'chief' || r === 'admin-chief') return 'admin_chief';
  if (r === 'admin' || r === 'administrator' || r === 'administrador') return 'admin';
  if (r === 'teacher' || r === 'professor') return 'teacher';
  if (r === 'collaborator' || r === 'colaborador') return 'collaborator';
  return r;
}

const CMS_PUBLICADO_URL = 'src/data/overrides.json';
const CMS_VAZIO = { lastUpdated: null, modules: [], lessons: {}, news: [], quizzes: {}, overrides: {}, pendingEdits: [] };

function normalizarCms(dados) {
  if (!dados || typeof dados !== 'object') return { ...CMS_VAZIO };
  return {
    lastUpdated: dados.lastUpdated || null,
    modules: Array.isArray(dados.modules) ? dados.modules : [],
    news: Array.isArray(dados.news) ? dados.news : [],
    lessons: dados.lessons && !Array.isArray(dados.lessons) ? dados.lessons : {},
    quizzes: dados.quizzes && !Array.isArray(dados.quizzes) ? dados.quizzes : {},
    overrides: dados.overrides && typeof dados.overrides === 'object' ? dados.overrides : {},
    pendingEdits: Array.isArray(dados.pendingEdits) ? dados.pendingEdits : []
  };
}

function paraTempo(valor) {
  const t = valor ? Date.parse(valor) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

function comHorario(dados) {
  return { ...dados, lastUpdated: new Date().toISOString() };
}

const AVAILABLE_THEMES = [
  {
    id: 'brasil-atlas',
    name: 'Brasil Atlas Classic',
    description: 'Identidade clássica BFA: Verde Floresta (#1B6B3A), Azul Marinho (#1B3A5C) e Ouro Âmbar (#C8963E).',
    colors: ['#1B6B3A', '#1B3A5C', '#C8963E']
  },
  {
    id: 'b3-corporate',
    name: 'Executive Financial / B3 Corporate',
    description: 'Visual corporativo de alta finanças: Azul Corporativo (#0A2540), Grafite (#1A1F36) e Verde Investimento (#00D4B2).',
    colors: ['#0A2540', '#1A1F36', '#00D4B2']
  },
  {
    id: 'khan-minimalist',
    name: 'Khan Minimalist Academy',
    description: 'Estilo acadêmico minimalista: Cinza Neutro (#212529), Azul Acadêmico (#0056B3) e Branco Puro (#FFFFFF).',
    colors: ['#212529', '#0056B3', '#FFFFFF']
  },
  {
    id: 'dark-obsidian',
    name: 'Dark Obsidian Pro',
    description: 'Modo escuro profissional: Preto Obscuridade (#0D1117), Neon Emerald (#10B981) e Ouro Escuro (#D97706).',
    colors: ['#0D1117', '#10B981', '#D97706']
  }
];

export const AdminContext = React.createContext(null);

export function AdminProvider({ children }) {
  // A sessão não é lida do localStorage de propósito: se o papel viesse de lá,
  // bastaria editar o navegador para se declarar admin. Quem guarda a sessão é
  // o Supabase; o papel vem do banco.
  const [currentUser, setCurrentUser] = React.useState(null);
  const [carregandoSessao, setCarregandoSessao] = React.useState(true);
  const [statusPublicacao, setStatusPublicacao] = React.useState('idle'); // idle | publicando | publicado | erro
  const [erroPublicacao, setErroPublicacao] = React.useState('');

  const [cmsData, setCmsData] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CMS_KEY);
      return saved ? normalizarCms(JSON.parse(saved)) : { ...CMS_VAZIO };
    } catch (e) {
      return { ...CMS_VAZIO };
    }
  });

  // Recupera a sessão e carrega o conteúdo publicado.
  //
  // Ordem de preferência: banco primeiro, `overrides.json` como reserva. A
  // reserva existe para o site não regredir enquanto o Supabase não estiver
  // configurado, e deixa de ser usada sozinha quando estiver.
  React.useEffect(() => {
    let cancelado = false;

    const adotarSeMaisNovo = (publicado) => {
      if (cancelado || !publicado) return;
      setCmsData(local => (
        paraTempo(publicado.lastUpdated) >= paraTempo(local.lastUpdated)
          ? normalizarCms(publicado)
          : local
      ));
    };

    const carregar = async () => {
      const sp = BfaSupabase;

      if (sp && sp.isConfigured()) {
        const sessao = await sp.restoreSession();
        if (!cancelado && ehEquipe(sessao)) setCurrentUser(sessao);

        const doBanco = await sp.fetchSiteContent();
        if (doBanco) {
          adotarSeMaisNovo(doBanco);
        }

        // Carrega as edições pendentes do banco
        try {
          const pending = await sp.fetchPendingEdits();
          if (!cancelado && pending && Array.isArray(pending) && pending.length > 0) {
            const normalizedPending = pending.map(p => ({
              id: p.id,
              authorName: p.author_name || p.authorName || 'Colaborador',
              resourceType: p.resource_type || p.resourceType,
              resourceId: p.resource_id || p.resourceId,
              changesJson: p.changes_json || p.changesJson,
              createdAt: p.created_at || p.createdAt,
              status: p.status || 'pending'
            }));
            setCmsData(prev => ({
              ...prev,
              pendingEdits: normalizedPending
            }));
          }
        } catch (pErr) {
          console.warn('[BFA] Não foi possível carregar pendências do Supabase:', pErr);
        }

        if (doBanco) {
          if (!cancelado) setCarregandoSessao(false);
          return;
        }
      }

      try {
        const res = await fetch(`${CMS_PUBLICADO_URL}?v=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) adotarSeMaisNovo(await res.json());
      } catch (erro) {
        console.warn('Nao foi possivel carregar o conteudo publicado:', erro);
      }
      if (!cancelado) setCarregandoSessao(false);
    };

    carregar();
    return () => { cancelado = true; };
  }, []);

  // Começa desligado. Quando a sessão do Supabase é recuperada, o efeito que
  // observa `currentUser` liga de volta se a pessoa deixou ligado antes.
  const [inlineEditActive, setInlineEditActiveState] = React.useState(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_INLINE_EDIT_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [currentTheme, setCurrentThemeState] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (saved && AVAILABLE_THEMES.some(t => t.id === saved)) return saved;
      return 'brasil-atlas';
    } catch (e) {
      return 'brasil-atlas';
    }
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    document.body.className = `theme-${currentTheme}`;
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, currentTheme);
    } catch (e) {}
  }, [currentTheme]);

  React.useEffect(() => {
    if (currentUser) {
      const savedMode = localStorage.getItem(LOCAL_STORAGE_INLINE_EDIT_KEY);
      if (savedMode === null || savedMode === 'true') {
        setInlineEditActiveState(true);
        localStorage.setItem(LOCAL_STORAGE_INLINE_EDIT_KEY, 'true');
      }
    } else {
      setInlineEditActiveState(false);
    }
  }, [currentUser]);

  // Login unico: o aluno, o professor e o admin entram pela mesma tela (senha,
  // codigo por e-mail ou Google/Facebook/Apple). Sempre que a sessao do Supabase
  // muda, o papel e lido do banco; se for da equipe, as funcoes de admin ligam
  // na hora e quem acabou de entrar pela tela de login vai direto ao painel.
  React.useEffect(() => {
    const sp = BfaSupabase;
    const client = sp && sp.isConfigured() ? sp.client : null;
    if (!client || !client.auth || !client.auth.onAuthStateChange) return undefined;

    const { data } = client.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setInlineEditActive(false);
        return;
      }
      if (event !== 'SIGNED_IN' && event !== 'USER_UPDATED') return;

      // O Supabase pede para nao chamar o banco dentro deste callback.
      setTimeout(async () => {
        const usuario = await sp.restoreSession();
        if (!ehEquipe(usuario)) {
          setCurrentUser(null);
          return;
        }
        setCurrentUser((anterior) => {
          if (!anterior || anterior.id !== usuario.id) setInlineEditActive(true);
          return usuario;
        });

        let veioDoLogin = false;
        try {
          veioDoLogin = sessionStorage.getItem('bfa_login_pendente') === '1';
          sessionStorage.removeItem('bfa_login_pendente');
        } catch (e) {}
        const rota = (window.location.hash || '').replace(/^#/, '').split('?')[0] || '/';
        if (event === 'SIGNED_IN' && (veioDoLogin || ROTAS_DE_LOGIN.includes(rota))) {
          window.location.hash = '#/admin';
        }
      }, 0);
    });

    return () => {
      if (data && data.subscription) data.subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CMS_KEY, JSON.stringify(cmsData));
  }, [cmsData]);

  const setInlineEditActive = (valueOrFn) => {
    setInlineEditActiveState(prev => {
      const nextVal = typeof valueOrFn === 'function' ? valueOrFn(prev) : valueOrFn;
      try {
        localStorage.setItem(LOCAL_STORAGE_INLINE_EDIT_KEY, String(nextVal));
      } catch (e) {}
      return nextVal;
    });
  };

  const toggleInlineEdit = () => {
    setInlineEditActive(prev => !prev);
  };

  const setTheme = (themeId) => {
    if (AVAILABLE_THEMES.some(t => t.id === themeId)) {
      setCurrentThemeState(themeId);
    }
  };

  // Login por e-mail e senha do Supabase Auth. Não existe caminho alternativo:
  // se o banco não estiver configurado, ninguém entra. É melhor assim do que
  // manter uma senha de emergência escrita num arquivo público.
  const login = async (email, password) => {
    const sp = BfaSupabase;
    if (!sp || !sp.isConfigured()) {
      return { success: false, error: 'Banco de dados não configurado. Fale com quem administra o site.' };
    }

    const res = await sp.signInUser(String(email).trim(), password);
    if (res.success && !ehEquipe(res.user)) {
      return { ...res, isStaff: false };
    }
    if (res.success) {
      setCurrentUser(res.user);
      setInlineEditActive(true);

      // Carrega pendências ao logar
      try {
        const pending = await sp.fetchPendingEdits();
        if (pending && Array.isArray(pending) && pending.length > 0) {
          const normalizedPending = pending.map(p => ({
            id: p.id,
            authorName: p.author_name || p.authorName || 'Colaborador',
            resourceType: p.resource_type || p.resourceType,
            resourceId: p.resource_id || p.resourceId,
            changesJson: p.changes_json || p.changesJson,
            createdAt: p.created_at || p.createdAt,
            status: p.status || 'pending'
          }));
          setCmsData(prev => ({
            ...prev,
            pendingEdits: normalizedPending
          }));
        }
      } catch (pErr) {
        console.warn('[BFA] Não foi possível carregar pendências no login:', pErr);
      }

      return res;
    }
    return { success: false, error: res.error || 'E-mail ou senha incorretos' };
  };

  const logout = async () => {
    const sp = BfaSupabase;
    // Encerrar de verdade importa: sem isto o token de acesso continua válido
    // no navegador depois de "sair".
    if (sp && sp.isConfigured()) await sp.signOutUser();
    setCurrentUser(null);
    setInlineEditActive(false);
    setStatusPublicacao('idle');
  };

  // Publicar é o que substituiu o botão de token. Não pede credencial nenhuma:
  // quem verifica a permissão é o banco, pela política "Somente admin altera
  // conteúdo". Se a conta não for admin, a gravação é recusada lá — e não por
  // uma checagem no navegador, que qualquer pessoa poderia burlar.
  const publicarConteudo = async () => {
    const sp = BfaSupabase;
    if (!sp || !sp.isConfigured()) {
      setStatusPublicacao('erro');
      setErroPublicacao('Banco de dados não configurado.');
      return { success: false };
    }

    setStatusPublicacao('publicando');
    setErroPublicacao('');

    const res = await sp.saveSiteContent(cmsData);
    if (res.success) {
      setStatusPublicacao('publicado');
      setTimeout(() => setStatusPublicacao('idle'), 4000);
    } else {
      setStatusPublicacao('erro');
      setErroPublicacao(res.error || 'Erro ao publicar');
    }
    return res;
  };

  // Se o usuário não for Admin Chief (ou seja, for admin, teacher ou colaborador), a edição vai para a fila de aprovação (Pending Edit)
  const userRole = normalizarPapel(currentUser?.role);
  const isChief = userRole === 'admin_chief';
  const isAdmin = PAPEIS_ADMIN.includes(userRole);
  const needsApproval = !isChief;

  const updateLesson = (lessonId, updatedData) => {
    if (needsApproval) {
      const pendingObj = {
        id: `edit_${Date.now()}`,
        authorName: currentUser.name || currentUser.username || currentUser.email,
        resourceType: 'lesson',
        resourceId: lessonId,
        changesJson: updatedData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      if (BfaSupabase && BfaSupabase.isConfigured()) {
        BfaSupabase.submitPendingEdit('lesson', lessonId, updatedData, currentUser.name || currentUser.email);
      }

      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [pendingObj, ...(prev.pendingEdits || [])]
      }));

      alert("ℹ️ Alteração enviada para análise do Admin Chief! Sua edição será publicada após a aprovação.");
      return;
    }

    // Caso seja Admin Chief, aplica imediatamente
    setCmsData(prev => comHorario({
      ...prev,
      lessons: { ...prev.lessons, [lessonId]: { ...(prev.lessons?.[lessonId] || {}), ...updatedData } }
    }));
  };

  const addNews = (newsItem) => {
    const item = { id: `news_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...newsItem };

    if (needsApproval) {
      if (BfaSupabase && BfaSupabase.isConfigured()) {
        BfaSupabase.submitPendingEdit('news', item.id, newsItem, currentUser.name || currentUser.email);
      }
      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [{ id: item.id, authorName: currentUser.name || currentUser.email, resourceType: 'news', resourceId: item.id, changesJson: newsItem, createdAt: new Date().toISOString(), status: 'pending' }, ...(prev.pendingEdits || [])]
      }));
      alert("ℹ️ Notícia enviada para aprovação do Admin Chief!");
      return;
    }

    setCmsData(prev => comHorario({ ...prev, news: [item, ...(prev.news || [])] }));
  };

  const saveOverride = (id, newContent) => {
    if (needsApproval) {
      if (BfaSupabase && BfaSupabase.isConfigured()) {
        BfaSupabase.submitPendingEdit('override', id, { text: newContent }, currentUser.name || currentUser.email);
      }
      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [{ id: `edit_${Date.now()}`, authorName: currentUser.name || currentUser.email, resourceType: 'override', resourceId: id, changesJson: { text: newContent }, createdAt: new Date().toISOString(), status: 'pending' }, ...(prev.pendingEdits || [])]
      }));
      alert("ℹ️ Alteração de texto enviada para aprovação do Admin Chief!");
      return;
    }

    setCmsData(prev => {
      const currentOverrides = prev.overrides || {};
      const updatedOverrides = { ...currentOverrides };
      if (newContent === null || newContent === undefined) {
        delete updatedOverrides[id];
      } else {
        updatedOverrides[id] = newContent;
      }
      const updatedCms = comHorario({ ...prev, overrides: updatedOverrides });
      try {
        localStorage.setItem(LOCAL_STORAGE_CMS_KEY, JSON.stringify(updatedCms));
      } catch (e) {}
      return updatedCms;
    });
  };

  const addModule = (subjectKey, moduleObj) => {
    const modItem = { slug: `modulo-${Date.now()}`, title: moduleObj.title || moduleObj.titulo, aulas: [], ...moduleObj };

    if (needsApproval) {
      if (BfaSupabase && BfaSupabase.isConfigured()) {
        BfaSupabase.submitPendingEdit('module', `${subjectKey}-${modItem.slug}`, modItem, currentUser.name || currentUser.email);
      }
      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [{ id: `edit_${Date.now()}`, authorName: currentUser.name || currentUser.email, resourceType: 'module', resourceId: `${subjectKey}-${modItem.slug}`, changesJson: { subjectKey, module: modItem }, createdAt: new Date().toISOString(), status: 'pending' }, ...(prev.pendingEdits || [])]
      }));
      alert("ℹ️ Novo módulo enviado para aprovação do Admin Chief!");
      return;
    }

    setCmsData(prev => {
      const currentMods = prev.modules || [];
      return comHorario({ ...prev, modules: [...currentMods, { subjectKey, ...modItem }] });
    });
  };

  const addExercise = (exObj) => {
    const item = { id: `ex_${Date.now()}`, module: exObj.module || 'Geral', difficulty: exObj.difficulty || 'Médio', title: exObj.title, question: exObj.question, answer: exObj.answer, category: exObj.category || 'fixacao' };

    if (needsApproval) {
      if (BfaSupabase && BfaSupabase.isConfigured()) {
        BfaSupabase.submitPendingEdit('exercise', item.id, item, currentUser.name || currentUser.email);
      }
      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [{ id: item.id, authorName: currentUser.name || currentUser.email, resourceType: 'exercise', resourceId: item.id, changesJson: item, createdAt: new Date().toISOString(), status: 'pending' }, ...(prev.pendingEdits || [])]
      }));
      alert("ℹ️ Exercício enviado para aprovação do Admin Chief!");
      return;
    }

    setCmsData(prev => {
      const currentExs = prev.exercises || [];
      return comHorario({ ...prev, exercises: [item, ...currentExs] });
    });
  };

  const deleteExercise = (exId) => {
    if (needsApproval) {
      alert("ℹ️ Exclusões devem ser solicitadas diretamente ao Admin Chief.");
      return;
    }
    setCmsData(prev => comHorario({
      ...prev,
      exercises: (prev.exercises || []).filter(e => e.id !== exId)
    }));
  };

  const deleteNews = (newsId) => {
    if (needsApproval) {
      alert("ℹ️ Exclusões devem ser solicitadas diretamente ao Admin Chief.");
      return;
    }
    setCmsData(prev => comHorario({
      ...prev,
      news: (prev.news || []).filter(n => n.id !== newsId)
    }));
  };

  // Funções exclusivas do Admin Chief para aprovar/rejeitar edições
  const approvePendingEdit = (editId) => {
    const targetEdit = (cmsData.pendingEdits || []).find(e => e.id === editId || e._id === editId);
    if (!targetEdit) return;

    if (BfaSupabase && BfaSupabase.isConfigured()) {
      BfaSupabase.updatePendingEditStatus(editId, 'approved');
    }

    setCmsData(prev => {
      const remainingPending = (prev.pendingEdits || []).filter(e => e.id !== editId && e._id !== editId);

      const resType = targetEdit.resourceType || targetEdit.resource_type;
      const resId = targetEdit.resourceId || targetEdit.resource_id;
      const changes = targetEdit.changesJson || targetEdit.changes_json || {};

      let updatedLessons = { ...prev.lessons };
      let updatedOverrides = { ...(prev.overrides || {}) };
      let updatedNews = [...(prev.news || [])];
      let updatedExercises = [...(prev.exercises || [])];
      let updatedModules = [...(prev.modules || [])];

      if (resType === 'lesson') {
        updatedLessons[resId] = {
          ...(updatedLessons[resId] || {}),
          ...changes
        };
      } else if (resType === 'override') {
        updatedOverrides[resId] = changes.text !== undefined ? changes.text : changes;
      } else if (resType === 'news') {
        updatedNews = [changes, ...updatedNews];
      } else if (resType === 'exercise') {
        updatedExercises = [changes, ...updatedExercises];
      } else if (resType === 'module') {
        updatedModules = [...updatedModules, changes.module || changes];
      }

      return comHorario({
        ...prev,
        lessons: updatedLessons,
        overrides: updatedOverrides,
        news: updatedNews,
        exercises: updatedExercises,
        modules: updatedModules,
        pendingEdits: remainingPending
      });
    });
  };

  const rejectPendingEdit = (editId, reason = '') => {
    if (BfaSupabase && BfaSupabase.isConfigured()) {
      BfaSupabase.updatePendingEditStatus(editId, 'rejected', reason);
    }

    setCmsData(prev => comHorario({
      ...prev,
      pendingEdits: (prev.pendingEdits || []).filter(e => e.id !== editId && e._id !== editId)
    }));
  };

  const value = {
    adminUser: currentUser,
    isAuthenticated: !!currentUser,
    isAdmin,
    isChief,
    isAdminChief: isChief,
    userRole,
    carregandoSessao,
    isStaff: ehEquipe(currentUser),
    login,
    logout,
    publicarConteudo,
    statusPublicacao,
    erroPublicacao,
    cmsData,
    updateLesson,
    addModule,
    addNews,
    deleteNews,
    addExercise,
    deleteExercise,
    inlineEditActive,
    setInlineEditActive,
    toggleInlineEdit,
    saveOverride,
    approvePendingEdit,
    rejectPendingEdit,
    currentTheme,
    setTheme,
    availableThemes: AVAILABLE_THEMES,
    themePreference: currentTheme,
    setThemePreference: setTheme
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}



