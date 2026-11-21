import BfaIcon from './Icons';
import React, { useState, useEffect } from 'react';


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
    <div className="bfa-cookie-banner" role="region" aria-label="Aviso de privacidade">
      <div className="bfa-cookie-banner__head">
        <BfaIcon name="shield" size={18} color="var(--track-finance)" />
        <h4>Privacidade & LGPD</h4>
      </div>
      <p className="bfa-cookie-banner__text">
        <span className="bfa-cookie-banner__long">
          Utilizamos armazenamento local apenas para salvar seu progresso nas aulas e preferências da plataforma, sem rastreamento comercial de terceiros.
        </span>
        <span className="bfa-cookie-banner__short">Salvamos seu progresso só neste aparelho, sem rastreamento.</span>
      </p>
      <div className="bfa-cookie-banner__actions">
        <button type="button" onClick={handleDecline} className="bfa-btn bfa-btn--ghost bfa-btn--sm">
          <span className="bfa-cookie-banner__long">Apenas Essenciais</span>
          <span className="bfa-cookie-banner__short">Essenciais</span>
        </button>
        <button type="button" onClick={handleAccept} className="bfa-btn bfa-btn--verde bfa-btn--sm">
          <span className="bfa-cookie-banner__long">Aceitar & Salvar Progresso</span>
          <span className="bfa-cookie-banner__short">Aceitar</span>
        </button>
      </div>
    </div>
  );
}


export default CookieConsent;
