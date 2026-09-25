with open('src/pages/DisciplinaOverview.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """{sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          />
        )}"""

replacement = """{sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 768 && (
          <div
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          />
        )}"""

if target in content:
    content = content.replace(target, replacement)
else:
    print('Target not found')

import re
content = re.sub(r'<div style=.*?DEBUG: markdownContent length.*?</div>\n\s*', '', content)

with open('src/pages/DisciplinaOverview.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
