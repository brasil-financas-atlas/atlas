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
    <div className="bfa-tech-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.72rem' }}>
          PROVA VISUAL · TAXAS EQUIVALENTES
        </span>
        <span className="tabular-numbers" style={{ color: '#2563EB', background: 'rgba(37, 99, 235, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}>
          {monthlyRate.toFixed(1)}% a.m.
        </span>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--muted-foreground)', marginBottom: '0.4rem', fontWeight: 600 }}>
          <span>Ajustar Taxa Mensal:</span>
          <span className="tabular-numbers" style={{ fontWeight: 700, color: 'var(--foreground)' }}>{monthlyRate.toFixed(1)}% ao mês</span>
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
      </div>

      <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', display: 'block', fontWeight: 600 }}>Taxa Anual Efetiva (Composta):</span>
            <div className="tabular-numbers" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--track-math)' }}>
              {annualEquivalent}% <small style={{ fontSize: '0.8rem', fontWeight: 600 }}>a.a.</small>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', display: 'block' }}>Multiplicação Linear (Simples):</span>
            <div className="tabular-numbers" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--muted-foreground)' }}>
              {simpleMultiplication}% a.a.
            </div>
          </div>
        </div>
        <div style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--muted-foreground)' }}>Efeito dos Juros Compostos:</span>
          <span style={{ color: '#059669', fontWeight: 800 }}>+{compoundGain}% de juro sobre juro</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Micro-Widget 2: Matriz Comparativa de Classes de Ativos (Card Finanças)
   ========================================================================== */
