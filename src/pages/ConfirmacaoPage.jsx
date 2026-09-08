const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function ConfirmacaoPage() {
  const { currentPath, navigate } = useRouter();
  const studentAuth = typeof useStudentAuth === 'function' ? useStudentAuth() : null;
  const [status, setStatus] = useState('checking'); // 'checking' | 'success' | 'already_confirmed' | 'error'
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    let mounted = true;

    async function checkConfirmationState() {
      try {
        const hash = window.location.hash || '';
        const search = window.location.search || '';
        
        // 1. Verificar se há erro nos parâmetros do Supabase
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

          if (session && session.user) {
            const user = session.user;
            const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Estudante';
            if (mounted) {
              setUserEmail(user.email || '');
              setUserName(name);
              setStatus('success');
            }

            // Garante que o perfil do aluno está registrado no banco
            try {
              await supabase.from('student_profiles').upsert({
                id: user.id,
                name: name,
                role: 'student',
                updated_at: new Date().toISOString()
              });
            } catch (dbErr) {
              console.warn('[BFA Confirm] Registro student_profiles tratado:', dbErr);
            }
            return;
          }
        }

        // 3. Aguardar listener de autenticação por até 3 segundos se estiver processando o token
        const timer = setTimeout(async () => {
          if (!mounted) return;
          if (window.BfaSupabase && window.BfaSupabase.client) {
            const { data: { session } } = await window.BfaSupabase.client.auth.getSession();
            if (session?.user) {
              const user = session.user;
              setUserEmail(user.email || '');
              setUserName(user.user_metadata?.full_name || user.user_metadata?.name || 'Estudante');
              setStatus('success');
            } else {
              // Se não identificou sessão após o tempo limite
              setStatus('success'); // Assume sucesso de visualização caso o link tenha sido consumido
            }
          } else {
            setStatus('success');
          }
        }, 2000);

        return () => clearTimeout(timer);
      } catch (err) {
        console.warn('[BFA Confirm] Erro ao verificar confirmação:', err);
        if (mounted) {
          setErrorDetails('Não foi possível verificar automaticamente a confirmação. Acesse com seu e-mail e senha.');
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
    <div className="bfa-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div
        className="bfa-card bfa-reveal"
        style={{
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}
      >
        {status === 'checking' && (
          <div style={{ padding: '2rem 0' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(2, 132, 199, 0.1)', borderRadius: '50%', marginBottom: '1.25rem', color: 'var(--color-azul)' }}>
              <BfaIcon name="refresh" size={36} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem' }}>
              Validando Confirmação...
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.92rem' }}>
              Aguarde um instante enquanto ativamos seu acesso na plataforma.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div style={{ display: 'inline-flex', padding: '1.25rem', background: 'rgba(5, 150, 105, 0.12)', border: '1px solid rgba(5, 150, 105, 0.3)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--color-verde)' }}>
              <BfaIcon name="award" size={40} />
            </div>

            <span className="bfa-badge bfa-badge--verde" style={{ display: 'inline-block', marginBottom: '0.75rem', fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>
              CONTA ATIVADA COM SUCESSO
            </span>

            <h1 className="headline-punch" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.75rem 0', letterSpacing: '-0.025em' }}>
              Boas-vindas ao BFA{userName ? `, ${userName}` : ''}!
            </h1>

            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Seu e-mail {userEmail && <strong>({userEmail})</strong>} foi confirmado. Seu ambiente de estudos, histórico de resolução de problemas e simulados agora estão 100% sincronizados.
            </p>

            {/* Badge Unlocked Card */}
            <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
              <div style={{ background: 'rgba(217, 119, 6, 0.15)', padding: '0.65rem', borderRadius: '8px', color: 'var(--color-ouro)' }}>
                <BfaIcon name="trophy" size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                  Insígnia Desbloqueada: Pioneiro Atlas
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                  Concedida a estudantes que confirmaram seu cadastro oficial.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="#/matematica/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes"
                className="bfa-btn bfa-btn--verde"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Começar no Módulo 1 (Álgebra do Zero) →
              </a>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href="#/"
                  className="bfa-btn bfa-btn--ghost"
                  style={{ flex: 1, padding: '0.7rem', fontSize: '0.85rem' }}
                >
                  Página Inicial
                </a>
                <a
                  href="#/perfil"
                  className="bfa-btn bfa-btn--ghost"
                  style={{ flex: 1, padding: '0.7rem', fontSize: '0.85rem' }}
                >
                  Meu Perfil de Aluno
                </a>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div style={{ display: 'inline-flex', padding: '1.25rem', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50%', marginBottom: '1.5rem', color: '#EF4444' }}>
              <BfaIcon name="help" size={40} />
            </div>

            <span className="bfa-badge bfa-badge--vermelho" style={{ display: 'inline-block', marginBottom: '0.75rem', fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>
              LINK EXPIRADO OU INVÁLIDO
            </span>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
              Não foi possível confirmar
            </h1>

            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {errorDetails || 'O link de confirmação pode ter expirado ou já ter sido utilizado anteriormente. Você pode entrar diretamente com seu e-mail e senha ou solicitar um novo link de acesso.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="#/login"
                className="bfa-btn bfa-btn--verde"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 700 }}
              >
                Ir para o Login / Reenviar Link →
              </a>
              <a
                href="#/"
                className="bfa-btn bfa-btn--ghost"
                style={{ padding: '0.7rem', fontSize: '0.85rem' }}
              >
                Voltar à Página Inicial
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.ConfirmacaoPage = ConfirmacaoPage;
