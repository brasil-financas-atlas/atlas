# Unidade 9: Valuation — fluxo de caixa descontado

## Comece aqui

Múltiplos comparam empresas entre si; o **fluxo de caixa descontado (FCD)** tenta responder a pergunta definitiva: quanto essa empresa vale **em reais**, independente do humor do mercado? A ideia cabe numa frase: uma empresa vale hoje a soma de todo o dinheiro que vai gerar no futuro, **trazido a valor presente**.

## Ideia central

R$ 100 daqui a um ano valem menos que R$ 100 hoje — você já sabe disso desde o Módulo 1 (juros e inflação). "Trazer a valor presente" é desfazer os juros: descobrir quanto um dinheiro futuro vale agora. Se a taxa de desconto é 10% ao ano:

$$
VP = \frac{VF}{(1+i)^n} \qquad \Rightarrow \qquad \frac{110}{(1{,}10)^1} = 100
$$

O valuation por FCD aplica essa conta a **todos** os fluxos de caixa futuros da empresa e soma tudo.

## Conceitos essenciais

| Conceito | Significado simples |
|----------|---------------------|
| Valor presente (VP) | Quanto vale hoje um dinheiro que só chega no futuro |
| Taxa de desconto | Os juros usados para "encolher" o dinheiro futuro; reflete o risco e o custo de oportunidade |
| Fluxo de caixa livre | O dinheiro que a empresa gera após investimentos (unidade 5) — é ele que se desconta |
| Perpetuidade | Estimativa do valor de todos os fluxos após o período projetado |
| Valor intrínseco | A soma de todos os VPs: o "preço justo" estimado |
| Margem de segurança | Só comprar bem abaixo do valor intrínseco, porque toda projeção erra |

## A receita do FCD em 4 passos

1. **Projete** o fluxo de caixa livre dos próximos anos (ex.: 5 anos), com premissas realistas de crescimento.
2. **Escolha a taxa de desconto**: no mínimo, o que você ganharia sem risco (Tesouro) **mais** um prêmio pelo risco da empresa.
3. **Desconte** cada fluxo: $VP = FC_n \div (1+i)^n$. Some os VPs. Estime a perpetuidade para o que vem depois.
4. **Compare** o valor por ação com o preço de tela — e exija margem de segurança.

!!! note "Verdade incômoda"
    O FCD é extremamente sensível às premissas: mude o crescimento de 3% para 5% e o "preço justo" muda dezenas de por cento. Analistas sérios usam o FCD para entender **o que o preço atual está assumindo**, não para cravar um alvo exato. Premissas conservadoras + margem de segurança são o antídoto.

## Exemplo resolvido

FCD simplificado da Sorvetes Tropical. Fluxo de caixa livre atual: R$ 15 mi (unidade 5). Premissas conservadoras: crescimento de 4% ao ano por 5 anos, taxa de desconto de 14% (Tesouro ~10% + prêmio de risco 4%), perpetuidade sem crescimento real.

| Ano | FCL projetado | VP a 14% |
|---:|---:|---:|
| 1 | 15,6 | 13,7 |
| 2 | 16,2 | 12,5 |
| 3 | 16,9 | 11,4 |
| 4 | 17,5 | 10,4 |
| 5 | 18,2 | 9,5 |
| Perpetuidade (18,2 ÷ 0,14, descontada) | 130,3 | 67,6 |
| **Valor da operação** | | **≈ 125** |

Do valor da operação, subtraímos a dívida líquida (60): valor para o acionista ≈ **R$ 65 mi**... bem abaixo dos R$ 230 mi de valor de mercado da unidade 8! O que isso significa? Com **essas** premissas conservadoras, o preço atual só se justifica se a empresa crescer bem mais ou recuperar margem. O FCD revelou o que o mercado está apostando — agora o analista julga se a aposta é razoável. É este confronto entre premissas e preço que a BRHSIC espera ver num bom relatório.

## Mini quiz

1. Por que R$ 100 futuros valem menos que R$ 100 hoje?
2. O que compõe uma taxa de desconto razoável?
3. O que é a perpetuidade num FCD?
4. Por que o FCD é sensível demais às premissas — e como se proteger disso?
5. Para que serve o FCD, se ele não crava um preço exato?

## PBL — estudo de caso final do módulo

Escolha uma empresa listada na B3 que você conheça do dia a dia (varejo, alimentos, banco). Monte um mini-relatório de uma página com: (1) o negócio e suas vantagens competitivas (unidade 2); (2) três números-chave do balanço, DRE e caixa (unidades 3–5); (3) ROE e endividamento comparados a um concorrente (unidades 6–7); (4) P/L e EV/EBITDA contra o par (unidade 8); e (5) sua conclusão: o que o preço atual está assumindo, e você compraria com margem de segurança? Este é o formato de pitch que competições como a BRHSIC avaliam.

## Resumo

- Uma empresa vale a soma dos fluxos de caixa futuros trazidos a valor presente.
- Taxa de desconto = taxa sem risco + prêmio de risco; premissas conservadoras sempre.
- O FCD serve para revelar o que o preço embute, não para adivinhar alvos exatos.
- Módulo concluído! O próximo passo é aprender a juntar ativos numa carteira: o Módulo 3 — Montagem de Portfólio.
