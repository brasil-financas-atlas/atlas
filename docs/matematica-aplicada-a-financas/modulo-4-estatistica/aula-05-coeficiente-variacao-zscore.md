# Aula 5: Coeficiente de variação e z-score

## Comece aqui

O ativo X tem σ = 8% e o ativo Y tem σ = 12%. Y é mais arriscado? Depende: se Y rende o dobro, talvez o risco extra compense. E quando um dia de bolsa cai 4%, isso é "um dia ruim normal" ou "um evento histórico"? As duas perguntas se respondem **padronizando** — dividindo pela referência certa. São as duas ferramentas desta aula.

## Ideia central

- **Coeficiente de variação (CV)**: risco por unidade de retorno. Compara ativos de médias diferentes.

$$
CV = \frac{\sigma}{\bar{x}}
$$

- **Z-score**: quantos desvios padrão um valor está da média. Mede o quão atípico algo é.

$$
z = \frac{x - \bar{x}}{\sigma}
$$

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Coeficiente de variação | "Quanto risco eu corro por unidade de retorno?" — menor é melhor |
| Z-score | "Quão longe do normal está este valor?" — em unidades de σ |
| $z = 0$ | Exatamente na média |
| $|z| \leq 1$ | Rotina (~68% dos casos, pela regra empírica) |
| $|z| = 2$ | Incomum (fora disso, só ~5% dos casos) |
| $|z| \geq 3$ | Raro/extremo — em mercados, sinal de evento sério |

## CV: o "custo-benefício" do risco

| Ativo | Retorno médio | σ | CV |
|---|---:|---:|---:|
| X | 8% | 8% | 1,0 |
| Y | 16% | 12% | 0,75 |

Y tem **mais** desvio padrão, mas **menos** risco por unidade de retorno: cada ponto de retorno "custa" menos volatilidade. O CV inverte a conclusão ingênua — e é o ancestral direto de medidas profissionais como o índice de Sharpe, que você verá em materiais avançados (lá, subtrai-se antes a taxa livre de risco).

## Z-score: o termômetro do pânico

Se os retornos diários da bolsa têm média ~0% e σ ≈ 1,5%:

- Um dia de −1,5%: $z = -1$ → desagradável, mas rotina.
- Um dia de −4,5%: $z = -3$ → raro; manchete de jornal.
- Um dia de −13,5%: $z = -9$ → "impossível" pela regra empírica... e aconteceu (março/2020). Mercados têm caudas mais gordas que a distribuição normal sugere — guarde essa humildade.

## Exemplo resolvido

A nota de Ana no simulado foi 780. A média da turma foi 650, com σ = 65. O irmão dela fez 720 numa prova cuja média foi 600 com σ = 40. Quem foi relativamente melhor?

$$
z_{Ana} = \frac{780 - 650}{65} = 2{,}0 \qquad z_{irmão} = \frac{720 - 600}{40} = 3{,}0
$$

O irmão: está 3 desvios acima da média da prova dele (top ~0,1%), enquanto Ana está 2 (top ~2%). O z-score compara desempenhos em escalas diferentes — exatamente como compara um dia da bolsa brasileira com um dia do S&P 500, ou o retorno de um FII com o de uma ação.

## Lista de problemas

1. Fundo A: média 10%, σ = 5%. Fundo B: média 20%, σ = 9%. Calcule o CV dos dois e diga qual tem melhor relação risco-retorno.
2. Retornos diários com média 0% e σ = 2%: calcule o z-score de um dia de +5% e de um dia de −6%.
3. Um CDB rende em média 0,9% ao mês com σ = 0,1%; uma ação rende 1,5% ao mês com σ = 7%. Compare os CVs e interprete.
4. A altura média de uma turma é 1,70 m com σ = 0,08 m. Qual o z-score de alguém com 1,86 m? Isso é comum?
5. Por que o CV fica sem sentido quando a média é próxima de zero ou negativa?
6. Desafio: um gestor afirma que seu pior dia foi "um evento de 6 sigmas, imprevisível". Se σ diário = 1%, que queda foi essa? O que a frequência real de eventos "de 6 sigmas" nos mercados diz sobre o modelo do gestor?

??? note "Gabarito"
    1. $CV_A = 0{,}5$; $CV_B = 0{,}45$. B entrega mais retorno por unidade de risco.
    2. $z = 2{,}5$ e $z = -3$.
    3. $CV_{CDB} = 0{,}11$; $CV_{ação} \approx 4{,}7$. A ação carrega ~40 vezes mais risco por unidade de retorno — o prêmio dela precisa se justificar no longo prazo.
    4. $z = 2$ — incomum: só ~2,5% da turma é tão alta ou mais.
    5. Dividir por um número quase nulo explode o CV; com média negativa, o sinal perde interpretação. CV serve para grandezas positivas.
    6. Queda de ~6%. Pela normal, um evento de 6σ deveria ocorrer uma vez a cada ~500 milhões de dias — mas quedas assim acontecem a cada poucas décadas. Conclusão: os retornos reais têm caudas gordas; o modelo do gestor subestimava o risco, e "imprevisível" era, na verdade, "mal modelado".

## PBL

Você é o "analista de risco" da família. Seu tio compara dois investimentos: um fundo imobiliário (média 0,8% a.m., σ = 2%) e um fundo de ações (média 1,2% a.m., σ = 6%). Ele diz: "o de ações rende mais, é melhor". Calcule os CVs, monte os intervalos da regra empírica (±2σ) para um mês típico de cada fundo, e escreva sua recomendação em um parágrafo — incluindo a pergunta sobre o horizonte do tio, que (como você aprendeu no Módulo 3 de Finanças) pode mudar a resposta.

## Resumo

- CV = σ/média: risco por unidade de retorno; permite comparar ativos de escalas diferentes.
- Z-score = (valor − média)/σ: mede o quão atípico é um resultado.
- Mercados reais têm caudas gordas: respeite os eventos "impossíveis".
- Até aqui, cada variável foi analisada sozinha. A próxima aula mede como **duas** variáveis se movem juntas: covariância e correlação.
