# Aula 1: O que é uma função

## Comece aqui

Uma função é uma **máquina de transformar números**: entra um valor, sai outro, sempre seguindo a mesma regra. "Quanto vou ter se investir por $t$ meses?" é uma função. "Quanto pago de imposto se ganhar $x$?" é uma função. Dominar essa ideia destrava toda a matemática financeira que vem pela frente.

## Ideia central

Escrevemos $f(x)$ para dizer "o resultado da máquina $f$ quando entra $x$". A regra da máquina é uma fórmula:

$$
f(x) = 2x + 10
$$

significa: "pegue o que entrou, dobre e some 10". Então $f(5) = 2 \cdot 5 + 10 = 20$. Só isso — o resto é vocabulário e prática.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Função | Regra que associa cada entrada a exatamente uma saída |
| Domínio | O conjunto de entradas que fazem sentido |
| Imagem | O conjunto de saídas possíveis |
| Variável independente ($x$) | A entrada — o que você controla ou observa |
| Variável dependente ($y$ ou $f(x)$) | A saída — o que a regra devolve |
| Função afim (linear) | $f(x) = ax + b$: cresce em linha reta |
| Coeficiente angular ($a$) | Quanto a saída muda a cada unidade de entrada — a inclinação |
| Coeficiente linear ($b$) | O valor de partida, quando $x = 0$ |

## A função afim: a reta

$$
f(x) = ax + b
$$

- $b$ é onde tudo começa (o ponto de partida);
- $a$ é o ritmo constante de mudança (a inclinação da reta);
- se $a > 0$ a reta sobe; se $a < 0$, desce; se $a = 0$, é constante.

**Tradução financeira imediata**: os **juros simples** são uma função afim do tempo. Se você investe um capital $C$ a uma taxa $i$ por período:

$$
M(t) = C + (C \cdot i)\, t
$$

O ponto de partida $b$ é o capital $C$; a inclinação $a$ é o rendimento fixo por período $C \cdot i$. Juros simples crescem em linha reta — guarde isso, porque na próxima aula vamos compará-los com uma curva bem mais poderosa.

## Exemplo resolvido

Um plano de celular cobra R$ 30 fixos + R$ 2 por GB usado. O custo é a função $f(x) = 2x + 30$.

1. Quanto custa usar 8 GB? $f(8) = 2 \cdot 8 + 30 = R\$\,46$.
2. Com R$ 50 de orçamento, quantos GB dá para usar? Resolvo $2x + 30 = 50 \Rightarrow x = 10$ GB.
3. Domínio que faz sentido: $x \geq 0$ (não existe GB negativo).

A pergunta 2 mostra o movimento mais comum em finanças: **inverter a função** — sair da saída desejada e descobrir a entrada necessária. É o que você faz ao perguntar "quanto preciso aportar para chegar a R$ 10.000?".

## Lista de problemas

1. Se $f(x) = 3x - 4$, calcule $f(2)$, $f(0)$ e $f(10)$.
2. Um investimento em juros simples segue $M(t) = 1000 + 15t$ (em reais, $t$ em meses). Qual o capital inicial? Qual o rendimento mensal? Qual a taxa mensal?
3. No problema 2, em quantos meses o montante chega a R$ 1.450?
4. Uma corrida de aplicativo custa $f(d) = 5 + 1{,}80d$ ($d$ em km). Com R$ 23, qual a distância máxima?
5. Escreva a função do montante em juros simples para C = R$ 2.000 e taxa de 1,5% ao mês, e calcule o montante após 2 anos.
6. Por que $M(t) = C(1+it)$ e $M(t) = C + Cit$ são a mesma função? Mostre algebricamente.

??? note "Gabarito"
    1. $f(2)=2$; $f(0)=-4$; $f(10)=26$.
    2. Capital: R$ 1.000; rendimento: R$ 15/mês; taxa: $15/1000 = 1{,}5\%$ a.m.
    3. $1000 + 15t = 1450 \Rightarrow t = 30$ meses.
    4. $5 + 1{,}80d = 23 \Rightarrow d = 10$ km.
    5. $M(t) = 2000 + 30t$; após 24 meses: $M(24) = 2000 + 720 = R\$\,2.720$.
    6. Fatorando $C$ em evidência: $C + Cit = C(1 + it)$ — propriedade distributiva.

## PBL

João compara duas propostas de mesada por ajudar na loja da família: (a) R$ 80 fixos por mês; (b) R$ 20 fixos + R$ 6 por dia trabalhado. Modele as duas como funções do número de dias $d$, descubra a partir de quantos dias a proposta (b) vence a (a), desenhe (ou descreva) as duas retas e explique o que o "ponto de encontro" delas significa. Depois responda: qual proposta tem mais **risco**, e por quê?

## Resumo

- Função é uma regra: cada entrada tem exatamente uma saída; $f(x)$ é a notação.
- A função afim $f(x) = ax + b$ cresce em linha reta: $b$ é o início, $a$ é o ritmo.
- Juros simples são uma função afim do tempo: $M(t) = C(1 + it)$.
- Na próxima aula, a curva que rege os juros compostos: a função exponencial.
