const { useState, useEffect, useContext, createContext, useMemo } = React;

/**
 * Variação 2: O Caderno Interativo de Alta Performance (Brilliant.org / Khan Academy Pro)
 * Foco: Pedagogia visual intuitiva, balança de capitalização, fórmulas interativas e fixação conceitual.
 */
function HomeV2() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. O Princípio dos Juros Compostos",
      formula: "M = C \\cdot (1 + i)^t",
      insight: "A cada ciclo temporal, o juro acumulado é incorporado à base principal, gerando uma curva exponencial de valorização.",
      badge: "Fundamento Algébrico"
    },
    {
      title: "2. A Constante de Euler (e ≈ 2,718)",
      formula: "\\lim_{n \\to \\infty} \\left(1 + \\frac{r}{n}\\right)^{nt} = e^{rt}",
      insight: "Quando o reinvestimento ocorre em intervalos infinitesimais contínuos, a função converge para a base natural de crescimento.",
      badge: "Cálculo Contínuo"
    },
    {
      title: "3. Equação de Fisher & Inflação Real",
      formula: "(1 + r_{\\text{real}}) = \\frac{1 + r_{\\text{nom}}}{1 + i_{\\text{ipca}}}",
      insight: "Subtrair simplesmente a inflação distorce o ganho real. A relação exata exige a divisão dos fatores temporais.",
      badge: "Poder de Compra"
    }
  ];

  const current = steps[activeStep];

  return (
    <div>
      {/* ── Hero Split 50/50: Caderno Brilliant.org ─────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            {/* Texto Esquerda */}
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono-tag" style={{ color: '#60A5FA', background: 'rgba(96, 165, 250, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(96, 165, 250, 0.35)', fontWeight: 800 }}>
                  VARIAÇÃO 02 · CADERNO BRILLIANT
                </span>
                <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.9)', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                  Pedagogia Tátil & Fórmulas
                </span>
              </div>

              <h1 className="headline-punch" style={{ fontSize: '3.35rem', fontWeight: 800, lineHeight: 1.12, color: '#FFFFFF', letterSpacing: '-0.035em', marginTop: '0.5rem' }}>
                Intuição visual antes da fórmula. Rigor matemático depois.
              </h1>

              <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                Aprenda matemática financeira e mercado de capitais através de demonstrações passo a passo, dissecação de conceitos e exercícios analíticos com gabarito.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.85rem 1.65rem', fontWeight: 700, minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}>
                  Iniciar Trilha Interativa →
                </a>
                <a href="#/exercicios" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.85rem 1.65rem', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.35)', minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}>
                  Ver Banco de Questões
                </a>
              </div>
            </div>

            {/* Visual Direita: O Caderno de Demonstração Interativo */}
            <div className="bfa-split-col--visual">
              <div className="bfa-tech-card" style={{ background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)', padding: '1.75rem' }}>
                
                {/* Abas de Lição */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {steps.map((s, idx) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.25rem',
                        fontSize: '0.72rem',
                        fontWeight: activeStep === idx ? 800 : 600,
                        borderRadius: 'var(--radius-sm)',
                        border: activeStep === idx ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: activeStep === idx ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                        color: activeStep === idx ? '#60A5FA' : '#94A3B8',
                        cursor: 'pointer'
                      }}
                    >
                      Lição 0{idx + 1}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="mono-tag" style={{ color: '#60A5FA', fontSize: '0.72rem', fontWeight: 800 }}>
                    {current.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Passo {activeStep + 1} de 3</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 1rem 0' }}>
                  {current.title}
                </h3>

                {/* Caixa de Notação Matemática KaTeX */}
                <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: '#60A5FA', letterSpacing: '0.04em' }}>
                    {current.formula}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.6, margin: '0 0 1.25rem 0', background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #3B82F6' }}>
                  {current.insight}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.75rem' }}>
                  <span style={{ color: '#94A3B8' }}>Exercício de Fixação:</span>
                  <span style={{ color: '#34D399', fontWeight: 700 }}>100% Resolvido & Comentado ✓</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

window.HomeV2 = HomeV2;
