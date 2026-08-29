const ProgressContext = React.createContext(null);

function ProgressProvider({ children }) {
  const [completedLessons, setCompletedLessons] = React.useState(() => {
    try {
      const saved = localStorage.getItem('bfa_user_progress');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [quizScores, setQuizScores] = React.useState(() => {
    try {
      const saved = localStorage.getItem('bfa_quiz_scores');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [comments, setComments] = React.useState(() => {
    try {
      const saved = localStorage.getItem('bfa_video_comments');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  React.useEffect(() => {
    localStorage.setItem('bfa_user_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  React.useEffect(() => {
    localStorage.setItem('bfa_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  React.useEffect(() => {
    localStorage.setItem('bfa_video_comments', JSON.stringify(comments));
  }, [comments]);

  const toggleLessonComplete = (lessonId) => {
    setCompletedLessons(prev => {
      const isCompleted = !prev.includes(lessonId);
      const next = isCompleted ? [...prev, lessonId] : prev.filter(id => id !== lessonId);
      
      try {
        if (window.BfaSupabase && window.BfaSupabase.isConfigured() && window.BfaSupabase.client) {
          window.BfaSupabase.client.auth.getUser().then(res => {
            const user = res?.data?.user;
            if (user) {
              window.BfaSupabase.syncLessonProgress(user.id, lessonId, isCompleted);
            }
          }).catch(err => console.warn('[BFA] Supabase sync skipped:', err));
        }
      } catch (err) {
        console.warn('[BFA] Supabase sync skipped:', err);
      }
      return next;
    });
  };

  const saveQuizScore = (lessonId, score, maxScore) => {
    setQuizScores(prev => {
      const prevObj = (prev && typeof prev === 'object') ? prev : {};
      const newScore = Math.max(prevObj[lessonId] || 0, score);
      try {
        if (window.BfaSupabase && window.BfaSupabase.isConfigured() && window.BfaSupabase.client) {
          window.BfaSupabase.client.auth.getUser().then(res => {
            const user = res?.data?.user;
            if (user) {
              window.BfaSupabase.saveQuizAttempt(user.id, lessonId, score, maxScore);
            }
          }).catch(err => console.warn('[BFA] Supabase sync skipped:', err));
        }
      } catch (err) {
        console.warn('[BFA] Supabase sync skipped:', err);
      }
      return { ...prevObj, [lessonId]: newScore };
    });
  };

  const getQuizScore = (lessonId) => quizScores[lessonId] ?? null;

  const addComment = (lessonId, { author, text, timestamp }) => {
    const newComment = {
      id: `c_${Date.now()}`,
      author: author || 'Estudante',
      text,
      timestamp: timestamp || 0,
      createdAt: new Date().toISOString(),
      replies: []
    };
    setComments(prev => ({
      ...prev,
      [lessonId]: [newComment, ...(prev[lessonId] || [])]
    }));
  };

  const addReply = (lessonId, commentId, { author, text }) => {
    const newReply = {
      id: `r_${Date.now()}`,
      author: author || 'Estudante',
      text,
      createdAt: new Date().toISOString()
    };
    setComments(prev => {
      const lessonComms = prev[lessonId] || [];
      const updated = lessonComms.map(c =>
        c.id === commentId ? { ...c, replies: [...(c.replies || []), newReply] } : c
      );
      return { ...prev, [lessonId]: updated };
    });
  };

  const value = {
    completedLessons,
    toggleLessonComplete,
    saveQuizScore,
    getQuizScore,
    comments,
    addComment,
    addReply
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

window.ProgressContext = ProgressContext;
window.ProgressProvider = ProgressProvider;
