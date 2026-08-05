# Unidade 8: Probabilidade — fundamentos

## Comece aqui

Finanças é o reino da incerteza: ninguém sabe se a bolsa sobe amanhã. Mas incerteza não é o mesmo que ignorância total — dá para **medir** o quanto algo é provável e tomar decisões melhores com essa medida. A probabilidade é a régua da incerteza.

## Ideia central

Probabilidade é um número entre 0 e 1 (ou 0% e 100%) que mede a chance de um evento:

$$
P(\text{evento}) = \frac{\text{casos favoráveis}}{\text{casos possíveis}}
$$

(quando todos os casos são igualmente prováveis). $P = 0$: impossível. $P = 1$: certo. $P = 0{,}5$: cara ou coroa.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Experimento aleatório | Situação com resultado incerto (lançar dado, retorno da bolsa amanhã) |
| Espaço amostral (Ω) | Todos os resultados possíveis |
| Evento | Um subconjunto de resultados que nos interessa |
| Evento complementar | "Não acontecer": $P(\bar{A}) = 1 - P(A)$ |
| Eventos independentes | Um não afeta o outro: $P(A \text{ e } B) = P(A) \times P(B)$ |
| Eventos mutuamente exclusivos | Não podem ocorrer juntos: $P(A \text{ ou } B) = P(A) + P(B)$ |
| Probabilidade frequentista | Estimada pela frequência histórica (como se faz em finanças) |

## As três regras de ouro

1. **Complementar**: se a chance de chover é 30%, a de não chover é 70%. Útil quando o "não" é mais fácil de calcular.
2. **"E" com independência → multiplica**: chance de dois caras seguidos = $0{,}5 \times 0{,}5 = 0{,}25$.
3. **"Ou" com exclusão → soma**: chance de um dado dar 1 **ou** 2 = $\frac{1}{6} + \frac{1}{6} = \frac{1}{3}$.

!!! note "O erro mais caro do investidor"
    Aplicar a regra da independência a eventos que **não** são independentes. "A chance de cada banco quebrar é 1%, então a de dois quebrarem juntos é 0,01%" — falso se uma mesma crise puxar os dois. Em crises, as correlações (Módulo 3 de Finanças) disparam, e eventos "independentes" acontecem juntos. Subestimar isso quebrou fundos famosos.

## Probabilidade em finanças: frequência histórica

Não existe "espaço amostral do Ibovespa", então usamos a abordagem frequentista: dos últimos 100 anos... dos últimos 120 meses, em quantos a bolsa subiu? Se subiu em 66, estimamos $P(\text{mês de alta}) \approx 0{,}55$... com uma honestidade: **o passado é amostra, não garantia** — tema do Módulo 4.

## Exemplo resolvido

Historicamente, suponha que a bolsa sobe em 60% dos meses ($P = 0{,}6$), e que os meses sejam independentes (simplificação!).

1. **Chance de dois meses seguidos de alta**: $0{,}6 \times 0{,}6 = 0{,}36$ → 36%.
2. **Chance de pelo menos um mês de alta em dois meses**: complementar de "nenhuma alta" = $1 - (0{,}4)^2 = 1 - 0{,}16 = 0{,}84$ → 84%.
3. **Chance de 6 quedas seguidas**: $(0{,}4)^6 \approx 0{,}0041$ → 0,4%. Raro, mas **não impossível** — em 30 anos (360 meses), espere ver isso acontecer. Quem monta carteira precisa sobreviver ao raro.

## Lista de problemas

1. Um dado justo é lançado. Calcule: $P(\text{par})$, $P(\text{maior que 4})$, $P(\text{par ou maior que 4})$ — cuidado, os eventos se sobrepõem!
2. A chance de uma ação subir num dia é 55%. Qual a chance de ela **não** subir?
3. Dois investimentos independentes têm 20% de chance de prejuízo cada. Qual a chance de ambos darem prejuízo? E de pelo menos um dar?
4. Uma carteira tem 3 ativos independentes, cada um com 10% de chance de perda no ano. Qual a chance de nenhum ter perda?
5. Explique com suas palavras por que a independência da questão 3 pode ser uma hipótese perigosa se os dois investimentos forem ações do mesmo setor.
6. Desafio: num pregão, a chance de alta é 52%. Em uma semana (5 pregões independentes), qual a chance de **todos** os dias fecharem em alta?

??? note "Gabarito"
    1. $P(\text{par}) = 3/6 = 1/2$; $P(>4) = 2/6 = 1/3$; par **ou** >4 = {2, 4, 6, 5} → $4/6 = 2/3$ (o 6 não conta duas vezes).
    2. $1 - 0{,}55 = 45\%$.
    3. Ambos: $0{,}2 \times 0{,}2 = 4\%$; pelo menos um: $1 - 0{,}8^2 = 36\%$.
    4. $0{,}9^3 = 72{,}9\%$.
    5. Mesma crise setorial derruba os dois juntos: a probabilidade conjunta real fica muito maior que 4%.
    6. $0{,}52^5 \approx 3{,}8\%$.

## PBL

Seu colega diz: "vou vender tudo — a bolsa caiu 4 dias seguidos, a chance de cair de novo amanhã é altíssima". Outro diz o oposto: "depois de 4 quedas, amanhã sobe com certeza, já caiu demais". Usando os conceitos de independência e da falácia do apostador, analise os dois argumentos: algum deles se sustenta matematicamente? Que informação **adicional** (além da sequência de quedas) tornaria razoável mudar a estimativa de probabilidade? Escreva sua resposta em um parágrafo para cada colega.

## Resumo

- Probabilidade mede incerteza de 0 a 1; complementar, "e" (multiplica) e "ou" (soma) resolvem a maioria dos casos.
- Em finanças, probabilidades vêm de frequências históricas — amostras, não garantias.
- Independência é hipótese forte: em crises, tudo cai junto.
- Próxima unidade: transformar probabilidades em decisões — o valor esperado.
