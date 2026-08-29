const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

// Metadata for modules in each track
const TRACK_METADATA = {
  matematica: {
    "modulo-1-algebra-do-zero": {
      subtitle: "Fundamentos Algébricos e Operações Aritméticas",
      duration: "~2h 30m",
      level: "Nível Fundamental",
      competencies: ["Aritmética Rápida", "Frações & Decimais", "Regra de Três", "Potenciação", "Equações 1º Grau"]
    },
    "modulo-2-aplicada": {
      subtitle: "Juros Compostos, Inflação, IPCA e Equivalência de Taxas",
      duration: "~3h 15m",
      level: "Nível Intermediário",
      competencies: ["Juros Compostos", "Juro Real vs Nominal", "Selic vs CDI", "Tabela Regressiva IR", "Rentabilidade Líquida"]
    },
    "modulo-3-funcoes-e-probabilidade": {
      subtitle: "Funções Exponenciais, Logaritmos, PA/PG e Modelagem Estocástica",
      duration: "~4h 45m",
      level: "Nível Avançado",
      competencies: ["Função Exponencial", "Logaritmos", "Amortização SAC/Price", "Somatório (Σ)", "Valor Esperado E[X]"]
    },
    "modulo-4-estatistica": {
      subtitle: "Métricas de Dispersão, Risco, Z-Score, Volatilidade e Beta",
      duration: "~4h 30m",
      level: "Nível Quantitativo",
      competencies: ["Média, Mediana & Moda", "Desvio Padrão", "Z-Score & CV", "Covariância & Correlação", "Regressão Linear"]
    }
  },
  financas: {
    "modulo-1-fundamentos": {
      subtitle: "Topologia do SFN, Renda Fixa, Ações, FIIs e Macroeconomia",
      duration: "~4h 15m",
      level: "Nível Fundamental",
      competencies: ["Topologia SFN", "Tesouro Direto", "CDB, LCI & LCA", "Mercado de Ações", "Macroeconomia"]
    },
    "modulo-2-analise-fundamentalista": {
      subtitle: "Leitura Contábil (Balanço, DRE, DFC), Margens, Múltiplos e FCD",
      duration: "~5h 00m",
      level: "Nível Analítico",
      competencies: ["Balanço Patrimonial", "Escada da DRE", "EBITDA & DFC", "ROE & ROIC", "Múltiplos P/L & EV", "Valuation por FCD"]
    },
    "modulo-3-portfolio": {
      subtitle: "Alocação Tática, Rebalanceamento, Gestão de Risco e Portfólio Real",
      duration: "~4h 00m",
      level: "Nível Estratégico",
      competencies: ["Perfil de Risco", "Matriz de Correlação", "Alocação de Ativos", "Rebalanceamento", "Gestão Tributária"]
    }
  }
};

