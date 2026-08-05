// C:\codigos\bfa-main\plataforma\src\data\financasData.js
// Trilha completa de Finanças (3 Módulos)

window.financasData = {
  id: "financas",
  titulo: "Finanças",
  descricao: "Trilha de finanças e investimentos, do zero conceitual até valuation e montagem de carteira.",
  modulos: [
    {
      id: "modulo-1",
      slug: "modulo-1-fundamentos",
      numero: 1,
      titulo: "Módulo 1: Fundamentos em Finanças",
      descricao: "O que é o mercado financeiro, quem regula o sistema, renda fixa, ações, fundos, FIIs, risco e macroeconomia.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-mercado-financeiro",
          numero: 1,
          titulo: "Aula 1: O que é o mercado financeiro?",
          comeceAqui: "Mercado financeiro é o sistema que conecta quem tem dinheiro sobrando com quem precisa de dinheiro. Quem investe quer retorno. Quem capta dinheiro quer financiar projetos, empresas, consumo ou governo.",
          ideiaCentral: "Investir não é 'apertar botões em um app'. Investir é decidir para onde seu dinheiro vai, por quanto tempo, com qual risco e esperando qual retorno.",
          conceitosEssenciais: [
            { conceito: "Investidor", significado: "Quem coloca dinheiro esperando retorno" },
            { conceito: "Tomador", significado: "Quem precisa de dinheiro e aceita pagar por isso" },
            { conceito: "Retorno", significado: "Ganho esperado pelo investimento" },
            { conceito: "Risco", significado: "Chance de o resultado ser pior que o esperado" },
            { conceito: "Liquidez", significado: "Facilidade de transformar o investimento em dinheiro" },
            { conceito: "Juros compostos", significado: "Quando o rendimento também passa a render" }
          ],
          exemploResolvido: {
            titulo: "Juros Compostos no Tempo",
            enunciado: "Imagine que Ana investe R$ 1.000 por 30 anos a 10% ao ano. VF = VP × (1+i)^n.",
            passos: [
              "1. VF = 1000 × (1 + 0,10)³⁰",
              "2. 1,10³⁰ ≈ 17,4494",
              "3. VF = 1000 × 17,4494 = R$ 17.449,40"
            ],
            resultado: "Tempo transforma rendimento pequeno em resultado grande (R$ 17.449,40)."
          },
          miniQuiz: [
            {
              pergunta: "O que o mercado financeiro conecta?",
              opcoes: ["Bancos centrais e governos internacionais", "Investidores (poupadores) e tomadores de recursos", "Compradores e vendedores de imóveis físicos apenas", "Apenas empresas de tecnologia"],
              respostaCorreta: 1,
              explicacao: "O mercado conecta agentes superavitários (quem tem capital) com agentes deficitários (quem precisa de capital)."
            },
            {
              pergunta: "Qual é a diferença entre retorno e risco?",
              opcoes: ["Retorno é o ganho esperado; risco é a incerteza de o resultado ser pior que o esperado", "Retorno é garantido pelo banco; risco é pago pelo governo", "Retorno mede o tempo; risco mede o imposto", "São termos sinônimos"],
              respostaCorreta: 0,
              explicacao: "Retorno é a compensação pelo capital investido; risco representa a variabilidade ou incerteza desse retorno."
            },
            {
              pergunta: "O que significa liquidez?",
              opcoes: ["Facilidade de transformar um ativo em dinheiro sem perda significativa de valor", "A taxa de juros paga por um título do governo", "O valor total de impostos cobrados no resgate", "A rentabilidade garantida pela poupança"],
              respostaCorreta: 0,
              explicacao: "Liquidez mede a prontidão de conversão do ativo em dinheiro disponível."
            },
            {
              pergunta: "Por que o tempo é tão determinante no cálculo de juros compostos?",
              opcoes: ["Porque o tempo faz a taxa diminuir", "Porque o tempo atua como expoente na fórmula de crescimento do capital", "Porque os bancos perdem dinheiro com o tempo", "Porque a inflação para com o tempo"],
              respostaCorreta: 1,
              explicacao: "VF = VP(1+i)^n mostra que n (tempo) está no expoente, gerando crescimento exponencial."
            },
            {
              pergunta: "Investir é necessariamente algo exclusivo para pessoas ricas?",
              opcoes: ["Sim, pois exige milhões em capital inicial", "Não, é possível começar com pequenos valores no Tesouro Direto ou CDBs", "Sim, pois bancos não aceitam pequenos aplicadores", "Não, pois o governo doa investimentos"],
              respostaCorreta: 1,
              explicacao: "Hoje existem produtos seguros e acessíveis a partir de cerca de R$ 30,00."
            }
          ],
          pbl: {
            titulo: "Decisão do Poupador",
            cenario: "João tem R$ 1.000 guardados na poupança. O Banco Central acabou de subir a taxa Selic. O que muda para João? Ele deveria continuar na poupança ou procurar outra alternativa?",
            solucao: "Com a Selic alta, a poupança rende menos que 100% do CDI ou Tesouro Selic. João deve migrar para Tesouro Selic ou CDB de liquidez diária."
          },
          resumo: [
            "Mercado financeiro conecta investidores e tomadores de dinheiro.",
            "Todo investimento envolve risco, retorno e liquidez.",
            "Juros compostos fazem o tempo trabalhar a favor de quem começa cedo."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-sistema-financeiro-brasileiro",
          numero: 2,
          titulo: "Aula 2: Sistema Financeiro Brasileiro",
          comeceAqui: "Alguém precisa organizar o mercado financeiro, definir regras, punir fraudes e garantir que os produtos que os bancos vendem são legítimos.",
          ideiaCentral: "O sistema tem três camadas: quem define a política monetária (BC), quem regula o mercado de capitais (CVM), e quem operacionaliza a negociação (B3 e corretoras).",
          conceitosEssenciais: [
            { conceito: "Banco Central (BC)", significado: "Define a Selic, regula bancos e garante estabilidade monetária" },
            { conceito: "COPOM", significado: "Comitê dentro do BC que decide a Selic a cada 45 dias" },
            { conceito: "Selic", significado: "Taxa básica de juros; referência para todo o mercado" },
            { conceito: "CVM", significado: "Comissão de Valores Mobiliários — regula e fiscaliza ações, fundos e debêntures" },
            { conceito: "B3", significado: "Bolsa de valores brasileira; onde ações e ETFs são negociados" },
            { conceito: "Corretora", significado: "Intermediária entre o investidor e a B3 ou os produtos de renda fixa" }
          ],
          protecaoAoInvestidor: [
            { instituicao: "Banco Central", papel: "Garante capital dos bancos e regula o FGC (cobertura até R$ 250 mil/CPF/banco)." },
            { instituicao: "CVM", papel: "Exige transparência de empresas abertas e fundos, punindo irregularidades no mercado de capitais." },
            { instituicao: "B3", papel: "Garante a liquidação e custódia segura das operações de compra e venda." }
          ],
          miniQuiz: [
            {
              pergunta: "Qual instituição define a taxa básica de juros (Selic) no Brasil?",
              opcoes: ["CVM", "Banco Central (via COPOM)", "B3", "Ministério da Fazenda"],
              respostaCorreta: 1,
              explicacao: "O COPOM, órgão do Banco Central, reúne-se a cada 45 dias para definir a meta da Selic."
            },
            {
              pergunta: "Quem fiscaliza e regula a emissão de ações e a atuação de fundos de investimento no Brasil?",
              opcoes: ["Banco Central", "CVM (Comissão de Valores Mobiliários)", "B3", "FGC"],
              respostaCorreta: 1,
              explicacao: "A CVM é a autarquia responsável por regulamentar o mercado de valores mobiliários."
            },
            {
              pergunta: "Qual a função da B3 no mercado financeiro?",
              opcoes: ["Definir impostos federais", "Funcionar como a bolsa oficial do Brasil para negociação de ações, FIIs e ETFs", "Garantir empréstimos imobiliários", "Emitir notas de dinheiro"],
              respostaCorreta: 1,
              explicacao: "A B3 fornece o ambiente seguro de negociação, registro e liquidação de ativos negociados em bolsa."
            },
            {
              pergunta: "O Fundo Garantidor de Créditos (FGC) garante aplicações em renda fixa bancária até qual limite?",
              opcoes: ["R$ 100.000 por CPF", "R$ 250.000 por CPF e por instituição financeira", "R$ 1.000.000 sem limite", "Não há limite"],
              respostaCorreta: 1,
              explicacao: "O FGC garante até R$ 250 mil por CPF/instituição, limitado ao teto global de R$ 1 milhão a cada 4 anos."
            },
            {
              pergunta: "Para investir em ações ou produtos de renda fixa, o investidor pessoa física utiliza:",
              opcoes: ["O site direto da CVM", "Uma corretora de valores ou banco autorizado", "O balcão do Banco Central", "Cartórios de imóveis"],
              respostaCorreta: 1,
              explicacao: "As corretoras atuam como ponte de acesso do investidor aos ativos."
            }
          ],
          pbl: {
            titulo: "Atuação dos Órgãos Reguladores",
            cenario: "A CVM abriu investigação contra uma empresa listada na B3 por suspeita de manipulação. Quem protege o investidor nesse caso?",
            solucao: "A CVM investiga e pune a empresa por descumprimento de transparência. A B3 garante a liquidação das ordens executadas. O Banco Central cuida do sistema bancário."
          },
          resumo: [
            "Banco Central regula bancos e define a Selic.",
            "CVM regula o mercado de capitais: ações, fundos, debêntures.",
            "B3 é a bolsa onde os ativos são negociados; corretoras são o canal de acesso."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-tesouro-direto",
          numero: 3,
          titulo: "Aula 3: Tesouro Direto",
          comeceAqui: "No Tesouro Direto, você empresta dinheiro ao governo federal e recebe juros em troca. É o investimento mais seguro do Brasil.",
          ideiaCentral: "Três tipos principais: Selic (pós-fixado), Prefixado e IPCA+ (híbrido). A escolha incorreta pode gerar marcação a mercado antes do vencimento.",
          conceitosEssenciais: [
            { conceito: "Tesouro Selic", significado: "Rende a variação diária da Selic; indicado para reserva de emergência" },
            { conceito: "Tesouro Prefixado", significado: "Taxa fixada na compra; sabe quanto recebe no vencimento" },
            { conceito: "Tesouro IPCA+", significado: "Rende IPCA + taxa fixa; protege contra a inflação" },
            { conceito: "Marcação a mercado", significado: "Preço do título oscila diariamente conforme as expectativas dos juros futuros" },
            { conceito: "Vencimento", significado: "Data em que o governo devolve o capital investido acrescido dos juros" }
          ],
          comparativoTitulos: [
            { titulo: "Tesouro Selic", uso: "Reserva de emergência, curto prazo", riscoOscilacao: "Mínimo" },
            { titulo: "Tesouro Prefixado", uso: "Aposta em queda futura dos juros", riscoOscilacao: "Alto se vendido antes do prazo" },
            { titulo: "Tesouro IPCA+", uso: "Aposentadoria, médio/longo prazo", riscoOscilacao: "Alto se vendido antes do prazo" }
          ],
          exemploResolvido: {
            titulo: "Marcação a Mercado no Prefixado",
            enunciado: "Você comprou Tesouro Prefixado a 12% a.a. Meses depois, a taxa para novos títulos subiu para 14% a.a. O que acontece com o preço de venda hoje?",
            passos: [
              "1. Se novos títulos pagam 14%, o seu título antigo (12%) perde valor de mercado.",
              "2. O preço de venda do seu título cai hoje para igualar o rendimento.",
              "3. Se segurar até o vencimento: recebe exatamente os 12% a.a. contratados."
            ],
            resultado: "Vender antes do prazo gera perda na marcação a mercado; segurar garante a taxa original."
          },
          miniQuiz: [
            {
              pergunta: "Por que o Tesouro Direto é considerado o investimento mais seguro do Brasil?",
              opcoes: ["Garantido pelo FGC", "O emissor é o próprio Governo Federal (risco soberano)", "Não há incidência de Imposto de Renda", "Rende mais que ações"],
              respostaCorreta: 1,
              explicacao: "O risco soberano é a referência de menor risco de inadimplência em um país."
            },
            {
              pergunta: "Qual título do Tesouro é indicado para alocar a reserva de emergência?",
              opcoes: ["Tesouro Prefixado 2035", "Tesouro IPCA+ 2045", "Tesouro Selic", "Tesouro Renda+ 2065"],
              respostaCorreta: 2,
              explicacao: "O Tesouro Selic possui liquidez diária e volatilidade nula na marcação a mercado."
            },
            {
              pergunta: "O que ocorre se você vende um Tesouro IPCA+ antes do vencimento?",
              opcoes: ["Recebe exatamente a taxa sem alterações", "Pode ter ganho ou perda devido à marcação a mercado", "Perde todo o capital", "Paga multa de 50%"],
              respostaCorreta: 1,
              explicacao: "A venda antecipada é feita pelo preço de mercado do dia."
            },
            {
              pergunta: "Qual título garante ganho acima da inflação (IPCA)?",
              opcoes: ["Tesouro Selic", "Tesouro Prefixado", "Tesouro IPCA+", "Poupança"],
              respostaCorreta: 2,
              explicacao: "O Tesouro IPCA+ paga a variação do IPCA + taxa real de juros."
            },
            {
              pergunta: "Se as taxas de juros futuras caírem, o que acontece com o preço de um Tesouro Prefixado comprado com taxa alta?",
              opcoes: ["O preço do título sobe na marcação a mercado", "O preço do título cai desastrosamente", "Nada altera", "O título é cancelado"],
              respostaCorreta: 0,
              explicacao: "Queda nos juros futuros valoriza os títulos prefixados antigos."
            }
          ],
          pbl: {
            titulo: "Distribuição dos Objetivos de Ana",
            cenario: "Ana tem 3 objetivos: reserva de emergência, viagem em 2 anos e aposentadoria em 30 anos. Indique o título ideal.",
            solucao: "1. Reserva: Tesouro Selic. 2. Viagem 2 anos: Tesouro Prefixado com vencimento em 2 anos. 3. Aposentadoria 30 anos: Tesouro IPCA+ longo."
          },
          resumo: [
            "Tesouro Direto é empréstimo ao governo federal; o mais seguro do Brasil.",
            "Tesouro Selic: baixíssima oscilação, ideal para curto prazo.",
            "Tesouro Prefixado e IPCA+: oscilam se vendidos antes do vencimento."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-renda-fixa-bancaria",
          numero: 4,
          titulo: "Aula 4: CDB, LCI, LCA e FGC",
          comeceAqui: "Em produtos bancários de renda fixa, você empresta dinheiro para um banco em troca de juros.",
          ideiaCentral: "CDB, LCI e LCA são os principais títulos bancários. LCI e LCA são isentas de IR para pessoa física. O FGC garante até R$ 250 mil por CPF/instituição.",
          conceitosEssenciais: [
            { conceito: "CDB", significado: "Certificado de Depósito Bancário (tabela regressiva de IR)" },
            { conceito: "LCI / LCA", significado: "Letras de Crédito Imobiliário e do Agronegócio (isentas de IR para pessoa física)" },
            { conceito: "CDI", significado: "Taxa de referência das operações entre bancos (próxima da Selic)" },
            { conceito: "FGC", significado: "Garante até R$ 250.000 por CPF por instituição" }
          ],
          tabelaComparativa: [
            { produto: "CDB", destino: "Livre para o banco emprestar", ir: "Sim (22,5% a 15%)", fgc: "Sim (até 250 mil)" },
            { produto: "LCI", destino: "Setor imobiliário", ir: "Não (Isento para PF)", fgc: "Sim (até 250 mil)" },
            { produto: "LCA", destino: "Setor do agronegócio", ir: "Não (Isento para PF)", fgc: "Sim (até 250 mil)" }
          ],
          exemploResolvido: {
            titulo: "Comparando CDB 120% CDI com LCA 92% CDI",
            enunciado: "CDI a 10,5% a.a. e prazo de 2 anos (IR 15% no CDB).",
            passos: [
              "1. CDB 120%: bruto = 12,6%. Líquido = 12,6% × 0,85 = 10,71%",
              "2. LCA 92%: 10,5% × 0,92 = 9,66% líquido",
              "3. Resultado: CDB 120% rende 10,71% líquido contra 9,66% da LCA."
            ],
            resultado: "CDB 120% supera LCA 92% para prazo de 2 anos."
          },
          miniQuiz: [
            {
              pergunta: "Qual a diferença tributária entre CDB e LCI/LCA para pessoa física?",
              opcoes: ["CDB é isento; LCI/LCA pagam 22,5%", "CDB segue a tabela regressiva de IR; LCI/LCA são isentas de IR", "Ambos são isentos", "Ambos pagam 15% fixo"],
              respostaCorreta: 1,
              explicacao: "LCI e LCA possuem isenção de IR para pessoas físicas."
            },
            {
              pergunta: "O FGC garante até qual valor por CPF e por instituição?",
              opcoes: ["R$ 50.000", "R$ 100.000", "R$ 250.000", "R$ 500.000"],
              respostaCorreta: 2,
              explicacao: "Limite de R$ 250.000 por CPF por instituição financeira."
            },
            {
              pergunta: "Por que bancos médios oferecem CDBs pagando 120% do CDI?",
              opcoes: ["Possuem maior risco percebido e precisam pagar mais para captar recursos", "Banco Central obriga", "Não pagam imposto", "Promoção temporária proibida"],
              respostaCorreta: 0,
              explicacao: "Bancos menores pagam maior prêmio de risco para atrair clientes."
            },
            {
              pergunta: "O que é o período de carência na LCI/LCA?",
              opcoes: ["Tempo sem rendimento", "Tempo mínimo sem poder resgatar o dinheiro", "Prazo limite do FGC", "Período de IR dobrado"],
              respostaCorreta: 1,
              explicacao: "Carência é o prazo sem liquidez antecipada de resgate."
            },
            {
              pergunta: "O FGC cobre títulos do Tesouro Direto?",
              opcoes: ["Sim, até R$ 250 mil", "Não, pois o Tesouro Direto tem garantia soberana do Governo Federal", "Sim, sem limite", "Apenas para o Tesouro Selic"],
              respostaCorreta: 1,
              explicacao: "O FGC garante títulos bancários, não títulos públicos federais."
            }
          ],
          pbl: {
            titulo: "Escolha de Renda Fixa Bancária",
            cenario: "Aplicação por 2 anos (IR 15%) com CDI a 10,5%: (A) CDB 115% CDI; (B) LCA 93% CDI; (C) Tesouro Selic (100% CDI). Qual o maior líquido?",
            solucao: "CDI = 10,5%. (A) CDB 115%: 12,075% × 0,85 = 10,26% líq. (B) LCA 93%: 9,765% líq. (C) Selic: 8,925% líq. O CDB a 115% do CDI rende o maior valor líquido."
          },
          resumo: [
            "CDB, LCI e LCA são empréstimos ao banco, não ao governo.",
            "LCI e LCA são isentos de IR; CDB tem tabela regressiva.",
            "O FGC garante até R$ 250.000 por CPF por banco."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-acoes-e-bolsa",
          numero: 5,
          titulo: "Aula 5: Ações e a bolsa de valores",
          comeceAqui: "Comprar uma ação é comprar uma pequena parte de uma empresa de verdade. Em ações, você vira sócio do negócio.",
          ideiaCentral: "Ações são renda variável. O preço flutua refletindo as expectativas futuras de lucros e crescimento.",
          conceitosEssenciais: [
            { conceito: "Ação", significado: "Fração do capital social de uma empresa negociada na bolsa" },
            { conceito: "ON (Ordinária - final 3)", significado: "Direito a voto nas assembleias" },
            { conceito: "PN (Preferencial - final 4)", significado: "Prioridade no recebimento de dividendos" },
            { conceito: "Unit (final 11)", significado: "Pacote combinado de ações ON e PN" },
            { conceito: "IPO", significado: "Abertura de capital da empresa na bolsa" },
            { conceito: "Dividendos", significado: "Distribuição de parte do lucro aos acionistas" }
          ],
          leituraTickers: [
            { codigo: "PETR4", empresa: "Petrobras", tipo: "Preferencial (PN)" },
            { codigo: "WEGE3", empresa: "WEG", tipo: "Ordinária (ON)" },
            { codigo: "ITUB4", empresa: "Itaú Unibanco", tipo: "Preferencial (PN)" },
            { codigo: "BPAC11", empresa: "BTG Pactual", tipo: "Unit (Pacote ON+PN)" }
          ],
          exemploResolvido: {
            titulo: "Impacto de Alta da Selic em Setores Distintos",
            enunciado: "Por que a alta da Selic prejudica mais MGLU3 (varejo) do que WEGE3 (exportadora industrial)?",
            passos: [
              "1. MGLU3 depende de crédito ao consumidor e tem dívidas atreladas ao CDI.",
              "2. WEGE3 gera receitas em dólar, possui margens altas e pouca dívida atrelada ao CDI.",
              "3. Selic alta encarece empréstimos e reduz o consumo parcelado no varejo."
            ],
            resultado: "Diferentes modelos de negócio reagem de formas opostas ao mesmo cenário macro."
          },
          miniQuiz: [
            {
              pergunta: "Ao comprar uma ação na bolsa, você se torna:",
              opcoes: ["Credor da empresa", "Sócio (coproprietário) de uma fração da empresa", "Funcionário registrado", "Cliente prioritário"],
              respostaCorreta: 1,
              explicacao: "Ações representam frações do capital social da empresa."
            },
            {
              pergunta: "Qual a diferença entre ações ON e PN?",
              opcoes: ["ON dá direito a voto; PN tem preferência em dividendos", "ON é em dólares; PN em reais", "ON é de bancos; PN de indústrias", "Não há diferença"],
              respostaCorreta: 0,
              explicacao: "ONs (final 3) dão voto; PNs (final 4) dão prioridade nos proventos."
            },
            {
              pergunta: "O que é um IPO?",
              opcoes: ["Imposto Operacional", "Primeira abertura de capital de uma empresa na bolsa", "Índice de preços", "Isenção fiscal"],
              respostaCorreta: 1,
              explicacao: "Initial Public Offering é o momento de entrada da empresa na bolsa."
            },
            {
              pergunta: "O que são dividendos?",
              opcoes: ["Taxa cobrada pela corretora", "Fatia do lucro líquido repassada aos acionistas", "Juros do cheque especial", "Desconto em compras"],
              respostaCorreta: 1,
              explicacao: "Dividendos representam a distribuição de lucros aos sócios."
            },
            {
              pergunta: "Por que Selic alta pressiona ações de varejo?",
              opcoes: ["Encarece o crédito ao consumidor e eleva as despesas com dívidas das empresas", "Proíbe lojas de abrirem", "Cancela a distribuição de dividendos", "Desvaloriza o dólar para zero"],
              respostaCorreta: 0,
              explicacao: "Juros altos reduzem vendas parceladas e aumentam os custos financeiros das varejistas."
            }
          ],
          pbl: {
            titulo: "Análise Setorial: MGLU3 vs WEGE3",
            cenario: "Em cenário de Selic alta e dólar forte, explique por que MGLU3 e WEGE3 possuem desempenhos opostos.",
            solucao: "MGLU3 sofre com crédito caro e queda no consumo interno. WEGE3 beneficia-se das receitas em dólar e possui baixa dependência de crédito direto ao consumidor."
          },
          resumo: [
            "Ação é ser sócio de uma empresa; risco e retorno são variáveis.",
            "ON dá voto; PN dá prioridade em dividendos.",
            "O preço reflete expectativas de lucro futuro, não valor passado."
          ]
        },
        {
          id: "aula-06",
          slug: "aula-06-fundos-e-etfs",
          numero: 6,
          titulo: "Aula 6: Fundos de investimento e ETFs",
          comeceAqui: "Uma alternativa a escolher ações individuais é delegar a gestão a um profissional (fundo ativo) ou replicar um índice (ETF).",
          ideiaCentral: "Fundos ativos buscam superar um índice cobrando taxas mais altas. ETFs replicam passivamente um índice com baixíssimo custo.",
          conceitosEssenciais: [
            { conceito: "Fundo de Investimento", significado: "Patrimônio coletivo gerido por profissional" },
            { conceito: "Cota", significado: "Fração ideal do patrimônio do fundo" },
            { conceito: "ETF", significado: "Fundo que replica um índice e é negociado na bolsa como ação" },
            { conceito: "Taxa de administração", significado: "Custo anual cobrado sobre o patrimônio total" },
            { conceito: "Come-cotas", significado: "Antecipação semestral de IR em fundos de renda fixa e multimercado" }
          ],
          comparativoAtivoPassivo: [
            { aspecto: "Gestão", fundoAtivo: "Profissional tenta superar o índice", etf: "Passiva (replica índice)" },
            { aspecto: "Taxa de administração", fundoAtivo: "Alta (1,5% a 3,0% a.a.)", etf: "Baixa (0,05% a 0,5% a.a.)" },
            { aspecto: "Come-cotas", fundoAtivo: "Sim (na maioria)", etf: "Não" }
          ],
          exemploResolvido: {
            titulo: "O Custo da Taxa de Administração em 20 Anos",
            enunciado: "R$ 10.000 investidos por 20 anos a 10% a.a. sem taxa vs com 2% a.a. de taxa.",
            passos: [
              "1. Sem taxa (10% a.a.): 10000 × (1,10)²⁰ = R$ 67.275,00",
              "2. Com taxa de 2% (8% a.a. líquido): 10000 × (1,08)²⁰ = R$ 46.609,57",
              "3. Perda: R$ 20.665,43 foram consumidos pelas taxas do gestor."
            ],
            resultado: "A taxa de 2% reduziu o resultado final acumulado em mais de 30%."
          },
          miniQuiz: [
            {
              pergunta: "Qual a característica principal de um ETF?",
              opcoes: ["Construir galpões logísticos", "Replicar passivamente um índice de mercado com baixos custos", "Garantir 10% ao ano sem risco", "Emitir moedas físicas"],
              respostaCorreta: 1,
              explicacao: "ETFs replicam carteiras teóricas de índices (ex: Ibovespa) com taxas reduzidas."
            },
            {
              pergunta: "O que é a cota de um fundo?",
              opcoes: ["Taxa de corretagem", "Fração representativa do patrimônio total do fundo", "Valor máximo de resgate", "Contrato registrado em cartório"],
              respostaCorreta: 1,
              explicacao: "Ao aplicar em um fundo, o dinheiro é convertido em cotas."
            },
            {
              pergunta: "Por que taxas de administração de 2% a.a. prejudicam o crescimento de longo prazo?",
              opcoes: ["Incidem anualmente sobre todo o patrimônio acumulado, reduzindo os juros compostos", "Aumentam a alíquota de IR no resgate", "Bloqueiam resgates por 10 anos", "Reduzem a nota da CVM"],
              respostaCorreta: 0,
              explicacao: "A taxa incide sobre o saldo total acumulado todos os anos."
            },
            {
              pergunta: "O que é o come-cotas?",
              opcoes: ["Multa de resgate em 30 dias", "Recolhimento semestral antecipado do IR em cotas em fundos de renda fixa/multimercado", "Taxa cobrada pela B3", "Imposto sobre herança"],
              respostaCorreta: 1,
              explicacao: "Come-cotas reduz o número de cotas do investidor em maio e novembro a título de IR."
            },
            {
              pergunta: "O que a literatura de finanças mostra sobre fundos de gestão ativa no longo prazo?",
              opcoes: ["A maioria supera o índice facilmente", "A maioria não consegue superar consistentemente seus benchmarks após descontadas as taxas", "Rendem exatamente o mesmo", "Não possuem taxa"],
              respostaCorreta: 1,
              explicacao: "Custos elevados dificultam que gestores ativos superem seus índices com consistência."
            }
          ],
          pbl: {
            titulo: "Comparação de Fundo Ativo vs ETF",
            cenario: "Maria compara Fundo Ativo (bruto 12% a.a., taxa 2,5%) com ETF BOVA11 (bruto 10% a.a., taxa 0,1%). Qual o maior rendimento líquido?",
            solucao: "Fundo ativo líquido: 12% - 2,5% = 9,5% a.a. ETF BOVA11 líquido: 10% - 0,1% = 9,9% a.a. O ETF entrega maior retorno líquido de taxas."
          },
          resumo: [
            "Fundos ativos têm gestor e taxa alta; ETFs replicam índice com taxa baixa.",
            "A maioria dos fundos ativos não supera o índice consistentemente no longo prazo.",
            "Come-cotas prejudica os juros compostos em fundos de renda fixa e multimercado."
          ]
        },
        {
          id: "aula-07",
          slug: "aula-07-fiis",
          numero: 7,
          titulo: "Aula 7: Fundos de Investimento Imobiliário (FIIs)",
          comeceAqui: "Os FIIs permitem investir no mercado imobiliário com qualquer valor, recebendo rendimentos mensais em conta com liquidez diária na B3.",
          ideiaCentral: "FIIs de Tijolo possuem imóveis físicos; FIIs de Papel possuem títulos de renda fixa imobiliária (CRI/LCI). Rendimentos mensais são isentos de IR para PF.",
          conceitosEssenciais: [
            { conceito: "FII de tijolo", significado: "Investe em imóveis físicos (galpões, shoppings, lajes corporativas)" },
            { conceito: "FII de papel", significado: "Investe em títulos de dívida imobiliária (CRI, LCI)" },
            { conceito: "Dividend Yield (DY)", significado: "Rendimento mensal/anual distribuído dividido pelo preço da cota" },
            { conceito: "P/VP", significado: "Preço da cota dividido pelo Valor Patrimonial por cota" },
            { conceito: "Vacância", significado: "Percentual de área dos imóveis que está desocupada" }
          ],
          exemploResolvido: {
            titulo: "Cálculo de Dividend Yield Mensal",
            enunciado: "Cota de FII custa R$ 100 e paga R$ 0,80 por mês de aluguel isento.",
            passos: [
              "1. DY mensal = 0,80 ÷ 100 = 0,8% ao mês.",
              "2. DY anual simples ≈ 0,8% × 12 = 9,6% ao ano."
            ],
            resultado: "Dividend Yield de 0,8% a.m. (9,6% a.a. isento de IR)."
          },
          miniQuiz: [
            {
              pergunta: "Qual a vantagem de investir em FIIs em relação a imóveis físicos diretos?",
              opcoes: ["Sem risco", "Acessibilidade com baixo capital, alta liquidez em bolsa e isenção de IR nos proventos", "Garantia do governo", "Sem vacância"],
              respostaCorreta: 1,
              explicacao: "FIIs permitem fracionamento, liquidez diária e isenção fiscal nos proventos mensais."
            },
            {
              pergunta: "Diferença entre FII de tijolo e FII de papel:",
              opcoes: ["Tijolo possui imóveis físicos; Papel investe em títulos de dívida imobiliária (CRI/LCI)", "Tijolo investe em ações; Papel em dólar", "Tijolo é no balcão; Papel na bolsa", "Não há diferença"],
              respostaCorreta: 0,
              explicacao: "FIIs de tijolo gerenciam imóveis reais; FIIs de papel gerenciam carteiras de crédito imobiliário."
            },
            {
              pergunta: "Como se calcula o Dividend Yield (DY)?",
              opcoes: ["Preço da cota ÷ Lucro do país", "Proventos por cota ÷ Preço atual da cota", "Valor patrimonial ÷ número de cotistas", "Selic × Imóvel"],
              respostaCorreta: 1,
              explicacao: "DY = Rendimento por cota / Preço da cota."
            },
            {
              pergunta: "P/VP de 0,85 indica:",
              opcoes: ["Cota negociada com 15% de desconto sobre o valor patrimonial", "Dívida de 85%", "Prejuízo de 85%", "Vacância de 85%"],
              respostaCorreta: 0,
              explicacao: "Desconto de 15% do preço de tela sobre o valor patrimonial dos bens do fundo."
            },
            {
              pergunta: "Os rendimentos mensais distribuídos por FIIs a pessoas físicas são tributados pelo IR?",
              opcoes: ["Sim, em 15%", "Sim, em 20%", "Não, são isentos nas regras vigentes para fundos elegíveis em bolsa", "Sim, via tabela regressiva"],
              respostaCorreta: 2,
              explicacao: "Rendimentos mensais de FIIs elegíveis são isentos de IR para PF."
            }
          ],
          pbl: {
            titulo: "Análise de Risco entre Dois FIIs",
            cenario: "FII A: DY 0,75% a.m., P/VP 0,98, vacância 2%. FII B: DY 1,10% a.m., P/VP 0,70, vacância 35%. Qual mais arriscado?",
            solucao: "O FII B é mais arriscado. A vacância de 35% indica perda de locatários e risco de queda nos rendimentos futuros. O DY alto atual é ilusório e o desconto no P/VP reflete essa desconfiança do mercado."
          },
          resumo: [
            "FIIs permitem investir no mercado imobiliário com qualquer valor e liquidez diária.",
            "FII de tijolo recebe aluguel; FII de papel recebe juros de títulos imobiliários.",
            "Rendimentos mensais são isentos de IR para PF dentro das regras da lei."
          ]
        },
        {
          id: "aula-08",
          slug: "aula-08-risco-e-diversificacao",
          numero: 8,
          titulo: "Aula 8: Risco, retorno e diversificação",
          comeceAqui: "Todo investimento envolve risco (incerteza). Diversificar combina ativos descorrelacionados para reduzir o risco do conjunto.",
          ideiaCentral: "Volatilidade mede o balanço dos preços. Correlação varia de -1 a +1. Diversificar elimina o risco específico de empresas.",
          conceitosEssenciais: [
            { conceito: "Volatilidade", significado: "Oscilação do preço do ativo ao longo do tempo" },
            { conceito: "Correlação", significado: "Grau em que dois ativos se movem no mesmo sentido (-1 a +1)" },
            { conceito: "Risco de crédito", significado: "Calote do emissor" },
            { conceito: "Risco de mercado", significado: "Flutuações de preços por fatores macro" },
            { conceito: "Perfil de Investidor", significado: "Conservador, Moderado ou Arrojado" }
          ],
          exemploResolvido: {
            titulo: "Efeito da Descorrelação",
            enunciado: "Comparar Carteira A (100% ações tech) e Carteira B (40% Selic, 20% IPCA+, 30% Ações variadas, 10% Caixa).",
            passos: [
              "1. Crise no setor tech derruba a Carteira A em 30%.",
              "2. Na Carteira B, os 40% em Selic e 20% em IPCA+ amortecem o resultado total."
            ],
            resultado: "A Carteira B sofreu perda muito menor devido à descorrelação dos ativos."
          },
          miniQuiz: [
            {
              pergunta: "O que mede a volatilidade de um ativo?",
              opcoes: ["A taxa de imposto", "A intensidade das oscilações de preço ao longo do tempo", "O número de acionistas", "O valor mínimo inicial"],
              respostaCorreta: 1,
              explicacao: "Volatilidade reflete a variação de preço em torno da média."
            },
            {
              pergunta: "Se dois ativos têm correlação +1:",
              opcoes: ["Movem-se quase sempre na mesma direção", "Um sobe e outro despenca", "Não têm risco", "São isentos de IR"],
              respostaCorreta: 0,
              explicacao: "Correlação +1 indica movimento perfeitamente paralelo."
            },
            {
              pergunta: "Por que ter 10 ações de empresas de mineração não é diversificação eficiente?",
              opcoes: ["FGC não cobre ações", "Todas estão expostas ao mesmo risco de queda do minério (alta correlação)", "Não podem pagar dividendos", "Proibido pela B3"],
              respostaCorreta: 1,
              explicacao: "Ativos do mesmo setor sofrem dos mesmos impactos externos."
            },
            {
              pergunta: "O FGC reduz qual tipo de risco?",
              opcoes: ["Risco de mercado", "Risco de crédito do banco emissor", "Risco de liquidez", "Risco cambial"],
              respostaCorreta: 1,
              explicacao: "O FGC garante reembolso em falência do banco emissor."
            },
            {
              pergunta: "O perfil conservador tem como foco principal:",
              opcoes: ["Dobrar o capital rápido", "Preservação de capital e segurança com menor volatilidade", "Investir só em small caps", "Comprar opções"],
              respostaCorreta: 1,
              explicacao: "O conservador prioriza segurança e liquidez."
            }
          ],
          pbl: {
            titulo: "Reestruturação da Carteira de Ana",
            cenario: "Ana tem 100% em ações de empresas aéreas. Como reestruturar a carteira para reduzir o risco?",
            solucao: "Manter apenas 5-10% no setor aéreo. Alocar a maior parte em renda fixa pós-fixada (Selic), títulos atrelados ao IPCA+ e ETFs de índices globais descorrelacionados."
          },
          resumo: [
            "Risco é incerteza, não só perda. Volatilidade é uma medida de risco.",
            "Diversificação funciona porque ativos com baixa correlação não caem juntos.",
            "O perfil de investidor define quanto risco faz sentido para cada pessoa."
          ]
        },
        {
          id: "aula-09",
          slug: "aula-09-macro-para-investidores",
          numero: 9,
          titulo: "Aula 9: Macroeconomia para investidores",
          comeceAqui: "Macroeconomia estuda juros, inflação, PIB e câmbio. Entender esse ambiente explica os movimentos dos ativos.",
          ideiaCentral: "Selic, IPCA, PIB e Câmbio movem os mercados. Renda fixa pós-fixada e renda variável reagem em direções opostas a variações da Selic.",
          conceitosEssenciais: [
            { conceito: "Selic", significado: "Taxa básica de juros definida pelo COPOM" },
            { conceito: "IPCA", significado: "Índice de inflação oficial" },
            { conceito: "PIB", significado: "Soma de bens e serviços produzidos no país" },
            { conceito: "Juro real", significado: "Taxa Selic descontada da inflação (IPCA)" }
          ],
          reacaoAtivosSelic: [
            { classe: "Renda fixa pós-fixada", selicSobe: "Rendimento sobe", selicCai: "Rendimento cai" },
            { classe: "Tesouro Prefixado longo", selicSobe: "Preço do título cai (marcação)", selicCai: "Preço do título sobe (marcação)" },
            { classe: "Ações e FIIs", selicSobe: "Pressão negativa nos preços", selicCai: "Pressão positiva nos preços" },
            { classe: "Câmbio (Dólar)", selicSobe: "Fortalece o real", selicCai: "Pressiona o dólar para cima" }
          ],
          exemploResolvido: {
            titulo: "Choque Inflacionário e Selic",
            enunciado: "IPCA sobe para 8% e COPOM eleva Selic para 13,75%. Efeito em Tesouro Selic vs Varejo.",
            passos: [
              "1. Tesouro Selic rende ~13,75% a.a. bruto sem risco de mercado.",
              "2. Varejo sofre com queda no consumo a crédito e alta de juros das dívidas."
            ],
            resultado: "Selic alta beneficia renda fixa pós-fixada e prejudica ações alavancadas."
          },
          miniQuiz: [
            {
              pergunta: "Com que frequência o COPOM se reúne para definir a Selic?",
              opcoes: ["Todos os meses", "A cada 45 dias (8 vezes ao ano)", "Duas vezes por ano", "Quando a inflação passa de 10%"],
              respostaCorreta: 1,
              explicacao: "As reuniões ordinárias ocorrem a cada 45 dias."
            },
            {
              pergunta: "Por que ciclo de alta da Selic prejudica ações?",
              opcoes: ["Aumenta o custo da dívida das empresas e torna a renda fixa sem risco muito atraente", "B3 fecha", "Dividendos são proibidos", "Dólar cai a zero"],
              respostaCorreta: 0,
              explicacao: "Selic alta atrai capital da bolsa para a renda fixa e aumenta despesas de dívida."
            },
            {
              pergunta: "Como se calcula o juro real aproximado?",
              opcoes: ["Selic + IPCA", "Selic - IPCA", "PIB ÷ Dólar", "Desemprego × 100"],
              respostaCorreta: 1,
              explicacao: "Juro real = Selic nominal − Inflação."
            },
            {
              pergunta: "Objetivo de um corte de juros pelo BC:",
              opcoes: ["Estimular o crédito, consumo e crescimento econômico", "Aumentar desemprego", "Subir inflação rápido", "Diminuir exportações"],
              respostaCorreta: 0,
              explicacao: "Juros menores barateiam o crédito e impulsionam a atividade econômica."
            },
            {
              pergunta: "O que acontece com um Tesouro Prefixado se as taxas futuras de juros caírem?",
              opcoes: ["O preço do título sobe na marcação a mercado", "O preço desaba", "Nada muda", "É cancelado"],
              respostaCorreta: 0,
              explicacao: "Queda nos juros futuros valoriza o PU dos títulos prefixados."
            }
          ],
          pbl: {
            titulo: "Impactos do Choque de Selic",
            cenario: "IPCA acelera e Selic sobe. Analise o impacto em: 1. Tesouro Selic, 2. Tesouro IPCA+, 3. Varejo, 4. FIIs de Shoppings.",
            solucao: "1. Tesouro Selic melhora rentabilidade. 2. Tesouro IPCA+ sofre desvalorização temporária na marcação a mercado. 3. Varejo sofre com despesas de dívidas e queda de vendas. 4. FIIs perdem atratividade frente às taxas de renda fixa altas."
          },
          resumo: [
            "Selic é o principal termômetro do mercado: cada classe de ativo reage de forma diferente.",
            "IPCA alto → BC sobe Selic → renda fixa rende mais, ações e FIIs sofrem pressão.",
            "Entender macro não é prever o futuro; é entender as forças que movem os preços.",
            "Com isso, você concluiu o Módulo 1 — Fundamentos em Finanças."
          ]
        }
      ]
    },
    {
      id: "modulo-2",
      slug: "modulo-2-analise-fundamentalista",
      numero: 2,
      titulo: "Módulo 2: Análise Fundamentalista de Empresas",
      descricao: "A empresa por trás da ação, balanço, DRE, fluxo de caixa, indicadores, múltiplos e valuation por fluxo de caixa descontado.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-o-que-e-analise-fundamentalista",
          numero: 1,
          titulo: "Aula 1: O que é análise fundamentalista?",
          comeceAqui: "A análise fundamentalista estuda o negócio e os números para estimar o valor intrínseco da empresa.",
          ideiaCentral: "Preço é o que você paga; valor é o que você leva. Busque comprar por menos do que o valor intrínseco (Margem de Segurança).",
          conceitosEssenciais: [
            { conceito: "Análise fundamentalista", significado: "Estudo dos fundamentos para estimar o valor da ação" },
            { conceito: "Valor intrínseco", significado: "Valor real da empresa baseado na capacidade de gerar lucro" },
            { conceito: "Preço de mercado", significado: "Cotação atual na bolsa" },
            { conceito: "Margem de segurança", significado: "Comprar por menos do que o valor estimado" }
          ],
          fraseGraham: "No curto prazo, o mercado é uma máquina de votar; no longo prazo, é uma balança.",
          exemploResolvido: {
            titulo: "Comparação de Lucro por Ação",
            enunciado: "Tropical (R$ 10, lucra R$ 2) vs Genéricos (R$ 10, lucra R$ 0,20).",
            passos: [
              "1. Tropical devolve o valor em 5 anos (10/2).",
              "2. Genéricos leva 50 anos (10/0,20)."
            ],
            resultado: "Tropical é mais barata em termos fundamentais."
          },
          miniQuiz: [
            {
              pergunta: "Diferença entre preço e valor de uma ação:",
              opcoes: ["Preço é a cotação na tela; valor é o valor intrínseco baseado em lucros e geração de caixa", "Preço é do BC; valor da CVM", "São idênticos", "Preço só vale para renda fixa"],
              respostaCorreta: 0,
              explicacao: "Preço é negociado diariamente em bolsa; valor reflete a realidade do negócio."
            },
            {
              pergunta: "Significado da frase de Graham sobre 'máquina de votar e balança':",
              opcoes: ["No curto prazo a especulação domina o preço; no longo prazo os lucros determinam o valor", "Ações dependem de eleições", "Preço depende do peso físico da empresa", "Corretoras votam preços"],
              respostaCorreta: 0,
              explicacao: "No longo prazo a capacidade de gerar lucros impõe o preço justo."
            },
            {
              pergunta: "Conceito de Margem de Segurança:",
              opcoes: ["Usar empréstimos", "Comprar por preço bem inferior ao valor intrínseco estimado", "Investir só em poupança", "Garantia do FGC em ações"],
              respostaCorreta: 1,
              explicacao: "A margem de segurança previne contra erros de análise e choques negativos."
            },
            {
              pergunta: "Por que ação de R$ 5 pode ser mais 'cara' que ação de R$ 100?",
              opcoes: ["O preço isolado não diz nada sem comparar com o lucro e patrimônio por ação entregue", "R$ 5 paga mais IR", "R$ 100 é só de banco", "Impossível"],
              respostaCorreta: 0,
              explicacao: "Preço de tela é relativo ao número de ações emitidas e lucros entregues."
            },
            {
              pergunta: "O que a análise fundamentalista avalia além dos demonstrativos?",
              opcoes: ["Médias móveis de gráficos", "Qualidade do negócio, setor e vantagens competitivas", "Logotipo", "Opinião de influenciadores"],
              respostaCorreta: 1,
              explicacao: "Aspectos qualitativos do modelo de negócio antecedem os resultados contábeis."
            }
          ],
          pbl: {
            titulo: "Preço em Queda é Oportunidade?",
            cenario: "Ação caiu 40% no ano. Está barata?",
            solucao: "Não necessariamente. Se os lucros caíram 80% ou as dívidas explodiram, o valor intrínseco caiu mais que a cotação, tornando a ação mais cara do que antes da queda."
          },
          resumo: [
            "Ação é um pedaço de uma empresa real; analisar a ação é analisar a empresa.",
            "Preço é o que o mercado cobra; valor é o que a empresa vale pela sua capacidade de gerar lucro.",
            "A análise fundamentalista busca comprar com margem de segurança."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-a-empresa-por-tras-da-acao",
          numero: 2,
          titulo: "Aula 2: A empresa por trás da ação",
          comeceAqui: "Entenda como a empresa ganha dinheiro e o que impede a concorrência de copiar o negócio.",
          ideiaCentral: "Vantagem competitiva (moat) protege o lucro contra concorrentes. O setor define resiliência ou ciclicidade.",
          conceitosEssenciais: [
            { conceito: "Modelo de negócio", significado: "Como a empresa produz, entrega e cobra por seu valor" },
            { conceito: "Vantagem competitiva (Moat)", significado: "Proteção sustentável dos lucros contra a concorrência" },
            { conceito: "Cíclico vs Resiliente", significado: "Cíclicos variam com o PIB; Resilientes mantêm demanda constante" },
            { conceito: "Poder de precificação", significado: "Capacidade de repassar inflação sem perder vendas" }
          ],
          tiposVantagemCompetitiva: [
            { tipo: "Marca", descricao: "Confiança/status (ex: Coca-Cola)" },
            { tipo: "Custo mais baixo", descricao: "Produzir por menos que rivais (ex: mineradoras)" },
            { tipo: "Efeito de rede", descricao: "Valor sobe com mais usuários (ex: B3)" },
            { tipo: "Custo de troca", significado: "Custo alto para o cliente trocar de sistema (ex: ERPs)" },
            { tipo: "Barreira regulatória", descricao: "Licenças governamentais (ex: elétricas)" }
          ],
          exemploResolvido: {
            titulo: "Análise Qualitativa da Tropical S.A.",
            enunciado: "Vantagens e riscos do negócio de sorvetes no Nordeste.",
            passos: [
              "1. Vantagens: marca forte + frota própria refrigerada de distribuição.",
              "2. Riscos: sazonalidade + custo de commodities (leite/açúcar)."
            ],
            resultado: "A análise qualitativa indica o que acompanhar nas demonstrações (margem e dívida)."
          },
          miniQuiz: [
            {
              pergunta: "Significado de 'moat' em empresas:",
              opcoes: ["Impostos atrasados", "Fosso de vantagem competitiva que protege os lucros contra concorrentes", "Contrato de aluguel", "Bônus da diretoria"],
              respostaCorreta: 1,
              explicacao: "Moat é o diferencial sustentável que bloqueia a concorrência."
            },
            {
              pergunta: "Exemplo de Custo de Troca (Switching Cost):",
              opcoes: ["Comprar lata vermelha", "Empresa trocar de ERP e gastar 6 meses treinando a equipe", "Gasolina 1 centavo mais barata", "Liquidação de estoque"],
              respostaCorreta: 1,
              explicacao: "Custos de migração elevados retêm a base de clientes."
            },
            {
              pergunta: "Diferença entre setor cíclico e resiliente:",
              opcoes: ["Cíclico varia com o PIB; resiliente mantém demanda em crises", "Cíclico é só do governo", "Cíclico não paga IR", "Sem diferença"],
              respostaCorreta: 0,
              explicacao: "Saneamento/energia são resilientes; construção e siderurgia são cíclicas."
            },
            {
              pergunta: "O que demonstra 'poder de precificação'?",
              opcoes: ["Repassar inflação aos preços sem perder volume", "Dar 50% de desconto", "Baixar preço com concorrente", "Vender em dólar"],
              respostaCorreta: 0,
              explicacao: "Aumentar preços mantendo volume indica força da marca/essencialidade."
            },
            {
              pergunta: "Por que a indústria/setor é tão importante?",
              opcoes: ["Dificuldades do setor podem limitar as margens até de boas empresas", "CVM proíbe lucro", "Empresas médias não pagam salários", "Por azar"],
              respostaCorreta: 0,
              explicacao: "A estrutura competitiva do setor impõe limites às margens das empresas."
            }
          ],
          pbl: {
            titulo: "Comparando Fabricante de Celular vs Software ERP",
            cenario: "Qual empresa possui lucros mais protegidos: celular genérico ou software ERP de farmácias?",
            solucao: "O software ERP tem altíssimo custo de troca e receita recorrente, garantindo lucros protegidos. O celular genérico compete só por preço sem nenhuma vantagem de proteção."
          },
          resumo: [
            "Entender o negócio vem antes de analisar os números.",
            "Vantagens competitivas (marca, custo, rede, custo de troca, regulação) protegem o lucro futuro.",
            "O setor define boa parte do destino da empresa."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-balanco-patrimonial",
          numero: 3,
          titulo: "Aula 3: Balanço patrimonial",
          comeceAqui: "O balanço é a fotografia da empresa: Ativo (o que tem), Passivo (o que deve) e Patrimônio Líquido (sobra dos sócios).",
          ideiaCentral: "Ativo = Passivo + Patrimônio Líquido (PL). Dívida Líquida = Dívida Bruta − Caixa.",
          conceitosEssenciais: [
            { conceito: "Ativo Circulante", significado: "Bens que viram dinheiro em até 12 meses" },
            { conceito: "Passivo Circulante", significado: "Dívidas que vencem em até 12 meses" },
            { conceito: "Patrimônio Líquido (PL)", significado: "Capital dos sócios (Ativo − Passivo)" },
            { conceito: "Dívida Líquida", significado: "Empréstimos totais minus Caixa" }
          ],
          exemploBalanco: {
            empresa: "Tropical S.A.",
            ativoTotal: 400,
            passivoTotal: 150,
            patrimonioLiquido: 250,
            dividaBruta: 110,
            caixa: 50,
            dividaLiquida: 60
          },
          miniQuiz: [
            {
              pergunta: "Equação fundamental do Balanço:",
              opcoes: ["Ativo = Passivo + Patrimônio Líquido", "Ativo = Lucro - Dívida", "Passivo = Ativo + Caixa", "PL = Receita - Despesas"],
              respostaCorreta: 0,
              explicacao: "Ativos são financiados por terceiros (Passivo) e sócios (PL)."
            },
            {
              pergunta: "Ativo Circulante reúne:",
              opcoes: ["Bens físicos antigos", "Recursos conversíveis em dinheiro em até 12 meses", "Fábricas de 10 anos", "Dívidas fiscais"],
              respostaCorreta: 1,
              explicacao: "Itens de giro de curto prazo (caixa, estoques, a receber)."
            },
            {
              pergunta: "Cálculo da Dívida Líquida:",
              opcoes: ["Dívida Bruta total − Caixa e equivalentes", "Passivo Circulante ÷ Ativo", "Lucro × 10", "PL − Estoque"],
              respostaCorreta: 0,
              explicacao: "Dívida Líquida = Empréstimos totais − Caixa."
            },
            {
              pergunta: "Estoque crescendo muito rápido enquanto vendas caem indica:",
              opcoes: ["Boa gestão", "Produtos encalhados ou perda de demanda", "Valorização na B3", "Isenção de IR"],
              respostaCorreta: 1,
              explicacao: "Acúmulo não planejado de estoques reflete dificuldade de vendas."
            },
            {
              pergunta: "Patrimônio Líquido (PL) negativo significa:",
              opcoes: ["Sem juros", "Passivo (dívidas) maior que o Ativo (passivo a descoberto)", "Ações triplicaram", "Caixa > Estoques"],
              respostaCorreta: 1,
              explicacao: "Ocorre quando os bens totais não cobrem as dívidas com terceiros."
            }
          ],
          pbl: {
            titulo: "Balanço Pessoal de Ana",
            cenario: "Ativo R$ 5k (2k caixa + 3k note). Passivo R$ 10,5k (4,5k cartão + 6k curso). Diagnóstico?",
            solucao: "PL = 5,0k - 10,5k = -R$ 5,5k (negativo). Problema patrimonial e iliquidez imediata (caixa 2k não paga fatura 4,5k)."
          },
          resumo: [
            "Balanço é a fotografia de uma data: ativo, passivo e PL.",
            "Ativo = Passivo + PL, sempre.",
            "Dívida líquida é a medida-chave de endividamento."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-dre",
          numero: 4,
          titulo: "Aula 4: DRE — Demonstração do Resultado",
          comeceAqui: "A DRE é o filme que mostra a formação do Lucro Líquido a partir da Receita Líquida.",
          ideiaCentral: "Receita − CPV = Lucro Bruto. Subtrai despesas → EBIT. Subtrai juros e IR → Lucro Líquido.",
          escadaDRE: [
            "Receita Líquida",
            "(−) CPV",
            "(=) Lucro Bruto",
            "(−) Despesas Operacionais",
            "(=) EBIT",
            "(−) Resultado Financeiro",
            "(=) Lucro Líquido"
          ],
          conceitosEssenciais: [
            { conceito: "EBIT", significado: "Lucro operacional antes de juros e impostos" },
            { conceito: "EBITDA", significado: "EBIT + Depreciação e Amortização" },
            { conceito: "Margem Líquida", significado: "Lucro Líquido ÷ Receita Líquida" }
          ],
          exemploResolvido: {
            titulo: "DRE da Tropical S.A.",
            enunciado: "Receita 300; CPV 180; Despesas 75; Juros 12; IR 10.",
            passos: [
              "1. Lucro Bruto = 120 (40%)",
              "2. EBIT = 45 (15%)",
              "3. Lucro Líquido = 23 (7,7%)"
            ],
            resultado: "Margem líquida de 7,7% sobre a receita."
          },
          miniQuiz: [
            {
              pergunta: "Lucro Bruto mede:",
              opcoes: ["Sobra após juros", "Receita Líquida − CPV (rentabilidade direta do produto)", "Impostos", "Caixa final"],
              respostaCorreta: 1,
              explicacao: "Mede o retorno da fabricação/venda direta."
            },
            {
              pergunta: "Diferença entre EBIT e EBITDA:",
              opcoes: ["EBITDA soma Depreciação e Amortização de volta ao EBIT", "EBIT inclui IR", "EBIT em dólar", "Sem diferença"],
              respostaCorreta: 0,
              explicacao: "EBITDA adiciona despesas não-caixa de depreciação/amortização."
            },
            {
              pergunta: "EBIT alto e Lucro Líquido baixo indica:",
              opcoes: ["CPV alto", "Despesas de juros altas por dívidas elevadas", "Falta de cliente", "Sem IR"],
              respostaCorreta: 1,
              explicacao: "Juros financeiros estão consumindo o lucro operacional."
            },
            {
              pergunta: "Por que comparar trimestres iguais de anos anteriores (ex: 4T23 vs 4T22)?",
              opcoes: ["Anular efeito da sazonalidade", "Proibido sequencial", "IR muda", "Ações vencem"],
              respostaCorreta: 0,
              explicacao: "A comparação homóloga elimina flutuações sazonais."
            },
            {
              pergunta: "Resultados não recorrentes na DRE:",
              opcoes: ["Salários", "Eventos atípicos extraordinários (ex: venda de um imóvel)", "Venda no balcão", "Luz da fábrica"],
              respostaCorreta: 1,
              explicacao: "Eventos não recorrentes distorcem o resultado operacional normal."
            }
          ],
          pbl: {
            titulo: "Efeito do Fim dos Juros na DRE",
            cenario: "Lanchonete: Receita 20k, CPV 9k, Despesas 5k, Juros 1,2k, IR 20%. Efeito de quitar a dívida?",
            solucao: "EBIT = 6k. Sem juros: LAIR = 6k, IR (20%) = 1,2k, Lucro Líquido = R$ 4.800 (ganho de R$ 960 limpos no lucro líquido)."
          },
          resumo: [
            "A DRE mostra o caminho da receita até o lucro líquido em um período.",
            "As margens dizem onde a empresa ganha ou perde eficiência.",
            "Lucro contábil não é caixa."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-fluxo-de-caixa",
          numero: 5,
          titulo: "Aula 5: Fluxo de caixa",
          comeceAqui: "Lucro é opinião, caixa é fato. A DFC mede a movimentação financeira real.",
          ideiaCentral: "DFC divide em Operacional (FCO), Investimentos (FCI/Capex) e Financiamentos (FCF). FCL = FCO − Capex.",
          conceitosEssenciais: [
            { conceito: "FCO", significado: "Dinheiro gerado pela operação" },
            { conceito: "FCI / Capex", significado: "Investimentos em máquinas/infraestrutura" },
            { conceito: "Fluxo de Caixa Livre (FCL)", significado: "FCO − Capex" }
          ],
          exemploResolvido: {
            titulo: "DFC da Tropical S.A.",
            enunciado: "FCO +40 mi; Capex -25 mi; FCF -10 mi.",
            passos: [
              "1. FCL = 40 - 25 = R$ 15 mi.",
              "2. Variação de caixa = +5 mi."
            ],
            resultado: "A operação gerou R$ 15 mi livres após os investimentos."
          },
          miniQuiz: [
            {
              pergunta: "Por que 'lucro é opinião, caixa é fato'?",
              opcoes: ["Lucro usa competência/estimativas; caixa mede entradas/saídas reais de dinheiro", "DFC é secreta", "Caixa é só em papel", "Lucro é do governo"],
              respostaCorreta: 0,
              explicacao: "Caixa registra a movimentação efetiva de liquidez."
            },
            {
              pergunta: "Cálculo do Fluxo de Caixa Livre (FCL):",
              opcoes: ["Lucro + Estoque", "FCO − Capex", "Passivo ÷ Ativo", "Receita × Selic"],
              respostaCorreta: 1,
              explicacao: "FCL = FCO − Capex."
            },
            {
              pergunta: "FCO (-), FCI (+) e FCF (+) por vários trimestres indica:",
              opcoes: ["Empresa saudável", "Alerta grave: operação queima caixa e empresa vende bens e pega dívidas para sobreviver", "Maior margem", "FII"],
              respostaCorreta: 1,
              explicacao: "Operação queima caixa de forma insustentável."
            },
            {
              pergunta: "O que é Capex?",
              opcoes: ["Salário", "Investimentos financeiros", "Investimentos em imobilizado/equipamentos para a empresa", "Impostos"],
              respostaCorreta: 2,
              explicacao: "Gasto de capital em infraestrutura."
            },
            {
              pergunta: "Lucro subindo e FCO caindo por 4 trimestres indica:",
              opcoes: ["Vendas a prazo sem recebimento ou estouro de estoques", "Dividendos", "Isenção", "Queda de IR"],
              respostaCorreta: 0,
              explicacao: "Vendas sem caixa (a receber subindo) inflam DRE mas travam FCO."
            }
          ],
          pbl: {
            titulo: "Lucro sem Caixa na Loja Virtual",
            cenario: "DRE diz lucro R$ 8k. Mas R$ 12k foram a prazo, gastou R$ 6k em estoque e pegou R$ 5k emprestados. FCO?",
            solucao: "FCO = 8.000 - 12.000 - 6.000 = -R$ 10.000 (queima de caixa operacional de 10k). A empresa lucrou na DRE mas queimou caixa real."
          },
          resumo: [
            "A DFC mostra o dinheiro real: FCO, FCI e FCF.",
            "Fluxo de caixa livre (FCO − capex) é o que sobra.",
            "Padrão saudável: FCO (+), FCI (-) e FCF (-)."
          ]
        },
        {
          id: "aula-06",
          slug: "aula-06-indicadores-de-rentabilidade",
          numero: 6,
          titulo: "Aula 6: Indicadores de rentabilidade",
          comeceAqui: "Indicadores medem o retorno proporcional obtido sobre o capital empregado.",
          ideiaCentral: "ROE = Lucro Líquido ÷ PL. ROA = Lucro Líquido ÷ Ativo = Margem Líquida × Giro do Ativo.",
          indicadoresChave: [
            { indicador: "Margem Líquida", formula: "Lucro Líquido ÷ Receita", utilidade: "Margem final" },
            { indicador: "ROE", formula: "Lucro Líquido ÷ Patrimônio Líquido", utilidade: "Retorno dos sócios" },
            { indicador: "ROA", formula: "Lucro Líquido ÷ Ativo Total", utilidade: "Retorno dos ativos" }
          ],
          exemploResolvido: {
            titulo: "Indicadores da Tropical S.A.",
            enunciado: "Lucro 23; Receita 300; PL 250; Ativo 400.",
            passos: [
              "1. Margem Líquida = 7,7%",
              "2. ROE = 9,2%",
              "3. ROA = 5,8%"
            ],
            resultado: "ROE de 9,2% fica abaixo do custo sem risco (Selic 10%)."
          },
          miniQuiz: [
            {
              pergunta: "Cálculo do ROE:",
              opcoes: ["Receita ÷ Dívida", "Lucro Líquido ÷ Patrimônio Líquido", "EBITDA ÷ Ativo", "Ativo ÷ Passivo"],
              respostaCorreta: 1,
              explicacao: "ROE = Lucro / PL."
            },
            {
              pergunta: "Com o que comparar o ROE para saber se cria valor?",
              opcoes: ["Inflação zero", "Taxa livre de risco (Selic) e custo de capital", "Dólar do dia", "Câmbio"],
              respostaCorreta: 1,
              explicacao: "Se o ROE é menor que a Selic, o negócio destrói valor."
            },
            {
              pergunta: "Estratégia do modelo 'supermercado':",
              opcoes: ["Margem alta, giro baixo", "Margem pequena com alto giro dos ativos", "Zero giro", "Alavancagem 100%"],
              respostaCorreta: 1,
              explicacao: "Compensa margem pequena girando rápido o estoque."
            },
            {
              pergunta: "O que infla artificialmente o ROE?",
              opcoes: ["Endividamento alto (reduz o PL no denominador)", "Pagamento de impostos", "Caixa alto", "Mais funcionários"],
              respostaCorreta: 0,
              explicacao: "Mais dívida reduz o PL, subindo o ROE via alavancagem."
            },
            {
              pergunta: "Mede o que sobra de lucro limpo a cada R$ 100 vendidos:",
              opcoes: ["Margem Bruta", "Margem Líquida", "Giro", "Liquidez"],
              respostaCorreta: 1,
              explicacao: "Margem Líquida = Lucro / Receita."
            }
          ],
          pbl: {
            titulo: "ROE com Dívida vs sem Dívida",
            cenario: "Empresa A: Lucro 50, PL 500, Dívida 0 (ROE 10%). Empresa B: Lucro 45, PL 150, Dívida 400 (ROE 30%). Qual mais sólida?",
            solucao: "Empresa A é financeiramente muito mais sólida. O ROE de 30% da B ocorre por alavancagem de risco de R$ 400 mi em dívidas."
          },
          resumo: [
            "Rentabilidade compara lucro com vendas, patrimônio ou ativos.",
            "ROE mede o retorno dos sócios.",
            "ROA = margem × giro."
          ]
        },
        {
          id: "aula-07",
          slug: "aula-07-endividamento-e-liquidez",
          numero: 7,
          titulo: "Aula 7: Endividamento e liquidez",
          comeceAqui: "Dívida atua como alavanca. Avalie solidez de longo prazo e liquidez de curto prazo.",
          ideiaCentral: "Dívida Líquida/EBITDA avalia solvência. Liquidez Corrente (Ativo Circ/Passivo Circ) avalia fôlego de curto prazo.",
          indicadoresChave: [
            { indicador: "Dívida Líquida / EBITDA", formula: "Dívida Líquida ÷ EBITDA", utilidade: "Anos de caixa operacional para pagar a dívida" },
            { indicador: "Cobertura de Juros", formula: "EBIT ÷ Juros", utilidade: "Capacidade da operação pagar os juros" },
            { indicador: "Liquidez Corrente", formula: "Ativo Circ ÷ Passivo Circ", utilidade: "Pagar contas em 12 meses" }
          ],
          exemploResolvido: {
            titulo: "Métricas da Tropical S.A.",
            enunciado: "Dívida Líquida 60; EBITDA 62; EBIT 45; Juros 12; AC 150; PC 70.",
            passos: [
              "1. Dívida Líquida / EBITDA = 0,97× (Saudável)",
              "2. Cobertura de Juros = 3,75×",
              "3. Liquidez Corrente = 2,14×"
            ],
            resultado: "Empresa sólida, sem risco imediato de insolvência."
          },
          miniQuiz: [
            {
              pergunta: "Dívida Líquida / EBITDA indica:",
              opcoes: ["% de imposto", "Anos de EBITDA necessários para pagar a dívida líquida", "Ações B3", "Dividendos"],
              respostaCorreta: 1,
              explicacao: "Mede o número de anos de geração operacional para pagar a dívida."
            },
            {
              pergunta: "Diferença da Liquidez Seca para a Corrente:",
              opcoes: ["Desconta os estoques do Ativo Circulante", "Não inclui caixa", "Só para falidos", "Sem diferença"],
              respostaCorreta: 0,
              explicacao: "Retira estoques por serem menos líquidos."
            },
            {
              pergunta: "Cobertura de Juros de 1,1× indica:",
              opcoes: ["Lucros fabulosos", "Operação mal consegue pagar os juros da dívida", "Dividendos vão dobrar", "Garantia FGC"],
              respostaCorreta: 1,
              explicacao: "Qualquer queda no EBIT impede o pagamento dos juros."
            },
            {
              pergunta: "Liquidez Corrente de 0,70 significa:",
              opcoes: ["Para cada R$ 1 de dívida de curto prazo há R$ 0,70 de recursos circulantes", "Sem dívida", "Ativo 70% maior", "Lucro 30%"],
              respostaCorreta: 0,
              explicacao: "Déficit de liquidez no curto prazo."
            },
            {
              pergunta: "Por que comparar endividamento apenas entre empresas do mesmo setor?",
              opcoes: ["Setores com receitas previsíveis (elétricas) suportam mais dívida do que setores voláteis", "Proibido pela CVM", "Sem balanço", "Selic não afeta elétricas"],
              respostaCorreta: 0,
              explicacao: "Previsibilidade de receita define o limite seguro de alavancagem."
            }
          ],
          pbl: {
            titulo: "Armadilha da Liquidez com Estoques Encalhados",
            cenario: "Construtora tem Liquidez Corrente 2,5, mas 80% do AC é imóvel em estoque travado. Qual a Liquidez Seca?",
            solucao: "Descontando os estoques (80%), restam 20% do AC. Liquidez Seca = 2,5 × 0,20 = 0,50. A construtora está em risco severo de iliquidez."
          },
          resumo: [
            "Endividamento mede a solidez de longo prazo; liquidez mede a capacidade de pagar contas no curto prazo.",
            "Dívida Líquida/EBITDA e Liquidez Corrente são indispensáveis.",
            "Sempre compare com pares do setor."
          ]
        },
        {
          id: "aula-08",
          slug: "aula-08-multiplos-de-valuation",
          numero: 8,
          titulo: "Aula 8: Múltiplos de valuation",
          comeceAqui: "Múltiplos comparam o preço de mercado contra fundamentos da empresa.",
          ideiaCentral: "Múltiplo = Preço / Fundamento. P/L = anos de lucro para pagar a ação. EV/EBITDA inclui a dívida no preço.",
          principaisMultiplos: [
            { multiplo: "P/L", formula: "Preço ÷ Lucro por Ação (LPA)", uso: "Anos para recuperar o valor via lucro" },
            { multiplo: "P/VP", formula: "Preço ÷ Valor Patrimonial por Ação", uso: "Preço sobre patrimônio contábil" },
            { multiplo: "EV/EBITDA", formula: "EV (Mercado + Dívida Líq) ÷ EBITDA", uso: "Valuation da firma inteira" },
            { multiplo: "DY", formula: "Proventos ÷ Preço da Ação", uso: "Retorno em dividendos" }
          ],
          exemploResolvido: {
            titulo: "Múltiplos da Tropical S.A.",
            enunciado: "Valor Mercado 230 mi; Lucro 23 mi; PL 250 mi; EBITDA 62 mi; Dívida Líq 60 mi; Dividendos 9,2 mi.",
            passos: [
              "1. P/L = 230 / 23 = 10,0×",
              "2. P/VP = 230 / 250 = 0,92×",
              "3. EV/EBITDA = (230 + 60) / 62 = 4,67×",
              "4. DY = 9,2 / 230 = 4,0%"
            ],
            resultado: "Tropical negocia com desconto frente à média do setor de 14x P/L."
          },
          miniQuiz: [
            {
              pergunta: "P/L de 10× significa:",
              opcoes: ["Ação custa R$ 10", "Mercado paga 10 anos de lucro atual por cada ação", "Dividendos de 10%", "Dívida de 10 milhões"],
              respostaCorreta: 1,
              explicacao: "P/L = Cotação / Lucro por Ação."
            },
            {
              pergunta: "Por que EV/EBITDA compara empresas com dívidas diferentes melhor do que P/L?",
              opcoes: ["EV considera a dívida líquida no preço da firma inteira e o EBITDA é operacional", "Exclui ações", "Calculado pelo BC", "P/L só serve para estatais"],
              respostaCorreta: 0,
              explicacao: "Enterprise Value soma a dívida líquida ao valor de mercado das ações."
            },
            {
              pergunta: "O que é Value Trap?",
              opcoes: ["Ação com P/L alto que sobe", "Ação com múltiplos aparentemente baratos mas com negócio se deteriorando", "Renda fixa sem garantia", "Fraude CVM"],
              respostaCorreta: 1,
              explicacao: "Ações baratas por deterioração fundamental dos negócios."
            },
            {
              pergunta: "P/VP < 1,0× significa:",
              opcoes: ["Preço de mercado menor que o patrimônio líquido contábil", "Lucro negativo", "Sem ações ON", "Subiu 100%"],
              respostaCorreta: 0,
              explicacao: "Cotação abaixo do valor patrimonial contábil."
            },
            {
              pergunta: "Comparação válida para múltiplos:",
              opcoes: ["Banco com tech", "Pares do mesmo setor e histórico da própria empresa", "P/L com poupança", "DY com PIB"],
              respostaCorreta: 1,
              explicacao: "Exige comparabilidade setorial e histórica."
            }
          ],
          pbl: {
            titulo: "Farma A (P/L 25x) vs Farma B (P/L 9x)",
            cenario: "Farma A cresce lucros a 20% a.a. Farma B estagnada perdendo mercado. B é pechincha?",
            solucao: "Farma B é uma Value Trap. O P/L de 9x reflete a queda futura nos lucros. Farma A justifica 25x pelo forte crescimento sustentável."
          },
          resumo: [
            "Múltiplos dividem preço por fundamento: P/L, P/VP, EV/EBITDA e DY.",
            "Múltiplo baixo só é barganha se o fundamento for sustentável.",
            "Compare com pares e com o histórico."
          ]
        },
        {
          id: "aula-09",
          slug: "aula-09-valuation-fluxo-de-caixa-descontado",
          numero: 9,
          titulo: "Aula 9: Valuation — fluxo de caixa descontado",
          comeceAqui: "O Fluxo de Caixa Descontado (FCD) estima o valor intrínseco em reais trazendo os fluxos futuros a valor presente.",
          ideiaCentral: "VP = FC_n / (1 + i)^n. O valuation soma os VPs projetados, adiciona a perpetuidade e subtrai a dívida líquida.",
          passosValuation: [
            "1. Projetar o FCL para 5 a 10 anos.",
            "2. Definir a Taxa de Desconto (WACC/risco).",
            "3. Trazer VPs a valor presente e estimar a Perpetuidade.",
            "4. Subtrair a Dívida Líquida e obter o Valor Intrínseco por Ação."
          ],
          exemploResolvido: {
            titulo: "Valuation da Tropical S.A.",
            enunciado: "FCL inicial 15 mi; Crescimento 4% por 5 anos; Taxa 14%; Dívida 60 mi.",
            passos: [
              "1. Soma VPs dos 5 anos = R$ 57,5 mi.",
              "2. VP da Perpetuidade = R$ 67,6 mi.",
              "3. Valor da Operação = R$ 125,1 mi.",
              "4. Valor para Acionista = 125,1 - 60 = R$ 65,1 mi."
            ],
            resultado: "Valor intrínseco estimado de R$ 65,1 mi."
          },
          miniQuiz: [
            {
              pergunta: "Conceito do FCD:",
              opcoes: ["Imóveis físicos", "Empresa vale a soma dos seus fluxos de caixa livres futuros trazidos a valor presente", "10x faturamento", "Dívida + Selic"],
              respostaCorreta: 1,
              explicacao: "FCD desposta a valor presente a capacidade de geração de dinheiro."
            },
            {
              pergunta: "Taxa de Desconto representa:",
              opcoes: ["Comissão do corretor", "Custo de oportunidade (taxa sem risco + prêmio de risco do negócio)", "Desconto do IR", "Margem bruta"],
              respostaCorreta: 1,
              explicacao: "Remunera o investidor pelo tempo e risco assumidos."
            },
            {
              pergunta: "O que é a Perpetuidade no FCD?",
              opcoes: ["Valor dos fluxos de caixa futuros após o período de projeção explícita", "Multa de falência", "Lucro do ano 1", "Taxa do IPO"],
              respostaCorreta: 0,
              explicacao: "Captura o valor contínuo do negócio além dos anos projetados."
            },
            {
              pergunta: "Por que o FCD é sensível a premissas?",
              opcoes: ["Pequenas variações na taxa de desconto ou crescimento alteram o valor final expressivamente", "Depende do dólar", "Sem matemática", "CVM altera a fórmula"],
              respostaCorreta: 0,
              explicacao: "Alterar premissas causa impactos exponenciais nos valores presentes."
            },
            {
              pergunta: "Utilidade prática do FCD:",
              opcoes: ["Testar a razoabilidade das premissas embutidas no preço de tela atual", "Garantir ganho em day trade", "Definir salário", "Cancelar juros"],
              respostaCorreta: 0,
              explicacao: "Revela quais premissas operacionais a cotação atual exige."
            }
          ],
          pbl: {
            titulo: "Estrutura do Relatório para BRHSIC",
            cenario: "Como estruturar um relatório completo de Equity Research para a competição BRHSIC?",
            solucao: "1. Tese de Investimento & Negócio; 2. Análise dos Demonstrativos (Balanço, DRE, DFC); 3. Rentabilidade e Solvência (ROE, Dívida/EBITDA); 4. Valuation (Múltiplos e FCD com premissas); 5. Recomendação com Margem de Segurança."
          },
          resumo: [
            "Uma empresa vale a soma dos fluxos de caixa futuros trazidos a valor presente.",
            "Taxa de desconto = taxa sem risco + prêmio de risco.",
            "O FCD serve para revelar o que o preço embute."
          ]
        }
      ]
    },
    {
      id: "modulo-3",
      slug: "modulo-3-portfolio",
      numero: 3,
      titulo: "Módulo 3: Montagem de Portfólio e Investimento",
      descricao: "Diversificação, perfil de investidor, classes de ativos, alocação, risco de carteira, rebalanceamento, custos e estudo de caso completo.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-o-que-e-um-portfolio",
          numero: 1,
          titulo: "Aula 1: O que é um portfólio (e por que não ter um ativo só)",
          comeceAqui: "Portfólio é o conjunto de investimentos pensado como um time.",
          ideiaCentral: "A diversificação combina ativos descorrelacionados para reduzir o risco do conjunto sem sacrificar o retorno na mesma proporção.",
          conceitosEssenciais: [
            { conceito: "Portfólio", significado: "O conjunto total dos seus investimentos" },
            { conceito: "Risco Específico", significado: "Risco de um ativo individual (eliminado pela diversificação)" },
            { conceito: "Risco de Mercado", significado: "Risco sistemático macroeconômico (não somem com diversificação)" }
          ],
          exemploResolvido: {
            titulo: "Queda Setorial: João vs Ana",
            enunciado: "João (100% aérea) vs Ana (diversificada com 10% aérea). Ação cai 30%.",
            passos: [
              "1. João: perde -30% do patrimônio total.",
              "2. Ana: perde 30% em apenas 10% do capital (impacto de -3% no total)."
            ],
            resultado: "Ana reduz o estrago em 10 vezes mantendo exposição."
          },
          miniQuiz: [
            {
              pergunta: "O que é um portfólio?",
              opcoes: ["Relatório CVM", "O conjunto total dos ativos e aplicações de um investidor", "Contrato bancário", "Conta sem juros"],
              respostaCorreta: 1,
              explicacao: "Combinação total de todos os ativos investidos."
            },
            {
              pergunta: "Risco reduzido pela diversificação:",
              opcoes: ["Risco Específico do ativo", "Risco de Mercado", "Risco de inflação", "Nenhum"],
              respostaCorreta: 0,
              explicacao: "Dilui eventos individuais de empresas isoladas."
            },
            {
              pergunta: "O Risco de Mercado pode ser eliminado?",
              opcoes: ["Sim com 50 ações", "Não, choques macro afetam o mercado geral", "Sim com FIIs", "Sim com notação"],
              respostaCorreta: 1,
              explicacao: "Eventos macroeconômicos impactam todo o mercado."
            },
            {
              pergunta: "Lição do sorvete e da capa de chuva:",
              opcoes: ["Vender só sorvete", "Ativos com comportamentos opostos equilibram a receita total", "Sem IR", "Clima não afeta"],
              respostaCorreta: 1,
              explicacao: "Ativos descorrelacionados suavizam oscilações em diferentes momentos."
            },
            {
              pergunta: "Investir 100% nas ações da empresa em que trabalha gera:",
              opcoes: ["Estratégia segura", "Concentração dupla de risco (salário + patrimônio no mesmo emissor)", "Isenção fiscal", "Recomendado pelo BC"],
              respostaCorreta: 1,
              explicacao: "Risco duplo de perda simultânea de emprego e economias."
            }
          ],
          pbl: {
            titulo: "Análise de Risco de Carlos",
            cenario: "Carlos tem salário, 100% de ações e financiamento da casa no mesmo banco. Riscos?",
            solucao: "Risco triplo concentrado. Se o banco falir, perde emprego e patrimônio mantendo a dívida. Correção: diversificar patrimônio para Tesouro e ativos globais."
          },
          resumo: [
            "Portfólio é o conjunto; o que importa é o comportamento do time.",
            "Diversificação elimina o risco específico, mas não o risco de mercado.",
            "Combinar ativos descorrelacionados reduz o risco."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-perfil-de-investidor-e-objetivos",
          numero: 2,
          titulo: "Aula 2: Perfil de investidor e objetivos",
          comeceAqui: "O horizonte de tempo manda no risco. Defina o prazo de cada objetivo antes de alocar.",
          ideiaCentral: "Curto prazo (< 2 anos) exige segurança. Longo prazo (> 5 anos) suporta volatilidade em busca de maior rentabilidade real.",
          conceitosEssenciais: [
            { conceito: "Tolerância a Risco", significado: "Disposição psicológica a oscilações" },
            { conceito: "Capacidade de Risco", significado: "Condição financeira real da vida para absorver perdas" },
            { conceito: "Horizonte", significado: "Prazo de uso do capital" }
          ],
          exemploResolvido: {
            titulo: "Multi-perfis de Ana",
            enunciado: "Emergência (Selic), Intercâmbio 2 anos (Prefixado/CDB), Aposentadoria (Renda Variável).",
            passos: [
              "1. Curto prazo: liquidez total.",
              "2. Médio prazo: taxa travada sem marcação final.",
              "3. Longo prazo: volatilidade para crescer."
            ],
            resultado: "A mesma pessoa aloca com riscos diferentes conforme o objetivo."
          },
          miniQuiz: [
            {
              pergunta: "Por que a carteira sustentável psicologicamente é melhor?",
              opcoes: ["Evita vendas em pânico no fundo do poço", "BC premia", "Paga mais imposto", "Sem diferença"],
              respostaCorreta: 0,
              explicacao: "Evita perdas permanentes em momentos de oscilação."
            },
            {
              pergunta: "Tolerância vs Capacidade de risco:",
              opcoes: ["Tolerância é emocional; capacidade é a situação financeira real", "Tolerância é renda fixa", "São iguais", "Definido pela CVM"],
              respostaCorreta: 0,
              explicacao: "Capacidade física de suportar perdas difere da disposição mental."
            },
            {
              pergunta: "Objetivo em 12 meses deve ser aplicado em:",
              opcoes: ["Ações tech", "Alta liquidez e baixo risco (Tesouro Selic)", "FIIs de desenvolvimento", "Cripto"],
              respostaCorreta: 1,
              explicacao: "Curto prazo exige preservação contra oscilações de mercado."
            },
            {
              pergunta: "Por que aposentadoria em 30 anos aceita renda variável?",
              opcoes: ["O horizonte longo permite superar oscilações de curto prazo", "FGC em ações", "Isenção total", "Ações nunca caem"],
              respostaCorreta: 0,
              explicacao: "No longo prazo a rentabilidade dos negócios predomina sobre oscilações."
            },
            {
              pergunta: "Se a tolerância é alta mas a capacidade é baixa:",
              opcoes: ["Respeita-se o menor nível entre ambos", "Usa o maior risco", "Segue o corretor", "Ignora a capacidade"],
              respostaCorreta: 0,
              explicacao: "Prevalece a segurança financeira do indivíduo."
            }
          ],
          pbl: {
            titulo: "Carlos vs Júlia: Escolha de Risco",
            cenario: "Carlos (45 anos, 2 filhos, autônomo) vs Júlia (19 anos, sem despesas). Quem aceita mais renda variável?",
            solucao: "Júlia pode ter 60-80% de renda variável por alto horizonte e capacidade. Carlos deve focar em renda fixa pós/IPCA+ devido às obrigações familiares e renda instável."
          },
          resumo: [
            "Objetivo, horizonte e tolerância a risco vêm antes dos ativos.",
            "Horizonte curto exige segurança; horizonte longo permite oscilação.",
            "Respeite o menor entre tolerância e capacidade de risco."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-classes-de-ativos-e-correlacao",
          numero: 3,
          titulo: "Aula 3: Classes de ativos e correlação",
          comeceAqui: "Conheça os 'jogadores' do time: Pós-fixados, IPCA+, Prefixados, Ações, FIIs e Dólar/Internacional.",
          ideiaCentral: "A verdadeira diversificação vem de ativos com correlações baixas ou negativas (ex: Dólar vs Ações Brasil em crises).",
          posicoesAtivos: [
            { classe: "Pós-fixados", papel: "Goleiro: segurança e liquidez" },
            { classe: "IPCA+", papel: "Zagueiro: proteção contra inflação" },
            { classe: "Prefixados", papel: "Meio-campo: trava taxa alta" },
            { classe: "Ações Brasil", papel: "Atacante: crescimento" },
            { classe: "FIIs", papel: "Ponta: renda mensal" },
            { classe: "Internacional", papel: "Reserva tática: proteção cambial" }
          ],
          exemploResolvido: {
            titulo: "Impacto da Descorrelação em Crise Local",
            enunciado: "Crise local: Ações -25%, FIIs -18%, Dólar +30%, Selic +12%.",
            passos: [
              "1. Carteira 100% ações: -25%.",
              "2. Carteira B diversificada: +1,05%."
            ],
            resultado: "A descorrelação do dólar e Selic protegeu o saldo da carteira B."
          },
          miniQuiz: [
            {
              pergunta: "Função dos títulos IPCA+:",
              opcoes: ["Liquidez imediata", "Proteger o poder de compra acumulado contra a inflação", "Isentar de IR", "Substituir reserva"],
              respostaCorreta: 1,
              explicacao: "Pagam variação da inflação mais taxa real."
            },
            {
              pergunta: "Por que Ações e FIIs caem juntos em crises brasileiras?",
              opcoes: ["Possuem correlação positiva com o risco do Brasil", "B3 fecha FIIs", "Proibido FIIs", "FGC só garante ações"],
              respostaCorreta: 0,
              explicacao: "Ambos sofrem com alta nos juros e risco soberano local."
            },
            {
              pergunta: "Classe descorrelacionada em crises domésticas:",
              opcoes: ["Ativos internacionais dolarizados", "Varejo interno", "CDB sem liquidez", "FII shoppings"],
              respostaCorreta: 0,
              explicacao: "O dólar costuma subir quando o risco Brasil aumenta."
            },
            {
              pergunta: "Característica dos prefixados:",
              opcoes: ["Acompanham IPCA", "Garantem taxa nominal contratada se mantidos até o vencimento", "Rendem 100% CDI", "Isentos de IR"],
              respostaCorreta: 1,
              explicacao: "A taxa percentual em reais fica travada na aplicação."
            },
            {
              pergunta: "Correlação zero significa:",
              opcoes: ["Movimento idêntico", "Inexistência de relação linear entre os preços dos dois ativos", "Inadimplência", "Retorno nulo"],
              respostaCorreta: 1,
              explicacao: "As oscilações de um não influenciam as oscilações do outro."
            }
          ],
          pbl: {
            titulo: "Falsa Diversificação em Commodities",
            cenario: "Carteira com Vale, Petrobras, Gerdau e Fundo de Commodities é diversificada?",
            solucao: "Não. Falsa diversificação por alta correlação setorial. Solução: Adicionar renda fixa (Selic/IPCA+) e ativos internacionais dolarizados para verdadeira descorrelação."
          },
          resumo: [
            "Classes de ativos são as posições do time.",
            "Diversificação real exige correlações baixas.",
            "Exterior + indexadores diferentes trazem descorrelação no Brasil."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-alocacao-de-ativos",
          numero: 4,
          titulo: "Aula 4: Alocação de ativos",
          comeceAqui: "Defina os percentuais-alvo de cada classe antes de escolher os ativos individuais.",
          ideiaCentral: "Estratégia Núcleo (80-90% em ETFs e Tesouro de baixo custo) + Satélites (10-20% em convicções individuais). Política de investimento escrita.",
          exemploResolvido: {
            titulo: "Divisão de Aporte de R$ 500",
            enunciado: "Alocação: 35% Pós, 25% IPCA+, 10% Pré, 15% Ações BR, 10% Inter, 5% FIIs.",
            passos: [
              "1. R$ 175 Selic | R$ 125 IPCA+ | R$ 50 Prefixado",
              "2. R$ 75 ETF Brasil | R$ 50 ETF Global | R$ 25 FII"
            ],
            resultado: "Execução automatizada que preserva a estrutura da carteira."
          },
          miniQuiz: [
            {
              pergunta: "O que é Alocação de Ativos?",
              opcoes: ["Day trade", "Definição dos percentuais do patrimônio em cada classe de ativo", "Pagamento de impostos", "Cadastro em corretora"],
              respostaCorreta: 1,
              explicacao: "Distribuição percentual do capital pelas classes de ativos."
            },
            {
              pergunta: "Em 'Núcleo e Satélites', onde fica 80-90% do capital?",
              opcoes: ["Opções", "No Núcleo: veículos diversificados e de baixo custo (ETFs/Tesouro)", "Small caps", "Poupança"],
              respostaCorreta: 1,
              explicacao: "O núcleo traz eficiência e segurança de baixo custo."
            },
            {
              pergunta: "Por que Reserva de Emergência fica fora da alocação?",
              opcoes: ["Tem objetivo de liquidez e segurança imediata, não retorno acumulado", "BC toma", "Paga 50% IR", "Só papel físico"],
              respostaCorreta: 0,
              explicacao: "A reserva não deve sofrer com estratégias ou oscilações."
            },
            {
              pergunta: "Para que serve a Política de Investimento escrita?",
              opcoes: ["Polícia Federal", "Registrar percentuais e regras decididas com a razão para manter o foco em crises", "Liberar crédito", "Zerar IR"],
              respostaCorreta: 1,
              explicacao: "Previne tomadas de decisão emocionais em momentos de pânico."
            },
            {
              pergunta: "O que muda entre carteiras de diferentes perfis?",
              opcoes: ["Proporção entre Renda Fixa segura e Renda Variável/Internacional", "O banco utilizado", "Comprar ouro", "Ticker da ação"],
              respostaCorreta: 0,
              explicacao: "O peso relativo dos ativos de maior volatilidade."
            }
          ],
          pbl: {
            titulo: "Planejamento de João por Objetivos",
            cenario: "João (30 anos) quer alocar para apartamento em 6 anos e aposentadoria em 30 anos.",
            solucao: "Separar em duas carteiras. Apartamento (6 anos): 100% Renda Fixa (IPCA+ 6 anos + Pós-fixado). Aposentadoria (30 anos): 40% Renda Fixa + 60% Renda Variável (Ações BR, ETFs Globais, FIIs)."
          },
          resumo: [
            "Alocação entre classes decide a maior parte do resultado.",
            "Núcleo diversificado (80-90%) + Satélites de convicção (10-20%).",
            "Escreva sua Política de Investimento num dia calmo."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-risco-de-carteira",
          numero: 5,
          titulo: "Aula 5: Risco de carteira na prática",
          comeceAqui: "Meça o risco do portfólio usando volatilidade e submeta a carteira a um teste de estresse.",
          ideiaCentral: "Ativos descorrelacionados reduzem a volatilidade do grupo. Drawdown reflete o maior tombo histórico topo-a-fundo.",
          exemploResolvido: {
            titulo: "Estresse na Carteira de Ana em 2020",
            enunciado: "Choque em 2020 na carteira moderada (35% Pós, 25% IPCA+, 15% Ações BR, 10% Dólar, 5% FIIs, 10% Pré).",
            passos: [
              "1. Impacto: Ações (-35%), FIIs (-25%), IPCA+ (-5%), Dólar (+0% líq), Pós (+0,3%).",
              "2. Queda da carteira: ~-7,6%."
            ],
            resultado: "Enquanto a bolsa caía 35%, a carteira caiu apenas 7,6%."
          },
          miniQuiz: [
            {
              pergunta: "Nobel de Markowitz provou que:",
              opcoes: ["Prever ações é fácil", "O risco da carteira é menor que a média dos riscos individuais com descorrelação", "FIIs não têm taxas", "Dólar sempre sobe"],
              respostaCorreta: 1,
              explicacao: "Demonstrou o benefício da diversificação na redução do risco."
            },
            {
              pergunta: "Drawdown mede:",
              opcoes: ["Maior alta", "Perda percentual do topo até o fundo em um período", "Imposto pago", "Dividend yield"],
              respostaCorreta: 1,
              explicacao: "Quantifica o tamanho da queda máxima sofrida."
            },
            {
              pergunta: "Utilidade do Teste de Estresse:",
              opcoes: ["Simular o comportamento em crises passadas para calibrar a resistência do investidor", "Garantir isenção fiscal", "Aumentar ganhos em 100%", "Calcular comissão"],
              respostaCorreta: 0,
              explicacao: "Antecipa visualmente o impacto de grandes quedas."
            },
            {
              pergunta: "Com volatilidade de 8%, ~95% dos anos variam em:",
              opcoes: ["± 1%", "± 16% (dois desvios padrão)", "Exatamente 0%", "-50% a +100%"],
              respostaCorreta: 1,
              explicacao: "Dois desvios padrão (2 × 8% = 16%) cobrem ~95% dos casos."
            },
            {
              pergunta: "Fronteira Eficiente é:",
              opcoes: ["O grupo de carteiras de maior retorno para cada nível de risco", "Limite no exterior", "Teto FGC", "Top ações B3"],
              respostaCorreta: 0,
              explicacao: "Reúne alocações otimizadas na relação risco vs retorno."
            }
          ],
          pbl: {
            titulo: "Teste de Estresse de João",
            cenario: "Rodar estresse na carteira de João (30% Ações, 20% Inter, 10% FIIs, 20% IPCA+, 20% Selic) no choque de 2020.",
            solucao: "Queda total acumulada = -14,4%. Para uma carteira de horizonte de 30 anos com estômago moderado, um drawdown de 14,4% é plenamente aceitável."
          },
          resumo: [
            "O risco do conjunto é menor que o dos ativos isolados se houver descorrelação.",
            "Drawdown mede o tombo topo-fundo.",
            "Teste de estresse previne decisões emocionais."
          ]
        },
        {
          id: "aula-06",
          slug: "aula-06-aportes-e-rebalanceamento",
          numero: 6,
          titulo: "Aula 6: Aportes e rebalanceamento",
          comeceAqui: "Mantenha a rotina de aportes regulares e utilize o rebalanceamento para comprar barato e vender caro mecanicamente.",
          ideiaCentral: "Rebalanceie preferencialmente usando os novos aportes mensais para comprar as classes defasadas (sem pagar imposto ou taxas).",
          conceitosEssenciais: [
            { conceito: "Aporte mensal", significado: "Dinheiro novo adicionado periodicamente" },
            { conceito: "Rebalanceamento por Aportes", significado: "Comprar o ativo defasado com o aporte sem vender nada" },
            { conceito: "Rebalanceamento por Bandas", significado: "Ajustar quando a classe desvia do alvo além de uma margem (ex: ±5%)" }
          ],
          exemploResolvido: {
            titulo: "Rebalanceamento via Aportes",
            enunciado: "Alvo Ações: 15%. Valorizou para 21% (R$ 4.200 de 20.000). Aporte de R$ 500.",
            passos: [
              "1. Em vez de vender ações, direcione os R$ 500 para as outras classes defasadas.",
              "2. A fatia de ações retorna aos 15% gradualmente sem tributação de IR."
            ],
            resultado: "Ajuste de carteira feito de forma gratuita e eficiente."
          },
          miniQuiz: [
            {
              pergunta: "Por que o rebalanceamento força 'vender caro e comprar barato'?",
              opcoes: ["Obriga a vender fatias que subiram muito e comprar as que caíram/ficaram para trás", "B3 premia em dinheiro", "Zera IR", "Cancela juros"],
              respostaCorreta: 0,
              explicacao: "Reduz o peso do que subiu e compra o que está descontado para voltar aos alvos."
            },
            {
              pergunta: "Forma mais barata de rebalancear:",
              opcoes: ["Vender tudo no fim do mês", "Direcionar aportes novos para as classes abaixo do alvo", "Contratar day trader", "Pedir empréstimo"],
              respostaCorreta: 1,
              explicacao: "Evita o pagamento de IR e emolumentos de venda."
            },
            {
              pergunta: "Rebalanceamento por Bandas:",
              opcoes: ["Ajustar apenas quando o desvio superar um limite (ex: ±5 pp)", "Ouvir música", "Vender se o dólar subir 1%", "100 fundos"],
              respostaCorreta: 0,
              explicacao: "Evita giros desnecessários ajustando só em desvios relevantes."
            },
            {
              pergunta: "O que mais importa nos primeiros anos do investidor?",
              opcoes: ["O valor acumulado dos aportes mensais contínuos", "Acertar a ação da moda", "Isenção de taxa B3", "Dólar físico"],
              respostaCorreta: 0,
              explicacao: "Nos anos iniciais o volume de poupança (aportes) supera pequenos diferenciais de taxa."
            },
            {
              pergunta: "Por que não rebalancear movido por manchetes?",
              opcoes: ["Quebra a disciplina racional e vende ativos no fundo da crise", "Jornal processa", "B3 dobra taxa", "BC proíbe"],
              respostaCorreta: 0,
              explicacao: "Decisões no pânico destroem os retornos de longo prazo."
            }
          ],
          pbl: {
            titulo: "Rebalanceamento na Crise de Ações",
            cenario: "Fatia de ações de Carlos caiu de 40% para 25% na crise. Ele quer vender os 25% restantes no pânico. O que fazer?",
            solucao: "O rebalanceamento proíbe a venda no pânico. Manda COMPRAR ações (usando os novos aportes ou renda fixa) para voltar dos 25% para os 40% alvos, comprando barato no fundo da crise."
          },
          resumo: [
            "Aporte regular constrói o patrimônio e suaviza o preço médio.",
            "Rebalancear devolve a carteira ao alvo e realiza lucros/compras sistematicamente.",
            "Prefira rebalancear com aportes novos (custo zero)."
          ]
        },
        {
          id: "aula-07",
          slug: "aula-07-custos-e-impostos",
          numero: 7,
          titulo: "Aula 7: Custos e impostos na carteira",
          comeceAqui: "Reduzir custos e impostos é a única forma de obter retorno adicional garantido com risco zero.",
          ideiaCentral: "Taxas de administração altas e impostos desnecessários compõem contra você no longo prazo.",
          regrasTributacao: [
            { ativo: "Renda Fixa", regra: "Tabela regressiva de IR (22,5% a 15%)" },
            { ativo: "LCI / LCA", regra: "Isentas de IR para PF" },
            { ativo: "Ações", regra: "15% sobre o lucro (Isenção de vendas até R$ 20k/mês para PF)" },
            { ativo: "FIIs", regra: "Rendimentos mensais isentos para PF. Lucro em vendas de cotas = 20% IR" },
            { ativo: "ETFs Ações", regra: "15% sobre o lucro (sem isenção de R$ 20 mil)" }
          ],
          exemploResolvido: {
            titulo: "Efeito de 2% a.a. de Taxa em 30 Anos",
            enunciado: "R$ 10.000 a 10% a.a. por 30 anos: ETF (0,2% taxa) vs Fundo Banco (2,2% taxa).",
            passos: [
              "1. Líquido ETF (9,8% a.a.): R$ 165.000",
              "2. Líquido Fundo (7,8% a.a.): R$ 95.000",
              "3. Perda: R$ 70.000 deixados na mesa."
            ],
            resultado: "A taxa de 2,2% consumiu mais de 40% do patrimônio final."
          },
          miniQuiz: [
            {
              pergunta: "Por que reduzir custos é 'retorno garantido'?",
              opcoes: ["O que economiza em taxas fica 100% no seu bolso sem adicionar risco", "CVM devolve dinheiro", "Corretoras zeram IR", "Falso"],
              respostaCorreta: 0,
              explicacao: "Economizar em taxas aumenta o ganho líquido direto."
            },
            {
              pergunta: "Isenção em vendas comuns de ações para PF:",
              opcoes: ["Vendas totais de ações até R$ 20.000 no mês", "Isenção total após 30 dias", "Só ações de bancos", "Não existe"],
              respostaCorreta: 0,
              explicacao: "Vendas mensais de ações à vista até R$ 20 mil são isentas de IR no lucro."
            },
            {
              pergunta: "Tributação dos proventos de FIIs para PF:",
              opcoes: ["Isentos nas regras de mercado vigentes", "15% retido na fonte", "22,5% via carnê", "Tabela progressiva de salário"],
              respostaCorreta: 0,
              explicacao: "Rendimentos mensais de FIIs em bolsa são isentos para PF."
            },
            {
              pergunta: "Por que girar a carteira frequentemente destrói retorno?",
              opcoes: ["Antecipa o pagamento de IR e gera emolumentos contínuos", "B3 bloqueia contas", "FGC deixa de cobrir", "Juros compostos são cancelados"],
              respostaCorreta: 0,
              explicacao: "Giro excessivo liquida imposto antecipadamente interrompendo a composição do capital."
            },
            {
              pergunta: "CDB 110% CDI (IR 15%) vs LCA 95% CDI (isenta) por 3 anos:",
              opcoes: ["LCA de 95% é superior pois entrega 95% líquido contra 93,5% do CDB", "CDB é melhor porque 110 é maior", "Ignora CDI", "Pergunta o dólar"],
              respostaCorreta: 0,
              explicacao: "CDB líquido: 110 × 0,85 = 93,5% do CDI. A LCA de 95% isenta vence."
            }
          ],
          pbl: {
            titulo: "Recusando Fundo de Alta Taxa",
            cenario: "Gerente oferece fundo com 2,5% a.a. de taxa para aportes de 10 anos. Como recusar?",
            solucao: "Explicar que 2,5% de taxa exigirá que o gestor supere o benchmark em 2,5% todos os anos apenas para empatar com uma solução passiva de baixo custo (ETFs/Tesouro a 0,2%), que entregará até 20% a mais de patrimônio final."
          },
          resumo: [
            "Custos compõem contra você: 1–2% ao ano devoram dezenas de por cento em décadas.",
            "Compare tudo pelo líquido: IR, come-cotas e isenções.",
            "Segurar posições em veículos baratos é a otimização mais simples."
          ]
        },
        {
          id: "aula-08",
          slug: "aula-08-montando-sua-carteira",
          numero: 8,
          titulo: "Aula 8: Montando sua primeira carteira — estudo de caso completo",
          comeceAqui: "Consolide os aprendizados em um plano estruturado de 7 passos.",
          ideiaCentral: "1. Reserva; 2. Perfil/Objetivos; 3. Alocação por objetivo; 4. Teste de estresse; 5. Escolha de veículos/custos; 6. Aportes e rebalanceamento; 7. Política escrita.",
          passosMontagem: [
            "Passo 1: Reserva de Emergência (3-6 meses em liquidez diária/Selic).",
            "Passo 2: Perfil e Objetivos (prazos e tolerância).",
            "Passo 3: Alocação-Alvo (fatias por classe).",
            "Passo 4: Teste de Estresse (simular quedas de crises).",
            "Passo 5: Veículos Eficientes (baixos custos e IR).",
            "Passo 6: Rotina de Aportes e Rebalanceamento.",
            "Passo 7: Política de Investimentos por escrito."
          ],
          exemploResolvido: {
            titulo: "Estudo de Caso: Carteira de Marina (22 anos)",
            enunciado: "Marina (CLT, guarda R$ 700/mês, custo R$ 2.500/mês). Objetivos: Intercâmbio 3 anos (R$ 15k) e Aposentadoria.",
            passos: [
              "1. Reserva: R$ 10.000 em Tesouro Selic (4 meses de custo).",
              "2. Intercâmbio (3 anos): 70% CDB/Tesouro prazo casado + 30% Selic (Renda variável ZERO).",
              "3. Aposentadoria: 35% Pós, 25% IPCA+, 20% ETF Ações BR, 15% ETF Global, 5% FII.",
              "4. Teste de estresse: Drawdown estimado em -9% na crise, aprovado pelo perfil moderado."
            ],
            resultado: "Plano estruturado de baixíssimo custo mantido sem sobressaltos."
          },
          miniQuiz: [
            {
              pergunta: "Primeiro passo indispensável antes de montar qualquer carteira:",
              opcoes: ["Comprar small caps", "Constituir a Reserva de Emergência em liquidez diária e baixo risco", "Consultoria internacional", "Conta em dólares"],
              respostaCorreta: 1,
              explicacao: "A reserva evita vender ativos de risco em momentos desfavoráveis."
            },
            {
              pergunta: "Por que Marina dividiu em duas carteiras (Intercâmbio vs Aposentadoria)?",
              opcoes: ["Horizontes de tempo e objetivos diferentes exigem níveis de risco distintos", "Banco obriga", "B3 exige", "Para o IR"],
              respostaCorreta: 0,
              explicacao: "Cada horizonte de tempo exige uma alocação de risco específica."
            },
            {
              pergunta: "Quando alterar a Política de Investimento pessoal?",
              opcoes: ["Ao ler jornais diariamente", "Quando a vida real mudar (objetivos, renda, prazos, família)", "Se uma ação subir 10%", "Com novos influencers"],
              respostaCorreta: 1,
              explicacao: "A política reage a fatos da vida do investidor, não ao ruído do mercado."
            },
            {
              pergunta: "Erro clássico do primeiro portfólio:",
              opcoes: ["Ignorar a reserva de emergência e colecionar ativos aleatórios", "Comprar Selic para reserva", "Investir em ETFs globais", "Escrever a política em papel"],
              respostaCorreta: 0,
              explicacao: "Falta de reserva e pulverização sem foco em classes de ativos."
            },
            {
              pergunta: "Garante o sucesso da estratégia ao longo de décadas:",
              opcoes: ["Acertar topos e fundos", "Manter a rotina simples de aportes contínuos e rebalanceamento mecânico com baixo custo", "Trocar de carteira a cada 3 meses", "Investir só em imóveis"],
              respostaCorreta: 1,
              explicacao: "Constância nos aportes e baixas taxas geram os juros compostos de longo prazo."
            }
          ],
          pbl: {
            titulo: "Política de Investimento do Estudante",
            cenario: "Monte a Política de Investimentos de um estudante com R$ 300/mês para aposentadoria em 30 anos.",
            solucao: "1. Reserva: R$ 1,5k em Selic; 2. Alocação: 20% Selic, 30% IPCA+, 30% ETF Ações Brasil, 20% ETF Global; 3. Aportes: R$ 300/mês na classe mais defasada; 4. Rebalanceamento: Por bandas de ±5% ou anual; 5. Regra: Nunca vender no pânico."
          },
          resumo: [
            "O processo: reserva → perfil → alocação → estresse → veículos → rotina → revisão anual.",
            "Cada objetivo tem sua carteira; o plano muda com a vida, não com manchetes.",
            "Disciplina barata e escrita vence improviso caro e emocional."
          ]
        }
      ]
    }
  ]
};

// financasData;
