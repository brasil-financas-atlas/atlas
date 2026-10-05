import os

replacements = [
    ("CONSTRUO", "CONSTRUÇÃO"),
    ("NO", "NÃO"),
    ("VERIFICAO", "VERIFICAÇÃO"),
    ("INTRODUO", "INTRODUÇÃO"),
    ("COMPETIO", "COMPETIÇÃO"),
    ("PREPARAO", "PREPARAÇÃO"),
    ("FIXAO", "FIXAÇÃO"),
    ("MANUTENO", "MANUTENÇÃO"),
    ("REVISO", "REVISÃO"),
    ("TRIBUTAO", "TRIBUTAÇÃO"),
    ("EQUAO", "EQUAÇÃO"),
    ("DEMONSTRAO", "DEMONSTRAÇÃO"),
    ("SIMULAO", "SIMULAÇÃO"),
    ("CAPITALIZAO", "CAPITALIZAÇÃO"),
    ("Lquida", "Líquida"),
    ("Lquido", "Líquido"),
    ("Mnimo", "Mínimo"),
    ("dvida", "dívida"),
    ("Dvidas", "Dúvidas"),
    ("vrgula", "vírgula"),
    ("Crtico", "Crítico"),
    ("Ttulo", "Título"),
    ("ndice", "Índice"),
    ("?ndice", "Índice"),
    ("Configuraǜo", "Configuração"),
    ("atualizaǜo", "atualização"),
    ("Publicaǜo", "Publicação"),
    ("Ao", "Ação"),
    ("Aǜo", "Ação")
]

target_char = '\ufffd'

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
                
                # Also do a blanket replace for common trailing chars if they still exist
                content = content.replace(target_char + 'quid', 'líquid')
                content = content.replace(target_char + 'ndice', 'índice')
                content = content.replace(target_char + 'vida', 'ívida')
                content = content.replace('L' + target_char + 'quid', 'Líquid')
                content = content.replace('M' + target_char + 'nim', 'Mínim')
                content = content.replace('v' + target_char + 'rgul', 'vírgul')
                content = content.replace('Cr' + target_char + 'tic', 'Crític')
                content = content.replace('T' + target_char + 'tul', 'Títul')

                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed accents in {filepath}")
            except Exception:
                pass
