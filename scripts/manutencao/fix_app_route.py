import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace ModuloIntroPage route with a redirect
target_route = r"""    // Dynamic Route: Introdu(.*?) ao M(.*?)dulo \(\/:subjectKey\/:moduloSlug\)
    const parts = currentPath.split\('\/'\).filter\(Boolean\);
    if \(parts.length === 2 && \(parts\[0\] === 'matematica' \|\| parts\[0\] === 'financas'\)\) \{
      return \(
        <ModuloIntroPage
          subjectKey=\{parts\[0\]\}
          moduloSlug=\{parts\[1\]\}
        \/>
      \);
    \}"""

replacement_route = """    // Dynamic Route: Redirecionar /módulo para /módulo/introducao
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length === 2 && (parts[0] === 'matematica' || parts[0] === 'financas')) {
      // Redirect silently to introducao
      setTimeout(() => { window.location.hash = `#/${parts[0]}/${parts[1]}/introducao`; }, 0);
      return null;
    }"""

content = re.sub(target_route, replacement_route, content, flags=re.DOTALL)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
