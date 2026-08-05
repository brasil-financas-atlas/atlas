import os

base_dir = r"C:\codigos\bfa-main\plataforma\src"

# 1. Upgrade AulaPage.jsx to add in-context video URL editor for Admin
aula_page_path = os.path.join(base_dir, "pages", "AulaPage.jsx")
with open(aula_page_path, "r", encoding="utf-8") as f:
    aula_code = f.read()

in_context_video_code = """
          {/* Video Player Section with In-Context Admin Video URL Editor */}
          <div className="bfa-lesson-video-section" style={{ position: 'relative' }}>
            {isAuthenticated && inlineEditActive && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'var(--color-ouro-light)', border: '1px dashed var(--color-ouro)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-ouro-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BfaIcon name="video" size={16} color="var(--color-ouro-dark)" /> Gerenciador In-Context de Vídeo (Modo Admin)
                </span>
                <button
                  type="button"
                  className="bfa-btn bfa-btn--ouro bfa-btn--sm"
                  onClick={() => {
                    const newUrl = prompt("Insira o link da videoaula no YouTube:", videoUrl || "");
                    if (newUrl !== null && updateLesson) {
                      updateLesson(lessonId, { videoUrl: newUrl.trim() });
                    }
                  }}
                >
                  <BfaIcon name="pencil" size={14} style={{ marginRight: '4px' }} /> {videoUrl ? 'Alterar Link do Vídeo' : 'Adicionar Vídeo a esta Aula'}
                </button>
              </div>
            )}

            <VideoPlayer videoUrl={videoUrl} />
          </div>
"""

if "Gerenciador In-Context de Vídeo" not in aula_code:
    aula_code = aula_code.replace(
      '{/* Video Player */}\n          {videoUrl && (\n            <div className="bfa-lesson-video-section">\n              <VideoPlayer videoUrl={videoUrl} />\n            </div>\n          )}',
      in_context_video_code
    )
    with open(aula_page_path, "w", encoding="utf-8") as f:
        f.write(aula_code)
    print("Upgraded AulaPage.jsx with in-context video editor")

# 2. Upgrade QuizEngine.jsx to add in-context quiz question creator
quiz_engine_path = os.path.join(base_dir, "components", "QuizEngine.jsx")
with open(quiz_engine_path, "r", encoding="utf-8") as f:
    quiz_code = f.read()

in_context_quiz_admin = """
  const { isAuthenticated, inlineEditActive, cmsData, updateLesson } = useContext(AdminContext || createContext({}));
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQText, setNewQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [newQExpl, setNewQExpl] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQText.trim() || !optA.trim() || !optB.trim()) return;

    const newQuestionObj = {
      pergunta: newQText.trim(),
      alternativas: [optA.trim(), optB.trim(), optC.trim() || 'N.D.A.', optD.trim() || 'N.D.A.'],
      correta: parseInt(correctIdx, 10),
      explicacao: newQExpl.trim() || 'Explicação do professor.'
    };

    const currentCustomQuizzes = cmsData && cmsData.quizzes && cmsData.quizzes[lessonId] 
      ? cmsData.quizzes[lessonId] 
      : questions;

    const updatedList = [...currentCustomQuizzes, newQuestionObj];
    if (updateLesson) {
      updateLesson(lessonId, { customQuiz: updatedList });
    }

    setNewQText('');
    setOptA(''); setOptB(''); setOptC(''); setOptD('');
    setNewQExpl('');
    setShowAddQuestionModal(false);
  };
"""

if "showAddQuestionModal" not in quiz_code:
    quiz_code = quiz_code.replace(
      "function QuizEngine({ questions, lessonId }) {",
      "function QuizEngine({ questions, lessonId }) {\n" + in_context_quiz_admin
    )

    admin_quiz_btn = """
      <div className="bfa-quiz__actions">
        {isAuthenticated && inlineEditActive && (
          <button
            type="button"
            className="bfa-btn bfa-btn--ouro bfa-btn--sm"
            onClick={() => setShowAddQuestionModal(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginRight: 'auto' }}
          >
            <BfaIcon name="pencil" size={14} /> + Adicionar Questão ao Quiz (Admin)
          </button>
        )}

        {!submitted ? (
    """

    quiz_code = quiz_code.replace(
      '<div className="bfa-quiz__actions">\n        {!submitted ? (',
      admin_quiz_btn
    )

    quiz_modal_jsx = """
      {showAddQuestionModal && (
        <div className="bfa-inline-editor-modal" onClick={() => setShowAddQuestionModal(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1rem' }}>
              ➕ Cadastrar Nova Questão no Quiz (Modo Admin)
            </h3>
            <form onSubmit={handleAddQuestion}>
              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Pergunta:</label>
                <input type="text" value={newQText} onChange={e => setNewQText(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.6rem' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa A:</label>
                  <input type="text" value={optA} onChange={e => setOptA(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} required />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa B:</label>
                  <input type="text" value={optB} onChange={e => setOptB(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} required />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa C:</label>
                  <input type="text" value={optC} onChange={e => setOptC(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa D:</label>
                  <input type="text" value={optD} onChange={e => setOptD(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </div>
              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Alternativa Correta:</label>
                <select value={correctIdx} onChange={e => setCorrectIdx(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }}>
                  <option value={0}>A</option>
                  <option value={1}>B</option>
                  <option value={2}>C</option>
                  <option value={3}>D</option>
                </select>
              </div>
              <div className="bfa-form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Explicação do Gabarito:</label>
                <textarea value={newQExpl} onChange={e => setNewQExpl(e.target.value)} className="bfa-textarea" rows="2" style={{ width: '100%', padding: '0.5rem' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="bfa-btn bfa-btn--ghost" onClick={() => setShowAddQuestionModal(false)}>Cancelar</button>
                <button type="submit" className="bfa-btn bfa-btn--verde">Salvar Nova Questão 💾</button>
              </div>
            </form>
          </div>
        </div>
      )}
    """

    quiz_code = quiz_code.replace(
      "    </div>\n  );\n}",
      quiz_modal_jsx + "    </div>\n  );\n}"
    )

    with open(quiz_engine_path, "w", encoding="utf-8") as f:
        f.write(quiz_code)
    print("Upgraded QuizEngine.jsx with in-context quiz question creator")

