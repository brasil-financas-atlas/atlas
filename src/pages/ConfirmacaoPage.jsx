import React, { useState, useEffect, useRef } from 'react';
import { BfaSupabase } from '../utils/supabaseClient';
import { traduzirErroAuth, comTempoLimite } from '../utils/authHelpers';
import BfaIcon from '../components/Icons';

/* Pagina para onde os links dos e-mails levam.
   Formato novo (link para o proprio site, menos chance de cair no spam):
     #/confirmacao?token_hash=...&type=signup|magiclink|recovery|invite|email_change|email
   Formato antigo (link do Supabase, que volta com #access_token=...) continua
   funcionando: o Supabase cria a sessao sozinho e esta pagina so confirma. */

const TIPOS = ['signup', 'email', 'magiclink', 'recovery', 'invite', 'email_change'];

function lerParametros() {
  const hash = window.location.hash || '';
  const iq = hash.indexOf('?');
  const doHash = new URLSearchParams(iq >= 0 ? hash.slice(iq + 1) : '');
  const daBusca = new URLSearchParams(window.location.search || '');
  const pegar = (k) => doHash.get(k) || daBusca.get(k) || '';
  return { tokenHash: pegar('token_hash'), tipo: pegar('type'), erro: pegar('error_description') };
}

const TEXTOS = {
  signup: { titulo: 'E-mail confirmado', texto: 'Sua conta está ativa' },
  email: { titulo: 'Tudo certo', texto: 'Você entrou na sua conta' },
  magiclink: { titulo: 'Você entrou', texto: 'Acesso liberado' },
  email_change: { titulo: 'E-mail atualizado', texto: 'O e-mail da sua conta foi trocado' },
  recovery: { titulo: 'Senha alterada', texto: 'Sua nova senha já vale' },
  invite: { titulo: 'Conta criada', texto: 'Seu convite foi aceito' },
};

