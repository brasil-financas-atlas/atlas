-- ==========================================================================
-- Brasil Finanças Atlas (BFA) — Esquema de Banco de Dados PostgreSQL / Supabase
-- Copie e cole este script no SQL Editor do seu projeto Supabase
-- ==========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TIPOS ENUM
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'teacher', 'collaborator', 'admin_chief', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE comment_status AS ENUM ('published', 'hidden', 'flagged');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABELA DE PERFIS DE USUÁRIOS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    school_class TEXT,
    birth_date DATE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. TABELA DE PROGRESSO POR AULA
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMPTZ,
    time_spent_seconds INT DEFAULT 0 NOT NULL,
    last_video_position_seconds FLOAT DEFAULT 0.0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

-- 4. TABELA DE HISTÓRICO DE QUIZZES
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    score INT NOT NULL,
    max_score INT NOT NULL,
    percentage NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((score::numeric / NULLIF(max_score, 0)) * 100, 2)) STORED,
    answers_json JSONB,
    attempt_number INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. TABELA DE FÓRUM & COMENTÁRIOS DE AULAS
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    video_timestamp_seconds FLOAT DEFAULT 0.0,
    status comment_status DEFAULT 'published'::comment_status NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. TABELA DE CERTIFICADOS EMITIDOS
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_key TEXT NOT NULL,
    module_slug TEXT NOT NULL,
    verification_code TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    pdf_url TEXT,
    CONSTRAINT unique_user_subject_module UNIQUE (user_id, subject_key, module_slug)
);

-- 7. TABELA DE EDIÇÕES PENDENTES (FLUXO DE APROVAÇÃO COLABORADOR -> ADMIN CHIEF)
CREATE TABLE IF NOT EXISTS public.pending_edits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    resource_type TEXT NOT NULL, -- 'lesson', 'quiz', 'video', 'news', 'override'
    resource_id TEXT NOT NULL,
    changes_json JSONB NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'approved', 'rejected'
    reviewed_by UUID REFERENCES public.profiles(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. REGRAS DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_edits ENABLE ROW LEVEL SECURITY;

-- Políticas Profiles
DROP POLICY IF EXISTS "Leitura pública de perfis básicos" ON public.profiles;
CREATE POLICY "Leitura pública de perfis básicos" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Usuário atualiza apenas seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuário atualiza apenas seu próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas Lesson Progress
DROP POLICY IF EXISTS "Aluno lê apenas seu próprio progresso" ON public.lesson_progress;
CREATE POLICY "Aluno lê apenas seu próprio progresso" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Aluno salva seu próprio progresso" ON public.lesson_progress;
CREATE POLICY "Aluno salva seu próprio progresso" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Aluno atualiza seu próprio progresso" ON public.lesson_progress;
CREATE POLICY "Aluno atualiza seu próprio progresso" ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- Políticas Comments
DROP POLICY IF EXISTS "Leitura pública de comentários publicados" ON public.comments;
CREATE POLICY "Leitura pública de comentários publicados" ON public.comments FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Aluno cria comentário autenticado" ON public.comments;
CREATE POLICY "Aluno cria comentário autenticado" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas Certificates
DROP POLICY IF EXISTS "Validação pública de certificado via código" ON public.certificates;
CREATE POLICY "Validação pública de certificado via código" ON public.certificates FOR SELECT USING (true);

-- Políticas Pending Edits
DROP POLICY IF EXISTS "Colaboradores criam edições pendentes" ON public.pending_edits;
CREATE POLICY "Colaboradores criam edições pendentes" ON public.pending_edits FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Leitura de edições pendentes para autenticados" ON public.pending_edits;
CREATE POLICY "Leitura de edições pendentes para autenticados" ON public.pending_edits FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Chief atualiza status de aprovação" ON public.pending_edits;
CREATE POLICY "Admin Chief atualiza status de aprovação" ON public.pending_edits FOR UPDATE USING (auth.role() = 'authenticated');

-- ÍNDICES DE DESEMPENHO
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_lesson ON public.quiz_attempts(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_comments_lesson ON public.comments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(verification_code);
CREATE INDEX IF NOT EXISTS idx_pending_edits_status ON public.pending_edits(status);
