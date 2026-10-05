import os

files_to_fix = [
    'src/pages/AulaPage.jsx',
    'src/pages/DisciplinaOverview.jsx'
]

# Read as latin1 so we don't lose the exact byte representations of the mojibake
# e.g., 0xcd becomes \xcd in the python string.
for filepath in files_to_fix:
    with open(filepath, 'r', encoding='latin1') as f:
        content = f.read()
    
    # Exact specific mojibake substrings extracted from previous checks
    content = content.replace('F\xc3\xb3rum', 'Fórum')
    content = content.replace('Exerc\xadcios', 'Exercícios')
    content = content.replace('M\xc3\xb3dulo', 'Módulo')
    content = content.replace('transfer\xc3\xaancia', 'transferência')
    content = content.replace('Conte\xc3\xbado', 'Conteúdo')
    content = content.replace('fixa\xc3\xa7\xc3\xa3o', 'fixação')
    content = content.replace('Edi\xc3\xa7\xc3\xa3o', 'Edição')
    content = content.replace('M\x93DULO', 'MÓDULO')
    content = content.replace('visualiza\xc3\xa7\xc3\xa3o', 'visualização')
    content = content.replace('Pr\xc3\xb3xima', 'Próxima')
    content = content.replace('FINAN\x87AS', 'FINANÇAS')
    content = content.replace('reten\xc3\xa7\xc3\xa3o', 'retenção')
    content = content.replace('\xadndice', 'Índice')
    content = content.replace('\x8d\xadndice', 'Índice')
    content = content.replace('\xc3\x8dndice', 'Índice')
    content = content.replace('\xc3\xa1rea', 'área')
    content = content.replace('v\xaddeo', 'vídeo')
    content = content.replace('V\xaddeo', 'Vídeo')
    content = content.replace('Quest\xc3\xb5es', 'Questões')
    content = content.replace('Configura\xc3\xa7\xc3\xa3o', 'Configuração')
    content = content.replace('padr\xc3\xa3o', 'padrão')
    content = content.replace('n\xc3\xa3o', 'não')
    content = content.replace('Dispon\xadveis', 'Disponíveis')
    content = content.replace('Dispon\xadvel', 'Disponível')
    content = content.replace('Fixa\xc3\xa7\xc3\xa3o', 'Fixação')
    content = content.replace('Introdu\xc3\xa7\xc3\xa3o', 'Introdução')
    content = content.replace('INTRODU\x87\x83O', 'INTRODUÇÃO')
    content = content.replace('Conclu\xadda', 'Concluída')
    content = content.replace('Conclu\xaddas', 'Concluídas')
    content = content.replace('Conclu\xaddo', 'Concluído')
    content = content.replace('MATEM\x81TICA', 'MATEMÁTICA')
    content = content.replace('pr\xc3\xa1ticos', 'práticos')
    content = content.replace('exerc\xadcios', 'exercícios')
    content = content.replace('Finan\xc3\xa7as', 'Finanças')
    content = content.replace('c\xc3\xa1lculo', 'cálculo')
    content = content.replace('Pr\xc3\xa9', 'Pré')
    content = content.replace('pr\xc3\xa9', 'pré')
    content = content.replace('cont\xc3\xa1beis', 'contábeis')
    content = content.replace('Navega\xc3\xa7\xc3\xa3o', 'Navegação')
    content = content.replace('M\xc3\xb3dulos', 'Módulos')
    content = content.replace('P\x81GINA', 'PÁGINA')
    content = content.replace('assimila\xc3\xa7\xc3\xa3o', 'assimilação')
    content = content.replace('amortiza\xc3\xa7\xc3\xa3o', 'amortização')
    content = content.replace('imobili\xc3\xa1rios', 'imobiliários')
    content = content.replace('\xc3\xa1lgebra', 'álgebra')
    content = content.replace('introdu\xc3\xa7\xc3\xa3o', 'introdução')
    content = content.replace('a\xc3\xa7\xc3\xb5es', 'ações')
    content = content.replace('Matem\xc3\xa1tica', 'Matemática')
    content = content.replace('Rodap\xc3\xa9', 'Rodapé')
    content = content.replace('m\xc3\xb3dulo', 'módulo')
    content = content.replace('Come\xc3\xa7ar', 'Começar')
    content = content.replace('Vis\xc3\xa3o', 'Visão')
    
    # Write back as utf-8
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
