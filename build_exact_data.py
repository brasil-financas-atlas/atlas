import os
import json

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

# Map out all files explicitly from docs/ to preserve 100% exact text
docs_dir = r"C:\codigos\bfa-main\docs"

content_data = {
    "index": read_file(os.path.join(docs_dir, "index.md")),
    "sobre": read_file(os.path.join(docs_dir, "sobre.md")),
    "preparacaoBrhsic": read_file(os.path.join(docs_dir, "preparacao-brhsic", "index.md")),
    "exercicios": read_file(os.path.join(docs_dir, "exercicios", "index.md")),
    "noticias": read_file(os.path.join(docs_dir, "noticias", "index.md")),
    
    "matematica": {
        "index": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "index.md")),
        "modulos": [
            {
                "slug": "modulo-1-algebra-do-zero",
                "titulo": "Módulo 1: Álgebra do Zero",
                "indexContent": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "index.md")),
                "aulas": [
                    { "slug": "aula-01-numeros-e-operacoes", "titulo": "Aula 1: Números e operações", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-01-numeros-e-operacoes.md")) },
                    { "slug": "aula-02-fracoes-e-decimais", "titulo": "Aula 2: Frações e decimais", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-02-fracoes-e-decimais.md")) },
                    { "slug": "aula-03-porcentagem-na-vida-real", "titulo": "Aula 3: Porcentagem na vida real", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-03-porcentagem-na-vida-real.md")) },
                    { "slug": "aula-04-regra-de-tres", "titulo": "Aula 4: Regra de três", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-04-regra-de-tres.md")) },
                    { "slug": "aula-05-potencias-e-raizes", "titulo": "Aula 5: Potências e raízes", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-05-potencias-e-raizes.md")) },
                    { "slug": "aula-06-notacao-cientifica", "titulo": "Aula 6: Notação científica", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-06-notacao-cientifica.md")) },
                    { "slug": "aula-07-equacoes-1-grau", "titulo": "Aula 7: Equações de 1º grau", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-1-algebra-do-zero", "aula-07-equacoes-1-grau.md")) }
                ]
            },
            {
                "slug": "modulo-2-aplicada",
                "titulo": "Módulo 2: Matemática Financeira Aplicada",
                "indexContent": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-2-aplicada", "index.md")),
                "aulas": [
                    { "slug": "aula-01-porcentagem-e-variacao", "titulo": "Aula 1: Porcentagem e variação", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-2-aplicada", "aula-01-porcentagem-e-variacao.md")) },
                    { "slug": "aula-02-juros-simples-e-compostos", "titulo": "Aula 2: Juros simples e compostos", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-2-aplicada", "aula-02-juros-simples-e-compostos.md")) },
                    { "slug": "aula-03-inflacao-e-juros-reais", "titulo": "Aula 3: Inflação e juros reais", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-2-aplicada", "aula-03-inflacao-e-juros-reais.md")) },
                    { "slug": "aula-04-rentabilidade-liquida", "titulo": "Aula 4: Rentabilidade líquida", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-2-aplicada", "aula-04-rentabilidade-liquida.md")) },
                    { "slug": "aula-05-cdi-selic-comparacao", "titulo": "Aula 5: CDI, Selic e comparação", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-2-aplicada", "aula-05-cdi-selic-comparacao.md")) }
                ]
            },
            {
                "slug": "modulo-3-funcoes-e-probabilidade",
                "titulo": "Módulo 3: Funções, Progressões e Probabilidade",
                "indexContent": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "index.md")),
                "aulas": [
                    { "slug": "aula-01-o-que-e-uma-funcao", "titulo": "Aula 1: O que é uma função", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-01-o-que-e-uma-funcao.md")) },
                    { "slug": "aula-02-funcao-exponencial", "titulo": "Aula 2: Função exponencial", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-02-funcao-exponencial.md")) },
                    { "slug": "aula-03-logaritmos", "titulo": "Aula 3: Logaritmos", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-03-logaritmos.md")) },
                    { "slug": "aula-04-progressao-aritmetica", "titulo": "Aula 4: Progressão aritmética (PA)", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-04-progressao-aritmetica.md")) },
                    { "slug": "aula-05-progressao-geometrica", "titulo": "Aula 5: Progressão geométrica (PG)", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-05-progressao-geometrica.md")) },
                    { "slug": "aula-06-somatorio", "titulo": "Aula 6: Somatório (Σ)", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-06-somatorio.md")) },
                    { "slug": "aula-07-produtorio", "titulo": "Aula 7: Produtório (Π)", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-07-produtorio.md")) },
                    { "slug": "aula-08-probabilidade-fundamentos", "titulo": "Aula 8: Probabilidade — fundamentos", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-08-probabilidade-fundamentos.md")) },
                    { "slug": "aula-09-valor-esperado", "titulo": "Aula 9: Valor esperado e cenários", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-3-funcoes-e-probabilidade", "aula-09-valor-esperado.md")) }
                ]
            },
            {
                "slug": "modulo-4-estatistica",
                "titulo": "Módulo 4: Estatística e Regressão Linear",
                "indexContent": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "index.md")),
                "aulas": [
                    { "slug": "aula-01-dados-populacao-amostra", "titulo": "Aula 1: Dados, população e amostra", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-01-dados-populacao-amostra.md")) },
                    { "slug": "aula-02-medias", "titulo": "Aula 2: Médias", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-02-medias.md")) },
                    { "slug": "aula-03-mediana-moda", "titulo": "Aula 3: Mediana, moda e quando a média engana", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-03-mediana-moda.md")) },
                    { "slug": "aula-04-dispersao", "titulo": "Aula 4: Variância e desvio padrão", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-04-dispersao.md")) },
                    { "slug": "aula-05-coeficiente-variacao-zscore", "titulo": "Aula 5: Coeficiente de variação e z-score", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-05-coeficiente-variacao-zscore.md")) },
                    { "slug": "aula-06-covariancia-correlacao", "titulo": "Aula 6: Covariância e correlação", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-06-covariancia-correlacao.md")) },
                    { "slug": "aula-07-regressao-linear", "titulo": "Aula 7: Regressão linear", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-07-regressao-linear.md")) },
                    { "slug": "aula-08-estatistica-na-pratica", "titulo": "Aula 8: Estatística na prática", "content": read_file(os.path.join(docs_dir, "matematica-aplicada-a-financas", "modulo-4-estatistica", "aula-08-estatistica-na-pratica.md")) }
                ]
            }
        ]
    },

    "financas": {
        "index": read_file(os.path.join(docs_dir, "financas", "index.md")),
        "modulos": [
            {
                "slug": "modulo-1-fundamentos",
                "titulo": "Módulo 1: Fundamentos em Finanças",
                "indexContent": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "index.md")),
                "aulas": [
                    { "slug": "aula-01-mercado-financeiro", "titulo": "Aula 1: Mercado financeiro", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-01-mercado-financeiro.md")) },
                    { "slug": "aula-02-sistema-financeiro-brasileiro", "titulo": "Aula 2: Sistema financeiro brasileiro", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-02-sistema-financeiro-brasileiro.md")) },
                    { "slug": "aula-03-tesouro-direto", "titulo": "Aula 3: Tesouro Direto", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-03-tesouro-direto.md")) },
                    { "slug": "aula-04-renda-fixa-bancaria", "titulo": "Aula 4: CDB, LCI, LCA e FGC", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-04-renda-fixa-bancaria.md")) },
                    { "slug": "aula-05-acoes-e-bolsa", "titulo": "Aula 5: Ações e bolsa", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-05-acoes-e-bolsa.md")) },
                    { "slug": "aula-06-fundos-e-etfs", "titulo": "Aula 6: Fundos e ETFs", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-06-fundos-e-etfs.md")) },
                    { "slug": "aula-07-fiis", "titulo": "Aula 7: FIIs", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-07-fiis.md")) },
                    { "slug": "aula-08-risco-e-diversificacao", "titulo": "Aula 8: Risco e diversificação", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-08-risco-e-diversificacao.md")) },
                    { "slug": "aula-09-macro-para-investidores", "titulo": "Aula 9: Macro para investidores", "content": read_file(os.path.join(docs_dir, "financas", "modulo-1-fundamentos", "aula-09-macro-para-investidores.md")) }
                ]
            },
            {
                "slug": "modulo-2-analise-fundamentalista",
                "titulo": "Módulo 2: Análise Fundamentalista de Empresas",
                "indexContent": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "index.md")),
                "aulas": [
                    { "slug": "aula-01-o-que-e-analise-fundamentalista", "titulo": "Aula 1: O que é análise fundamentalista?", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-01-o-que-e-analise-fundamentalista.md")) },
                    { "slug": "aula-02-a-empresa-por-tras-da-acao", "titulo": "Aula 2: A empresa por trás da ação", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-02-a-empresa-por-tras-da-acao.md")) },
                    { "slug": "aula-03-balanco-patrimonial", "titulo": "Aula 3: Balanço patrimonial", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-03-balanco-patrimonial.md")) },
                    { "slug": "aula-04-dre", "titulo": "Aula 4: DRE — Demonstração do Resultado", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-04-dre.md")) },
                    { "slug": "aula-05-fluxo-de-caixa", "titulo": "Aula 5: Fluxo de caixa", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-05-fluxo-de-caixa.md")) },
                    { "slug": "aula-06-indicadores-de-rentabilidade", "titulo": "Aula 6: Indicadores de rentabilidade", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-06-indicadores-de-rentabilidade.md")) },
                    { "slug": "aula-07-endividamento-e-liquidez", "titulo": "Aula 7: Endividamento e liquidez", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-07-endividamento-e-liquidez.md")) },
                    { "slug": "aula-08-multiplos-de-valuation", "titulo": "Aula 8: Múltiplos de valuation", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-08-multiplos-de-valuation.md")) },
                    { "slug": "aula-09-valuation-fluxo-de-caixa-descontado", "titulo": "Aula 9: Valuation — fluxo de caixa descontado", "content": read_file(os.path.join(docs_dir, "financas", "modulo-2-analise-fundamentalista", "aula-09-valuation-fluxo-de-caixa-descontado.md")) }
                ]
            },
            {
                "slug": "modulo-3-portfolio",
                "titulo": "Módulo 3: Montagem de Portfólio e Investimento",
                "indexContent": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "index.md")),
                "aulas": [
                    { "slug": "aula-01-o-que-e-um-portfolio", "titulo": "Aula 1: O que é um portfólio", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-01-o-que-e-um-portfolio.md")) },
                    { "slug": "aula-02-perfil-de-investidor-e-objetivos", "titulo": "Aula 2: Perfil de investidor e objetivos", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-02-perfil-de-investidor-e-objetivos.md")) },
                    { "slug": "aula-03-classes-de-ativos-e-correlacao", "titulo": "Aula 3: Classes de ativos e correlação", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-03-classes-de-ativos-e-correlacao.md")) },
                    { "slug": "aula-04-alocacao-de-ativos", "titulo": "Aula 4: Alocação de ativos", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-04-alocacao-de-ativos.md")) },
                    { "slug": "aula-05-risco-de-carteira", "titulo": "Aula 5: Risco de carteira na prática", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-05-risco-de-carteira.md")) },
                    { "slug": "aula-06-aportes-e-rebalanceamento", "titulo": "Aula 6: Aportes e rebalanceamento", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-06-aportes-e-rebalanceamento.md")) },
                    { "slug": "aula-07-custos-e-impostos", "titulo": "Aula 7: Custos e impostos na carteira", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-07-custos-e-impostos.md")) },
                    { "slug": "aula-08-montando-sua-carteira", "titulo": "Aula 8: Montando sua primeira carteira", "content": read_file(os.path.join(docs_dir, "financas", "modulo-3-portfolio", "aula-08-montando-sua-carteira.md")) }
                ]
            }
        ]
    }
}

out_path = r"C:\codigos\bfa-main\plataforma\src\data\contentData.js"
with open(out_path, 'w', encoding='utf-8') as f:
    f.write("export const EXACT_CONTENT = ")
    json.dump(content_data, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print("Successfully generated exact content dataset!")
