# Unidade 3: Mediana, moda e quando a média engana

## Comece aqui

Dez pessoas num bar ganham R$ 2.000 por mês. Entra um bilionário. A **média** salarial do bar vira dezenas de milhões — mas ninguém ali ficou mais rico. Quando os dados têm valores extremos, a média deixa de representar o "típico". Para isso existem a **mediana** e a **moda**.

## Ideia central

- **Mediana**: ordene os dados; é o valor do meio. Metade está abaixo, metade acima. Imune a extremos.
- **Moda**: o valor mais frequente. Útil para categorias e padrões.
- **Média**: o centro de gravidade — sensível a cada valor, inclusive aos absurdos.

As três juntas contam a história completa; cada uma sozinha pode enganar.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Mediana | O valor central dos dados ordenados (ou a média dos dois centrais, se $n$ for par) |
| Moda | O valor que mais se repete (pode haver mais de uma, ou nenhuma) |
| Outlier | Valor extremo, muito distante dos demais |
| Distribuição simétrica | Média ≈ mediana (dados equilibrados em torno do centro) |
| Assimetria à direita | Poucos valores gigantes puxam a média para cima (renda, retornos de startups) |
| Assimetria à esquerda | Poucos valores desastrosos puxam a média para baixo (crises raras e profundas) |

## O detector de assimetria

Comparar média e mediana é um teste instantâneo:

| Situação | Leitura |
|---|---|
| Média ≈ mediana | Distribuição equilibrada; a média é confiável |
| Média >> mediana | Poucos valores altos inflam a média (salários, prêmios de loteria) |
| Média << mediana | Poucos desastres derrubam a média (retornos com crises) |

Em finanças, retornos têm **caudas**: a maioria dos meses é morna, mas os poucos extremos (crashes e ralis) dominam o resultado. Por isso analistas olham mediana **e** os extremos, nunca só a média.

## Exemplo resolvido

Retornos mensais de um fundo em 9 meses (%): 1, 2, 1, 3, 2, 1, 2, −28, 2.

- **Média**: $\frac{1+2+1+3+2+1+2-28+2}{9} = \frac{-14}{9} \approx -1{,}6\%$ ao mês.
- **Mediana**: ordenando (−28, 1, 1, 1, 2, 2, 2, 2, 3) → o 5º valor = **+2%**.
- **Moda**: **2%** (aparece 4 vezes).

O mês típico do fundo foi +2% — mas **um único mês de crise** tornou a experiência real negativa. A mediana descreve o cotidiano; a média captura o desastre. Um investidor precisa das duas: viver de medianas e **sobreviver às médias**.

## Lista de problemas

1. Encontre média, mediana e moda de: 5, 7, 7, 8, 10, 12, 50.
2. No problema 1, remova o 50 e recalcule. Qual medida mudou mais? Por quê?
3. Salários numa startup (R$ mil): 3, 3, 3, 4, 4, 5, 45 (o fundador). Qual medida representa melhor o funcionário típico?
4. Uma amostra tem média 8 e mediana 12. Que tipo de assimetria isso sugere? Dê um exemplo financeiro compatível.
5. Retornos anuais: 8%, 9%, 7%, 8%, −35%, 9%. Calcule média e mediana e interprete a diferença em uma frase.
6. Desafio: invente uma série de 7 retornos em que a média seja positiva mas a mediana negativa. O que essa carteira faria com o psicológico do investidor?

??? note "Gabarito"
    1. Média = 99/7 ≈ 14,1; mediana = 8; moda = 7.
    2. Sem o 50: média = 49/6 ≈ 8,2 (despencou); mediana = 7,5 (quase igual). A média é sensível ao outlier.
    3. Mediana (R$ 4 mil) — a média (≈ R$ 9,6 mil) é fantasia para quem não é o fundador.
    4. Média << mediana: assimetria à esquerda; ex.: retornos com um ano de crash raro e profundo.
    5. Média = 1%; mediana = 8%. "O ano típico foi bom, mas um desastre raro consumiu quase todo o acumulado."
    6. Ex.: −1, −1, −1, −2, −1, +3, +40 → mediana = −1, média = +5,3. O investidor perde na maioria dos períodos e precisa de estômago para esperar o raro mês gigante — pouquíssimos aguentam.

## PBL

O corretor diz a Ana: "o rendimento médio dos imóveis da região foi 15% ao ano na última década". Investigando, Ana descobre que 18 dos 20 imóveis renderam entre 4% e 6%, e dois terrenos valorizaram 120% cada por causa de um shopping construído ao lado. Calcule aproximadamente a mediana e a média da região, explique qual número o corretor escolheu divulgar e por quê, e escreva as duas perguntas que Ana deveria fazer antes de comprar esperando "a média".

## Resumo

- Mediana = valor do meio (imune a extremos); moda = valor mais frequente.
- Média ≠ mediana denuncia assimetria — e retornos financeiros são assimétricos por natureza.
- Descreva o típico com a mediana; dimensione o risco com os extremos.
- Falta medir **o quanto** os dados se espalham: variância e desvio padrão — a próxima unidade, onde nasce a volatilidade.
