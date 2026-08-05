# Unidade 4: Medidas de dispersão — variância e desvio padrão

## Comece aqui

Dois fundos rendem, em média, 10% ao ano. O fundo A entrega sempre entre 8% e 12%; o fundo B alterna entre −30% e +50%. A média é idêntica — a **experiência** é completamente diferente. O que os distingue é a **dispersão**: o quanto os valores se espalham em torno da média. Em finanças, dispersão tem outro nome: **risco**.

## Ideia central

O **desvio padrão** mede a distância típica entre os dados e a média. Construção em três passos:

1. Calcule o desvio de cada dado: $x_k - \bar{x}$;
2. Eleve ao quadrado (para positivos e negativos não se cancelarem) e tire a média — isso é a **variância** $\sigma^2$;
3. Tire a raiz quadrada para voltar à unidade original — o **desvio padrão** $\sigma$.

$$
\sigma^2 = \frac{1}{n}\sum_{k=1}^{n}(x_k - \bar{x})^2 \qquad \sigma = \sqrt{\sigma^2}
$$

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Amplitude | Maior valor − menor valor; grosseira, mas imediata |
| Desvio | Distância de um dado até a média (com sinal) |
| Variância ($\sigma^2$) | Média dos desvios ao quadrado |
| Desvio padrão ($\sigma$) | Raiz da variância; a "distância típica" da média |
| Volatilidade | O desvio padrão dos **retornos** de um ativo — a medida padrão de risco |
| Regra empírica (≈ normal) | ~68% dos dados a até 1σ da média; ~95% a até 2σ |

!!! note "Detalhe técnico (para quem for programar)"
    Em **amostras**, divide-se por $n-1$ em vez de $n$ (variância amostral) — uma correção que compensa o fato de a amostra subestimar a dispersão da população. Em turmas introdutórias e neste curso, usar $n$ é aceitável; planilhas oferecem as duas (VAR.P e VAR.A no Excel).

## Volatilidade: o desvio padrão que aparece nos apps

Quando um app diz que um fundo tem "volatilidade de 15% ao ano", está dizendo: os retornos anuais costumam ficar a ±15 pontos da média. Com média 10% e σ = 15%, pela regra empírica: em ~68% dos anos o retorno cai entre −5% e +25%; em ~95%, entre −20% e +40%. A régua da unidade 5 do Módulo 3 de Finanças ("aguento ver −20%?") sai exatamente daqui.

## Exemplo resolvido

Retornos anuais do fundo B (%): −30, +50, −10, +30. Média:

$$
\bar{x} = \frac{-30+50-10+30}{4} = 10\%
$$

Desvios: −40, +40, −20, +20. Quadrados: 1600, 1600, 400, 400.

$$
\sigma^2 = \frac{1600+1600+400+400}{4} = 1000 \qquad \sigma = \sqrt{1000} \approx 31{,}6\%
$$

Fundo A (retornos 8, 12, 9, 11): mesma média 10%, e $\sigma \approx 1{,}6\%$. **Mesmo retorno médio, vinte vezes mais risco.** Se você só olhar a média, os fundos são gêmeos; o desvio padrão revela que um é poupança e o outro é montanha-russa.

## Lista de problemas

1. Calcule amplitude, variância e desvio padrão de: 2, 4, 4, 4, 5, 5, 7, 9.
2. Dois ativos têm média 12%: o ativo X com σ = 4% e o Y com σ = 25%. Qual é mais arriscado? O que isso significa na prática?
3. Com média 10% e σ = 5% (regra empírica), em que faixa caem ~95% dos retornos anuais?
4. Retornos de uma ação: +5%, −5%, +15%, −15%. Calcule média e desvio padrão.
5. Por que elevamos os desvios ao quadrado em vez de simplesmente somá-los?
6. Desafio: uma carteira 50/50 de dois ativos idênticos e **independentes** (cada um com σ = 20%) tem volatilidade menor que 20%. Usando a intuição de diversificação do Módulo 3 de Finanças, explique por quê (sem fórmula).

??? note "Gabarito"
    1. Amplitude = 7; média = 5; desvios: −3,−1,−1,−1,0,0,2,4 → quadrados: 9,1,1,1,0,0,4,16 → $\sigma^2 = 32/8 = 4$; $\sigma = 2$.
    2. Y — seus retornos se afastam muito mais da média: anos muito bons e muito ruins.
    3. Entre $10 - 2(5) = 0\%$ e $10 + 2(5) = 20\%$.
    4. Média = 0; quadrados: 25, 25, 225, 225 → $\sigma^2 = 125$; $\sigma \approx 11{,}2\%$.
    5. Sem o quadrado, desvios positivos e negativos se cancelam e a soma dá zero sempre; o quadrado também dá mais peso aos desvios grandes.
    6. As oscilações independentes se cancelam parcialmente: quando um sobe, o outro nem sempre acompanha — o conjunto balança menos que as partes.

## PBL

Monte (ou simule) duas "carteiras" com 8 retornos mensais cada: uma estável e uma volátil, ambas com a **mesma média** que você escolher. Calcule σ das duas, aplique a regra empírica para descrever a faixa esperada de cada uma e escreva um parágrafo de recomendação: para um estudante juntando dinheiro para um intercâmbio em 1 ano, qual carteira serve? E para uma aposentadoria em 30 anos? Justifique usando σ e horizonte.

## Resumo

- Dispersão mede o espalhamento em torno da média; variância e desvio padrão são o padrão da indústria.
- Volatilidade = desvio padrão dos retornos = a medida oficial de risco.
- Regra empírica: ±1σ cobre ~68% dos casos; ±2σ, ~95%.
- Próxima unidade: comparar riscos de ativos com médias diferentes — coeficiente de variação e z-score.
