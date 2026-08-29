const { useState, useMemo, useRef } = React;

function HeroCompoundVisualizer() {
  const [monthlyContribution, setMonthlyContribution] = useState(800);
  const [years, setYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(11.5);
  const [inflationRate, setInflationRate] = useState(4.5);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const initialDeposit = 5000;

  // Month by month projection
  const data = useMemo(() => {
    const totalMonths = years * 12;
    const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
    const monthlyInflation = Math.pow(1 + inflationRate / 100, 1 / 12) - 1;

    const points = [];
    let currentNominal = initialDeposit;
    let currentInvested = initialDeposit;

    for (let m = 0; m <= totalMonths; m++) {
      if (m > 0) {
        currentNominal = currentNominal * (1 + monthlyRate) + monthlyContribution;
        currentInvested += monthlyContribution;
      }

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.round(m / 12);
        const inflationDiscount = Math.pow(1 + monthlyInflation, m);
        const realPurchasingPower = currentNominal / inflationDiscount;
        const totalInterest = Math.max(0, currentNominal - currentInvested);

        points.push({
          year: yearNum,
          month: m,
          nominal: currentNominal,
          invested: currentInvested,
          interest: totalInterest,
          realPower: realPurchasingPower
        });
      }
    }
    return points;
  }, [monthlyContribution, years, annualRate, inflationRate]);

  const finalPoint = data[data.length - 1] || { nominal: 0, invested: 0, interest: 0, realPower: 0 };
  const maxVal = Math.max(...data.map(d => d.nominal), 1000);

  // SVG Coordinates mapping
  const svgWidth = 680;
  const svgHeight = 220;
  const paddingX = 35;
  const paddingY = 20;

  const pointsNominal = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - (d.nominal / maxVal) * (svgHeight - 2 * paddingY);
    return { x, y, ...d };
  });

  const pointsInvested = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - (d.invested / maxVal) * (svgHeight - 2 * paddingY);
    return { x, y };
  });

  const pointsReal = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - (d.realPower / maxVal) * (svgHeight - 2 * paddingY);
    return { x, y };
  });

  const pathNominal = pointsNominal.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const pathArea = `${pathNominal} L ${pointsNominal[pointsNominal.length - 1].x} ${svgHeight - paddingY} L ${pointsNominal[0].x} ${svgHeight - paddingY} Z`;
  const pathInvested = pointsInvested.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const pathReal = pointsReal.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');

  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const activePoint = hoveredPoint !== null ? pointsNominal[hoveredPoint] : pointsNominal[pointsNominal.length - 1];

  return (
    <div className="bfa-tech-card" style={{ marginTop: 0, background: 'rgba(15, 23, 42, 0.92)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.35rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
            <span className="mono-tag" style={{ color: '#34D399', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.06em' }}>
              TELEMETRIA · JUROS REAIS
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.025em', margin: 0 }}>
            Simulação Exponencial de Longo Prazo
          </h3>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: '#34D399', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <span style={{ width: '10px', height: '3px', background: '#10B981', borderRadius: '2px', display: 'inline-block' }} /> Bruto
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <span style={{ width: '10px', height: '2px', background: '#94A3B8', borderStyle: 'dashed', display: 'inline-block' }} /> Aportado
          </span>
          <span style={{ fontSize: '0.72rem', color: '#FBBF24', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <span style={{ width: '10px', height: '2px', background: '#F59E0B', borderStyle: 'dotted', display: 'inline-block' }} /> Poder Real
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{ position: 'relative', width: '100%', borderRadius: 'var(--radius-md)', background: 'rgba(9, 13, 22, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.35rem', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="heroGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#059669" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Curves */}
          <path d={pathArea} fill="url(#heroGlow)" />
          <path d={pathInvested} fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.75" />
          <path d={pathReal} fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="2 2" opacity="0.85" />
          <path d={pathNominal} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />

          {/* Hover point */}
          {activePoint && (
            <g>
              <line x1={activePoint.x} y1={paddingY} x2={activePoint.x} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {/* Hitboxes */}
          {pointsNominal.map((p, i) => (
            <rect
              key={i}
              x={p.x - 12}
              y={0}
              width={24}
              height={svgHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPoint(i)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {activePoint && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.75rem', pointerEvents: 'none', backdropFilter: 'blur(8px)' }}>
            <span className="mono-tag" style={{ color: '#94A3B8', fontSize: '0.68rem' }}>ANO {activePoint.year}</span>
            <div className="tabular-numbers" style={{ fontSize: '1rem', fontWeight: 800, color: '#34D399', margin: '1px 0' }}>{formatBRL(activePoint.nominal)}</div>
            <div style={{ fontSize: '0.7rem', color: '#CBD5E1', display: 'flex', gap: '6px' }}>
              <span>Aportes: {formatBRL(activePoint.invested)}</span>
              <span style={{ color: '#FBBF24' }}>Juros: {formatBRL(activePoint.interest)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sliders Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, marginBottom: '0.3rem' }}>
            <span>Aporte Mensal</span>
            <span className="tabular-numbers" style={{ color: '#FFFFFF', fontWeight: 700 }}>{formatBRL(monthlyContribution)}</span>
          </div>
          <input type="range" min="100" max="3000" step="50" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="bfa-mini-slider" />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, marginBottom: '0.3rem' }}>
            <span>Prazo</span>
            <span className="tabular-numbers" style={{ color: '#FFFFFF', fontWeight: 700 }}>{years} anos</span>
          </div>
          <input type="range" min="3" max="35" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="bfa-mini-slider" />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600, marginBottom: '0.3rem' }}>
            <span>Rentabilidade</span>
            <span className="tabular-numbers" style={{ color: '#34D399', fontWeight: 700 }}>{annualRate}% a.a.</span>
          </div>
          <input type="range" min="5" max="18" step="0.5" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} className="bfa-mini-slider" />
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.9rem' }}>
          <span className="mono-tag" style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}>PATRIMÔNIO FINAL</span>
          <div className="tabular-numbers" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>{formatBRL(finalPoint.nominal)}</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.9rem' }}>
          <span className="mono-tag" style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}>TOTAL APORTADO</span>
          <div className="tabular-numbers" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F1F5F9' }}>{formatBRL(finalPoint.invested)}</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.75rem 0.9rem' }}>
          <span className="mono-tag" style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}>JUROS LÍQUIDOS</span>
          <div className="tabular-numbers" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FBBF24' }}>{formatBRL(finalPoint.interest)}</div>
        </div>
      </div>
    </div>
  );
}

window.HeroCompoundVisualizer = HeroCompoundVisualizer;
