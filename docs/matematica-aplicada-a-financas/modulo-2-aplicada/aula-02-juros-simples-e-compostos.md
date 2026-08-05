# Aula 2: Juros simples e compostos

## Comece aqui

Juros são o preço do dinheiro no tempo. Quem empresta dinheiro quer receber mais no futuro. Quem pega dinheiro emprestado paga por antecipar consumo ou investimento.

Existem dois regimes de juros: simples e compostos. Na vida real de investimentos brasileiros, quase tudo funciona em juros compostos — mas entender os dois evita erros de cálculo.

## Ideia central

Nos juros simples, você ganha juros só sobre o capital inicial. Nos juros compostos, você ganha juros sobre o capital inicial **e** sobre os juros que já acumulou. Isso cria o efeito de "bola de neve".

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Capital inicial (VP) | O dinheiro que você coloca no início |
| Taxa de juros (i) | O percentual que o dinheiro rende por período |
| Prazo (n) | Número de períodos (meses, anos) |
| Valor futuro (VF) | O total que você terá ao final |
| Juros simples | Rendimento calculado só sobre o capital inicial |
| Juros compostos | Rendimento calculado sobre capital + juros acumulados |

## Fórmulas

**Juros simples:**

$$
VF = VP \times (1 + i \times n)
$$

**Juros compostos:**

$$
VF = VP \times (1+i)^n
$$

## Exemplo resolvido

João investe R$1.000 a 10% ao ano. Veja a diferença após 3 anos:

**Juros simples:**

$$
VF = 1000 \times (1 + 0{,}10 \times 3) = 1000 \times 1{,}30 = R\$1.300
$$

**Juros compostos:**

$$
VF = 1000 \times (1 + 0{,}10)^3 = 1000 \times 1{,}331 = R\$1.331
$$

A diferença parece pequena em 3 anos. Mas compare em 30 anos:

- Juros simples: R$1.000 × (1 + 0,10 × 30) = **R$4.000**
- Juros compostos: R$1.000 × (1,10)³⁰ ≈ **R$17.449**

O mesmo capital, a mesma taxa, mas o resultado é mais de 4 vezes maior com juros compostos. Isso é o poder do tempo.

## Cuidado comum

Empréstimos no Brasil geralmente usam juros compostos. Uma taxa de 10% ao mês parece razoável até você calcular:

$$
VF = 1000 \times (1{,}10)^{12} \approx R\$3.138
$$

Uma dívida de R$1.000 vira R$3.138 em apenas 1 ano sem pagar nada.

## Mini quiz

1. Qual é a diferença entre juros simples e compostos?
2. R$500 a 5% ao ano por 4 anos em juros simples: qual o valor futuro?
3. R$500 a 5% ao ano por 4 anos em juros compostos: qual o valor futuro?
4. Por que tempo importa muito mais nos juros compostos do que nos simples?
5. Em qual regime se encaixam os investimentos brasileiros como CDB e Tesouro Direto?

## PBL

Duas pessoas investem R$1.000 a 10% ao ano em juros compostos. Maria deixa por 10 anos. Pedro deixa por 30 anos.

A diferença de prazo é 3 vezes maior — mas a diferença no resultado final é muito mais do que 3 vezes. Calcule os dois valores e explique por que isso acontece.

## Resumo

- Juros simples rendem sobre o capital inicial; compostos rendem sobre tudo que já acumulou.
- A diferença entre os dois cresce exponencialmente com o tempo.
- Investimentos brasileiros usam juros compostos — isso beneficia quem investe e prejudica quem se endivida.
- A próxima aula mostra como a inflação corrói esse rendimento.
