# Plan: Sistema de Login e Sincronização de Progresso de Alunos no Supabase

- **ID / Slug**: `supabase-student-auth-sync`
- **Status**: `done`
- **Created**: 2026-09-03
- **Target Component / Scope**: `src/utils/`, `src/context/`, `src/components/`, `docs/`

## 1. Goal & Context
- **Goal**: Implementar autenticação de alunos (Passwordless/Magic Link/OTP) e sincronização local-first de progresso com consumo mínimo de armazenamento (< 1 KB por aluno em JSONB) e blindagem RLS.
- **Why it matters**: Permite que estudantes acessem seu progresso em múltiplos dispositivos sem custo de infraestrutura no Supabase e com total conformidade com a LGPD.
- **Non-Goals**: Criação de tabelas relacionais de telemetria por clique ou relatórios de monitoramento invasivo.

## 2. Architectural Approach & MVP Choice
- **Recommended Approach**: Modelo Single-Table (`student_profiles`) com coluna `progress JSONB`, RLS restrito a `auth.uid() = id`, `useStudentAuth.js` com debounce de 3s e mesclagem LocalStorage.
- **MVP Version**: Login por e-mail/código OTP e persistência de `completed_lessons` e `quiz_scores`.

## 3. Atomic Implementation Tasks

- [x] **Step 1: Especificação Técnica e Script SQL em docs/**
  - **Files**: `docs/seguranca_e_login_supabase.md`
  - **Action**: Criar documentação completa de arquitetura, schema SQL, RLS, cálculo de footprint e hook.
  - **Verification**: Arquivo criado e formatado.

- [x] **Step 2: Criar Hook React useStudentAuth.js**
  - **Files**: `src/utils/useStudentAuth.js`
  - **Action**: Implementar lógica de autenticação, recuperação de sessão, mesclagem e debounce.
  - **Verification**: Validar compilação Babel via `scratch/test_babel.js`.

- [x] **Step 3: Integrar useStudentAuth com ProgressContext.jsx**
  - **Files**: `src/context/ProgressContext.jsx`
  - **Action**: Conectar `toggleLessonComplete` e `saveQuizScore` ao dispatcher de sincronização.
  - **Verification**: Testar ciclo de persistência e eventos de atualização.

- [x] **Step 4: Criar Modal de Login de Aluno na Navbar**
  - **Files**: `src/components/NavbarFooter.jsx`
  - **Action**: Adicionar botão "Entrar / Meu Perfil" com modal de E-mail/OTP e indicador de status de sincronização.
  - **Verification**: Testar renderização e compilação limpa.

- [x] **Step 5: Sincronização e Deploy**
  - **Files**: `plataforma/`, `index.html`, `sw.js`
  - **Action**: Copiar para plataforma, incrementar cache e fazer deploy em gh-pages.
  - **Verification**: Sincronização confirmada com 0 erros.

## 4. Acceptance Criteria & Definition of Done (DoD)
- [x] Schema SQL validado com RLS ativado e triggers automáticos.
- [x] Footprint por aluno inferior a 1 KB no banco de dados.
- [x] Zero erros de compilação no Babel Standalone (34 scripts validados).
- [x] Conformidade LGPD com coleta mínima (apenas e-mail e nome).

## 5. Risks & Mitigation
- **Risk**: Falha de rede durante o envio de progresso ao Supabase.
- **Mitigation**: Estratégia Local-First garante persistência imediata no LocalStorage com sincronização automática na reconexão.
