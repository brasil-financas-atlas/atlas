import React from 'react';
import { useStudentAuth } from '../utils/useStudentAuth.js';

export const ProgressContext = React.createContext(null);

export function ProgressProvider({ children }) {
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

  // Instancia o hook de autenticação e sincronização
  const studentAuth = useStudentAuth ? useStudentAuth() : null;

  // Escuta atualizações remotas de progresso mescladas pelo hook
  React.useEffect(() => {
    const handleProgressUpdate = (e) => {
      if (e.detail) {
        if (e.detail.completedLessons) {
          setCompletedLessons(e.detail.completedLessons);
        }
        if (e.detail.quizScores) {
          setQuizScores(e.detail.quizScores);
        }
      }
    };

    window.addEventListener('bfa_progress_updated', handleProgressUpdate);
    return () => window.removeEventListener('bfa_progress_updated', handleProgressUpdate);
  }, []);

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
      
      // Dispara sincronização com debounce no Supabase se logado
      if (studentAuth && studentAuth.syncProgressDebounced) {
        studentAuth.syncProgressDebounced(next, quizScores);
      }
      return next;
    });
  };

  const saveQuizScore = (lessonId, score, maxScore) => {
    setQuizScores(prev => {
      const prevObj = (prev && typeof prev === 'object') ? prev : {};
      const newScore = Math.max(prevObj[lessonId] || 0, score);
      const nextScores = { ...prevObj, [lessonId]: newScore };
      
      // Dispara sincronização com debounce no Supabase se logado
      if (studentAuth && studentAuth.syncProgressDebounced) {
        studentAuth.syncProgressDebounced(completedLessons, nextScores);
      }
      return nextScores;
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
    addReply,
    studentAuth
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}