function Icone({ tipo }) {
  const ok = tipo === 'ok';
  const cor = ok ? '#047857' : tipo === 'erro' ? '#B91C1C' : 'var(--text-primary)';
  return (
    <div style={{ width: '52px', height: '52px', border: `2px solid ${cor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', color: cor }}>
      <BfaIcon name={ok ? 'check' : tipo === 'erro' ? 'alert' : 'lock'} size={22} color={cor} />
    </div>
  );
}

function ConfirmacaoPage() {
  // checking | nova-senha | success | pendente | error
  const [status, setStatus] = useState('checking');
  const [tipo, setTipo] = useState('signup');
  const [userEmail, setUserEmail] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erroSenha, setErroSenha] = useState('');
  const executou = useRef(false);

  useEffect(() => {
    // O token so pode ser usado uma vez; no modo de desenvolvimento o React
    // roda este efeito duas vezes, entao a trava evita a segunda chamada.
    if (executou.current) return;
    executou.current = true;
    const supabase = BfaSupabase && BfaSupabase.client;

    async function verificar() {
      const { tokenHash, tipo: tipoUrl, erro } = lerParametros();
      const t = TIPOS.includes(tipoUrl) ? tipoUrl : 'signup';
      setTipo(t);

      if (erro) {
        {
          setErrorDetails(decodeURIComponent(erro.replace(/\+/g, ' ')));
          setStatus('error');
        }
        return;
      }
      if (!supabase) {
        { setErrorDetails('Não foi possível conectar ao servidor agora. Tente de novo em instantes.'); setStatus('error'); }
        return;
      }

      try {
        if (tokenHash) {
          // Avisa o painel para nao levar a equipe ao #/admin antes de salvar a senha.
          if (t === 'recovery' || t === 'invite') { try { sessionStorage.setItem('bfa_definindo_senha', '1'); } catch (e) {} }
          const { data, error } = await comTempoLimite(supabase.auth.verifyOtp({ token_hash: tokenHash, type: t }));
          // O token so vale uma vez: tira da barra de endereco para um
          // recarregamento nao tentar usar de novo.
          try { window.history.replaceState(null, '', `${window.location.pathname}#/confirmacao`); } catch (e) {}
          if (error) throw error;
          setUserEmail(data?.user?.email || '');
          if (t === 'recovery' || t === 'invite') { setStatus('nova-senha'); return; }
          // Troca de e-mail com confirmacao dupla: o primeiro link aceito nao
          // abre sessao e avisa que falta o outro endereco.
          if (t === 'email_change' && !data?.session) { setStatus('pendente'); return; }
          setStatus('success');
          return;
        }

        // Formato antigo: a sessao chega pela URL e o Supabase ja tratou.
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) setUserEmail(session.user.email || '');
        setStatus('success');
      } catch (err) {
        {
          setErrorDetails(traduzirErroAuth(err));
          setStatus('error');
        }
      }
    }

    verificar();
  }, []);

  const salvarSenha = async (e) => {
    e.preventDefault();
    setErroSenha('');
    if (senha.length < 6) { setErroSenha('A senha precisa ter pelo menos 6 caracteres.'); return; }
    if (senha !== senha2) { setErroSenha('As duas senhas não são iguais.'); return; }
    setSalvando(true);
    try {
      const { error } = await comTempoLimite(BfaSupabase.client.auth.updateUser({ password: senha }));
      if (error) throw error;
      try { sessionStorage.removeItem('bfa_definindo_senha'); } catch (e2) {}
      setStatus('success');
    } catch (err) {
      setErroSenha(traduzirErroAuth(err));
    } finally {
      setSalvando(false);
    }
  };

  const campo = {
    width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border-color)',
    background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.75rem', boxSizing: 'border-box',
  };
  const textos = TEXTOS[tipo] || TEXTOS.signup;

  return (
    <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>

        {status === 'checking' && (
          <div role="status">
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--text-primary)', borderRadius: '50%', margin: '0 auto 1.5rem auto', animation: 'spin 0.8s linear infinite' }}></div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Confirmando...</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Validando o link do seu e-mail.</p>
          </div>
        )}

        {status === 'nova-senha' && (
          <form onSubmit={salvarSenha} noValidate style={{ textAlign: 'left' }}>
            <Icone tipo="senha" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
              {tipo === 'invite' ? 'Crie sua senha' : 'Escolha uma nova senha'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.5rem 0', textAlign: 'center' }}>
              {userEmail ? <>Para a conta <strong style={{ color: 'var(--text-primary)' }}>{userEmail}</strong>.</> : 'Use pelo menos 6 caracteres.'}
            </p>
            <input type="email" name="username" autoComplete="username" value={userEmail} readOnly hidden />
            <label htmlFor="nova-senha" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Nova senha</label>
            <input id="nova-senha" type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} style={campo} />
            <label htmlFor="nova-senha-2" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Repita a senha</label>
            <input id="nova-senha-2" type="password" autoComplete="new-password" value={senha2} onChange={(e) => setSenha2(e.target.value)} style={campo} />
            {erroSenha && <p role="alert" style={{ color: '#B91C1C', fontSize: '0.875rem', margin: '0 0 0.75rem 0' }}>{erroSenha}</p>}
            <button type="submit" className="btn-primary" disabled={salvando} style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}>
              {salvando ? 'Salvando...' : 'Salvar senha'}
            </button>
          </form>
        )}

        {status === 'success' && (
          <div>
            <Icone tipo="ok" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>{textos.titulo}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.75rem 0' }}>
              {textos.texto}{userEmail ? ` para ${userEmail}` : ''}.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href="#/matematica/modulo-1-algebra-do-zero/aula-01-numeros-e-operacoes" className="btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                Começar a estudar
              </a>
              <a href="#/" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0.4rem' }}>Ir para a página inicial</a>
            </div>
          </div>
        )}

        {status === 'pendente' && (
          <div>
            <Icone tipo="senha" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Falta um passo</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.75rem 0' }}>
              Este endereço foi confirmado. Por segurança, abra também o link enviado para o outro e-mail para concluir a troca.
            </p>
            <a href="#/" className="btn-secondary" style={{ textDecoration: 'none' }}>Ir para a página inicial</a>
          </div>
        )}

        {status === 'error' && (
          <div>
            <Icone tipo="erro" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>Link inválido ou expirado</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.75rem 0' }}>
              {errorDetails || 'Os links valem por 1 hora e só uma vez. Peça um novo na tela de login.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href="#/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Ir para o login</a>
              <a href="#/" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0.4rem' }}>Ir para a página inicial</a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ConfirmacaoPage;
