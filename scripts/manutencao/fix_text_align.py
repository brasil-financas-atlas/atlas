import re

with open('src/pages/AulaPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "<main style={{ flex: 1, minWidth: 0, padding: '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>",
    "<main style={{ flex: 1, minWidth: 0, padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '2rem 1rem' : '3rem 4rem', backgroundColor: 'var(--bg-app)', height: '100vh', overflowY: 'auto' }}>"
)

content = content.replace(
    '<article className="bfa-lesson-article">',
    '<article className="bfa-lesson-article" style={{ textAlign: aulaSlug === "introducao" ? "center" : "justify" }}>'
)

with open('src/pages/AulaPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
