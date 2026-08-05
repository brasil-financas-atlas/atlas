const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function DisciplinaOverview({ subjectKey }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;

  if (!subjectData) {
    return <div className="bfa-container bfa-py-5">Disciplina não encontrada.</div>;
  }

  const isMatematica = subjectKey === 'matematica';
  const colorClass = isMatematica ? 'matematica' : 'financas';
  const badgeColor = isMatematica ? 'bfa-badge--verde' : 'bfa-badge--azul';
  const btnColor = isMatematica ? 'bfa-btn--verde' : 'bfa-btn--azul';

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
    <div className={`bfa-overview bfa-overview--${colorClass}`}>
      <div className="bfa-overview__hero">
        <div className="bfa-overview__container">
          <span className={`bfa-badge ${badgeColor}`}>Trilha de Aprendizado</span>
          <EditableBlock id={`overview-${subjectKey}-hero-title`} as="h1">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <BfaIcon name={isMatematica ? "math" : "finance"} size={32} color="#FFFFFF" />
              {isMatematica ? 'Matemática Aplicada a Finanças' : 'Finanças & Investimentos'}
            </span>
          </EditableBlock>
          <div className="bfa-overview__meta">
            <span>{subjectData.modulos.length} Módulos</span> • <span>{totalLessons} Aulas no total</span>
          </div>

          <div className="bfa-overview__progress">
            <div className="bfa-overview__progress-info">
              <EditableBlock id={`overview-${subjectKey}-progress-label`} as="span">
                Seu Progresso: {doneCount} de {totalLessons} aulas concluídas
              </EditableBlock>
              <span>{progressPct}%</span>
            </div>
            <div className="bfa-progress-bar">
              <div className="bfa-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bfa-section">
        <div className="bfa-section__container">
          <div className="bfa-markdown-body" style={{ marginBottom: '2rem' }}>
            <LessonContent markdownContent={subjectData.index} lessonId={`overview-${subjectKey}`} />
          </div>

          <EditableBlock id={`overview-${subjectKey}-modules-title`} as="h2" className="bfa-section__title">
            Módulos de Estudo
          </EditableBlock>
          <div className="bfa-modules-list">
            {subjectData.modulos.map((mod, idx) => (
              <div key={mod.slug} className="bfa-module-card">
                <div className="bfa-module-card__header">
                  <span className="bfa-module-card__num">Módulo {idx + 1}</span>
                  <EditableBlock id={`overview-${subjectKey}-mod-${mod.slug}-title`} as="h3">
                    {mod.titulo}
                  </EditableBlock>
                  <span className="bfa-badge bfa-badge--gray">{mod.aulas.length} Aulas</span>
                </div>
                <div className="bfa-module-card__lessons">
                  {mod.aulas.map((aula, aIdx) => {
                    const lessonId = `${subjectKey}-${mod.slug}-${aula.slug}`;
                    const isDone = completedLessons && completedLessons.includes(lessonId);

                    return (
                      <a
                        key={aula.slug}
                        href={`#/${subjectKey}/${mod.slug}/${aula.slug}`}
                        className={`bfa-module-card__lesson-item ${isDone ? 'completed' : ''}`}
                      >
                        <span className="bfa-lesson-status" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          {isDone ? (
                            <BfaIcon name="checkCircle" size={18} color="var(--color-verde)" />
                          ) : (
                            <BfaIcon name="circle" size={18} color="var(--color-slate-300)" />
                          )}
                        </span>
                        <span className="bfa-lesson-num">{aIdx + 1}.</span>
                        <EditableBlock id={`overview-${subjectKey}-aula-${aula.slug}-title`} as="span" className="bfa-lesson-title">
                          {aula.titulo}
                        </EditableBlock>
                        <span className="bfa-lesson-arrow">➔</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
