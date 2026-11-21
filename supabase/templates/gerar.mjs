// Gera os modelos de e-mail de autenticacao do Supabase com a marca BRHSIC Academy.
// Uso: node supabase/templates/gerar.mjs   (escreve os .html nesta pasta)
// Depois aplique com: node supabase/templates/aplicar.mjs
//
// Regras de compatibilidade (Gmail, Outlook, Apple Mail, celular):
// - layout em tabelas e estilos inline; nada de flexbox, grid ou CSS externo;
// - cores chapadas (o projeto proibe gradientes) e nenhum emoji;
// - botao "a prova de balas": funciona mesmo com imagens bloqueadas;
// - o codigo {{ .Token }} aparece em texto, selecionavel para copiar.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const LOGO = 'https://brhsic-main.vercel.app/brand/brhsic-lockup.png';
const SITE = 'https://atlas-c2i.pages.dev';
const SITE_ROTULO = 'atlas-c2i.pages.dev';
const SUPORTE = 'brhsicacademy@gmail.com';

const C = {
  ink: '#0B1B2B',
  navy: '#002B4D',
  blue: '#0077B6',
  sky: '#00A6DF',
  paper: '#F1F6FA',
  line: '#D5DEE5',
  muted: '#52606D',
  soft: '#7B8794',
  bg: '#E9EFF4',
  white: '#FFFFFF',
};

const FONT = "'Figtree', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Consolas, 'Courier New', monospace";

const p = (t, extra = '') =>
  `<p style="margin: 0 0 14px; font-family: ${FONT}; font-size: 16px; line-height: 1.65; color: ${C.muted};${extra}">${t}</p>`;

function botao(texto) {
  return `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 8px auto 4px;">
  <tr>
    <td align="center" bgcolor="${C.navy}" style="border-radius: 10px; background-color: ${C.navy};">
      <a href="{{ .ConfirmationURL }}" target="_blank"
         style="display: inline-block; padding: 15px 34px; font-family: ${FONT}; font-size: 16px; font-weight: 700; line-height: 1.2; color: ${C.white}; text-decoration: none; border-radius: 10px; border: 1px solid ${C.navy};">${texto}</a>
    </td>
  </tr>
</table>`;
}

function codigo(rotulo, validade) {
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 6px 0 4px;">
  <tr>
    <td align="center" style="padding: 22px 16px 20px; background-color: ${C.paper}; border: 1px solid ${C.line}; border-radius: 12px;">
      <p style="margin: 0 0 10px; font-family: ${FONT}; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${C.soft};">${rotulo}</p>
      <p style="margin: 0; font-family: ${MONO}; font-size: 34px; line-height: 1.15; font-weight: 700; letter-spacing: 0.22em; color: ${C.ink};">{{ .Token }}</p>
      <p style="margin: 12px 0 0; font-family: ${FONT}; font-size: 13px; line-height: 1.5; color: ${C.soft};">${validade}</p>
    </td>
  </tr>
</table>`;
}

function divisor(texto) {
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 22px 0 18px;">
  <tr>
    <td width="45%" style="border-top: 1px solid ${C.line}; font-size: 0; line-height: 0;">&nbsp;</td>
    <td align="center" style="padding: 0 12px; font-family: ${FONT}; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.soft}; white-space: nowrap;">${texto}</td>
    <td width="45%" style="border-top: 1px solid ${C.line}; font-size: 0; line-height: 0;">&nbsp;</td>
  </tr>
</table>`;
}

