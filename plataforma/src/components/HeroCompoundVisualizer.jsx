const { useState, useMemo, useRef } = React;

function HeroCompoundVisualizer() {
  const [initialDeposit, setInitialDeposit] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(800);
  const [years, setYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(11.5);
  const [inflationRate, setInflationRate] = useState(4.5);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Month by month projection
  const data = useMemo(() => {
    const totalMonths = years * 12;
    const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
    const monthlyInflation = Math.pow(1 + inflationRate / 100, 1 / 12) - 1;

    const points = [];
    let currentNominal = initialDeposit;
    let currentInvested = initialDeposit;

    // Sample points (yearly steps for graph clarity)
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
  }, [initialDeposit, monthlyContribution, years, annualRate, inflationRate]);

  const finalPoint = data[data.length - 1] || { nominal: 0, invested: 0, interest: 0, realPower: 0 };
  const maxVal = Math.max(...data.map(d => d.nominal), 1000);

  // SVG Coordinates mapping (width: 720, height: 260, padding: 30)
  const svgWidth = 720;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 25;

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
    <div className="bfa-hero-showpiece" aria-label="Visualizador Interativo de Juros Compostos">
      {/* Visualizer Header */}
      <div className="bfa-hero-showpiece__header">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
            <span className="mono-tag" style={{ color: '#34D399', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              LABORATÓRIO VISUAL · DINÂMICA EXPONENCIAL
            </span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
            O Poder dos Juros Compostos no Tempo
          </h3>
        </div>

        {/* Legend Badges */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: '#34D399', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
            <span style={{ width: '12px', height: '3px', background: '#10B981', borderRadius: '2px', display: 'inline-block' }} /> Patrimônio Bruto
          </span>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
            <span style={{ width: '12px', height: '2px', background: '#94A3B8', borderStyle: 'dashed', display: 'inline-block' }} /> Total Aportado
          </span>
          <span style={{ fontSize: '0.78rem', color: '#FBBF24', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
            <span style={{ width: '12px', height: '2px', background: '#F59E0B', borderStyle: 'dotted', display: 'inline-block' }} /> Poder Real (IPCA)
          </span>
        </div>
      </div>

      {/* Main SVG Vector Canvas */}
      <div className="bfa-hero-showpiece__canvas-wrap">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="bfa-hero-showpiece__svg"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="curveGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={(svgHeight - 2 * paddingY) / 2 + paddingY} x2={svgWidth - paddingX} y2={(svgHeight - 2 * paddingY) / 2 + paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Area Fill */}
          <path d={pathArea} fill="url(#curveGlow)" />

          {/* Lines */}
          <path d={pathInvested} fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" opacity="0.75" />
          <path d={pathReal} fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 3" opacity="0.85" />
          <path d={pathNominal} fill="none" stroke="#10B981" strokeWidth="3.5" filter="url(#glow)" strokeLinecap="round" />

          {/* Hover interactive vertical line and points */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={paddingY}
                x2={activePoint.x}
                y2={svgHeight - paddingY}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <circle cx={activePoint.x} cy={activePoint.y} r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {/* Hitboxes for smooth hover */}
          {pointsNominal.map((p, i) => (
            <rect
              key={i}
              x={p.x - 15}
              y={0}
              width={30}
              height={svgHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPoint(i)}
            />
          ))}
        </svg>

        {/* Floating Tooltip in Canvas */}
        {activePoint && (
          <div className="bfa-hero-tooltip">
            <span className="mono-tag" style={{ color: '#94A3B8', fontSize: '0.72rem' }}>
              ANO {activePoint.year} ({activePoint.year * 12} MESES)
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34D399', margin: '2px 0' }}>
              {formatBRL(activePoint.nominal)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#CBD5E1', display: 'flex', gap: '8px' }}>
              <span>Investido: {formatBRL(activePoint.invested)}</span>
              <span style={{ color: '#FBBF24' }}>Juros: {formatBRL(activePoint.interest)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Sliders */}
      <div className="bfa-hero-showpiece__controls">
        {/* Slider 1: Aporte Mensal */}
        <div className="bfa-hero-control">
          <div className="bfa-hero-control__top">
            <label>Aporte Mensal</label>
            <span className="bfa-hero-control__val">{formatBRL(monthlyContribution)}/mês</span>
          </div>
          <input
            type="range"
            min="100"
            max="3000"
            step="50"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="bfa-range-slider"
          />
        </div>

        {/* Slider 2: Prazo em Anos */}
        <div className="bfa-hero-control">
          <div className="bfa-hero-control__top">
            <label>Tempo de Acumulação</label>
            <span className="bfa-hero-control__val">{years} anos</span>
          </div>
          <input
            type="range"
            min="3"
            max="35"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="bfa-range-slider"
          />
        </div>

        {/* Slider 3: Taxa de Rentabilidade */}
        <div className="bfa-hero-control">
          <div className="bfa-hero-control__top">
            <label>Taxa de Juros Anual</label>
            <span className="bfa-hero-control__val" style={{ color: '#34D399' }}>{annualRate}% a.a.</span>
          </div>
          <input
            type="range"
            min="5"
            max="18"
            step="0.5"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="bfa-range-slider"
          />
        </div>
      </div>

      {/* KPI Cards Ribbon */}
      <div className="bfa-hero-showpiece__kpis">
        <div className="bfa-hero-kpi-card highlight">
          <span className="bfa-hero-kpi-card__label">PATRIMÔNIO FINAL BRUTO</span>
          <div className="bfa-hero-kpi-card__num">{formatBRL(finalPoint.nominal)}</div>
          <span className="bfa-hero-kpi-card__sub" style={{ color: '#34D399' }}>
            Multiplicador de {((finalPoint.nominal / Math.max(1, finalPoint.invested))).toFixed(1)}x do capital
          </span>
        </div>

        <div className="bfa-hero-kpi-card">
          <span className="bfa-hero-kpi-card__label">DO SEU BOLSO (APORTES)</span>
          <div className="bfa-hero-kpi-card__num" style={{ color: '#F1F5F9' }}>{formatBRL(finalPoint.invested)}</div>
          <span className="bfa-hero-kpi-card__sub" style={{ color: '#94A3B8' }}>
            {((finalPoint.invested / Math.max(1, finalPoint.nominal)) * 100).toFixed(0)}% do total final
          </span>
        </div>

        <div className="bfa-hero-kpi-card">
          <span className="bfa-hero-kpi-card__label">JUROS GERADOS (LUCRO)</span>
          <div className="bfa-hero-kpi-card__num" style={{ color: '#FBBF24' }}>{formatBRL(finalPoint.interest)}</div>
          <span className="bfa-hero-kpi-card__sub" style={{ color: '#FBBF24' }}>
            +{((finalPoint.interest / Math.max(1, finalPoint.invested)) * 100).toFixed(0)}% de rendimento puro
          </span>
        </div>
      </div>
    </div>
  );
}

window.HeroCompoundVisualizer = HeroCompoundVisualizer;
