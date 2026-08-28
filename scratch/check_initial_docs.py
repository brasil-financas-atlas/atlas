import subprocess

res_commits = subprocess.run(['git', 'log', '--reverse', '--format=%H %s'], capture_output=True, text=True, encoding='utf-8')
commits = res_commits.stdout.splitlines()

print("Initial commits:")
for c in commits[:10]:
    print(c)

first_commit = commits[0].split()[0]
print(f"\nComparing first commit ({first_commit}) with current...")

res_tree = subprocess.run(['git', 'ls-tree', '-r', first_commit, '--name-only'], capture_output=True, text=True, encoding='utf-8')
first_files = res_tree.stdout.splitlines()
print(f"Total files in first commit: {len(first_files)}")

# Check aula-01-numeros-e-operacoes in first commit vs current
res_first_content = subprocess.run(['git', 'show', f'{first_commit}:docs/matematica-aplicada-a-financas/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes.md'], capture_output=True, text=True, encoding='utf-8')

with open('scratch/aula1_first_commit.md', 'w', encoding='utf-8') as f:
    f.write(res_first_content.stdout)

print("Saved scratch/aula1_first_commit.md")