// Lista com marcadores quadrados (sem emoji, sem imagem).
function lista(itens) {
  const linhas = itens.map(([titulo, texto]) => `
  <tr>
    <td valign="top" width="22" style="padding: 7px 0 0;">
      <div style="width: 8px; height: 8px; background-color: ${C.sky}; border-radius: 2px; font-size: 0; line-height: 0;">&nbsp;</div>
    </td>
    <td valign="top" style="padding: 0 0 12px; font-family: ${FONT}; font-size: 15px; line-height: 1.55; color: ${C.muted};">
      <strong style="color: ${C.ink};">${titulo}</strong> ${texto}
    </td>
  </tr>`).join('');
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 26px 0 0; border-top: 1px solid ${C.line}; padding-top: 20px;">
  <tr><td colspan="2" style="padding: 20px 0 12px; font-family: ${FONT}; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.soft};">O que você encontra na plataforma</td></tr>${linhas}
</table>`;
}

function linkReserva() {
  return `
<p style="margin: 22px 0 0; font-family: ${FONT}; font-size: 13px; line-height: 1.6; color: ${C.soft};">
  O botão não abriu? Copie e cole este endereço no navegador:<br>
  <a href="{{ .ConfirmationURL }}" style="color: ${C.blue}; text-decoration: underline; word-break: break-all;">{{ .ConfirmationURL }}</a>
</p>`;
}

function etiqueta(texto) {
  return `<p style="margin: 0 0 10px; font-family: ${FONT}; font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: ${C.blue};">${texto}</p>`;
}

function layout({ preheader, etiquetaTopo, titulo, corpo, seguranca }) {
  // O espacador apos o preheader evita que o Gmail puxe o texto do corpo para a previa.
  const espacador = '&#8199;&#65279;&#847; '.repeat(40);
  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>${titulo}</title>
  <style>
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (max-width: 600px) {
      .bfa-card { padding: 28px 22px 24px !important; }
      .bfa-titulo { font-size: 24px !important; }
      .bfa-pad { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${C.bg};">
  <div style="display: none; max-height: 0; max-width: 0; overflow: hidden; opacity: 0; mso-hide: all;">${preheader}${espacador}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.bg}" style="background-color: ${C.bg};">
    <tr>
      <td align="center" class="bfa-pad" style="padding: 36px 20px 40px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px;">
          <!-- Marca -->
          <tr>
            <td style="padding: 0 4px 22px;">
              <a href="${SITE}" target="_blank" style="text-decoration: none;"><img src="${LOGO}" alt="BRHSIC Academy" height="34" style="display: block; height: 34px; width: auto; border: 0; outline: none; font-family: ${FONT}; font-size: 22px; font-weight: 800; letter-spacing: 0.04em; color: ${C.navy};"></a>
            </td>
          </tr>
          <!-- Cartao -->
          <tr>
            <td bgcolor="${C.white}" style="background-color: ${C.white}; border: 1px solid ${C.line}; border-top: 5px solid ${C.navy}; border-radius: 14px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="bfa-card" style="padding: 38px 40px 32px;">
                    ${etiqueta(etiquetaTopo)}
                    <h1 class="bfa-titulo" style="margin: 0 0 16px; font-family: ${FONT}; font-size: 27px; line-height: 1.25; font-weight: 800; letter-spacing: -0.01em; color: ${C.ink};">${titulo}</h1>
${corpo}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 40px 20px; background-color: ${C.paper}; border-top: 1px solid ${C.line}; border-radius: 0 0 14px 14px;" class="bfa-card">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td valign="top" width="26" style="padding-top: 2px;">
                          <div style="width: 16px; height: 16px; border: 2px solid ${C.blue}; border-radius: 50%; font-family: ${FONT}; font-size: 11px; font-weight: 800; line-height: 16px; text-align: center; color: ${C.blue};">i</div>
                        </td>
                        <td style="font-family: ${FONT}; font-size: 13px; line-height: 1.6; color: ${C.muted};">${seguranca}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Rodape -->
          <tr>
            <td align="center" style="padding: 26px 12px 0; font-family: ${FONT}; font-size: 12px; line-height: 1.7; color: ${C.soft};">
              <strong style="color: ${C.muted};">BRHSIC Academy</strong> · Matemática financeira e mercado de capitais, de graça.<br>
              <a href="${SITE}" target="_blank" style="color: ${C.muted}; text-decoration: underline;">${SITE_ROTULO}</a>
              &nbsp;·&nbsp; Dúvidas: <a href="mailto:${SUPORTE}" style="color: ${C.muted}; text-decoration: underline;">${SUPORTE}</a><br>
              <span style="color: ${C.soft};">Este é um e-mail automático da sua conta. A equipe nunca pede sua senha.</span>
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

const VALIDADE = 'Válido por 1 hora e para um único uso.';

// Chave = nome do modelo na API do Supabase (mailer_templates_<chave>_content).
export const MODELOS = {
  confirmation: {
    // Quem entra pela primeira vez pelo "Acesso sem senha" tambem recebe ESTE
    // modelo, e a tela pede o codigo; por isso o codigo vai no assunto e no corpo.
    assunto: 'Confirme seu e-mail na BRHSIC Academy (código {{ .Token }})',
    html: layout({
      preheader: 'Falta um passo: confirme seu e-mail para ativar a conta e salvar seu progresso.',
      etiquetaTopo: 'Boas-vindas',
      titulo: 'Confirme seu e-mail para ativar a conta',
      corpo: [
        p('Que bom ter você na <strong style="color: ' + C.ink + ';">BRHSIC Academy</strong>. Confirme que este endereço é seu para ativar a conta e guardar seu progresso em qualquer aparelho.'),
        botao('Confirmar meu e-mail'),
        divisor('ou digite o código'),
        codigo('Código de confirmação', VALIDADE),
        lista([
          ['55 aulas gratuitas', 'de matemática aplicada e finanças, do zero ao avançado.'],
          ['Exercícios com correção', 'e explicação passo a passo em cada aula.'],
          ['Preparação para a olimpíada', 'BRHSIC, com simulados no formato da prova.'],
        ]),
        linkReserva(),
      ].join('\n'),
      seguranca: 'Não criou uma conta na BRHSIC Academy? Ignore este e-mail: sem a confirmação, nenhuma conta é ativada.',
    }),
  },
  magic_link: {
    assunto: 'Seu código de acesso à BRHSIC Academy: {{ .Token }}',
    html: layout({
      preheader: 'Use este código para entrar sem senha. Ele vale por 1 hora.',
      etiquetaTopo: 'Acesso sem senha',
      titulo: 'Seu código de acesso',
      corpo: [
        p('Digite o código abaixo na tela de login para entrar na sua conta. Não precisa de senha.'),
        codigo('Código de acesso', VALIDADE),
        divisor('ou entre com um clique'),
        botao('Entrar na plataforma'),
      ].join('\n'),
      seguranca: 'Não pediu este código? Ignore este e-mail. Ninguém entra na sua conta sem ele, e ele expira sozinho.',
    }),
  },
  recovery: {
    assunto: 'Redefina sua senha da BRHSIC Academy',
    html: layout({
      preheader: 'Recebemos um pedido para trocar a senha da sua conta.',
      etiquetaTopo: 'Segurança da conta',
      titulo: 'Redefinir sua senha',
      corpo: [
        p('Recebemos um pedido para redefinir a senha da conta <strong style="color: ' + C.ink + ';">{{ .Email }}</strong>. Clique no botão para escolher uma senha nova.'),
        botao('Criar nova senha'),
        p('O link vale por 1 hora e só pode ser usado uma vez.', ` margin-top: 18px; font-size: 14px; color: ${C.soft}; text-align: center;`),
        linkReserva(),
      ].join('\n'),
      seguranca: 'Não pediu a troca? Ignore este e-mail: sua senha atual continua valendo. Se isso se repetir, avise a equipe.',
    }),
  },
  email_change: {
    assunto: 'Confirme a troca de e-mail na BRHSIC Academy',
    html: layout({
      preheader: 'Confirme o novo endereço da sua conta.',
      etiquetaTopo: 'Segurança da conta',
      titulo: 'Confirme seu novo e-mail',
      corpo: [
        p('Foi pedida a troca do e-mail da sua conta:'),
        `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 4px 0 22px; background-color: ${C.paper}; border: 1px solid ${C.line}; border-radius: 12px;">
  <tr>
    <td style="padding: 14px 18px; font-family: ${FONT}; font-size: 14px; line-height: 1.7; color: ${C.muted};">
      <span style="color: ${C.soft};">De</span>&nbsp; <strong style="color: ${C.ink};">{{ .Email }}</strong><br>
      <span style="color: ${C.soft};">Para</span> <strong style="color: ${C.ink};">{{ .NewEmail }}</strong>
    </td>
  </tr>
</table>`,
        botao('Confirmar novo e-mail'),
        linkReserva(),
      ].join('\n'),
      seguranca: 'Não pediu esta troca? Ignore este e-mail e troque sua senha. O e-mail da conta só muda depois da confirmação.',
    }),
  },
  invite: {
    assunto: 'Você foi convidado para a BRHSIC Academy',
    html: layout({
      preheader: 'Aceite o convite e comece a estudar de graça.',
      etiquetaTopo: 'Convite',
      titulo: 'Você foi convidado para a BRHSIC Academy',
      corpo: [
        p('Você recebeu um convite para participar da BRHSIC Academy, a plataforma gratuita de matemática financeira, mercado de capitais e preparação para a olimpíada BRHSIC.'),
        botao('Aceitar convite'),
        lista([
          ['55 aulas gratuitas', 'de matemática aplicada e finanças.'],
          ['Exercícios com correção', 'e explicação passo a passo.'],
          ['Simulados', 'no formato da olimpíada BRHSIC.'],
        ]),
        linkReserva(),
      ].join('\n'),
      seguranca: 'Não esperava este convite? Pode ignorar este e-mail. Nenhuma conta é criada sem o seu aceite.',
    }),
  },
  reauthentication: {
    assunto: 'Código de confirmação da BRHSIC Academy: {{ .Token }}',
    html: layout({
      preheader: 'Confirme que é você para concluir a ação.',
      etiquetaTopo: 'Segurança da conta',
      titulo: 'Confirme que é você',
      corpo: [
        p('Para concluir uma ação importante na sua conta, digite o código abaixo na plataforma.'),
        codigo('Código de confirmação', VALIDADE),
      ].join('\n'),
      seguranca: 'Não reconhece este pedido? Não use o código e troque sua senha. Ele expira sozinho.',
    }),
  },
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [nome, { html }] of Object.entries(MODELOS)) {
    writeFileSync(join(DIR, `${nome}.html`), html);
    console.log('gerado', `${nome}.html`);
  }
}
