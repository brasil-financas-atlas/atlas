import subprocess
import re
import json

def parse_js_data(code):
    # Find start of object after window.xxx = 
    match = re.search(r'window\.\w+\s*=\s*(\{[\s\S]*\});?\s*$', code)
    if not match:
        # Try match from { to last }
        idx = code.find('{')
        last_idx = code.rfind('}')
        if idx != -1 and last_idx != -1:
            json_str = code[idx:last_idx+1]
        else:
            return {}
    else:
        json_str = match.group(1)
    
    # Clean possible trailing commas or JS specifics if needed
    try:
        return json.loads(json_str)
    except:
        # Fallback to node
        res = subprocess.run(['node', '-e', f'console.log(JSON.stringify({code}))'], capture_output=True, text=True, encoding='utf-8')
        if res.returncode == 0:
            return json.loads(res.stdout)
        return {}

res_mat = subprocess.run(['git', 'show', 'main:plataforma/src/data/matematicaData.js'], capture_output=True, text=True, encoding='utf-8')
res_fin = subprocess.run(['git', 'show', 'main:plataforma/src/data/financasData.js'], capture_output=True, text=True, encoding='utf-8')

# Run with Node directly to parse window.xxx
node_script = """
const fs = require('fs');
const vm = require('vm');

function parseData(code, varName) {
  const sandbox = { window: {} };
  vm.runInContext(code, vm.createContext(sandbox));
  return sandbox.window[varName];
}

const matCode = process.argv[1];
const finCode = process.argv[2];

const mat = parseData(matCode, 'matematicaData');
const fin = parseData(finCode, 'financasData');

console.log(JSON.stringify({ mat, fin }));
"""

with open('scratch/mat_main.js', 'w', encoding='utf-8') as f:
    f.write(res_mat.stdout)

with open('scratch/fin_main.js', 'w', encoding='utf-8') as f:
    f.write(res_fin.stdout)

res_node = subprocess.run(['node', '-e', """
const fs = require('fs');
const vm = require('vm');
const matCode = fs.readFileSync('scratch/mat_main.js', 'utf-8');
const finCode = fs.readFileSync('scratch/fin_main.js', 'utf-8');

const sMat = { window: {} };
vm.runInContext(matCode, vm.createContext(sMat));
const mat = sMat.window.matematicaData;

const sFin = { window: {} };
vm.runInContext(finCode, vm.createContext(sFin));
const fin = sFin.window.financasData;

console.log('=== MATEMATICA MAIN QUESTION COUNTS ===');
mat.modulos.forEach(m => {
  console.log('\\n' + m.titulo);
  m.aulas.forEach(a => {
    const q = (a.quiz || []).length;
    const mq = (a.miniQuiz || []).length;
    const lp = (a.listaProblemas || []).length;
    console.log(`  ${a.slug}: quiz=${q}, miniQuiz=${mq}, listaProblemas=${lp} (TOTAL=${q+mq+lp})`);
  });
});

console.log('\\n=== FINANCAS MAIN QUESTION COUNTS ===');
fin.modulos.forEach(m => {
  console.log('\\n' + m.titulo);
  m.aulas.forEach(a => {
    const q = (a.quiz || []).length;
    const mq = (a.miniQuiz || []).length;
    const lp = (a.listaProblemas || []).length;
    console.log(`  ${a.slug}: quiz=${q}, miniQuiz=${mq}, listaProblemas=${lp} (TOTAL=${q+mq+lp})`);
  });
});
"""], capture_output=True, text=True, encoding='utf-8')

print(res_node.stdout)
