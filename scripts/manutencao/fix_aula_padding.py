import re

with open('src/pages/AulaPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "<main style={{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>",
    "<main style={{ flex: 1, minWidth: 0, padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '2rem 1.5rem' : '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>"
)

with open('src/pages/AulaPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
