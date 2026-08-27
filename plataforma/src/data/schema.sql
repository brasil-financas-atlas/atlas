-- ==========================================================================
-- Brasil Finanças Atlas (BFA) — Esquema do banco (PostgreSQL / Supabase)
--
-- Cole este arquivo inteiro no SQL Editor do projeto Supabase e execute.
-- Pode rodar mais de uma vez: tudo aqui é idempotente.
--
-- LEIA ANTES DE MEXER — a regra que explica quase todas as decisões daqui:
--
--   O RLS (Row Level Security) do Postgres filtra LINHA, não COLUNA.
--
-- "Este usuário pode mexer nesta linha" o RLS resolve. "Este usuário pode
-- mexer nesta coluna" ele NÃO resolve — para isso usa-se REVOKE de coluna.
-- Ignorar isso foi a origem de todos os furos da versão anterior: uma
-- política chamada "leitura pública de perfis básicos" liberava a tabela
-- inteira, incluindo e-mail; e a política de "atualiza o próprio perfil"
-- deixava o aluno escrever `role = 'admin'` na própria linha.
--
-- Outra regra que vale decorar:
--
--   RLS ligado + nenhuma política = tudo negado, em silêncio.
--
-- Era o caso de `quiz_attempts` antes: a tabela existia, o app tentava
-- gravar, e nada acontecia sem erro visível.
-- ==========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================================
-- 1. TIPOS
-- ==========================================================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'teacher', 'collaborator', 'admin_chief', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE comment_status AS ENUM ('published', 'hidden', 'flagged');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ==========================================================================
-- 2. TABELAS
-- ==========================================================================

-- Perfis. Espelha auth.users, criado por gatilho (seção 4).
--
-- NÃO guardamos data de nascimento. O projeto atende menores de idade, e a
-- plataforma não precisa da data para nada — o dado que não existe não vaza
-- e não gera obrigação de LGPD. Se um dia precisar de faixa etária para
-- métrica, guarde `serie_escolar`, que não identifica ninguém.
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    school_class TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Remove a coluna antiga em bancos que já rodaram a versão anterior.
ALTER TABLE public.profiles DROP COLUMN IF EXISTS birth_date;

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

-- `author_name` é gravado na linha de propósito (ver nota da seção 6): evita
-- precisar de uma visão pública de `profiles`, que permitiria listar alunos.
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL DEFAULT 'Aluno',
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    video_timestamp_seconds FLOAT DEFAULT 0.0,
    status comment_status DEFAULT 'published'::comment_status NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- `CREATE TABLE IF NOT EXISTS` não acrescenta coluna em tabela que já existe,
-- então bancos que rodaram a v1 precisam desta linha para ganhar o campo.
ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS author_name TEXT NOT NULL DEFAULT 'Aluno';

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

-- --------------------------------------------------------------------------
-- Conteúdo editável pelo site. Esta tabela é o que substitui o
-- `overrides.json` e, com ele, todo o fluxo de Personal Access Token: o admin
-- loga, edita, e a alteração vem para cá. Nenhuma credencial do GitHub no
-- navegador.
--
-- Por que uma linha só com JSON, em vez de uma tabela por tipo de conteúdo:
-- o app já trata todo o conteúdo editável como um objeto único (era
-- exatamente esse objeto que ia serializado para o `overrides.json`). Guardar
-- no mesmo formato troca só o destino — de arquivo no GitHub para linha no
-- banco — sem reescrever a área de administração e sem perder nenhum recurso
-- que já funciona (textos, vídeos, notícias, módulos, exercícios, fila de
-- aprovação).
--
-- Se um dia o conteúdo precisar de consulta por campo (ex.: "as 5 notícias
-- mais recentes" direto no banco), aí vale normalizar em tabelas próprias.
-- Enquanto o site lê tudo de uma vez no carregamento, JSONB é o certo.
--
-- O CHECK garante que exista no máximo uma linha.
-- --------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_content (
    id SMALLINT PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT apenas_uma_linha CHECK (id = 1)
);

INSERT INTO public.site_content (id, data) VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ==========================================================================
-- 3. FUNÇÃO DE PAPEL — o porteiro
--
-- Precisa ser SECURITY DEFINER por um motivo específico: ela consulta
-- `profiles`, e vai ser usada DENTRO de políticas de `profiles`. Sem
-- SECURITY DEFINER, checar a política dispararia a própria política, em
-- recursão infinita. O `search_path` fixo evita que alguém redirecione a
-- função para outra tabela.
-- ==========================================================================

CREATE OR REPLACE FUNCTION public.eh_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND role IN ('admin'::user_role, 'admin_chief'::user_role)
    );
