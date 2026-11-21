import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { AdminContext } from '../context/AdminContext';
import BfaIcon from '../components/Icons';
import AudioReader from '../components/AudioReader';
import LessonContent from '../components/LessonContent';
import QuizEngine from '../components/QuizEngine';
import ForumTimestamps from '../components/VideoAndForum';
import { EXACT_CONTENT } from '../data/contentData';
import { financasData } from '../data/financasData';
import { matematicaData } from '../data/matematicaData';
import { shareContent } from '../utils/nativeShare';
import { useHaptics, useSwipeGesture } from '../utils/touchGestures';
import BrandImg from '../components/BrandImg';

const LARGURA_CELULAR = 768;

function AvisoNaoEncontrado({ texto, href }) {
  return (
    <div className="bfa-container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.75rem 0' }}>{texto}</h1>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem 0' }}>O endereço pode ter mudado ou a aula foi removida.</p>
      <a href={href} className="btn-primary">Voltar para a trilha</a>
    </div>
  );
}

function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed.includes('youtube.com/embed/')) return trimmed;
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const pathMatch = trimmed.match(/youtube\.com\/(?:v|shorts)\/([a-zA-Z0-9_-]{11})/);
  if (pathMatch) return `https://www.youtube.com/embed/${pathMatch[1]}`;
  return trimmed;
}

