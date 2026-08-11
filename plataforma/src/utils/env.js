/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Configuração de Variáveis de Ambiente
   Permite injeção de credenciais do Supabase no ambiente de produção/desenvolvimento.
   ========================================================================== */

window.VITE_SUPABASE_URL = window.VITE_SUPABASE_URL || localStorage.getItem('https://wvcjjwvauibsculmqhxi.supabase.co/rest/v1/') || '';
window.VITE_SUPABASE_ANON_KEY = window.VITE_SUPABASE_ANON_KEY || localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Y2pqd3ZhdWlic2N1bG1xaHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTUyMjQsImV4cCI6MjEwMTc5MTIyNH0.xz3GQidAn0T2_SkkvygmOvsHW9em_YgMHpfukXTmCHw') || '';
