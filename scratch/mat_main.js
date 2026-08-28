// C:\codigos\bfa-main\plataforma\src\data\matematicaData.js
// Trilha completa de Matemática Aplicada a Finanças (4 Módulos)

window.matematicaData = {
  id: "matematica-aplicada",
  titulo: "Matemática Aplicada a Finanças",
  descricao: "Trilha de matemática construída para destravar finanças — cada módulo existe para resolver um problema real de dinheiro, não matemática pela matemática.",
  modulos: [
    {
      id: "modulo-1",
      slug: "modulo-1-algebra-do-zero",
      numero: 1,
      titulo: "Módulo 1: Álgebra do Zero",
      descricao: "A base para não travar em juros, porcentagem e equações. Para quem começa do zero absoluto.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-numeros-e-operacoes",
          numero: 1,
          titulo: "Aula 1: Números e operações",
          comeceAqui: "Antes de falar em juros, porcentagem ou investimento, você precisa operar com números sem travar. Esta aula revisa as quatro operações básicas com o foco em onde elas aparecem em finanças.",
          ideiaCentral: "Toda conta financeira — rendimento, desconto, imposto, lucro — é uma combinação de soma, subtração, multiplicação e divisão. Quem domina as quatro operações com decimais já consegue resolver a maioria dos problemas do dia a dia financeiro.",
          conceitosEssenciais: [
            { conceito: "Número inteiro", significado: "Sem casas decimais: 1, 50, 1000" },
            { conceito: "Número decimal", significado: "Com casas decimais: 1,5 / 0,08 / 1.350,75" },
            { conceito: "Soma", significado: "Juntar valores" },
            { conceito: "Subtração", significado: "Diferença entre valores" },
            { conceito: "Multiplicação", significado: "Soma repetida — base dos juros" },
            { conceito: "Divisão", significado: "Repartir em partes iguais — base de médias e taxas" },
            { conceito: "Ordem das operações", significado: "Primeiro × e ÷, depois + e − (salvo parênteses)" }
          ],
          aplicacaoFinanceira: [
            { operacao: "Soma", exemplo: "Saldo + rendimento do mês" },
            { operacao: "Subtração", exemplo: "Salário − gastos = quanto sobrou" },
            { operacao: "Multiplicação", exemplo: "R$ 1.000 × 1,10 = valor com 10% de juros" },
            { operacao: "Divisão", exemplo: "Lucro ÷ capital investido = taxa de retorno" }
          ],
          exemploResolvido: {
            titulo: "Cálculo de saldo líquido mensal",
            enunciado: "Uma pessoa recebe R$ 2.500 de salário, tem R$ 1.800 de despesas, ganha R$ 150 de rendimento de investimentos e paga R$ 50 de taxa bancária. Qual o valor que sobrou?",
            passos: [
              "1. Soma das receitas: 2500 + 150 = R$ 2.650",
              "2. Soma das despesas: 1800 + 50 = R$ 1.850",
              "3. Subtração do saldo final: 2650 - 1850 = R$ 800"
            ],
            resultado: "Sobraram R$ 800 para poupança ou investimentos."
          },
          miniQuiz: [
            {
              pergunta: "Qual a ordem correta de execução das operações na expressão 50 + 10 × 2?",
              opcoes: ["Soma 50 + 10 e depois multiplica por 2 (120)", "Primeiro multiplica 10 × 2 e depois soma 50 (70)", "Executa da esquerda para a direita de forma arbitrária", "Primeiro subtrai antes de multiplicar"],
              respostaCorreta: 1,
              explicacao: "Pela regra de ordem das operações, multiplicação e divisão têm prioridade sobre soma e subtração."
            },
            {
              pergunta: "Em finanças, a multiplicação de um valor pelo fator 1,15 representa:",
              opcoes: ["Desconto de 15%", "Aumento ou rendimento de 15%", "Divisão do valor por 15", "Subtração fixa de R$ 15"],
              respostaCorreta: 1,
              explicacao: "Multiplicar por 1,15 equivale a manter 100% do valor original (1,0) e adicionar 15% (0,15)."
            },
            {
              pergunta: "Se você divide o lucro obtido de R$ 200 pelo valor investido de R$ 2.000 (200 ÷ 2000), você está calculando:",
              opcoes: ["O montante total acumulado", "A taxa de retorno do investimento (0,10 ou 10%)", "O desconto comercial simples", "A inflação acumulada do período"],
              respostaCorreta: 1,
              explicacao: "A divisão do lucro pelo capital investido entrega a taxa de rentabilidade relativa do investimento."
            },
            {
              pergunta: "Qual operação é a base do cálculo de rendimento de juros em múltiplos períodos?",
              opcoes: ["Subtração consecutiva", "Multiplicação repetida", "Divisão por zero", "Soma de inteiros apenas"],
              respostaCorreta: 1,
              explicacao: "Juros envolvem multiplicação repetida pelo fator de crescimento (1 + i)."
            },
            {
              pergunta: "Ao calcular Salário − Gastos = Saldo, qual operação matemática foi applied?",
              opcoes: ["Multiplicação", "Divisão", "Subtração", "Notação científica"],
              respostaCorreta: 2,
              explicacao: "A diferença entre o total arrecadado e o total gasto é calculada via subtração."
            }
          ],
          pbl: {
            titulo: "Planejamento da Mesada",
            cenario: "Lucas recebe R$ 200 por mês. Ele gasta R$ 80 com transporte, R$ 50 com lanches e quer saber quanto tempo levará para comprar um fone de R$ 350 com o que sobra.",
            solucao: "Sobra mensal: 200 - 80 - 50 = R$ 70. Para acumular R$ 350: 350 ÷ 70 = 5 meses."
          },
          resumo: [
            "As quatro operações são a base de toda matemática financeira.",
            "Decimais aparecem em todo cálculo de taxa, juros e porcentagem.",
            "A próxima aula entra em frações — a forma mais precisa de representar partes."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-fracoes-e-decimais",
          numero: 2,
          titulo: "Aula 2: Frações e decimais",
          comeceAqui: "Fração é uma forma de representar partes de um todo. Decimal é a mesma ideia em outro formato. Em finanças, as duas formas aparecem o tempo todo — e saber converter entre elas é essencial pra calcular qualquer taxa ou rendimento.",
          ideiaCentral: "1/4, 0,25 e 25% são três formas de dizer a mesma coisa. Quem entende essa equivalência nunca mais trava numa conta de porcentagem.",
          conceitosEssenciais: [
            { conceito: "Fração", significado: "Representa partes de um todo: numerador ÷ denominador" },
            { conceito: "Numerador", significado: "O número de cima — quantas partes você tem" },
            { conceito: "Denominador", significado: "O número de baixo — em quantas partes o todo foi dividido" },
            { conceito: "Decimal", significado: "Representação com vírgula: 0,25 / 1,5 / 0,08" },
            { conceito: "Equivalência", significado: "1/4 = 0,25 = 25% — mesma quantidade, formatos diferentes" },
            { conceito: "Simplificação", significado: "Reduzir a fração ao menor numerador e denominador possíveis" }
          ],
          conversoesEssenciais: [
            { fracao: "1/2", decimal: "0,50", porcentagem: "50%" },
            { fracao: "1/4", decimal: "0,25", porcentagem: "25%" },
            { fracao: "3/4", decimal: "0,75", porcentagem: "75%" },
            { fracao: "1/5", decimal: "0,20", porcentagem: "20%" },
            { fracao: "1/10", decimal: "0,10", porcentagem: "10%" },
            { fracao: "1/100", decimal: "0,01", porcentagem: "1%" }
          ],
          exemploResolvido: {
            titulo: "Conversão de taxa de juros",
            enunciado: "Um produto financeiro cobra uma taxa de 3/50 do capital investido. Quanto isso representa em decimal e em porcentagem?",
            passos: [
              "1. Dividir numerador pelo denominador: 3 ÷ 50 = 0,06",
              "2. Multiplicar o decimal por 100: 0,06 × 100 = 6%"
            ],
            resultado: "A taxa é equivalente a 0,06 ou 6%."
          },
          miniQuiz: [
            {
              pergunta: "A fração 1/4 equivale a qual número decimal e a qual porcentagem?",
              opcoes: ["0,4 e 40%", "0,25 e 25%", "0,14 e 14%", "2,5 e 250%"],
              respostaCorreta: 1,
              explicacao: "1 ÷ 4 = 0,25, que multiplicado por 100 resulta em 25%."
            },
            {
              pergunta: "Para converter um número decimal em porcentagem, você deve:",
              opcoes: ["Dividir por 100", "Multiplicar por 100", "Somar 100 ao valor", "Elevar ao quadrado"],
              respostaCorreta: 1,
              explicacao: "Multiplicar o valor decimal por 100 ajusta a escala para base 'por cento'."
            },
            {
              pergunta: "Qual das seguintes alternativas apresenta três valores equivalentes?",
              opcoes: ["1/2, 0,20 e 20%", "3/4, 0,75 e 75%", "1/5, 0,50 e 50%", "1/10, 0,01 e 1%"],
              respostaCorreta: 1,
              explicacao: "3/4 = 3 ÷ 4 = 0,75 = 75%."
            },
            {
              pergunta: "Se um investimento rende 8% ao ano, qual é o fator decimal correspondente à taxa de rendimento isolada?",
              opcoes: ["0,8", "0,08", "8,0", "0,008"],
              respostaCorreta: 1,
              explicacao: "8% significa 8/100, ou seja, 0,08 em decimal."
            },
            {
              pergunta: "Se você possui 2/5 de uma empresa, qual a sua porcentagem de participação?",
              opcoes: ["25%", "40%", "20%", "50%"],
              respostaCorreta: 1,
              explicacao: "2 ÷ 5 = 0,40 = 40%."
            }
          ],
          pbl: {
            titulo: "Comparando taxas de fundos",
            cenario: "O fundo A cobra taxa de administração de 1/50 do saldo ao ano. O fundo B cobra 0,015 ao ano. Qual fundo cobra a menor taxa?",
            solucao: "Fundo A: 1/50 = 0,02 (2% a.a.). Fundo B: 0,015 (1,5% a.a.). O Fundo B cobra a menor taxa."
          },
          resumo: [
            "Fração, decimal e porcentagem são três formas de expressar a mesma quantidade.",
            "Para converter fração em decimal: divida numerador pelo denominador.",
            "Para converter decimal em porcentagem: multiplique por 100.",
            "A próxima aula usa tudo isso pra ensinar porcentagem aplicada a dinheiro."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-porcentagem-na-vida-real",
          numero: 3,
          titulo: "Aula 3: Porcentagem na vida real",
          comeceAqui: "Porcentagem é a linguagem do dinheiro. Desconto na loja, juros do cartão, rendimento do investimento, inflação do mês — tudo vem em porcentagem. Quem entende porcentagem de verdade para de ser enganado por número bonito.",
          ideiaCentral: "'Por cento' significa 'por 100'. 10% de alguma coisa é 10 de cada 100. Simples assim. O erro de quase todo mundo é tentar decorar fórmula antes de entender essa intuição.",
          conceitosEssenciais: [
            { conceito: "Porcentagem", significado: "Parte de um total, medida em relação a 100" },
            { conceito: "% de um valor", significado: "Quanto é X% de R$Y?" },
            { conceito: "Aumento percentual", significado: "O valor subiu — quanto subiu em relação ao original?" },
            { conceito: "Desconto percentual", significado: "O valor caiu — quanto caiu em relação ao original?" },
            { conceito: "Ponto percentual", significado: "Diferença direta entre duas taxas (10% → 12% = +2 pp)" }
          ],
          situacoesFinanceiras: [
            { situacao: "Calcular X% de um valor", exemplo: "15% de R$ 200 → 200 × 0,15 = R$ 30" },
            { situacao: "Calcular quanto um valor representa", exemplo: "R$ 30 é quanto % de R$ 200? → 30 ÷ 200 = 0,15 = 15%" },
            { situacao: "Calcular o valor original", exemplo: "R$ 30 são 15% de qual valor? → 30 ÷ 0,15 = R$ 200" }
          ],
          exemploResolvido: {
            titulo: "Diferença entre Porcentagem e Ponto Percentual",
            enunciado: "Se a taxa de juros Selic sobe de 10% ao ano para 12% ao ano, qual foi o aumento em pontos percentuais e qual o aumento em porcentagem?",
            passos: [
              "1. Pontos percentuais (diferença direta): 12% - 10% = 2 pontos percentuais (pp).",
              "2. Aumento em porcentagem (variação relativa): 2 ÷ 10 = 0,20 = 20%."
            ],
            resultado: "A taxa subiu 2 pp, o que representa uma alta relativa de 20% sobre a taxa inicial."
          },
          miniQuiz: [
            {
              pergunta: "Quanto é 15% de R$ 200?",
              opcoes: ["R$ 15", "R$ 20", "R$ 30", "R$ 45"],
              respostaCorreta: 2,
              explicacao: "200 × 0,15 = R$ 30."
            },
            {
              pergunta: "Se a taxa Selic varia de 10% para 12%, dizemos que ela subiu:",
              opcoes: ["2%", "20% e 2 pontos percentuais", "2 pontos percentuais (ou 20% de alta relativa)", "12% de aumento absoluto"],
              respostaCorreta: 2,
              explicacao: "A diferença simples 12 - 10 = 2 pp. A variação relativa em relação a 10 é 2/10 = 20%."
            },
            {
              pergunta: "R$ 40 representa qual porcentagem de R$ 200?",
              opcoes: ["10%", "15%", "20%", "25%"],
              respostaCorreta: 2,
              explicacao: "40 ÷ 200 = 0,20 = 20%."
            },
            {
              pergunta: "Um tênis de R$ 300 teve um desconto de 15%. Qual o valor do desconto em reais?",
              opcoes: ["R$ 30", "R$ 45", "R$ 50", "R$ 15"],
              respostaCorreta: 1,
              explicacao: "300 × 0,15 = R$ 45."
            },
            {
              pergunta: "Se R$ 50 correspondem a 25% de uma quantia, qual é o valor total?",
              opcoes: ["R$ 100", "R$ 150", "R$ 200", "R$ 250"],
              respostaCorreta: 2,
              explicacao: "50 ÷ 0,25 = R$ 200."
            }
          ],
          pbl: {
            titulo: "Analise de Promoção",
            cenario: "Uma loja oferece um desconto de 20% à vista. Outra loja vende pelo mesmo preço inicial, mas promete 'leve 5 e pague 4'. Qual promoção é mais vantajosa?",
            solucao: "Leve 5 pague 4 significa receber 5 unidades pelo preço de 4. Desconto: 1/5 = 20%. As duas ofertas oferecem exatamente o mesmo desconto percentual de 20%."
          },
          resumo: [
            "Porcentagem = parte de 100. Não é fórmula, é proporção.",
            "Três operações básicas: calcular X% de Y, descobrir que % X é de Y, e achar o valor original.",
            "Ponto percentual ≠ porcentagem — diferença importante em finanças.",
            "A próxima aula generaliza essa ideia pra qualquer proporção: regra de três."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-regra-de-tres",
          numero: 4,
          titulo: "Aula 4: Regra de três",
          comeceAqui: "Regra de três é a ferramenta de proporção. Sempre que duas grandezas se relacionam de forma previsível — e em finanças quase sempre se relacionam — a regra de três resolve.",
          ideiaCentral: "Se 100 rende 10, quanto rende 350? Esse tipo de raciocínio aparece em juros, câmbio, conversão de taxas e comparação de investimentos. A regra de três é só uma forma organizada de pensar em proporção.",
          conceitosEssenciais: [
            { conceito: "Proporção", significado: "Relação constante entre duas quantidades" },
            { conceito: "Grandezas diretamente proporcionais", significado: "Quando uma aumenta, a outra aumenta na mesma proporção" },
            { conceito: "Grandezas inversamente proporcionais", significado: "Quando uma aumenta, a outra diminui na mesma proporção" },
            { conceito: "Regra de três simples", significado: "Envolve dois pares de valores" },
            { conceito: "Regra de três composta", significado: "Envolve três ou mais grandezas relacionadas" }
          ],
          aplicacaoFinanceira: [
            { situacao: "Conversão de moeda", exemplo: "Se 1 dólar = R$ 5,20, quanto são 350 dólares?" },
            { situacao: "Proporção de rendimento", exemplo: "Se 100 rende 8, quanto rende 450?" },
            { situacao: "Desconto proporcional", exemplo: "Se 200g custa R$ 4, quanto custa 350g?" },
            { situacao: "Taxa mensal vs anual", exemplo: "Se a taxa anual é 12%, qual a proporcional mensal?" }
          ],
          exemploResolvido: {
            titulo: "Conversão de Câmbio",
            enunciado: "Se 1 dólar é negociado a R$ 5,20, quantos reais são necessários para comprar 350 dólares?",
            passos: [
              "1. Montar a proporção: 1 dólar → R$ 5,20 | 350 dólares → x",
              "2. Cruzar a multiplicação: 1 · x = 350 · 5,20",
              "3. Resolver: x = 1.820"
            ],
            resultado: "Serão necessários R$ 1.820,00."
          },
          miniQuiz: [
            {
              pergunta: "Se 1 dólar custa R$ 5,20, quanto custam US\\$ 350?",
              opcoes: ["R$ 1.500,00", "R$ 1.820,00", "R$ 1.750,00", "R$ 1.920,00"],
              respostaCorreta: 1,
              explicacao: "350 × 5,20 = R$ 1.820,00."
            },
            {
              pergunta: "Se R$ 100 aplicados em renda fixa rendem R$ 8 em determinado período, quanto renderão R$ 450 aplicados na mesma proporção?",
              opcoes: ["R$ 32,00", "R$ 36,00", "R$ 40,00", "R$ 45,00"],
              respostaCorreta: 1,
              explicacao: "(450 × 8) ÷ 100 = 3.600 ÷ 100 = R$ 36,00."
            },
            {
              pergunta: "Em grandezas inversamente proporcionais, o que acontece quando uma das variáveis é dobrada?",
              opcoes: ["A outra variável dobra", "A outra variável é reduzida à metade", "A outra variável permanece constante", "A outra variável aumenta quatro vezes"],
              respostaCorreta: 1,
              explicacao: "Na proporção inversa, dobrar uma quantidade implica reduzir a outra proporcionalmente à metade."
            },
            {
              pergunta: "Se 200g de um produto custam R$ 4,00, qual o valor de 350g desse mesmo produto?",
              opcoes: ["R$ 6,00", "R$ 7,00", "R$ 7,50", "R$ 8,00"],
              respostaCorreta: 1,
              explicacao: "(350 × 4) ÷ 200 = 1.400 ÷ 200 = R$ 7,00."
            },
            {
              pergunta: "Qual das opções abaixo é um exemplo clássico de regra de três simples em finanças?",
              opcoes: ["Cálculo do valor futuro em juros compostos por 30 anos", "Conversão de uma quantia em reais para dólares dada a cotação", "Diferença entre volatilidade e retorno médio", "Cálculo da mediana de uma amostra"],
              respostaCorreta: 1,
              explicacao: "Converter moedas por cotação direta é uma proporção direta resolvida via regra de três."
            }
          ],
          pbl: {
            titulo: "Comparação de Embalagens no Supermercado",
            cenario: "Uma caixa de sabão em pó de 800g custa R$ 16,00. A embalagem de 1,5kg custa R$ 27,00. Qual embalagem é mais econômica por quilo?",
            solucao: "Preço/kg embalagem 1: 16 ÷ 0,8 = R$ 20,00/kg. Preço/kg embalagem 2: 27 ÷ 1,5 = R$ 18,00/kg. A embalagem de 1,5kg é mais econômica."
          },
          resumo: [
            "Regra de três resolve qualquer problema de proporção com três valores conhecidos.",
            "Grandezas diretas: aumentam juntas. Inversas: uma aumenta enquanto a outra cai.",
            "Em finanças: câmbio, rendimento proporcional e conversão de taxas.",
            "A próxima aula entra em potências — essencial pra entender juros compostos."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-potencias-e-raizes",
          numero: 5,
          titulo: "Aula 5: Potências e raízes",
          comeceAqui: "Juros compostos funcionam com potências. Sem entender o que é 1,10³ você não consegue calcular quanto R$ 1.000 vira em 3 anos a 10% ao ano. Esta aula destrava isso.",
          ideiaCentral: "Potência é multiplicação repetida. 1,10³ significa 1,10 × 1,10 × 1,10. Raiz é a operação inversa: dado o resultado, qual era a base? Em finanças, potências aparecem nos juros compostos e raízes aparecem quando você quer descobrir a taxa a partir do montante.",
          conceitosEssenciais: [
            { conceito: "Base", significado: "O número que será multiplicado por si mesmo" },
            { conceito: "Expoente", significado: "Quantas vezes a base é multiplicada" },
            { conceito: "Potência", significado: "O resultado: base^expoente" },
            { conceito: "Raiz quadrada (√)", significado: "Qual número multiplicado por si mesmo dá X?" },
            { conceito: "Raiz enésima (ⁿ√)", significado: "Generalização — qual base elevada a n dá X?" },
            { conceito: "Potência fracionária", significado: "x^(1/n) = ⁿ√x — raiz como potência" }
          ],
          potenciasEFinancas: {
            formulaJuros: "(1 + i)^n",
            descricao: "Esta é a fórmula dos juros compostos. O (1+i) é a base — o fator de crescimento por período. O n é o expoente — o número de períodos."
          },
          raizesEFinancas: {
            formulaTaxa: "taxa = ∛(1,331) - 1 = 1,10 - 1 = 10% ao ano",
            descricao: "Se R$ 1.000 virou R$ 1.331 em 3 anos, a raiz cúbica do fator de crescimento menos 1 entrega a taxa equivalente por período."
          },
          exemploResolvido: {
            titulo: "Cálculo de Montante com Potência",
            enunciado: "Quanto R$ 2.000 viram após 2 anos aplicados a uma taxa de juros compostos de 10% ao ano?",
            passos: [
              "1. Fator de crescimento: (1 + 0,10) = 1,10",
              "2. Potência para 2 anos: 1,10² = 1,21",
              "3. Montante final: 2.000 × 1,21 = R$ 2.420"
            ],
            resultado: "O montante final é R$ 2.420,00."
          },
          miniQuiz: [
            {
              pergunta: "O que representa o cálculo de 1,10³ em juros compostos?",
              opcoes: ["Multiplicar 1,10 por 3 (3,30)", "O fator de crescimento acumulado de 10% ao ano durante 3 anos (1,331)", "Somar 1,10 três vezes (3,30)", "Dividir 1,10 por 3"],
              respostaCorreta: 1,
              explicacao: "1,10³ = 1,10 × 1,10 × 1,10 = 1,331 (crescimento acumulado de 33,1%)."
            },
            {
              pergunta: "Se um montante acumulou um fator de crescimento de 1,44 em 2 anos, qual foi a taxa média de juros ao ano (operada pela raiz quadrada)?",
              opcoes: ["12%", "20%", "22%", "44%"],
              respostaCorreta: 1,
              explicacao: "√1,44 = 1,20. Subtraindo 1: 1,20 - 1 = 0,20 = 20% ao ano."
            },
            {
              pergunta: "Na expressão x^(1/n), a potência com expoente fracionário equivale a:",
              opcoes: ["Uma divisão de x por n", "A raiz enésima de x (ⁿ√x)", "Multiplicar x por 1/n", "Subtrair n de x"],
              respostaCorreta: 1,
              explicacao: "Expoente fracionário 1/n é a representação em formato de potência para a raiz enésima."
            },
            {
              pergunta: "Qual o resultado de 1,05²?",
              opcoes: ["1,10", "1,1025", "1,055", "1,25"],
              respostaCorreta: 1,
              explicacao: "1,05 × 1,05 = 1,1025."
            },
            {
              pergunta: "Se o valor futuro de um investimento é dado por VF = VP × (1+i)^n, a variável 'n' atua como:",
              opcoes: ["Base", "Multiplicador fixo", "Expoente (número de períodos)", "Denominador"],
              respostaCorreta: 2,
              explicacao: "O tempo n entra como expoente sobre o fator de juros (1+i)."
            }
          ],
          pbl: {
            titulo: "Descobrindo a Taxa de Juros do Empréstimo",
            cenario: "Você pegou R$ 1.000 emprestados e devaneou em pagar R$ 1.210 após 2 anos em uma única parcela. Qual foi a taxa de juros anual cobrada nesse empréstimo?",
            solucao: "Fator acumulado = 1210 ÷ 1000 = 1,21. Como foram 2 anos: √(1,21) = 1,10. Taxa = 1,10 - 1 = 0,10 = 10% ao ano."
          },
          resumo: [
            "Potência é multiplicação repetida: a^n = a × a × ... × a (n vezes).",
            "Raiz é a operação inversa da potência.",
            "A fórmula dos juros compostos (1+i)^n usa potência diretamente.",
            "A próxima aula ensina notação científica — pra ler números grandes sem se perder."
          ]
        },
        {
          id: "aula-06",
          slug: "aula-06-notacao-cientifica",
          numero: 6,
          titulo: "Aula 6: Notação científica",
          comeceAqui: "O PIB do Brasil é R$ 11.000.000.000.000. A dívida pública federal é de aproximadamente R$ 7.000.000.000.000. Ler e comparar esses números em forma extensa é difícil e sujeito a erro. Notação científica resolve isso.",
          ideiaCentral: "Notação científica é uma forma compacta de escrever números muito grandes ou muito pequenos. Em finanças e economia, aparece em dados macroeconômicos, capitalização de mercado de empresas e relatórios do Banco Central.",
          conceitosEssenciais: [
            { conceito: "Notação científica", significado: "Número entre 1 e 10, multiplicado por potência de 10" },
            { conceito: "Potência de 10", significado: "10¹ = 10 / 10² = 100 / 10³ = 1.000 / 10⁶ = 1.000.000" },
            { conceito: "Expoente positivo", significado: "Número grande (move vírgula pra direita)" },
            { conceito: "Expoente negativo", significado: "Número pequeno (move vírgula pra esquerda)" }
          ],
          prefixosFinanceiros: [
            { prefixo: "Mil", valor: "10³", exemplo: "R$ 50 mil = R$ 50.000" },
            { prefixo: "Milhão", valor: "10⁶", exemplo: "R$ 3 milhões = R$ 3.000.000" },
            { prefixo: "Bilhão", valor: "10⁹", exemplo: "R$ 1,4 bi = R$ 1.400.000.000" },
            { prefixo: "Trilhão", valor: "10¹²", exemplo: "PIB ≈ R$ 11 trilhões" }
          ],
          exemploResolvido: {
            titulo: "Conversão de PIB para Notação Científica",
            enunciado: "Escreva o PIB estimado de R$ 11.000.000.000.000 em notação científica.",
            passos: [
              "1. Colocar a vírgula após o primeiro algarismo significativo: 1,1",
              "2. Contar quantas casas a vírgula andou para a esquerda: 13 casas",
              "3. Montar a potência de 10: 1,1 × 10¹³"
            ],
            resultado: "R$ 1,1 × 10¹³."
          },
          miniQuiz: [
            {
              pergunta: "Como se escreve o valor R$ 2.300.000 em notação científica?",
              opcoes: ["23 × 10⁵", "2,3 × 10⁶", "0,23 × 10⁷", "2,3 × 10⁵"],
              respostaCorreta: 1,
              explicacao: "2,3 × 10⁶ (o número base fica entre 1 e 10 e a vírgula desloca 6 casas)."
            },
            {
              pergunta: "O número de uma potência de 10 com expoente 10⁹ representa qual ordem de grandeza no Brasil?",
              opcoes: ["Milhão", "Bilhão", "Trilhão", "Quatrilhão"],
              respostaCorreta: 1,
              explicacao: "10⁹ = 1.000.000.000 (1 bilhão)."
            },
            {
              pergunta: "Se uma empresa vale R$ 1,4 × 10⁹, qual o seu valor em reais por extenso?",
              opcoes: ["R$ 140.000.000", "R$ 1.400.000.000", "R$ 14.000.000.000", "R$ 140.000"],
              respostaCorreta: 1,
              explicacao: "1,4 × 1.000.000.000 = R$ 1.400.000.000 (1,4 bilhão)."
            },
            {
              pergunta: "Qual é a potência de 10 associada ao prefixo 'Trilhão'?",
              opcoes: ["10⁶", "10⁹", "10¹²", "10¹⁵"],
              respostaCorreta: 2,
              explicacao: "1 Trilhão é 10¹² (1 seguido de 12 zeros)."
            },
            {
              pergunta: "Em notação científica, o número multiplicador que antecede a potência de 10 deve estar no intervalo:",
              opcoes: ["Entre 0 e 1", "Entre 1 e 10 (maior ou igual a 1 e menor que 10)", "Entre 10 e 100", "Qualquer número positivo"],
              respostaCorreta: 1,
              explicacao: "A norma da notação científica exige a parte mantissa N no intervalo 1 ≤ N < 10."
            }
          ],
          pbl: {
            titulo: "Comparando Valor de Mercado de Giants Tecnológicas",
            cenario: "A empresa A vale R$ 3,2 × 10¹² e a empresa B vale R$ 8,0 × 10¹¹. Qual empresa vale mais e qual a diferença em reais entre elas?",
            solucao: "Empresa A: R$ 3.200.000.000.000 (3,2 trilhões). Empresa B: R$ 800.000.000.000 (800 bilhões). Empresa A é maior. Diferença: 3,2 bi - 0,8 bi = R$ 2,4 trilhões (2,4 × 10¹²)."
          },
          resumo: [
            "Notação científica compacta números grandes sem perder precisão.",
            "Em finanças: PIB, dívida pública, capitalização de mercado e patrimônio de fundos.",
            "Saber converter entre notação científica e número inteiro evita erros de leitura.",
            "A próxima e última aula do Nível 1 ensina equações de 1º grau — a base pra resolver qualquer 'quanto preciso investir pra ter X?'."
          ]
        },
        {
          id: "aula-07",
          slug: "aula-07-equacoes-1-grau",
          numero: 7,
          titulo: "Aula 7: Equações de 1º grau",
          comeceAqui: "Equação de 1º grau é qualquer problema do tipo 'qual é o valor desconhecido?'. Em finanças: quanto preciso investir pra ter R$ 10.000 em um ano? Qual taxa preciso conseguir pra dobrar meu dinheiro em 5 anos? Essas perguntas são equações de 1º grau disfarçadas.",
          ideiaCentral: "Uma equação tem dois lados separados pelo sinal de igual. Seu objetivo é isolar a incógnita (a variável desconhecida) de um lado. Tudo que você fizer de um lado, faz do outro — o equilíbrio nunca muda.",
          conceitosEssenciais: [
            { conceito: "Equação", significado: "Igualdade entre duas expressões" },
            { conceito: "Incógnita", significado: "O valor desconhecido, geralmente chamado de x" },
            { conceito: "1º grau", significado: "A incógnita aparece sem expoente (não é x², não é x³)" },
            { conceito: "Isolamento", significado: "Deixar x sozinho de um lado da equação" },
            { conceito: "Membro", significado: "Cada lado da equação: membro esquerdo e direito" },
            { conceito: "Solução (raiz)", significado: "O valor de x que torna a equação verdadeira" }
          ],
          regraFundamental: "O que você faz de um lado, você faz do outro (somou, subtraiu, multiplicou ou dividiu). Isso mantém o equilíbrio da igualdade.",
          estruturaGeral: {
            formula: "ax + b = c",
            solucao: "x = (c - b) / a"
          },
          perguntasFinanceiras: [
            { pergunta: "Quanto investir pra ter R$ 1.100 com 10% de juros?", equacao: "x × 1,10 = 1.100" },
            { pergunta: "Qual o gasto máximo com salário de R$ 3.000 e economia de R$ 500?", equacao: "x + 500 = 3.000" },
            { pergunta: "Em quantos meses junto R$ 2.400 poupando R$ 300/mês?", equacao: "300x = 2.400" }
          ],
          exemploResolvido: {
            titulo: "Cálculo de Aporte Inicial",
            enunciado: "Quanto você precisa aplicar hoje (x) a uma taxa de 10% ao ano para obter R$ 1.100 ao final de 1 ano?",
            passos: [
              "1. Montar a equação: 1,10 · x = 1.100",
              "2. Dividir ambos os lados por 1,10: x = 1.100 ÷ 1,10",
              "3. Resolver a divisão: x = 1.000"
            ],
            resultado: "Você precisa aplicar R$ 1.000,00."
          },
          miniQuiz: [
            {
              pergunta: "Se 300x = 2.400, qual é o valor de x (número de meses para poupar R$ 2.400 guardando R$ 300 por mês)?",
              opcoes: ["6 meses", "8 meses", "10 meses", "12 meses"],
              respostaCorreta: 1,
              explicacao: "x = 2.400 ÷ 300 = 8 meses."
            },
            {
              pergunta: "Qual é a regra fundamental ao resolver uma equação?",
              opcoes: ["Passar todos os números para o lado esquerdo sem mudar de sinal", "Qualquer operação matemática realizada de um lado da igualdade deve ser feita também do outro lado", "Multiplicar sempre por zero para simplificar", "Apagar a incógnita quando ela for negativa"],
              respostaCorreta: 1,
              explicacao: "A igualdade é uma balança: a mesma alteração aplicada a um membro deve ser feita no outro."
            },
            {
              pergunta: "Se x + 500 = 3.000, qual o valor de x?",
              opcoes: ["2.000", "2.500", "3.500", "1.500"],
              respostaCorreta: 1,
              explicacao: "x = 3.000 - 500 = 2.500."
            },
            {
              pergunta: "Para isolar x na equação 1,10x = 1.100, devemos:",
              opcoes: ["Subtrair 1,10 dos dois lados", "Dividir ambos os lados por 1,10", "Multiplicar ambos os lados por 1,10", "Somar 1,10 dos dois lados"],
              respostaCorreta: 1,
              explicacao: "Como 1,10 está multiplicando x, a operação inversa é a divisão por 1,10 em ambos os lados."
            },
            {
              pergunta: "Qual é a solução da equação geral ax + b = c?",
              opcoes: ["x = (c + b) / a", "x = (c - b) / a", "x = a / (c - b)", "x = c - b - a"],
              respostaCorreta: 1,
              explicacao: "Subtrai-se b dos dois lados (c - b) e divide-se por a: x = (c - b) / a."
            }
          ],
          pbl: {
            titulo: "Meta de Poupança para Viagem",
            cenario: "Mariana tem R$ 400 guardados e consegue poupar R$ 150 por mês. Uma viagem custa R$ 1.900. Escreva a equação e descubra em quantos meses ela conseguirá viajar.",
            solucao: "Equação: 400 + 150x = 1900. Isola 150x: 150x = 1900 - 400 = 1500. Resolve x: x = 1500 ÷ 150 = 10 meses."
          },
          resumo: [
            "Equação de 1º grau isola uma incógnita usando operações inversas.",
            "Regra fundamental: o que faz de um lado, faz do outro.",
            "Em finanças: toda pergunta 'quanto preciso de X pra ter Y' é uma equação.",
            "Parabéns — você concluiu o Módulo 1. O próximo passo é o Módulo 2 — Matemática Financeira Aplicada."
          ]
        }
      ]
    },
    {
      id: "modulo-2",
      slug: "modulo-2-aplicada",
      numero: 2,
      titulo: "Módulo 2: Matemática Financeira Aplicada",
      descricao: "Porcentagem, variação, juros simples e compostos, inflação, rentabilidade líquida, CDI e Selic.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-porcentagem-e-variacao",
          numero: 1,
          titulo: "Aula 1: Porcentagem e variação",
          comeceAqui: "Porcentagem é a língua básica das finanças. Juros, inflação, rentabilidade, queda de ações, aumento de preço e imposto quase sempre aparecem em porcentagem.",
          ideiaCentral: "Porcentagem significa 'por 100'. Se algo rende 10%, isso quer dizer que rende 10 a cada 100.",
          conceitosEssenciais: [
            { conceito: "Porcentagem", significado: "Parte de um total dividido por 100" },
            { conceito: "Variação percentual", significado: "Quanto algo subiu ou caiu em relação ao valor inicial" },
            { conceito: "Valor inicial", significado: "O número antes da mudança" },
            { conceito: "Valor final", significado: "O número depois da mudança" },
            { conceito: "Ponto percentual", significado: "Diferença direta entre duas taxas" }
          ],
          formulaPrincipal: {
            equacao: "Variação = (Valor final - Valor inicial) / Valor inicial",
            detalhe: "Para transformar em porcentagem, multiplique por 100."
          },
          exemploResolvido: {
            titulo: "Variação Percentual de uma Ação",
            enunciado: "Uma ação saiu de R$ 20 para R$ 25. Qual foi a variação percentual?",
            passos: [
              "1. Aplicação da fórmula: Variação = (25 - 20) / 20",
              "2. Cálculo intermediário: 5 / 20 = 0,25",
              "3. Multiplicar por 100: 0,25 × 100 = 25%"
            ],
            resultado: "A ação subiu 25%."
          },
          cuidadoComum: "Se uma ação cai 50%, ela precisa subir 100% para voltar ao preço original. Exemplo: R$ 100 cai 50% → R$ 50. De R$ 50 para R$ 100, precisa ganhar R$ 50, o que é 100% de R$ 50.",
          miniQuiz: [
            {
              pergunta: "Quanto é 15% de R$ 200?",
              opcoes: ["R$ 20", "R$ 30", "R$ 40", "R$ 15"],
              respostaCorreta: 1,
              explicacao: "200 × 0,15 = R$ 30."
            },
            {
              pergunta: "Um produto foi de R$ 80 para R$ 100. Qual foi a variação percentual?",
              opcoes: ["20%", "25%", "80%", "15%"],
              respostaCorreta: 1,
              explicacao: "(100 - 80) ÷ 80 = 20 ÷ 80 = 0,25 = 25%."
            },
            {
              pergunta: "Uma ação caiu de R$ 40 para R$ 30. Qual foi a queda percentual?",
              opcoes: ["-10%", "-20%", "-25%", "-30%"],
              respostaCorreta: 2,
              explicacao: "(30 - 40) ÷ 40 = -10 ÷ 40 = -0,25 = -25%."
            },
            {
              pergunta: "Qual a diferença entre porcentagem e ponto percentual?",
              opcoes: ["Não há diferença", "Ponto percentual é a diferença direta entre duas taxas; porcentagem é a variação relativa ao valor inicial", "Porcentagem se aplica a dinheiro; ponto percentual a distâncias", "Ponto percentual é sempre o dobro da porcentagem"],
              respostaCorreta: 1,
              explicacao: "Se uma taxa vai de 10% a 12%, aumentou 2 pp (pontos percentuais) e 20% (variação percentual relativa)."
            },
            {
              pergunta: "Por que cair 50% e depois subir 50% não faz o valor voltar ao ponto inicial?",
              opcoes: ["Porque o banco cobra taxas no caminho", "Porque a alta de 50% incide sobre a base menor resultante da queda", "Porque porcentagens negativas não existem", "Porque a matemática financeira proíbe recuperar perdas"],
              respostaCorreta: 1,
              explicacao: "Se R$ 100 cai 50%, vai a R$ 50. Subir 50% sobre R$ 50 adiciona apenas R$ 25, resultando em R$ 75."
            }
          ],
          pbl: {
            titulo: "Análise de Recuperação de Ação",
            cenario: "Dois alunos analisam uma ação. Ela caiu de R$ 10 para R$ 5 e depois subiu de R$ 5 para R$ 8. Um aluno diz: 'caiu 50% e subiu 60%, então ficou positivo'. Ele está certo? Explique.",
            solucao: "Não está certo. Queda de R$ 10 para R$ 5 = -50%. Alta de R$ 5 para R$ 8 = +60% (60% de 5 = 3; 5+3=8). Apesar de 60% > 50%, o valor final (R$ 8) é menor que o inicial (R$ 10), representando perda total de 20%."
          },
          resumo: [
            "Porcentagem compara uma parte com um total.",
            "Variação percentual sempre depende do valor inicial.",
            "Quedas e altas percentuais não se anulam automaticamente."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-juros-simples-e-compostos",
          numero: 2,
          titulo: "Aula 2: Juros simples e compostos",
          comeceAqui: "Juros são o preço do dinheiro no tempo. Quem empresta dinheiro quer receber mais no futuro. Quem pega dinheiro emprestado paga por antecipar consumo ou investimento. Existem dois regimes de juros: simples e compostos. Na vida real de investimentos brasileiros, quase tudo funciona em juros compostos — mas entender os dois evita erros de cálculo.",
          ideiaCentral: "Nos juros simples, você ganha juros só sobre o capital inicial. Nos juros compostos, você ganha juros sobre o capital inicial e sobre os juros que já acumulou. Isso cria o efeito de 'bola de neve'.",
          conceitosEssenciais: [
            { conceito: "Capital inicial (VP)", significado: "O dinheiro que você coloca no início" },
            { conceito: "Taxa de juros (i)", significado: "O percentual que o dinheiro rende por período" },
            { conceito: "Prazo (n)", significado: "Número de períodos (meses, anos)" },
            { conceito: "Valor futuro (VF)", significado: "O total que você terá ao final" },
            { conceito: "Juros simples", significado: "Rendimento calculated só sobre o capital inicial" },
            { conceito: "Juros compostos", significado: "Rendimento calculado sobre capital + juros acumulados" }
          ],
          formulas: [
            { nome: "Juros simples", equacao: "VF = VP × (1 + i × n)" },
            { nome: "Juros compostos", equacao: "VF = VP × (1 + i)^n" }
          ],
          exemploResolvido: {
            titulo: "Comparando 3 anos de Juros Simples e Compostos",
            enunciado: "João investe R$ 1.000 a 10% ao ano. Veja a diferença após 3 anos:",
            passos: [
              "1. Juros simples: VF = 1000 × (1 + 0,10 × 3) = 1000 × 1,30 = R$ 1.300",
              "2. Juros compostos: VF = 1000 × (1 + 0,10)³ = 1000 × 1,331 = R$ 1.331",
              "3. Em 30 anos: Simples = R$ 4.000 | Compostos = R$ 17.449"
            ],
            resultado: "Compostos geram mais de 4 vezes o resultado simples em 30 anos."
          },
          cuidadoComum: "Empréstimos no Brasil usam juros compostos. Uma taxa de 10% ao mês em cartão de crédito transforma R$ 1.000 em R$ 3.138 em apenas 1 ano se não for paga.",
          miniQuiz: [
            {
              pergunta: "Qual é a diferença entre juros simples e compostos?",
              opcoes: ["Juros simples rendem sobre o capital inicial; compostos rendem sobre o capital + juros acumulados", "Juros simples são cobrados por bancos; compostos pelo governo", "Juros simples usam potência; compostos usam multiplicação", "Não há diferença prática no longo prazo"],
              respostaCorreta: 0,
              explicacao: "Nos juros compostos, os juros de cada período são incorporados ao capital para o cálculo do período seguinte."
            },
            {
              pergunta: "R$ 500 a 5% ao ano por 4 anos em juros simples resulta em qual valor futuro?",
              opcoes: ["R$ 550", "R$ 600", "R$ 607,75", "R$ 650"],
              respostaCorreta: 1,
              explicacao: "VF = 500 × (1 + 0,05 × 4) = 500 × 1,20 = R$ 600."
            },
            {
              pergunta: "R$ 500 a 5% ao ano por 4 anos em juros compostos resulta em qual valor futuro aproximado?",
              opcoes: ["R$ 600,00", "R$ 607,75", "R$ 625,00", "R$ 640,00"],
              respostaCorreta: 1,
              explicacao: "VF = 500 × (1,05)⁴ = 500 × 1,215506 = R$ 607,75."
            },
            {
              pergunta: "Por que o tempo importa muito mais nos juros compostos do que nos simples?",
              opcoes: ["Porque o tempo faz a taxa diminuir", "Porque a variável tempo entra como expoente, gerando crescimento exponencial", "Porque a inflação desaparece com o tempo", "Porque os bancos perdem o controle das contas"],
              respostaCorreta: 1,
              explicacao: "Como o tempo é um expoente (1+i)^n, a curva de crescimento se acelera exponencialmente."
            },
            {
              pergunta: "Em qual regime se encaixam os investimentos brasileiros como CDB, LCI e Tesouro Direto?",
              opcoes: ["Juros simples", "Juros compostos", "Juros contínuos lineares", "Sem regime de juros"],
              respostaCorreta: 1,
              explicacao: "Praticamente todos os produtos de renda fixa no mercado brasileiro operam sob juros compostos."
            }
          ],
          pbl: {
            titulo: "O Poder do Prazo em Juros Compostos",
            cenario: "Duas pessoas investem R$ 1.000 a 10% ao ano em juros compostos. Maria deixa por 10 anos. Pedro deixa por 30 anos. A diferença de prazo é 3 vezes maior. O resultado de Pedro será 3 vezes maior?",
            solucao: "Maria (10 anos): 1000 × (1,10)¹⁰ = R$ 2.593,74. Pedro (30 anos): 1000 × (1,10)³⁰ = R$ 17.449,40. O resultado de Pedro é mais de 6,7 vezes maior que o de Maria, devido ao expoente 30."
          },
          resumo: [
            "Juros simples rendem sobre o capital inicial; compostos rendem sobre tudo que já acumulou.",
            "A diferença entre os dois cresce exponencialmente com o tempo.",
            "Investimentos brasileiros usam juros compostos — isso beneficia quem investe e prejudica quem se endivida.",
            "A próxima aula mostra como a inflação corrói esse rendimento."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-inflacao-e-juros-reais",
          numero: 3,
          titulo: "Aula 3: Inflação e juros reais",
          comeceAqui: "Rentabilidade nominal é quanto seu dinheiro aumenta em reais. Mas se os preços também subiram, você não ficou proporcionalmente mais rico. Rentabilidade real é o que importa: quanto seu poder de compra aumentou depois de descontar a inflação.",
          ideiaCentral: "Se seu investimento rendeu 12% e a inflação foi 7%, você não ficou 12% mais rico. Você ficou mais rico em termos reais — mas menos do que 12%. O rendimento real é o que você consegue comprar a mais com seu dinheiro.",
          conceitosEssenciais: [
            { conceito: "Inflação", significado: "Alta geral dos preços ao longo do tempo" },
            { conceito: "IPCA", significado: "Índice oficial de inflação do Brasil (medido pelo IBGE)" },
            { conceito: "Rentabilidade nominal", significado: "Rendimento em reais, antes de descontar inflação" },
            { conceito: "Rentabilidade real", significado: "Rendimento depois de descontar a inflação" },
            { conceito: "Poder de compra", significado: "Quantidade de bens que seu dinheiro consegue comprar" },
            { conceito: "Juros reais", significado: "Taxa de juros que já considera a inflação" }
          ],
          formulas: [
            { nome: "Aproximação simples (estimativa rápida)", equacao: "Juro real ≈ Juro nominal - Inflação" },
            { nome: "Fórmula exata ( Fisher )", equacao: "(1 + r) = (1 + i) / (1 + π)" }
          ],
          exemploResolvido: {
            titulo: "Cálculo da Rentabilidade Real Exata",
            enunciado: "Um investimento rendeu 12% nominal no ano. O IPCA foi de 7%. Qual foi a rentabilidade real pela fórmula exata?",
            passos: [
              "1. Método aproximado: 12% - 7% = 5%",
              "2. Fórmula exata: (1 + r) = 1,12 / 1,07 = 1,046729",
              "3. Descontar 1: r = 0,0467 = 4,67%"
            ],
            resultado: "A rentabilidade real exata foi de 4,67% (e não 5%)."
          },
          cuidadoComum: "Em anos de inflação alta, investimentos que parecem render bem podem estar destruindo poder de compra. Exemplo: Selic em 6% com IPCA em 8% → juro real aproximado de -2%.",
          miniQuiz: [
            {
              pergunta: "Qual a diferença entre rentabilidade nominal e real?",
              opcoes: ["Nominal é a declarada no contrato; real é a que desconta a inflação e mede ganho no poder de compra", "Nominal é paga em dinheiro; real em moedas estrangeiras", "Nominal inclui impostos; real exclui impostos", "Não há diferença entre ambas"],
              respostaCorreta: 0,
              explicacao: "A rentabilidade nominal mede o ganho de caixa; a real mede o ganho efetivo de poder de compra após o IPCA."
            },
            {
              pergunta: "O IPCA ficou em 5,5% e sua aplicação rendeu 9,5% nominal. Qual foi a rentabilidade real aproximada?",
              opcoes: ["15,0%", "4,0%", "5,5%", "3,79%"],
              respostaCorreta: 1,
              explicacao: "Pela aproximação rápida: 9,5% - 5,5% = 4,0%."
            },
            {
              pergunta: "Por que comparar investimentos apenas pelo rendimento nominal pode enganar?",
              opcoes: ["Porque a inflação altera o poder de compra da moeda", "Porque bancos cobram taxas escondidas", "Porque o rendimento nominal é sempre negativo", "Porque a Selic é fixa"],
              respostaCorreta: 0,
              explicacao: "Se a inflação for maior que o rendimento nominal, você perdeu poder de compra apesar de ver o saldo crescer."
            },
            {
              pergunta: "O que mede o IPCA no Brasil?",
              opcoes: ["A variação do dólar comercial", "A taxa média de juros cobrada por bancos", "A variação de preços da cesta de consumo das famílias (inflação oficial)", "O crescimento da produção de bens do país"],
              respostaCorreta: 2,
              explicacao: "IPCA (Índice de Preços ao Consumidor Amplo) é a medida oficial de inflação no Brasil."
            },
            {
              pergunta: "Se dois investimentos rendem 10% nominal, mas na Opção A a inflação é 3% e na Opção B a inflação é 8%, qual é mais vantajosa?",
              opcoes: ["Opção A, pois a inflação menor garante maior rentabilidade real", "Opção B, pois a inflação alta aumenta o ganho", "Ambas oferecem o mesmo ganho real", "Nenhuma das duas rende acima de zero"],
              respostaCorreta: 0,
              explicacao: "Com inflação menor (3%), sobra mais rentabilidade real (aproximadamente 7% vs 2%)."
            }
          ],
          pbl: {
            titulo: "Perda Invisível na Poupança",
            cenario: "Um investidor deixou R$ 10.000 na poupança durante um ano em que ela rendeu 4,5%, enquanto a inflação foi de 7%. Ele comemora que 'ganhou R$ 450'. O que aconteceu de verdade com o poder de compra dele?",
            solucao: "Rentabilidade nominal: +4,5%. Inflação: 7%. Pela fórmula exata: (1,045 / 1,07) - 1 = -2,33% real. Ele perdeu 2,33% de poder de compra real (os R$ 10.450 finais compram menos do que os R$ 10.000 compravam um ano antes)."
          },
          resumo: [
            "Inflação corrói o valor do dinheiro; o que importa é o rendimento real.",
            "A fórmula exata é: (1 + nominal) / (1 + inflação) − 1.",
            "O IPCA é o termômetro oficial da inflação no Brasil.",
            "A próxima aula explica como impostos e taxas cortam ainda mais o que sobra."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-rentabilidade-liquida",
          numero: 4,
          titulo: "Aula 4: Rentabilidade líquida",
          comeceAqui: "Todo investimento tem dois inimigos silenciosos: imposto de renda e taxas. Rentabilidade bruta é o que aparece na propaganda. Rentabilidade líquida é o que realmente fica com você depois de pagar tudo.",
          ideiaCentral: "Comparar investimentos só pela rentabilidade bruta é como comparar salários sem considerar o imposto. Um CDB a 13% bruto pode render menos na prática do que uma LCA a 11% isenta de IR.",
          conceitosEssenciais: [
            { conceito: "Rentabilidade bruta", significado: "Rendimento antes de impostos e taxas" },
            { conceito: "Rentabilidade líquida", significado: "Rendimento depois de impostos e taxas" },
            { conceito: "Imposto de Renda (IR)", significado: "Tributo cobrado sobre o lucro de alguns investimentos" },
            { conceito: "Tabela regressiva de IR", significado: "IR menor quanto mais tempo você fica investido" },
            { conceito: "Taxa de administração", significado: "Custo cobrado pelo gestor de um fundo" },
            { conceito: "Isenção de IR", significado: "Produtos isentos (LCI, LCA, CRI, CRA, debêntures incentivadas)" }
          ],
          tabelaRegressiva: [
            { prazo: "Até 180 dias", aliquota: "22,5%" },
            { prazo: "181 a 360 dias", aliquota: "20,0%" },
            { prazo: "361 a 720 dias", aliquota: "17,5%" },
            { prazo: "Acima de 720 dias", aliquota: "15,0%" }
          ],
          formulas: [
            { nome: "Rentabilidade líquida (com IR)", equacao: "Liquida = Bruta × (1 - Aliquota IR)" },
            { nome: "Equivalente bruto de um isento", equacao: "Equivalente bruto = Rentabilidade isenta / (1 - Aliquota IR)" }
          ],
          exemploResolvido: {
            titulo: "Comparando CDB com LCA",
            enunciado: "Compare um CDB a 13% ao ano (IR de 15% para > 2 anos) com uma LCA a 11% ao ano (isenta).",
            passos: [
              "1. CDB líquido: 13% × (1 - 0,15) = 13% × 0,85 = 11,05%",
              "2. LCA líquida: 11,00% (sem imposto)",
              "3. Comparação: CDB a 13% rende 11,05% líquido, quase empatando com LCA a 11%."
            ],
            resultado: "Se o prazo fosse menor (ex: IR de 22,5%), a LCA de 11% ganharia do CDB de 13%."
          },
          cuidadoComum: "Fundos de investimento cobram taxa de administração sobre todo o patrimônio e sofrem come-cotas (antecipação de IR a cada 6 meses), o que prejudica os juros compostos.",
          miniQuiz: [
            {
              pergunta: "Qual a diferença entre rentabilidade bruta e líquida?",
              opcoes: ["Bruta é o ganho total antes de impostos/taxas; líquida é o que sobra após os custos", "Bruta inclui juros simples; líquida juros compostos", "Bruta é garantida pelo FGC; líquida não tem garantia", "São idênticas para investimentos bancários"],
              respostaCorreta: 0,
              explicacao: "Impostos (IR) e taxas de administração reduzem o ganho bruto ao valor líquido."
            },
            {
              pergunta: "Um CDB rende 14% ao ano. O prazo da aplicação é de 500 dias (alíquota de IR de 17,5%). Qual a rentabilidade líquida?",
              opcoes: ["11,55%", "12,25%", "14,00%", "10,50%"],
              respostaCorreta: 0,
              explicacao: "Líquida = 14% × (1 - 0,175) = 14% × 0,825 = 11,55%."
            },
            {
              pergunta: "Por que uma LCA pagando 11% ao ano pode vencer um CDB de 13% ao ano?",
              opcoes: ["Porque a LCA tem rendimento garantido pelo governo", "Porque a LCA é isenta de Imposto de Renda para pessoa física", "Porque a LCA cobra taxa de performance", "Porque a LCA é corrigida pelo IPCA"],
              respostaCorreta: 1,
              explicacao: "Como a LCA não paga IR, seus 11% são inteiramente líquidos, superando ou empatando com taxas brutas maiores sujeitas a IR."
            },
            {
              pergunta: "Na tabela regressiva de IR de renda fixa, qual a menor alíquota possível e a partir de qual prazo ela é aplicada?",
              opcoes: ["22,5% até 180 dias", "15% para aplicações acima de 720 dias (2 anos)", "10% após 5 anos", "Zero para qualquer prazo"],
              respostaCorreta: 1,
              explicacao: "Após 720 dias (2 anos), a alíquota cai para o patamar mínimo de 15% sobre o rendimento."
            },
            {
              pergunta: "O que é o come-cotas em fundos de investimento?",
              opcoes: ["Uma taxa extra cobrada pela corretora no resgate", "A antecipação semestral da cobrança do Imposto de Renda em cotas do fundo", "O desconto de taxa de custódia da B3", "O cancelamento de cotas de investidores inadimplentes"],
              respostaCorreta: 1,
              explicacao: "O come-cotas recolhe antecipadamente o IR em maio e novembro reduzindo o número de cotas."
            }
          ],
          pbl: {
            titulo: "Decisão entre CDB e LCA",
            cenario: "Carlos compara CDB a 105% do CDI com LCA a 91% do CDI. O CDI está em 10,5% ao ano. O prazo planejado é de 2 anos (alíquota de IR de 15%). Qual investimento é mais vantajoso?",
            solucao: "CDI = 10,5%. CDB bruto: 10,5 × 1,05 = 11,025%. CDB líquido: 11,025 × 0,85 = 9,37%. LCA líquida (isenta): 10,5 × 0,91 = 9,555%. A LCA é mais vantajosa (9,55% vs 9,37% líquido)."
          },
          resumo: [
            "Rentabilidade bruta é propaganda; rentabilidade líquida é o que importa.",
            "IR segue tabela regressiva: quanto mais tempo, menor o imposto.",
            "Produtos isentos (LCI, LCA) podem ser mais rentáveis mesmo com taxa nominal menor.",
            "A próxima aula explica como usar CDI e Selic como referência para comparar qualquer investimento."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-cdi-selic-comparacao",
          numero: 5,
          titulo: "Aula 5: CDI, Selic e como comparar investimentos",
          comeceAqui: "Muitos investimentos brasileiros usam frases como 'rende 110% do CDI' ou 'acompanha a Selic'. Sem entender o que são CDI e Selic, você não consegue comparar nenhum produto de renda fixa de forma justa.",
          ideiaCentral: "CDI e Selic são taxas de referência do mercado financeiro brasileiro. Elas funcionam como uma régua: permitem comparar produtos diferentes em um mesmo padrão, independente da nomenclatura de cada banco.",
          conceitosEssenciais: [
            { conceito: "Selic", significado: "Taxa básica de juros do Brasil, definida pelo COPOM a cada 45 dias" },
            { conceito: "CDI", significado: "Taxa praticada em empréstimos entre bancos; anda junto com a Selic" },
            { conceito: "Percentual do CDI", significado: "Indica quanto um produto rende em relação ao CDI (ex: 110% do CDI)" },
            { conceito: "Benchmark", significado: "Referência usada para comparar o desempenho de um investimento" },
            { conceito: "Liquidez", significado: "Facilidade de resgatar o dinheiro antes do vencimento" },
            { conceito: "Risco de crédito", significado: "Risco de o emissor não pagar o que deve" },
            { conceito: "Prazo", significado: "Tempo até o vencimento do produto" }
          ],
          relacaoSelicCDI: "Na prática, CDI ≈ Selic − 0,10%. Para estimativas rápidas, use os dois como equivalentes.",
          formula: {
            equacao: "Rentabilidade = CDI × Percentual do CDI",
            exemplo: "Se CDI = 10,5%, 110% do CDI = 10,5% × 1,10 = 11,55% ao ano (bruto)."
          },
          exemploResolvido: {
            titulo: "Tabela de Comparação com CDI a 10,5%",
            enunciado: "Compare três produtos de renda fixa com CDI a 10,5% ao ano para um prazo de 2 anos (IR 15%):",
            passos: [
              "1. Tesouro Selic (100% CDI): 10,5% bruto → 8,93% líquido",
              "2. CDB 110% do CDI: 11,55% bruto → 9,82% líquido",
              "3. LCI 92% do CDI: 9,66% bruto (isenta) → 9,66% líquido"
            ],
            resultado: "O CDB 110% entrega o maior líquido (9,82%), mas LCI (9,66%) é próxima e pode oferecer prazos menores."
          },
          cuidadoComum: "Comparar investimentos apenas pela taxa bruta — sem ajustar IR, prazo, carência e risco de crédito — leva a decisões de investimento equivocadas.",
          miniQuiz: [
            {
              pergunta: "O que é o CDI e qual sua relação com a taxa Selic?",
              opcoes: ["CDI é uma ação da B3 que varia com a inflação", "CDI é a taxa negociada entre bancos e anda muito próxima da Selic (CDI ≈ Selic - 0,10%)", "CDI é o imposto sobre a renda fixa", "CDI é a taxa de juros do dólar nos EUA"],
              respostaCorreta: 1,
              explicacao: "CDI (Certificado de Depósito Interbancário) é a taxa das operações entre bancos, que acompanha a Selic."
            },
            {
              pergunta: "Se o CDI está em 12% ao ano, quanto rende em taxa bruta um CDB ofertado a 108% do CDI?",
              opcoes: ["12,00%", "12,96%", "13,50%", "11,20%"],
              respostaCorreta: 1,
              explicacao: "12% × 1,08 = 12,96% ao ano."
            },
            {
              pergunta: "Por que comparar dois produtos só pela taxa nominal/bruta pode enganar?",
              opcoes: ["Porque impostos, prazos, liquidez e riscos de crédito alteram o resultado prático", "Porque a Selic muda todos os dias sem aviso", "Porque os bancos cobram taxa de câmbio", "Porque a inflação só afeta o Tesouro"],
              respostaCorreta: 0,
              explicacao: "Investimentos com IR diferente (ex: CDB vs LCI) ou liquidez diferente exigem comparação na rentabilidade líquida."
            },
            {
              pergunta: "O que significa dizer que um ativo tem alta liquidez?",
              opcoes: ["Que ele não tem nenhum risco de crédito", "Que ele pode ser convertido em dinheiro rapidamente sem grande perda de valor", "Que ele rende obrigatoriamente acima de 120% do CDI", "Que ele é isento de Imposto de Renda"],
              respostaCorreta: 1,
              explicacao: "Liquidez é a velocidade e facilidade de resgate do valor investido."
            },
            {
              pergunta: "Quando uma LCA a 90% do CDI pode ser melhor que um CDB a 110% do CDI?",
              opcoes: ["Quando o prazo for curto (ex: 6 meses), onde o IR do CDB é de 22,5%, reduzindo o líquido do CDB para 85,25% do CDI", "Sempre, pois LCA não tem risco", "Nunca, pois 110% é sempre maior", "Apenas quando a inflação for zero"],
              respostaCorreta: 0,
              explicacao: "Em prazos curtos (IR 22,5%), 110% × (1 - 0,225) = 85,25% do CDI líquido, perdendo para os 90% líquidos da LCA."
            }
          ],
          pbl: {
            titulo: "Escolha da Reserva de Curto Prazo",
            cenario: "Você precisará do dinheiro possivelmente em 6 meses (CDI a 10,5%). Propostas: Tesouro Selic (liquidez diária), CDB banco médio 120% do CDI (vencimento em 2 anos sem liquidez antecipada) e LCI 93% do CDI (carência de 90 dias). Qual escolher?",
            solucao: "O CDB 120% não serve por falta de liquidez em 6 meses. O Tesouro Selic (liquidez diária) ou LCI 93% (após 90 dias liberada) servem. Na LCI 93% o ganho é líquido 9,765%. No Tesouro Selic com IR 22,5%, ganho líquido = 10,5 × 0,775 = 8,137%. A LCI a 93% é a melhor opção caso liberada aos 6 meses."
          },
          resumo: [
            "Selic e CDI são as taxas de referência do mercado; CDI ≈ Selic.",
            "Percentual do CDI permite comparar produtos em uma mesma régua.",
            "Sempre ajuste para rentabilidade líquida: tire IR, considere prazo e liquidez.",
            "Com isso, você terminou o Nível 2 — Matemática Financeira Aplicada."
          ]
        }
      ]
    },
    {
      id: "modulo-3",
      slug: "modulo-3-funcoes-e-probabilidade",
      numero: 3,
      titulo: "Módulo 3: Funções, Progressões e Probabilidade",
      descricao: "Função afim, exponencial, logaritmos, PA, PG, somatório, produtório, probabilidade e valor esperado.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-o-que-e-uma-funcao",
          numero: 1,
          titulo: "Aula 1: O que é uma função",
          comeceAqui: "Uma função é uma máquina de transformar números: entra um valor, sai outro, sempre seguindo a mesma regra. 'Quanto vou ter se investir por t meses?' é uma função. Dominar essa ideia destrava toda a matemática financeira que vem pela frente.",
          ideiaCentral: "Escrevemos f(x) para dizer 'o resultado da máquina f quando entra x'. A função afim f(x) = ax + b cresce em linha reta. Juros simples são uma função afim do tempo: M(t) = C + (C · i)t.",
          conceitosEssenciais: [
            { conceito: "Função", significado: "Regra que associa cada entrada a exatamente uma saída" },
            { conceito: "Domínio", significado: "O conjunto de entradas que fazem sentido" },
            { conceito: "Imagem", significado: "O conjunto de saídas possíveis" },
            { conceito: "Variável independente (x)", significado: "A entrada — o que você controla ou observa" },
            { conceito: "Variável dependente (f(x))", significado: "A saída — o que a regra devolve" },
            { conceito: "Função afim (linear)", significado: "f(x) = ax + b: cresce em linha reta" },
            { conceito: "Coeficiente angular (a)", significado: "A inclinação — quanto a saída muda por unidade de entrada" },
            { conceito: "Coeficiente linear (b)", significado: "O ponto de partida quando x = 0" }
          ],
          exemploResolvido: {
            titulo: "Custo de Plano de Celular",
            enunciado: "Plano cobra R$ 30 fixos + R$ 2 por GB usado: f(x) = 2x + 30. Calcule o custo de 8 GB e quantos GB dá para usar com R$ 50.",
            passos: [
              "1. f(8) = 2 · 8 + 30 = 16 + 30 = R$ 46",
              "2. Inverter a função: 2x + 30 = 50 → 2x = 20 → x = 10 GB"
            ],
            resultado: "8 GB custam R$ 46. Com R$ 50 dá para usar 10 GB."
          },
          listaProblemas: [
            { questao: "1. Se f(x) = 3x - 4, calcule f(2), f(0) e f(10).", resposta: "f(2) = 2; f(0) = -4; f(10) = 26." },
            { questao: "2. Um investimento em juros simples segue M(t) = 1000 + 15t (em R$, t em meses). Qual o capital inicial e a taxa mensal?", resposta: "Capital inicial: R$ 1.000; rendimento: R$ 15/mês; taxa: 15/1000 = 1,5% a.m." },
            { questao: "3. No problema 2, em quantos meses o montante chega a R$ 1.450?", resposta: "1000 + 15t = 1450 → 15t = 450 → t = 30 meses." },
            { questao: "4. Uma corrida de app custa f(d) = 5 + 1,80d. Com R$ 23, qual a distância máxima?", resposta: "5 + 1,80d = 23 → 1,80d = 18 → d = 10 km." },
            { questao: "5. Escreva a função do montante em juros simples para C = R$ 2.000 e i = 1,5% a.m. por 2 anos.", resposta: "M(t) = 2000 + 30t. Após 24 meses: M(24) = 2000 + 720 = R$ 2.720." }
          ],
          pbl: {
            titulo: "Escolha de Plano de Remuneração",
            cenario: "João compara duas propostas: (a) R$ 80 fixos; (b) R$ 20 fixos + R$ 6 por dia trabalhado (d). Qual a melhor escolha?",
            solucao: "Proposta (b): f(d) = 6d + 20. Igualando a (a): 6d + 20 = 80 → 6d = 60 → d = 10 dias. A partir de 11 dias de trabalho, a proposta (b) é superior."
          },
          resumo: [
            "Função é uma regra: cada entrada tem exatamente uma saída.",
            "A função afim f(x) = ax + b cresce em linha reta: b é o início, a é o ritmo.",
            "Juros simples são uma função afim do tempo: M(t) = C(1 + it)."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-funcao-exponencial",
          numero: 2,
          titulo: "Aula 2: Função exponencial",
          comeceAqui: "Na função afim, a variável está multiplicando (2x). Na exponencial, ela está no expoente (2^x). Parece detalhe, mas é a diferença entre andar e voar: a afim cresce somando; a exponencial cresce multiplicando pelo mesmo fator.",
          ideiaCentral: "f(x) = a · b^x. Juros compostos são uma função exponencial do tempo: M(t) = C(1+i)^t, onde a = C e b = 1+i.",
          conceitosEssenciais: [
            { conceito: "Base (b)", significado: "O fator multiplicativo por período" },
            { conceito: "Crescimento exponencial", significado: "b > 1: cada passo multiplica por mais de 1" },
            { conceito: "Decaimento exponencial", significado: "0 < b < 1: cada passo perde uma fração fixa" },
            { conceito: "Fator de crescimento", significado: "1 + i: taxa de 10% vira fator 1,10" }
          ],
          exemploResolvido: {
            titulo: "Rendimento Exponencial em 2 Anos",
            enunciado: "Aplicação de R$ 5.000 a 1% ao mês em juros compostos por 2 anos (24 meses).",
            passos: [
              "1. M = 5000 · (1,01)²⁴",
              "2. (1,01)²⁴ ≈ 1,2697",
              "3. M = 5000 · 1,2697 = R$ 6.348,67"
            ],
            resultado: "Montante final: R$ 6.348,67 (ganho de 26,97%, e não 24%)."
          },
          listaProblemas: [
            { questao: "1. Identifique a e b: f(x) = 200 · 1,05^x; g(x) = 800 · 0,9^x.", resposta: "f: a=200, b=1,05 (cresce); g: a=800, b=0,9 (decai)." },
            { questao: "2. População de 100.000 cresce 2% a.a. Estime em 10 anos.", resposta: "P(10) = 100.000 · (1,02)¹⁰ ≈ 121.899 habitantes." },
            { questao: "3. R$ 3.000 a 0,8% a.m. por 18 meses.", resposta: "3000 · (1,008)¹⁸ ≈ 3000 · 1,1542 = R$ 3.462,52." },
            { questao: "4. Carro de R$ 60.000 desvaloriza 15% a.a. Valor após 4 anos?", resposta: "60000 · (0,85)⁴ ≈ R$ 31.320,38." },
            { questao: "5. Inflação de 5% a.a. Poder de compra de R$ 1.000 em 10 anos?", resposta: "1000 / (1,05)¹⁰ ≈ R$ 613,91." }
          ],
          pbl: {
            titulo: "Alice vs Bruna: Começar Cedo ou Tarde",
            cenario: "Alice investe R$ 10.000 aos 20 anos a 10% a.a. e para de aportar. Bruna investe aos 35 anos R$ 30.000 a 10% a.a. Quem tem mais aos 60 anos?",
            solucao: "Alice aos 60 (40 anos de juros): 10.000 · (1,10)⁴⁰ = R$ 452.592,59. Bruna aos 60 (25 anos): 30.000 · (1,10)²⁵ = R$ 325.041,00. Alice vence por R$ 127.551 mesmo investindo 3 vezes menos, devido ao tempo no expoente."
          },
          resumo: [
            "Exponencial: f(x) = a · b^x — cresce multiplicando, não somando.",
            "Juros compostos são a exponencial com b = 1 + i; o tempo é o expoente.",
            "Inflação e depreciação são decaimentos exponenciais (b < 1)."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-logaritmos",
          numero: 3,
          titulo: "Aula 3: Logaritmos",
          comeceAqui: "Quando a incógnita está no expoente (em quanto tempo meu dinheiro dobra?), a ferramenta para tirá-la de lá chama-se logaritmo.",
          ideiaCentral: "log_b(y) = x ⟺ b^x = y. O logaritmo responde: 'a qual expoente devo elevar a base b para obter y?'. Propriedade chave: log(a^n) = n · log(a).",
          conceitosEssenciais: [
            { conceito: "log_b(y)", significado: "Expoente para levar b até y" },
            { conceito: "Propriedade da potência", significado: "log(a^n) = n · log(a) — liberta o t do expoente" },
            { conceito: "Regra do 72", significado: "Atalho mental: tempo para dobrar ≈ 72 ÷ taxa (%)" }
          ],
          exemploResolvido: {
            titulo: "Tempo para Dobrar Capital a 10% a.a.",
            enunciado: "1.000 · 1,10^t = 2.000 → 1,10^t = 2.",
            passos: [
              "1. Aplica log: t · log(1,10) = log(2)",
              "2. t = log(2) / log(1,10) = 0,3010 / 0,0414 ≈ 7,3 anos",
              "3. Regra do 72: 72 / 10 = 7,2 anos (aproximação excelente)"
            ],
            resultado: "O dinheiro dobra em aproximadamente 7,3 anos."
          },
          listaProblemas: [
            { questao: "1. Calcule: log2(16), log3(81), log10(1000).", resposta: "4; 4; 3." },
            { questao: "2. A 12% a.a., em quanto tempo um capital dobra?", resposta: "t = log(2) / log(1,12) = 0,3010 / 0,0492 ≈ 6,1 anos. (Regra 72: 72/12 = 6 anos)." },
            { questao: "3. R$ 5.000 viram R$ 8.000 a 0,9% a.m. Quantos meses?", resposta: "1,009^t = 1,6 → t = log(1,6) / log(1,009) ≈ 52,4 → 53 meses." }
          ],
          pbl: {
            titulo: "Tempo de Duplicação vs Cartão de Crédito",
            cenario: "Investimento rende 0,7% a.m. Cartão cobra 12% a.m. Em quantos meses cada um dobra de valor?",
            solucao: "Investimento: t = log(2)/log(1,007) ≈ 99,3 meses (~8,3 anos). Cartão: t = log(2)/log(1,12) ≈ 6,1 meses. Uma dívida dobra 16 vezes mais rápido do que o investimento leva para dobrar."
          },
          resumo: [
            "Logaritmo encontra o expoente desconhecido.",
            "log(a^n) = n log a resolve qualquer 'em quanto tempo?' em juros compostos.",
            "A regra do 72 é o logaritmo disfarçado de conta de cabeça."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-progressao-aritmetica",
          numero: 4,
          titulo: "Aula 4: Progressão aritmética (PA)",
          comeceAqui: "Uma PA é uma sequência em que cada termo é o anterior mais uma constante (razão r). Guardar R$ 50 por mês forma uma PA.",
          ideiaCentral: "Termo geral: an = a1 + (n-1)r. Soma dos n termos: Sn = (a1 + an)n / 2.",
          conceitosEssenciais: [
            { conceito: "Razão (r)", significado: "O passo fixo que se soma a cada termo" },
            { conceito: "Termo geral (an)", significado: "Fórmula para encontrar qualquer termo" },
            { conceito: "Soma (Sn)", significado: "Fórmula de Gauss para somar n termos" }
          ],
          exemploResolvido: {
            titulo: "Poupança Crescente em PA",
            enunciado: "Guarda R$ 200 no 1º mês e aumenta R$ 20 por mês. Quanto deposita no mês 12 e quanto acumula?",
            passos: [
              "1. a12 = 200 + (12-1) · 20 = 200 + 220 = R$ 420",
              "2. S12 = (200 + 420) · 12 / 2 = 620 · 6 = R$ 3.720"
            ],
            resultado: "No 12º mês deposita R$ 420 e acumula R$ 3.720."
          },
          listaProblemas: [
            { questao: "1. Na PA (7, 12, 17, ...), calcule a20.", resposta: "a20 = 7 + 19 · 5 = 102." },
            { questao: "2. Juros simples: 1050, 1100, 1150... a18?", resposta: "a18 = 1050 + 17 · 50 = R$ 1.900." },
            { questao: "3. Soma dos inteiros de 1 a 100.", resposta: "S100 = (1 + 100) · 100 / 2 = 5.050." }
          ],
          pbl: {
            titulo: "Comparando Estágios A e B",
            cenario: "Plano A: R$ 800 iniciais + R$ 40/mês de aumento. Plano B: R$ 1.000 fixos sem aumento. Em 24 meses, qual paga mais no total?",
            solucao: "Plano B total: 1000 × 24 = R$ 24.000. Plano A: a24 = 800 + 23 · 40 = 1720. SA = (800 + 1720) · 24 / 2 = R$ 30.240. O Plano A paga R$ 6.240 a mais no acumulado."
          },
          resumo: [
            "PA: cada termo = anterior + razão.",
            "an = a1 + (n-1)r; Sn = (a1+an)n/2.",
            "Aparece em poupança sem juros, juros simples e amortização SAC."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-progressao-geometrica",
          numero: 5,
          titulo: "Aula 5: Progressão geométrica (PG)",
          comeceAqui: "Na PG, cada termo é o anterior vezes uma constante q. É a matemática dos juros compostos e aportes mensais.",
          ideiaCentral: "Termo geral: an = a1 · q^(n-1). Soma dos n termos: Sn = a1(q^n - 1) / (q - 1). Soma infinita (|q|<1): S∞ = a1 / (1 - q).",
          conceitosEssenciais: [
            { conceito: "Razão (q)", significado: "O fator multiplicativo (nos juros q = 1+i)" },
            { conceito: "VF de Aportes Mensais", significado: "VF = P · [(1+i)^n - 1] / i (soma de PG)" },
            { conceito: "Perpetuidade", significado: "Soma infinita usada em valuation: V = FC / i" }
          ],
          exemploResolvido: {
            titulo: "Aportes Mensais em 2 Anos",
            enunciado: "Aporte de R$ 300/mês a 1% a.m. por 24 meses.",
            passos: [
              "1. VF = 300 · [(1,01)²⁴ - 1] / 0,01",
              "2. VF = 300 · [1,2697 - 1] / 0,01 = 300 · 26,97 = R$ 8.091,90"
            ],
            resultado: "Total acumulado: R$ 8.091,90 (R$ 7.200 em aportes + R$ 891,90 em juros)."
          },
          listaProblemas: [
            { questao: "1. Na PG (3, 6, 12, ...), calcule a10.", resposta: "a10 = 3 · 2⁹ = 1.536." },
            { questao: "2. Soma dos 10 primeiros termos de (5, 10, 20, ...).", resposta: "S10 = 5(2¹⁰ - 1)/(2 - 1) = 5115." },
            { questao: "3. Soma infinita da PG (100, 50, 25, ...).", resposta: "S∞ = 100 / (1 - 0,5) = 200." },
            { questao: "4. FII paga R$ 0,90/cota para sempre com taxa de 0,9% a.m. Valor da cota?", resposta: "V = 0,90 / 0,009 = R$ 100,00." }
          ],
          pbl: {
            titulo: "Consórcio vs Investimento PG",
            cenario: "Consórcio: R$ 400/mês por 5 anos (60 meses) devolve R$ 24.000. Quanto renderia investir R$ 400/mês a 0,8% a.m.?",
            solucao: "Investimento: VF = 400 · [(1,008)⁶⁰ - 1] / 0,008 ≈ 400 · 76,68 = R$ 30.672. O custo invisível do consórcio é a perda de R$ 6.672 em juros compostos."
          },
          resumo: [
            "PG: cada termo = anterior × razão.",
            "VF de aportes mensais é a soma de uma PG.",
            "A soma infinita da PG é a base da perpetuidade no valuation."
          ]
        },
        {
          id: "aula-06",
          slug: "aula-06-somatorio",
          numero: 6,
          titulo: "Aula 6: Somatório (Σ)",
          comeceAqui: "O símbolo Σ (sigma) é a abreviação matemática para somar uma sequência de termos.",
          ideiaCentral: "Σ (k=1 a n) ak = a1 + a2 + ... + an. Usado no valuation (FCD) e na estatística.",
          conceitosEssenciais: [
            { conceito: "Índice (k)", significado: "O contador que varia a cada passo" },
            { conceito: "Limites", significado: "Início (embaixo) e fim (em cima) do contador" },
            { conceito: "Propriedade da constante", significado: "Constante multiplicativa sai do somatório" }
          ],
          exemploResolvido: {
            titulo: "Valor Presente de 3 Fluxos",
            enunciado: "Calcule Σ (t=1 a 3) 100 / (1,10)^t.",
            passos: [
              "1. t=1: 100/1,10 = 90,91",
              "2. t=2: 100/1,21 = 82,64",
              "3. t=3: 100/1,331 = 75,13",
              "4. Soma = 90,91 + 82,64 + 75,13 = 248,68"
            ],
            resultado: "VP total = R$ 248,68."
          },
          listaProblemas: [
            { questao: "1. Calcule Σ (k=1 a 5) k.", resposta: "1 + 2 + 3 + 4 + 5 = 15." },
            { questao: "2. Calcule Σ (k=1 a 4) (2k + 1).", resposta: "3 + 5 + 7 + 9 = 24." },
            { questao: "3. Calcule o VP: Σ (t=1 a 2) 550 / (1,10)^t.", resposta: "500 + 454,55 = 954,55." }
          ],
          pbl: {
            titulo: "Projeção de Arrecadação",
            cenario: "Venda de 40 doces na semana 1, crescendo 15% por semana por 10 semanas (lucro R$ 2 por doce). Escreva em somatório e calcule.",
            solucao: "Lucro semanal L(k) = 2 · [40 · 1,15^(k-1)] = 80 · 1,15^(k-1). Total: Σ (k=1 a 10) 80 · 1,15^(k-1) = 80 · (1,15¹⁰ - 1) / 0,15 ≈ 80 · 20,30 = R$ 1.624,37."
          },
          resumo: [
            "Σ abrevia somas extensas.",
            "Usado no cálculo de valor presente e médias estatísticas."
          ]
        },
        {
          id: "aula-07",
          slug: "aula-07-produtorio",
          numero: 7,
          titulo: "Aula 7: Produtório (Π)",
          comeceAqui: "O símbolo Π (pi) manda multiplicar termos em sequência. Em finanças, retornos não se somam, se multiplicam.",
          ideiaCentral: "R_acumulado = Π (t=1 a n) (1 + r_t) - 1. Subir 50% e cair 50% não empata: resulta em perda de 25%.",
          conceitosEssenciais: [
            { conceito: "Fator de retorno", significado: "1 + r (retorno de +10% vira 1,10; -10% vira 0,90)" },
            { conceito: "Assimetria das perdas", significado: "Uma queda de 50% exige alta de 100% para recuperar" }
          ],
          exemploResolvido: {
            titulo: "Retorno Acumulado no Trimestre",
            enunciado: "Retornos mensais: +4%, -2%, +5%. Calcule o acumulado.",
            passos: [
              "1. Fatores: 1,04 × 0,98 × 1,05",
              "2. Produto = 1,07016",
              "3. Retorno = 1,07016 - 1 = 7,016%"
            ],
            resultado: "Retorno acumulado: +7,016% (diferente da soma ingênua de 7%)."
          },
          listaProblemas: [
            { questao: "1. Calcule 4! = Π (k=1 a 4) k.", resposta: "1 × 2 × 3 × 4 = 24." },
            { questao: "2. Queda de 30% seguida de alta de 30%. Resultado acumulado?", resposta: "0,70 × 1,30 = 0,91 → Perda de 9%." },
            { questao: "3. Qual alta recupera uma queda de 20%? E de 60%?", resposta: "Queda 20%: 1/0,80 = 1,25 (+25%). Queda 60%: 1/0,40 = 2,50 (+150%)." }
          ],
          pbl: {
            titulo: "Desmistificando o Influenciador",
            cenario: "Influenciador diz: 'Rendeu 10% a.m. por 6 meses, total de 60%!'. Qual o valor real?",
            solucao: "Produtório: (1,10)⁶ = 1,77156. O retorno real acumulado é de 77,16%, não 60%. A soma subestima o resultado dos juros compostos acumulados."
          },
          resumo: [
            "Π representa multiplicação em sequência.",
            "Retornos acumulados exigem produtório de fatores (1+r).",
            "Perdas exigem altas percentualmente maiores para serem recuperadas."
          ]
        },
        {
          id: "aula-08",
          slug: "aula-08-probabilidade-fundamentos",
          numero: 8,
          titulo: "Aula 8: Probabilidade — fundamentos",
          comeceAqui: "Probabilidade é a régua para medir a incerteza no mercado financeiro.",
          ideiaCentral: "P(evento) = casos favoráveis / casos possíveis (entre 0 e 1). P(não A) = 1 - P(A). Eventos independentes: P(A e B) = P(A) · P(B).",
          conceitosEssenciais: [
            { conceito: "Espaço amostral (Ω)", significado: "Todos os resultados possíveis" },
            { conceito: "Evento complementar", significado: "P(não A) = 1 - P(A)" },
            { conceito: "Independência", significado: "Ocorrer A não altera a probabilidade de B" }
          ],
          exemploResolvido: {
            titulo: "Probabilidade Histórica de Alta",
            enunciado: "Bolsa sobe em 60% dos meses (P=0,6), meses independentes. Qual a chance de 2 meses seguidos de alta?",
            passos: [
              "1. P(alta e alta) = 0,6 × 0,6 = 0,36 (36%)",
              "2. Chance de pelo menos uma alta em 2 meses = 1 - P(duas quedas) = 1 - (0,4 × 0,4) = 84%"
            ],
            resultado: "36% para 2 altas seguidas; 84% para pelo menos 1 alta."
          },
          listaProblemas: [
            { questao: "1. Chance de não subir em um dia com 55% de chance de alta?", resposta: "1 - 0,55 = 45%." },
            { questao: "2. Dois ativos independentes têm 20% de chance de prejuízo cada. Chance de ambos perderem?", resposta: "0,20 × 0,20 = 4%." },
            { questao: "3. Três ativos independentes com 10% de chance de perda. Chance de nenhum ter perda?", resposta: "0,90³ = 72,9%." }
          ],
          pbl: {
            titulo: "Análise da Falácia do Apostador",
            cenario: "Ação caiu 4 dias seguidos. Um colega diz 'vai cair amanhã de novo'. Outro diz 'vai subir com certeza porque caiu demais'. O que a probabilidade diz?",
            solucao: "Se os dias forem independentes, a chance do 5º dia é a mesma de qualquer outro dia (ex: 50%). A história dos últimos 4 dias não altera a probabilidade do próximo lançamento sob independência."
          },
          resumo: [
            "Probabilidade mede a incerteza de 0 a 1.",
            "Eventos independentes multiplicam suas probabilidades.",
            "Em crises, a suposição de independência pode falhar quando ativos caem juntos."
          ]
        },
        {
          id: "aula-09",
          slug: "aula-09-valor-esperado",
          numero: 9,
          titulo: "Aula 9: Valor esperado e análise de cenários",
          comeceAqui: "O valor esperado une probabilidade com retorno em dinheiro para orientar decisões racionais.",
          ideiaCentral: "E[X] = Σ p_k · x_k. É a média dos resultados ponderada pelas probabilidades de cada cenário.",
          conceitosEssenciais: [
            { conceito: "Valor Esperado E[X]", significado: "Média ponderada pelas probabilidades" },
            { conceito: "Cenários", significado: "Otimista, base e pessimista" }
          ],
          exemploResolvido: {
            titulo: "Retorno Esperado da Ação",
            enunciado: "Cenários: Otimista (25%, +40%), Base (55%, +12%), Pessimista (20%, -30%).",
            passos: [
              "1. E[R] = 0,25(40) + 0,55(12) + 0,20(-30)",
              "2. E[R] = 10 + 6,6 - 6 = +10,6%"
            ],
            resultado: "Retorno esperado = +10,6%."
          },
          listaProblemas: [
            { questao: "1. Dado paga R$ 60 no número 6. Valor esperado?", resposta: "E = (1/6) × 60 = R$ 10,00." },
            { questao: "2. E[X] com 40% de chance de +10% e 60% de chance de -5%.", resposta: "0,4(10) + 0,6(-5) = 4 - 3 = +1%." },
            { questao: "3. Seguro de R$ 150/ano. Sinistro 8% com perda de R$ 1.400. E[X] sem seguro?", resposta: "0,08 × (-1400) = -R$ 112,00." }
          ],
          pbl: {
            titulo: "Escolha entre Projeto A e B",
            cenario: "Projeto A: 90% chance ganho R$ 200, 10% perda R$ 100. Projeto B: 30% ganho R$ 1.500, 70% perda R$ 300. Qual escolher?",
            solucao: "E[A] = 0,9(200) + 0,1(-100) = R$ 170. E[B] = 0,3(1500) + 0,7(-300) = R$ 240. B tem E[X] maior, mas A tem risco de perda muito menor (10% vs 70%). A escolha depende da tolerância a risco e capital disponível."
          },
          resumo: [
            "E[X] = Σ p_k x_k é a média dos futuros possíveis.",
            "Desmascara loterias e precifica cenários de investimento.",
            "Decisões exigem olhar o E[X] e a capacidade de sobreviver ao pior cenário."
          ]
        }
      ]
    },
    {
      id: "modulo-4",
      slug: "modulo-4-estatistica",
      numero: 4,
      titulo: "Módulo 4: Estatística e Regressão Linear",
      descricao: "Amostras, médias, mediana, dispersão, z-score, covariância, correlação e regressão linear.",
      aulas: [
        {
          id: "aula-01",
          slug: "aula-01-dados-populacao-amostra",
          numero: 1,
          titulo: "Aula 1: Dados, população e amostra",
          comeceAqui: "Estatística extrai conclusões de dados. A primeira regra é saber a diferença entre tudo (população) e a parte observada (amostra).",
          ideiaCentral: "População é o universo completo; amostra é a parte observável. Vieses de seleção e amostras pequenas fabricam conclusões falsas.",
          conceitosEssenciais: [
            { conceito: "População", significado: "Conjunto completo sob estudo" },
            { conceito: "Amostra", significado: "Subconjunto de onde tiramos dados" },
            { conceito: "Viés de sobrevivência", significado: "Analisar só quem sobreviveu (ex: ignorar fundos falidos)" }
          ],
          exemploResolvido: {
            titulo: "Identificação de Amostra e Viés",
            enunciado: "Análise de retornos de um ETF usando os últimos 60 meses.",
            passos: [
              "1. Variável: retorno mensal (%) - quantitativa contínua.",
              "2. Amostra: 60 meses. População: todos os meses passados e futuros.",
              "3. Limitação: 60 meses é pouco para capturar grandes crises de longo prazo."
            ],
            resultado: "Estudo válido como estimativa pontual com limitações declaradas."
          },
          listaProblemas: [
            { questao: "1. Classifique: setor da empresa, dividend yield, nº de funcionários.", resposta: "Setor: qualitativa; Dividend yield: quantitativa contínua; Nº funcionários: quantitativa discreta." },
            { questao: "2. Analisar inadimplência só em agência de bairro nobre gera que problema?", resposta: "Viés de amostra (amostra não representativa da população inteira)." },
            { questao: "3. Média dos fundos ativos hoje pode sofrer de qual viés?", resposta: "Viés de sobrevivência (fundos liquidados por mau desempenho foram excluídos)." }
          ],
          pbl: {
            titulo: "Perguntas Céticas sobre Anúncio de Carteira",
            cenario: "Canal anuncia: 'Nossa carteira rendeu o dobro do CDI nos últimos 3 anos'. Que perguntas fazer sobre a amostra?",
            solucao: "1. Qual foi exatamente o período de 3 anos? 2. A amostra incluiu ações deslistadas? 3. Quantas trocas foram feitas na carteira? 4. Como foi calculada a rentabilidade (líquida de custos)? 5. Qual foi a volatilidade (risco) nesse período?"
          },
          resumo: [
            "Estatística conclui sobre populações usando amostras.",
            "Cuidado com viés de sobrevivência e amostras pequenas.",
            "Declare limitações antes de calcular."
          ]
        },
        {
          id: "aula-02",
          slug: "aula-02-medias",
          numero: 2,
          titulo: "Aula 2: Médias — aritmética, ponderada e geométrica",
          comeceAqui: "Usar a média errada em finanças produz respostas erradas com cara de certas.",
          ideiaCentral: "Aritmética = soma/n. Ponderada = Σ p_k x_k / Σ p_k (carteiras). Geométrica = ⁿ√(x1·x2...xn) (retornos compostos). Aritmética > Geométrica quando há volatilidade.",
          conceitosEssenciais: [
            { conceito: "Média Aritmética", significado: "Soma dividida pela quantidade de itens" },
            { conceito: "Média Ponderada", significado: "Cada item multiplicado por seu peso" },
            { conceito: "Média Geométrica", significado: "Raiz enésima do produto dos fatores (1+r) — a única correta para juros compostos" }
          ],
          exemploResolvido: {
            titulo: "Média Geométrica vs Aritmética de Retornos",
            enunciado: "Fundo rendeu +50% no ano 1 e -50% no ano 2.",
            passos: [
              "1. Média aritmética: (+50% - 50%) / 2 = 0% a.a.",
              "2. Fatores: 1,50 × 0,50 = 0,75 (perda real de 25%)",
              "3. Média geométrica: √(0,75) = 0,866 → -13,4% a.a."
            ],
            resultado: "A média geométrica (-13,4% a.a.) reflete a realidade; a aritmética (0%) engana."
          },
          listaProblemas: [
            { questao: "1. Média aritmética de: 4, 7, 9, 12, 18.", resposta: "(4+7+9+12+18)/5 = 50/5 = 10." },
            { questao: "2. Preço médio: 100 ações a R$ 20, 200 a R$ 25, 100 a R$ 30.", resposta: "(100·20 + 200·25 + 100·30)/400 = 10000/400 = R$ 25,00." },
            { questao: "3. Retornos de +20%, +10% e -8%. Média geométrica?", resposta: "∛(1,20 × 1,10 × 0,92) = ∛(1,2144) ≈ 1,0669 → +6,69% a.a." }
          ],
          pbl: {
            titulo: "Verificando o Anúncio do Fundo",
            cenario: "Fundo divulga 'retorno médio de 12% a.a.' com retornos anuais de +60%, -25%, +40%, -27%. Qual a média geométrica real?",
            solucao: "Média aritmética: (60 - 25 + 40 - 27)/4 = 12% a.a. Fatores: 1,60 × 0,75 × 1,40 × 0,73 = 1,2264. Média geométrica: ⁴√(1,2264) ≈ 1,0524 → +5,24% a.a. O anúncio inflou o retorno em mais de 2 vezes usando a média errada."
          },
          resumo: [
            "Aritmética para itens isolados; Ponderada para carteiras; Geométrica para retornos compostos.",
            "Com volatilidade, média aritmética > geométrica sempre."
          ]
        },
        {
          id: "aula-03",
          slug: "aula-03-mediana-moda",
          numero: 3,
          titulo: "Aula 3: Mediana, moda e quando a média engana",
          comeceAqui: "Quando os dados têm valores extremos (outliers), a média deixa de representar o típico.",
          ideiaCentral: "Mediana é o valor central (imune a outliers). Moda é o valor mais frequente. Se Média >> Mediana, há poucos valores gigantes inflando a média.",
          conceitosEssenciais: [
            { conceito: "Mediana", significado: "Ponto médio dos dados ordenados" },
            { conceito: "Moda", significado: "Valor que mais se repete" },
            { conceito: "Outlier", significado: "Valor extremo discrepante da amostra" }
          ],
          exemploResolvido: {
            titulo: "Efeito do Outlier nos Retornos",
            enunciado: "Retornos de 9 meses (%): 1, 2, 1, 3, 2, 1, 2, -28, 2.",
            passos: [
              "1. Média = (-14) / 9 = -1,6% a.m.",
              "2. Dados ordenados: -28, 1, 1, 1, 2, 2, 2, 2, 3",
              "3. Mediana (5º termo) = +2% a.m. Moda = +2% a.m."
            ],
            resultado: "A mediana (+2%) mostra o mês típico; a média (-1,6%) captura o mês de crash."
          },
          listaProblemas: [
            { questao: "1. Média, mediana e moda de: 5, 7, 7, 8, 10, 12, 50.", resposta: "Média = 14,1; Mediana = 8; Moda = 7." },
            { questao: "2. Salários: 3, 3, 3, 4, 4, 5, 45 (fundador). Qual mede o funcionário típico?", resposta: "Mediana (R$ 4 mil)." },
            { questao: "3. Se média é 8 e mediana é 12, qual a assimetria?", resposta: "Assimetria à esquerda (poucos valores muito baixos puxam a média para baixo)." }
          ],
          pbl: {
            titulo: "Valorização de Imóveis no Bairro",
            cenario: "Corretor diz que imóveis do bairro subiram 15% em média. 18 de 20 subiram 5%, e 2 subiram 120%. Qual a mediana?",
            solucao: "A mediana de 20 valores ordenados (onde os 18 primeiros são 5%) será 5%. A média foi inflada para 15% por dois terrenos atípicos (outliers)."
          },
          resumo: [
            "Mediana não é distorcida por outliers.",
            "Diferença entre média e mediana revela assimetria dos dados."
          ]
        },
        {
          id: "aula-04",
          slug: "aula-04-dispersao",
          numero: 4,
          titulo: "Aula 4: Medidas de dispersão — variância e desvio padrão",
          comeceAqui: "Dois fundos podem ter a mesma média de 10% a.a., mas um varia entre 8% e 12% e o outro entre -30% e +50%. Dispersão mede esse espalhamento — em finanças, é o risco (volatilidade).",
          ideiaCentral: "Variância σ² = (1/n) Σ (xk - x̄)². Desvio padrão σ = √(σ²). Regra empírica: ~68% dos dados estão a ±1σ da média e ~95% a ±2σ.",
          conceitosEssenciais: [
            { conceito: "Variância (σ²)", significado: "Média dos quadrados dos desvios" },
            { conceito: "Desvio Padrão (σ)", significado: "Raiz da variância (na mesma unidade dos dados)" },
            { conceito: "Volatilidade", significado: "Desvio padrão dos retornos de um ativo" }
          ],
          exemploResolvido: {
            titulo: "Cálculo de Desvio Padrão de Fundo Volátil",
            enunciado: "Retornos anuais (%): -30, +50, -10, +30. Média = 10%.",
            passos: [
              "1. Desvios da média (10): -40, +40, -20, +20",
              "2. Quadrados: 1600, 1600, 400, 400",
              "3. Variância σ² = 4000 / 4 = 1000",
              "4. Desvio padrão σ = √1000 ≈ 31,6%"
            ],
            resultado: "Volatilidade do fundo = 31,6% ao ano."
          },
          listaProblemas: [
            { questao: "1. Calcule o desvio padrão de: 2, 4, 4, 4, 5, 5, 7, 9.", resposta: "Média = 5. Desvios²: 9,1,1,1,0,0,4,16 → σ² = 32/8 = 4 → σ = 2." },
            { questao: "2. Média 10% e σ = 5%. Pela regra empírica, onde ficam 95% dos casos?", resposta: "Entre 10 - 2(5) = 0% e 10 + 2(5) = 20%." },
            { questao: "3. Por que elevamos os desvios ao quadrado?", resposta: "Para evitar que desvios positivos e negativos se anulem na soma." }
          ],
          pbl: {
            titulo: "Comparando Carteira Estável e Volátil",
            cenario: "Carteira A: média 10%, σ = 2%. Carteira B: média 10%, σ = 20%. Qual indicar para viagem em 1 ano e qual para 30 anos?",
            solucao: "Para 1 ano: Carteira A (intervalo 95%: 6% a 14%), risco de perda quase nulo. Para 30 anos: Carteira B aceita a oscilação em busca de retornos em prazos longos."
          },
          resumo: [
            "Desvio padrão mede a volatilidade de um investimento.",
            "Regra empírica: ±1σ cobre ~68% e ±2σ cobre ~95% dos dados em distribuições normais."
          ]
        },
        {
          id: "aula-05",
          slug: "aula-05-coeficiente-variacao-zscore",
          numero: 5,
          titulo: "Aula 5: Coeficiente de variação e z-score",
          comeceAqui: "Como comparar o risco de dois ativos com médias de retorno diferentes? E como saber se uma queda de 4% em um dia é comum ou um evento raro?",
          ideiaCentral: "Coeficiente de Variação CV = σ / x̄ (risco por unidade de retorno). Z-score z = (x - x̄) / σ (distância da média em unidades de desvio padrão).",
          conceitosEssenciais: [
            { conceito: "Coeficiente de Variação (CV)", significado: "Risco dividido pelo retorno médio (menor é melhor)" },
            { conceito: "Z-score", significado: "Quão atípico é um evento (|z|>3 indica evento raro)" }
          ],
          exemploResolvido: {
            titulo: "Comparação de CV entre Ativos",
            enunciado: "Ativo X: média 8%, σ = 8%. Ativo Y: média 16%, σ = 12%.",
            passos: [
              "1. CV(X) = 8 / 8 = 1,0",
              "2. CV(Y) = 12 / 16 = 0,75"
            ],
            resultado: "Ativo Y tem menor risco por unidade de retorno (CV 0,75 vs 1,0)."
          },
          listaProblemas: [
            { questao: "1. Fundo A: média 10%, σ = 5%. Fundo B: média 20%, σ = 9%. Qual tem melhor CV?", resposta: "CV(A) = 0,50; CV(B) = 0,45. Fundo B tem melhor relação risco-retorno." },
            { questao: "2. Média 0%, σ = 2%. Qual o z-score de um dia de -6%?", resposta: "z = (-6 - 0) / 2 = -3 (evento raro)." },
            { questao: "3. Nota 780 (média 650, σ=65) vs Nota 720 (média 600, σ=40). Qual z-score é maior?", resposta: "zAna = (780-650)/65 = 2,0. zIrmão = (720-600)/40 = 3,0. O irmão teve desempenho relativo melhor." }
          ],
          pbl: {
            titulo: "Ajuste pelo Risco",
            cenario: "Tio compara FII (média 0,8% a.m., σ = 2%) e Ações (média 1,2% a.m., σ = 6%). Ele prefere Ações pelo retorno maior. O que o CV indica?",
            solucao: "CV(FII) = 2 / 0,8 = 2,5. CV(Ações) = 6 / 1,2 = 5,0. O fundo de ações exige o dobro de risco por cada ponto de retorno oferecido."
          },
          resumo: [
            "CV = σ/média compara risco em ativos de escalas diferentes.",
            "Z-score mede a raridade de um evento em múltiplos de desvio padrão."
          ]
        },
        {
          id: "aula-06",
          slug: "aula-06-covariancia-correlacao",
          numero: 6,
          titulo: "Aula 6: Covariância e correlação",
          comeceAqui: "Como saber matematicamente se dois ativos sobem e caem juntos ou em sentidos opostos?",
          ideiaCentral: "Covariância Cov(X,Y) = (1/n) Σ (xk - x̄)(yk - ȳ). Correlação ρ = Cov(X,Y) / (σX · σY), variando entre -1 e +1.",
          conceitosEssenciais: [
            { conceito: "Correlação (+1)", significado: "Movimento perfeitamente idêntico" },
            { conceito: "Correlação (0)", significado: "Movimentos sem relação linear" },
            { conceito: "Correlação (-1)", significado: "Movimento espelhado (um sobe, outro desce)" }
          ],
          exemploResolvido: {
            titulo: "Correlação entre Duas Ações",
            enunciado: "Dados históricos: Cov(A,B) = 23, σA = 5,48 e σB = 4,30.",
            passos: [
              "1. ρ = 23 / (5,48 × 4,30) = 23 / 23,56",
              "2. ρ ≈ 0,98"
            ],
            resultado: "Correlação de 0,98 indica que as duas ações se movem quase juntas (sem diversificação)."
          },
          listaProblemas: [
            { questao: "1. Sinal da correlação entre: horas de estudo × nota.", resposta: "Positiva (+)." },
            { questao: "2. Duas ações têm correlação -0,8. O que acontece com a carteira 50/50 na queda de uma?", resposta: "A outra tende a subir, amortecendo a perda total da carteira." },
            { questao: "3. Correlação implica causalidade?", resposta: "Não. Duas variáveis podem ter alta correlação por causa de uma terceira variável comum." }
          ],
          pbl: {
            titulo: "Montando Carteira Descorrelacionada",
            cenario: "Analise o par Ibovespa + Dólar vs Ibovespa + Ações de Bancos. Qual par diversifica de verdade?",
            solucao: "Ibovespa + Ações de Bancos têm correlação positiva alta (~0,8 a 0,9), caindo juntos em crises locais. Ibovespa + Dólar frequentemente têm correlação negativa, atuando como proteção."
          },
          resumo: [
            "Correlação padroniza a covariância entre -1 e +1.",
            "Ativos com correlação baixa ou negativa reduzem o risco da carteira."
          ]
        },
        {
          id: "aula-07",
          slug: "aula-07-regressao-linear",
          numero: 7,
          titulo: "Aula 7: Regressão linear",
          comeceAqui: "Regressão linear encontra a reta que melhor descreve a relação entre duas variáveis, permitindo previsões e a medição do Beta das ações.",
          ideiaCentral: "Reta ŷ = a + bx. Inclinação b = Cov(X,Y) / σX². Intercepto a = ȳ - b·x̄. R² mede o quanto a reta explica a variação dos dados.",
          conceitosEssenciais: [
            { conceito: "Coeficiente Beta (β)", significado: "Sensibilidade de uma ação em relação ao Ibovespa (b da regressão)" },
            { conceito: "R² (Coeficiente de Determinação)", significado: "Porcentagem da variação explicada pelo modelo" }
          ],
          exemploResolvido: {
            titulo: "Cálculo do Beta de uma Ação",
            enunciado: "Dados históricos: Cov(Ação, Ibov) = 5,25 e σ²(Ibov) = 8,5.",
            passos: [
              "1. Beta (b) = 5,25 / 8,5 = 0,62",
              "2. Intercepto (a) = 1,5 - 0,62 × 2 = 0,26",
              "3. Reta: ŷ = 0,26 + 0,62x"
            ],
            resultado: "Beta = 0,62 (ação defensiva, oscila 62% da variação do Ibovespa)."
          },
          listaProblemas: [
            { questao: "1. Reta ŷ = 2 + 0,8x. Qual a estimativa de y para x = 10?", resposta: "ŷ = 2 + 0,8(10) = 10." },
            { questao: "2. Uma ação tem β = 1,8. Se o Ibovespa cai 5%, qual a variação esperada?", resposta: "Queda esperada de 1,8 × (-5%) = -9%." },
            { questao: "3. Se a correlação entre ação e índice é 0,6, qual o R²?", resposta: "R² = 0,6² = 0,36 (o índice explica 36% do movimento da ação)." }
          ],
          pbl: {
            titulo: "Classificando Ações pelo Beta",
            cenario: "Ação A tem Beta 1,5. Ação B tem Beta 0,6. Qual incluir em uma carteira conservadora?",
            solucao: "Ação B (Beta 0,6) é defensiva e oscila menos que o mercado, sendo ideal para a carteira conservadora. Ação A (Beta 1,5) amplifica os movimentos do mercado."
          },
          resumo: [
            "Regressão linear ajusta a reta ŷ = a + bx aos dados.",
            "O Beta mede a sensibilidade do ativo ao mercado."
          ]
        },
        {
          id: "aula-08",
          slug: "aula-08-estatistica-na-pratica",
          numero: 8,
          titulo: "Aula 8: Estatística na prática — lendo números sem se enganar",
          comeceAqui: "A última habilidade do analista é desconfiar direito: identificar recortes, armadilhas e gráficos manipulados.",
          ideiaCentral: "Checklist cético: 1. Qual a amostra? 2. Qual a média usada? 3. Onde está o desvio padrão? 4. Qual o benchmark? 5. Correlação ou causalidade?",
          conceitosEssenciais: [
            { conceito: "Eixo Cortado", significado: "Gráfico que inicia fora do zero para amplificar visualmente variações pequenas" },
            { conceito: "Anualização Extrapolada", significado: "Multiplicar resultado de 1 mês por 12 como se fosse garantia" }
          ],
          exemploResolvido: {
            titulo: "Desmontando Propaganda de Clube de Investimento",
            enunciado: "Anúncio: 'Rendimento médio de 3% ao mês nos últimos 8 meses!'.",
            passos: [
              "1. Amostra: apenas 8 meses (curto demais).",
              "2. Média: usou aritmética em vez de geométrica.",
              "3. Risco: omitiu a volatilidade (σ) dos 8 meses.",
              "4. Viés: por que o histórico começou há 8 meses?"
            ],
            resultado: "A afirmação é estatisticamente fraca e omite os riscos reais."
          },
          listaProblemas: [
            { questao: "1. Preço médio de imóveis subiu 40% porque 2 prédios de luxo foram lançados. O que checar?", resposta: "A mediana dos preços dos imóveis." },
            { questao: "2. Um gestor anualiza +4% em janeiro para '60% ao ano'. Qual o erro?", resposta: "Extrapolação: assume que janeiro irá se repetir todos os 12 meses." }
          ],
          pbl: {
            titulo: "Análise Crítica de Post de Redes Sociais",
            cenario: "Influenciador afirma que sua carteira rendeu 50% em 1 ano sem risco. Como desmascarar usando o checklist?",
            solucao: "1. Sem risco não existe em renda variável. 2. Qual o desvio padrão (σ) e o drawdown máximo? 3. Houve viés de sobrevivência? 4. Qual foi o rendimento líquido pós-impostos?"
          },
          resumo: [
            "Aplica o checklist cético antes de aceitar relatórios e divulgações de investimentos.",
            "Parabéns! Você concluiu a trilha de Matemática Aplicada a Finanças."
          ]
        }
      ]
    }
  ]
};

// matematicaData;
