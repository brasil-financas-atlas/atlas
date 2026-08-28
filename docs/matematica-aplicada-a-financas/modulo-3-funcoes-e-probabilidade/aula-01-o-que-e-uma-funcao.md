# Unidade 1: O que é uma função

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

## PBL

João compara duas propostas de mesada por ajudar na loja da família: (a) R$ 80 fixos por mês; (b) R$ 20 fixos + R$ 6 por dia trabalhado. Modele as duas como funções do número de dias $d$, descubra a partir de quantos dias a proposta (b) vence a (a), desenhe (ou descreva) as duas retas e explique o que o "ponto de encontro" delas significa. Depois responda: qual proposta tem mais **risco**, e por quê?

## Resumo

- Função é uma regra: cada entrada tem exatamente uma saída; $f(x)$ é a notação.
- A função afim $f(x) = ax + b$ cresce em linha reta: $b$ é o início, $a$ é o ritmo.
- Juros simples são uma função afim do tempo: $M(t) = C(1 + it)$.
- Na próxima aula, a curva que rege os juros compostos: a função exponencial.
