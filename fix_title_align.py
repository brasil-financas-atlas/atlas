import re

with open('src/pages/AulaPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add text-align center to the div wrapping the title and audio reader if introducao
content = content.replace(
    "<div style={{ marginBottom: '2.5rem' }}>",
    "<div style={{ marginBottom: '2.5rem', textAlign: aulaSlug === 'introducao' ? 'center' : 'left' }}>"
)

# And for the segmented tabs, let's also center them by applying margin: 0 auto
content = content.replace(
    "marginBottom: '2.5rem',",
    "marginBottom: '2.5rem',\n                  margin: aulaSlug === 'introducao' ? '0 auto 2.5rem auto' : '0 0 2.5rem 0',"
)

with open('src/pages/AulaPage.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
