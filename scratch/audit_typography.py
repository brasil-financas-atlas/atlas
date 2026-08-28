import glob
import re

files = glob.glob('docs/**/*.md', recursive=True) + ['plataforma/src/data/contentData.js']

total_cramped_rs = 0
total_katex_rs = 0
total_cramped_math = 0

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check R$ followed immediately by a digit (like R$1000)
    cramped_rs = len(re.findall(r'R\$[0-9]', content))
    # Check KaTeX R\$ without space
    katex_rs = len(re.findall(r'R\\\$[0-9]', content))
    # Check math operators without spaces in text (e.g. 1000+15t or f(x)=2x+30 or 2x+10=50)
    # in plain markdown text (outside $$ blocks)
    
    if cramped_rs > 0 or katex_rs > 0:
        print(f"{path}: R$digit={cramped_rs}, R\\$digit={katex_rs}")
        total_cramped_rs += cramped_rs
        total_katex_rs += katex_rs

print(f"\nTOTAL Cramped R$ occurrences: {total_cramped_rs}")
print(f"TOTAL KaTeX R\\$ occurrences: {total_katex_rs}")
