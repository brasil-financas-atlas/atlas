# Directivas Globais do Projeto — Brasil Finanças Atlas (BFA)

## 🚀 Protocolo de Início de Sessão (/session-start)

Sempre que a skill `/session-start` for executada neste repositório, o agente DEVE seguir estes passos automaticamente:

1. **Executar a Verificação e Início do Auto-Sync Local:**
   - Verificar a existência do arquivo `.env` contendo `GITHUB_PAT`.
   - Executar uma sincronização inicial de teste com `python -c "import auto_sync; syncer = auto_sync.GitAutoSync(auto_sync.REPO_DIR, auto_sync.BRANCH, pat=auto_sync.GITHUB_PAT); syncer.sync()"`.
   - Iniciar o processo de monitoramento em segundo plano (`pythonw auto_sync.py`) se necessário.

2. **Lembrar o Usuário das Ações Pendentes no GitHub (Caso de Erro 403):**
   - Como o repositório foi transferido para a organização `brasil-financas-atlas`, tokens Fine-Grained antigos criados para contas pessoais retornam `403 Write access to repository not granted`.
   - Lembre o usuário de:
     1. Gerar um **Personal Access Token (classic)** em *GitHub Settings ➔ Developer Settings ➔ Personal Access Tokens ➔ Tokens (classic)* marcando a opção **`repo`**.
     2. Colar a nova chave no arquivo `.env` (`GITHUB_PAT=ghp_...`).
