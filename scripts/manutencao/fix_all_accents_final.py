import os

R = '\ufffd'
replacements = [
    (f"CONSTRU{R}O", "CONSTRUÇÃO"),
    (f"N{R}O", "NÃO"),
    (f"n{R}o", "não"),
    (f"VERIFICA{R}O", "VERIFICAÇÃO"),
    (f"INTRODU{R}O", "INTRODUÇÃO"),
    (f"Introdu{R}o", "Introdução"),
    (f"introdu{R}o", "introdução"),
    (f"COMPETI{R}O", "COMPETIÇÃO"),
    (f"PREPARA{R}O", "PREPARAÇÃO"),
    (f"FIXA{R}O", "FIXAÇÃO"),
    (f"fixa{R}o", "fixação"),
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
    (f"t{R}tulo", "título"),
    (f"{R}ndice", "Índice"),
    (f"Configura{R}o", "Configuração"),
    (f"atualiza{R}o", "atualização"),
    (f"Publica{R}o", "Publicação"),
    (f"A{R}o", "Ação"),
    (f"a{R}es", "ações"),
    (f"M{R}dulo", "Módulo"),
    (f"m{R}dulo", "módulo"),
    (f"M{R}DULO", "MÓDULO"),
    (f"Vis{R}o", "Visão"),
    (f"Conclu{R}do", "Concluído"),
    (f"Conclu{R}da", "Concluída"),
    (f"Exerc{R}cios", "Exercícios"),
    (f"{R}lgebra", "álgebra"),
    (f"Finan{R}as", "Finanças"),
    (f"FINAN{R}AS", "FINANÇAS"),
    (f"amortiza{R}o", "amortização"),
    (f"assimila{R}o", "assimilação"),
    (f"Dispon{R}veis", "Disponíveis"),
    (f"Dispon{R}vel", "Disponível"),
    (f"Come{R}ar", "Começar"),
    (f"MATEM{R}TICA", "MATEMÁTICA"),
    (f"Matem{R}tica", "Matemática"),
    (f"imobili{R}rios", "imobiliários"),
    (f"Rodap{R}", "Rodapé"),
    (f"cont{R}beis", "contábeis"),
    (f"P{R}GINA", "PÁGINA"),
    (f"Navega{R}o", "Navegação"),
    (f"pr{R}", "pré"),
    (f"F{R}rum", "Fórum"),
    (f"transfer{R}ncia", "transferência"),
    (f"Conte{R}do", "Conteúdo"),
    (f"Edi{R}o", "Edição"),
    (f"visualiza{R}o", "visualização"),
    (f"Pr{R}xima", "Próxima"),
    (f"reten{R}o", "retenção"),
    (f"{R}rea", "área"),
    (f"v{R}deo", "vídeo"),
    (f"V{R}deo", "Vídeo"),
    (f"Quest{R}es", "Questões"),
    (f"padr{R}o", "padrão"),
    (f"pr{R}ticos", "práticos"),
    (f"c{R}lculo", "cálculo")
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
