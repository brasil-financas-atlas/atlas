import os
import re

src_dir = r"C:\codigos\bfa-main\plataforma\src"

pattern = re.compile(r'^\s*(export|import)\b', re.MULTILINE)

found = []
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.js', '.jsx')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                matches = pattern.findall(content)
                if matches:
                    found.append((path, len(matches)))

print("Files with export/import keywords:")
for p, count in found:
    print(f"  {p}: {count} occurrences")
