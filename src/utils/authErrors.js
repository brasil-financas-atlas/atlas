/* ==========================================================================
   Brasil Finanças Atlas (BFA) — Tradução dos erros do Supabase Auth
   Arquivo: src/utils/authErrors.js

   O Supabase devolve as mensagens em inglês ("Error sending confirmation
   email", "Email not confirmed"). Quem usa o site é aluno do Ensino Médio, e
   uma frase em inglês sem contexto parece que o site quebrou. Aqui cada erro
   conhecido vira uma orientação em português, indicando o que a pessoa pode
   fazer. Erro desconhecido cai numa mensagem genérica, sem expor o texto cru.
   ========================================================================== */

export const CODIGO_EMAIL_NAO_CONFIRMADO = 'email_not_confirmed';

function codigoDoErro(err) {
  if (!err) return '';
  if (err.code && typeof err.code === 'string') return err.code;
  const msg = String(err.message || '').toLowerCase();

  // Reserva para versões antigas da API, que só mandavam a mensagem.
  if (msg.includes('email not confirmed')) return 'email_not_confirmed';
  if (msg.includes('invalid login credentials')) return 'invalid_credentials';
  if (msg.includes('user already registered')) return 'user_already_exists';
  if (msg.includes('error sending') && msg.includes('email')) return 'email_send_failed';
  if (msg.includes('rate limit')) return 'over_email_send_rate_limit';
  if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('load failed')) return 'network_error';
  return '';
}

const MENSAGENS = {
  invalid_credentials: 'E-mail ou senha incorretos. Confira os dados ou use o acesso sem senha, por código enviado ao e-mail.',
  email_not_confirmed: 'Este e-mail ainda não foi confirmado. Abra a mensagem de confirmação que enviamos para a sua caixa de entrada (veja também o spam) ou peça um novo envio abaixo.',
  user_already_exists: 'Este e-mail já está cadastrado. Entre na aba "Entrar".',
  email_exists: 'Este e-mail já está cadastrado. Entre na aba "Entrar".',
  weak_password: 'Senha muito fraca. Use pelo menos 6 caracteres.',
  email_address_invalid: 'Este endereço de e-mail não é válido. Confira e tente de novo.',
  validation_failed: 'Confira o e-mail e a senha informados.',
  signup_disabled: 'Novos cadastros estão desativados no momento.',
  over_email_send_rate_limit: 'Muitos e-mails enviados em pouco tempo. Aguarde alguns minutos e tente de novo.',
  over_request_rate_limit: 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.',
  over_sms_send_rate_limit: 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.',
  email_send_failed: 'Não conseguimos enviar o e-mail de confirmação agora. Tente de novo em alguns minutos; se continuar, avise a equipe da plataforma.',
  email_address_not_authorized: 'O envio de e-mails está restrito no momento e não chega a este endereço. Avise a equipe da plataforma.',
  otp_disabled: 'Não encontramos uma conta com este e-mail. Crie uma conta na aba "Cadastrar".',
  otp_expired: 'Código inválido ou expirado. Peça um novo código.',
  network_error: 'Sem conexão com o servidor. Verifique sua internet e tente de novo.',
  unexpected_failure: 'O servidor de contas teve um problema temporário. Tente de novo em alguns minutos.',
};

/**
 * Converte um erro do Supabase Auth numa frase em português.
 * `padrao` é usado quando o erro não é reconhecido.
 */
export function traduzirErroAuth(err, padrao = 'Não foi possível concluir. Tente de novo.') {
  if (!err) return padrao;
  let codigo = codigoDoErro(err);

  // `unexpected_failure` é genérico: o texto diz se foi o envio do e-mail.
  if (codigo === 'unexpected_failure' || codigo === '') {
    const msg = String(err.message || err.msg || '').toLowerCase();
    if (msg.includes('error sending') && msg.includes('email')) codigo = 'email_send_failed';
  }

  // Um 500 sem código reconhecido ainda é problema do servidor, não do aluno.
  if (!codigo && Number(err.status) >= 500) codigo = 'unexpected_failure';

  return MENSAGENS[codigo] || padrao;
}

/**
 * True quando o erro é "conta existe, mas o e-mail não foi confirmado". A tela
 * de login usa isto para oferecer o reenvio da confirmação.
 */
export function erroEmailNaoConfirmado(err) {
  return codigoDoErro(err) === CODIGO_EMAIL_NAO_CONFIRMADO;
}
