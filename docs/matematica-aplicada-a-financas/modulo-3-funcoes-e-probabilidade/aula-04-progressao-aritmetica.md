# Aula 4: Progressão aritmética (PA)

## Comece aqui

Uma **progressão aritmética** é uma fila de números em que cada termo é o anterior **mais uma constante**: 100, 150, 200, 250... A constante (aqui, 50) chama-se **razão**. Se você guarda R$ 50 por mês na gaveta, seu dinheiro forma uma PA. Simples assim — e com duas fórmulas, você calcula qualquer termo e qualquer soma sem contar nos dedos.

## Ideia central

A PA é o "primo discreto" da função afim da aula 1: cresce em passos iguais. As duas perguntas clássicas são:

1. **Qual é o enésimo termo?** (quanto terei na gaveta no mês 24?)
2. **Quanto vale a soma de todos os termos até ali?** (quanto guardei no total?)

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| PA | Sequência em que cada termo = anterior + razão |
| Razão ($r$) | O passo fixo da sequência (pode ser negativo!) |
| Termo geral ($a_n$) | Fórmula para saltar direto ao termo $n$ |
| Soma dos $n$ termos ($S_n$) | Total acumulado sem somar um a um |
| PA crescente / decrescente | $r > 0$ / $r < 0$ |

## As duas fórmulas

**Termo geral** — para chegar ao termo $n$, parto do primeiro e dou $n-1$ passos de tamanho $r$:

$$
a_n = a_1 + (n-1)\,r
$$

**Soma** — truque de Gauss: emparelhando o primeiro com o último, o segundo com o penúltimo... cada par soma o mesmo. São $n/2$ pares:

$$
S_n = \frac{(a_1 + a_n)\,n}{2}
$$

## Onde a PA aparece em finanças

- **Poupança sem juros** (dinheiro na gaveta/conta corrente): saldo é uma PA de razão = aporte.
- **Juros simples**: os montantes mês a mês formam uma PA de razão $C \cdot i$ (a aula 1 mostrou isso como reta; PA é a mesma reta em passos).
- **Amortização constante (tipo SAC)**: num financiamento SAC, as prestações **caem em PA**, porque os juros diminuem sobre um saldo que cai o mesmo valor todo mês.

## Exemplo resolvido

Carlos guarda na conta (sem render) R$ 200 no primeiro mês e aumenta R$ 20 a cada mês: 200, 220, 240...

**Quanto ele deposita no 12º mês?**

$$
a_{12} = 200 + (12-1) \cdot 20 = 200 + 220 = R\$\,420
$$

**Quanto acumulou no ano?**

$$
S_{12} = \frac{(200 + 420) \cdot 12}{2} = \frac{620 \cdot 12}{2} = R\$\,3.720
$$

Duas fórmulas, zero soma manual. Guarde a comparação para a próxima aula: se esse dinheiro rendesse juros, a sequência deixaria de ser PA — os passos cresceriam.

## PBL

A prefeitura oferece dois planos de estágio de 24 meses: Plano A começa em R$ 800 com aumento de R$ 40 por mês; Plano B começa em R$ 1.000 fixo, sem aumento. Modele os salários mensais como sequências, descubra em que mês o A ultrapassa o B, calcule o total recebido em cada plano nos 24 meses e decida qual escolher — considerando também um cenário em que o estágio pode acabar no mês 10.

## Resumo

- PA: cada termo = anterior + razão; é o crescimento em linha reta, em versão discreta.
- $a_n = a_1 + (n-1)r$ salta ao termo; $S_n = (a_1+a_n)n/2$ soma tudo.
- Juros simples, poupança sem juros e prestações SAC vivem em PA.
- Quando o passo **multiplica** em vez de somar, nasce a PG — a matemática dos juros compostos. Próxima aula.
