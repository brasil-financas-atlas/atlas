# Directivas Globais do Projeto — Brasil Finanças Atlas (BFA)

## 🚀 Protocolo de Início de Sessão (/session-start)

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

