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
      {/* ── 1. Hero Split-Screen 50/50 ──────────────────────────────────── */}
      <section className="hero-gradient" style={{ padding: '5rem 0 4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            {/* Coluna Esquerda: Ementa da Trilha */}
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.95)', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 700 }}>
                  {isMatematica ? 'TRILHA 01 · MATEMÁTICA' : 'TRILHA 02 · FINANÇAS'}
                </span>
                <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 700 }}>
                  {subjectData.modulos.length} Módulos · {totalLessons} Aulas
                </span>
              </div>

              <EditableBlock id={`overview-${subjectKey}-hero-title`} as="h1" className="headline-punch" style={{ fontSize: '3.2rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem', letterSpacing: '-0.035em' }}>
                {isMatematica ? 'Matemática Aplicada a Finanças' : 'Finanças & Investimentos'}
              </EditableBlock>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                {isMatematica
                  ? 'Domine a álgebra de juros compostos contínuos, taxas equivalentes, amortização SAC/Price e modelagem quantitativa para o mercado financeiro.'
                  : 'Compreenda a arquitetura do Sistema Financeiro Nacional, renda fixa soberana, fundos imobiliários, leitura contábil e valuation de empresas.'}
              </p>
            </div>

            {/* Coluna Direita: Ilha de Telemetria de Progresso */}
            <div className="bfa-split-col--visual">
              <div className="bfa-tech-card" style={{ background: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="mono-tag" style={{ color: '#94A3B8', fontWeight: 800, fontSize: '0.72rem' }}>
                    TELEMETRIA DO ALUNO
                  </span>
                  <span className="tabular-numbers" style={{ color: '#10B981', fontWeight: 800, fontSize: '1.1rem' }}>
                    {progressPct}% Concluído
                  </span>
                </div>

                <div style={{ height: '8px', width: '100%', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>AULAS CONCLUÍDAS</span>
                    <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>{doneCount} / {totalLessons}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>CERTIFICADO</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: progressPct === 100 ? '#10B981' : '#FBBF24', marginTop: '4px' }}>
                      {progressPct === 100 ? 'Disponível' : 'Em Andamento'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Grade de Módulos Compacta & Limpa ───────────────────────── */}
      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem 5rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '2.5rem' }}>
          {subjectData.modulos.map((mod, idx) => {
            const modCompletedCount = mod.aulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${mod.slug}-${a.slug}`)).length;
            const modTotalCount = mod.aulas.length;
            const modProgress = Math.round((modCompletedCount / modTotalCount) * 100);

            return (
              <article key={mod.slug} className="bfa-tech-card" style={{ borderTop: `4px solid ${trackColor}`, padding: '1.75rem 2rem' }}>
                
                {/* Cabeçalho do Módulo */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span className="mono-tag" style={{ color: trackColor, background: 'rgba(15, 23, 42, 0.06)', padding: '0.25rem 0.55rem', borderRadius: '4px', fontWeight: 800 }}>
                        MÓDULO {idx + 1}
                      </span>
                      <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                        {mod.aulas.length} Aulas com Quiz
                      </span>
                    </div>

                    <a
                      href={`#/${subjectKey}/${mod.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      title="Clique para ler a introdução do módulo"
                    >
                      <h3
                        className="headline-punch"
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 800,
                          color: 'var(--foreground)',
                          letterSpacing: '-0.025em',
                          margin: '0.2rem 0',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>{mod.titulo}</span>
                        <span style={{ color: trackColor, fontSize: '1.1rem', transition: 'transform 0.2s ease' }}>→</span>
                      </h3>
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="mono-tag" style={{ color: modProgress === 100 ? '#059669' : 'var(--muted-foreground)', fontWeight: 700 }}>
                      {modCompletedCount}/{modTotalCount} Concluídas ({modProgress}%)
                    </span>
                    <a
                      href={`#/${subjectKey}/${mod.slug}`}
                      className="bfa-btn bfa-btn--sm bfa-btn--secondary-glass"
                      style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 700, borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
                    >
                      Introdução do Módulo →
                    </a>
                  </div>
                </div>

                {/* Grade de Aulas do Módulo */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  {mod.aulas.map((aula, aIdx) => {
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
                          padding: '0.95rem 1.15rem',
                          borderRadius: 'var(--radius-md)',
                          border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border)',
                          background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface-strong)',
                          transition: 'all 0.2s ease',
                          textDecoration: 'none'
                        }}
                        className="card-lift"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span className="tabular-numbers" style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--muted-foreground)' }}>
                            {String(aIdx + 1).padStart(2, '0')}
                          </span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)' }}>
                            {aula.titulo}
                          </span>
                        </div>
                        {isDone ? (
                          <span className="mono-tag" style={{ color: '#059669', background: '#ECFDF5', padding: '0.2rem 0.45rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                            Concluída
                          </span>
                        ) : (
                          <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>→</span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   3. PÁGINA DEDICADA DE INTRODUÇÃO AO MÓDULO (ESTILO MKDOCS)
   ========================================================================== */
function ModuloIntroPage({ subjectKey, moduloSlug }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons } = useContext(ProgressContext || createContext({}));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;
  if (!subjectData) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Disciplina não encontrada.</div>;
  }

  const moduloObj = subjectData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloObj) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Módulo não encontrado.</div>;
  }

  const isMatematica = subjectKey === 'matematica';
  const trackColor = isMatematica ? 'var(--track-math)' : 'var(--track-finance)';

  const modCompletedCount = moduloObj.aulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${moduloObj.slug}-${a.slug}`)).length;
  const modTotalCount = moduloObj.aulas.length;
  const modProgress = Math.round((modCompletedCount / modTotalCount) * 100);

  const firstAula = moduloObj.aulas[0];

  return (
    <div className="aula-layout">
      {/* Sidebar - Curriculum Tree */}
      <aside className={`aula-sidebar ${!sidebarOpen ? 'closed' : ''}`} style={{ borderRight: '1px solid var(--border)', background: 'var(--card)' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={`#/${subjectKey}`} className="mono-tag" style={{ color: trackColor, fontWeight: 800, fontSize: '0.78rem', textDecoration: 'none' }}>
            ← Voltar para {isMatematica ? 'Matemática' : 'Finanças'}
          </a>
        </div>

        <div className="aula-sidebar-content" style={{ padding: '1.25rem 1rem' }}>
          {subjectData.modulos.map((m, idx) => {
            const isCurrentMod = m.slug === moduloSlug;
            return (
              <div key={m.slug} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <a
                    href={`#/${subjectKey}/${m.slug}`}
                    className="mono-tag"
                    style={{
                      color: isCurrentMod ? trackColor : 'var(--muted-foreground)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textDecoration: 'none'
                    }}
                  >
                    MÓDULO {idx + 1} · {m.titulo}
                  </a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {/* Link da Introdução do Módulo */}
                  <a
                    href={`#/${subjectKey}/${m.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.82rem',
                      fontWeight: isCurrentMod ? 800 : 600,
                      backgroundColor: isCurrentMod ? 'var(--surface-strong)' : 'transparent',
                      borderLeft: isCurrentMod ? `3px solid ${trackColor}` : '3px solid transparent',
                      color: isCurrentMod ? 'var(--foreground)' : 'var(--muted-foreground)',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>📖</span>
                    <span>Introdução do Módulo</span>
                  </a>

                  {/* Aulas do Módulo */}
                  {m.aulas.map((a, aIdx) => {
                    const itemLessonId = `${subjectKey}-${m.slug}-${a.slug}`;
                    const itemDone = completedLessons && completedLessons.includes(itemLessonId);

                    return (
                      <a
                        key={a.slug}
                        href={`#/${subjectKey}/${m.slug}/${a.slug}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          backgroundColor: 'transparent',
                          borderLeft: '3px solid transparent',
                          color: 'var(--muted-foreground)',
                          padding: '0.45rem 0.65rem',
                          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="tabular-numbers" style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                            {String(aIdx + 1).padStart(2, '0')}
                          </span>
                          <span>{a.titulo}</span>
                        </div>
                        {itemDone && <span className="mono-tag" style={{ color: '#059669', fontSize: '0.68rem', fontWeight: 800 }}>✓</span>}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="aula-main" style={{ minWidth: 0, padding: '2.5rem 3rem' }}>
        
        {/* Top Header Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bfa-btn"
              style={{
                cursor: 'pointer',
                border: '1px solid var(--border)',
                background: 'var(--surface-strong)',
                color: 'var(--foreground)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              {sidebarOpen ? 'Ocultar Trilha' : 'Ver Trilha'}
            </button>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
              <a href={`#/${subjectKey}`} style={{ color: 'inherit', textDecoration: 'none' }}>{isMatematica ? 'Matemática' : 'Finanças'}</a> / <strong style={{ color: 'var(--foreground)' }}>{moduloObj.titulo}</strong> / Introdução
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="mono-tag" style={{ color: modProgress === 100 ? '#059669' : 'var(--muted-foreground)', fontWeight: 700 }}>
              Progresso do Módulo: {modCompletedCount}/{modTotalCount} ({modProgress}%)
            </span>
          </div>
        </div>

        {/* Briefing Card do Módulo */}
        <div className="bfa-tech-card" style={{ marginBottom: '2.5rem', padding: '2rem', borderTop: `4px solid ${trackColor}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <span className="mono-tag" style={{ color: trackColor, fontWeight: 800, fontSize: '0.75rem' }}>
              INTRODUÇÃO DO MÓDULO
            </span>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
              {moduloObj.aulas.length} Aulas com Exercícios
            </span>
          </div>
          <h1 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.025em', margin: '0.25rem 0 0.75rem 0' }}>
            {moduloObj.titulo}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.6 }}>
            Visão geral da ementa, objetivos de aprendizagem, pré-requisitos e roteiro de estudos recomendado.
          </p>
        </div>

        {/* Artigo Markdown de Introdução (Exatamente como o MkDocs index.md) */}
        <article className="bfa-lesson-article" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
          <LessonContent markdownContent={moduloObj.indexContent} />
        </article>

        {/* Grade de Aulas do Módulo */}
        <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 className="headline-punch" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', margin: 0 }}>
                Aulas Disponíveis neste Módulo
              </h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
                Estude na ordem recomendada para melhor assimilação dos conceitos.
              </p>
            </div>

            {firstAula && (
              <a
                href={`#/${subjectKey}/${moduloSlug}/${firstAula.slug}`}
                className="bfa-btn bfa-btn--verde"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: 800, borderRadius: 'var(--radius-md)', textDecoration: 'none' }}
              >
                Começar Módulo: Aula 1 ➔
              </a>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {moduloObj.aulas.map((aula, aIdx) => {
              const lessonId = `${subjectKey}-${moduloSlug}-${aula.slug}`;
              const isDone = completedLessons && completedLessons.includes(lessonId);

              return (
                <a
                  key={aula.slug}
                  href={`#/${subjectKey}/${moduloSlug}/${aula.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.35rem',
                    borderRadius: 'var(--radius-md)',
                    border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border)',
                    background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface-strong)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  className="card-lift"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span className="tabular-numbers" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--muted-foreground)' }}>
                      {String(aIdx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      {aula.titulo}
                    </span>
                  </div>
                  {isDone ? (
                    <span className="mono-tag" style={{ color: '#059669', background: '#ECFDF5', padding: '0.25rem 0.55rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}>
                      Concluída
                    </span>
                  ) : (
                    <span style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>→</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Rodapé de Navegação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border)' }}>
          <a
            href={`#/${subjectKey}`}
            className="bfa-btn bfa-btn--secondary-glass"
            style={{ textDecoration: 'none', padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
          >
            ← Voltar para a Trilha Completa
          </a>

          {firstAula && (
            <a
              href={`#/${subjectKey}/${moduloSlug}/${firstAula.slug}`}
              className="bfa-btn bfa-btn--verde"
              style={{ textDecoration: 'none', padding: '0.65rem 1.35rem', fontSize: '0.88rem', fontWeight: 700 }}
            >
              Ir para Aula 1: {firstAula.titulo} ➔
            </a>
          )}
        </div>

      </main>
    </div>
  );
}

window.DisciplinaOverview = DisciplinaOverview;
window.ModuloIntroPage = ModuloIntroPage;

