const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function DisciplinaOverview({ subjectKey }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;

  if (!subjectData) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Disciplina não encontrada.</div>;
  }

  const isMatematica = subjectKey === 'matematica';
  const trackColor = isMatematica ? 'var(--track-math)' : 'var(--track-finance)';

  let totalLessons = 0;
  let doneCount = 0;

  subjectData.modulos.forEach(mod => {
    mod.aulas.forEach(aula => {
      totalLessons++;
      const lessonId = `${subjectKey}-${mod.slug}-${aula.slug}`;
      if (completedLessons && completedLessons.includes(lessonId)) {
        doneCount++;
      }
    });
  });

  const progressPct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.1)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>
            Trilha de Aprendizado
          </span>

          <EditableBlock id={`overview-${subjectKey}-hero-title`} as="h1" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF', marginTop: '1rem' }}>
            {isMatematica ? 'Matemática Aplicada a Finanças' : 'Finanças & Investimentos'}
          </EditableBlock>

          <div className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.5rem' }}>
            {subjectData.modulos.length} MÓDULOS · {totalLessons} AULAS TOTAL
          </div>

          <div style={{ marginTop: '2rem', maxWidth: '500px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              <span>SEU PROGRESSO: {doneCount} DE {totalLessons} AULAS</span>
              <span className="mono-tag" style={{ color: 'var(--market)' }}>{progressPct}%</span>
            </div>
            <div style={{ height: '6px', width: '100%', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--market)', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Modules List */}
      <section className="bfa-container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {subjectData.modulos.map((mod, idx) => (
            <article key={mod.slug} className="module-card card-lift" style={{ borderTop: `4px solid ${trackColor}`, padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="mono-tag" style={{ color: trackColor, background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  MÓDULO {idx + 1}
                </span>
                <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>{mod.aulas.length} Aulas</span>
              </div>

              <EditableBlock id={`overview-${subjectKey}-mod-${mod.slug}-title`} as="h3" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--foreground)' }}>
                {mod.titulo}
              </EditableBlock>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginTop: '1.25rem' }}>
                {mod.aulas.map((aula) => {
                  const lessonId = `${subjectKey}-${mod.slug}-${aula.slug}`;
                  const isDone = completedLessons && completedLessons.includes(lessonId);

                  return (
                    <a
                      key={aula.slug}
                      href={`#/${subjectKey}/${mod.slug}/${aula.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: isDone ? 'var(--surface-strong)' : 'var(--card)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        {aula.titulo}
                      </span>
                      {isDone && <span className="mono-tag" style={{ color: 'var(--market)' }}>✓ Concluída</span>}
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

window.DisciplinaOverview = DisciplinaOverview;
