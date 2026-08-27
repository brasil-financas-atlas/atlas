const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Micro-Widget 1: Mini Calculadora de Taxas Equivalentes (Card Matemática)
   ========================================================================== */
function MiniMathWidget() {
  const [monthlyRate, setMonthlyRate] = useState(1.0);

  const annualEquivalent = useMemo(() => {
    const im = monthlyRate / 100;
    const ia = Math.pow(1 + im, 12) - 1;
    return (ia * 100).toFixed(2);
  }, [monthlyRate]);

  const simpleMultiplication = (monthlyRate * 12).toFixed(2);
  const compoundGain = (Number(annualEquivalent) - Number(simpleMultiplication)).toFixed(2);

  return (
    <div className="bfa-micro-widget">
      <div className="bfa-micro-widget__header">
        <span className="bfa-micro-widget__title">Simulador de Taxa Equivalente</span>
        <span className="bfa-micro-widget__badge" style={{ color: '#2563EB', background: 'rgba(37, 99, 235, 0.1)' }}>
          {monthlyRate.toFixed(1)}% ao mês
        </span>
      </div>

      <input
        type="range"
        min="0.5"
        max="3.0"
        step="0.1"
        value={monthlyRate}
        onChange={(e) => setMonthlyRate(Number(e.target.value))}
        className="bfa-mini-slider"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border)' }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', display: 'block' }}>Taxa Anual Real (Juros Compostos)</span>
          <span className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--track-math)' }}>
            {annualEquivalent}% <small style={{ fontSize: '0.75rem', fontWeight: 600 }}>a.a.</small>
          </span>
        </div>
        <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '0.2rem 0.45rem', borderRadius: '4px' }}>
          +{compoundGain}% vs linear
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Micro-Widget 2: Mini Sparkline de Classes de Ativos (Card Finanças)
   ========================================================================== */
