# Unidade 9: Valor esperado e análise de cenários

## Comece aqui

Saber que algo tem 30% de chance é útil; saber **quanto vale** uma aposta com 30% de chance é decisivo. O **valor esperado** junta probabilidade com dinheiro numa única conta — é a ferramenta que separa decisões de palpites, e o fecho perfeito deste módulo.

## Ideia central

O valor esperado (esperança matemática) é a **média ponderada pelos resultados possíveis**, onde os pesos são as probabilidades:

$$
E[X] = \sum_{k=1}^{n} p_k \cdot x_k
$$

Reconheceu o Σ da unidade 6? Cada cenário $x_k$ entra multiplicado pela sua probabilidade $p_k$. É "o resultado médio se a situação se repetisse muitas vezes".

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Valor esperado $E[X]$ | Média dos resultados ponderada pelas probabilidades |
| Cenário | Um futuro possível, com resultado e probabilidade estimados |
| Retorno esperado | O $E[X]$ dos retornos de um ativo ou carteira |
| Jogo justo | Aposta com $E[X] = 0$ |
| Assimetria de payoff | Ganhos e perdas de tamanhos diferentes — o que o $E[X]$ captura e a intuição não |

## O exemplo que vacina contra loteria

Uma rifa custa R$ 10, tem 1.000 bilhetes e um prêmio de R$ 6.000:

$$
E[X] = \frac{1}{1000}(6000 - 10) + \frac{999}{1000}(-10) = 5{,}99 - 9{,}99 = -R\$\,4{,}00
$$

Cada bilhete "vale" −R$ 4: quem joga muitas vezes perde, em média, R$ 4 por jogada. Loterias reais são ainda piores. Diversão pode justificar; matemática, nunca.

## Análise de cenários: o valor esperado do analista

É assim que analistas usam $E[X]$ na prática (e que a BRHSIC espera ver num pitch):

| Cenário | Probabilidade | Retorno da ação |
|---|---:|---:|
| Otimista (novo produto decola) | 25% | +40% |
| Base (negócio segue normal) | 55% | +12% |
| Pessimista (recessão no setor) | 20% | −30% |

$$
E[R] = 0{,}25(40\%) + 0{,}55(12\%) + 0{,}20(-30\%) = 10 + 6{,}6 - 6 = +10{,}6\%
$$

## Exemplo resolvido

João pode escolher entre dois projetos para investir R$ 1.000:

- **Projeto A**: 90% de chance de ganhar R$ 200; 10% de perder R$ 100.
- **Projeto B**: 30% de chance de ganhar R$ 1.500; 70% de perder R$ 300.

$$
E[A] = 0{,}9(200) + 0{,}1(-100) = 180 - 10 = +R\$\,170
$$

$$
E[B] = 0{,}3(1500) + 0{,}7(-300) = 450 - 210 = +R\$\,240
$$

B tem valor esperado maior — mas 70% de chance de perder. E agora? O valor esperado **não é o único critério**: se João só tem esses R$ 1.000 e não pode perder, A é a escolha racional; se é uma aposta pequena e repetível dentro de uma carteira, B compensa mais no longo prazo. $E[X]$ informa; o **perfil e o tamanho da aposta** (Módulo 3 de Finanças) decidem. Matemática e gestão de risco andam juntas.

## Lista de problemas

1. Um dado paga R$ 60 se sair 6 e nada nos demais. Qual o valor esperado do jogo? Quanto seria justo pagar para jogar?
2. Calcule $E[X]$: 40% de chance de +10%; 60% de chance de −5%.
3. Um seguro de celular custa R$ 150/ano. A chance de sinistro é 8%, com prejuízo médio de R$ 1.400. Qual o $E[X]$ de **não** fazer o seguro? E o de fazer? O que a diferença representa para a seguradora?
4. Monte o retorno esperado: cenário bom (30%, +25%), neutro (50%, +8%), ruim (20%, −20%).
5. Uma aposta tem $E[X] = +R\$\,50$, mas 95% de chance de perder R$ 100. Descreva o payoff do cenário de ganho e explique por que alguém racional poderia recusá-la mesmo com $E[X] > 0$.
6. Desafio: um bilhete de loteria custa R$ 5 e o $E[X]$ é −R$ 3,50. Se 10 milhões de bilhetes são vendidos, quanto a loteria arrecada líquido, em média?

??? note "Gabarito"
    1. $E = \frac{1}{6}(60) = R\$\,10$; jogar custando até R$ 10 é justo (abaixo, vantajoso).
    2. $0{,}4(10) + 0{,}6(-5) = 4 - 3 = +1\%$.
    3. Sem seguro: $0{,}08(-1400) = -R\$\,112$/ano. Com seguro: −R$ 150 fixos. A diferença (R$ 38) é o lucro esperado + custos da seguradora — e o preço da sua tranquilidade.
    4. $7{,}5 + 4 - 4 = +7{,}5\%$.
    5. Para $E = 50$: $0{,}05 \cdot G + 0{,}95(-100) = 50 \Rightarrow G = R\$\,2.900$. Recusável porque quase sempre se perde — sem capital para repetir a aposta muitas vezes, a "média" nunca chega.
    6. Perda média por bilhete = R$ 3,50 → arrecadação líquida ≈ R$ 35 milhões.

## PBL — projeto final do módulo

Monte a análise de cenários de uma decisão real da sua vida (ex.: fazer um curso pago, comprar um equipamento para renda extra, trocar de escola). Defina 3 cenários com probabilidades que somem 100%, estime o resultado financeiro de cada um, calcule o valor esperado com a notação Σ, e escreva a recomendação final considerando também o pior caso ("eu sobrevivo ao cenário pessimista?"). Formato: meia página, com a tabela de cenários.

## Resumo

- $E[X] = \sum p_k x_k$: a média dos futuros ponderada pelas chances.
- Valor esperado desmascara loterias e precifica cenários de investimento.
- $E[X]$ positivo não basta: o tamanho da aposta e a sobrevivência ao pior caso decidem.
- **Módulo concluído!** No Módulo 4, deixamos os cenários hipotéticos e aprendemos a extrair probabilidades e riscos de **dados reais**: estatística.
