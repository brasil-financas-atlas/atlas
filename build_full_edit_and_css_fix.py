import os

base_dir = r"C:\codigos\bfa-main\plataforma\src"

# 1. Update components.css to add full DisciplinaOverview and Inline Editing styles
components_css_path = os.path.join(base_dir, "styles", "components.css")
with open(components_css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

additional_css = """
/* DisciplinaOverview Styles */
.bfa-overview__hero {
  padding: 4rem 1.5rem;
  color: #FFFFFF;
  text-align: center;
}

.bfa-overview--matematica .bfa-overview__hero {
  background: linear-gradient(135deg, #124827 0%, #1B6B3A 60%, #208749 100%);
}

.bfa-overview--financas .bfa-overview__hero {
  background: linear-gradient(135deg, #0F243C 0%, #1B3A5C 60%, #174878 100%);
}

.bfa-overview__container {
  max-width: 1000px;
  margin: 0 auto;
}

.bfa-overview__hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 1rem 0;
}

.bfa-overview__meta {
  font-size: 1.05rem;
  color: #E2E8F0;
  margin-bottom: 2rem;
}

.bfa-overview__progress {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.75rem;
  max-width: 700px;
  margin: 0 auto;
}

.bfa-overview__progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #FFFFFF;
}

.bfa-modules-list {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.bfa-module-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.bfa-module-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-slate-100);
}

.bfa-module-card__num {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-ouro-dark);
  background-color: var(--color-ouro-light);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
}

.bfa-module-card__header h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-azul-dark);
  margin: 0;
  flex: 1;
}

.bfa-module-card__lessons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bfa-module-card__lesson-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.bfa-module-card__lesson-item:hover {
  border-color: var(--color-azul);
  background-color: var(--color-azul-light);
  transform: translateX(4px);
}

.bfa-module-card__lesson-item.completed {
  background-color: var(--color-verde-light);
  border-color: rgba(27, 107, 58, 0.3);
}

.bfa-lesson-status {
  font-size: 1.1rem;
}

.bfa-lesson-num {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.bfa-lesson-title {
  flex: 1;
}

.bfa-lesson-arrow {
  color: var(--text-muted);
  transition: transform 0.2s ease;
}

.bfa-module-card__lesson-item:hover .bfa-lesson-arrow {
  color: var(--color-azul);
  transform: translateX(4px);
}

/* Inline Edit Pencil Overlay & Modal */
.bfa-editable-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.bfa-editable-wrapper:hover {
  outline: 2px dashed var(--color-ouro);
  border-radius: 6px;
  background-color: rgba(200, 150, 62, 0.05);
}

.bfa-edit-pencil-btn {
  position: absolute;
  top: -12px;
  right: 10px;
  background: var(--color-ouro);
  color: #FFFFFF;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: transform 0.2s ease;
}

.bfa-edit-pencil-btn:hover {
  transform: scale(1.15);
  background: var(--color-ouro-dark);
}

.bfa-inline-editor-modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.bfa-inline-editor-card {
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  max-width: 750px;
  width: 100%;
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
}
"""

if ".bfa-overview__hero" not in css_content:
    with open(components_css_path, "a", encoding="utf-8") as f:
        f.write(additional_css)
    print("Appended DisciplinaOverview and Inline Edit CSS to components.css")

# 2. Update AdminContext.jsx to enable inlineEditActive by default when authenticated
admin_ctx_path = os.path.join(base_dir, "context", "AdminContext.jsx")
admin_ctx_code = """const INITIAL_ADMIN_USERS = [
  { id: 'user_1', username: 'admin', password: 'bfa@2024', name: 'Administrador BFA', role: 'admin' },
  { id: 'user_2', username: 'lucas', password: 'dragaodoomar', name: 'Lucas', role: 'editor' },
  { id: 'user_3', username: 'nif', password: 'investir123', name: 'Nif', role: 'editor' },
  { id: 'user_4', username: 'professor', password: 'brhsic2024', name: 'Professor', role: 'instructor' }
];

const LOCAL_STORAGE_USER_KEY = 'bfa_admin_user';
const LOCAL_STORAGE_CMS_KEY = 'bfa_cms_overrides';
const LOCAL_STORAGE_EDIT_MODE_KEY = 'bfa_inline_edit_mode';

const AdminContext = React.createContext(null);

function AdminProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [inlineEditActive, setInlineEditActive] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_EDIT_MODE_KEY);
      if (saved !== null) return JSON.parse(saved);
      return true; // ON by default for logged in admin
    } catch (e) {
      return true;
    }
  });

  const [cmsData, setCmsData] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CMS_KEY);
      return saved ? JSON.parse(saved) : { modules: [], lessons: {}, news: [], quizzes: [] };
    } catch (e) {
      return { modules: [], lessons: {}, news: [], quizzes: [] };
    }
  });

  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [currentUser]);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CMS_KEY, JSON.stringify(cmsData));
  }, [cmsData]);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_EDIT_MODE_KEY, JSON.stringify(inlineEditActive));
  }, [inlineEditActive]);

  const login = (username, password) => {
    const user = INITIAL_ADMIN_USERS.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );

    if (user) {
      const session = { id: user.id, username: user.username, name: user.name, role: user.role };
      setCurrentUser(session);
      setInlineEditActive(true); // Always enable edit mode on login
      return { success: true, user: session };
    }
    return { success: false, error: 'Usuário ou senha incorretos' };
  };

  const logout = () => {
    setCurrentUser(null);
    setInlineEditActive(false);
  };

  const toggleInlineEdit = () => setInlineEditActive(prev => !prev);

  const updateLessonContent = (lessonId, newContent) => {
    setCmsData(prev => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        [lessonId]: {
          ...(prev.lessons[lessonId] || {}),
          content: newContent
        }
      }
    }));
  };

  const updateLesson = (lessonId, updatedData) => {
    setCmsData(prev => ({
      ...prev,
      lessons: { ...prev.lessons, [lessonId]: { ...(prev.lessons[lessonId] || {}), ...updatedData } }
    }));
  };

  const addNews = (newsItem) => {
    const item = { id: `news_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...newsItem };
    setCmsData(prev => ({ ...prev, news: [item, ...(prev.news || [])] }));
  };

  const value = {
    adminUser: currentUser,
    isAuthenticated: !!currentUser,
    inlineEditActive: !!currentUser && inlineEditActive,
    toggleInlineEdit,
    login,
    logout,
    cmsData,
    updateLessonContent,
    updateLesson,
    addNews
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
"""

with open(admin_ctx_path, "w", encoding="utf-8") as f:
    f.write(admin_ctx_code)
print("Updated AdminContext.jsx with default-active inline edit mode")

# 3. Create EditableBlock.jsx component
editable_block_code = """const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function EditableBlock({ lessonId, initialContent, children, onSave }) {
  const { isAuthenticated, inlineEditActive, updateLessonContent } = useContext(AdminContext || createContext({}));
  const [isEditing, setIsEditing] = useState(false);
  const [editorText, setEditorText] = useState(initialContent || '');

  useEffect(() => {
    setEditorText(initialContent || '');
  }, [initialContent]);

  const handleSave = () => {
    if (onSave) {
      onSave(editorText);
    } else if (lessonId && updateLessonContent) {
      updateLessonContent(lessonId, editorText);
    }
    setIsEditing(false);
  };

  const canEdit = isAuthenticated && inlineEditActive;

  return (
    <div className={`bfa-editable-wrapper ${canEdit ? 'can-edit' : ''}`}>
      {canEdit && (
        <button
          className="bfa-edit-pencil-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          title="Editar Texto / LaTeX (Modo Admin)"
        >
          ✏️
        </button>
      )}

      {children}

      {isEditing && (
        <div className="bfa-inline-editor-modal" onClick={() => setIsEditing(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1rem' }}>
              ✏️ Editor de Texto & LaTeX (Modo Professor Admin)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Edite o texto abaixo (suporta Markdown e fórmulas LaTeX entre <code>$$...$$</code> ou <code>$..$</code>). As alterações serão salvas imediatamente.
            </p>
            <textarea
              rows="12"
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              className="bfa-textarea"
              style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--verde"
                onClick={handleSave}
              >
                Salvar Alterações 💾
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"""

editable_block_path = os.path.join(base_dir, "components", "EditableBlock.jsx")
with open(editable_block_path, "w", encoding="utf-8") as f:
    f.write(editable_block_code)
print("Created EditableBlock.jsx")

# 4. Update LessonContent.jsx to wrap text/markdown in EditableBlock
lesson_content_path = os.path.join(base_dir, "components", "LessonContent.jsx")
lesson_content_code = """const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function LessonContent({ markdownContent, lessonId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && window.renderMathInElement) {
      try {
        window.renderMathInElement(containerRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\\\(", right: "\\\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX rendering warning:", err);
      }
    }
  }, [markdownContent]);

  const renderFormattedMarkdown = (rawText) => {
    if (!rawText) return "";
    let formatted = rawText;

    formatted = formatted.replace(
      /!!!\\s*(\\w+)(?:\\s*"([^"]+)")?\\n([\\s\\S]*?)(?=\\n!!!|\\n#|\\n\\n\\n|$)/g,
      (match, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
        const iconMap = {
          note: "📌",
          warning: "⚠️",
          tip: "💡",
          important: "⚡",
          construcao: "🚧"
        };
        const icon = iconMap[type] || "ℹ️";
        return `<div class="bfa-admonition bfa-admonition--${type}">
          <div class="bfa-admonition__header">
            <span class="bfa-admonition__icon">${icon}</span>
            <span class="bfa-admonition__title">${titleText}</span>
          </div>
          <div class="bfa-admonition__content">${marked.parse(body.trim())}</div>
        </div>`;
      }
    );

    const parsedHtml = marked.parse ? marked.parse(formatted) : formatted;
    return DOMPurify && DOMPurify.sanitize ? DOMPurify.sanitize(parsedHtml) : parsedHtml;
  };

  return (
    <EditableBlock lessonId={lessonId} initialContent={markdownContent}>
      <div 
        ref={containerRef}
        className="bfa-markdown-body"
        dangerouslySetInnerHTML={{ __html: renderFormattedMarkdown(markdownContent) }}
      />
    </EditableBlock>
  );
}
"""

with open(lesson_content_path, "w", encoding="utf-8") as f:
    f.write(lesson_content_code)
print("Updated LessonContent.jsx with EditableBlock integration")

# 5. Update index.html to include EditableBlock.jsx script
index_html_path = os.path.join(r"C:\codigos\bfa-main\plataforma", "index.html")
with open(index_html_path, "r", encoding="utf-8") as f:
    html_str = f.read()

if "EditableBlock.jsx" not in html_str:
    html_str = html_str.replace(
      '<script type="text/babel" src="src/components/LessonContent.jsx"></script>',
      '<script type="text/babel" src="src/components/EditableBlock.jsx"></script>\n  <script type="text/babel" src="src/components/LessonContent.jsx"></script>'
    )
    with open(index_html_path, "w", encoding="utf-8") as f:
        f.write(html_str)
    print("Added EditableBlock.jsx to index.html")

print("All CSS and Inline Edit fixes completed!")
