# 🚀 PLANO DE ARQUITETURA DE BACKEND, AUTENTICAÇÃO E BANCO DE DADOS (CUSTO ZERO / MÍNIMO)
**Plataforma Brasil Finanças Atlas (BFA)** — *EEMTI Dragão do Mar / NIF*

---

## 1. DIAGNÓSTICO DO ESTADO ATUAL

### 1.1 Mapeamento da Arquitetura Vigente
Atualmente, o projeto opera em um modelo híbrido **Client-Side Storage + Git-as-a-CMS**:

1. **Estado do Aluno (Client-Side / LocalStorage)**:
   - Gerenciado via [ProgressContext.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/context/ProgressContext.jsx).
   - `bfa_user_progress`: Array de IDs de aulas concluídas.
   - `bfa_quiz_scores`: Objeto com notas de quizzes indexadas por `lessonId`.
   - `bfa_video_comments`: Objeto local armazenando comentários e respostas feitos pelo usuário no vídeo.
   - `bfa_student_name`: String com o nome informado no componente [CertificadoGenerator.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/CertificadoGenerator.jsx).

2. **Gestão de Conteúdo Pedagógico (Git-as-a-CMS)**:
   - Gerenciado via [AdminContext.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/context/AdminContext.jsx), [githubSync.js](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/utils/githubSync.js) e pelo script daemon local [auto_sync.py](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/auto_sync.py).
   - O arquivo `overrides.json` atua como a única fonte de verdade para modificações em textos, vídeos e exercícios feitas pelos professores.

### 1.2 Limitações Críticas Identificadas
* **Ausência de Sincronização Cross-Device**: Se o estudante iniciar uma aula no celular e acessar pelo computador da escola, seu progresso, notas e comentários não estarão visíveis.
* **Vulnerabilidade a Perda de Dados**: A limpeza de cache/cookies do navegador apaga todo o histórico acadêmico do aluno.
* **Isolamento Comunitário**: Os comentários de dúvidas sobre as aulas ficam restritos ao próprio navegador do aluno; outros alunos e professores não conseguem ler nem responder em rede.
* **Falta de Autenticação Autêntica & Emissão Frágil de Certificados**: Qualquer visitante pode preencher qualquer nome e gerar um hash de certificado no frontend (gerado via algoritmo JS determinístico local), sem um backend capaz de validar publicamente a autenticidade acadêmica.
* **Inexistência de Analytics Pedagógico**: O NIF (Núcleo de Inteligência Financeira) não possui visibilidade consolidada sobre taxa de retenção de alunos, tempo médio por aula ou desempenho geral nos quizzes.

---

## 2. MODELO DE DADOS E ENTIDADES (DATABASE SCHEMA SQL)

Para transicionar do LocalStorage para um banco relacional escalável com custo zero, definimos o seguinte esquema PostgreSQL (compatível com Supabase / Cloudflare D1):

```sql
-- Habilita extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE PERFIS DE USUÁRIOS (Alunos, Professores e Admins)
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    school_class TEXT, -- Ex: "3º Ano A - EEMTI Dragão do Mar"
    birth_date DATE, -- Requisito LGPD para verificação de menor de idade
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. TABELA DE PROGRESSO POR AULA
CREATE TABLE public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL, -- Ex: "financas-modulo-1-aula-1"
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMPTZ,
    time_spent_seconds INT DEFAULT 0 NOT NULL,
    last_video_position_seconds FLOAT DEFAULT 0.0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

-- 3. TABELA DE HISTÓRICO DE QUIZZES
CREATE TABLE public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    score INT NOT NULL,
    max_score INT NOT NULL,
    percentage NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((score::numeric / NULLIF(max_score, 0)) * 100, 2)) STORED,
    answers_json JSONB, -- Armazena as respostas detalhadas marcadas pelo aluno
    attempt_number INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. TABELA DE FÓRUM & COMENTÁRIOS DE AULAS
CREATE TYPE comment_status AS ENUM ('published', 'hidden', 'flagged');

CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- Suporte a respostas encadeadas (threads)
    content TEXT NOT NULL,
    video_timestamp_seconds FLOAT DEFAULT 0.0, -- Minuto do vídeo a que o comentário se refere
    status comment_status DEFAULT 'published'::comment_status NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. TABELA DE CERTIFICADOS EMITIDOS
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_key TEXT NOT NULL, -- Ex: "financas" ou "matematica"
    module_slug TEXT NOT NULL,  -- Ex: "modulo-1"
    verification_code TEXT UNIQUE NOT NULL, -- Ex: "BFA-2026-FIN1-9A8C7F"
    student_name TEXT NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    pdf_url TEXT,
    CONSTRAINT unique_user_subject_module UNIQUE (user_id, subject_key, module_slug)
);

-- 6. TABELA DE OVERRIDES DO CMS (Sincronizada com Git-as-a-CMS)
CREATE TABLE public.cms_overrides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_key TEXT UNIQUE NOT NULL, -- "overrides_global"
    override_data JSONB NOT NULL,
    updated_by UUID REFERENCES public.profiles(id),
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ÍNDICES DE PERFORMANCE
CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX idx_quiz_attempts_user_lesson ON public.quiz_attempts(user_id, lesson_id);
CREATE INDEX idx_comments_lesson ON public.comments(lesson_id);
CREATE INDEX idx_certificates_code ON public.certificates(verification_code);
```

---

## 3. ESTRATÉGIAS DE BACKEND DE CUSTO ZERO / MÍNIMO (COMPARATIVO E ARQUITETURA SELECIONADA)

### 3.1 Quadro Comparativo de Soluções BaaS Serverless Gratuitas

