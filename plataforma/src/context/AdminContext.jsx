const INITIAL_ADMIN_USERS = [
  { id: 'user_1', username: 'admin', password: 'bfa@2024', name: 'Administrador BFA', role: 'admin' },
  { id: 'user_2', username: 'lucas', password: 'dragaodoomar', name: 'Lucas', role: 'editor' },
  { id: 'user_3', username: 'nif', password: 'investir123', name: 'Nif', role: 'editor' },
  { id: 'user_4', username: 'professor', password: 'brhsic2024', name: 'Professor', role: 'instructor' }
];

const LOCAL_STORAGE_USER_KEY = 'bfa_admin_user';
const LOCAL_STORAGE_CMS_KEY = 'bfa_cms_overrides';
const LOCAL_STORAGE_INLINE_EDIT_KEY = 'bfa_inline_edit_mode';
const LOCAL_STORAGE_THEME_KEY = 'bfa_theme_preference';

// Conteúdo publicado: é o arquivo que o GitHubSyncModal commita no repositório.
// Sem carregá-lo, as edições ficariam presas no localStorage de quem editou.
const CMS_PUBLICADO_URL = 'src/data/overrides.json';

const CMS_VAZIO = { lastUpdated: null, modules: [], lessons: {}, news: [], quizzes: {}, overrides: {} };

function normalizarCms(dados) {
  if (!dados || typeof dados !== 'object') return { ...CMS_VAZIO };
  return {
    lastUpdated: dados.lastUpdated || null,
    modules: Array.isArray(dados.modules) ? dados.modules : [],
    news: Array.isArray(dados.news) ? dados.news : [],
    lessons: dados.lessons && !Array.isArray(dados.lessons) ? dados.lessons : {},
    quizzes: dados.quizzes && !Array.isArray(dados.quizzes) ? dados.quizzes : {},
    overrides: dados.overrides && typeof dados.overrides === 'object' ? dados.overrides : {}
  };
}

function paraTempo(valor) {
  const t = valor ? Date.parse(valor) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

// Marca a hora da edição para saber quem está mais atual: este navegador ou o
// conteúdo já publicado no repositório.
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

  // Busca o conteúdo publicado no repositório e o adota quando for mais recente
  // do que o deste navegador. Para quem só visita o site (localStorage vazio),
  // o publicado sempre vence — é assim que a edição do admin chega ao público.
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
        console.warn('Não foi possível carregar o conteúdo publicado:', erro);
      });

    return () => { cancelado = true; };
  }, []);

  const [inlineEditActive, setInlineEditActiveState] = React.useState(() => {
    try {
      const savedMode = localStorage.getItem(LOCAL_STORAGE_INLINE_EDIT_KEY);
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return !!savedUser;
    } catch (e) {
      return false;
    }
  });

  const [currentTheme, setCurrentThemeState] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (saved && AVAILABLE_THEMES.some(t => t.id === saved)) {
        return saved;
      }
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

  const login = (username, password) => {
    const user = INITIAL_ADMIN_USERS.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
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

  const updateLesson = (lessonId, updatedData) => {
    setCmsData(prev => comHorario({
      ...prev,
      lessons: { ...prev.lessons, [lessonId]: { ...(prev.lessons?.[lessonId] || {}), ...updatedData } }
    }));
  };

  const addNews = (newsItem) => {
    const item = { id: `news_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...newsItem };
    setCmsData(prev => comHorario({ ...prev, news: [item, ...(prev.news || [])] }));
  };

  const saveOverride = (id, newContent) => {
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
