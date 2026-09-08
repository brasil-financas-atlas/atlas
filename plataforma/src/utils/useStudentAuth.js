/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Hook de Autenticação e Sincronização Local-First
   Arquivo: src/utils/useStudentAuth.js
   Suporte Adaptativo a student_profiles (JSONB) e profiles/lesson_progress.
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
  const hasStudentProfilesTableRef = useRef(true);

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
          await loadStudentProfile(session.user.id, session.user.email);
        }
      } catch (err) {
        console.warn('[BFA Auth] Erro ao recuperar sessão:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initSession();

    let authListener = null;
    if (window.BfaSupabase && window.BfaSupabase.client) {
      try {
        const { data } = window.BfaSupabase.client.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;
          if (session && session.user) {
            setUser(session.user);
            await loadStudentProfile(session.user.id, session.user.email);
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
  const loadStudentProfile = async (userId, userEmail = '') => {
    if (!window.BfaSupabase || !window.BfaSupabase.client || !userId) return;
    const supabase = window.BfaSupabase.client;

    let displayName = userEmail ? userEmail.split('@')[0] : 'Estudante';
    let userRole = 'student';
    let streakDays = 0;
    let remoteProgress = { completed_lessons: [], quiz_scores: {}, badges: ['pioneiro_atlas'] };

    try {
      const authUser = (await supabase.auth.getUser())?.data?.user;
      if (authUser && authUser.user_metadata) {
        displayName = authUser.user_metadata.full_name || authUser.user_metadata.name || displayName;
      }
    } catch (e) {}

    // Tentativa 1: Tabela Compacta student_profiles (Micro-Storage JSONB)
    if (hasStudentProfilesTableRef.current) {
      try {
        const { data, error } = await supabase
          .from('student_profiles')
          .select('id, name, role, streak_days, progress')
          .eq('id', userId)
          .single();

        if (!error && data) {
          displayName = data.name || displayName;
          userRole = data.role || userRole;
          streakDays = data.streak_days || streakDays;
          if (data.progress) {
            remoteProgress = data.progress;
          }
        } else if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.code === '42P01')) {
          console.info('[BFA Auth] student_profiles não encontrada, usando tabela profiles como fallback.');
          hasStudentProfilesTableRef.current = false;
        }
      } catch (e) {
        hasStudentProfilesTableRef.current = false;
      }
    }

    // Tentativa 2 (Fallback): Tabela profiles + lesson_progress se não usou student_profiles
    if (!hasStudentProfilesTableRef.current) {
      try {
        const { data: pData } = await supabase
          .from('profiles')
          .select('id, full_name, role, email')
          .eq('id', userId)
          .maybeSingle();

        if (pData) {
          displayName = pData.full_name || displayName;
          userRole = pData.role || userRole;
        }

        const { data: lpData } = await supabase
          .from('lesson_progress')
          .select('lesson_id, completed')
          .eq('user_id', userId)
          .eq('completed', true);

        if (lpData && lpData.length > 0) {
          remoteProgress.completed_lessons = lpData.map(r => r.lesson_id);
        }
      } catch (err) {
        console.warn('[BFA Auth] Exceção ao carregar fallback profiles:', err);
      }
    }

    // Mescla local com remoto
    const mergedPayload = mergeLocalWithRemoteProgress(remoteProgress);

    setProfile({
      id: userId,
      name: displayName,
      role: userRole,
      streak_days: streakDays,
      progress: mergedPayload
    });

    // Garante salvamento na nuvem (Supabase) imediatamente no login
    try {
      if (hasStudentProfilesTableRef.current) {
        await supabase.from('student_profiles').upsert({
          id: userId,
          name: displayName,
          role: userRole,
          progress: mergedPayload,
          updated_at: new Date().toISOString()
        });
      }
      await supabase.from('profiles').upsert({
        id: userId,
        email: userEmail || `${userId}@user.atlas`,
        full_name: displayName,
        role: userRole,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    } catch (saveErr) {
      console.warn('[BFA Auth] Erro ao persistir perfil no login:', saveErr?.message);
    }
  };

  // Mescla dados do LocalStorage com o banco remoto
  const mergeLocalWithRemoteProgress = (remoteProgress) => {
    try {
      const localLessons = JSON.parse(localStorage.getItem('bfa_user_progress') || '[]');
      const localScores = JSON.parse(localStorage.getItem('bfa_quiz_scores') || '{}');

      const remoteLessons = remoteProgress?.completed_lessons || [];
      const remoteScores = remoteProgress?.quiz_scores || {};

      const mergedLessons = Array.from(new Set([...localLessons, ...remoteLessons]));

      const mergedScores = { ...remoteScores };
      Object.keys(localScores).forEach((key) => {
        mergedScores[key] = Math.max(mergedScores[key] || 0, localScores[key] || 0);
      });

      const mergedBadges = Array.from(new Set([...(remoteProgress?.badges || ['pioneiro_atlas'])]));

      localStorage.setItem('bfa_user_progress', JSON.stringify(mergedLessons));
      localStorage.setItem('bfa_quiz_scores', JSON.stringify(mergedScores));

      window.dispatchEvent(new CustomEvent('bfa_progress_updated', {
        detail: { completedLessons: mergedLessons, quizScores: mergedScores }
      }));

      return {
        completed_lessons: mergedLessons,
        quiz_scores: mergedScores,
        badges: mergedBadges
      };
    } catch (e) {
      console.warn('[BFA Auth] Erro na mesclagem de progresso:', e);
      return { completed_lessons: [], quiz_scores: {}, badges: [] };
    }
  };

  // Envia progresso para o Supabase com Debounce de 3 segundos
  const syncProgressDebounced = useCallback((newCompletedLessons, newQuizScores, newBadges = []) => {
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

        if (hasStudentProfilesTableRef.current) {
          const { error } = await supabase
            .from('student_profiles')
            .upsert({
              id: user.id,
              name: profile?.name || (user.email ? user.email.split('@')[0] : 'Estudante'),
              role: profile?.role || 'student',
              progress: payload,
              updated_at: new Date().toISOString()
            });

          if (!error) {
            setSyncStatus('saved');
            setTimeout(() => setSyncStatus('idle'), 2500);
            return;
          }
          if (error.code === 'PGRST205' || error.code === '42P01') {
            hasStudentProfilesTableRef.current = false;
          }
        }

        // Fallback: grava aula a aula em lesson_progress
        if (newCompletedLessons && newCompletedLessons.length > 0) {
          const lastLesson = newCompletedLessons[newCompletedLessons.length - 1];
          await supabase.from('lesson_progress').upsert({
            user_id: user.id,
            lesson_id: lastLesson,
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,lesson_id' });
        }

        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2500);
      } catch (err) {
        console.warn('[BFA Sync] Erro ao sincronizar progresso:', err?.message);
        setSyncStatus('error');
      } finally {
        setIsSyncing(false);
      }
    }, 3000);
  }, [user, profile]);

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
        emailRedirectTo: typeof window !== 'undefined' ? (window.location.origin + window.location.pathname + '#/confirmacao') : ''
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
      await loadStudentProfile(data.user.id, data.user.email);
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
    reloadProfile: () => user && loadStudentProfile(user.id, user.email)
  };
}

window.useStudentAuth = useStudentAuth;
