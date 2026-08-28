import subprocess

res = subprocess.run(['git', 'log', '-p', '-n', '5', '--', 'docs/matematica-aplicada-a-financas/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes.md'], capture_output=True, text=True, encoding='utf-8')

print(res.stdout[:3000])
