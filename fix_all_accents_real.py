import os

R = '\ufffd'
replacements = [
    (f"CONSTRU{R}O", "CONSTRUÇÃO"),
    (f"N{R}O", "NÃO"),
    (f"VERIFICA{R}O", "VERIFICAÇÃO"),
    (f"INTRODU{R}O", "INTRODUÇÃO"),
    (f"COMPETI{R}O", "COMPETIÇÃO"),
    (f"PREPARA{R}O", "PREPARAÇÃO"),
    (f"FIXA{R}O", "FIXAÇÃO"),
    (f"MANUTEN{R}O", "MANUTENÇÃO"),
    (f"REVIS{R}O", "REVISÃO"),
    (f"TRIBUTA{R}O", "TRIBUTAÇÃO"),
    (f"EQUA{R}O", "EQUAÇÃO"),
    (f"DEMONSTRA{R}O", "DEMONSTRAÇÃO"),
    (f"SIMULA{R}O", "SIMULAÇÃO"),
    (f"CAPITALIZA{R}O", "CAPITALIZAÇÃO"),
    (f"L{R}quida", "Líquida"),
    (f"L{R}quido", "Líquido"),
    (f"M{R}nimo", "Mínimo"),
    (f"d{R}vida", "dívida"),
    (f"D{R}vidas", "Dúvidas"),
    (f"v{R}rgula", "vírgula"),
    (f"Cr{R}tico", "Crítico"),
    (f"T{R}tulo", "Título"),
    (f"{R}ndice", "Índice"),
    (f"?ndice", "Índice"),
    (f"Configura{R}o", "Configuração"),
    (f"atualiza{R}o", "atualização"),
    (f"Publica{R}o", "Publicação"),
    (f"A{R}o", "Ação"),
    (f"A{R}es", "Ações")
]

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for bad, good in replacements:
                    content = content.replace(bad, good)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed accents in {filepath}")
            except Exception:
                pass
