const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Hero Visual: Visualizador Gráfico de Convexidade & Curvas Exponenciais
   ========================================================================== */
function HeroInteractiveCurveCanvas() {
  const [horizonYears, setHorizonYears] = useState(20);
  const [hoverIndex, setHoverIndex] = useState(null);

  const initialCapital = 10000;
  const nominalRate = 0.105; // 10.5% Selic
  const inflationRate = 0.042; // 4.2% IPCA

  // Generate data points
  const points = useMemo(() => {
    const data = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * horizonYears;
      const compound = initialCapital * Math.pow(1 + nominalRate, t);
      const linear = initialCapital * (1 + nominalRate * t);
      const real = initialCapital * Math.pow(1 + (nominalRate - inflationRate), t);
      data.push({
        year: t.toFixed(1),
        compound: Math.round(compound),
        linear: Math.round(linear),
        real: Math.round(real),
        gainPct: Math.round(((compound - initialCapital) / initialCapital) * 100)
      });
    }
    return data;
  }, [horizonYears]);

  const maxVal = points[points.length - 1].compound;
  const svgWidth = 440;
  const svgHeight = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 10 };

  const getCoordinates = (val, idx) => {
    const x = padding.left + (idx / (points.length - 1)) * (svgWidth - padding.left - padding.right);
    const y = svgHeight - padding.bottom - (val / maxVal) * (svgHeight - padding.top - padding.bottom);
    return { x, y };
  };

  const compoundPath = points.map((p, i) => {
    const { x, y } = getCoordinates(p.compound, i);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const compoundArea = `${compoundPath} L ${svgWidth - padding.right} ${svgHeight - padding.bottom} L ${padding.left} ${svgHeight - padding.bottom} Z`;

  const linearPath = points.map((p, i) => {
    const { x, y } = getCoordinates(p.linear, i);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];
  const activeCoord = hoverIndex !== null 
    ? getCoordinates(activePoint.compound, hoverIndex) 
    : getCoordinates(activePoint.compound, points.length - 1);

  return (
    <div className="bfa-tech-card" style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.7)', padding: '1.5rem 1.75rem', position: 'relative' }}>
      
      {/* Top Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 10px #10B981' }} />
            <span className="mono-tag" style={{ color: '#E2E8F0', fontWeight: 800, fontSize: '0.75rem' }}>
              SIMULADOR DE CONVEXIDADE & JUROS
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Passe o mouse na curva para inspecionar</span>
        </div>

        {/* Horizon Selector */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '3px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {[10, 20, 30].map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setHorizonYears(yr)}
              style={{
                background: horizonYears === yr ? 'rgba(52, 211, 153, 0.2)' : 'transparent',
                color: horizonYears === yr ? '#34D399' : '#94A3B8',
                border: 'none',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {yr} Anos
            </button>
          ))}
        </div>
      </div>

      {/* Floating HUD Tag (Live Inspection) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>PONTO INSPECCIONADO ({activePoint.year} ANOS)</span>
          <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34D399' }}>
            R$ {activePoint.compound.toLocaleString('pt-BR')}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', fontWeight: 600 }}>GANHO ACUMULADO</span>
          <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FBBF24' }}>
            +{activePoint.gainPct}%
          </div>
        </div>
      </div>

      {/* SVG Canvas Chart */}
      <div style={{ position: 'relative', width: '100%', height: `${svgHeight}px`, overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const normalizedX = (mouseX / rect.width) * svgWidth;
            const clampedX = Math.max(padding.left, Math.min(svgWidth - padding.right, normalizedX));
            const ratio = (clampedX - padding.left) / (svgWidth - padding.left - padding.right);
            const index = Math.round(ratio * (points.length - 1));
            setHoverIndex(index);
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="heroCompoundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding.left} y1={svgHeight - padding.bottom} x2={svgWidth - padding.right} y2={svgHeight - padding.bottom} stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
          <line x1={padding.left} y1={padding.top} x2={svgWidth - padding.right} y2={padding.top} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" strokeWidth="1" />
          <line x1={padding.left} y1={(padding.top + svgHeight - padding.bottom) / 2} x2={svgWidth - padding.right} y2={(padding.top + svgHeight - padding.bottom) / 2} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" strokeWidth="1" />

          {/* Linear Growth Path (Dashed Amber) */}
          <path d={linearPath} fill="none" stroke="#F59E0B" strokeWidth="1.75" strokeDasharray="4 4" opacity="0.6" />

          {/* Compound Area */}
          <path d={compoundArea} fill="url(#heroCompoundGrad)" />

          {/* Compound Growth Path (Solid Glowing Emerald) */}
          <path d={compoundPath} fill="none" stroke="#10B981" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />

          {/* Inspection Vertical Line */}
          {hoverIndex !== null && (
            <line
              x1={activeCoord.x}
              y1={padding.top}
              x2={activeCoord.x}
              y2={svgHeight - padding.bottom}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
          )}

          {/* Active Glowing Point */}
          <circle cx={activeCoord.x} cy={activeCoord.y} r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx={activeCoord.x} cy={activeCoord.y} r="12" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Legend Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.72rem', color: '#94A3B8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '2px', background: '#10B981', display: 'inline-block' }} /> Juros Compostos
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '2px', background: '#F59E0B', display: 'inline-block' }} /> Linear Simples
          </span>
        </div>
        <span style={{ color: '#34D399', fontWeight: 700 }}>Convexidade Real</span>
      </div>

    </div>
  );
}

/* ==========================================================================
   Pilar 1: Matriz de Capitalização e Prova Algébrica (Matemática)
   ========================================================================== */
function MathProofLedgerCard() {
  const steps = [
    { year: "Ano 01", nominal: "R$ 11.050", gain: "+10,5%", note: "Fase linear inicial" },
    { year: "Ano 05", nominal: "R$ 16.474", gain: "+64,7%", note: "Aceleração de rendimentos" },
    { year: "Ano 10", nominal: "R$ 27.140", gain: "+171,4%", note: "Juros superam o aporte" },
    { year: "Ano 20", nominal: "R$ 73.662", gain: "+636,6%", note: "Domínio exponencial puro" },
  ];

  return (
    <div className="bfa-tech-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.72rem' }}>
          PROVA MATEMÁTICA · CURVATURA TEMPORAL
        </span>
        <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>
          Base: R$ 10.000 a 10,5% a.a.
        </span>
      </div>

      <div style={{ display: 'grid', gap: '0.65rem' }}>
        {steps.map((s, idx) => (
          <div
            key={s.year}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: idx === 3 ? 'rgba(37, 99, 235, 0.08)' : 'var(--surface-strong)',
              border: idx === 3 ? '1px solid rgba(37, 99, 235, 0.25)' : '1px solid var(--border)'
            }}
          >
            <div>
              <span className="mono-tag" style={{ fontSize: '0.75rem', fontWeight: 800, color: idx === 3 ? 'var(--track-math)' : 'var(--foreground)' }}>
                {s.year}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginLeft: '8px' }}>
                {s.note}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="tabular-numbers" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--foreground)' }}>
                {s.nominal}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: idx === 3 ? 'var(--track-math)' : '#059669' }}>
                {s.gain}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--muted-foreground)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Equação: <strong>M = C · (1 + i)^t</strong></span>
        <span style={{ color: 'var(--track-math)', fontWeight: 700 }}>Convexidade Exponencial</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Pilar 2: Matriz Comparativa de Ativos do Brasil (Finanças)
   ========================================================================== */
