const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   1. TRILHA ESPECIAL PREPARAÇÃO BRHSIC
   ========================================================================== */
function BrhsicPage() {
  return (
    <div>
      <section className="hero-gradient" style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: 'var(--gold)', background: 'rgba(217, 119, 6, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
            Brazil High School Investment Competition
          </span>
          <EditableBlock id="brhsic-hero-title" as="h1" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF', marginTop: '1rem' }}>
            Guia de Preparação de Alta Performance BRHSIC
          </EditableBlock>
          <EditableBlock id="brhsic-hero-sub" as="p" style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '0.5rem', maxWidth: '700px' }}>
            Técnicas profissionais de Equity Research, Valuation por Fluxo de Caixa Descontado (DCF) e estrutura de Pitch verbal para bancas examinadoras.
          </EditableBlock>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <article className="module-card card-lift" style={{ borderTop: '4px solid var(--track-brhsic)', padding: '1.5rem' }}>
            <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>PILAR 01</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.75rem', color: 'var(--foreground)' }}>Relatório de Equity Research</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
              Estruturação de tese de investimento, análise setorial, vantagens competitivas (Moat) e mapeamento de riscos operacionais.
            </p>
          </article>

          <article className="module-card card-lift" style={{ borderTop: '4px solid var(--track-brhsic)', padding: '1.5rem' }}>
            <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>PILAR 02</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.75rem', color: 'var(--foreground)' }}>Modelagem Financeira & Valuation</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
              Projeção de DRE, Balanço e DFC, cálculo do WACC, taxa de desconto e múltiplos comparativos (P/L, EV/EBITDA).
            </p>
          </article>

          <article className="module-card card-lift" style={{ borderTop: '4px solid var(--track-brhsic)', padding: '1.5rem' }}>
            <span className="mono-tag" style={{ color: 'var(--track-brhsic)', background: 'var(--surface-strong)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>PILAR 03</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.75rem', color: 'var(--foreground)' }}>Pitch & Defesa Verbal</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
              Apresentação executiva em 5 minutos, respostas assertivas a questionamentos da banca examinadora e retórica.
            </p>
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
  const [activeTab, setActiveTab] = useState('fixacao');
  const [expandedId, setExpandedId] = useState(null);

  const exerciseSets = {
    fixacao: [
      { id: 'f1', module: 'Álgebra do Zero', difficulty: 'Fácil', title: 'Calculando Porcentagem Real em Descontos', question: 'Um produto de R$ 250,00 recebeu um desconto sucessivo de 10% e depois mais 5%. Qual o valor final pagos pelo comprador?', answer: 'Primeiro desconto: R$ 250 * 0,90 = R$ 225,00. Segundo desconto: R$ 225 * 0,95 = R$ 213,75. O desconto total acumulado foi de 14,5%.' },
      { id: 'f2', module: 'Matemática Financeira', difficulty: 'Médio', title: 'Equação de Fisher e Juros Reais', question: 'Se a taxa de juros nominal é de 12% ao ano e a inflação medida pelo IPCA foi de 4%, qual a rentabilidade real líquida aproximada?', answer: 'Usando a Equação de Fisher (1 + r_real) = (1 + r_nom) / (1 + i). (1,12 / 1,04) - 1 = 7,69% a.o. (Aproximação direta de 12% - 4% = 8% superestima a rentabilidade real).' }
    ],
    calculo: [
      { id: 'c1', module: 'Juros Compostos', difficulty: 'Médio', title: 'Aporte Mensal vs Capital Inicial', question: 'Um investimento inicial de R$ 1.000,00 aplicado a 1% ao mês durante 24 meses acumula quanto de juros absolutos?', answer: 'VF = VP * (1 + i)^n. VF = 1000 * (1,01)^24 = R$ 1.269,73. Juros absolutos acumulados: R$ 269,73.' }
    ],
    pbl: [
      { id: 'p1', module: 'Análise Fundamentalista', difficulty: 'Avançado', title: 'Estudo de Caso: Análise de Margem e ROIC da WEG (WEGE3)', question: 'Por que um ROIC consistente acima de 20% demonstra vantagem competitiva sustentável (Moat) em empresas industriais?', answer: 'O ROIC (Retorno sobre o Capital Investido) mede a eficiência da empresa em gerar lucro operacional com o capital total alocado por acionistas e credores. Quando o ROIC é sistematicamente maior que o custo de capital (WACC), a empresa cria valor econômico real (EVA).' }
    ]
  };

  return (
    <div>
      <section className="hero-gradient" style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: 'var(--market)', background: 'rgba(52, 211, 153, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
            Problem-Based Learning (PBL)
          </span>
          <EditableBlock id="ex-hero-title" as="h1" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.75rem' }}>
            Hub de Exercícios & Problemas Práticos
          </EditableBlock>
          <EditableBlock id="ex-hero-sub" as="p" style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '0.5rem' }}>
            Listas de fixação conceitual, cálculos financeiros passo a passo e resolução de casos reais.
          </EditableBlock>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3rem 1.5rem' }}>
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('fixacao')} className={`btn-primary ${activeTab === 'fixacao' ? '' : 'btn-secondary'}`} style={{ backgroundColor: activeTab === 'fixacao' ? 'var(--track-finance)' : undefined, color: activeTab === 'fixacao' ? '#0D1117' : undefined }}>
            Fixação Conceitual
          </button>
          <button onClick={() => setActiveTab('calculo')} className={`btn-primary ${activeTab === 'calculo' ? '' : 'btn-secondary'}`} style={{ backgroundColor: activeTab === 'calculo' ? 'var(--track-math)' : undefined, color: activeTab === 'calculo' ? '#0D1117' : undefined }}>
            Cálculo Financeiro
          </button>
          <button onClick={() => setActiveTab('pbl')} className={`btn-primary ${activeTab === 'pbl' ? '' : 'btn-secondary'}`} style={{ backgroundColor: activeTab === 'pbl' ? 'var(--gold-deep)' : undefined, color: activeTab === 'pbl' ? '#0D1117' : undefined }}>
            Casos Reais (PBL)
          </button>
        </div>

        {/* Exercises List */}
        <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
          {exerciseSets[activeTab].map((ex) => {
            const isExpanded = expandedId === ex.id;
            return (
              <article key={ex.id} className="tool-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="mono-tag" style={{ color: 'var(--track-finance)' }}>{ex.module}</span>
                  <span className="mono-tag" style={{ color: 'var(--gold)' }}>{ex.difficulty}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>{ex.title}</h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted-foreground)', marginBottom: '1.25rem' }}>{ex.question}</p>

                <button onClick={() => setExpandedId(isExpanded ? null : ex.id)} className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', color: 'var(--foreground)' }}>
                  {isExpanded ? 'Ocultar Resolução 👁️' : 'Ver Resolução Passo a Passo 👁️'}
                </button>

                {isExpanded && (
                  <div className="napkin-card" style={{ marginTop: '1rem', borderColor: 'var(--market)' }}>
                    <div className="mono-tag" style={{ color: 'var(--market)', marginBottom: '0.35rem', fontWeight: 700 }}>Gabarito & Explicação:</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>{ex.answer}</p>
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
      <section className="hero-gradient" style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'rgba(96, 165, 250, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(96, 165, 250, 0.3)' }}>
            Ferramenta Interativa
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.75rem' }}>
            Gerador de Cronograma Inteligente
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '0.5rem' }}>
            Calcule sua meta diária de estudos até a data limite da sua avaliação ou competição.
          </p>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
        <div className="tool-card" style={{ padding: '2rem' }}>
          <label className="mono-tag" style={{ color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem' }}>Selecione a Data Limite da Sua Meta:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '1rem', marginBottom: '2rem' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>Dias Disponíveis</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--foreground)' }}>{daysLeft} dias</div>
            </div>
            <div>
              <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>Meta Diária Recomendada</span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--market)' }}>~{lessonsPerDay} aulas/dia</div>
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
  const articles = [
    { title: 'Copom Mantém Taxa Selic: Como o Juro Nominal Afeta o CDB e o Tesouro Direto', date: '05 de Agosto, 2026', category: 'Macroeconomia', summary: 'Entenda a relação entre a decisão do Banco Central e o cálculo de rentabilidade real dos títulos públicos negociados por pessoas físicas.' },
    { title: 'Análise de Múltiplos e Margens Operacionais: O Caso da WEG no Mercado Global', date: '01 de Agosto, 2026', category: 'Equity Research', summary: 'Estudo de caso aplicando conceitos de ROIC, Margem Ebitda e múltiplos de Valuation na prática corporativa.' }
  ];

  return (
    <div>
      <section className="hero-gradient" style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: 'var(--gold)', background: 'rgba(251, 191, 36, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>Portal de Análises</span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.75rem' }}>Notícias & Macroeconomia Aplicada</h1>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {articles.map((art) => (
            <article key={art.title} className="module-card card-lift" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="mono-tag" style={{ color: 'var(--track-finance)' }}>{art.category}</span>
                <span className="mono-tag" style={{ color: 'var(--muted-foreground)' }}>{art.date}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>{art.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{art.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   5. PÁGINA SOBRE O PROJETO NIF DRAGÃO DO MAR
   ========================================================================== */
function Sobre() {
  return (
    <div>
      <section className="hero-gradient" style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="mono-tag" style={{ color: '#FFFFFF', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>Institucional</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF', marginTop: '1rem' }}>Brasil Finanças Atlas (BFA)</h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem', maxWidth: '700px' }}>
            Nascido no Núcleo de Inteligência Financeira (NIF) da escola pública EEMTI Dragão do Mar em Fortaleza, CE.
          </p>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '4rem 1.5rem', maxWidth: '850px' }}>
        <article className="tool-card" style={{ padding: '2rem', fontSize: '1rem', lineHeight: 1.7 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Nossa Missão</h2>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
            Universalizar o ensino de matemática aplicada e finanças de alto nível para estudantes do ensino médio em todo o Brasil, combinando rigor acadêmico com intuição prática.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>Principios do Projeto</h2>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>100% Gratuito e Aberto:</strong> Conteúdo pedagógico livre de qualquer mensalidade.</li>
            <li><strong>Intuição Antes da Fórmula:</strong> Explicações visuais claras antes dos desenvolvimentos algébricos.</li>
            <li><strong>Tecnologia Custo Zero:</strong> Arquitetura distribuída em Git, Cloudflare e Supabase para sustentabilidade permanente.</li>
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
