import subprocess

res = subprocess.run(['git', 'log', 'inovador', '-n', '15', '--name-status', '--oneline'], capture_output=True, text=True, encoding='utf-8')
print("=== INOVADOR COMMITS AND FILES ===")
print(res.stdout)

# Let's inspect content of 5af7558:plataforma/src/components/SimuladorCarteiraInvestimentos.jsx
res_sim = subprocess.run(['git', 'show', '5af7558:plataforma/src/components/SimuladorCarteiraInvestimentos.jsx'], capture_output=True, text=True, encoding='utf-8')

with open('scratch/SimuladorCarteiraInvestimentos_restored.jsx', 'w', encoding='utf-8') as f:
    f.write(res_sim.stdout)

print(f"\nRestored scratch/SimuladorCarteiraInvestimentos_restored.jsx (Length: {len(res_sim.stdout)} chars, {len(res_sim.stdout.splitlines())} lines)")
