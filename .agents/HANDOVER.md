# Handoff Briefing

## Environment Metadata
- **Timestamp:** 2026-08-30T00:31:00-03:00
- **Git Branch:** `main`
- **Last Commit:** `59cdd5b - docs: update handover briefing with mobile native features and svg icon refactor`
- **Uncommitted Changes:** None

## Goal & Objective
Evolução da plataforma Brasil Finanças Atlas (BFA) para uma verdadeira aplicação móvel nativa de alto desempenho (Real Mobile App). Implementação de PWA completo com Service Worker offline, Barra de Navegação Inferior na zona do polegar (Thumb Zone) com auto-hide inteligente, Gestos de Swipe entre abas de aula, Feedback Háptico (Vibração tátil), Bottom Sheets deslizantes com suporte a arrasto, Mini-Player de Áudio persistente, Web Share API nativa e eliminação total de emojis substituídos por componentes SVG vetoriais (`BfaIcon`).

## Current Status
- **Completed in this session:**
  - **PWA Shell & OS Integration:** `manifest.json` (Standalone, portrait-primary, theme_color, app shortcuts) e `sw.js` (Service Worker cache-first para estudo offline). Viewport fit e variáveis CSS Safe-Area (`--sat`, `--sab`, `--sal`, `--sar`) em `globals.css`.
  - **Thumb-Zone Persistent Bottom Navigation (`BottomNavBar.jsx`):** 5 Pilares no polegar ([ Início ], [ Matemática ], [ Finanças ], [ Ferramentas ], [ Progresso ]) com auto-hide dinâmico na rolagem.
  - **Draggable Bottom Sheets (`BottomSheet.jsx`):** Modal deslizante de baixo para cima com drag-to-dismiss e backdrop blur.
  - **Touch Gestures & Haptics Engine (`touchGestures.js`):** Hook `useSwipeGesture` (transição horizontal entre [ Teoria ], [ Exercícios ] e [ Fórum ] em `AulaPage.jsx`) e hook `useHaptics` (pulsos táteis em respostas corretas/incorretas e navegação).
  - **Persistent Floating Audio Player (`FloatingAudioBar.jsx`):** Mini-player acoplado no rodapé para leitura contínua das aulas.
  - **Touch-First Forms & Native Web Share API (`nativeShare.js`):** Stepper pills de incremento rápido (+ R$ 50, + R$ 100, + R$ 500, + 1 ano) e `inputmode="decimal"` na Calculadora de Juros. Compartilhamento nativo de certificados e resultados.
  - **Eliminação Estrita de Emojis & Sistema de Ícones SVG (`Icons.jsx`):** 100% dos emojis removidos do app e substituídos por `BfaIcon` vetorial SVG. Regra de proibição estrita de emojis adicionada a `AGENTS.md`.
  - **Curadoria de Ferramentas Concluídas na Navegação:** Apenas ferramentas 100% finalizadas (Calculadora de Juros, Simulados Cronometrados, Banco de Exercícios e Cronograma) expostas nos menus; simulador de carteira não-concluído ocultado.
  - **Correção de Stacking Context no Header (`NavbarFooter.jsx`):** Gaveta mobile renderizada fora do `<header>` com `backdrop-filter` para evitar confinamento de visualização no WebKit/Blink.
  - **Sincronização & Testes:** Sincronização dual com `plataforma/` e validação com Babel Standalone (`node scratch/test_babel.js`) com 43 arquivos aprovados com sucesso.
- **In-Progress:**
  - Branch `main` estável, 100% testada e sincronizada com origin no GitHub.
- **Blockers / Known Issues:**
  - Nenhum. Todas as 43 fontes JSX compilam sem erros e a sincronização dual está ativa.

## Decisions Made (Locked)
- **Proibição Estrita de Emojis:** NUNCA utilizar emojis em código, interface ou mensagens do assistente. Sempre utilizar ícones SVG vetoriais (`BfaIcon` ou SVG inline).
- **Apenas Recursos Concluídos na Navegação:** Funcionalidades em desenvolvimento ou não finalizadas (como o Simulador de Carteira) não devem ser expostas nas rotas principais ou barras de navegação até estarem completamente polidas.
- **Mobile First & Thumb Zone:** A navegação móvel prioriza a barra inferior com safe-area insets.
- **Backdrop-Filter Containment:** Modais em tela cheia e bottom sheets devem sempre ser renderizados fora de contêineres com `backdrop-filter` ou `transform`.
- **Deploy Dual:** `plataforma/` é a pasta raiz do app React Standalone no Cloudflare Pages (https://atlas-c2i.pages.dev/). Sempre rodar `python scratch/sync_plataforma.py` após alterações.

## Failed Approaches & Anti-Patterns (Do Not Retry)
- Não renderizar drawers ou modais fixos dentro de elementos com `backdrop-filter: blur()`, pois isso quebra o `position: fixed` no Safari/Chrome móvel.
- Não usar emojis na interface ou nas mensagens.
- Não expor botões para ferramentas incompletas na interface pública.

## Extracted User Preferences & Project Learnings
- O usuário exige tolerância zero a emojis no projeto.
- O usuário prefere apenas ferramentas 100% concluídas e funcionais visíveis nos menus.
- O usuário utiliza GitHub com auto-sync e prefere alterações consolidadas na branch `main`.

## Attention Routing (Key Pointers)
- **Active Plan File:** N/A
- **Primary Code Files:**
  - `src/components/BottomNavBar.jsx`: Barra de navegação inferior mobile com auto-hide
  - `src/components/Icons.jsx`: Biblioteca centralizada de ícones SVG
  - `src/pages/AulaPage.jsx`: Sala de aula com suporte a swipe entre abas e haptics
  - `src/components/CalculadoraJurosCompostos.jsx`: Calculadora de juros com steppers de toque
  - `scratch/test_babel.js`: Validador de integridade e sintaxe JSX

## Immediate Next Step
- Executar `/session-start` e iniciar a expansão de conteúdos ou novas listas de exercícios e simulados olímpicos da BRHSIC conforme solicitação do usuário.