function MiniFinanceWidget() {
  const [activeAsset, setActiveAsset] = useState('selic');

  const assets = {
    selic: {
      name: "Tesouro Selic",
      yield: "10,50% a.a.",
      risk: "Risco Mínimo (Soberano)",
      points: [100, 100.8, 101.6, 102.5, 103.4, 104.3, 105.2, 106.1, 107.1, 108.2, 109.3, 110.5],
      color: "#059669"
    },
    fiis: {
      name: "Fundos Imobiliários",
      yield: "9,80% + Isento",
      risk: "Renda Passiva Mensal",
      points: [100, 101.2, 99.8, 102.4, 104.1, 103.5, 106.2, 105.8, 108.4, 111.2, 109.8, 113.5],
      color: "#D97706"
    },
    ibov: {
      name: "Ações / Ibovespa",
      yield: "13,20% a.a. hist.",
      risk: "Renda Variável / Equity",
      points: [100, 104.5, 98.2, 106.8, 103.4, 112.5, 108.9, 116.4, 114.2, 122.1, 119.5, 128.4],
      color: "#2563EB"
    }
  };

  const current = assets[activeAsset];
  const minVal = Math.min(...current.points);
  const maxVal = Math.max(...current.points);
  const svgWidth = 240;
  const svgHeight = 45;

  const pointsSvg = current.points.map((val, i) => {
    const x = (i / (current.points.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / (maxVal - minVal || 1)) * (svgHeight - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bfa-micro-widget">
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.65rem' }}>
        <button
          type="button"
          onClick={() => setActiveAsset('selic')}
          style={{
            flex: 1,
            padding: '0.25rem 0.4rem',
            fontSize: '0.72rem',
            fontWeight: activeAsset === 'selic' ? 700 : 500,
            borderRadius: '4px',
            border: 'none',
            background: activeAsset === 'selic' ? '#059669' : 'var(--card)',
            color: activeAsset === 'selic' ? '#FFFFFF' : 'var(--muted-foreground)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Selic
        </button>
        <button
          type="button"
          onClick={() => setActiveAsset('fiis')}
          style={{
            flex: 1,
            padding: '0.25rem 0.4rem',
            fontSize: '0.72rem',
            fontWeight: activeAsset === 'fiis' ? 700 : 500,
            borderRadius: '4px',
            border: 'none',
            background: activeAsset === 'fiis' ? '#D97706' : 'var(--card)',
            color: activeAsset === 'fiis' ? '#FFFFFF' : 'var(--muted-foreground)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          FIIs
        </button>
        <button
          type="button"
          onClick={() => setActiveAsset('ibov')}
          style={{
            flex: 1,
            padding: '0.25rem 0.4rem',
            fontSize: '0.72rem',
            fontWeight: activeAsset === 'ibov' ? 700 : 500,
            borderRadius: '4px',
            border: 'none',
            background: activeAsset === 'ibov' ? '#2563EB' : 'var(--card)',
            color: activeAsset === 'ibov' ? '#FFFFFF' : 'var(--muted-foreground)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Ações
        </button>
      </div>

      {/* Mini Sparkline SVG */}
      <div style={{ height: '45px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <polyline
            fill="none"
            stroke={current.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsSvg}
          />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>{current.risk}</span>
        <span className="tabular-numbers" style={{ fontSize: '0.88rem', fontWeight: 800, color: current.color }}>
          {current.yield}
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Micro-Widget 3: Mini Valuation & Target Price Gauge (Card BRHSIC)
   ========================================================================== */
function MiniValuationWidget() {
  const currentPrice = 32.50;
  const [targetPrice, setTargetPrice] = useState(44.00);

  const upside = useMemo(() => {
    return (((targetPrice - currentPrice) / currentPrice) * 100).toFixed(1);
  }, [targetPrice]);

  const recommendation = Number(upside) >= 15 ? { label: "COMPRA FORTE", color: "#059669", bg: "#ECFDF5" }
    : Number(upside) >= 0 ? { label: "NEUTRO / MANTER", color: "#D97706", bg: "#FFFBEB" }
    : { label: "VENDA / DOWN", color: "#DC2626", bg: "#FEF2F2" };

  return (
    <div className="bfa-micro-widget">
      <div className="bfa-micro-widget__header">
        <span className="bfa-micro-widget__title">Tese de Equity Research</span>
        <span className="bfa-micro-widget__badge" style={{ color: recommendation.color, background: recommendation.bg }}>
          {recommendation.label}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem', fontWeight: 600 }}>
        <span>Preço Atual: <strong>R$ {currentPrice.toFixed(2)}</strong></span>
        <span style={{ color: 'var(--track-brhsic)' }}>Preço-Alvo: <strong>R$ {targetPrice.toFixed(2)}</strong></span>
      </div>

      <input
        type="range"
        min="20"
        max="55"
        step="0.5"
        value={targetPrice}
        onChange={(e) => setTargetPrice(Number(e.target.value))}
        className="bfa-mini-slider"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Potencial Calculado (DCF)</span>
        <span className="tabular-numbers" style={{ fontSize: '1.1rem', fontWeight: 800, color: Number(upside) >= 0 ? '#059669' : '#DC2626' }}>
          {Number(upside) >= 0 ? `+${upside}%` : `${upside}%`}
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Home Page Component (Main Landing Experience)
   ========================================================================== */
function Home() {
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const stats = [
    { value: "55", label: "Aulas publicadas", note: "Matemática & Finanças", color: "var(--track-finance)" },
    { value: "7", label: "Módulos de estudo", note: "Conteúdo progressivo", color: "var(--gold)" },
    { value: "100%", label: "Acesso gratuito", note: "Sem custo", color: "var(--track-math)" },
    { value: "BRHSIC", label: "Equity Research", note: "Guia de preparação", color: "var(--gold-deep)" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 5rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px' }}>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.95)', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 700 }}>
                Brasil Finanças Atlas
              </span>
              <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 700 }}>
                Acesso 100% Gratuito
              </span>
            </div>

            <EditableBlock id="home-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3.6rem', fontWeight: 800, lineHeight: 1.12, color: '#FFFFFF', letterSpacing: '-0.035em' }}>
              Matemática aplicada e finanças corporativas em um único ambiente de estudos.
            </EditableBlock>

            <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.2rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '1.35rem', maxWidth: '740px' }}>
              Aulas teóricas com rigor pedagógico, exercícios de fixação, simuladores de juros compostos e guia de preparação de alta performance.
            </EditableBlock>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.25rem' }}>
              <a href="#/matematica" className="bfa-btn bfa-btn--verde" style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.4)' }}>
                Começar Trilha de Matemática →
              </a>
              <a href="#/financas" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#FFFFFF', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                Ver Trilha de Finanças
              </a>
            </div>
          </div>

          {/* Interactive Hero Showpiece */}
          {(() => {
            const HeroVisualizer = window.HeroCompoundVisualizer;
            return HeroVisualizer ? <HeroVisualizer /> : null;
          })()}

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '3.5rem' }}>
            {stats.map((s) => (
              <div key={s.label} className="bfa-stat-spotlight">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="mono-tag" style={{ color: s.color, fontWeight: 700, fontSize: '0.75rem', background: 'rgba(255,255,255,0.12)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {s.note}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.2rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trilhas Principais com Micro-Widgets Operáveis */}
      <section className="bfa-container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
              GRADE CURRICULAR INTERATIVA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Trilhas de Aprendizagem
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="mono-tag" style={{ padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--track-math)', fontWeight: 700 }}>
              Matemática · 4 Módulos (29 aulas)
            </span>
            <span className="mono-tag" style={{ padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--track-finance)', fontWeight: 700 }}>
              Finanças · 3 Módulos (26 aulas)
            </span>
          </div>
        </div>

        {/* Bento Grid com Micro-Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          
          {/* Card 1: Matemática com Mini Calculadora de Taxas */}
          <article className="bfa-bento-card--interactive" style={{ borderTop: '4px solid var(--track-math)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                TRILHA 01 · MATEMÁTICA
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>29 Aulas</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Matemática Aplicada a Finanças
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Fundamentos de álgebra, juros compostos, porcentagem, inflação e análise quantitativa com modelagem.
            </p>

            {/* Live Micro-Tool */}
            <MiniMathWidget />

            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Aulas & Exercícios</span>
              <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.55rem 1.15rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.85rem' }}>
                Acessar Trilha →
              </a>
            </div>
          </article>

          {/* Card 2: Finanças com Mini Sparkline de Ativos */}
          <article className="bfa-bento-card--interactive" style={{ borderTop: '4px solid var(--track-finance)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                TRILHA 02 · FINANÇAS
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>26 Aulas</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Finanças & Investimentos
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Estrutura do mercado de capitais brasileiro, renda fixa, FIIs, ações, contabilidade e valuation DCF.
            </p>

            {/* Live Micro-Tool */}
            <MiniFinanceWidget />

            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Mercado & Valuation</span>
              <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.55rem 1.15rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.85rem' }}>
                Acessar Trilha →
              </a>
            </div>
          </article>

          {/* Card 3: BRHSIC com Mini Valuation Gauge */}
          <article className="bfa-bento-card--interactive" style={{ borderTop: '4px solid var(--track-brhsic)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'rgba(217, 119, 6, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                COMPETIÇÃO · BRHSIC
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>Guia de Estudos</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Preparação BRHSIC
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Estruturação de relatórios profissionais de Equity Research, modelagem financeira e tese de investimento.
            </p>

            {/* Live Micro-Tool */}
            <MiniValuationWidget />

            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Equity Research</span>
              <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.55rem 1.15rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.85rem' }}>
                Ver Guia →
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Ferramentas do Laboratório */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)', padding: '5rem 0' }}>
        <div className="bfa-container">
          <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
            FERRAMENTAS PRÁTICAS
          </span>
          <h2 className="headline-punch" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '2.5rem', letterSpacing: '-0.03em' }}>
            Laboratório Interativo
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="tool-card bfa-bento-card">
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>Simulador de Juros</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Cálculo e comparação entre modelos de juros simples e compostos em diferentes prazos.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Abrir Simulador →
              </a>
            </div>

            <div className="tool-card bfa-bento-card">
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>Cronograma de Estudos</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Calculadora de metas e acompanhamento de ritmo de estudos.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Gerar Meta →
              </a>
            </div>

            <div className="tool-card bfa-bento-card">
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>Certificado Digital</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Emissão de certificado de conclusão com código único de validação.
              </p>
              <a href="#/exercicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--track-finance)' }}>
                Validar Emissão →
              </a>
            </div>

            <div className="tool-card bfa-bento-card">
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>Gerenciamento de Conteúdo</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Painel administrativo para inclusão e edição de módulos e exercícios.
              </p>
              <a href="#/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
                Área do Professor →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
