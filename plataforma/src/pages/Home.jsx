const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Home() {
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const stats = [
    { value: "55", label: "Aulas publicadas", note: "Matemática e Finanças" },
    { value: "7", label: "Módulos estruturados", note: "Do zero ao avançado" },
    { value: "100%", label: "Gratuito e aberto", note: "Sem pegadinhas" },
    { value: "BRHSIC", label: "Trilha de competição", note: "Equity research & pitch" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 4rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <span className="badge-market">
              <span className="dot-market" />
              Iniciativa Aberta · NIF · Fortaleza — CE
            </span>

            <EditableBlock id="home-hero-title" as="h1" style={{ fontSize: '3.25rem', fontWeight: 700, lineHeight: 1.08, color: '#FFFFFF', marginTop: '1.5rem', letterSpacing: '-0.03em' }}>
              A infraestrutura pública do <span style={{ color: 'var(--gold)', display: 'block' }}>conhecimento financeiro brasileiro.</span>
            </EditableBlock>

            <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)', marginTop: '1.25rem', maxWidth: '680px' }}>
              Matemática aplicada, mercado de capitais e preparação BRHSIC em um único ambiente de estudo — com simuladores, fórum por timestamp, certificação verificável e conteúdo versionado em Git.
            </EditableBlock>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a href="#/matematica" className="btn-primary">
                Começar a estudar ➔
              </a>
              <a href="#/cronograma" className="btn-secondary">
                Abrir simuladores & cronograma
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', marginTop: '4rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.1)' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(8px)', padding: '1.25rem 1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF' }}>{s.value}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', marginTop: '0.2rem' }}>{s.label}</div>
                <div className="mono-tag" style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.25rem' }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trilhas Principais */}
      <section className="bfa-container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>Currículo Oficial</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.25rem' }}>Trilhas e Módulos Ativos</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="mono-tag" style={{ padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--track-math)' }}>
              Matemática · 4 Módulos (29 aulas)
            </span>
            <span className="mono-tag" style={{ padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--track-finance)' }}>
              Finanças · 3 Módulos (26 aulas)
            </span>
          </div>
        </div>

        {/* Module Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1: Matemática */}
          <article className="module-card card-lift" style={{ borderTop: '4px solid var(--track-math)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                MATEMÁTICA APLICADA
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>29 aulas</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '1rem', color: 'var(--foreground)' }}>
              Matemática Aplicada a Finanças
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              A base essencial para não travar em juros, porcentagem e inflação. Do zero absoluto até probabilidade, estatística e regressão linear.
            </p>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <a href="#/matematica" className="btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--track-math)' }}>
                Entrar na Trilha de Matemática ➔
              </a>
            </div>
          </article>

          {/* Card 2: Finanças */}
          <article className="module-card card-lift" style={{ borderTop: '4px solid var(--track-finance)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                FINANÇAS & MERCADO
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>26 aulas</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '1rem', color: 'var(--foreground)' }}>
              Finanças & Investimentos
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Do funcionamento do mercado financeiro até análise fundamentalista de empresas, múltiplos de valuation e Fluxo de Caixa Descontado (DCF).
            </p>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <a href="#/financas" className="btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--track-finance)' }}>
                Entrar na Trilha de Finanças ➔
              </a>
            </div>
          </article>

          {/* Card 3: BRHSIC */}
          <article className="module-card card-lift" style={{ borderTop: '4px solid var(--track-brhsic)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                COMPETIÇÃO BRHSIC
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>Guia Especial</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '1rem', color: 'var(--foreground)' }}>
              Preparação BRHSIC
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Trilha de alta performance com orientações para elaboração de relatórios de Equity Research, valuation rigoroso e pitch de defesa.
            </p>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <a href="#/preparacao-brhsic" className="btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--gold-deep)' }}>
                Acessar Guia BRHSIC ➔
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Ferramentas do Laboratório */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)', padding: '4rem 0' }}>
        <div className="bfa-container">
          <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>Instrumentos de Laboratório</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem', marginBottom: '2rem' }}>Ferramentas Interativas</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div className="tool-card">
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>📈</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Simulador de Juros</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem' }}>
                Sliders de aporte, taxa e tempo com comparação imediata entre Juros Compostos e Simples.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                Abrir Simulador ➔
              </a>
            </div>

            <div className="tool-card">
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>🗓️</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Cronograma Inteligente</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem' }}>
                Planejador que calcula metas diárias de aulas até a data do seu exame ou competição.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                Gerar Meta ➔
              </a>
            </div>

            <div className="tool-card">
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>🎓</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Certificado Digital</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem' }}>
                Emissão de certificado de conclusão com QR Code vetorial e hash SHA de verificação única.
              </p>
              <a href="#/exercicios" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                Verificar Emissão ➔
              </a>
            </div>

            <div className="tool-card">
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>⚡</span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Git-as-a-CMS</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem' }}>
                Edição in-context do professor gravada diretamente no GitHub via REST API.
              </p>
              <a href="#/admin/login" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                Área do Professor ➔
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
