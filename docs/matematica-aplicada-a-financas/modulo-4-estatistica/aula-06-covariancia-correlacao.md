# Unidade 6: Covariância e correlação

## Comece aqui

No Módulo 3 de Finanças, você usou a palavra "correlação" para montar carteiras — dois ativos que não caem juntos reduzem o risco do conjunto. Esta unidade entrega a matemática por trás: como **medir**, a partir dos dados, se duas variáveis dançam juntas, em direções opostas ou cada uma na sua.

## Ideia central

- **Covariância**: mede se duas variáveis se desviam das suas médias **no mesmo sentido** (positiva) ou em sentidos opostos (negativa). O número cru é difícil de interpretar.
- **Correlação**: a covariância padronizada, presa entre **−1 e +1**. Este é o número que todo mundo usa.

$$
\text{Cov}(X,Y) = \frac{1}{n}\sum_{k=1}^{n}(x_k - \bar{x})(y_k - \bar{y}) \qquad \rho = \frac{\text{Cov}(X,Y)}{\sigma_X \, \sigma_Y}
$$

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Covariância positiva | Quando X está acima da média, Y tende a estar também |
| Covariância negativa | Quando X está acima, Y tende a estar abaixo |
| Correlação ($\rho$) | Covariância em escala universal: −1 a +1 |
| $\rho \approx +1$ | Andam praticamente juntas |
| $\rho \approx 0$ | Sem relação **linear** |
| $\rho \approx -1$ | Espelhadas: uma sobe, a outra desce |
| Correlação ≠ causalidade | Moverem-se juntas não prova que uma causa a outra |

## Como a conta funciona (intuição)

Para cada período, pergunte: X ficou acima ou abaixo da sua média? E Y? Multiplique os dois desvios:

- Ambos acima (+ × +) ou ambos abaixo (− × −) → produto **positivo** → empurra a covariância para cima;
- Um acima e outro abaixo (+ × −) → produto **negativo** → empurra para baixo.

A covariância é a média desses produtos: um placar de "quantas vezes dançaram juntas × separadas".

## Exemplo resolvido

Retornos de dois ativos em 4 meses (%):

| Mês | Ação A | Ação B |
|---:|---:|---:|
| 1 | +6 | +4 |
| 2 | −2 | 0 |
| 3 | +4 | +3 |
| 4 | −8 | −7 |

Médias: $\bar{A} = 0$, $\bar{B} = 0$. Produtos dos desvios: $6 \cdot 4 = 24$; $(-2)(0) = 0$; $4 \cdot 3 = 12$; $(-8)(-7) = 56$.

$$
\text{Cov} = \frac{24 + 0 + 12 + 56}{4} = 23
$$

Desvios padrão: $\sigma_A = \sqrt{(36+4+16+64)/4} = \sqrt{30} \approx 5{,}48$; $\sigma_B = \sqrt{(16+0+9+49)/4} = \sqrt{18{,}5} \approx 4{,}30$.

$$
\rho = \frac{23}{5{,}48 \times 4{,}30} \approx \frac{23}{23{,}56} \approx 0{,}98
$$

Correlação de 0,98: A e B são quase o mesmo ativo. Ter os dois na carteira **não diversifica nada** — é o caso das "dez ações de bancos" do Módulo 3 de Finanças, agora com prova numérica.

## Cuidados de interpretação

- **Correlação captura relação linear**: duas variáveis podem ter relação forte em U e $\rho \approx 0$.
- **Correlação muda com o tempo**: em crises, correlações entre ativos de risco sobem — a diversificação encolhe justo quando você mais precisa.
- **Correlação ≠ causalidade**: vendas de sorvete e afogamentos são correlacionados (verão causa os dois). Antes de concluir causa, procure a variável escondida.

## Lista de problemas

1. Sem calcular, diga o sinal esperado da correlação: (a) horas de estudo × nota; (b) preço da passagem × número de passageiros; (c) número do sapato × nota de matemática.
2. Calcule a covariância de X = (2, 4, 6) e Y = (10, 20, 30). E o sinal da correlação?
3. Duas ações têm $\rho = -0{,}8$. O que acontece com a carteira 50/50 quando uma delas cai forte?
4. Por que uma correlação de 0,95 **medida em anos calmos** pode enganar o gestor de carteira?
5. "Cidades com mais bombeiros têm mais incêndios, logo bombeiros causam incêndios." Identifique o erro e a variável escondida.
6. Desafio: monte duas séries de 4 números com correlação exatamente −1 e mostre a conta da covariância.

??? note "Gabarito"
    1. (a) positiva; (b) negativa; (c) ~zero.
    2. Médias 4 e 20; produtos: $(-2)(-10) + 0 + (2)(10) = 40$; Cov = 40/3 ≈ 13,3; correlação **+1** (Y = 5X, relação linear perfeita).
    3. A outra tende a subir: as perdas são amortecidas — diversificação máxima.
    4. Em crise, a correlação real dispara; o risco conjunto medido "no calmo" subestima o risco "na tempestade".
    5. Causalidade invertida/variável escondida: o **tamanho da cidade** causa os dois.
    6. Ex.: X = (1, 2, 3, 4), Y = (4, 3, 2, 1). Desvios de X: (−1,5; −0,5; 0,5; 1,5); de Y: (1,5; 0,5; −0,5; −1,5). Produtos: −2,25; −0,25; −0,25; −2,25 → Cov = −1,25; $\sigma_X = \sigma_Y \approx 1{,}118$; $\rho = -1{,}25/1{,}25 = -1$. ✓

## PBL

Pegue (ou invente de forma realista) os retornos mensais de 6 meses de três ativos: um ETF de Ibovespa, um fundo cambial (dólar) e um FII. Calcule a correlação entre os três pares, monte uma tabela 3×3 e responda como um analista: que par oferece a melhor diversificação? Que par é "diversificação de mentira"? Se você tivesse que montar uma carteira com apenas dois deles para atravessar uma crise local, quais escolheria — e por quê o resultado bate com a unidade 3 do Módulo 3 de Finanças?

## Resumo

- Covariância dá o sentido do movimento conjunto; correlação o padroniza entre −1 e +1.
- Correlação alta = diversificação de mentira; baixa ou negativa = proteção real.
- Correlação é linear, muda no tempo e não prova causalidade.
- A próxima unidade dá o passo final: usar uma variável para **prever** a outra — regressão linear.