| Critério | Supabase (Free Tier) | Cloudflare Workers + D1 | PocketBase (Oracle Free VPS) | Firebase (Free Tier) |
| :--- | :--- | :--- | :--- | :--- |
| **Banco de Dados** | PostgreSQL completo | SQLite serverless at edge | SQLite embarcado | Firestore (NoSQL Documental) |
| **Armazenamento DB** | 500 MB | 5 GB (10x maior que Supabase) | Até 200 GB (depende do disco) | 1 GB |
| **Usuários Ativos (MAU)**| 50.000 MAU grátis | Sem limite explícito de MAU | Sem limite (limitado por RAM) | 50.000 MAU |
| **Pausa por Inatividade**| Pausa após 7 dias sem acessos | **Zero-Pause** (sempre ativo) | **Zero-Pause** (sempre ativo) | **Zero-Pause** (sempre ativo) |
| **Autenticação Nativa** | Sim (Email, OAuth, MagicLink)| Requer Lucia Auth / JWT Custom | Sim (Email, OAuth, Admin) | Sim (Email, Google, Phone) |
| **Segurança / RLS** | Row Level Security no DB | Regras via Worker Code | Rules via SQL-like UI | Security Rules NoSQL |
| **Dificuldade de DevOps**| Baixa (PaaS pronta) | Média (Wrangler CLI) | Alta (Setup Nginx, Docker, SSL) | Baixa |
| **Latência no Brasil** | Boa (São Paulo `sa-east-1`) | **Excelente** (Edge Fortaleza) | Boa (Depende da região VPS) | Boa |

### 3.2 Arquitetura Híbrida Recomendada (Git-as-a-CMS + Supabase BaaS / Cloudflare D1)

A recomendação estratégica para o BFA é adotar o **Modelo Híbrido**:

```
+-----------------------------------------------------------------------------------------+
|                                ARQUITETURA HÍBRIDA BFA                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [ CONTEÚDO ESTÁTICO DE AULAS ]                      [ DADOS DINÂMICOS DE ALUNOS ]       |
|  Git-as-a-CMS + GitHub REST API                     Supabase Free Tier / Cloudflare D1  |
|  Hosting: Netlify / Cloudflare Pages                 Engine: PostgreSQL / SQLite Edge  |
|  - Textos das Aulas (Markdown)                       - Auth (Alunos & Professores)      |
|  - Vídeos e Quizzes Fixos                            - Progresso (completedLessons)     |
|  - overrides.json                                    - Comentários Fórum em Tempo Real  |
|                                                      - Certificados Autênticos (QR)     |
|  Custo: R$ 0,00/mês                                  Custo: R$ 0,00/mês                 |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4. SEGURANÇA DE DADOS & COMPLIANCE (RLS & LGPD)

### 4.1 Regras de Row Level Security (RLS) no PostgreSQL / Supabase

```sql
-- Ativa RLS em todas as tabelas sensíveis
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA PROFILES
CREATE POLICY "Leitura pública de perfis básicos" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Usuário atualiza apenas seu próprio perfil" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- POLÍTICAS PARA LESSON_PROGRESS
CREATE POLICY "Aluno lê apenas seu próprio progresso" ON public.lesson_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Aluno salva seu próprio progresso" ON public.lesson_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Aluno atualiza seu próprio progresso" ON public.lesson_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- POLÍTICAS PARA COMMENTS
CREATE POLICY "Leitura pública de comentários publicados" ON public.comments
    FOR SELECT USING (status = 'published');

CREATE POLICY "Aluno cria comentário autenticado" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Aluno edita seu próprio comentário" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);

-- POLÍTICAS PARA CERTIFICATES
CREATE POLICY "Validação pública de certificado via código" ON public.certificates
    FOR SELECT USING (true);

CREATE POLICY "Emissão restrita a backend/aluno concluinte" ON public.certificates
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 4.2 Requisitos da LGPD para Estudantes Menores de Idade
De acordo com o **Artigo 14 da Lei nº 13.709/2018 (LGPD)**:
1. **Coleta Mínima**: O cadastro exige apenas Nome Completo, E-mail e Escola/Turma. Não são solicitados CPF, RG, telefone ou endereço residencial.
2. **Consentimento e Uso Escolar**: O tratamento de dados ocorre estritamente para acompanhamento educacional e emissão de certificados acadêmicos.
3. **Direito ao Esquecimento & Exclusão**: É disponibilizada uma rota para o aluno baixar todos os seus dados em formato JSON e solicitar o encerramento da conta com deleção em cascata (`ON DELETE CASCADE`).
4. **Anonimização para Pesquisas**: Relatórios pedagógicos gerados para o NIF Dragão do Mar utilizam agregações sem identificadores pessoais.

---

## 5. COMANDOS DE BUILD & DEPLOY (DESENVOLVIMENTO & PRODUÇÃO)

### 5.1 Execução do Servidor Local
Para executar e testar a plataforma localmente:
- **Comando de Desenvolvimento Local**: `npx -y http-server plataforma -p 8080` (Acesse `http://localhost:8080`).

### 5.2 Comandos de Build & Deploy em Produção
- **Comando de Build (Netlify / Vercel / Cloudflare Pages)**:
  - *Build Command*: `echo "Zero-build SPA ready"` (ou em branco).
  - *Publish Directory*: `plataforma`
- **Comando de Deploy Manual (CLI Netlify/Vercel)**:
  - Netlify: `npx netlify-cli deploy --dir=plataforma --prod`
  - Vercel: `npx vercel --cwd plataforma --prod`

---

*Documento gerado para orientação das equipes de Engenharia, Design e Pedagógica da Plataforma Brasil Finanças Atlas (BFA).*
