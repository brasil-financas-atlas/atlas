import re

with open('src/pages/AulaPage.jsx', 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# The user explicitly reported 'Índice' being corrupted
content = content.replace('\ufffdndice', 'Índice')
content = content.replace('?\ufffdndice', 'Índice')

# We can also fix other common words if they were replaced with \ufffd
replacements = [
    ("\ufffdrea", "área"),
    ("v\ufffddeo", "vídeo"),
    ("V\ufffddeo", "Vídeo"),
    ("Quest\ufffdes", "Questões"),
    ("Configura\ufffdo", "Configuração"),
    ("padr\ufffdo", "padrão"),
    ("pr\ufffdticos", "práticos"),
    ("Exerc\ufffdcios", "Exercícios"),
    ("exerc\ufffdcios", "exercícios"),
    ("M\ufffddulo", "Módulo"),
    ("M\ufffdDULO", "MÓDULO"),
    ("transfer\ufffdncia", "transferência"),
    ("Conte\ufffddo", "Conteúdo"),
    ("fixa\ufffdo", "fixação"),
    ("Fixa\ufffdo", "Fixação"),
    ("Edi\ufffdo", "Edição"),
    ("visualiza\ufffdo", "visualização"),
    ("Pr\ufffdxima", "Próxima"),
    ("FINAN\ufffdAS", "FINANÇAS"),
    ("reten\ufffdo", "retenção"),
    ("Dispon\ufffdveis", "Disponíveis"),
    ("Dispon\ufffdvel", "Disponível"),
    ("Introdu\ufffdo", "Introdução"),
    ("INTRODU\ufffdO", "INTRODUÇÃO"),
    ("Conclu\ufffdda", "Concluída"),
    ("Conclu\ufffddas", "Concluídas"),
    ("Conclu\ufffddo", "Concluído"),
    ("MATEM\ufffdTICA", "MATEMÁTICA"),
    ("Matem\ufffdtica", "Matemática"),
    ("Finan\ufffdas", "Finanças"),
    ("c\ufffdlculo", "cálculo"),
    ("F\ufffdrum", "Fórum"),
    ("cont\ufffdbeis", "contábeis"),
    ("Come\ufffdar", "Começar"),
    ("Vis\ufffdo", "Visão"),
    ("M\ufffddulos", "Módulos"),
    ("pr\ufffd-requisitos", "pré-requisitos"),
    ("assimila\ufffdo", "assimilação"),
    ("amortiza\ufffdo", "amortização"),
    ("imobili\ufffdrios", "imobiliários"),
    ("\ufffdlgebra", "álgebra"),
    ("introdu\ufffdo", "introdução"),
    ("a\ufffdes", "ações"),
    ("P\ufffdGINA", "PÁGINA"),
    ("m\ufffddulo", "módulo"),
    ("Rodap\ufffd", "Rodapé")
]

for bad, good in replacements:
    content = content.replace(bad, good)

with open('src/pages/AulaPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