function DisciplinaOverview({ subjectKey }) {
  const { EXACT_CONTENT } = window;
  const { completedLessons } = useContext(ProgressContext || createContext({}));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('all');

  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[subjectKey] : null;

  if (!subjectData) {
    return <div className="bfa-container" style={{ padding: '4rem 1.5rem' }}>Disciplina não encontrada.</div>;
  }

  const isMatematica = subjectKey === 'matematica';
  const trackColor = isMatematica ? 'var(--track-math)' : 'var(--track-finance)';

  // Build flat list of all lessons with global indexing
  const allLessons = useMemo(() => {
    const list = [];
    subjectData.modulos.forEach((m, mIdx) => {
      m.aulas.forEach((a, aIdx) => {
        const lessonId = `${subjectKey}-${m.slug}-${a.slug}`;
        const isDone = completedLessons && completedLessons.includes(lessonId);
        list.push({
          ...a,
          moduloSlug: m.slug,
          moduloTitulo: m.titulo,
          moduloIdx: mIdx + 1,
          lessonIdx: aIdx + 1,
          lessonId,
          isDone
        });
      });
    });
    return list;
  }, [subjectData, subjectKey, completedLessons]);

  const totalLessons = allLessons.length;
  const doneCount = allLessons.filter(l => l.isDone).length;
  const progressPct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

  // Identify next uncompleted lesson for 1-click resume
  const nextLessonToStudy = useMemo(() => {
    return allLessons.find(l => !l.isDone) || allLessons[0];
  }, [allLessons]);

  return (
    <div>
      {/* ── 1. Hero Split-Screen ────────────────────────────────────────── */}
      <section className="hero-gradient" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            {/* Coluna Esquerda: Ementa da Trilha */}
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="mono-tag" style={{ color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 700 }}>
                  {isMatematica ? 'TRILHA 01 · MATEMÁTICA' : 'TRILHA 02 · FINANÇAS'}
                </span>
                <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 700 }}>
                  {subjectData.modulos.length} Módulos · {totalLessons} Aulas
                </span>
              </div>

              <h1 className="headline-punch" style={{ fontSize: '2.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.035em', margin: 0, lineHeight: 1.15 }}>
                {isMatematica ? 'Matemática Aplicada a Finanças' : 'Finanças & Investimentos'}
              </h1>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.75rem', maxWidth: '600px' }}>
                {isMatematica
                  ? 'Do zero algébrico à modelagem estocástica de portfólios: juros compostos contínuos, logaritmos, anuidades SAC/Price, covariância e regressão linear.'
                  : 'Da topologia do Sistema Financeiro Nacional ao valuation por Fluxo de Caixa Descontado: análise contábil profunda de DRE, balanço e alocação tática.'}
              </p>
            </div>

            {/* Coluna Direita: Ilha de Telemetria de Progresso */}
            <div className="bfa-split-col--visual">
              <div className="bfa-tech-card" style={{ background: 'rgba(15, 23, 42, 0.92)', border: '1px solid rgba(255, 255, 255, 0.14)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)', padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="mono-tag" style={{ color: '#94A3B8', fontWeight: 800, fontSize: '0.72rem' }}>
                    STATUS DO ESTUDANTE
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
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>AULAS FINALIZADAS</span>
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

      {/* ── 2. Banner de Retomada Rápida (1 Clique para Continuar) ────────── */}
      {nextLessonToStudy && (
        <section className="bfa-container" style={{ marginTop: '-1.5rem', position: 'relative', zIndex: 10 }}>
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                flexShrink: 0
              }}>
                <BfaIcon name="target" size={20} />
              </div>
              <div>
                <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem', fontWeight: 700 }}>
                  {doneCount === 0 ? 'COMECE AQUI SEUS ESTUDOS' : 'CONTINUAR DE ONDE PAROU'} · MÓDULO {nextLessonToStudy.moduloIdx}
                </span>
                <h4 style={{ margin: '0.15rem 0 0 0', fontWeight: 800, color: 'var(--foreground)', fontSize: '1.1rem' }}>
                  {nextLessonToStudy.titulo}
                </h4>
              </div>
            </div>

            <a
              href={`#/${subjectKey}/${nextLessonToStudy.moduloSlug}/${nextLessonToStudy.slug}`}
              className="bfa-btn bfa-btn--verde"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.65rem 1.35rem',
                fontWeight: 700,
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none'
              }}
            >
              <span>{doneCount === 0 ? 'Iniciar Aula 1' : 'Continuar Aula'}</span>
              <span>→</span>
            </a>
          </div>
        </section>
      )}

      {/* ── 3. Cartografia da Trilha: Stepper Vertical & Módulos ───────── */}
      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
        
        {/* Barra de Filtro e Busca Rápida */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h2 className="headline-punch" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)', margin: 0, letterSpacing: '-0.025em' }}>
              Roteiro de Formação & Ementa Oficial
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
              Siga os marcos sequenciais de aprendizado para desenvolver proficiência matemática e financeira.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`bfa-btn bfa-btn--sm ${selectedModuleFilter === 'all' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
              onClick={() => setSelectedModuleFilter('all')}
              style={{ fontWeight: 700, fontSize: '0.8rem' }}
            >
              Todos os Módulos ({subjectData.modulos.length})
            </button>
            {subjectData.modulos.map((m, idx) => (
              <button
                key={m.slug}
                type="button"
                className={`bfa-btn bfa-btn--sm ${selectedModuleFilter === m.slug ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setSelectedModuleFilter(m.slug)}
                style={{ fontWeight: 700, fontSize: '0.8rem' }}
              >
                Módulo {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Pathway Pipeline */}
        <div className="bfa-track-pathway" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
          {subjectData.modulos
            .filter(m => selectedModuleFilter === 'all' || selectedModuleFilter === m.slug)
            .map((mod, idx) => {
              const modMeta = TRACK_METADATA[subjectKey] && TRACK_METADATA[subjectKey][mod.slug] ? TRACK_METADATA[subjectKey][mod.slug] : {};
              const modAulas = mod.aulas || [];
              const modCompletedCount = modAulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${mod.slug}-${a.slug}`)).length;
              const modTotalCount = modAulas.length;
              const modProgress = modTotalCount > 0 ? Math.round((modCompletedCount / modTotalCount) * 100) : 0;
              const isModCompleted = modProgress === 100;
              const isModInProgress = modProgress > 0 && modProgress < 100;

              return (
                <div
                  key={mod.slug}
                  className="bfa-module-milestone-card"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderTop: `4px solid ${trackColor}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.06)',
                    position: 'relative'
                  }}
                >
                  {/* Cabeçalho do Marco / Módulo */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                        <span className="mono-tag" style={{ color: trackColor, background: 'rgba(15, 23, 42, 0.06)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}>
                          MARCO {idx + 1}
                        </span>
                        {modMeta.level && (
                          <span className="mono-tag" style={{ color: 'var(--muted-foreground)', background: 'var(--surface-strong)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                            {modMeta.level}
                          </span>
                        )}
                        {modMeta.duration && (
                          <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                            ⏱ {modMeta.duration}
                          </span>
                        )}
                        <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                          · {modTotalCount} Aulas com Exercícios
                        </span>
                      </div>

                      <a
                        href={`#/${subjectKey}/${mod.slug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        title="Ver ementa completa deste módulo"
                      >
                        <h3 className="headline-punch" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.025em', margin: '0.25rem 0', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <span>{mod.titulo}</span>
                          <span style={{ color: trackColor, fontSize: '1.1rem' }}>→</span>
                        </h3>
                      </a>

                      {modMeta.subtitle && (
                        <p style={{ margin: '0.35rem 0 0 0', color: 'var(--muted-foreground)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                          {modMeta.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Botões de Ação do Módulo */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span className="mono-tag" style={{ color: isModCompleted ? '#059669' : 'var(--muted-foreground)', fontWeight: 700, fontSize: '0.8rem' }}>
                          {modCompletedCount}/{modTotalCount} Concluídas ({modProgress}%)
                        </span>
                        <a
                          href={`#/${subjectKey}/${mod.slug}`}
                          className="bfa-btn bfa-btn--sm bfa-btn--secondary-glass"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 700, borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
                        >
                          Introdução & Ementa →
                        </a>
                      </div>

                      {/* Mini Barra de Progresso do Módulo */}
                      <div style={{ width: '160px', height: '6px', background: 'var(--surface-strong)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${modProgress}%`, height: '100%', background: isModCompleted ? '#10B981' : trackColor, borderRadius: '999px', transition: 'width 0.3s ease' }} />
                      </div>
                    </div>
                  </div>

                  {/* Pílulas de Competências de Mercado */}
                  {modMeta.competencies && modMeta.competencies.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Competências:
                      </span>
                      {modMeta.competencies.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--surface-strong)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)'
                          }}
                        >
                          #{comp}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Lista de Aulas Ricas com Metadados e Status */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.85rem' }}>
                    {modAulas.map((aula, aIdx) => {
                      const lessonId = `${subjectKey}-${mod.slug}-${aula.slug}`;
                      const isDone = completedLessons && completedLessons.includes(lessonId);

                      return (
                        <a
                          key={aula.slug}
                          href={`#/${subjectKey}/${mod.slug}/${aula.slug}`}
                          className="bfa-lesson-card-rich"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.25rem',
                            borderRadius: 'var(--radius-md)',
                            border: isDone ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid var(--border)',
                            background: isDone ? 'rgba(16, 185, 129, 0.04)' : 'var(--surface-strong)',
                            textDecoration: 'none',
                            transition: 'all 0.18s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
                            {/* Número ou Check */}
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: isDone ? '#10B981' : 'var(--card)',
                              border: isDone ? 'none' : '1px solid var(--border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: isDone ? '#FFFFFF' : 'var(--muted-foreground)',
                              flexShrink: 0
                            }}>
                              {isDone ? '✓' : String(aIdx + 1).padStart(2, '0')}
                            </div>

                            {/* Título da Aula */}
                            <div style={{ minWidth: 0 }}>
                              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--foreground)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {aula.titulo}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                                <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>⚡ 15 min</span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>· 🎯 Quiz</span>
                              </div>
                            </div>
                          </div>

                          {/* Status */}
                          <div style={{ marginLeft: '0.75rem', flexShrink: 0 }}>
                            {isDone ? (
                              <span className="mono-tag" style={{ color: '#059669', background: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                                Concluída
                              </span>
                            ) : (
                              <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: 600 }}>→</span>
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
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
  const modProgress = modTotalCount > 0 ? Math.round((modCompletedCount / modTotalCount) * 100) : 0;

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
                    <BfaIcon name="book" size={13} color="var(--muted-foreground)" />
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
        <article className="bfa-lesson-article" style={{ fontSize: '1.05rem', lineHeight: 1.85 }}>
          <LessonContent markdownContent={moduloObj.index || moduloObj.indexContent || ""} lessonId={`intro-${moduloSlug}`} />
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
                Começar Módulo: Aula 1 →
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

      </main>
    </div>
  );
}

window.DisciplinaOverview = DisciplinaOverview;
window.ModuloIntroPage = ModuloIntroPage;
