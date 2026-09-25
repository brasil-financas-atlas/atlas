import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                matches = set(re.findall(r'\b\w*Ã\S*\b', content))
                if matches:
                    print(f"MOJIBAKE IN {filepath}: {matches}")
            except Exception:
                pass
