const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   1. PORTAL DE NOTÍCIAS DO MERCADO
   ========================================================================== */
function Noticias() {
  const { EXACT_CONTENT } = window;
  const { cmsData, isAuthenticated, inlineEditActive, addNews } = useContext(AdminContext || createContext({}));
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Modal State for News Publisher
  const [showAddModal, setShowAddModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Macroeconomia');
  const [newsReadTime, setNewsReadTime] = useState('4 min de leitura');
  const [newsAuthor, setNewsAuthor] = useState('NIF Dragão do Mar');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsFeatured, setNewsFeatured] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim()) return;

    if (addNews) {
      addNews({
        title: newsTitle.trim(),
        category: newsCategory,
        readTime: newsReadTime.trim() || '4 min de leitura',
        author: newsAuthor.trim() || 'NIF Dragão do Mar',
        summary: newsSummary.trim(),
        content: newsContent.trim() || newsSummary.trim(),
        featured: newsFeatured
      });
    }

    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsFeatured(false);
    setShowAddModal(false);
  };

  const defaultNews = [
    {
      id: "selic-e-o-estudante",
      title: "O que a taxa Selic alta muda para quem investe no ensino médio?",
      category: "Macroeconomia",
      date: "2026-08-01",
      readTime: "4 min de leitura",
      author: "NIF Dragão do Mar",
      featured: true,
      summary: "Entenda por que juros mais altos favorecem quem está começando na renda fixa como Tesouro Selic e CDB de liquidez diária.",
      content: `## O que aconteceu?\nO Banco Central mantém a taxa Selic em patamares que favorecem aplicações de renda fixa no Brasil.\n\n## Que conceito da trilha aparece aqui?\nNo **Módulo 2 de Matemática** e **Módulo 1 de Finanças**, aprendemos que a Selic é a taxa básica de juros da economia.\n\n## Quem ganha e quem perde?\n- **Ganha:** Quem tem dinheiro guardado em investimentos pós-fixados.\n- **Perde:** Quem precisa de empréstimo ou financiamento.`
    },
    {
      id: "brhsic-2026-dicas",
      title: "BRHSIC 2026: Guia prático de Valuation para a competição",
      category: "Competição",
      date: "2026-07-25",
      readTime: "6 min de leitura",
      author: "Equipe BFA",
      featured: false,
      summary: "Confira como utilizar o Módulo 2 de Finanças do BFA na preparação do seu relatório de Equity Research.",
      content: "Dicas completas de análise fundamentalista..."
    },
    {
      id: "analise-weg-2026",
      title: "Análise Fundamentalista na prática: O caso WEG (WEGE3)",
      category: "Análise de Empresas",
      date: "2026-07-18",
      readTime: "5 min de leitura",
      author: "Professores NIF",
      featured: false,
      summary: "Por que a WEG é um exemplo clássico de alta rentabilidade (ROE elevado) e reinvestimento eficiente.",
      content: "Estudo de caso WEGE3..."
    }
  ];

  const allNews = cmsData && cmsData.news && cmsData.news.length > 0 ? cmsData.news : defaultNews;
  const categories = ['Todas', 'Macroeconomia', 'Competição', 'Análise de Empresas', 'Investimentos'];

  const filteredNews = selectedCategory === 'Todas' 
    ? allNews 
    : allNews.filter(n => n.category === selectedCategory || n.categoria === selectedCategory);

  const featuredItem = allNews.find(n => n.featured) || allNews[0];

  return (
    <div className="bfa-section">
      <div className="bfa-section__container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <EditableBlock id="noticias-badge-tag" as="span" className="bfa-badge bfa-badge--ouro" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="news" size={14} color="var(--color-ouro-dark)" /> Conexão com o Mercado Real
          </EditableBlock>
          <EditableBlock id="noticias-header-title" as="h1" className="bfa-section__title">
            Portal de Notícias & Análises
          </EditableBlock>
          <EditableBlock id="noticias-header-subtitle" as="p" className="bfa-section__subtitle">
            Artigos semanais conectando a teoria das trilhas aos acontecimentos do mundo financeiro
          </EditableBlock>

          {isAuthenticated && inlineEditActive && (
            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ouro"
                onClick={() => setShowAddModal(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <BfaIcon name="pencil" size={16} /> ➕ Publicar Nova Notícia / Artigo (Admin)
              </button>
            </div>
          )}
        </div>

        {/* Featured Article Hero Card */}
        {featuredItem && (
          <div className="bfa-card" style={{ padding: '2.5rem', marginBottom: '3rem', background: 'linear-gradient(135deg, #0F243C 0%, #1B3A5C 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <EditableBlock id="noticias-featured-tag" as="span" className="bfa-badge bfa-badge--ouro">
                Destaque da Semana
              </EditableBlock>
              <span style={{ fontSize: '0.85rem', color: '#CBD5E1', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <BfaIcon name="calendar" size={14} color="#CBD5E1" /> {featuredItem.date || featuredItem.data}
              </span>
            </div>
            <EditableBlock id={`noticias-feat-${featuredItem.id}-title`} as="h2" style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
              {featuredItem.title || featuredItem.titulo}
            </EditableBlock>
            <EditableBlock id={`noticias-feat-${featuredItem.id}-summary`} as="p" style={{ fontSize: '1.1rem', color: '#E2E8F0', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: 1.6 }}>
              {featuredItem.summary || featuredItem.resumo}
            </EditableBlock>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <BfaIcon name="author" size={14} color="#94A3B8" /> Por {featuredItem.author || featuredItem.autor || 'NIF Dragão do Mar'} • <BfaIcon name="clock" size={14} color="#94A3B8" /> {featuredItem.readTime || featuredItem.tempoLeitura || '5 min'}
              </span>
              <a href="#/noticias" className="bfa-btn bfa-btn--ouro">
                Ler Artigo Completo ➔
              </a>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`bfa-btn bfa-btn--sm ${selectedCategory === cat ? 'bfa-btn--azul' : 'bfa-btn--ghost'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="bfa-subject-grid">
          {filteredNews.map((item) => (
            <div key={item.id} className="bfa-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="bfa-badge bfa-badge--azul">{item.category || item.categoria || 'Mercado'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date || item.data}</span>
              </div>
              <EditableBlock id={`noticia-${item.id}-title`} as="h3" className="bfa-card__title" style={{ fontSize: '1.2rem' }}>
                {item.title || item.titulo}
              </EditableBlock>
              <EditableBlock id={`noticia-${item.id}-summary`} as="p" className="bfa-card__text" style={{ fontSize: '0.9rem' }}>
                {item.summary || item.resumo}
              </EditableBlock>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <BfaIcon name="user" size={14} color="var(--text-secondary)" /> {item.author || item.autor || 'Equipe BFA'}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-azul)' }}>Ler ➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin News Publisher Modal */}
      {showAddModal && (
        <div className="bfa-inline-editor-modal" onClick={() => setShowAddModal(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="news" size={20} color="var(--color-azul)" /> Publicar Novo Artigo / Notícia (Modo Admin)
            </h3>

            <form onSubmit={handlePublish}>
              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Título do Artigo:</label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={e => setNewsTitle(e.target.value)}
                  placeholder="Ex: O impacto do corte da Selic nos fundos imobiliários"
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.65rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Categoria:</label>
                  <select value={newsCategory} onChange={e => setNewsCategory(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.55rem' }}>
                    <option value="Macroeconomia">Macroeconomia</option>
                    <option value="Competição">Competição</option>
                    <option value="Análise de Empresas">Análise de Empresas</option>
                    <option value="Investimentos">Investimentos</option>
                    <option value="Educação Financeira">Educação Financeira</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Tempo de Leitura:</label>
                  <input type="text" value={newsReadTime} onChange={e => setNewsReadTime(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.55rem' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Autor:</label>
                  <input type="text" value={newsAuthor} onChange={e => setNewsAuthor(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.55rem' }} />
                </div>
              </div>

              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Resumo Curto:</label>
                <textarea
                  rows="2"
                  value={newsSummary}
                  onChange={e => setNewsSummary(e.target.value)}
                  placeholder="Síntese de 2 linhas para exibição nos cards..."
                  className="bfa-textarea"
                  style={{ width: '100%', padding: '0.65rem' }}
                  required
                ></textarea>
              </div>

              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Conteúdo Completo (Markdown):</label>
                <textarea
                  rows="6"
                  value={newsContent}
                  onChange={e => setNewsContent(e.target.value)}
                  placeholder="Escreva o artigo completo utilizando formatação Markdown..."
                  className="bfa-textarea"
                  style={{ width: '100%', padding: '0.65rem', fontFamily: 'var(--font-mono)' }}
                ></textarea>
              </div>

              <div className="bfa-form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newsFeatured}
                    onChange={e => setNewsFeatured(e.target.checked)}
                  />
                  Marcar como Destaque da Semana (Hero Banner)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="bfa-btn bfa-btn--ghost" onClick={() => setShowAddModal(false)}>Cancelar</button>
                <button type="submit" className="bfa-btn bfa-btn--verde" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Publicar Notícia <BfaIcon name="save" size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   2. HUB DE EXERCÍCIOS E PBLS
   ========================================================================== */
function Exercicios() {
  const [activeTab, setActiveTab] = useState('fixacao');
  const [expandedId, setExpandedId] = useState(null);

  const exerciseSets = {
    fixacao: [
      { id: "e1", title: "Operações Básicas & Decimais", module: "Matemática M1", difficulty: "Fácil", qCount: 5, question: "Quanto representa R$ 150 com acréscimo de 18%?", answer: "R$ 150 × 1,18 = R$ 177,00" },
      { id: "e2", title: "Conversão de Fração em Porcentagem", module: "Matemática M1", difficulty: "Fácil", qCount: 5, question: "Converta a fração 7/20 para formato percentual.", answer: "7 ÷ 20 = 0,35 = 35%" },
      { id: "e3", title: "Diferença entre Porcentagem e Ponto Percentual", module: "Matemática M1", difficulty: "Médio", qCount: 5, question: "Se a Selic varia de 8% para 10%, qual a variação em porcentagem e em pontos percentuais?", answer: "Variação em pontos percentuais: 10 - 8 = +2 pp. Variação em porcentagem: 2 / 8 = 25% de aumento relativo." }
    ],
    calculo: [
      { id: "e4", title: "Cálculo de Juros Compostos em Longo Prazo", module: "Matemática M2", difficulty: "Médio", qCount: 3, question: "R$ 2.000 aplicados a 12% a.a. por 5 anos em juros compostos acumulam quanto?", answer: "VF = 2000 × (1,12)⁵ ≈ R$ 3.524,68" },
      { id: "e5", title: "Rentabilidade Real descontando Inflação (Equação de Fisher)", module: "Matemática M2", difficulty: "Avançado", qCount: 3, question: "Um investimento rendeu 15% em um ano com inflação (IPCA) de 6%. Qual a taxa real de juros?", answer: "(1 + 0,15) / (1 + 0,06) - 1 = 1,15 / 1,06 - 1 ≈ 8,49% real" }
    ],
    pbl: [
      { id: "e6", title: "Estudo de Caso: Reserva de Emergência de João", module: "Finanças M1", difficulty: "Prático", qCount: 1, question: "João guarda R$ 5.000 na poupança. A taxa Selic está em 13,25%. O que ele deve fazer?", answer: "Migrar para Tesouro Selic ou CDB com 100% do CDI com liquidez diária. A poupança perde significativamente para a taxa Selic alta." }
    ]
  };

  return (
    <div className="bfa-section">
      <div className="bfa-section__container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <EditableBlock id="exercicios-badge-tag" as="span" className="bfa-badge bfa-badge--verde" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="pencil" size={14} color="var(--color-verde-dark)" /> Treino & Resolução Passo a Passo
          </EditableBlock>
          <EditableBlock id="exercicios-header-title" as="h1" className="bfa-section__title">
            Hub de Exercícios & Problemas (PBL)
          </EditableBlock>
          <EditableBlock id="exercicios-header-subtitle" as="p" className="bfa-section__subtitle">
            Listas de fixação, questões de cálculo financeiro e casos reais para você dominar a matéria
          </EditableBlock>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('fixacao')}
            className={`bfa-btn ${activeTab === 'fixacao' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <BfaIcon name="pin" size={16} /> <EditableBlock id="exercicios-tab-fixacao" as="span">Fixação (Conceitos)</EditableBlock>
          </button>
          <button
            onClick={() => setActiveTab('calculo')}
            className={`bfa-btn ${activeTab === 'calculo' ? 'bfa-btn--azul' : 'bfa-btn--ghost'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <BfaIcon name="calculator" size={16} /> <EditableBlock id="exercicios-tab-calculo" as="span">Cálculo Financeiro</EditableBlock>
          </button>
          <button
            onClick={() => setActiveTab('pbl')}
            className={`bfa-btn ${activeTab === 'pbl' ? 'bfa-btn--ouro' : 'bfa-btn--ghost'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <BfaIcon name="globe" size={16} /> <EditableBlock id="exercicios-tab-pbl" as="span">Casos Reais (PBL)</EditableBlock>
          </button>
        </div>

        {/* Exercises Accordion Grid */}
        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {exerciseSets[activeTab].map((ex) => {
            const isExpanded = expandedId === ex.id;
            return (
              <div key={ex.id} className="bfa-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="bfa-badge bfa-badge--verde">{ex.module}</span>
                  <span className="bfa-badge bfa-badge--ouro">{ex.difficulty}</span>
                </div>
                <EditableBlock id={`ex-${ex.id}-title`} as="h3" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '0.75rem' }}>
                  {ex.title}
                </EditableBlock>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <strong>Pergunta:</strong> <EditableBlock id={`ex-${ex.id}-question`} as="span">{ex.question}</EditableBlock>
                </p>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {isExpanded ? (
                    <><BfaIcon name="eyeOff" size={14} /> Ocultar Gabarito</>
                  ) : (
                    <><BfaIcon name="eye" size={14} /> Ver Resolução Passo a Passo</>
                  )}
                </button>

                {isExpanded && (
                  <div className="bfa-admonition bfa-admonition--tip" style={{ marginTop: '1rem' }}>
                    <div className="bfa-admonition__title">Gabarito & Explicação:</div>
                    <EditableBlock id={`ex-${ex.id}-answer`} as="p" style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-verde-dark)' }}>
                      {ex.answer}
                    </EditableBlock>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   3. PAINEL DE CRONOGRAMA DE ESTUDOS INTERATIVO
   ========================================================================== */
function Cronograma() {
  const [deadline, setDeadline] = useState('2026-11-30');
  const [subjects, setSubjects] = useState({ mat: true, fin: true });
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    // Generate default initial schedule
    const sel = ["Matemática Aplicada a Finanças", "Finanças & Investimentos"];
    if (window.generateSchedule) {
      setScheduleData(window.generateSchedule(deadline, sel));
    }
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();
    const sel = [];
    if (subjects.mat) sel.push("Matemática Aplicada a Finanças");
    if (subjects.fin) sel.push("Finanças & Investimentos");

    const result = window.generateSchedule ? window.generateSchedule(deadline, sel) : null;
    setScheduleData(result);
  };

  return (
    <div className="bfa-section">
      <div className="bfa-section__container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <EditableBlock id="cronograma-badge-tag" as="span" className="bfa-badge bfa-badge--azul" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="calendar" size={14} color="var(--color-azul-dark)" /> Planejamento Inteligente
          </EditableBlock>
          <EditableBlock id="cronograma-header-title" as="h1" className="bfa-section__title">
            Gerador de Cronograma de Estudos
          </EditableBlock>
          <EditableBlock id="cronograma-header-subtitle" as="p" className="bfa-section__subtitle">
            Insira sua data limite e o sistema gera automaticamente uma distribuição equilibrada de aulas
          </EditableBlock>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Controls Card */}
          <div className="bfa-card" style={{ padding: '2rem' }}>
            <EditableBlock id="cronograma-card-params-title" as="h3" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="gear" size={20} color="var(--color-azul)" /> Parâmetros do Seu Plano
            </EditableBlock>
            <form onSubmit={handleGenerate}>
              <div className="bfa-form-group">
                <EditableBlock id="cronograma-label-deadline" as="label" style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Data Limite de Conclusão:
                </EditableBlock>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              <div className="bfa-form-group" style={{ margin: '1.5rem 0' }}>
                <EditableBlock id="cronograma-label-subjects" as="label" style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Trilhas Desejadas:
                </EditableBlock>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <input
                      type="checkbox"
                      checked={subjects.mat}
                      onChange={(e) => setSubjects({ ...subjects, mat: e.target.checked })}
                    />
                    <BfaIcon name="math" size={16} color="var(--color-verde)" /> Matemática Aplicada (4 Módulos)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <input
                      type="checkbox"
                      checked={subjects.fin}
                      onChange={(e) => setSubjects({ ...subjects, fin: e.target.checked })}
                    />
                    <BfaIcon name="finance" size={16} color="var(--color-azul)" /> Finanças & Investimentos (3 Módulos)
                  </label>
                </div>
              </div>

              <button type="submit" className="bfa-btn bfa-btn--verde bfa-btn--block" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <BfaIcon name="zap" size={16} /> Recalcular Cronograma
              </button>
            </form>
          </div>

          {/* Stats Summary Card */}
          {scheduleData && (
            <div className="bfa-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, #1B3A5C 0%, #0F243C 100%)', color: '#FFFFFF' }}>
              <EditableBlock id="cronograma-stats-card-title" as="h3" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BfaIcon name="chart" size={20} color="#FDE68A" /> Resumo da Sua Meta
              </EditableBlock>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#FDE68A', display: 'block' }}>{scheduleData.totalDays}</span>
                  <EditableBlock id="cronograma-stat-days-label" as="span" style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Dias Disponíveis</EditableBlock>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7', display: 'block' }}>{scheduleData.totalSubjects}</span>
                  <EditableBlock id="cronograma-stat-trilhas-label" as="span" style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Trilhas Ativas</EditableBlock>
                </div>
              </div>

              <EditableBlock id="cronograma-stats-desc" as="p" style={{ fontSize: '0.9rem', color: '#E2E8F0', lineHeight: 1.6 }}>
                Estudar com regularidade diária garante absorção de longo prazo sem sobrecarregar a rotina escolar.
              </EditableBlock>
            </div>
          )}
        </div>

        {/* Schedule Timetable */}
        {scheduleData && (
          <div className="bfa-card" style={{ padding: '2rem' }}>
            <EditableBlock id="cronograma-table-title" as="h3" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="paper" size={20} color="var(--color-azul)" /> Tabela Diária de Estudos
            </EditableBlock>
            <div style={{ overflowX: 'auto' }}>
              <table className="bfa-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--color-slate-100)', textAlign: 'left' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Dia</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Data</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Dia da Semana</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Foco do Estudo</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.schedule.slice(0, 20).map((row) => (
                    <tr key={row.dayIndex} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Dia {row.dayIndex}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>{row.date}</td>
                      <td style={{ padding: '0.85rem 1rem', textTransform: 'capitalize' }}>{row.dayOfWeek}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="bfa-badge bfa-badge--verde">{row.subject}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   4. PORTAL DE PREPARAÇÃO BRHSIC
   ========================================================================== */
function BrhsicPage() {
  return (
    <div className="bfa-section">
      <div className="bfa-section__container">
        {/* Banner */}
        <div className="bfa-card" style={{ padding: '3rem', background: 'linear-gradient(135deg, #C8963E 0%, #976F2B 100%)', color: '#FFFFFF', textAlign: 'center', marginBottom: '3rem', border: 'none', borderRadius: 'var(--radius-xl)' }}>
          <EditableBlock id="brhsic-banner-badge" as="span" className="bfa-badge" style={{ background: '#FFFFFF', color: '#976F2B', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="trophy" size={14} color="#976F2B" /> Maior Competição de Investimentos do Ensino Médio
          </EditableBlock>
          <EditableBlock id="brhsic-banner-title" as="h1" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
            Trilha Especial de Preparação BRHSIC
          </EditableBlock>
          <EditableBlock id="brhsic-banner-text" as="p" style={{ fontSize: '1.15rem', color: '#FDF6EC', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            Treino direcionado para a competição nacional: elaboração do relatório de Equity Research, valuation e apresentação de pitch para a banca examinadora.
          </EditableBlock>
        </div>

        {/* 3 Pillars Grid */}
        <EditableBlock id="brhsic-pillars-title" as="h2" className="bfa-section__title">
          Os 3 Pilares da Competição
        </EditableBlock>
        <EditableBlock id="brhsic-pillars-subtitle" as="p" className="bfa-section__subtitle">
          Como as trilhas do BFA cobrem exatamente o conteúdo exigido
        </EditableBlock>

        <div className="bfa-steps-grid" style={{ marginBottom: '3rem' }}>
          <div className="bfa-step-card">
            <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-ouro-light)' }}>
              <BfaIcon name="paper" size={26} color="var(--color-ouro-dark)" />
            </span>
            <EditableBlock id="brhsic-step1-title" as="h4">1. Relatório de Análise (Equity Research)</EditableBlock>
            <EditableBlock id="brhsic-step1-text" as="p">Análise setorial, vantagem competitiva (moat), tese de investimento e recomendação (Compra/Venda).</EditableBlock>
          </div>

          <div className="bfa-step-card">
            <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-azul-light)' }}>
              <BfaIcon name="chart" size={26} color="var(--color-azul)" />
            </span>
            <EditableBlock id="brhsic-step2-title" as="h4">2. Valuation (DCF & Múltiplos)</EditableBlock>
            <EditableBlock id="brhsic-step2-text" as="p">Modelagem de Fluxo de Caixa Descontado e comparação de múltiplos (P/L, EV/EBITDA, P/VP) ensinados no Módulo 2 de Finanças.</EditableBlock>
          </div>

          <div className="bfa-step-card">
            <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-verde-light)' }}>
              <BfaIcon name="mic" size={26} color="var(--color-verde)" />
            </span>
            <EditableBlock id="brhsic-step3-title" as="h4">3. Pitch para a Banca</EditableBlock>
            <EditableBlock id="brhsic-step3-text" as="p">Apresentação oral de 5 minutos sintetizando os principais riscos e catalisadores da empresa analisada.</EditableBlock>
          </div>
        </div>

        {/* Roadmap Card */}
        <div className="bfa-napkin-card">
          <EditableBlock id="brhsic-napkin-tag" as="span" className="bfa-napkin-card__tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="lightbulb" size={14} color="#FFFFFF" /> Atalho de Estudo
          </EditableBlock>
          <EditableBlock id="brhsic-napkin-title" as="div" className="bfa-napkin-card__title">
            Caminho de Preparação Recomendado
          </EditableBlock>
          <EditableBlock id="brhsic-napkin-text" as="p" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Comece concluindo o Módulo 2 de Finanças (Análise Fundamentalista). Todas as aulas sobre Balanço Patrimonial, DRE, Fluxo de Caixa e Valuation por DCF possuem formulários e exemplos diretamente aplicáveis ao modelo de relatório da BRHSIC.
          </EditableBlock>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. PÁGINA SOBRE O BFA (INSTITUCIONAL)
   ========================================================================== */
function Sobre() {
  return (
    <div className="bfa-section">
      <div className="bfa-section__container">
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <EditableBlock id="sobre-hero-badge" as="span" className="bfa-badge bfa-badge--verde" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="mapPin" size={14} color="var(--color-verde-dark)" /> NIF Dragão do Mar — Fortaleza, CE
          </EditableBlock>
          <EditableBlock id="sobre-hero-title" as="h1" className="bfa-section__title">
            Nossa História & Propósito
          </EditableBlock>
          <EditableBlock id="sobre-hero-subtitle" as="p" className="bfa-section__subtitle">
            Conheça a origem do Brasil Finanças Atlas e como estamos democratizando o conhecimento sobre dinheiro
          </EditableBlock>
        </div>

        {/* Narrative Card */}
        <div className="bfa-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
          <EditableBlock id="sobre-narrative-title" as="h2" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1.25rem' }}>
            Por que o Brasil Finanças Atlas nasceu?
          </EditableBlock>
          <EditableBlock id="sobre-narrative-p1" as="p" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            O Brasil Finanças Atlas (BFA) nasceu no Núcleo de Inteligência Financeira (NIF) da escola pública Dragão do Mar, em Fortaleza. A ideia central é simples: o conhecimento que prepara alguém para cuidar do próprio dinheiro — e competir de igual para igual em olimpíadas de investimentos — não deveria depender de escola particular cara.
          </EditableBlock>
          <EditableBlock id="sobre-narrative-p2" as="p" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Criamos uma plataforma 100% gratuita, sem jargões de banco e dividida em módulos progressivos que começam do zero absoluto da matemática básica até a análise completa de empresas negociadas na B3.
          </EditableBlock>
        </div>

        {/* Methodology Pillars */}
        <EditableBlock id="sobre-principles-title" as="h2" className="bfa-section__title">
          Nossos Princípios Pedagógicos
        </EditableBlock>
        <div className="bfa-steps-grid">
          <div className="bfa-step-card">
            <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-ouro-light)' }}>
              <BfaIcon name="lightbulb" size={26} color="var(--color-ouro-dark)" />
            </span>
            <EditableBlock id="sobre-step1-title" as="h4">Intuição em Primeiro Lugar</EditableBlock>
            <EditableBlock id="sobre-step1-text" as="p">Usamos a metodologia Napkin Finance para que o aluno compreenda o conceito visualmente antes de ver qualquer fórmula complexa.</EditableBlock>
          </div>

          <div className="bfa-step-card">
            <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-verde-light)' }}>
              <BfaIcon name="ruler" size={26} color="var(--color-verde)" />
            </span>
            <EditableBlock id="sobre-step2-title" as="h4">Matemática Sem Travar</EditableBlock>
            <EditableBlock id="sobre-step2-text" as="p">Não estudamos matemática por matemática. Cada conceito existe para resolver um problema financeiro da vida real.</EditableBlock>
          </div>

          <div className="bfa-step-card">
            <span className="bfa-step-card__icon" style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: 'var(--color-azul-light)' }}>
              <BfaIcon name="globe" size={26} color="var(--color-azul)" />
            </span>
            <EditableBlock id="sobre-step3-title" as="h4">Totalmente Aberto</EditableBlock>
            <EditableBlock id="sobre-step3-text" as="p">Material público, sem mensalidade, sem pegadinhas e com acesso irrestrito para estudantes e professores do Brasil inteiro.</EditableBlock>
          </div>
        </div>

      </div>
    </div>
  );
}

