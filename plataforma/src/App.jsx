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

      const targets = document.querySelectorAll('.module-card, .tool-card, .bfa-card, .bfa-quiz, .bfa-forum, .bfa-reveal, .bfa-tech-card');
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

    // Design Lab Variations
    if (currentPath === '/galeria') {
      const Gallery = window.VariationsGallery || Home;
      return <Gallery />;
    }

    if (currentPath === '/v1') {
      const V1 = window.HomeV1 || Home;
      return <V1 />;
    }

    if (currentPath === '/v2') {
      const V2 = window.HomeV2 || Home;
      return <V2 />;
    }

    if (currentPath === '/v3') {
      const V3 = window.HomeV3 || Home;
      return <V3 />;
    }

    if (currentPath === '/v4') {
      const V4 = window.HomeV4 || Home;
      return <V4 />;
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
  const Switcher = window.VariationSwitcher;

  return (
    <div className="bfa-app-root">
      <Navbar />
      <div className="bfa-app-body">
        {renderCurrentPage()}
      </div>
      {!isAulaRoute && <Footer />}
      <CookieConsent />
      {Switcher && <Switcher />}
    </div>
  );
}

window.App = App;
