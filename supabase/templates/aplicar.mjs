// Aplica os modelos de e-mail no projeto Supabase pela Management API.
// Precisa de um token pessoal: https://supabase.com/dashboard/account/tokens
//
//   SUPABASE_ACCESS_TOKEN=sbp_xxx node supabase/templates/aplicar.mjs
//   (opcional) --dry-run  mostra o que seria enviado sem alterar nada
import { MODELOS } from './gerar.mjs';

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'wvcjjwvauibsculmqhxi';
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const DRY = process.argv.includes('--dry-run');

const body = {};
for (const [nome, { assunto, html }] of Object.entries(MODELOS)) {
  body[`mailer_subjects_${nome}`] = assunto;
  body[`mailer_templates_${nome}_content`] = html;
}

if (DRY) {
  for (const k of Object.keys(body)) console.log(k, `(${body[k].length} caracteres)`);
  process.exit(0);
}

if (!TOKEN) {
  console.error('Defina SUPABASE_ACCESS_TOKEN (token pessoal do Supabase). Nada foi alterado.');
  process.exit(1);
}

const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`, {
  method: 'PATCH',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error('Falhou:', res.status, await res.text());
  process.exit(1);
}
console.log(`Modelos aplicados no projeto ${PROJECT_REF}:`, Object.keys(MODELOS).join(', '));