function FinancialAssetsMatrixCard() {
  return (
    <div className="bfa-tech-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800, fontSize: '0.72rem' }}>
          MERCADO NACIONAL · MATRIZ DE ALOCAÇÃO
        </span>
        <span className="mono-tag" style={{ color: '#059669', background: 'rgba(5, 150, 105, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
          Sistema B3 / BACEN
        </span>
      </div>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--foreground)' }}>1. Tesouro Selic & IPCA+</span>
            <span className="tabular-numbers" style={{ fontWeight: 800, color: 'var(--track-finance)', fontSize: '0.88rem' }}>10,50% a.a. / IPCA + 6,2%</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', margin: 0 }}>
            Risco soberano com proteção integral contra a inflação e liquidez diária garantida pelo Tesouro Nacional.
          </p>
        </div>

        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--foreground)' }}>2. Fundos Imobiliários (FIIs)</span>
            <span className="tabular-numbers" style={{ fontWeight: 800, color: 'var(--gold-deep)', fontSize: '0.88rem' }}>9,80% dividend yield</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', margin: 0 }}>
            Renda passiva mensal com isenção de Imposto de Renda para pessoa física e diversificação imobiliária.
          </p>
        </div>

        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--foreground)' }}>3. Ações & Equity (Bolsa B3)</span>
            <span className="tabular-numbers" style={{ fontWeight: 800, color: 'var(--track-math)', fontSize: '0.88rem' }}>Ganho de Capital + JCP</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', margin: 0 }}>
            Participação acionária no crescimento e nos lucros das maiores companhias do Brasil.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--muted-foreground)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Transmissão: <strong>Selic ➔ CDI ➔ Crédito</strong></span>
        <span style={{ color: 'var(--track-finance)', fontWeight: 700 }}>Estrutura Regulatória CVM</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Pilar 3: One-Page Memo de Equity Research (BRHSIC)
   ========================================================================== */
