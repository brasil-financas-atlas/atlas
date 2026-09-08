const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Navbar() {
  const { studentAuth, completedLessons, quizScores } = useContext(window.ProgressContext || createContext({}));
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState('email'); // 'email' | 'otp' | 'profile'
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authOtp, setAuthOtp] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const { currentPath } = useRouter();
  const { adminUser, isAdmin, logout, publicarConteudo, statusPublicacao, erroPublicacao, currentTheme, setTheme: setContextTheme } =
    useContext(AdminContext || createContext({}));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = currentTheme === 'dark-obsidian' || currentTheme === 'dark';

  const toggleDarkLight = () => {
    if (isDark) {
      if (setContextTheme) setContextTheme('brasil-atlas');
    } else {
      if (setContextTheme) setContextTheme('dark-obsidian');
    }
  };

  const allLessonsIndex = useMemo(() => {
    const index = [];
    const content = window.EXACT_CONTENT;
    if (!content) return index;

    ['matematica', 'financas'].forEach((subjKey) => {
      const subj = content[subjKey];
      if (subj && subj.modulos) {
        subj.modulos.forEach((mod) => {
          if (mod.aulas) {
            mod.aulas.forEach((aula) => {
              index.push({
                subjectKey: subjKey,
                subjectTitle: subjKey === 'matematica' ? 'Matemática' : 'Finanças',
                moduloTitle: mod.titulo,
                moduloSlug: mod.slug,
                aulaTitle: aula.titulo,
                aulaSlug: aula.slug,
                url: `#/${subjKey}/${mod.slug}/${aula.slug}`
              });
            });
          }
        });
      }
    });

    return index;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allLessonsIndex.filter(item =>
      item.aulaTitle.toLowerCase().includes(q) ||
      item.moduloTitle.toLowerCase().includes(q) ||
      item.subjectTitle.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery, allLessonsIndex]);

  const navLinks = [
    { label: "Matemática", path: "/matematica" },
    { label: "Finanças", path: "/financas" },
    { label: "Preparação BRHSIC", path: "/preparacao-brhsic" },
    { label: "Exercícios", path: "/exercicios" },
    { label: "Sobre", path: "/sobre" },
  ];

  const MarketTicker = window.MarketTickerRibbon;

  return (
    <>
      <header className="site-header" style={{ boxShadow: '0 4px 20px -5px rgba(15, 23, 42, 0.05)' }}>
      <div className="site-header__container">
        <a href="#/" className="site-logo" style={{ textDecoration: 'none' }}>
          <div className="site-logo__badge" style={{ background: 'linear-gradient(135deg, #059669 0%, #0F172A 100%)', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)', color: '#FFFFFF' }}>BFA</div>
          <div>
            <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Brasil Finanças Atlas
            </span>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600, fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px', letterSpacing: '0.04em' }}>
              Educação Financeira & Matemática Aplicada
            </span>
          </div>
        </a>

        {/* Global Search Bar with Autocomplete */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Buscar aula ou conceito..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            style={{
              width: '100%',
              padding: '0.5rem 0.95rem',
              fontSize: '0.875rem',
              borderRadius: '9999px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              color: 'var(--foreground)',
              outline: 'none',
              minHeight: '40px'
            }}
          />
          {searchOpen && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              zIndex: 9999,
              maxHeight: '65vh',
              overflowY: 'auto',
              padding: '0.4rem 0'
            }}>
              {searchResults.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.65rem 1rem',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    color: 'var(--foreground)',
                    transition: 'background 0.15s ease',
                    minHeight: '44px'
                  }}
                  className="search-item-link"
                >
                  <span style={{ fontWeight: 700, display: 'block' }}>{item.aulaTitle}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                    {item.subjectTitle} · {item.moduloTitle}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="navbar-nav">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontWeight: isActive ? 700 : 600,
                  backgroundColor: isActive ? 'var(--track-finance)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--muted-foreground)',
                  padding: '0.5rem 0.95rem',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '40px',
                  fontSize: '0.85rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Quick mobile track pills */}
        <div className="bfa-mobile-quick-tracks" style={{ display: 'none', alignItems: 'center', gap: '0.35rem' }}>
          <a
            href="#/matematica"
            className="mono-tag"
            style={{
              color: currentPath.startsWith('/matematica') ? '#FFFFFF' : 'var(--foreground)',
              background: currentPath.startsWith('/matematica') ? 'var(--track-math)' : 'var(--surface-strong)',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.6rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            Matemática
          </a>
          <a
            href="#/financas"
            className="mono-tag"
            style={{
              color: currentPath.startsWith('/financas') ? '#FFFFFF' : 'var(--foreground)',
              background: currentPath.startsWith('/financas') ? 'var(--track-finance)' : 'var(--surface-strong)',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.6rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontSize: '0.72rem',
              fontWeight: 700
            }}
          >
            Finanças
          </a>
        </div>

        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Botão de Autenticação / Perfil do Aluno */}
          {studentAuth && studentAuth.isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                setAuthStep('profile');
                setStudentModalOpen(true);
              }}
              className="navbar-student-btn"
              title="Meu Perfil e Progresso Sincronizado"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0.42rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                background: 'var(--surface-strong)',
                color: 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 750,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: studentAuth.isSyncing ? '#38BDF8' : '#10B981',
                boxShadow: studentAuth.isSyncing ? '0 0 8px #38BDF8' : '0 0 6px #10B981'
              }} />
              <span style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {studentAuth.profile?.name || studentAuth.user?.email?.split('@')[0] || 'Aluno'}
              </span>
            </button>
          ) : (
            <a
              href="#/login"
              className="navbar-student-btn"
              title="Entrar ou criar conta para sincronizar seu progresso"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid rgba(5, 150, 105, 0.4)',
                background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(15, 23, 42, 0.05) 100%)',
                color: 'var(--track-finance)',
                fontSize: '0.82rem',
                fontWeight: 750,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Entrar</span>
            </a>
          )}

          {/* Botão de Alternância Dark/Light (Desktop) */}
          <button
            type="button"
            onClick={toggleDarkLight}
            className="navbar-theme-btn"
            title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid var(--border)',
              background: 'var(--surface-strong)',
              color: 'var(--foreground)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {isDark ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span>Claro</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Escuro</span>
              </>
            )}
          </button>

          {/* Botão Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bfa-mobile-nav-toggle"
            aria-label="Abrir menu de funções"
          >
            <BfaIcon name={mobileMenuOpen ? "close" : "menu"} size={18} />
          </button>

          {adminUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isAdmin && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={publicarConteudo}
                  disabled={statusPublicacao === 'publicando'}
                  title={erroPublicacao || 'Publicar as alterações para todos os visitantes'}
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                >
                  {statusPublicacao === 'publicando' && 'Publicando...'}
                  {statusPublicacao === 'publicado' && 'Publicado'}
                  {statusPublicacao === 'erro' && 'Erro ao publicar'}
                  {(statusPublicacao === 'idle' || !statusPublicacao) && 'Publicar'}
                </button>
              )}
              <a
                href="#/admin"
                className="nav-link active"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.7rem',
                  borderRadius: '6px',
                  background: 'var(--surface-strong)',
                  border: '1px solid var(--border)'
                }}
              >
                Painel Admin
              </a>
            </div>
          )}
        </div>
      </div>
    </header>

    
      {/* Modal de Autenticação e Perfil de Aluno */}
      {studentModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
          }}
          onClick={() => setStudentModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '2rem',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.3)',
              color: 'var(--foreground)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', padding: '6px', borderRadius: '8px', background: 'var(--surface-strong)', color: 'var(--ring)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                  {authStep === 'profile' ? 'Meu Perfil de Aprendizado' : (authStep === 'otp' ? 'Confirmar Código' : 'Acessar o Atlas')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStudentModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', padding: '4px' }}
              >
                <BfaIcon name="close" size={18} />
              </button>
            </div>

            {authError && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {authError}
              </div>
            )}

            {authMessage && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {authMessage}
              </div>
            )}

            {/* Passo 1: Solicitar E-mail */}
            {authStep === 'email' && (
              <div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Informe seu e-mail para receber um código de acesso seguro sem necessidade de senha. Seu progresso será sincronizado na nuvem.
                </p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!authEmail.trim()) {
                    setAuthError('Por favor, informe um e-mail válido.');
                    return;
                  }
                  setAuthLoading(true);
                  setAuthError('');
                  try {
                    if (studentAuth?.signInWithEmail) {
                      await studentAuth.signInWithEmail(authEmail, authName);
                      setAuthMessage('Código de acesso enviado para seu e-mail!');
                      setAuthStep('otp');
                    } else {
                      setAuthError('Módulo de autenticação Supabase indisponível no momento.');
                    }
                  } catch (err) {
                    setAuthError(err?.message || 'Erro ao enviar código.');
                  } finally {
                    setAuthLoading(false);
                  }
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Seu Nome ou Apelido (Opcional):</label>
                    <input
                      type="text"
                      placeholder="Ex: Ana Silva"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>E-mail:</label>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.9rem' }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.92rem', fontWeight: 750, borderRadius: '8px' }}
                  >
                    {authLoading ? 'Enviando código...' : 'Continuar com E-mail'}
                  </button>
                </form>
              </div>
            )}

            {/* Passo 2: Confirmar Código OTP */}
            {authStep === 'otp' && (
              <div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Digite o código de 6 dígitos enviado para <strong>{authEmail}</strong>:
                </p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!authOtp.trim()) {
                    setAuthError('Por favor, informe o código.');
                    return;
                  }
                  setAuthLoading(true);
                  setAuthError('');
                  try {
                    if (studentAuth?.verifyOtpCode) {
                      await studentAuth.verifyOtpCode(authEmail, authOtp);
                      setAuthStep('profile');
                      setAuthMessage('Login realizado com sucesso!');
                    }
                  } catch (err) {
                    setAuthError(err?.message || 'Código inválido ou expirado.');
                  } finally {
                    setAuthLoading(false);
                  }
                }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      placeholder="Código de 6 dígitos"
                      value={authOtp}
                      onChange={(e) => setAuthOtp(e.target.value)}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '1.1rem', textAlign: 'center', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.92rem', fontWeight: 750, borderRadius: '8px', marginBottom: '0.75rem' }}
                  >
                    {authLoading ? 'Verificando...' : 'Confirmar e Entrar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthStep('email'); setAuthError(''); setAuthMessage(''); }}
                    style={{ width: '100%', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--muted-foreground)', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Voltar e alterar e-mail
                  </button>
                </form>
              </div>
            )}

            {/* Passo 3: Perfil do Aluno Conectado */}
            {authStep === 'profile' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', padding: '1rem', borderRadius: '12px', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--track-finance), #0F172A)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                    {(studentAuth?.profile?.name || studentAuth?.user?.email || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                      {studentAuth?.profile?.name || 'Estudante BFA'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                      {studentAuth?.user?.email}
                    </div>
                  </div>
                </div>

                {/* Estatísticas Rápidas de Progresso */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700, letterSpacing: '0.04em' }}>Aulas Concluídas</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '4px' }}>
                      {completedLessons?.length || 0} <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>/ 55</span>
                    </div>
                  </div>
                  <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700, letterSpacing: '0.04em' }}>Quizzes Respondidos</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--track-finance)', marginTop: '4px' }}>
                      {Object.keys(quizScores || {}).length}
                    </div>
                  </div>
                </div>

                {/* Status de Sincronização */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--border)', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--muted-foreground)' }}>Sincronização na Nuvem:</span>
                  <span style={{ fontWeight: 750, color: studentAuth?.isSyncing ? '#38BDF8' : '#10B981', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: studentAuth?.isSyncing ? '#38BDF8' : '#10B981' }} />
                    {studentAuth?.isSyncing ? 'Sincronizando...' : 'Progresso Salvo'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (studentAuth?.signOut) studentAuth.signOut();
                      setStudentModalOpen(false);
                    }}
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#EF4444', fontWeight: 750, fontSize: '0.88rem', cursor: 'pointer' }}
                  >
                    Sair da Conta
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentModalOpen(false)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', fontWeight: 750, fontSize: '0.88rem' }}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    {/* Mobile Drawer Modal (Renderizado fora do header para evitar stacking context bugs com backdrop-filter) */}
    {mobileMenuOpen && (
      <>
        <div
          className="bfa-mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="bfa-mobile-nav-drawer">
          <div className="bfa-mobile-nav-header">
            <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800 }}>
              EXPLORAR O ATLAS
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--foreground)',
                fontSize: '1.25rem',
                cursor: 'pointer',
                padding: '0.3rem 0.6rem',
                lineHeight: 1
              }}
              aria-label="Fechar menu"
            >
              <BfaIcon name="close" size={16} />
            </button>
          </div>

          <div className="bfa-mobile-nav-content">
            {/* Grupo 0: Perfil / Acesso do Aluno */}
            <div className="bfa-mobile-nav-group" style={{ background: 'var(--surface-strong)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <a
                href="#/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'var(--foreground)' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--track-finance), #0F172A)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem' }}>
                  {studentAuth?.isAuthenticated ? (
                    (studentAuth?.profile?.name || studentAuth?.user?.email || 'A').charAt(0).toUpperCase()
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                    {studentAuth?.isAuthenticated ? (studentAuth.profile?.name || 'Meu Perfil de Aluno') : 'Entrar na Conta de Aluno'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                    {studentAuth?.isAuthenticated ? (studentAuth.isSyncing ? 'Sincronizando...' : 'Progresso Salvo na Nuvem') : 'Salvar progresso em 55 aulas'}
                  </div>
                </div>
                <span style={{ color: 'var(--muted-foreground)', fontWeight: 700 }}>→</span>
              </a>
            </div>

            {/* Grupo 1: Trilhas */}
            <div className="bfa-mobile-nav-group">
              <div className="bfa-mobile-nav-grouptitle">TRILHAS DE ESTUDO</div>
              <a href="#/matematica" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800 }}>01</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>Matemática Aplicada</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Álgebra, Finanças, Probabilidade e Estatística</div>
                </div>
                <span style={{ color: 'var(--muted-foreground)' }}>→</span>
              </a>
              <a href="#/financas" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800 }}>02</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>Finanças & Mercado</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Sistema Financeiro, Ações, FIIs e Contabilidade</div>
                </div>
                <span style={{ color: 'var(--muted-foreground)' }}>→</span>
              </a>
              <a href="#/preparacao-brhsic" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <span className="mono-tag" style={{ color: 'var(--track-brhsic)', fontWeight: 800 }}>03</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>Olimpíada BRHSIC</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Guia de Equity Research, DCF e Pitch</div>
                </div>
                <span style={{ color: 'var(--muted-foreground)' }}>→</span>
              </a>
            </div>

            {/* Grupo 2: Prática & Desafios */}
            <div className="bfa-mobile-nav-group">
              <div className="bfa-mobile-nav-grouptitle">PRÁTICA & DESAFIOS</div>
              <a href="#/exercicios" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <BfaIcon name="edit" size={18} color="var(--track-math)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>Banco de Exercícios</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Fixação de conceitos, fórmulas e problemas resolvidos</div>
                </div>
                <BfaIcon name="arrowRight" size={14} color="var(--muted-foreground)" />
              </a>
              <a href="#/conquistas" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <BfaIcon name="trophy" size={18} color="var(--gold-deep)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>Conquistas & Progresso</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Acompanhe medalhas e badges de evolução</div>
                </div>
                <BfaIcon name="arrowRight" size={14} color="var(--muted-foreground)" />
              </a>
            </div>

            {/* Grupo 3: Institucional */}
            <div className="bfa-mobile-nav-group">
              <div className="bfa-mobile-nav-grouptitle">INSTITUCIONAL</div>
              <a href="#/sobre" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <BfaIcon name="institution" size={18} color="var(--color-azul)" />
                <div style={{ flex: 1, fontWeight: 700, color: 'var(--foreground)' }}>Sobre o Atlas & Metodologia</div>
                <BfaIcon name="arrowRight" size={14} color="var(--muted-foreground)" />
              </a>
              <a href="#/noticias" onClick={() => setMobileMenuOpen(false)} className="bfa-mobile-nav-link">
                <BfaIcon name="newspaper" size={18} color="var(--track-finance)" />
                <div style={{ flex: 1, fontWeight: 700, color: 'var(--foreground)' }}>Notícias & Macroeconomia</div>
                <BfaIcon name="arrowRight" size={14} color="var(--muted-foreground)" />
              </a>
            </div>

            {/* Rodapé do Menu */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={toggleDarkLight}
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
              >
                <BfaIcon name={isDark ? "sun" : "moon"} size={15} />
                <span>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
              </button>
              <a href="#/admin/login" onClick={() => setMobileMenuOpen(false)} className="mono-tag" style={{ color: 'var(--muted-foreground)', textDecoration: 'none', fontSize: '0.75rem' }}>
                Área do Professor
              </a>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="bfa-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
        <div style={{ maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div className="site-logo__badge">BFA</div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Brasil Finanças Atlas</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
            Plataforma aberta de ensino de matemática aplicada e finanças corporativas.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--foreground)' }}>Disciplinas</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><a href="#/matematica" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Matemática Aplicada</a></li>
              <li><a href="#/financas" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Finanças & Investimentos</a></li>
              <li><a href="#/preparacao-brhsic" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Guia BRHSIC</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--foreground)' }}>Prática & Institucional</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><a href="#/exercicios" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Exercícios & Casos</a></li>
              <li><a href="#/conquistas" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Conquistas & Badges</a></li>
              <li><a href="#/sobre" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Sobre o Projeto</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bfa-container" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
        Brasil Finanças Atlas (BFA) — Plataforma Pública de Educação Financeira. Conteúdo 100% gratuito.
      </div>
    </footer>
  );
}

window.Navbar = Navbar;
window.Footer = Footer;