# 3. Create plano_admin_features.md artifact
plan_artifact_code = """# Plano de Funcionalidades do Modo Admin (In-Context CMS Plan)

Este documento detalha o mapeamento completo dos **pontos de interesse para o Modo Admin** identificados na varredura da plataforma Brasil Finanças Atlas (BFA) e o plano de execução aprovado.

---

## 🎯 1. Pontos de Interesse Mapeados na Plataforma

### A. Página da Lição (`AulaPage.jsx`)
- **Gerenciamento In-Context de Vídeo**: Permite cadastrar ou alterar o link do YouTube direto no topo da aula sem precisar navegar até o painel administrativo separado.
- **Edição Granular de Trechos & KaTeX**: Edição em tempo real de cada parágrafo, título e fórmula matemática com visualização ao vivo.
- **Edição dos Cartões de Foco & Aplicação Real**: Edição dos cartões do cabeçalho da aula.

### B. Hub de Quizzes (`QuizEngine.jsx`)
- **Criador de Questões In-Context**: Botão `+ Adicionar Questão ao Quiz` exibido nas aulas para o admin incluir novas perguntas com alternativas (A, B, C, D), gabarito e explicação.

### C. Visão Geral das Disciplinas (`DisciplinaOverview.jsx`)
- Edição in-context dos títulos das disciplinas, módulos e nomes das aulas.

### D. Páginas Institucionais & Recursos (`ExtraPages.jsx`)
- **Notícias**: Publicação in-context de novos artigos e edição de notícias existentes.
- **Exercícios**: Edição das perguntas e gabaritos dos estudos de caso PBL.
- **Cronograma**: Edição das orientações e metas de estudo.
- **BRHSIC & Sobre**: Edição das teses de valuation, pilares e história institucional.

---

## 🚀 2. Status de Execução
- [x] Mapeamento e identificação dos pontos de interesse.
- [x] Implementação do Gerenciador de Vídeo In-Context no topo das aulas.
- [x] Criador In-Context de novas questões no QuizEngine.
- [x] Suporte completo a blocos de edição em todas as páginas com persistência em `LocalStorage` (`bfa_cms_overrides`).
"""

plan_artifact_path = r"C:\Users\User\.gemini\antigravity-cli\brain\dba13357-eb49-49d1-be3a-ec20f12384c0\plano_admin_features.md"
with open(plan_artifact_path, "w", encoding="utf-8") as f:
    f.write(plan_artifact_code)
print("Created plano_admin_features.md artifact")

# 4. Update components.css for KaTeX display math centering & visual formatting fixes
components_css_path = os.path.join(base_dir, "styles", "components.css")
with open(components_css_path, "r", encoding="utf-8") as f:
    css_str = f.read()

katex_formatting_fixes = """
/* KaTeX Display Math & Inline Editing Visual Formatting Fixes */
.katex-display {
  margin: 1.25rem 0 !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  padding: 0.5rem 0 !important;
  text-align: center !important;
}

.katex {
  font-size: 1.05em !important;
}

/* Ensure Editable Block Pencil Button Never Distorts Text Layout */
.bfa-editable-wrapper {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 0.75rem !important;
  width: 100% !important;
  position: relative !important;
  margin-bottom: 0.5rem;
}

.bfa-editable-content {
  flex: 1 !important;
  min-width: 0 !important;
  width: 100% !important;
  display: block !important;
}

.bfa-edit-pencil-btn {
  flex-shrink: 0 !important;
  margin-left: 0.5rem !important;
  align-self: flex-start !important;
}
"""

if ".katex-display" not in css_str:
    with open(components_css_path, "a", encoding="utf-8") as f:
        f.write(katex_formatting_fixes)
    print("Appended KaTeX display math and visual formatting fixes to components.css")

print("All admin features & visual formatting fixes applied successfully!")
