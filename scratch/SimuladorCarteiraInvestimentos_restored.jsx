const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

// Definição das classes de ativos disponíveis no mercado brasileiro para a BRHSIC
const ASSET_CLASSES = [
  {
    id: 'selic',
    name: 'Tesouro Selic / CDB 100% CDI',
    category: 'Renda Fixa Pós-Fixada',
    expectedReturn: 10.75, // % a.a.
    volatility: 0.8, // % desvio padrão
    dividendYield: 0.0, // % a.a.
    color: '#10B981', // Emerald
    description: 'Reserva de emergência e liquidez diária. Rendimento atrelado à taxa Selic com risco quase nulo.'
  },
  {
    id: 'ipca',
    name: 'Tesouro IPCA+ (NTN-B)',
    category: 'Renda Fixa Inflação',
    expectedReturn: 11.50, // % a.a. (IPCA ~4.5% + 7.0%)
    volatility: 5.5,
    dividendYield: 0.0,
    color: '#06B6D4', // Cyan
    description: 'Proteção garantida do poder de compra real contra a inflação com prêmio de juro real prefixado.'
  },
  {
    id: 'prefixado',
    name: 'Tesouro Prefixado (LTN)',
    category: 'Renda Fixa Prefixada',
    expectedReturn: 12.00, // % a.a.
    volatility: 7.0,
    dividendYield: 0.0,
    color: '#6366F1', // Indigo
    description: 'Taxa fixa contratada até o vencimento. Sofre marcação a mercado se resgatado antes do prazo.'
  },
  {
    id: 'fiis',
    name: 'Fundos Imobiliários (IFIX)',
    category: 'Renda Variável / Imóveis',
    expectedReturn: 12.50, // % a.a. (Valorização + Yield)
    volatility: 9.5,
    dividendYield: 8.5, // 8.5% ao ano em proventos mensais isentos de IR
    color: '#F59E0B', // Amber
    description: 'Investimento em imóveis comerciais e títulos do setor imobiliário com distribuição de aluguéis mensais isentos de IR.'
  },
  {
    id: 'acoes',
    name: 'Ações Brasileiras (Ibovespa)',
    category: 'Renda Variável / Equities',
    expectedReturn: 14.50, // % a.a.
    volatility: 18.0,
    dividendYield: 5.0,
    color: '#EC4899', // Pink
    description: 'Participação societária nas maiores empresas brasileiras. Maior potencial de valorização de longo prazo com maior volatilidade.'
  },
  {
    id: 'global',
    name: 'Ativos Globais / Dólar (S&P 500)',
    category: 'Internacional / Cambial',
    expectedReturn: 13.80, // % a.a.
    volatility: 16.5,
    dividendYield: 1.8,
    color: '#8B5CF6', // Purple
    description: 'Diversificação geográfica e proteção em moeda forte (dólar) investindo nas 500 maiores empresas do mundo.'
  }
];

// Presets de carteira para treinamento olímpico
const PORTFOLIO_PRESETS = [
  {
    id: 'conservador',
    name: '🛡️ Conservador (Reserva & Preservação)',
    desc: 'Foco em liquidez, segurança e proteção patrimonial contra oscilações de curto prazo.',
    allocations: { selic: 60, ipca: 25, prefixado: 0, fiis: 15, acoes: 0, global: 0 }
  },
  {
    id: 'moderado',
    name: '⚖️ Moderado (Equilíbrio & Proventos)',
    desc: 'Combinação clássica de renda fixa robusta com geração de renda passiva mensal em FIIs e crescimento em Ações.',
    allocations: { selic: 30, ipca: 25, prefixado: 10, fiis: 20, acoes: 10, global: 5 }
  },
  {
    id: 'arrojado',
    name: '🚀 Estrategista BRHSIC (Fronteira Eficiente)',
    desc: 'Otimização de Sharpe com alta exposição a ativos produtivos, dividendos crescentes e diversificação global.',
    allocations: { selic: 15, ipca: 20, prefixado: 5, fiis: 20, acoes: 25, global: 15 }
  }
];

