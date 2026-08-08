const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Navbar() {
  const { currentPath } = useRouter();
  const { adminUser, logout } = useContext(AdminContext || createContext({}));
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    ["theme-executive", "theme-minimal", "dark-obsidian", "dark"].forEach((t) => root.classList.remove(t));
    if (theme) root.classList.add(theme);
  }, [theme]);

  const navLinks = [
    { label: "Matemática Aplicada", path: "/matematica" },
    { label: "Finanças & Investimentos", path: "/financas" },
    { label: "Preparação BRHSIC", path: "/preparacao-brhsic" },
    { label: "Simuladores", path: "/cronograma" },
    { label: "Exercícios", path: "/exercicios" },
    { label: "Notícias", path: "/noticias" },
    { label: "Sobre", path: "/sobre" },
  ];

  return (
    <header className="site-header">
      <div className="site-header__container">
        <a href="#/" className="site-logo">
          <div className="site-logo__badge">BFA</div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--foreground)' }}>
              Brasil Finanças Atlas
            </span>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>
              NIF — EEMTI Dragão do Mar
            </span>
          </div>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto' }}>
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
          {/* Seletor de Tema */}
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }}
          >
            <option value="">Classic Institucional</option>
            <option value="theme-executive">Executive B3</option>
            <option value="theme-minimal">Khan Minimalist</option>
            <option value="dark-obsidian">Dark Obsidian</option>
          </select>

          {adminUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setShowSyncModal(true)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              >
                🚀 Publicar
              </button>
              <a href="#/admin" className="nav-link active">
                Admin ({adminUser.username})
              </a>
              <button onClick={logout} className="nav-link" title="Sair">
                ✕
              </button>
            </div>
          ) : (
            <a href="#/admin/login" className="btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              🔒 Admin
            </a>
          )}
        </div>

        <GitHubSyncModal isOpen={showSyncModal} onClose={() => setShowSyncModal(false)} />
      </div>
    </header>
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
            A infraestrutura aberta de conhecimento financeiro e matemática aplicada. Iniciativa pedagógica pública da escola EEMTI Dragão do Mar em Fortaleza, CE.
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
