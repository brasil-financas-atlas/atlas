const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Navbar() {
  const { currentPath } = useRouter();
  const { adminUser, isAdmin, logout, publicarConteudo, statusPublicacao, erroPublicacao } =
    useContext(AdminContext || createContext({}));
  const [theme, setTheme] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    ["theme-executive", "theme-minimal", "dark-obsidian", "dark"].forEach((t) => root.classList.remove(t));
    if (theme) root.classList.add(theme);
  }, [theme]);

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

        <div className="navbar-actions">
          {adminUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Publicar não pede credencial nenhuma: quem autoriza é a
                  política do banco, com base no papel da conta logada. */}
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
                  {statusPublicacao === 'publicado' && '✓ Publicado'}
                  {statusPublicacao === 'erro' && '⚠ Erro ao publicar'}
                  {(statusPublicacao === 'idle' || !statusPublicacao) && 'Publicar'}
                </button>
              )}
              <a href="#/admin" className="nav-link active">
                Admin ({adminUser.name || adminUser.email})
              </a>
              <button onClick={logout} className="nav-link" title="Sair">
                ✕
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
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.75rem' }}>Trilhas</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><a href="#/matematica" className="nav-link" style={{ padding: 0 }}>Matemática Aplicada</a></li>
              <li><a href="#/financas" className="nav-link" style={{ padding: 0 }}>Finanças & Investimentos</a></li>
              <li><a href="#/preparacao-brhsic" className="nav-link" style={{ padding: 0 }}>Competição BRHSIC</a></li>
            </ul>
          </div>

          <div>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.75rem' }}>Recursos</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><a href="#/exercicios" className="nav-link" style={{ padding: 0 }}>Hub de Exercícios</a></li>
              <li><a href="#/noticias" className="nav-link" style={{ padding: 0 }}>Notícias Macro</a></li>
              <li><a href="#/admin/login" className="nav-link" style={{ padding: 0 }}>Área do Professor</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bfa-container" style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>© 2026 Brasil Finanças Atlas · 100% Gratuito</span>
        <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>BUILD ZERO-DEPENDENCY · GIT-AS-A-CMS</span>
      </div>
    </footer>
  );
}

window.Navbar = Navbar;
window.Footer = Footer;
