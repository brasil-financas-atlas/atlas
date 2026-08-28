import subprocess
import re
import json

mod3_aulas = [
  "aula-01-o-que-e-uma-funcao",
  "aula-02-funcao-exponencial",
  "aula-03-logaritmos",
  "aula-04-progressao-aritmetica",
  "aula-05-progressao-geometrica",
  "aula-06-somatorio",
  "aula-07-produtorio",
  "aula-08-probabilidade-fundamentos",
  "aula-09-valor-esperado"
]

mod4_aulas = [
  "aula-01-dados-populacao-amostra",
  "aula-02-medias",
  "aula-03-mediana-moda",
  "aula-04-dispersao",
  "aula-05-coeficiente-variacao-zscore",
  "aula-06-covariancia-correlacao",
  "aula-07-regressao-linear",
  "aula-08-estatistica-na-pratica"
]

extracted = {}

for slug in mod3_aulas:
    path = f"docs/matematica-aplicada-a-financas/modulo-3-funcoes-e-probabilidade/{slug}.md"
    res = subprocess.run(['git', 'show', f'main:{path}'], capture_output=True, text=True, encoding='utf-8')
    if res.returncode == 0:
        c = res.stdout
        m = re.search(r'## Lista de problemas[\s\S]*?(?=\n## |\Z)', c)
        if m:
            extracted[slug] = m.group(0).strip()

for slug in mod4_aulas:
    path = f"docs/matematica-aplicada-a-financas/modulo-4-estatistica/{slug}.md"
    res = subprocess.run(['git', 'show', f'main:{path}'], capture_output=True, text=True, encoding='utf-8')
    if res.returncode == 0:
        c = res.stdout
        m = re.search(r'## Lista de problemas[\s\S]*?(?=\n## |\Z)', c)
        if m:
            extracted[slug] = m.group(0).strip()

with open('scratch/extracted_mod3_mod4_raw.json', 'w', encoding='utf-8') as f:
    json.dump(extracted, f, indent=2, ensure_ascii=False)

print(f"Successfully extracted {len(extracted)} lesson problem sets!")
