const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;
const BfaIcon = window.BfaIcon || (() => null);

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
      <header className="site-header">
      <div className="site-header__container">
        <a href="#/" className="site-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="https://brhsic-main.vercel.app/brand/brhsic-lockup.png" alt="BRHSIC" style={{ height: '32px', width: 'auto' }} />
        </a>

        {/* Global Search Bar with Autocomplete */}
        <div className="navbar-search" style={{ position: 'relative', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Buscar aula..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {searchOpen && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              zIndex: 9999,
              maxHeight: '65vh',
              overflowY: 'auto'
            }}>
              {searchResults.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <strong style={{ display: 'block' }}>{item.aulaTitle}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.subjectTitle} · {item.moduloTitle}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="nav-links">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                className="nav-link"
                style={{
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Link para o site oficial */}
          <a
            href="https://brhsic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Portal BRHSIC ↗
          </a>

          {/* Botão de Autenticação / Perfil do Aluno */}
          {studentAuth && studentAuth.isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                setAuthStep('profile');
                setStudentModalOpen(true);
              }}
              className="btn-secondary"
              title="Meu Perfil"
              style={{ padding: '0.4rem 0.8rem' }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: studentAuth.isSyncing ? 'var(--primary)' : '#10B981'
              }} />
              <span>
                {studentAuth.profile?.name || studentAuth.user?.email?.split('@')[0] || 'Aluno'}
              </span>
            </button>
          ) : (
            <a
              href="#/login"
              className="btn-primary"
            >
              Entrar / Cadastrar
            </a>
          )}

          {/* Botão Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-secondary bfa-mobile-nav-toggle"
            aria-label="Abrir menu"
            style={{ padding: '0.5rem' }}
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
      <div className="footer__container">
        <div>
          <div className="footer__manifesto">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="var(--primary)"/>
                <path d="M7 7H11C13.2091 7 15 8.79086 15 11C15 13.2091 13.2091 15 11 15H7V7Z" fill="white"/>
                <path d="M7 11H13C14.1046 11 15 11.8954 15 13C15 14.1046 14.1046 15 13 15H7V11Z" fill="white"/>
                <rect x="7" y="7" width="2" height="10" fill="white"/>
              </svg>
              <span style={{ color: 'var(--primary)' }}>BRHSIC</span> 
              <span style={{ fontWeight: 400, opacity: 0.85 }}>Academy</span>
            </div>
            Processo importa mais do que resultado.
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '300px' }}>
            Educação financeira gratuita, feita por jovens e multiplicada por todo o Brasil. A plataforma de estudo oficial da BRHSIC.
          </p>
        </div>

        <div className="footer__nav">
          <h4>Trilhas Educacionais</h4>
          <ul>
            <li><a href="#/matematica">Matemática Financeira</a></li>
            <li><a href="#/financas">Mercado de Capitais</a></li>
            <li><a href="#/preparacao-brhsic">Guia Oficial BRHSIC</a></li>
          </ul>
        </div>

        <div className="footer__nav">
          <h4>Ecossistema</h4>
          <ul>
            <li><a href="https://brhsic.com" target="_blank" rel="noreferrer">Competição BRHSIC ↗</a></li>
            <li><a href="https://brhsic-academy.vercel.app" target="_blank" rel="noreferrer">Rede Academy (NIFs) ↗</a></li>
            <li><a href="https://wa.me/5551995654746" target="_blank" rel="noreferrer">Falar com a Academy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__container" style={{ marginTop: 0 }}>
        <div className="footer__bottom" style={{ width: '100%' }}>
          <div>
            © 2026 BRHSIC Academy · Conteúdo educacional aberto e gratuito.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>Voltar ao topo ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Navbar = Navbar;
window.Footer = Footer;

