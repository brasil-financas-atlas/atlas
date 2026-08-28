const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   Home Page Component (Direto, Neutro, Sério e sem vocabulário rebuscado)
   ========================================================================== */
function Home() {
  const stats = [
    { value: "55", label: "Aulas Publicadas", note: "Conteúdo completo" },
    { value: "7", label: "Módulos de Estudo", note: "Sequência organizada" },
    { value: "100%", label: "Gratuito e Aberto", note: "Sem cadastro pago" },
    { value: "BRHSIC", label: "Guia de Preparação", note: "Olimpíada de Finanças" },
  ];

  return (
    <div>
      {/* ── 1. Hero Centralizado, Direto e Neutro ────────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0', textAlign: 'center' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
        
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="mono-tag" style={{ color: '#E2E8F0', background: 'rgba(255, 255, 255, 0.08)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255, 255, 255, 0.15)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.04em' }}>
              PLATAFORMA PÚBLICA · CONTEÚDO 100% GRATUITO
            </span>
          </div>

          <EditableBlock id="home-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', letterSpacing: '-0.035em', margin: '0 auto 1rem auto' }}>
            Matemática financeira e mercado de capitais para o ensino médio.
          </EditableBlock>

          <EditableBlock id="home-hero-sub" as="p" style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.85)', maxWidth: '740px', margin: '0 auto 2rem auto', fontWeight: 400 }}>
            Aulas estruturadas do básico ao avançado, listas de exercícios com gabarito comentado e guia prático de análise de empresas e investimentos para estudantes e professores.
          </EditableBlock>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href="#/matematica" className="bfa-btn bfa-btn--verde" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', minHeight: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              Trilha de Matemática →
            </a>
            <a href="#/financas" className="bfa-btn bfa-btn--ghost" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#FFFFFF', minHeight: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              Trilha de Finanças →
            </a>
          </div>

          {/* Barra de Números */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: 'rgba(9, 13, 22, 0.85)', padding: '1.25rem 1rem', textAlign: 'center' }}>
                <div className="tabular-numbers" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#E2E8F0', marginTop: '0.2rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>{s.note}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. As 3 Trilhas de Estudo em Blocos 50/50 Claros e Diretos ─────── */}
      <section className="bfa-container" style={{ padding: '4rem 1.5rem' }}>
        
        {/* Trilha 1: Matemática */}
        <div className="bfa-split-row">
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 01 · MATEMÁTICA
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Matemática Financeira e Modelagem
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Conteúdo completo organizado do início: porcentagem, juros simples e compostos, taxas proporcionais e equivalentes, inflação, sistemas de amortização (SAC e Price) e progressões aplicadas.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>— 29 aulas</strong> divididas em 4 módulos sequenciais</li>
              <li><strong>— Demonstrações diretas</strong> de cada fórmula utilizada</li>
              <li><strong>— Listas de fixação</strong> com respostas passo a passo</li>
            </ul>
            <a href="#/matematica" className="bfa-btn bfa-btn--azul" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Ver Aulas de Matemática →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800 }}>GRADE DO CURSO</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>4 Módulos · 29 Aulas</span>
              </div>
              <div style={{ display: 'grid', gap: '0.65rem', fontSize: '0.85rem' }}>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 1:</strong> Fundamentos de Álgebra e Porcentagem (7 aulas)
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 2:</strong> Juros Simples, Compostos e Taxas (8 aulas)
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 3:</strong> Inflação, Taxa Real e Equivalência (7 aulas)
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 4:</strong> Amortização (SAC, Price) e Séries (7 aulas)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trilha 2: Finanças */}
        <div className="bfa-split-row">
          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800 }}>GRADE DO CURSO</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>3 Módulos · 26 Aulas</span>
              </div>
              <div style={{ display: 'grid', gap: '0.65rem', fontSize: '0.85rem' }}>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 1:</strong> Sistema Financeiro e Renda Fixa (9 aulas)
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 2:</strong> Ações, FIIs e Renda Variável (8 aulas)
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>Módulo 3:</strong> Contabilidade e Análise de Balanços (9 aulas)
                </div>
              </div>
            </div>
          </div>

          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              TRILHA 02 · FINANÇAS
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Mercado de Capitais e Análise de Empresas
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Entenda como funcionam os principais investimentos no Brasil: títulos do Tesouro Direto, CDBs, fundos imobiliários e ações na B3, além dos conceitos básicos de contabilidade (DRE e Balanço).
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>— 26 aulas práticas</strong> sobre o mercado brasileiro</li>
              <li><strong>— Comparativo claro</strong> de prazos, riscos e tributação</li>
              <li><strong>— Noções de múltiplos</strong> como P/L, dividendos e endividamento</li>
            </ul>
            <a href="#/financas" className="bfa-btn bfa-btn--verde" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Ver Aulas de Finanças →
            </a>
          </div>
        </div>

        {/* Trilha 3: BRHSIC */}
        <div className="bfa-split-row" style={{ borderBottom: 'none' }}>
          <div className="bfa-split-col--text">
            <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'rgba(217, 119, 6, 0.08)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontWeight: 800, width: 'fit-content' }}>
              COMPETIÇÃO · BRHSIC
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Guia de Preparação para a BRHSIC
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
              Material de apoio para equipes que participam da Brazil High School Investment Competition. Orientações sobre elaboração de relatórios de análise de ações, valuation básico e apresentação verbal.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
              <li><strong>— Estrutura de tese:</strong> análise setorial e vantagens da empresa</li>
              <li><strong>— Modelagem financeira:</strong> projeção de fluxo de caixa e preço-alvo</li>
              <li><strong>— Dicas de apresentação:</strong> roteiro de pitch e resposta à banca</li>
            </ul>
            <a href="#/preparacao-brhsic" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', fontWeight: 700, width: 'fit-content' }}>
              Ver Guia da Competição →
            </a>
          </div>

          <div className="bfa-split-col--visual">
            <div className="bfa-tech-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                <span className="mono-tag" style={{ color: 'var(--track-brhsic)', fontWeight: 800 }}>ETAPAS DO GUIA</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Roteiro Completo</span>
              </div>
              <div style={{ display: 'grid', gap: '0.65rem', fontSize: '0.85rem' }}>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>1. Relatório Escrito:</strong> Como escolher a empresa e estruturar a tese de investimento
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>2. Projeção Financeira:</strong> Estimativa de receita, custos e cálculo de valor justo
                </div>
                <div style={{ padding: '0.65rem 0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>3. Apresentação (Pitch):</strong> Como montar os slides e responder à banca avaliadora
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── 3. Grade Técnica de Ferramentas do Laboratório ───────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)', padding: '4rem 0' }}>
        <div className="bfa-container">
          <div style={{ marginBottom: '2rem' }}>
            <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
              FERRAMENTAS
            </span>
            <h2 className="headline-punch" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
              Recursos Práticos da Plataforma
            </h2>
          </div>

          <div className="bfa-grid-tools-4">
            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--track-math)', marginBottom: '0.5rem' }}>
                01 // SIMULAÇÃO
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--foreground)' }}>Calculadora de Juros</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Compare o resultado de aplicações em juros simples e compostos.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--track-math)' }}>
                Abrir Calculadora →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--track-finance)', marginBottom: '0.5rem' }}>
                02 // METAS
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--foreground)' }}>Cronograma de Estudos</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Defina uma data limite e calcule quantas aulas fazer por dia.
              </p>
              <a href="#/cronograma" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--track-finance)' }}>
                Calcular Ritmo →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--gold-deep)', marginBottom: '0.5rem' }}>
                03 // CERTIFICADO
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--foreground)' }}>Certificado Digital</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Emissão de certificado de conclusão com código de validação para portfólio.
              </p>
              <a href="#/exercicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
                Ver Requisitos →
              </a>
            </div>

            <div className="tool-card bfa-bento-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                04 // PROFESSOR
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--foreground)' }}>Área do Professor</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                Painel para gerenciar aulas, adicionar vídeos e cadastrar exercícios.
              </p>
              <a href="#/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)' }}>
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
