import re

with open('src/pages/DisciplinaOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'/\* ==========================================================================\s*3\. P[^\n]+DE INTRODU[^\n]+\s*========================================================================== \*/\s*function ModuloIntroPage.*?window\.ModuloIntroPage = ModuloIntroPage;\s*', re.DOTALL)

if pattern.search(content):
    content = pattern.sub('', content)
    with open('src/pages/DisciplinaOverview.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Deleted ModuloIntroPage successfully.')
else:
    print('ModuloIntroPage not found.')
