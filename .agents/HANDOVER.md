# Handoff Briefing

## Goal
Configurar a integração com o Supabase, validar a segurança/RLS do banco de dados, garantir a persistência completa do perfil e progresso de alunos no login e implementar recursos de upload de imagem para colaboradores em branch isolada.

## Current Status
- **Completed:**
  - Configurados os arquivos de servidor MCP em `.vscode/mcp.json` e `.mcp.json`.
  - Corrigida a URL do Supabase no `.env` (removido o sufixo `/rest/v1/` redundante).
  - Sanitização de URL adicionada no `supabaseClient.js`.
  - Auditoria e otimização dos esquemas SQL (`schema.sql` em `plataforma/` e `src/`): removido índice redundante em `student_profiles` e corrigida a função de trigger para `tocar_updated_at()`.
  - Corrigida a persistência e fusão de progresso do aluno no login/cadastro em `useStudentAuth.js` e `LoginPage.jsx` (adicionado `full_name` e `upsert` imediato).
  - Cadastrado o usuário `jvggeiss30@gmail.com` no Supabase Auth.
  - Criada e enviada a branch `feature/colaborador-imagens` contendo upload e anexação de imagens em notícias, exercícios PBL e no editor inline `EditableBlock.jsx`.
- **In-Progress:** Nenhum.
- **Blockers:** Nenhum.

## Decisions Made (Locked)
- **Isolamento de Funcionalidades:** Novas funcionalidades de colaboradores devem ser desenvolvidas em branch separada (`feature/colaborador-imagens`) para não afetar o ambiente principal de produção.
- **Upload Híbrido de Imagens:** Suporte a arquivos locais (convertidos em Data URL Base64) e links externos de imagem (`http://` / `https://`).
- **Persistência Imediata no Login:** O progresso do aluno acumulado em LocalStorage é mesclado e gravado imediatamente no Supabase no momento em que o login é efetuado.

## Failed Approaches / Dead Ends (Do Not Retry)
- **Sufixo `/rest/v1/` na `VITE_SUPABASE_URL`:** Não incluir `/rest/v1/` no `.env`, pois o SDK `@supabase/supabase-js` concatena a rota automaticamente, gerando chamadas duplicadas `/rest/v1/rest/v1/`.
- **Listar `auth.users` via Anon Key:** A chave pública `anon` é bloqueada por RLS para proteger a enumeração de usuários. Acesso administrativo exige `service_role_key`.

## Extracted Memories & Preferences
- **Regra de Ouro (AGENTS.md):** Proibição estrita de emojis em todo o repositório, respostas de chat e documentação. Usar apenas ícones SVG / `BfaIcon`.
- **Auto-Sync:** Sempre rodar a sincronização remota com `auto_sync.py` ao concluir alterações no repositório.

## Immediate Next Step
- Avaliar a branch `feature/colaborador-imagens` para aprovação e eventual merge na branch `main`.
