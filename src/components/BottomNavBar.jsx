const { useState, useEffect, useContext, useMemo } = React;

function BottomNavBar() {
  const { currentPath, navigate } = useRouter();
  const { isHidden } = (window.useScrollDirection ? window.useScrollDirection(15) : { isHidden: false });
  const { hapticTap } = (window.useHaptics ? window.useHaptics() : { hapticTap: () => {} });
  const [toolsSheetOpen, setToolsSheetOpen] = useState(false);

  const isActive = (targetPath) => {
    if (targetPath === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (targetPath !== '/' && currentPath.startsWith(targetPath)) return true;
    return false;
  };

  const handleNavClick = (path) => {
    hapticTap();
    if (path === 'tools') {
      setToolsSheetOpen(true);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toolsList = [
    {
      title: 'Calculadora de Juros Compostos',
      desc: 'Simule investimentos periódicos e rentabilidade real',
      icon: '📈',
      path: '/calculadora-juros-compostos'
    },
    {
      title: 'Simulador de Carteira & Risco',
      desc: 'Monte seu portfólio e analise correlação de ativos',
      icon: '💼',
      path: '/simulador-carteira'
    },
    {
      title: 'Simulados & Provas Interativas',
      desc: 'Teste seu conhecimento com questões cronometradas',
      icon: '⏱️',
      path: '/simulados'
    },
    {
      title: 'Feed de Notícias & Macro',
      desc: 'Acompanhe Selic, IPCA, Dólar e atualizações financeiras',
      icon: '📰',
      path: '/noticias'
    }
  ];

  return (
    <>
      <nav
        className={`bfa-bottom-nav ${isHidden ? 'bfa-bottom-nav--hidden' : ''}`}
        aria-label="Navegação inferior mobile"
      >
        <button
          className={`bfa-bottom-nav__item ${isActive('/') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/')}
          aria-label="Início"
        >
          <span className="bfa-bottom-nav__icon">🏠</span>
          <span className="bfa-bottom-nav__label">Início</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${isActive('/matematica') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/matematica')}
          aria-label="Trilha de Matemática"
        >
          <span className="bfa-bottom-nav__icon">📐</span>
          <span className="bfa-bottom-nav__label">Matemática</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${isActive('/financas') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/financas')}
          aria-label="Trilha de Finanças"
        >
          <span className="bfa-bottom-nav__icon">💰</span>
          <span className="bfa-bottom-nav__label">Finanças</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${toolsSheetOpen ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('tools')}
          aria-label="Ferramentas Interativas"
        >
          <span className="bfa-bottom-nav__icon">🧮</span>
          <span className="bfa-bottom-nav__label">Ferramentas</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${isActive('/progresso') || isActive('/conquistas') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/progresso')}
          aria-label="Meu Progresso e Conquistas"
        >
          <span className="bfa-bottom-nav__icon">🏆</span>
          <span className="bfa-bottom-nav__label">Progresso</span>
        </button>
      </nav>

      {/* Bottom Sheet de Ferramentas */}
      <BottomSheet
        isOpen={toolsSheetOpen}
        onClose={() => setToolsSheetOpen(false)}
        title="Ferramentas Interativas"
        subtitle="Simuladores, calculadoras e instrumentos de estudo"
      >
        <div className="bfa-tools-sheet-grid">
          {toolsList.map((tool, idx) => (
            <button
              key={idx}
              className="bfa-tools-sheet-card"
              onClick={() => {
                hapticTap();
                setToolsSheetOpen(false);
                navigate(tool.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="bfa-tools-sheet-card__icon">{tool.icon}</div>
              <div className="bfa-tools-sheet-card__info">
                <div className="bfa-tools-sheet-card__title">{tool.title}</div>
                <div className="bfa-tools-sheet-card__desc">{tool.desc}</div>
              </div>
              <span className="bfa-tools-sheet-card__arrow">➔</span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}

window.BottomNavBar = BottomNavBar;