function SimuladorCarteiraInvestimentos() {
  const [initialCapital, setInitialCapital] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [activeTab, setActiveTab] = useState('projection'); // 'projection' | 'breakdown' | 'challenges'
  const [selectedPreset, setSelectedPreset] = useState('moderado');

  // Alocações percentuais (somatório 100%)
  const [allocations, setAllocations] = useState({
    selic: 30,
    ipca: 25,
    prefixado: 10,
    fiis: 20,
    acoes: 10,
    global: 5
  });

  const totalAllocated = useMemo(() => {
    return Object.values(allocations).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  }, [allocations]);

  const handleAllocationChange = (assetId, val) => {
    const num = Math.max(0, Math.min(100, parseFloat(val) || 0));
    setAllocations(prev => ({
      ...prev,
      [assetId]: num
    }));
    setSelectedPreset('custom');
  };

  const applyPreset = (preset) => {
    setSelectedPreset(preset.id);
    setAllocations({ ...preset.allocations });
  };

  const normalizeTo100 = () => {
    if (totalAllocated === 0) {
      setAllocations({ selic: 100, ipca: 0, prefixado: 0, fiis: 0, acoes: 0, global: 0 });
      return;
    }
    const factor = 100 / totalAllocated;
    const normalized = {};
    let sum = 0;
    ASSET_CLASSES.forEach((a, idx) => {
      if (idx === ASSET_CLASSES.length - 1) {
        normalized[a.id] = Math.max(0, 100 - sum);
      } else {
        const val = Math.round((allocations[a.id] || 0) * factor);
        normalized[a.id] = val;
        sum += val;
      }
    });
    setAllocations(normalized);
  };

  // Cálculos da Carteira Ponderada
  const portfolioMetrics = useMemo(() => {
    const weights = {};
    const sumW = Math.max(totalAllocated, 0.001);
    
    ASSET_CLASSES.forEach(a => {
      weights[a.id] = (allocations[a.id] || 0) / sumW;
    });

    // Retorno ponderado nominal (% a.a.)
    const weightedNominalReturn = ASSET_CLASSES.reduce((acc, a) => {
      return acc + (weights[a.id] * a.expectedReturn);
    }, 0);

    // Dividend Yield ponderado (% a.a.)
    const weightedDividendYield = ASSET_CLASSES.reduce((acc, a) => {
      return acc + (weights[a.id] * a.dividendYield);
    }, 0);

    // Volatilidade aproximada da carteira (% a.a.) com benefício de diversificação
    const weightedRawVol = ASSET_CLASSES.reduce((acc, a) => {
      return acc + (weights[a.id] * a.volatility);
    }, 0);
    // Fator de diversificação simples (reduz variância conjunta)
    const diversificationBonus = (allocations.acoes > 0 && allocations.selic > 0) || (allocations.global > 0) ? 0.88 : 0.98;
    const portfolioVolatility = weightedRawVol * diversificationBonus;

    // Taxa livre de risco (Selic Benchmark ~ 10.5%)
    const riskFreeRate = 10.5;
    // Índice de Sharpe Simulado: (Rp - Rf) / Volatilidade
    const excessReturn = weightedNominalReturn - riskFreeRate;
    const sharpeRatio = portfolioVolatility > 0 ? (excessReturn / portfolioVolatility) : 0;

    // Inflação anual esperada (IPCA ~ 4.5% a.a.)
    const expectedInflation = 4.5;
    const realReturn = ((1 + weightedNominalReturn / 100) / (1 + expectedInflation / 100) - 1) * 100;

    // Projeção Temporal Ano a Ano
    const P = parseFloat(initialCapital) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const nYears = parseInt(years, 10) || 1;
    const totalMonths = nYears * 12;

    const rMonthly = Math.pow(1 + weightedNominalReturn / 100, 1 / 12) - 1;
    const rCdiMonthly = Math.pow(1 + 0.105, 1 / 12) - 1;
    const rIpcaMonthly = Math.pow(1 + 0.045, 1 / 12) - 1;
    const rPoupancaMonthly = Math.pow(1 + 0.065, 1 / 12) - 1;

    const yearlyData = [];
    for (let y = 0; y <= nYears; y++) {
      const m = y * 12;
      const totalInv = P + (PMT * m);

      // Saldo Carteira BRHSIC
      let balancePortfolio = P;
      if (m > 0 && rMonthly > 0) {
        balancePortfolio = (P * Math.pow(1 + rMonthly, m)) + (PMT * ((Math.pow(1 + rMonthly, m) - 1) / rMonthly));
      } else if (m === 0) {
        balancePortfolio = P;
      }

      // Saldo 100% CDI
      let balanceCDI = P;
      if (m > 0 && rCdiMonthly > 0) {
        balanceCDI = (P * Math.pow(1 + rCdiMonthly, m)) + (PMT * ((Math.pow(1 + rCdiMonthly, m) - 1) / rCdiMonthly));
      }

      // Saldo Inflação (Poder de compra base)
      let balanceIPCA = P;
      if (m > 0 && rIpcaMonthly > 0) {
        balanceIPCA = (P * Math.pow(1 + rIpcaMonthly, m)) + (PMT * ((Math.pow(1 + rIpcaMonthly, m) - 1) / rIpcaMonthly));
      }

      // Saldo Poupança
      let balancePoupanca = P;
      if (m > 0 && rPoupancaMonthly > 0) {
        balancePoupanca = (P * Math.pow(1 + rPoupancaMonthly, m)) + (PMT * ((Math.pow(1 + rPoupancaMonthly, m) - 1) / rPoupancaMonthly));
      }

      // Renda passiva mensal estimada gerada no ano
      const monthlyIncome = (balancePortfolio * (weightedDividendYield / 100)) / 12;

      yearlyData.push({
        year: y,
        invested: totalInv,
        portfolio: balancePortfolio,
        cdi: balanceCDI,
        ipca: balanceIPCA,
        poupanca: balancePoupanca,
        monthlyIncome
      });
    }

    const finalPortfolio = yearlyData[yearlyData.length - 1].portfolio;
    const finalInvested = yearlyData[yearlyData.length - 1].invested;
    const totalGains = finalPortfolio - finalInvested;
    const finalMonthlyIncome = yearlyData[yearlyData.length - 1].monthlyIncome;

    return {
      weightedNominalReturn,
      weightedDividendYield,
      portfolioVolatility,
      sharpeRatio,
      realReturn,
      finalPortfolio,
      finalInvested,
      totalGains,
      finalMonthlyIncome,
      yearlyData
    };
  }, [allocations, totalAllocated, initialCapital, monthlyContribution, years]);

  // Formatação em Reais
  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Avaliação do Nível de Risco da Carteira
  const riskAssessment = useMemo(() => {
    const vol = portfolioMetrics.portfolioVolatility;
    if (vol < 3.0) return { label: 'Muito Baixo (Ultra Conservador)', color: 'var(--color-verde-dark)', badge: 'bfa-badge--verde' };
    if (vol < 7.0) return { label: 'Baixo a Moderado', color: 'var(--color-azul-accent)', badge: 'bfa-badge--azul' };
    if (vol < 12.0) return { label: 'Moderado (Equilibrado)', color: 'var(--color-ouro)', badge: 'bfa-badge--ouro' };
    if (vol < 16.0) return { label: 'Arrojado (Agressivo)', color: '#F97316', badge: 'bfa-badge--ouro' };
    return { label: 'Muito Alto (Especulativo)', color: '#EF4444', badge: 'bfa-badge--ouro' };
  }, [portfolioMetrics.portfolioVolatility]);

  // Desafios Olímpicos BRHSIC
  const challenges = useMemo(() => {
    const c1 = portfolioMetrics.realReturn >= 5.0 && portfolioMetrics.portfolioVolatility <= 10.0;
    const c2 = portfolioMetrics.weightedDividendYield >= 4.0;
    const c3 = (allocations.global || 0) >= 10 && (allocations.acoes || 0) >= 15;
    const c4 = portfolioMetrics.sharpeRatio >= 0.25;

    const completedCount = [c1, c2, c3, c4].filter(Boolean).length;
    return {
      c1,
      c2,
      c3,
      c4,
      completedCount,
      allCompleted: completedCount === 4
    };
  }, [portfolioMetrics, allocations]);

  // Renderização SVG do Gráfico
  const maxChartValue = Math.max(...portfolioMetrics.yearlyData.map(d => Math.max(d.portfolio, d.cdi, d.invested, 1)));
  const svgWidth = 700;
  const svgHeight = 280;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const getX = (year) => padding.left + (year / years) * (svgWidth - padding.left - padding.right);
  const getY = (val) => svgHeight - padding.bottom - (val / maxChartValue) * (svgHeight - padding.top - padding.bottom);

  const makePath = (key) => {
    return portfolioMetrics.yearlyData.map((d, i) => {
      const x = getX(d.year);
      const y = getY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="bfa-card" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
      {/* Cabeçalho do Simulador */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="bfa-badge bfa-badge--ouro" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="trophy" size={14} color="var(--color-ouro)" /> Preparatório Oficial BRHSIC
            </span>
            <span className="bfa-badge bfa-badge--verde">Simulador de Carteira</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', margin: 0 }}>
            Simulador de Carteira de Investimentos
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.92rem', marginTop: '0.35rem', maxWidth: '680px' }}>
            Aprenda a arte da alocação de ativos, diversificação e fronteira de risco da <strong>Olimpíada Brasileira de Investimentos</strong>.
          </p>
        </div>

        {/* Botão de Presets */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {PORTFOLIO_PRESETS.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={selectedPreset === preset.id ? "bfa-btn bfa-btn--ouro" : "bfa-btn bfa-btn--outline"}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              {preset.name.split(' ')[0]} {preset.name.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal: Parâmetros e Alocação */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* Coluna 1: Parâmetros de Aporte */}
        <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BfaIcon name="dollarSign" size={18} color="var(--color-verde-dark)" /> 1. Parâmetros de Aporte
          </h3>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>Capital Inicial:</label>
              <strong style={{ color: 'var(--color-verde-dark)', fontFamily: 'var(--font-mono)' }}>{formatBRL(initialCapital)}</strong>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-verde-dark)' }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>Aporte Mensal Recorrente:</label>
              <strong style={{ color: 'var(--color-verde-dark)', fontFamily: 'var(--font-mono)' }}>{formatBRL(monthlyContribution)}/mês</strong>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-verde-dark)' }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)' }}>Horizonte de Tempo:</label>
              <strong style={{ color: 'var(--color-azul-accent)', fontFamily: 'var(--font-mono)' }}>{years} {years === 1 ? 'ano' : 'anos'}</strong>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: 'var(--color-azul-accent)' }}
            />
          </div>

          {/* Resumo do Perfil */}
          <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Classificação de Risco:</span>
              <span className={`bfa-badge ${riskAssessment.badge}`} style={{ fontSize: '0.75rem' }}>
                {riskAssessment.label}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Índice de Sharpe:</span>
              <strong style={{ fontSize: '0.9rem', color: portfolioMetrics.sharpeRatio >= 0.2 ? 'var(--color-verde-dark)' : 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                {portfolioMetrics.sharpeRatio.toFixed(2)} {portfolioMetrics.sharpeRatio >= 0.2 ? '✓ (Excelente)' : ''}
              </strong>
            </div>
          </div>
        </div>

        {/* Coluna 2: Sliders de Alocação de Ativos */}
        <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="pieChart" size={18} color="var(--color-ouro)" /> 2. Alocação da Carteira
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: totalAllocated === 100 ? 'var(--color-verde-dark)' : '#EF4444', fontFamily: 'var(--font-mono)' }}>
                Total: {totalAllocated}%
              </span>
              {totalAllocated !== 100 && (
                <button
                  type="button"
                  onClick={normalizeTo100}
                  className="bfa-btn bfa-btn--outline"
                  style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                >
                  Ajustar p/ 100%
                </button>
              )}
            </div>
          </div>

          {/* Barra Visual de Distribuição */}
          <div style={{ display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '1.25rem', background: 'var(--border)' }}>
            {ASSET_CLASSES.map(a => (
              <div
                key={a.id}
                style={{
                  width: `${allocations[a.id] || 0}%`,
                  backgroundColor: a.color,
                  transition: 'width 0.3s ease'
                }}
                title={`${a.name}: ${allocations[a.id] || 0}%`}
              />
            ))}
          </div>

          {/* Sliders individuais */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {ASSET_CLASSES.map(asset => (
              <div key={asset.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: asset.color }} />
                    {asset.name}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                    {allocations[asset.id] || 0}% ({formatBRL(initialCapital * ((allocations[asset.id] || 0) / 100))})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={allocations[asset.id] || 0}
                  onChange={(e) => handleAllocationChange(asset.id, e.target.value)}
                  style={{ width: '100%', accentColor: asset.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patrimônio Projetado</span>
          <h4 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-verde-dark)', fontFamily: 'var(--font-mono)', margin: '0.35rem 0' }}>
            {formatBRL(portfolioMetrics.finalPortfolio)}
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Total Aportado: {formatBRL(portfolioMetrics.finalInvested)}</span>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lucro Acumulado (Juros)</span>
          <h4 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-ouro)', fontFamily: 'var(--font-mono)', margin: '0.35rem 0' }}>
            +{formatBRL(portfolioMetrics.totalGains)}
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-verde-dark)', fontWeight: 600 }}>
            {portfolioMetrics.finalInvested > 0 ? `+${((portfolioMetrics.totalGains / portfolioMetrics.finalInvested) * 100).toFixed(1)}% do valor investido` : ''}
          </span>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Renda Passiva Mensal (Ano {years})</span>
          <h4 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-azul-accent)', fontFamily: 'var(--font-mono)', margin: '0.35rem 0' }}>
            {formatBRL(portfolioMetrics.finalMonthlyIncome)}<span style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>/mês</span>
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Proventos & Dividendos isentos de IR</span>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Retorno Acima da Inflação</span>
          <h4 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--foreground)', fontFamily: 'var(--font-mono)', margin: '0.35rem 0' }}>
            +{portfolioMetrics.realReturn.toFixed(2)}%<span style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}> a.a. real</span>
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Retorno Nominal: {portfolioMetrics.weightedNominalReturn.toFixed(2)}% a.a.</span>
        </div>
      </div>

      {/* Tabs de Visualização */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('projection')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'transparent',
            color: activeTab === 'projection' ? 'var(--color-verde-dark)' : 'var(--muted-foreground)',
            fontWeight: activeTab === 'projection' ? 700 : 500,
            borderBottom: activeTab === 'projection' ? '2px solid var(--color-verde-dark)' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          📈 Gráfico Comparativo & Benchmark
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('breakdown')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'transparent',
            color: activeTab === 'breakdown' ? 'var(--color-verde-dark)' : 'var(--muted-foreground)',
            fontWeight: activeTab === 'breakdown' ? 700 : 500,
            borderBottom: activeTab === 'breakdown' ? '2px solid var(--color-verde-dark)' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          📋 Detalhamento por Ativo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('challenges')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'transparent',
            color: activeTab === 'challenges' ? 'var(--color-ouro)' : 'var(--muted-foreground)',
            fontWeight: activeTab === 'challenges' ? 700 : 500,
            borderBottom: activeTab === 'challenges' ? '2px solid var(--color-ouro)' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🏆 Missões BRHSIC {challenges.allCompleted ? '✓ (100%)' : `(${challenges.completedCount}/4)`}
        </button>
      </div>

      {/* Conteúdo da Tab 1: Gráfico */}
      {activeTab === 'projection' && (
        <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>Evolução Patrimonial ao Longo do Tempo</h4>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-verde-dark)', fontWeight: 600 }}>
                <span style={{ width: '12px', height: '3px', backgroundColor: 'var(--color-verde-dark)' }} /> Carteira BRHSIC
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-azul-accent)' }}>
                <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--color-azul-accent)', borderTop: '1px dashed' }} /> 100% CDI
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444' }}>
                <span style={{ width: '12px', height: '2px', backgroundColor: '#EF4444' }} /> Inflação (IPCA)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted-foreground)' }}>
                <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--muted-foreground)' }} /> Total Aportado
              </span>
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', minWidth: '550px', height: 'auto' }}>
              {/* Linhas de Grade Horizontal */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = padding.top + (svgHeight - padding.top - padding.bottom) * (1 - pct);
                const val = maxChartValue * pct;
                return (
                  <g key={idx}>
                    <line x1={padding.left} y1={y} x2={svgWidth - padding.right} y2={y} stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
                    <text x={padding.left - 8} y={y + 4} fill="var(--muted-foreground)" fontSize="10" textAnchor="end" fontFamily="monospace">
                      {formatBRL(val).replace('R$', '').trim()}
                    </text>
                  </g>
                );
              })}

              {/* Linhas de Grade Vertical (Anos) */}
              {portfolioMetrics.yearlyData.filter((_, i) => i % Math.max(1, Math.floor(years / 5)) === 0 || i === years).map((d, idx) => {
                const x = getX(d.year);
                return (
                  <g key={idx}>
                    <line x1={x} y1={padding.top} x2={x} y2={svgHeight - padding.bottom} stroke="var(--border)" opacity="0.3" />
                    <text x={x} y={svgHeight - padding.bottom + 18} fill="var(--muted-foreground)" fontSize="11" textAnchor="middle" fontWeight="500">
                      Ano {d.year}
                    </text>
                  </g>
                );
              })}

              {/* Curvas de Desempenho */}
              <path d={makePath('invested')} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
              <path d={makePath('ipca')} fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.8" />
              <path d={makePath('cdi')} fill="none" stroke="var(--color-azul-accent)" strokeWidth="2" strokeDasharray="3 3" />
              <path d={makePath('portfolio')} fill="none" stroke="var(--color-verde-dark)" strokeWidth="3.5" />

              {/* Ponto Final da Carteira */}
              <circle
                cx={getX(years)}
                cy={getY(portfolioMetrics.finalPortfolio)}
                r="5"
                fill="var(--color-verde-dark)"
                stroke="#FFF"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Conteúdo da Tab 2: Detalhamento por Ativo */}
      {activeTab === 'breakdown' && (
        <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1rem' }}>Composição Atual e Rentabilidade Esperada</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--muted-foreground)' }}>
                  <th style={{ padding: '0.75rem' }}>Classe de Ativo</th>
                  <th style={{ padding: '0.75rem' }}>Peso (%)</th>
                  <th style={{ padding: '0.75rem' }}>Capital Inicial</th>
                  <th style={{ padding: '0.75rem' }}>Retorno Esperado</th>
                  <th style={{ padding: '0.75rem' }}>Dividend Yield (Proventos)</th>
                  <th style={{ padding: '0.75rem' }}>Volatilidade</th>
                </tr>
              </thead>
              <tbody>
                {ASSET_CLASSES.map(asset => {
                  const weight = (allocations[asset.id] || 0);
                  const valInitial = initialCapital * (weight / 100);
                  return (
                    <tr key={asset.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: asset.color }} />
                        {asset.name}
                      </td>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{weight}%</td>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)' }}>{formatBRL(valInitial)}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--color-verde-dark)', fontWeight: 600 }}>{asset.expectedReturn.toFixed(2)}% a.a.</td>
                      <td style={{ padding: '0.75rem', color: asset.dividendYield > 0 ? 'var(--color-azul-accent)' : 'var(--muted-foreground)' }}>
                        {asset.dividendYield > 0 ? `${asset.dividendYield.toFixed(1)}% a.a.` : '—'}
                      </td>
                      <td style={{ padding: '0.75rem', color: asset.volatility > 12 ? '#EF4444' : 'var(--muted-foreground)' }}>
                        {asset.volatility.toFixed(1)}% a.a.
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Conteúdo da Tab 3: Missões e Desafios BRHSIC */}
      {activeTab === 'challenges' && (
        <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BfaIcon name="trophy" size={20} color="var(--color-ouro)" /> Desafios Olímpicos da Carteira BRHSIC
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                Ajuste os sliders para cumprir os requisitos de alocação de um analista de investimentos de elite.
              </p>
            </div>
            <span className={challenges.allCompleted ? "bfa-badge bfa-badge--ouro" : "bfa-badge bfa-badge--azul"}>
              {challenges.completedCount} de 4 Desafios Concluídos
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-md)', border: challenges.c1 ? '1px solid var(--color-verde-dark)' : '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: challenges.c1 ? 'var(--color-verde-dark)' : 'var(--foreground)', fontSize: '0.95rem' }}>
                  {challenges.c1 ? '✓' : '○'} Missão 1: Batedor de Inflação
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', margin: '0.2rem 0 0 0' }}>
                  Obtenha retorno real acima de 5.0% ao ano mantendo volatilidade moderada (&le; 10%). (Atual: {portfolioMetrics.realReturn.toFixed(1)}% real / {portfolioMetrics.portfolioVolatility.toFixed(1)}% vol)
                </p>
              </div>
              <span style={{ fontWeight: 700, color: challenges.c1 ? 'var(--color-verde-dark)' : 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                {challenges.c1 ? 'Desbloqueado' : 'Pendente'}
              </span>
            </div>

            <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-md)', border: challenges.c2 ? '1px solid var(--color-verde-dark)' : '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: challenges.c2 ? 'var(--color-verde-dark)' : 'var(--foreground)', fontSize: '0.95rem' }}>
                  {challenges.c2 ? '✓' : '○'} Missão 2: Máquina de Renda Passiva
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', margin: '0.2rem 0 0 0' }}>
                  Construa uma carteira com Dividend Yield médio ponderado de pelo menos 4.0% ao ano. (Atual: {portfolioMetrics.weightedDividendYield.toFixed(1)}% yield)
                </p>
              </div>
              <span style={{ fontWeight: 700, color: challenges.c2 ? 'var(--color-verde-dark)' : 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                {challenges.c2 ? 'Desbloqueado' : 'Pendente'}
              </span>
            </div>

            <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-md)', border: challenges.c3 ? '1px solid var(--color-verde-dark)' : '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: challenges.c3 ? 'var(--color-verde-dark)' : 'var(--foreground)', fontSize: '0.95rem' }}>
                  {challenges.c3 ? '✓' : '○'} Missão 3: Alocador Global
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', margin: '0.2rem 0 0 0' }}>
                  Aloque pelo menos 10% em Ativos Globais/Dólar e 15% em Ações Brasileiras. (Atual: {allocations.global || 0}% Global / {allocations.acoes || 0}% Ações)
                </p>
              </div>
              <span style={{ fontWeight: 700, color: challenges.c3 ? 'var(--color-verde-dark)' : 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                {challenges.c3 ? 'Desbloqueado' : 'Pendente'}
              </span>
            </div>

            <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-md)', border: challenges.c4 ? '1px solid var(--color-verde-dark)' : '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: challenges.c4 ? 'var(--color-verde-dark)' : 'var(--foreground)', fontSize: '0.95rem' }}>
                  {challenges.c4 ? '✓' : '○'} Missão 4: Eficiência de Sharpe Olímpica
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', margin: '0.2rem 0 0 0' }}>
                  Atinja um Índice de Sharpe &ge; 0.25 (otimização entre retorno excedente e risco). (Atual: {portfolioMetrics.sharpeRatio.toFixed(2)})
                </p>
              </div>
              <span style={{ fontWeight: 700, color: challenges.c4 ? 'var(--color-verde-dark)' : 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                {challenges.c4 ? 'Desbloqueado' : 'Pendente'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.SimuladorCarteiraInvestimentos = SimuladorCarteiraInvestimentos;
