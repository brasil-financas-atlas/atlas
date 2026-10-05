import re

with open('src/pages/AulaPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the main tag with main + wrapper
target = "<main style={{ flex: 1, minWidth: 0, padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '2rem 1.5rem' : '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>"
replacement = target + "\n        <div style={{ maxWidth: '860px', margin: '0 auto' }}>"
content = content.replace(target, replacement)

# Remove maxWidth from article
content = content.replace(
    '<article className="bfa-lesson-article" style={{ maxWidth: \'860px\', margin: \'0 auto\' }}>',
    '<article className="bfa-lesson-article">'
)

# Add closing div before closing main
content = content.replace(
    '        </div>\n      </main>',
    '        </div>\n        </div>\n      </main>'
)

with open('src/pages/AulaPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
