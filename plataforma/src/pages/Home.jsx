const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Home Page Component (Direto, Amplo, Rico e Detalhado)
   ========================================================================== */
function Home() {
  const stats = [
    { value: "55", label: "Aulas Publicadas", note: "Conteúdo completo e aberto" },
    { value: "7", label: "Módulos de Estudo", note: "Sequência do básico ao avançado" },
    { value: "100%", label: "Gratuito e Público", note: "Livre para alunos e escolas" },
    { value: "BRHSIC", label: "Olimpíada de Finanças", note: "Guia oficial de preparação" },
  ];

  return (
    <div>
      {/* ── 1. Hero Centralizado e Direto ───────────────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 5rem 0', textAlign: 'center' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1, maxWidth: '920px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="mono-tag" style={{ color: '#E2E8F0', background: 'rgba(255, 255, 255, 0.08)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.15)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.04em' }}>
              PLATAFORMA PÚBLICA · CONTEÚDO 100% GRATUITO
            </span>
          </div>

          <EditableBlock id="home-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.12, color: '#FFFFFF', letterSpacing: '-0.035em', margin: '0 auto 1.25rem auto' }}>
            Matemática financeira e mercado de capitais para o ensino médio.
          </EditableBlock>

          <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.18rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.85)', maxWidth: '760px', margin: '0 auto 2.25rem auto', fontWeight: 400 }}>
            Aulas estruturadas do básico ao avançado, listas de exercícios com gabarito passo a passo e o guia oficial de preparação para a olimpíada nacional de investimentos (BRHSIC).
          </EditableBlock>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a href="#/matematica" className="bfa-btn bfa-btn--primary-solid" style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem', minHeight: '46px' }}>
              Trilha de Matemática →
            </a>
            <a href="#/financas" className="bfa-btn bfa-btn--secondary-glass" style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem', minHeight: '46px' }}>
              Trilha de Finanças →
            </a>
            <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--secondary-glass" style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem', minHeight: '46px' }}>
              Guia da Olimpíada BRHSIC →
            </a>
          </div>

          {/* Barra de Métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: 'rgba(9, 13, 22, 0.85)', padding: '1.25rem 1rem', textAlign: 'center' }}>
                <div className="tabular-numbers" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0', marginTop: '0.2rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>{s.note}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Ticker de Índices Financeiros no Hero ─────────────────────── */}
      {window.MarketTickerRibbon && React.createElement(window.MarketTickerRibbon)}

      {/* ── 2. Trilhas de Estudo com Caixas Amplas e Detalhadas ─────────── */}
      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem' }}>
        
        {/* Trilha 1: Matemática */}
        <div className="bfa-split-row" style={{ alignItems: 'flex-start' }}>
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 01 · MATEMÁTICA FINANCEIRA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Matemática Financeira e Modelagem
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              Uma formação sólida em matemática aplicada às finanças pessoais e corporativas. O aluno aprende a construir o raciocínio desde a álgebra fundamental até o cálculo de financiamentos e análise de rentabilidade real com inflação.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--foreground)' }}>
              <li><strong>— 29 aulas didáticas:</strong> organizadas em ordem lógica de complexidade.</li>
              <li><strong>— Provas e deduções:</strong> explicação do porquê de cada fórmula matemática.</li>
              <li><strong>— Exercícios práticos:</strong> questões com gabarito analítico detalhado.</li>
              <li><strong>— Aplicação real:</strong> simulações de empréstimos, investimentos e inflação.</li>
            </ul>
            <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.85rem 1.6rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Acessar Aulas de Matemática →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '2rem 2.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.78rem' }}>EMENTA DETALHADA</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>4 Módulos · 29 Aulas</span>
              </div>
              <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.88rem' }}>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 1: Fundamentos de Álgebra e Porcentagem (7 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Variação percentual, aumentos e descontos sucessivos, potências e equações.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 2: Juros Simples, Compostos e Descontos (8 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Regimes de capitalização, valor presente (VP), valor futuro (VF) e desconto comercial vs. racional.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 3: Inflação, Taxa Real e Equivalência (7 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Equação de Fisher, IPCA, taxas proporcionais vs. taxas equivalentes compostas.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 4: Amortização (SAC, Price) e Séries Uniformes (7 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Tabelas SAC e Price na prática, cálculo de parcelas, juros e saldo devedor.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trilha 2: Finanças */}
        <div className="bfa-split-row" style={{ alignItems: 'flex-start' }}>
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 02 · FINANÇAS & MERCADO DE CAPITAIS
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Mercado de Capitais e Análise de Empresas
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              Um curso prático sobre como funciona o dinheiro e as empresas no Brasil. Aborda desde a estrutura regulatória do Sistema Financeiro Nacional até os critérios para analisar ações, fundos imobiliários e títulos de renda fixa.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--foreground)' }}>
              <li><strong>— 26 aulas práticas:</strong> focadas no mercado financeiro brasileiro real.</li>
              <li><strong>— Renda Fixa e Títulos Públicos:</strong> Selic, IPCA+ e títulos bancários privados.</li>
              <li><strong>— Renda Variável e Imobiliária:</strong> ações na B3 e fundos imobiliários isentos de I.R.</li>
              <li><strong>— Leitura contábil:</strong> entenda DRE, Balanço e os principais indicadores financeiros.</li>
            </ul>
            <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.85rem 1.6rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Acessar Aulas de Finanças →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '2rem 2.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800, fontSize: '0.78rem' }}>EMENTA DETALHADA</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>3 Módulos · 26 Aulas</span>
              </div>
              <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.88rem' }}>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 1: Sistema Financeiro e Renda Fixa (9 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Banco Central, CVM, Tesouro Selic, IPCA+, CDBs, LCIs/LCAs e tabela de I.R. regressivo.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 2: Mercado de Ações e Fundos Imobiliários (8 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Bolsa de Valores (B3), funcionamento das ações, dividendos, FIIs de tijolo e papel e diversificação.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>Módulo 3: Contabilidade e Indicadores de Empresas (9 aulas)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Leitura de DRE, Balanço Patrimonial, Fluxo de Caixa e múltiplos (P/L, EV/EBITDA, ROIC, Margens).</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trilha 3: BRHSIC com Explicação Completa da Competição */}
        <div className="bfa-split-row" style={{ borderBottom: 'none', alignItems: 'flex-start' }}>
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'rgba(217, 119, 6, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              OLIMPÍADA NACIONAL · BRHSIC
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Guia Completo de Preparação para a BRHSIC
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              A <strong>BRHSIC (Brazil High School Investment Competition)</strong> é a principal competição de investimentos do país para estudantes do ensino médio. As equipes atuam como analistas de mercado, estudando uma empresa real da Bolsa (B3), calculando seu valor justo e defendendo sua recomendação diante de profissionais do mercado financeiro.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--foreground)' }}>
              <li><strong>— O que é a competição:</strong> disputa em equipes de 3 a 5 alunos de escolas públicas e privadas de todo o Brasil.</li>
              <li><strong>— O que os alunos produzem:</strong> um relatório formal de análise de ações (Equity Research) com recomendação de compra ou venda.</li>
              <li><strong>— Apresentação para banca:</strong> as melhores equipes defendem sua tese ao vivo em um pitch executivo para analistas e gestores de fundos.</li>
              <li><strong>— Nosso material de apoio:</strong> o BFA fornece o passo a passo completo, do entendimento do negócio até o cálculo de valuation por DCF.</li>
            </ul>
            <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.85rem 1.6rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Acessar Guia Completo da BRHSIC →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '2rem 2.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                <span className="mono-tag" style={{ color: 'var(--track-brhsic)', fontWeight: 800, fontSize: '0.78rem' }}>ETAPAS DA PREPARAÇÃO</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>Roteiro Oficial BFA</span>
              </div>
              <div style={{ display: 'grid', gap: '0.85rem', fontSize: '0.88rem' }}>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>1. Escolha da Empresa e Análise do Negócio</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Como entender o modelo de receita, os concorrentes e as vantagens competitivas (Moat) da companhia na B3.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>2. Modelagem Financeira e Valuation (DCF)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Projeção simples de receitas, custos, custo de capital (WACC) e determinação do preço-alvo justo da ação.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>3. Estruturação do Relatório Escrito (Equity Research)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Padrão profissional de sumário executivo, riscos da tese, governança corporativa e recomendação final.</div>
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.2rem' }}>4. Defesa Verbal e Apresentação para a Banca (Pitch)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>Roteiro de apresentação em 5 a 10 minutos, postura e preparação para responder às perguntas dos jurados.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── 3. Grade Técnica de Ferramentas do Laboratório ───────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)', padding: '4.5rem 0' }}>
        <div className="bfa-container">
          <div style={{ marginBottom: '2.25rem' }}>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
              FERRAMENTAS
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Recursos Práticos da Plataforma
            </h2>
          </div>

          <div className="bfa-grid-tools-4">
            <div className="tool-card bfa-bento-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--track-math)', marginBottom: '0.5rem' }}>
                01 // FIXAÇÃO
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Banco de Exercícios</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Listas de fixação, cálculos passo a passo e resolução de casos reais comentados.
              </p>
              <a href="#/exercicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Ver Exercícios →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--track-finance)', marginBottom: '0.5rem' }}>
                02 // OLIMPÍADA
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Preparação BRHSIC</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Metodologia completa de Equity Research, valuation por fluxo de caixa e pitch.
              </p>
              <a href="#/preparacao-brhsic" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--track-finance)' }}>
                Acessar Guia →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--gold-deep)', marginBottom: '0.5rem' }}>
                03 // CONQUISTAS
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Badges & Conquistas</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Acompanhe o desbloqueio de medalhas conforme avança pelas 55 aulas publicadas.
              </p>
              <a href="#/conquistas" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
                Ver Conquistas →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                04 // INSTITUCIONAL
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>Sobre o Projeto BFA</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Conheça os princípios de excelência, rigor matemático e gratuidade da plataforma.
              </p>
              <a href="#/sobre" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)' }}>
                Conhecer o BFA →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
