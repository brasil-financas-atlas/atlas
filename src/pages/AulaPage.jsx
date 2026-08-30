const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function AulaPage({ subjectKey, moduloSlug, aulaSlug }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons, toggleLessonComplete } = useContext(ProgressContext || createContext({}));
  const { isAuthenticated, inlineEditActive, cmsData, updateLesson } = useContext(AdminContext || createContext({}));
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' | 'quiz' | 'forum'
  const activeLessonRef = useRef(null);
  const [shareToast, setShareToast] = useState(false);

  const { hapticTap, hapticSuccess } = (window.useHaptics ? window.useHaptics() : { hapticTap: () => {}, hapticSuccess: () => {} });

  const [expandedMods, setExpandedMods] = useState({ [moduloSlug]: true });

  useEffect(() => {
    setActiveTab('teoria');
    setExpandedMods({ [moduloSlug]: true });
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [aulaSlug, moduloSlug]);

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;
  if (!subjectData) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Disciplina não encontrada.</div>;
  }

  const moduloObj = subjectData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloObj) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Módulo não encontrado.</div>;
  }

  const aulaObj = moduloObj.aulas.find(a => a.slug === aulaSlug);
  if (!aulaObj) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Aula não encontrada.</div>;
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

  // Gestos de Swipe entre Abas
  const tabs = ['teoria', 'quiz', 'forum'];
  const handleSwipeLeft = () => {
    const nextIdx = tabs.indexOf(activeTab) + 1;
    if (nextIdx < tabs.length) {
      hapticTap();
      setActiveTab(tabs[nextIdx]);
    }
  };

  const handleSwipeRight = () => {
    const prevIdx = tabs.indexOf(activeTab) - 1;
    if (prevIdx >= 0) {
      hapticTap();
      setActiveTab(tabs[prevIdx]);
    }
  };

  const { handlers: swipeHandlers } = window.useSwipeGesture ?
    window.useSwipeGesture({ onSwipeLeft: handleSwipeLeft, onSwipeRight: handleSwipeRight, threshold: 60 }) :
    { handlers: {} };

  const handleToggleDone = () => {
    if (!isDone) {
      hapticSuccess();
    } else {
      hapticTap();
    }
    toggleLessonComplete(lessonId);
  };

  const handleShare = async () => {
    hapticTap();
    if (window.shareContent) {
      const res = await window.shareContent({
        title: `${aulaObj.titulo} — Brasil Finanças Atlas`,
        text: `Estudando "${aulaObj.titulo}" no Brasil Finanças Atlas!`,
        url: window.location.href
      });
      if (res && res.method === 'clipboard') {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      }
    }
  };

  const renderCurriculumContent = () => (
    <div style={{ padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {subjectData.modulos.map((m, mIdx) => {
        const isCurrentMod = m.slug === moduloSlug;
        const isExpanded = expandedMods[m.slug] !== false;
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
              border: isCurrentMod ? `1px solid ${trackColor}` : '1px solid var(--border)',
              background: isCurrentMod ? 'var(--surface-strong)' : 'var(--card)',
              overflow: 'hidden',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Module Accordion Header */}
            <div
              onClick={() => {
                hapticTap();
                setExpandedMods(prev => ({ ...prev, [m.slug]: !prev[m.slug] }));
              }}
              style={{
                padding: '0.65rem 0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="mono-tag" style={{ color: trackColor, fontSize: '0.68rem', fontWeight: 800 }}>
                    MÓDULO {mIdx + 1}
                  </span>
                  {isAllDone && (
                    <span style={{ color: '#059669', display: 'inline-flex' }}>
                      <BfaIcon name="check" size={12} color="#059669" />
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.titulo}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                <span className="mono-tag" style={{ color: isAllDone ? '#059669' : 'var(--muted-foreground)', fontSize: '0.68rem', fontWeight: 700 }}>
                  {modCompletedCount}/{modTotalCount}
                </span>
                <span style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', display: 'inline-flex' }}>
                  <BfaIcon name="arrowRight" size={10} color="var(--muted-foreground)" />
                </span>
              </div>
            </div>

            {/* Expanded Module Content */}
            {isExpanded && (
              <div style={{ padding: '0.35rem 0.4rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
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
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                    borderLeft: '3px solid transparent',
                    color: 'var(--muted-foreground)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BfaIcon name="book" size={12} color="var(--muted-foreground)" />
                    <span>Introdução & Ementa</span>
                  </div>
                </a>

                {m.aulas.map((a) => {
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
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 800 : 500,
                        backgroundColor: isActive ? 'var(--card)' : 'transparent',
                        borderLeft: isActive ? `3px solid ${trackColor}` : '3px solid transparent',
                        boxShadow: isActive ? '0 1px 4px rgba(0, 0, 0, 0.08)' : 'none',
                        color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                        <BfaIcon name={itemDone ? "check" : "circle"} size={12} color={itemDone ? "#059669" : "var(--muted-foreground)"} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {a.titulo}
                        </span>
                      </div>
                      {isActive && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: trackColor, flexShrink: 0, marginLeft: '0.4rem' }} />
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
      <aside className={`aula-sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ borderRight: '1px solid var(--border)', background: 'var(--card)' }}>
        <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="mono-tag" style={{ color: trackColor, fontWeight: 800, fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <BfaIcon name={isMatematica ? "math" : "finance"} size={13} />
              <span>{isMatematica ? 'TRILHA MATEMÁTICA' : 'TRILHA FINANÇAS'}</span>
            </span>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--foreground)' }}>
              Índice da Trilha
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="bfa-btn bfa-btn--ghost bfa-btn--sm"
            style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
            aria-label="Fechar índice"
          >
            <BfaIcon name="close" size={14} />
          </button>
        </div>

        {renderCurriculumContent()}
      </aside>

      {/* Main Classroom Canvas */}
      <main className="aula-main">
        {/* Sleek Unified Lesson Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
            <button
              type="button"
              onClick={() => {
                hapticTap();
                setSidebarOpen(!sidebarOpen);
              }}
              className="bfa-btn"
              style={{
                cursor: 'pointer',
                border: '1px solid var(--border)',
                background: sidebarOpen ? 'var(--surface-strong)' : 'transparent',
                color: 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BfaIcon name="menu" size={14} />
              <span>{sidebarOpen ? 'Ocultar Trilha' : 'Trilha'}</span>
            </button>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {moduloObj.titulo}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleShare}
              className="bfa-btn"
              style={{
                background: 'var(--surface-strong)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Compartilhar Aula"
            >
              <BfaIcon name="share" size={14} />
              <span className="bfa-share-btn-text">Compartilhar</span>
            </button>

            <button
              onClick={handleToggleDone}
              className="bfa-btn"
              style={{
                backgroundColor: isDone ? '#059669' : 'var(--surface-strong)',
                color: isDone ? '#FFFFFF' : 'var(--foreground)',
                border: isDone ? '1px solid #059669' : '1px solid var(--border)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <BfaIcon name={isDone ? "check" : "circle"} size={14} />
              <span>{isDone ? 'Concluída' : 'Marcar Concluída'}</span>
            </button>
          </div>
        </div>

        {shareToast && (
          <div className="bfa-toast-banner" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="check" size={14} color="#059669" />
            <span>Link da aula copiado para a área de transferência!</span>
          </div>
        )}

        {/* Lesson Title & Audio Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="mono-tag" style={{ color: trackColor, fontWeight: 800, fontSize: '0.72rem', display: 'inline-block', marginBottom: '0.4rem' }}>
            {isMatematica ? 'MATEMÁTICA APLICADA' : 'FINANÇAS & MERCADO'} · {moduloObj.titulo.toUpperCase()}
          </span>
          <h1 className="headline-punch" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em', margin: '0 0 0.75rem 0', lineHeight: 1.25 }}>
            {aulaObj.titulo}
          </h1>
          <AudioReader markdownContent={markdownContent} lessonTitle={aulaObj.titulo} />
        </div>

        {/* Quick In-Lesson Segmented Mode Navigation Bar */}
        {(() => {
          const richData = subjectKey === 'financas' ? window.financasData : (subjectKey === 'matematica' ? window.matematicaData : null);
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
                  background: 'var(--surface-strong)',
                  padding: '4px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  marginBottom: '2rem',
                  maxWidth: '540px',
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
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.82rem',
                    fontWeight: activeTab === 'teoria' ? 800 : 600,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'teoria' ? 'var(--card)' : 'transparent',
                    color: activeTab === 'teoria' ? 'var(--foreground)' : 'var(--muted-foreground)',
                    boxShadow: activeTab === 'teoria' ? '0 1px 3px rgba(0, 0, 0, 0.12)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <BfaIcon name="book" size={13} />
                  <span>Teoria</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    hapticTap();
                    setActiveTab('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.82rem',
                    fontWeight: activeTab === 'quiz' ? 800 : 600,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'quiz' ? 'var(--card)' : 'transparent',
                    color: activeTab === 'quiz' ? 'var(--foreground)' : 'var(--muted-foreground)',
                    boxShadow: activeTab === 'quiz' ? '0 1px 3px rgba(0, 0, 0, 0.12)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <BfaIcon name="target" size={13} />
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
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.82rem',
                    fontWeight: activeTab === 'forum' ? 800 : 600,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'forum' ? 'var(--card)' : 'transparent',
                    color: activeTab === 'forum' ? 'var(--foreground)' : 'var(--muted-foreground)',
                    boxShadow: activeTab === 'forum' ? '0 1px 3px rgba(0, 0, 0, 0.12)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <BfaIcon name="chat" size={13} />
                  <span>Fórum</span>
                </button>
              </div>

              {/* TAB 1: TEORIA */}
              {activeTab === 'teoria' && (
                <div>
                  {/* Video Player & Admin Controls */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    {isAuthenticated && inlineEditActive && (
                      <div className="bfa-admin-video-box" style={{ marginBottom: '1rem', padding: '0.85rem 1.25rem', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <BfaIcon name="video" size={18} color="var(--color-azul)" />
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--foreground)' }}>
                            Gerenciador de Vídeo da Aula (Admin)
                          </span>
                          <span className="mono-tag" style={{ color: videoUrl ? 'var(--market)' : 'var(--muted-foreground)', background: 'var(--card)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
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
                      <div className="bfa-video-responsive" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)', background: '#000' }}>
                        <iframe
                          src={videoUrl.replace('watch?v=', 'embed/')}
                          title={aulaObj.titulo}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>

                  {/* Markdown Theory Article */}
                  <article className="bfa-lesson-article" style={{ fontSize: '1rem', lineHeight: 1.75 }}>
                    <LessonContent markdownContent={markdownContent} lessonId={lessonId} />
                  </article>

                  {/* Dynamic Interactive Lesson Visualizer (Chart.js / Simulation) */}
                  {window.LessonVisualizerRouter && (
                    <div style={{ marginTop: '2rem' }}>
                      <LessonVisualizerRouter lessonSlug={aulaSlug} />
                    </div>
                  )}

                  {/* Practice CTA Card leading to Quiz */}
                  {lessonQuestions.length > 0 && (
                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, color: 'var(--foreground)', fontSize: '1.2rem' }}>
                        Pronto para testar sua retenção?
                      </h3>
                      <p style={{ margin: '0 0 1.5rem 0', color: 'var(--muted-foreground)', fontSize: '0.9rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Resolva os {lessonQuestions.length} exercícios práticos de fixação com cálculo passo a passo para consolidar o aprendizado.
                      </p>
                      <button
                        type="button"
                        className="bfa-btn bfa-btn--verde"
                        onClick={() => {
                          hapticTap();
                          setActiveTab('quiz');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', fontWeight: 700 }}
                      >
                        <BfaIcon name="target" size={16} />
                        <span>Praticar Exercícios de Fixação ({lessonQuestions.length} Questões)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: QUIZ */}
              {activeTab === 'quiz' && (
                <div id="quiz-section" style={{ marginTop: '1rem' }}>
                  <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="bfa-btn bfa-btn--sm bfa-btn--ghost"
                      onClick={() => {
                        hapticTap();
                        setActiveTab('teoria');
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span>← Voltar para a Teoria</span>
                    </button>
                    <span className="mono-tag" style={{ color: 'var(--market)', fontSize: '0.75rem' }}>
                      {lessonQuestions.length} Questões Disponíveis
                    </span>
                  </div>
                  <QuizEngine
                    questions={lessonQuestions}
                    lessonId={lessonId}
                    onBackToTheory={() => setActiveTab('teoria')}
                    nextLessonUrl={nextAula ? `#/${subjectKey}/${nextAula.moduloSlug}/${nextAula.slug}` : null}
                  />
                </div>
              )}

              {/* TAB 3: FORUM */}
              {activeTab === 'forum' && (
                <div id="forum-section" style={{ marginTop: '1rem' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <button
                      type="button"
                      className="bfa-btn bfa-btn--sm bfa-btn--ghost"
                      onClick={() => {
                        hapticTap();
                        setActiveTab('teoria');
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border)' }}>
          {prevAula ? (
            <a
              href={`#/${subjectKey}/${prevAula.moduloSlug}/${prevAula.slug}`}
              onClick={() => hapticTap()}
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface-strong)',
                color: 'var(--foreground)',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              ← Aula Anterior
            </a>
          ) : <div />}

          {nextAula ? (
            <a
              href={`#/${subjectKey}/${nextAula.moduloSlug}/${nextAula.slug}`}
              onClick={() => hapticTap()}
              className="bfa-btn bfa-btn--verde"
              style={{ padding: '0.65rem 1.35rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.85rem' }}
            >
              Próxima Aula →
            </a>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}

window.AulaPage = AulaPage;
