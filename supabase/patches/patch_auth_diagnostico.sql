-- ==========================================================================
-- Correcoes de login/cadastro (diagnostico de 2026-10-25)
-- Rodar no SQL Editor do painel do Supabase. Pode rodar mais de uma vez.
-- ==========================================================================

-- 1. eh_admin() so tinha EXECUTE para `authenticated`. As politicas de
--    `profiles`, `lesson_progress`, `quiz_attempts` e `pending_edits` chamam
--    essa funcao, entao qualquer consulta de visitante sem login (anon) falhava
--    com "permission denied for function eh_admin" (HTTP 401), em vez de voltar
--    vazia. A funcao e segura para anon: sem sessao, auth.uid() e nulo e ela
--    devolve false.
GRANT EXECUTE ON FUNCTION public.eh_admin() TO anon;

NOTIFY pgrst, 'reload schema';

-- ==========================================================================
-- 2. CONFERENCIAS (somente leitura). Rode cada uma e compare com o esperado.
-- ==========================================================================

-- 2a. Gatilhos em auth.users. Esperado: `ao_criar_usuario`
--     (criar_perfil_do_usuario). Se aparecer tambem `on_auth_user_created_student`
--     e a tabela public.student_profiles nao existir, o cadastro passa a falhar
--     com "Database error saving new user": nesse caso apague o gatilho extra:
--       DROP TRIGGER IF EXISTS on_auth_user_created_student ON auth.users;
-- SELECT tgname, tgenabled FROM pg_trigger
--  WHERE tgrelid = 'auth.users'::regclass AND NOT tgisinternal;

-- 2b. Usuarios cadastrados que nunca confirmaram o e-mail (nao conseguem
--     entrar enquanto nao confirmarem). Para liberar um aluno especifico:
--       UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = 'aluno@exemplo.com';
-- SELECT email, created_at, confirmation_sent_at, email_confirmed_at
--   FROM auth.users WHERE email_confirmed_at IS NULL ORDER BY created_at DESC;

-- 2c. Todo usuario do auth deve ter perfil. Esperado: nenhuma linha.
-- SELECT u.id, u.email FROM auth.users u
--   LEFT JOIN public.profiles p ON p.id = u.id WHERE p.id IS NULL;
