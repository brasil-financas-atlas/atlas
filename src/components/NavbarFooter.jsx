import MarketTickerRibbon from './MarketTickerRibbon';
import { EXACT_CONTENT } from '../data/contentData';
import BfaIcon from './Icons';
import { useRouter } from '../router';
import { ProgressContext } from '../context/ProgressContext';
import { AdminContext } from '../context/AdminContext';
import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';



function Navbar() {
  const { studentAuth, completedLessons, quizScores } = useContext(ProgressContext);
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
    useContext(AdminContext);
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
    const content = EXACT_CONTENT;
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

  // Apenas as trilhas principais ficam visiveis no cabecalho.
  // Todo o resto (Sobre, Noticias, Portal, tema, admin) vive no menu lateral.
  const navLinks = [
    { label: "Matemática", path: "/matematica" },
    { label: "Finanças", path: "/financas" },
    { label: "BRHSIC", path: "/preparacao-brhsic" },
    { label: "Exercícios", path: "/exercicios" },
  ];

  // Menu lateral: so o que nao cabe (ou nao precisa estar) no topo.
  const menuSections = [
    {
      title: 'Estudar',
      links: [
        { label: 'Matemática', path: '/matematica', icon: 'nav-math' },
        { label: 'Finanças', path: '/financas', icon: 'nav-finance' },
        { label: 'Preparação BRHSIC', path: '/preparacao-brhsic', icon: 'nav-brhsic' },
        { label: 'Exercícios', path: '/exercicios', icon: 'nav-exercises' },
      ],
    },
    {
      title: 'Plataforma',
      links: [
        { label: 'Notícias', path: '/noticias', icon: 'nav-news' },
        { label: 'Sobre o Atlas', path: '/sobre', icon: 'nav-info' },
      ],
    },
  ];

  const publishLabel =
    statusPublicacao === 'publicando' ? 'Publicando...' :
    statusPublicacao === 'publicado' ? 'Publicado' :
    statusPublicacao === 'erro' ? 'Erro ao publicar' : 'Publicar';

  const isAulaRoute = currentPath.split('/').filter(Boolean).length === 3;

  const isAuthenticated = !!(studentAuth && studentAuth.isAuthenticated);
  const userInitial = (studentAuth?.profile?.name || studentAuth?.user?.email || 'A').charAt(0).toUpperCase();
  const searchInputRef = useRef(null);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const openProfile = () => {
    setAuthStep('profile');
    setStudentModalOpen(true);
  };

  // Atalhos: "/" ou Ctrl+K abrem a busca, Esc fecha busca e menu.
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable);
      if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        setMobileMenuOpen(false);
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // Fecha busca e menu ao trocar de pagina.
  useEffect(() => {
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <>
      <header className="site-header">
      <div className="site-header__container">
        <a href="#/" className="site-logo" aria-label="Página inicial">
          <img src="https://brhsic-main.vercel.app/brand/brhsic-lockup.png" alt="BRHSIC" className="site-logo__img" />
        </a>

        <nav className="nav-links" aria-label="Trilhas principais">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="nav-icon-btn"
            onClick={() => { setMobileMenuOpen(false); searchOpen ? closeSearch() : setSearchOpen(true); }}
            aria-label="Buscar aula"
            aria-expanded={searchOpen}
            title="Buscar aula (atalho: /)"
          >
            <BfaIcon name={searchOpen ? "close" : "search"} size={18} />
          </button>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={openProfile}
              className="nav-avatar-btn"
              title="Meu perfil"
              aria-label="Abrir meu perfil"
            >
              {userInitial}
              <span
                className="nav-avatar-btn__status"
                style={{ backgroundColor: studentAuth.isSyncing ? 'var(--primary)' : '#10B981' }}
              />
            </button>
          ) : (
            <a href="#/login" className="btn-primary nav-login-btn">
              Entrar
            </a>
          )}

          <button
            type="button"
            onClick={() => { setSearchOpen(false); setMobileMenuOpen(!mobileMenuOpen); }}
            className="nav-icon-btn"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            title="Menu"
          >
            <BfaIcon name={mobileMenuOpen ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {/* Painel de busca: abre abaixo do cabecalho, em qualquer tamanho de tela */}
      {searchOpen && (
        <div className="nav-search-panel" role="search">
          <div className="nav-search-panel__inner">
            <input
              ref={searchInputRef}
              type="search"
              className="nav-search-panel__input"
              placeholder="Buscar aula por nome, módulo ou trilha..."
              aria-label="Buscar aula"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchResults[0]) {
                  window.location.hash = searchResults[0].url;
                  closeSearch();
                }
              }}
            />
            {searchQuery.trim() && (
              <div className="nav-search-panel__results">
                {searchResults.length === 0 && (
                  <div className="nav-search-panel__empty">Nenhuma aula encontrada para "{searchQuery}".</div>
                )}
                {searchResults.map((item) => (
                  <a key={item.url} href={item.url} onClick={closeSearch} className="nav-search-panel__result">
                    <strong>{item.aulaTitle}</strong>
                    <span>{item.subjectTitle} · {item.moduloTitle}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    {searchOpen && <div className="nav-search-backdrop" onClick={closeSearch} />}

    
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
              color: 'var(--text-primary)'
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
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
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
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
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
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
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
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
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
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
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
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', fontSize: '1.1rem', textAlign: 'center', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}
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
                    style={{ width: '100%', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer' }}
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
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {studentAuth?.user?.email}
                    </div>
                  </div>
                </div>

                {/* Estatísticas Rápidas de Progresso */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.04em' }}>Aulas Concluídas</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {completedLessons?.length || 0} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ 55</span>
                    </div>
                  </div>
                  <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--surface-strong)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.04em' }}>Quizzes Respondidos</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--track-finance)', marginTop: '4px' }}>
                      {Object.keys(quizScores || {}).length}
                    </div>
                  </div>
                </div>

                {/* Status de Sincronização */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--border)', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Sincronização na Nuvem:</span>
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

    {/* Menu lateral (fora do header para evitar bugs de stacking context com backdrop-filter) */}
    {mobileMenuOpen && (
      <>
        <div className="bfa-mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <aside className="side-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="side-menu__header">
            <span className="side-menu__title">Menu</span>
            <button type="button" className="nav-icon-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu">
              <BfaIcon name="close" size={18} />
            </button>
          </div>

          <div className="side-menu__body">
            <a
              href="#/login"
              className="side-menu__account"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (isAuthenticated) {
                  e.preventDefault();
                  openProfile();
                }
              }}
            >
              <span className="side-menu__avatar">
                {isAuthenticated ? userInitial : <BfaIcon name="nav-user" size={18} />}
              </span>
              <span className="side-menu__account-text">
                <strong>{isAuthenticated ? (studentAuth.profile?.name || 'Meu perfil') : 'Entrar ou criar conta'}</strong>
                <small>
                  {isAuthenticated
                    ? (studentAuth.isSyncing ? 'Sincronizando...' : 'Progresso salvo na nuvem')
                    : 'Salve seu progresso em qualquer aparelho'}
                </small>
              </span>
            </a>

            {menuSections.map((section) => (
              <nav key={section.title} className="side-menu__section" aria-label={section.title}>
                <div className="side-menu__label">{section.title}</div>
                {section.links.map((link) => {
                  const active = currentPath === link.path || currentPath.startsWith(link.path + '/');
                  return (
                    <a
                      key={link.path}
                      href={`#${link.path}`}
                      className={`side-menu__link${active ? ' side-menu__link--active' : ''}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BfaIcon name={link.icon} size={18} />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            ))}

            {adminUser && (
              <div className="side-menu__section">
                <div className="side-menu__label">Administração</div>
                {isAdmin && (
                  <button
                    type="button"
                    className="side-menu__link"
                    onClick={publicarConteudo}
                    disabled={statusPublicacao === 'publicando'}
                    title={erroPublicacao || 'Publicar as alterações para todos os visitantes'}
                  >
                    <BfaIcon name="nav-publish" size={18} />
                    <span>{publishLabel}</span>
                  </button>
                )}
                <a href="#/admin" className="side-menu__link" onClick={() => setMobileMenuOpen(false)}>
                  <BfaIcon name="nav-dashboard" size={18} />
                  <span>Painel admin</span>
                </a>
              </div>
            )}
          </div>

          <div className="side-menu__footer">
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              className="side-menu__theme"
              onClick={toggleDarkLight}
            >
              <BfaIcon name={isDark ? 'moon' : 'sun'} size={16} />
              <span>Modo escuro</span>
              <span className="side-menu__switch" aria-hidden="true" />
            </button>
            <div className="side-menu__footer-links">
              <a href="https://brhsic.com/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                Portal BRHSIC <BfaIcon name="nav-external" size={12} />
              </a>
              {!adminUser && (
                <a href="#/admin/login" onClick={() => setMobileMenuOpen(false)}>Área do professor</a>
              )}
            </div>
          </div>
        </aside>
      </>
    )}

    {/* Atalhos de admin fora das aulas (nas aulas a AulaPage tem a propria barra) */}
    {adminUser && !isAulaRoute && (
      <div className="admin-quick-bar" role="toolbar" aria-label="Atalhos de administração">
        <span className="admin-quick-bar__dot" aria-hidden="true" />
        <span className="admin-quick-bar__label">Admin</span>
        {isAdmin && (
          <button
            type="button"
            className="admin-quick-bar__btn"
            onClick={publicarConteudo}
            disabled={statusPublicacao === 'publicando'}
            title={erroPublicacao || 'Publicar as alterações para todos os visitantes'}
          >
            <BfaIcon name="nav-publish" size={14} />
            <span>{publishLabel}</span>
          </button>
        )}
        <a href="#/admin" className="admin-quick-bar__btn" title="Painel admin">
          <BfaIcon name="nav-dashboard" size={14} />
          <span>Painel</span>
        </a>
      </div>
    )}
    </>
  );
}

function Footer() {
  const { currentTheme, setTheme } = useContext(AdminContext);
  const isDark = currentTheme === 'dark-obsidian' || currentTheme === 'dark';
  const toggleTheme = () => setTheme && setTheme(isDark ? 'brasil-atlas' : 'dark-obsidian');

  return (
    <footer className="site-footer">
      <div className="footer__container">
        <div>
          <div className="footer__manifesto">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              <img src="https://brhsic-main.vercel.app/brand/brhsic-lockup.png" alt="BRHSIC" className="site-footer__logo" style={{ height: '28px', width: 'auto' }} />
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
            <li><a href="#/exercicios">Banco de Exercícios</a></li>
          </ul>
        </div>

        <div className="footer__nav">
          <h4>Plataforma</h4>
          <ul>
            <li><a href="#/noticias">Notícias</a></li>
            <li><a href="#/sobre">Sobre o Atlas</a></li>
            <li><a href="#/admin/login">Área do Professor</a></li>
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
            © 2026 BRHSIC Academy · Conteúdo educacional aberto e gratuito · Desenvolvido por David Ferro
          </div>
          <div className="footer__bottom-actions">
            <button type="button" className="footer__theme-btn" onClick={toggleTheme} aria-pressed={isDark}>
              <BfaIcon name={isDark ? 'sun' : 'moon'} size={14} />
              <span>{isDark ? 'Modo claro' : 'Modo escuro'}</span>
            </button>
            <a href="#/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>Voltar ao topo ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}




export { Footer };
export default Navbar;
