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

    // Check dynamic routes /:subjectKey/:moduloSlug/:aulaSlug
    const parts = currentPath.split('/').filter(Boolean);
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
            Ir para a Página Inicial ➔
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
      <CookieConsent />
    </div>
  );
}
