const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function CalculadoraJurosCompostos() {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [activeTab, setActiveTab] = useState('chart');

  // Format currency helper
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2
    }).format(value || 0);
  };

  // Perform Calculations
  const calculations = useMemo(() => {
    const P = parseFloat(initialDeposit) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const iAnnual = parseFloat(annualRate) || 0;
    const nYears = parseInt(years, 10) || 1;

    const totalMonths = nYears * 12;
    // Monthly effective interest rate: (1 + i_annual)^(1/12) - 1
    const rMonthly = iAnnual > 0 ? Math.pow(1 + iAnnual / 100, 1 / 12) - 1 : 0;

    const totalInvested = P + (PMT * totalMonths);

    // Compound Interest Calculation
    let finalCompound = 0;
    if (rMonthly > 0) {
      const compoundP = P * Math.pow(1 + rMonthly, totalMonths);
      const compoundPMT = PMT * ((Math.pow(1 + rMonthly, totalMonths) - 1) / rMonthly);
      finalCompound = compoundP + compoundPMT;
    } else {
      finalCompound = totalInvested;
    }

    const totalCompoundInterest = finalCompound - totalInvested;
    const compoundYieldPct = totalInvested > 0 ? (totalCompoundInterest / totalInvested) * 100 : 0;

    // Simple Interest Calculation
    // Monthly simple interest rate = (iAnnual / 100) / 12
    const rSimpleMonthly = (iAnnual / 100) / 12;
    const simpleInterestP = P * rSimpleMonthly * totalMonths;
    // Sum of simple interest on monthly deposits = PMT * rSimpleMonthly * (M * (M + 1) / 2)
    const simpleInterestPMT = PMT * rSimpleMonthly * ((totalMonths * (totalMonths + 1)) / 2);
    const totalSimpleInterest = simpleInterestP + simpleInterestPMT;
    const finalSimple = totalInvested + totalSimpleInterest;

    const differenceVsSimple = finalCompound - finalSimple;

    // Timeline breakdown per year
    const yearlyBreakdown = [];
    for (let y = 1; y <= nYears; y++) {
      const months = y * 12;
      const invY = P + (PMT * months);
      
      let compY = invY;
      if (rMonthly > 0) {
        compY = (P * Math.pow(1 + rMonthly, months)) + (PMT * ((Math.pow(1 + rMonthly, months) - 1) / rMonthly));
      }

      const simpIntP = P * rSimpleMonthly * months;
      const simpIntPMT = PMT * rSimpleMonthly * ((months * (months + 1)) / 2);
      const simpY = invY + simpIntP + simpIntPMT;

      yearlyBreakdown.push({
        year: y,
        invested: invY,
        simple: simpY,
        compound: compY,
        compoundInterest: compY - invY
      });
    }

    return {
      totalMonths,
      totalInvested,
      finalCompound,
      totalCompoundInterest,
      compoundYieldPct,
      finalSimple,
      totalSimpleInterest,
      differenceVsSimple,
      yearlyBreakdown
    };
  }, [initialDeposit, monthlyContribution, annualRate, years]);

  const maxVal = Math.max(calculations.finalCompound, 1);

  const { hapticTap } = (window.useHaptics ? window.useHaptics() : { hapticTap: () => {} });

  const setDepositWithHaptic = (val) => {
    hapticTap();
    setInitialDeposit(val);
  };

  const setMonthlyWithHaptic = (val) => {
    hapticTap();
    setMonthlyContribution(val);
  };

  const setRateWithHaptic = (val) => {
    hapticTap();
    setAnnualRate(val);
  };

  const setYearsWithHaptic = (val) => {
    hapticTap();
    setYears(val);
  };

  return (
    <div className="bfa-card" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="bfa-badge bfa-badge--verde" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <BfaIcon name="calculator" size={14} color="var(--color-verde-dark)" /> Ferramenta Interativa
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '0.5rem' }}>
          Simulador de Juros Compostos
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
          Compare em tempo real o crescimento do seu capital investido sob o regime de juros compostos versus juros simples.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {/* Left Column: Sliders & Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--color-slate-50)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-azul-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <BfaIcon name="gear" size={18} color="var(--color-azul)" /> Parâmetros de Simulação
          </h3>

          {/* Slider 1: Initial Deposit */}
          <div className="bfa-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                Aporte Inicial (P):
              </label>
              <span className="bfa-badge bfa-badge--verde" style={{ fontSize: '0.85rem' }}>
                {formatCurrency(initialDeposit)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-verde)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {[0, 1000, 5000, 10000, 20000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDepositWithHaptic(val)}
                  className="bfa-touch-stepper-btn"
                  style={{
                    background: initialDeposit === val ? 'var(--color-verde)' : '#FFFFFF',
                    color: initialDeposit === val ? '#FFFFFF' : 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {val === 0 ? 'R$ 0' : `R$ ${val >= 1000 ? `${val / 1000}k` : val}`}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 2: Monthly Contribution */}
          <div className="bfa-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                Aporte Mensal (PMT):
              </label>
              <span className="bfa-badge bfa-badge--azul" style={{ fontSize: '0.85rem' }}>
                {formatCurrency(monthlyContribution)} /mês
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-azul)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {[50, 100, 200, 500, 1000, 2000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setMonthlyWithHaptic(val)}
                  className="bfa-touch-stepper-btn"
                  style={{
                    background: monthlyContribution === val ? 'var(--color-azul)' : '#FFFFFF',
                    color: monthlyContribution === val ? '#FFFFFF' : 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  + R$ {val}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 3: Annual Interest Rate */}
          <div className="bfa-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                Taxa de Juros Anual (i):
              </label>
              <span className="bfa-badge bfa-badge--ouro" style={{ fontSize: '0.85rem' }}>
                {annualRate}% a.a.
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="30"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-ouro)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {[
                { label: '6% Poupança', rate: 6 },
                { label: '10.5% Selic', rate: 10.5 },
                { label: '12% CDI', rate: 12 },
                { label: '15% Ações', rate: 15 }
              ].map(item => (
                <button
                  key={item.rate}
                  type="button"
                  onClick={() => setRateWithHaptic(item.rate)}
                  className="bfa-touch-stepper-btn"
                  style={{
                    background: annualRate === item.rate ? 'var(--color-ouro)' : '#FFFFFF',
                    color: annualRate === item.rate ? '#000000' : 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 4: Time in Years */}
          <div className="bfa-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                Tempo de Aplicação (n):
              </label>
              <span className="bfa-badge bfa-badge--gray" style={{ fontSize: '0.85rem' }}>
                {years} {years === 1 ? 'ano' : 'anos'} ({calculations.totalMonths} meses)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-slate-700)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {[1, 5, 10, 15, 20, 30].map(y => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYearsWithHaptic(y)}
                  className="bfa-touch-stepper-btn"
                  style={{
                    background: years === y ? 'var(--color-slate-700)' : '#FFFFFF',
                    color: years === y ? '#FFFFFF' : 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {y} {y === 1 ? 'ano' : 'anos'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Key Results & Visual Comparisons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                Total Investido
              </span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-slate-700)', display: 'block' }}>
                {formatCurrency(calculations.totalInvested)}
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Seu capital</span>
            </div>

            <div style={{ background: 'var(--color-verde-light)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-verde)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-verde-dark)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                Juros Compostos
              </span>
              <strong style={{ fontSize: '1.25rem', color: 'var(--color-verde-dark)', display: 'block' }}>
                {formatCurrency(calculations.finalCompound)}
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-verde-dark)', fontWeight: 600 }}>
                +{calculations.compoundYieldPct.toFixed(1)}% de juros
              </span>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                Total Juros Simples
              </span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-azul)', display: 'block' }}>
                {formatCurrency(calculations.finalSimple)}
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sem juros s/ juros</span>
            </div>
          </div>

          {/* Visual Progress Bar Chart Comparison */}
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="chart" size={16} color="var(--color-azul)" /> Comparativo de Acumulação Final
            </h4>

            {/* Bar 1: Capital Investido */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Capital Investido (Do Bolso)</span>
                <span>{formatCurrency(calculations.totalInvested)}</span>
              </div>
              <div style={{ height: '14px', background: 'var(--color-slate-100)', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (calculations.totalInvested / maxVal) * 100)}%`,
                    background: 'var(--color-slate-400)',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Bar 2: Juros Simples */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--color-azul)' }}>Juros Simples (Linha Reta)</span>
                <span style={{ color: 'var(--color-azul)' }}>{formatCurrency(calculations.finalSimple)}</span>
              </div>
              <div style={{ height: '14px', background: 'var(--color-slate-100)', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (calculations.finalSimple / maxVal) * 100)}%`,
                    background: 'var(--color-azul)',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Bar 3: Juros Compostos */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--color-verde-dark)' }}>Juros Compostos (Bola de Neve Exponencial)</span>
                <span style={{ color: 'var(--color-verde-dark)' }}>{formatCurrency(calculations.finalCompound)}</span>
              </div>
              <div style={{ height: '18px', background: 'var(--color-slate-100)', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (calculations.finalCompound / maxVal) * 100)}%`,
                    background: 'linear-gradient(90deg, var(--color-verde) 0%, #2ED573 100%)',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Insights Box */}
          <div className="bfa-admonition bfa-admonition--tip" style={{ margin: 0 }}>
            <div className="bfa-admonition__title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="lightbulb" size={16} color="var(--color-verde-dark)" /> Insights do Aprendizado:
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-verde-dark)', lineHeight: 1.5 }}>
              Ao optar por Juros Compostos durante <strong>{years} anos</strong>, você ganha{' '}
              <strong>{formatCurrency(calculations.differenceVsSimple)}</strong> a mais do que com juros simples!
              {calculations.compoundYieldPct > 100 && (
                <span> Além disso, o rendimento dos juros já supera 100% de todo o capital investido do seu bolso!</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Year by Year Growth Timeline Chart */}
      <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BfaIcon name="chart" size={18} color="var(--color-azul)" /> Evolução do Patrimônio Ano a Ano
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('chart')}
              className={`bfa-btn bfa-btn--sm ${activeTab === 'chart' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
            >
              Gráfico de Barras
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`bfa-btn bfa-btn--sm ${activeTab === 'table' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
            >
              Tabela Detalhada
            </button>
          </div>
        </div>

        {activeTab === 'chart' ? (
          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            {/* Interactive SVG Yield Curve Chart */}
            <div style={{ position: 'relative', width: '100%', height: '260px', marginBottom: '1rem' }}>
              {(() => {
                const width = 700;
                const height = 220;
                const padding = 35;
                const points = calculations.yearlyBreakdown;

                if (!points || points.length === 0) return null;

                const getX = (i) => padding + (i / Math.max(1, points.length - 1)) * (width - 2 * padding);
                const getY = (val) => height - padding - (val / maxVal) * (height - 2 * padding);

                const pathCompound = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.compound)}`).join(' ');
                const pathSimple = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.simple)}`).join(' ');
                const pathInvested = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.invested)}`).join(' ');

                const areaCompound = `${pathCompound} L ${getX(points.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

                return (
                  <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="compoundAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill under compound curve */}
                    <path d={areaCompound} fill="url(#compoundAreaGrad)" />

                    {/* Grid horizontal lines */}
                    {[0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                      <line key={idx} x1={padding} y1={getY(maxVal * ratio)} x2={width - padding} y2={getY(maxVal * ratio)} stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="4 4" />
                    ))}

                    {/* Curve Lines */}
                    <path d={pathInvested} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
                    <path d={pathSimple} fill="none" stroke="#2563EB" strokeWidth="2.5" />
                    <path d={pathCompound} fill="none" stroke="#10B981" strokeWidth="3.5" />

                    {/* Data Points */}
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle cx={getX(i)} cy={getY(p.compound)} r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                        <title>{`Ano ${p.year}\nJuros Compostos: ${formatCurrency(p.compound)}\nJuros Simples: ${formatCurrency(p.simple)}\nInvestido: ${formatCurrency(p.invested)}`}</title>
                      </g>
                    ))}
                  </svg>
                );
              })()}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#64748B' }}>
                <span style={{ width: '12px', height: '3px', background: '#64748B', display: 'inline-block' }} /> Capital Investido
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#2563EB' }}>
                <span style={{ width: '12px', height: '3px', background: '#2563EB', display: 'inline-block' }} /> Juros Simples
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#10B981' }}>
                <span style={{ width: '12px', height: '4px', background: '#10B981', display: 'inline-block' }} /> Juros Compostos (Bola de Neve)
              </span>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="bfa-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-slate-100)', textAlign: 'left', fontSize: '0.85rem' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Ano</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Capital Investido</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Juros Simples</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Juros Compostos</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Juros Ganhos (Compostos)</th>
                </tr>
              </thead>
              <tbody>
                {calculations.yearlyBreakdown.map((row) => (
                  <tr key={row.year} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Ano {row.year}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{formatCurrency(row.invested)}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-azul)' }}>{formatCurrency(row.simple)}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--color-verde-dark)' }}>{formatCurrency(row.compound)}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-verde)' }}>+{formatCurrency(row.compoundInterest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

window.CalculadoraJurosCompostos = CalculadoraJurosCompostos;
