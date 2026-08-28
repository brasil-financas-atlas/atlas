import re

with open('scratch/gh_pages_aula1.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's extract the main content container: <div class="md-content" ...> or <article class="md-content__inner md-typeset">
m = re.search(r'<article class="md-content__inner md-typeset">([\s\S]*?)</article>', html)
if m:
    content = m.group(1)
    # Strip HTML tags
    clean = re.sub(r'<[^>]+>', '\n', content)
    clean = re.sub(r'\n\s*\n', '\n\n', clean)
    with open('scratch/gh_pages_aula1_text.txt', 'w', encoding='utf-8') as out:
        out.write(clean.strip())
    print("Extracted article from gh-pages! Saved to scratch/gh_pages_aula1_text.txt")
else:
    print("Could not find article container")
