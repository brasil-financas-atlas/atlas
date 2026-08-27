const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

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
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 4.5rem 0' }}>
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

            <EditableBlock id="home-hero-title" as="h1" className="editorial-headline" style={{ fontSize: '3.6rem', fontWeight: 600, lineHeight: 1.1, color: '#FFFFFF', letterSpacing: '-0.025em' }}>
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

      {/* Trilhas Principais */}
      <section className="bfa-container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
              GRADE CURRICULAR
            </span>
            <h2 className="editorial-headline" style={{ fontSize: '2.4rem', fontWeight: 600, color: 'var(--foreground)', letterSpacing: '-0.025em' }}>Trilhas de Aprendizagem</h2>
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

        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {/* Card 1: Matemática */}
          <article className="bfa-bento-card" style={{ borderTop: '4px solid var(--track-math)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 700 }}>
                TRILHA 01 · MATEMÁTICA
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>29 Aulas</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Matemática Aplicada a Finanças
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginTop: '0.65rem', lineHeight: 1.6 }}>
              Fundamentos de álgebra, juros, porcentagem, taxas de inflação, estatística descritiva e análise quantitativa.
            </p>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Aulas & Exercícios</span>
              <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.55rem 1.15rem', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
                Acessar Trilha →
              </a>
            </div>
          </article>

          {/* Card 2: Finanças */}
          <article className="bfa-bento-card" style={{ borderTop: '4px solid var(--track-finance)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 700 }}>
                TRILHA 02 · FINANÇAS
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>26 Aulas</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Finanças & Investimentos
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginTop: '0.65rem', lineHeight: 1.6 }}>
              Estrutura do mercado financeiro brasileiro, renda fixa, renda variável, análise de demonstrações financeiras e valuation.
            </p>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Valuation & Mercado</span>
              <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.55rem 1.15rem', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
                Acessar Trilha →
              </a>
            </div>
          </article>

          {/* Card 3: BRHSIC */}
          <article className="bfa-bento-card" style={{ borderTop: '4px solid var(--track-brhsic)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'rgba(217, 119, 6, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 700 }}>
                COMPETIÇÃO · BRHSIC
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>Guia de Estudos</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Preparação BRHSIC
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginTop: '0.65rem', lineHeight: 1.6 }}>
              Orientações para estruturação de relatórios de Equity Research, análise de empresas e apresentação de tese de investimento.
            </p>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Equity Research</span>
              <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.55rem 1.15rem', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
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
          <h2 className="editorial-headline" style={{ fontSize: '2.4rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '2.5rem', letterSpacing: '-0.025em' }}>
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
