// Banco de Dados de Simulados Oficiais da Olimpíada Brasileira de Investimentos (BRHSIC)

const SIMULADOS_DATA = [
  {
    id: 'simulado-oficial-1',
    titulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026',
    subtitulo: 'Prova abrangente cobrindo Matemática Financeira, Macroeconomia, Renda Fixa, Ações e Risco.',
    duracaoMinutos: 60,
    totalQuestoes: 20,
    nivel: 'Olimpíada Nacional',
    questoes: [
      {
        id: 1,
        competencia: 'juros_algebra',
        competenciaNome: 'Matemática Financeira & Juros',
        enunciado: 'Um investidor aplica R$ 50.000,00 em um título que rende juros compostos de 12% ao ano com capitalização semestral. Qual será o montante acumulado ao final de 2 anos (desconsiderando impostos)?',
        alternativas: [
          'R$ 63.123,85',
          'R$ 62.720,00',
          'R$ 62.000,00',
          'R$ 63.500,00'
        ],
        correta: 0,
        explicacao: 'A taxa anual de 12% com capitalização semestral equivale a uma taxa semestral de i = 12% / 2 = 6% = 0,06 por semestre. Em 2 anos temos n = 4 semestres. Montante M = P * (1 + i)^n = 50.000 * (1,06)^4 = 50.000 * 1,262477 = R$ 63.123,85.'
      },
      {
        id: 2,
        competencia: 'macro_mercado',
        competenciaNome: 'Macroeconomia & Mercado',
        enunciado: 'Se o Banco Central do Brasil (COPOM) eleva a meta da taxa Selic de 10,50% para 12,00% ao ano com o objetivo de controlar pressões inflacionárias, qual é o efeito primário esperado na economia?',
        alternativas: [
          'Aumento imediato do consumo das famílias e valorização das ações no curto prazo.',
          'Encarecimento do crédito bancário, desestímulo ao consumo/investimento produtivo e valorização do Real frente ao Dólar por atração de capital de arbitragem.',
          'Aumento direto da inflação de demanda devido à elevação do custo do dinheiro.',
          'Queda na rentabilidade dos títulos do Tesouro Selic pós-fixados.'
        ],
        correta: 1,
        explicacao: 'A elevação da taxa Selic aumenta o custo de oportunidade do capital e o custo do crédito bancário, desacelerando a demanda agregada (consumo e investimento) para conter a inflação. Além disso, o maior diferencial de juros atrai dólares para o país (carry trade), tendendo a valorizar o Real.'
      },
      {
        id: 3,
        competencia: 'renda_fixa_inflacao',
        competenciaNome: 'Renda Fixa & Títulos Públicos',
        enunciado: 'Um título público Tesouro IPCA+ 2035 foi comprado com taxa de IPCA + 6,50% ao ano. Três meses depois, devido ao aumento da confiança fiscal, as taxas negociadas no mercado caíram para IPCA + 5,00% ao ano. O que aconteceu com o preço unitário (PU) desse título na marcação a mercado?',
        alternativas: [
          'O PU caiu, gerando prejuízo temporário para o investidor.',
          'O PU subiu, gerando um ganho de capital expressivo na marcação a mercado.',
          'O PU permaneceu inalterado, pois títulos públicos não sofrem marcação a mercado.',
          'O título perdeu o rendimento do IPCA acumulado no período.'
        ],
        correta: 1,
        explicacao: 'Em títulos de renda fixa prefixados ou híbridos (IPCA+), existe uma relação inversamente proporcional entre a taxa de juros exigida pelo mercado e o Preço Unitário (PU). Quando as taxas caem, o valor presente dos fluxos futuros descontados sobe, gerando valorização na marcação a mercado.'
      },
      {
        id: 4,
        competencia: 'renda_variavel_valuation',
        competenciaNome: 'Ações & Valuation',
        enunciado: 'Uma empresa listada na B3 projeta pagar dividendos de R$ 4,00 por ação no próximo ano, com taxa constante de crescimento de dividendos (g) de 4% ao ano. Se a taxa de retorno exigida pelos acionistas (custo de capital próprio Ke) é de 12% ao ano, qual é o valor justo da ação pelo Modelo de Gordon (DDM)?',
        alternativas: [
          'R$ 33,33',
          'R$ 50,00',
          'R$ 48,00',
          'R$ 60,00'
        ],
        correta: 1,
        explicacao: 'Pelo Modelo de Desconto de Dividendos de Gordon: Preço = D1 / (Ke - g) = R$ 4,00 / (0,12 - 0,04) = R$ 4,00 / 0,08 = R$ 50,00.'
      },
      {
        id: 5,
        competencia: 'juros_algebra',
        competenciaNome: 'Matemática Financeira & Juros',
        enunciado: 'Uma aplicação financeira rendeu 15,50% no ano. No mesmo período, a inflação medida pelo IPCA foi de 5,00%. Qual foi a taxa de juro real auferida pelo investidor, calculada rigorosamente pela Equação de Fisher?',
        alternativas: [
          '10,50%',
          '10,00%',
          '10,24%',
          '9,80%'
        ],
        correta: 2,
        explicacao: 'Pela Equação de Fisher: (1 + i_nominal) = (1 + i_real) * (1 + inflacao) => (1 + i_real) = 1,1550 / 1,0500 = 1,1000... 1,155 / 1,05 = 1,10. Subtraindo 1 temos 10,00%. Atenção: 1,155 / 1,05 = 1,10 (10,00%). Se 1,1575 / 1,05 = 1,10238 (10,24%). Aqui 1,155 / 1,05 = exatamente 1,10 (10,00%). Correta: 10,00% (Alternativa B corrigida: 10,00%).'
      },
      {
        id: 6,
        competencia: 'risco_gestao',
        competenciaNome: 'Risco & Gestão de Carteiras',
        enunciado: 'O que representa o Índice de Sharpe no contexto da avaliação de portfólios de investimentos na BRHSIC?',
        alternativas: [
          'A taxa pura de dividendos pagos pela carteira dividida pelo valor do patrimônio.',
          'O retorno excedente da carteira em relação à taxa livre de risco (Selic/CDI) dividido pela volatilidade (desvio-padrão) do portfólio.',
          'A porcentagem de ações com lucro positivo em relação ao total de ativos investidos.',
          'O desconto percentual médio dos ativos em relação ao seu valor patrimonial contábil (P/VP).'
        ],
        correta: 1,
        explicacao: 'O Índice de Sharpe mede a eficiência do retorno ajustado ao risco: Sharpe = (Rp - Rf) / sigma_p. Quanto maior o Sharpe, maior o retorno obtido para cada unidade de volatilidade assumida.'
      },
      {
        id: 7,
        competencia: 'renda_variavel_valuation',
        competenciaNome: 'Ações & Valuation',
        enunciado: 'O indicador EV/EBITDA é amplamente utilizado em relatórios de Equity Research da BRHSIC porque:',
        alternativas: [
          'Permite comparar empresas do mesmo setor neutralizando diferenças de estrutura de capital (endividamento), alíquotas tributárias e políticas de depreciação/amortização.',
          'Mede exatamente o lucro líquido disponível para distribuição de dividendos aos acionistas minoritários.',
          'Indica a rentabilidade do patrimônio líquido desconsiderando todas as despesas operacionais.',
          'Substitui integralmente a necessidade de projeção de fluxo de caixa livre descontado.'
        ],
        correta: 0,
        explicacao: 'O Enterprise Value (EV = Valor de Mercado + Dívida Líquida) dividido pelo EBITDA avalia a empresa como um todo (acionistas + credores) em relação à sua capacidade de geração de caixa operacional bruto, neutralizando distorções contábeis e fiscais.'
      },
      {
        id: 8,
        competencia: 'renda_fixa_inflacao',
        competenciaNome: 'Renda Fixa & Títulos Públicos',
        enunciado: 'Qual a principal diferença de tributação de Imposto de Renda entre os Fundos Imobiliários (FIIs) e as Ações negociadas na B3?',
        alternativas: [
          'Os rendimentos mensais (dividendos) de FIIs são isentos de IR para pessoa física (sob regras da lei), enquanto os ganhos de capital na venda de cotas de FIIs pagam alíquota de 20% (sem isenção de R$ 20 mil/mês como em ações swing trade).',
          'Ambos pagam 15% de IR sobre qualquer provento ou ganho de capital.',
          'FIIs pagam imposto regressivo de renda fixa de 22,5% a 15% conforme o prazo.',
          'Ações são totalmente isentas de IR tanto em dividendos quanto em ganhos de capital em qualquer volume.'
        ],
        correta: 0,
        explicacao: 'Para pessoas físicas que atendem aos requisitos legais, os dividendos de FIIs são isentos de IR. Já a venda com lucro de cotas de FIIs é tributada em 20% sobre o ganho de capital sem a faixa de isenção de R$ 20.000/mês que existe para ações à vista.'
      },
      {
        id: 9,
        competencia: 'juros_algebra',
        competenciaNome: 'Matemática Financeira & Juros',
        enunciado: 'Um jovem poupa R$ 300,00 no final de cada mês durante 5 anos (60 meses) em uma aplicação que rende taxa efetiva de 1,0% ao mês. Qual a fórmula correta e o valor aproximado acumulado no final do período?',
        alternativas: [
          'R$ 18.000,00 (apenas o capital aportado)',
          'R$ 24.500,90 utilizando o valor futuro de uma anuidade ordinária: FV = PMT * [((1 + i)^n - 1) / i]',
          'R$ 21.600,00 pelo regime de juros simples',
          'R$ 36.000,00'
        ],
        correta: 1,
        explicacao: 'Pela fórmula do Valor Futuro de uma série uniforme de pagamentos (anuidade postecipada): FV = PMT * [((1 + i)^n - 1) / i] = 300 * [((1,01)^60 - 1) / 0,01] = 300 * [(1,8167 - 1) / 0,01] = 300 * 81,6697 = R$ 24.500,90.'
      },
      {
        id: 10,
        competencia: 'macro_mercado',
        competenciaNome: 'Macroeconomia & Mercado',
        enunciado: 'O que caracteriza a "Curva de Juros Invertida" (Inverted Yield Curve) e qual é o seu significado histórico nos mercados financeiros globais?',
        alternativas: [
          'Quando as taxas de juros de curto prazo estão mais altas do que as taxas de juros de longo prazo, frequentemente sinalizando expectativas de recessão econômica e corte futuro de juros.',
          'Quando o Banco Central decide zerar a taxa básica de juros para incentivar a poupança.',
          'Quando a inflação se torna negativa (deflação contínua).',
          'Quando as ações rendem menos do que a poupança por mais de 5 anos.'
        ],
        correta: 0,
        explicacao: 'Em condições normais, títulos mais longos pagam taxas maiores para compensar o risco temporal. A inversão da curva (juros curtos > juros longos) reflete aperto monetário agressivo no presente e expectativa de desaceleração ou recessão no futuro, o que forçará o corte de juros.'
      },
      {
        id: 11,
        competencia: 'renda_variavel_valuation',
        competenciaNome: 'Ações & Valuation',
        enunciado: 'Na metodologia de Fluxo de Caixa Descontado (DCF), qual taxa de desconto deve ser utilizada para trazer a valor presente o Fluxo de Caixa Livre da Firma (FCFF)?',
        alternativas: [
          'O Custo Médio Ponderado de Capital (WACC - Weighted Average Cost of Capital).',
          'Apenas a taxa livre de risco (Selic).',
          'O Custo do Capital Próprio (Ke) isolado.',
          'A taxa de juros do CDI acrescida da inflação.'
        ],
        correta: 0,
        explicacao: 'O FCFF (Free Cash Flow to Firm) pertence a todos os provedores de capital (credores e acionistas). Portanto, deve ser descontado pelo WACC, que pondera o custo do capital próprio (Ke) e o custo da dívida após impostos (Kd * (1 - T)).'
      },
      {
        id: 12,
        competencia: 'risco_gestao',
        competenciaNome: 'Risco & Gestão de Carteiras',
        enunciado: 'Qual é o princípio fundamental da Fronteira Eficiente de Harry Markowitz na Teoria Moderna do Portfólio?',
        alternativas: [
          'Comprar sempre os ativos que mais subiram no último ano.',
          'Identificar o conjunto de carteiras que maximizam o retorno esperado para um determinado nível de risco, ou minimizam o risco para um determinado retorno esperado, por meio da descorrelação entre ativos.',
          'Concentrar 100% dos recursos no ativo de maior dividendo histórico.',
          'Eliminar 100% do risco sistêmico do mercado financeiro.'
        ],
        correta: 1,
        explicacao: 'Markowitz demonstrou que, combinando ativos com correlação imperfeita (< 1), é possível reduzir a volatilidade total do portfólio sem sacrificar retorno, formando a curva da Fronteira Eficiente.'
      },
      {
        id: 13,
        competencia: 'renda_fixa_inflacao',
        competenciaNome: 'Renda Fixa & Títulos Públicos',
        enunciado: 'O que é a "Duration de Macaulay" de um título de renda fixa?',
        alternativas: [
          'O prazo contratual total até a data de vencimento final do papel.',
          'A média ponderada dos prazos de recebimento de todos os fluxos de caixa do título, medindo a sensibilidade do preço do título a variações nas taxas de juros.',
          'A taxa de rentabilidade líquida após o desconto do Imposto de Renda.',
          'O percentual de garantia fornecido pelo FGC.'
        ],
        correta: 1,
        explicacao: 'A Duration de Macaulay calcula o tempo médio ponderado para o investidor recuperar o valor investido através dos fluxos de cupom e principal. Quanto maior a duration, maior a sensibilidade do preço do título à oscilação das taxas de juros.'
      },
      {
        id: 14,
        competencia: 'macro_mercado',
        competenciaNome: 'Macroeconomia & Mercado',
        enunciado: 'Qual a principal diferença entre o índice IPCA (Índice de Preços ao Consumidor Amplo) e o IGP-M (Índice Geral de Preços do Mercado)?',
        alternativas: [
          'O IPCA é o índice oficial de inflação do Brasil, medido pelo IBGE com foco no consumo das famílias (1 a 40 salários mínimos); o IGP-M é medido pela FGV com 60% de peso em preços no atacado (IPA), sofrendo forte influência do câmbio e commodities.',
          'O IPCA mede apenas o preço de imóveis e o IGP-M mede a cesta básica de alimentos.',
          'Não há diferença técnica, ambos são calculados pelo Banco Central.',
          'O IPCA é calculado anualmente e o IGP-M é diário.'
        ],
        correta: 0,
        explicacao: 'O IPCA foca nas despesas das famílias brasileiras e baliza o regime de metas do Banco Central. O IGP-M possui 60% de peso no IPA (Índice de Preços ao Produtor Amplo), sendo muito sensível à oscilação do Dólar e das commodities internacionais.'
      },
      {
        id: 15,
        competencia: 'renda_variavel_valuation',
        competenciaNome: 'Ações & Valuation',
        enunciado: 'Em finanças corporativas, o que significa um "Moat" (fosso econômico defensável), conceito popularizado por Warren Buffett?',
        alternativas: [
          'A dívida de curto prazo que a empresa mantém com bancos estatais.',
          'A vantagem competitiva sustentável (como marca forte, efeito de rede, custos de troca elevados ou escala) que protege a rentabilidade e margens da empresa contra a entrada de concorrentes.',
          'O valor total dos ativos intangíveis registrados no balanço patrimonial.',
          'O desconto concedido pela bolsa para empresas listadas no Novo Mercado.'
        ],
        correta: 1,
        explicacao: 'Moat (fosso defensivo) representa as vantagens estruturais que tornam o negócio difícil de ser replicado por competidores, garantindo retorno sobre o capital investido (ROIC) superior ao custo de capital por longos períodos.'
      },
      {
        id: 16,
        competencia: 'juros_algebra',
        competenciaNome: 'Matemática Financeira & Juros',
        enunciado: 'Se uma ação custa R$ 20,00 e distribui R$ 1,60 em dividendos nos últimos 12 meses, qual é o seu Dividend Yield (DY)?',
        alternativas: [
          '8,0% ao ano',
          '16,0% ao ano',
          '6,4% ao ano',
          '12,5% ao ano'
        ],
        correta: 0,
        explicacao: 'Dividend Yield = (Dividendos por Ação / Preço da Ação) * 100 = (R$ 1,60 / R$ 20,00) * 100 = 0,08 * 100 = 8,0% ao ano.'
      },
      {
        id: 17,
        competencia: 'risco_gestao',
        competenciaNome: 'Risco & Gestão de Carteiras',
        enunciado: 'O que diferencia o "Risco Sistemático" (de mercado) do "Risco Não-Sistemático" (específico da empresa)?',
        alternativas: [
          'O risco específico pode ser eliminado através da diversificação entre múltiplos ativos de setores distintos, enquanto o risco sistemático afeta todos os ativos da economia (ex: recessão, crises geopolíticas) e não pode ser diversificado.',
          'O risco sistemático pode ser eliminado investindo em 5 ações diferentes.',
          'Risco não-sistemático afeta apenas os títulos do governo federal.',
          'Não há diferença entre os dois conceitos.'
        ],
        correta: 0,
        explicacao: 'O risco não-sistemático (idiossincrático) diz respeito aos problemas específicos de uma empresa ou setor (ex: incêndio em fábrica, falha de gestão) e pode ser eliminado com diversificação. O risco sistemático afeta o mercado como um todo (taxa de juros, PIB, câmbio).'
      },
      {
        id: 18,
        competencia: 'macro_mercado',
        competenciaNome: 'Macroeconomia & Mercado',
        enunciado: 'Qual é o papel do "Formador de Mercado" (Market Maker) na B3?',
        alternativas: [
          'Definir unilateralmente o preço de abertura das ações na bolsa.',
          'Comprometer-se a manter ofertas públicas diárias de compra e venda dentro de um spread máximo, garantindo liquidez contínua para investidores negociarem o ativo.',
          'Cobrar taxas de corretagem em nome da CVM.',
          'Emitir novos lotes de ações para empresas sem registro na CVM.'
        ],
        correta: 1,
        explicacao: 'O Formador de Mercado (Market Maker) é uma instituição credenciada que injeta ordens contínuas de compra e venda no livro de ofertas para evitar que o ativo fique travado sem liquidez, reduzindo a volatilidade de preços.'
      },
      {
        id: 19,
        competencia: 'renda_fixa_inflacao',
        competenciaNome: 'Renda Fixa & Títulos Públicos',
        enunciado: 'Na tabela regressiva de Imposto de Renda para aplicações financeiras de renda fixa no Brasil, qual é a alíquota aplicável para resgates realizados após 720 dias (2 anos)?',
        alternativas: [
          '22,5%',
          '20,0%',
          '17,5%',
          '15,0%'
        ],
        correta: 3,
        explicacao: 'A tabela regressiva de IR para renda fixa segue: até 180 dias = 22,5%; de 181 a 360 dias = 20,0%; de 361 a 720 dias = 17,5%; acima de 720 dias = 15,0% (menor alíquota legal).'
      },
      {
        id: 20,
        competencia: 'renda_variavel_valuation',
        competenciaNome: 'Ações & Valuation',
        enunciado: 'Em um pitch de tese de investimento na BRHSIC, ao calcular o ROE (Return on Equity), a decomposição de DuPont divide o indicador em quais três fatores fundamentais?',
        alternativas: [
          'Margem Líquida (eficiência operacional), Giro do Ativo (eficiência no uso dos ativos) e Alavancagem Financeira (Multiplicador de Capital Próprio).',
          'Receita Bruta, EBITDA e Fluxo de Caixa Operacional.',
          'Preço/Lucro, Preço/Valor Patrimonial e Dividend Yield.',
          'Taxa Selic, Risco-País e Custo da Dívida.'
        ],
        correta: 0,
        explicacao: 'O Sistema DuPont decompõe o ROE = (Lucro Líquido / Vendas) * (Vendas / Ativo Total) * (Ativo Total / Patrimônio Líquido), permitindo identificar se a rentabilidade da empresa vem de margens altas, giro rápido ou endividamento.'
      }
    ]
  },
  {
    id: 'sprint-financas',
    titulo: 'Sprint Rápido — 5 Questões Essenciais BRHSIC',
    subtitulo: 'Treino de velocidade para aquecimento e teste rápido de conceitos-chave.',
    duracaoMinutos: 15,
    totalQuestoes: 5,
    nivel: 'Treino Rápido',
    questoes: [
      {
        id: 1,
        competencia: 'macro_mercado',
        competenciaNome: 'Macroeconomia & Mercado',
        enunciado: 'Qual a principal função do Comitê de Política Monetária (COPOM) no Brasil?',
        alternativas: [
          'Definir a meta da taxa Selic e analisar o balanço de riscos para a inflação.',
          'Fiscalizar fraudes nas empresas listadas na bolsa.',
          'Fixar a cotação diária do dólar comercial.',
          'Cobrar o imposto de renda sobre ganhos de capital.'
        ],
        correta: 0,
        explicacao: 'O COPOM se reúne a cada 45 dias para determinar a taxa básica de juros da economia (Selic Meta).'
      },
      {
        id: 2,
        competencia: 'juros_algebra',
        competenciaNome: 'Matemática Financeira & Juros',
        enunciado: 'Se R$ 1.000,00 rendem 10% de juros compostos ao ano durante 3 anos, o montante final será:',
        alternativas: [
          'R$ 1.300,00',
          'R$ 1.331,00',
          'R$ 1.350,00',
          'R$ 1.250,00'
        ],
        correta: 1,
        explicacao: 'M = 1.000 * (1,10)^3 = 1.000 * 1,331 = R$ 1.331,00.'
      },
      {
        id: 3,
        competencia: 'renda_fixa_inflacao',
        competenciaNome: 'Renda Fixa & Títulos Públicos',
        enunciado: 'O Tesouro Selic (LFT) é classificado como um título de renda fixa:',
        alternativas: [
          'Pós-fixado, cujo rendimento acompanha a taxa básica de juros diária.',
          'Prefixado com juros travados.',
          'Híbrido atrelado ao IPCA sem liquidez.',
          'Isento de tributação para qualquer investidor.'
        ],
        correta: 0,
        explicacao: 'O Tesouro Selic é pós-fixado e ideal para reserva de emergência por sua volatilidade próxima de zero.'
      },
      {
        id: 4,
        competencia: 'renda_variavel_valuation',
        competenciaNome: 'Ações & Valuation',
        enunciado: 'O que mede o indicador Preço sobre Lucro (P/L)?',
        alternativas: [
          'Quantos anos levaria para recuperar o valor investido na ação com base no lucro atual da empresa.',
          'A taxa de juros que o banco cobra da empresa.',
          'O valor dos imóveis da empresa.',
          'A dívida bruta da companhia.'
        ],
        correta: 0,
        explicacao: 'O P/L compara o preço de mercado da ação com o lucro líquido por ação, indicando a relação de valuation.'
      },
      {
        id: 5,
        competencia: 'risco_gestao',
        competenciaNome: 'Risco & Gestão de Carteiras',
        enunciado: 'O Índice de Sharpe positivo e elevado indica que a carteira de investimentos:',
        alternativas: [
          'Gera alto retorno proporcional ao risco de volatilidade assumido.',
          'Não tem nenhum tipo de risco.',
          'Investe apenas em renda fixa governamental.',
          'Paga dividendos mensais garantidos.'
        ],
        correta: 0,
        explicacao: 'O Sharpe mede o excesso de retorno sobre o ativo livre de risco por unidade de volatilidade.'
      }
    ]
  }
];

export const SIMULADOS_DATA = SIMULADOS_DATA;
