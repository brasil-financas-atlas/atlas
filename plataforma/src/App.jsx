const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function App() {
  const { currentPath } = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bfa-visible');
          }
        });
      }, { threshold: 0.05 });

      const targets = document.querySelectorAll('.module-card, .tool-card, .bfa-card, .bfa-quiz, .bfa-forum, .bfa-reveal');
      targets.forEach(el => {
        el.classList.add('bfa-reveal');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPath]);

  // Match Routes
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <Home />;
    }

    if (currentPath === '/matematica') {
      return <DisciplinaOverview subjectKey="matematica" />;
    }

    if (currentPath === '/financas') {
      return <DisciplinaOverview subjectKey="financas" />;
    }

    if (currentPath === '/preparacao-brhsic') {
      return <BrhsicPage />;
    }

    if (currentPath === '/simulador-carteira' || currentPath === '/simulador') {
      return (
        <div>
          <section className="hero-gradient" style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
            <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
            <div className="bfa-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <span className="mono-tag" style={{ color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(251, 191, 36, 0.35)', fontWeight: 800 }}>
                OLIMPÍADA DE FINANÇAS · BRHSIC
              </span>
              <h1 className="headline-punch" style={{ fontSize: '2.75rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.75rem', letterSpacing: '-0.03em' }}>
                Simulador de Alocação de Carteira
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '0.5rem', maxWidth: '720px', margin: '0.5rem auto 0 auto' }}>
                Modele aportes, balanceamento entre 6 classes de ativos do mercado brasileiro, projeção de renda passiva mensal e cálculo de Sharpe da carteira.
              </p>
            </div>
          </section>
          <SimuladorCarteiraInvestimentos />
        </div>
      );
    }

    if (currentPath === '/simulados') {
      return (
        <div>
          <section className="hero-gradient" style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
            <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
            <div className="bfa-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 800 }}>
                TREINAMENTO OFICIAL DE PROVAS
              </span>
              <h1 className="headline-punch" style={{ fontSize: '2.75rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.75rem', letterSpacing: '-0.03em' }}>
                Simulados com Cronômetro BRHSIC
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '0.5rem', maxWidth: '720px', margin: '0.5rem auto 0 auto' }}>
                Resolva baterias de questões cronometradas por fase (Nível 1, Fase Final e Prova Geral) com pontuação instantânea e gabarito passo a passo.
              </p>
            </div>
          </section>
          <SimuladosEngine />
        </div>
      );
    }

    if (currentPath === '/ranking') {
      return <RankingLeaderboard />;
    }

    if (currentPath === '/conquistas') {
      return <BadgesConquistas />;
    }

    if (currentPath === '/exercicios') {
      return <Exercicios />;
    }

    if (currentPath === '/noticias') {
      return <Noticias />;
    }

    if (currentPath === '/cronograma') {
      return <Cronograma />;
    }

    if (currentPath === '/sobre') {
      return <Sobre />;
    }

    if (currentPath === '/admin/login') {
      return <AdminLogin />;
    }

    if (currentPath === '/admin') {
      return <AdminDashboard />;
    }

    // Dynamic Route: Introdução ao Módulo (/:subjectKey/:moduloSlug)
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length === 2 && (parts[0] === 'matematica' || parts[0] === 'financas')) {
      return (
        <ModuloIntroPage
          subjectKey={parts[0]}
          moduloSlug={parts[1]}
        />
      );
    }

    // Dynamic Route: Aula (/:subjectKey/:moduloSlug/:aulaSlug)
    if (parts.length === 3 && (parts[0] === 'matematica' || parts[0] === 'financas')) {
      return (
        <AulaPage
          subjectKey={parts[0]}
          moduloSlug={parts[1]}
          aulaSlug={parts[2]}
        />
      );
    }

    // Default 404 / Fallback
    return (
      <div className="bfa-section">
        <div className="bfa-section__container bfa-text-center">
          <h2>Página não encontrada</h2>
          <a href="#/" className="bfa-btn bfa-btn--verde" style={{ marginTop: '1rem' }}>
            Ir para a Página Inicial →
          </a>
        </div>
      </div>
    );
  };

  const isAulaRoute = currentPath.split('/').filter(Boolean).length === 3;

  return (
    <div className="bfa-app-root">
      <Navbar />
      <div className="bfa-app-body">
        {renderCurrentPage()}
      </div>
      {!isAulaRoute && <Footer />}
      {window.FloatingAudioBar && <FloatingAudioBar />}
      <CookieConsent />
    </div>
  );
}

window.App = App;
