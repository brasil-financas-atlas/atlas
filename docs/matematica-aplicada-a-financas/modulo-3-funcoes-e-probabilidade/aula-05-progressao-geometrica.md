# Aula 5: Progressão geométrica (PG)

## Comece aqui

Na PA, cada termo é o anterior **mais** uma constante. Na **progressão geométrica**, cada termo é o anterior **vezes** uma constante: 1000, 1100, 1210, 1331... (cada um é o anterior × 1,10). Reconheceu? É o seu dinheiro rendendo 10% ao período. **A PG é a matemática dos juros compostos** — e a soma dela é a fórmula secreta por trás de toda simulação de aportes mensais.

## Ideia central

As mesmas duas perguntas da PA, agora com multiplicação:

1. **Termo geral**: para chegar ao termo $n$, multiplico o primeiro por $q$ um total de $n-1$ vezes:

$$
a_n = a_1 \cdot q^{\,n-1}
$$

2. **Soma dos $n$ primeiros termos**:

$$
S_n = a_1 \cdot \frac{q^n - 1}{q - 1} \quad (q \neq 1)
$$

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| PG | Sequência em que cada termo = anterior × razão |
| Razão ($q$) | O fator multiplicativo (nos juros: $q = 1 + i$) |
| Termo geral | $a_n = a_1 q^{n-1}$ — é a exponencial da aula 2 em versão discreta |
| Soma finita ($S_n$) | Soma dos $n$ primeiros termos |
| Soma infinita | Se $0 < q < 1$: $S_\infty = \dfrac{a_1}{1-q}$ — a base da perpetuidade do valuation |

## A conexão que une o módulo

Uma sequência de montantes com juros compostos é uma PG de razão $1+i$. E o **valor futuro de aportes mensais** — a pergunta mais prática das finanças pessoais — é a **soma de uma PG**: cada aporte rende por um número diferente de meses, formando os termos.

Aportando $P$ por mês a uma taxa $i$, após $n$ meses:

$$
VF = P \cdot \frac{(1+i)^n - 1}{i}
$$

Essa fórmula, que as calculadoras financeiras chamam de FV, é exatamente $S_n$ da PG com $a_1 = P$ e $q = 1+i$. Nada de mágica: é a soma da progressão.

## A soma infinita e a perpetuidade

Se $0 < q < 1$, os termos encolhem e a soma converge:

$$
S_\infty = \frac{a_1}{1 - q}
$$

No Módulo 2 de Finanças (valuation), o valor da **perpetuidade** — todos os fluxos de caixa futuros de uma empresa após o período projetado — usa exatamente essa ideia: fluxos descontados formam uma PG de razão $\frac{1}{1+i} < 1$, e a soma infinita vira $\frac{FC}{i}$. Agora você sabe de onde saiu aquele "18,2 ÷ 0,14" da aula de FCD.

## Exemplo resolvido

Ana aporta R$ 300 todo mês a 1% ao mês. Quanto tem em 2 anos?

$$
VF = 300 \cdot \frac{(1{,}01)^{24} - 1}{0{,}01} = 300 \cdot \frac{1{,}2697 - 1}{0{,}01} = 300 \cdot 26{,}97 \approx R\$\,8.092
$$

Ela depositou R$ 7.200 (24 × 300); os R$ 892 extras são a soma dos juros de cada aporte — os "degraus multiplicativos" da PG trabalhando juntos.

## Lista de problemas

1. Na PG (3, 6, 12, ...), identifique $a_1$ e $q$ e calcule $a_{10}$.
2. Os montantes anuais de um investimento são 2.000; 2.200; 2.420; ... Qual a taxa? Qual o montante no ano 6?
3. Calcule a soma dos 10 primeiros termos da PG (5, 10, 20, ...).
4. João aporta R$ 100/mês a 0,5% ao mês durante 5 anos. Use a fórmula do VF e calcule o total (dica: $1{,}005^{60} \approx 1{,}3489$).
5. Calcule $S_\infty$ da PG (100; 50; 25; ...). Interprete: por que uma soma infinita dá um número finito?
6. Desafio (perpetuidade): um FII promete R$ 0,90 por cota **para sempre**, e a taxa de desconto é 0,9% ao mês. Pelo modelo da soma infinita, quanto "vale" a cota?

??? note "Gabarito"
    1. $a_1 = 3$, $q = 2$; $a_{10} = 3 \cdot 2^9 = 1.536$.
    2. $q = 1{,}10$ → taxa 10% a.a.; $a_6 = 2000 \cdot 1{,}1^5 \approx R\$\,3.221{,}02$.
    3. $S_{10} = 5(2^{10}-1)/(2-1) = 5 \cdot 1023 = 5.115$.
    4. $VF = 100 \cdot (1{,}3489-1)/0{,}005 = 100 \cdot 69{,}77 \approx R\$\,6.977$.
    5. $S_\infty = 100/(1-0{,}5) = 200$ — os termos encolhem tão rápido que o total converge.
    6. $V = 0{,}90/0{,}009 = R\$\,100$ por cota.

## PBL

Um vendedor oferece a Carlos um consórcio: "R$ 400 por mês durante 5 anos e você resgata R$ 24.000" (400 × 60, sem rendimento). Usando a soma da PG, calcule quanto Carlos teria nos mesmos 5 anos aportando os R$ 400 num investimento a 0,8% ao mês, compare com a proposta e calcule quanto o "custo invisível" do consórcio representa. Apresente a resposta como se explicasse a um familiar que acha consórcio e investimento "a mesma coisa".

## Resumo

- PG: cada termo = anterior × razão; é a exponencial em passos discretos.
- $a_n = a_1 q^{n-1}$; soma finita $S_n = a_1\frac{q^n-1}{q-1}$; soma infinita $\frac{a_1}{1-q}$ quando $|q|<1$.
- O valor futuro de aportes mensais é a soma de uma PG; a perpetuidade do valuation é a soma infinita.
- Próxima aula: uma notação para escrever somas gigantes em uma linha — o somatório.
