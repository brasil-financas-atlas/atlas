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
  const [viewMode, setViewMode] = useState('split'); // 'split', 'editor', 'preview'
  const [showOperationsMenu, setShowOperationsMenu] = useState(false);
  const [activeWizard, setActiveWizard] = useState(null); // null, 'imagem', 'admonition', 'tikz'
  const [wizardInputs, setWizardInputs] = useState({});

  const textareaRef = useRef(null);
  const overlayRef = useRef(null);
  const mouseDownTargetRef = useRef(null);

  // Sync currentText ONLY when not actively editing (prevents modal text wipe on re-render)
  useEffect(() => {
    if (!isEditing) {
      setEditorText(currentText);
    }
  }, [currentText, isEditing]);

  const handleOpenEditor = (e) => {
    e.stopPropagation();
    setEditorText(currentText);
    setIsEditing(true);
    setShowOperationsMenu(false);
    setActiveWizard(null);
  };

  const handleCloseEditor = () => {
    if (editorText !== currentText) {
      if (!window.confirm('Você tem alterações não salvas. Deseja realmente fechar o editor?')) {
        return;
      }
    }
    setIsEditing(false);
    setShowOperationsMenu(false);
    setActiveWizard(null);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(id, editorText);
    } else if (id && saveOverride) {
      saveOverride(id, editorText);
    }
    setIsEditing(false);
    setShowOperationsMenu(false);
    setActiveWizard(null);
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar o conteúdo original desta seção?')) {
      if (saveOverride) {
        saveOverride(id, null);
      }
      setIsEditing(false);
      setShowOperationsMenu(false);
      setActiveWizard(null);
    }
  };

  // Safe insertion at current cursor position or end of text
  const insertSnippet = (snippet) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart ?? editorText.length;
      const end = textarea.selectionEnd ?? editorText.length;
      const nextText = editorText.substring(0, start) + snippet + editorText.substring(end);
      setEditorText(nextText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + snippet.length, start + snippet.length);
      }, 50);
    } else {
      setEditorText((prev) => prev + snippet);
    }
  };

  const applyWizardInsertion = () => {
    if (activeWizard === 'imagem') {
      const url = wizardInputs.url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800';
      const alt = wizardInputs.alt || 'Gráfico Ilustrativo';
      insertSnippet(`\n\n![${alt}](${url})\n`);
    } else if (activeWizard === 'admonition') {
      const tipo = wizardInputs.tipo || 'tip';
      const titulo = wizardInputs.titulo || 'Conceito Chave';
      const corpo = wizardInputs.corpo || 'Explicação detalhada do conceito financeiro.';
      insertSnippet(`\n\n!!! ${tipo} "${titulo}"\n${corpo}\n`);
    } else if (activeWizard === 'tikz') {
      const template = wizardInputs.template || 'eixos';
      if (template === 'eixos') {
        insertSnippet(`\n\n\`\`\`tikz\n\\begin{tikzpicture}\n  \\draw[thick, ->] (0,0) -- (5,0) node[right] {Tempo ($t$)};\n  \\draw[thick, ->] (0,0) -- (0,4) node[above] {Montante ($M$)};\n  \\draw[domain=0:4, smooth, variable=\\x, blue, thick] plot ({\\x}, {0.35*exp(0.58*\\x)});\n  \\node[blue, right] at (4, 3.6) {$M = C(1+i)^t$};\n\\end{tikzpicture}\n\`\`\`\n`);
      } else if (template === 'arvore') {
        insertSnippet(`\n\n\`\`\`tikz\n\\begin{tikzpicture}[level 1/.style={sibling distance=3.5cm}, level 2/.style={sibling distance=2cm}]\n  \\node {Decisão de Alocação}\n    child { node {Renda Fixa} child { node {Selic} } child { node {IPCA+} } }\n    child { node {Renda Variável} child { node {Ações} } child { node {FIIs} } };\n\\end{tikzpicture}\n\`\`\`\n`);
      }
    }
    setActiveWizard(null);
    setWizardInputs({});
  };

  // Preview renderer
  const previewHtml = useMemo(() => {
    if (!editorText) return '<p style="color:var(--muted-foreground);font-style:italic;">Nenhum conteúdo inserido.</p>';
    
    let formatted = editorText;

    // 1. Interceptar Mermaid
    const mermaidBlocks = [];
    formatted = formatted.replace(/```mermaid\s*\n([\s\S]*?)```/g, (m, code) => {
      mermaidBlocks.push(code.trim());
      return `\n\n@@BFAMERMAID_${mermaidBlocks.length - 1}@@\n\n`;
    });

    // 1.5 Interceptar TikZ
    const tikzBlocks = [];
    formatted = formatted.replace(/```tikz\s*\n([\s\S]*?)```/g, (m, code) => {
      tikzBlocks.push(code.trim());
      return `\n\n@@BFATIKZ_${tikzBlocks.length - 1}@@\n\n`;
    });

    // 2. Admonitions
    formatted = formatted.replace(
      /!!!\s*(\w+)(?:\s*"([^"]+)")?\n([\s\S]*?)(?=\n!!!|\n\?\?\?|\n#|\n\n\n|$)/g,
      (match, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
        const bodyText = (window.marked && window.marked.parse) ? window.marked.parse(body.trim()) : body.trim();
        return `<div class="bfa-admonition bfa-admonition--${type}" style="margin:1rem 0;padding:1rem;border-left:4px solid var(--primary);background:var(--secondary);border-radius:4px;">
          <strong style="display:block;margin-bottom:0.5rem;color:var(--foreground);">${titleText}</strong>
          <div>${bodyText}</div>
        </div>`;
      }
    );

    // 3. Fórmulas KaTeX
    const formulas = [];
    const guardar = (tex, emDestaque) => {
      formulas.push({ tex, emDestaque });
      return `@@BFAMATH_${formulas.length - 1}@@`;
    };

    formatted = formatted
      .replace(/\$\$([\s\S]*?)\$\$/g, (m, tex) => guardar(tex, true))
      .replace(/\\\[([\s\S]*?)\\\]/g, (m, tex) => guardar(tex, true))
      .replace(/\\\(([\s\S]*?)\\\)/g, (m, tex) => guardar(tex, false))
      .replace(/(?<![\\R])\$(?!\s)((?:[^$\n\\]|\\[\s\S])+?)\$/g, (m, tex) => guardar(tex, false));

    let parsed = (window.marked && window.marked.parse) ? window.marked.parse(formatted) : formatted;

    // Sanitização com DOMPurify
    if (window.DOMPurify && window.DOMPurify.sanitize) {
      parsed = window.DOMPurify.sanitize(parsed, {
        ADD_TAGS: ['details', 'summary', 'svg', 'path', 'line', 'circle', 'polygon', 'polyline', 'g', 'rect', 'text', 'tspan', 'defs', 'script', 'img'],
        ADD_ATTR: ['open', 'viewBox', 'fill', 'stroke', 'stroke-width', 'class', 'style', 'id', 'src', 'alt', 'type']
      });
    }

    // Recolocar KaTeX
    parsed = parsed.replace(/@@BFAMATH_(\d+)@@/g, (marcador, i) => {
      const f = formulas[Number(i)];
      if (!f) return marcador;
      if (window.katex && window.katex.renderToString) {
        try {
          return window.katex.renderToString(f.tex.trim(), { displayMode: f.emDestaque, throwOnError: false });
        } catch (e) {
          return f.tex;
        }
      }
      return f.tex;
    });

    // Recolocar TikZ
    parsed = parsed.replace(/@@BFATIKZ_(\d+)@@/g, (marcador, i) => {
      const code = tikzBlocks[Number(i)];
      if (!code) return marcador;
      return `<div style="padding:1rem;background:var(--secondary);border:1px solid var(--border);border-radius:6px;margin:1rem 0;font-family:monospace;font-size:0.85rem;"><span class="bfa-badge bfa-badge--ouro" style="margin-bottom:0.5rem;display:inline-block;">Diagrama TikZ Compilável</span><pre style="margin:0;white-space:pre-wrap;">${code}</pre></div>`;
    });

    // Envolver imagens
    parsed = parsed.replace(/<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi, (match, pre, src, post) => {
      return `<div style="text-align:center;margin:1.25rem 0;"><img src="${src}" ${pre} ${post} style="max-width:100%;max-height:300px;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.1);" loading="lazy" /></div>`;
    });

    return parsed;
  }, [editorText]);

  const canEdit = isAuthenticated && inlineEditActive;

  // Backdrop click guard: only close when mouse starts AND ends on overlay backdrop
  const handleOverlayMouseDown = (e) => {
    mouseDownTargetRef.current = e.target;
  };

  const handleOverlayMouseUp = (e) => {
    if (mouseDownTargetRef.current === overlayRef.current && e.target === overlayRef.current) {
      handleCloseEditor();
    }
    mouseDownTargetRef.current = null;
  };

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
        <div
          ref={overlayRef}
          className="bfa-inline-editor-modal"
          onMouseDown={handleOverlayMouseDown}
          onMouseUp={handleOverlayMouseUp}
        >
          <div
            className="bfa-inline-editor-card"
            style={{ maxWidth: '1080px', width: '95vw', maxHeight: '94vh', display: 'flex', flexDirection: 'column' }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '0.4rem', borderRadius: '6px' }}>
                  <BfaIcon name="pencil" size={18} color="var(--color-azul)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>
                    Editor de Conteúdo & Fórmulas
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                    ID: {id}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* View Mode Toggle */}
                <div style={{ display: 'flex', background: 'var(--secondary)', borderRadius: '6px', padding: '2px' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('editor')}
                    className="bfa-btn bfa-btn--sm"
                    style={{
                      background: viewMode === 'editor' ? 'var(--card)' : 'transparent',
                      color: viewMode === 'editor' ? 'var(--primary)' : 'var(--muted-foreground)',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.55rem'
                    }}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    className="bfa-btn bfa-btn--sm"
                    style={{
                      background: viewMode === 'split' ? 'var(--card)' : 'transparent',
                      color: viewMode === 'split' ? 'var(--primary)' : 'var(--muted-foreground)',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.55rem'
                    }}
                  >
                    Lado a Lado
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    className="bfa-btn bfa-btn--sm"
                    style={{
                      background: viewMode === 'preview' ? 'var(--card)' : 'transparent',
                      color: viewMode === 'preview' ? 'var(--primary)' : 'var(--muted-foreground)',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.55rem'
                    }}
                  >
                    Prévia
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCloseEditor}
                  className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  title="Fechar Editor"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Action Toolbar: Operações LaTeX, Imagem, Caixa, TikZ */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${showOperationsMenu ? 'bfa-btn--ouro' : 'bfa-btn--secondary-glass'}`}
                onClick={() => {
                  setShowOperationsMenu(!showOperationsMenu);
                  setActiveWizard(null);
                }}
                style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <BfaIcon name="book" size={14} /> Operações & Fórmulas LaTeX
              </button>

              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'imagem' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => {
                  setActiveWizard(activeWizard === 'imagem' ? null : 'imagem');
                  setShowOperationsMenu(false);
                }}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                + Inserir Imagem
              </button>

              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'admonition' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => {
                  setActiveWizard(activeWizard === 'admonition' ? null : 'admonition');
                  setShowOperationsMenu(false);
                }}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                + Caixa Destaque
              </button>

              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'tikz' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => {
                  setActiveWizard(activeWizard === 'tikz' ? null : 'tikz');
                  setShowOperationsMenu(false);
                }}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                + Gráfico TikZ
              </button>
            </div>

            {/* LaTeX Operations Quick Menu (1-Click Insertion) */}
            {showOperationsMenu && (
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '0.85rem', maxHeight: '190px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--foreground)' }}>
                    CLIQUE EM UMA OPERAÇÃO PARA INSERIR NO TEXTO:
                  </span>
                  <button type="button" onClick={() => setShowOperationsMenu(false)} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ padding: '0.1rem 0.35rem', fontSize: '0.75rem' }}>✕ Fechar Menu</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))', gap: '0.4rem' }}>
                  <button type="button" onClick={() => insertSnippet(' \\frac{numerador}{denominador} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Fração:</strong> <code>\frac&#123;a&#125;&#123;b&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' (1 + i)^{t} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Juros / Potência:</strong> <code>(1+i)^&#123;t&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' x^{n} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Expoente:</strong> <code>x^&#123;n&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' x_{i} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Subscrito / Índice:</strong> <code>x_&#123;i&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\sqrt{x} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Raiz Quadrada:</strong> <code>\sqrt&#123;x&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\sqrt[n]{1 + R} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Raiz Enésima:</strong> <code>\sqrt[n]&#123;x&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t} ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Somatório / VPL:</strong> <code>\sum_&#123;t=1&#125;^&#123;n&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\prod_{i=1}^{k} (1 + r_i) ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Produtório:</strong> <code>\prod_&#123;i=1&#125;^&#123;k&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\cdot ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Multiplicação:</strong> <code>\cdot</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\approx ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Aproximação:</strong> <code>\approx</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\sigma ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Volatilidade:</strong> <code>\sigma</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\mu ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Retorno Médio:</strong> <code>\mu</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\Delta ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Variação:</strong> <code>\Delta</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\text{R\\$ } 1.000,00 ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Moeda / Texto:</strong> <code>\text&#123;R\$ &#125;</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\pm ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Mais ou Menos:</strong> <code>\pm</code>
                  </button>
                  <button type="button" onClick={() => insertSnippet(' \\infty ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--card)' }}>
                    <strong>Infinito:</strong> <code>\infty</code>
                  </button>
                </div>
              </div>
            )}

            {/* Media & Structure Wizards Panel */}
            {activeWizard && (
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.75rem', display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {activeWizard === 'imagem' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Inserir Imagem:</span>
                    <input
                      type="text"
                      placeholder="URL da Imagem (https://...)"
                      value={wizardInputs.url || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, url: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem', flex: 1, minWidth: '180px' }}
                    />
                    <input
                      type="text"
                      placeholder="Legenda / Alt text"
                      value={wizardInputs.alt || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, alt: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem', width: '160px' }}
                    />
                  </>
                )}

                {activeWizard === 'admonition' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Caixa Pedagógica:</span>
                    <select
                      value={wizardInputs.tipo || 'tip'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, tipo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem' }}
                    >
                      <option value="tip">Dica (Verde)</option>
                      <option value="warning">Atenção (Amarelo)</option>
                      <option value="danger">Perigo (Vermelho)</option>
                      <option value="info">Informação (Azul)</option>
                      <option value="math">Fórmula Matemática</option>
                      <option value="example">Exemplo Prático</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Título da Caixa"
                      value={wizardInputs.titulo || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, titulo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem', width: '160px' }}
                    />
                  </>
                )}

                {activeWizard === 'tikz' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Modelo de Gráfico TikZ:</span>
                    <select
                      value={wizardInputs.template || 'eixos'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, template: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem' }}
                    >
                      <option value="eixos">Eixos Cartesianos & Curva Exponencial de Juros</option>
                      <option value="arvore">Árvore de Decisão de Investimentos</option>
                    </select>
                  </>
                )}

                <button
                  type="button"
                  className="bfa-btn bfa-btn--verde bfa-btn--sm"
                  onClick={applyWizardInsertion}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', fontWeight: 700 }}
                >
                  Inserir no Texto
                </button>
                <button
                  type="button"
                  className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                  onClick={() => setActiveWizard(null)}
                  style={{ fontSize: '0.75rem' }}
                >
                  Cancelar
                </button>
              </div>
            )}

            {/* Main Editor Body: Split View or Tabs */}
            <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: viewMode === 'split' ? '1fr 1fr' : '1fr', gap: '1rem', marginBottom: '0.85rem' }}>
              {/* Editor Side */}
              {(viewMode === 'editor' || viewMode === 'split') && (
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)' }}>
                      CÓDIGO FONTE (MARKDOWN + LATEX + TIKZ):
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
                      {editorText.length} caracteres
                    </span>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    className="bfa-textarea"
                    style={{
                      flex: 1,
                      minHeight: '260px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      resize: 'none',
                      background: 'var(--card)',
                      color: 'var(--foreground)'
                    }}
                    autoFocus
                  ></textarea>
                </div>
              )}

              {/* Preview Side */}
              {(viewMode === 'preview' || viewMode === 'split') && (
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-azul)' }}>
                      PRÉ-VISUALIZAÇÃO EM TEMPO REAL:
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
                      Renderização Final
                    </span>
                  </div>
                  <div
                    className="bfa-markdown-body"
                    style={{
                      flex: 1,
                      minHeight: '260px',
                      overflowY: 'auto',
                      padding: '1rem',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              )}
            </div>

            {/* Bottom Footer Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
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
                  onClick={handleCloseEditor}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bfa-btn bfa-btn--verde"
                  onClick={handleSave}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
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

window.EditableBlock = EditableBlock;
