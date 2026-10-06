-- 1. Confirmar o e-mail do João Vitor automaticamente para ele conseguir logar
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email ILIKE '%joao%vitor%';

-- 2. Elevar o cargo dele para admin_chief na tabela profiles
UPDATE public.profiles 
SET role = 'admin_chief'::user_role 
WHERE id IN (
  SELECT id FROM auth.users WHERE email ILIKE '%joao%vitor%'
);
