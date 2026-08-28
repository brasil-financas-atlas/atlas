import subprocess
import re

# Get commit before strip
res = subprocess.run(['git', 'log', '--grep=strip', '--format=%H'], capture_output=True, text=True)
# Or let's inspect the tree at HEAD~10
res_files = subprocess.run(['git', 'ls-tree', '-r', 'main', '--name-only'], capture_output=True, text=True)
md_files = [f for f in res_files.stdout.splitlines() if f.endswith('.md') and 'docs/' in f]

print(f"Total markdown files found in main docs: {len(md_files)}")

total_problems_in_docs = 0

for path in md_files:
    res_content = subprocess.run(['git', 'show', f'main:{path}'], capture_output=True, text=True, encoding='utf-8')
    if res_content.returncode == 0:
        c = res_content.stdout
        # find ## Mini quiz or ## Lista de problemas
        m = re.search(r'##\s*(?:Mini\s*quiz|Lista\s*de\s*problemas)[\s\S]*?(?=\n## |\Z)', c, re.IGNORECASE)
        if m:
            block = m.group(0)
            # count numbered items like "1. ", "2. ", "3. ", etc.
            items = re.findall(r'^\s*\d+\.\s+(.+)$', block, re.MULTILINE)
            # if there is also Gabarito with items, exclude gabarito items
            gabarito_idx = block.find('Gabarito')
            if gabarito_idx != -1:
                before_gab = block[:gabarito_idx]
                items = re.findall(r'^\s*\d+\.\s+(.+)$', before_gab, re.MULTILINE)
            
            print(f"{path}: {len(items)} items")
            total_problems_in_docs += len(items)

print(f"\nTOTAL problems across all original markdown files: {total_problems_in_docs}")
