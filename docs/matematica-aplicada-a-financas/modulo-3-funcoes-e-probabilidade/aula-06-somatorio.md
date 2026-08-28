# Unidade 6: Somatório (Σ)

## Comece aqui

Escrever "some o fluxo de caixa do ano 1, mais o do ano 2, mais o do ano 3... até o ano 30" ocupa uma linha inteira e convida ao erro. A matemática tem uma abreviação para isso: a letra grega **sigma maiúscula (Σ)**. Aprender a ler somatório é aprender a ler a linguagem em que fórmulas de finanças são escritas — do valuation à estatística.

## Ideia central

$$
\sum_{k=1}^{n} a_k = a_1 + a_2 + a_3 + \cdots + a_n
$$

Leia assim: "some os termos $a_k$, com $k$ começando em 1 e indo até $n$". Três ingredientes:

- **índice** ($k$): o contador que varia;
- **limites** (de 1 até $n$): onde o contador começa e termina;
- **termo geral** ($a_k$): a expressão que é somada a cada passo.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Σ (sigma) | "Some tudo o que segue" |
| Índice do somatório | A variável que percorre os valores (k, i, t...) |
| Limites | Valor inicial (embaixo) e final (em cima) do índice |
| Termo geral | A fórmula somada a cada valor do índice |
| Propriedade da constante | $\sum c \cdot a_k = c \sum a_k$ — constante sai para fora |
| Propriedade da soma | $\sum (a_k + b_k) = \sum a_k + \sum b_k$ |

## Treinando a leitura

$$
\sum_{k=1}^{4} k^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30
$$

$$
\sum_{t=1}^{3} \frac{100}{(1{,}10)^t} = \frac{100}{1{,}10} + \frac{100}{1{,}21} + \frac{100}{1{,}331} \approx 90{,}91 + 82{,}64 + 75{,}13 = 248{,}68
$$

O segundo exemplo é **literalmente o valor presente de três fluxos de caixa de R$ 100** descontados a 10% — a fórmula central do valuation (Módulo 2 de Finanças), agora legível.

## As fórmulas de finanças em notação Σ

**Valor presente de um projeto** (FCD):

$$
VP = \sum_{t=1}^{n} \frac{FC_t}{(1+i)^t}
$$

**Média de retornos** (que o Módulo 4 vai usar o tempo todo):

$$
\bar{R} = \frac{1}{n}\sum_{t=1}^{n} R_t
$$

Quando você encontrar essas fórmulas num livro (Assaf Neto, CFA), já não são hieróglifos: são instruções de soma com contador.

## Exemplo resolvido

Um food truck projeta lucros de R$ 2.000 no mês 1, crescendo R$ 500 por mês, durante 6 meses. Escreva o total em notação de somatório e calcule.

O lucro do mês $k$ é $a_k = 2000 + 500(k-1)$ (uma PA!). Total:

$$
\sum_{k=1}^{6} \left[2000 + 500(k-1)\right] = \sum_{k=1}^{6} 2000 + 500\sum_{k=1}^{6}(k-1) = 12000 + 500(0+1+2+3+4+5) = 12000 + 7500 = R\$\,19.500
$$

Usei as duas propriedades: a constante somada 6 vezes e a constante multiplicativa saindo do Σ. Conferindo pela fórmula da PA: $S_6 = (2000 + 4500) \cdot 6/2 = 19.500$. ✓

## PBL

Sua escola quer arrecadar fundos vendendo doces por 10 semanas. O plano prevê vender 40 doces na semana 1 e crescer 15% por semana (lucro de R$ 2 por doce). Escreva o lucro total em notação de somatório, identifique que tipo de progressão está dentro do Σ, calcule o total com a fórmula apropriada da aula 5 e apresente o resultado num mini-relatório de 5 linhas para a coordenação — incluindo a fórmula, para impressionar.

## Resumo

- Σ abrevia somas: índice, limites e termo geral.
- Constantes saem do somatório; somas se separam.
- VP de fluxos de caixa e médias de retorno são somatórios — agora você lê as fórmulas dos livros.
- Se Σ soma, existe o irmão que multiplica: o produtório Π. Próxima aula.
