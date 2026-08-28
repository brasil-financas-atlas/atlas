import glob
import re
import os

docs_dir = r"C:\codigos\bfa-main\docs"
md_files = glob.glob(os.path.join(docs_dir, '**', '*.md'), recursive=True)

cleaned_count = 0

for filepath in md_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Regex to match ## Mini quiz or ## Lista de problemas up to the next ## header or EOF
    # Patterns:
    # ## Mini quiz\s*\n[\s\S]*?(?=\n## |\Z)
    # ## Lista de problemas\s*\n[\s\S]*?(?=\n## |\Z)
    # Also case-insensitive and handling accents (e.g. ## Mini Quiz, ## Lista de Problemas)
    pattern = r'\n##\s*(?:Mini\s*quiz|Lista\s*de\s*problemas|Exercícios|Exercicios)[\s\S]*?(?=\n## |\Z)'
    
    modified = re.sub(pattern, '', content, flags=re.IGNORECASE)

    # Clean up double blank lines that might be left
    modified = re.sub(r'\n{3,}', '\n\n', modified)

    if modified != original:
        cleaned_count += 1
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified.strip() + '\n')
        print(f"Cleaned: {filepath}")

print(f"\nTotal markdown files cleaned of Mini quiz and Lista de problemas: {cleaned_count}")
