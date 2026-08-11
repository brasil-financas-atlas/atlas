# BACKEND & DATABASE SECURITY FIXES (Supabase / Cloudflare)

Este documento contém o passo a passo e os comandos necessários para corrigir as vulnerabilidades de backend e banco de dados identificadas na auditoria de Cibersegurança e Privacidade (LGPD/GDPR) do Brasil Finanças Atlas (BFA).

## 1. Habilitar RLS (Row Level Security) e Revisar Políticas no Supabase

Atualmente, o projeto utiliza a chave pública `anon` no frontend. Para garantir que dados não autorizados não sejam lidos ou alterados maliciosamente, o RLS deve ser restrito.

Execute as seguintes queries SQL no SQL Editor do seu projeto Supabase:

```sql
-- 1. Habilitar RLS nas tabelas essenciais (se ainda não estiver ativado)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_edits ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para 'lesson_progress' e 'quiz_attempts' (Usuários só podem ver e inserir o próprio progresso)
CREATE POLICY "Usuários veem o próprio progresso" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários modificam o próprio progresso" ON public.lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Usuários veem as próprias tentativas de quiz" ON public.quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários inserem as próprias tentativas de quiz" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Políticas para 'site_content' (Leitura pública, edição apenas para admins)
CREATE POLICY "Leitura pública do conteúdo" ON public.site_content
  FOR SELECT USING (true);

CREATE POLICY "Somente admins alteram o conteúdo" ON public.site_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'admin_chief')
    )
  );

-- 4. Políticas de 'profiles' (Visualizar próprio perfil)
CREATE POLICY "Ver próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
```

## 2. Implementação de Cookies Seguros (LGPD) em Vez de LocalStorage

No frontend, a biblioteca do Supabase guarda as sessões do usuário no `localStorage`. Isso vulnerabiliza os tokens JWT a ataques de Cross-Site Scripting (XSS).

**Passo a passo (Cloudflare Workers / SSR):**
Se a plataforma for movida para um ambiente SSR ou utilizar um API Gateway (ex: Cloudflare Workers), configure o cliente do Supabase para usar SSR com `HttpOnly`, `SameSite=Lax` e `Secure` cookies.

Exemplo no Worker (pseudocódigo):
```javascript
import { createServerClient } from '@supabase/ssr'

export function createClient(request, env) {
  return createServerClient(env.BFA_SUPABASE_URL, env.BFA_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        // parse cookies da request
      },
      setAll(cookiesToSet) {
        // definir cabeçalhos Set-Cookie na resposta com HttpOnly e Secure
      },
    },
  })
}
```
*(Se a plataforma for estritamente SPA, desative o acesso não autenticado a recursos essenciais e limite o tempo de expiração do JWT (exp) no painel do Supabase para <= 1 hora, mitigando o risk caso o token seja exposto em `localStorage`)*.

## 3. Rate Limiting com Cloudflare (Mitigação de DoS e Força Bruta)

Ataques de força bruta contra os endpoints de login do Supabase podem ser evitados aplicando regras de WAF no Cloudflare.

**Comando Wrangler ou Regras de Dashboard:**
No dashboard do Cloudflare, vá em **Security > WAF > Rate Limiting** e crie a regra:
- **If Request URL** contém `/auth/v1/token`
- **Rate Limit:** 5 requests por 1 minuto por IP.
- **Action:** Block.
