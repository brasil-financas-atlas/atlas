# Handoff Briefing

## Environment Metadata
- **Timestamp:** 2026-08-30T00:30:00-03:00
- **Git Branch:** main (100% sincronizada com origin/main no GitHub)
- **Last Commit:** d0d4737 refactor(nav): expose only completed tools in navbar and mobile drawer
- **Uncommitted Changes:** None (working tree clean)

## Goal & Objective
Evolução da plataforma Brasil Finanças Atlas (BFA) para uma verdadeira aplicação móvel de alto desempenho (Real Mobile App), superando a barreira de apenas layout responsivo empilhado. Implementação de PWA completo com Service Worker offline, Barra de Navegação Inferior na zona do polegar (Thumb Zone) com auto-hide inteligente, Gestos de Swipe entre abas de aula, Feedback Háptico (Vibração tátil), Bottom Sheets deslizantes com suporte a arrasto, Mini-Player de Áudio persistente, Web Share API nativa e eliminação total de emojis substituídos por componentes SVG vetoriais (`BfaIcon`).

## Current Status
- **Completed in this session:**
  1. **PWA Shell & OS Integration:**
     - Criado `manifest.json` (Standalone, portrait-primary, theme_color, app shortcuts) e `sw.js` (Service Worker cache-first para estudo offline).
     - Configurado `viewport-fit=cover` e variáveis CSS Safe-Area (`--sat`, `--sab`, `--sal`, `--sar`) em `globals.css`.
     - Adicionados `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent` e `overscroll-behavior-y: contain`.
  2. **Thumb-Zone Persistent Bottom Navigation (`BottomNavBar.jsx`):**
     - 5 Pilares na ponta do polegar: [ Início ] [ Matemática ] [ Finanças ] [ Ferramentas ] [ Progresso ].
     - Auto-hide dinâmico ao rolar a página para baixo e reexibição instantânea ao rolar para cima.
  3. **Draggable Bottom Sheets (`BottomSheet.jsx`):**
     - Modal deslizante de baixo para cima com drag-to-dismiss e backdrop com blur.
     - Integrado no menu de ferramentas da barra inferior e no índice da trilha.
  4. **Touch Gestures & Haptics Engine (`touchGestures.js`):**
     - Hook `useSwipeGesture`: transição por deslize horizontal entre as abas [ Teoria ], [ Exercícios ] e [ Fórum ] em `AulaPage.jsx`.
     - Hook `useHaptics`: pulsos táteis em respostas corretas/incorretas de quiz, toques de navegação e marcos de conclusão.
  5. **Persistent Floating Audio Player (`FloatingAudioBar.jsx`):**
     - Mini-player acoplado no rodapé que continua a reprodução de texto narrado das aulas enquanto o aluno navega por conteúdos e fórmulas.
  6. **Touch-First Forms & Native Web Share API (`nativeShare.js`):**
     - Stepper pills de incremento rápido (+ R$ 50, + R$ 100, + R$ 500, + 1 ano) e `inputmode="decimal"` na Calculadora de Juros.
     - Botão de compartilhamento nativo para WhatsApp/Instagram em certificados de conclusão e resultados de quiz.
  7. **Eliminação Estrita de Emojis & Sistema de Ícones SVG (`Icons.jsx`):**
     - Substituição de 100% dos emojis em toda a aplicação por componentes SVG vetoriais (`BfaIcon`).
     - Adicionada regra global de tolerância zero a emojis em `AGENTS.md`.
  8. **Curadoria de Ferramentas Concluídas na Navegação:**
     - Apenas ferramentas 100% finalizadas e funcionais expostas na navbar e gaveta mobile (Calculadora de Juros, Simulados Cronometrados, Banco de Exercícios e Cronograma).
  9. **Scripts de Sincronização & Teste Automático:**
     - `scratch/sync_plataforma.py`: sincronização instantânea com `plataforma/`.
     - `scratch/test_babel.js`: validação de 43 arquivos com Babel Standalone sem erros.

- **In-Progress:**
  - Branch `main` 100% atualizada, testada e em sincronia com GitHub.

- **Blockers / Known Issues:**
  - Nenhum. Todas as 43 fontes JSX compilam perfeitamente e a sincronização dual está ativa.

## Decisions Made (Locked)
- **Zero Emojis:** Todos os ícones visuais devem obrigatoriamente usar componentes vetoriais SVG (`BfaIcon`).
- **Deploy Dual:** plataforma/ é a pasta raiz do app React Standalone no Cloudflare Pages (https://atlas-c2i.pages.dev/). docs/ e mkdocs.yml mantêm a documentação original no GitHub Pages.
- **Mobile First Navigation:** A navegação móvel prioriza a barra inferior (Bottom Nav) na zona do polegar com safe-area insets.
- **Sincronização Automática:** Sempre execute `python scratch/sync_plataforma.py` e `node scratch/test_babel.js` após modificar arquivos em `src/`.

## Failed Approaches & Anti-Patterns (Do Not Retry)
- Não usar popups centralizados estilo desktop no mobile quando uma Bottom Sheet deslizante oferece ergonomia superior.
- Não depender apenas de menus superiores tipo hambúrguer para ações frequentes em smartphones grandes.
- Não esquecer de rodar `python scratch/sync_plataforma.py` para espelhar as alterações na pasta `plataforma/`.
- Nunca colocar emojis na interface, no código ou nas respostas.

## Attention Routing (Key Pointers)
- `src/components/BottomNavBar.jsx`: Barra de navegação inferior mobile com auto-hide
- `src/components/BottomSheet.jsx`: Modal deslizante estilo nativo
- `src/components/FloatingAudioBar.jsx`: Mini-player de áudio desacoplado
- `src/components/Icons.jsx`: Biblioteca centralizada de ícones SVG limpos
- `src/utils/touchGestures.js`: Gestos de swipe e haptic feedback
- `src/utils/nativeShare.js`: Web Share API nativa
- `src/pages/AulaPage.jsx`: Página de aula com swipe entre abas e compartilhamento
- `src/components/CalculadoraJurosCompostos.jsx`: Calculadora touch-friendly com steppers
- `scratch/test_babel.js`: Validador de compilação JSX
