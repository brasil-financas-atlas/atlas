const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function DisciplinaOverview({ subjectKey }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;

  if (!subjectData) {
    return <div className="site-container" style={{ padding: '4rem 1.5rem' }}>Disciplina não encontrada.</div>;
  }

  const isMatematica = subjectKey === 'matematica';
  const trackColor = isMatematica ? 'var(--primary)' : 'var(--primary)';

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
      {/* ── 1. Hero Overview (BRHSIC Clean Design) ───────────────── */}
      <section style={{ padding: '4.5rem 0 3.5rem 0', background: 'var(--bg-surface-blue)', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Column: Curriculum Info */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--primary-foreground)', background: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {isMatematica ? 'TRILHA 01 · MATEMÁTICA' : 'TRILHA 02 · FINANÇAS'}
                </span>
                <span style={{ color: 'var(--text-secondary)', background: 'var(--bg-app)', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 500 }}>
                  {subjectData.modulos.length} Módulos · {totalLessons} Aulas
                </span>
              </div>

              <EditableBlock id={`overview-${subjectKey}-hero-title`} as="h1" style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0.5rem 0 1rem 0' }}>
                {isMatematica ? 'Matemática Aplicada a Finanças' : 'Finanças & Mercado de Capitais'}
              </EditableBlock>

              <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, maxWidth: '580px' }}>
                {isMatematica
                  ? 'Domine a álgebra de juros compostos, taxas equivalentes, amortização SAC/Price e modelagem quantitativa para o mercado financeiro.'
                  : 'Compreenda a arquitetura do Sistema Financeiro Nacional, renda fixa, ações da B3, fundos imobiliários e leitura de demonstrativos contábeis.'}
              </p>
            </div>

            {/* Right Column: Progress Telemetry Island */}
            <div>
              <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    SEU PROGRESSO NA TRILHA
                  </span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.15rem', fontFamily: 'var(--font-display)' }}>
                    {progressPct}% Concluído
                  </span>
                </div>

                <div style={{ height: '8px', width: '100%', background: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--primary)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Aulas Concluídas</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{doneCount} / {totalLessons}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500 }}>Certificado</span>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: progressPct === 100 ? 'var(--accent-green)' : 'var(--accent-gold)', marginTop: '4px' }}>
                      {progressPct === 100 ? 'Disponível' : 'Em Andamento'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Compact & Clean Modules Grid ───────────────────────── */}
      <section className="site-container" style={{ padding: '4rem 1.5rem 6rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '2.5rem' }}>
          {subjectData.modulos.map((mod, idx) => {
            const modCompletedCount = mod.aulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${mod.slug}-${a.slug}`)).length;
            const modTotalCount = mod.aulas.length;
            const modProgress = Math.round((modCompletedCount / modTotalCount) * 100);

            return (
              <article key={mod.slug} className="module-card" style={{ padding: '2rem' }}>
                
                {/* Module Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: trackColor, background: 'var(--bg-surface-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                        MÓDULO {idx + 1}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>
                        {mod.aulas.length} Aulas com Quiz
                      </span>
                    </div>

                    <a
                      href={`#/${subjectKey}/${mod.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      title="Clique para ler a introdução do módulo"
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>{mod.titulo}</span>
                        <span style={{ color: trackColor, fontSize: '1.25rem', transition: 'transform 0.2s ease' }}>→</span>
                      </h3>
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: modProgress === 100 ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>
                      {modCompletedCount}/{modTotalCount} Concluídas ({modProgress}%)
                    </span>
                    <a
                      href={`#/${subjectKey}/${mod.slug}`}
                      className="btn-secondary"
                    >
                      Introdução do Módulo →
                    </a>
                  </div>
                </div>

                {/* Module Lessons Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
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
                          padding: '1rem 1.25rem',
                          borderRadius: 'var(--radius-md)',
                          border: isDone ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                          background: isDone ? 'rgba(0, 196, 140, 0.05)' : 'var(--bg-surface)',
                          transition: 'all 0.2s ease',
                          textDecoration: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {String(aIdx + 1).padStart(2, '0')}
                          </span>
                          <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            {aula.titulo}
                          </span>
                        </div>
                        {isDone ? (
                          <span style={{ color: 'var(--accent-green)', background: '#E6F9F3', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600, fontSize: '0.75rem' }}>
                            Concluída
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>→</span>
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
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const [expandedMods, setExpandedMods] = useState({ [moduloSlug]: true });

  useEffect(() => {
    setExpandedMods({ [moduloSlug]: true });
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [moduloSlug]);

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;
  if (!subjectData) {
    return <div className="site-container" style={{ padding: '4rem 1.5rem' }}>Disciplina não encontrada.</div>;
  }

  const moduloObj = subjectData.modulos.find(m => m.slug === moduloSlug);
  if (!moduloObj) {
    return <div className="site-container" style={{ padding: '4rem 1.5rem' }}>Módulo não encontrado.</div>;
  }

  const isMatematica = subjectKey === 'matematica';
  const trackColor = isMatematica ? 'var(--primary)' : 'var(--primary)';

  const modCompletedCount = moduloObj.aulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${moduloObj.slug}-${a.slug}`)).length;
  const modTotalCount = moduloObj.aulas.length;
  const modProgress = modTotalCount > 0 ? Math.round((modCompletedCount / modTotalCount) * 100) : 0;

  const firstAula = moduloObj.aulas[0];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 768 && (
          <div
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          />
        )}

      {/* Sidebar - Curriculum Tree */}
      <aside style={{
        position: sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 768 ? 'fixed' : 'relative',
        zIndex: 50,
        display: sidebarOpen ? 'block' : 'none',
        width: '320px',
        flexShrink: 0,
        height: '100vh',
        overflowY: 'auto',
        borderRight: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'var(--bg-surface)', zIndex: 10 }}>
          <a href={`#/${subjectKey}`} style={{ color: trackColor, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
            ← Voltar para {isMatematica ? 'Matemática' : 'Finanças'}
          </a>
          {typeof window !== 'undefined' && window.innerWidth < 768 && (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ padding: '1rem' }}>
          {subjectData.modulos.map((m, idx) => {
            const isCurrentMod = m.slug === moduloSlug;
            const isExpanded = !!expandedMods[m.slug];
            const mCompletedCount = m.aulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${m.slug}-${a.slug}`)).length;
            const mTotalCount = m.aulas.length;
            const isAllDone = mCompletedCount === mTotalCount;

            return (
              <div
                key={m.slug}
                style={{
                  marginBottom: '1rem',
                  border: isCurrentMod ? `1px solid var(--primary)` : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-app)',
                  overflow: 'hidden'
                }}
              >
                {/* Module Header Bar Accordion */}
                <div
                  onClick={() => setExpandedMods(prev => ({ ...prev, [m.slug]: !prev[m.slug] }))}
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
                    backgroundColor: isCurrentMod ? 'var(--bg-surface-blue)' : 'transparent'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: isCurrentMod ? trackColor : 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600 }}>
                        MÓDULO {idx + 1}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {m.titulo}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: isAllDone ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {mCompletedCount}/{mTotalCount}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                      ▶
                    </span>
                  </div>
                </div>

                {/* Expanded Module Content */}
                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Link da Introdução do Módulo */}
                    <a
                      href={`#/${subjectKey}/${m.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        fontWeight: isCurrentMod ? 600 : 500,
                        backgroundColor: isCurrentMod ? 'var(--bg-surface)' : 'transparent',
                        borderLeft: isCurrentMod ? `3px solid ${trackColor}` : '3px solid transparent',
                        color: isCurrentMod ? 'var(--text-primary)' : 'var(--text-secondary)',
                        padding: '0.75rem 1rem',
                        textDecoration: 'none'
                      }}
                    >
                      Introdução & Ementa
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
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            borderLeft: '3px solid transparent',
                            color: 'var(--text-secondary)',
                            padding: '0.75rem 1rem',
                            textDecoration: 'none',
                            borderTop: '1px solid var(--border-color)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              {String(aIdx + 1).padStart(2, '0')}
                            </span>
                            <span>{a.titulo}</span>
                          </div>
                          {itemDone && <span style={{ color: 'var(--accent-green)', fontSize: '1rem' }}>✓</span>}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>
        
        {/* Top Header Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn-secondary"
            >
              {sidebarOpen ? 'Ocultar Trilha' : 'Ver Trilha'}
            </button>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <a href={`#/${subjectKey}`} style={{ color: 'inherit', textDecoration: 'none' }}>{isMatematica ? 'Matemática' : 'Finanças'}</a> / <strong style={{ color: 'var(--text-primary)' }}>{moduloObj.titulo}</strong> / Introdução
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: modProgress === 100 ? 'var(--accent-green)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>
              Progresso do Módulo: {modCompletedCount}/{modTotalCount} ({modProgress}%)
            </span>
          </div>
        </div>

        {/* Briefing Card do Módulo */}
        <div style={{ marginBottom: '3rem', padding: '2.5rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ color: trackColor, fontWeight: 700, fontSize: '0.75rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--bg-surface-blue)', borderRadius: '999px' }}>
              INTRODUÇÃO DO MÓDULO
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>
              {moduloObj.aulas.length} Aulas com Exercícios
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 1rem 0' }}>
            {moduloObj.titulo}
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, maxWidth: '800px' }}>
            Visão geral da ementa, objetivos de aprendizagem, pré-requisitos e roteiro de estudos recomendado.
          </p>
        </div>

        {/* Artigo Markdown de Introdução (Exatamente como o MkDocs index.md) */}
        <article style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-primary)', maxWidth: '800px' }}>
          <LessonContent markdownContent={moduloObj.index || moduloObj.indexContent || ""} lessonId={`intro-${moduloSlug}`} />
        </article>

        {/* Grade de Aulas do Módulo */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                Aulas Disponíveis neste Módulo
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: '0.5rem 0 0 0' }}>
                Estude na ordem recomendada para melhor assimilação dos conceitos.
              </p>
            </div>

            {firstAula && (
              <a
                href={`#/${subjectKey}/${moduloSlug}/${firstAula.slug}`}
                className="btn-primary"
              >
                Começar Módulo: Aula 1 →
              </a>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
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
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: isDone ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                    background: isDone ? 'rgba(0, 196, 140, 0.05)' : 'var(--bg-surface)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {String(aIdx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {aula.titulo}
                    </span>
                  </div>
                  {isDone ? (
                    <span style={{ color: 'var(--accent-green)', background: '#E6F9F3', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.75rem' }}>
                      Concluída
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>→</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Rodapé de Navegação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <a
            href={`#/${subjectKey}`}
            className="btn-secondary"
          >
            ← Voltar para a Trilha Completa
          </a>

          {firstAula && (
            <a
              href={`#/${subjectKey}/${moduloSlug}/${firstAula.slug}`}
              className="btn-primary"
            >
              Ir para Aula 1: {firstAula.titulo} →
            </a>
          )}
        </div>

      </main>
    </div>
  );
}

window.DisciplinaOverview = DisciplinaOverview;
window.ModuloIntroPage = ModuloIntroPage;

