const { useState, useEffect } = React;

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bfa_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('bfa_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('bfa_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 99998,
        maxWidth: '420px',
        backgroundColor: 'var(--card)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 15px 35px -5px rgba(15, 23, 42, 0.25)',
        fontFamily: 'var(--font-sans)',
        animation: 'fadeInUp 0.4s ease-out forwards'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <BfaIcon name="shield" size={18} color="var(--track-finance)" />
        <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--foreground)' }}>
          Privacidade & LGPD
        </h4>
      </div>
      <p style={{ fontSize: '0.84rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: '1rem' }}>
        Utilizamos armazenamento local apenas para salvar seu progresso nas aulas e preferências da plataforma, sem rastreamento comercial de terceiros.
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleDecline}
          className="bfa-btn bfa-btn--ghost bfa-btn--sm"
          style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
        >
          Apenas Essenciais
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="bfa-btn bfa-btn--verde bfa-btn--sm"
          style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
        >
          Aceitar & Salvar Progresso
        </button>
      </div>
    </div>
  );
}

window.CookieConsent = CookieConsent;
