window.matematicaData = {
  "id": "matematica-aplicada",
  "titulo": "Matemática Aplicada a Finanças",
  "descricao": "Trilha de matemática construída para destravar finanças — cada módulo existe para resolver um problema real de dinheiro, não matemática pela matemática.",
  "modulos": [
    {
      "id": "modulo-1",
      "slug": "modulo-1-algebra-do-zero",
      "numero": 1,
      "titulo": "Módulo 1: Álgebra do Zero",
      "descricao": "A base para não travar em juros, porcentagem e equações. Para quem começa do zero absoluto.",
      "aulas": [
        {
          "id": "aula-01",
          "slug": "aula-01-numeros-e-operacoes",
          "numero": 1,
          "titulo": "Aula 1: Números e operações",
          "comeceAqui": "Antes de falar em juros, porcentagem ou investimento, você precisa operar com números sem travar. Esta aula revisa as quatro operações básicas com o foco em onde elas aparecem em finanças.",
          "ideiaCentral": "Toda conta financeira — rendimento, desconto, imposto, lucro — é uma combinação de soma, subtração, multiplicação e divisão. Quem domina as quatro operações com decimais já consegue resolver a maioria dos problemas do dia a dia financeiro.",
          "conceitosEssenciais": [
            {
              "conceito": "Número inteiro",
              "significado": "Sem casas decimais: 1, 50, 1000"
            },
            {
              "conceito": "Número decimal",
              "significado": "Com casas decimais: 1,5 / 0,08 / 1.350,75"
            },
            {
              "conceito": "Soma",
              "significado": "Juntar valores"
            },
            {
              "conceito": "Subtração",
              "significado": "Diferença entre valores"
            },
            {
              "conceito": "Multiplicação",
              "significado": "Soma repetida — base dos juros"
            },
            {
              "conceito": "Divisão",
              "significado": "Repartir em partes iguais — base de médias e taxas"
            },
            {
              "conceito": "Ordem das operações",
              "significado": "Primeiro × e ÷, depois + e − (salvo parênteses)"
            }
          ],
          "aplicacaoFinanceira": [
            {
              "operacao": "Soma",
              "exemplo": "Saldo + rendimento do mês"
            },
            {
              "operacao": "Subtração",
              "exemplo": "Salário − gastos = quanto sobrou"
            },
            {
              "operacao": "Multiplicação",
              "exemplo": "R$ 1.000 × 1,10 = valor com 10% de juros"
            },
            {
              "operacao": "Divisão",
              "exemplo": "Lucro ÷ capital investido = taxa de retorno"
            }
          ],
          "exemploResolvido": {
            "titulo": "Cálculo de saldo líquido mensal",
            "enunciado": "Uma pessoa recebe R$ 2.500 de salário, tem R$ 1.800 de despesas, ganha R$ 150 de rendimento de investimentos e paga R$ 50 de taxa bancária. Qual o valor que sobrou?",
            "passos": [
              "1. Soma das receitas: 2500 + 150 = R$ 2.650",
              "2. Soma das despesas: 1800 + 50 = R$ 1.850",
              "3. Subtração do saldo final: 2650 - 1850 = R$ 800"
            ],
            "resultado": "Sobraram R$ 800 para poupança ou investimentos."
          },
          "quiz": [
            {
              "pergunta": "Qual a ordem correta de execução das operações na expressão 50 + 10 × 2?",
              "opcoes": [
                "Soma 50 + 10 e depois multiplica por 2 (120)",
                "Primeiro multiplica 10 × 2 e depois soma 50 (70)",
                "Executa da esquerda para a direita de forma arbitrária",
                "Primeiro subtrai antes de multiplicar"
              ],
              "respostaCorreta": 1,
              "explicacao": "Pela regra de ordem das operações, multiplicação e divisão têm prioridade sobre soma e subtração."
            },
            {
              "pergunta": "Em finanças, a multiplicação de um valor pelo fator 1,15 representa:",
              "opcoes": [
                "Desconto de 15%",
                "Aumento ou rendimento de 15%",
                "Divisão do valor por 15",
                "Subtração fixa de R$ 15"
              ],
              "respostaCorreta": 1,
              "explicacao": "Multiplicar por 1,15 equivale a manter 100% do valor original (1,0) e adicionar 15% (0,15)."
            },
            {
              "pergunta": "Se você divide o lucro obtido de R$ 200 pelo valor investido de R$ 2.000 (200 ÷ 2000), você está calculando:",
              "opcoes": [
                "O montante total acumulado",
                "A taxa de retorno do investimento (0,10 ou 10%)",
                "O desconto comercial simples",
                "A inflação acumulada do período"
              ],
              "respostaCorreta": 1,
              "explicacao": "A divisão do lucro pelo capital investido entrega a taxa de rentabilidade relativa do investimento."
            },
            {
              "pergunta": "Qual operação é a base do cálculo de rendimento de juros em múltiplos períodos?",
              "opcoes": [
                "Subtração consecutiva",
                "Multiplicação repetida",
                "Divisão por zero",
                "Soma de inteiros apenas"
              ],
              "respostaCorreta": 1,
              "explicacao": "Juros envolvem multiplicação repetida pelo fator de crescimento (1 + i)."
            },
            {
              "pergunta": "Ao calcular Salário − Gastos = Saldo, qual operação matemática foi applied?",
              "opcoes": [
                "Multiplicação",
                "Divisão",
                "Subtração",
                "Notação científica"
              ],
              "respostaCorreta": 2,
              "explicacao": "A diferença entre o total arrecadado e o total gasto é calculada via subtração."
            }
          ],
          "pbl": {
            "titulo": "Planejamento da Mesada",
            "cenario": "Lucas recebe R$ 200 por mês. Ele gasta R$ 80 com transporte, R$ 50 com lanches e quer saber quanto tempo levará para comprar um fone de R$ 350 com o que sobra.",
            "solucao": "Sobra mensal: 200 - 80 - 50 = R$ 70. Para acumular R$ 350: 350 ÷ 70 = 5 meses."
          },
          "resumo": [
            "As quatro operações são a base de toda matemática financeira.",
            "Decimais aparecem em todo cálculo de taxa, juros e porcentagem.",
            "A próxima aula entra em frações — a forma mais precisa de representar partes."
          ]
        },
        {
          "id": "aula-02",
          "slug": "aula-02-fracoes-e-decimais",
          "numero": 2,
          "titulo": "Aula 2: Frações e decimais",
          "comeceAqui": "Fração é uma forma de representar partes de um todo. Decimal é a mesma ideia em outro formato. Em finanças, as duas formas aparecem o tempo todo — e saber converter entre elas é essencial pra calcular qualquer taxa ou rendimento.",
          "ideiaCentral": "1/4, 0,25 e 25% são três formas de dizer a mesma coisa. Quem entende essa equivalência nunca mais trava numa conta de porcentagem.",
          "conceitosEssenciais": [
            {
              "conceito": "Fração",
              "significado": "Representa partes de um todo: numerador ÷ denominador"
            },
            {
              "conceito": "Numerador",
              "significado": "O número de cima — quantas partes você tem"
            },
            {
              "conceito": "Denominador",
              "significado": "O número de baixo — em quantas partes o todo foi dividido"
            },
            {
              "conceito": "Decimal",
              "significado": "Representação com vírgula: 0,25 / 1,5 / 0,08"
            },
            {
              "conceito": "Equivalência",
              "significado": "1/4 = 0,25 = 25% — mesma quantidade, formatos diferentes"
            },
            {
              "conceito": "Simplificação",
              "significado": "Reduzir a fração ao menor numerador e denominador possíveis"
            }
          ],
          "conversoesEssenciais": [
            {
              "fracao": "1/2",
              "decimal": "0,50",
              "porcentagem": "50%"
            },
            {
              "fracao": "1/4",
              "decimal": "0,25",
              "porcentagem": "25%"
            },
            {
              "fracao": "3/4",
              "decimal": "0,75",
              "porcentagem": "75%"
            },
            {
              "fracao": "1/5",
              "decimal": "0,20",
              "porcentagem": "20%"
            },
            {
              "fracao": "1/10",
              "decimal": "0,10",
              "porcentagem": "10%"
            },
            {
              "fracao": "1/100",
              "decimal": "0,01",
              "porcentagem": "1%"
            }
          ],
          "exemploResolvido": {
            "titulo": "Conversão de taxa de juros",
            "enunciado": "Um produto financeiro cobra uma taxa de 3/50 do capital investido. Quanto isso representa em decimal e em porcentagem?",
            "passos": [
              "1. Dividir numerador pelo denominador: 3 ÷ 50 = 0,06",
              "2. Multiplicar o decimal por 100: 0,06 × 100 = 6%"
            ],
            "resultado": "A taxa é equivalente a 0,06 ou 6%."
          },
          "quiz": [
            {
              "pergunta": "A fração 1/4 equivale a qual número decimal e a qual porcentagem?",
              "opcoes": [
                "0,4 e 40%",
                "0,25 e 25%",
                "0,14 e 14%",
                "2,5 e 250%"
              ],
              "respostaCorreta": 1,
              "explicacao": "1 ÷ 4 = 0,25, que multiplicado por 100 resulta em 25%."
            },
            {
              "pergunta": "Para converter um número decimal em porcentagem, você deve:",
              "opcoes": [
                "Dividir por 100",
                "Multiplicar por 100",
                "Somar 100 ao valor",
                "Elevar ao quadrado"
              ],
              "respostaCorreta": 1,
              "explicacao": "Multiplicar o valor decimal por 100 ajusta a escala para base 'por cento'."
            },
            {
              "pergunta": "Qual das seguintes alternativas apresenta três valores equivalentes?",
              "opcoes": [
                "1/2, 0,20 e 20%",
                "3/4, 0,75 e 75%",
                "1/5, 0,50 e 50%",
                "1/10, 0,01 e 1%"
              ],
              "respostaCorreta": 1,
              "explicacao": "3/4 = 3 ÷ 4 = 0,75 = 75%."
            },
            {
              "pergunta": "Se um investimento rende 8% ao ano, qual é o fator decimal correspondente à taxa de rendimento isolada?",
              "opcoes": [
                "0,8",
                "0,08",
                "8,0",
                "0,008"
              ],
              "respostaCorreta": 1,
              "explicacao": "8% significa 8/100, ou seja, 0,08 em decimal."
            },
            {
              "pergunta": "Se você possui 2/5 de uma empresa, qual a sua porcentagem de participação?",
              "opcoes": [
                "25%",
                "40%",
                "20%",
                "50%"
              ],
              "respostaCorreta": 1,
              "explicacao": "2 ÷ 5 = 0,40 = 40%."
            }
          ],
          "pbl": {
            "titulo": "Comparando taxas de fundos",
            "cenario": "O fundo A cobra taxa de administração de 1/50 do saldo ao ano. O fundo B cobra 0,015 ao ano. Qual fundo cobra a menor taxa?",
            "solucao": "Fundo A: 1/50 = 0,02 (2% a.a.). Fundo B: 0,015 (1,5% a.a.). O Fundo B cobra a menor taxa."
          },
          "resumo": [
            "Fração, decimal e porcentagem são três formas de expressar a mesma quantidade.",
            "Para converter fração em decimal: divida numerador pelo denominador.",
            "Para converter decimal em porcentagem: multiplique por 100.",
            "A próxima aula usa tudo isso pra ensinar porcentagem aplicada a dinheiro."
          ]
        },
        {
          "id": "aula-03",
          "slug": "aula-03-porcentagem-na-vida-real",
          "numero": 3,
          "titulo": "Aula 3: Porcentagem na vida real",
          "comeceAqui": "Porcentagem é a linguagem do dinheiro. Desconto na loja, juros do cartão, rendimento do investimento, inflação do mês — tudo vem em porcentagem. Quem entende porcentagem de verdade para de ser enganado por número bonito.",
          "ideiaCentral": "'Por cento' significa 'por 100'. 10% de alguma coisa é 10 de cada 100. Simples assim. O erro de quase todo mundo é tentar decorar fórmula antes de entender essa intuição.",
          "conceitosEssenciais": [
            {
              "conceito": "Porcentagem",
              "significado": "Parte de um total, medida em relação a 100"
            },
            {
              "conceito": "% de um valor",
              "significado": "Quanto é X% de R$Y?"
            },
            {
              "conceito": "Aumento percentual",
              "significado": "O valor subiu — quanto subiu em relação ao original?"
            },
            {
              "conceito": "Desconto percentual",
              "significado": "O valor caiu — quanto caiu em relação ao original?"
            },
            {
              "conceito": "Ponto percentual",
              "significado": "Diferença direta entre duas taxas (10% → 12% = +2 pp)"
            }
          ],
          "situacoesFinanceiras": [
            {
              "situacao": "Calcular X% de um valor",
              "exemplo": "15% de R$ 200 → 200 × 0,15 = R$ 30"
            },
            {
              "situacao": "Calcular quanto um valor representa",
              "exemplo": "R$ 30 é quanto % de R$ 200? → 30 ÷ 200 = 0,15 = 15%"
            },
            {
              "situacao": "Calcular o valor original",
              "exemplo": "R$ 30 são 15% de qual valor? → 30 ÷ 0,15 = R$ 200"
            }
          ],
          "exemploResolvido": {
            "titulo": "Diferença entre Porcentagem e Ponto Percentual",
            "enunciado": "Se a taxa de juros Selic sobe de 10% ao ano para 12% ao ano, qual foi o aumento em pontos percentuais e qual o aumento em porcentagem?",
            "passos": [
              "1. Pontos percentuais (diferença direta): 12% - 10% = 2 pontos percentuais (pp).",
              "2. Aumento em porcentagem (variação relativa): 2 ÷ 10 = 0,20 = 20%."
            ],
            "resultado": "A taxa subiu 2 pp, o que representa uma alta relativa de 20% sobre a taxa inicial."
          },
          "quiz": [
            {
              "pergunta": "Quanto é 15% de R$ 200?",
              "opcoes": [
                "R$ 15",
                "R$ 20",
                "R$ 30",
                "R$ 45"
              ],
              "respostaCorreta": 2,
              "explicacao": "200 × 0,15 = R$ 30."
            },
            {
              "pergunta": "Se a taxa Selic varia de 10% para 12%, dizemos que ela subiu:",
              "opcoes": [
                "2%",
                "20% e 2 pontos percentuais",
                "2 pontos percentuais (ou 20% de alta relativa)",
                "12% de aumento absoluto"
              ],
              "respostaCorreta": 2,
              "explicacao": "A diferença simples 12 - 10 = 2 pp. A variação relativa em relação a 10 é 2/10 = 20%."
            },
            {
              "pergunta": "R$ 40 representa qual porcentagem de R$ 200?",
              "opcoes": [
                "10%",
                "15%",
                "20%",
                "25%"
              ],
              "respostaCorreta": 2,
              "explicacao": "40 ÷ 200 = 0,20 = 20%."
            },
            {
              "pergunta": "Um tênis de R$ 300 teve um desconto de 15%. Qual o valor do desconto em reais?",
              "opcoes": [
                "R$ 30",
                "R$ 45",
                "R$ 50",
                "R$ 15"
              ],
              "respostaCorreta": 1,
              "explicacao": "300 × 0,15 = R$ 45."
            },
            {
              "pergunta": "Se R$ 50 correspondem a 25% de uma quantia, qual é o valor total?",
              "opcoes": [
                "R$ 100",
                "R$ 150",
                "R$ 200",
                "R$ 250"
              ],
              "respostaCorreta": 2,
              "explicacao": "50 ÷ 0,25 = R$ 200."
            }
          ],
          "pbl": {
            "titulo": "Analise de Promoção",
            "cenario": "Uma loja oferece um desconto de 20% à vista. Outra loja vende pelo mesmo preço inicial, mas promete 'leve 5 e pague 4'. Qual promoção é mais vantajosa?",
            "solucao": "Leve 5 pague 4 significa receber 5 unidades pelo preço de 4. Desconto: 1/5 = 20%. As duas ofertas oferecem exatamente o mesmo desconto percentual de 20%."
          },
          "resumo": [
            "Porcentagem = parte de 100. Não é fórmula, é proporção.",
            "Três operações básicas: calcular X% de Y, descobrir que % X é de Y, e achar o valor original.",
            "Ponto percentual ≠ porcentagem — diferença importante em finanças.",
            "A próxima aula generaliza essa ideia pra qualquer proporção: regra de três."
          ]
        },
        {
          "id": "aula-04",
          "slug": "aula-04-regra-de-tres",
          "numero": 4,
          "titulo": "Aula 4: Regra de três",
          "comeceAqui": "Regra de três é a ferramenta de proporção. Sempre que duas grandezas se relacionam de forma previsível — e em finanças quase sempre se relacionam — a regra de três resolve.",
          "ideiaCentral": "Se 100 rende 10, quanto rende 350? Esse tipo de raciocínio aparece em juros, câmbio, conversão de taxas e comparação de investimentos. A regra de três é só uma forma organizada de pensar em proporção.",
          "conceitosEssenciais": [
            {
              "conceito": "Proporção",
              "significado": "Relação constante entre duas quantidades"
            },
            {
              "conceito": "Grandezas diretamente proporcionais",
              "significado": "Quando uma aumenta, a outra aumenta na mesma proporção"
            },
            {
              "conceito": "Grandezas inversamente proporcionais",
              "significado": "Quando uma aumenta, a outra diminui na mesma proporção"
            },
            {
              "conceito": "Regra de três simples",
              "significado": "Envolve dois pares de valores"
            },
            {
              "conceito": "Regra de três composta",
              "significado": "Envolve três ou mais grandezas relacionadas"
            }
          ],
          "aplicacaoFinanceira": [
            {
              "situacao": "Conversão de moeda",
              "exemplo": "Se 1 dólar = R$ 5,20, quanto são 350 dólares?"
            },
            {
              "situacao": "Proporção de rendimento",
              "exemplo": "Se 100 rende 8, quanto rende 450?"
            },
            {
              "situacao": "Desconto proporcional",
              "exemplo": "Se 200g custa R$ 4, quanto custa 350g?"
            },
            {
              "situacao": "Taxa mensal vs anual",
              "exemplo": "Se a taxa anual é 12%, qual a proporcional mensal?"
            }
          ],
          "exemploResolvido": {
            "titulo": "Conversão de Câmbio",
            "enunciado": "Se 1 dólar é negociado a R$ 5,20, quantos reais são necessários para comprar 350 dólares?",
            "passos": [
              "1. Montar a proporção: 1 dólar → R$ 5,20 | 350 dólares → x",
              "2. Cruzar a multiplicação: 1 · x = 350 · 5,20",
              "3. Resolver: x = 1.820"
            ],
            "resultado": "Serão necessários R$ 1.820,00."
          },
          "quiz": [
            {
              "pergunta": "Se 1 dólar custa R$ 5,20, quanto custam US\\$ 350?",
              "opcoes": [
                "R$ 1.500,00",
                "R$ 1.820,00",
                "R$ 1.750,00",
                "R$ 1.920,00"
              ],
              "respostaCorreta": 1,
              "explicacao": "350 × 5,20 = R$ 1.820,00."
            },
            {
              "pergunta": "Se R$ 100 aplicados em renda fixa rendem R$ 8 em determinado período, quanto renderão R$ 450 aplicados na mesma proporção?",
              "opcoes": [
                "R$ 32,00",
                "R$ 36,00",
                "R$ 40,00",
                "R$ 45,00"
              ],
              "respostaCorreta": 1,
              "explicacao": "(450 × 8) ÷ 100 = 3.600 ÷ 100 = R$ 36,00."
            },
            {
              "pergunta": "Em grandezas inversamente proporcionais, o que acontece quando uma das variáveis é dobrada?",
              "opcoes": [
                "A outra variável dobra",
                "A outra variável é reduzida à metade",
                "A outra variável permanece constante",
                "A outra variável aumenta quatro vezes"
              ],
              "respostaCorreta": 1,
              "explicacao": "Na proporção inversa, dobrar uma quantidade implica reduzir a outra proporcionalmente à metade."
            },
            {
              "pergunta": "Se 200g de um produto custam R$ 4,00, qual o valor de 350g desse mesmo produto?",
              "opcoes": [
                "R$ 6,00",
                "R$ 7,00",
                "R$ 7,50",
                "R$ 8,00"
              ],
              "respostaCorreta": 1,
              "explicacao": "(350 × 4) ÷ 200 = 1.400 ÷ 200 = R$ 7,00."
            },
            {
              "pergunta": "Qual das opções abaixo é um exemplo clássico de regra de três simples em finanças?",
              "opcoes": [
                "Cálculo do valor futuro em juros compostos por 30 anos",
                "Conversão de uma quantia em reais para dólares dada a cotação",
                "Diferença entre volatilidade e retorno médio",
                "Cálculo da mediana de uma amostra"
              ],
              "respostaCorreta": 1,
              "explicacao": "Converter moedas por cotação direta é uma proporção direta resolvida via regra de três."
            }
          ],
          "pbl": {
            "titulo": "Comparação de Embalagens no Supermercado",
            "cenario": "Uma caixa de sabão em pó de 800g custa R$ 16,00. A embalagem de 1,5kg custa R$ 27,00. Qual embalagem é mais econômica por quilo?",
            "solucao": "Preço/kg embalagem 1: 16 ÷ 0,8 = R$ 20,00/kg. Preço/kg embalagem 2: 27 ÷ 1,5 = R$ 18,00/kg. A embalagem de 1,5kg é mais econômica."
          },
          "resumo": [
            "Regra de três resolve qualquer problema de proporção com três valores conhecidos.",
            "Grandezas diretas: aumentam juntas. Inversas: uma aumenta enquanto a outra cai.",
            "Em finanças: câmbio, rendimento proporcional e conversão de taxas.",
            "A próxima aula entra em potências — essencial pra entender juros compostos."
          ]
        },
        {
          "id": "aula-05",
          "slug": "aula-05-potencias-e-raizes",
          "numero": 5,
          "titulo": "Aula 5: Potências e raízes",
          "comeceAqui": "Juros compostos funcionam com potências. Sem entender o que é 1,10³ você não consegue calcular quanto R$ 1.000 vira em 3 anos a 10% ao ano. Esta aula destrava isso.",
          "ideiaCentral": "Potência é multiplicação repetida. 1,10³ significa 1,10 × 1,10 × 1,10. Raiz é a operação inversa: dado o resultado, qual era a base? Em finanças, potências aparecem nos juros compostos e raízes aparecem quando você quer descobrir a taxa a partir do montante.",
          "conceitosEssenciais": [
            {
              "conceito": "Base",
              "significado": "O número que será multiplicado por si mesmo"
            },
            {
              "conceito": "Expoente",
              "significado": "Quantas vezes a base é multiplicada"
            },
            {
              "conceito": "Potência",
              "significado": "O resultado: base^expoente"
            },
            {
              "conceito": "Raiz quadrada (√)",
              "significado": "Qual número multiplicado por si mesmo dá X?"
            },
            {
              "conceito": "Raiz enésima (ⁿ√)",
              "significado": "Generalização — qual base elevada a n dá X?"
            },
            {
              "conceito": "Potência fracionária",
              "significado": "x^(1/n) = ⁿ√x — raiz como potência"
            }
          ],
          "potenciasEFinancas": {
            "formulaJuros": "(1 + i)^n",
            "descricao": "Esta é a fórmula dos juros compostos. O (1+i) é a base — o fator de crescimento por período. O n é o expoente — o número de períodos."
          },
          "raizesEFinancas": {
            "formulaTaxa": "taxa = ∛(1,331) - 1 = 1,10 - 1 = 10% ao ano",
            "descricao": "Se R$ 1.000 virou R$ 1.331 em 3 anos, a raiz cúbica do fator de crescimento menos 1 entrega a taxa equivalente por período."
          },
          "exemploResolvido": {
            "titulo": "Cálculo de Montante com Potência",
            "enunciado": "Quanto R$ 2.000 viram após 2 anos aplicados a uma taxa de juros compostos de 10% ao ano?",
            "passos": [
              "1. Fator de crescimento: (1 + 0,10) = 1,10",
              "2. Potência para 2 anos: 1,10² = 1,21",
              "3. Montante final: 2.000 × 1,21 = R$ 2.420"
            ],
            "resultado": "O montante final é R$ 2.420,00."
          },
          "quiz": [
            {
              "pergunta": "O que representa o cálculo de 1,10³ em juros compostos?",
              "opcoes": [
                "Multiplicar 1,10 por 3 (3,30)",
                "O fator de crescimento acumulado de 10% ao ano durante 3 anos (1,331)",
                "Somar 1,10 três vezes (3,30)",
                "Dividir 1,10 por 3"
              ],
              "respostaCorreta": 1,
              "explicacao": "1,10³ = 1,10 × 1,10 × 1,10 = 1,331 (crescimento acumulado de 33,1%)."
            },
            {
              "pergunta": "Se um montante acumulou um fator de crescimento de 1,44 em 2 anos, qual foi a taxa média de juros ao ano (operada pela raiz quadrada)?",
              "opcoes": [
                "12%",
                "20%",
                "22%",
                "44%"
              ],
              "respostaCorreta": 1,
              "explicacao": "√1,44 = 1,20. Subtraindo 1: 1,20 - 1 = 0,20 = 20% ao ano."
            },
            {
              "pergunta": "Na expressão x^(1/n), a potência com expoente fracionário equivale a:",
              "opcoes": [
                "Uma divisão de x por n",
                "A raiz enésima de x (ⁿ√x)",
                "Multiplicar x por 1/n",
                "Subtrair n de x"
              ],
              "respostaCorreta": 1,
              "explicacao": "Expoente fracionário 1/n é a representação em formato de potência para a raiz enésima."
            },
            {
              "pergunta": "Qual o resultado de 1,05²?",
              "opcoes": [
                "1,10",
                "1,1025",
                "1,055",
                "1,25"
              ],
              "respostaCorreta": 1,
              "explicacao": "1,05 × 1,05 = 1,1025."
            },
            {
              "pergunta": "Se o valor futuro de um investimento é dado por VF = VP × (1+i)^n, a variável 'n' atua como:",
              "opcoes": [
                "Base",
                "Multiplicador fixo",
                "Expoente (número de períodos)",
                "Denominador"
              ],
              "respostaCorreta": 2,
              "explicacao": "O tempo n entra como expoente sobre o fator de juros (1+i)."
            }
          ],
          "pbl": {
            "titulo": "Descobrindo a Taxa de Juros do Empréstimo",
            "cenario": "Você pegou R$ 1.000 emprestados e devaneou em pagar R$ 1.210 após 2 anos em uma única parcela. Qual foi a taxa de juros anual cobrada nesse empréstimo?",
            "solucao": "Fator acumulado = 1210 ÷ 1000 = 1,21. Como foram 2 anos: √(1,21) = 1,10. Taxa = 1,10 - 1 = 0,10 = 10% ao ano."
          },
          "resumo": [
            "Potência é multiplicação repetida: a^n = a × a × ... × a (n vezes).",
            "Raiz é a operação inversa da potência.",
            "A fórmula dos juros compostos (1+i)^n usa potência diretamente.",
            "A próxima aula ensina notação científica — pra ler números grandes sem se perder."
          ]
        },
        {
          "id": "aula-06",
          "slug": "aula-06-notacao-cientifica",
          "numero": 6,
          "titulo": "Aula 6: Notação científica",
          "comeceAqui": "O PIB do Brasil é R$ 11.000.000.000.000. A dívida pública federal é de aproximadamente R$ 7.000.000.000.000. Ler e comparar esses números em forma extensa é difícil e sujeito a erro. Notação científica resolve isso.",
          "ideiaCentral": "Notação científica é uma forma compacta de escrever números muito grandes ou muito pequenos. Em finanças e economia, aparece em dados macroeconômicos, capitalização de mercado de empresas e relatórios do Banco Central.",
          "conceitosEssenciais": [
            {
              "conceito": "Notação científica",
              "significado": "Número entre 1 e 10, multiplicado por potência de 10"
            },
            {
              "conceito": "Potência de 10",
              "significado": "10¹ = 10 / 10² = 100 / 10³ = 1.000 / 10⁶ = 1.000.000"
            },
            {
              "conceito": "Expoente positivo",
              "significado": "Número grande (move vírgula pra direita)"
            },
            {
              "conceito": "Expoente negativo",
              "significado": "Número pequeno (move vírgula pra esquerda)"
            }
          ],
          "prefixosFinanceiros": [
            {
              "prefixo": "Mil",
              "valor": "10³",
              "exemplo": "R$ 50 mil = R$ 50.000"
            },
            {
              "prefixo": "Milhão",
              "valor": "10⁶",
              "exemplo": "R$ 3 milhões = R$ 3.000.000"
            },
            {
              "prefixo": "Bilhão",
              "valor": "10⁹",
              "exemplo": "R$ 1,4 bi = R$ 1.400.000.000"
            },
            {
              "prefixo": "Trilhão",
              "valor": "10¹²",
              "exemplo": "PIB ≈ R$ 11 trilhões"
            }
          ],
          "exemploResolvido": {
            "titulo": "Conversão de PIB para Notação Científica",
            "enunciado": "Escreva o PIB estimado de R$ 11.000.000.000.000 em notação científica.",
            "passos": [
              "1. Colocar a vírgula após o primeiro algarismo significativo: 1,1",
              "2. Contar quantas casas a vírgula andou para a esquerda: 13 casas",
              "3. Montar a potência de 10: 1,1 × 10¹³"
            ],
            "resultado": "R$ 1,1 × 10¹³."
          },
          "quiz": [
            {
              "pergunta": "Como se escreve o valor R$ 2.300.000 em notação científica?",
              "opcoes": [
                "23 × 10⁵",
                "2,3 × 10⁶",
                "0,23 × 10⁷",
                "2,3 × 10⁵"
              ],
              "respostaCorreta": 1,
              "explicacao": "2,3 × 10⁶ (o número base fica entre 1 e 10 e a vírgula desloca 6 casas)."
            },
            {
              "pergunta": "O número de uma potência de 10 com expoente 10⁹ representa qual ordem de grandeza no Brasil?",
              "opcoes": [
                "Milhão",
                "Bilhão",
                "Trilhão",
                "Quatrilhão"
              ],
              "respostaCorreta": 1,
              "explicacao": "10⁹ = 1.000.000.000 (1 bilhão)."
            },
            {
              "pergunta": "Se uma empresa vale R$ 1,4 × 10⁹, qual o seu valor em reais por extenso?",
              "opcoes": [
                "R$ 140.000.000",
                "R$ 1.400.000.000",
                "R$ 14.000.000.000",
                "R$ 140.000"
              ],
              "respostaCorreta": 1,
              "explicacao": "1,4 × 1.000.000.000 = R$ 1.400.000.000 (1,4 bilhão)."
            },
            {
              "pergunta": "Qual é a potência de 10 associada ao prefixo 'Trilhão'?",
              "opcoes": [
                "10⁶",
                "10⁹",
                "10¹²",
                "10¹⁵"
              ],
              "respostaCorreta": 2,
              "explicacao": "1 Trilhão é 10¹² (1 seguido de 12 zeros)."
            },
            {
              "pergunta": "Em notação científica, o número multiplicador que antecede a potência de 10 deve estar no intervalo:",
              "opcoes": [
                "Entre 0 e 1",
                "Entre 1 e 10 (maior ou igual a 1 e menor que 10)",
                "Entre 10 e 100",
                "Qualquer número positivo"
              ],
              "respostaCorreta": 1,
              "explicacao": "A norma da notação científica exige a parte mantissa N no intervalo 1 ≤ N < 10."
            }
          ],
          "pbl": {
            "titulo": "Comparando Valor de Mercado de Giants Tecnológicas",
            "cenario": "A empresa A vale R$ 3,2 × 10¹² e a empresa B vale R$ 8,0 × 10¹¹. Qual empresa vale mais e qual a diferença em reais entre elas?",
            "solucao": "Empresa A: R$ 3.200.000.000.000 (3,2 trilhões). Empresa B: R$ 800.000.000.000 (800 bilhões). Empresa A é maior. Diferença: 3,2 bi - 0,8 bi = R$ 2,4 trilhões (2,4 × 10¹²)."
          },
          "resumo": [
            "Notação científica compacta números grandes sem perder precisão.",
            "Em finanças: PIB, dívida pública, capitalização de mercado e patrimônio de fundos.",
            "Saber converter entre notação científica e número inteiro evita erros de leitura.",
            "A próxima e última aula do Nível 1 ensina equações de 1º grau — a base pra resolver qualquer 'quanto preciso investir pra ter X?'."
          ]
        },
        {
          "id": "aula-07",
          "slug": "aula-07-equacoes-1-grau",
          "numero": 7,
          "titulo": "Aula 7: Equações de 1º grau",
          "comeceAqui": "Equação de 1º grau é qualquer problema do tipo 'qual é o valor desconhecido?'. Em finanças: quanto preciso investir pra ter R$ 10.000 em um ano? Qual taxa preciso conseguir pra dobrar meu dinheiro em 5 anos? Essas perguntas são equações de 1º grau disfarçadas.",
          "ideiaCentral": "Uma equação tem dois lados separados pelo sinal de igual. Seu objetivo é isolar a incógnita (a variável desconhecida) de um lado. Tudo que você fizer de um lado, faz do outro — o equilíbrio nunca muda.",
          "conceitosEssenciais": [
            {
              "conceito": "Equação",
              "significado": "Igualdade entre duas expressões"
            },
            {
              "conceito": "Incógnita",
              "significado": "O valor desconhecido, geralmente chamado de x"
            },
            {
              "conceito": "1º grau",
              "significado": "A incógnita aparece sem expoente (não é x², não é x³)"
            },
            {
              "conceito": "Isolamento",
              "significado": "Deixar x sozinho de um lado da equação"
            },
            {
              "conceito": "Membro",
              "significado": "Cada lado da equação: membro esquerdo e direito"
            },
            {
              "conceito": "Solução (raiz)",
              "significado": "O valor de x que torna a equação verdadeira"
            }
          ],
          "regraFundamental": "O que você faz de um lado, você faz do outro (somou, subtraiu, multiplicou ou dividiu). Isso mantém o equilíbrio da igualdade.",
          "estruturaGeral": {
            "formula": "ax + b = c",
            "solucao": "x = (c - b) / a"
          },
          "perguntasFinanceiras": [
            {
              "pergunta": "Quanto investir pra ter R$ 1.100 com 10% de juros?",
              "equacao": "x × 1,10 = 1.100"
            },
            {
              "pergunta": "Qual o gasto máximo com salário de R$ 3.000 e economia de R$ 500?",
              "equacao": "x + 500 = 3.000"
            },
            {
              "pergunta": "Em quantos meses junto R$ 2.400 poupando R$ 300/mês?",
              "equacao": "300x = 2.400"
            }
          ],
          "exemploResolvido": {
            "titulo": "Cálculo de Aporte Inicial",
            "enunciado": "Quanto você precisa aplicar hoje (x) a uma taxa de 10% ao ano para obter R$ 1.100 ao final de 1 ano?",
            "passos": [
              "1. Montar a equação: 1,10 · x = 1.100",
              "2. Dividir ambos os lados por 1,10: x = 1.100 ÷ 1,10",
              "3. Resolver a divisão: x = 1.000"
            ],
            "resultado": "Você precisa aplicar R$ 1.000,00."
          },
          "quiz": [
            {
              "pergunta": "Se 300x = 2.400, qual é o valor de x (número de meses para poupar R$ 2.400 guardando R$ 300 por mês)?",
              "opcoes": [
                "6 meses",
                "8 meses",
                "10 meses",
                "12 meses"
              ],
              "respostaCorreta": 1,
              "explicacao": "x = 2.400 ÷ 300 = 8 meses."
            },
            {
              "pergunta": "Qual é a regra fundamental ao resolver uma equação?",
              "opcoes": [
                "Passar todos os números para o lado esquerdo sem mudar de sinal",
                "Qualquer operação matemática realizada de um lado da igualdade deve ser feita também do outro lado",
                "Multiplicar sempre por zero para simplificar",
                "Apagar a incógnita quando ela for negativa"
              ],
              "respostaCorreta": 1,
              "explicacao": "A igualdade é uma balança: a mesma alteração aplicada a um membro deve ser feita no outro."
            },
            {
              "pergunta": "Se x + 500 = 3.000, qual o valor de x?",
              "opcoes": [
                "2.000",
                "2.500",
                "3.500",
                "1.500"
              ],
              "respostaCorreta": 1,
              "explicacao": "x = 3.000 - 500 = 2.500."
            },
            {
              "pergunta": "Para isolar x na equação 1,10x = 1.100, devemos:",
              "opcoes": [
                "Subtrair 1,10 dos dois lados",
                "Dividir ambos os lados por 1,10",
                "Multiplicar ambos os lados por 1,10",
                "Somar 1,10 dos dois lados"
              ],
              "respostaCorreta": 1,
              "explicacao": "Como 1,10 está multiplicando x, a operação inversa é a divisão por 1,10 em ambos os lados."
            },
            {
              "pergunta": "Qual é a solução da equação geral ax + b = c?",
              "opcoes": [
                "x = (c + b) / a",
                "x = (c - b) / a",
                "x = a / (c - b)",
                "x = c - b - a"
              ],
              "respostaCorreta": 1,
              "explicacao": "Subtrai-se b dos dois lados (c - b) e divide-se por a: x = (c - b) / a."
            }
          ],
          "pbl": {
            "titulo": "Meta de Poupança para Viagem",
            "cenario": "Mariana tem R$ 400 guardados e consegue poupar R$ 150 por mês. Uma viagem custa R$ 1.900. Escreva a equação e descubra em quantos meses ela conseguirá viajar.",
            "solucao": "Equação: 400 + 150x = 1900. Isola 150x: 150x = 1900 - 400 = 1500. Resolve x: x = 1500 ÷ 150 = 10 meses."
          },
          "resumo": [
            "Equação de 1º grau isola uma incógnita usando operações inversas.",
            "Regra fundamental: o que faz de um lado, faz do outro.",
            "Em finanças: toda pergunta 'quanto preciso de X pra ter Y' é uma equação.",
            "Parabéns — você concluiu o Módulo 1. O próximo passo é o Módulo 2 — Matemática Financeira Aplicada."
          ]
        }
      ]
    },
    {
      "id": "modulo-2",
      "slug": "modulo-2-aplicada",
      "numero": 2,
      "titulo": "Módulo 2: Matemática Financeira Aplicada",
      "descricao": "Porcentagem, variação, juros simples e compostos, inflação, rentabilidade líquida, CDI e Selic.",
      "aulas": [
        {
          "id": "aula-01",
          "slug": "aula-01-porcentagem-e-variacao",
          "numero": 1,
          "titulo": "Aula 1: Porcentagem e variação",
          "comeceAqui": "Porcentagem é a língua básica das finanças. Juros, inflação, rentabilidade, queda de ações, aumento de preço e imposto quase sempre aparecem em porcentagem.",
          "ideiaCentral": "Porcentagem significa 'por 100'. Se algo rende 10%, isso quer dizer que rende 10 a cada 100.",
          "conceitosEssenciais": [
            {
              "conceito": "Porcentagem",
              "significado": "Parte de um total dividido por 100"
            },
            {
              "conceito": "Variação percentual",
              "significado": "Quanto algo subiu ou caiu em relação ao valor inicial"
            },
            {
              "conceito": "Valor inicial",
              "significado": "O número antes da mudança"
            },
            {
              "conceito": "Valor final",
              "significado": "O número depois da mudança"
            },
            {
              "conceito": "Ponto percentual",
              "significado": "Diferença direta entre duas taxas"
            }
          ],
          "formulaPrincipal": {
            "equacao": "Variação = (Valor final - Valor inicial) / Valor inicial",
            "detalhe": "Para transformar em porcentagem, multiplique por 100."
          },
          "exemploResolvido": {
            "titulo": "Variação Percentual de uma Ação",
            "enunciado": "Uma ação saiu de R$ 20 para R$ 25. Qual foi a variação percentual?",
            "passos": [
              "1. Aplicação da fórmula: Variação = (25 - 20) / 20",
              "2. Cálculo intermediário: 5 / 20 = 0,25",
              "3. Multiplicar por 100: 0,25 × 100 = 25%"
            ],
            "resultado": "A ação subiu 25%."
          },
          "cuidadoComum": "Se uma ação cai 50%, ela precisa subir 100% para voltar ao preço original. Exemplo: R$ 100 cai 50% → R$ 50. De R$ 50 para R$ 100, precisa ganhar R$ 50, o que é 100% de R$ 50.",
          "quiz": [
            {
              "pergunta": "Quanto é 15% de R$ 200?",
              "opcoes": [
                "R$ 20",
                "R$ 30",
                "R$ 40",
                "R$ 15"
              ],
              "respostaCorreta": 1,
              "explicacao": "200 × 0,15 = R$ 30."
            },
            {
              "pergunta": "Um produto foi de R$ 80 para R$ 100. Qual foi a variação percentual?",
              "opcoes": [
                "20%",
                "25%",
                "80%",
                "15%"
              ],
              "respostaCorreta": 1,
              "explicacao": "(100 - 80) ÷ 80 = 20 ÷ 80 = 0,25 = 25%."
            },
            {
              "pergunta": "Uma ação caiu de R$ 40 para R$ 30. Qual foi a queda percentual?",
              "opcoes": [
                "-10%",
                "-20%",
                "-25%",
                "-30%"
              ],
              "respostaCorreta": 2,
              "explicacao": "(30 - 40) ÷ 40 = -10 ÷ 40 = -0,25 = -25%."
            },
            {
              "pergunta": "Qual a diferença entre porcentagem e ponto percentual?",
              "opcoes": [
                "Não há diferença",
                "Ponto percentual é a diferença direta entre duas taxas; porcentagem é a variação relativa ao valor inicial",
                "Porcentagem se aplica a dinheiro; ponto percentual a distâncias",
                "Ponto percentual é sempre o dobro da porcentagem"
              ],
              "respostaCorreta": 1,
              "explicacao": "Se uma taxa vai de 10% a 12%, aumentou 2 pp (pontos percentuais) e 20% (variação percentual relativa)."
            },
            {
              "pergunta": "Por que cair 50% e depois subir 50% não faz o valor voltar ao ponto inicial?",
              "opcoes": [
                "Porque o banco cobra taxas no caminho",
                "Porque a alta de 50% incide sobre a base menor resultante da queda",
                "Porque porcentagens negativas não existem",
                "Porque a matemática financeira proíbe recuperar perdas"
              ],
              "respostaCorreta": 1,
              "explicacao": "Se R$ 100 cai 50%, vai a R$ 50. Subir 50% sobre R$ 50 adiciona apenas R$ 25, resultando em R$ 75."
            }
          ],
          "pbl": {
            "titulo": "Análise de Recuperação de Ação",
            "cenario": "Dois alunos analisam uma ação. Ela caiu de R$ 10 para R$ 5 e depois subiu de R$ 5 para R$ 8. Um aluno diz: 'caiu 50% e subiu 60%, então ficou positivo'. Ele está certo? Explique.",
            "solucao": "Não está certo. Queda de R$ 10 para R$ 5 = -50%. Alta de R$ 5 para R$ 8 = +60% (60% de 5 = 3; 5+3=8). Apesar de 60% > 50%, o valor final (R$ 8) é menor que o inicial (R$ 10), representando perda total de 20%."
          },
          "resumo": [
            "Porcentagem compara uma parte com um total.",
            "Variação percentual sempre depende do valor inicial.",
            "Quedas e altas percentuais não se anulam automaticamente."
          ]
        },
        {
          "id": "aula-02",
          "slug": "aula-02-juros-simples-e-compostos",
          "numero": 2,
          "titulo": "Aula 2: Juros simples e compostos",
          "comeceAqui": "Juros são o preço do dinheiro no tempo. Quem empresta dinheiro quer receber mais no futuro. Quem pega dinheiro emprestado paga por antecipar consumo ou investimento. Existem dois regimes de juros: simples e compostos. Na vida real de investimentos brasileiros, quase tudo funciona em juros compostos — mas entender os dois evita erros de cálculo.",
          "ideiaCentral": "Nos juros simples, você ganha juros só sobre o capital inicial. Nos juros compostos, você ganha juros sobre o capital inicial e sobre os juros que já acumulou. Isso cria o efeito de 'bola de neve'.",
          "conceitosEssenciais": [
            {
              "conceito": "Capital inicial (VP)",
              "significado": "O dinheiro que você coloca no início"
            },
            {
              "conceito": "Taxa de juros (i)",
              "significado": "O percentual que o dinheiro rende por período"
            },
            {
              "conceito": "Prazo (n)",
              "significado": "Número de períodos (meses, anos)"
            },
            {
              "conceito": "Valor futuro (VF)",
              "significado": "O total que você terá ao final"
            },
            {
              "conceito": "Juros simples",
              "significado": "Rendimento calculated só sobre o capital inicial"
            },
            {
              "conceito": "Juros compostos",
              "significado": "Rendimento calculado sobre capital + juros acumulados"
            }
          ],
          "formulas": [
            {
              "nome": "Juros simples",
              "equacao": "VF = VP × (1 + i × n)"
            },
            {
              "nome": "Juros compostos",
              "equacao": "VF = VP × (1 + i)^n"
            }
          ],
          "exemploResolvido": {
            "titulo": "Comparando 3 anos de Juros Simples e Compostos",
            "enunciado": "João investe R$ 1.000 a 10% ao ano. Veja a diferença após 3 anos:",
            "passos": [
              "1. Juros simples: VF = 1000 × (1 + 0,10 × 3) = 1000 × 1,30 = R$ 1.300",
              "2. Juros compostos: VF = 1000 × (1 + 0,10)³ = 1000 × 1,331 = R$ 1.331",
              "3. Em 30 anos: Simples = R$ 4.000 | Compostos = R$ 17.449"
            ],
            "resultado": "Compostos geram mais de 4 vezes o resultado simples em 30 anos."
          },
          "cuidadoComum": "Empréstimos no Brasil usam juros compostos. Uma taxa de 10% ao mês em cartão de crédito transforma R$ 1.000 em R$ 3.138 em apenas 1 ano se não for paga.",
          "quiz": [
            {
              "pergunta": "Qual é a diferença entre juros simples e compostos?",
              "opcoes": [
                "Juros simples rendem sobre o capital inicial; compostos rendem sobre o capital + juros acumulados",
                "Juros simples são cobrados por bancos; compostos pelo governo",
                "Juros simples usam potência; compostos usam multiplicação",
                "Não há diferença prática no longo prazo"
              ],
              "respostaCorreta": 0,
              "explicacao": "Nos juros compostos, os juros de cada período são incorporados ao capital para o cálculo do período seguinte."
            },
            {
              "pergunta": "R$ 500 a 5% ao ano por 4 anos em juros simples resulta em qual valor futuro?",
              "opcoes": [
                "R$ 550",
                "R$ 600",
                "R$ 607,75",
                "R$ 650"
              ],
              "respostaCorreta": 1,
              "explicacao": "VF = 500 × (1 + 0,05 × 4) = 500 × 1,20 = R$ 600."
            },
            {
              "pergunta": "R$ 500 a 5% ao ano por 4 anos em juros compostos resulta em qual valor futuro aproximado?",
              "opcoes": [
                "R$ 600,00",
                "R$ 607,75",
                "R$ 625,00",
                "R$ 640,00"
              ],
              "respostaCorreta": 1,
              "explicacao": "VF = 500 × (1,05)⁴ = 500 × 1,215506 = R$ 607,75."
            },
            {
              "pergunta": "Por que o tempo importa muito mais nos juros compostos do que nos simples?",
              "opcoes": [
                "Porque o tempo faz a taxa diminuir",
                "Porque a variável tempo entra como expoente, gerando crescimento exponencial",
                "Porque a inflação desaparece com o tempo",
                "Porque os bancos perdem o controle das contas"
              ],
              "respostaCorreta": 1,
              "explicacao": "Como o tempo é um expoente (1+i)^n, a curva de crescimento se acelera exponencialmente."
            },
            {
              "pergunta": "Em qual regime se encaixam os investimentos brasileiros como CDB, LCI e Tesouro Direto?",
              "opcoes": [
                "Juros simples",
                "Juros compostos",
                "Juros contínuos lineares",
                "Sem regime de juros"
              ],
              "respostaCorreta": 1,
              "explicacao": "Praticamente todos os produtos de renda fixa no mercado brasileiro operam sob juros compostos."
            }
          ],
          "pbl": {
            "titulo": "O Poder do Prazo em Juros Compostos",
            "cenario": "Duas pessoas investem R$ 1.000 a 10% ao ano em juros compostos. Maria deixa por 10 anos. Pedro deixa por 30 anos. A diferença de prazo é 3 vezes maior. O resultado de Pedro será 3 vezes maior?",
            "solucao": "Maria (10 anos): 1000 × (1,10)¹⁰ = R$ 2.593,74. Pedro (30 anos): 1000 × (1,10)³⁰ = R$ 17.449,40. O resultado de Pedro é mais de 6,7 vezes maior que o de Maria, devido ao expoente 30."
          },
          "resumo": [
            "Juros simples rendem sobre o capital inicial; compostos rendem sobre tudo que já acumulou.",
            "A diferença entre os dois cresce exponencialmente com o tempo.",
            "Investimentos brasileiros usam juros compostos — isso beneficia quem investe e prejudica quem se endivida.",
            "A próxima aula mostra como a inflação corrói esse rendimento."
          ]
        },
        {
          "id": "aula-03",
          "slug": "aula-03-inflacao-e-juros-reais",
          "numero": 3,
          "titulo": "Aula 3: Inflação e juros reais",
          "comeceAqui": "Rentabilidade nominal é quanto seu dinheiro aumenta em reais. Mas se os preços também subiram, você não ficou proporcionalmente mais rico. Rentabilidade real é o que importa: quanto seu poder de compra aumentou depois de descontar a inflação.",
          "ideiaCentral": "Se seu investimento rendeu 12% e a inflação foi 7%, você não ficou 12% mais rico. Você ficou mais rico em termos reais — mas menos do que 12%. O rendimento real é o que você consegue comprar a mais com seu dinheiro.",
          "conceitosEssenciais": [
            {
              "conceito": "Inflação",
              "significado": "Alta geral dos preços ao longo do tempo"
            },
            {
              "conceito": "IPCA",
              "significado": "Índice oficial de inflação do Brasil (medido pelo IBGE)"
            },
            {
              "conceito": "Rentabilidade nominal",
              "significado": "Rendimento em reais, antes de descontar inflação"
            },
            {
              "conceito": "Rentabilidade real",
              "significado": "Rendimento depois de descontar a inflação"
            },
            {
              "conceito": "Poder de compra",
              "significado": "Quantidade de bens que seu dinheiro consegue comprar"
            },
            {
              "conceito": "Juros reais",
              "significado": "Taxa de juros que já considera a inflação"
            }
          ],
          "formulas": [
            {
              "nome": "Aproximação simples (estimativa rápida)",
              "equacao": "Juro real ≈ Juro nominal - Inflação"
            },
            {
              "nome": "Fórmula exata ( Fisher )",
              "equacao": "(1 + r) = (1 + i) / (1 + π)"
            }
          ],
          "exemploResolvido": {
            "titulo": "Cálculo da Rentabilidade Real Exata",
            "enunciado": "Um investimento rendeu 12% nominal no ano. O IPCA foi de 7%. Qual foi a rentabilidade real pela fórmula exata?",
            "passos": [
              "1. Método aproximado: 12% - 7% = 5%",
              "2. Fórmula exata: (1 + r) = 1,12 / 1,07 = 1,046729",
              "3. Descontar 1: r = 0,0467 = 4,67%"
            ],
            "resultado": "A rentabilidade real exata foi de 4,67% (e não 5%)."
          },
          "cuidadoComum": "Em anos de inflação alta, investimentos que parecem render bem podem estar destruindo poder de compra. Exemplo: Selic em 6% com IPCA em 8% → juro real aproximado de -2%.",
          "quiz": [
            {
              "pergunta": "Qual a diferença entre rentabilidade nominal e real?",
              "opcoes": [
                "Nominal é a declarada no contrato; real é a que desconta a inflação e mede ganho no poder de compra",
                "Nominal é paga em dinheiro; real em moedas estrangeiras",
                "Nominal inclui impostos; real exclui impostos",
                "Não há diferença entre ambas"
              ],
              "respostaCorreta": 0,
              "explicacao": "A rentabilidade nominal mede o ganho de caixa; a real mede o ganho efetivo de poder de compra após o IPCA."
            },
            {
              "pergunta": "O IPCA ficou em 5,5% e sua aplicação rendeu 9,5% nominal. Qual foi a rentabilidade real aproximada?",
              "opcoes": [
                "15,0%",
                "4,0%",
                "5,5%",
                "3,79%"
              ],
              "respostaCorreta": 1,
              "explicacao": "Pela aproximação rápida: 9,5% - 5,5% = 4,0%."
            },
            {
              "pergunta": "Por que comparar investimentos apenas pelo rendimento nominal pode enganar?",
              "opcoes": [
                "Porque a inflação altera o poder de compra da moeda",
                "Porque bancos cobram taxas escondidas",
                "Porque o rendimento nominal é sempre negativo",
                "Porque a Selic é fixa"
              ],
              "respostaCorreta": 0,
              "explicacao": "Se a inflação for maior que o rendimento nominal, você perdeu poder de compra apesar de ver o saldo crescer."
            },
            {
              "pergunta": "O que mede o IPCA no Brasil?",
              "opcoes": [
                "A variação do dólar comercial",
                "A taxa média de juros cobrada por bancos",
                "A variação de preços da cesta de consumo das famílias (inflação oficial)",
                "O crescimento da produção de bens do país"
              ],
              "respostaCorreta": 2,
              "explicacao": "IPCA (Índice de Preços ao Consumidor Amplo) é a medida oficial de inflação no Brasil."
            },
            {
              "pergunta": "Se dois investimentos rendem 10% nominal, mas na Opção A a inflação é 3% e na Opção B a inflação é 8%, qual é mais vantajosa?",
              "opcoes": [
                "Opção A, pois a inflação menor garante maior rentabilidade real",
                "Opção B, pois a inflação alta aumenta o ganho",
                "Ambas oferecem o mesmo ganho real",
                "Nenhuma das duas rende acima de zero"
              ],
              "respostaCorreta": 0,
              "explicacao": "Com inflação menor (3%), sobra mais rentabilidade real (aproximadamente 7% vs 2%)."
            }
          ],
          "pbl": {
            "titulo": "Perda Invisível na Poupança",
            "cenario": "Um investidor deixou R$ 10.000 na poupança durante um ano em que ela rendeu 4,5%, enquanto a inflação foi de 7%. Ele comemora que 'ganhou R$ 450'. O que aconteceu de verdade com o poder de compra dele?",
            "solucao": "Rentabilidade nominal: +4,5%. Inflação: 7%. Pela fórmula exata: (1,045 / 1,07) - 1 = -2,33% real. Ele perdeu 2,33% de poder de compra real (os R$ 10.450 finais compram menos do que os R$ 10.000 compravam um ano antes)."
          },
          "resumo": [
            "Inflação corrói o valor do dinheiro; o que importa é o rendimento real.",
            "A fórmula exata é: (1 + nominal) / (1 + inflação) − 1.",
            "O IPCA é o termômetro oficial da inflação no Brasil.",
            "A próxima aula explica como impostos e taxas cortam ainda mais o que sobra."
          ]
        },
        {
          "id": "aula-04",
          "slug": "aula-04-rentabilidade-liquida",
          "numero": 4,
          "titulo": "Aula 4: Rentabilidade líquida",
          "comeceAqui": "Todo investimento tem dois inimigos silenciosos: imposto de renda e taxas. Rentabilidade bruta é o que aparece na propaganda. Rentabilidade líquida é o que realmente fica com você depois de pagar tudo.",
          "ideiaCentral": "Comparar investimentos só pela rentabilidade bruta é como comparar salários sem considerar o imposto. Um CDB a 13% bruto pode render menos na prática do que uma LCA a 11% isenta de IR.",
          "conceitosEssenciais": [
            {
              "conceito": "Rentabilidade bruta",
              "significado": "Rendimento antes de impostos e taxas"
            },
            {
              "conceito": "Rentabilidade líquida",
              "significado": "Rendimento depois de impostos e taxas"
            },
            {
              "conceito": "Imposto de Renda (IR)",
              "significado": "Tributo cobrado sobre o lucro de alguns investimentos"
            },
            {
              "conceito": "Tabela regressiva de IR",
              "significado": "IR menor quanto mais tempo você fica investido"
            },
            {
              "conceito": "Taxa de administração",
              "significado": "Custo cobrado pelo gestor de um fundo"
            },
            {
              "conceito": "Isenção de IR",
              "significado": "Produtos isentos (LCI, LCA, CRI, CRA, debêntures incentivadas)"
            }
          ],
          "tabelaRegressiva": [
            {
              "prazo": "Até 180 dias",
              "aliquota": "22,5%"
            },
            {
              "prazo": "181 a 360 dias",
              "aliquota": "20,0%"
            },
            {
              "prazo": "361 a 720 dias",
              "aliquota": "17,5%"
            },
            {
              "prazo": "Acima de 720 dias",
              "aliquota": "15,0%"
            }
          ],
          "formulas": [
            {
              "nome": "Rentabilidade líquida (com IR)",
              "equacao": "Liquida = Bruta × (1 - Aliquota IR)"
            },
            {
              "nome": "Equivalente bruto de um isento",
              "equacao": "Equivalente bruto = Rentabilidade isenta / (1 - Aliquota IR)"
            }
          ],
          "exemploResolvido": {
            "titulo": "Comparando CDB com LCA",
            "enunciado": "Compare um CDB a 13% ao ano (IR de 15% para > 2 anos) com uma LCA a 11% ao ano (isenta).",
            "passos": [
              "1. CDB líquido: 13% × (1 - 0,15) = 13% × 0,85 = 11,05%",
              "2. LCA líquida: 11,00% (sem imposto)",
              "3. Comparação: CDB a 13% rende 11,05% líquido, quase empatando com LCA a 11%."
            ],
            "resultado": "Se o prazo fosse menor (ex: IR de 22,5%), a LCA de 11% ganharia do CDB de 13%."
          },
          "cuidadoComum": "Fundos de investimento cobram taxa de administração sobre todo o patrimônio e sofrem come-cotas (antecipação de IR a cada 6 meses), o que prejudica os juros compostos.",
          "quiz": [
            {
              "pergunta": "Qual a diferença entre rentabilidade bruta e líquida?",
              "opcoes": [
                "Bruta é o ganho total antes de impostos/taxas; líquida é o que sobra após os custos",
                "Bruta inclui juros simples; líquida juros compostos",
                "Bruta é garantida pelo FGC; líquida não tem garantia",
                "São idênticas para investimentos bancários"
              ],
              "respostaCorreta": 0,
              "explicacao": "Impostos (IR) e taxas de administração reduzem o ganho bruto ao valor líquido."
            },
            {
              "pergunta": "Um CDB rende 14% ao ano. O prazo da aplicação é de 500 dias (alíquota de IR de 17,5%). Qual a rentabilidade líquida?",
              "opcoes": [
                "11,55%",
                "12,25%",
                "14,00%",
                "10,50%"
              ],
              "respostaCorreta": 0,
              "explicacao": "Líquida = 14% × (1 - 0,175) = 14% × 0,825 = 11,55%."
            },
            {
              "pergunta": "Por que uma LCA pagando 11% ao ano pode vencer um CDB de 13% ao ano?",
              "opcoes": [
                "Porque a LCA tem rendimento garantido pelo governo",
                "Porque a LCA é isenta de Imposto de Renda para pessoa física",
                "Porque a LCA cobra taxa de performance",
                "Porque a LCA é corrigida pelo IPCA"
              ],
              "respostaCorreta": 1,
              "explicacao": "Como a LCA não paga IR, seus 11% são inteiramente líquidos, superando ou empatando com taxas brutas maiores sujeitas a IR."
            },
            {
              "pergunta": "Na tabela regressiva de IR de renda fixa, qual a menor alíquota possível e a partir de qual prazo ela é aplicada?",
              "opcoes": [
                "22,5% até 180 dias",
                "15% para aplicações acima de 720 dias (2 anos)",
                "10% após 5 anos",
                "Zero para qualquer prazo"
              ],
              "respostaCorreta": 1,
              "explicacao": "Após 720 dias (2 anos), a alíquota cai para o patamar mínimo de 15% sobre o rendimento."
            },
            {
              "pergunta": "O que é o come-cotas em fundos de investimento?",
              "opcoes": [
                "Uma taxa extra cobrada pela corretora no resgate",
                "A antecipação semestral da cobrança do Imposto de Renda em cotas do fundo",
                "O desconto de taxa de custódia da B3",
                "O cancelamento de cotas de investidores inadimplentes"
              ],
              "respostaCorreta": 1,
              "explicacao": "O come-cotas recolhe antecipadamente o IR em maio e novembro reduzindo o número de cotas."
            }
          ],
          "pbl": {
            "titulo": "Decisão entre CDB e LCA",
            "cenario": "Carlos compara CDB a 105% do CDI com LCA a 91% do CDI. O CDI está em 10,5% ao ano. O prazo planejado é de 2 anos (alíquota de IR de 15%). Qual investimento é mais vantajoso?",
            "solucao": "CDI = 10,5%. CDB bruto: 10,5 × 1,05 = 11,025%. CDB líquido: 11,025 × 0,85 = 9,37%. LCA líquida (isenta): 10,5 × 0,91 = 9,555%. A LCA é mais vantajosa (9,55% vs 9,37% líquido)."
          },
          "resumo": [
            "Rentabilidade bruta é propaganda; rentabilidade líquida é o que importa.",
            "IR segue tabela regressiva: quanto mais tempo, menor o imposto.",
            "Produtos isentos (LCI, LCA) podem ser mais rentáveis mesmo com taxa nominal menor.",
            "A próxima aula explica como usar CDI e Selic como referência para comparar qualquer investimento."
          ]
        },
        {
          "id": "aula-05",
          "slug": "aula-05-cdi-selic-comparacao",
          "numero": 5,
          "titulo": "Aula 5: CDI, Selic e como comparar investimentos",
          "comeceAqui": "Muitos investimentos brasileiros usam frases como 'rende 110% do CDI' ou 'acompanha a Selic'. Sem entender o que são CDI e Selic, você não consegue comparar nenhum produto de renda fixa de forma justa.",
          "ideiaCentral": "CDI e Selic são taxas de referência do mercado financeiro brasileiro. Elas funcionam como uma régua: permitem comparar produtos diferentes em um mesmo padrão, independente da nomenclatura de cada banco.",
          "conceitosEssenciais": [
            {
              "conceito": "Selic",
              "significado": "Taxa básica de juros do Brasil, definida pelo COPOM a cada 45 dias"
            },
            {
              "conceito": "CDI",
              "significado": "Taxa praticada em empréstimos entre bancos; anda junto com a Selic"
            },
            {
              "conceito": "Percentual do CDI",
              "significado": "Indica quanto um produto rende em relação ao CDI (ex: 110% do CDI)"
            },
            {
              "conceito": "Benchmark",
              "significado": "Referência usada para comparar o desempenho de um investimento"
            },
            {
              "conceito": "Liquidez",
              "significado": "Facilidade de resgatar o dinheiro antes do vencimento"
            },
            {
              "conceito": "Risco de crédito",
              "significado": "Risco de o emissor não pagar o que deve"
            },
            {
              "conceito": "Prazo",
              "significado": "Tempo até o vencimento do produto"
            }
          ],
          "relacaoSelicCDI": "Na prática, CDI ≈ Selic − 0,10%. Para estimativas rápidas, use os dois como equivalentes.",
          "formula": {
            "equacao": "Rentabilidade = CDI × Percentual do CDI",
            "exemplo": "Se CDI = 10,5%, 110% do CDI = 10,5% × 1,10 = 11,55% ao ano (bruto)."
          },
          "exemploResolvido": {
            "titulo": "Tabela de Comparação com CDI a 10,5%",
            "enunciado": "Compare três produtos de renda fixa com CDI a 10,5% ao ano para um prazo de 2 anos (IR 15%):",
            "passos": [
              "1. Tesouro Selic (100% CDI): 10,5% bruto → 8,93% líquido",
              "2. CDB 110% do CDI: 11,55% bruto → 9,82% líquido",
              "3. LCI 92% do CDI: 9,66% bruto (isenta) → 9,66% líquido"
            ],
            "resultado": "O CDB 110% entrega o maior líquido (9,82%), mas LCI (9,66%) é próxima e pode oferecer prazos menores."
          },
          "cuidadoComum": "Comparar investimentos apenas pela taxa bruta — sem ajustar IR, prazo, carência e risco de crédito — leva a decisões de investimento equivocadas.",
          "quiz": [
            {
              "pergunta": "O que é o CDI e qual sua relação com a taxa Selic?",
              "opcoes": [
                "CDI é uma ação da B3 que varia com a inflação",
                "CDI é a taxa negociada entre bancos e anda muito próxima da Selic (CDI ≈ Selic - 0,10%)",
                "CDI é o imposto sobre a renda fixa",
                "CDI é a taxa de juros do dólar nos EUA"
              ],
              "respostaCorreta": 1,
              "explicacao": "CDI (Certificado de Depósito Interbancário) é a taxa das operações entre bancos, que acompanha a Selic."
            },
            {
              "pergunta": "Se o CDI está em 12% ao ano, quanto rende em taxa bruta um CDB ofertado a 108% do CDI?",
              "opcoes": [
                "12,00%",
                "12,96%",
                "13,50%",
                "11,20%"
              ],
              "respostaCorreta": 1,
              "explicacao": "12% × 1,08 = 12,96% ao ano."
            },
            {
              "pergunta": "Por que comparar dois produtos só pela taxa nominal/bruta pode enganar?",
              "opcoes": [
                "Porque impostos, prazos, liquidez e riscos de crédito alteram o resultado prático",
                "Porque a Selic muda todos os dias sem aviso",
                "Porque os bancos cobram taxa de câmbio",
                "Porque a inflação só afeta o Tesouro"
              ],
              "respostaCorreta": 0,
              "explicacao": "Investimentos com IR diferente (ex: CDB vs LCI) ou liquidez diferente exigem comparação na rentabilidade líquida."
            },
            {
              "pergunta": "O que significa dizer que um ativo tem alta liquidez?",
              "opcoes": [
                "Que ele não tem nenhum risco de crédito",
                "Que ele pode ser convertido em dinheiro rapidamente sem grande perda de valor",
                "Que ele rende obrigatoriamente acima de 120% do CDI",
                "Que ele é isento de Imposto de Renda"
              ],
              "respostaCorreta": 1,
              "explicacao": "Liquidez é a velocidade e facilidade de resgate do valor investido."
            },
            {
              "pergunta": "Quando uma LCA a 90% do CDI pode ser melhor que um CDB a 110% do CDI?",
              "opcoes": [
                "Quando o prazo for curto (ex: 6 meses), onde o IR do CDB é de 22,5%, reduzindo o líquido do CDB para 85,25% do CDI",
                "Sempre, pois LCA não tem risco",
                "Nunca, pois 110% é sempre maior",
                "Apenas quando a inflação for zero"
              ],
              "respostaCorreta": 0,
              "explicacao": "Em prazos curtos (IR 22,5%), 110% × (1 - 0,225) = 85,25% do CDI líquido, perdendo para os 90% líquidos da LCA."
            }
          ],
          "pbl": {
            "titulo": "Escolha da Reserva de Curto Prazo",
            "cenario": "Você precisará do dinheiro possivelmente em 6 meses (CDI a 10,5%). Propostas: Tesouro Selic (liquidez diária), CDB banco médio 120% do CDI (vencimento em 2 anos sem liquidez antecipada) e LCI 93% do CDI (carência de 90 dias). Qual escolher?",
            "solucao": "O CDB 120% não serve por falta de liquidez em 6 meses. O Tesouro Selic (liquidez diária) ou LCI 93% (após 90 dias liberada) servem. Na LCI 93% o ganho é líquido 9,765%. No Tesouro Selic com IR 22,5%, ganho líquido = 10,5 × 0,775 = 8,137%. A LCI a 93% é a melhor opção caso liberada aos 6 meses."
          },
          "resumo": [
            "Selic e CDI são as taxas de referência do mercado; CDI ≈ Selic.",
            "Percentual do CDI permite comparar produtos em uma mesma régua.",
            "Sempre ajuste para rentabilidade líquida: tire IR, considere prazo e liquidez.",
            "Com isso, você terminou o Nível 2 — Matemática Financeira Aplicada."
          ]
        }
      ]
    },
    {
      "id": "modulo-3",
      "slug": "modulo-3-funcoes-e-probabilidade",
      "numero": 3,
      "titulo": "Módulo 3: Funções, Progressões e Probabilidade",
      "descricao": "Função afim, exponencial, logaritmos, PA, PG, somatório, produtório, probabilidade e valor esperado.",
      "aulas": [
        {
          "id": "aula-01",
          "slug": "aula-01-o-que-e-uma-funcao",
          "numero": 1,
          "titulo": "Aula 1: O que é uma função",
          "comeceAqui": "Uma função é uma máquina de transformar números: entra um valor, sai outro, sempre seguindo a mesma regra. 'Quanto vou ter se investir por t meses?' é uma função. Dominar essa ideia destrava toda a matemática financeira que vem pela frente.",
          "ideiaCentral": "Escrevemos f(x) para dizer 'o resultado da máquina f quando entra x'. A função afim f(x) = ax + b cresce em linha reta. Juros simples são uma função afim do tempo: M(t) = C + (C · i)t.",
          "conceitosEssenciais": [
            {
              "conceito": "Função",
              "significado": "Regra que associa cada entrada a exatamente uma saída"
            },
            {
              "conceito": "Domínio",
              "significado": "O conjunto de entradas que fazem sentido"
            },
            {
              "conceito": "Imagem",
              "significado": "O conjunto de saídas possíveis"
            },
            {
              "conceito": "Variável independente (x)",
              "significado": "A entrada — o que você controla ou observa"
            },
            {
              "conceito": "Variável dependente (f(x))",
              "significado": "A saída — o que a regra devolve"
            },
            {
              "conceito": "Função afim (linear)",
              "significado": "f(x) = ax + b: cresce em linha reta"
            },
            {
              "conceito": "Coeficiente angular (a)",
              "significado": "A inclinação — quanto a saída muda por unidade de entrada"
            },
            {
              "conceito": "Coeficiente linear (b)",
              "significado": "O ponto de partida quando x = 0"
            }
          ],
          "exemploResolvido": {
            "titulo": "Custo de Plano de Celular",
            "enunciado": "Plano cobra R$ 30 fixos + R$ 2 por GB usado: f(x) = 2x + 30. Calcule o custo de 8 GB e quantos GB dá para usar com R$ 50.",
            "passos": [
              "1. f(8) = 2 · 8 + 30 = 16 + 30 = R$ 46",
              "2. Inverter a função: 2x + 30 = 50 → 2x = 20 → x = 10 GB"
            ],
            "resultado": "8 GB custam R$ 46. Com R$ 50 dá para usar 10 GB."
          },
          "pbl": {
            "titulo": "Escolha de Plano de Remuneração",
            "cenario": "João compara duas propostas: (a) R$ 80 fixos; (b) R$ 20 fixos + R$ 6 por dia trabalhado (d). Qual a melhor escolha?",
            "solucao": "Proposta (b): f(d) = 6d + 20. Igualando a (a): 6d + 20 = 80 → 6d = 60 → d = 10 dias. A partir de 11 dias de trabalho, a proposta (b) é superior."
          },
          "resumo": [
            "Função é uma regra: cada entrada tem exatamente uma saída.",
            "A função afim f(x) = ax + b cresce em linha reta: b é o início, a é o ritmo.",
            "Juros simples são uma função afim do tempo: M(t) = C(1 + it)."
          ],
          "quiz": [
            {
              "pergunta": "Uma empresa possui uma estrutura de custo mensal modelada pela função afim C(q) = 15q + 4500, onde q é a quantidade produzida em unidades e C(q) é o custo total em reais. Sabendo que cada unidade é vendida pelo preço unitário de R$ 40, determine a lei de formação da função lucro L(q) e a quantidade mínima q que precisa ser produzida e comercializada para que a empresa atinja o ponto de equilíbrio financeiro (lucro zero, break-even point).",
              "opcoes": [
                "L(q) = 25q - 4500; q = 180 unidades.",
                "L(q) = 25q + 4500; q = 180 unidades.",
                "L(q) = 55q - 4500; q = 82 unidades.",
                "L(q) = 25q - 4500; q = 113 unidades."
              ],
              "respostaCorreta": 0,
              "explicacao": "A receita total obtida com a venda de q unidades é R(q) = 40q. O lucro é a diferença entre receita e custo total: L(q) = R(q) - C(q) = 40q - (15q + 4500) = 25q - 4500. No ponto de equilíbrio (break-even), o lucro é nulo: L(q) = 0 => 25q - 4500 = 0 => 25q = 4500 => q = 4500 / 25 = 180 unidades."
            },
            {
              "pergunta": "Um investimento em regime de juros simples evolui de acordo com a função afim M(t) = 8000 + 120t, onde M(t) é o montante acumulado em reais e t é o tempo decorrido em meses. Com base nos coeficientes da função, identifique o capital inicial aplicado (C), o rendimento financeiro constante mensal e a taxa de juros simples mensal (i).",
              "opcoes": [
                "Capital inicial: R$ 8.000,00; rendimento: R$ 120,00/mês; taxa: 1,5% ao mês.",
                "Capital inicial: R$ 8.000,00; rendimento: R$ 120,00/mês; taxa: 0,15% ao mês.",
                "Capital inicial: R$ 8.120,00; rendimento: R$ 120,00/mês; taxa: 1,5% ao mês.",
                "Capital inicial: R$ 8.000,00; rendimento: R$ 960,00/mês; taxa: 12% ao mês."
              ],
              "respostaCorreta": 0,
              "explicacao": "A função de juros simples tem a forma canônica afim M(t) = C + (C · i)t. O coeficiente linear (termo independente) corresponde ao ponto de partida t = 0, logo C = R$ 8.000,00. O coeficiente angular é a taxa de variação constante: rendimento mensal = C · i = R$ 120,00. A taxa mensal é obtida isolando i: i = 120 / 8000 = 0,015 = 1,5% ao mês."
            },
            {
              "pergunta": "Um investidor aplica R$ 12.000,00 a juros simples a uma taxa contratual de 0,75% ao mês. A função afim do montante é expressa por M(t) = 12000 + 90t, com t em meses. O investidor planeja resgatar o capital exatamente quando o montante atingir R$ 15.240,00. Qual é o tempo de aplicação necessário expresso em anos e meses?",
              "opcoes": [
                "3 anos (36 meses).",
                "2 anos e 8 meses (32 meses).",
                "4 anos (48 meses).",
                "3 anos e 4 meses (40 meses)."
              ],
              "respostaCorreta": 0,
              "explicacao": "Para encontrar o tempo t, invertemos a função igualando o montante à meta desejada: 12000 + 90t = 15240 => 90t = 15240 - 12000 => 90t = 3240 => t = 3240 / 90 = 36 meses. Convertendo para anos: 36 / 12 = 3 anos exatos."
            },
            {
              "pergunta": "Uma consultora financeira compara duas propostas de remuneração para um contrato temporário com d dias trabalhados:\n• Proposta A: R$ 1.800,00 fixos + R$ 140,00 por dia trabalhado: f_A(d) = 140d + 1800\n• Proposta B: R$ 900,00 fixos + R$ 200,00 por dia trabalhado: f_B(d) = 200d + 900\nA partir de quantos dias inteiros de trabalho a Proposta B se torna estritamente mais vantajosa financeiramente do que a Proposta A?",
              "opcoes": [
                "A partir de 16 dias (o ponto de indiferença ocorre exatamente em 15 dias).",
                "A partir de 15 dias (o ponto de indiferença ocorre exatamente em 14 dias).",
                "A partir de 14 dias (calculou o ponto de indiferença e subtraiu um dia).",
                "A partir de 10 dias (considerou apenas a relação entre os custos fixos)."
              ],
              "respostaCorreta": 0,
              "explicacao": "Determinamos o ponto de encontro (indiferença) igualando as duas funções: f_B(d) = f_A(d) => 200d + 900 = 140d + 1800 => 200d - 140d = 1800 - 900 => 60d = 900 => d = 15 dias. Para d = 15 dias, ambas pagam f(15) = R$ 3.900,00. Como a inclinação da reta B (a = 200) é maior que a de A (a = 140), para qualquer d > 15 (ou seja, a partir de 16 dias inteiros), a Proposta B supera a Proposta A."
            },
            {
              "pergunta": "Um fundo de investimento cobra uma taxa de administração anual regressiva T(x) dada por T(x) = (2500 / x) + 0,10, onde x representa o patrimônio líquido aplicado pelo cotista (em milhares de reais) e T(x) é a taxa em porcentagem anual (%). Sabendo que o regulamento do fundo estipula aplicação inicial mínima de R$ 50.000,00 e capacidade máxima de captação de R$ 10.000.000,00, qual é o domínio prático D dessa função?",
              "opcoes": [
                "D = [50, 10000]",
                "D = [50000, 10000000]",
                "D = (0, +∞)",
                "D = ℝ \\ {0}"
              ],
              "respostaCorreta": 0,
              "explicacao": "O domínio puramente algébrico exigiria apenas x ≠ 0 para evitar divisão por zero. Contudo, no contexto econômico-financeiro com variável x expressa em milhares de reais: (1) O aporte mínimo de R$ 50.000,00 corresponde a x = 50 milhares; (2) O teto de captação de R$ 10.000.000,00 corresponde a x = 10.000 milhares. Logo, o domínio restrito à realidade da aplicação é o intervalo fechado D = [50, 10000]."
            }
          ]
        },
        {
          "id": "aula-02",
          "slug": "aula-02-funcao-exponencial",
          "numero": 2,
          "titulo": "Aula 2: Função exponencial",
          "comeceAqui": "Na função afim, a variável está multiplicando (2x). Na exponencial, ela está no expoente (2^x). Parece detalhe, mas é a diferença entre andar e voar: a afim cresce somando; a exponencial cresce multiplicando pelo mesmo fator.",
          "ideiaCentral": "f(x) = a · b^x. Juros compostos são uma função exponencial do tempo: M(t) = C(1+i)^t, onde a = C e b = 1+i.",
          "conceitosEssenciais": [
            {
              "conceito": "Base (b)",
              "significado": "O fator multiplicativo por período"
            },
            {
              "conceito": "Crescimento exponencial",
              "significado": "b > 1: cada passo multiplica por mais de 1"
            },
            {
              "conceito": "Decaimento exponencial",
              "significado": "0 < b < 1: cada passo perde uma fração fixa"
            },
            {
              "conceito": "Fator de crescimento",
              "significado": "1 + i: taxa de 10% vira fator 1,10"
            }
          ],
          "exemploResolvido": {
            "titulo": "Rendimento Exponencial em 2 Anos",
            "enunciado": "Aplicação de R$ 5.000 a 1% ao mês em juros compostos por 2 anos (24 meses).",
            "passos": [
              "1. M = 5000 · (1,01)²⁴",
              "2. (1,01)²⁴ ≈ 1,2697",
              "3. M = 5000 · 1,2697 = R$ 6.348,67"
            ],
            "resultado": "Montante final: R$ 6.348,67 (ganho de 26,97%, e não 24%)."
          },
          "pbl": {
            "titulo": "Alice vs Bruna: Começar Cedo ou Tarde",
            "cenario": "Alice investe R$ 10.000 aos 20 anos a 10% a.a. e para de aportar. Bruna investe aos 35 anos R$ 30.000 a 10% a.a. Quem tem mais aos 60 anos?",
            "solucao": "Alice aos 60 (40 anos de juros): 10.000 · (1,10)⁴⁰ = R$ 452.592,59. Bruna aos 60 (25 anos): 30.000 · (1,10)²⁵ = R$ 325.041,00. Alice vence por R$ 127.551 mesmo investindo 3 vezes menos, devido ao tempo no expoente."
          },
          "resumo": [
            "Exponencial: f(x) = a · b^x — cresce multiplicando, não somando.",
            "Juros compostos são a exponencial com b = 1 + i; o tempo é o expoente.",
            "Inflação e depreciação são decaimentos exponenciais (b < 1)."
          ],
          "quiz": [
            {
              "pergunta": "Dois capitais idênticos de R$ 10.000,00 são aplicados por um período de 3 anos a uma taxa de 10% ao ano. O Capital 1 segue o regime de juros simples M₁(t) = 10000(1 + 0,10t), enquanto o Capital 2 segue o regime de juros compostos M₂(t) = 10000(1,10)ᵗ. Qual é a diferença monetária absoluta entre os montantes finais M₂(3) e M₁(3)?",
              "opcoes": [
                "R$ 310,00 a mais nos juros compostos.",
                "R$ 300,00 a mais nos juros compostos.",
                "R$ 100,00 a mais nos juros compostos.",
                "R$ 410,00 a mais nos juros compostos."
              ],
              "respostaCorreta": 0,
              "explicacao": "Montante simples: M₁(3) = 10000 · (1 + 0,10 · 3) = 10000 · 1,30 = R$ 13.000,00. Montante composto: M₂(3) = 10000 · (1,10)³ = 10000 · 1,331 = R$ 13.310,00. Diferença: M₂(3) - M₁(3) = 13.310 - 13.000 = R$ 310,00 decorrente do efeito 'juros sobre juros' (crescimento exponencial vs. linear)."
            },
            {
              "pergunta": "Um equipamento industrial foi adquirido por R$ 80.000,00 e sofre uma depreciação contábil constante de 12% ao ano. O valor contábil residual V(t) após t anos é modelado pela função de decaimento exponencial V(t) = 80000 · (0,88)ᵗ. Qual é o valor contábil da máquina ao final de 3 anos de uso?",
              "opcoes": [
                "R$ 54.517,76",
                "R$ 51.200,00",
                "R$ 59.200,00",
                "R$ 47.975,63"
              ],
              "respostaCorreta": 0,
              "explicacao": "Calculando o fator de decaimento elevado ao cubo: (0,88)³ = 0,88 · 0,88 · 0,88 = 0,7744 · 0,88 = 0,681472. Aplicando ao valor inicial: V(3) = 80000 · 0,681472 = R$ 54.517,76. O distrator R$ 51.200,00 corresponde ao erro de calcular depreciação linear (1 - 3 · 0,12 = 0,64)."
            },
            {
              "pergunta": "Uma aplicação financeira de R$ 5.000,00 rende 0,8% ao mês em juros compostos através da função M(t) = 5000 · (1,008)ᵗ, onde t é medido em meses. Sabendo que (1,008)²⁴ ≈ 1,210745, determine o montante acumulado e a rentabilidade percentual efetiva acumulada após 2 anos (24 meses).",
              "opcoes": [
                "Montante: R$ 6.053,73; Rentabilidade efetiva: 21,075%.",
                "Montante: R$ 5.960,00; Rentabilidade efetiva: 19,200%.",
                "Montante: R$ 6.053,73; Rentabilidade efetiva: 10,034%.",
                "Montante: R$ 6.250,00; Rentabilidade efetiva: 25,000%."
              ],
              "respostaCorreta": 0,
              "explicacao": "Para t = 24 meses: M(24) = 5000 · (1,008)²⁴ ≈ 5000 · 1,210745 = R$ 6.053,725 ≈ R$ 6.053,73. A taxa efetiva do período é (M(24) - M(0)) / M(0) = (1,210745 - 1) = 0,210745 = 21,075%. Em juros simples seriam apenas 24 · 0,8% = 19,2%."
            },
            {
              "pergunta": "A inflação acumulada de um país é de 6% ao ano de forma constante. O poder de compra real P(t) de uma quantia nominal fixa de R$ 10.000,00 após t anos segue a função P(t) = 10000 · (1,06)⁻ᵗ = 10000 / (1,06)ᵗ. Dado que (1,06)⁵ ≈ 1,338226, qual é a perda percentual real de poder de compra ao final de 5 anos?",
              "opcoes": [
                "Perda real de aproximadamente 25,27% (poder de compra cai para ~R$ 7.472,58).",
                "Perda real de 30,00% (cálculo linear 5 × 6%).",
                "Perda real de 33,82% (confusão com a inflação acumulada de preços).",
                "Perda real de 18,45% (cálculo de decaimento com base 0,94⁵)."
              ],
              "respostaCorreta": 0,
              "explicacao": "O poder de compra final é P(5) = 10000 / 1,338226 ≈ R$ 7.472,58. A redução percentual do poder de compra é dada por 1 - (P(5) / P(0)) = 1 - (1 / 1,338226) = 1 - 0,747258 = 0,252742 ≈ 25,27%. Note a assimetria: os preços subiram +33,82%, o que corrói o poder aquisitivo em 25,27%."
            },
            {
              "pergunta": "O valor de mercado de uma startup é modelado pela função exponencial V(t) = 50 · (1,44)ᵗ, onde V é o valor em milhões de reais e t é o tempo em anos. Sabendo que 1,44 = (1,2)², qual função equivalente expressa o valor de mercado V em função do número de semestres decorridos s (onde s = 2t)?",
              "opcoes": [
                "V(s) = 50 · (1,2)ˢ",
                "V(s) = 50 · (1,44)²ˢ",
                "V(s) = 25 · (1,2)ˢ",
                "V(s) = 50 · (1,22)ˢ"
              ],
              "respostaCorreta": 0,
              "explicacao": "Como 1 ano tem 2 semestres, temos s = 2t => t = s/2. Substituindo na função original: V(s) = 50 · (1,44)^(s/2) = 50 · ((1,44)^(1/2))^s = 50 · (√1,44)^s = 50 · (1,2)^s. Isso demonstra a equivalência entre taxa composta anual de 44% e taxa semestral de 20%."
            }
          ]
        },
        {
          "id": "aula-03",
          "slug": "aula-03-logaritmos",
          "numero": 3,
          "titulo": "Aula 3: Logaritmos",
          "comeceAqui": "Quando a incógnita está no expoente (em quanto tempo meu dinheiro dobra?), a ferramenta para tirá-la de lá chama-se logaritmo.",
          "ideiaCentral": "log_b(y) = x ⟺ b^x = y. O logaritmo responde: 'a qual expoente devo elevar a base b para obter y?'. Propriedade chave: log(a^n) = n · log(a).",
          "conceitosEssenciais": [
            {
              "conceito": "log_b(y)",
              "significado": "Expoente para levar b até y"
            },
            {
              "conceito": "Propriedade da potência",
              "significado": "log(a^n) = n · log(a) — liberta o t do expoente"
            },
            {
              "conceito": "Regra do 72",
              "significado": "Atalho mental: tempo para dobrar ≈ 72 ÷ taxa (%)"
            }
          ],
          "exemploResolvido": {
            "titulo": "Tempo para Dobrar Capital a 10% a.a.",
            "enunciado": "1.000 · 1,10^t = 2.000 → 1,10^t = 2.",
            "passos": [
              "1. Aplica log: t · log(1,10) = log(2)",
              "2. t = log(2) / log(1,10) = 0,3010 / 0,0414 ≈ 7,3 anos",
              "3. Regra do 72: 72 / 10 = 7,2 anos (aproximação excelente)"
            ],
            "resultado": "O dinheiro dobra em aproximadamente 7,3 anos."
          },
          "pbl": {
            "titulo": "Tempo de Duplicação vs Cartão de Crédito",
            "cenario": "Investimento rende 0,7% a.m. Cartão cobra 12% a.m. Em quantos meses cada um dobra de valor?",
            "solucao": "Investimento: t = log(2)/log(1,007) ≈ 99,3 meses (~8,3 anos). Cartão: t = log(2)/log(1,12) ≈ 6,1 meses. Uma dívida dobra 16 vezes mais rápido do que o investimento leva para dobrar."
          },
          "resumo": [
            "Logaritmo encontra o expoente desconhecido.",
            "log(a^n) = n log a resolve qualquer 'em quanto tempo?' em juros compostos.",
            "A regra do 72 é o logaritmo disfarçado de conta de cabeça."
          ],
          "quiz": [
            {
              "pergunta": "Um investidor aplica R$ 10.000,00 a uma taxa de juros compostos de 8% ao ano. Para determinar em quantos anos (t) o capital atingirá R$ 25.000,00, resolve-se a equação 10000 · (1,08)ᵗ = 25000 => (1,08)ᵗ = 2,5. Dados log₁₀(2,5) ≈ 0,39794 e log₁₀(1,08) ≈ 0,03342, qual é o tempo aproximado necessário?",
              "opcoes": [
                "t ≈ 11,91 anos (aprox. 11 anos e 11 meses).",
                "t ≈ 18,75 anos (calculado por juros simples).",
                "t ≈ 8,38 anos (erro de divisão de expoentes).",
                "t ≈ 13,33 anos (aproximação linear equivocada)."
              ],
              "respostaCorreta": 0,
              "explicacao": "Aplicando o logaritmo decimal em ambos os membros: log₁₀((1,08)ᵗ) = log₁₀(2,5). Pela propriedade da potência: t · log₁₀(1,08) = log₁₀(2,5) => t = log₁₀(2,5) / log₁₀(1,08) = 0,39794 / 0,03342 ≈ 11,907 ≈ 11,91 anos."
            },
            {
              "pergunta": "Sabendo que log₁₀(2) ≈ 0,3010 e log₁₀(3) ≈ 0,4771, determine, utilizando exclusivamente as propriedades operatórias dos logaritmos, os valores de log₁₀(1,5) e log₁₀(12).",
              "opcoes": [
                "log₁₀(1,5) = 0,1761 e log₁₀(12) = 1,0791",
                "log₁₀(1,5) = 0,1585 e log₁₀(12) = 0,9542",
                "log₁₀(1,5) = 0,1761 e log₁₀(12) = 0,7781",
                "log₁₀(1,5) = 0,6300 e log₁₀(12) = 1,0791"
              ],
              "respostaCorreta": 0,
              "explicacao": "1) log₁₀(1,5) = log₁₀(3/2) = log₁₀(3) - log₁₀(2) = 0,4771 - 0,3010 = 0,1761. 2) log₁₀(12) = log₁₀(2² · 3) = log₁₀(2²) + log₁₀(3) = 2 · log₁₀(2) + log₁₀(3) = 2(0,3010) + 0,4771 = 0,6020 + 0,4771 = 1,0791."
            },
            {
              "pergunta": "Uma dívida no rotativo do cartão de crédito cresce à taxa de juros compostos de 9% ao mês. Calcule o tempo exato para a dívida dobrar utilizando logaritmos naturais (ln 2 ≈ 0,69315 e ln 1,09 ≈ 0,08618) e compare com a estimativa prática da 'Regra do 72'.",
              "opcoes": [
                "Tempo exato: t ≈ 8,04 meses; Regra do 72: t ≈ 8,00 meses.",
                "Tempo exato: t ≈ 11,11 meses; Regra do 72: t ≈ 8,00 meses.",
                "Tempo exato: t ≈ 7,20 meses; Regra do 72: t ≈ 9,00 meses.",
                "Tempo exato: t ≈ 6,00 meses; Regra do 72: t ≈ 8,00 meses."
              ],
              "respostaCorreta": 0,
              "explicacao": "Equação de duplicação: (1,09)ᵗ = 2 => t · ln(1,09) = ln(2) => t = ln(2) / ln(1,09) = 0,69315 / 0,08618 ≈ 8,043 meses. Pela Regra do 72: t ≈ 72 / taxa(%) = 72 / 9 = 8,00 meses. A aproximação mental apresenta erro de apenas ~0,5%."
            },
            {
              "pergunta": "Um fundo de investimento quadruplicou o capital inicial de seus cotistas (M/C = 4) após 14 anos ininterruptos em juros compostos anuais. Sabendo que log₁₀(4) ≈ 0,60206 e que 10^(0,043004) ≈ 1,1041, qual foi a taxa anual composta média i obtida pelo fundo?",
              "opcoes": [
                "i ≈ 10,41% ao ano.",
                "i ≈ 28,57% ao ano (cálculo linear 400% / 14).",
                "i ≈ 4,30% ao ano (confusão entre logaritmo e taxa percentual).",
                "i ≈ 14,87% ao ano (aproximação incorreta da raiz décima quarta)."
              ],
              "respostaCorreta": 0,
              "explicacao": "A relação é (1 + i)¹⁴ = 4. Aplicando logaritmo: 14 · log₁₀(1 + i) = log₁₀(4) => log₁₀(1 + i) = 0,60206 / 14 = 0,043004. Revertendo a definição de logaritmo: 1 + i = 10^(0,043004) ≈ 1,1041 => i = 1,1041 - 1 = 0,1041 = 10,41% a.a."
            },
            {
              "pergunta": "Considerando uma inflação média constante de 5% ao ano, o poder de compra é dado por P(t) = P₀ · (1,05)⁻ᵗ. Em quanto tempo a moeda perderá exatamente a metade de seu poder de compra original (P(t) = 0,5P₀)? (Dados: log₁₀(2) ≈ 0,30103; log₁₀(1,05) ≈ 0,02119).",
              "opcoes": [
                "t ≈ 14,21 anos (cerca de 14 anos e 2 meses).",
                "t ≈ 20,00 anos (cálculo linear 100% / 5%).",
                "t ≈ 10,00 anos (cálculo linear 50% / 5%).",
                "t ≈ 16,80 anos (erro de base na equação logarítmica)."
              ],
              "respostaCorreta": 0,
              "explicacao": "P₀ · (1,05)⁻ᵗ = 0,5P₀ => (1,05)⁻ᵗ = 1/2 => (1,05)ᵗ = 2. Aplicando logaritmos decimais: t · log₁₀(1,05) = log₁₀(2) => t = log₁₀(2) / log₁₀(1,05) = 0,30103 / 0,02119 ≈ 14,206 ≈ 14,21 anos (pela Regra do 72: 72/5 = 14,4 anos)."
            }
          ]
        },
        {
          "id": "aula-04",
          "slug": "aula-04-progressao-aritmetica",
          "numero": 4,
          "titulo": "Aula 4: Progressão aritmética (PA)",
          "comeceAqui": "Uma PA é uma sequência em que cada termo é o anterior mais uma constante (razão r). Guardar R$ 50 por mês forma uma PA.",
          "ideiaCentral": "Termo geral: an = a1 + (n-1)r. Soma dos n termos: Sn = (a1 + an)n / 2.",
          "conceitosEssenciais": [
            {
              "conceito": "Razão (r)",
              "significado": "O passo fixo que se soma a cada termo"
            },
            {
              "conceito": "Termo geral (an)",
              "significado": "Fórmula para encontrar qualquer termo"
            },
            {
              "conceito": "Soma (Sn)",
              "significado": "Fórmula de Gauss para somar n termos"
            }
          ],
          "exemploResolvido": {
            "titulo": "Poupança Crescente em PA",
            "enunciado": "Guarda R$ 200 no 1º mês e aumenta R$ 20 por mês. Quanto deposita no mês 12 e quanto acumula?",
            "passos": [
              "1. a12 = 200 + (12-1) · 20 = 200 + 220 = R$ 420",
              "2. S12 = (200 + 420) · 12 / 2 = 620 · 6 = R$ 3.720"
            ],
            "resultado": "No 12º mês deposita R$ 420 e acumula R$ 3.720."
          },
          "pbl": {
            "titulo": "Comparando Estágios A e B",
            "cenario": "Plano A: R$ 800 iniciais + R$ 40/mês de aumento. Plano B: R$ 1.000 fixos sem aumento. Em 24 meses, qual paga mais no total?",
            "solucao": "Plano B total: 1000 × 24 = R$ 24.000. Plano A: a24 = 800 + 23 · 40 = 1720. SA = (800 + 1720) · 24 / 2 = R$ 30.240. O Plano A paga R$ 6.240 a mais no acumulado."
          },
          "resumo": [
            "PA: cada termo = anterior + razão.",
            "an = a1 + (n-1)r; Sn = (a1+an)n/2.",
            "Aparece em poupança sem juros, juros simples e amortização SAC."
          ],
          "quiz": [
            {
              "pergunta": "No financiamento imobiliário SAC de R$ 240.000,00 em 120 meses com juros de 1% ao mês sobre o saldo devedor, a amortização mensal é fixa em A = R$ 2.000,00. A 1ª parcela é P₁ = 2000 + 0,01 · 240000 = R$ 4.400,00. Como o saldo devedor cai R$ 2.000,00 ao mês, os juros reduzem R$ 20,00/mês, formando uma PA decrescente de razão r = -20. Qual é o valor da 60ª parcela (P₆₀)?",
              "opcoes": [
                "R$ 3.220,00",
                "R$ 3.200,00",
                "R$ 3.400,00",
                "R$ 2.980,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "Pela fórmula do termo geral da PA: aₙ = a₁ + (n - 1)r. Para a 60ª parcela: P₆₀ = P₁ + (60 - 1) · (-20) = 4400 + 59 · (-20) = 4400 - 1180 = R$ 3.220,00."
            },
            {
              "pergunta": "Um jovem planeja economizar por 12 meses em um plano crescente: no 1º mês deposita R$ 150,00 e, a cada mês subsequente, adiciona R$ 25,00 a mais do que no mês anterior. Quanto ele depositará no 12º mês (a₁₂) e qual será o montante total acumulado (S₁₂) ao final de 1 ano (sem juros)?",
              "opcoes": [
                "12º mês: R$ 425,00; Total acumulado: R$ 3.450,00.",
                "12º mês: R$ 450,00; Total acumulado: R$ 3.600,00.",
                "12º mês: R$ 425,00; Total acumulado: R$ 5.100,00.",
                "12º mês: R$ 400,00; Total acumulado: R$ 3.300,00."
              ],
              "respostaCorreta": 0,
              "explicacao": "Termo geral: a₁₂ = a₁ + (12 - 1)r = 150 + 11 · 25 = 150 + 275 = R$ 425,00. Soma dos termos (Fórmula de Gauss): S₁₂ = (a₁ + a₁₂) · n / 2 = (150 + 425) · 12 / 2 = 575 · 6 = R$ 3.450,00."
            },
            {
              "pergunta": "Uma dívida é liquidada através de n prestações mensais que constituem uma PA: a primeira parcela é de R$ 300,00 e cada parcela seguinte aumenta em R$ 50,00. Sabendo que o valor total desembolsado para quitar a dívida foi de R$ 6.900,00, em quantas parcelas (n) o débito foi pago?",
              "opcoes": [
                "12 parcelas.",
                "10 parcelas.",
                "14 parcelas.",
                "15 parcelas."
              ],
              "respostaCorreta": 0,
              "explicacao": "O n-ésimo termo é aₙ = 300 + (n - 1)50 = 250 + 50n. A soma é Sₙ = (a₁ + aₙ) · n / 2 = (300 + 250 + 50n) · n / 2 = (550 + 50n)n / 2 = 275n + 25n². Igualando a 6.900: 25n² + 275n - 6900 = 0 => n² + 11n - 276 = 0. Resolvendo a equação do 2º grau: n = 12 parcelas."
            },
            {
              "pergunta": "Lucas e Mateus decidem poupar durante 20 meses sem remuneração de juros:\n• Lucas poupa R$ 500,00 constantes todos os meses.\n• Mateus poupa R$ 200,00 no 1º mês e aumenta seu aporte em R$ 30,00 a cada mês (a₁ = 200, r = 30).\nAo final dos 20 meses, quem terá acumulado mais dinheiro e qual será a diferença?",
              "opcoes": [
                "Lucas acumulou mais, superando Mateus por uma diferença de R$ 300,00.",
                "Mateus acumulou mais, superando Lucas por uma diferença de R$ 700,00.",
                "Ambos acumularam exatamente a mesma quantia (R$ 10.000,00).",
                "Mateus acumulou mais, superando Lucas por uma diferença de R$ 400,00."
              ],
              "respostaCorreta": 0,
              "explicacao": "Total de Lucas: 20 · 500 = R$ 10.000,00. Total de Mateus: a₂₀ = 200 + 19 · 30 = R$ 770,00. Soma de Mateus: S₂₀ = (200 + 770) · 20 / 2 = R$ 9.700,00. Lucas acumulou R$ 10.000 - R$ 9.700 = R$ 300,00 a mais."
            },
            {
              "pergunta": "Um financiamento de R$ 60.000,00 é pago pelo SAC em 10 parcelas mensais com juros de 2% ao mês. A amortização mensal é fixa em A = R$ 6.000,00. A sequência mensal de juros pagos Jₖ = 0,02 · [60000 - (k - 1) · 6000] forma a PA (1200, 1080, 960, ..., 120). Qual é o total de juros pagos ao longo de todo o financiamento?",
              "opcoes": [
                "R$ 6.600,00",
                "R$ 12.000,00",
                "R$ 6.000,00",
                "R$ 7.200,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "A sequência de juros é uma PA finita com n = 10 termos: J₁ = 1200 e J₁₀ = 0,02 · 6000 = 120. A soma de todos os juros pagos é S₁₀ = (J₁ + J₁₀) · 10 / 2 = (1200 + 120) · 5 = R$ 6.600,00."
            }
          ]
        },
        {
          "id": "aula-05",
          "slug": "aula-05-progressao-geometrica",
          "numero": 5,
          "titulo": "Aula 5: Progressão geométrica (PG)",
          "comeceAqui": "Na PG, cada termo é o anterior vezes uma constante q. É a matemática dos juros compostos e aportes mensais.",
          "ideiaCentral": "Termo geral: an = a1 · q^(n-1). Soma dos n termos: Sn = a1(q^n - 1) / (q - 1). Soma infinita (|q|<1): S∞ = a1 / (1 - q).",
          "conceitosEssenciais": [
            {
              "conceito": "Razão (q)",
              "significado": "O fator multiplicativo (nos juros q = 1+i)"
            },
            {
              "conceito": "VF de Aportes Mensais",
              "significado": "VF = P · [(1+i)^n - 1] / i (soma de PG)"
            },
            {
              "conceito": "Perpetuidade",
              "significado": "Soma infinita usada em valuation: V = FC / i"
            }
          ],
          "exemploResolvido": {
            "titulo": "Aportes Mensais em 2 Anos",
            "enunciado": "Aporte de R$ 300/mês a 1% a.m. por 24 meses.",
            "passos": [
              "1. VF = 300 · [(1,01)²⁴ - 1] / 0,01",
              "2. VF = 300 · [1,2697 - 1] / 0,01 = 300 · 26,97 = R$ 8.091,90"
            ],
            "resultado": "Total acumulado: R$ 8.091,90 (R$ 7.200 em aportes + R$ 891,90 em juros)."
          },
          "pbl": {
            "titulo": "Consórcio vs Investimento PG",
            "cenario": "Consórcio: R$ 400/mês por 5 anos (60 meses) devolve R$ 24.000. Quanto renderia investir R$ 400/mês a 0,8% a.m.?",
            "solucao": "Investimento: VF = 400 · [(1,008)⁶⁰ - 1] / 0,008 ≈ 400 · 76,68 = R$ 30.672. O custo invisível do consórcio é a perda de R$ 6.672 em juros compostos."
          },
          "resumo": [
            "PG: cada termo = anterior × razão.",
            "VF de aportes mensais é a soma de uma PG.",
            "A soma infinita da PG é a base da perpetuidade no valuation."
          ],
          "quiz": [
            {
              "pergunta": "Uma empresa de tecnologia faturou R$ 100.000,00 em seu primeiro ano e projeta um crescimento anual composto de 20% ao ano nas receitas (razão q = 1,20). A série de receitas anuais constitui uma Progressão Geométrica. Qual é o faturamento projetado para o 5º ano de operação (a₅)? (Dado: 1,2⁴ = 2,0736).",
              "opcoes": [
                "R$ 207.360,00",
                "R$ 180.000,00",
                "R$ 248.832,00",
                "R$ 200.000,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "Pelo termo geral da PG: a₅ = a₁ · q⁴ = 100000 · (1,20)⁴ = 100000 · 2,0736 = R$ 207.360,00."
            },
            {
              "pergunta": "Um poupador realiza 12 depósitos mensais consecutivos de R$ 500,00 ao final de cada mês em uma conta remunerada a 1% ao mês (q = 1,01). O valor futuro acumulado é dado pela soma da PG: VF = 500 · [(1,01)¹² - 1] / 0,01. Sabendo que (1,01)¹² ≈ 1,126825, qual é o total acumulado e quanto desse montante corresponde unicamente aos juros compostos auferidos?",
              "opcoes": [
                "Total acumulado: R$ 6.341,25; Juros: R$ 341,25.",
                "Total acumulado: R$ 6.000,00; Juros: R$ 0,00.",
                "Total acumulado: R$ 6.760,95; Juros: R$ 760,95.",
                "Total acumulado: R$ 6.341,25; Juros: R$ 634,13."
              ],
              "respostaCorreta": 0,
              "explicacao": "VF = 500 · [(1,126825 - 1) / 0,01] = R$ 6.341,25. O total investido foi 12 · 500 = R$ 6.000,00. Juros = 6.341,25 - 6.000,00 = R$ 341,25."
            },
            {
              "pergunta": "Um Fundo Imobiliário (FII) distribui rendimentos mensais perpétuos e constantes de R$ 0,80 por cota. Admitindo uma taxa de desconto (custo de oportunidade) exigida pelo mercado de 0,8% ao mês (i = 0,008), calcule o valor justo da cota utilizando a soma da série geométrica infinita (modelo de perpetuidade V = D / i).",
              "opcoes": [
                "R$ 100,00",
                "R$ 80,00",
                "R$ 10,00",
                "R$ 1.000,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "Modelo de perpetuidade: V = D / i = 0,80 / 0,008 = R$ 100,00."
            },
            {
              "pergunta": "Pelo Modelo de Crescimento de Gordon (soma de PG infinita com razão q = (1+g)/(1+k) < 1), o preço justo de uma ação é P₀ = D₁ / (k - g). Se uma ação pagará dividendo projetado D₁ = R$ 6,00 no próximo ano, com taxa de crescimento perpétuo nos dividendos g = 4% a.a. e taxa de retorno requerida k = 10% a.a., qual é o preço justo da ação?",
              "opcoes": [
                "R$ 100,00",
                "R$ 60,00",
                "R$ 42,86",
                "R$ 150,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "P₀ = D₁ / (k - g) = 6,00 / (0,10 - 0,04) = 6,00 / 0,06 = R$ 100,00."
            },
            {
              "pergunta": "A cota de um fundo multimercado altamente volátil sofreu 3 desvalorizações mensais sucessivas e idênticas de 20% ao mês (razão geométrica q = 1 - 0,20 = 0,80). Ao final do 3º mês, qual percentual do patrimônio inicial restou e qual foi a perda acumulada total?",
              "opcoes": [
                "Restou 51,2% do valor inicial (perda acumulada de 48,8%).",
                "Restou 40,0% do valor inicial (perda acumulada de 60,0%).",
                "Restou 60,0% do valor inicial (perda acumulada de 40,0%).",
                "Restou 58,8% do valor inicial (perda acumulada de 41,2%)."
              ],
              "respostaCorreta": 0,
              "explicacao": "V₃ = V₀ · (0,80)³ = V₀ · 0,512 = 51,2% do valor inicial. Perda acumulada = 100% - 51,2% = 48,8%."
            }
          ]
        },
        {
          "id": "aula-06",
          "slug": "aula-06-somatorio",
          "numero": 6,
          "titulo": "Aula 6: Somatório (Σ)",
          "comeceAqui": "O símbolo Σ (sigma) é a abreviação matemática para somar uma sequência de termos.",
          "ideiaCentral": "Σ (k=1 a n) ak = a1 + a2 + ... + an. Usado no valuation (FCD) e na estatística.",
          "conceitosEssenciais": [
            {
              "conceito": "Índice (k)",
              "significado": "O contador que varia a cada passo"
            },
            {
              "conceito": "Limites",
              "significado": "Início (embaixo) e fim (em cima) do contador"
            },
            {
              "conceito": "Propriedade da constante",
              "significado": "Constante multiplicativa sai do somatório"
            }
          ],
          "exemploResolvido": {
            "titulo": "Valor Presente de 3 Fluxos",
            "enunciado": "Calcule Σ (t=1 a 3) 100 / (1,10)^t.",
            "passos": [
              "1. t=1: 100/1,10 = 90,91",
              "2. t=2: 100/1,21 = 82,64",
              "3. t=3: 100/1,331 = 75,13",
              "4. Soma = 90,91 + 82,64 + 75,13 = 248,68"
            ],
            "resultado": "VP total = R$ 248,68."
          },
          "pbl": {
            "titulo": "Projeção de Arrecadação",
            "cenario": "Venda de 40 doces na semana 1, crescendo 15% por semana por 10 semanas (lucro R$ 2 por doce). Escreva em somatório e calcule.",
            "solucao": "Lucro semanal L(k) = 2 · [40 · 1,15^(k-1)] = 80 · 1,15^(k-1). Total: Σ (k=1 a 10) 80 · 1,15^(k-1) = 80 · (1,15¹⁰ - 1) / 0,15 ≈ 80 · 20,30 = R$ 1.624,37."
          },
          "resumo": [
            "Σ abrevia somas extensas.",
            "Usado no cálculo de valor presente e médias estatísticas."
          ],
          "quiz": [
            {
              "pergunta": "Calcule o valor numérico exato do somatório finito expandido: Σ (k = 1 até 4) [3k² - 2k + 5].",
              "opcoes": [
                "90",
                "105",
                "70",
                "85"
              ],
              "respostaCorreta": 0,
              "explicacao": "Termo a termo: k=1: 6; k=2: 13; k=3: 26; k=4: 45. Soma = 6 + 13 + 26 + 45 = 90."
            },
            {
              "pergunta": "Sabendo que Σ (i = 1 até 20) xᵢ = 340, aplique as propriedades de linearidade do somatório e calcule o valor de Σ (i = 1 até 20) [2xᵢ - 15].",
              "opcoes": [
                "380",
                "665",
                "680",
                "365"
              ],
              "respostaCorreta": 0,
              "explicacao": "Σ(2xᵢ - 15) = 2 · Σ xᵢ - 20 · 15 = 2(340) - 300 = 680 - 300 = 380."
            },
            {
              "pergunta": "Um investimento promete pagar fluxos anuais de dividendos de R$ 1.100,00 no ano 1, R$ 1.210,00 no ano 2 e R$ 1.331,00 no ano 3. Utilizando uma taxa de desconto intertemporal de 10% ao ano (i = 0,10), calcule o Valor Presente total expresso por VP = Σ (t = 1 até 3) [FCₜ / (1,10)ᵗ].",
              "opcoes": [
                "R$ 3.000,00",
                "R$ 3.641,00",
                "R$ 3.310,00",
                "R$ 2.727,27"
              ],
              "respostaCorreta": 0,
              "explicacao": "VP = 1100/1,10 + 1210/1,21 + 1331/1,331 = 1000 + 1000 + 1000 = R$ 3.000,00."
            },
            {
              "pergunta": "Um projeto empresarial exige um aporte inicial I₀ = R$ 5.000,00 no instante t = 0 e gera fluxos de caixa de R$ 2.200,00 no ano 1 e R$ 3.630,00 no ano 2. Considerando uma Taxa Mínima de Atratividade (TMA) de 10% ao ano, calcule o Valor Presente Líquido VPL = -I₀ + Σ (t = 1 até 2) [FCₜ / (1,10)ᵗ] e interprete o resultado.",
              "opcoes": [
                "VPL = R$ 0,00; o projeto remunera exatamente a taxa exigida de 10% a.a. (a TIR é igual à TMA).",
                "VPL = +R$ 830,00; o projeto gera lucro excedente significativo.",
                "VPL = -R$ 300,00; o projeto deve ser sumariamente rejeitado por gerar prejuízo.",
                "VPL = +R$ 500,00; o projeto supera a TMA em 10 pontos percentuais."
              ],
              "respostaCorreta": 0,
              "explicacao": "VPL = -5000 + 2200/1,10 + 3630/1,21 = -5000 + 2000 + 3000 = R$ 0,00."
            },
            {
              "pergunta": "A receita trimestral acumulada de uma filial é representada por S = Σ (t = 3 até 6) [40t - 20]. Realizando uma mudança de variável no somatório com j = t - 2 (de modo que j varie de 1 até 4), qual é a expressão algébrica equivalente do somatório em j e qual é o valor total de S?",
              "opcoes": [
                "Σ (j = 1 até 4) [40j + 60] = 640",
                "Σ (j = 1 até 4) [40j - 20] = 320",
                "Σ (j = 1 até 4) [40j - 100] = 0",
                "Σ (j = 1 até 4) [40j + 60] = 580"
              ],
              "respostaCorreta": 0,
              "explicacao": "Para t = j + 2: 40(j + 2) - 20 = 40j + 60. Soma de j=1 a 4: 100 + 140 + 180 + 220 = 640."
            }
          ]
        },
        {
          "id": "aula-07",
          "slug": "aula-07-produtorio",
          "numero": 7,
          "titulo": "Aula 7: Produtório (Π)",
          "comeceAqui": "O símbolo Π (pi) manda multiplicar termos em sequência. Em finanças, retornos não se somam, se multiplicam.",
          "ideiaCentral": "R_acumulado = Π (t=1 a n) (1 + r_t) - 1. Subir 50% e cair 50% não empata: resulta em perda de 25%.",
          "conceitosEssenciais": [
            {
              "conceito": "Fator de retorno",
              "significado": "1 + r (retorno de +10% vira 1,10; -10% vira 0,90)"
            },
            {
              "conceito": "Assimetria das perdas",
              "significado": "Uma queda de 50% exige alta de 100% para recuperar"
            }
          ],
          "exemploResolvido": {
            "titulo": "Retorno Acumulado no Trimestre",
            "enunciado": "Retornos mensais: +4%, -2%, +5%. Calcule o acumulado.",
            "passos": [
              "1. Fatores: 1,04 × 0,98 × 1,05",
              "2. Produto = 1,07016",
              "3. Retorno = 1,07016 - 1 = 7,016%"
            ],
            "resultado": "Retorno acumulado: +7,016% (diferente da soma ingênua de 7%)."
          },
          "pbl": {
            "titulo": "Desmistificando o Influenciador",
            "cenario": "Influenciador diz: 'Rendeu 10% a.m. por 6 meses, total de 60%!'. Qual o valor real?",
            "solucao": "Produtório: (1,10)⁶ = 1,77156. O retorno real acumulado é de 77,16%, não 60%. A soma subestima o resultado dos juros compostos acumulados."
          },
          "resumo": [
            "Π representa multiplicação em sequência.",
            "Retornos acumulados exigem produtório de fatores (1+r).",
            "Perdas exigem altas percentualmente maiores para serem recuperadas."
          ],
          "quiz": [
            {
              "pergunta": "Uma carteira de ações registrou a seguinte sequência de rendimentos mensais: +10% no mês 1 (r₁ = 0,10), -10% no mês 2 (r₂ = -0,10), +20% no mês 3 (r₃ = 0,20) e -20% no mês 4 (r₄ = -0,20). Utilizando o produtório de fatores R_acum = Π (t = 1 até 4) (1 + rₜ) - 1, qual foi o retorno acumulado real no quadrimestre?",
              "opcoes": [
                "-4,96% (prejuízo real acumulado de 4,96%).",
                "0,00% (empate exato pela soma linear das porcentagens).",
                "-5,00% (aproximação sem cálculo composto).",
                "+1,04% (erro de troca de sinais multiplicativos)."
              ],
              "respostaCorreta": 0,
              "explicacao": "R_acum = (1,10 · 0,90 · 1,20 · 0,80) - 1 = (0,99 · 0,96) - 1 = 0,9504 - 1 = -0,0496 = -4,96%."
            },
            {
              "pergunta": "Em um crash de mercado, um ativo financeiro sofre uma desvalorização de 40% (r₁ = -0,40). Para que o investidor recupere integralmente o capital inicial no período seguinte (ou seja, R_acum = 0%, o que exige (1 + r₁)(1 + r₂) = 1), qual deve ser a taxa percentual de valorização r₂ necessária?",
              "opcoes": [
                "+66,67%",
                "+40,00%",
                "+50,00%",
                "+80,00%"
              ],
              "respostaCorreta": 0,
              "explicacao": "(1 - 0,40) · (1 + r₂) = 1 => 0,60(1 + r₂) = 1 => 1 + r₂ = 1 / 0,60 = 1,6667 => r₂ = +66,67%."
            },
            {
              "pergunta": "Um investimento de risco dobrou de valor no 1º ano (+100%, r₁ = 1,00) e despencou 50% no 2º ano (-50%, r₂ = -0,50). Calcule a taxa média aritmética anual e a taxa média geométrica anual (taxa equivalente real composta) desse período.",
              "opcoes": [
                "Média aritmética = +25,0% ao ano; Média geométrica = 0,0% ao ano.",
                "Média aritmética = +25,0% ao ano; Média geométrica = +25,0% ao ano.",
                "Média aritmética = +50,0% ao ano; Média geométrica = +10,0% ao ano.",
                "Média aritmética = 0,0% ao ano; Média geométrica = -25,0% ao ano."
              ],
              "respostaCorreta": 0,
              "explicacao": "Fator acumulado = 2,00 · 0,50 = 1,00 => retorno acumulado 0% => média geométrica = 0,0% a.a. Média aritmética = (100% - 50%)/2 = +25,0% a.a."
            },
            {
              "pergunta": "Determine o valor numérico exato do produtório com cancelamento telescópico sucessivo: P = Π (k = 2 até 10) [1 - (1/k)] = (1 - 1/2) · (1 - 1/3) · (1 - 1/4) · ... · (1 - 1/10).",
              "opcoes": [
                "1/10 (ou 0,10)",
                "1/20 (ou 0,05)",
                "9/10 (ou 0,90)",
                "1/2 (ou 0,50)"
              ],
              "respostaCorreta": 0,
              "explicacao": "P = (1/2) · (2/3) · (3/4) · ... · (9/10) = 1/10 = 0,10."
            },
            {
              "pergunta": "Sabendo que Π (i = 1 até 5) xᵢ = 8, aplique as propriedades de potenciação do operador produtório e calcule o valor de Π (i = 1 até 5) [2xᵢ].",
              "opcoes": [
                "256",
                "16",
                "80",
                "64"
              ],
              "respostaCorreta": 0,
              "explicacao": "Π [2xᵢ] = 2⁵ · Π xᵢ = 32 · 8 = 256."
            }
          ]
        },
        {
          "id": "aula-08",
          "slug": "aula-08-probabilidade-fundamentos",
          "numero": 8,
          "titulo": "Aula 8: Probabilidade — fundamentos",
          "comeceAqui": "Probabilidade é a régua para medir a incerteza no mercado financeiro.",
          "ideiaCentral": "P(evento) = casos favoráveis / casos possíveis (entre 0 e 1). P(não A) = 1 - P(A). Eventos independentes: P(A e B) = P(A) · P(B).",
          "conceitosEssenciais": [
            {
              "conceito": "Espaço amostral (Ω)",
              "significado": "Todos os resultados possíveis"
            },
            {
              "conceito": "Evento complementar",
              "significado": "P(não A) = 1 - P(A)"
            },
            {
              "conceito": "Independência",
              "significado": "Ocorrer A não altera a probabilidade de B"
            }
          ],
          "exemploResolvido": {
            "titulo": "Probabilidade Histórica de Alta",
            "enunciado": "Bolsa sobe em 60% dos meses (P=0,6), meses independentes. Qual a chance de 2 meses seguidos de alta?",
            "passos": [
              "1. P(alta e alta) = 0,6 × 0,6 = 0,36 (36%)",
              "2. Chance de pelo menos uma alta em 2 meses = 1 - P(duas quedas) = 1 - (0,4 × 0,4) = 84%"
            ],
            "resultado": "36% para 2 altas seguidas; 84% para pelo menos 1 alta."
          },
          "pbl": {
            "titulo": "Análise da Falácia do Apostador",
            "cenario": "Ação caiu 4 dias seguidos. Um colega diz 'vai cair amanhã de novo'. Outro diz 'vai subir com certeza porque caiu demais'. O que a probabilidade diz?",
            "solucao": "Se os dias forem independentes, a chance do 5º dia é a mesma de qualquer outro dia (ex: 50%). A história dos últimos 4 dias não altera a probabilidade do próximo lançamento sob independência."
          },
          "resumo": [
            "Probabilidade mede a incerteza de 0 a 1.",
            "Eventos independentes multiplicam suas probabilidades.",
            "Em crises, a suposição de independência pode falhar quando ativos caem juntos."
          ],
          "quiz": [
            {
              "pergunta": "Um investidor distribui seu capital entre 3 debêntures independentes. A probabilidade de calote (default) em 1 ano de cada debênture é de 5% (P(D) = 0,05). Qual é a probabilidade exata de que PELO MENOS UMA das três debêntures sofra calote?",
              "opcoes": [
                "14,2625%",
                "15,0000%",
                "0,0125%",
                "85,7375%"
              ],
              "respostaCorreta": 0,
              "explicacao": "P(nenhum calote) = (0,95)³ = 0,857375. P(pelo menos 1 calote) = 1 - 0,857375 = 0,142625 = 14,2625%."
            },
            {
              "pergunta": "O preço de uma ação oscila a cada pregão de forma que a probabilidade de alta diária é de 50% (P(Alta) = 0,50), com pregões estatisticamente independentes. Se a ação fechou em queda por 5 dias consecutivos, qual é a probabilidade de ela fechar em alta no 6º dia e qual fundamento teórico sustenta a resposta?",
              "opcoes": [
                "50%; pela independência estatística, o histórico passado não altera a probabilidade do evento futuro (a crença no oposto é a Falácia do Apostador).",
                "Superior a 80%; pois a teoria da reversão à média exige uma correção imediata de preços.",
                "Inferior a 20%; porque a inércia descendente do mercado reduz a chance de alta.",
                "3,125%; que corresponde à probabilidade conjunta calculada por (0,5)⁵."
              ],
              "respostaCorreta": 0,
              "explicacao": "Pela independência estocástica, cada dia tem probabilidade 50% independente do histórico."
            },
            {
              "pergunta": "Um banco analisou 100 pedidos de financiamento: 60 vieram de pequenas empresas e 40 de pessoas físicas. Foram aprovados 15 pedidos de empresas e 25 de pessoas físicas (totalizando 40 pedidos aprovados). Se um pedido aprovado for sorteado aleatoriamente, qual é a probabilidade condicional de que ele pertença a uma pequena empresa?",
              "opcoes": [
                "37,5%",
                "25,0%",
                "15,0%",
                "60,0%"
              ],
              "respostaCorreta": 0,
              "explicacao": "P(Empresa | Aprovado) = 15 / 40 = 37,5%."
            },
            {
              "pergunta": "Um comitê econômico estima que, para o próximo trimestre, a probabilidade de alta na taxa Selic é de 40% (P(S) = 0,40), a de valorização do Dólar é de 30% (P(D) = 0,30) e a de ocorrência de ambos simultaneamente é de 12% (P(S ∩ D) = 0,12). Qual é a probabilidade de ocorrer PELO MENOS UM desses eventos econômicos (P(S ∪ D))?",
              "opcoes": [
                "58%",
                "70%",
                "12%",
                "42%"
              ],
              "respostaCorreta": 0,
              "explicacao": "P(S ∪ D) = P(S) + P(D) - P(S ∩ D) = 0,40 + 0,30 - 0,12 = 58%."
            },
            {
              "pergunta": "Um robô de investimentos em renda variável opera com taxa histórica de acerto de 60% por operação (p = 0,60), com trades estatisticamente independentes. Em uma sequência de exatamente 3 operações, qual é a probabilidade binomial de o robô obter EXATAMENTE 2 acertos e 1 erro?",
              "opcoes": [
                "43,2%",
                "14,4%",
                "36,0%",
                "21,6%"
              ],
              "respostaCorreta": 0,
              "explicacao": "P(X = 2) = C(3,2) · (0,60)² · (0,40)¹ = 3 · 0,36 · 0,40 = 0,432 = 43,2%."
            }
          ]
        },
        {
          "id": "aula-09",
          "slug": "aula-09-valor-esperado",
          "numero": 9,
          "titulo": "Aula 9: Valor esperado e análise de cenários",
          "comeceAqui": "O valor esperado une probabilidade com retorno em dinheiro para orientar decisões racionais.",
          "ideiaCentral": "E[X] = Σ p_k · x_k. É a média dos resultados ponderada pelas probabilidades de cada cenário.",
          "conceitosEssenciais": [
            {
              "conceito": "Valor Esperado E[X]",
              "significado": "Média ponderada pelas probabilidades"
            },
            {
              "conceito": "Cenários",
              "significado": "Otimista, base e pessimista"
            }
          ],
          "exemploResolvido": {
            "titulo": "Retorno Esperado da Ação",
            "enunciado": "Cenários: Otimista (25%, +40%), Base (55%, +12%), Pessimista (20%, -30%).",
            "passos": [
              "1. E[R] = 0,25(40) + 0,55(12) + 0,20(-30)",
              "2. E[R] = 10 + 6,6 - 6 = +10,6%"
            ],
            "resultado": "Retorno esperado = +10,6%."
          },
          "pbl": {
            "titulo": "Escolha entre Projeto A e B",
            "cenario": "Projeto A: 90% chance ganho R$ 200, 10% perda R$ 100. Projeto B: 30% ganho R$ 1.500, 70% perda R$ 300. Qual escolher?",
            "solucao": "E[A] = 0,9(200) + 0,1(-100) = R$ 170. E[B] = 0,3(1500) + 0,7(-300) = R$ 240. B tem E[X] maior, mas A tem risco de perda muito menor (10% vs 70%). A escolha depende da tolerância a risco e capital disponível."
          },
          "resumo": [
            "E[X] = Σ p_k x_k é a média dos futuros possíveis.",
            "Desmascara loterias e precifica cenários de investimento.",
            "Decisões exigem olhar o E[X] e a capacidade de sobreviver ao pior cenário."
          ],
          "quiz": [
            {
              "pergunta": "Uma gestora de fundos projeta o retorno trimestral de uma ação através de 3 cenários econômicos mutuamente exclusivos:\n• Cenário Otimista (p₁ = 20%): retorno de +35%\n• Cenário Base (p₂ = 50%): retorno de +12%\n• Cenário Pessimista (p₃ = 30%): retorno de -15%\nQual é o Retorno Esperado E[R] ponderado pelas probabilidades de ocorrência?",
              "opcoes": [
                "+8,5%",
                "+10,6%",
                "+11,0%",
                "+7,0%"
              ],
              "respostaCorreta": 0,
              "explicacao": "E[R] = (0,20 · 35) + (0,50 · 12) + (0,30 · (-15)) = 7,0 + 6,0 - 4,5 = +8,5%."
            },
            {
              "pergunta": "Uma seguradora cobre um armazém avaliado em R$ 500.000,00. A probabilidade estimada de incêndio total (sinistro) em 1 ano é de 1,2% (p = 0,012), e a de nenhum dano é de 98,8%. Calcule: (1) O prêmio puro atuarial (esperança da indenização paga) e (2) O lucro esperado da seguradora se ela cobrar uma apólice de R$ 8.500,00.",
              "opcoes": [
                "Prêmio puro: R$ 6.000,00; Lucro esperado: R$ 2.500,00.",
                "Prêmio puro: R$ 6.000,00; Lucro esperado: R$ 8.500,00.",
                "Prêmio puro: R$ 1.200,00; Lucro esperado: R$ 7.300,00.",
                "Prêmio puro: R$ 5.000,00; Lucro esperado: R$ 3.500,00."
              ],
              "respostaCorreta": 0,
              "explicacao": "Prêmio puro = 0,012 · 500.000 = R$ 6.000,00. Lucro esperado = 8.500 - 6.000 = R$ 2.500,00."
            },
            {
              "pergunta": "O ganho líquido Y (em milhares de reais) de uma assessoria financeira sobre a rentabilidade bruta X de uma carteira segue a transformação linear Y = 0,20X - 10, onde 0,20 é a taxa de sucesso (20%) e 10 representa os custos operacionais fixos. Sabendo que o retorno bruto esperado da carteira é E[X] = 180 mil reais, qual é o ganho líquido esperado E[Y]?",
              "opcoes": [
                "26 mil reais (R$ 26.000,00).",
                "36 mil reais (R$ 36.000,00).",
                "28 mil reais (R$ 28.000,00).",
                "16 mil reais (R$ 16.000,00)."
              ],
              "respostaCorreta": 0,
              "explicacao": "E[Y] = 0,20 · E[X] - 10 = 0,20(180) - 10 = 36 - 10 = 26 mil reais (R$ 26.000,00)."
            },
            {
              "pergunta": "Um investidor com patrimônio de R$ 10.000,00 recebe a proposta de aplicar todo o seu dinheiro num projeto com 80% de chance de lucrar +50% (+R$ 5.000,00) e 20% de chance de perda total (-100%, -R$ 10.000,00). Calcule o valor esperado monetário E[X] e explique por que a gestão de risco prudente rejeita a alocação de 100% do capital.",
              "opcoes": [
                "E[X] = +R$ 2.000,00; embora o valor esperado seja positivo, o risco de ruína total (20%) é inaceitável pois elimina o investidor do mercado de forma irreversível.",
                "E[X] = -R$ 1.000,00; a aposta é matematicamente desvantajosa e por isso deve ser rejeitada.",
                "E[X] = +R$ 4.000,00; como a probabilidade de ganho é muito alta (80%), a aposta total é segura.",
                "E[X] = +R$ 2.000,00; qualquer investidor racional deve sempre apostar tudo quando E[X] > 0."
              ],
              "respostaCorreta": 0,
              "explicacao": "E[X] = 0,80(+5000) + 0,20(-10000) = +R$ 2.000,00. O risco de ruína (ir a zero) impede o reinvestimento (não-ergodicidade)."
            },
            {
              "pergunta": "Uma empresa deve escolher entre dois projetos de expansão com orçamentos equivalentes:\n• Projeto Alfa: 60% de chance de gerar R$ 800.000,00 de lucro e 40% de chance de gerar R$ 200.000,00 de lucro.\n• Projeto Beta: 30% de chance de gerar R$ 1.800.000,00 de lucro e 70% de chance de gerar R$ 100.000,00 de lucro.\nCalcule o valor esperado de lucro de cada projeto e determine qual oferece o maior retorno médio esperado.",
              "opcoes": [
                "E[Alfa] = R$ 560.000,00 e E[Beta] = R$ 610.000,00; o Projeto Beta tem maior valor esperado.",
                "E[Alfa] = R$ 560.000,00 e E[Beta] = R$ 540.000,00; o Projeto Alfa tem maior valor esperado.",
                "E[Alfa] = R$ 500.000,00 e E[Beta] = R$ 950.000,00; o Projeto Beta tem maior valor esperado.",
                "E[Alfa] = R$ 600.000,00 e E[Beta] = R$ 610.000,00; o Projeto Beta tem maior valor esperado."
              ],
              "respostaCorreta": 0,
              "explicacao": "E[Alfa] = 0,60(800k) + 0,40(200k) = R$ 560.000,00. E[Beta] = 0,30(1800k) + 0,70(100k) = R$ 610.000,00. O Projeto Beta tem maior valor esperado."
            }
          ]
        }
      ]
    },
    {
      "id": "modulo-4",
      "slug": "modulo-4-estatistica",
      "numero": 4,
      "titulo": "Módulo 4: Estatística e Regressão Linear",
      "descricao": "Amostras, médias, mediana, dispersão, z-score, covariância, correlação e regressão linear.",
      "aulas": [
        {
          "id": "aula-01",
          "slug": "aula-01-dados-populacao-amostra",
          "numero": 1,
          "titulo": "Aula 1: Dados, população e amostra",
          "comeceAqui": "Estatística extrai conclusões de dados. A primeira regra é saber a diferença entre tudo (população) e a parte observada (amostra).",
          "ideiaCentral": "População é o universo completo; amostra é a parte observável. Vieses de seleção e amostras pequenas fabricam conclusões falsas.",
          "conceitosEssenciais": [
            {
              "conceito": "População",
              "significado": "Conjunto completo sob estudo"
            },
            {
              "conceito": "Amostra",
              "significado": "Subconjunto de onde tiramos dados"
            },
            {
              "conceito": "Viés de sobrevivência",
              "significado": "Analisar só quem sobreviveu (ex: ignorar fundos falidos)"
            }
          ],
          "exemploResolvido": {
            "titulo": "Identificação de Amostra e Viés",
            "enunciado": "Análise de retornos de um ETF usando os últimos 60 meses.",
            "passos": [
              "1. Variável: retorno mensal (%) - quantitativa contínua.",
              "2. Amostra: 60 meses. População: todos os meses passados e futuros.",
              "3. Limitação: 60 meses é pouco para capturar grandes crises de longo prazo."
            ],
            "resultado": "Estudo válido como estimativa pontual com limitações declaradas."
          },
          "pbl": {
            "titulo": "Perguntas Céticas sobre Anúncio de Carteira",
            "cenario": "Canal anuncia: 'Nossa carteira rendeu o dobro do CDI nos últimos 3 anos'. Que perguntas fazer sobre a amostra?",
            "solucao": "1. Qual foi exatamente o período de 3 anos? 2. A amostra incluiu ações deslistadas? 3. Quantas trocas foram feitas na carteira? 4. Como foi calculada a rentabilidade (líquida de custos)? 5. Qual foi a volatilidade (risco) nesse período?"
          },
          "resumo": [
            "Estatística conclui sobre populações usando amostras.",
            "Cuidado com viés de sobrevivência e amostras pequenas.",
            "Declare limitações antes de calcular."
          ],
          "quiz": [
            {
              "pergunta": "Classifique as seguintes variáveis financeiras quanto à sua natureza: (1) Setor econômico da empresa na B3; (2) Dividend Yield dos últimos 12 meses (em %); (3) Número total de acionistas cadastrados.",
              "opcoes": [
                "(1) Qualitativa nominal; (2) Quantitativa contínua; (3) Quantitativa discreta.",
                "(1) Quantitativa contínua; (2) Qualitativa ordinal; (3) Quantitativa contínua.",
                "(1) Qualitativa ordinal; (2) Quantitativa discreta; (3) Quantitativa contínua.",
                "(1) Qualitativa nominal; (2) Quantitativa discreta; (3) Quantitativa contínua."
              ],
              "respostaCorreta": 0,
              "explicacao": "Setor econômico é categoria sem ordem (qualitativa nominal); Dividend yield é percentual contínuo com casas decimais (quantitativa contínua); Número de acionistas é contagem inteira (quantitativa discreta)."
            },
            {
              "pergunta": "Um grande banco pretende estimar a taxa média de inadimplência de seus 10 milhões de clientes de cartão de crédito. Para isso, o analista coleta dados de 2.000 clientes exclusivamente de agências situadas em bairros nobres da capital. Qual é a população, qual é a amostra e que problema metodológico compromete a pesquisa?",
              "opcoes": [
                "População: 10 milhões de clientes; Amostra: 2.000 clientes; Problema: Viés de seleção/amostral (amostra não representativa que subestima a inadimplência real).",
                "População: 2.000 clientes; Amostra: 10 milhões de clientes; Problema: Amostra excessivamente grande.",
                "População: 10 milhões de clientes; Amostra: 2.000 clientes; Problema: A pesquisa é perfeitamente válida pois 2.000 é um número suficiente.",
                "População: Bairros nobres; Amostra: 10 milhões de clientes; Problema: Viés de sobrevivência."
              ],
              "respostaCorreta": 0,
              "explicacao": "A população é o universo total de 10 milhões de correntistas. A amostra são os 2.000 clientes observados. Restringir a amostra a bairros nobres gera viés de seleção grave, pois o perfil de renda é muito superior à média nacional, subestimando o risco de crédito."
            },
            {
              "pergunta": "Um estudo divulga: 'A rentabilidade média dos fundos de ações brasileiros nos últimos 15 anos foi de 14% ao ano, superando com folga o CDI'. Ao analisar a base de dados, nota-se que foram incluídos apenas os fundos abertos e ativos hoje, excluindo fundos que quebraram ou foram liquidados por perdas catastróficas. Que viés estatístico inflou o retorno divulgado?",
              "opcoes": [
                "Viés de sobrevivência (Survivorship bias).",
                "Viés de confirmação psicológica.",
                "Falácia da conjunção.",
                "Viés de ancoragem temporal."
              ],
              "respostaCorreta": 0,
              "explicacao": "O viés de sobrevivência ocorre quando apenas os fundos bem-sucedidos que sobreviveram até o presente momento permanecem na base de dados, excluindo os fundos perdedores e falidos, o que infla artificialmente o desempenho médio histórico da indústria."
            },
            {
              "pergunta": "Qual das seguintes séries de dados financeiros representa legitimamente uma 'Série Temporal' e qual representa um 'Corte Transversal' (Cross-Sectional)?",
              "opcoes": [
                "Série temporal: Cotação diária do dólar nos últimos 365 dias; Corte transversal: Múltiplo P/L de todas as empresas do Ibovespa no fechamento de ontem.",
                "Série temporal: Balanço patrimonial de 100 empresas em 2024; Corte transversal: Histórico de inflação IPCA de 2000 a 2024.",
                "Série temporal: Comparação de ROE entre 20 bancos hoje; Corte transversal: Cotação minuto a minuto de PETR4.",
                "Ambas representam séries temporais puras sem distinção metodológica."
              ],
              "respostaCorreta": 0,
              "explicacao": "Série temporal rastreia a mesma variável ao longo de sucessivos pontos no tempo (ex: cotação do dólar ao longo de 365 dias). Corte transversal compara múltiplos indivíduos/empresas observados no mesmo instante fixo de tempo (ex: P/L de todas as empresas ontem)."
            },
            {
              "pergunta": "Um relatório de marketing afirma: 'Nossa carteira recomendada rendeu 40% nos últimos 10 meses!'. Ao investigar a amostra, descobre-se que o período escolhido iniciou exatamente no vale de um crash de mercado e terminou no topo histórico. Que distorção metodológica foi empregada?",
              "opcoes": [
                "Viés de período (Cherry-picking de datas para forçar um resultado artificialmente favorável).",
                "Viés de amostra pequena apenas.",
                "Viés de variável omitida quantitativa.",
                "Erro de arredondamento amostral."
              ],
              "respostaCorreta": 0,
              "explicacao": "O viés de período (cherry-picking) consiste em selecionar intencionalmente as datas de início e fim da amostra para coincidir com anomalias de mercado (ex: comprar no fundo do pânico e vender no pico de euforia), distorcendo a expectativa de longo prazo."
            }
          ]
        },
        {
          "id": "aula-02",
          "slug": "aula-02-medias",
          "numero": 2,
          "titulo": "Aula 2: Médias — aritmética, ponderada e geométrica",
          "comeceAqui": "Usar a média errada em finanças produz respostas erradas com cara de certas.",
          "ideiaCentral": "Aritmética = soma/n. Ponderada = Σ p_k x_k / Σ p_k (carteiras). Geométrica = ⁿ√(x1·x2...xn) (retornos compostos). Aritmética > Geométrica quando há volatilidade.",
          "conceitosEssenciais": [
            {
              "conceito": "Média Aritmética",
              "significado": "Soma dividida pela quantidade de itens"
            },
            {
              "conceito": "Média Ponderada",
              "significado": "Cada item multiplicado por seu peso"
            },
            {
              "conceito": "Média Geométrica",
              "significado": "Raiz enésima do produto dos fatores (1+r) — a única correta para juros compostos"
            }
          ],
          "exemploResolvido": {
            "titulo": "Média Geométrica vs Aritmética de Retornos",
            "enunciado": "Fundo rendeu +50% no ano 1 e -50% no ano 2.",
            "passos": [
              "1. Média aritmética: (+50% - 50%) / 2 = 0% a.a.",
              "2. Fatores: 1,50 × 0,50 = 0,75 (perda real de 25%)",
              "3. Média geométrica: √(0,75) = 0,866 → -13,4% a.a."
            ],
            "resultado": "A média geométrica (-13,4% a.a.) reflete a realidade; a aritmética (0%) engana."
          },
          "pbl": {
            "titulo": "Verificando o Anúncio do Fundo",
            "cenario": "Fundo divulga 'retorno médio de 12% a.a.' com retornos anuais de +60%, -25%, +40%, -27%. Qual a média geométrica real?",
            "solucao": "Média aritmética: (60 - 25 + 40 - 27)/4 = 12% a.a. Fatores: 1,60 × 0,75 × 1,40 × 0,73 = 1,2264. Média geométrica: ⁴√(1,2264) ≈ 1,0524 → +5,24% a.a. O anúncio inflou o retorno em mais de 2 vezes usando a média errada."
          },
          "resumo": [
            "Aritmética para itens isolados; Ponderada para carteiras; Geométrica para retornos compostos.",
            "Com volatilidade, média aritmética > geométrica sempre."
          ],
          "quiz": [
            {
              "pergunta": "Um fundo de investimento de alta volatilidade apresentou retornos de +50% no ano 1 (r₁ = +0,50) e -50% no ano 2 (r₂ = -0,50). Calcule a média aritmética simples anual e a taxa média geométrica anual efetiva composta auferida pelo cotista.",
              "opcoes": [
                "Média aritmética = 0,0% ao ano; Média geométrica = -13,4% ao ano (o investidor perdeu 25% no total).",
                "Média aritmética = 0,0% ao ano; Média geométrica = 0,0% ao ano (o investidor empatou).",
                "Média aritmética = +25,0% ao ano; Média geométrica = 0,0% ao ano.",
                "Média aritmética = -25,0% ao ano; Média geométrica = -50,0% ao ano."
              ],
              "respostaCorreta": 0,
              "explicacao": "Média aritmética: (50% - 50%) / 2 = 0,0% a.a. Fator acumulado: (1 + 0,50)(1 - 0,50) = 1,50 · 0,50 = 0,75 (perda acumulada de 25%). Média geométrica: (1 + r_g)² = 0,75 => 1 + r_g = √0,75 ≈ 0,8660 => r_g = 0,8660 - 1 = -0,134 = -13,4% a.a. A média aritmética esconde o prejuízo real."
            },
            {
              "pergunta": "Um investidor possui uma carteira de R$ 100.000,00 alocada em 3 classes de ativos:\n• 50% em Renda Fixa Selic com rendimento de +11% ao ano;\n• 30% em Títulos IPCA+ com rendimento de +7% ao ano;\n• 20% em Ações com rendimento de -12% ao ano.\nQual é a rentabilidade média ponderada anual da carteira total?",
              "opcoes": [
                "+5,2% ao ano.",
                "+2,0% ao ano (média aritmética simples).",
                "+7,0% ao ano.",
                "+6,1% ao ano."
              ],
              "respostaCorreta": 0,
              "explicacao": "Retorno da carteira é a média ponderada pelos pesos percentuais: R_p = (0,50 · 11) + (0,30 · 7) + (0,20 · (-12)) = 5,5 + 2,1 - 2,4 = +5,2% ao ano. A média aritmética simples ignoraria os pesos e daria (11 + 7 - 12) / 3 = +2,0%."
            },
            {
              "pergunta": "Um investidor comprou ações de uma empresa em 3 lotes diferentes ao longo do mês:\n• Lote 1: 200 ações a R$ 20,00 cada;\n• Lote 2: 300 ações a R$ 25,00 cada;\n• Lote 3: 500 ações a R$ 30,00 cada.\nQual é o Preço Médio Ponderado de compra por ação para fins de apuração de Imposto de Renda?",
              "opcoes": [
                "R$ 26,50",
                "R$ 25,00 (média aritmética simples)",
                "R$ 27,20",
                "R$ 28,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "Custo total desembolsado = (200 · 20) + (300 · 25) + (500 · 30) = 4.000 + 7.500 + 15.000 = R$ 26.500,00. Quantidade total de ações = 200 + 300 + 500 = 1.000 ações. Preço médio = 26.500 / 1.000 = R$ 26,50 por ação."
            },
            {
              "pergunta": "Um ativo registrou a seguinte série de retornos anuais consecutivos: +20% no ano 1 (fator 1,20), +10% no ano 2 (fator 1,10) e -8% no ano 3 (fator 0,92). Sabendo que 1,20 · 1,10 · 0,92 = 1,2144 e que ∛1,2144 ≈ 1,0669, determine a taxa média geométrica anual e compare com a média aritmética.",
              "opcoes": [
                "Média geométrica = +6,69% ao ano; Média aritmética = +7,33% ao ano.",
                "Média geométrica = +7,33% ao ano; Média aritmética = +6,69% ao ano.",
                "Média geométrica = +6,69% ao ano; Média aritmética = +6,69% ao ano.",
                "Média geométrica = +21,44% ao ano; Média aritmética = +7,33% ao ano."
              ],
              "respostaCorreta": 0,
              "explicacao": "Média geométrica: 1 + r_g = ∛(1,20 · 1,10 · 0,92) = ∛1,2144 ≈ 1,0669 => r_g = +6,69% a.a. Média aritmética: (20 + 10 - 8) / 3 = 22 / 3 ≈ +7,33% a.a. Pela desigualdade das médias, sempre que houver dispersão nos retornos, a média aritmética supera a média geométrica."
            },
            {
              "pergunta": "Um capital aplicado em uma empresa dobrou de valor após 5 anos (fator acumulado = 2,00). Sabendo que ∜2 ≈ 1,1487, qual foi a taxa média geométrica de rentabilidade anual auferida?",
              "opcoes": [
                "~14,87% ao ano.",
                "20,00% ao ano (cálculo linear 100% / 5).",
                "10,00% ao ano.",
                "25,92% ao ano."
              ],
              "respostaCorreta": 0,
              "explicacao": "(1 + r_g)⁵ = 2,00 => 1 + r_g = ⁵√2 ≈ 1,1487 => r_g ≈ 14,87% ao ano. Pela Regra do 72: 72 / 14,87 ≈ 4,84 ≈ 5 anos."
            }
          ]
        },
        {
          "id": "aula-03",
          "slug": "aula-03-mediana-moda",
          "numero": 3,
          "titulo": "Aula 3: Mediana, moda e quando a média engana",
          "comeceAqui": "Quando os dados têm valores extremos (outliers), a média deixa de representar o típico.",
          "ideiaCentral": "Mediana é o valor central (imune a outliers). Moda é o valor mais frequente. Se Média >> Mediana, há poucos valores gigantes inflando a média.",
          "conceitosEssenciais": [
            {
              "conceito": "Mediana",
              "significado": "Ponto médio dos dados ordenados"
            },
            {
              "conceito": "Moda",
              "significado": "Valor que mais se repete"
            },
            {
              "conceito": "Outlier",
              "significado": "Valor extremo discrepante da amostra"
            }
          ],
          "exemploResolvido": {
            "titulo": "Efeito do Outlier nos Retornos",
            "enunciado": "Retornos de 9 meses (%): 1, 2, 1, 3, 2, 1, 2, -28, 2.",
            "passos": [
              "1. Média = (-14) / 9 = -1,6% a.m.",
              "2. Dados ordenados: -28, 1, 1, 1, 2, 2, 2, 2, 3",
              "3. Mediana (5º termo) = +2% a.m. Moda = +2% a.m."
            ],
            "resultado": "A mediana (+2%) mostra o mês típico; a média (-1,6%) captura o mês de crash."
          },
          "pbl": {
            "titulo": "Valorização de Imóveis no Bairro",
            "cenario": "Corretor diz que imóveis do bairro subiram 15% em média. 18 de 20 subiram 5%, e 2 subiram 120%. Qual a mediana?",
            "solucao": "A mediana de 20 valores ordenados (onde os 18 primeiros são 5%) será 5%. A média foi inflada para 15% por dois terrenos atípicos (outliers)."
          },
          "resumo": [
            "Mediana não é distorcida por outliers.",
            "Diferença entre média e mediana revela assimetria dos dados."
          ],
          "quiz": [
            {
              "pergunta": "Os salários mensais de 7 colaboradores de uma startup de finanças são: R$ 3.000, R$ 3.000, R$ 3.000, R$ 4.000, R$ 4.500, R$ 5.000 e R$ 80.000 (o fundador executivo). Calcule a média salarial e a mediana salarial e explique qual delas melhor descreve a remuneração de um colaborador típico.",
              "opcoes": [
                "Média = R$ 14.642,86; Mediana = R$ 4.000,00; A mediana representa o colaborador típico, pois a média é severamente distorcida pelo outlier de R$ 80.000.",
                "Média = R$ 4.000,00; Mediana = R$ 14.642,86; A média é a melhor medida por somar todo o dinheiro.",
                "Média = R$ 14.642,86; Mediana = R$ 3.000,00; A moda é a única medida representativa.",
                "Média = R$ 10.000,00; Mediana = R$ 4.000,00; Ambas descrevem perfeitamente o time."
              ],
              "respostaCorreta": 0,
              "explicacao": "Soma dos salários = 3000+3000+3000+4000+4500+5000+80000 = 102.500. Média = 102.500 / 7 ≈ R$ 14.642,86. Como os dados já estão ordenados, a mediana é o 4º termo central: Mediana = R$ 4.000,00. Dizer que o funcionário médio ganha ~R$ 14,6 mil é ilusório; 6 dos 7 ganham R$ 5 mil ou menos. A mediana é imune a outliers."
            },
            {
              "pergunta": "Considere o conjunto de retornos mensais (%) de um fundo ao longo de 8 meses: -4%, -2%, 1%, 2%, 3%, 4%, 5%, 6%. Como o número de observações é par (n = 8), qual é o valor exato da mediana?",
              "opcoes": [
                "+2,5% (média aritmética entre o 4º e o 5º termo: (2% + 3%)/2).",
                "+2,0% (o 4º termo).",
                "+3,0% (o 5º termo).",
                "+1,875% (a média aritmética de todos os termos)."
              ],
              "respostaCorreta": 0,
              "explicacao": "Para n par, a mediana é a média aritmética dos dois termos centrais na posição n/2 e (n/2)+1. Aqui, o 4º termo é 2% e o 5º termo é 3%. Logo: Mediana = (2% + 3%) / 2 = 2,5%."
            },
            {
              "pergunta": "Quando a distribuição de retornos de um ativo apresenta Média = +1,2% ao mês e Mediana = +3,8% ao mês (Média < Mediana), o que essa discrepância revela estatisticamente sobre a distribuição?",
              "opcoes": [
                "A distribuição possui assimetria à esquerda (cauda longa negativa provocada por perdas ocasionais severas/crashes que puxam a média para baixo).",
                "A distribuição possui assimetria à direita (poucos ganhos astronômicos puxam a média para cima).",
                "A distribuição é estritamente simétrica normal gaussiana.",
                "O cálculo da média contém erro matemático necessário."
              ],
              "respostaCorreta": 0,
              "explicacao": "Quando Média < Mediana, o centro de gravidade dos dados foi arrastado para baixo por valores extremos negativos (outliers de desvalorização abrupta), caracterizando assimetria à esquerda (negativamente assimétrica)."
            },
            {
              "pergunta": "Um analista compila a taxa de vacância (%) de 9 fundos imobiliários de logística: 0%, 0%, 2%, 3%, 5%, 5%, 5%, 8%, 14%. Determine a moda, a mediana e a média desse conjunto.",
              "opcoes": [
                "Moda = 5%; Mediana = 5%; Média = 4,67%.",
                "Moda = 0%; Mediana = 5%; Média = 5,00%.",
                "Moda = 5%; Mediana = 3%; Média = 4,20%.",
                "Moda = 5%; Mediana = 5%; Média = 6,00%."
              ],
              "respostaCorreta": 0,
              "explicacao": "Moda (valor mais frequente, aparece 3 vezes) = 5%. Mediana (5º termo ordenado) = 5%. Média = (0+0+2+3+5+5+5+8+14) / 9 = 42 / 9 ≈ 4,67%."
            },
            {
              "pergunta": "Um conjunto de dados possui média 20 e mediana 18. Se multiplicarmos todos os valores da amostra por 3 e somarmos 5 a cada um (transformação linear Y = 3X + 5), quais serão a nova média e a nova mediana?",
              "opcoes": [
                "Nova média = 65; Nova mediana = 59.",
                "Nova média = 60; Nova mediana = 54.",
                "Nova média = 65; Nova mediana = 18.",
                "Nova média = 20; Nova mediana = 59."
              ],
              "respostaCorreta": 0,
              "explicacao": "Tanto a média quanto a mediana sofrem a transformação linear diretamente: Nova média = 3(20) + 5 = 60 + 5 = 65. Nova mediana = 3(18) + 5 = 54 + 5 = 59."
            }
          ]
        },
        {
          "id": "aula-04",
          "slug": "aula-04-dispersao",
          "numero": 4,
          "titulo": "Aula 4: Medidas de dispersão — variância e desvio padrão",
          "comeceAqui": "Dois fundos podem ter a mesma média de 10% a.a., mas um varia entre 8% e 12% e o outro entre -30% e +50%. Dispersão mede esse espalhamento — em finanças, é o risco (volatilidade).",
          "ideiaCentral": "Variância σ² = (1/n) Σ (xk - x̄)². Desvio padrão σ = √(σ²). Regra empírica: ~68% dos dados estão a ±1σ da média e ~95% a ±2σ.",
          "conceitosEssenciais": [
            {
              "conceito": "Variância (σ²)",
              "significado": "Média dos quadrados dos desvios"
            },
            {
              "conceito": "Desvio Padrão (σ)",
              "significado": "Raiz da variância (na mesma unidade dos dados)"
            },
            {
              "conceito": "Volatilidade",
              "significado": "Desvio padrão dos retornos de um ativo"
            }
          ],
          "exemploResolvido": {
            "titulo": "Cálculo de Desvio Padrão de Fundo Volátil",
            "enunciado": "Retornos anuais (%): -30, +50, -10, +30. Média = 10%.",
            "passos": [
              "1. Desvios da média (10): -40, +40, -20, +20",
              "2. Quadrados: 1600, 1600, 400, 400",
              "3. Variância σ² = 4000 / 4 = 1000",
              "4. Desvio padrão σ = √1000 ≈ 31,6%"
            ],
            "resultado": "Volatilidade do fundo = 31,6% ao ano."
          },
          "pbl": {
            "titulo": "Comparando Carteira Estável e Volátil",
            "cenario": "Carteira A: média 10%, σ = 2%. Carteira B: média 10%, σ = 20%. Qual indicar para viagem em 1 ano e qual para 30 anos?",
            "solucao": "Para 1 ano: Carteira A (intervalo 95%: 6% a 14%), risco de perda quase nulo. Para 30 anos: Carteira B aceita a oscilação em busca de retornos em prazos longos."
          },
          "resumo": [
            "Desvio padrão mede a volatilidade de um investimento.",
            "Regra empírica: ±1σ cobre ~68% e ±2σ cobre ~95% dos dados em distribuições normais."
          ],
          "quiz": [
            {
              "pergunta": "Dois ativos financeiros A e B apresentaram o mesmo retorno médio de 10% ao ano nos últimos 5 anos. No entanto, o desvio padrão anual de A é σ_A = 2% ao ano, enquanto o desvio padrão de B é σ_B = 18% ao ano. Como um analista de investimentos compara esses ativos sob a ótica de risco-retorno?",
              "opcoes": [
                "O Ativo A é superior em eficiência risco-retorno, pois entrega o mesmo retorno médio com previsibilidade muito maior e risco de drawdown drasticamente menor.",
                "O Ativo B é superior por possuir maior volatilidade.",
                "Ambos os ativos são idênticos em risco por terem a mesma média de retorno de 10%.",
                "O desvio padrão não possui relação com o risco de investimentos."
              ],
              "respostaCorreta": 0,
              "explicacao": "Desvio padrão mede a dispersão em torno da média, sendo a definição quantitativa clássica de volatilidade e risco em finanças. Para uma mesma rentabilidade de 10%, o ativo com menor desvio padrão (2% vs 18%) oferece maior índice de Sharpe e consistência patrimonial."
            },
            {
              "pergunta": "Considere uma amostra de 5 retornos mensais (%): 2%, 4%, 6%, 8%, 10%. A média amostral é x̄ = 6%. Calcule a variância amostral s² utilizando o divisor n - 1 (Correção de Bessel) e o desvio padrão amostral s.",
              "opcoes": [
                "Variância s² = 10,0; Desvio padrão s = √10 ≈ 3,16%.",
                "Variância s² = 8,0; Desvio padrão s = √8 ≈ 2,83%.",
                "Variância s² = 40,0; Desvio padrão s = 6,32%.",
                "Variância s² = 10,0; Desvio padrão s = 10,00%."
              ],
              "respostaCorreta": 0,
              "explicacao": "Desvios da média (xᵢ - 6): -4, -2, 0, +2, +4. Quadrados dos desvios: (-4)²=16, (-2)²=4, 0²=0, 2²=4, 4²=16. Soma dos quadrados = 16 + 4 + 0 + 4 + 16 = 40. Como é uma amostra (n = 5), dividimos por n - 1 = 4: Variância s² = 40 / 4 = 10,0. Desvio padrão s = √10 ≈ 3,162%."
            },
            {
              "pergunta": "Por que na estatística indutiva o cálculo da variância amostral utiliza o divisor n - 1 (Correção de Bessel) em vez de n?",
              "opcoes": [
                "Porque usar a média amostral em vez da média populacional desconhecida subestima a dispersão real; dividir por n - 1 corrige esse viés, tornando a estimativa não-viesada.",
                "Porque uma das observações sempre precisa ser descartada por ser considerada outlier.",
                "Porque n - 1 garante que a variância nunca resulte em um número fracionário.",
                "Trata-se de uma convenção sem fundamento matemático estocástico."
              ],
              "respostaCorreta": 0,
              "explicacao": "A média amostral minimiza a soma dos quadrados da própria amostra, o que gera uma subestimação sistemática da variância populacional real se dividida por n. O fator n/(n-1) (Correção de Bessel) restaura a esperança matemática não-viesada E[s²] = σ²."
            },
            {
              "pergunta": "Admitindo que os retornos anuais de um índice de mercado sigam aproximadamente uma Distribuição Normal com média μ = 12% e desvio padrão σ = 15%, qual é o intervalo de retornos esperado para aproximadamente 95% dos anos segundo a Regra Empírica (μ ± 2σ)?",
              "opcoes": [
                "Entre -18% e +42% ao ano.",
                "Entre -3% e +27% ao ano (intervalo de 68%).",
                "Entre -33% e +57% ao ano (intervalo de 99,7%).",
                "Entre 0% e +24% ao ano."
              ],
              "respostaCorreta": 0,
              "explicacao": "Pela Regra Empírica da Normal: ~68% caem em μ ± 1σ (12 ± 15 => -3% a 27%); ~95% caem em μ ± 2σ: 12 - 2(15) = 12 - 30 = -18% e 12 + 2(15) = 12 + 30 = +42%. Logo, o intervalo de 95% de confiança é [-18%, +42%]."
            },
            {
              "pergunta": "Se uma constante positiva c = 5 for somada a todos os retornos de uma série temporal (Y = X + 5), o que ocorre com o desvio padrão da série?",
              "opcoes": [
                "Permanece rigorosamente inalterado (σ_Y = σ_X), pois somar uma constante apenas desloca a curva sem alterar o espalhamento dos dados.",
                "Aumenta em 5 unidades.",
                "É multiplicado por 5.",
                "Reduz a zero por uniformização dos dados."
              ],
              "respostaCorreta": 0,
              "explicacao": "Somar uma constante translada todos os pontos e a média pela mesma magnitude (x̄_novo = x̄ + c). Os desvios (xᵢ + c - (x̄ + c)) = (xᵢ - x̄) continuam exatamente idênticos. Logo, Var(X + c) = Var(X) e σ(X + c) = σ(X)."
            }
          ]
        },
        {
          "id": "aula-05",
          "slug": "aula-05-coeficiente-variacao-zscore",
          "numero": 5,
          "titulo": "Aula 5: Coeficiente de variação e z-score",
          "comeceAqui": "Como comparar o risco de dois ativos com médias de retorno diferentes? E como saber se uma queda de 4% em um dia é comum ou um evento raro?",
          "ideiaCentral": "Coeficiente de Variação CV = σ / x̄ (risco por unidade de retorno). Z-score z = (x - x̄) / σ (distância da média em unidades de desvio padrão).",
          "conceitosEssenciais": [
            {
              "conceito": "Coeficiente de Variação (CV)",
              "significado": "Risco dividido pelo retorno médio (menor é melhor)"
            },
            {
              "conceito": "Z-score",
              "significado": "Quão atípico é um evento (|z|>3 indica evento raro)"
            }
          ],
          "exemploResolvido": {
            "titulo": "Comparação de CV entre Ativos",
            "enunciado": "Ativo X: média 8%, σ = 8%. Ativo Y: média 16%, σ = 12%.",
            "passos": [
              "1. CV(X) = 8 / 8 = 1,0",
              "2. CV(Y) = 12 / 16 = 0,75"
            ],
            "resultado": "Ativo Y tem menor risco por unidade de retorno (CV 0,75 vs 1,0)."
          },
          "pbl": {
            "titulo": "Ajuste pelo Risco",
            "cenario": "Tio compara FII (média 0,8% a.m., σ = 2%) e Ações (média 1,2% a.m., σ = 6%). Ele prefere Ações pelo retorno maior. O que o CV indica?",
            "solucao": "CV(FII) = 2 / 0,8 = 2,5. CV(Ações) = 6 / 1,2 = 5,0. O fundo de ações exige o dobro de risco por cada ponto de retorno oferecido."
          },
          "resumo": [
            "CV = σ/média compara risco em ativos de escalas diferentes.",
            "Z-score mede a raridade de um evento em múltiplos de desvio padrão."
          ],
          "quiz": [
            {
              "pergunta": "Um gestor compara dois fundos de investimento com escalas de rentabilidade e risco distintas:\n• Fundo Alfa: Retorno médio = 8% ao ano; Desvio padrão = 2% ao ano.\n• Fundo Beta: Retorno médio = 20% ao ano; Desvio padrão = 10% ao ano.\nCalcule o Coeficiente de Variação (CV = σ / μ) de cada fundo e identifique qual deles oferece menor risco relativo por unidade de retorno.",
              "opcoes": [
                "CV(Alfa) = 0,25 e CV(Beta) = 0,50; o Fundo Alfa possui menor risco relativo por unidade de retorno.",
                "CV(Alfa) = 4,00 e CV(Beta) = 2,00; o Fundo Beta possui menor risco relativo.",
                "CV(Alfa) = 0,25 e CV(Beta) = 0,25; ambos oferecem exatamente a mesma eficiência.",
                "CV(Alfa) = 0,16 e CV(Beta) = 0,50; o Fundo Alfa possui menor risco."
              ],
              "respostaCorreta": 0,
              "explicacao": "CV(Alfa) = 2 / 8 = 0,25 (o desvio representa 25% do retorno médio). CV(Beta) = 10 / 20 = 0,50 (o desvio representa 50% do retorno médio). O Fundo Alfa é duas vezes mais eficiente em risco relativo normalizado."
            },
            {
              "pergunta": "O retorno histórico mensal do Ibovespa possui média μ = 1,5% e desvio padrão σ = 4,5%. Em um mês de grave crise geopolítica, o índice desabou -12,0%. Qual foi o Z-score (escore padronizado) desse mês e como esse resultado é interpretado?",
              "opcoes": [
                "Z = -3,00; trata-se de um evento extremamente raro e extremo (outlier estatístico a 3 desvios padrão abaixo da média).",
                "Z = -2,33; evento moderadamente frequente no mercado.",
                "Z = -1,50; dentro da volatilidade comum de 1 desvio padrão.",
                "Z = +3,00; erro de inversão de sinal da desvalorização."
              ],
              "respostaCorreta": 0,
              "explicacao": "Z = (x - μ) / σ = (-12,0 - 1,5) / 4,5 = -13,5 / 4,5 = -3,00. Na distribuição normal, um Z-score de -3 ou inferior ocorre em menos de 0,15% das observações, configurando um 'cisne negro' ou anomalia estatística severa."
            },
            {
              "pergunta": "Em um processo seletivo concorrido para analista de M&A em um banco de investimento, foram aplicadas duas provas com distribuições distintas:\n• Prova de Finanças: Média = 60, Desvio padrão = 10. Candidato tirou 75.\n• Prova de Estatística: Média = 40, Desvio padrão = 5. Candidato tirou 52.\nEm qual das duas avaliações o candidato teve desempenho relativo superior perante os demais concorrentes?",
              "opcoes": [
                "Na prova de Estatística (Z = +2,40 vs. Z = +1,50 em Finanças).",
                "Na prova de Finanças (Z = +1,50 vs. Z = +1,20 em Estatística).",
                "Na prova de Finanças, porque a nota bruta 75 é superior a 52.",
                "O desempenho relativo foi exatamente igual em ambas (Z = +2,00)."
              ],
              "respostaCorreta": 0,
              "explicacao": "Z(Finanças) = (75 - 60) / 10 = 15 / 10 = +1,50 desvios padrão acima da média. Z(Estatística) = (52 - 40) / 5 = 12 / 5 = +2,40 desvios padrão acima da média. O Z-score normaliza notas de escalas heterogêneas; em Estatística o candidato superou a concorrência com folga muito maior."
            },
            {
              "pergunta": "Qual é a relação conceitual direta entre o Coeficiente de Variação (CV) e o Índice de Sharpe com taxa livre de risco nula (Rf = 0)?",
              "opcoes": [
                "O Índice de Sharpe é exatamente o inverso multiplicativo do Coeficiente de Variação (Sharpe = 1 / CV).",
                "O Índice de Sharpe é igual ao quadrado do Coeficiente de Variação (Sharpe = CV²).",
                "O Índice de Sharpe é a raiz quadrada do Coeficiente de Variação.",
                "Não existe relação matemática entre Sharpe e Coeficiente de Variação."
              ],
              "respostaCorreta": 0,
              "explicacao": "Como CV = σ / μ e Sharpe(Rf=0) = μ / σ, temos que Sharpe = 1 / CV. Enquanto o investidor busca maximizar o Sharpe (retorno por unidade de risco), ele busca minimizar o CV (risco por unidade de retorno)."
            },
            {
              "pergunta": "Uma distribuição amostral de salários em um fundo quantitativo tem média de R$ 25.000,00 e desvio padrão de R$ 5.000,00. Qual salário corresponde rigorosamente a um Z-score de +1,80?",
              "opcoes": [
                "R$ 34.000,00",
                "R$ 29.000,00",
                "R$ 30.000,00",
                "R$ 32.500,00"
              ],
              "respostaCorreta": 0,
              "explicacao": "Isolando x na fórmula do Z-score: x = μ + Z · σ = 25000 + 1,80 · (5000) = 25000 + 9000 = R$ 34.000,00."
            }
          ]
        },
        {
          "id": "aula-06",
          "slug": "aula-06-covariancia-correlacao",
          "numero": 6,
          "titulo": "Aula 6: Covariância e correlação",
          "comeceAqui": "Como saber matematicamente se dois ativos sobem e caem juntos ou em sentidos opostos?",
          "ideiaCentral": "Covariância Cov(X,Y) = (1/n) Σ (xk - x̄)(yk - ȳ). Correlação ρ = Cov(X,Y) / (σX · σY), variando entre -1 e +1.",
          "conceitosEssenciais": [
            {
              "conceito": "Correlação (+1)",
              "significado": "Movimento perfeitamente idêntico"
            },
            {
              "conceito": "Correlação (0)",
              "significado": "Movimentos sem relação linear"
            },
            {
              "conceito": "Correlação (-1)",
              "significado": "Movimento espelhado (um sobe, outro desce)"
            }
          ],
          "exemploResolvido": {
            "titulo": "Correlação entre Duas Ações",
            "enunciado": "Dados históricos: Cov(A,B) = 23, σA = 5,48 e σB = 4,30.",
            "passos": [
              "1. ρ = 23 / (5,48 × 4,30) = 23 / 23,56",
              "2. ρ ≈ 0,98"
            ],
            "resultado": "Correlação de 0,98 indica que as duas ações se movem quase juntas (sem diversificação)."
          },
          "pbl": {
            "titulo": "Montando Carteira Descorrelacionada",
            "cenario": "Analise o par Ibovespa + Dólar vs Ibovespa + Ações de Bancos. Qual par diversifica de verdade?",
            "solucao": "Ibovespa + Ações de Bancos têm correlação positiva alta (~0,8 a 0,9), caindo juntos em crises locais. Ibovespa + Dólar frequentemente têm correlação negativa, atuando como proteção."
          },
          "resumo": [
            "Correlação padroniza a covariância entre -1 e +1.",
            "Ativos com correlação baixa ou negativa reduzem o risco da carteira."
          ],
          "quiz": [
            {
              "pergunta": "Dois ativos X e Y possuem retornos mensais perfeitamente espelhados: sempre que X sobe +4%, Y cai -4%; quando X cai -2%, Y sobe +2%. Qual é o Coeficiente de Correlação de Pearson (ρ_XY) entre eles e qual é o benefício de combiná-los na proporção 50/50 em uma carteira?",
              "opcoes": [
                "ρ_XY = -1,0; a combinação 50/50 elimina 100% da volatilidade dos retornos da carteira, garantindo retorno estável sem risco de mercado.",
                "ρ_XY = 0,0; a combinação não traz nenhum benefício de diversificação.",
                "ρ_XY = +1,0; a combinação duplica o risco da carteira.",
                "ρ_XY = -0,50; a combinação reduz o risco em apenas 25%."
              ],
              "respostaCorreta": 0,
              "explicacao": "Uma relação linear inversa perfeita implica correlação teórica de -1,0. Pela Teoria Moderna de Portfólio de Markowitz, quando dois ativos têm correlação perfeitamente negativa (-1,0), existe uma proporção de pesos que anula totalmente a variância conjunta da carteira."
            },
            {
              "pergunta": "Em uma amostra de 3 períodos, as variáveis X e Y têm desvios em relação às suas médias dados por: Período 1: dx₁ = -2, dy₁ = -10; Período 2: dx₂ = 0, dy₂ = 0; Período 3: dx₃ = +2, dy₃ = +10. Calcule a Covariância amostral Cov(X,Y) com divisor n - 1 = 2.",
              "opcoes": [
                "Cov(X,Y) = 20,0",
                "Cov(X,Y) = 13,3 (usou divisor n = 3)",
                "Cov(X,Y) = 40,0",
                "Cov(X,Y) = 0,0"
              ],
              "respostaCorreta": 0,
              "explicacao": "Produtos dos desvios: (-2)(-10) = 20; (0)(0) = 0; (+2)(+10) = 20. Soma dos produtos = 20 + 0 + 20 = 40. Covariância amostral = 40 / (3 - 1) = 40 / 2 = 20,0."
            },
            {
              "pergunta": "A covariância entre uma ação de commodities e o Ibovespa é Cov(A, IBOV) = 0,0048. O desvio padrão da ação é σ_A = 0,08 (8%) e o do Ibovespa é σ_IBOV = 0,06 (6%). Qual é o Coeficiente de Correlação de Pearson (ρ)?",
              "opcoes": [
                "ρ = +1,00 (relação linear perfeita).",
                "ρ = +0,80",
                "ρ = +0,48",
                "ρ = +0,64"
              ],
              "respostaCorreta": 0,
              "explicacao": "ρ = Cov(A, IBOV) / (σ_A · σ_IBOV) = 0,0048 / (0,08 · 0,06) = 0,0048 / 0,0048 = +1,00."
            },
            {
              "pergunta": "Um estudo quantitativo encontrou uma correlação positiva de ρ = +0,92 entre o número de sorvetes vendidos em uma cidade litorânea e o número de afogamentos registrados no mar. Qual falácia estatística comete quem afirma que 'vender sorvete afoga pessoas'?",
              "opcoes": [
                "Confundir correlação estatística com causalidade direta, ignorando a variável oculta explicativa comum (o calor/verão no litoral que aumenta tanto a praia quanto o consumo de sorvete).",
                "Viés de sobrevivência aquática.",
                "Falácia da regressão à média linear.",
                "Erro de arredondamento nos desvios padrão."
              ],
              "respostaCorreta": 0,
              "explicacao": "Correlação apenas mede associação linear concomitante, jamais relação de causa e efeito. Variáveis de confusão omitidas (lurking variables), como a temperatura de verão, geram as chamadas 'correlações espúrias'."
            },
            {
              "pergunta": "Durante períodos de estresse agudo de liquidez e pânico sistêmico nos mercados globais (crash), o que tipicamente ocorre com a correlação entre classes de ativos de risco que em períodos normais eram descorrelacionadas?",
              "opcoes": [
                "A correlação tende a convergir abruptamente para +1,0 (efeito 'contágio sistêmico' e quebra temporária da diversificação).",
                "A correlação permanece exatamente constante em 0,0.",
                "A correlação torna-se fortemente negativa (-1,0).",
                "A correlação se anula completamente."
              ],
              "respostaCorreta": 0,
              "explicacao": "Em momentos de pânico e venda forçada para cobrir chamadas de margem (liquidation cascades), fundos vendem todos os ativos líquidos simultaneamente. A correlação entre ativos de risco dispara para próximo de +1,0, fenômeno conhecido como 'breakdown de correlação'."
            }
          ]
        },
        {
          "id": "aula-07",
          "slug": "aula-07-regressao-linear",
          "numero": 7,
          "titulo": "Aula 7: Regressão linear",
          "comeceAqui": "Regressão linear encontra a reta que melhor descreve a relação entre duas variáveis, permitindo previsões e a medição do Beta das ações.",
          "ideiaCentral": "Reta ŷ = a + bx. Inclinação b = Cov(X,Y) / σX². Intercepto a = ȳ - b·x̄. R² mede o quanto a reta explica a variação dos dados.",
          "conceitosEssenciais": [
            {
              "conceito": "Coeficiente Beta (β)",
              "significado": "Sensibilidade de uma ação em relação ao Ibovespa (b da regressão)"
            },
            {
              "conceito": "R² (Coeficiente de Determinação)",
              "significado": "Porcentagem da variação explicada pelo modelo"
            }
          ],
          "exemploResolvido": {
            "titulo": "Cálculo do Beta de uma Ação",
            "enunciado": "Dados históricos: Cov(Ação, Ibov) = 5,25 e σ²(Ibov) = 8,5.",
            "passos": [
              "1. Beta (b) = 5,25 / 8,5 = 0,62",
              "2. Intercepto (a) = 1,5 - 0,62 × 2 = 0,26",
              "3. Reta: ŷ = 0,26 + 0,62x"
            ],
            "resultado": "Beta = 0,62 (ação defensiva, oscila 62% da variação do Ibovespa)."
          },
          "pbl": {
            "titulo": "Classificando Ações pelo Beta",
            "cenario": "Ação A tem Beta 1,5. Ação B tem Beta 0,6. Qual incluir em uma carteira conservadora?",
            "solucao": "Ação B (Beta 0,6) é defensiva e oscila menos que o mercado, sendo ideal para a carteira conservadora. Ação A (Beta 1,5) amplifica os movimentos do mercado."
          },
          "resumo": [
            "Regressão linear ajusta a reta ŷ = a + bx aos dados.",
            "O Beta mede a sensibilidade do ativo ao mercado."
          ],
          "quiz": [
            {
              "pergunta": "No modelo de precificação de ativos CAPM, o retorno esperado de uma ação é estimado pela regressão linear contra o índice de mercado: R_ação = α + β · R_mercado + ε. Se a covariância entre a ação e o mercado é Cov = 0,0036 e a variância do mercado é σ²_mercado = 0,0024, qual é o Beta (β) da ação e como ela é classificada?",
              "opcoes": [
                "β = 1,50; ação agressiva/amplificadora (tende a oscilar 50% a mais do que o mercado).",
                "β = 0,67; ação defensiva (tende a oscilar menos que o mercado).",
                "β = 1,00; ação neutra.",
                "β = 2,25; ação de risco extremo."
              ],
              "respostaCorreta": 0,
              "explicacao": "O coeficiente angular de mínimos quadrados ordinários é β = Cov(Ação, Mercado) / Var(Mercado) = 0,0036 / 0,0024 = 1,50. Um beta maior que 1 classifica a ação como agressiva (se o Ibovespa subir 10%, a ação tende a subir 15%; se cair 10%, tende a cair 15%)."
            },
            {
              "pergunta": "Uma regressão linear simples obteve a reta ajustada ŷ = 4 + 2,5x. Sabendo que para a observação onde x = 10 o valor real observado foi y = 32, qual é o valor do resíduo (erro de estimativa e = y - ŷ) desse ponto?",
              "opcoes": [
                "e = +3,0",
                "e = -3,0",
                "e = +29,0",
                "e = 0,0"
              ],
              "respostaCorreta": 0,
              "explicacao": "Valor previsto pela reta: ŷ = 4 + 2,5(10) = 4 + 25 = 29. O resíduo é a diferença entre o valor real observado e o valor estimado pela reta: e = y - ŷ = 32 - 29 = +3,0."
            },
            {
              "pergunta": "A correlação de Pearson entre a taxa de juros Selic (x) e a receita de vendas de uma construtora (y) é ρ = -0,80. Qual é o Coeficiente de Determinação (R²) da regressão linear e qual é a sua interpretação analítica?",
              "opcoes": [
                "R² = 0,64 (64%); exatamente 64% da variação nas vendas da construtora é explicada pela variação na taxa Selic através do modelo linear.",
                "R² = -0,80; a relação é negativa em 80%.",
                "R² = 0,80; 80% das vendas dependem da taxa Selic.",
                "R² = 0,36; o modelo possui baixo poder explicativo."
              ],
              "respostaCorreta": 0,
              "explicacao": "Em regressão linear simples, o coeficiente de determinação é R² = ρ² = (-0,80)² = 0,64 = 64%. Isso indica que 64% da variabilidade total da receita da construtora é estatisticamente explicada pela Selic, restando 36% para fatores não explicados (resíduos)."
            },
            {
              "pergunta": "Um analista ajustou um modelo linear de faturamento de sorvetes f(T) = 500 + 80T para temperaturas T observadas entre 20 °C e 38 °C. Se ele utilizar o modelo para estimar as vendas a uma temperatura de 2 °C (obtendo ŷ = R$ 660,00), qual erro metodológico clássico ele cometeu?",
              "opcoes": [
                "Erro de extrapolação (aplicar o modelo fora do domínio/suporte dos dados observados, onde a relação pode mudar ou deixar de ser linear).",
                "Viés de sobrevivência amostral.",
                "Erro de autocorrelação serial.",
                "Overfitting polinomial."
              ],
              "respostaCorreta": 0,
              "explicacao": "Extrapolação é o erro de projetar estimativas para valores da variável explicativa fora do intervalo em que a reta foi estimada. A 2 °C o comportamento do consumidor muda radicalmente (ninguém compra sorvete no inverno rigoroso), invalidando a linearidade."
            },
            {
              "pergunta": "Em uma regressão linear estimada pelo Método dos Mínimos Quadrados (MQO), qual é a propriedade fundamental que define a reta ótima?",
              "opcoes": [
                "Minimizar a soma dos quadrados dos resíduos verticais: min Σ (yᵢ - ŷᵢ)².",
                "Maximizar a distância média dos pontos até a origem.",
                "Garantir que todos os resíduos sejam estritamente positivos.",
                "Minimizar a soma dos valores absolutos dos coeficientes a e b."
              ],
              "respostaCorreta": 0,
              "explicacao": "O critério dos Mínimos Quadrados Ordinários (MQO / OLS) calcula analiticamente os coeficientes a e b que minimizam a soma dos quadrados dos erros/resíduos verticais Σ eᵢ² = Σ (yᵢ - (a + bxᵢ))²."
            }
          ]
        },
        {
          "id": "aula-08",
          "slug": "aula-08-estatistica-na-pratica",
          "numero": 8,
          "titulo": "Aula 8: Estatística na prática — lendo números sem se enganar",
          "comeceAqui": "A última habilidade do analista é desconfiar direito: identificar recortes, armadilhas e gráficos manipulados.",
          "ideiaCentral": "Checklist cético: 1. Qual a amostra? 2. Qual a média usada? 3. Onde está o desvio padrão? 4. Qual o benchmark? 5. Correlação ou causalidade?",
          "conceitosEssenciais": [
            {
              "conceito": "Eixo Cortado",
              "significado": "Gráfico que inicia fora do zero para amplificar visualmente variações pequenas"
            },
            {
              "conceito": "Anualização Extrapolada",
              "significado": "Multiplicar resultado de 1 mês por 12 como se fosse garantia"
            }
          ],
          "exemploResolvido": {
            "titulo": "Desmontando Propaganda de Clube de Investimento",
            "enunciado": "Anúncio: 'Rendimento médio de 3% ao mês nos últimos 8 meses!'.",
            "passos": [
              "1. Amostra: apenas 8 meses (curto demais).",
              "2. Média: usou aritmética em vez de geométrica.",
              "3. Risco: omitiu a volatilidade (σ) dos 8 meses.",
              "4. Viés: por que o histórico começou há 8 meses?"
            ],
            "resultado": "A afirmação é estatisticamente fraca e omite os riscos reais."
          },
          "pbl": {
            "titulo": "Análise Crítica de Post de Redes Sociais",
            "cenario": "Influenciador afirma que sua carteira rendeu 50% em 1 ano sem risco. Como desmascarar usando o checklist?",
            "solucao": "1. Sem risco não existe em renda variável. 2. Qual o desvio padrão (σ) e o drawdown máximo? 3. Houve viés de sobrevivência? 4. Qual foi o rendimento líquido pós-impostos?"
          },
          "resumo": [
            "Aplica o checklist cético antes de aceitar relatórios e divulgações de investimentos.",
            "Parabéns! Você concluiu a trilha de Matemática Aplicada a Finanças."
          ],
          "quiz": [
            {
              "pergunta": "Um influenciador financeiro publica na internet: 'Nosso fundo rendeu impressionantes +4,5% no mês de janeiro! Anualizando esse retorno, entregaremos 69,6% ao ano!'. Como um analista estatisticamente letrado avalia essa afirmação?",
              "opcoes": [
                "Trata-se de uma extrapolação abusiva e falaciosa de curto prazo, pois assume sem fundamento que a rentabilidade de um único mês atípico se repetirá de forma constante e homogênea ao longo de todos os 12 meses.",
                "A declaração é estatisticamente perfeita pois (1,045)¹² - 1 ≈ 69,6%.",
                "Trata-se de um caso legítimo de uso da média aritmética.",
                "O retorno está subestimado por ignorar a inflação."
              ],
              "respostaCorreta": 0,
              "explicacao": "Anualizar um retorno pontual de curto prazo (1 mês) multiplicando ou compondo para 1 ano é uma falácia de extrapolação. Mercados oscilam com volatilidade; meses de ganho são intercalados com meses de correção."
            },
            {
              "pergunta": "Uma empresa de software testa 1.000 robôs de investimento com combinações aleatórias de indicadores técnicos sobre dados históricos passados de uma ação. O robô nº 742 apresentou um retorno acumulado de 300% no teste. Ao colocar esse robô para operar dinheiro real no mercado, o fundo perde dinheiro. Qual fenômeno estatístico explica esse fracasso?",
              "opcoes": [
                "P-hacking / Data snooping / Overfitting (ao testar 1.000 regras aleatórias, o acaso puro produz algumas com ótimo desempenho passado sem qualquer poder preditivo real futuro).",
                "Viés de sobrevivência populacional.",
                "Erro de arredondamento na média geométrica.",
                "Falácia do custo afundado."
              ],
              "respostaCorreta": 0,
              "explicacao": "Quando se testam milhares de estratégias sem fundamentação causal (data snooping / data mining), o acaso inevitavelmente ajusta uma curva perfeita ao passado (overfitting). O desempenho passado foi ruído estatístico, não sinal preditivo."
            },
            {
              "pergunta": "Uma matéria jornalística exibe um gráfico de linha das ações de um banco com o eixo vertical y cortado (começando em R$ 29,80 e terminando em R$ 30,20). A linha do gráfico despenca do topo até a base. Qual é o efeito visual dessa técnica de recorte e como neutralizá-la?",
              "opcoes": [
                "Cria uma ilusão visual dramática de colapso para uma oscilação ínfima de apenas ~1,3%; neutraliza-se restaurando a escala proporcional ou iniciando o eixo y no zero.",
                "Trata-se de um gráfico perfeitamente proporcional que demonstra a falência do banco.",
                "O gráfico corrige a assimetria dos dados.",
                "A técnica visa destacar o coeficiente de variação nulo."
              ],
              "respostaCorreta": 0,
              "explicacao": "Truncar o eixo vertical em intervalos minúsculos (ex: entre 29,80 e 30,20) amplifica visualmente variações corriqueiras de centavos como se fossem desabamentos gigantescos. É um dos truques visuais mais comuns de desinformação estatística."
            },
            {
              "pergunta": "Ao avaliar uma lâmina promocional de investimentos que promete 'Retorno de 2,5% ao mês!', quais são as 3 perguntas imediatas que o 'Checklist do Analista Cético' exige formular?",
              "opcoes": [
                "1. Qual é a volatilidade (desvio padrão) e o drawdown máximo histórico? 2. Qual é a liquidez e os custos tributários? 3. Há viés de sobrevivência ou de período selecionado na amostra?",
                "1. Qual a cor do logotipo? 2. Quantos seguidores a gestora tem? 3. Quem é o garoto-propaganda?",
                "1. A rentabilidade é garantida por lei? 2. A média é aritmética ou harmônica? 3. Qual o valor do PIX?",
                "1. Qual o lucro do ano passado em reais? 2. Quem é o auditor? 3. Quando é o sorteio?"
              ],
              "respostaCorreta": 0,
              "explicacao": "O checklist cético audita imediatamente o risco omitido (volatilidade e perdas máximas passadas), a representatividade e honestidade da amostra (vieses) e os atritos reais (impostos e liquidez de resgate)."
            },
            {
              "pergunta": "Um relatório afirma: 'Alunos que tomam café da manhã tiram notas 30% maiores em matemática; logo, obrigar todos a tomar café da manhã aumentará as notas da escola'. Qual é o erro estatístico dessa conclusão?",
              "opcoes": [
                "Confundir correlação com causalidade, ignorando variáveis socioeconômicas e estruturais da família que afetam simultaneamente a alimentação e o apoio aos estudos.",
                "Amostra pequena sem variância.",
                "Uso incorreto da mediana salarial.",
                "Erro de arredondamento no somatório de notas."
              ],
              "respostaCorreta": 0,
              "explicacao": "A relação é de correlação com variáveis de confusão omitidas (renda familiar, estabilidade doméstica, rotina organizada). Apenas fornecer comida não garante aumento automático de notas se as causas estruturais permanecerem inalteradas."
            }
          ]
        }
      ]
    }
  ]
};
