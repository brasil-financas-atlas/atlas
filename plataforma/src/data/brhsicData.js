// C:\codigos\bfa-main\plataforma\src\data\brhsicData.js
// Conteúdo de Preparação para a Competição BRHSIC (Brazilian High School Investment Competition)

window.brhsicData = {
  titulo: "Preparação para a BRHSIC 2024",
  subtitulo: "Guia completo de Equity Research, estrutura de relatório, critérios de avaliação e dicas de apresentação para a maior competição de investimentos do ensino médio do Brasil.",
  edicaoAtual: "BRHSIC 2024",
  organizacao: "BFA Platform / NIF",
  cronograma: [
    { fase: "Inscrições e Abertura", data: "Maio de 2024", descricao: "Divulgação dos casos e empresas elegíveis para a cobertura." },
    { fase: "Entrega do Relatório (Equity Report)", data: "Julho de 2024", descricao: "Submissão do relatório impresso/digital completo em PDF." },
    { fase: "Divulgação dos Finalistas", data: "Agosto de 2024", descricao: "Anúncio das 10 melhores equipes selecionadas pela banca técnica." },
    { fase: "Final Presencial & Pitch Presentation", data: "Setembro de 2024", descricao: "Apresentação oral de 10 min + 10 min de perguntas e respostas perante a banca de jurados." }
  ],
  estruturaRelatorio: [
    {
      secao: "1. Resumo Executivo & Recomendação",
      conteudo: "Ticker, Preço Atual, Preço-Alvo (Target Price), Upside/Downside esperado %, Recomendação (COMPRA, MANUTENÇÃO ou VENDA) e principais pilares da tese."
    },
    {
      secao: "2. Visão Qualitativa & Modelo de Negócio",
      conteudo: "Descrição detalhada do modelo de receita, posicionamento de mercado, análise de vantagens competitivas (moat) e forças de Porter."
    },
    {
      secao: "3. Análise Setorial & Macroeconomia",
      conteudo: "Dinâmica da indústria, concorrência, regulação e sensibilidade do negócio a variáveis macroeconômicas (Selic, Câmbio, Inflação)."
    },
    {
      secao: "4. Desempenho Financeiro Histórico",
      conteudo: "Diagnóstico evolutivo de DRE, Balanço e DFC. Análise de margens (bruta, EBIT, líquida), rentabilidade (ROE/ROA) e endividamento (Dívida Líquida/EBITDA)."
    },
    {
      secao: "5. Valuation & Modelagem",
      conteudo: "Modelagem por Fluxo de Caixa Descontado (FCD) detalhando WACC, FCL e Perpetuidade, combinada com Valuation por Múltiplos Comparáveis (P/L, EV/EBITDA, P/VP)."
    },
    {
      secao: "6. Principais Riscos & Análise de Sensibilidade",
      conteudo: "Identificação dos riscos operacionais, regulatórios e financeiros. Tabela de sensibilidade do preço-alvo a variações na taxa de desconto e crescimento."
    }
  ],
  criteriosAvaliacao: [
    { criterio: "Rigor Analítico e Financeiro", peso: "30%", detalhe: "Coerência dos cálculos, exatidão dos indicadores e profundidade da análise das demonstrações." },
    { criterio: "Consistência da Tese de Investimento", peso: "25%", detalhe: "Alinhamento lógico entre o diagnóstico qualitativo do negócio e o valuation atingido." },
    { criterio: "Qualidade do Valuation (FCD e Múltiplos)", peso: "25%", detalhe: "Defesa técnica embasada das premissas de crescimento, margens e taxa de desconto (WACC)." },
    { criterio: "Apresentação Visual e Redação", peso: "10%", detalhe: "Clareza, formatação profissional, tabelas limpas e linguagem técnica adequada." },
    { criterio: "Defesa Oral (Somente Finalistas)", peso: "10%", detalhe: "Domínio técnico, capacidade de resposta a questionamentos da banca e oratória." }
  ],
  dicasPitch: [
    "Comece direto pelo 'Bottom Line': informe imediatamente o Preço-Alvo, a cotação atual e a sua recomendação clara de compra/venda.",
    "Contem uma história coerente (Equity Story): conecte os diferenciais qualitativos da empresa diretamente com a geração de fluxo de caixa futuro.",
    "Conheça todas as premissas do seu FCD de cor: saiba explicar exatamente por que escolheu determinada taxa de desconto ou taxa de crescimento na perpetuidade.",
    "Divida a fala entre todos os membros da equipe de forma equilibrada.",
    "Nunca invente uma resposta perante a banca: se não souber um dado específico, admita com profissionalismo e explique como investigaria."
  ]
};

// brhsicData;
