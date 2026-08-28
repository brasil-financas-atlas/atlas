const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Navbar() {
  const { currentPath } = useRouter();
  const { adminUser, isAdmin, logout, publicarConteudo, statusPublicacao, erroPublicacao, currentTheme, setTheme: setContextTheme } =
    useContext(AdminContext || createContext({}));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

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
    { label: "Matemática Aplicada", path: "/matematica" },
    { label: "Finanças & Investimentos", path: "/financas" },
    { label: "Preparação BRHSIC", path: "/preparacao-brhsic" },
    { label: "Recursos & Cronograma", path: "/cronograma" },
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

        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Botão de Alternância Dark/Light */}
          <button
            type="button"
            onClick={toggleDarkLight}
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

          {adminUser ? (
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
              <a href="#/admin" className="nav-link active">
                Admin ({adminUser.name || adminUser.email})
              </a>
              <button onClick={logout} className="nav-link" title="Sair">
                Sair
              </button>
            </div>
          ) : (
            <a href="#/admin/login" className="btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Admin
            </a>
          )}
        </div>

      </div>
    </header>
    {MarketTicker && <MarketTicker />}
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
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--foreground)' }}>Ferramentas</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><a href="#/cronograma" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Simulador & Cronograma</a></li>
              <li><a href="#/exercicios" style={{ color: 'var(--muted-foreground)', textDecoration: 'none' }}>Exercícios & Casos</a></li>
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
