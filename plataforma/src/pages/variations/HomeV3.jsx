const { useState, useEffect, useContext, createContext, useMemo } = React;

/**
 * Variação 3: O Hub Institucional de Equity Research & Valuation (Wall Street / BRHSIC Pro)
 * Foco: Formação de analistas, relatórios de recomendação de ações, modelagem DCF e bancas avaliadoras.
 */
function HomeV3() {
  const [activeStock, setActiveStock] = useState('WEGE3');

  const stocks = {
    WEGE3: { name: 'WEG S.A.', sector: 'Bens de Capital & Motores', price: 41.20, target: 54.00, upside: 31.1, wacc: 11.2, roic: 28.6, rec: 'COMPRA (OUTPERFORM)' },
    ITUB4: { name: 'Itaú Unibanco', sector: 'Serviços Financeiros & Crédito', price: 34.50, target: 43.00, upside: 24.6, wacc: 12.8, roic: 21.4, rec: 'COMPRA (OUTPERFORM)' },
    RADL3: { name: 'Raia Drogasil', sector: 'Varejo Farmacêutico', price: 26.80, target: 32.50, upside: 21.3, wacc: 10.9, roic: 19.8, rec: 'MANTER / NEUTRO' },
  };

  const current = stocks[activeStock];

  return (
    <div>
      {/* ── Hero Split 50/50: Equity Research Hub ───────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            {/* Texto Esquerda */}
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono-tag" style={{ color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(251, 191, 36, 0.35)', fontWeight: 800 }}>
                  VARIAÇÃO 03 · EQUITY RESEARCH & BRHSIC
                </span>
                <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.9)', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                  Valuation Institucional
                </span>
              </div>

              <h1 className="headline-punch" style={{ fontSize: '3.35rem', fontWeight: 800, lineHeight: 1.12, color: '#FFFFFF', letterSpacing: '-0.035em', marginTop: '0.5rem' }}>
                Aprenda a defender teses de investimento como um analista sênior.
              </h1>

              <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                O caminho completo para a Brazil High School Investment Competition: modelagem DCF, cálculo de WACC, identificação de Moat competitivo e pitch verbal executivo.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.85rem 1.65rem', fontWeight: 700, minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}>
                  Acessar Guia BRHSIC →
                </a>
                <a href="#/financas" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.85rem 1.65rem', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.35)', minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}>
                  Ver Trilha de Finanças
                </a>
              </div>
            </div>

            {/* Visual Direita: One-Page Memo de Valuation Institucional */}
            <div className="bfa-split-col--visual">
              <div className="bfa-tech-card" style={{ background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)', padding: '1.5rem' }}>
                
                {/* Header do Report */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div>
                    <span className="mono-tag" style={{ color: '#FBBF24', fontSize: '0.72rem', fontWeight: 800 }}>
                      RELATÓRIO INSTITUCIONAL · EQUITY RESEARCH
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Padrão Brazil High School Investment Competition</div>
                  </div>
                  <span className="mono-tag" style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
                    {current.rec}
                  </span>
                </div>

                {/* Stock Selector */}
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                  {Object.keys(stocks).map((tk) => (
                    <button
                      key={tk}
                      type="button"
                      onClick={() => setActiveStock(tk)}
                      style={{
                        flex: 1,
                        padding: '0.35rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: activeStock === tk ? 800 : 600,
                        borderRadius: 'var(--radius-sm)',
                        border: activeStock === tk ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: activeStock === tk ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                        color: activeStock === tk ? '#FBBF24' : '#94A3B8',
                        cursor: 'pointer'
                      }}
                    >
                      {tk} · {stocks[tk].name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Valuation Header */}
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', fontWeight: 700 }}>PREÇO ATUAL (B3)</span>
                      <div className="tabular-numbers" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>R$ {current.price.toFixed(2)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.68rem', color: '#FBBF24', display: 'block', fontWeight: 800 }}>PREÇO-ALVO JUSTO (DCF)</span>
                      <div className="tabular-numbers" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10B981' }}>
                        R$ {current.target.toFixed(2)} <small style={{ fontSize: '0.85rem' }}>(+{current.upside}%)</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}>CUSTO (WACC)</span>
                    <span className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>{current.wacc}%</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}>RETORNO (ROIC)</span>
                    <span className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981' }}>{current.roic}%</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}>UPSIDE</span>
                    <span className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FBBF24' }}>+{current.upside}%</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

window.HomeV3 = HomeV3;
