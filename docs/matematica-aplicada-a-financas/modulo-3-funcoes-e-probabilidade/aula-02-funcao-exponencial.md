# Aula 2: Função exponencial

## Comece aqui

Na função afim, a variável está **multiplicando** ($2x$). Na exponencial, ela está **no expoente** ($2^x$). Parece detalhe, mas é a diferença entre andar e voar: a afim cresce somando sempre a mesma quantia; a exponencial cresce **multiplicando** pelo mesmo fator — e por isso acelera sem parar. Juros compostos, inflação acumulada e crescimento de populações vivem aqui.

## Ideia central

$$
f(x) = a \cdot b^x
$$

- $a$ é o valor inicial (quando $x = 0$, $f(0) = a \cdot b^0 = a$);
- $b$ é o **fator de crescimento** por passo: se $b > 1$, cresce; se $0 < b < 1$, decai;
- a cada passo, a saída é multiplicada por $b$ — o crescimento é proporcional ao tamanho atual.

É por isso que a exponencial "explode": quanto maior o valor, maior o próximo aumento. O dinheiro que rende juros sobre juros cresce exatamente assim.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Base ($b$) | O fator multiplicativo por período |
| Crescimento exponencial | $b > 1$: cada passo multiplica por mais de 1 |
| Decaimento exponencial | $0 < b < 1$: cada passo perde uma fração fixa |
| Fator de crescimento | $1 + i$: taxa de 10% vira fator 1,10 |
| Crescimento linear × exponencial | Somar o mesmo × multiplicar pelo mesmo |
| Assíntota | No decaimento, a curva se aproxima de zero sem nunca tocar |

## Juros compostos são uma exponencial

A fórmula que você conhece do Módulo 2:

$$
M(t) = C (1+i)^t
$$

é exatamente $f(x) = a \cdot b^x$ com $a = C$ e $b = 1+i$. Compare os dois regimes com C = R$ 1.000 e 10% ao ano:

| Ano | Simples: $1000 + 100t$ | Composto: $1000 \cdot 1{,}10^t$ |
|---:|---:|---:|
| 1 | 1.100 | 1.100 |
| 5 | 1.500 | 1.611 |
| 10 | 2.000 | 2.594 |
| 30 | 4.000 | 17.449 |

Nos primeiros anos, quase empatam. Em 30 anos, a exponencial entrega **mais de 4 vezes** o resultado da reta. Tempo é o combustível da exponencial — por isso começar a investir cedo importa tanto.

## Decaimento: a exponencial do prejuízo

Inflação corrói o poder de compra exponencialmente: com 6% ao ano, cada R$ 1 vale $1 \cdot (1/1{,}06)^t$ em poder de compra. Em 12 anos, metade. Mesma matemática, sinal trocado — a exponencial trabalha para quem investe e contra quem deixa o dinheiro parado.

## Exemplo resolvido

Uma aplicação rende 1% ao mês (juros compostos). Quanto R$ 5.000 viram em 2 anos?

$$
M = 5000 \cdot (1{,}01)^{24}
$$

Calculando a potência: $(1{,}01)^{24} \approx 1{,}2697$. Logo $M \approx 5000 \cdot 1{,}2697 = R\$\,6.348{,}67$.

Note o "bônus composto": 1% ao mês por 24 meses **não** é 24% — é 26,97%. Os quase 3 pontos extras são os juros sobre juros, o termo que a reta dos juros simples nunca captura.

## PBL

Duas irmãs recebem R$ 10.000 cada aos 20 anos. Alice investe imediatamente a 10% ao ano e nunca mais aporta. Bruna deixa parado e só investe aos 35, também a 10% ao ano — mas para compensar, coloca R$ 30.000. Quem chega aos 60 com mais dinheiro? Calcule os dois montantes, explique o resultado usando a natureza da função exponencial e escreva a "moral matemática" da história em uma frase.

## Resumo

- Exponencial: $f(x) = a \cdot b^x$ — cresce multiplicando, não somando.
- Juros compostos são a exponencial com $b = 1 + i$; o tempo é o expoente.
- Inflação e depreciação são decaimentos exponenciais ($b < 1$).
- Falta a operação inversa: dado o montante, descobrir o **tempo**. É o logaritmo — próxima aula.
