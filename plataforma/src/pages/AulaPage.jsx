const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function AulaPage({ subjectKey, moduloSlug, aulaSlug }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons, toggleLessonComplete } = useContext(ProgressContext || createContext({}));
  const { isAuthenticated, inlineEditActive, cmsData, updateLesson } = useContext(AdminContext || createContext({}));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState('');

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;
  if (!subjectData) {
    return <div className="bfa-container bfa-py-5">Disciplina não encontrada.</div>;
  }

  const moduloObj = subjectData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloObj) {
    return <div className="bfa-container bfa-py-5">Módulo não encontrado.</div>;
  }

  const aulaObj = moduloObj.aulas.find(a => a.slug === aulaSlug);
  if (!aulaObj) {
    return <div className="bfa-container bfa-py-5">Aula não encontrada.</div>;
  }

  const lessonId = `${subjectKey}-${moduloSlug}-${aulaSlug}`;
  const isDone = completedLessons && completedLessons.includes(lessonId);

  // Check CMS override for video URL or extra content
  const cmsOverride = cmsData && cmsData.lessons && cmsData.lessons[lessonId];
  const videoUrl = cmsOverride && cmsOverride.videoUrl ? cmsOverride.videoUrl : (aulaObj.videoUrl || "");
  const markdownContent = cmsOverride && cmsOverride.content ? cmsOverride.content : aulaObj.content;

  // Find next/prev lesson for navigation
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
  const themeClass = isMatematica ? 'bfa-theme--math' : 'bfa-theme--finance';

  return (
    <div className={`bfa-lesson-layout ${themeClass}`}>
      {/* Collapsible Sidebar - Khan Academy Style */}
      <aside className={`bfa-lesson-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="bfa-lesson-sidebar__header">
          <a href={`#/${subjectKey}`} className="bfa-lesson-sidebar__back">
            ← {isMatematica ? 'Matemática' : 'Finanças'}
          </a>
          <button
            className="bfa-btn-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Recolher menu"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <div className="bfa-lesson-sidebar__nav">
          {subjectData.modulos.map((m) => (
            <div key={m.slug} className="bfa-sidebar-module">
              <div className="bfa-sidebar-module__title">{m.titulo}</div>
              <ul className="bfa-sidebar-module__list">
                {m.aulas.map((a) => {
                  const itemLessonId = `${subjectKey}-${m.slug}-${a.slug}`;
                  const itemDone = completedLessons && completedLessons.includes(itemLessonId);
                  const isCurrent = a.slug === aulaSlug && m.slug === moduloSlug;

                  return (
                    <li key={a.slug}>
                      <a
                        href={`#/${subjectKey}/${m.slug}/${a.slug}`}
                        className={`bfa-sidebar-aula-item ${isCurrent ? 'active' : ''} ${itemDone ? 'done' : ''}`}
                      >
                        <span className="bfa-sidebar-status">{itemDone ? '✓' : '•'}</span>
                        <span className="bfa-sidebar-title">{a.titulo}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="bfa-lesson-main">
        {/* Top Navbar */}
        <div className="bfa-lesson-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="bfa-btn bfa-btn--ghost bfa-btn--sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰ {sidebarOpen ? 'Ocultar Trilha' : 'Ver Trilha'}
            </button>
            <div className="bfa-lesson-topbar__breadcrumbs">
              <span>{isMatematica ? 'Matemática Aplicada' : 'Finanças'}</span> / 
              <span>{moduloObj.titulo}</span> / 
              <strong>{aulaObj.titulo}</strong>
            </div>
          </div>

          <button
            onClick={() => toggleLessonComplete(lessonId)}
            className={`bfa-btn bfa-btn--sm ${isDone ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
          >
            {isDone ? <><BfaIcon name="checkSimple" size={14} style={{ marginRight: '6px' }} /> Concluída</> : 'Marcar como Concluída'}
          </button>
        </div>

        <div className="bfa-lesson-content-container">
          {/* Audio Reader Text-to-Speech Accessibility Widget */}
          <AudioReader markdownContent={markdownContent} lessonTitle={aulaObj.titulo} />

          {/* Visual Summary Card */}
          <div className="bfa-napkin-card">
            <span className="bfa-napkin-card__tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="lightbulb" size={14} color="#FFFFFF" /> RESUMO DA AULA
            </span>
            <EditableBlock id={`${lessonId}-summary-title`} as="div" className="bfa-napkin-card__title">
              {aulaObj.titulo}
            </EditableBlock>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
              <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <EditableBlock id={`${lessonId}-foco-title`} as="strong" style={{ color: isMatematica ? 'var(--color-verde)' : 'var(--color-azul)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BfaIcon name="target" size={16} color={isMatematica ? "var(--color-verde)" : "var(--color-azul)"} /> Foco da Aula
                </EditableBlock>
                <EditableBlock id={`${lessonId}-foco-desc`} as="p" style={{ fontSize: '0.88rem', margin: '0.3rem 0 0 0', color: 'var(--text-secondary)' }}>
                  Aprenda de forma intuitiva antes dos exemplos numéricos.
                </EditableBlock>
              </div>
              <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <EditableBlock id={`${lessonId}-app-title`} as="strong" style={{ color: 'var(--color-ouro-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BfaIcon name="zap" size={16} color="var(--color-ouro-dark)" /> Aplicação Real
                </EditableBlock>
                <EditableBlock id={`${lessonId}-app-desc`} as="p" style={{ fontSize: '0.88rem', margin: '0.3rem 0 0 0', color: 'var(--text-secondary)' }}>
                  Casos práticos de investimentos e tomada de decisão.
                </EditableBlock>
              </div>
            </div>
          </div>

          
          {/* Video Player Section with In-Context Admin Video URL Editor */}
          <div className="bfa-lesson-video-section" style={{ position: 'relative' }}>
            {isAuthenticated && inlineEditActive && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'var(--color-ouro-light)', border: '1px dashed var(--color-ouro)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-ouro-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BfaIcon name="video" size={16} color="var(--color-ouro-dark)" /> Gerenciador In-Context de Vídeo (Modo Admin)
                </span>
                <button
                  type="button"
                  className="bfa-btn bfa-btn--ouro bfa-btn--sm"
                  onClick={() => {
                    setInputVideoUrl(videoUrl || '');
                    setShowVideoModal(true);
                  }}
                >
                  <BfaIcon name="pencil" size={14} style={{ marginRight: '4px' }} /> {videoUrl ? 'Alterar Link do Vídeo' : 'Adicionar Vídeo a esta Aula'}
                </button>
              </div>
            )}

            <VideoPlayer videoUrl={videoUrl} />
          </div>

          {showVideoModal && (
            <div className="bfa-inline-editor-modal" onClick={() => setShowVideoModal(false)}>
              <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BfaIcon name="video" size={18} color="var(--color-azul)" /> In-Context Video Editor (YouTube)
                  </h3>
                  <span className="bfa-badge bfa-badge--ouro">{aulaObj.titulo}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Insira o link ou URL do YouTube para vincular diretamente a esta aula (ex: <code>https://www.youtube.com/watch?v=...</code> ou <code>https://youtu.be/...</code>).
                </p>

                <div className="bfa-form-group" style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block' }}>URL da Videoaula:</label>
                  <input
                    type="url"
                    value={inputVideoUrl}
                    onChange={(e) => setInputVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="bfa-input"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                    autoFocus
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                    onClick={() => {
                      if (updateLesson) {
                        updateLesson(lessonId, { videoUrl: '' });
                      }
                      setShowVideoModal(false);
                    }}
                    title="Remover vídeo desta aula"
                  >
                    <BfaIcon name="trash" size={14} /> Remover Vídeo
                  </button>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="bfa-btn bfa-btn--ghost"
                      onClick={() => setShowVideoModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="bfa-btn bfa-btn--verde"
                      onClick={() => {
                        if (updateLesson) {
                          updateLesson(lessonId, { videoUrl: inputVideoUrl.trim() });
                        }
                        setShowVideoModal(false);
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Salvar URL <BfaIcon name="save" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Audio Reader TTS Accessible Component */}
          <AudioReader textContent={markdownContent} />

          {/* Exact Markdown Theory Content */}
          <article className="bfa-lesson-article">
            <LessonContent markdownContent={markdownContent} lessonId={lessonId} />
          </article>

          {/* Interactive Quiz Engine */}
          <div className="bfa-lesson-quiz-section">
            <QuizEngine questions={aulaObj.quiz || []} lessonId={lessonId} />
          </div>

          {/* Timestamp Forum */}
          <div className="bfa-lesson-forum-section">
            <ForumTimestamps lessonId={lessonId} />
          </div>

          {/* Navigation Footer */}
          <div className="bfa-lesson-nav-footer">
            {prevAula ? (
              <a href={`#/${subjectKey}/${prevAula.moduloSlug}/${prevAula.slug}`} className="bfa-btn bfa-btn--ghost">
                ← Aula Anterior
              </a>
            ) : <div />}

            {nextAula ? (
              <a href={`#/${subjectKey}/${nextAula.moduloSlug}/${nextAula.slug}`} className={`bfa-btn ${isMatematica ? 'bfa-btn--verde' : 'bfa-btn--azul'}`}>
                Próxima Aula →
              </a>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
}
