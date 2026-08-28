import json

# The 17 6th questions handcrafted from the original problem lists and gabaritos

extra_questions = {
  # MÓDULO 3
  "aula-01-o-que-e-uma-funcao": {
    "pergunta": "Por que a função de montante em juros simples expressa na forma fatorada M(t) = C(1 + it) e na forma expandida M(t) = C + Cit representam rigorosamente a mesma relação matemática e qual propriedade algébrica formal justifica essa equivalência?",
    "opcoes": [
      "Propriedade distributiva da multiplicação sobre a adição: ao colocar o capital C em evidência no binômio C + Cit, obtém-se C(1 + it), onde C é o intercepto e Cit é o acréscimo linear periódico.",
      "Propriedade associativa da exponenciação: os termos são multiplicados pelo fator de juros compostos.",
      "Propriedade comutativa dos logaritmos naturais.",
      "Identidade de Euler para taxas de juros equivalentes."
    ],
    "respostaCorreta": 0,
    "explicacao": "Pela propriedade distributiva da multiplicação sobre a adição, temos: C · (1 + it) = C · 1 + C · it = C + Cit. Algebricamente, ambas são funções afins idênticas f(t) = at + b com coeficiente linear b = C (capital inicial) e coeficiente angular a = Ci (juro constante por período)."
  },
  "aula-02-funcao-exponencial": {
    "pergunta": "Desafio de capitalização composta: Um investidor compara duas aplicações de mesmo risco pelo prazo de 3 anos (36 meses):\n• Opção A: Taxa contratual de 12% ao ano com capitalização anual: M_A(3) = C · (1,12)³\n• Opção B: Taxa contratual de 1% ao mês com capitalização mensal: M_B(36) = C · (1,01)³⁶\nSabendo que (1,12)³ ≈ 1,4049 e que (1,01)³⁶ ≈ 1,4308, qual opção entrega maior rentabilidade acumulada e por quê?",
    "opcoes": [
      "A Opção B (mensal) rende mais, acumulando +43,08% contra +40,49% da Opção A, porque capitalizar os juros mais frequentemente (em 36 períodos em vez de 3) acelera o efeito exponencial de juros sobre juros.",
      "A Opção A (anual) rende mais, acumulando +44,00% contra +36,00% da Opção B pela regra dos juros simples.",
      "Ambas rendem rigorosamente o mesmo valor (+36,00%), pois 12% ao ano é nominalmente idêntico a 12 × 1% ao mês.",
      "A Opção A rende mais porque a taxa percentual nominal anual de 12% é superior à taxa mensal de 1%."
    ],
    "respostaCorreta": 0,
    "explicacao": "Para a Opção A: Fator = (1,12)³ = 1,404928 -> retorno acumulado de +40,49%. Para a Opção B: Fator = (1,01)³⁶ ≈ 1,430769 -> retorno acumulado de +43,08%. A frequência de capitalização maior (mensal) faz os juros de cada mês renderem novos juros nos meses seguintes, superando a capitalização anual."
  },
  "aula-03-logaritmos": {
    "pergunta": "Uma cultura biológica ou investimento alavancado triplica de tamanho a cada hora decorrida (fator de crescimento b = 3). O modelo é N(t) = N₀ · 3ᵗ. Utilizando logaritmos decimais com log₁₀(3) ≈ 0,47712, em quanto tempo aproximado o valor atingirá 100 vezes o valor inicial (N(t) = 100 N₀)?",
    "opcoes": [
      "t ≈ 4,19 horas (cerca de 4 horas e 11 minutos).",
      "t ≈ 33,33 horas (cálculo linear 100 / 3).",
      "t ≈ 2,00 horas (confusão com log₁₀(100)).",
      "t ≈ 6,28 horas (erro de inversão da base logarítmica)."
    ],
    "respostaCorreta": 0,
    "explicacao": "N₀ · 3ᵗ = 100 N₀ => 3ᵗ = 100. Aplicando logaritmo decimal em ambos os lados: log₁₀(3ᵗ) = log₁₀(100) => t · log₁₀(3) = 2 => t = 2 / 0,47712 ≈ 4,1916 horas ≈ 4h 11min."
  },
  "aula-04-progressao-aritmetica": {
    "pergunta": "Considere a Progressão Aritmética de depósitos crescentes (5, 8, 11, 14, ...), onde a₁ = 5 e a razão é r = 3. Quantos termos consecutivos (n) devem ser somados para que a soma total Sₙ ultrapasse pela primeira vez o valor de 500?",
    "opcoes": [
      "18 termos (a soma dos 17 primeiros é 493 e a dos 18 primeiros atinge 549).",
      "17 termos (a soma dos 17 primeiros já supera 500).",
      "20 termos (estimativa linear simples).",
      "15 termos."
    ],
    "respostaCorreta": 0,
    "explicacao": "Termo geral: aₙ = 5 + (n - 1)3 = 3n + 2. Soma de Gauss: Sₙ = (5 + 3n + 2)n / 2 = (3n + 7)n / 2. Queremos Sₙ > 500 => 3n² + 7n > 1000 => 3n² + 7n - 1000 > 0. Para n = 17: S₁₇ = (3·17 + 7)·17 / 2 = (51 + 7)·17 / 2 = 58·17 / 2 = 29·17 = 493. Para n = 18: S₁₈ = (3·18 + 7)·18 / 2 = 61·9 = 549. Logo, são necessários 18 termos."
  },
  "aula-05-progressao-geometrica": {
    "pergunta": "Um investidor analisa a compra de cotas de um Fundo Imobiliário perpétuo que distribui um dividendo constante de R$ 0,90 por cota todo mês por tempo indeterminado. Sabendo que a taxa de desconto (custo de oportunidade) exigida pelo mercado é de 0,9% ao mês (i = 0,009), determine o valor presente justo da cota pela soma da PG infinita (modelo de perpetuidade simples V = D / i).",
    "opcoes": [
      "R$ 100,00 por cota.",
      "R$ 90,00 por cota.",
      "R$ 10,00 por cota.",
      "R$ 81,00 por cota."
    ],
    "respostaCorreta": 0,
    "explicacao": "O valor de uma perpetuidade com fluxo constante D e taxa de desconto i é obtido pela soma da PG infinita: V = D/(1+i) + D/(1+i)² + ... = D / i. Substituindo os valores: V = 0,90 / 0,009 = R$ 100,00 por cota."
  },
  "aula-06-somatorio": {
    "pergunta": "Utilizando o método de pareamento de Gauss para somatórios finitos de números inteiros consecutivos, deduza a expressão fechada da soma S = Σ (k = 1 até n) k = 1 + 2 + 3 + ... + n.",
    "opcoes": [
      "S = n(n + 1) / 2, pois somando a sequência consigo mesma invertida obtêm-se n pares cuja soma de cada par é exatamente (n + 1).",
      "S = n² / 2",
      "S = n(n - 1) / 2",
      "S = (n + 1)² / 2"
    ],
    "respostaCorreta": 0,
    "explicacao": "Escrevendo S = 1 + 2 + ... + n e somando com a versão invertida S = n + (n-1) + ... + 1, obtemos 2S = (n+1) + (n+1) + ... + (n+1) (com n termos). Portanto, 2S = n(n+1) => S = n(n+1)/2."
  },
  "aula-07-produtorio": {
    "pergunta": "Em análise quantitativa e gestão de riscos, qual propriedade matemática permite converter o produtório de fatores de retorno acumulado P = Π (t = 1 até n) (1 + rₜ) em um somatório linear Σ ln(1 + rₜ), e por que essa transformação logarítmica é amplamente empregada por gestores de fundos?",
    "opcoes": [
      "Pela propriedade dos logaritmos ln(A · B) = ln A + ln B, o logaritmo converte multiplicações em somas, facilitando a diferenciação analítica, testes de hipóteses estatísticas e o cálculo aditivo de retornos contínuos.",
      "Porque o logaritmo anula as oscilações negativas do mercado de ações.",
      "Porque somatórios garantem que o retorno financeiro seja sempre superior à taxa Selic.",
      "Pela regra do determinante linear de matrizes de risco."
    ],
    "respostaCorreta": 0,
    "explicacao": "Aplicando logaritmo natural ao produtório: ln(Π(1+rₜ)) = Σ ln(1+rₜ). Em finanças quantitativas, trabalhar com retornos logarítmicos (log-returns) transforma o retorno acumulado em uma soma simples e tratável econometricamente."
  },
  "aula-08-probabilidade-fundamentos": {
    "pergunta": "Em um mercado de ações com pregões estatisticamente independentes, a probabilidade diária de fechamento em alta do Ibovespa é estimada historicamente em 52% (p = 0,52). Qual é a probabilidade exata de o índice fechar em alta em TODOS os 5 dias de uma semana útil completa (5 pregões consecutivos)?",
    "opcoes": [
      "~3,80% (calculado por 0,52⁵ ≈ 0,03802).",
      "10,40% (calculado linearmente por 52% / 5).",
      "52,00% (pela independência estocástica).",
      "26,00% (cálculo simplificado)."
    ],
    "respostaCorreta": 0,
    "explicacao": "Pela regra do produto para eventos independentes: P(Alta nos 5 dias) = P(A₁) · P(A₂) · P(A₃) · P(A₄) · P(A₅) = (0,52)⁵ = 0,0380204 ≈ 3,80%."
  },
  "aula-09-valor-esperado": {
    "pergunta": "Um bilhete de loteria oficial custa R$ 5,00 por aposta e seu valor esperado financeiro para o apostador é de E[X] = -R$ 3,50 por bilhete (ou seja, o retorno esperado médio é de R$ 1,50). Se a instituição emissora comercializar exatamente 10 milhões de bilhetes para esse concurso, qual será a arrecadação líquida média esperada pela instituição?",
    "opcoes": [
      "R$ 35 milhões de reais (pois cada bilhete gera em média R$ 3,50 de margem líquida para a loteria após pagar todos os prêmios).",
      "R$ 50 milhões de reais (arrecadação bruta sem pagamento de prêmios).",
      "R$ 15 milhões de reais (total devolvido aos apostadores).",
      "R$ 0,00 (pela lei dos grandes números)."
    ],
    "respostaCorreta": 0,
    "explicacao": "O valor esperado para a instituição por bilhete é -E[apostador] = -(-R$ 3,50) = +R$ 3,50 de lucro médio por aposta. Multiplicando pelo volume total de 10 milhões de bilhetes: Lucro líquido esperado = 10.000.000 × R$ 3,50 = R$ 35.000.000,00."
  },

  # MÓDULO 4
  "aula-01-dados-populacao-amostra": {
    "pergunta": "Um pesquisador acadêmico deseja estimar o gasto médio mensal com transporte dos 1.200 alunos de uma instituição de ensino. Para obter uma amostra probabilística não enviesada e metodologicamente rigorosa, qual procedimento amostral deve ser adotado?",
    "opcoes": [
      "Realizar sorteio aleatório estratificado de ~60 a 100 alunos sorteados proporcionalmente entre todos os turnos e séries da escola, com coleta anônima e busca ativa dos sorteados para evitar viés de voluntariado.",
      "Entrevistar os primeiros 50 alunos que chegam de carro particular no estacionamento da escola.",
      "Colocar um formulário voluntário no mural e esperar respostas espontâneas.",
      "Entrevistar apenas os colegas da própria sala de aula no intervalo."
    ],
    "respostaCorreta": 0,
    "explicacao": "A amostragem probabilística estratificada garante que todas as séries e turnos estejam representados na proporção correta da população de 1.200 alunos, evitando viés de seleção socioeconômico e viés de voluntariado."
  },
  "aula-02-medias": {
    "pergunta": "Um fundo de private equity investiu R$ 1.000.000,00 em uma startup e vendeu sua participação por R$ 2.000.000,00 após 5 anos de maturação (fator acumulado de 2,00). Sabendo que ⁵√2 ≈ 1,148698, qual foi a taxa média geométrica de retorno anual composto (CAGR) e compare com a estimativa da Regra do 72.",
    "opcoes": [
      "Taxa média geométrica = 14,87% ao ano; pela Regra do 72: 72 / 5 = 14,40% ao ano (aproximação excelente).",
      "Taxa média geométrica = 20,00% ao ano (média aritmética simples 100% / 5).",
      "Taxa média geométrica = 10,00% ao ano.",
      "Taxa média geométrica = 25,00% ao ano."
    ],
    "respostaCorreta": 0,
    "explicacao": "Fórmula da taxa geométrica composta: (1 + r_g)⁵ = 2,00 => 1 + r_g = ⁵√2 ≈ 1,1487 => r_g = 14,87% a.a. Pela Regra do 72 para dobrar de capital em 5 anos: taxa ≈ 72 / 5 = 14,40% ao ano."
  },
  "aula-03-mediana-moda": {
    "pergunta": "Considere uma série temporal com 7 retornos mensais de uma estratégia quantitativa: [-1%, -1%, -1%, -2%, -1%, +3%, +40%]. Calcule a média aritmética e a mediana e descreva o impacto dessa dinâmica sobre a tomada de decisão do investidor.",
    "opcoes": [
      "Média = +5,29% e Mediana = -1,00%; o investidor amarga prejuízo na grande maioria dos meses (5 em 7) e depende de estômago e paciência para aguardar o mês excepcional que alavanca a média para o positivo.",
      "Média = -1,00% e Mediana = +5,29%; a estratégia é perdedora na média.",
      "Média = +5,29% e Mediana = +5,29%; distribuição perfeitamente simétrica.",
      "Média = 0,00% e Mediana = -1,00%."
    ],
    "respostaCorreta": 0,
    "explicacao": "Dados ordenados: [-2, -1, -1, -1, -1, +3, +40]. Mediana (4º termo) = -1,00%. Soma = -2 - 1 - 1 - 1 - 1 + 3 + 40 = +37%. Média = 37 / 7 ≈ +5,29%. Essa assimetria positiva (Power Law) exige disciplina férrea do investidor."
  },
  "aula-04-dispersao": {
    "pergunta": "Um investidor compõe uma carteira 50/50 com dois ativos A e B perfeitamente idênticos em risco individual (σ_A = σ_B = 20% ao ano) e estatisticamente independentes (correlação ρ = 0). Qual é a volatilidade total da carteira combinada (σ_p) e qual mecanismo fundamental explica a redução do risco?",
    "opcoes": [
      "σ_p = √200 ≈ 14,14% ao ano; o risco diminui porque choques e flutuações não-correlacionados se anulam parcialmente no agregado patrimonial (efeito diversificação de Markowitz).",
      "σ_p = 20,00% ao ano; o risco é a média simples das volatilidades individuais.",
      "σ_p = 40,00% ao ano; os riscos se somam diretamente.",
      "σ_p = 10,00% ao ano; a independência divide o risco por dois."
    ],
    "respostaCorreta": 0,
    "explicacao": "Fórmula de variância da carteira: σ_p² = w_A² σ_A² + w_B² σ_B² + 2 w_A w_B Cov(A,B). Como ρ = 0, Cov = 0: σ_p² = (0,5)²(400) + (0,5)²(400) = 100 + 100 = 200 => σ_p = √200 ≈ 14,14% ao ano."
  },
  "aula-05-coeficiente-variacao-zscore": {
    "pergunta": "Um gestor de hedge fund justifica uma perda abrupta de 6,0% em um único dia alegando que o mercado sofreu 'um evento estatístico imprevisível de 6 sigmas (z = -6,0)', admitindo desvio diário σ = 1,0%. Sabendo que na curva Normal teórica um evento de 6 sigmas tem probabilidade de ocorrer 1 vez a cada 500 milhões de pregões, qual é a crítica estatística definitiva a essa justificativa?",
    "opcoes": [
      "Retornos de mercado não seguem uma curva Normal pura, mas sim distribuições com caudas pesadas (leptocurtose e excesso de curtose); portanto, quedas extremas ocorrem com frequência muito maior do que a Normal prevê, provando que o modelo de risco do gestor era falho.",
      "O gestor calculou o z-score errado, pois o valor máximo de z permitido em finanças é 3.",
      "A distribuição normal superestima a chance de crises financeiras.",
      "A média diária foi negativa, o que anula a validade da variância."
    ],
    "respostaCorreta": 0,
    "explicacao": "Distribuições financeiras reais apresentam 'caudas gordas' (fat tails). Modelar o mercado com a curva Normal teórica subestima brutalmente os riscos de cauda e drawdowns severos."
  },
  "aula-06-covariancia-correlacao": {
    "pergunta": "Considere duas séries temporais normalizadas X = (1, 2, 3, 4) e Y = (4, 3, 2, 1). Calcule a Covariância amostral Cov(X,Y) e o Coeficiente de Correlação de Pearson (ρ) entre elas.",
    "opcoes": [
      "Cov(X,Y) = -1,67 (com divisor n-1) ou -1,25 (com divisor n) e ρ = -1,00 (relação linear perfeitamente inversa).",
      "Cov(X,Y) = 0,00 e ρ = 0,00 (independência estatística).",
      "Cov(X,Y) = +1,67 e ρ = +1,00 (relação perfeitamente direta).",
      "Cov(X,Y) = -2,50 e ρ = -0,50."
    ],
    "respostaCorreta": 0,
    "explicacao": "Médias: x̄ = 2,5 e ȳ = 2,5. Desvios de X: [-1,5; -0,5; +0,5; +1,5]. Desvios de Y: [+1,5; +0,5; -0,5; -1,5]. Produtos: -2,25; -0,25; -0,25; -2,25. Soma = -5,00. Covariância populacional = -5/4 = -1,25 (amostral = -5/3 ≈ -1,67). Como Y = 5 - X, a correlação é ρ = -1,00 exato."
  },
  "aula-07-regressao-linear": {
    "pergunta": "A regressão linear entre os retornos de uma ação de commodities e o Ibovespa revelou um coeficiente de correlação de Pearson de ρ = 0,60. Qual é o valor do Coeficiente de Determinação R² da regressão e qual percentual da volatilidade da ação corresponde ao 'Risco Específico' (idiossincrático) que pode ser eliminado através da diversificação?",
    "opcoes": [
      "R² = 0,36 (36% explicado pelo mercado); os 64% restantes representam o Risco Específico diversificável da empresa.",
      "R² = 0,60 (60% explicado pelo mercado); os 40% restantes representam o Risco Sistemático.",
      "R² = 0,16 (16% explicado pelo mercado); os 84% restantes são diversificáveis.",
      "R² = 0,36; o risco específico é de 36%."
    ],
    "respostaCorreta": 0,
    "explicacao": "Em regressão linear simples, R² = ρ² = (0,60)² = 0,36 = 36% (risco sistemático de mercado). A proporção de variância não explicada pelo mercado é 1 - R² = 1 - 0,36 = 0,64 = 64%, que constitui o risco idiossincrático."
  },
  "aula-08-estatistica-na-pratica": {
    "pergunta": "Um algoritmo quantitativo executou backtests sobre 500 estratégias de negociação geradas por combinações aleatórias de parâmetros técnicos e encontrou uma regra com taxa de acerto de 94% sobre o histórico passado. Qual fundamento estatístico alerta contra a alocação de capital real nessa regra sem validação fora da amostra (out-of-sample)?",
    "opcoes": [
      "P-hacking / Mineração de dados: ao testar 500 estratégias aleatórias, o acaso puro produzirá algumas com desempenho aparente espetacular no passado que não se sustentam no futuro (overfitting ao ruído histórico).",
      "Viés de sobrevivência contábil.",
      "Falácia da mediana geométrica.",
      "Erro de truncamento no eixo temporal."
    ],
    "respostaCorreta": 0,
    "explicacao": "Assim como ao jogar 10 moedas 500 vezes alguém tirará 9 ou 10 caras por puro acaso, testar centenas de regras aleatórias gera 'falsos positivos' por overfitting. A validação exige teste rigoroso em dados novos nunca antes vistos (out-of-sample testing)."
  }
}

# Load current matematicaData.js
with open('plataforma/src/data/matematicaData.js', 'r', encoding='utf-8') as f:
    raw_code = f.read()

prefix = 'window.matematicaData = '
json_text = raw_code.strip()
if json_text.startswith(prefix):
    json_text = json_text[len(prefix):]
if json_text.endswith(';'):
    json_text = json_text[:-1]

data = json.loads(json_text)

# Add extra questions to the respective lessons
for m in data['modulos']:
    for aula in m['aulas']:
        slug = aula['slug']
        if slug in extra_questions:
            q_to_add = extra_questions[slug]
            # Check if this question isn't already there
            already_exists = any(q['pergunta'] == q_to_add['pergunta'] for q in aula.get('quiz', []))
            if not already_exists:
                if 'quiz' not in aula:
                    aula['quiz'] = []
                aula['quiz'].append(q_to_add)
                print(f"Added 6th question to {slug} (now has {len(aula['quiz'])} questions)")

# Write back
with open('plataforma/src/data/matematicaData.js', 'w', encoding='utf-8') as f:
    f.write('window.matematicaData = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n')

print("\nSuccessfully updated matematicaData.js with all 6th questions!")
