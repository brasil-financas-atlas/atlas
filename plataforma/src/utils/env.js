/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Endereço e chave pública do Supabase

   PREENCHA OS DOIS VALORES ABAIXO. Onde achar:
     painel do Supabase -> Project Settings -> API
       - "Project URL"        -> BFA_SUPABASE_URL
       - "anon" / "public"    -> BFA_SUPABASE_ANON_KEY

   ---------------------------------------------------------------------------
   "Mas não é perigoso deixar a chave no código?"

   Não, e é importante entender por quê, porque a intuição aqui engana.

   A chave `anon` é PROJETADA para ser pública. Ela vai no navegador de todo
   visitante em qualquer aplicação Supabase — não existe jeito de esconder algo
   que o navegador precisa usar. Ela não dá permissão nenhuma por si só: só
   identifica o projeto. Quem decide o que cada pessoa pode ler e escrever são
   as políticas de RLS no banco (ver `src/data/schema.sql`).

   A chave que NUNCA pode aparecer aqui é a `service_role`, que ignora todo o
   RLS. Ela é de servidor. Se ela algum dia entrar neste arquivo, o banco
   inteiro fica aberto — leitura, escrita e exclusão, para qualquer visitante.

   Regra curta: `anon` neste arquivo, sim. `service_role`, jamais.
   ---------------------------------------------------------------------------

   Por que aqui e não no localStorage: o site é estático e a chave precisa
   existir para TODO visitante. Se ela ficasse guardada por navegador, o banco
   funcionaria só na máquina de quem digitou — foi o que aconteceu antes, e o
   motivo de `isConfigured()` retornar false em produção.
   ========================================================================== */

const BFA_SUPABASE_URL = '';       // ex: 'https://abcdefghijklm.supabase.co'
const BFA_SUPABASE_ANON_KEY = '';  // a chave "anon public", começa com eyJ...

/* A partir daqui não precisa mexer.
   A ordem de precedência permite sobrepor os valores acima no navegador
   (localStorage) quando alguém quiser testar contra outro projeto Supabase,
   sem editar arquivo. */
window.VITE_SUPABASE_URL =
  window.VITE_SUPABASE_URL ||
  localStorage.getItem('BFA_VITE_SUPABASE_URL') ||
  BFA_SUPABASE_URL ||
  '';

window.VITE_SUPABASE_ANON_KEY =
  window.VITE_SUPABASE_ANON_KEY ||
  localStorage.getItem('BFA_VITE_SUPABASE_ANON_KEY') ||
  BFA_SUPABASE_ANON_KEY ||
  '';

if (!window.VITE_SUPABASE_URL || !window.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    '[BFA] Supabase sem configuração: preencha BFA_SUPABASE_URL e ' +
    'BFA_SUPABASE_ANON_KEY em src/utils/env.js. Sem isso, login, progresso ' +
    'do aluno e publicação de conteúdo ficam desligados.'
  );
}
