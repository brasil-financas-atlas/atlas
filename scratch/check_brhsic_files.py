import subprocess

files_to_restore = [
    'plataforma/src/components/SimuladorCarteiraInvestimentos.jsx',
    'plataforma/src/components/SimuladosEngine.jsx',
    'plataforma/src/components/RankingLeaderboard.jsx',
    'plataforma/src/components/BadgesConquistas.jsx',
    'plataforma/src/data/simuladosData.js'
]

for f in files_to_restore:
    res = subprocess.run(['git', 'show', f'0296c9f:{f}'], capture_output=True, text=True, encoding='utf-8')
    if res.returncode == 0:
        print(f"Found {f} in 0296c9f! Lines: {len(res.stdout.splitlines())}")
    else:
        print(f"NOT found {f} in 0296c9f (trying earlier commits)")
        # Try finding in tree
        res_tree = subprocess.run(['git', 'log', '--all', '--name-only', '--oneline', '--', f], capture_output=True, text=True, encoding='utf-8')
        print(res_tree.stdout[:300])
