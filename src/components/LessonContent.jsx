const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function splitMarkdownIntoBlocks(markdown) {
  if (!markdown) return [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let currentLines = [];
  let inFence = false;
  let inAdmonition = false;
  let inMath = false;

  const flush = () => {
    if (currentLines.length > 0) {
      const text = currentLines.join('\n').trim();
      if (text) blocks.push(text);
      currentLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code Fence (```)
    if (trimmed.startsWith('```')) {
      if (!inFence) {
        if (!inAdmonition) flush();
        inFence = true;
        currentLines.push(line);
      } else {
        inFence = false;
        currentLines.push(line);
        if (!inAdmonition) flush();
      }
      continue;
    }
    if (inFence) {
      currentLines.push(line);
      continue;
    }

    // 2. Display Math ($$ or \[)
    if (trimmed.startsWith('$$') || trimmed.startsWith('\\[')) {
      if (!inMath) {
        const isSingleLine = (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 2) ||
                             (trimmed.startsWith('\\[') && trimmed.endsWith('\\]') && trimmed.length > 2);
        if (isSingleLine) {
          if (!inAdmonition) flush();
          currentLines.push(line);
          if (!inAdmonition) flush();
          continue;
        }
        if (!inAdmonition) flush();
        inMath = true;
        currentLines.push(line);
        continue;
      } else {
        inMath = false;
        currentLines.push(line);
        if (!inAdmonition) flush();
        continue;
      }
    }
    if (inMath) {
      currentLines.push(line);
      if (trimmed.endsWith('$$') || trimmed.endsWith('\\]')) {
        inMath = false;
        if (!inAdmonition) flush();
      }
      continue;
    }

    // 3. Start of Admonition or Collapsible (!!! or ???)
    if (/^(!{3}|\?{3}\+?)\s+\w+/.test(trimmed)) {
      flush();
      inAdmonition = true;
      currentLines.push(line);
      continue;
    }

    // 4. Inside Admonition / Collapsible
    if (inAdmonition) {
      const isIndented = line.startsWith('  ') || line.startsWith('\t');
      if (isIndented) {
        currentLines.push(line);
        continue;
      } else if (trimmed === '') {
        // Blank line: check if upcoming non-blank line is indented
        let hasMoreIndented = false;
        for (let j = i + 1; j < lines.length; j++) {
          const nextTrimmed = lines[j].trim();
          if (nextTrimmed !== '') {
            if (lines[j].startsWith('  ') || lines[j].startsWith('\t')) {
              hasMoreIndented = true;
            }
            break;
          }
        }
        if (hasMoreIndented) {
          currentLines.push(line);
          continue;
        } else {
          // Admonition finished
          flush();
          inAdmonition = false;
          continue;
        }
      } else {
        // Non-indented line ends admonition
        flush();
        inAdmonition = false;
      }
    }

    // 5. Blank line between regular paragraphs
    if (trimmed === '') {
      flush();
      continue;
    }

    // 6. Headings (#) or thematic breaks (---)
    if (trimmed.startsWith('#') || trimmed === '---' || trimmed === '***') {
      flush();
      currentLines.push(line);
      flush();
      continue;
    }

    currentLines.push(line);
  }

  flush();
  return blocks;
}

function LessonContent({ markdownContent, lessonId = 'lc' }) {
  const containerRef = useRef(null);
  const { cmsData } = useContext(AdminContext || createContext({}));

  const renderizarTex = (tex, emDestaque) => {
    if (!(window.katex && window.katex.renderToString)) return tex;
    try {
      return window.katex.renderToString(tex.trim(), {
        displayMode: emDestaque,
        throwOnError: false,
        strict: false
      });
    } catch (err) {
      console.warn('KaTeX não conseguiu renderizar:', tex, err);
      return tex;
    }
  };

  // Re-executa o Mermaid sempre que os blocos renderizarem
  useEffect(() => {
    if (!window.mermaid || !containerRef.current) return;

    try {
      const theme = document.documentElement.getAttribute('data-theme') || 'brasil-atlas';
      const isDark = theme.includes('dark');
      
      window.mermaid.initialize({
        startOnLoad: false,
        suppressErrorRendering: true,
        theme: isDark ? 'dark' : 'neutral',
        securityLevel: 'loose',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        themeVariables: isDark ? {
          darkMode: true,
          background: '#0F172A',
          primaryColor: '#1E293B',
          primaryBorderColor: '#334155',
          primaryTextColor: '#F8FAFC',
          lineColor: '#38BDF8',
          secondaryColor: '#059669',
          tertiaryColor: '#1E293B'
        } : {
          primaryColor: '#F8FAFC',
          primaryBorderColor: '#E2E8F0',
          primaryTextColor: '#0F172A',
          lineColor: '#0284C7',
          secondaryColor: '#E6F4EA',
          tertiaryColor: '#F1F5F9'
        }
      });

      const mermaidDivs = containerRef.current.querySelectorAll('.mermaid-target');
      mermaidDivs.forEach((mDiv, idx) => {
        if (!mDiv.getAttribute('data-processed')) {
          const rawCode = mDiv.getAttribute('data-mermaid-code');
          if (rawCode) {
            const uniqueId = `mermaid-render-${lessonId}-${idx}-${Math.random().toString(36).substring(2, 7)}`;
            window.mermaid.render(uniqueId, rawCode).then(({ svg }) => {
              mDiv.innerHTML = svg;
              mDiv.setAttribute('data-processed', 'true');
            }).catch(e => {
              console.warn('Mermaid render error (tratado silenciosamente):', e);
              // Remover qualquer elemento de erro gerado pelo Mermaid no DOM
              const errEl = document.getElementById(uniqueId) || document.querySelector(`[id^="d${uniqueId}"]`);
              if (errEl && errEl.parentNode) errEl.parentNode.removeChild(errEl);
              mDiv.innerHTML = `<div class="bfa-diagram-box" style="padding:1rem;background:var(--secondary);border:1px solid var(--border-color);border-radius:8px;font-size:0.85rem;"><span class="bfa-badge bfa-badge--azul" style="margin-bottom:0.5rem;display:inline-block;">Diagrama de Fluxo</span><pre style="margin:0;white-space:pre-wrap;font-family:var(--font-mono);font-size:0.8rem;color:var(--text-primary);">${rawCode}</pre></div>`;
              mDiv.setAttribute('data-processed', 'true');
            });
          }
        }
      });
    } catch (err) {
      console.warn('Erro ao inicializar Mermaid:', err);
    }
  });

  // Parse markdown into atomic editable blocks preserving collapsibles, callouts and code blocks
  const blocks = useMemo(() => {
    if (!markdownContent) return [];
    const rawBlocks = splitMarkdownIntoBlocks(markdownContent);
    const result = [];

    rawBlocks.forEach((trimmed, idx) => {
      if (!trimmed) return;

      const blockId = `${lessonId}-b${idx}`;
      
      const overrideVal = cmsData && cmsData.overrides ? cmsData.overrides[blockId] : null;
      const contentToUse = overrideVal !== null && overrideVal !== undefined ? overrideVal : trimmed;

      if ((contentToUse.startsWith('$$') && contentToUse.endsWith('$$')) || (contentToUse.startsWith('\\[') && contentToUse.endsWith('\\]'))) {
        result.push({ id: blockId, type: 'math', raw: contentToUse });
      } else if (contentToUse.startsWith('#')) {
        result.push({ id: blockId, type: 'heading', raw: contentToUse });
      } else if (contentToUse.startsWith('???') || contentToUse.startsWith('!!!')) {
        result.push({ id: blockId, type: 'admonition', raw: contentToUse });
      } else {
        result.push({ id: blockId, type: 'text', raw: contentToUse });
      }
    });

    return result;
  }, [markdownContent, lessonId, cmsData]);

  const renderSingleBlock = (rawText) => {
    if (!rawText) return "";
    let formatted = rawText;

    // 1. Interceptar blocos ```mermaid ... ```
    const mermaidBlocks = [];
    formatted = formatted.replace(/```mermaid\s*\n([\s\S]*?)```/g, (m, code) => {
      mermaidBlocks.push(code.trim());
      return `\n\n@@BFAMERMAID_${mermaidBlocks.length - 1}@@\n\n`;
    });

    // 1.5 Interceptar blocos ```tikz ... ```
    const tikzBlocks = [];
    formatted = formatted.replace(/```tikz\s*\n([\s\S]*?)```/g, (m, code) => {
      tikzBlocks.push(code.trim());
      return `\n\n@@BFATIKZ_${tikzBlocks.length - 1}@@\n\n`;
    });

    // 2. Salvar fórmulas KaTeX antes de parsear markdown
    const formulas = [];
    const guardar = (tex, emDestaque) => {
      formulas.push({ tex: tex.trim(), emDestaque });
      return `@@BFAMATH_${formulas.length - 1}@@`;
    };

    // 2.1 Display Math: $$ ... $$ e \[ ... \]
    formatted = formatted.replace(/\$\$([\s\S]*?)\$\$/g, (m, tex) => guardar(tex, true));
    formatted = formatted.replace(/\\\[([\s\S]*?)\\\]/g, (m, tex) => guardar(tex, true));

    // 2.2 Inline Math: \( ... \)
    formatted = formatted.replace(/\\\(([\s\S]*?)\\\)/g, (m, tex) => guardar(tex, false));

    // 2.3 Inline Math: $ ... $ (ignora moeda brasileira R$ 100 ou R$100)
    formatted = formatted.replace(/(?<![\\R\w])\$(?!\$)((?:[^$\\]|\\.)+?)(?<!\\)\$/g, (m, tex) => {
      const trimmed = tex.trim();
      if (!trimmed) return m;
      return guardar(trimmed, false);
    });

    // 2.4 Captura comandos LaTeX soltos escritos sem delimitadores $ (ex: \frac{a}{b}, \sqrt{x})
    formatted = formatted.replace(/(?<!@@BFAMATH_\d+@@)(?:\\frac\{[^{}]*\}\{[^{}]*\}|\\sqrt(?:\[[^{}]*\])?\{[^{}]*\})/g, (m) => {
      return guardar(m, false);
    });

    const iconSvgMap = {
      note: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14l-1.5-6h-11L5 17z"/><path d="M9 11V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7"/></svg>`,
      info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
      warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      danger: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      tip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
      important: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      math: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M4 4h16l-8 8 8 8H4"/></svg>`,
      solution: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      example: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      pbl: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      abstract: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      construcao: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
    };
    const defaultIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

    // 3. Render Admonitions (!!!)
    formatted = formatted.replace(
      /!!!\s*(\w+)(?:\s*"([^"]+)")?\n([\s\S]*?)(?=\n!!!|\n\?\?\?|\n#|$)/g,
      (match, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
        const iconSvg = iconSvgMap[type] || defaultIcon;
        const cleanBody = body
          .split('\n')
          .map(line => line.replace(/^( {1,4}|\t)/, ''))
          .join('\n')
          .trim();
        const bodyText = (window.marked && window.marked.parse) ? window.marked.parse(cleanBody) : cleanBody;

        return `<div class="bfa-admonition bfa-admonition--${type}">
          <div class="bfa-admonition__header">
            <span class="bfa-admonition__icon">${iconSvg}</span>
            <span class="bfa-admonition__title">${titleText}</span>
          </div>
          <div class="bfa-admonition__content">${bodyText}</div>
        </div>`;
      }
    );

    // 4. Render Collapsibles (??? e ???+)
    formatted = formatted.replace(
      /\?\?\?(\+)?\s*(\w+)(?:\s*"([^"]+)")?\n([\s\S]*?)(?=\n\?\?\?|\n!!!|\n#|$)/g,
      (match, isOpen, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
        const iconSvg = iconSvgMap[type] || defaultIcon;
        const cleanBody = body
          .split('\n')
          .map(line => line.replace(/^( {1,4}|\t)/, ''))
          .join('\n')
          .trim();
        const bodyText = (window.marked && window.marked.parse) ? window.marked.parse(cleanBody) : cleanBody;
        const openAttr = isOpen ? 'open' : '';

        return `<details class="bfa-collapsible bfa-collapsible--${type}" ${openAttr}>
          <summary class="bfa-collapsible__summary">
            <span class="bfa-collapsible__icon">${iconSvg}</span>
            <span class="bfa-collapsible__title">${titleText}</span>
            <span class="bfa-collapsible__chevron">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </summary>
          <div class="bfa-collapsible__content">${bodyText}</div>
        </details>`;
      }
    );

    let parsedHtml = (window.marked && window.marked.parse) ? window.marked.parse(formatted) : formatted;

    // Normalizar links relativos .md para rotas SPA hash
    parsedHtml = parsedHtml.replace(/href="([^"]+?\.md)"/g, (match, url) => {
      let cleanUrl = url.replace(/^\.\.\//, '').replace(/^matematica-aplicada-a-financas\//, 'matematica/');
      if (cleanUrl.endsWith('/index.md')) {
        cleanUrl = cleanUrl.replace('/index.md', '');
      } else if (cleanUrl.endsWith('.md')) {
        cleanUrl = cleanUrl.replace('.md', '');
      }
      return `href="#/${cleanUrl}"`;
    });

    // Converter URLs do YouTube em iframes responsivos
    parsedHtml = parsedHtml.replace(/(?:<p>)?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[^\s<]*)(?:<\/p>)?/g, (match, ytId) => {
      return `<div class="bfa-video-responsive" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin:1.5rem 0;background:#000;"><iframe src="https://www.youtube.com/embed/${ytId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    });

    // Sanitização com DOMPurify
    if (window.DOMPurify && window.DOMPurify.sanitize) {
      parsedHtml = window.DOMPurify.sanitize(parsedHtml, {
        ADD_TAGS: ['details', 'summary', 'svg', 'path', 'line', 'circle', 'polygon', 'polyline', 'g', 'rect', 'text', 'tspan', 'defs', 'marker', 'use', 'script', 'img', 'figure', 'figcaption', 'iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
        ADD_ATTR: ['open', 'target', 'viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'data-mermaid-code', 'data-processed', 'class', 'style', 'id', 'x', 'y', 'dx', 'dy', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'width', 'height', 'text-anchor', 'transform', 'marker-end', 'marker-start', 'type', 'src', 'alt', 'loading', 'allow', 'allowfullscreen', 'frameborder']
      });
    }

    // Recolocar KaTeX
    parsedHtml = parsedHtml.replace(/@@BFAMATH_(\d+)@@/g, (marcador, i) => {
      const f = formulas[Number(i)];
      if (!f) return marcador;
      return renderizarTex(f.tex, f.emDestaque);
    });

    // Limpar wrappers de parágrafo ao redor de diagramas Mermaid e recolocar
    parsedHtml = parsedHtml.replace(/<p>\s*@@BFAMERMAID_(\d+)@@\s*<\/p>/g, '@@BFAMERMAID_$1@@');
    parsedHtml = parsedHtml.replace(/@@BFAMERMAID_(\d+)@@/g, (marcador, i) => {
      const code = mermaidBlocks[Number(i)];
      if (!code) return marcador;
      const encoded = code.replace(/"/g, '&quot;');
      return `<div class="mermaid-wrapper"><div class="mermaid-target" data-mermaid-code="${encoded}"></div></div>`;
    });

    // Limpar wrappers de parágrafo ao redor de TikZ e recolocar
    parsedHtml = parsedHtml.replace(/<p>\s*@@BFATIKZ_(\d+)@@\s*<\/p>/g, '@@BFATIKZ_$1@@');
    parsedHtml = parsedHtml.replace(/@@BFATIKZ_(\d+)@@/g, (marcador, i) => {
      const code = tikzBlocks[Number(i)];
      if (!code) return marcador;
      return `<div class="bfa-tikz-wrapper" style="margin: 1.5rem 0; text-align: center; overflow-x: auto; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem;"><script type="text/tikz">${code}</script></div>`;
    });

    // Envolver tabelas com wrapper executivo centralizado e responsivo
    parsedHtml = parsedHtml.replace(/<table(\s*[^>]*)>([\s\S]*?)<\/table>/gi, (match, attrs, content) => {
      return `<div class="bfa-table-wrapper"><table${attrs}>${content}</table></div>`;
    });

    // Otimizar e envolver imagens com container responsivo
    parsedHtml = parsedHtml.replace(/<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi, (match, pre, src, post) => {
      return `<div class="bfa-image-container" style="text-align: center; margin: 1.5rem 0;"><img class="bfa-lesson-img" src="${src}" ${pre} ${post} style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);" loading="lazy" /></div>`;
    });

    return parsedHtml;
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

window.LessonContent = LessonContent;