function AulaPage({ subjectKey, moduloSlug, aulaSlug }) {
    const { completedLessons, toggleLessonComplete } = useContext(ProgressContext || createContext({}));
  const { isAuthenticated, inlineEditActive, toggleInlineEdit, isAdmin, cmsData, updateLesson, publicarConteudo, statusPublicacao, erroPublicacao } = useContext(AdminContext || createContext({}));
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' | 'quiz' | 'forum'
  const activeLessonRef = useRef(null);
  const [shareToast, setShareToast] = useState(false);

  const { hapticTap, hapticSuccess } = useHaptics();
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const toastTimerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < LARGURA_CELULAR);

  const [expandedMods, setExpandedMods] = useState({ [moduloSlug]: true });

  // Ao cruzar 768px, recalcula o layout; ao ficar estreito, fecha a trilha
  // para ela nao cobrir o conteudo.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    let anterior = window.innerWidth < LARGURA_CELULAR;
    const onResize = () => {
      const mobile = window.innerWidth < LARGURA_CELULAR;
      if (mobile === anterior) return;
      anterior = mobile;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    setActiveTab('teoria');
    setExpandedMods({ [moduloSlug]: true });
    if (typeof window !== 'undefined' && window.innerWidth < LARGURA_CELULAR) {
      setSidebarOpen(false);
    }
    // A rolagem da aula e do <main>, nao da janela: volta ao topo na troca.
    if (mainRef.current) mainRef.current.scrollTop = 0;
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [aulaSlug, moduloSlug]);

  // Centraliza a aula ativa rolando so o conteiner da trilha (scrollIntoView
  // rolava a janela inteira e escondia o cabecalho).
  useEffect(() => {
    const box = sidebarRef.current;
    const item = activeLessonRef.current;
    if (!box || !item || !sidebarOpen) return;
    const boxRect = box.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const alvo = box.scrollTop + (itemRect.top - boxRect.top) - (box.clientHeight / 2) + (itemRect.height / 2);
    box.scrollTop = Math.max(0, alvo);
  }, [aulaSlug, moduloSlug, sidebarOpen]);

  const tabs = ['teoria', 'quiz', 'forum'];
  const { handlers: swipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => {
      const nextIdx = tabs.indexOf(activeTab) + 1;
      if (nextIdx < tabs.length) {
        hapticTap();
        setActiveTab(tabs[nextIdx]);
      }
    },
    onSwipeRight: () => {
      const prevIdx = tabs.indexOf(activeTab) - 1;
      if (prevIdx >= 0) {
        hapticTap();
        setActiveTab(tabs[prevIdx]);
      }
    },
    threshold: 60
  });

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;
  if (!subjectData) {
    return <AvisoNaoEncontrado texto="Disciplina não encontrada." href="#/" />;
  }

  const moduloObj = subjectData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloObj) {
    return <AvisoNaoEncontrado texto="Módulo não encontrado." href={`#/${subjectKey}`} />;
  }

  const aulaObj = moduloObj.aulas.find(a => a.slug === aulaSlug);
  if (!aulaObj) {
    return <AvisoNaoEncontrado texto="Aula não encontrada." href={`#/${subjectKey}/${moduloSlug}`} />;
  }

  const lessonId = `${subjectKey}-${moduloSlug}-${aulaSlug}`;
  const isDone = completedLessons && completedLessons.includes(lessonId);

  const cmsOverride = cmsData && cmsData.lessons && cmsData.lessons[lessonId];
  const videoUrl = cmsOverride && cmsOverride.videoUrl ? cmsOverride.videoUrl : (aulaObj.videoUrl || "");
  const markdownContent = cmsOverride && cmsOverride.content ? cmsOverride.content : aulaObj.content;

  const allAulas = [];
  subjectData.modulos.forEach(m => {
    m.aulas.forEach(a => {
      allAulas.push({ ...a, moduloSlug: m.slug });
    });
  });

  const currentIdx = allAulas.findIndex(a => a.slug === aulaSlug && a.moduloSlug === moduloSlug);
  const prevAula = currentIdx > 0 ? allAulas[currentIdx - 1] : null;
  const nextAula = currentIdx < allAulas.length - 1 ? allAulas[currentIdx + 1] : null;

  const isMatematica = subjectKey === 'matematica';
  const trackColor = isMatematica ? 'var(--track-math)' : 'var(--track-finance)';

  const handleToggleDone = () => {
    if (!isDone) {
      hapticSuccess();
    } else {
      hapticTap();
    }
    toggleLessonComplete(lessonId);
  };

  const mostrarToast = (tipo) => {
    clearTimeout(toastTimerRef.current);
    setShareToast(tipo);
    toastTimerRef.current = setTimeout(() => setShareToast(false), tipo === 'erro' ? 5000 : 2500);
  };

  const handleShare = async () => {
    hapticTap();
    const res = await shareContent({
      title: `${aulaObj.titulo} — Brasil Finanças Atlas`,
      text: `Estudando "${aulaObj.titulo}" no Brasil Finanças Atlas!`,
      url: window.location.href
    });
    if (res && res.success && res.method === 'clipboard') {
      mostrarToast('copiado');
    } else if (res && !res.success && !res.aborted) {
      mostrarToast('erro');
    }
  };

  const renderCurriculumContent = () => (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {subjectData.modulos.map((m, mIdx) => {
        const isCurrentMod = m.slug === moduloSlug;
        const isExpanded = !!expandedMods[m.slug];
        const modTotalCount = m.aulas.length;
        const modCompletedCount = m.aulas.filter(a => {
          const itemLessonId = `${subjectKey}-${m.slug}-${a.slug}`;
          return completedLessons && completedLessons.includes(itemLessonId);
        }).length;
        const isAllDone = modTotalCount > 0 && modCompletedCount === modTotalCount;

        return (
          <div
            key={m.slug}
            style={{
              borderRadius: 'var(--radius-md)',
              border: isCurrentMod ? `1px solid var(--primary)` : '1px solid var(--border-color)',
              background: 'var(--bg-app)',
              overflow: 'hidden'
            }}
          >
            {/* Module Accordion Header */}
            <div
              onClick={() => {
                hapticTap();
                setExpandedMods(prev => ({ ...prev, [m.slug]: !prev[m.slug] }));
              }}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none',
                backgroundColor: isCurrentMod ? 'var(--bg-surface-blue)' : 'transparent',
                borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: isCurrentMod ? trackColor : 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600 }}>
                    MÓDULO {mIdx + 1}
                  </span>
                  {isAllDone && (
                    <span style={{ color: 'var(--accent-green)', display: 'inline-flex' }}>
                      <BfaIcon name="check" size={12} color="var(--accent-green)" />
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {m.titulo}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                <span style={{ color: isAllDone ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {modCompletedCount}/{modTotalCount}
                </span>
                <span style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', display: 'inline-flex' }}>
                  <BfaIcon name="arrowRight" size={10} color="var(--text-muted)" />
                </span>
              </div>
            </div>

            {/* Expanded Module Content */}
            {isExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <a
                  href={`#/${subjectKey}/${m.slug}`}
                  onClick={() => {
                    hapticTap();
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    borderLeft: '3px solid transparent',
                    color: 'var(--text-secondary)',
                    padding: '0.75rem 1rem',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Introdução & Ementa</span>
                  </div>
                </a>

                {m.aulas.map((a, aIdx) => {
                  const itemLessonId = `${subjectKey}-${m.slug}-${a.slug}`;
                  const itemDone = completedLessons && completedLessons.includes(itemLessonId);
                  const isActive = isCurrentMod && a.slug === aulaSlug;

                  return (
                    <a
                      key={a.slug}
                      ref={isActive ? activeLessonRef : null}
                      href={`#/${subjectKey}/${m.slug}/${a.slug}`}
                      onClick={() => {
                        hapticTap();
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          setSidebarOpen(false);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                        backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                        borderLeft: isActive ? `3px solid ${trackColor}` : '3px solid transparent',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        padding: '0.75rem 1rem',
                        textDecoration: 'none',
                        borderTop: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {String(aIdx + 1).padStart(2, '0')}
                        </span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {a.titulo}
                        </span>
                      </div>
                      {itemDone && (
                        <span style={{ color: 'var(--accent-green)', display: 'inline-flex' }} aria-label="Concluída">
                          <BfaIcon name="check" size={14} color="var(--accent-green)" />
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="aula-layout" {...swipeHandlers}>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="aula-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Curriculum Tree */}
      <aside ref={sidebarRef} style={{
        // No computador a trilha fica no fluxo, colada no topo da aula (o
        // conteiner .aula-layout tem overflow hidden, entao sticky deslocaria
        // a trilha para baixo). No celular ela abre como gaveta fixa.
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? 'var(--bfa-header-h, 65px)' : undefined,
        left: 0,
        zIndex: isMobile ? 96 : 30,
        display: sidebarOpen ? 'block' : 'none',
        width: isMobile ? 'min(320px, 86vw)' : '320px',
        flexShrink: 0,
        alignSelf: 'flex-start',
        height: 'calc(100vh - var(--bfa-header-h, 65px))',
        overflowY: 'auto',
        borderRight: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface-blue)'
      }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'var(--bg-surface-blue)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BrandImg variant="symbol" className="bfa-brand-img" style={{ height: '24px', width: 'auto' }} />
              <div>
              <span style={{ color: trackColor, fontWeight: 700, fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <BfaIcon name={isMatematica ? "math" : "finance"} size={13} />
              <span>{isMatematica ? 'TRILHA MATEMÁTICA' : 'TRILHA FINANÇAS'}</span>
            </span>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              Índice da Trilha
            </div>
            </div>
            </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            aria-label="Fechar índice"
          >
            <BfaIcon name="close" size={14} />
          </button>
        </div>

        {renderCurriculumContent()}
      </aside>

      {/* Main Classroom Canvas */}
      <main ref={mainRef} style={{ flex: 1, minWidth: 0, padding: isMobile ? '2rem 1.5rem' : '3rem 4rem', backgroundColor: 'var(--bg-app)', height: 'calc(100vh - var(--bfa-header-h, 65px))', overflowY: 'auto' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Sleek Unified Lesson Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
            <button
              type="button"
              onClick={() => {
                hapticTap();
                setSidebarOpen(!sidebarOpen);
              }}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <BfaIcon name="menu" size={16} />
              <span>{sidebarOpen ? 'Ocultar Trilha' : 'Trilha'}</span>
            </button>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {moduloObj.titulo}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={handleShare}
              className="btn-secondary"
              title="Compartilhar Aula"
            >
              <BfaIcon name="share" size={14} />
              <span className="bfa-share-btn-text">Compartilhar</span>
            </button>

            <button
              onClick={handleToggleDone}
              style={{
                backgroundColor: isDone ? '#047857' : 'var(--bg-surface)',
                color: isDone ? '#FFFFFF' : 'var(--text-primary)',
                border: isDone ? '1px solid #047857' : '1px solid var(--border-color)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <BfaIcon name={isDone ? "check" : "circle"} size={14} />
              <span>{isDone ? 'Concluída' : 'Marcar Concluída'}</span>
            </button>
          </div>
        </div>

        {shareToast && (
          <div role="status" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '1rem', backgroundColor: shareToast === 'erro' ? '#B91C1C' : '#047857', color: '#FFFFFF', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <BfaIcon name={shareToast === 'erro' ? 'close' : 'check'} size={16} color="#FFFFFF" />
            <span style={{ fontWeight: 500 }}>
              {shareToast === 'erro'
                ? 'Não foi possível copiar o link. Copie o endereço da barra do navegador.'
                : 'Link da aula copiado para a área de transferência!'}
            </span>
          </div>
        )}

        {/* Lesson Title & Audio Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--on-paper, var(--blue-deep))', fontWeight: 800, fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '9999px', display: 'inline-block', marginBottom: '1rem', letterSpacing: '0.04em' }}>
            {isMatematica ? 'MATEMÁTICA APLICADA' : 'FINANÇAS & MERCADO'} · {moduloObj.titulo.toUpperCase()}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 1rem 0', lineHeight: 1.1 }}>
            {aulaObj.titulo}
          </h1>
          <AudioReader key={lessonId} markdownContent={markdownContent} lessonTitle={aulaObj.titulo} />
        </div>

        {/* Quick In-Lesson Segmented Mode Navigation Bar */}
        {(() => {
          const richData = subjectKey === 'financas' ? financasData : (subjectKey === 'matematica' ? matematicaData : null);
          let richAula = null;
          if (richData && richData.modulos) {
            const rMod = richData.modulos.find(m => m.slug === moduloSlug);
            if (rMod && rMod.aulas) {
              richAula = rMod.aulas.find(a => a.slug === aulaSlug);
            }
          }
          let lessonQuestions = [];
          if (richAula && richAula.quiz && richAula.quiz.length > 0) {
            lessonQuestions = richAula.quiz;
          } else if (aulaObj && aulaObj.quiz) {
            lessonQuestions = aulaObj.quiz;
          }

          return (
            <div>
              {/* Top Integrated Segmented Tabs with Swipe indicator */}
              <div
                style={{
                  display: 'flex',
                  background: 'var(--bg-surface)',
                  padding: '4px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '2.5rem',
                  maxWidth: '600px',
                  width: '100%'
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    setActiveTab('teoria');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.625rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: activeTab === 'teoria' ? 700 : 500,
                    borderRadius: 'calc(var(--radius-md) - 2px)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'teoria' ? 'var(--bg-app)' : 'transparent',
                    color: activeTab === 'teoria' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'teoria' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <BfaIcon name="book" size={14} />
                  <span>Teoria</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    setActiveTab('quiz');
                    if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    flex: 1,
                    padding: '0.625rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: activeTab === 'quiz' ? 700 : 500,
                    borderRadius: 'calc(var(--radius-md) - 2px)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'quiz' ? 'var(--bg-app)' : 'transparent',
                    color: activeTab === 'quiz' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'quiz' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <BfaIcon name="target" size={14} />
                  <span>Exercícios ({lessonQuestions.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    setActiveTab('forum');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.625rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: activeTab === 'forum' ? 700 : 500,
                    borderRadius: 'calc(var(--radius-md) - 2px)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'forum' ? 'var(--bg-app)' : 'transparent',
                    color: activeTab === 'forum' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'forum' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <BfaIcon name="chat" size={14} />
                  <span>Fórum</span>
                </button>
              </div>

              {/* TAB 1: TEORIA */}
              {activeTab === 'teoria' && (
                <div>
                  {/* Video Player & Admin Controls */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    {isAuthenticated && inlineEditActive && (
                      <div className="bfa-admin-video-box" style={{ marginBottom: '1rem', padding: '0.85rem 1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <BfaIcon name="video" size={18} color="var(--color-azul)" />
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Gerenciador de Vídeo da Aula (Admin)
                          </span>
                          <span className="mono-tag" style={{ color: videoUrl ? 'var(--market)' : 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            {videoUrl ? 'Vídeo Ativo' : 'Sem vídeo'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            type="button"
                            className="bfa-btn bfa-btn--sm bfa-btn--ouro"
                            onClick={() => {
                              setInputVideoUrl(videoUrl);
                              setShowVideoModal(true);
                            }}
                            style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <BfaIcon name="pencil" size={13} /> {videoUrl ? 'Editar Vídeo' : 'Adicionar Vídeo'}
                          </button>
                          {videoUrl && (
                            <button
                              type="button"
                              className="bfa-btn bfa-btn--sm bfa-btn--ghost"
                              onClick={() => updateLesson(lessonId, { videoUrl: '' })}
                              style={{ fontSize: '0.8rem', color: '#EF4444', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <BfaIcon name="trash" size={13} /> Remover Vídeo
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {videoUrl && (
                      <div className="bfa-video-responsive" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)', background: '#000' }}>
                        <iframe
                          src={getYouTubeEmbedUrl(videoUrl)}
                          title={aulaObj.titulo}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>

                  {/* Markdown Theory Article */}
                  <article className="bfa-lesson-article">
                    <LessonContent markdownContent={markdownContent} lessonId={lessonId} />
                  </article>

                  

                  {/* Practice CTA Card leading to Quiz */}
                  {lessonQuestions.length > 0 && (
                    <div style={{ marginTop: '3rem', padding: '2.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                      <h3 style={{ margin: '0 0 1rem 0', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>
                        Pronto para testar sua retenção?
                      </h3>
                      <p style={{ margin: '0 0 2rem 0', color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Resolva os {lessonQuestions.length} exercícios práticos de fixação com cálculo passo a passo para consolidar o aprendizado.
                      </p>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => {
                          hapticTap();
                          setActiveTab('quiz');
                          if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <BfaIcon name="target" size={16} />
                        <span>Praticar Exercícios de Fixação ({lessonQuestions.length} Questões)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: QUIZ */}
              {/* O quiz fica montado (so escondido) para nao perder o progresso ao trocar de aba */}
              {lessonQuestions.length > 0 || activeTab === 'quiz' ? (
                <div id="quiz-section" style={{ marginTop: '1.5rem', display: activeTab === 'quiz' ? 'block' : 'none' }}>
                  <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        hapticTap();
                        setActiveTab('teoria');
                      }}
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      <span>← Voltar para a Teoria</span>
                    </button>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                      {lessonQuestions.length} Questões Disponíveis
                    </span>
                  </div>
                  <QuizEngine
                    key={lessonId}
                    questions={lessonQuestions}
                    lessonId={lessonId}
                    onBackToTheory={() => setActiveTab('teoria')}
                    nextLessonUrl={nextAula ? `#/${subjectKey}/${nextAula.moduloSlug}/${nextAula.slug}` : null}
                  />
                </div>
              ) : null}

              {/* TAB 3: FORUM */}
              {activeTab === 'forum' && (
                <div id="forum-section" style={{ marginTop: '1.5rem' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        hapticTap();
                        setActiveTab('teoria');
                      }}
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      <span>← Voltar para a Teoria</span>
                    </button>
                  </div>
                  <ForumTimestamps lessonId={lessonId} />
                </div>
              )}
            </div>
          );
        })()}

        {/* Bottom Lesson Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          {prevAula ? (
            <a
              href={`#/${subjectKey}/${prevAula.moduloSlug}/${prevAula.slug}`}
              onClick={() => hapticTap()}
              className="btn-secondary"
            >
              ← Aula Anterior
            </a>
          ) : <div />}

          {nextAula ? (
            <a
              href={`#/${subjectKey}/${nextAula.moduloSlug}/${nextAula.slug}`}
              onClick={() => hapticTap()}
              className="btn-primary"
            >
              Próxima Aula →
            </a>
          ) : <div />}
        </div>
        </div>
      </main>

      {/* Floating In-Context Admin Quick Edit Toggle */}
      {isAuthenticated && (
        <div
          className="bfa-admin-floating-bar"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-surface)',
            padding: '0.45rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <button
            type="button"
            onClick={toggleInlineEdit}
            className={`bfa-btn bfa-btn--sm ${inlineEditActive ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              borderRadius: '9999px',
              padding: '0.35rem 0.85rem',
              cursor: 'pointer'
            }}
          >
            <BfaIcon name="pencil" size={13} />
            <span>{inlineEditActive ? 'Edição Ativa' : 'Editar Conteúdo'}</span>
          </button>
          {isAdmin && publicarConteudo && (
            <button
              type="button"
              onClick={publicarConteudo}
              disabled={statusPublicacao === 'publicando'}
              className="bfa-btn bfa-btn--sm bfa-btn--ghost"
              title={erroPublicacao || 'Publicar as alterações para todos os visitantes'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
            >
              <BfaIcon name="nav-publish" size={13} />
              <span>
                {statusPublicacao === 'publicando' ? 'Publicando...' :
                  statusPublicacao === 'publicado' ? 'Publicado' :
                  statusPublicacao === 'erro' ? 'Erro ao publicar' : 'Publicar'}
              </span>
            </button>
          )}
          {isAdmin && (
            <a
              href="#/admin"
              className="bfa-btn bfa-btn--sm bfa-btn--ghost"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                textDecoration: 'none'
              }}
              title="Ir para o Painel CMS"
            >
              <span>Painel</span>
            </a>
          )}
        </div>
      )}

      {/* Modal de Configuração de Vídeo */}
      {showVideoModal && (
        <div
          className="bfa-modal-overlay"
          onClick={() => setShowVideoModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div
            className="bfa-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '540px',
              padding: '1.75rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BfaIcon name="video" size={18} color="var(--color-azul)" />
                <span>Configurar Vídeo da Aula (YouTube)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                style={{ padding: '0.3rem' }}
                aria-label="Fechar"
              >
                <BfaIcon name="close" size={16} />
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                URL do Vídeo no YouTube
              </label>
              <input
                type="text"
                value={inputVideoUrl}
                onChange={(e) => setInputVideoUrl(e.target.value)}
                placeholder="Ex: https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                className="bfa-input"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                autoFocus
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Suporta links padrão do YouTube, links curtos youtu.be e links embed.
              </div>
            </div>

            {inputVideoUrl && getYouTubeEmbedUrl(inputVideoUrl) && (
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Pré-visualização:
                </span>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#000' }}>
                  <iframe
                    src={getYouTubeEmbedUrl(inputVideoUrl)}
                    title="Pré-visualização do vídeo"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="bfa-btn bfa-btn--ghost"
                style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (updateLesson) {
                    updateLesson(lessonId, { videoUrl: inputVideoUrl.trim() });
                  }
                  setShowVideoModal(false);
                }}
                className="bfa-btn bfa-btn--verde"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', fontWeight: 700 }}
              >
                Salvar Vídeo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AulaPage;









