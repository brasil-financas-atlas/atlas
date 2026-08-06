const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function GitHubSyncModal({ isOpen, onClose }) {
  const { cmsData } = useContext(AdminContext || createContext({}));
  const [token, setToken] = useState(() => localStorage.getItem('bfa_gh_token') || '');
  const [owner, setOwner] = useState(() => {
    const saved = localStorage.getItem('bfa_gh_owner');
    return (!saved || saved === 'davidlhferro') ? 'brasil-financas-atlas' : saved;
  });
  const [repo, setRepo] = useState(() => localStorage.getItem('bfa_gh_repo') || 'atlas');
  const [status, setStatus] = useState('idle'); // idle | syncing | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [commitUrl, setCommitUrl] = useState('');

  if (!isOpen) return null;

  const handleSync = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setErrorMsg("Insira o seu Personal Access Token do GitHub.");
      return;
    }

    setStatus('syncing');
    setErrorMsg('');

    try {
      localStorage.setItem('bfa_gh_token', token.trim());
      localStorage.setItem('bfa_gh_owner', owner.trim());
      localStorage.setItem('bfa_gh_repo', repo.trim());

      const result = await window.githubSyncService.commitOverrides({
        owner: owner.trim(),
        repo: repo.trim(),
        path: 'plataforma/src/data/overrides.json',
        branch: 'main',
        content: {
          ...cmsData,
          // Precisa vir depois do spread: e esta data que marca o conteudo
          // publicado como mais recente do que o de qualquer navegador.
          lastUpdated: new Date().toISOString()
        },
        token: token.trim(),
        message: `content(cms): edições in-context sincronizadas [${new Date().toLocaleDateString('pt-BR')}]`
      });

      if (result.success) {
        setStatus('success');
        setCommitUrl(result.commitUrl);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || "Erro de comunicação com a API do GitHub.");
    }
  };

  return (
    <div className="bfa-inline-editor-modal" onClick={onClose}>
      <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BfaIcon name="paper" size={20} color="var(--color-azul)" /> Sincronizar Alterações com GitHub & Netlify
          </h3>
          <button type="button" className="bfa-btn-icon" onClick={onClose}>✕</button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Este assistente grava todas as suas edições de texto, vídeos e quizzes em <strong><code>plataforma/src/data/overrides.json</code></strong> no repositório do GitHub (<code>brasil-financas-atlas/atlas</code>). O Netlify detectará o commit e atualizará o site público automaticamente em segundos!
        </p>

        {status === 'success' ? (
          <div className="bfa-admonition bfa-admonition--tip" style={{ marginBottom: '1.25rem' }}>
            <div className="bfa-admonition__title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="checkCircle" size={18} color="var(--color-verde)" /> Sincronizado com Sucesso!
            </div>
            <p style={{ fontSize: '0.9rem', margin: '0.4rem 0 0.75rem 0' }}>
              As alterações foram enviadas para o repositório principal. O Netlify já iniciou o build automático.
            </p>
            {commitUrl && (
              <a href={commitUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-azul)' }}>
                🔗 Ver Commit no GitHub ➔
              </a>
            )}
            <div style={{ marginTop: '1rem' }}>
              <button type="button" className="bfa-btn bfa-btn--verde bfa-btn--sm" onClick={onClose}>
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSync}>
            <div className="bfa-form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem', display: 'block' }}>
                🔑 Digite ou cole o seu GitHub Personal Access Token (PAT):
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="github_pat_... ou ghp_..."
                className="bfa-input"
                style={{ width: '100%', padding: '0.65rem', fontFamily: 'var(--font-mono)' }}
                required
                autoFocus
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'block' }}>
                🔒 Recomenda-se gerar um <strong>Fine-grained token</strong> com permissão <em>Contents: Read & Write</em> para <code>brasil-financas-atlas/atlas</code>.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Dono do Repositório (Owner):</label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.55rem' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Nome do Repositório (Repo):</label>
                <input
                  type="text"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  className="bfa-input"
                  style={{ width: '100%', padding: '0.55rem' }}
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="bfa-admonition bfa-admonition--danger" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--status-danger)' }}>⚠️ {errorMsg}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="bfa-btn bfa-btn--ghost" onClick={onClose}>
                Cancelar
              </button>
              <button
                type="submit"
                className="bfa-btn bfa-btn--verde"
                disabled={status === 'syncing'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {status === 'syncing' ? 'Sincronizando...' : '🚀 Publicar no GitHub & Netlify'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

window.GitHubSyncModal = GitHubSyncModal;
