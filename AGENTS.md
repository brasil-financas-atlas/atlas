# Directivas Globais do Projeto — Brasil Finanças Atlas (BFA) & Virtual Lab Simulator

## Regra de Ouro: Proibição Estrita de Emojis
1. **NUNCA UTILIZAR EMOJIS:** Emojis (como emojis de casa, gráfico, dinheiro, foguete, troféu, medalhas, etc.) estão terminantemente proibidos no projeto.
2. **Utilizar Sempre Ícones SVG Limpos:** Toda representação gráfica deve ser feita através de componentes SVG vetoriais (`BfaIcon` ou SVG inline).
3. **Comunicação do Agente:** Em todas as respostas de chat, planos e briefings, o agente não deve utilizar nenhum emoji.

---

## Protocolo de Início de Sessão (/session-start)

Sempre que a skill `/session-start` for executada neste repositório, o agente DEVE seguir estes passos automaticamente:

1. **Executar a Verificação e Início do Auto-Sync Local:**
   - Verificar a existência do arquivo `.env` contendo `GITHUB_PAT`.
   - Executar uma sincronização inicial de teste com `python -c "import auto_sync; syncer = auto_sync.GitAutoSync(auto_sync.REPO_DIR, auto_sync.BRANCH, pat=auto_sync.GITHUB_PAT); syncer.sync()"`.
   - Iniciar o processo de monitoramento em segundo plano (`pythonw auto_sync.py`) se necessário.

2. **Lembrar o Usuário das Ações Pendentes no GitHub (Caso de Erro de Permissão ou Workflows):**
   - Como o repositório contém workflows do GitHub Actions em `.github/workflows/`, o Personal Access Token (PAT) DEVE ter as permissões marcadas:
     1. **`repo`** (Acesso completo a repositórios privados).
     2. **`workflow`** (Permissão para atualizar fluxos de trabalho do GitHub Actions).
   - Se o `git push` for rejeitado por falta de escopo `workflow`, lembre o usuário de editar a chave no GitHub ativando a opção **`workflow`**.

---

## Diretrizes de Desenvolvimento do Simulador Virtual 3D (C:\codigos\labs)

### Regras de Qualidade Visual & UX (Invioláveis):
1. **NUNCA iniciar a câmera encarando paredes cinzas soltas**: A câmera deve sempre nascer apontada para a bancada principal de experimentos com iluminação focada.
2. **Indicação Clara de Interatividade (Tooltips & Cursor)**: Todo objeto interativo (bancada, instrumento, botão, knob) DEVE exibir um tooltip flutuante visível ao passar o mouse (ex: `Clique para inspecionar Osciloscópio DSO`).
3. **Navegação de Câmera Fluida**: 
   - Exploração FPS livre (WASD) → Clicar na bancada passa para órbita → Clicar no instrumento ativa zoom Macro direto nos controles (distância ~0.25m).
   - A tecla `Escape` regressa exatamente um nível de câmera de cada vez (Macro → Órbita → FPS com pointerlock desativado).
4. **Sem Sobreposição de Modelos (Zero Z-Fighting)**: Os instrumentos e componentes na bancada devem ter coordenadas e bounding boxes explicitamente calculadas sem interseções.
5. **Estética de Laboratório Completo**: O ambiente 3D não pode parecer uma caixa vazia. Deve possuir janelas com iluminação externa, armários de parede, prateleiras com reagentes, quadros brancos com fórmulas ($V=IR$, $\tau=RC$), lâmpadas PBR no teto e textura de piso.
6. **Desempenho & Compatibilidade**: Manter compilação TypeScript limpa (`npx tsc --noEmit` zerado) e testes passando (`npx vitest run`).
