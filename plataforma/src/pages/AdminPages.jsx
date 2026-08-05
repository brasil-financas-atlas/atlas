const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function ThemeSelector() {
  const { themePreference, setThemePreference } = useContext(AdminContext || createContext({}));

  const themes = [
    { id: 'theme-classic', name: 'Brasil Atlas Classic', desc: 'Verde Floresta & Azul Marinho' },
    { id: 'theme-executive', name: 'B3 Corporate Executive', desc: 'Grafite & Azul B3' },
    { id: 'theme-khan', name: 'Minimalist Academy', desc: 'Azul Acadêmico & Branco' },
    { id: 'theme-obsidian', name: 'Dark Obsidian Pro', desc: 'Modo Escuro com Emerald' }
  ];

  return (
    <div className="bfa-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BfaIcon name="sparkles" size={20} color="var(--color-ouro-dark)" /> Seleção de Tema Visual da Plataforma
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setThemePreference && setThemePreference(t.id)}
            className={`bfa-btn ${themePreference === t.id ? 'bfa-btn--azul' : 'bfa-btn--ghost'}`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '1rem', textAlign: 'left' }}
          >
            <strong style={{ fontSize: '0.95rem' }}>
              {themePreference === t.id && <BfaIcon name="checkSimple" size={14} style={{ marginRight: '6px' }} />}
              {t.name}
            </strong>
            <span style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>{t.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminLogin() {
  const { login, isAuthenticated, adminUser } = useContext(AdminContext || createContext({}));
  const { navigate } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (isAuthenticated) {
    return (
      <div className="bfa-section">
        <div className="bfa-section__container bfa-text-center" style={{ maxWidth: '500px' }}>
          <div className="bfa-card" style={{ padding: '2.5rem' }}>
            <div style={{ margin: '0 auto 1rem auto', display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--color-verde-light)' }}>
              <BfaIcon name="checkCircle" size={48} color="var(--color-verde)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-azul-dark)' }}>
              Sessão Ativa: <strong>{adminUser.username}</strong>
            </h2>
            <p className="bfa-text-muted" style={{ margin: '0.75rem 0 1.5rem 0' }}>
              Você está autenticado no Painel Admin do BFA.
            </p>
            <a href="#/admin" className="bfa-btn bfa-btn--verde bfa-btn--block">
              Acessar Painel de Controle CMS ➔
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Credenciais inválidas.');
    }
  };

  return (
    <div className="bfa-section">
      <div className="bfa-section__container" style={{ maxWidth: '480px' }}>
        <div className="bfa-card" style={{ padding: '2.5rem' }}>
          <div className="bfa-text-center" style={{ marginBottom: '2rem' }}>
            <div style={{ width: '60px', height: '60px', background: 'var(--color-azul-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <BfaIcon name="lock" size={26} color="var(--color-azul)" />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-azul-dark)' }}>Área Restrita do Professor</h2>
            <p className="bfa-text-muted" style={{ fontSize: '0.9rem' }}>Acesso de edição para corpo docente e NIF Dragão do Mar</p>
          </div>

          {errorMsg && (
            <div className="bfa-admonition bfa-admonition--danger" style={{ marginBottom: '1.25rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="bfa-form-group">
              <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block' }}>Usuário:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bfa-input"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                placeholder="ex: admin"
                required
              />
            </div>

            <div className="bfa-form-group" style={{ marginTop: '1.25rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block' }}>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bfa-input"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="bfa-btn bfa-btn--verde bfa-btn--block" style={{ marginTop: '1.75rem' }}>
              Entrar no CMS ➔
            </button>
          </form>

          <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <strong>Credenciais Estáticas de Teste:</strong>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              <li><code>admin</code> / <code>bfa@2024</code></li>
              <li><code>lucas</code> / <code>dragaodoomar</code></li>
              <li><code>nif</code> / <code>investir123</code></li>
              <li><code>professor</code> / <code>brhsic2024</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { isAuthenticated, adminUser, logout, updateLesson, addNews, cmsData, inlineEditActive, toggleInlineEdit } = useContext(AdminContext || createContext({}));
  const [selectedLessonId, setSelectedLessonId] = useState('matematica-modulo-1-algebra-do-zero-aula-01-numeros-e-operacoes');
  const [videoInput, setVideoInput] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Macroeconomia');
  const [newsSummary, setNewsSummary] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="bfa-section">
        <div className="bfa-section__container bfa-text-center" style={{ maxWidth: '500px' }}>
          <div className="bfa-card" style={{ padding: '2.5rem' }}>
            <div style={{ margin: '0 auto 1rem auto', display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--status-danger-bg)' }}>
              <BfaIcon name="shield" size={48} color="var(--status-danger)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-azul-dark)' }}>Acesso Não Autorizado</h2>
            <p className="bfa-text-muted" style={{ margin: '0.75rem 0 1.5rem 0' }}>Faça login para gerenciar os conteúdos e aulas do BFA.</p>
            <a href="#/admin/login" className="bfa-btn bfa-btn--verde bfa-btn--block">
              Ir para Login ➔
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveVideo = (e) => {
    e.preventDefault();
    updateLesson(selectedLessonId, { videoUrl: videoInput.trim() });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCreateNews = (e) => {
    e.preventDefault();
    if (!newsTitle.trim()) return;
    addNews({
      title: newsTitle.trim(),
      category: newsCategory,
      summary: newsSummary.trim(),
      author: adminUser.username
    });
    setNewsTitle('');
    setNewsSummary('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bfa-section">
      <div className="bfa-section__container">
        {/* Header Bar */}
        <div className="bfa-card" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, #0F243C 0%, #1B3A5C 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="bfa-badge bfa-badge--ouro" style={{ marginBottom: '0.5rem' }}>Painel CMS Ativo</span>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0' }}>
                Painel do Professor & Administrador
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#CBD5E1' }}>
                Usuário conectado: <strong>{adminUser.username}</strong> ({adminUser.role})
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={toggleInlineEdit}
                className={`bfa-btn ${inlineEditActive ? 'bfa-btn--ouro' : 'bfa-btn--ghost'}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', ...(!inlineEditActive ? { color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' } : {}) }}
              >
                <BfaIcon name="pencil" size={16} /> Modo Edição In-Context: {inlineEditActive ? 'LIGADO' : 'DESLIGADO'}
              </button>
              <button onClick={logout} className="bfa-btn bfa-btn--ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FFD1D1', borderColor: 'rgba(255,255,255,0.2)' }}>
                Sair <BfaIcon name="logout" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Theme Selector Component */}
        <ThemeSelector />

        {inlineEditActive && (
          <div className="bfa-admonition bfa-admonition--warning" style={{ marginBottom: '2rem' }}>
            <div className="bfa-admonition__title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="pencil" size={16} /> Modo In-Context Ativado:
            </div>
            Ao navegar pelas páginas de alunos (`/matematica`, `/financas`, `/aulas`), os textos editáveis mostrarão um indicador de edição do professor.
          </div>
        )}

        {savedSuccess && (
          <div className="bfa-admonition bfa-admonition--tip" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="checkCircle" size={16} color="var(--color-verde)" /> Alterações salvas com sucesso e persistidas no LocalStorage!
          </div>
        )}

        {/* CMS Controls Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {/* Card 1: Videoaula Embed CMS */}
          <div className="bfa-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="video" size={20} color="var(--color-azul)" /> Cadastrar URL de Vídeo para Aula
            </h3>
            <form onSubmit={handleSaveVideo}>
              <div className="bfa-form-group">
                <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>Selecione a Aula:</label>
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                >
                  <option value="matematica-modulo-1-algebra-do-zero-aula-01-numeros-e-operacoes">
                    Matemática — M1 Aula 1: Números e operações
                  </option>
                  <option value="matematica-modulo-1-algebra-do-zero-aula-02-fracoes-e-decimais">
                    Matemática — M1 Aula 2: Frações e decimais
                  </option>
                  <option value="matematica-modulo-2-aplicada-aula-02-juros-simples-e-compostos">
                    Matemática — M2 Aula 2: Juros simples e compostos
                  </option>
                  <option value="financas-modulo-1-fundamentos-aula-01-mercado-financeiro">
                    Finanças — M1 Aula 1: Mercado financeiro
                  </option>
                </select>
              </div>

              <div className="bfa-form-group" style={{ marginTop: '1.25rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>Link da Videoaula no YouTube:</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                />
              </div>

              <button type="submit" className="bfa-btn bfa-btn--verde bfa-btn--block" style={{ marginTop: '1.5rem' }}>
                Salvar URL da Videoaula
              </button>
            </form>
          </div>

          {/* Card 2: Portal News Editor */}
          <div className="bfa-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="news" size={20} color="var(--color-azul)" /> Publicar Artigo no Portal de Notícias
            </h3>
            <form onSubmit={handleCreateNews}>
              <div className="bfa-form-group">
                <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>Título do Artigo:</label>
                <input
                  type="text"
                  placeholder="ex: COPOM eleva taxa Selic"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              <div className="bfa-form-group" style={{ marginTop: '1.25rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>Categoria:</label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                >
                  <option value="Macroeconomia">Macroeconomia</option>
                  <option value="Competição">Competição BRHSIC</option>
                  <option value="Investimentos">Investimentos</option>
                  <option value="Análise de Empresas">Análise de Empresas</option>
                </select>
              </div>

              <div className="bfa-form-group" style={{ marginTop: '1.25rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>Resumo:</label>
                <textarea
                  rows="3"
                  placeholder="Breve chamada..."
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="bfa-textarea"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                ></textarea>
              </div>

              <button type="submit" className="bfa-btn bfa-btn--azul bfa-btn--block" style={{ marginTop: '1.5rem' }}>
                Publicar Notícia
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
