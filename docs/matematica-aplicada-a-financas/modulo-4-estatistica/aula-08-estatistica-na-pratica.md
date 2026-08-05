# Unidade 8: Estatística na prática — lendo números sem se enganar

## Comece aqui

Você agora sabe calcular médias, desvios, correlações e regressões. A última habilidade é a mais valiosa: **desconfiar direito**. O mundo financeiro produz estatísticas verdadeiras que induzem conclusões falsas — e quem sabe reconhecer os truques protege o próprio dinheiro e escreve análises mais honestas.

## Ideia central

Estatística não mente, mas o **recorte** mente: o período escolhido, a média escolhida, a escala do gráfico, a amostra que sobreviveu. O kit de defesa é um checklist de perguntas que você aplica a qualquer número antes de acreditar nele.

## O checklist do analista cético

| Pergunta | Truque que ela desarma |
|---|---|
| Qual é a amostra? Período, tamanho, quem ficou de fora? | Viés de período e de sobrevivência (unidade 1) |
| Média de quê — aritmética, ponderada, geométrica? | Retornos inflados por média errada (unidade 2) |
| E a mediana? Bate com a média? | Outliers e assimetria escondidos (unidade 3) |
| Qual o desvio padrão disso? | "Rende 2% ao mês" sem contar o risco (unidade 4) |
| Comparado com o quê? (CV, z-score, benchmark) | Números impressionantes sem referência (unidade 5) |
| Correlação ou causalidade? Há variável escondida? | Narrativas convincentes e falsas (unidade 6) |
| O modelo vale fora do intervalo dos dados? | Extrapolação e betas de época calma (unidade 7) |
| Quantas tentativas houve antes desse "acerto"? | Sobrevivência de estratégias: entre 1.000 macacos jogando moedas, alguns acertam 10 seguidas |

## Três armadilhas que merecem close

**1. O gráfico com eixo cortado.** Um fundo mostra crescimento "explosivo" — mas o eixo y começa em 98 e termina em 103. Variação real: 5%. Sempre olhe a escala.

**2. O retorno anualizado de período curto.** "Rendeu 6% no primeiro trimestre = 26% ao ano!" — anualizar 3 meses de sorte é extrapolação pura (unidade 7). Exija históricos longos e completos.

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

## Lista de problemas

1. "O preço médio dos apartamentos do bairro subiu 40% após o lançamento de um prédio de luxo." Que medida confirmaria se o bairro todo valorizou? Por quê?
2. Um gestor anualiza o retorno de janeiro (+4%) para "60% ao ano". Refaça a conta dele (produtório!) e explique o erro conceitual.
3. Um backtest de 500 estratégias achou uma com 95% de acerto. Por que isso pode ser esperado por puro acaso?
4. Duas manchetes sobre o mesmo dado: "Bolsa dispara 3%!" e "Bolsa ainda acumula queda de 12% no ano". Alguma mente? O que cada recorte esconde?
5. "Quem toma café da manhã tira notas melhores." Proponha duas variáveis escondidas plausíveis.
6. Desafio: monte você mesmo um exemplo de estatística **verdadeira e enganosa** sobre mesada/dinheiro, e desmonte-o com o checklist.

??? note "Gabarito (direções de resposta)"
    1. A **mediana**: imune ao outlier de luxo; se só a média subiu, o bairro típico não valorizou.
    2. $1{,}04^{12} \approx 1{,}601$ → 60% só se **todos** os meses repetirem janeiro; um mês não é amostra de um ano.
    3. Com 500 tentativas, o acaso produz algumas vencedoras aparentes (pense em 500 pessoas jogando 10 moedas: ~0,5 delas tira 9+ caras). Validação exige dados fora do teste.
    4. Nenhuma mente; a primeira esconde o acumulado, a segunda esconde a recuperação recente. Recorte é escolha editorial.
    5. Renda familiar e rotina/organização da casa — ambas causam café da manhã **e** notas.
    6. Resposta pessoal — o objetivo é aplicar o checklist ao próprio exemplo.

## PBL — projeto final do módulo

Encontre uma peça real de comunicação financeira (anúncio de corretora, post de influenciador, manchete de economia) que use estatística. Aplique o checklist completo da unidade por escrito: identifique amostra, tipo de média, risco omitido, benchmark, possíveis vieses e truques de recorte. Vereditos possíveis: "sólida", "verdadeira mas enganosa" ou "indefensável". Feche com a versão honesta da mesma mensagem, reescrita por você. Uma página.

## Resumo

- Estatísticas verdadeiras enganam pelo recorte: amostra, média escolhida, escala, sobrevivência.
- O checklist do cético transforma qualquer número em uma lista de perguntas.
- Claims extraordinários exigem evidências extraordinárias — o ônus é de quem promete.
- **Módulo e trilha de Matemática concluídos!** Você tem o ferramental completo: das operações básicas à regressão. Ele volta a trabalhar nos módulos de Finanças e na Preparação BRHSIC.
