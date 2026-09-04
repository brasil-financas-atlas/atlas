# Handoff Briefing

## Environment Metadata
- **Timestamp:** 2026-09-04T00:37:50-03:00
- **Git Branch:** `main` (e `gh-pages` sincronizado)
- **Last Commit:** `8b2a273 - fix(auth): make student auth resilient with automatic dual fallback to profiles and student_profiles`
- **Uncommitted Changes:** None (árvore de trabalho limpa)

## Goal & Objective
Implementação e validação completa do sistema de autenticação de alunos (Passwordless OTP / E-mail e Senha) com arquitetura de micro-armazenamento (< 1 KB por aluno em JSONB) no Supabase, unificação da tela de login (/login) para alunos e professores/admin, eliminação de botões mortos/quebrados na Home e Navbar, e implementação de resiliência com fallback adaptativo.

## Current Status
- **Completed in this session:**
  - `docs/seguranca_e_login_supabase.md`: Especificação técnica de arquitetura, segurança RLS, cálculo de footprint e conformidade LGPD.
  - `src/utils/useStudentAuth.js`: Hook React local-first com debounce de 3 segundos e suporte dual (lê e grava em `student_profiles` com fallback transparente para `profiles`/`lesson_progress`).
  - `src/pages/LoginPage.jsx`: Página de login unificada com 3 abas ("Aluno: Entrar", "Criar Conta", "Professor/Admin") e acesso sem senha por código OTP.
  - `src/context/ProgressContext.jsx`: Integração com o hook de autenticação para disparo automático de sincronização ao concluir aulas ou quizzes.
  - `src/components/NavbarFooter.jsx`: Remoção do botão barulhento de Admin quando deslogado, adição do botão "Entrar" com indicador de status de sincronização em tempo real e atalho no drawer mobile.
  - Correção de rotas e links: Card da Calculadora na Home corrigido para `#/calculadora-juros-compostos` e devidamente roteado em `src/App.jsx`.
  - Auditoria completa de links: `scratch/audit_all_internal_links.js` confirmou 0 links quebrados (44 rotas validadas).
  - Testes automatizados: `scratch/test_student_auth_db.js` (10/10 PASS) validando footprint < 1 KB, merge local-first e segurança RLS.
  - Compilação Babel Standalone: 35 arquivos React testados com 0 erros.
  - Deploy: Branches `main` e `gh-pages` sincronizadas no GitHub.
- **In-Progress:** None.
- **Blockers / Known Issues:** None.

## Decisions Made (Locked)
- **Micro-Storage Footprint (< 1 KB por Aluno):** Armazenamento em modelo Single-Table (`student_profiles`) com coluna `progress JSONB`, comportando mais de 500 mil estudantes ativos no plano gratuito de 500 MB do Supabase.
- **Unificação de Login:** Acesso de alunos e docentes centralizado em `#/login`, removendo o botão de Admin do cabeçalho público para manter o foco total no estudante.
- **Fallback Adaptativo Resiliente:** O hook `useStudentAuth.js` funciona imediatamente tanto com `student_profiles` (JSONB) quanto com o schema legado `profiles`/`lesson_progress`.
- **Proibição Estrita de Emojis:** Uso exclusivo de ícones vetoriais SVG (`BfaIcon` ou SVG inline) em toda a plataforma, chat e documentação.

## Failed Approaches & Anti-Patterns (Do Not Retry)
- **Normalização Excessiva de Progresso:** Criar tabelas relacionais separadas para cada evento/aula gera overhead de 10x em conexões e espaço em disco.
- **Exposição de Botão Admin como CTA Principal:** Distraía os visitantes e alunos na barra de navegação.

## Extracted User Preferences & Project Learnings
- O usuário preza por uma interface limpa, sem elementos que disputem a atenção desnecessariamente.
- A categorização de usuários (`role`) deve estar explícita (`'student'`, `'teacher'`, `'admin'`).

## Attention Routing (Key Pointers)
- **Active Plan File:** `.llms/plans/supabase-student-auth-sync.plan.md` (Status: `done`)
- **Plans Status Board:** `.llms/project/plans-status.md`
- **Primary Code Files:**
  - `src/pages/LoginPage.jsx`
  - `src/utils/useStudentAuth.js`
  - `src/components/NavbarFooter.jsx`
  - `src/App.jsx`
  - `src/data/schema.sql`

## Immediate Next Step
- No painel do Supabase, executar o script SQL da tabela `student_profiles` no SQL Editor para ativar a persistência nativa compacta JSONB.
