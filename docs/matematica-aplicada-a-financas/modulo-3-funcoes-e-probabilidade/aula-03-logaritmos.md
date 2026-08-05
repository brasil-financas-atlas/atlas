# Unidade 3: Logaritmos

## Comece aqui

A unidade passada respondia "quanto vou ter depois de $t$ anos?". Mas a pergunta que investidores realmente fazem é a inversa: **"em quanto tempo meu dinheiro dobra?"**. Quando a incógnita está no expoente, a ferramenta para tirá-la de lá tem nome: **logaritmo**.

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

A propriedade 4 é o motivo de esta unidade existir: ela liberta o $t$ preso no expoente.

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

## Lista de problemas

1. Calcule sem calculadora: $\log_2 16$, $\log_3 81$, $\log_{10} 1000$, $\log_5 1$.
2. Reescreva como logaritmo: $2^{10} = 1024$; $1{,}05^t = 3$.
3. Use $\log 2 \approx 0{,}301$ e $\log 3 \approx 0{,}477$ para calcular $\log 6$ e $\log 8$ (só com as propriedades).
4. A 12% ao ano, em quanto tempo um capital dobra? Resolva com logaritmo e confira com a regra do 72.
5. Um investimento rende 0,9% ao mês. Em quantos meses R$ 5.000 chegam a R$ 8.000?
6. Desafio: uma população de bactérias triplica a cada hora. Depois de quanto tempo ela é 100 vezes a inicial?

??? note "Gabarito"
    1. 4; 4; 3; 0.
    2. $\log_2 1024 = 10$; $t = \log_{1{,}05} 3$.
    3. $\log 6 = \log 2 + \log 3 = 0{,}778$; $\log 8 = 3\log 2 = 0{,}903$.
    4. $t = \log 2 / \log 1{,}12 = 0{,}3010/0{,}0492 \approx 6{,}1$ anos; regra do 72: $72/12 = 6$ anos. ✓
    5. $1{,}009^t = 1{,}6 \Rightarrow t = \log 1{,}6 / \log 1{,}009 \approx 0{,}2041/0{,}00389 \approx 52{,}4$ → ~53 meses.
    6. $3^t = 100 \Rightarrow t = \log 100 / \log 3 = 2/0{,}477 \approx 4{,}2$ horas.

## PBL

Ana viu um anúncio: "duplique seu dinheiro conosco!". Investigando, descobriu que o produto rende 0,7% ao mês líquido. Usando logaritmos, calcule quantos **anos** o produto leva para cumprir a promessa. Depois, compare com um cartão de crédito que cobra 12% **ao mês**: em quantos meses uma dívida dobra? Escreva duas frases de conclusão sobre o que a assimetria entre esses dois tempos revela sobre juros no Brasil.

## Resumo

- Logaritmo é a potência lida ao contrário: encontra o expoente.
- $\log(a^n) = n\log a$ resolve qualquer "em quanto tempo?" dos juros compostos.
- A regra do 72 é o logaritmo disfarçado de conta de cabeça.
- Próxima unidade: sequências que somam sempre o mesmo — a progressão aritmética.
