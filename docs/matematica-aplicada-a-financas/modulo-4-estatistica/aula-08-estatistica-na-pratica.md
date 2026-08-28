# Aula 8: Estatística na prática — lendo números sem se enganar

## Comece aqui

Você agora sabe calcular médias, desvios, correlações e regressões. A última habilidade é a mais valiosa: **desconfiar direito**. O mundo financeiro produz estatísticas verdadeiras que induzem conclusões falsas — e quem sabe reconhecer os truques protege o próprio dinheiro e escreve análises mais honestas.

## Ideia central

Estatística não mente, mas o **recorte** mente: o período escolhido, a média escolhida, a escala do gráfico, a amostra que sobreviveu. O kit de defesa é um checklist de perguntas que você aplica a qualquer número antes de acreditar nele.

## O checklist do analista cético

| Pergunta | Truque que ela desarma |
|---|---|
| Qual é a amostra? Período, tamanho, quem ficou de fora? | Viés de período e de sobrevivência (aula 1) |
| Média de quê — aritmética, ponderada, geométrica? | Retornos inflados por média errada (aula 2) |
| E a mediana? Bate com a média? | Outliers e assimetria escondidos (aula 3) |
| Qual o desvio padrão disso? | "Rende 2% ao mês" sem contar o risco (aula 4) |
| Comparado com o quê? (CV, z-score, benchmark) | Números impressionantes sem referência (aula 5) |
| Correlação ou causalidade? Há variável escondida? | Narrativas convincentes e falsas (aula 6) |
| O modelo vale fora do intervalo dos dados? | Extrapolação e betas de época calma (aula 7) |
| Quantas tentativas houve antes desse "acerto"? | Sobrevivência de estratégias: entre 1.000 macacos jogando moedas, alguns acertam 10 seguidas |

## Três armadilhas que merecem close

**1. O gráfico com eixo cortado.** Um fundo mostra crescimento "explosivo" — mas o eixo y começa em 98 e termina em 103. Variação real: 5%. Sempre olhe a escala.

**2. O retorno anualizado de período curto.** "Rendeu 6% no primeiro trimestre = 26% ao ano!" — anualizar 3 meses de sorte é extrapolação pura (aula 7). Exija históricos longos e completos.

**3. A estratégia testada no passado (backtest).** Testar 200 estratégias nos mesmos dados até uma "funcionar" garante encontrar padrões por puro acaso — como o z-score ensina, com tentativas suficientes, eventos de 3σ aparecem. A pergunta certa: funcionou em dados **que a estratégia nunca viu**?

## Exemplo resolvido

Anúncio real (adaptado): *"Nosso clube de investimentos rendeu em média 3% ao mês nos últimos 8 meses. Junte-se aos vencedores!"*

Aplicando o checklist:

1. **Amostra**: 8 meses — minúscula; e por que começou exatamente ali? (Talvez o mês 9 para trás fosse desastroso.)
2. **Média**: aritmética, com certeza. Se houve meses de −20%, a geométrica pode ser bem menor.
3. **Risco**: nenhum σ informado. 3% de média com σ = 15% é cassino.
4. **Benchmark**: 3% a.m. em época de CDI a 1% a.m. é claim extraordinário — exige prova extraordinária.
5. **Sobrevivência**: quantos clubes iguais a esse quebraram e não estão anunciando?

Conclusão do analista: o anúncio pode ser 100% verdadeiro e ainda assim ser péssima evidência. O ônus da prova é de quem promete.

## PBL — projeto final do módulo

Encontre uma peça real de comunicação financeira (anúncio de corretora, post de influenciador, manchete de economia) que use estatística. Aplique o checklist completo da aula por escrito: identifique amostra, tipo de média, risco omitido, benchmark, possíveis vieses e truques de recorte. Vereditos possíveis: "sólida", "verdadeira mas enganosa" ou "indefensável". Feche com a versão honesta da mesma mensagem, reescrita por você. Uma página.

## Resumo

- Estatísticas verdadeiras enganam pelo recorte: amostra, média escolhida, escala, sobrevivência.
- O checklist do cético transforma qualquer número em uma lista de perguntas.
- Claims extraordinários exigem evidências extraordinárias — o ônus é de quem promete.
- **Módulo e trilha de Matemática concluídos!** Você tem o ferramental completo: das operações básicas à regressão. Ele volta a trabalhar nos módulos de Finanças e na Preparação BRHSIC.
