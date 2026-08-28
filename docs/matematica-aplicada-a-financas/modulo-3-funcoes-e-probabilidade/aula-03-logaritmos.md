# Aula 3: Logaritmos

## Comece aqui

A aula passada respondia "quanto vou ter depois de $t$ anos?". Mas a pergunta que investidores realmente fazem é a inversa: **"em quanto tempo meu dinheiro dobra?"**. Quando a incógnita está no expoente, a ferramenta para tirá-la de lá tem nome: **logaritmo**.

## Ideia central

Logaritmo é a pergunta invertida da potência:

$$
\log_b(y) = x \quad \Longleftrightarrow \quad b^x = y
$$

Em palavras: $\log_2(8)$ pergunta "2 elevado a **quanto** dá 8?". Resposta: 3. O logaritmo não é um bicho novo — é a mesma potência lida de trás para frente.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| $\log_b(y)$ | O expoente ao qual se eleva $b$ para obter $y$ |
| $\log$ (base 10) | O logaritmo padrão da calculadora |
| $\ln$ (base $e$) | Logaritmo natural, usado em juros contínuos e modelos avançados |
| Propriedade do produto | $\log(a \cdot c) = \log a + \log c$ |
| Propriedade da potência | $\log(a^n) = n \log a$ — **a chave para resolver juros compostos** |
| Regra do 72 | Atalho mental: tempo para dobrar ≈ $72 \div$ taxa (em %) |

## As propriedades que importam

1. $\log_b(1) = 0$ (qualquer base elevada a 0 dá 1);
2. $\log_b(b) = 1$;
3. $\log(a \cdot c) = \log a + \log c$ — logaritmo transforma multiplicação em soma;
4. $\log(a^n) = n \log a$ — logaritmo "puxa o expoente para baixo".

A propriedade 4 é o motivo de esta aula existir: ela liberta o $t$ preso no expoente.

## Resolvendo o tempo nos juros compostos

Em quantos anos R$ 1.000 viram R$ 2.000 a 10% ao ano?

$$
1000 \cdot 1{,}10^t = 2000 \;\Rightarrow\; 1{,}10^t = 2
$$

Aplicando log dos dois lados e usando a propriedade da potência:

$$
t \cdot \log(1{,}10) = \log(2) \;\Rightarrow\; t = \frac{\log 2}{\log 1{,}10} = \frac{0{,}3010}{0{,}0414} \approx 7{,}3 \text{ anos}
$$

**Confronto com a regra do 72**: $72 \div 10 = 7{,}2$ anos. A regra de bolso é uma aproximação excelente do cálculo exato — agora você sabe de onde ela vem.

## Exemplo resolvido

A inflação está em 6% ao ano. Em quanto tempo os preços **dobram** (ou seja, seu dinheiro parado perde metade do valor)?

$$
1{,}06^t = 2 \;\Rightarrow\; t = \frac{\log 2}{\log 1{,}06} = \frac{0{,}3010}{0{,}0253} \approx 11{,}9 \text{ anos}
$$

Doze anos de dinheiro no colchão = metade do poder de compra. O logaritmo transforma um número abstrato ("6% a.a.") em uma consequência concreta que qualquer pessoa entende.

## PBL

Ana viu um anúncio: "duplique seu dinheiro conosco!". Investigando, descobriu que o produto rende 0,7% ao mês líquido. Usando logaritmos, calcule quantos **anos** o produto leva para cumprir a promessa. Depois, compare com um cartão de crédito que cobra 12% **ao mês**: em quantos meses uma dívida dobra? Escreva duas frases de conclusão sobre o que a assimetria entre esses dois tempos revela sobre juros no Brasil.

## Resumo

- Logaritmo é a potência lida ao contrário: encontra o expoente.
- $\log(a^n) = n\log a$ resolve qualquer "em quanto tempo?" dos juros compostos.
- A regra do 72 é o logaritmo disfarçado de conta de cabeça.
- Próxima aula: sequências que somam sempre o mesmo — a progressão aritmética.
