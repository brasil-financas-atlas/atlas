-- ==========================================================================
-- Correcoes do banco (diagnostico de 2026-11-21). REVISAR ANTES DE APLICAR.
-- Aplicar no SQL Editor do Supabase (projeto wvcjjwvauibsculmqhxi) ou com
-- `supabase db push`. Tudo esta em uma transacao e pode ser reexecutado.
--
-- 1. O trigger on_auth_user_created chama criar_perfil_aluno(), que insere
--    em public.student_profiles. Essa tabela NAO existe no banco, entao
--    todo cadastro novo (senha, codigo por e-mail ou Google) falha com
--    "Database error saving new user". Remove-se esse insert.
-- 2. A politica "Cada um edita o proprio perfil" deixa qualquer aluno
--    trocar o proprio campo role (inclusive para admin_chief) pelo cliente.
--    Um trigger passa a manter o papel antigo quando quem altera nao e
--    admin_chief. Nao gera erro, para nao quebrar os upserts do site.
-- 3. publish_history usa e-mails fixos na politica; passa a usar o papel.
-- 4. site_content tem duas politicas SELECT identicas; remove a duplicada.
-- ==========================================================================
begin;

-- 1. Criacao de perfil no cadastro --------------------------------------
create or replace function public.criar_perfil_aluno()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(lower(new.email), ''),
    coalesce(
      nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
      nullif(trim(new.raw_user_meta_data->>'name'), ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Estudante'
    ),
    'student'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- O trigger ja existe e aponta para a funcao acima; recriado por garantia.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.criar_perfil_aluno();

-- Usuarios que ja existem sem perfil (hoje: 0) ganham um perfil de aluno.
insert into public.profiles (id, email, full_name, role)
select u.id,
       coalesce(lower(u.email), ''),
       coalesce(nullif(trim(u.raw_user_meta_data->>'full_name'), ''),
                nullif(trim(u.raw_user_meta_data->>'name'), ''),
                nullif(split_part(coalesce(u.email, ''), '@', 1), ''),
                'Estudante'),
       'student'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- 2. Papel protegido ----------------------------------------------------
create or replace function public.eh_admin_chefe()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin_chief'::user_role
  );
$$;

create or replace function public.proteger_papel_perfil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- auth.uid() nulo = chamada do servidor (service_role, SQL Editor): livre.
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.eh_admin_chefe() then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists proteger_papel_perfil on public.profiles;
create trigger proteger_papel_perfil
  before update on public.profiles
  for each row execute function public.proteger_papel_perfil();

-- 3. Historico de publicacao pelo papel, sem e-mails fixos ---------------
drop policy if exists "Super admins leem historico" on public.publish_history;
create policy "Admin chefe le historico" on public.publish_history
  for select using (public.eh_admin_chefe());

-- 4. Politica duplicada ------------------------------------------------
drop policy if exists "Qualquer um lê o conteúdo do site" on public.site_content;

commit;

-- Conferencia depois de aplicar:
--   select count(*) from auth.users u left join public.profiles p on p.id = u.id where p.id is null;  -- 0
--   select policyname from pg_policies where tablename in ('publish_history','site_content');
