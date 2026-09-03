const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

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
              console.warn('Mermaid render error:', e);
              mDiv.innerHTML = `<pre style="font-size:0.8rem;text-align:left;">${rawCode}</pre>`;
            });
          }
        }
      });
    } catch (err) {
      console.warn('Erro ao inicializar Mermaid:', err);
    }
  });

  // Parse markdown into granular editable blocks using double newlines
  const blocks = useMemo(() => {
    if (!markdownContent) return [];
    const text = markdownContent.replace(/\r\n/g, '\n');
    const rawBlocks = text.split(/\n\s*\n/);
    const result = [];

    rawBlocks.forEach((b, idx) => {
      const trimmed = b.trim();
      if (!trimmed) return;

      const blockId = `${lessonId}-b${idx}`;
      
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

    // 1. Interceptar blocos ```mermaid ... ```
    const mermaidBlocks = [];
    formatted = formatted.replace(/```mermaid\s*\n([\s\S]*?)```/g, (m, code) => {
      mermaidBlocks.push(code.trim());
      return `\n\n@@BFAMERMAID_${mermaidBlocks.length - 1}@@\n\n`;
    });

    // 2. Render Admonitions (!!!)
    formatted = formatted.replace(
      /!!!\s*(\w+)(?:\s*"([^"]+)")?\n([\s\S]*?)(?=\n!!!|\n\?\?\?|\n#|\n\n\n|$)/g,
      (match, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
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
          construcao: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
        };
        const iconSvg = iconSvgMap[type] || `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        const bodyText = (window.marked && window.marked.parse) ? window.marked.parse(body.trim()) : body.trim();

        return `<div class="bfa-admonition bfa-admonition--${type}">
          <div class="bfa-admonition__header">
            <span class="bfa-admonition__icon">${iconSvg}</span>
            <span class="bfa-admonition__title">${titleText}</span>
          </div>
          <div class="bfa-admonition__content">${bodyText}</div>
        </div>`;
      }
    );

    // 3. Render Collapsibles (??? e ???+)
    formatted = formatted.replace(
      /\?\?\?(\+)?\s*(\w+)(?:\s*"([^"]+)")?\n([\s\S]*?)(?=\n\?\?\?|\n!!!|\n#|\n\n\n|$)/g,
      (match, isOpen, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
        const iconSvgMap = {
          math: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16l-8 8 8 8H4"/></svg>`,
          note: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14l-1.5-6h-11L5 17z"/><path d="M9 11V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7"/></svg>`,
          info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
          warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
          danger: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
          tip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
          solution: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
          pbl: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
          example: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
        };
        const iconSvg = iconSvgMap[type] || `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        const bodyText = (window.marked && window.marked.parse) ? window.marked.parse(body.trim()) : body.trim();
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

    // 4. Salvar fórmulas KaTeX
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

    // Sanitização com DOMPurify
    if (window.DOMPurify && window.DOMPurify.sanitize) {
      parsedHtml = window.DOMPurify.sanitize(parsedHtml, {
        ADD_TAGS: ['details', 'summary', 'svg', 'path', 'line', 'circle', 'polygon', 'polyline', 'g', 'rect', 'text', 'tspan', 'defs', 'marker', 'use'],
        ADD_ATTR: ['open', 'target', 'viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'data-mermaid-code', 'data-processed', 'class', 'style', 'id', 'x', 'y', 'dx', 'dy', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'width', 'height', 'text-anchor', 'transform', 'marker-end', 'marker-start']
      });
    }

    // 5. Recolocar KaTeX
    parsedHtml = parsedHtml.replace(/@@BFAMATH_(\d+)@@/g, (marcador, i) => {
      const f = formulas[Number(i)];
      if (!f) return marcador;
      return renderizarTex(f.tex, f.emDestaque);
    });

    // 6. Limpar wrappers de parágrafo ao redor de diagramas Mermaid e recolocar
    parsedHtml = parsedHtml.replace(/<p>\s*@@BFAMERMAID_(\d+)@@\s*<\/p>/g, '@@BFAMERMAID_$1@@');
    parsedHtml = parsedHtml.replace(/@@BFAMERMAID_(\d+)@@/g, (marcador, i) => {
      const code = mermaidBlocks[Number(i)];
      if (!code) return marcador;
      const encoded = code.replace(/"/g, '&quot;');
      return `<div class="mermaid-wrapper"><div class="mermaid-target" data-mermaid-code="${encoded}"></div></div>`;
    });

    // 7. Envolver tabelas com wrapper executivo centralizado e destacado
    parsedHtml = parsedHtml.replace(/<table(\s*[^>]*)>([\s\S]*?)<\/table>/gi, (match, attrs, content) => {
      return `<div class="bfa-table-wrapper"><table${attrs}>${content}</table></div>`;
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
