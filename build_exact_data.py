"""
Gera plataforma/src/data/contentData.js a partir dos arquivos Markdown de docs/.

Como rodar (de dentro da pasta do repositorio):
    python build_exact_data.py

O que mudou em relacao a versao anterior:
  1. Caminhos relativos ao proprio arquivo, em vez de "C:\\codigos\\bfa-main".
     Antes so funcionava na maquina de quem escreveu; agora roda em qualquer
     lugar, inclusive no GitHub Actions.
  2. Escreve "window.EXACT_CONTENT = ..." em vez de "export const ...".
     O app carrega os scripts via CDN + Babel, onde `export` quebra a pagina
     (esta documentado no HANDOVER.md). O contentData.js que esta em producao
     usa window, entao a versao antiga do script geraria uma tela branca.
  3. Titulos e lista de unidades saem do proprio Markdown, em vez de ficarem
     escritos aqui. Assim, criar um arquivo novo em docs/ ja o faz aparecer no
     site, sem precisar editar este script.
"""

import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(BASE, "docs")
SAIDA = os.path.join(BASE, "plataforma", "src", "data", "contentData.js")

# Materias de nivel superior: chave que o app espera -> pasta em docs/
MATERIAS = {
    "matematica": "matematica-aplicada-a-financas",
    "financas": "financas",
}


def ler(*partes):
    with open(os.path.join(DOCS, *partes), encoding="utf-8") as arquivo:
        return arquivo.read()


def titulo_do_markdown(texto, reserva):
    """Devolve o primeiro '# Titulo' do arquivo. Se nao houver, usa a reserva."""
    for linha in texto.splitlines():
        if linha.startswith("# "):
            return linha[2:].strip()
    return reserva


def montar_materia(pasta):
    """Varre docs/<pasta>/ e monta {index, modulos: [...]} em ordem alfabetica.

    A ordem alfabetica funciona porque os nomes sao numerados
    (modulo-1-..., aula-01-...).
    """
    materia = {"index": ler(pasta, "index.md"), "modulos": []}
    raiz = os.path.join(DOCS, pasta)

    for modulo in sorted(os.listdir(raiz)):
        caminho_modulo = os.path.join(raiz, modulo)
        if not os.path.isdir(caminho_modulo):
            continue

        indice_modulo = ler(pasta, modulo, "index.md")
        unidades = []

        for arquivo in sorted(os.listdir(caminho_modulo)):
            if not arquivo.endswith(".md") or arquivo == "index.md":
                continue
            conteudo = ler(pasta, modulo, arquivo)
            slug = arquivo[:-3]
            unidades.append({
                "slug": slug,
                "titulo": titulo_do_markdown(conteudo, slug),
                "content": conteudo,
            })

        materia["modulos"].append({
            "slug": modulo,
            "titulo": titulo_do_markdown(indice_modulo, modulo),
            "indexContent": indice_modulo,
            "aulas": unidades,
        })

    return materia


dados = {
    "index": ler("index.md"),
    "sobre": ler("sobre.md"),
    "preparacaoBrhsic": ler("preparacao-brhsic", "index.md"),
    "exercicios": ler("exercicios", "index.md"),
    "noticias": ler("noticias", "index.md"),
}

for chave, pasta in MATERIAS.items():
    dados[chave] = montar_materia(pasta)

os.makedirs(os.path.dirname(SAIDA), exist_ok=True)
with open(SAIDA, "w", encoding="utf-8") as arquivo:
    arquivo.write("window.EXACT_CONTENT = ")
    json.dump(dados, arquivo, ensure_ascii=False, indent=2)
    arquivo.write(";\n")

for chave in MATERIAS:
    modulos = dados[chave]["modulos"]
    total = sum(len(modulo["aulas"]) for modulo in modulos)
    print(f"{chave}: {len(modulos)} modulos, {total} unidades")

print(f"Gerado: {os.path.relpath(SAIDA, BASE)}")
