const { useState, useEffect } = React;

function ConfirmacaoPage() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'success' | 'error'
  const [userEmail, setUserEmail] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    let mounted = true;

    async function checkConfirmationState() {
      try {
        const hash = window.location.hash || '';
        const search = window.location.search || '';

        // 1. Verificar erro na URL
        if (hash.includes('error_description=') || search.includes('error_description=')) {
          const urlParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : hash.substring(1));
          const errorDesc = urlParams.get('error_description') || 'O link de confirmação expirou ou é inválido.';
          if (mounted) {
            setErrorDetails(decodeURIComponent(errorDesc.replace(/\+/g, ' ')));
            setStatus('error');
          }
          return;
        }

        // 2. Verificar sessão ativa no Supabase
        if (window.BfaSupabase && window.BfaSupabase.client) {
          const supabase = window.BfaSupabase.client;
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user && mounted) {
            setUserEmail(session.user.email || '');
            setStatus('success');
            return;
          }
        }

        // 3. Fallback de verificação
        const timer = setTimeout(async () => {
          if (!mounted) return;
          if (window.BfaSupabase && window.BfaSupabase.client) {
            const { data: { session } } = await window.BfaSupabase.client.auth.getSession();
            if (session?.user) {
              setUserEmail(session.user.email || '');
              setStatus('success');
            } else {
              setStatus('success');
            }
          } else {
            setStatus('success');
          }
        }, 1200);

        return () => clearTimeout(timer);
      } catch (err) {
        if (mounted) {
          setErrorDetails('Não foi possível verificar automaticamente. Acesse com seu e-mail e senha.');
          setStatus('error');
        }
      }
    }

    checkConfirmationState();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
        
        {status === 'checking' && (
          <div>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--color-azul)', borderRadius: '50%', margin: '0 auto 1.5rem auto', animation: 'spin 0.8s linear infinite' }}></div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
              Confirmando...
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Validando seu endereço de e-mail.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            {/* Ícone Minimalista de Sucesso */}
            <div style={{ width: '52px', height: '52px', background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', color: '#059669' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              E-mail confirmado
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.75rem 0' }}>
              Sua conta no Brasil Finanças Atlas está ativa{userEmail ? ` para ${userEmail}` : ''}.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="#/matematica/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes"
                className="bfa-btn bfa-btn--verde"
                style={{ width: '100%', padding: '0.75rem 1.25rem', fontSize: '0.92rem', fontWeight: 700, textDecoration: 'none', borderRadius: '8px' }}
              >
                Acessar plataforma
              </a>

              <a
                href="#/"
                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.4rem' }}
              >
                Ir para a página inicial
              </a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            {/* Ícone Minimalista de Erro */}
            <div style={{ width: '52px', height: '52px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', color: '#EF4444' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              Link expirado
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.75rem 0' }}>
              {errorDetails || 'O link de confirmação não é mais válido. Entre com seu e-mail e senha para acessar.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="#/login"
                className="bfa-btn bfa-btn--verde"
                style={{ width: '100%', padding: '0.75rem 1.25rem', fontSize: '0.92rem', fontWeight: 700, textDecoration: 'none', borderRadius: '8px' }}
              >
                Fazer login
              </a>

              <a
                href="#/"
                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.4rem' }}
              >
                Ir para a página inicial
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

window.ConfirmacaoPage = ConfirmacaoPage;
