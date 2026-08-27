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
      {/* Hero UI/UX Pro Max */}
      <section className="hero-gradient" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>
            <span className="mono-tag" style={{ fontWeight: 700, fontSize: '0.75rem' }}>
              Trilha de Conhecimento
            </span>
          </div>

          <EditableBlock id={`overview-${subjectKey}-hero-title`} as="h1" style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', marginTop: '1rem', letterSpacing: '-0.03em' }}>
            {isMatematica ? 'Matemática Aplicada a Finanças' : 'Finanças & Investimentos'}
          </EditableBlock>

          <div className="mono-tag" style={{ color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem', fontWeight: 700, fontSize: '0.78rem' }}>
            {subjectData.modulos.length} MÓDULOS ESTRUTURADOS · {totalLessons} AULAS COM FIXAÇÃO
          </div>

          <div style={{ marginTop: '2.25rem', maxWidth: '540px', background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '0.6rem', fontWeight: 600 }}>
              <span>SEU PROGRESSO: {doneCount} DE {totalLessons} AULAS CONCLUÍDAS</span>
              <span className="mono-tag" style={{ color: '#10B981', fontWeight: 800 }}>{progressPct}%</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Modules List Bento Grid */}
      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '2.25rem' }}>
          {subjectData.modulos.map((mod, idx) => (
            <article key={mod.slug} className="bfa-bento-card" style={{ borderTop: `4px solid ${trackColor}`, padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span className="mono-tag" style={{ color: trackColor, background: 'rgba(15, 23, 42, 0.06)', padding: '0.3rem 0.65rem', borderRadius: '6px', fontWeight: 800 }}>
                  MÓDULO {idx + 1}
                </span>
                <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>{mod.aulas.length} Aulas Didáticas</span>
              </div>

              <EditableBlock id={`overview-${subjectKey}-mod-${mod.slug}-title`} as="h3" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                {mod.titulo}
              </EditableBlock>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem', marginTop: '1.5rem' }}>
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
                        padding: '0.95rem 1.1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border)',
                        background: isDone ? 'rgba(16, 185, 129, 0.06)' : 'var(--card)',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                      }}
                      className="card-lift"
                    >
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--foreground)' }}>
                        {aula.titulo}
                      </span>
                      {isDone ? (
                        <span className="mono-tag" style={{ color: '#059669', background: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>✓ Concluída</span>
                      ) : (
                        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>➔</span>
                      )}
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