function EquityResearchExecutiveCard() {
  return (
    <div className="bfa-tech-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="mono-tag" style={{ color: 'var(--gold-deep)', fontWeight: 800, fontSize: '0.72rem' }}>
          EQUITY RESEARCH · RELATÓRIO OFICIAL BRHSIC
        </span>
        <span className="mono-tag" style={{ color: '#059669', background: '#ECFDF5', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
          RECOMENDAÇÃO: COMPRA
        </span>
      </div>

      <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', display: 'block', fontWeight: 700 }}>ATIVO: WEGE3 (WEG S.A.)</span>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--foreground)' }}>Preço Atual: R$ 41,20</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--gold-deep)', display: 'block', fontWeight: 800 }}>PREÇO-ALVO DCF</span>
            <div className="tabular-numbers" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>R$ 54,00 (+31,1%)</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
        <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.65rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--muted-foreground)', display: 'block' }}>WACC</span>
          <span className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)' }}>11,2%</span>
        </div>
        <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.65rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--muted-foreground)', display: 'block' }}>ROIC</span>
          <span className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#059669' }}>28,6%</span>
        </div>
        <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.65rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--muted-foreground)', display: 'block' }}>EV/EBITDA</span>
          <span className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)' }}>14,2x</span>
        </div>
      </div>

      <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', lineHeight: 1.5, background: 'var(--surface-strong)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--gold-deep)' }}>
        <strong>Tese de Vantagem Competitiva (Moat):</strong> Domínio de motores de alta eficiência industrial, integração vertical e liderança em transição energética global.
      </div>
    </div>
  );
}

/* ==========================================================================
   Home Page Component (High-End Cloudflare / Linear / Stripe Synthesis)
   ========================================================================== */
