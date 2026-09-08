/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Página de Autenticação Unificada (Alunos & Admin)
   Arquivo: src/pages/LoginPage.jsx
   ========================================================================== */

const { useState, useEffect, useContext, createContext } = React;

function LoginPage() {
  const { studentAuth, completedLessons, quizScores } = useContext(window.ProgressContext || createContext({}));
  const adminCtx = useContext(window.AdminContext || createContext({}));
  const [activeTab, setActiveTab] = useState('student-login'); // 'student-login' | 'student-register' | 'admin-login' | 'otp-verify'
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  
  // Admin form fields
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

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

  // Login de Aluno com E-mail e Senha
  const handleStudentPasswordLogin = async (e) => {
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

      setSuccessMsg('Login realizado com sucesso! Sincronizando seu progresso...');
      if (studentAuth?.reloadProfile) {
        await studentAuth.reloadProfile();
      }

      setTimeout(() => {
        window.location.hash = '#/';
      }, 1000);
    } catch (err) {
      console.warn('[BFA Login] Erro no login do aluno:', err);
      let msg = err.message || 'Falha ao autenticar.';
      if (msg.includes('Invalid login credentials')) {
        msg = 'E-mail ou senha incorretos. Verifique suas credenciais ou use o acesso sem senha via OTP.';
      }
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Cadastro de Novo Aluno
  const handleStudentRegister = async (e) => {
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
            name: name.trim(),
            full_name: name.trim()
          }
        }
      });

      if (error) throw error;

      if (data?.user) {
        // 1. Tenta salvar na tabela compacta student_profiles
        try {
          await supabase.from('student_profiles').upsert({
            id: data.user.id,
            name: name.trim(),
            role: 'student',
            progress: initialProgress,
            updated_at: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn('[BFA DB] student_profiles ignorado ou gerenciado por trigger:', dbErr?.message);
        }

        // 2. Tenta salvar também na tabela profiles tradicional (role: student)
        try {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email: email.trim(),
            full_name: name.trim(),
            role: 'student',
            updated_at: new Date().toISOString()
          });
        } catch (pErr) {
          console.warn('[BFA DB] profiles ignorado ou gerenciado por trigger:', pErr?.message);
        }
      }

      if (data?.session) {
        setSuccessMsg('Cadastro realizado com sucesso! Conectando...');
        if (studentAuth?.reloadProfile) {
          await studentAuth.reloadProfile();
        }
        setTimeout(() => {
          window.location.hash = '#/';
        }, 1000);
      } else {
        setSuccessMsg('Conta de aluno criada com sucesso! Caso a confirmação de e-mail esteja ativada no seu Supabase, verifique sua caixa de entrada para confirmar o acesso.');
        setTimeout(() => {
          setActiveTab('student-login');
        }, 2500);
      }
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

  // Login de Professor / Administrador
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setErrorMsg('Informe o e-mail/usuário e senha do administrador.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (adminCtx?.login) {
        const ok = await adminCtx.login(adminEmail.trim(), adminPassword);
        if (ok) {
          setSuccessMsg('Acesso administrativo autorizado! Redirecionando para o painel...');
          setTimeout(() => {
            window.location.hash = '#/admin';
          }, 800);
          return;
        }
      }
      throw new Error('Credenciais de administrador inválidas.');
    } catch (err) {
      setErrorMsg(err.message || 'Falha na autenticação de administrador.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login Social via OAuth (Google, Apple, Facebook, GitHub)
  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      if (!window.BfaSupabase || !window.BfaSupabase.isConfigured()) {
        throw new Error('Serviço de autenticação Supabase indisponível no momento.');
      }
      const res = await window.BfaSupabase.signInWithOAuth(provider);
      if (!res.success) {
        throw new Error(res.error || `Erro ao iniciar autenticação com ${provider}`);
      }
    } catch (err) {
      console.warn(`[BFA OAuth Login] Erro ao autenticar com ${provider}:`, err);
      let msg = err.message || 'Falha ao autenticar.';
      if (msg.includes('provider is not enabled') || msg.includes('disabled') || msg.includes('Unsupported provider')) {
        msg = `O login com ${provider.toUpperCase()} precisa ser habilitado no painel do Supabase (Authentication -> Providers).`;
      }
      setErrorMsg(msg);
      setIsLoading(false);
    }
  };

  // Envio de Código OTP para Aluno
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
        setSuccessMsg(`Código de acesso enviado para ${email}. Verifique seu e-mail.`);
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

  // Validação de OTP
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
        setSuccessMsg('Código validado com sucesso! Conectando...');
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

  // Se o aluno já estiver logado
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
                  ALUNO CONECTADO
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                {userEmail}
              </p>
            </div>
          </div>

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
              Sair da Conta de Aluno
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Se o professor/admin já estiver conectado
  if (adminCtx?.isAuthenticated && adminCtx?.adminUser) {
    return (
      <div style={{ minHeight: '80vh', padding: '4rem 1rem', background: 'var(--background)' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(5, 150, 105, 0.12)', color: '#059669', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <BfaIcon name="check" size={28} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--foreground)' }}>
            Sessão Docente / Admin Ativa
          </h2>
          <p style={{ margin: '0.5rem 0', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
            Conectado como: <strong>{adminCtx.adminUser.name || adminCtx.adminUser.email}</strong> ({adminCtx.adminUser.role})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem' }}>
            <a href="#/admin" className="btn-primary" style={{ padding: '0.85rem', justifyContent: 'center' }}>
              Acessar Painel de Controle CMS →
            </a>
            <button
              type="button"
              onClick={() => adminCtx.logout && adminCtx.logout()}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: '#EF4444', fontWeight: 700, cursor: 'pointer' }}
            >
              Sair da Conta Administrativa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', padding: '4rem 1.5rem', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.1)' }}>
        
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #059669 0%, #0F172A 100%)', color: '#FFFFFF', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)' }}>
            BFA
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em', margin: 0 }}>
            {activeTab === 'student-register'
              ? 'Criar Conta de Aluno'
              : (activeTab === 'admin-login'
                  ? 'Acesso de Professor / Admin'
                  : (activeTab === 'otp-verify' ? 'Confirmar Código de Acesso' : 'Entrar na Plataforma'))}
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.5 }}>
            {activeTab === 'student-register'
              ? 'Salve seu progresso de 55 aulas e notas de simulados na nuvem.'
              : (activeTab === 'admin-login'
                  ? 'Painel restrito para publicação de aulas e gestão de exercícios.'
                  : (activeTab === 'otp-verify'
                      ? 'Informe o código de 6 dígitos enviado por e-mail.'
                      : 'Acesse para sincronizar seu histórico em qualquer dispositivo.'))}
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

        {/* 3 Abas Unificadas: Aluno Entrar | Aluno Cadastro | Professor/Admin */}
        {activeTab !== 'otp-verify' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', background: 'var(--surface-strong)', padding: '4px', borderRadius: '10px', marginBottom: '1.75rem', border: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => handleTabChange('student-login')}
              style={{
                padding: '0.55rem 0.3rem',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'student-login' ? 'var(--card)' : 'transparent',
                color: activeTab === 'student-login' ? 'var(--foreground)' : 'var(--muted-foreground)',
                fontWeight: activeTab === 'student-login' ? 750 : 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'student-login' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Aluno: Entrar
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('student-register')}
              style={{
                padding: '0.55rem 0.3rem',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'student-register' ? 'var(--card)' : 'transparent',
                color: activeTab === 'student-register' ? 'var(--foreground)' : 'var(--muted-foreground)',
                fontWeight: activeTab === 'student-register' ? 750 : 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'student-register' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Criar Conta
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('admin-login')}
              style={{
                padding: '0.55rem 0.3rem',
                borderRadius: '7px',
                border: 'none',
                background: activeTab === 'admin-login' ? 'var(--card)' : 'transparent',
                color: activeTab === 'admin-login' ? 'var(--track-math)' : 'var(--muted-foreground)',
                fontWeight: activeTab === 'admin-login' ? 750 : 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'admin-login' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Professor/Admin
            </button>
          </div>
        )}

        {/* 1. Formulário: Aluno Entrar */}
        {activeTab === 'student-login' && (
          <form onSubmit={handleStudentPasswordLogin} method="post" action="#">
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="bfa-student-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                E-mail do Aluno:
              </label>
              <input
                id="bfa-student-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label htmlFor="bfa-student-password" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)' }}>
                  Senha:
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{ background: 'transparent', border: 'none', color: 'var(--track-finance)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Entrar sem senha (OTP)
                </button>
              </div>
              <input
                id="bfa-student-password"
                name="password"
                type="password"
                autoComplete="current-password"
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

        {/* 2. Formulário: Aluno Cadastro */}
        {activeTab === 'student-register' && (
          <form onSubmit={handleStudentRegister} method="post" action="#">
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="bfa-register-name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                Nome Completo ou Apelido:
              </label>
              <input
                id="bfa-register-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Ex: Carlos Eduardo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="bfa-register-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                E-mail:
              </label>
              <input
                id="bfa-register-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="bfa-register-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                Senha (mínimo 6 caracteres):
              </label>
              <input
                id="bfa-register-password"
                name="password"
                type="password"
                autoComplete="new-password"
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

        {/* Opções de Login Social (OAuth) para Alunos */}
        {(activeTab === 'student-login' || activeTab === 'student-register') && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.75rem 0', color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span>Ou acesse com sua conta</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="bfa-btn"
                title="Acessar com Google"
                style={{
                  background: 'var(--surface-strong)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  padding: '0.6rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <BfaIcon name="google" size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
                className="bfa-btn"
                title="Acessar com Apple"
                style={{
                  background: 'var(--surface-strong)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  padding: '0.6rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <BfaIcon name="apple" size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
                className="bfa-btn"
                title="Acessar com GitHub"
                style={{
                  background: 'var(--surface-strong)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  padding: '0.6rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <BfaIcon name="github" size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                className="bfa-btn"
                title="Acessar com Facebook"
                style={{
                  background: 'var(--surface-strong)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  padding: '0.6rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <BfaIcon name="facebook" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 3. Formulário: Professor / Admin */}
        {activeTab === 'admin-login' && (
          <form onSubmit={handleAdminLogin} method="post" action="#">
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="bfa-admin-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                E-mail ou Usuário de Administrador:
              </label>
              <input
                id="bfa-admin-email"
                name="email"
                type="text"
                autoComplete="username"
                required
                placeholder="admin@bfa.org ou usuario"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="bfa-admin-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                Chave de Acesso / Senha:
              </label>
              <input
                id="bfa-admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: 750, borderRadius: '8px', marginBottom: '1.25rem', backgroundColor: 'var(--track-math)' }}
            >
              {isLoading ? 'Verificando permissões...' : 'Acessar Painel do Professor'}
            </button>
          </form>
        )}

        {/* 4. Formulário: Validação de OTP */}
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
              {isLoading ? 'Verificando...' : 'Confirmar e Conectar'}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('student-login')}
              style={{ width: '100%', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--muted-foreground)', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Voltar para login com senha
            </button>
          </form>
        )}

        {/* Divisor e Opção Offline */}
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
