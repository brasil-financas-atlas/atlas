const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Hero Visual: Terminal de Aprendizagem & Telemetria do Atlas (Stripe/Linear)
   ========================================================================== */
function HeroPlatformMockup() {
  const [activeTab, setActiveTab] = useState('aula');

  return (
    <div className="bfa-tech-card" style={{ background: 'rgba(11, 15, 25, 0.95)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)', padding: '1.5rem 1.75rem' }}>
      
      {/* Chrome Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('aula')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'aula' ? 'rgba(52, 211, 153, 0.15)' : 'transparent',
              color: activeTab === 'aula' ? '#34D399' : '#94A3B8',
              cursor: 'pointer'
            }}
          >
            📐 Caderno Teórico
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('telemetria')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'telemetria' ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
              color: activeTab === 'telemetria' ? '#60A5FA' : '#94A3B8',
              cursor: 'pointer'
            }}
          >
            📊 Telemetria Macro
          </button>
        </div>

        <span className="mono-tag" style={{ color: '#34D399', fontSize: '0.7rem', fontWeight: 800 }}>
          SISTEMA ATIVO · BFA v2.0
        </span>
      </div>

      {activeTab === 'aula' ? (
        <div>
          {/* Lecture Snippet */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="mono-tag" style={{ color: '#94A3B8', fontSize: '0.72rem' }}>
              MÓDULO 02 · AULA 04
            </span>
            <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.1)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
              Rigor Acadêmico
            </span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
            Dinâmica Exponencial & Capitalização Contínua
          </h4>

          {/* Mathematical Proof Box */}
          <div style={{ background: 'rgba(9, 13, 22, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
              // Equação Fundamental de Capitalização Contínua:
            </div>
            <div style={{ fontSize: '1.25rem', color: '#34D399', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.02em' }}>
              M(t) = C · e^(r · t)
            </div>
            <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '0.5rem', lineHeight: 1.5 }}>
              Onde o limite discreto de reinvestimento instantâneo converge para a constante de Euler (e ≈ 2,71828).
            </div>
          </div>

          {/* Verification Footnote */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem' }}>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>CERTIFICADO</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>Hash SHA-256</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem' }}>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>ACESSO</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34D399' }}>100% Gratuito</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Telemetry Tab */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
              <span className="mono-tag" style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>SELIC META (BACEN)</span>
              <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34D399' }}>10,50% a.a.</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
              <span className="mono-tag" style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>IPCA INFLAÇÃO (12M)</span>
              <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FBBF24' }}>4,23% acum.</div>
            </div>
          </div>

          <div style={{ background: 'rgba(9, 13, 22, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
              <span>Juro Real Líquido (Equação de Fisher):</span>
              <strong style={{ color: '#34D399' }}>+6,01% a.a. real</strong>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
              Rentabilidade soberana descontada a inflação com preservação do poder de compra.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>Fonte de Dados: <strong>B3 / Banco Central do Brasil</strong></span>
            <span style={{ color: '#34D399' }}>● Sincronizado</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Pilar 1: Matriz de Capitalização e Prova Algébrica (Matemática)
   ========================================================================== */
function MathProofLedgerCard() {
  const steps = [
    { year: "Ano 01", nominal: "R$ 11.050", gain: "+10,5%", note: "Efeito inicial linear" },
    { year: "Ano 05", nominal: "R$ 16.474", gain: "+64,7%", note: "Início da curvatura" },
    { year: "Ano 10", nominal: "R$ 27.140", gain: "+171,4%", note: "Juros superam o capital" },
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
        {/* Ativo 1 */}
        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--foreground)' }}>1. Tesouro Selic & IPCA+</span>
            <span className="tabular-numbers" style={{ fontWeight: 800, color: 'var(--track-finance)', fontSize: '0.88rem' }}>10,50% a.a. / IPCA + 6,2%</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', margin: 0 }}>
            Risco soberano com proteção integral contra a inflação e liquidez diária garantida pelo Tesouro Nacional.
          </p>
        </div>

        {/* Ativo 2 */}
        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--foreground)' }}>2. Fundos Imobiliários (FIIs)</span>
            <span className="tabular-numbers" style={{ fontWeight: 800, color: 'var(--gold-deep)', fontSize: '0.88rem' }}>9,80% dividend yield</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', margin: 0 }}>
            Renda passiva mensal com isenção de Imposto de Renda para pessoa física e diversificação imobiliária.
          </p>
        </div>

        {/* Ativo 3 */}
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

      {/* Target Price Header */}
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

      {/* Valuation Financial Grid */}
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

            {/* Coluna Direita: Mockup da Plataforma (Linear / Stripe) */}
            <div className="bfa-split-col--visual">
              <HeroPlatformMockup />
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
