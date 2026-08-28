const { useState, useEffect, useContext, createContext, useMemo } = React;

/**
 * Variação 4: O Atlas Editorial Soberano (Financial Times / Stripe Press / McKinsey)
 * Foco: Layout monumental centrado, alta dignidade tipográfica, whitespace refinado e 3 pilares em malha arquitetônica de 1px.
 */
function HomeV4() {
  const pillars = [
    {
      num: "01",
      tag: "MATEMÁTICA QUANTITATIVA",
      title: "Modelagem Algébrica & Juros Reais",
      desc: "29 Aulas cobrindo álgebra, progressões, juros compostos contínuos, capitalização exponencial e sistemas SAC e Price.",
      link: "#/matematica",
      btnText: "Explorar Matemática →",
      accent: "var(--track-math)",
      bg: "rgba(37, 99, 235, 0.08)"
    },
    {
      num: "02",
      tag: "FINANÇAS & MERCADO",
      title: "Arquitetura do Sistema Financeiro",
      desc: "26 Aulas dissecando títulos do Tesouro Direto, fundos imobiliários isentos de I.R., contabilidade empresarial e valuation.",
      link: "#/financas",
      btnText: "Explorar Finanças →",
      accent: "var(--track-finance)",
      bg: "rgba(5, 150, 105, 0.08)"
    },
    {
      num: "03",
      tag: "PREPARAÇÃO OLÍMPICA",
      title: "Guia de Equity Research BRHSIC",
      desc: "Metodologia completa de análise fundamentalista, projeção DCF de fluxo de caixa, cálculo de WACC e pitch para bancas.",
      link: "#/preparacao-brhsic",
      btnText: "Ver Guia BRHSIC →",
      accent: "var(--gold-deep)",
      bg: "rgba(217, 119, 6, 0.08)"
    }
  ];

  return (
    <div>
      {/* ── Hero Monumental Centrado (Editorial Stripe Press) ─────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0 5.5rem 0', textAlign: 'center' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="mono-tag" style={{ color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.25)', fontWeight: 800 }}>
              VARIAÇÃO 04 · EDITORIAL STRIKE PRESS
            </span>
            <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 800 }}>
              100% Gratuito & Aberto
            </span>
          </div>

          <h1 className="headline-punch" style={{ fontSize: '3.75rem', fontWeight: 800, lineHeight: 1.1, color: '#FFFFFF', letterSpacing: '-0.035em', marginBottom: '1.25rem' }}>
            O rigor da matemática financeira. O poder do mercado de capitais.
          </h1>

          <p style={{ fontSize: '1.25rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', maxWidth: '750px', margin: '0 auto 2.25rem auto' }}>
            Uma plataforma de referência nacional com 55 aulas estruturadas, simuladores e guia oficial de Equity Research para o ensino médio e olimpíadas.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/matematica" className="bfa-btn bfa-btn--verde" style={{ padding: '0.95rem 1.85rem', fontSize: '1rem', fontWeight: 700, minHeight: '48px', display: 'inline-flex', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.4)' }}>
              Começar Trilha de Matemática →
            </a>
            <a href="#/financas" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.95rem 1.85rem', fontSize: '1rem', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.35)', minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}>
              Ver Trilha de Finanças
            </a>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div>
              <div className="tabular-numbers" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>55</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(241, 245, 249, 0.75)', fontWeight: 600 }}>Aulas Publicadas</div>
            </div>
            <div>
              <div className="tabular-numbers" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>07</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(241, 245, 249, 0.75)', fontWeight: 600 }}>Módulos Progressivos</div>
            </div>
            <div>
              <div className="tabular-numbers" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34D399' }}>R$ 0</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(241, 245, 249, 0.75)', fontWeight: 600 }}>Acesso 100% Livre</div>
            </div>
            <div>
              <div className="tabular-numbers" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FBBF24' }}>BRHSIC</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(241, 245, 249, 0.75)', fontWeight: 600 }}>Guia de Preparação</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Os 3 Pilares em Grade Arquitetônica de 1px ────────────────────── */}
      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {pillars.map((p) => (
            <article key={p.num} className="bfa-tech-card" style={{ borderTop: `4px solid ${p.accent}`, padding: '2.25rem 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="mono-tag" style={{ color: p.accent, background: p.bg, padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                  {p.tag}
                </span>
                <span className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--muted-foreground)' }}>
                  {p.num}
                </span>
              </div>

              <h3 className="headline-punch" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'var(--muted-foreground)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {p.desc}
              </p>

              <a href={p.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: p.accent }}>
                {p.btnText}
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

window.HomeV4 = HomeV4;
