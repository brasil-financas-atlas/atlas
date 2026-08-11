/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Configuração de Variáveis de Ambiente
   Permite injeção de credenciais do Supabase no ambiente de produção/desenvolvimento.
   ========================================================================== */

window.VITE_SUPABASE_URL = window.VITE_SUPABASE_URL || localStorage.getItem('BFA_VITE_SUPABASE_URL') || '';
window.VITE_SUPABASE_ANON_KEY = window.VITE_SUPABASE_ANON_KEY || localStorage.getItem('BFA_VITE_SUPABASE_ANON_KEY') || '';
