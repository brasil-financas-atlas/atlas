import os

base_dir = r"C:\codigos\bfa-main\plataforma\src"

# 1. Update EditableBlock.jsx
editable_block_code = """const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function EditableBlock({ id, content, initialContent, children, onSave, as: Component = 'div', className = '', style }) {
  const { isAuthenticated, inlineEditActive, cmsData, saveOverride } = useContext(AdminContext || createContext({}));
  
  // Resolve existing override content if present
  const overrideContent = cmsData && cmsData.overrides ? cmsData.overrides[id] : null;
  const currentText = overrideContent !== null && overrideContent !== undefined 
    ? overrideContent 
    : (content || initialContent || '');

  const [isEditing, setIsEditing] = useState(false);
  const [editorText, setEditorText] = useState(currentText);

  useEffect(() => {
    setEditorText(currentText);
  }, [currentText]);

  const handleOpenEditor = (e) => {
    e.stopPropagation();
    // Pre-fill editorText with current exact text
    setEditorText(currentText);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(id, editorText);
    } else if (id && saveOverride) {
      saveOverride(id, editorText);
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    if (saveOverride) {
      saveOverride(id, null); // Clear override
    }
    setIsEditing(false);
  };

  const canEdit = isAuthenticated && inlineEditActive;

  return (
    <div className={`bfa-editable-wrapper ${canEdit ? 'can-edit' : ''}`} style={style}>
      <div className="bfa-editable-content" style={{ flex: 1, minWidth: 0 }}>
        {children ? children : <Component className={className}>{currentText}</Component>}
      </div>

      {canEdit && (
        <button
          type="button"
          className="bfa-edit-pencil-btn"
          onClick={handleOpenEditor}
          title="Editar este trecho / fórmula (Modo Admin)"
        >
          ✏️
        </button>
      )}

      {isEditing && (
        <div className="bfa-inline-editor-modal" onClick={() => setIsEditing(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0 }}>
                ✏️ Editar Trecho de Texto / Fórmula
              </h3>
              <span className="bfa-badge bfa-badge--ouro">ID: {id}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Modifique o trecho abaixo. Suporta texto simples, Markdown ou fórmulas LaTeX (entre <code>$$...$$</code> ou <code>$...$</code>).
            </p>

            <textarea
              rows="8"
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              className="bfa-textarea"
              style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}
              autoFocus
            ></textarea>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={handleReset}
                title="Restaurar texto original"
              >
                🔄 Restaurar Padrão
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
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
        </div>
      )}
    </div>
  );
}
"""

editable_block_path = os.path.join(base_dir, "components", "EditableBlock.jsx")
with open(editable_block_path, "w", encoding="utf-8") as f:
    f.write(editable_block_code)
print("Updated EditableBlock.jsx with pre-filled content and reset option")

# 2. Update LessonContent.jsx to split raw markdown into granular blocks with EditableBlock per section
lesson_content_code = """const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function LessonContent({ markdownContent, lessonId = 'lc' }) {
  const containerRef = useRef(null);
  const { cmsData, saveOverride } = useContext(AdminContext || createContext({}));

  useEffect(() => {
    if (containerRef.current && window.renderMathInElement) {
      try {
        window.renderMathInElement(containerRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX rendering warning:", err);
      }
    }
  }, [markdownContent, cmsData]);

  // Parse markdown into granular editable blocks
  const blocks = useMemo(() => {
    if (!markdownContent) return [];
    const text = markdownContent.replace(/\\r\\n/g, '\\n');
    const rawBlocks = text.split(/\\n\\s*\\n/);
    const result = [];

    rawBlocks.forEach((b, idx) => {
      const trimmed = b.trim();
      if (!trimmed) return;

      const blockId = `${lessonId}-b${idx}`;
      
      // Check if this block has an individual override
      const overrideVal = cmsData && cmsData.overrides ? cmsData.overrides[blockId] : null;
      const contentToUse = overrideVal !== null && overrideVal !== undefined ? overrideVal : trimmed;

      if ((contentToUse.startsWith('$$') && contentToUse.endsWith('$$')) || (contentToUse.startsWith('\\[') && contentToUse.endsWith('\\]'))) {
        result.push({ id: blockId, type: 'math', raw: contentToUse });
      } else if (contentToUse.startsWith('#')) {
        result.push({ id: blockId, type: 'heading', raw: contentToUse });
      } else {
        result.push({ id: blockId, type: 'text', raw: contentToUse });
      }
    });

    return result;
  }, [markdownContent, lessonId, cmsData]);

  const renderSingleBlock = (rawText) => {
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
    <div ref={containerRef} className="bfa-markdown-body">
      {blocks.map((block) => (
        <EditableBlock
          key={block.id}
          id={block.id}
          content={block.raw}
          style={{ marginBottom: '1.25rem' }}
        >
          <div dangerouslySetInnerHTML={{ __html: renderSingleBlock(block.raw) }} />
        </EditableBlock>
      ))}
    </div>
  );
}
"""

lesson_content_path = os.path.join(base_dir, "components", "LessonContent.jsx")
with open(lesson_content_path, "w", encoding="utf-8") as f:
    f.write(lesson_content_code)
print("Updated LessonContent.jsx with granular block splitting and pre-filled text")

# 3. Update components.css to ensure pencil icon ALWAYS sits side-by-side to the right
components_css_path = os.path.join(base_dir, "styles", "components.css")
with open(components_css_path, "r", encoding="utf-8") as f:
    css_text = f.read()

pencil_side_css = """
/* Guarantee Edit Pencil Icon is ALWAYS Side-by-Side */
.bfa-editable-wrapper {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 0.75rem !important;
  width: 100% !important;
  position: relative !important;
}

.bfa-editable-content {
  flex: 1 !important;
  min-width: 0 !important;
}

.bfa-edit-pencil-btn {
  position: relative !important;
  top: 0 !important;
  right: 0 !important;
  flex-shrink: 0 !important;
  margin-left: 0.5rem !important;
  background: var(--color-ouro) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 50% !important;
  width: 32px !important;
  height: 32px !important;
  font-size: 0.95rem !important;
  cursor: pointer !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 50 !important;
  transition: transform 0.2s ease !important;
}

.bfa-edit-pencil-btn:hover {
  transform: scale(1.2) !important;
  background: var(--color-ouro-dark) !important;
}
"""

if "display: flex !important;" not in css_text:
    with open(components_css_path, "a", encoding="utf-8") as f:
        f.write(pencil_side_css)
    print("Appended side-by-side pencil icon CSS to components.css")

print("All edit icon & block splitting updates complete!")
