const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function EditableBlock({ id, content, initialContent, children, onSave, as: Component = 'div', className = '', style }) {
  const { isAuthenticated, inlineEditActive, cmsData, saveOverride } = useContext(AdminContext || createContext({}));
  
  const defaultText = useMemo(() => {
    if (typeof children === 'string' || typeof children === 'number') {
      return String(children);
    }
    return content || initialContent || '';
  }, [children, content, initialContent]);

  // Resolve existing override content if present
  const overrideContent = cmsData && cmsData.overrides ? cmsData.overrides[id] : null;
  const hasOverride = overrideContent !== null && overrideContent !== undefined;
  const currentText = hasOverride ? overrideContent : defaultText;

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
        {children ? (
          typeof children === 'string' || typeof children === 'number' ? (
            <Component className={className} style={style}>{children}</Component>
          ) : (
            children
          )
        ) : (
          <Component className={className} style={style}>{currentText}</Component>
        )}
      </div>

      {canEdit && (
        <button
          type="button"
          className="bfa-edit-pencil-btn"
          onClick={handleOpenEditor}
          title="Editar este trecho / fórmula (Modo Admin)"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <BfaIcon name="pencil" size={13} color="var(--color-azul-dark)" />
        </button>
      )}

      {isEditing && (
        <div className="bfa-inline-editor-modal" onClick={() => setIsEditing(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BfaIcon name="pencil" size={18} color="var(--color-azul)" /> Editar Trecho de Texto / Fórmula
              </h3>
              <span className="bfa-badge bfa-badge--ouro">ID: {id}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Modifique o trecho abaixo. Suporta texto simples, Markdown ou fórmulas LaTeX (entre <code>$$...$$</code> ou <code>$...$</code>).
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => setEditorText((prev) => prev + '\n\n$$ f(x) = a \\cdot x^2 + b \\cdot x + c $$\n')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Fórmula LaTeX
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => setEditorText((prev) => prev + '\n\n```tikz\n\\begin{tikzpicture}\n  \\draw[thick, ->] (0,0) -- (4,0) node[right] {Tempo};\n  \\draw[thick, ->] (0,0) -- (0,3) node[above] {Montante};\n  \\draw[domain=0:3.5, smooth, variable=\\x, blue, thick] plot ({\\x}, {0.4*exp(0.6*\\x)});\n\\end{tikzpicture}\n```\n')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Diagrama TikZ
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => setEditorText((prev) => prev + '\n\n![Legenda ilustrativa](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop)\n')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Inserir Imagem
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => setEditorText((prev) => prev + '\n\n!!! tip "Conceito Chave"\nExplicação aprofundada do tópico para os estudantes.\n')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Caixa Dica
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => setEditorText((prev) => prev + '\n\n!!! warning "Atenção Prática"\nPonto de cautela e armadilhas comuns no mercado financeiro.\n')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Caixa Atenção
              </button>
            </div>

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
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <BfaIcon name="refresh" size={14} /> Restaurar Padrão
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
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Salvar Alterações <BfaIcon name="save" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
