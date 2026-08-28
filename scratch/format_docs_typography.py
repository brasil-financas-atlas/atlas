import glob
import re
import os

docs_dir = r"C:\codigos\bfa-main\docs"
md_files = glob.glob(os.path.join(docs_dir, '**', '*.md'), recursive=True)

total_changes = 0

for filepath in md_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    modified = original

    # 1. Fix R$ followed directly by a digit: R$1000 -> R$ 1.000 / R$ 1000
    modified = re.sub(r'R\$([0-9])', r'R$ \1', modified)

    # 2. Fix R\$ in KaTeX blocks: R\$1.300 -> \text{R\$\ } 1.300 or R\$ 1.300
    # In KaTeX, R\$ followed by digit causes R to be rendered as an italic variable glued to the dollar and digit
    modified = re.sub(r'R\\\$([0-9])', r'\\text{R\$\\ } \1', modified)
    modified = re.sub(r'R\\\$ ([0-9])', r'\\text{R\$\\ } \1', modified)

    # 3. Add space around equal signs in inline expressions if cramped: e.g. f(x)=2x+10 -> f(x) = 2x + 10
    # but avoid breaking markdown headers like ## or urls
    # Fix cramped arithmetic in text: e.g. 1000+15t -> 1000 + 15t, 2x+30=50 -> 2x + 30 = 50
    # Let's do targeted safe replacements for common financial math patterns:
    modified = re.sub(r'(\d+)\s*\+\s*(\d+)t', r'\1 + \2t', modified)
    modified = re.sub(r'M\(t\)=', r'M(t) = ', modified)
    modified = re.sub(r'f\(x\)=', r'f(x) = ', modified)
    modified = re.sub(r'f\(d\)=', r'f(d) = ', modified)
    modified = re.sub(r'P\(t\)=', r'P(t) = ', modified)
    modified = re.sub(r'C\(q\)=', r'C(q) = ', modified)
    modified = re.sub(r'L\(q\)=', r'L(q) = ', modified)
    modified = re.sub(r'R\(q\)=', r'R(q) = ', modified)
    modified = re.sub(r'V\(t\)=', r'V(t) = ', modified)

    # 4. Spacing around bullet calculations: e.g. `R$ 1.000 × (1 + 0,10 × 30) = **R$ 4.000**`
    # Ensure space around × and ≈
    modified = re.sub(r'([0-9\)])\s*×\s*([0-9\(])', r'\1 × \2', modified)
    modified = re.sub(r'([0-9\)])\s*≈\s*([0-9\(])', r'\1 ≈ \2', modified)
    modified = re.sub(r'([0-9\)])\s*=\s*([0-9\(])', r'\1 = \2', modified)

    # 5. Fix percentage spacing against words: e.g. `10%ao ano` -> `10% ao ano`, `1,5%a.m.` -> `1,5% a.m.`
    modified = re.sub(r'(\d+(?:,\d+)?)%([a-zA-Z])', r'\1% \2', modified)

    if modified != original:
        total_changes += 1
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        print(f"Updated: {filepath}")

print(f"\nTotal files updated with clean spacing: {total_changes}")
