// URL principal do projeto Supabase
const BFA_SUPABASE_URL = 'https://wvcjjwvauibsculmqhxi.supabase.co';

// Chave pública "anon public"
const BFA_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Y2pqd3ZhdWlic2N1bG1xaHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTUyMjQsImV4cCI6MjEwMTc5MTIyNH0.xz3GQidAn0T2_SkkvygmOvsHW9em_YgMHpfukXTmCHw';

function sanitizeSupabaseUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let clean = url.trim();
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  clean = clean.replace(/\/+$/, '');
  return clean;
}

function sanitizeSupabaseKey(key) {
  if (!key || typeof key !== 'string') return '';
  return key.trim().replace(/[\r\n\s]+/g, '');
}

const rawUrl = localStorage.getItem('BFA_VITE_SUPABASE_URL') || BFA_SUPABASE_URL || '';
const rawKey = localStorage.getItem('BFA_VITE_SUPABASE_ANON_KEY') || BFA_SUPABASE_ANON_KEY || '';

export const VITE_SUPABASE_URL = sanitizeSupabaseUrl(rawUrl);
export const VITE_SUPABASE_ANON_KEY = sanitizeSupabaseKey(rawKey);

if (typeof localStorage !== 'undefined') {
  const storedUrl = localStorage.getItem('BFA_VITE_SUPABASE_URL');
  if (storedUrl && storedUrl !== VITE_SUPABASE_URL) {
    localStorage.setItem('BFA_VITE_SUPABASE_URL', VITE_SUPABASE_URL);
  }
  const storedKey = localStorage.getItem('BFA_VITE_SUPABASE_ANON_KEY');
  if (storedKey && storedKey !== VITE_SUPABASE_ANON_KEY) {
    localStorage.setItem('BFA_VITE_SUPABASE_ANON_KEY', VITE_SUPABASE_ANON_KEY);
  }
}
