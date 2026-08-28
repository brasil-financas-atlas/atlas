import subprocess
import re
import json

# Fetch list of files from origin/gh-pages
res_tree = subprocess.run(['git', 'ls-tree', '-r', 'origin/gh-pages', '--name-only'], capture_output=True, text=True, encoding='utf-8')
gh_pages_files = [f for f in res_tree.stdout.splitlines() if f.endswith('.html')]

# Load local contentData.js
with open('plataforma/src/data/contentData.js', 'r', encoding='utf-8') as f:
    c = f.read().strip()
    if c.startswith('window.EXACT_CONTENT = '):
        c = c[len('window.EXACT_CONTENT = '):]
    if c.endswith(';'):
        c = c[:-1]
    local_content = json.loads(c)

report = {
    "total_pages_gh_pages": len(gh_pages_files),
    "lessons_comparison": [],
    "structural_differences": [],
    "missing_sections_or_text": []
}

def clean_html(html_str):
    m = re.search(r'<article class="md-content__inner md-typeset">([\s\S]*?)</article>', html_str)
    if not m:
        return ""
    body = m.group(1)
    # remove tags
    text = re.sub(r'<[^>]+>', ' ', body)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

for p in gh_pages_files:
    if p in ['404.html']:
        continue
    res_page = subprocess.run(['git', 'show', f'origin/gh-pages:{p}'], capture_output=True, text=True, encoding='utf-8')
    if res_page.returncode == 0:
        html_text = clean_html(res_page.stdout)
        
        # Check corresponding local content
        # Example p: matematica-aplicada-a-financas/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes/index.html
        parts = p.replace('/index.html', '').split('/')
        local_text = ""
        if len(parts) == 1:
            key = parts[0]
            if key == 'index.html' or key == '':
                local_text = local_content.get('index', '')
            elif key == 'matematica-aplicada-a-financas':
                local_text = local_content.get('matematica', {}).get('index', '')
            elif key == 'financas':
                local_text = local_content.get('financas', {}).get('index', '')
            elif key == 'preparacao-brhsic':
                local_text = local_content.get('preparacaoBrhsic', '')
            elif key == 'sobre':
                local_text = local_content.get('sobre', '')
            elif key == 'noticias':
                local_text = local_content.get('noticias', '')
            elif key == 'exercicios':
                local_text = local_content.get('exercicios', '')
        elif len(parts) == 2:
            subj = 'matematica' if 'matematica' in parts[0] else 'financas'
            mod_slug = parts[1]
            mod_obj = next((m for m in local_content.get(subj, {}).get('modulos', []) if m['slug'] == mod_slug), None)
            if mod_obj:
                local_text = mod_obj.get('indexContent', '')
        elif len(parts) == 3:
            subj = 'matematica' if 'matematica' in parts[0] else 'financas'
            mod_slug = parts[1]
            aula_slug = parts[2]
            mod_obj = next((m for m in local_content.get(subj, {}).get('modulos', []) if m['slug'] == mod_slug), None)
            if mod_obj:
                aula_obj = next((a for a in mod_obj.get('aulas', []) if a['slug'] == aula_slug), None)
                if aula_obj:
                    local_text = aula_obj.get('content', '')

        report["lessons_comparison"].append({
            "path": p,
            "gh_pages_length": len(html_text),
            "local_length": len(local_text),
            "matched": len(local_text) > 0
        })

with open('scratch/deep_comparison_report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

print("Comparison complete! Saved to scratch/deep_comparison_report.json")
