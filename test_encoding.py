with open('src/pages/AulaPage.jsx', 'r', encoding='latin1') as f:
    text = f.read()
import re
words = set(re.findall(r'\b\w*[^\x00-\x7F]+\w*\b', text))
print('Corrupted words in AulaPage:', list(words)[:50])