$$;

REVOKE ALL ON FUNCTION public.eh_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.eh_admin() TO authenticated;

-- ==========================================================================
-- 4. CRIAÇÃO AUTOMÁTICA DE PERFIL NO CADASTRO
--
-- Sem isto o cadastro não funciona: `profiles` não tem política de INSERT
-- (de propósito — ninguém deve poder inventar perfil), então o perfil precisa
-- nascer de um gatilho com SECURITY DEFINER.
--
-- O papel nasce SEMPRE como 'student'. Promover a admin é ação manual, feita
-- no painel do Supabase por quem já é admin. É de propósito: quem se cadastra
-- não escolhe o próprio papel.
-- ==========================================================================

CREATE OR REPLACE FUNCTION public.criar_perfil_do_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''), split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ao_criar_usuario ON auth.users;
CREATE TRIGGER ao_criar_usuario
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.criar_perfil_do_usuario();

-- Mantém updated_at honesto sem depender do app.
CREATE OR REPLACE FUNCTION public.tocar_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DO $$
DECLARE t TEXT;
BEGIN
    FOREACH t IN ARRAY ARRAY['profiles','lesson_progress','comments','pending_edits','site_content']
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS tocar_updated_at ON public.%I', t);
        EXECUTE format(
            'CREATE TRIGGER tocar_updated_at BEFORE UPDATE ON public.%I
             FOR EACH ROW EXECUTE FUNCTION public.tocar_updated_at()', t);
    END LOOP;
END $$;

-- ==========================================================================
-- 5. VALIDAÇÃO PÚBLICA DE CERTIFICADO
--
-- A versão anterior fazia isso com `FOR SELECT USING (true)` em
-- `certificates`, o que libera a TABELA INTEIRA — não a linha do código
-- consultado. Quem quisesse baixava a lista de todos os certificados com os
-- nomes dos alunos.
--
-- Aqui a validação é uma função: recebe o código, devolve no máximo uma
-- linha, e só os campos que precisam aparecer num selo de validação. Sem
-- código na mão, não sai nada.
-- ==========================================================================

CREATE OR REPLACE FUNCTION public.validar_certificado(codigo TEXT)
RETURNS TABLE (student_name TEXT, subject_key TEXT, module_slug TEXT, issued_at TIMESTAMPTZ)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT c.student_name, c.subject_key, c.module_slug, c.issued_at
    FROM public.certificates c
    WHERE c.verification_code = codigo
    LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.validar_certificado(TEXT) FROM public;
GRANT EXECUTE ON FUNCTION public.validar_certificado(TEXT) TO anon, authenticated;

-- ==========================================================================
-- 6. MODERAÇÃO DE COMENTÁRIO
--
-- Por que uma função e não uma política: `authenticated` é um papel só, que
-- cobre aluno e admin igualmente. Permissão de coluna não distingue os dois,
-- então não existe "liberar `status` para admin e barrar para aluno" via
-- GRANT. Quem distingue papel é o RLS — mas o RLS não sabe QUAL coluna
-- mudou, e o autor tem direito de UPDATE na própria linha.
--
-- Saída: `status` fica revogado para todos (seção 8) e a moderação entra por
-- esta função, que confere `eh_admin()` antes de agir.
--
-- Nota sobre nome de quem comenta: NÃO existe visão pública de `profiles` de
-- propósito. Mesmo expondo só o nome, uma visão pública deixaria qualquer
-- pessoa listar todos os alunos da plataforma. Em vez disso, o nome de
-- exibição é gravado na própria linha do comentário (`author_name`), então
-- não há como enumerar usuário nenhum.
-- ==========================================================================

CREATE OR REPLACE FUNCTION public.moderar_comentario(comentario_id UUID, novo_status comment_status)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT public.eh_admin() THEN
        RAISE EXCEPTION 'Somente administrador pode moderar comentário';
    END IF;

    UPDATE public.comments SET status = novo_status WHERE id = comentario_id;
END;
$$;

REVOKE ALL ON FUNCTION public.moderar_comentario(UUID, comment_status) FROM public;
GRANT EXECUTE ON FUNCTION public.moderar_comentario(UUID, comment_status) TO authenticated;

-- ==========================================================================
-- 7. RLS — LIGA EM TUDO
-- ==========================================================================

ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_edits     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content     ENABLE ROW LEVEL SECURITY;

-- Garante que anon e authenticated possam acessar as tabelas, delegando o controle para o RLS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- ==========================================================================
-- 8. TRAVA DE COLUNA — o que impede aluno virar admin
--
-- Isto é a parte que o RLS não faz. A política de UPDATE autoriza a LINHA do
-- próprio usuário; a trava de coluna diz QUAIS CAMPOS dessa linha ele pode
-- escrever. Sem isto, uma requisição direta à API do Supabase com
-- `{"role":"admin"}` funcionaria.
--
-- ATENÇÃO À MECÂNICA, que é contraintuitiva: no Postgres, permissão de
-- coluna é ADITIVA, não subtrativa. Se o papel tem UPDATE na tabela inteira,
-- `REVOKE UPDATE (role)` não tira nada — o UPDATE amplo continua valendo. E
-- o Supabase concede no nível da tabela por padrão.
--
-- Então a ordem correta é: revogar o UPDATE da TABELA e depois conceder,
-- uma por uma, só as colunas que o usuário tem direito de escrever.
-- ==========================================================================

-- Perfil: o usuário mexe no nome, na turma e no avatar. Nada mais.
-- `role` fica de fora de propósito — promover admin é ação manual no SQL
-- Editor (seção 11), inclusive para quem já é admin.
REVOKE UPDATE ON public.profiles FROM anon, authenticated;
GRANT  UPDATE (full_name, school_class, avatar_url) ON public.profiles TO authenticated;

-- Comentário: o autor edita o texto. `status` fica fora, senão ele reabre um
-- comentário que a moderação escondeu. Moderar passa pela função
-- `moderar_comentario` da seção 5.
REVOKE UPDATE ON public.comments FROM anon, authenticated;
GRANT  UPDATE (content, is_edited, video_timestamp_seconds) ON public.comments TO authenticated;

-- Sugestão de edição: aqui a coluna pode ficar liberada, porque NENHUMA
-- política de UPDATE aceita não-admin nesta tabela — quem não é admin não
-- alcança linha nenhuma para escrever. Coluna liberada + linha barrada.
REVOKE UPDATE ON public.pending_edits FROM anon, authenticated;
GRANT  UPDATE (status, reviewed_by, review_notes) ON public.pending_edits TO authenticated;

-- ==========================================================================
-- 9. POLÍTICAS
-- ==========================================================================

-- ---------- profiles ----------
-- Cada um vê o próprio perfil. Admin vê todos (precisa, para métricas e
-- suporte). Nome público de quem comenta sai pela visão `perfis_publicos`.
DROP POLICY IF EXISTS "Leitura pública de perfis básicos" ON public.profiles; -- política insegura da v1
DROP POLICY IF EXISTS "Usuário atualiza apenas seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Cada um lê o próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Admin lê todos os perfis" ON public.profiles;
DROP POLICY IF EXISTS "Cada um edita o próprio perfil" ON public.profiles;

CREATE POLICY "Cada um lê o próprio perfil" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin lê todos os perfis" ON public.profiles
    FOR SELECT USING (public.eh_admin());

CREATE POLICY "Cada um edita o próprio perfil" ON public.profiles
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ---------- lesson_progress ----------
DROP POLICY IF EXISTS "Aluno lê apenas seu próprio progresso" ON public.lesson_progress;
DROP POLICY IF EXISTS "Aluno salva seu próprio progresso" ON public.lesson_progress;
DROP POLICY IF EXISTS "Aluno atualiza seu próprio progresso" ON public.lesson_progress;
DROP POLICY IF EXISTS "Admin lê todo o progresso" ON public.lesson_progress;

CREATE POLICY "Aluno lê apenas seu próprio progresso" ON public.lesson_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Aluno salva seu próprio progresso" ON public.lesson_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Aluno atualiza seu próprio progresso" ON public.lesson_progress
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin lê todo o progresso" ON public.lesson_progress
    FOR SELECT USING (public.eh_admin());

-- ---------- quiz_attempts ----------
-- A tabela tinha RLS ligado e ZERO políticas, ou seja: todo salvamento de
-- quiz falhava calado. Estas são as que faltavam.
DROP POLICY IF EXISTS "Aluno lê suas próprias tentativas" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Aluno registra sua própria tentativa" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin lê todas as tentativas" ON public.quiz_attempts;

CREATE POLICY "Aluno lê suas próprias tentativas" ON public.quiz_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Aluno registra sua própria tentativa" ON public.quiz_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin lê todas as tentativas" ON public.quiz_attempts
    FOR SELECT USING (public.eh_admin());

-- ---------- comments ----------
DROP POLICY IF EXISTS "Leitura pública de comentários publicados" ON public.comments;
DROP POLICY IF EXISTS "Aluno cria comentário autenticado" ON public.comments;
DROP POLICY IF EXISTS "Autor lê o próprio comentário" ON public.comments;
DROP POLICY IF EXISTS "Autor edita o texto do próprio comentário" ON public.comments;
DROP POLICY IF EXISTS "Autor apaga o próprio comentário" ON public.comments;
DROP POLICY IF EXISTS "Admin modera comentários" ON public.comments;

CREATE POLICY "Leitura pública de comentários publicados" ON public.comments
    FOR SELECT USING (status = 'published'::comment_status);

CREATE POLICY "Autor lê o próprio comentário" ON public.comments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Aluno cria comentário autenticado" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- O texto ele muda; `status` está bloqueado pelo REVOKE da seção 8.
CREATE POLICY "Autor edita o texto do próprio comentário" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Autor apaga o próprio comentário" ON public.comments
    FOR DELETE USING (auth.uid() = user_id OR public.eh_admin());

CREATE POLICY "Admin lê comentário escondido" ON public.comments
    FOR SELECT USING (public.eh_admin());
-- (não há política de UPDATE para admin aqui: mudar `status` passa pela
--  função `moderar_comentario`, pelo motivo explicado na seção 6.)

-- ---------- certificates ----------
-- Nada de leitura pública da tabela: validação por código passa pela função
-- `validar_certificado` da seção 5.
--
-- LIMITAÇÃO CONHECIDA: o INSERT abaixo deixa o aluno criar o próprio
-- certificado, e o banco não tem como conferir se ele concluiu o módulo
-- (falta o mapa módulo -> unidades no banco). Ou seja, certificado hoje é
-- lembrança, não credencial. Se um dia valer nota ou seleção, troque este
-- INSERT por uma função SECURITY DEFINER que confira `lesson_progress`.
DROP POLICY IF EXISTS "Validação pública de certificado via código" ON public.certificates;
DROP POLICY IF EXISTS "Aluno lê os próprios certificados" ON public.certificates;
DROP POLICY IF EXISTS "Aluno emite o próprio certificado" ON public.certificates;
DROP POLICY IF EXISTS "Admin lê todos os certificados" ON public.certificates;

CREATE POLICY "Aluno lê os próprios certificados" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Aluno emite o próprio certificado" ON public.certificates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin lê todos os certificados" ON public.certificates
    FOR SELECT USING (public.eh_admin());

-- ---------- pending_edits ----------
-- Na v1 a política de aprovação dizia `auth.role() = 'authenticated'`, que é
-- o papel do TOKEN e vale para todo mundo logado — não tem relação com
-- `profiles.role`. O nome prometia "Admin Chief"; a condição liberava
-- qualquer aluno. Agora o porteiro é `eh_admin()`.
DROP POLICY IF EXISTS "Colaboradores criam edições pendentes" ON public.pending_edits;
DROP POLICY IF EXISTS "Leitura de edições pendentes para autenticados" ON public.pending_edits;
DROP POLICY IF EXISTS "Admin Chief atualiza status de aprovação" ON public.pending_edits;
DROP POLICY IF EXISTS "Autor cria a própria sugestão" ON public.pending_edits;
DROP POLICY IF EXISTS "Autor lê as próprias sugestões" ON public.pending_edits;
DROP POLICY IF EXISTS "Admin lê todas as sugestões" ON public.pending_edits;
DROP POLICY IF EXISTS "Somente admin decide aprovação" ON public.pending_edits;

CREATE POLICY "Autor cria a própria sugestão" ON public.pending_edits
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autor lê as próprias sugestões" ON public.pending_edits
    FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Admin lê todas as sugestões" ON public.pending_edits
    FOR SELECT USING (public.eh_admin());

CREATE POLICY "Somente admin decide aprovação" ON public.pending_edits
    FOR UPDATE USING (public.eh_admin());

-- ---------- conteúdo do site ----------
-- Aqui `USING (true)` na leitura está CERTO, e é o único lugar do arquivo
-- onde está: isto é texto de página, feito para o mundo ler. Escrever, só
-- admin — e é exatamente essa política que substitui o token do GitHub.
DROP POLICY IF EXISTS "Leitura pública do conteúdo" ON public.site_content;
DROP POLICY IF EXISTS "Somente admin cria conteúdo" ON public.site_content;
DROP POLICY IF EXISTS "Somente admin altera conteúdo" ON public.site_content;

CREATE POLICY "Leitura pública do conteúdo" ON public.site_content
    FOR SELECT USING (true);

CREATE POLICY "Somente admin cria conteúdo" ON public.site_content
    FOR INSERT WITH CHECK (public.eh_admin());

CREATE POLICY "Somente admin altera conteúdo" ON public.site_content
    FOR UPDATE USING (public.eh_admin()) WITH CHECK (public.eh_admin());

-- ==========================================================================
-- 10. ÍNDICES
-- ==========================================================================

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user   ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user     ON public.quiz_attempts(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_comments_lesson        ON public.comments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code      ON public.certificates(verification_code);
CREATE INDEX IF NOT EXISTS idx_pending_edits_status   ON public.pending_edits(status);

-- ==========================================================================
-- 11. DEPOIS DE RODAR — CRIAR O PRIMEIRO ADMIN
--
-- Ninguém nasce admin, e não existe tela para virar admin. Então o primeiro
-- é promovido à mão, uma única vez:
--
--   1. No painel do Supabase: Authentication -> Users -> Add user.
--      Crie a conta com o e-mail do projeto e marque "Auto Confirm User".
--   2. Volte ao SQL Editor e rode, trocando o e-mail:
--
--        UPDATE public.profiles
--        SET role = 'admin'
--        WHERE email = 'coloque-o-email-aqui@exemplo.com';
--
--   3. Confira:
--
--        SELECT email, role FROM public.profiles ORDER BY created_at;
--
-- Daí em diante, promover alguém é sempre por aqui — de propósito. Se virar
-- botão na tela, volta a ser um caminho para escalar privilégio.
-- ==========================================================================
