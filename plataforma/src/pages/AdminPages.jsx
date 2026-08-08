const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function ThemeSelector() {
  const { themePreference, setThemePreference } = useContext(AdminContext || createContext({}));

  const themes = [
    { id: 'brasil-atlas', name: 'Brasil Atlas Classic', desc: 'Verde Floresta & Azul Marinho' },
    { id: 'b3-corporate', name: 'B3 Corporate Executive', desc: 'Grafite & Azul B3' },
    { id: 'khan-minimalist', name: 'Minimalist Academy', desc: 'Azul Acadêmico & Branco' },
    { id: 'dark-obsidian', name: 'Dark Obsidian Pro', desc: 'Modo Escuro com Emerald' }
  ];

  return (
    <div className="tool-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ⚡ Seleção de Tema Visual da Plataforma
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setThemePreference && setThemePreference(t.id)}
            className={`btn-primary ${themePreference === t.id ? '' : 'btn-secondary'}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '1rem',
              textAlign: 'left',
              backgroundColor: themePreference === t.id ? 'var(--track-math)' : undefined,
              color: themePreference === t.id ? '#FFFFFF' : 'var(--foreground)'
            }}
          >
            <strong style={{ fontSize: '0.95rem' }}>
              {themePreference === t.id && '✓ '}
              {t.name}
            </strong>
            <span style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.2rem' }}>{t.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminLogin() {
  const { login, isAuthenticated, adminUser } = useContext(AdminContext || createContext({}));
  const { navigate } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (isAuthenticated) {
    return (
      <div className="bfa-container" style={{ padding: '4rem 1.5rem', maxWidth: '500px', margin: '0 auto' }}>
        <div className="tool-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ margin: '0 auto 1rem auto', display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.15)' }}>
            <span style={{ fontSize: '2rem' }}>✓</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>
            Sessão Ativa: <strong>{adminUser.username}</strong>
          </h2>
          <p style={{ margin: '0.75rem 0 1.5rem 0', color: 'var(--muted-foreground)' }}>
            Você está autenticado no Painel Admin do BFA.
          </p>
          <a href="#/admin" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Acessar Painel de Controle CMS ➔
          </a>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Credenciais inválidas.');
    }
  };

  return (
    <div className="bfa-container" style={{ padding: '4rem 1.5rem', maxWidth: '480px', margin: '0 auto' }}>
      <div className="tool-card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', background: 'var(--surface-strong)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            🔒
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>Área Restrita do Professor</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Acesso de edição para corpo docente e NIF Dragão do Mar</p>
        </div>

        {errorMsg && (
          <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#F87171', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', display: 'block', color: 'var(--foreground)' }}>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', display: 'block', color: 'var(--foreground)' }}>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Entrar no Painel CMS ➔
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { isAuthenticated, adminUser, logout } = useContext(AdminContext || createContext({}));
  const { navigate } = useRouter();
  const [showSyncModal, setShowSyncModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="bfa-container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Acesso não autorizado.</h2>
        <a href="#/admin/login" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Fazer Login</a>
      </div>
    );
  }

  return (
    <div>
      <section className="hero-gradient" style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--gold)', background: 'rgba(251, 191, 36, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>Painel Administrativo</span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.75rem' }}>Painel CMS — {adminUser.name}</h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setShowSyncModal(true)} className="btn-primary">
              🚀 Publicar no GitHub
            </button>
            <button onClick={logout} className="btn-secondary">
              Sair
            </button>
          </div>
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3rem 1.5rem' }}>
        <ThemeSelector />
        <GitHubSyncModal isOpen={showSyncModal} onClose={() => setShowSyncModal(false)} />
      </section>
    </div>
  );
}

window.AdminLogin = AdminLogin;
window.AdminDashboard = AdminDashboard;
