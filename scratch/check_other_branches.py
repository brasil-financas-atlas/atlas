import subprocess

# Check gh-pages
res_gh = subprocess.run(['git', 'show', 'origin/gh-pages:matematica-aplicada-a-financas/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes/index.html'], capture_output=True, text=True, encoding='utf-8')
if res_gh.returncode == 0:
    print("Found on gh-pages! Length:", len(res_gh.stdout))
    with open('scratch/gh_pages_aula1.html', 'w', encoding='utf-8') as f:
        f.write(res_gh.stdout)
    print("Saved scratch/gh_pages_aula1.html")
else:
    print("Not found on gh-pages directly")

# Check conserta-matematica
res_cm = subprocess.run(['git', 'ls-tree', '-r', 'origin/conserta-matematica', '--name-only'], capture_output=True, text=True, encoding='utf-8')
print("conserta-matematica files:", len(res_cm.stdout.splitlines()))
