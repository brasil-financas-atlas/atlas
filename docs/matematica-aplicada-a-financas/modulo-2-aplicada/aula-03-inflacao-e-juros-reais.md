# Aula 3: Inflação e juros reais

## Comece aqui

Rentabilidade nominal é quanto seu dinheiro aumenta em reais. Mas se os preços também subiram, você não ficou proporcionalmente mais rico. Rentabilidade real é o que importa: quanto seu poder de compra aumentou depois de descontar a inflação.

## Ideia central

Se seu investimento rendeu 12% e a inflação foi 7%, você não ficou 12% mais rico. Você ficou mais rico em termos reais — mas menos do que 12%. O rendimento real é o que você consegue comprar a mais com seu dinheiro.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Inflação | Alta geral dos preços ao longo do tempo |
| IPCA | Índice oficial de inflação do Brasil (medido pelo IBGE) |
| Rentabilidade nominal | Rendimento em reais, antes de descontar inflação |
| Rentabilidade real | Rendimento depois de descontar a inflação |
| Poder de compra | Quantidade de bens que seu dinheiro consegue comprar |
| Juros reais | Taxa de juros que já considera a inflação |

## Fórmulas

| Para calcular | Use |
|---------------|-----|
| Juro real (exato — Fisher) | $(1 + i_{real}) = \dfrac{1 + i_{nominal}}{1 + IPCA}$ |
| Juro real (aproximação rápida) | $i_{real} \approx i_{nominal} - IPCA$ |
| Poder de compra futuro | $VF_{real} = \dfrac{VF_{nominal}}{(1 + IPCA)^t}$ |

??? warning "⚠️ Pegadinha Clássica de Mercado: Juros Reais não são a subtração simples!"
    Muitos investidores calculam o juro real subtraindo a inflação ($i_{real} \approx i_{nominal} - IPCA$).
    Essa aproximação gera distorções em cenários de juros ou inflação elevados. A **Equação de Fisher rigorosa** exige a divisão dos fatores: $(1 + i_{real}) = (1 + i_{nominal}) / (1 + IPCA)$.

**Fórmula exata de Fisher:**

$$
1 + r = \frac{1 + i}{1 + \pi}
$$

Onde:

- $r$ é o juro real
- $i$ é o juro nominal
- $\pi$ é a inflação (IPCA)

## Exemplo resolvido

Um investimento rendeu 12% no ano. O IPCA foi 7%.

**Pelo método aproximado:**

$$
r \approx 12\% - 7\% = 5\%
$$

**Pela fórmula exata:**

$$
1 + r = \frac{1{,}12}{1{,}07} \approx 1{,}0467
$$

$$
r \approx 4{,}67\%
$$

O investidor ficou cerca de 4,67% mais rico em poder de compra real — não 12%, não 5%.

## Cuidado comum

Em anos com inflação alta, investimentos que parecem render bem podem estar destruindo seu poder de compra.

Exemplo: Selic em 6% com IPCA em 8%.

$$
r \approx 6\% - 8\% = -2\%
$$

O investidor perdeu poder de compra mesmo vendo o saldo crescer em reais. Isso aconteceu no Brasil entre 2021 e 2022.

## PBL

Um investimento rendeu 12% no ano, mas a inflação foi 7%. O investidor diz: "fiquei 12% mais rico". Ele está certo? Explique usando o conceito de poder de compra e calcule o rendimento real pela fórmula exata.

## Resumo

- Inflação corrói o valor do dinheiro; o que importa é o rendimento real.
- A fórmula exata é: (1 + nominal) / (1 + inflação) − 1.
- O IPCA é o termômetro oficial da inflação no Brasil.
- A próxima aula explica como impostos e taxas cortam ainda mais o que sobra.
