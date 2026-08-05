const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

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
    const text = markdownContent.replace(/\r\n/g, '\n');
    const rawBlocks = text.split(/\n\s*\n/);
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
      /!!!\s*(\w+)(?:\s*"([^"]+)")?\n([\s\S]*?)(?=\n!!!|\n#|\n\n\n|$)/g,
      (match, type, title, body) => {
        const titleText = title || (type.charAt(0).toUpperCase() + type.slice(1));
        const iconSvgMap = {
          note: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14l-1.5-6h-11L5 17z"/><path d="M9 11V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7"/></svg>`,
          warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
          tip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
          important: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
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

    // Protect math expressions from marked parser mangling
    const mathTokens = [];
    // Protect display math ($$...$$ or \[...\])
    formatted = formatted.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g, (match) => {
      const idx = mathTokens.length;
      mathTokens.push(match);
      return `___MATH_TOK_${idx}___`;
    });
    // Protect inline math ($...$ or \(...\))
    formatted = formatted.replace(/(\$[^$\n]+?\$|\\\([\s\S]*?\\\))/g, (match) => {
      const idx = mathTokens.length;
      mathTokens.push(match);
      return `___MATH_TOK_${idx}___`;
    });

    let parsedHtml = (window.marked && window.marked.parse) ? window.marked.parse(formatted) : formatted;

    // Restore math expressions
    mathTokens.forEach((tok, idx) => {
      parsedHtml = parsedHtml.replace(`___MATH_TOK_${idx}___`, tok);
    });

    return (window.DOMPurify && window.DOMPurify.sanitize) ? window.DOMPurify.sanitize(parsedHtml) : parsedHtml;
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
