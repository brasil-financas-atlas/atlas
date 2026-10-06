import katex from 'katex';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import BfaIcon from './Icons';
import { AdminContext } from '../context/AdminContext';
﻿import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';


function EditableBlock({ id, content, initialContent, children, onSave, as: Component = 'div', className = '', style }) {
  const { isAuthenticated, inlineEditActive, cmsData, saveOverride } = useContext(AdminContext);
  
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
  const [showLatexGuide, setShowLatexGuide] = useState(false);
  const [activeWizard, setActiveWizard] = useState(null); // null, 'gabarito', 'tabela', 'admonition', 'katex', 'fracao', 'potencia', 'mermaid', 'imagem'
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
    setShowLatexGuide(false);
    setActiveWizard(null);
  };

  const handleCloseEditor = () => {
    if (editorText !== currentText) {
      if (!window.confirm('Você tem alterações não salvas. Deseja realmente fechar o editor?')) {
        return;
      }
    }
    setIsEditing(false);
    setShowLatexGuide(false);
    setActiveWizard(null);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(id, editorText);
    } else if (id && saveOverride) {
      saveOverride(id, editorText);
    }
    setIsEditing(false);
    setShowLatexGuide(false);
    setActiveWizard(null);
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar o conteúdo original desta seção?')) {
      if (saveOverride) {
        saveOverride(id, null);
      }
      setIsEditing(false);
      setShowLatexGuide(false);
      setActiveWizard(null);
    }
  };

  // Safe insertion at current cursor position or end of text
  const insertAtCursor = (snippet) => {
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
    if (activeWizard === 'gabarito') {
      const titulo = wizardInputs.gabaritoTitulo || 'Gabarito com resolução';
      const modelo = wizardInputs.gabaritoModelo || 'passo';
      
      let corpo = '';
      if (modelo === 'passo') {
        corpo = `    **Passo 1:** Calcule o valor inicial aplicando a fórmula correspondente: $200 \\times 0{,}05 = 10$.\n    **Passo 2:** Some ao montante principal: $500 + 10 = \\mathbf{510}$.\n    **Conclusão / Sobra:** Carlos fecha o mês com saldo de **R$ 510,00**.`;
      } else if (modelo === 'questoes') {
        corpo = `    **1.** Primeiro a multiplicação: $200 \\times 0{,}05 = 10$. Depois a soma: $500 + 10 = \\mathbf{510}$.\n\n    **2.** Parênteses primeiro: $800 - 300 = 500$. Depois: $500 \\div 4 = \\mathbf{125}$.\n\n    **3.** $-450 + 200 + 150 = \\mathbf{-100}$ (dívida remanescente).\n\n    **4.** Mês: $15 \\times 22 = \\mathbf{330}$ reais. Ano: $330 \\times 12 = \\mathbf{3.960}$ reais.`;
      } else if (modelo === 'insight') {
        corpo = `    **Resposta:** Opção B.\n\n    **Explicação detalhada:** Cortando o gasto pela metade, atinge a meta em 5 meses em vez de 9 meses. A divisão revela o impacto das taxas no tempo.`;
      } else if (modelo === 'custom') {
        const rawCustom = wizardInputs.gabaritoCustomText || 'Passo 1: ...\nPasso 2: ...\nExplicação detalhada: ...';
        corpo = rawCustom.split('\n').map(line => '    ' + line).join('\n');
      }

      insertAtCursor(`\n\n??? note "${titulo}"\n${corpo}\n\n`);
    } else if (activeWizard === 'tabela') {
      const tipo = wizardInputs.tabelaTipo || 'comparativa';
      if (tipo === 'comparativa') {
        insertAtCursor(`\n\n| Conceito | Fórmula / Cálculo | Significado Simples |\n|---|---|---|\n| Margem Bruta | $\\frac{\\text{Lucro Bruto}}{\\text{Receita}}$ | Rentabilidade direta do produto |\n| Margem Líquida | $\\frac{\\text{Lucro Líquido}}{\\text{Receita}}$ | O que sobra final para os acionistas |\n| ROE | $\\frac{\\text{Lucro Líquido}}{\\text{Patrimônio Líquido}}$ | Retorno sobre o capital próprio |\n\n`);
      } else if (tipo === 'balanco') {
        insertAtCursor(`\n\n| Linha / Item | Valor (R$ mi) | Proporção / Margem |\n|---|---:|---:|\n| Receita Operacional Líquida | 300,00 | 100% |\n| (−) Custo dos Produtos (CPV) | -180,00 | 60% |\n| (=) Lucro Bruto | 120,00 | 40% |\n| (−) Despesas Operacionais | -75,00 | 25% |\n| (=) Lucro Líquido | 23,00 | 7,7% |\n\n`);
      } else if (tipo === 'investimentos') {
        insertAtCursor(`\n\n| Ativo / Aplicação | Rentabilidade | Liquidez | Grau de Risco |\n|---|---|---|---|\n| Tesouro Selic | 100% do CDI | D+1 (Diária) | Mínimo soberano |\n| CDB Pré-fixado | 12,5% ao ano | No Vencimento | Baixo (FGC) |\n| Fundos Imobiliários | Dividend Yield médio | D+2 (Bolsa) | Moderado |\n| Ações (IBOV) | Variação de mercado | D+2 (Bolsa) | Elevado |\n\n`);
      } else if (tipo === 'operacoes') {
        insertAtCursor(`\n\n| Operação | Pergunta Chave | Exemplo Financeiro |\n|---|---|---|\n| Soma (+) | Quanto dá no total? | $150 + 80 = 230$ |\n| Subtração (−) | O que sobra? Qual a diferença? | $230 - 180 = 50$ |\n| Multiplicação (×) | E se isso se repetir ao longo do tempo? | $7 \\times 22 = 154$ |\n| Divisão (÷) | Quanto representa? Qual a taxa (%)? | $80 \\div 1.000 = 8\\%$ |\n\n`);
      } else if (tipo === 'simples') {
        insertAtCursor(`\n\n| Item | Descrição | Exemplo |\n|---|---|---|\n| Entrada A | Descrição da primeira entrada | R$ 100,00 |\n| Entrada B | Descrição da segunda entrada | R$ 200,00 |\n| Total | Soma das entradas | R$ 300,00 |\n\n`);
      } else if (tipo === 'personalizada') {
        const rawCols = wizardInputs.colunasCustom || 'Coluna 1, Coluna 2, Coluna 3';
        const cols = rawCols.split(',').map(c => c.trim()).filter(Boolean);
        const headerRow = '| ' + cols.join(' | ') + ' |';
        const dividerRow = '| ' + cols.map(() => '---').join(' | ') + ' |';
        const sampleRow1 = '| ' + cols.map((c, i) => `Dado ${i + 1}`).join(' | ') + ' |';
        const sampleRow2 = '| ' + cols.map((c, i) => `Valor ${i + 1}`).join(' | ') + ' |';
        insertAtCursor(`\n\n${headerRow}\n${dividerRow}\n${sampleRow1}\n${sampleRow2}\n\n`);
      }
    } else if (activeWizard === 'admonition') {
      const tipo = wizardInputs.tipo || 'tip';
      const titulo = wizardInputs.titulo || 'Dica Prática';
      const rawCorpo = wizardInputs.corpo || 'Explicação aprofundada do conceito para os estudantes.';
      const corpoIndented = rawCorpo.split('\n').map(line => '    ' + line).join('\n');
      insertAtCursor(`\n\n!!! ${tipo} "${titulo}"\n${corpoIndented}\n\n`);
    } else if (activeWizard === 'katex') {
      const formulaTipo = wizardInputs.formulaTipo || 'vpl';
      if (formulaTipo === 'vpl') {
        insertAtCursor(`\n$$\n\\text{VPL} = \\sum_{t=1}^{n} \\frac{\\text{FC}_t}{(1 + r)^t} - I_0\n$$\n`);
      } else if (formulaTipo === 'juros_compostos') {
        insertAtCursor(`\n$$\nM = C \\cdot (1 + i)^t\n$$\n`);
      } else if (formulaTipo === 'fisher') {
        insertAtCursor(` $(1 + i) = (1 + r)(1 + \\pi)$ `);
      } else if (formulaTipo === 'somatorio') {
        insertAtCursor(` $$\\sum_{t=1}^{n} X_t$$ `);
      } else if (formulaTipo === 'produtorio') {
        insertAtCursor(` $$\\prod_{i=1}^{k} (1 + r_i)$$ `);
      } else if (formulaTipo === 'raiz') {
        insertAtCursor(` $\\sqrt[n]{1 + R}$ `);
      } else if (formulaTipo === 'volatilidade') {
        insertAtCursor(` $$\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (r_i - \\mu)^2}$$ `);
      } else if (formulaTipo === 'moeda') {
        insertAtCursor(` $\\text{R\\$ } 1.000,00$ `);
      }
    } else if (activeWizard === 'fracao') {
      const num = wizardInputs.num || 'a';
      const den = wizardInputs.den || 'b';
      insertAtCursor(` $\\frac{${num}}{${den}}$ `);
    } else if (activeWizard === 'potencia') {
      const base = wizardInputs.base || '(1 + i)';
      const exp = wizardInputs.exp || 't';
      insertAtCursor(` $${base}^{${exp}}$ `);
    } else if (activeWizard === 'mermaid') {
      const tipoMermaid = wizardInputs.mermaidTipo || 'fluxo_decisao';
      if (tipoMermaid === 'fluxo_decisao') {
        insertAtCursor(`\n\n\`\`\`mermaid\nflowchart TD\n  A[Recebimento de Renda] --> B{Tem Dívidas Caras?}\n  B -- Sim --> C[Quitar Cartão e Cheque Especial]\n  B -- Não --> D[Construir Reserva de Emergência]\n  D --> E{Reserva Completa (6 meses)?}\n  E -- Sim --> F[Investir em Renda Variável e FIIs]\n  E -- Não --> G[Aportar em Tesouro Selic / CDB]\n\`\`\`\n\n`);
      } else if (tipoMermaid === 'ciclo_caixa') {
        insertAtCursor(`\n\n\`\`\`mermaid\nflowchart LR\n  A[Compra de Estoque] --> B[Produção / Venda]\n  B --> C[Faturamento a Prazo]\n  C --> D[Recebimento de Caixa]\n  D --> E[Reinvestimento no Negócio]\n\`\`\`\n\n`);
      } else if (tipoMermaid === 'arvore_ativos') {
        insertAtCursor(`\n\n\`\`\`mermaid\nflowchart TD\n  Carteira[Carteira BFA] --> RF[Renda Fixa 70%]\n  Carteira --> RV[Renda Variável 30%]\n  RF --> Selic[Tesouro Selic]\n  RF --> IPCA[Tesouro IPCA+]\n  RV --> Acoes[Ações Dividendos]\n  RV --> FII[Fundos Imobiliários]\n\`\`\`\n\n`);
      }
    } else if (activeWizard === 'imagem') {
      const url = wizardInputs.url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800';
      const alt = wizardInputs.alt || 'Gráfico Ilustrativo';
      insertAtCursor(`\n\n![${alt}](${url})\n`);
    }
    setActiveWizard(null);
    setWizardInputs({});
  };

  // Real-time Preview Renderer strictly identical to LessonContent
  const previewHtml = useMemo(() => {
    if (!editorText) return '<p style="color:var(--text-secondary);font-style:italic;">Nenhum conteúdo inserido.</p>';
    
    let formatted = editorText;

    // 1. Interceptar Mermaid
    const mermaidBlocks = [];
    formatted = formatted.replace(/```mermaid\s*\n([\s\S]*?)```/g, (m, code) => {
      mermaidBlocks.push(code.trim());
      return `\n\n@@BFAMERMAID_${mermaidBlocks.length - 1}@@\n\n`;
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

    // 2.4 Captura comandos LaTeX soltos
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
      abstract: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
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
        const bodyText = (marked && marked.parse) ? marked.parse(cleanBody) : cleanBody;

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
        const bodyText = (marked && marked.parse) ? marked.parse(cleanBody) : cleanBody;
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

    let parsed = (marked && marked.parse) ? marked.parse(formatted) : formatted;

    // Sanitização com DOMPurify
    if (DOMPurify && DOMPurify.sanitize) {
      parsed = DOMPurify.sanitize(parsed, {
        ADD_TAGS: ['details', 'summary', 'svg', 'path', 'line', 'circle', 'polygon', 'polyline', 'g', 'rect', 'text', 'tspan', 'defs', 'script', 'img', 'iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
        ADD_ATTR: ['open', 'viewBox', 'fill', 'stroke', 'stroke-width', 'class', 'style', 'id', 'src', 'alt', 'type', 'allow', 'allowfullscreen', 'frameborder']
      });
    }

    // Recolocar KaTeX
    parsed = parsed.replace(/@@BFAMATH_(\d+)@@/g, (marcador, i) => {
      const f = formulas[Number(i)];
      if (!f) return marcador;
      if (katex && katex.renderToString) {
        try {
          return katex.renderToString(f.tex.trim(), {
            displayMode: f.emDestaque,
            throwOnError: false,
            strict: false
          });
        } catch (e) {
          console.warn('Erro ao renderizar KaTeX:', f.tex, e);
          return f.tex;
        }
      }
      return f.tex;
    });

    // Recolocar Mermaid
    parsed = parsed.replace(/@@BFAMERMAID_(\d+)@@/g, (marcador, i) => {
      const code = mermaidBlocks[Number(i)];
      if (!code) return marcador;
      return `<div style="padding:1rem;background:var(--secondary);border:1px solid var(--border-color);border-radius:6px;margin:1rem 0;font-family:monospace;font-size:0.85rem;"><span class="bfa-badge bfa-badge--azul" style="margin-bottom:0.5rem;display:inline-block;">Diagrama de Fluxo (Mermaid)</span><pre style="margin:0;white-space:pre-wrap;">${code}</pre></div>`;
    });

    // Envolver tabelas
    parsed = parsed.replace(/<table(\s*[^>]*)>([\s\S]*?)<\/table>/gi, (match, attrs, content) => {
      return `<div class="bfa-table-wrapper" style="margin:1.25rem 0;overflow-x:auto;"><table class="bfa-table" style="width:100%;border-collapse:collapse;" ${attrs}>${content}</table></div>`;
    });

    // Envolver imagens
    parsed = parsed.replace(/<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi, (match, pre, src, post) => {
      return `<div style="text-align:center;margin:1.25rem 0;"><img src="${src}" ${pre} ${post} style="max-width:100%;max-height:300px;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.1);" loading="lazy" /></div>`;
    });

    return parsed;
  }, [editorText]);

  const canEdit = isAuthenticated && inlineEditActive;

  // Safe backdrop click handling
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
          title="Editar este trecho / recurso (Modo Admin)"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <BfaIcon name="pencil" size={14} />
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
            style={{ maxWidth: '1120px', width: '96vw', maxHeight: '95vh', display: 'flex', flexDirection: 'column' }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(0, 166, 223, 0.12)', padding: '0.4rem', borderRadius: '6px', display: 'inline-flex' }}>
                  <BfaIcon name="pencil" size={18} color="var(--blue)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Editor Avançado BFA & Inserção de Recursos
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    ID do Bloco: {id}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={`bfa-btn bfa-btn--sm ${showLatexGuide ? 'bfa-btn--ouro' : 'bfa-btn--ghost'}`}
                  onClick={() => setShowLatexGuide(!showLatexGuide)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  <BfaIcon name="book" size={14} /> Guia LaTeX
                </button>

                {/* View Mode Toggle */}
                <div style={{ display: 'flex', background: 'var(--secondary)', borderRadius: '6px', padding: '2px' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('editor')}
                    className="bfa-btn bfa-btn--sm"
                    style={{
                      background: viewMode === 'editor' ? 'var(--bg-surface)' : 'transparent',
                      color: viewMode === 'editor' ? 'var(--primary)' : 'var(--text-secondary)',
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
                      background: viewMode === 'split' ? 'var(--bg-surface)' : 'transparent',
                      color: viewMode === 'split' ? 'var(--primary)' : 'var(--text-secondary)',
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
                      background: viewMode === 'preview' ? 'var(--bg-surface)' : 'transparent',
                      color: viewMode === 'preview' ? 'var(--primary)' : 'var(--text-secondary)',
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
                  aria-label="Fechar editor"
                >
                  <BfaIcon name="close" size={14} />
                </button>
              </div>
            </div>

            {/* LaTeX Quick Guide Panel */}
            {showLatexGuide && (
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '0.85rem', maxHeight: '190px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Guia Rápido de Fórmulas KaTeX (Clique para Inserir no Cursor):</strong>
                  <button type="button" onClick={() => setShowLatexGuide(false)} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ padding: '0.1rem 0.35rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><BfaIcon name="close" size={12} /> Fechar</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.4rem' }}>
                  <button type="button" onClick={() => insertAtCursor(' $\\frac{a}{b}$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Fração:</strong> <code>\frac&#123;a&#125;&#123;b&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $(1 + i)^{t}$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Juros Compostos:</strong> <code>(1+i)^&#123;t&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $x^{n}$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Potência:</strong> <code>x^&#123;n&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $x_{i}$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Subscrito:</strong> <code>x_&#123;i&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\sqrt{x}$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Raiz Quadrada:</strong> <code>\sqrt&#123;x&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\sqrt[n]{1 + R}$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Raiz Enésima:</strong> <code>\sqrt[n]&#123;x&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $$\\text{VPL} = \\sum_{t=1}^{n} \\frac{\\text{FC}_t}{(1+r)^t} - I_0$$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>VPL:</strong> <code>\sum \frac&#123;FC&#125;&#123;(1+r)^t&#125;</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $$\\prod_{i=1}^{k} (1 + r_i)$$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Produtório:</strong> <code>\prod (1+r_i)</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\cdot$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Multiplicação Ponto:</strong> <code>\cdot</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\times$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Multiplicação Cruz:</strong> <code>\times</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\sigma$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Volatilidade:</strong> <code>\sigma</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\mu$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Retorno Médio:</strong> <code>\mu</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\Delta$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Variação Delta:</strong> <code>\Delta</code>
                  </button>
                  <button type="button" onClick={() => insertAtCursor(' $\\text{R\\$ } 1.000,00$ ')} className="bfa-btn bfa-btn--ghost bfa-btn--sm" style={{ justifyContent: 'flex-start', fontSize: '0.75rem', background: 'var(--bg-surface)' }}>
                    <strong>Moeda Formatada:</strong> <code>\text&#123;R\$ &#125;</code>
                  </button>
                </div>
              </div>
            )}

            {/* Configurable Wizards / Assistants Bar */}
            <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', marginRight: '2px' }}>
                FERRAMENTAS DE INSERÇÃO:
              </span>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'gabarito' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'gabarito' ? null : 'gabarito')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', fontWeight: 800 }}
              >
                + Gabarito Oculto
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'tabela' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'tabela' ? null : 'tabela')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', fontWeight: 800 }}
              >
                + Tabela
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'admonition' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'admonition' ? null : 'admonition')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', fontWeight: 700 }}
              >
                + Caixa Destaque
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'katex' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'katex' ? null : 'katex')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Fórmulas Financeiras
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'fracao' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'fracao' ? null : 'fracao')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Fração
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'potencia' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'potencia' ? null : 'potencia')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Juros / Potência
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'mermaid' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'mermaid' ? null : 'mermaid')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Diagrama Mermaid
              </button>
              <button
                type="button"
                className={`bfa-btn bfa-btn--sm ${activeWizard === 'imagem' ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                onClick={() => setActiveWizard(activeWizard === 'imagem' ? null : 'imagem')}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                + Imagem</button><button type="button" className="bfa-btn bfa-btn--ghost bfa-btn--sm" onClick={() => insertAtCursor('<u>Texto Sublinhado</u>')} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', fontWeight: 700 }}><u>U</u> Sublinhado</button></div>

            {/* Wizard Input Form Panel */}
            {activeWizard && (
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.75rem', display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {activeWizard === 'gabarito' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Inserir Gabarito Oculto:</span>
                    <input
                      type="text"
                      placeholder="Título do Gabarito (ex: Gabarito com resolução)"
                      value={wizardInputs.gabaritoTitulo || 'Gabarito com resolução'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, gabaritoTitulo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '220px' }}
                    />
                    <select
                      value={wizardInputs.gabaritoModelo || 'passo'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, gabaritoModelo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                    >
                      <option value="passo">Passo a Passo Detalhado (Passo 1, Passo 2, Conclusão/Sobra)</option>
                      <option value="questoes">Lista de Questões Numeradas (1, 2, 3, 4)</option>
                      <option value="insight">Resposta com Explicação Conceitual e Insight</option>
                      <option value="custom">Texto Livre Personalizado</option>
                    </select>
                    {wizardInputs.gabaritoModelo === 'custom' && (
                      <textarea
                        placeholder="Digite o texto da explicação ou gabarito (todas as linhas serão indentadas automaticamente)..."
                        value={wizardInputs.gabaritoCustomText || ''}
                        onChange={(e) => setWizardInputs({ ...wizardInputs, gabaritoCustomText: e.target.value })}
                        style={{ width: '100%', minHeight: '65px', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                      />
                    )}
                  </>
                )}

                {activeWizard === 'tabela' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Modelo de Tabela:</span>
                    <select
                      value={wizardInputs.tabelaTipo || 'comparativa'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, tabelaTipo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                    >
                      <option value="comparativa">Tabela Comparativa / Indicadores (Conceito, Fórmula, Significado)</option>
                      <option value="balanco">Tabela Financeira / DRE (Linha, Valor R$, Margem %)</option>
                      <option value="investimentos">Comparativo de Investimentos (Ativo, Rentabilidade, Liquidez, Risco)</option>
                      <option value="operacoes">4 Operações em Finanças (Operação, Pergunta Chave, Exemplo)</option>
                      <option value="simples">Tabela Geral (3 Colunas)</option>
                      <option value="personalizada">Tabela Personalizada (Definir Colunas)</option>
                    </select>
                    {wizardInputs.tabelaTipo === 'personalizada' && (
                      <input
                        type="text"
                        placeholder="Cabeçalhos separados por vírgula (ex: Mês, Aporte, Saldo)"
                        value={wizardInputs.colunasCustom || ''}
                        onChange={(e) => setWizardInputs({ ...wizardInputs, colunasCustom: e.target.value })}
                        style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', flex: 1, minWidth: '220px' }}
                      />
                    )}
                  </>
                )}

                {activeWizard === 'admonition' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Caixa Pedagógica:</span>
                    <select
                      value={wizardInputs.tipo || 'tip'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, tipo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                    >
                      <option value="tip">Dica Prática (Verde)</option>
                      <option value="note">Nota / Atenção (Azul)</option>
                      <option value="warning">Alerta / Cuidado (Amarelo)</option>
                      <option value="danger">Perigo / Erro Crítico (Vermelho)</option>
                      <option value="math">Fórmula Matemática (Roxo)</option>
                      <option value="info">Informação Geral</option>
                      <option value="example">Exemplo Resolvido</option>
                      <option value="pbl">Problema Investigativo (PBL)</option>
                      <option value="abstract">Resumo de Bolso</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Título da Caixa"
                      value={wizardInputs.titulo || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, titulo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '160px' }}
                    />
                    <input
                      type="text"
                      placeholder="Texto do Conteúdo"
                      value={wizardInputs.corpo || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, corpo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', flex: 1, minWidth: '200px' }}
                    />
                  </>
                )}

                {activeWizard === 'katex' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Fórmula Financeira:</span>
                    <select
                      value={wizardInputs.formulaTipo || 'vpl'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, formulaTipo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                    >
                      <option value="vpl">VPL — Valor Presente Líquido (Somatório de Fluxos)</option>
                      <option value="juros_compostos">Juros Compostos — M = C(1+i)^t</option>
                      <option value="fisher">Equação de Fisher — Taxa Real e Inflação</option>
                      <option value="somatorio">Somatório Sigma (Σ)</option>
                      <option value="produtorio">Produtório Pi (Π)</option>
                      <option value="raiz">Raiz Enésima de Taxa Acumulada</option>
                      <option value="volatilidade">Volatilidade — Desvio Padrão Populacional (σ)</option>
                      <option value="moeda">Moeda Brasileira Formatada — R$ 1.000,00</option>
                    </select>
                  </>
                )}

                {activeWizard === 'fracao' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Fração:</span>
                    <input
                      type="text"
                      placeholder="Numerador (ex: Lucro Bruto)"
                      value={wizardInputs.num || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, num: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '140px' }}
                    />
                    <span>/</span>
                    <input
                      type="text"
                      placeholder="Denominador (ex: Receita)"
                      value={wizardInputs.den || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, den: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '140px' }}
                    />
                  </>
                )}

                {activeWizard === 'potencia' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Potência:</span>
                    <input
                      type="text"
                      placeholder="Base (ex: 1 + i)"
                      value={wizardInputs.base || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, base: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '130px' }}
                    />
                    <span>^</span>
                    <input
                      type="text"
                      placeholder="Expoente (ex: t)"
                      value={wizardInputs.exp || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, exp: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '90px' }}
                    />
                  </>
                )}

                {activeWizard === 'mermaid' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Diagrama de Fluxo:</span>
                    <select
                      value={wizardInputs.mermaidTipo || 'fluxo_decisao'}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, mermaidTipo: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                    >
                      <option value="fluxo_decisao">Tomada de Decisão Financeira (Dívidas vs Reserva vs Aporte)</option>
                      <option value="ciclo_caixa">Ciclo Operacional & Financeiro de Caixa</option>
                      <option value="arvore_ativos">Alocação de Carteira (Renda Fixa vs Variável)</option>
                    </select>
                  </>
                )}

                {activeWizard === 'imagem' && (
                  <>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-azul)' }}>Inserir Imagem:</span>
                    <input
                      type="text"
                      placeholder="URL da Imagem (https://...)"
                      value={wizardInputs.url || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, url: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', flex: 1, minWidth: '180px' }}
                    />
                    <input
                      type="text"
                      placeholder="Legenda / Alt text"
                      value={wizardInputs.alt || ''}
                      onChange={(e) => setWizardInputs({ ...wizardInputs, alt: e.target.value })}
                      style={{ padding: '0.35rem 0.55rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', width: '160px' }}
                    />
                  </>
                )}

                <button
                  type="button"
                  className="bfa-btn bfa-btn--verde bfa-btn--sm"
                  onClick={applyWizardInsertion}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', fontWeight: 750 }}
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
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      CÓDIGO FONTE (MARKDOWN + LATEX):
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
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
                      border: '1px solid var(--border-color)',
                      resize: 'none',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)'
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
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
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
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              )}
            </div>

            {/* Bottom Footer Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
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



export default EditableBlock;
