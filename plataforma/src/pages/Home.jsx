const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Home() {
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  const stats = [
    { value: "55", label: "Aulas publicadas", note: "Matemática & Finanças", icon: "📚", color: "var(--track-finance)" },
    { value: "7", label: "Módulos de elite", note: "Do zero ao avançado", icon: "🚀", color: "var(--gold)" },
    { value: "100%", label: "Gratuito & Aberto", note: "Sem mensalidade", icon: "🛡️", color: "var(--track-math)" },
    { value: "BRHSIC", label: "Equity Research", note: "Competição oficial", icon: "🏆", color: "var(--gold-deep)" },
  ];

  return (
    <div>
      {/* Hero Section UI/UX Pro Max */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1.25rem' }}>
              <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981', display: 'inline-block' }} />
              <span className="mono-tag" style={{ color: '#A7F3D0', fontWeight: 700, fontSize: '0.72rem' }}>
                Plataforma Aberta · NIF · EEMTI Dragão do Mar — CE
              </span>
            </div>

            <EditableBlock id="home-hero-title" as="h1" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.06, color: '#FFFFFF', letterSpacing: '-0.035em' }}>
              A infraestrutura pública do <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>conhecimento financeiro brasileiro.</span>
            </EditableBlock>

            <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.18rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.85)', marginTop: '1.35rem', maxWidth: '720px' }}>
              Matemática aplicada, mercado de capitais e preparação BRHSIC em um único ecossistema educacional de alta precisão — com simuladores de juros, fórum interativo, certificação com SHA e conteúdo versionado em Git.
            </EditableBlock>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.25rem' }}>
              <a href="#/matematica" className="btn-primary" style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', color: '#FFFFFF', boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)' }}>
                Explorar Trilha de Matemática ➔
              </a>
              <a href="#/financas" className="btn-primary" style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                Ir para Finanças & Investimentos
              </a>
            </div>
          </div>

          {/* Stats Bar UI/UX Pro Max */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '4.5rem' }}>
            {stats.map((s) => (
              <div key={s.label} className="bfa-stat-spotlight">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  <span className="mono-tag" style={{ color: s.color, fontWeight: 700, fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    {s.note}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(241, 245, 249, 0.85)', marginTop: '0.2rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trilhas Principais Bento Grid */}
      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--track-finance)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              ✦ Curriculum Didático
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.025em' }}>Trilhas de Aprendizagem</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="mono-tag" style={{ padding: '0.4rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--track-math)', fontWeight: 700 }}>
              Matemática · 4 Módulos (29 aulas)
            </span>
            <span className="mono-tag" style={{ padding: '0.4rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--track-finance)', fontWeight: 700 }}>
              Finanças · 3 Módulos (26 aulas)
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.75rem' }}>
          {/* Card 1: Matemática */}
          <article className="bfa-bento-card" style={{ borderTop: '4px solid var(--track-math)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.1)', padding: '0.3rem 0.65rem', borderRadius: '6px', fontWeight: 700 }}>
                📊 TRILHA 01 · MATEMÁTICA
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>29 Aulas</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Matemática Aplicada a Finanças
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted-foreground)', marginTop: '0.65rem', lineHeight: 1.65 }}>
              A base rigorosa para não travar em juros, porcentagem e inflação. Do zero absoluto até conceitos avançados de probabilidade, estatística e regressão linear.
            </p>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Exercícios & Simuladores</span>
              <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.6rem 1.1rem', borderRadius: 'var(--radius-md)' }}>
                Acessar Trilha ➔
              </a>
            </div>
          </article>

          {/* Card 2: Finanças */}
          <article className="bfa-bento-card" style={{ borderTop: '4px solid var(--track-finance)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.1)', padding: '0.3rem 0.65rem', borderRadius: '6px', fontWeight: 700 }}>
                💡 TRILHA 02 · FINANÇAS
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>26 Aulas</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Finanças & Investimentos
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted-foreground)', marginTop: '0.65rem', lineHeight: 1.65 }}>
              Do funcionamento prático do mercado financeiro brasileiro até análise fundamentalista de empresas, múltiplos de valuation e Fluxo de Caixa Descontado (DCF).
            </p>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Valuation & Demonstrações</span>
              <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.6rem 1.1rem', borderRadius: 'var(--radius-md)' }}>
                Acessar Trilha ➔
              </a>
            </div>
          </article>

          {/* Card 3: BRHSIC */}
          <article className="bfa-bento-card" style={{ borderTop: '4px solid var(--track-brhsic)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'rgba(217, 119, 6, 0.1)', padding: '0.3rem 0.65rem', borderRadius: '6px', fontWeight: 700 }}>
                🏆 COMPETAÇÃO · BRHSIC
              </span>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>Guia Avançado</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '1.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
              Preparação BRHSIC
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--muted-foreground)', marginTop: '0.65rem', lineHeight: 1.65 }}>
              Trilha de alta performance com orientações passo a passo para elaboração de relatórios de Equity Research, tese de investimento e pitch de defesa.
            </p>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Equity Research & Pitch</span>
              <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.6rem 1.1rem', borderRadius: 'var(--radius-md)' }}>
                Ver Guia BRHSIC ➔
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Ferramentas do Laboratório */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)', padding: '4.5rem 0' }}>
        <div className="bfa-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
            ⚡ Recursos Práticos
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '2.5rem', letterSpacing: '-0.025em' }}>
            Laboratório Interativo
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="tool-card bfa-bento-card">
              <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>📈</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Simulador de Juros</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Sliders de aporte, taxa e tempo com comparação imediata entre Juros Compostos e Simples.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Abrir Simulador ➔
              </a>
            </div>

            <div className="tool-card bfa-bento-card">
              <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>🗓️</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Cronograma Inteligente</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Planejador dinâmico que calcula metas diárias de aulas até a data do seu exame ou competição.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Gerar Minha Meta ➔
              </a>
            </div>

            <div className="tool-card bfa-bento-card">
              <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>🎓</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Certificado Digital</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Emissão de certificado de conclusão com QR Code vetorial e verificação pública.
              </p>
              <a href="#/exercicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--track-finance)' }}>
                Validar Emissão ➔
              </a>
            </div>

            <div className="tool-card bfa-bento-card">
              <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>⚡</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Conteúdo Dinâmico</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', marginTop: '0.4rem', lineHeight: 1.55 }}>
                Edição in-context do professor gravada em tempo real com segurança Supabase.
              </p>
              <a href="#/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1.25rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
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
