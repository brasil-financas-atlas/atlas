import json
import re

# Module 3 data from specialist
mod3_data = {
  "slug": "modulo-3-funcoes-e-probabilidade",
  "aulas": [
    {
      "slug": "aula-01-o-que-e-uma-funcao",
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
      "slug": "aula-02-funcao-exponencial",
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
      "slug": "aula-03-logaritmos",
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
      "slug": "aula-04-progressao-aritmetica",
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
      "slug": "aula-05-progressao-geometrica",
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
      "slug": "aula-06-somatorio",
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
      "slug": "aula-07-produtorio",
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
      "slug": "aula-08-probabilidade-fundamentos",
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
      "slug": "aula-09-valor-esperado",
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
}

# Module 4 data handcrafted
mod4_data = {
  "slug": "modulo-4-estatistica",
  "aulas": [
    {
      "slug": "aula-01-dados-populacao-amostra",
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
      "slug": "aula-02-medias",
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
      "slug": "aula-03-mediana-moda",
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
      "slug": "aula-04-dispersao",
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
      "slug": "aula-05-coeficiente-variacao-zscore",
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
      "slug": "aula-06-covariancia-correlacao",
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
      "slug": "aula-07-regressao-linear",
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
      "slug": "aula-08-estatistica-na-pratica",
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

# Load current matematicaData.js
with open('plataforma/src/data/matematicaData.js', 'r', encoding='utf-8') as f:
    raw_code = f.read()

# Parse JSON inside window.matematicaData = ...
prefix = 'window.matematicaData = '
json_text = raw_code.strip()
if json_text.startswith(prefix):
    json_text = json_text[len(prefix):]
if json_text.endswith(';'):
    json_text = json_text[:-1]

data = json.loads(json_text)

# Update modulo 3
for m in data['modulos']:
    if m['slug'] == 'modulo-3-funcoes-e-probabilidade' or m['numero'] == 3:
        for aula in m['aulas']:
            for q_aula in mod3_data['aulas']:
                if aula['slug'] == q_aula['slug']:
                    aula['quiz'] = q_aula['quiz']
                    if 'listaProblemas' in aula:
                        del aula['listaProblemas']
                    if 'miniQuiz' in aula:
                        del aula['miniQuiz']

# Update modulo 4
for m in data['modulos']:
    if m['slug'] == 'modulo-4-estatistica' or m['numero'] == 4:
        for aula in m['aulas']:
            for q_aula in mod4_data['aulas']:
                if aula['slug'] == q_aula['slug']:
                    aula['quiz'] = q_aula['quiz']
                    if 'listaProblemas' in aula:
                        del aula['listaProblemas']
                    if 'miniQuiz' in aula:
                        del aula['miniQuiz']

# Save updated data
with open('plataforma/src/data/matematicaData.js', 'w', encoding='utf-8') as f:
    f.write('window.matematicaData = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n')

print('Successfully updated matematicaData.js with handcrafted 5-question quizzes for all lessons in Module 3 & 4!')
