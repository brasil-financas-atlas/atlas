import json

def load_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()
    idx = code.find('{')
    last_idx = code.rfind('}')
    return json.loads(code[idx:last_idx+1])

mat = load_data('plataforma/src/data/matematicaData.js')
fin = load_data('plataforma/src/data/financasData.js')

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
