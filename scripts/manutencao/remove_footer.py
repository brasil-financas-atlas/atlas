import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the {!isAulaRoute && <Footer />}
content = re.sub(r'\{!isAulaRoute\s*&&\s*<Footer\s*/>\}', '', content)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
