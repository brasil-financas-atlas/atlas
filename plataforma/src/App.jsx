const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function GlassmorphismToggle() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('bfa_glassmorphism_preview') === 'true';
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('bfa-glassmorphism-active');
    } else {
      document.documentElement.classList.remove('bfa-glassmorphism-active');
    }
    localStorage.setItem('bfa_glassmorphism_preview', enabled ? 'true' : 'false');
  }, [enabled]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 99999,
      backgroundColor: enabled ? 'rgba(15, 23, 42, 0.92)' : '#0F172A',
      color: '#FFFFFF',
      padding: '0.55rem 0.95rem',
      borderRadius: '9999px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.82rem',
      fontWeight: 600,
      backdropFilter: 'blur(10px)',
      userSelect: 'none',
      transition: 'all 0.2s ease'
    }}>
      <span>✨ Efeito 4 (Vidro Fosco):</span>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        style={{
          backgroundColor: enabled ? '#10B981' : '#475569',
          color: '#FFFFFF',
          border: 'none',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          fontWeight: 700,
          cursor: 'pointer',
          fontSize: '0.75rem',
          transition: 'all 0.2s ease'
        }}
      >
        {enabled ? 'ON (Ativo)' : 'OFF (Desativado)'}
      </button>
    </div>
  );
}

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
      {/* A checagem nao e paranoia: como o Babel roda no navegador e cada
          componente e um <script> separado, QUALQUER script que nao carregue
          derruba a aplicacao toda com "X is not defined" — e bloqueador de
          anuncio derruba script por causa do NOME do arquivo. Ja aconteceu
          aqui: o arquivo se chamava CookieConsent.jsx, o Brave recusou a
          requisicao, e o site inteiro virou tela de erro.
          Com a checagem, o pior caso passa a ser "o aviso nao aparece". */}
      {typeof AvisoPrivacidade !== 'undefined' && <AvisoPrivacidade />}
    </div>
  );
}