function MiniFinanceWidget() {
  const [activeAsset, setActiveAsset] = useState('selic');

  const assets = {
    selic: {
      name: "Tesouro Selic",
      category: "Renda Fixa Soberana",
      yield: "10,50% a.a.",
      risk: "Risco Mínimo (Tesouro Nacional)",
      tax: "Tabela Regressiva (22,5% a 15%)",
      liquidity: "D+0 / D+1 (Imediata)",
      points: [100, 100.8, 101.6, 102.5, 103.4, 104.3, 105.2, 106.1, 107.1, 108.2, 109.3, 110.5],
      color: "#059669"
    },
    fiis: {
      name: "Fundos Imobiliários (FIIs)",
      category: "Renda Imobiliária",
      yield: "9,80% dividend yield + ganho",
      risk: "Risco Médio (Oscilação de Cotas)",
      tax: "Rendimentos Mensais 100% Isentos",
      liquidity: "D+2 em Bolsa (B3)",
      points: [100, 101.2, 99.8, 102.4, 104.1, 103.5, 106.2, 105.8, 108.4, 111.2, 109.8, 113.5],
      color: "#D97706"
    },
    ibov: {
      name: "Ações / Ibovespa",
      category: "Renda Variável & Equity",
      yield: "13,20% a.a. média histórica",
      risk: "Risco de Mercado (Volatilidade)",
      tax: "15% sobre ganho de capital (isento até 20k)",
      liquidity: "D+2 em Bolsa (B3)",
      points: [100, 104.5, 98.2, 106.8, 103.4, 112.5, 108.9, 116.4, 114.2, 122.1, 119.5, 128.4],
      color: "#2563EB"
    }
  };

  const current = assets[activeAsset];
  const minVal = Math.min(...current.points);
  const maxVal = Math.max(...current.points);
  const svgWidth = 260;
  const svgHeight = 50;

  const pointsSvg = current.points.map((val, i) => {
    const x = (i / (current.points.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / (maxVal - minVal || 1)) * (svgHeight - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bfa-tech-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800, fontSize: '0.72rem' }}>
          MATRIZ DE ATIVOS BRASILEIROS
        </span>
        <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
          {current.category}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={() => setActiveAsset('selic')}
          style={{
            flex: 1,
            padding: '0.35rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: activeAsset === 'selic' ? 700 : 500,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: activeAsset === 'selic' ? 'var(--track-finance)' : 'var(--surface-strong)',
            color: activeAsset === 'selic' ? '#FFFFFF' : 'var(--foreground)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Tesouro Selic
        </button>
        <button
          type="button"
          onClick={() => setActiveAsset('fiis')}
          style={{
            flex: 1,
            padding: '0.35rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: activeAsset === 'fiis' ? 700 : 500,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: activeAsset === 'fiis' ? '#D97706' : 'var(--surface-strong)',
            color: activeAsset === 'fiis' ? '#FFFFFF' : 'var(--foreground)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          FIIs (Imóveis)
        </button>
        <button
          type="button"
          onClick={() => setActiveAsset('ibov')}
          style={{
            flex: 1,
            padding: '0.35rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: activeAsset === 'ibov' ? 700 : 500,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: activeAsset === 'ibov' ? '#2563EB' : 'var(--surface-strong)',
            color: activeAsset === 'ibov' ? '#FFFFFF' : 'var(--foreground)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Ações (Ibov)
        </button>
      </div>

      <div style={{ height: '50px', width: '100%', marginBottom: '1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', padding: '4px', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <polyline fill="none" stroke={current.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pointsSvg} />
        </svg>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.78rem', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
        <div>
          <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: '0.7rem' }}>Rentabilidade Referência:</span>
          <span className="tabular-numbers" style={{ fontWeight: 800, color: current.color, fontSize: '0.95rem' }}>{current.yield}</span>
        </div>
        <div>
          <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: '0.7rem' }}>Tributação:</span>
          <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>{current.tax}</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Micro-Widget 3: Painel de Tese de Valuation (Card BRHSIC)
   ========================================================================== */
function MiniValuationWidget() {
  const currentPrice = 32.50;
  const [targetPrice, setTargetPrice] = useState(44.00);

  const upside = useMemo(() => {
    return (((targetPrice - currentPrice) / currentPrice) * 100).toFixed(1);
  }, [targetPrice]);

  const recommendation = Number(upside) >= 15 ? { label: "COMPRA FORTE", color: "#059669", bg: "#ECFDF5" }
    : Number(upside) >= 0 ? { label: "MANTER / NEUTRO", color: "#D97706", bg: "#FFFBEB" }
    : { label: "VENDA / DESVALORIZAÇÃO", color: "#DC2626", bg: "#FEF2F2" };

  return (
    <div className="bfa-tech-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-brhsic)', fontWeight: 800, fontSize: '0.72rem' }}>
          MODELAGEM DCF · VALUATION
        </span>
        <span className="mono-tag" style={{ color: recommendation.color, background: recommendation.bg, fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
          {recommendation.label}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.5rem', fontWeight: 600 }}>
        <span>Preço Atual de Mercado: <strong>R$ {currentPrice.toFixed(2)}</strong></span>
        <span style={{ color: 'var(--track-brhsic)' }}>Preço-Alvo Justo: <strong>R$ {targetPrice.toFixed(2)}</strong></span>
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

      <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', display: 'block', fontWeight: 600 }}>Potencial de Valorização (Upside):</span>
            <div className="tabular-numbers" style={{ fontSize: '1.5rem', fontWeight: 800, color: Number(upside) >= 0 ? '#059669' : '#DC2626' }}>
              {Number(upside) >= 0 ? `+${upside}%` : `${upside}%`}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
            <div>Múltiplo P/L Proj: <strong>11.4x</strong></div>
            <div>EV/EBITDA: <strong>6.8x</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Home Page Component (Cloudflare Pages Architecture)
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
                Matemática aplicada e finanças corporativas em nível profissional.
              </EditableBlock>

              <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                Uma suíte pedagógica aberta com 55 aulas estruturadas, simuladores dinâmicos de juros reais vs inflação e guia prático de Equity Research para o ensino médio e olimpíadas.
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

            {/* Coluna Direita: Painel de Telemetria Macroeconômica */}
            <div className="bfa-split-col--visual">
              {(() => {
                const HeroVisualizer = window.HeroCompoundVisualizer;
                return HeroVisualizer ? <HeroVisualizer /> : null;
              })()}
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Pilares de Aprendizagem em Blocos 50/50 com Prova Visual ─────── */}
      <section className="bfa-container" style={{ padding: '3rem 1.5rem' }}>
        
        {/* Bloco 1: Matemática Aplicada (Texto na Esquerda, Prova na Direita) */}
        <div className="bfa-split-row">
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 01 · MATEMÁTICA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Matemática Financeira & Modelagem Quantitativa
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Fundamentos rigorosos de álgebra, progressões aritméticas e geométricas, taxas proporcionais vs. equivalentes, juros compostos contínuos, amortização (sistemas SAC e Price) e modelagem estatística.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>✓ 4 Módulos Estruturados</strong> com 29 aulas progressivas do básico ao avançado</li>
              <li><strong>✓ Prova Geométrica</strong> de equivalência de taxas e capitalização contínua</li>
              <li><strong>✓ Exercícios de Fixação</strong> com gabarito analítico e passo a passo</li>
            </ul>
            <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Explorar Trilha de Matemática →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <MiniMathWidget />
          </div>
        </div>

        {/* Bloco 2: Finanças Corporativas (Prova na Esquerda, Texto na Direita) */}
        <div className="bfa-split-row">
          <div className="bfa-split-col--visual">
            <MiniFinanceWidget />
          </div>

          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 02 · FINANÇAS CORPORATIVAS
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Mercado de Capitais & Análise de Empresas
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              A arquitetura do Sistema Financeiro Nacional (BACEN, CVM, B3), títulos soberanos do Tesouro Direto, fundos imobiliários com isenção fiscal, contabilidade empresarial e leitura analítica de DRE, Balanço e DFC.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>✓ 3 Módulos Didáticos</strong> com 26 aulas focadas na realidade do mercado brasileiro</li>
              <li><strong>✓ Matriz Comparativa</strong> de liquidez, volatilidade e tributação de ativos</li>
              <li><strong>✓ Estudos de Caso</strong> com empresas listadas na Bolsa de Valores</li>
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
              COMPETIÇÃO NACIONAL · BRHSIC
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Guia Profissional de Equity Research
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Metodologia de ponta para elaboração de teses de investimento e relatórios de recomendação de ações na Brazil High School Investment Competition. Da análise setorial ao cálculo do custo de capital (WACC) e múltiplos.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>✓ Modelo DCF</strong> de projeção de fluxo de caixa descontado e valor terminal</li>
              <li><strong>✓ Mapeamento de Vantagens Competitivas (Moat)</strong> e matriz de governança</li>
              <li><strong>✓ Retórica e Pitch</strong> para defesas em bancas examinadoras</li>
            </ul>
            <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Ver Guia de Preparação BRHSIC →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <MiniValuationWidget />
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
              Ferramentas & Infraestrutura
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
