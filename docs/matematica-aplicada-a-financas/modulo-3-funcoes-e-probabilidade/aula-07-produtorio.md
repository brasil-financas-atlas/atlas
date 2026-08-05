# Unidade 7: Produtório (Π)

## Comece aqui

Se Σ manda somar, a letra grega **pi maiúscula (Π)** manda **multiplicar**. E multiplicar em sequência é o coração das finanças: rentabilidades **não se somam, se multiplicam**. Quem entende produtório nunca mais cai na pegadinha de "subiu 50% e caiu 50%, então empatou".

## Ideia central

$$
\prod_{k=1}^{n} a_k = a_1 \times a_2 \times a_3 \times \cdots \times a_n
$$

Mesmos três ingredientes do somatório (índice, limites, termo geral) — trocando soma por produto.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Π (pi maiúsculo) | "Multiplique tudo o que segue" |
| Fator de retorno | $1 + r$: retorno de 3% vira fator 1,03; queda de 2% vira 0,98 |
| Retorno acumulado | O produtório dos fatores, menos 1 |
| Fatorial ($n!$) | $\prod_{k=1}^{n} k$ — produtório dos inteiros; aparece na probabilidade |
| Log transforma Π em Σ | $\log \prod a_k = \sum \log a_k$ — a ponte entre as unidades 3, 6 e 7 |

## Por que retornos se multiplicam

Investimento rende +10% num mês e +20% no seguinte. O acumulado **não** é 30%:

$$
(1{,}10) \times (1{,}20) = 1{,}32 \;\Rightarrow\; +32\%
$$

Os 2 pontos extras são o rendimento do segundo mês **sobre o ganho do primeiro** — juros compostos, de novo. Em notação geral:

$$
R_{\text{acum}} = \prod_{t=1}^{n} (1 + r_t) - 1
$$

## A pegadinha clássica: +50% e −50%

$$
(1{,}50) \times (0{,}50) = 0{,}75 \;\Rightarrow\; -25\%
$$

Subir 50% e cair 50% **não** empata: perde-se um quarto do dinheiro. A queda incide sobre uma base maior. Corolário importante: uma queda de 50% exige alta de **100%** para recuperar. A assimetria das perdas é um produtório — e é por isso que controlar quedas importa tanto na montagem de carteira (Módulo 3 de Finanças).

## Exemplo resolvido

Um fundo teve retornos mensais no trimestre: +4%, −2%, +5%. Qual o retorno acumulado?

$$
\prod_{t=1}^{3}(1+r_t) = 1{,}04 \times 0{,}98 \times 1{,}05 = 1{,}07016 \;\Rightarrow\; +7{,}016\%
$$

A soma ingênua daria 7% — a diferença parece pequena em 3 meses, mas em anos de composição o erro da soma vira abismo. É exatamente assim que o site do seu banco calcula o "retorno acumulado em 12 meses": um produtório de 12 fatores.

## Lista de problemas

1. Calcule: $\prod_{k=1}^{4} k$ (isto é, $4!$) e $\prod_{k=1}^{3} 2k$.
2. Retornos de +2%, +3% e −1% em três meses: monte o produtório e calcule o acumulado.
3. Uma ação caiu 30% num ano e subiu 30% no seguinte. Qual o resultado acumulado? Por que não é zero?
4. Que alta é necessária para recuperar uma queda de 20%? E de 60%?
5. A inflação foi 0,5% ao mês por 12 meses. Escreva o produtório e calcule a inflação anual (dica: $1{,}005^{12} \approx 1{,}0617$).
6. Desafio: usando logaritmos, transforme $\prod_{t=1}^{n}(1+r_t)$ numa soma. Por que isso é útil para quem trabalha com muitos períodos?

??? note "Gabarito"
    1. $4! = 24$; $2 \cdot 4 \cdot 6 = 48$.
    2. $1{,}02 \times 1{,}03 \times 0{,}99 = 1{,}04009$ → +4,009%.
    3. $0{,}70 \times 1{,}30 = 0{,}91$ → −9%. A alta incide sobre base menor.
    4. Queda de 20%: $1/0{,}80 = 1{,}25$ → +25%. Queda de 60%: $1/0{,}40 = 2{,}5$ → +150%.
    5. $\prod_{t=1}^{12} 1{,}005 = 1{,}005^{12} \approx 1{,}0617$ → ~6,17% ao ano.
    6. $\log\prod(1+r_t) = \sum \log(1+r_t)$: somas são mais fáceis de manipular, calcular médias e programar em planilhas.

## PBL

Um influenciador postou: "Meu método rendeu 10% ao mês durante 6 meses. Total: 60%!". Verifique a afirmação com o produtório, calcule o valor correto e escreva um comentário educado (3–4 frases) corrigindo o erro e explicando por que a diferença entre somar e multiplicar retornos **aumenta** com o tempo. Bônus: mostre o que aconteceria com R$ 1.000 nos dois cálculos.

## Resumo

- Π multiplica em sequência; retornos financeiros compõem por produtório, nunca por soma.
- Retorno acumulado: $\prod(1+r_t) - 1$; quedas exigem altas maiores para recuperar.
- Logaritmo transforma produtórios em somatórios — as três notações do módulo se conectam.
- Próximas unidades: medir a incerteza — probabilidade.
