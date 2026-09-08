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

    if (
      currentPath === '/simulador-carteira' ||
      currentPath === '/simulador' ||
      currentPath === '/simulados' ||
      currentPath === '/calculadora-juros-compostos' ||
      currentPath === '/calculadora' ||
      currentPath === '/cronograma'
    ) {
      return (
        <div className="bfa-section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="bfa-section__container bfa-text-center" style={{ maxWidth: '640px', margin: '3rem auto', padding: '3rem 2rem', background: 'var(--card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <span className="mono-tag" style={{ color: 'var(--gold-deep)', background: 'rgba(217, 119, 6, 0.1)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
              EM DESENVOLVIMENTO
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.1rem', fontWeight: 800, marginTop: '1rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Ferramenta em Fase de Calibração
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.75rem', marginBottom: '2rem' }}>
              Este recurso interativo está passando por calibração de modelos e será disponibilizado nas próximas atualizações da plataforma.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#/" className="bfa-btn bfa-btn--primary-solid" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                Página Inicial →
              </a>
              <a href="#/exercicios" className="bfa-btn bfa-btn--secondary-glass" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                Ver Banco de Exercícios →
              </a>
            </div>
          </div>
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

    if (currentPath === '/sobre') {
      return <Sobre />;
    }

    if (currentPath === '/login' || currentPath === '/auth' || currentPath === '/perfil' || currentPath === '/minha-conta') {
      return <LoginPage />;
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
