import json

with open('plataforma/src/data/matematicaData.js', 'r', encoding='utf-8') as f:
    c = f.read().strip()
    if c.startswith('window.matematicaData = '):
        c = c[len('window.matematicaData = '):]
    if c.endswith(';'):
        c = c[:-1]
    mat = json.loads(c)

with open('plataforma/src/data/financasData.js', 'r', encoding='utf-8') as f:
    c = f.read().strip()
    if c.startswith('window.financasData = '):
        c = c[len('window.financasData = '):]
    if c.endswith(';'):
        c = c[:-1]
    fin = json.loads(c)

print("=== CONTAGEM FINAL DE QUESTÕES ===")
total_mat = 0
for m in mat['modulos']:
    print(f"\n{m['titulo']}")
    for a in m['aulas']:
        cnt = len(a.get('quiz', []))
        total_mat += cnt
        print(f"  {a['slug']}: {cnt} questões")

total_fin = 0
for m in fin['modulos']:
    print(f"\n{m['titulo']}")
    for a in m['aulas']:
        cnt = len(a.get('quiz', []))
        total_fin += cnt
        print(f"  {a['slug']}: {cnt} questões")

print(f"\nTOTAL MATEMÁTICA: {total_mat} questões")
print(f"TOTAL FINANÇAS: {total_fin} questões")
print(f"TOTAL GERAL PLATAFORMA: {total_mat + total_fin} questões!")
