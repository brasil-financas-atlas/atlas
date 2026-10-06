// Gera os modelos de e-mail de autenticacao do Supabase com a marca BRHSIC Academy.
// Uso: node supabase/templates/gerar.mjs   (escreve os .html nesta pasta)
// Depois aplique com: node supabase/templates/aplicar.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const LOGO = 'https://brhsic-main.vercel.app/brand/brhsic-lockup.png';
const SITE = 'https://atlas-c2i.pages.dev';

const C = {
  ink: '#001F37',
  navy: '#002B4D',
  blue: '#00A6DF',
  paper: '#EEF6FC',
  line: '#C0CDD5',
  muted: '#4C5A67',
  bg: '#F4F8FC',
};

const FONT = "'Figtree', 'Segoe UI', Helvetica, Arial, sans-serif";

function botao(texto) {
  return `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 28px 0 8px;">
            <tr>
              <td style="border-radius: 8px; background: ${C.navy};">
                <a href="{{ .ConfirmationURL }}" target="_blank"
                   style="display: inline-block; padding: 14px 28px; font-family: ${FONT}; font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 8px;">
                  ${texto}
                </a>
              </td>
            </tr>
          </table>`;
}

function codigo(rotulo) {
  return `
          <p style="margin: 24px 0 8px; font-family: ${FONT}; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: ${C.muted};">${rotulo}</p>
          <div style="display: inline-block; padding: 14px 22px; border-radius: 10px; background: ${C.paper}; border: 1px solid ${C.line}; font-family: 'IBM Plex Mono', Consolas, monospace; font-size: 28px; font-weight: 700; letter-spacing: 0.3em; color: ${C.ink};">{{ .Token }}</div>`;
}

function linkReserva() {
  return `
          <p style="margin: 20px 0 0; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${C.muted};">
            Se o botão não funcionar, copie e cole este endereço no navegador:<br>
            <a href="{{ .ConfirmationURL }}" style="color: ${C.blue}; word-break: break-all;">{{ .ConfirmationURL }}</a>
          </p>`;
}

