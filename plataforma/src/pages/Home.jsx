const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function Home() {
  const { completedLessons } = useContext(ProgressContext || createContext({}));

  return (
    <div className="bfa-home">
      {/* Hero Section */}
      <section className="bfa-hero">
        <div className="bfa-hero__container">
          <div className="bfa-hero__badge">
            <BfaIcon name="sparkles" size={15} color="#FDE68A" style={{ marginRight: '6px' }} />
            <EditableBlock id="home-hero-badge" as="span">
              Plataforma Educacional Aberta — NIF Dragão do Mar
            </EditableBlock>
          </div>
          <EditableBlock id="home-hero-title" as="h1" className="bfa-hero__title">
            Matemática e Finanças explicadas de forma simples e intuitiva
          </EditableBlock>
          <EditableBlock id="home-hero-sub" as="p" className="bfa-hero__sub">
            Trilhas abertas projetadas para estudantes do ensino médio. Aprenda a cuidar do seu dinheiro, entender a economia e se preparar para competições como a BRHSIC.
          </EditableBlock>
          <div className="bfa-hero__ctas">
            <a href="#/matematica" className="bfa-btn bfa-btn--verde bfa-btn--lg">
              <BfaIcon name="math" size={18} style={{ marginRight: '8px' }} /> Trilha de Matemática (4 Módulos)
            </a>
            <a href="#/financas" className="bfa-btn bfa-btn--azul bfa-btn--lg">
              <BfaIcon name="finance" size={18} style={{ marginRight: '8px' }} /> Trilha de Finanças (3 Módulos)
            </a>
          </div>
        </div>
      </section>

      {/* Subject Cards */}
      <section className="bfa-section">
        <div className="bfa-section__container">
          <EditableBlock id="home-subj-section-title" as="h2" className="bfa-section__title">
            Escolha sua Trilha de Aprendizado
          </EditableBlock>
          <EditableBlock id="home-subj-section-subtitle" as="p" className="bfa-section__subtitle">
            Navegação clara e intuitiva separada por disciplinas
          </EditableBlock>

          <div className="bfa-subject-grid">
            {/* Card 1: Matemática */}
            <div className="bfa-card bfa-card--matematica">
              <div className="bfa-card__header">
                <span className="bfa-card__icon" style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '12px', background: 'var(--color-verde-light)' }}>
                  <BfaIcon name="math" size={28} color="var(--color-verde)" />
                </span>
                <EditableBlock id="home-mat-badge" as="span" className="bfa-badge bfa-badge--verde">
                  4 Módulos • 29 Aulas
                </EditableBlock>
              </div>
              <EditableBlock id="home-mat-title" as="h3" className="bfa-card__title">
                Matemática Aplicada a Finanças
              </EditableBlock>
              <EditableBlock id="home-mat-desc" as="p" className="bfa-card__text">
                A base essencial para não travar em juros, porcentagem e inflação. Do zero absoluto — construída para destravar seus estudos de dinheiro.
              </EditableBlock>
              <ul className="bfa-card__bullets">
                <li>Álgebra do Zero & Porcentagem Real</li>
                <li>Juros Simples e Compostos na Prática</li>
                <li>Funções, Progressões & Probabilidade</li>
                <li>Estatística & Regressão Linear</li>
              </ul>
              <a href="#/matematica" className="bfa-btn bfa-btn--verde bfa-btn--block">
                Ver Módulos de Matemática ➔
              </a>
            </div>

            {/* Card 2: Finanças */}
            <div className="bfa-card bfa-card--financas">
              <div className="bfa-card__header">
                <span className="bfa-card__icon" style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '12px', background: 'var(--color-azul-light)' }}>
                  <BfaIcon name="finance" size={28} color="var(--color-azul)" />
                </span>
                <EditableBlock id="home-fin-badge" as="span" className="bfa-badge bfa-badge--azul">
                  3 Módulos • 26 Aulas
                </EditableBlock>
              </div>
              <EditableBlock id="home-fin-title" as="h3" className="bfa-card__title">
                Finanças & Investimentos
              </EditableBlock>
              <EditableBlock id="home-fin-desc" as="p" className="bfa-card__text">
                Do funcionamento do mercado até análise fundamentalista e valuation por Fluxo de Caixa Descontado (DCF).
              </EditableBlock>
              <ul className="bfa-card__bullets">
                <li>Sistema Financeiro & Renda Fixa</li>
                <li>Análise Fundamentalista de Empresas</li>
                <li>Valuation & Demonstrações Financeiras</li>
                <li>Montagem e Gestão de Portfólio</li>
              </ul>
              <a href="#/financas" className="bfa-btn bfa-btn--azul bfa-btn--block">
                Ver Módulos de Finanças ➔
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Highlight Card */}
      <section className="bfa-section bfa-section--alt">
        <div className="bfa-section__container">
          <EditableBlock id="home-napkin-section-title" as="h2" className="bfa-section__title">
            Visual & Direto ao Ponto
          </EditableBlock>
          <EditableBlock id="home-napkin-section-subtitle" as="p" className="bfa-section__subtitle">
            Esquemas visuais simples para facilitar a fixação
          </EditableBlock>

          <div className="bfa-napkin-card">
            <span className="bfa-napkin-card__tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="lightbulb" size={14} color="#FFFFFF" /> <EditableBlock id="home-napkin-tag" as="span">Destaque do Conceito: Juros Compostos</EditableBlock>
            </span>
            <EditableBlock id="home-napkin-title" as="div" className="bfa-napkin-card__title">
              O Efeito Bola de Neve no Tempo
            </EditableBlock>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <EditableBlock id="home-napkin-item1-title" as="strong" style={{ color: 'var(--color-verde)' }}>1. Juros Simples</EditableBlock>
                <EditableBlock id="home-napkin-item1-desc" as="p" style={{ fontSize: '0.9rem', margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Rendem apenas sobre o capital inicial. Crescimento linear constante.</EditableBlock>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <EditableBlock id="home-napkin-item2-title" as="strong" style={{ color: 'var(--color-azul)' }}>2. Juros Compostos</EditableBlock>
                <EditableBlock id="home-napkin-item2-desc" as="p" style={{ fontSize: '0.9rem', margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Rendem sobre o capital + juros já acumulados. Crescimento exponencial.</EditableBlock>
              </div>
              <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <EditableBlock id="home-napkin-item3-title" as="strong" style={{ color: 'var(--color-ouro-dark)' }}>3. O Fator Tempo (n)</EditableBlock>
                <EditableBlock id="home-napkin-item3-desc" as="p" style={{ fontSize: '0.9rem', margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Em 30 anos, os juros compostos multiplicam o resultado final em mais de 4x.</EditableBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="bfa-section">
        <div className="bfa-section__container">
          <EditableBlock id="home-steps-section-title" as="h2" className="bfa-section__title">
            Como funciona cada aula
          </EditableBlock>
          <div className="bfa-steps-grid">
            <div className="bfa-step-card">
              <span className="bfa-step-card__num">1</span>
              <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-verde-light)' }}>
                <BfaIcon name="book" size={26} color="var(--color-verde)" />
              </span>
              <EditableBlock id="home-step1-title" as="h4">Leia & Compreenda</EditableBlock>
              <EditableBlock id="home-step1-desc" as="p">Cada aula traz a teoria em linguagem simples, sem jargões desnecessários e com fórmulas em KaTeX.</EditableBlock>
            </div>

            <div className="bfa-step-card">
              <span className="bfa-step-card__num">2</span>
              <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-ouro-light)' }}>
                <BfaIcon name="target" size={26} color="var(--color-ouro-dark)" />
              </span>
              <EditableBlock id="home-step2-title" as="h4">Pratique no Quiz</EditableBlock>
              <EditableBlock id="home-step2-desc" as="p">Valide o que aprendeu com questões interativas de múltipla escolha e explicações imediatas.</EditableBlock>
            </div>

            <div className="bfa-step-card">
              <span className="bfa-step-card__num">3</span>
              <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-azul-light)' }}>
                <BfaIcon name="chat" size={26} color="var(--color-azul)" />
              </span>
              <EditableBlock id="home-step3-title" as="h4">Debata no Fórum</EditableBlock>
              <EditableBlock id="home-step3-desc" as="p">Faça perguntas com marcação de tempo (timestamps) das videoaulas e tire dúvidas com a comunidade.</EditableBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Banner */}
      <section className="bfa-section bfa-section--alt">
        <div className="bfa-section__container">
          <div className="bfa-about-banner">
            <div className="bfa-about-banner__content">
              <EditableBlock id="home-about-title" as="h2">Sobre o Brasil Finanças Atlas</EditableBlock>
              <EditableBlock id="home-about-desc" as="p">
                Iniciativa educacional criada no Núcleo de Inteligência Financeira (NIF) da escola pública Dragão do Mar, em Fortaleza-CE. Nosso objetivo é universalizar a educação financeira e matemática de alto nível para estudantes de todo o Brasil.
              </EditableBlock>
              <a href="#/sobre" className="bfa-btn bfa-btn--ouro">
                Conheça a História do BFA ➔
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
