const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   1. TRILHA ESPECIAL PREPARAÇÃO BRHSIC
   ========================================================================== */
function BrhsicPage() {
  return (
    <div>
      {/* Hero Split 50/50 */}
      <section className="hero-gradient" style={{ padding: '5rem 0 4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bfa-split-hero">
            
            <div className="bfa-split-col--text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono-tag" style={{ color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(251, 191, 36, 0.3)', fontWeight: 700 }}>
                  COMPETIÇÃO NACIONAL · BRHSIC
                </span>
                <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 700 }}>
                  Equity Research
                </span>
              </div>

              <EditableBlock id="brhsic-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3.2rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem', letterSpacing: '-0.035em' }}>
                Guia de Preparação de Alta Performance BRHSIC
              </EditableBlock>

              <EditableBlock id="brhsic-hero-sub" as="p" style={{ fontSize: '1.1rem', lineHeight: 1.65, color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem' }}>
                Metodologia rigorosa para elaboração de relatórios profissionais de recomendação de investimento, modelagem por Fluxo de Caixa Descontado (DCF) e defesa verbal perante bancas examinadoras.
              </EditableBlock>
            </div>

            <div className="bfa-split-col--visual">
              <div className="bfa-tech-card" style={{ background: 'rgba(15, 23, 42, 0.92)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="mono-tag" style={{ color: '#FBBF24', fontWeight: 800, fontSize: '0.72rem' }}>
                    ESTRUTURA DE AVALIAÇÃO OFICIAL
                  </span>
                  <span className="mono-tag" style={{ color: '#94A3B8', fontWeight: 600 }}>3 Pilares de Nota</span>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF' }}>
                      <span>1. Tese & Moat Competitivo</span>
                      <span className="mono-tag" style={{ color: '#34D399' }}>Peso 35%</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF' }}>
                      <span>2. Modelagem Financeira (DCF / WACC)</span>
                      <span className="mono-tag" style={{ color: '#60A5FA' }}>Peso 40%</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF' }}>
                      <span>3. Defesa Verbal & Apresentação (Pitch)</span>
                      <span className="mono-tag" style={{ color: '#FBBF24' }}>Peso 25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pilares Técnicos */}
      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          
          <article className="bfa-tech-card" style={{ borderTop: '4px solid var(--gold-deep)' }}>
            <span className="mono-tag" style={{ color: 'var(--gold-deep)', background: 'rgba(217, 119, 6, 0.08)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
              PILAR 01
            </span>
            <EditableBlock id="brhsic-p1-title" as="h3" style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Relatório de Equity Research
            </EditableBlock>
            <EditableBlock id="brhsic-p1-desc" as="p" style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Estruturação da tese de investimento, mapeamento do ecossistema concorrencial, análise de vantagens competitivas sustentáveis (Moat) e matriz de riscos operacionais.
            </EditableBlock>
          </article>

          <article className="bfa-tech-card" style={{ borderTop: '4px solid var(--track-finance)' }}>
            <span className="mono-tag" style={{ color: 'var(--track-finance)', background: 'rgba(5, 150, 105, 0.08)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
              PILAR 02
            </span>
            <EditableBlock id="brhsic-p2-title" as="h3" style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Modelagem & Valuation DCF
            </EditableBlock>
            <EditableBlock id="brhsic-p2-desc" as="p" style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Projeção integrada de DRE, Balanço e Fluxo de Caixa Livre (FCFF), estimativa do Custo Médio Ponderado de Capital (WACC), taxa de perpetuidade e múltiplos relativos (EV/EBITDA, P/L).
            </EditableBlock>
          </article>

          <article className="bfa-tech-card" style={{ borderTop: '4px solid var(--track-math)' }}>
            <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(37, 99, 235, 0.08)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
              PILAR 03
            </span>
            <EditableBlock id="brhsic-p3-title" as="h3" style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Pitch & Arguição de Banca
            </EditableBlock>
            <EditableBlock id="brhsic-p3-desc" as="p" style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Apresentação executiva em 5 minutos, comunicação de dados de alta densidade, storytelling financeiro e respostas técnicas precisas aos questionamentos da banca avaliadora.
            </EditableBlock>
          </article>

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
    <div>
      <section className="hero-gradient" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.35)', fontWeight: 700 }}>
            BANCO DE QUESTÕES
          </span>
          <EditableBlock id="ex-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.75rem', letterSpacing: '-0.035em' }}>
            Hub de Exercícios & Problemas Práticos
          </EditableBlock>
          <EditableBlock id="ex-hero-sub" as="p" style={{ fontSize: '1.1rem', color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem', maxWidth: '700px' }}>
            Listas de fixação conceitual, cálculos financeiros passo a passo e resolução de casos reais com gabarito analítico.
          </EditableBlock>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem' }}>
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('fixacao')}
            className="bfa-btn"
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: activeTab === 'fixacao' ? 'var(--track-math)' : 'var(--surface-strong)',
              color: activeTab === 'fixacao' ? '#FFFFFF' : 'var(--foreground)',
              border: '1px solid var(--border)'
            }}
          >
            Fixação Conceitual
          </button>
          <button
            onClick={() => setActiveTab('calculo')}
            className="bfa-btn"
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: activeTab === 'calculo' ? 'var(--track-finance)' : 'var(--surface-strong)',
              color: activeTab === 'calculo' ? '#FFFFFF' : 'var(--foreground)',
              border: '1px solid var(--border)'
            }}
          >
            Cálculo Financeiro
          </button>
          <button
            onClick={() => setActiveTab('pbl')}
            className="bfa-btn"
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: activeTab === 'pbl' ? 'var(--gold-deep)' : 'var(--surface-strong)',
              color: activeTab === 'pbl' ? '#FFFFFF' : 'var(--foreground)',
              border: '1px solid var(--border)'
            }}
          >
            Casos Reais (PBL)
          </button>
        </div>

        {/* Exercises List */}
        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '880px', margin: '0 auto' }}>
          {currentList.map((ex) => {
            const isExpanded = expandedId === ex.id;
            return (
              <article key={ex.id} className="bfa-tech-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800 }}>{ex.module}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="mono-tag" style={{ color: 'var(--gold-deep)', fontWeight: 700 }}>{ex.difficulty}</span>
                    {isAuthenticated && inlineEditActive && (
                      <button
                        type="button"
                        className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                        onClick={() => deleteExercise && deleteExercise(ex.id)}
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: '#EF4444' }}
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </div>

                <EditableBlock id={`ex-${ex.id}-title`} as="h3" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  {ex.title}
                </EditableBlock>
                <EditableBlock id={`ex-${ex.id}-q`} as="p" style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                  {ex.question}
                </EditableBlock>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface-strong)',
                    color: 'var(--foreground)',
                    cursor: 'pointer'
                  }}
                >
                  {isExpanded ? 'Ocultar Resolução' : 'Ver Resolução Passo a Passo →'}
                </button>

                {isExpanded && (
                  <div style={{ marginTop: '1rem', padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', borderLeft: '4px solid var(--track-finance)' }}>
                    <div className="mono-tag" style={{ color: 'var(--track-finance)', marginBottom: '0.35rem', fontWeight: 800 }}>Gabarito & Demonstração Analítica:</div>
                    <EditableBlock id={`ex-${ex.id}-ans`} as="p" style={{ fontSize: '0.92rem', color: 'var(--foreground)', lineHeight: 1.65 }}>
                      {ex.answer}
                    </EditableBlock>
                  </div>
                )}
              </article>
            );
          })}
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
    <div>
      <section className="hero-gradient" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: '#60A5FA', background: 'rgba(96, 165, 250, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(96, 165, 250, 0.35)', fontWeight: 700 }}>
            PLANEJAMENTO ACADÊMICO
          </span>
          <EditableBlock id="crono-title" as="h1" className="headline-punch" style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.75rem', letterSpacing: '-0.035em' }}>
            Gerador de Cronograma Inteligente
          </EditableBlock>
          <EditableBlock id="crono-sub" as="p" style={{ fontSize: '1.1rem', color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem', maxWidth: '700px' }}>
            Calcule sua meta diária de estudos até a data limite da sua avaliação ou competição olímpica.
          </EditableBlock>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem', maxWidth: '820px' }}>
        <div className="bfa-tech-card" style={{ padding: '2rem' }}>
          <label className="mono-tag" style={{ color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>
            SELECIONE A DATA LIMITE DA SUA META:
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)', fontSize: '1rem', marginBottom: '2rem', outline: 'none' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700 }}>DIAS DISPONÍVEIS</span>
              <div className="tabular-numbers" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.25rem' }}>{daysLeft} dias</div>
            </div>
            <div>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)', fontWeight: 700 }}>RITMO RECOMENDADO</span>
              <div className="tabular-numbers" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--track-finance)', marginTop: '0.25rem' }}>~{lessonsPerDay} aulas/dia</div>
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
    <div>
      <section className="hero-gradient" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
            ANÁLISES & MERCADO
          </span>
          <EditableBlock id="news-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.75rem', letterSpacing: '-0.035em' }}>
            Notícias & Macroeconomia Aplicada
          </EditableBlock>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {articlesList.map((art) => (
            <article key={art.id || art.title} className="bfa-tech-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800 }}>{art.category}</span>
                <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>{art.date || 'Recente'}</span>
              </div>
              <EditableBlock id={`news-${art.id || 'def'}-title`} as="h3" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {art.title}
              </EditableBlock>
              <EditableBlock id={`news-${art.id || 'def'}-sum`} as="p" style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
                {art.summary}
              </EditableBlock>
            </article>
          ))}
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
    <div>
      <section className="hero-gradient" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.15)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
            INSTITUCIONAL
          </span>
          <EditableBlock id="sobre-hero-title" as="h1" className="headline-punch" style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.75rem', letterSpacing: '-0.035em' }}>
            Brasil Finanças Atlas (BFA)
          </EditableBlock>
          <EditableBlock id="sobre-hero-sub" as="p" style={{ fontSize: '1.1rem', color: 'rgba(241, 245, 249, 0.9)', marginTop: '0.5rem', maxWidth: '720px' }}>
            Plataforma aberta de excelência em educação financeira e matemática aplicada para estudantes e educadores de todo o Brasil.
          </EditableBlock>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '4.5rem 1.5rem', maxWidth: '850px' }}>
        <article className="bfa-tech-card" style={{ padding: '2.25rem', fontSize: '1rem', lineHeight: 1.7 }}>
          <EditableBlock id="sobre-missao-title" as="h2" className="headline-punch" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
            Nossa Missão
          </EditableBlock>
          <EditableBlock id="sobre-missao-text" as="p" style={{ color: 'var(--muted-foreground)', marginBottom: '1.75rem' }}>
            Universalizar o ensino de matemática aplicada e finanças corporativas de padrão profissional para estudantes do ensino médio em todo o Brasil, combinando rigor analítico com intuição prática.
          </EditableBlock>

          <EditableBlock id="sobre-princ-title" as="h2" className="headline-punch" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
            Princípios Estruturais
          </EditableBlock>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><strong>100% Gratuito e Aberto:</strong> Todo o conteúdo e simuladores disponíveis sem paywall ou cobranças.</li>
            <li><strong>Intuição Antes da Fórmula:</strong> Explicações visuais e demonstrações interativas antes da álgebra formal.</li>
            <li><strong>Alinhamento com a Realidade Nacional:</strong> Modelagem direta da dinâmica macroeconômica brasileira (Selic, IPCA, CDI e B3).</li>
          </ul>
        </article>
      </section>
    </div>
  );
}

window.BrhsicPage = BrhsicPage;
window.Exercicios = Exercicios;
window.Cronograma = Cronograma;
window.Noticias = Noticias;
window.Sobre = Sobre;
