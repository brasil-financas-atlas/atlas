# Unidade 2: Médias — aritmética, ponderada e geométrica

## Comece aqui

"Qual foi o retorno médio?" parece pergunta simples — mas existem **três médias diferentes**, e usar a errada em finanças produz respostas erradas com cara de certas. Esta unidade ensina as três e, principalmente, **quando cada uma é a correta**.

## Ideia central

- **Aritmética**: soma tudo, divide pelo número de itens. A média do dia a dia.
- **Ponderada**: cada valor entra com um peso diferente. A média das carteiras.
- **Geométrica**: multiplica tudo e tira a raiz enésima. A média dos **retornos compostos** — a única que responde honestamente "quanto rendeu por ano, em média?".

## Conceitos essenciais

| Média | Fórmula | Quando usar |
|-------|---------|-------------|
| Aritmética | $\bar{x} = \dfrac{1}{n}\sum_{k=1}^{n} x_k$ | Valores independentes entre si (notas, gastos mensais) |
| Ponderada | $\bar{x}_p = \dfrac{\sum p_k x_k}{\sum p_k}$ | Itens com importâncias diferentes (retorno de carteira, custo médio de compra) |
| Geométrica | $\bar{x}_g = \sqrt[n]{x_1 \cdot x_2 \cdots x_n}$ | Fatores que se **multiplicam** (retornos em sequência, crescimento) |

Repare: as fórmulas usam o Σ e o Π do Módulo 3 — as notações estão trabalhando.

## Por que retornos exigem a geométrica

Um fundo rendeu +50% no ano 1 e −50% no ano 2.

- **Média aritmética**: $(50 - 50)/2 = 0\%$ ao ano. Parece que empatou.
- **Realidade** (produtório!): $1{,}50 \times 0{,}50 = 0{,}75$ → perdeu 25%.
- **Média geométrica dos fatores**: $\sqrt{1{,}50 \times 0{,}50} = \sqrt{0{,}75} \approx 0{,}866$ → **−13,4% ao ano**.

A geométrica é a taxa constante que produziria o mesmo resultado final — a única média compatível com juros compostos. A aritmética **sempre** superestima o retorno composto quando há oscilação; quanto mais volátil a série, maior a mentira. Materiais de marketing adoram a aritmética; agora você sabe por quê.

## A ponderada nas carteiras

Uma carteira com 70% em renda fixa (rendeu 10%) e 30% em ações (rendeu 20%):

$$
\bar{R} = 0{,}70 \times 10\% + 0{,}30 \times 20\% = 7\% + 6\% = 13\%
$$

Os pesos são as proporções da carteira — é a conta que fizemos nos testes de estresse do Módulo 3 de Finanças, agora com nome oficial.

## Exemplo resolvido

Carlos comprou a mesma ação em três meses: 100 ações a R$ 20, 200 a R$ 25 e 100 a R$ 30. Qual o **preço médio** de compra?

Ponderada (pesos = quantidades):

$$
\bar{P} = \frac{100(20) + 200(25) + 100(30)}{100+200+100} = \frac{2000 + 5000 + 3000}{400} = \frac{10000}{400} = R\$\,25
$$

A aritmética simples dos preços ($\frac{20+25+30}{3} = 25$) coincidiu por sorte aqui — se as quantidades fossem diferentes, divergiria. O custo médio da sua corretora é uma média ponderada.

## Lista de problemas

1. Calcule a média aritmética de: 4, 7, 9, 12, 18.
2. Notas 6,0 (peso 2), 8,0 (peso 3) e 9,0 (peso 5): qual a média ponderada?
3. Retornos anuais de +20%, +10% e −8%: calcule o retorno médio **geométrico** (dica: use os fatores 1,20; 1,10; 0,92).
4. No problema 3, calcule também a média aritmética e explique por que ela é maior.
5. Uma carteira tem 50% em Selic (+11%), 30% em IPCA+ (+7%) e 20% em ações (−12%). Qual o retorno da carteira?
6. Desafio: um investimento dobrou em 5 anos. Qual a taxa média geométrica anual? (Resolva com raiz quinta e confira com a regra do 72 da unidade de logaritmos.)

??? note "Gabarito"
    1. $50/5 = 10$.
    2. $(12 + 24 + 45)/10 = 8{,}1$.
    3. $\sqrt[3]{1{,}20 \times 1{,}10 \times 0{,}92} = \sqrt[3]{1{,}2144} \approx 1{,}0669$ → **+6,69% a.a.**
    4. Aritmética: $(20+10-8)/3 = 7{,}33\%$. Maior porque ignora o efeito da composição sobre bases diferentes; com volatilidade, aritmética > geométrica sempre.
    5. $0{,}5(11) + 0{,}3(7) + 0{,}2(-12) = 5{,}5 + 2{,}1 - 2{,}4 = +5{,}2\%$.
    6. $\sqrt[5]{2} \approx 1{,}1487$ → ~14,9% a.a. Regra do 72: $72/14{,}4 \approx 5$ anos. ✓

## PBL

Um fundo anuncia: "retorno médio de 12% ao ano nos últimos 4 anos!" Os retornos foram: +60%, −25%, +40%, −27%. Verifique se o "12%" é a média aritmética, calcule a média geométrica e o resultado acumulado de R$ 10.000 investidos, e escreva um parágrafo de "propaganda honesta" para o mesmo fundo — com o número que de fato representa a experiência do investidor.

## Resumo

- Aritmética para valores independentes; ponderada para pesos (carteiras, custo médio); geométrica para retornos que se compõem.
- Com volatilidade, aritmética > geométrica: desconfie de médias de retorno divulgadas.
- O retorno de uma carteira é a média ponderada dos retornos das classes.
- Mas média sozinha esconde muito. A próxima unidade mostra quando ela engana — mediana e moda.
