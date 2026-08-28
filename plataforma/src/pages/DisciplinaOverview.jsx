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

      {/* ── 2. Grade de Módulos com Sumário Executivo e Matriz de Competências ─ */}
      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '3rem' }}>
          {subjectData.modulos.map((mod, idx) => {
            const moduleMeta = {
              'modulo-1-algebra-do-zero': {
                horas: '3h de estudo',
                competencias: ['Operações com decimais e frações sem calculadora', 'Porcentagem, variação e regra de três em finanças', 'Equações lineares e notação científica']
              },
              'modulo-2-aplicada': {
                horas: '4h de estudo',
                competencias: ['Juros simples vs compostos e valor no tempo', 'Equação de Fisher: Inflação e Juros Reais', 'Rentabilidade líquida com IR e CDI vs. Selic']
              },
              'modulo-3-funcoes-e-probabilidade': {
                horas: '5h de estudo',
                competencias: ['Modelagem exponencial e logarítmica (Regra do 72)', 'Progressões PA/PG e modelo de perpetuidades', 'Probabilidade estatística e Valor Esperado E[X]']
              },
              'modulo-4-estatistica': {
                horas: '5h de estudo',
                competencias: ['Médias aritmética, geométrica e ponderada', 'Dispersão, desvio padrão e volatilidade de ativos', 'Correlação de Pearson e Regressão Linear com Beta']
              },
              'modulo-1-fundamentos': {
                horas: '4h de estudo',
                competencias: ['Arquitetura do Sistema Financeiro Nacional (BACEN/CVM)', 'Renda Fixa: Tesouro Direto, CDBs e títulos bancários', 'Mercado de Ações, FIIs, Fundos e Macroeconomia']
              },
              'modulo-2-analise-fundamentalista': {
                horas: '6h de estudo',
                competencias: ['Leitura técnica de Balanço Patrimonial e DRE', 'Demonstração de Fluxo de Caixa (DFC) e EBITDA', 'Múltiplos de Valuation e Fluxo de Caixa Descontado']
              },
              'modulo-3-portfolio': {
                horas: '5h de estudo',
                competencias: ['Perfil de investidor e matriz de correlação entre classes', 'Alocação de ativos e diversificação de Markowitz', 'Rebalanceamento periódico, eficiência tributária e custos']
              }
            }[mod.slug] || {
              horas: '4h de estudo',
              competencias: ['Fundamentos essenciais da disciplina', 'Exercícios práticos com gabarito passo a passo', 'Aplicações reais de tomada de decisão financeira']
            };

            const modCompletedCount = mod.aulas.filter(a => completedLessons && completedLessons.includes(`${subjectKey}-${mod.slug}-${a.slug}`)).length;
            const modTotalCount = mod.aulas.length;
            const modProgress = Math.round((modCompletedCount / modTotalCount) * 100);

            return (
              <article key={mod.slug} className="bfa-tech-card" style={{ borderTop: `4px solid ${trackColor}`, padding: '2.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mono-tag" style={{ color: trackColor, background: 'rgba(15, 23, 42, 0.06)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                      MÓDULO {idx + 1}
                    </span>
                    <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                      {moduleMeta.horas} · {mod.aulas.length} Aulas com Quiz
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mono-tag" style={{ color: modProgress === 100 ? '#059669' : 'var(--muted-foreground)', fontWeight: 700 }}>
                      {modCompletedCount}/{modTotalCount} Concluídas ({modProgress}%)
                    </span>
                  </div>
                </div>

                <EditableBlock id={`overview-${subjectKey}-mod-${mod.slug}-title`} as="h3" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
                  {mod.titulo}
                </EditableBlock>

                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '850px' }}>
                  {mod.descricao}
                </p>

                {/* Matriz de Competências */}
                <div style={{ background: 'var(--surface-strong)', padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '1.75rem' }}>
                  <span className="mono-tag" style={{ color: 'var(--foreground)', fontWeight: 800, fontSize: '0.72rem', display: 'block', marginBottom: '0.65rem' }}>
                    COMPETÊNCIAS DESENVOLVIDAS NESTE MÓDULO:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
                    {moduleMeta.competencias.map((comp, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--foreground)' }}>
                        <span style={{ color: trackColor, fontWeight: 800 }}>✓</span>
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grade de Aulas */}
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

window.DisciplinaOverview = DisciplinaOverview;
