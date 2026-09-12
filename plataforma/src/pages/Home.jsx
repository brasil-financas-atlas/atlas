const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Home Page — BRHSIC Academy Official Learning Platform
   Estética 100% alinhada com brhsic-academy.vercel.app e brhsic-main.vercel.app
   ========================================================================== */
function Home() {
  const BfaIcon = window.BfaIcon || (() => null);

  return (
    <div className="brhsic-home-wrapper">
      {/* ── 1. Hero Academy (Asymmetrical Two-Column) ───────────────────── */}
      <section className="hero-academy" id="inicio">
        <div className="bfa-container">
          <div className="hero-academy-grid">
            
            {/* Coluna Esquerda: Copy & Ações */}
            <div className="hero-academy-copy">
              <div className="hero-eyebrow">
                <BfaIcon name="award" size={14} color="var(--primary)" />
                <span>Plataforma Oficial de Ensino · BRHSIC Academy</span>
              </div>

              <h1 className="hero-academy-title">
                Educação financeira e matemática para quem quer ir além.
              </h1>

              <p className="hero-academy-subtitle">
                A base estruturada do básico ao avançado para dominar matemática financeira, mercado de capitais e se destacar na maior olimpíada de investimentos do país. 100% gratuito e aberto.
              </p>

              <div className="hero-academy-actions">
                <a href="#trilhas" className="button-pill-primary">
                  <span>Começar a Estudar</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a href="https://brhsic.com" target="_blank" rel="noreferrer" className="button-pill-secondary">
                  <span>Competição BRHSIC</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Coluna Direita: Showcase Card Visual */}
            <div className="hero-academy-visual">
              <div className="hero-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      TRILHAS DE FORMAÇÃO 2026
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)', background: 'var(--secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    ACESSO LIVRE
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Item 1 */}
                  <div style={{ padding: '0.85rem 1rem', background: 'var(--secondary)', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--foreground)' }}>
                        01. Matemática Financeira & Modelagem
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>
                        4 Módulos · 29 Aulas Didáticas
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                      100%
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div style={{ padding: '0.85rem 1rem', background: 'var(--secondary)', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--foreground)' }}>
                        02. Mercado de Capitais & Análise
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>
                        3 Módulos · 26 Aulas Práticas
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                      100%
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div style={{ padding: '0.85rem 1rem', background: 'var(--secondary)', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--foreground)' }}>
                        03. Guia da Olimpíada BRHSIC
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>
                        Equity Research · Valuation DCF · Pitch
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)' }}>
                      OFICIAL
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                  <span>Alinhado à Olimpíada Nacional</span>
                  <a href="#/sobre" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                    Ver Metodologia →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Faixa de Métricas (Network Overview Band) */}
          <div className="metrics-band-academy">
            <div className="metrics-band-heading">
              <span>Rede Academy</span>
              <strong>Da base matemática à análise real de mercado.</strong>
            </div>

            <div className="metrics-band-stats">
              <div className="metric-stat-item">
                <span className="metric-stat-number">55</span>
                <span className="metric-stat-label">Aulas didáticas abertas</span>
              </div>
              <div className="metric-stat-item">
                <span className="metric-stat-number">7</span>
                <span className="metric-stat-label">Módulos completos</span>
              </div>
              <div className="metric-stat-item">
                <span className="metric-stat-number">100%</span>
                <span className="metric-stat-label">Gratuito e sem custos</span>
              </div>
              <div className="metric-stat-item">
                <span className="metric-stat-number">+400</span>
                <span className="metric-stat-label">Alunos alcançados</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Ticker de Índices Financeiros ─────────────────────────────── */}
      {window.MarketTickerRibbon && React.createElement(window.MarketTickerRibbon)}

      {/* ── 2. Trilhas de Formação Numeradas (01, 02, 03) ──────────────── */}
      <section className="bfa-container" id="trilhas" style={{ padding: '5rem 1.5rem' }}>
        <div className="academy-section-header">
          <div className="eyebrow">Como funciona · Trilhas de Formação</div>
          <h2>Conhecimento estruturado para quem quer liderar.</h2>
          <p>
            O conteúdo foi desenvolvido para levar o estudante do ensino fundamental ao nível de analistas de mercado, combinando rigor matemático e visão prática de negócios.
          </p>
        </div>

        <div className="academy-steps-grid">
          {/* Card 01: Matemática */}
          <a href="#/matematica" className="academy-step-card">
            <div>
              <div className="academy-step-num">01</div>
              <h3 className="academy-step-title">Matemática Financeira & Modelagem</h3>
              <p className="academy-step-desc">
                Fundamentos algébricos, regimes de juros simples e compostos, séries uniformes, amortização (SAC e Price), inflação e equivalência de taxas de juros.
              </p>
            </div>
            <div className="academy-step-arrow">
              <span>Explorar 29 aulas</span>
              <span aria-hidden="true">→</span>
            </div>
          </a>

          {/* Card 02: Finanças */}
          <a href="#/financas" className="academy-step-card">
            <div>
              <div className="academy-step-num">02</div>
              <h3 className="academy-step-title">Mercado de Capitais & Empresas</h3>
              <p className="academy-step-desc">
                Renda fixa (Tesouro Direto, CDBs), renda variável (Ações da B3, Fundos Imobiliários) e leitura de relatórios contábeis como Balanço Patrimonial e DRE.
              </p>
            </div>
            <div className="academy-step-arrow">
              <span>Explorar 26 aulas</span>
              <span aria-hidden="true">→</span>
            </div>
          </a>

          {/* Card 03: Olimpíada BRHSIC */}
          <a href="#/preparacao-brhsic" className="academy-step-card">
            <div>
              <div className="academy-step-num">03</div>
              <h3 className="academy-step-title">Preparação para a Olimpíada BRHSIC</h3>
              <p className="academy-step-desc">
                Metodologia completa de Equity Research: seleção de companhia, projeção de resultados, valuation por fluxo de caixa descontado (DCF) e pitch perante jurados.
              </p>
            </div>
            <div className="academy-step-arrow">
              <span>Acessar Guia Oficial</span>
              <span aria-hidden="true">→</span>
            </div>
          </a>
        </div>
      </section>

      {/* ── 3. Grade de Recursos e Ferramentas Práticas ───────────────── */}
      <section style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5rem 0' }} id="ferramentas">
        <div className="bfa-container">
          <div className="academy-section-header">
            <div className="eyebrow">Recursos Oficiais</div>
            <h2>Ferramentas para praticar e testar sua tese.</h2>
            <p>
              Além das aulas expositivas, você tem acesso a calculadoras financeiras, bancos de exercícios comentados e simuladores com padrão de olimpíada.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {/* Ferramenta 1 */}
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  // CÁLCULOS & FIXAÇÃO
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.5rem 0' }}>
                  Banco de Exercícios
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0 }}>
                  Listas com gabaritos detalhados passo a passo de juros, inflação e análise contábil.
                </p>
              </div>
              <a href="#/exercicios" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', marginTop: '1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Praticar Exercícios →
              </a>
            </div>

            {/* Ferramenta 2 */}
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  // SIMULAÇÃO VISUAL
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.5rem 0' }}>
                  Calculadora de Juros
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0 }}>
                  Simule aportes mensais, taxas reais e evolução patrimonial ano a ano em gráficos dinâmicos.
                </p>
              </div>
              <a href="#/financas" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', marginTop: '1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Abrir Simulador →
              </a>
            </div>

            {/* Ferramenta 3 */}
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  // TESTES DE OLIMPÍADA
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.5rem 0' }}>
                  Simulados Oficiais
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0 }}>
                  Provas cronometradas no mesmo formato de avaliação das fases classificatórias da BRHSIC.
                </p>
              </div>
              <a href="#/simulados" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', marginTop: '1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Fazer Simulado →
              </a>
            </div>

            {/* Ferramenta 4 */}
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  // RECONHECIMENTO
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.5rem 0' }}>
                  Certificado & Badges
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0 }}>
                  Conquiste medalhas e emita certificados digitais de conclusão conforme conclui os módulos.
                </p>
              </div>
              <a href="#/conquistas" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', marginTop: '1.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Minhas Conquistas →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Seção Missão: Jovens ensinando jovens ──────────────────── */}
      <section className="bfa-container" style={{ padding: '5rem 1.5rem' }} id="quem-somos">
        <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '1.5rem', padding: '3.5rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Rede Nacional · BRHSIC Academy
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 1.25rem 0' }}>
              A educação financeira muda de escala quando os jovens lideram.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', lineHeight: 1.7, margin: '0 0 1.75rem 0' }}>
              A BRHSIC Academy apoia a abertura de <strong>Núcleos de Inteligência Financeira (NIFs)</strong> em escolas de todo o país. Oferecemos a base de conteúdo, suporte e formação para que alunos ensinem outros alunos com autonomia.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://brhsic-academy.vercel.app" target="_blank" rel="noreferrer" className="button-pill-primary">
                <span>Conhecer a Rede de Núcleos</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href="https://wa.me/5551995654746?text=Oi%21%20Quero%20entender%20como%20abrir%20um%20NIF%20com%20a%20BRHSIC%20Academy." target="_blank" rel="noreferrer" className="button-pill-secondary">
                <span>Abrir um NIF na sua Escola</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1rem' }}>
              Impacto em números
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Núcleos Escolares</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)' }}>9 Núcleos Ativos</div>
              </div>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Presença Federativa</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)' }}>5 Estados Conectados</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Modelo Pedagógico</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>100% Gratuito</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Chamada Final (Final CTA) ───────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '4rem 1.5rem 6rem 1.5rem' }}>
        <div className="bfa-container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Sua próxima tese pode começar aqui.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: 1.65, marginBottom: '2rem' }}>
            Acesse as aulas agora mesmo, sem taxas, sem mensalidades e no seu próprio ritmo.
          </p>
          <a href="#trilhas" className="button-pill-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
            <span>Acessar Todas as Aulas</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
