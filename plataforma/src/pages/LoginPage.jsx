/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Página de Autenticação e Perfil do Aluno
   Arquivo: src/pages/LoginPage.jsx
   ========================================================================== */

const { useState, useEffect, useContext, createContext } = React;

function LoginPage() {
  const { studentAuth, completedLessons, quizScores } = useContext(window.ProgressContext || createContext({}));
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'otp'
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Limpa mensagens ao trocar de aba
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Login com E-mail e Senha
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor, informe seu e-mail e senha.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!window.BfaSupabase || !window.BfaSupabase.client) {
        throw new Error('Serviço de autenticação Supabase indisponível no momento.');
      }

      const supabase = window.BfaSupabase.client;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) throw error;

      setSuccessMsg('Login realizado com sucesso! Sincronizando progresso...');
      if (studentAuth?.reloadProfile) {
        await studentAuth.reloadProfile();
      }

      setTimeout(() => {
        window.location.hash = '#/';
      }, 1000);
    } catch (err) {
      console.warn('[BFA Login] Erro no login com senha:', err);
      let msg = err.message || 'Falha ao autenticar.';
      if (msg.includes('Invalid login credentials')) {
        msg = 'E-mail ou senha incorretos. Verifique suas credenciais ou use o código de acesso por e-mail.';
      }
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Cadastro de Novo Aluno
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!window.BfaSupabase || !window.BfaSupabase.client) {
        throw new Error('Serviço de autenticação Supabase indisponível no momento.');
      }

      const supabase = window.BfaSupabase.client;
      
      // Captura progresso local existente para não perder nada ao criar a conta
      const localLessons = JSON.parse(localStorage.getItem('bfa_user_progress') || '[]');
      const localScores = JSON.parse(localStorage.getItem('bfa_quiz_scores') || '{}');

      const initialProgress = {
        completed_lessons: localLessons,
        quiz_scores: localScores,
        badges: ['pioneiro_atlas']
      };

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            name: name.trim()
          }
        }
      });

      if (error) throw error;

      // Se o usuário foi criado, tenta garantir a linha em student_profiles
      if (data?.user) {
        try {
          await supabase.from('student_profiles').upsert({
            id: data.user.id,
            name: name.trim(),
            role: 'student',
            progress: initialProgress,
            updated_at: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn('[BFA DB] Trigger já provisionou ou erro controlado:', dbErr);
        }
      }

      setSuccessMsg('Cadastro realizado com sucesso! Você já está conectado.');
      if (studentAuth?.reloadProfile) {
        await studentAuth.reloadProfile();
      }

      setTimeout(() => {
        window.location.hash = '#/';
      }, 1200);
    } catch (err) {
      console.warn('[BFA Register] Erro no cadastro:', err);
      let msg = err.message || 'Falha ao criar conta.';
      if (msg.includes('User already registered')) {
        msg = 'Este e-mail já está cadastrado. Por favor, faça login.';
      }
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Login via Link Mágico / Código OTP (Passwordless)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Por favor, informe seu e-mail.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (studentAuth?.signInWithEmail) {
        await studentAuth.signInWithEmail(email.trim(), name.trim());
        setSuccessMsg(`Código de acesso enviado para ${email}. Verifique sua caixa de entrada.`);
        setActiveTab('otp-verify');
      } else {
        throw new Error('Módulo de autenticação indisponível.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao enviar código de acesso.');
    } finally {
      setIsLoading(false);
    }
  };

  // Validação do Código OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpToken.trim()) {
      setErrorMsg('Por favor, informe o código de 6 dígitos.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (studentAuth?.verifyOtpCode) {
        await studentAuth.verifyOtpCode(email.trim(), otpToken.trim());
        setSuccessMsg('Código validado! Conectando...');
        setTimeout(() => {
          window.location.hash = '#/';
        }, 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Código inválido ou expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  // Se o aluno já estiver conectado, exibe a tela de Perfil com Métricas
  if (studentAuth && studentAuth.isAuthenticated) {
    const userName = studentAuth.profile?.name || studentAuth.user?.email?.split('@')[0] || 'Estudante';
    const userEmail = studentAuth.user?.email || '';
    const completedCount = completedLessons?.length || 0;
    const quizzesCount = Object.keys(quizScores || {}).length;

    return (
      <div style={{ minHeight: '80vh', padding: '4rem 1rem', background: 'var(--background)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--track-finance), #0F172A)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)' }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>
                  {userName}
                </h1>
                <span className="mono-tag" style={{ background: 'rgba(5, 150, 105, 0.12)', color: 'var(--track-finance)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>
                  CONECTADO
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                {userEmail}
              </p>
            </div>
          </div>

          {/* Grid de Estatísticas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.15rem 1rem', background: 'var(--surface-strong)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700, letterSpacing: '0.04em' }}>Aulas Feitas</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '4px' }}>
                {completedCount} <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>/ 55</span>
              </div>
            </div>

            <div style={{ padding: '1.15rem 1rem', background: 'var(--surface-strong)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700, letterSpacing: '0.04em' }}>Quizzes</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--track-finance)', marginTop: '4px' }}>
                {quizzesCount}
              </div>
            </div>

            <div style={{ padding: '1.15rem 1rem', background: 'var(--surface-strong)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontWeight: 700, letterSpacing: '0.04em' }}>Sincronização</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 750, color: studentAuth.isSyncing ? '#38BDF8' : '#10B981', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: studentAuth.isSyncing ? '#38BDF8' : '#10B981' }} />
                {studentAuth.isSyncing ? 'Sincronizando' : 'Na Nuvem'}
              </div>
            </div>
          </div>

          {/* Ações de Continuação e Logout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <a
              href="#/matematica"
              className="bfa-btn bfa-btn--primary-solid"
              style={{ padding: '0.85rem', textAlign: 'center', textDecoration: 'none', fontWeight: 750, fontSize: '0.95rem' }}
            >
              Continuar Estudando →
            </a>
            <button
              type="button"
              onClick={async () => {
                if (studentAuth?.signOut) await studentAuth.signOut();
                window.location.hash = '#/';
              }}
              style={{
                padding: '0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.06)',
                color: '#EF4444',
                fontWeight: 750,
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Sair da Conta (Logout)
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', padding: '4rem 1.5rem', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '460px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.1)' }}>
        
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #059669 0%, #0F172A 100%)', color: '#FFFFFF', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)' }}>
            BFA
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em', margin: 0 }}>
            {activeTab === 'register' ? 'Criar Conta de Aluno' : (activeTab === 'otp-verify' ? 'Código de Confirmação' : 'Acessar o Atlas')}
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            {activeTab === 'register'
              ? 'Cadastre-se para sincronizar seu progresso de 55 aulas e quizzes em qualquer dispositivo.'
              : (activeTab === 'otp-verify'
                  ? `Informe o código de 6 dígitos enviado para seu e-mail.`
                  : 'Entre para manter seu histórico de estudos salvo na nuvem.')}
          </p>
        </div>

        {/* Mensagens de Feedback */}
        {errorMsg && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {successMsg}
          </div>
        )}

        {/* Abas Alternáveis */}
        {activeTab !== 'otp-verify' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'var(--surface-strong)', padding: '4px', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => handleTabChange('login')}
              style={{
                padding: '0.6rem',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'login' ? 'var(--card)' : 'transparent',
                color: activeTab === 'login' ? 'var(--foreground)' : 'var(--muted-foreground)',
                fontWeight: activeTab === 'login' ? 750 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'login' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Entrar na Conta
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('register')}
              style={{
                padding: '0.6rem',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'register' ? 'var(--card)' : 'transparent',
                color: activeTab === 'register' ? 'var(--foreground)' : 'var(--muted-foreground)',
                fontWeight: activeTab === 'register' ? 750 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'register' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Criar Nova Conta
            </button>
          </div>
        )}

        {/* Formulário: Login com Senha */}
        {activeTab === 'login' && (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                E-mail:
              </label>
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)' }}>
                  Senha:
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{ background: 'transparent', border: 'none', color: 'var(--track-finance)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Acessar sem senha (OTP)
                </button>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 750, borderRadius: '8px', marginBottom: '1.25rem' }}
            >
              {isLoading ? 'Autenticando...' : 'Entrar na Minha Conta'}
            </button>
          </form>
        )}

        {/* Formulário: Cadastro */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                Nome Completo ou Apelido:
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Eduardo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                E-mail:
              </label>
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                Senha (mínimo 6 caracteres):
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 750, borderRadius: '8px', marginBottom: '1.25rem' }}
            >
              {isLoading ? 'Criando Conta...' : 'Concluir Cadastro Gratuito'}
            </button>
          </form>
        )}

        {/* Formulário: Verificação de OTP */}
        {activeTab === 'otp-verify' && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem', textAlign: 'center' }}>
                Código de 6 dígitos:
              </label>
              <input
                type="text"
                required
                maxLength={8}
                placeholder="123456"
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value)}
                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '0.25em', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 750, borderRadius: '8px', marginBottom: '0.75rem' }}
            >
              {isLoading ? 'Verificando...' : 'Confirmar Código'}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('login')}
              style={{ width: '100%', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--muted-foreground)', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Voltar para login com senha
            </button>
          </form>
        )}

        {/* Divisor e Opção Offline / Local */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0', color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span>OU</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <a
          href="#/"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--surface-strong)',
            color: 'var(--foreground)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            transition: 'all 0.15s ease'
          }}
        >
          Continuar sem Conta (Progresso Apenas Local) →
        </a>

      </div>
    </div>
  );
}

window.LoginPage = LoginPage;
