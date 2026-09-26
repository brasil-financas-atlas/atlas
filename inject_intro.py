with open('src/data/contentData.js', 'r', encoding='utf-8') as f:
    content = f.read()

injection_script = """

// --- Injeção Automática da Introdução como Aula ---
if (window.EXACT_CONTENT) {
  ['financas', 'matematica'].forEach(subjectKey => {
    if (window.EXACT_CONTENT[subjectKey] && window.EXACT_CONTENT[subjectKey].modulos) {
      window.EXACT_CONTENT[subjectKey].modulos.forEach(m => {
        if (m.aulas && (m.aulas.length === 0 || m.aulas[0].slug !== 'introducao')) {
          m.aulas.unshift({
            slug: 'introducao',
            titulo: 'Introdução do Módulo',
            content: m.index || m.indexContent || 'Sem introdução.'
          });
        }
      });
    }
  });
}
"""

if 'Injeção Automática da Introdução como Aula' not in content:
    with open('src/data/contentData.js', 'a', encoding='utf-8') as f:
        f.write(injection_script)
    print('Injected successfully.')
else:
    print('Already injected.')