function layout({ preheader, titulo, corpo, aviso }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>${titulo}</title>
</head>
<body style="margin: 0; padding: 0; background: ${C.bg};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: ${C.bg};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px;">
          <tr>
            <td style="padding: 0 4px 20px;">
              <a href="${SITE}" target="_blank"><img src="${LOGO}" alt="BRHSIC Academy" height="32" style="display: block; height: 32px; width: auto; border: 0; font-family: ${FONT}; font-size: 20px; font-weight: 800; color: ${C.ink}; text-decoration: none;"></a>
            </td>
          </tr>
          <tr>
            <td style="background: #FFFFFF; border: 1px solid ${C.line}; border-radius: 14px; overflow: hidden;">
              <div style="height: 4px; background: ${C.blue}; line-height: 4px; font-size: 0;">&nbsp;</div>
              <div style="padding: 32px 32px 28px;">
                <h1 style="margin: 0 0 12px; font-family: ${FONT}; font-size: 22px; line-height: 1.3; font-weight: 800; color: ${C.ink};">${titulo}</h1>
${corpo}
              </div>
              <div style="padding: 16px 32px; background: ${C.paper}; border-top: 1px solid ${C.line};">
                <p style="margin: 0; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${C.muted};">${aviso}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 4px 0; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${C.muted};">
              BRHSIC Academy · Educação financeira gratuita, feita por jovens.<br>
              <a href="${SITE}" style="color: ${C.muted};">atlas-c2i.pages.dev</a> · <a href="https://brhsic.com" style="color: ${C.muted};">brhsic.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

const p = (t) => `          <p style="margin: 0 0 12px; font-family: ${FONT}; font-size: 15px; line-height: 1.65; color: ${C.muted};">${t}</p>`;

const AVISO_PADRAO = 'Se você não fez este pedido, pode ignorar este e-mail com segurança. Nada muda na sua conta.';

// Chave = nome do modelo na API do Supabase (mailer_templates_<chave>_content).
export const MODELOS = {
  confirmation: {
    assunto: 'Confirme seu e-mail na BRHSIC Academy',
    html: layout({
      preheader: 'Falta um passo para salvar seu progresso nas 55 aulas.',
      titulo: 'Confirme seu e-mail',
      corpo: [
        p('Que bom ter você na BRHSIC Academy. Confirme seu e-mail para ativar a conta e salvar seu progresso nas aulas de matemática e finanças em qualquer aparelho.'),
        botao('Confirmar meu e-mail'),
        // Quem entra pela primeira vez pelo login sem senha recebe ESTE modelo,
        // e a tela pede o codigo de 6 digitos. Por isso o codigo tambem aparece aqui.
        codigo('Ou digite este código na tela de login'),
        linkReserva(),
      ].join('\n'),
      aviso: 'Se você não criou uma conta na BRHSIC Academy, ignore este e-mail.',
    }),
  },
  magic_link: {
    assunto: 'Seu código de acesso: {{ .Token }}',
    html: layout({
      preheader: 'Use o código ou o botão para entrar sem senha.',
      titulo: 'Seu acesso à BRHSIC Academy',
      corpo: [
        p('Use o código abaixo na tela de login ou clique no botão para entrar direto. Não precisa de senha.'),
        codigo('Código de acesso'),
        botao('Entrar na plataforma'),
        p('O código e o botão valem por pouco tempo e só podem ser usados uma vez.'),
      ].join('\n'),
      aviso: AVISO_PADRAO,
    }),
  },
  recovery: {
    assunto: 'Redefinir sua senha da BRHSIC Academy',
    html: layout({
      preheader: 'Crie uma nova senha para a sua conta.',
      titulo: 'Redefinir senha',
      corpo: [
        p('Recebemos um pedido para redefinir a senha da sua conta. Clique no botão para criar uma nova senha.'),
        botao('Criar nova senha'),
        linkReserva(),
      ].join('\n'),
      aviso: 'Se você não pediu para trocar a senha, ignore este e-mail. Sua senha atual continua valendo.',
    }),
  },
  email_change: {
    assunto: 'Confirme a troca de e-mail na BRHSIC Academy',
    html: layout({
      preheader: 'Confirme o novo endereço da sua conta.',
      titulo: 'Confirme seu novo e-mail',
      corpo: [
        p('Foi pedida a troca do e-mail da sua conta de <strong>{{ .Email }}</strong> para <strong>{{ .NewEmail }}</strong>. Clique no botão para confirmar.'),
        botao('Confirmar novo e-mail'),
        linkReserva(),
      ].join('\n'),
      aviso: 'Se você não pediu esta troca, ignore este e-mail e considere trocar sua senha.',
    }),
  },
  invite: {
    assunto: 'Você foi convidado para a BRHSIC Academy',
    html: layout({
      preheader: 'Aceite o convite e comece a estudar.',
      titulo: 'Você recebeu um convite',
      corpo: [
        p('Você foi convidado para participar da BRHSIC Academy, a plataforma gratuita de matemática financeira, mercado de capitais e preparação para a olimpíada BRHSIC.'),
        botao('Aceitar convite'),
        linkReserva(),
      ].join('\n'),
      aviso: 'Se você não esperava este convite, pode ignorar este e-mail.',
    }),
  },
  reauthentication: {
    assunto: 'Código de confirmação: {{ .Token }}',
    html: layout({
      preheader: 'Confirme que é você para continuar.',
      titulo: 'Confirme que é você',
      corpo: [
        p('Para concluir uma ação sensível na sua conta, digite o código abaixo na plataforma.'),
        codigo('Código de confirmação'),
      ].join('\n'),
      aviso: AVISO_PADRAO,
    }),
  },
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [nome, { html }] of Object.entries(MODELOS)) {
    writeFileSync(join(DIR, `${nome}.html`), html);
    console.log('gerado', `${nome}.html`);
  }
}
