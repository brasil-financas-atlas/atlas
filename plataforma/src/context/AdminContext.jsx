const INITIAL_ADMIN_USERS = [
  { id: 'user_1', username: 'admin', password: 'bfa@2024', name: 'Administrador Chief BFA', role: 'admin_chief' },
  { id: 'user_2', username: 'lucas', password: 'dragaodoomar', name: 'Lucas (Colaborador)', role: 'collaborator' },
  { id: 'user_3', username: 'nif', password: 'investir123', name: 'NIF (Colaborador)', role: 'collaborator' },
  { id: 'user_4', username: 'professor', password: 'brhsic2024', name: 'Professor BFA', role: 'teacher' }
];

const LOCAL_STORAGE_USER_KEY = 'bfa_admin_user';
const LOCAL_STORAGE_CMS_KEY = 'bfa_cms_overrides';
const LOCAL_STORAGE_INLINE_EDIT_KEY = 'bfa_inline_edit_mode';
const LOCAL_STORAGE_THEME_KEY = 'bfa_theme_preference';

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

const AdminContext = React.createContext(null);

function AdminProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [cmsData, setCmsData] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CMS_KEY);
      return saved ? normalizarCms(JSON.parse(saved)) : { ...CMS_VAZIO };
    } catch (e) {
      return { ...CMS_VAZIO };
    }
  });

  React.useEffect(() => {
    let cancelado = false;
    fetch(`${CMS_PUBLICADO_URL}?v=${Date.now()}`, { cache: 'no-store' })
      .then(res => (res.ok ? res.json() : null))
      .then(publicado => {
        if (cancelado || !publicado) return;
        setCmsData(local => (
          paraTempo(publicado.lastUpdated) >= paraTempo(local.lastUpdated)
            ? normalizarCms(publicado)
            : local
        ));
      })
      .catch(erro => {
        console.warn('Nao foi possivel carregar o conteudo publicado:', erro);
      });
    return () => { cancelado = true; };
  }, []);

  const [inlineEditActive, setInlineEditActiveState] = React.useState(() => {
    try {
      const savedMode = localStorage.getItem(LOCAL_STORAGE_INLINE_EDIT_KEY);
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedMode !== null) return savedMode === 'true';
      return !!savedUser;
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
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
      const savedMode = localStorage.getItem(LOCAL_STORAGE_INLINE_EDIT_KEY);
      if (savedMode === null || savedMode === 'true') {
        setInlineEditActiveState(true);
        localStorage.setItem(LOCAL_STORAGE_INLINE_EDIT_KEY, 'true');
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      setInlineEditActiveState(false);
    }
  }, [currentUser]);

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

  const login = async (username, password) => {
    // 1. Tenta Supabase Auth se disponível
    if (window.BfaSupabase && window.BfaSupabase.isConfigured()) {
      const spRes = await window.BfaSupabase.signInUser(username, password);
      if (spRes.success) {
        setCurrentUser(spRes.user);
        setInlineEditActive(true);
        return { success: true, user: spRes.user };
      }
    }

    // 2. Fallback para lista local de usuários
    const user = INITIAL_ADMIN_USERS.find(
      u => (u.username.toLowerCase() === username.trim().toLowerCase() || u.id === username.trim()) && u.password === password
    );

    if (user) {
      const session = { id: user.id, username: user.username, name: user.name, role: user.role };
      setCurrentUser(session);
      setInlineEditActive(true);
      return { success: true, user: session };
    }
    return { success: false, error: 'Usuário ou senha incorretos' };
  };

  const logout = () => {
    setCurrentUser(null);
    setInlineEditActive(false);
  };

  // Se o usuário for colaborador, a edição vai para a fila de aprovação (Pending Edit)
  const isCollaborator = currentUser?.role === 'collaborator';

  const updateLesson = (lessonId, updatedData) => {
    if (isCollaborator) {
      const pendingObj = {
        id: `edit_${Date.now()}`,
        authorName: currentUser.name || currentUser.username,
        resourceType: 'lesson',
        resourceId: lessonId,
        changesJson: updatedData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      if (window.BfaSupabase && window.BfaSupabase.isConfigured()) {
        window.BfaSupabase.submitPendingEdit('lesson', lessonId, updatedData, currentUser.name);
      }

      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [pendingObj, ...(prev.pendingEdits || [])]
      }));

      alert("ℹ️ Alteração enviada para análise do Admin Chief! Sua edição será publicada após a aprovação.");
      return;
    }

    // Caso seja Admin Chief ou Admin, aplica imediatamente
    setCmsData(prev => comHorario({
      ...prev,
      lessons: { ...prev.lessons, [lessonId]: { ...(prev.lessons?.[lessonId] || {}), ...updatedData } }
    }));
  };

  const addNews = (newsItem) => {
    const item = { id: `news_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...newsItem };

    if (isCollaborator) {
      if (window.BfaSupabase && window.BfaSupabase.isConfigured()) {
        window.BfaSupabase.submitPendingEdit('news', item.id, newsItem, currentUser.name);
      }
      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [{ id: item.id, authorName: currentUser.name, resourceType: 'news', resourceId: item.id, changesJson: newsItem, createdAt: new Date().toISOString(), status: 'pending' }, ...(prev.pendingEdits || [])]
      }));
      alert("ℹ️ Notícia enviada para aprovação do Admin Chief!");
      return;
    }

    setCmsData(prev => comHorario({ ...prev, news: [item, ...(prev.news || [])] }));
  };

  const saveOverride = (id, newContent) => {
    if (isCollaborator) {
      if (window.BfaSupabase && window.BfaSupabase.isConfigured()) {
        window.BfaSupabase.submitPendingEdit('override', id, { text: newContent }, currentUser.name);
      }
      setCmsData(prev => comHorario({
        ...prev,
        pendingEdits: [{ id: `edit_${Date.now()}`, authorName: currentUser.name, resourceType: 'override', resourceId: id, changesJson: { text: newContent }, createdAt: new Date().toISOString(), status: 'pending' }, ...(prev.pendingEdits || [])]
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

  // Funções exclusivas do Admin Chief para aprovar/rejeitar edições
  const approvePendingEdit = (editId) => {
    const targetEdit = (cmsData.pendingEdits || []).find(e => e.id === editId || e._id === editId);
    if (!targetEdit) return;

    if (window.BfaSupabase && window.BfaSupabase.isConfigured()) {
      window.BfaSupabase.updatePendingEditStatus(editId, 'approved');
    }

    setCmsData(prev => {
      const remainingPending = (prev.pendingEdits || []).filter(e => e.id !== editId && e._id !== editId);

      // Aplica a alteração no CMS principal
      let updatedLessons = { ...prev.lessons };
      let updatedOverrides = { ...(prev.overrides || {}) };
      let updatedNews = [...(prev.news || [])];

      if (targetEdit.resourceType === 'lesson') {
        updatedLessons[targetEdit.resourceId] = {
          ...(updatedLessons[targetEdit.resourceId] || {}),
          ...targetEdit.changesJson
        };
      } else if (targetEdit.resourceType === 'override') {
        updatedOverrides[targetEdit.resourceId] = targetEdit.changesJson?.text;
      } else if (targetEdit.resourceType === 'news') {
        updatedNews = [targetEdit.changesJson, ...updatedNews];
      }

      return comHorario({
        ...prev,
        lessons: updatedLessons,
        overrides: updatedOverrides,
        news: updatedNews,
        pendingEdits: remainingPending
      });
    });
  };

  const rejectPendingEdit = (editId, reason = '') => {
    if (window.BfaSupabase && window.BfaSupabase.isConfigured()) {
      window.BfaSupabase.updatePendingEditStatus(editId, 'rejected', reason);
    }

    setCmsData(prev => comHorario({
      ...prev,
      pendingEdits: (prev.pendingEdits || []).filter(e => e.id !== editId && e._id !== editId)
    }));
  };

  const value = {
    adminUser: currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    cmsData,
    updateLesson,
    addNews,
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

window.AdminContext = AdminContext;
window.AdminProvider = AdminProvider;
