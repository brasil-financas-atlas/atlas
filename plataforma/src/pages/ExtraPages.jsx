const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   1. TRILHA ESPECIAL PREPARAÇÃO BRHSIC
   ========================================================================== */
function BrhsicPage() {
  return (
    <div className="site-wrapper">
      <section className="hero" style={{ padding: '6rem 0 4rem 0', backgroundColor: 'var(--bg-surface-blue)' }}>
        <div className="site-container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', backgroundColor: 'var(--accent-gold)', color: '#fff', borderRadius: '999px', letterSpacing: '0.05em' }}>
                COMPETIÇÃO NACIONAL
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', backgroundColor: 'var(--accent-green)', color: '#fff', borderRadius: '999px', letterSpacing: '0.05em' }}>
                EQUITY RESEARCH
              </span>
            </div>

            <img src="https://brhsic-main.vercel.app/brand/brhsic-symbol.png" alt="BRHSIC" style={{ height: '48px', width: 'auto', marginBottom: '1.5rem', display: 'inline-block' }} />`r`n            <EditableBlock id="brhsic-hero-title" as="h1" className="hero__title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--primary)', marginBottom: '1rem' }}>
              Guia de Preparação de Alta Performance BRHSIC
            </EditableBlock>

            <EditableBlock id="brhsic-hero-sub" as="p" style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Metodologia rigorosa para elaboração de relatórios profissionais de recomendação de investimento, modelagem por Fluxo de Caixa Descontado (DCF) e defesa verbal perante bancas examinadoras.
            </EditableBlock>
          </div>
        </div>
      </section>

        {/* Trilhas de Estudo Fundamentais para a Olimpada */}
        <section className="process-section" style={{ backgroundColor: 'var(--bg-surface-blue)' }}>
        <div className="process__container">
          <div className="process__header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <h2 className="process__title">Estrutura de Avaliação Oficial</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>3 Pilares de Nota da Competição</p>
          </div>
          <div className="process__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            
            <div className="module-card">
              <div className="step-number" style={{ color: 'var(--primary)' }}>Peso 35%</div>
              <h3>1. Tese & Moat Competitivo</h3>
              <p>Estruturação da tese de investimento, mapeamento do ecossistema concorrencial, análise de vantagens competitivas sustentáveis (Moat) e matriz de riscos operacionais.</p>
            </div>

            <div className="module-card">
              <div className="step-number" style={{ color: 'var(--primary)' }}>Peso 40%</div>
              <h3>2. Modelagem Financeira</h3>
              <p>Projeção integrada de DRE, Balanço e Fluxo de Caixa Livre (FCFF), estimativa do Custo Médio Ponderado de Capital (WACC), taxa de perpetuidade e múltiplos relativos.</p>
            </div>

            <div className="module-card">
              <div className="step-number" style={{ color: 'var(--primary)' }}>Peso 25%</div>
              <h3>3. Defesa Verbal (Pitch)</h3>
              <p>Apresentação executiva em 5 minutos, comunicação de dados de alta densidade, storytelling financeiro e respostas técnicas precisas aos questionamentos da banca avaliadora.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="process-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="process__container">
          <div className="process__header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <h2 className="process__title">Trilhas Essenciais</h2>
          </div>
          
          <div className="process__grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Card 1: Trilha de Matemática */}
            <div className="module-card" style={{ padding: '3rem' }}>
              <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', display: 'block' }}>
                TRILHA 01 · BASE QUANTITATIVA
              </span>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                Matemática Financeira & Modelagem
              </h3>
              <p style={{ marginBottom: '2rem', minHeight: '80px' }}>
                Domine os fundamentos matemáticos exigidos na competição: regimes de capitalização, taxas equivalentes compostas, taxa real de Fisher e tabelas de amortização.
              </p>
              <a href="#/matematica" className="btn-primary" style={{ width: '100%' }}>
                Acessar Aulas de Matemática →
              </a>
            </div>

            {/* Card 2: Trilha de Finanças */}
            <div className="module-card" style={{ padding: '3rem' }}>
              <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', display: 'block' }}>
                TRILHA 02 · MERCADO DE CAPITAIS
              </span>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
                Finanças & Análise de Empresas
              </h3>
              <p style={{ marginBottom: '2rem', minHeight: '80px' }}>
                Aprenda a analisar demonstrativos contábeis reais (DRE, Balanço, Fluxo de Caixa), múltiplos setoriais e dinâmicas de mercado para fundamentar sua tese.
              </p>
              <a href="#/financas" className="btn-primary" style={{ width: '100%', backgroundColor: 'var(--text-primary)' }}>
                Acessar Aulas de Finanças →
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

/* ==========================================================================
   2. HUB DE EXERCÍCIOS & PROBLEMAS PRÁTICOS (PBL)
   ========================================================================== */
function Exercicios() {
  const { isAuthenticated, inlineEditActive, cmsData, deleteExercise } = useContext(AdminContext || createContext({}));
  const [activeTab, setActiveTab] = useState('fixacao');
  const [expandedId, setExpandedId] = useState(null);

  const defaultExerciseSets = {
    fixacao: [
      { id: 'f1', module: 'Álgebra do Zero', difficulty: 'Fácil', title: 'Calculando Porcentagem Real em Descontos', question: 'Um produto de R$ 250,00 recebeu um desconto sucessivo de 10% e depois mais 5%. Qual o valor final pago pelo comprador?', answer: 'Primeiro desconto: R$ 250 * 0,90 = R$ 225,00. Segundo desconto: R$ 225 * 0,95 = R$ 213,75. O desconto total acumulado foi de 14,5%.' },
      { id: 'f2', module: 'Matemática Financeira', difficulty: 'Médio', title: 'Equação de Fisher e Juros Reais', question: 'Se a taxa de juros nominal é de 12% ao ano e a inflação medida pelo IPCA foi de 4%, qual a rentabilidade real líquida aproximada?', answer: 'Usando a Equação de Fisher (1 + r_real) = (1 + r_nom) / (1 + i). (1,12 / 1,04) - 1 = 7,69% a.a. (Aproximação direta de 12% - 4% = 8% superestima a rentabilidade real).' }
    ],
    calculo: [
      { id: 'c1', module: 'Juros Compostos', difficulty: 'Médio', title: 'Aporte Mensal vs Capital Inicial', question: 'Um investimento inicial de R$ 1.000,00 aplicado a 1% ao mês durante 24 meses acumula quanto de juros absolutos?', answer: 'VF = VP * (1 + i)^n. VF = 1000 * (1,01)^24 = R$ 1.269,73. Juros absolutos acumulados: R$ 269,73.' }
    ],
    pbl: [
      { id: 'p1', module: 'Análise Fundamentalista', difficulty: 'Avançado', title: 'Estudo de Caso: Análise de Margem e ROIC da WEG (WEGE3)', question: 'Por que um ROIC consistente acima de 20% demonstra vantagem competitiva sustentável (Moat) em empresas industriais?', answer: 'O ROIC (Retorno sobre o Capital Investido) mede a eficiência da empresa em gerar lucro operacional com o capital total alocado por acionistas e credores. Quando o ROIC é sistematicamente maior que o custo de capital (WACC), a empresa cria valor econômico real (EVA).' }
    ]
  };

  const currentList = useMemo(() => {
    const cmsExs = cmsData?.exercises ? cmsData.exercises.filter(e => (e.category || 'fixacao') === activeTab) : [];
    const defaults = defaultExerciseSets[activeTab] || [];
    return [...cmsExs, ...defaults];
  }, [cmsData, activeTab]);

  return (
    <div className="site-wrapper">
      <section className="hero" style={{ padding: '6rem 0 4rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary)' }}>
            BANCO DE QUESTÕES
          </span>
          <img src="https://brhsic-main.vercel.app/brand/brhsic-symbol.png" alt="BRHSIC" style={{ height: '48px', width: 'auto', marginBottom: '1.5rem', display: 'inline-block' }} />`r`n            <EditableBlock id="ex-hero-title" as="h1" className="hero__title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Hub de Exercícios & Problemas Práticos
          </EditableBlock>
          <EditableBlock id="ex-hero-sub" as="p" className="hero__subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
            Listas de fixação conceitual, cálculos financeiros passo a passo e resolução de casos reais com gabarito analítico.
          </EditableBlock>
        </div>
      </section>

      <section className="process-section">
        <div className="site-container" style={{ maxWidth: '880px' }}>
          {/* Tab Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('fixacao')}
              className={activeTab === 'fixacao' ? 'btn-primary' : 'btn-secondary'}
            >
              Fixação Conceitual
            </button>
            <button
              onClick={() => setActiveTab('calculo')}
              className={activeTab === 'calculo' ? 'btn-primary' : 'btn-secondary'}
            >
              Cálculo Financeiro
            </button>
            <button
              onClick={() => setActiveTab('pbl')}
              className={activeTab === 'pbl' ? 'btn-primary' : 'btn-secondary'}
            >
              Casos Reais (PBL)
            </button>
          </div>

          {/* Exercises List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentList.map((ex) => {
              const isExpanded = expandedId === ex.id;
              return (
                <article key={ex.id} className="module-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem' }}>{ex.module}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', backgroundColor: 'var(--bg-surface-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        {ex.difficulty}
                      </span>
                      {isAuthenticated && inlineEditActive && (
                        <button
                          type="button"
                          onClick={() => deleteExercise && deleteExercise(ex.id)}
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>

                  <EditableBlock id={`ex-${ex.id}-title`} as="h3" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {ex.title}
                  </EditableBlock>
                  <EditableBlock id={`ex-${ex.id}-q`} as="p" style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {ex.question}
                  </EditableBlock>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                    className="btn-secondary"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    {isExpanded ? 'Ocultar Resolução' : 'Ver Resolução Passo a Passo →'}
                  </button>

                  {isExpanded && (
                    <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-blue)', borderLeft: '4px solid var(--primary)' }}>
                      <div style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.875rem' }}>Gabarito & Demonstração Analítica:</div>
                      <EditableBlock id={`ex-${ex.id}-ans`} as="p" style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                        {ex.answer}
                      </EditableBlock>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   3. GERADOR DE CRONOGRAMA DE ESTUDOS
   ========================================================================== */
function Cronograma() {
  const [deadline, setDeadline] = useState('2026-11-30');

  const daysLeft = useMemo(() => {
    const target = new Date(deadline);
    const today = new Date();
    const diffTime = target - today;
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [deadline]);

  const lessonsPerDay = (55 / daysLeft).toFixed(1);

  return (
    <div className="site-wrapper">
      <section className="hero" style={{ padding: '6rem 0 4rem 0', backgroundColor: 'var(--bg-surface-blue)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary)' }}>
            PLANEJAMENTO ACADÊMICO
          </span>
          <img src="https://brhsic-main.vercel.app/brand/brhsic-symbol.png" alt="BRHSIC" style={{ height: '48px', width: 'auto', marginBottom: '1.5rem', display: 'inline-block' }} />`r`n            <EditableBlock id="crono-title" as="h1" className="hero__title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Gerador de Cronograma Inteligente
          </EditableBlock>
          <EditableBlock id="crono-sub" as="p" className="hero__subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
            Calcule sua meta diária de estudos até a data limite da sua avaliação ou competição olímpica.
          </EditableBlock>
        </div>
      </section>

      <section className="process-section">
        <div className="site-container" style={{ maxWidth: '820px' }}>
          <div className="module-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem', fontWeight: 700, fontSize: '0.875rem' }}>
              SELECIONE A DATA LIMITE DA SUA META:
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{ width: '100%', maxWidth: '300px', margin: '0 auto', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '2.5rem', outline: 'none' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>DIAS DISPONÍVEIS</span>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>{daysLeft} dias</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.875rem' }}>RITMO RECOMENDADO</span>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>~{lessonsPerDay} / dia</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   4. PORTAL DE NOTÍCIAS MACROECONÔMICAS
   ========================================================================== */
function Noticias() {
  const { isAuthenticated, inlineEditActive, cmsData, deleteNews } = useContext(AdminContext || createContext({}));

  const defaultArticles = [
    { id: 'n1', title: 'Copom Mantém Taxa Selic: Como o Juro Nominal Afeta o CDB e o Tesouro Direto', date: 'Agosto, 2026', category: 'Macroeconomia', summary: 'Entenda a relação entre a decisão do Banco Central e o cálculo de rentabilidade real dos títulos públicos negociados por pessoas físicas.' },
    { id: 'n2', title: 'Análise de Múltiplos e Margens Operacionais: O Caso da WEG no Mercado Global', date: 'Agosto, 2026', category: 'Equity Research', summary: 'Estudo de caso aplicando conceitos de ROIC, Margem Ebitda e múltiplos de Valuation na prática corporativa.' }
  ];

  const articlesList = useMemo(() => {
    const cmsNews = cmsData?.news || [];
    return [...cmsNews, ...defaultArticles];
  }, [cmsData]);

  return (
    <div className="site-wrapper">
      <section className="hero" style={{ padding: '6rem 0 4rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary)' }}>
            ANÁLISES & MERCADO
          </span>
          <img src="https://brhsic-main.vercel.app/brand/brhsic-symbol.png" alt="BRHSIC" style={{ height: '48px', width: 'auto', marginBottom: '1.5rem', display: 'inline-block' }} />`r`n            <EditableBlock id="news-hero-title" as="h1" className="hero__title" style={{ marginTop: '1rem' }}>
            Notícias & Macroeconomia Aplicada
          </EditableBlock>
        </div>
      </section>

      <section className="process-section">
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articlesList.map((art) => (
              <article key={art.id || art.title} className="module-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem' }}>{art.category}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{art.date || 'Recente'}</span>
                </div>
                <EditableBlock id={`news-${art.id || 'def'}-title`} as="h3" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  {art.title}
                </EditableBlock>
                <EditableBlock id={`news-${art.id || 'def'}-sum`} as="p" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {art.summary}
                </EditableBlock>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   5. PÁGINA SOBRE O PROJETO BRASIL FINANÇAS ATLAS
   ========================================================================== */
function Sobre() {
  return (
    <div className="site-wrapper">
      <section className="hero" style={{ padding: '6rem 0 4rem 0', backgroundColor: 'var(--bg-surface-blue)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary)' }}>
            INSTITUCIONAL
          </span>
          <img src="https://brhsic-main.vercel.app/brand/brhsic-symbol.png" alt="BRHSIC" style={{ height: '48px', width: 'auto', marginBottom: '1.5rem', display: 'inline-block' }} />`r`n            <EditableBlock id="sobre-hero-title" as="h1" className="hero__title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Brasil Finanças Atlas (BFA)
          </EditableBlock>
          <EditableBlock id="sobre-hero-sub" as="p" className="hero__subtitle" style={{ margin: '0 auto', maxWidth: '720px' }}>
            Plataforma aberta de excelência em educação financeira e matemática aplicada para estudantes e educadores de todo o Brasil.
          </EditableBlock>
        </div>
      </section>

      <section className="process-section">
        <div className="site-container" style={{ maxWidth: '850px' }}>
          <article className="module-card" style={{ padding: '3rem' }}>
            <EditableBlock id="sobre-missao-title" as="h2" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Nossa Missão
            </EditableBlock>
            <EditableBlock id="sobre-missao-text" as="p" style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
              Universalizar o ensino de matemática aplicada e finanças corporativas de padrão profissional para estudantes do ensino médio em todo o Brasil, combinando rigor analítico com intuição prática.
            </EditableBlock>

            <EditableBlock id="sobre-princ-title" as="h2" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Princípios Estruturais
            </EditableBlock>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.125rem' }}>
              <li><strong>100% Gratuito e Aberto:</strong> Todo o conteúdo e simuladores disponíveis sem paywall ou cobranças.</li>
              <li><strong>Intuição Antes da Fórmula:</strong> Explicações visuais e demonstrações interativas antes da álgebra formal.</li>
              <li><strong>Alinhamento com a Realidade Nacional:</strong> Modelagem direta da dinâmica macroeconômica brasileira (Selic, IPCA, CDI e B3).</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

window.BrhsicPage = BrhsicPage;
window.Exercicios = Exercicios;
window.Cronograma = Cronograma;
window.Noticias = Noticias;
window.Sobre = Sobre;




