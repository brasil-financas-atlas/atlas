import subprocess

branches = ['main', 'origin/conserta-matematica', 'origin/inovador', 'origin/sem-token-e-rls']

for b in branches:
    res = subprocess.run(['git', 'log', '-n', '1', '--oneline', b], capture_output=True, text=True, encoding='utf-8')
    print(f"Branch {b}: {res.stdout.strip()}")
    
    # Check if this branch has different files in docs/
    res_diff = subprocess.run(['git', 'diff', '--stat', f'{b}...HEAD', '--', 'docs/'], capture_output=True, text=True, encoding='utf-8')
    print(f"  Diff docs vs HEAD ({len(res_diff.stdout.splitlines())} files changed)")
