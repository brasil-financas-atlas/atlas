import { useScrollDirection, useHaptics } from '../utils/touchGestures';
import BottomSheet from './BottomSheet';
import BfaIcon from './Icons';
import { useRouter } from '../router';
import React, { useState, useEffect, useContext, useMemo } from 'react';


function BottomNavBar() {
  const { currentPath, navigate } = useRouter();
  const { isHidden } = (useScrollDirection(15));
  const { hapticTap } = (useHaptics());
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
      title: 'Banco de Exercícios',
      desc: 'Fixação de conceitos, fórmulas e problemas com gabarito',
      iconName: 'edit',
      path: '/exercicios'
    },
    {
      title: 'Guia Olímpico BRHSIC',
      desc: 'Metodologia de análise, valuation DCF e pitch de ações',
      iconName: 'trophy',
      path: '/preparacao-brhsic'
    },
    {
      title: 'Conquistas & Badges',
      desc: 'Acompanhe seu avanço em 55 aulas com medalhas',
      iconName: 'award',
      path: '/conquistas'
    },
    {
      title: 'Sobre o Projeto BFA',
      desc: 'Nossa missão, metodologia e material 100% gratuito',
      iconName: 'institution',
      path: '/sobre'
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
          <span className="bfa-bottom-nav__icon">
            <BfaIcon name="home" size={20} />
          </span>
          <span className="bfa-bottom-nav__label">Início</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${isActive('/matematica') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/matematica')}
          aria-label="Trilha de Matemática"
        >
          <span className="bfa-bottom-nav__icon">
            <BfaIcon name="math" size={20} />
          </span>
          <span className="bfa-bottom-nav__label">Matemática</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${isActive('/financas') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/financas')}
          aria-label="Trilha de Finanças"
        >
          <span className="bfa-bottom-nav__icon">
            <BfaIcon name="finance" size={20} />
          </span>
          <span className="bfa-bottom-nav__label">Finanças</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${toolsSheetOpen ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('tools')}
          aria-label="Ferramentas Interativas"
        >
          <span className="bfa-bottom-nav__icon">
            <BfaIcon name="calculator" size={20} />
          </span>
          <span className="bfa-bottom-nav__label">Ferramentas</span>
        </button>

        <button
          className={`bfa-bottom-nav__item ${isActive('/progresso') || isActive('/conquistas') ? 'bfa-bottom-nav__item--active' : ''}`}
          onClick={() => handleNavClick('/progresso')}
          aria-label="Meu Progresso e Conquistas"
        >
          <span className="bfa-bottom-nav__icon">
            <BfaIcon name="trophy" size={20} />
          </span>
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
              <div className="bfa-tools-sheet-card__icon">
                <BfaIcon name={tool.iconName} size={24} color="var(--ring)" />
              </div>
              <div className="bfa-tools-sheet-card__info">
                <div className="bfa-tools-sheet-card__title">{tool.title}</div>
                <div className="bfa-tools-sheet-card__desc">{tool.desc}</div>
              </div>
              <span className="bfa-tools-sheet-card__arrow">
                <BfaIcon name="arrowRight" size={16} />
              </span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}


export default BottomNavBar;
