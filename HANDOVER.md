# Handoff Briefing

## Environment Metadata
- **Timestamp:** 2026-08-26T12:25:00-03:00
- **Git Branch:** `main`
- **Last Commit:** `73b049a - chore(auto-sync): atualiza arquivos locais [2026-08-26 12:12:19]`
- **Uncommitted Changes:** None

## Goal & Objective
Maintain and advance the Brasil Finanças Atlas (BFA) educational platform frontend UI/UX, verify secure Supabase-based authentication & CMS role hierarchies, ensure zero secret leakage via `.gitignore`, and maintain real-time automated GitHub synchronization with local PAT.

## Current Status
- **Completed in this session:**
  - Sincronização completa de todos os arquivos locais com o GitHub (`origin/main`).
  - Atualização segura do arquivo `.env` com a nova chave `GITHUB_PAT` fornecida pelo usuário, garantindo que permaneça ignorada pelo Git (`.gitignore`).
  - Inicialização e validação do serviço de sincronização em segundo plano ([`auto_sync.py`](file:///C:/codigos/bfa-main/auto_sync.py)) com Watchdog em tempo real e push autenticado no GitHub.
  - Alinhamento da hierarquia de permissões no CMS: administradores comuns (`admin`), professores (`teacher`) e colaboradores (`collaborator`) enviam edições para a fila de moderação (`pendingEdits`), cabendo exclusivamente ao Administrador Chefe (`admin_chief`) aprovar (`approvePendingEdit`), rejeitar (`rejectPendingEdit`) e publicar alterações no banco ([`AdminContext.jsx`](file:///C:/codigos/bfa-main/plataforma/src/context/AdminContext.jsx), [`AdminPages.jsx`](file:///C:/codigos/bfa-main/plataforma/src/pages/AdminPages.jsx)).
  - Elaboração de documentação e roteiro detalhado para teste do sistema de admins e promoção de contas via SQL no Supabase.
- **In-Progress:**
  - Plataforma 100% operacional com auto-sync ativo e permissões de CMS ajustadas.
- **Blockers / Known Issues:**
  - Nenhum.

## Decisions Made (Locked)
- **Hierarquia de Permissões CMS (Admin vs Admin Chief):** Qualquer usuário com papel `admin`, `teacher` ou `collaborator` tem acesso às ferramentas de edição in-context e criação de módulos/questões/notícias, mas suas alterações geram pendências (`pendingEdits`). Somente o usuário com papel `admin_chief` pode aprovar as alterações para publicação definitiva.
- **Segurança de Segredos e `.gitignore`:** O arquivo `.env` contendo o `GITHUB_PAT` nunca deve ser versionado nem designorado, mantendo o repositório seguro para publicação pública.
- **Background Auto-Sync com Watchdog:** O processo `python auto_sync.py` roda continuamente em segundo plano com debounce de 3 segundos, gravando commits atômicos do tipo `chore(auto-sync)` e sincronizando via rebase e push com o GitHub.

## Failed Approaches & Anti-Patterns (Do Not Retry)
- **Publicação direta por administradores comuns:** Configurar `admin` para gravar diretamente no `site_content` sem aprovação do `admin_chief` violava a governança do projeto. Todas as edições não-chief devem passar por `pendingEdits`.
- **Credenciais no código:** Nunca reintroduzir credenciais estáticas de admin no frontend (`AdminContext.jsx`); a autenticação deve ser estritamente delegada ao Supabase Auth com papéis lidos da tabela `public.profiles`.

## Extracted User Preferences & Project Learnings
- **Regra de Admin Chief:** O administrador edita e submete para o Admin Chief permitir/aprovar.
- **Auto-Sync Ativo:** O usuário espera que todas as mudanças locais sejam refletidas automaticamente no GitHub via `auto_sync.py`.

## Attention Routing (Key Pointers)
- **Active Plan File:** N/A
- **Primary Code Files:**
  - [`plataforma/src/context/AdminContext.jsx`](file:///C:/codigos/bfa-main/plataforma/src/context/AdminContext.jsx)
  - [`plataforma/src/pages/AdminPages.jsx`](file:///C:/codigos/bfa-main/plataforma/src/pages/AdminPages.jsx)
  - [`plataforma/src/components/EditableBlock.jsx`](file:///C:/codigos/bfa-main/plataforma/src/components/EditableBlock.jsx)
  - [`auto_sync.py`](file:///C:/codigos/bfa-main/auto_sync.py)

## Immediate Next Step
- Testar o fluxo de edição com conta `admin` e aprovação com conta `admin_chief` no ambiente local (`http://localhost:8080/#/admin`), ou prosseguir com a expansão de conteúdo pedagógico e módulos do Atlas.
