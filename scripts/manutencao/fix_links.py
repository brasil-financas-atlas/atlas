import re

with open('src/pages/DisciplinaOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update href links to the module to point to /introducao
content = re.sub(r'href=\{`#/\$\{subjectKey\}/\$\{mod.slug\}`\}', r'href={`#/${subjectKey}/${mod.slug}/introducao`}', content)
# We also have m.slug links
content = re.sub(r'href=\{`#/\$\{subjectKey\}/\$\{m.slug\}`\}', r'href={`#/${subjectKey}/${m.slug}/introducao`}', content)
# Also the title link
content = re.sub(r'<a href=\{`#/\$\{subjectKey\}`\} style=\{\{ color: \'inherit\', textDecoration: \'none\' \}\}>\{isMatematica \? \'Matemática\' : \'Finanças\'\}</a> / <strong style=\{\{ color: \'var\(--text-primary\)\' \}\}>\{moduloObj.titulo\}</strong> / Introdução', r'<a href={`#/${subjectKey}`} style={{ color: \'inherit\', textDecoration: \'none\' }}>{isMatematica ? \'Matemática\' : \'Finanças\'}</a> / <strong style={{ color: \'var(--text-primary)\' }}>{moduloObj.titulo}</strong>', content)


with open('src/pages/DisciplinaOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
