import re

with open('src/pages/DisciplinaOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'\{\s*sidebarOpen\s*&&\s*\(\s*<div\s+onClick=\{\(\) => setSidebarOpen\(false\)\}\s+aria-hidden="true"\s+style=\{\{\s*position:\s*\'fixed\',\s*inset:\s*0,\s*backgroundColor:\s*\'rgba\(0,0,0,0\.5\)\',\s*zIndex:\s*40\s*\}\}\s*/>\s*\)\s*\}')

replacement = """{sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 768 && (
          <div
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          />
        )}"""

content = pattern.sub(replacement, content)
content = re.sub(r'<div style=.*?DEBUG: markdownContent length.*?</div>\n\s*', '', content)

with open('src/pages/DisciplinaOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
