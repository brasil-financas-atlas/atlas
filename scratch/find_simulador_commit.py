import subprocess

res = subprocess.run(['git', 'show', '--stat', '5af7558'], capture_output=True, text=True, encoding='utf-8')
print("=== COMMIT 5af7558 STAT ===")
print(res.stdout)

# Let's inspect other commits around 5af7558
res_log = subprocess.run(['git', 'log', '--oneline', '5af7558~5..5af7558+5'], capture_output=True, text=True, encoding='utf-8')
print("\n=== COMMITS AROUND 5af7558 ===")
print(res_log.stdout)

# Let's see what Simulador files existed
res_all = subprocess.run(['git', 'log', '--all', '--name-only', '--oneline', '--', 'plataforma/src/components/Simulador*'], capture_output=True, text=True, encoding='utf-8')
print("\n=== ALL SIMULADOR COMMITS ===")
print(res_all.stdout)
