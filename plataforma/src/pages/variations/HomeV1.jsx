const { useState, useEffect, useContext, createContext, useMemo } = React;

/**
 * Variação 1: O Terminal de Inteligência Macroeconômica (Koyfin / Bloomberg Modern)
 * Foco: Telemetria soberana, dados reais da economia brasileira (Selic, IPCA, CDI) e simulação de juro real.
 */
function HomeV1() {
  const [selectedAsset, setSelectedAsset] = useState('selic');
  const [years, setYears] = useState(10);

  const assets = {
    selic: { name: 'Tesouro Selic', rate: 10.50, realRate: 6.01, risk: 'Soberano Mínimo', tax: '15% a 22,5%' },
    ipca: { name: 'Tesouro IPCA+ 2035', rate: 10.42, realRate: 6.20, risk: 'Proteção Total IPCA', tax: '15% a 22,5%' },
    cdi: { name: 'CDB 110% CDI', rate: 11.44, realRate: 6.91, risk: 'Garantia FGC', tax: '15% a 22,5%' },
    fii: { name: 'Índice FIIs (IFIX)', rate: 11.20, realRate: 6.68, risk: 'Mercado Imobiliário', tax: 'Isento P.F.' },
  };

  const current = assets[selectedAsset];
  const initial = 10000;
  const nominalTotal = Math.round(initial * Math.pow(1 + current.rate / 100, years));
  const realTotal = Math.round(initial * Math.pow(1 + current.realRate / 100, years));

  return (
    <div>
      {/* ── Hero Split 50/50: Terminal Macro ────────────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            {/* Texto Esquerda */}
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 800 }}>
                  VARIAÇÃO 01 · TERMINAL MACRO
                </span>
                <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.9)', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                  Padrão Koyfin / Bloomberg
                </span>
              </div>

              <h1 className="headline-punch" style={{ fontSize: '3.35rem', fontWeight: 800, lineHeight: 1.12, color: '#FFFFFF', letterSpacing: '-0.035em', marginTop: '0.5rem' }}>
                O termômetro do mercado financeiro brasileiro em tempo real.
              </h1>

              <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                Aprenda finanças dissecando a dinâmica macroeconômica real: política monetária do BACEN, títulos soberanos do Tesouro Direto, juro real pela Equação de Fisher e mercado de capitais.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.85rem 1.65rem', fontWeight: 700, minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}>
                  Abrir Trilha de Finanças →
                </a>
                <a href="#/matematica" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.85rem 1.65rem', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.35)', minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}>
                  Ver Matemática Financeira
                </a>
              </div>
            </div>

            {/* Visual Direita: Terminal de Telemetria Interativo */}
            <div className="bfa-split-col--visual">
              <div className="bfa-tech-card" style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)', padding: '1.5rem' }}>
                
                {/* Header do Terminal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                    <span className="mono-tag" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.75rem' }}>
                      PAINEL DE TRANSMISSÃO MONETÁRIA
                    </span>
                  </div>
                  <span className="mono-tag" style={{ color: '#94A3B8', fontSize: '0.7rem' }}>
                    FONTE: B3 / BACEN
                  </span>
                </div>

                {/* Seletores de Ativo */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {Object.keys(assets).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedAsset(key)}
                      style={{
                        padding: '0.45rem 0.3rem',
                        fontSize: '0.72rem',
                        fontWeight: selectedAsset === key ? 800 : 600,
                        borderRadius: 'var(--radius-sm)',
                        border: selectedAsset === key ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: selectedAsset === key ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: selectedAsset === key ? '#34D399' : '#94A3B8',
                        cursor: 'pointer'
                      }}
                    >
                      {assets[key].name.split(' ')[0]} {assets[key].name.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>

                {/* Métricas Principais */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>TAXA NOMINAL BRUTA</span>
                    <div className="tabular-numbers" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {current.rate.toFixed(2)}% <small style={{ fontSize: '0.75rem', color: '#94A3B8' }}>a.a.</small>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>JURO REAL LÍQUIDO</span>
                    <div className="tabular-numbers" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>
                      +{current.realRate.toFixed(2)}% <small style={{ fontSize: '0.75rem', color: '#34D399' }}>a.a. real</small>
                    </div>
                  </div>
                </div>

                {/* Projeção de Patrimônio */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.5rem', color: '#CBD5E1' }}>
                    <span>Projeção para <strong>R$ 10.000</strong> em <strong>{years} Anos</strong>:</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[5, 10, 20].map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => setYears(y)}
                          style={{
                            background: years === y ? '#10B981' : 'transparent',
                            color: years === y ? '#FFFFFF' : '#94A3B8',
                            border: 'none',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '3px',
                            fontSize: '0.68rem',
                            cursor: 'pointer'
                          }}
                        >
                          {y}a
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Poder de Compra Real:</span>
                      <div className="tabular-numbers" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34D399' }}>
                        R$ {realTotal.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Saldo Nominal Bruto:</span>
                      <div className="tabular-numbers" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#E2E8F0' }}>
                        R$ {nominalTotal.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3 Pilares em 50/50 ────────────────────────────────────────────── */}
      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem' }}>
        <div className="bfa-split-row">
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
              PILAR 01 · MATEMÁTICA FINANCEIRA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)' }}>
              Da álgebra elementar às equações contínuas de juros.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Não decore fórmulas sem sentido. Compreenda a geometria do crescimento exponencial, a lógica das progressões e os sistemas de amortização SAC e Price.
            </p>
            <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Explorar 29 Aulas de Matemática →
            </a>
          </div>
          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '1.75rem' }}>
              <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.72rem' }}>ANATOMIA DA CAPITALIZAÇÃO</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>M(t) = C · (1 + i)^t</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                <div style={{ background: 'var(--surface-strong)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong>i_m ➔ i_a:</strong> Taxas equivalentes compostas
                </div>
                <div style={{ background: 'var(--surface-strong)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong>SAC vs Price:</strong> Decomposição de juros e amortização
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.HomeV1 = HomeV1;
