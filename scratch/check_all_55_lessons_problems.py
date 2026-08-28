import subprocess
import re

res_tree = subprocess.run(['git', 'ls-tree', '-r', 'main', '--name-only'], capture_output=True, text=True, encoding='utf-8')
md_files = [f for f in res_tree.stdout.splitlines() if f.endswith('.md') and 'docs/' in f and ('modulo-' in f)]

print(f"Total lesson markdown files in main docs: {len(md_files)}")

results = []

for path in md_files:
    res = subprocess.run(['git', 'show', f'main:{path}'], capture_output=True, text=True, encoding='utf-8')
    if res.returncode == 0:
        c = res.stdout
        # Find all problem sections
        sections = re.findall(r'##\s*(?:Mini\s*quiz|Lista\s*de\s*problemas|Exercícios)[\s\S]*?(?=\n## |\Z)', c, re.IGNORECASE)
        total_items = 0
        for s in sections:
            # Exclude gabarito lines
            g_idx = s.find('Gabarito')
            s_clean = s[:g_idx] if g_idx != -1 else s
            items = re.findall(r'^\s*\d+\.\s+(.+)$', s_clean, re.MULTILINE)
            total_items += len(items)
        
        results.append((path, total_items))
        if total_items > 5:
            print(f"MORE THAN 5: {path} -> {total_items} problems")
        elif total_items < 5 and total_items > 0:
            print(f"FEWER THAN 5: {path} -> {total_items} problems")

print("\nFull breakdown:")
for path, cnt in results:
    print(f"  {path}: {cnt}")
