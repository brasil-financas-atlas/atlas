# Unidade 5: Risco de carteira na prática

## Comece aqui

No Módulo 1 você aprendeu a intuição de risco × retorno. Agora vamos medir: **volatilidade** diz o quanto a carteira balança, **drawdown** diz o tamanho do tombo, e a mágica da correlação faz o risco do conjunto ser **menor que a média dos riscos individuais**. Essa é a descoberta que deu um Nobel a Harry Markowitz.

## Ideia central

O risco de uma carteira **não** é a média dos riscos dos ativos. Se os ativos não caem juntos, as quedas de um são amortecidas pelas altas (ou estabilidade) do outro. Resultado: combinando ativos arriscados, mas descorrelacionados, você pode obter mais retorno **por unidade de risco** do que em qualquer ativo isolado.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Volatilidade | O quanto os retornos oscilam em torno da média (desvio padrão — Módulo 4 de Matemática) |
| Drawdown | A queda do topo ao fundo; "quanto doeu no pior momento" |
| Fronteira eficiente | As combinações de carteira com o máximo retorno para cada nível de risco |
| Retorno ajustado ao risco | Quanto retorno a carteira entrega por unidade de risco corrida |
| Teste de estresse | Simular a carteira em crises passadas: "e se 2008/2020 se repetir?" |

## A intuição de Markowitz (sem fórmula assustadora)

Dois ativos, ambos com retorno esperado de 10% e volatilidade alta:

- Se correlação = **+1**: a carteira 50/50 tem a mesma volatilidade alta. Nada mudou.
- Se correlação = **0**: as oscilações se cancelam parcialmente; a carteira 50/50 rende os mesmos 10% com volatilidade **bem menor**.
- Se correlação = **−1**: existe uma combinação com risco praticamente **zero** — rendendo 10%!

Mesmo retorno, menos risco, só pela combinação. Por isso a unidade 3 insistiu tanto em correlação: ela é a matéria-prima da redução de risco.

## Drawdown: a medida que seu estômago entende

Volatilidade é abstrata; drawdown é visceral. Referências históricas aproximadas para calibrar expectativas:

| Carteira | Drawdown típico em crise severa |
|---|---:|
| 100% Selic | ~0% |
| 60% RF / 40% ações | −15% a −25% |
| 100% ações Brasil | −40% a −60% |

Pergunta de calibragem (ligada à unidade 2): se seus R$ 10.000 virarem R$ 6.000 na tela por alguns meses, você segura ou vende? Sua resposta honesta limita sua fatia de renda variável melhor que qualquer questionário.

## Exemplo resolvido

Carteira de Ana (unidade 4) num teste de estresse estilo março/2020: ações BR −35%, internacional −20% (mas dólar +25% → efeito líquido +0%), FIIs −25%, IPCA+ marcado −5%, Selic +0,3% no mês.

$$
0{,}35(0{,}3\%) + 0{,}25(-5\%) + 0{,}10(0\%) + 0{,}15(-35\%) + 0{,}10(0\%) + 0{,}05(-25\%) \approx -7{,}6\%
$$

A carteira moderada caiu ~8% enquanto a bolsa caiu 35%. Ana precisa responder: aguento ver −8%? Se sim, a alocação está calibrada. Se nem isso, a fatia de risco precisa encolher **antes** da próxima crise, não durante.

## Mini quiz

1. Por que o risco da carteira é menor que a média dos riscos dos ativos (quando a correlação é baixa)?
2. O que é drawdown e por que ele "conversa" melhor com a psicologia do investidor?
3. O que mostra a fronteira eficiente?
4. Para que serve um teste de estresse?
5. Correlação −1 entre dois ativos permitiria o quê?

## PBL

Pegue a carteira que você montou para João no PBL da unidade 4 e rode um teste de estresse com estas hipóteses: ações BR −40%, internacional −15% com dólar +30% (efeito líquido +10%), FIIs −30%, IPCA+ −8% na marcação, prefixado −10%, Selic +1% no período. Calcule o drawdown aproximado da carteira de longo prazo de João, avalie se um professor concursado de tolerância média seguraria essa queda e ajuste os percentuais se necessário — mostrando o novo teste.

## Resumo

- O risco do conjunto depende das correlações — e por isso pode ser menor que o dos ativos isolados.
- Volatilidade mede o balanço; drawdown mede o tombo que seu estômago vai sentir.
- Teste de estresse antes da crise vale mais que arrependimento durante.
- Carteira montada e testada. A próxima unidade cuida da rotina: aportes e rebalanceamento.
