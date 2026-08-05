const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;
function Navbar() {
  const { currentPath, navigate } = useRouter();
  const { adminUser, logout } = useContext(AdminContext || createContext({}));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const navLinks = [
    { label: "Início", path: "/" },
    { label: "Matemática", path: "/matematica", color: "var(--color-verde)" },
    { label: "Finanças", path: "/financas", color: "var(--color-azul)" },
    { label: "BRHSIC", path: "/preparacao-brhsic" },
    { label: "Exercícios", path: "/exercicios" },
    { label: "Notícias", path: "/noticias" },
    { label: "Cronograma", path: "/cronograma" },
    { label: "Sobre", path: "/sobre" },
  ];

  return (
    <header className="bfa-navbar">
      <div className="bfa-navbar__container">
        <a href="#/" className="bfa-navbar__logo">
          <div className="bfa-logo__icon">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="#1B6B3A" />
              <path d="M12 28L20 12L28 28H12Z" fill="#C8963E" />
              <circle cx="20" cy="22" r="4" fill="#1B3A5C" />
            </svg>
          </div>
          <div className="bfa-logo__text">
            <EditableBlock id="navbar-logo-title" as="span" className="bfa-logo__title">Brasil Finanças Atlas</EditableBlock>
            <EditableBlock id="navbar-logo-subtitle" as="span" className="bfa-logo__subtitle">Escola Dragão do Mar</EditableBlock>
          </div>
        </a>

        <nav className={`bfa-navbar__links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                className={`bfa-nav__link ${isActive ? 'active' : ''}`}
                style={isActive && link.color ? { borderBottomColor: link.color, color: link.color } : {}}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}

          {adminUser ? (
            <div className="bfa-nav__admin-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ouro bfa-btn--sm"
                onClick={() => setShowSyncModal(true)}
                title="Publicar alterações in-context no GitHub e Netlify"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
              >
                🚀 Publicar no GitHub
              </button>
              <a href="#/admin" className="bfa-btn bfa-btn--admin">
                <BfaIcon name="gear" size={15} style={{ marginRight: '6px' }} /> Admin ({adminUser.username})
              </a>
              <button onClick={logout} className="bfa-btn-text" title="Sair do Admin">
                <BfaIcon name="logout" size={16} />
              </button>
            </div>
          ) : (
            <a href="#/admin/login" className="bfa-nav__link bfa-nav__link--admin">
              <BfaIcon name="lock" size={14} style={{ marginRight: '6px' }} /> Admin
            </a>
          )}
        </nav>

        <GitHubSyncModal isOpen={showSyncModal} onClose={() => setShowSyncModal(false)} />

        <button 
          className="bfa-navbar__toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bfa-footer">
      <div className="bfa-footer__container">
        <div className="bfa-footer__brand">
          <EditableBlock id="footer-logo-title" as="div" className="bfa-logo__title" style={{ color: '#fff', fontSize: '1.2rem' }}>
            Brasil Finanças Atlas
          </EditableBlock>
          <EditableBlock id="footer-desc" as="p" className="bfa-footer__desc">
            Plataforma aberta de educação financeira e matemática aplicada para estudantes do ensino médio.
            Nascida no Núcleo de Inteligência Financeira (NIF) da Escola Dragão do Mar em Fortaleza, CE.
          </EditableBlock>
        </div>

        <div className="bfa-footer__links">
          <div>
            <h4>Trilhas</h4>
            <ul>
              <li><a href="#/matematica">Matemática Aplicada</a></li>
              <li><a href="#/financas">Finanças & Investimentos</a></li>
              <li><a href="#/preparacao-brhsic">Competição BRHSIC</a></li>
              <li><a href="#/exercicios">Hub de Exercícios</a></li>
            </ul>
          </div>
          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#/noticias">Notícias do Mercado</a></li>
              <li><a href="#/cronograma">Gerador de Cronograma</a></li>
              <li><a href="#/sobre">Sobre o Projeto</a></li>
              <li><a href="#/admin/login">Área do Professor (Admin)</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bfa-footer__bottom">
        <EditableBlock id="footer-copy" as="p">© 2026 Brasil Finanças Atlas. Conteúdo teórico 100% gratuito e aberto.</EditableBlock>
      </div>
    </footer>
  );
}