function Home() {
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const stats = [
    { value: "55", label: "Aulas publicadas", note: "Matemática & Finanças" },
    { value: "7", label: "Módulos de estudo", note: "Conteúdo progressivo" },
    { value: "100%", label: "Acesso gratuito", note: "Sem custo" },
    { value: "BRHSIC", label: "Equity Research", note: "Guia de preparação" },
  ];

  return (
    <div>
      {/* ── 1. Hero Section Split-Screen 50/50 ────────────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            {/* Coluna Esquerda: Proposição de Valor Educacional */}
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.95)', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 700 }}>
                  v2.0 · Plataforma Aberta
                </span>
                <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 700 }}>
                  100% Gratuito
                </span>
              </div>

              <EditableBlock id="home-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3.35rem', fontWeight: 800, lineHeight: 1.12, color: '#FFFFFF', letterSpacing: '-0.035em', marginTop: '0.5rem' }}>
                O rigor da matemática financeira. O poder do mercado de capitais.
              </EditableBlock>

              <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                Uma suíte pedagógica aberta de padrão profissional com 55 aulas estruturadas, visualizações interativas de curvas exponenciais e guia prático de Equity Research para o ensino médio e olimpíadas.
              </EditableBlock>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a href="#/matematica" className="bfa-btn bfa-btn--verde" style={{ padding: '0.85rem 1.65rem', fontSize: '0.95rem', minHeight: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.4)' }}>
                  Começar Trilha de Matemática →
                </a>
                <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.85rem 1.65rem', fontSize: '0.95rem', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#FFFFFF', minHeight: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                  Ver Guia BRHSIC
                </a>
              </div>

              {/* Stats Bar Compact */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.value}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(241, 245, 249, 0.8)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Direita: Visualizador de Curva Exponencial & Convexidade */}
            <div className="bfa-split-col--visual">
              <HeroInteractiveCurveCanvas />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Pilares de Aprendizagem em Blocos 50/50 com Prova Visual ─────── */}
      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem' }}>
        
        {/* Bloco 1: Matemática Aplicada (Texto na Esquerda, Prova na Direita) */}
        <div className="bfa-split-row">
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 01 · MATEMÁTICA QUANTITATIVA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Da álgebra elementar às equações contínuas de juros.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Não decore fórmulas sem sentido. Compreenda a geometria do crescimento exponencial, a lógica das progressões aritméticas e geométricas, a equivalência temporal de capitais e os sistemas de amortização que regem o crédito na economia real.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>✦ 29 Aulas Estruturadas</strong> com demonstrações algébricas completas do zero.</li>
              <li><strong>✦ Provas Visuais</strong> da constante de Euler (e) e capitalização contínua.</li>
              <li><strong>✦ Listas de Fixação Analíticas</strong> com gabaritos detalhados passo a passo.</li>
            </ul>
            <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Explorar Trilha de Matemática →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <MathProofLedgerCard />
          </div>
        </div>

        {/* Bloco 2: Finanças Corporativas (Prova na Esquerda, Texto na Direita) */}
        <div className="bfa-split-row">
          <div className="bfa-split-col--visual">
            <FinancialAssetsMatrixCard />
          </div>

          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 02 · MERCADO DE CAPITAIS & CORPORE
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Como o dinheiro circula, se valoriza e constrói empresas.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Mergulhe no funcionamento prático do Sistema Financeiro Nacional. Do Banco Central à B3, aprenda a avaliar títulos públicos, fundos imobiliários com isenção fiscal e a dissecar demonstrativos contábeis (DRE, Balanço e DFC) como um analista de investimentos.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>✦ 26 Aulas Didáticas</strong> focadas na anatomia real dos ativos brasileiros.</li>
              <li><strong>✦ Matriz Comparativa</strong> de liquidez, volatilidade e tributação regressiva.</li>
              <li><strong>✦ Análise de Múltiplos</strong> de mercado: P/L, EV/EBITDA, ROIC e Dividend Yield.</li>
            </ul>
            <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Explorar Trilha de Finanças →
            </a>
          </div>
        </div>

        {/* Bloco 3: Preparação BRHSIC (Texto na Esquerda, Prova na Direita) */}
        <div className="bfa-split-row" style={{ borderBottom: 'none' }}>
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'rgba(217, 119, 6, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 03 · COMPETIÇÃO OLÍMPICA & VALUATION
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Defenda teses de investimento diante de bancas examinadoras.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Prepare-se para a Brazil High School Investment Competition com o mesmo rigor de um banco de investimentos. Domine a modelagem por Fluxo de Caixa Descontado (DCF), mapeie vantagens competitivas sustentáveis (Moat) e estruture um pitch verbal de alto impacto.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>✦ Modelagem Financeira Completa</strong> com projeção de WACC e perpetuidade.</li>
              <li><strong>✦ Análise Setorial e Moat</strong> para identificação de barreiras de entrada.</li>
              <li><strong>✦ Estrutura de Pitch Executivo</strong> para apresentações sob pressão de bancas.</li>
            </ul>
            <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Ver Guia de Preparação BRHSIC →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <EquityResearchExecutiveCard />
          </div>
        </div>

      </section>

      {/* ── 3. Grade Técnica de Ferramentas do Laboratório ───────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)', padding: '4.5rem 0' }}>
        <div className="bfa-container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
              SUÍTE PRÁTICA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Ferramentas & Infraestrutura do Aluno
            </h2>
          </div>

          <div className="bfa-grid-tools-4">
            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--track-math)', fontWeight: 800, marginBottom: '1rem' }}>
                ∑
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Simulador de Juros</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Cálculo comparativo entre modelos de capitalização simples, composta e contínua.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Abrir Simulador →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--track-finance)', fontWeight: 800, marginBottom: '1rem' }}>
                ⏱
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Cronograma de Estudos</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Calculadora de ritmo e metas diárias para conclusão das disciplinas.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--track-finance)' }}>
                Gerar Meta →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(217, 119, 6, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)', fontWeight: 800, marginBottom: '1rem' }}>
                ★
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Certificado Digital</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Emissão de certificado de proficiência com código de validação único para portfólio.
              </p>
              <a href="#/exercicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
                Validar Emissão →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(15, 23, 42, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)', fontWeight: 800, marginBottom: '1rem' }}>
                ⚙
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Área do Professor</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Painel administrativo CMS para gerenciamento de aulas, vídeos e banco de questões.
              </p>
              <a href="#/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)' }}>
                Acessar Painel →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
