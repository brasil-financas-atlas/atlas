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

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 4rem)' }}>
      {/* Sidebar - Curriculum Tree */}
      <aside style={{
        width: sidebarOpen ? '320px' : '0px',
        transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden',
        borderRight: '1px solid var(--border)',
        background: 'var(--card)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={`#/${subjectKey}`} className="mono-tag" style={{ color: trackColor, fontWeight: 700 }}>
            ← Voltar para {isMatematica ? 'Matemática' : 'Finanças'}
          </a>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {subjectData.modulos.map((m, idx) => (
            <div key={m.slug} style={{ marginBottom: '1.25rem' }}>
              <div className="mono-tag" style={{ color: 'var(--muted-foreground)', marginBottom: '0.4rem', fontSize: '0.6875rem' }}>
                MÓDULO {idx + 1} · {m.titulo}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {m.aulas.map((a) => {
                  const itemLessonId = `${subjectKey}-${m.slug}-${a.slug}`;
                  const itemDone = completedLessons && completedLessons.includes(itemLessonId);
                  const isCurrent = a.slug === aulaSlug && m.slug === moduloSlug;

                  return (
                    <a
                      key={a.slug}
                      href={`#/${subjectKey}/${m.slug}/${a.slug}`}
                      className="nav-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        fontWeight: isCurrent ? 700 : 500,
                        backgroundColor: isCurrent ? 'var(--secondary)' : 'transparent',
                        borderLeft: isCurrent ? `3px solid ${trackColor}` : 'none',
                        color: isCurrent ? 'var(--foreground)' : 'var(--muted-foreground)',
                        padding: '0.45rem 0.65rem'
                      }}
                    >
                      <span>{a.titulo}</span>
                      {itemDone && <span className="mono-tag" style={{ color: 'var(--market)', fontSize: '0.65rem' }}>✓</span>}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Classroom Canvas */}
      <main style={{ flex: 1, padding: '2rem 2.5rem', maxWidth: '1050px', margin: '0 auto' }}>
        {/* Top Breadcrumb & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="nav-link" style={{ cursor: 'pointer', border: '1px solid var(--border)' }}>
              {sidebarOpen ? '◀ Ocultar Trilha' : '▶ Ver Trilha'}
            </button>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>
              {isMatematica ? 'Matemática' : 'Finanças'} / {moduloObj.titulo} / <strong style={{ color: 'var(--foreground)' }}>{aulaObj.titulo}</strong>
            </span>
          </div>

          <button
            onClick={() => toggleLessonComplete(lessonId)}
            className="btn-primary"
            style={{ backgroundColor: isDone ? 'var(--market)' : 'var(--secondary)', color: isDone ? '#FFFFFF' : 'var(--foreground)', border: '1px solid var(--border)' }}
          >
            {isDone ? '✓ Concluída' : 'Marcar como Concluída'}
          </button>
        </div>

        {/* Audio Reader Accessibility */}
        <AudioReader markdownContent={markdownContent} lessonTitle={aulaObj.titulo} />

        {/* Napkin Briefing Card */}
        <div className="napkin-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem' }}>{aulaObj.titulo}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
            Estudo guiado de matemática aplicada e tomada de decisão financeira para estudantes do ensino médio.
          </p>
        </div>

        {/* Video Player */}
        <div style={{ marginBottom: '2.5rem' }}>
          <VideoPlayer videoUrl={videoUrl} />
        </div>

        {/* Markdown Theory Article */}
        <article className="bfa-lesson-article" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
          <LessonContent markdownContent={markdownContent} lessonId={lessonId} />
        </article>

        {/* Quiz Engine */}
        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <QuizEngine questions={aulaObj.quiz || []} lessonId={lessonId} />
        </div>

        {/* Timestamps Forum */}
        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <ForumTimestamps lessonId={lessonId} />
        </div>

        {/* Bottom Lesson Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          {prevAula ? (
            <a href={`#/${subjectKey}/${prevAula.moduloSlug}/${prevAula.slug}`} className="nav-link" style={{ border: '1px solid var(--border)', padding: '0.65rem 1.15rem' }}>
              ← Aula Anterior
            </a>
          ) : <div />}

          {nextAula ? (
            <a href={`#/${subjectKey}/${nextAula.moduloSlug}/${nextAula.slug}`} className="btn-primary">
              Próxima Aula →
            </a>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}

window.AulaPage = AulaPage;
