const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Home Page — BRHSIC Academy Official Learning Platform
   Estética 100% alinhada com brhsic-academy.vercel.app e brhsic-main.vercel.app
   ========================================================================== */
function Home() {
  const BfaIcon = window.BfaIcon || (() => null);

  return (
    <div className="site-wrapper">
      
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="hero" id="inicio">
        <div className="hero__container">
          <div className="hero__content">
            <div className="eyebrow">PLATAFORMA EDUCACIONAL OFICIAL</div>
            <h1 className="hero__title">
              Educação financeira e matemática para quem quer ir além.
            </h1>
            <p className="hero__subtitle">
              A base estruturada do básico ao avançado para dominar matemática financeira, mercado de capitais e se destacar na olimpíada nacional de investimentos. Tudo gratuito e aberto.
            </p>
            <div className="hero__actions">
              <a href="#trilhas" className="btn-primary">
                Começar a Estudar →
              </a>
              <a href="https://brhsic.com" target="_blank" rel="noreferrer" className="btn-secondary">
                Conhecer a Competição ↗
              </a>
            </div>
          </div>
          
          <div className="hero__visual">
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#FFFFFF', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700 }}>ACADEMY 2026</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>ACESSO LIVRE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>01. Matemática Financeira</strong>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>4 Módulos · 29 Aulas</span>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>02. Mercado de Capitais</strong>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>3 Módulos · 26 Aulas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats Section ─────────────────────────────────────────────── */}
      <section className="stats-section">
        <div className="stats__container">
          <div className="stat-item">
            <span className="stat-value">55</span>
            <span className="stat-label">Aulas completas</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">7</span>
            <span className="stat-label">Módulos de formação</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100%</span>
            <span className="stat-label">Gratuito e livre</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">+400</span>
            <span className="stat-label">Alunos alcançados</span>
          </div>
        </div>
      </section>

      {/* ── 3. Process Section ───────────────────────────────────────────── */}
      <section className="process-section" id="trilhas" style={{ backgroundColor: 'var(--bg-surface-blue)' }}>
        <div className="process__container">
          <div className="process__header">
            <div className="eyebrow">COMO FUNCIONA · TRILHAS ACADEMY</div>
            <h2 className="process__title">A base estruturada para dominar o mercado.</h2>
          </div>

          <div className="process__grid">
            
            <a href="#/matematica" style={{ textDecoration: 'none', color: 'inherit' }} className="module-card">
              <div className="step-number">01</div>
              <h3>Matemática Financeira & Modelagem</h3>
              <p>Juros compostos, séries uniformes, amortização (SAC/Price), inflação e taxa real. A fundação quantitativa essencial.</p>
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                Explorar aulas <span aria-hidden="true">→</span>
              </div>
            </a>

            <a href="#/financas" style={{ textDecoration: 'none', color: 'inherit' }} className="module-card">
              <div className="step-number">02</div>
              <h3>Finanças Corporativas & Mercado</h3>
              <p>Renda fixa (Tesouro, CDBs), renda variável (Ações B3, FIIs) e análise contábil. Entenda como empresas funcionam por dentro.</p>
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                Explorar aulas <span aria-hidden="true">→</span>
              </div>
            </a>

            <a href="#/preparacao-brhsic" style={{ textDecoration: 'none', color: 'inherit' }} className="module-card">
              <div className="step-number">03</div>
              <h3>Preparação Oficial BRHSIC</h3>
              <p>O guia definitivo de estudos para as provas da Olimpíada Nacional de Investimentos. Valuation, Equity Research e Pitch.</p>
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                Acessar guia <span aria-hidden="true">→</span>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ── 4. Ferramentas Práticas ──────────────────────────────────────── */}
      <section className="process-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="process__container">
          <div className="process__header">
            <div className="eyebrow">RECURSOS PRÁTICOS</div>
            <h2 className="process__title">Tudo o que você precisa em um só lugar.</h2>
          </div>

          <div className="process__grid">
            <div className="module-card" style={{ backgroundColor: 'var(--bg-app)' }}>
              <div className="step-number">CÁLCULOS</div>
              <h3>Simulador de Juros & Carteira</h3>
              <p>Ferramentas interativas para testar aportes, rentabilidade e juros compostos em tempo real.</p>
            </div>
            <div className="module-card" style={{ backgroundColor: 'var(--bg-app)' }}>
              <div className="step-number">FIXAÇÃO</div>
              <h3>Caderno de Exercícios</h3>
              <p>Centenas de exercícios matemáticos e financeiros com gabaritos completos passo a passo.</p>
            </div>
            <div className="module-card" style={{ backgroundColor: 'var(--bg-app)' }}>
              <div className="step-number">RECONHECIMENTO</div>
              <h3>Certificação Digital</h3>
              <p>Crie sua conta, acompanhe seu progresso aula a aula e emita seu certificado de conclusão automaticamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ─────────────────────────────────────────────────── */}
      <section className="hero" style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>ACESSO LIVRE E GRATUITO</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', margin: '1.5rem 0', letterSpacing: '-0.02em' }}>Sua próxima tese começa aqui.</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <a href="#trilhas" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Acessar Plataforma Agora
          </a>
        </div>
      </section>

    </div>
  );
}

window.Home = Home;




