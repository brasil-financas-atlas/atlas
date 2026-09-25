import os

replacements = [
    ("ndice", "Índice"),
    ("rea", "área"),
    ("vdeo", "vídeo"),
    ("Vdeo", "Vídeo"),
    ("Questes", "Questões"),
    ("Configurao", "Configuração"),
    ("padro", "padrão"),
    ("prticos", "práticos"),
    ("Exerccios", "Exercícios"),
    ("exerccios", "exercícios"),
    ("Mdulo", "Módulo"),
    ("MDULO", "MÓDULO"),
    ("transferncia", "transferência"),
    ("Contedo", "Conteúdo"),
    ("fixao", "fixação"),
    ("Fixao", "Fixação"),
    ("Edio", "Edição"),
    ("visualizao", "visualização"),
    ("Prxima", "Próxima"),
    ("FINANAS", "FINANÇAS"),
    ("reteno", "retenção"),
    ("no", "não"),
    ("Disponveis", "Disponíveis"),
    ("Disponvel", "Disponível"),
    ("Introduo", "Introdução"),
    ("INTRODUO", "INTRODUÇÃO"),
    ("Concluda", "Concluída"),
    ("Concludas", "Concluídas"),
    ("Concludo", "Concluído"),
    ("MATEMTICA", "MATEMÁTICA"),
    ("Matemtica", "Matemática"),
    ("Finanas", "Finanças"),
    ("clculo", "cálculo"),
    ("Frum", "Fórum"),
    ("contbeis", "contábeis"),
    ("Comear", "Começar"),
    ("Viso", "Visão"),
    ("Mdulos", "Módulos"),
    ("pr-requisitos", "pré-requisitos"),
    ("assimilao", "assimilação"),
    ("amortizao", "amortização"),
    ("imobilirios", "imobiliários"),
    ("lgebra", "álgebra"),
    ("introduo", "introdução"),
    ("aes", "ações"),
    ("PGINA", "PÁGINA"),
    ("mdulo", "módulo"),
    ("Rodap", "Rodapé")
]

files_to_fix = [
    'src/pages/AulaPage.jsx',
    'src/pages/DisciplinaOverview.jsx'
]

for filepath in files_to_fix:
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    # Also replace double mojibake like 'Ã\ufffdndice'
    content = content.replace('?ndice', 'Índice')
    content = content.replace('?ndice', 'Índice')
    content = content.replace('ndice', 'Índice')
    content = content.replace('\x8dndice', 'Índice')
    content = content.replace('\xadndice', 'Índice')
    content = content.replace('Ãndice', 'Índice')
    content = content.replace('M\x93DULO', 'MÓDULO')
    content = content.replace('FINAN\x87AS', 'FINANÇAS')
    content = content.replace('MATEM\x81TICA', 'MATEMÁTICA')
    
    for bad, good in replacements:
        content = content.replace(bad, good)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")
