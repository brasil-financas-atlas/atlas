/* ==========================================================================
   Ajudantes do login: leitura dos campos e mensagens de erro em portugues.
   ========================================================================== */

// Padroniza o e-mail: o preenchimento automatico do navegador e do celular as
// vezes traz espacos, quebra de linha ou letras maiusculas.
export function normalizarEmail(valor) {
  return String(valor || '').replace(/\s+/g, '').toLowerCase();
}

export function emailValido(valor) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(valor);
}

// Codigo de 6 digitos: o celular pode colar com espacos ou tracos.
export function normalizarCodigo(valor) {
  return String(valor || '').replace(/\D+/g, '');
}

// Le o valor direto do formulario no momento do envio. Quando o navegador
// preenche sozinho (senha salva, e-mail sugerido), o React nem sempre recebe
// o valor pelo onChange; o campo parece cheio, mas o estado fica vazio.
export function lerCampo(form, nome, reserva = '') {
  const el = form && form.elements ? form.elements.namedItem(nome) : null;
  const valor = el && typeof el.value === 'string' ? el.value : '';
  return valor !== '' ? valor : (reserva || '');
}

// Traduz os erros do Supabase Auth para mensagens claras. Mantem o codigo
// tecnico entre parenteses quando ajuda a equipe a diagnosticar.
export function traduzirErroAuth(err) {
  const codigo = String((err && (err.code || err.error_code)) || '').toLowerCase();
  const msg = String((err && (err.message || err.error_description || err.msg)) || err || '');
  const m = msg.toLowerCase();
  if (err) console.warn('[BFA Auth]', codigo || '(sem codigo)', msg);

  if (codigo === 'email_address_not_authorized' || m.includes('not authorized')) {
    return 'Não conseguimos enviar o e-mail para este endereço: o envio de e-mails do site ainda está em configuração. Entre com Google, se disponível, ou avise a equipe da BRHSIC Academy. (email_address_not_authorized)';
  }
  if (codigo === 'over_email_send_rate_limit' || m.includes('email rate limit')) {
    return 'Muitos e-mails foram enviados em pouco tempo. Aguarde alguns minutos e tente de novo. (limite de envio)';
  }
  const espera = m.match(/after (\d+) seconds?/);
  if (codigo === 'over_request_rate_limit' || espera) {
    return espera
      ? `Por segurança, aguarde ${espera[1]} segundos antes de pedir outro código.`
      : 'Muitas tentativas seguidas. Aguarde um pouco e tente de novo.';
  }
  if (m.includes('error sending') || m.includes('sending confirmation') || m.includes('sending magic link') || codigo === 'unexpected_failure') {
    return 'O servidor de e-mail falhou ao enviar a mensagem. Tente de novo em alguns minutos; se continuar, avise a equipe. (falha no envio de e-mail)';
  }
  if (codigo === 'invalid_credentials' || m.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos. Se você criou a conta pelo código enviado por e-mail, use "Acesso sem senha".';
  }
  if (codigo === 'email_not_confirmed' || m.includes('email not confirmed')) {
    return 'Falta confirmar seu e-mail. Procure a mensagem da BRHSIC Academy na caixa de entrada e no spam, ou use "Acesso sem senha".';
  }
  if (codigo === 'otp_expired' || m.includes('expired') || m.includes('token has expired') || m.includes('invalid token')) {
    return 'Código inválido ou expirado. Peça um novo código e use o mais recente.';
  }
  if (codigo === 'user_already_exists' || codigo === 'email_exists' || m.includes('already registered')) {
    return 'Este e-mail já tem uma conta. Use a aba Entrar ou "Acesso sem senha".';
  }
  if (codigo === 'weak_password' || m.includes('password should be')) {
    return 'Senha fraca: use pelo menos 6 caracteres.';
  }
  if (codigo === 'signup_disabled' || m.includes('signups not allowed')) {
    return 'Cadastros novos estão desativados no momento. Fale com a equipe.';
  }
  if (codigo === 'validation_failed' || m.includes('invalid format') || m.includes('unable to validate email')) {
    return 'E-mail inválido. Confira se está no formato nome@email.com.';
  }
  if (m.includes('failed to fetch') || m.includes('network')) {
    return 'Sem conexão com o servidor. Verifique sua internet e tente de novo.';
  }
  return msg || 'Não foi possível concluir o login. Tente de novo.';
}
