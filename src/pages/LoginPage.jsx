/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Página de Autenticação Unificada (Alunos & Admin)
   Arquivo: src/pages/LoginPage.jsx
   ========================================================================== */

import React, { useState, useEffect, useContext, createContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { AdminContext } from '../context/AdminContext';
import { BfaSupabase } from '../utils/supabaseClient';

function LoginPage() {
  const { studentAuth, completedLessons, quizScores } = useContext(ProgressContext) || {};
  const adminCtx = useContext(AdminContext) || {};
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
      const sp = BfaSupabase || (typeof window !== 'undefined' ? window.BfaSupabase : null);
      if (!sp || !sp.client) {
        throw new Error('Serviço de autenticação Supabase indisponível no momento.');
      }

      const supabase = sp.client;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) throw error;

      if (sp?.savePasswordCredential) {
        sp.savePasswordCredential(email.trim(), password, name || email.trim());
      }

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
      const sp = BfaSupabase || (typeof window !== 'undefined' ? window.BfaSupabase : null);
      if (!sp || !sp.client) {
        throw new Error('Serviço de autenticação Supabase indisponível no momento.');
      }

      const supabase = sp.client;
      const localLessons = JSON.parse(localStorage.getItem('bfa_user_progress') || '[]');
      const localScores = JSON.parse(localStorage.getItem('bfa_quiz_scores') || '{}');

      const initialProgress = {
        completed_lessons: localLessons,
        quiz_scores: localScores,
        badges: ['pioneiro_atlas']
      };

      const redirectUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname + '#/confirmacao') : '';

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: redirectUrl,
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
        if (sp?.savePasswordCredential) {
          sp.savePasswordCredential(email.trim(), password, name.trim());
        }
        setSuccessMsg('Cadastro realizado com sucesso! Conectando...');
        if (studentAuth?.reloadProfile) {
          await studentAuth.reloadProfile();
        }
        setTimeout(() => {
          window.location.hash = '#/';
        }, 1000);
      } else {
        if (sp?.savePasswordCredential) {
          sp.savePasswordCredential(email.trim(), password, name.trim());
        }
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
        const res = await adminCtx.login(adminEmail.trim(), adminPassword);
        if (res && (res.success || res === true)) {
          const sp = BfaSupabase || (typeof window !== 'undefined' ? window.BfaSupabase : null);
          if (sp?.savePasswordCredential) {
            sp.savePasswordCredential(adminEmail.trim(), adminPassword, 'Administrador BFA');
          }
          setSuccessMsg('Acesso administrativo autorizado! Redirecionando para o painel...');
          setTimeout(() => {
            window.location.hash = '#/admin';
          }, 800);
          return;
        } else {
          throw new Error(res?.error || 'Credenciais de administrador inválidas.');
        }
      }
      throw new Error('Módulo administrativo indisponível.');
    } catch (err) {
      setErrorMsg(err.message || 'Falha na autenticação de administrador.');
    } finally {
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
      <div style={{ minHeight: '80vh', padding: '4rem 1rem', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800 }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {userName}
                </h1>
                <span style={{ backgroundColor: 'var(--bg-surface-blue)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  ALUNO CONECTADO
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {userEmail}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ padding: '1.5rem 1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em' }}>Aulas Feitas</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                {completedCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 55</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem 1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em' }}>Quizzes</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>
                {quizzesCount}
              </div>
            </div>

            <div style={{ padding: '1.5rem 1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em' }}>Sincronização</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: studentAuth.isSyncing ? 'var(--primary)' : 'var(--accent-green)', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: studentAuth.isSyncing ? 'var(--primary)' : 'var(--accent-green)' }} />
                {studentAuth.isSyncing ? 'Sincronizando' : 'Na Nuvem'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="#/matematica"
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', textAlign: 'center', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', justifyContent: 'center' }}
            >
              Continuar Estudando →
            </a>
            <button
              type="button"
              className="btn-secondary"
              onClick={async () => {
                if (studentAuth?.signOut) await studentAuth.signOut();
                window.location.hash = '#/';
              }}
              style={{
                width: '100%',
                padding: '1rem',
                color: '#EF4444',
                borderColor: '#EF4444',
                fontWeight: 700,
                fontSize: '1rem',
                justifyContent: 'center'
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
      <div style={{ minHeight: '80vh', padding: '4rem 1rem', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-surface-blue)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Sessão Docente / Admin Ativa
          </h2>
          <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Conectado como: <strong>{adminCtx.adminUser.name || adminCtx.adminUser.email}</strong> ({adminCtx.adminUser.role})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#/admin" className="btn-primary" style={{ padding: '1rem', justifyContent: 'center', fontSize: '1rem' }}>
              Acessar Painel de Controle CMS →
            </a>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => adminCtx.logout && adminCtx.logout()}
              style={{ padding: '1rem', color: '#EF4444', borderColor: 'transparent', justifyContent: 'center', fontSize: '1rem' }}
            >
              Sair da Conta Administrativa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', padding: '6rem 1.5rem', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '440px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="https://brhsic-main.vercel.app/brand/brhsic-lockup.png" alt="BRHSIC Academy" className="bfa-brand-img" style={{ height: '40px', width: 'auto', marginBottom: '1.5rem', display: 'inline-block' }} />
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
            {activeTab === 'student-register'
              ? 'Criar Conta de Aluno'
              : (activeTab === 'admin-login'
                  ? 'Acesso Administrativo'
                  : (activeTab === 'otp-verify' ? 'Confirmar Acesso' : 'Entrar na Plataforma'))}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            {activeTab === 'student-register'
              ? 'Salve seu progresso de 55 aulas e notas de simulados na nuvem.'
              : (activeTab === 'admin-login'
                  ? 'Painel restrito para publicação de aulas e gestão de exercícios.'
                  : (activeTab === 'otp-verify'
                      ? 'Informe o código de 6 dígitos enviado por e-mail.'
                      : 'Acesse para sincronizar seu histórico de estudos.'))}
          </p>
        </div>

        {/* Mensagens de Feedback */}
        {errorMsg && (
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--status-danger-bg, #FEF2F2)', border: '1px solid #F87171', color: 'var(--status-danger, #B91C1C)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--status-success-bg, #F0FDF4)', border: '1px solid #4ADE80', color: 'var(--status-success, #15803D)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            {successMsg}
          </div>
        )}

        {/* 3 Abas Unificadas: Aluno Entrar | Aluno Cadastro | Professor/Admin */}
        {activeTab !== 'otp-verify' && (
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => handleTabChange('student-login')}
              style={{
                flex: 1,
                padding: '0.625rem 0.5rem',
                borderRadius: 'calc(var(--radius-md) - 0.25rem)',
                border: 'none',
                backgroundColor: activeTab === 'student-login' ? 'var(--bg-app)' : 'transparent',
                color: activeTab === 'student-login' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'student-login' ? 600 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'student-login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('student-register')}
              style={{
                flex: 1,
                padding: '0.625rem 0.5rem',
                borderRadius: 'calc(var(--radius-md) - 0.25rem)',
                border: 'none',
                backgroundColor: activeTab === 'student-register' ? 'var(--bg-app)' : 'transparent',
                color: activeTab === 'student-register' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'student-register' ? 600 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'student-register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Cadastrar
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('admin-login')}
              style={{
                flex: 1,
                padding: '0.625rem 0.5rem',
                borderRadius: 'calc(var(--radius-md) - 0.25rem)',
                border: 'none',
                backgroundColor: activeTab === 'admin-login' ? 'var(--bg-app)' : 'transparent',
                color: activeTab === 'admin-login' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'admin-login' ? 600 : 500,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'admin-login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Admin
            </button>
          </div>
        )}

        {/* Hidden Iframe for Real Native Form Submission Recognition */}
        <iframe
          name="bfa_auth_iframe"
          id="bfa_auth_iframe"
          style={{ display: 'none', width: 0, height: 0, border: 0 }}
          tabIndex={-1}
          aria-hidden="true"
          src="about:blank"
          title="bfa-auth-target"
        />

        {/* 1. Formulário: Aluno Entrar */}
        {activeTab === 'student-login' && (
          <form
            target="bfa_auth_iframe"
            method="POST"
            action="about:blank"
            onSubmit={handleStudentPasswordLogin}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="bfa-student-username" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                E-mail
              </label>
              <input
                id="bfa-student-username"
                name="username"
                type="email"
                autoComplete="username"
                required
                placeholder="nome@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="bfa-student-password" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Senha
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                >
                  Acesso sem senha
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
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', justifyContent: 'center' }}
            >
              {isLoading ? 'Autenticando...' : 'Entrar na Plataforma'}
            </button>
          </form>
        )}

        {/* 2. Formulário: Aluno Cadastro */}
        {activeTab === 'student-register' && (
          <form
            target="bfa_auth_iframe"
            method="POST"
            action="about:blank"
            onSubmit={handleStudentRegister}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="bfa-register-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Nome Completo ou Apelido
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
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="bfa-register-username" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                E-mail
              </label>
              <input
                id="bfa-register-username"
                name="username"
                type="email"
                autoComplete="username"
                required
                placeholder="nome@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="bfa-register-password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Senha (mínimo 6 caracteres)
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
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', justifyContent: 'center' }}
            >
              {isLoading ? 'Criando Conta...' : 'Concluir Cadastro'}
            </button>
          </form>
        )}

        {/* 3. Formulário: Professor / Admin */}
        {activeTab === 'admin-login' && (
          <form
            target="bfa_auth_iframe"
            method="POST"
            action="about:blank"
            onSubmit={handleAdminLogin}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="bfa-admin-username" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                E-mail ou Usuário
              </label>
              <input
                id="bfa-admin-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="admin@bfa.org"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="bfa-admin-password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Chave de Acesso
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
                style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', justifyContent: 'center' }}
            >
              {isLoading ? 'Verificando permissões...' : 'Acessar Painel Admin'}
            </button>
          </form>
        )}

        {/* 4. Formulário: Validação de OTP */}
        {activeTab === 'otp-verify' && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>
                Código de 6 dígitos
              </label>
              <input
                type="text"
                required
                maxLength={8}
                placeholder="123456"
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value)}
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.25em', fontFamily: 'var(--font-mono)', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', justifyContent: 'center' }}
            >
              {isLoading ? 'Verificando...' : 'Confirmar e Conectar'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleTabChange('student-login')}
              style={{ width: '100%', padding: '0.875rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)', justifyContent: 'center', border: 'none' }}
            >
              Voltar para login com senha
            </button>
          </form>
        )}

        {/* Divisor e Opção Offline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '2rem 0', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          <span>OU</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
        </div>

        <a
          href="#/"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '0.875rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          Continuar sem Conta (Apenas Local) →
        </a>

      </div>
    </div>
  );
}

export default LoginPage;
