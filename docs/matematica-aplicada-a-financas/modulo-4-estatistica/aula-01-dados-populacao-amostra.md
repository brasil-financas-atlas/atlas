# Unidade 1: Dados, população e amostra

## Comece aqui

O Módulo 3 terminou com uma pergunta incômoda: de onde vêm as probabilidades? Em finanças, elas vêm de **dados** — séries de preços, retornos, inflação. A estatística é a arte de extrair conclusões honestas desses dados. E a primeira honestidade é saber a diferença entre **tudo** (população) e **o pedaço que temos** (amostra).

## Ideia central

- **População**: o conjunto completo do que se quer estudar (todos os retornos mensais que a bolsa terá, passados e futuros).
- **Amostra**: a parte observável (os últimos 120 meses).

Quase nunca temos a população — trabalhamos com amostras e **inferimos**. Toda conclusão estatística carrega essa incerteza de origem: outra amostra daria números um pouco diferentes.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Dado | Um valor observado (o retorno de jan/2025 foi +2,1%) |
| Variável | A característica medida (retorno mensal, preço, inflação) |
| Variável quantitativa | Numérica: discreta (nº de trades) ou contínua (retorno %) |
| Variável qualitativa | Categoria: setor da empresa, rating de crédito |
| População | Todos os casos possíveis |
| Amostra | O subconjunto que observamos |
| Série temporal | Dados ordenados no tempo — o formato padrão em finanças |
| Viés de amostra | Quando a amostra não representa a população |

## O viés: onde a estatística financeira mais erra

Uma amostra ruim gera conclusões erradas com aparência de ciência:

- **Viés de período**: medir a bolsa só de 2016 a 2019 (só anos bons) "prova" que ela sempre sobe.
- **Viés de sobrevivência**: a média dos fundos **que existem hoje** ignora os que quebraram no caminho — os piores sumiram da conta.
- **Amostra pequena**: 12 meses de retornos dizem quase nada; o acaso domina.

Regra de bolso do analista: antes de aceitar qualquer estatística, pergunte "**qual foi a amostra?** Período, tamanho, quem ficou de fora?".

## Exemplo resolvido

Ana quer estimar o retorno típico mensal de um ETF do Ibovespa.

1. **Variável**: retorno mensal (%) — quantitativa contínua, em série temporal.
2. **População**: todos os retornos mensais possíveis do índice (inatingível).
3. **Amostra escolhida**: últimos 60 meses (5 anos) — inclui anos bons e ruins, reduzindo viés de período.
4. **Limitação declarada**: 60 observações ainda é pouco para eventos raros (crises acontecem a cada década); os números que ela calcular nas próximas unidades valem como estimativa, não como promessa.

Esse hábito — declarar variável, amostra e limitação **antes** de calcular qualquer média — é o que separa análise de achismo.

## Lista de problemas

1. Classifique as variáveis: (a) setor de uma empresa; (b) dividend yield; (c) número de funcionários; (d) rating "AAA/AA/A".
2. Para estimar a inadimplência dos clientes de um banco gigante, analisou-se os clientes de **uma** agência de bairro nobre. Identifique população, amostra e o problema.
3. Um site anuncia: "os fundos multimercado renderam em média 14% a.a. na última década". Que viés pode inflar esse número?
4. Por que "a bolsa nunca caiu em ano de Copa" (baseado em 5 Copas) não é uma conclusão estatística confiável?
5. Dê um exemplo de série temporal financeira e um de dado que **não** é série temporal.
6. Desafio: você quer saber o gasto médio mensal dos alunos da sua escola. Desenhe uma amostra razoável (tamanho, como escolher, o que evitar).

??? note "Gabarito"
    1. (a) qualitativa; (b) quantitativa contínua; (c) quantitativa discreta; (d) qualitativa ordinal.
    2. População: todos os clientes do banco; amostra: clientes de uma agência de perfil de renda alto; problema: amostra enviesada — inadimplência subestimada.
    3. Viés de sobrevivência: fundos que quebraram ou fecharam saíram da média.
    4. Amostra minúscula (n = 5): o acaso explica facilmente o padrão; não há relação causal plausível.
    5. Série temporal: preços diários de uma ação. Não série: a lista dos P/L das empresas do índice **hoje** (corte transversal).
    6. Exemplo: sortear ~50 alunos de todas as séries e turnos (não só a sua turma), coletar anonimamente, evitar voluntários apenas (quem se voluntaria pode gastar diferente).

## PBL

Um canal de investimentos publicou: "Análise de 3 anos mostra que nossa carteira recomendada rende o dobro do CDI". Monte a lista de perguntas que você faria sobre a **amostra** dessa afirmação (mínimo 5), explicando o que cada resposta poderia revelar. Depois, descreva como você desenharia um teste honesto da mesma afirmação.

## Resumo

- Estatística transforma dados em conclusões — sempre a partir de amostras, nunca da população inteira.
- Vieses de período, sobrevivência e amostra pequena fabricam conclusões falsas.
- Declare variável, amostra e limitações antes de calcular.
- Com dados confiáveis em mãos, a próxima unidade resume tudo num número: as médias.
