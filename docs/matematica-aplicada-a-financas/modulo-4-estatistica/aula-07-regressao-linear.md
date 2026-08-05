# Unidade 7: Regressão linear

## Comece aqui

Correlação diz que duas variáveis andam juntas; a **regressão linear** vai além: encontra a **reta que melhor descreve** essa relação, permitindo estimar uma variável a partir da outra. É uma das ferramentas mais usadas do planeta — de previsões de venda ao famoso **beta** das ações — e é a função afim da unidade 1 do Módulo 3 renascendo como ferramenta estatística.

## Ideia central

Dado um conjunto de pontos $(x, y)$, a regressão encontra a reta

$$
\hat{y} = a + b\,x
$$

que minimiza a soma dos **erros ao quadrado** (as distâncias verticais dos pontos à reta) — por isso o método se chama **mínimos quadrados**. As fórmulas dos coeficientes usam tudo o que o módulo construiu:

$$
b = \frac{\text{Cov}(X,Y)}{\sigma_X^2} \qquad a = \bar{y} - b\,\bar{x}
$$

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Variável explicativa ($x$) | A que usamos para explicar/prever |
| Variável resposta ($y$) | A que queremos estimar |
| Coeficiente angular ($b$) | Quanto $y$ muda, em média, quando $x$ aumenta 1 unidade |
| Intercepto ($a$) | O valor estimado de $y$ quando $x = 0$ |
| Resíduo | Erro de cada ponto: valor real − valor previsto pela reta |
| $R^2$ | Fração da variação de $y$ que a reta explica (0 a 1); é o quadrado da correlação |
| Extrapolação | Prever fora do intervalo dos dados — a fonte clássica de desastres |

## O beta: a regressão mais famosa das finanças

Regredindo os retornos de uma ação ($y$) contra os retornos do Ibovespa ($x$), o coeficiente angular recebe um nome próprio: **beta (β)**.

| Beta | Leitura |
|---:|---|
| β = 1 | A ação acompanha o mercado |
| β = 1,5 | Mercado sobe 1% → ação tende a subir 1,5% (e cai 1,5× também): **amplifica** |
| β = 0,5 | Defensiva: oscila metade do mercado |
| β < 0 | Raridade que se move contra o mercado (proteção) |

O beta alimenta modelos de precificação profissionais (como o CAPM, que você encontrará no Assaf Neto e no CFA): quanto maior o β, maior o retorno exigido para carregar a ação — e maior a taxa de desconto no valuation do Módulo 2 de Finanças.

## Exemplo resolvido

Meses em que o Ibovespa rendeu $x$ e a ação da Sorvetes Tropical rendeu $y$ (%):

| $x$ (Ibov) | −2 | 1 | 3 | 6 |
|---|---|---|---|---|
| $y$ (ação) | −1 | 1 | 2 | 4 |

Médias: $\bar{x} = 2$, $\bar{y} = 1{,}5$. Desvios de $x$: (−4, −1, 1, 4); de $y$: (−2,5; −0,5; 0,5; 2,5).

$$
\text{Cov} = \frac{(-4)(-2{,}5) + (-1)(-0{,}5) + (1)(0{,}5) + (4)(2{,}5)}{4} = \frac{10 + 0{,}5 + 0{,}5 + 10}{4} = 5{,}25
$$

$$
\sigma_x^2 = \frac{16+1+1+16}{4} = 8{,}5 \qquad b = \frac{5{,}25}{8{,}5} \approx 0{,}62 \qquad a = 1{,}5 - 0{,}62 \cdot 2 \approx 0{,}26
$$

Reta: $\hat{y} = 0{,}26 + 0{,}62x$. **Leitura financeira**: β ≈ 0,62 — a ação da Tropical é defensiva (sorvete se vende mesmo em crise leve); se o Ibovespa cair 10%, a expectativa é de queda de ~6% para a ação, não 10%. Coerente com o perfil resiliente que analisamos no Módulo 2 de Finanças.

## Cuidados de uso

- **$R^2$ baixo = reta fraca**: com $R^2 = 0{,}1$, a reta explica 10% do que acontece; não baseie decisões nela.
- **Não extrapole**: uma reta ajustada com Ibovespa entre −5% e +5% nada sabe sobre um crash de −30%.
- **Relação ≠ lei**: betas mudam com o tempo; recalcule com dados recentes.
- **Outliers puxam a reta**: um mês maluco distorce $a$ e $b$ — sempre olhe o gráfico.

## Lista de problemas

1. Na reta $\hat{y} = 2 + 0{,}8x$, o que significam o 2 e o 0,8? Estime $y$ para $x = 10$.
2. Com Cov(X,Y) = 12 e $\sigma_X^2 = 4$: calcule $b$. Com $\bar{x} = 5$, $\bar{y} = 20$: calcule $a$ e escreva a reta.
3. Uma ação tem β = 1,8. O Ibovespa cai 5% num mês. Qual a variação esperada da ação? Por que "esperada" e não "garantida"?
4. Ajuste mentalmente: os pontos (1, 3), (2, 5), (3, 7) estão numa reta perfeita. Quais são $a$ e $b$? Qual o $R^2$?
5. Um analista ajustou vendas de sorvete × temperatura com dados de 20 °C a 35 °C e quer prever vendas a 5 °C. Qual o problema?
6. Desafio: se a correlação entre a ação e o índice é 0,6, qual o $R^2$ da regressão? Interprete: quanto do movimento da ação **não** é explicado pelo mercado (esse resto tem nome: risco específico — Módulo 3 de Finanças, unidade 1).

??? note "Gabarito"
    1. $a = 2$: valor de $y$ com $x = 0$; $b = 0{,}8$: cada +1 em $x$ soma 0,8 a $y$; $\hat{y}(10) = 10$.
    2. $b = 3$; $a = 20 - 15 = 5$; $\hat{y} = 5 + 3x$.
    3. $-5\% \times 1{,}8 = -9\%$ esperados; "esperada" porque a reta descreve a média da relação — cada mês tem resíduo (risco específico da empresa).
    4. $b = 2$, $a = 1$, $R^2 = 1$ (ajuste perfeito).
    5. Extrapolação: 5 °C está fora do intervalo dos dados; a relação pode não ser linear no frio (ninguém compra sorvete, vendas ~0).
    6. $R^2 = 0{,}6^2 = 0{,}36$: o mercado explica 36% da variação; os 64% restantes são risco específico — exatamente o que a diversificação elimina.

## PBL

Colete (ou simule com bom senso) 8 pares de dados: retorno mensal do Ibovespa ($x$) e de uma ação que você acompanha ($y$). Calcule β e $a$ pela receita da unidade, classifique a ação (amplificadora, neutra ou defensiva), calcule o $R^2$ a partir da correlação e escreva um mini-parecer de analista (5 linhas): o que o β diz sobre o papel dessa ação numa carteira conservadora? E numa arrojada? Este tipo de análise quantitativa diferencia um pitch na BRHSIC.

## Resumo

- Regressão encontra a reta de mínimos quadrados: $b = \text{Cov}/\sigma_x^2$, $a = \bar{y} - b\bar{x}$.
- O β de uma ação é o coeficiente angular contra o mercado: mede sensibilidade e alimenta o CAPM.
- $R^2$ mede a força da reta; extrapolar e ignorar outliers são os erros clássicos.
- Última unidade do módulo: como **não** ser enganado por estatísticas — o kit de defesa do analista.
