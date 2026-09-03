/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Hook de Autenticação e Sincronização Local-First
   Arquivo: src/utils/useStudentAuth.js
   ========================================================================== */

const { useState, useEffect, useRef, useCallback } = React;

function useStudentAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'saved' | 'error'

  const debounceTimerRef = useRef(null);
  const pendingProgressRef = useRef(null);

  // Inicializa e monitora o estado da sessão Supabase
  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        if (!window.BfaSupabase || !window.BfaSupabase.client) {
          if (mounted) setIsLoading(false);
          return;
        }

        const supabase = window.BfaSupabase.client;
        const { data } = await supabase.auth.getSession();
        const session = data?.session;

        if (session && session.user && mounted) {
          setUser(session.user);
          await loadStudentProfile(session.user.id);
        }
      } catch (err) {
        console.warn('[BFA Auth] Erro ao recuperar sessão:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initSession();

    // Listener de mudança de autenticação
    let authListener = null;
    if (window.BfaSupabase && window.BfaSupabase.client) {
      try {
        const { data } = window.BfaSupabase.client.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;
          if (session && session.user) {
            setUser(session.user);
            await loadStudentProfile(session.user.id);
          } else {
            setUser(null);
            setProfile(null);
          }
        });
        authListener = data?.subscription;
      } catch (err) {
        console.warn('[BFA Auth] Listener de auth indisponível:', err);
      }
    }

    return () => {
      mounted = false;
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Carrega e mescla o perfil do banco com os dados do LocalStorage
  const loadStudentProfile = async (userId) => {
    if (!window.BfaSupabase || !window.BfaSupabase.client || !userId) return;
    try {
      const supabase = window.BfaSupabase.client;
      const { data, error } = await supabase
        .from('student_profiles')
        .select('id, name, role, streak_days, progress')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('[BFA Auth] Perfil ainda não inicializado ou erro:', error?.message);
        return;
      }

      if (data) {
        setProfile(data);
        if (data.progress) {
          mergeLocalWithRemoteProgress(data.progress);
        }
      }
    } catch (err) {
      console.warn('[BFA Auth] Exceção ao carregar perfil:', err);
    }
  };

  // Mescla dados do LocalStorage com o banco remoto
  const mergeLocalWithRemoteProgress = (remoteProgress) => {
    try {
      const localLessons = JSON.parse(localStorage.getItem('bfa_user_progress') || '[]');
      const localScores = JSON.parse(localStorage.getItem('bfa_quiz_scores') || '{}');

      const remoteLessons = remoteProgress?.completed_lessons || [];
      const remoteScores = remoteProgress?.quiz_scores || {};

      // União de aulas concluídas sem duplicatas
      const mergedLessons = Array.from(new Set([...localLessons, ...remoteLessons]));

      // Mesclagem de pontuações preservando a maior nota
      const mergedScores = { ...remoteScores };
      Object.keys(localScores).forEach((key) => {
        mergedScores[key] = Math.max(mergedScores[key] || 0, localScores[key] || 0);
      });

      // Atualiza LocalStorage
      localStorage.setItem('bfa_user_progress', JSON.stringify(mergedLessons));
      localStorage.setItem('bfa_quiz_scores', JSON.stringify(mergedScores));

      // Dispara evento de sincronização para os contextos React
      window.dispatchEvent(new CustomEvent('bfa_progress_updated', {
        detail: { completedLessons: mergedLessons, quizScores: mergedScores }
      }));
    } catch (e) {
      console.warn('[BFA Auth] Erro na mesclagem de progresso:', e);
    }
  };

  // Envia progresso para o Supabase com Debounce de 3 segundos
  const syncProgressDebounced = useCallback((newCompletedLessons, newQuizScores, newBadges = []) => {
    // 1. Atualização Imediata no LocalStorage
    localStorage.setItem('bfa_user_progress', JSON.stringify(newCompletedLessons));
    localStorage.setItem('bfa_quiz_scores', JSON.stringify(newQuizScores));

    if (!user || !window.BfaSupabase || !window.BfaSupabase.client) {
      return;
    }

    setSyncStatus('syncing');
    pendingProgressRef.current = {
      completed_lessons: newCompletedLessons,
      quiz_scores: newQuizScores,
      badges: newBadges
    };

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        setIsSyncing(true);
        const supabase = window.BfaSupabase.client;
        const payload = pendingProgressRef.current;

        const { error } = await supabase
          .from('student_profiles')
          .update({
            progress: payload,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) throw error;
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2500);
      } catch (err) {
        console.warn('[BFA Sync] Erro ao sincronizar progresso:', err?.message);
        setSyncStatus('error');
      } finally {
        setIsSyncing(false);
      }
    }, 3000); // 3 segundos de debounce
  }, [user]);

  // Login via Link Mágico / OTP
  const signInWithEmail = async (email, name = '') => {
    if (!window.BfaSupabase || !window.BfaSupabase.client) {
      throw new Error('Supabase não configurado');
    }
    const supabase = window.BfaSupabase.client;
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { name: name || 'Estudante' },
        emailRedirectTo: window.location.origin
      }
    });
    if (error) throw error;
    return data;
  };

  // Verificação de Código OTP
  const verifyOtpCode = async (email, token) => {
    if (!window.BfaSupabase || !window.BfaSupabase.client) {
      throw new Error('Supabase não configurado');
    }
    const supabase = window.BfaSupabase.client;
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });
    if (error) throw error;
    if (data?.user) {
      setUser(data.user);
      await loadStudentProfile(data.user.id);
    }
    return data;
  };

  // Logout
  const signOut = async () => {
    if (window.BfaSupabase && window.BfaSupabase.client) {
      await window.BfaSupabase.client.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    setSyncStatus('idle');
  };

  return {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    isSyncing,
    syncStatus,
    signInWithEmail,
    verifyOtpCode,
    signOut,
    syncProgressDebounced,
    reloadProfile: () => user && loadStudentProfile(user.id)
  };
}

window.useStudentAuth = useStudentAuth;
