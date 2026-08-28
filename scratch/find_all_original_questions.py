import subprocess
import json
import re

def get_main_data():
    res = subprocess.run(['git', 'show', 'main:plataforma/src/data/matematicaData.js'], capture_output=True, text=True, encoding='utf-8')
    mat = {}
    if res.returncode == 0:
        c = res.stdout.strip()
        if c.startswith('window.matematicaData = '):
            c = c[len('window.matematicaData = '):]
        if c.endswith(';'):
            c = c[:-1]
        mat = json.loads(c)

    res_fin = subprocess.run(['git', 'show', 'main:plataforma/src/data/financasData.js'], capture_output=True, text=True, encoding='utf-8')
    fin = {}
    if res_fin.returncode == 0:
        c = res_fin.stdout.strip()
        if c.startswith('window.financasData = '):
            c = c[len('window.financasData = '):]
        if c.endswith(';'):
            c = c[:-1]
        fin = json.loads(c)

    return mat, fin

mat, fin = get_main_data()

print("=== MATEMÁTICA MAIN QUESTION AUDIT ===")
total_all = 0
for m in mat.get('modulos', []):
    print(f"\nModulo {m['numero']}: {m['titulo']}")
    for a in m['aulas']:
        q = len(a.get('quiz', []))
        mq = len(a.get('miniQuiz', []))
        lp = len(a.get('listaProblemas', []))
        total = q + mq + lp
        total_all += total
        print(f"  {a['slug']}: quiz={q}, miniQuiz={mq}, listaProblemas={lp} (TOTAL={total})")

print(f"\nTotal Matemática in main: {total_all}")

print("\n=== FINANÇAS MAIN QUESTION AUDIT ===")
total_fin_all = 0
for m in fin.get('modulos', []):
    print(f"\nModulo {m['numero']}: {m['titulo']}")
    for a in m['aulas']:
        q = len(a.get('quiz', []))
        mq = len(a.get('miniQuiz', []))
        lp = len(a.get('listaProblemas', []))
        total = q + mq + lp
        total_fin_all += total
        print(f"  {a['slug']}: quiz={q}, miniQuiz={mq}, listaProblemas={lp} (TOTAL={total})")

print(f"\nTotal Finanças in main: {total_fin_all}")
