import re

with open('src/data/contentData.js', 'r', encoding='latin1') as f:
    text = f.read()

mod_match = re.search(r'slug:\s*["\x27]modulo-1-fundamentos["\x27],[\s\S]*?index:\s*(["\x27])([\s\S]*?)\1', text)
if mod_match:
    print('FOUND INDEX for modulo 1:', len(mod_match.group(2)))
else:
    print('INDEX NOT FOUND for modulo-1-fundamentos')
