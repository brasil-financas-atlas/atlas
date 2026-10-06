import os

replacements = [
    ("CONSTRUO", "CONSTRUÇÃO"),
    ("NO", "NÃO"),
    ("no", "não"),
    ("VERIFICAO", "VERIFICAÇÃO"),
    ("INTRODUO", "INTRODUÇÃO"),
    ("Introduo", "Introdução"),
    ("introduo", "introdução"),
    ("COMPETIO", "COMPETIÇÃO"),
    ("PREPARAO", "PREPARAÇÃO"),
    ("FIXAO", "FIXAÇÃO"),
    ("fixao", "fixação"),
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
    ("ttulo", "título"),
    ("ndice", "Índice"),
    ("Configurao", "Configuração"),
    ("atualizao", "atualização"),
    ("Publicao", "Publicação"),
    ("Ao", "Ação"),
    ("aes", "ações"),
    ("Mdulo", "Módulo"),
    ("mdulo", "módulo"),
    ("MDULO", "MÓDULO"),
    ("Viso", "Visão"),
    ("Concludo", "Concluído"),
    ("Concluda", "Concluída"),
    ("Exerccios", "Exercícios"),
    ("lgebra", "álgebra"),
    ("Finanas", "Finanças"),
    ("FINANAS", "FINANÇAS"),
    ("amortizao", "amortização"),
    ("assimilao", "assimilação"),
    ("Disponveis", "Disponíveis"),
    ("Disponvel", "Disponível"),
    ("Comear", "Começar"),
    ("MATEMTICA", "MATEMÁTICA"),
    ("Matemtica", "Matemática"),
    ("imobilirios", "imobiliários"),
    ("Rodap", "Rodapé"),
    ("contbeis", "contábeis"),
    ("PGINA", "PÁGINA"),
    ("Navegao", "Navegação"),
    ("pr", "pré"),
    ("Frum", "Fórum"),
    ("transferncia", "transferência"),
    ("Contedo", "Conteúdo"),
    ("Edio", "Edição"),
    ("visualizao", "visualização"),
    ("Prxima", "Próxima"),
    ("reteno", "retenção"),
    ("rea", "área"),
    ("vdeo", "vídeo"),
    ("Vdeo", "Vídeo"),
    ("Questes", "Questões"),
    ("padro", "padrão"),
    ("prticos", "práticos"),
    ("clculo", "cálculo"),
    ("Frmula", "Fórmula"),
    ("frmula", "fórmula")
]

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            # Read as latin1 because these files contain mixed encodings
            with open(filepath, 'r', encoding='latin1') as f:
                content = f.read()
            
            original_content = content
            for bad, good in replacements:
                content = content.replace(bad, good)
            
            # Additional cleanup for weird chars
            content = content.replace('Ã\x8d', 'Í')
            content = content.replace('Ã§', 'ç')
            content = content.replace('Ã£', 'ã')
            content = content.replace('Ã¡', 'á')
            content = content.replace('Ã©', 'é')
            content = content.replace('Ã³', 'ó')
            content = content.replace('Ã\xad', 'í')
            content = content.replace('Ãº', 'ú')
            content = content.replace('Ã\x87', 'Ç')
            content = content.replace('Ã\x83', 'Ã')
            content = content.replace('Ã\x95', 'Õ')
            content = content.replace('â\x86\x92', '→')
            content = content.replace('â\x9c\x93', '✓')
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed accents in {filepath}")
