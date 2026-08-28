const { useState, useEffect } = React;

/**
 * Galeria de Variações de Design do Brasil Finanças Atlas
 * Permite visualizar e comparar as 4 abordagens estéticas criadas.
 */
function VariationsGallery() {
  const variations = [
    {
      id: "v1-terminal",
      route: "#/v1",
      name: "Variação 01: O Terminal Macroeconômico",
      insp: "Koyfin / Bloomberg Modern",
      desc: "Hero Split 50/50 com painel interativo de transmissão monetária, juro real pela Equação de Fisher e simulação com Tesouro Selic, IPCA+, CDI e FIIs.",
      badge: "Telemetria & Dados Soberanos",
      color: "#10B981",
      bg: "rgba(16, 185, 129, 0.1)"
    },
    {
      id: "v2-edtech-notebook",
      route: "#/v2",
      name: "Variação 02: O Caderno Interativo",
      insp: "Brilliant.org / Khan Academy Pro",
      desc: "Hero Split 50/50 com dissecação tátil de fórmulas KaTeX (Juros Compostos, Euler e Fisher) e explicações intuitivas passo a passo.",
      badge: "Pedagogia Visual & Intuição",
      color: "#3B82F6",
      bg: "rgba(59, 130, 246, 0.1)"
    },
    {
      id: "v3-equity-research",
      route: "#/v3",
      name: "Variação 03: Hub de Equity Research",
      insp: "Wall Street / Goldman Sachs / BRHSIC",
      desc: "Hero Split 50/50 com One-Page Memo Institucional de Valuation DCF (Análise de WEGE3/ITUB4, Preço-Alvo, WACC, ROIC e Moat).",
      badge: "Competição & Finanças Corporativas",
      color: "#F59E0B",
      bg: "rgba(245, 158, 11, 0.1)"
    },
    {
      id: "v4-editorial",
      route: "#/v4",
      name: "Variação 04: O Atlas Editorial",
      insp: "Financial Times / Stripe Press",
      desc: "Layout centrado monumental, tipografia de grande porte, whitespace nobre e 3 pilares em malha arquitetônica de 1px.",
      badge: "Autoridade Institucional & Tipografia",
      color: "#8B5CF6",
      bg: "rgba(139, 92, 246, 0.1)"
    }
  ];

  return (
    <div style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="bfa-container">
        
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem auto' }}>
          <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.1)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
            LABORATÓRIO DE DESIGN · BFA
          </span>
          <h1 className="headline-punch" style={{ fontSize: '3.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.035em', marginTop: '0.75rem' }}>
            Galeria de Variações da Página Inicial
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted-foreground)', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Criamos 4 abordagens visuais completamente distintas e autênticas ao escopo pedagógico e financeiro do Atlas. Escolha a sua favorita para definirmos como página principal!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {variations.map((v) => (
            <article key={v.id} className="bfa-tech-card" style={{ borderTop: `4px solid ${v.color}`, padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="mono-tag" style={{ color: v.color, background: v.bg, padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                    {v.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>
                    {v.insp}
                  </span>
                </div>

                <h3 className="headline-punch" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                  {v.name}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--muted-foreground)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {v.desc}
                </p>
              </div>

              <a
                href={v.route}
                className="bfa-btn"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  background: v.color,
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: `0 8px 20px -4px ${v.color}66`
                }}
              >
                Visualizar Variação →
              </a>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}

window.VariationsGallery = VariationsGallery;
