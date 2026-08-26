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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>Área do Professor</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Acesso de edição para equipe docente do NIF</p>
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
  const { isAuthenticated, adminUser, isAdmin, logout, cmsData, publicarConteudo, statusPublicacao, erroPublicacao, approvePendingEdit, rejectPendingEdit, updateLesson, addModule, addNews, addExercise, deleteNews, deleteExercise } = useContext(AdminContext || createContext({}));
  const { EXACT_CONTENT } = window;
  const [editingVideoLessonId, setEditingVideoLessonId] = useState(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  // Modals for creation
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [modSubjKey, setModSubjKey] = useState('financas');
  const [modTitle, setModTitle] = useState('');

  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCat, setNewsCat] = useState('Macroeconomia');
  const [newsSummary, setNewsSummary] = useState('');

  const [showAddExModal, setShowAddExModal] = useState(false);
  const [exTitle, setExTitle] = useState('');
  const [exCategory, setExCategory] = useState('fixacao');
  const [exModule, setExModule] = useState('Matemática Financeira');
  const [exDifficulty, setExDifficulty] = useState('Médio');
  const [exQuestion, setExQuestion] = useState('');
  const [exAnswer, setExAnswer] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="bfa-container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Acesso não autorizado.</h2>
        <a href="#/admin/login" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Fazer Login</a>
      </div>
    );
  }

  const isChief = adminUser?.role === 'admin_chief';
  const pendingEdits = cmsData?.pendingEdits || [];

  // Agrupa todas as aulas para o gerenciador de vídeos
  const allLessons = [];
  if (EXACT_CONTENT) {
    Object.keys(EXACT_CONTENT).forEach(subjKey => {
      const subj = EXACT_CONTENT[subjKey];
      if (subj && Array.isArray(subj.modulos)) {
        subj.modulos.forEach(mod => {
          if (mod && Array.isArray(mod.aulas)) {
            mod.aulas.forEach(aula => {
              const lessonId = `${subjKey}-${mod.slug}-${aula.slug}`;
              const cmsOverride = cmsData?.lessons?.[lessonId];
              const currentVideo = cmsOverride?.videoUrl !== undefined ? cmsOverride.videoUrl : (aula.videoUrl || '');
              allLessons.push({
                id: lessonId,
                title: aula.titulo,
                subject: subjKey === 'matematica' ? 'Matemática' : 'Finanças',
                module: mod.titulo,
                videoUrl: currentVideo
              });
            });
          }
        });
      }
    });
  }

  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!modTitle.trim()) return;
    addModule(modSubjKey, { titulo: modTitle.trim() });
    setModTitle('');
    setShowAddModuleModal(false);
  };

  const handleCreateNews = (e) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim()) return;
    addNews({ title: newsTitle.trim(), category: newsCat, summary: newsSummary.trim() });
    setNewsTitle('');
    setNewsSummary('');
    setShowAddNewsModal(false);
  };

  const handleCreateExercise = (e) => {
    e.preventDefault();
    if (!exTitle.trim() || !exQuestion.trim() || !exAnswer.trim()) return;
    addExercise({
      title: exTitle.trim(),
      category: exCategory,
      module: exModule.trim(),
      difficulty: exDifficulty,
      question: exQuestion.trim(),
      answer: exAnswer.trim()
    });
    setExTitle('');
    setExQuestion('');
    setExAnswer('');
    setShowAddExModal(false);
  };

  return (
    <div>
      <section className="hero-gradient" style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
        <div className="grid-ledger" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        <div className="bfa-container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="mono-tag" style={{ color: isChief ? 'var(--gold)' : 'var(--market)', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>
              {isChief ? '👑 Admin Chief (Aprovador)' : adminUser?.role === 'admin' ? '✍️ Administrador (Editor)' : '✍️ Colaborador CMS'}
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.75rem' }}>Painel CMS — {adminUser.name || adminUser.email}</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Nível de permissão: <strong>{adminUser.role}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Sem token: a permissão de publicar vem do papel da conta,
                verificado pelo banco. */}
            {isAdmin && (
              <button
                onClick={publicarConteudo}
                className="btn-primary"
                disabled={statusPublicacao === 'publicando'}
              >
                {statusPublicacao === 'publicando' && 'Publicando...'}
                {statusPublicacao === 'publicado' && '✓ Publicado para todos'}
                {statusPublicacao === 'erro' && '⚠ Erro ao publicar'}
                {(statusPublicacao === 'idle' || !statusPublicacao) && '🚀 Publicar alterações'}
              </button>
            )}
            <button onClick={logout} className="btn-secondary">
              Sair
            </button>
          </div>
          {statusPublicacao === 'erro' && erroPublicacao && (
            <p style={{ color: '#FCA5A5', fontSize: '0.8rem', marginTop: '0.5rem', width: '100%' }}>
              {erroPublicacao}
            </p>
          )}
        </div>
      </section>

      <section className="bfa-container" style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* Quick Action Bar for Admins to Add Content */}
        <div className="tool-card" style={{ padding: '1.5rem', background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Ações Rápidas de Cadastro (Admin)
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowAddModuleModal(true)} className="bfa-btn bfa-btn--azul">
              + Criar Módulo
            </button>
            <button onClick={() => setShowAddNewsModal(true)} className="bfa-btn bfa-btn--ouro">
              + Publicar Notícia
            </button>
            <button onClick={() => setShowAddExModal(true)} className="bfa-btn bfa-btn--verde">
              + Cadastrar Exercício
            </button>
          </div>
        </div>

        {/* Painel de Aprovações Pendentes (Visível para Admin Chief / Admin) */}
        {isChief && (
          <div className="tool-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--foreground)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  👑 Edições Pendentes de Aprovação ({pendingEdits.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                  Como Admin Chief, você deve revisar e aprovar as alterações enviadas pelos colaboradores antes de irem ao ar.
                </p>
              </div>
              <span className="mono-tag" style={{ color: pendingEdits.length > 0 ? 'var(--gold-deep)' : 'var(--market)' }}>
                {pendingEdits.length > 0 ? `${pendingEdits.length} aguardando` : '✓ Nenhuma pendência'}
              </span>
            </div>

            {pendingEdits.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                Nenhuma alteração de colaborador pendente no momento. Todas as edições foram processadas!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pendingEdits.map((edit) => (
                  <div key={edit.id} style={{ padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span className="mono-tag" style={{ color: 'var(--track-math)', background: 'var(--card)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {edit.resourceType}
                        </span>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>Recurso: {edit.resourceId}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>por {edit.authorName || 'Colaborador'}</span>
                      </div>
                      <pre style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', background: 'var(--card)', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--foreground)', overflowX: 'auto', maxWidth: '600px' }}>
                        {JSON.stringify(edit.changesJson, null, 2)}
                      </pre>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => approvePendingEdit(edit.id)}
                        style={{ backgroundColor: 'var(--track-finance)', padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        ✓ Aprovar Edição
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          const reason = prompt("Motivo da rejeição (opcional):");
                          rejectPendingEdit(edit.id, reason || '');
                        }}
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', color: 'var(--status-danger)', borderColor: 'var(--status-danger)' }}
                      >
                        ✕ Rejeitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gerenciador Central de Vídeos das Aulas */}
        <div className="tool-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🎬 Gerenciador de Vídeo-Aulas (Admin)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
            Adicione, altere ou remova os links do YouTube de qualquer aula do Brasil Finanças Atlas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {allLessons.map(aula => (
              <div key={aula.id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--card)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.2rem' }}>
                  {aula.subject} / {aula.module}
                </div>
                <strong style={{ fontSize: '0.925rem', color: 'var(--foreground)', display: 'block', marginBottom: '0.5rem' }}>
                  {aula.title}
                </strong>

                {editingVideoLessonId === aula.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateLesson(aula.id, { videoUrl: videoUrlInput.trim() });
                    setEditingVideoLessonId(null);
                  }} style={{ marginTop: '0.5rem' }}>
                    <input
                      type="url"
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="bfa-input"
                      style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem 0.6rem', marginBottom: '0.5rem' }}
                      autoFocus
                    />
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button type="submit" className="bfa-btn bfa-btn--sm bfa-btn--verde" style={{ fontSize: '0.75rem' }}>Salvar</button>
                      <button type="button" className="bfa-btn bfa-btn--sm bfa-btn--ghost" onClick={() => setEditingVideoLessonId(null)} style={{ fontSize: '0.75rem' }}>Cancelar</button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span className="mono-tag" style={{ color: aula.videoUrl ? 'var(--market)' : 'var(--muted-foreground)', fontSize: '0.7rem' }}>
                      {aula.videoUrl ? '✓ Vídeo configurado' : 'Sem vídeo'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="bfa-btn bfa-btn--sm bfa-btn--ouro"
                        onClick={() => {
                          setEditingVideoLessonId(aula.id);
                          setVideoUrlInput(aula.videoUrl || '');
                        }}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      >
                        {aula.videoUrl ? 'Editar' : '+ Vídeo'}
                      </button>
                      {aula.videoUrl && (
                        <button
                          type="button"
                          className="bfa-btn bfa-btn--sm bfa-btn--ghost"
                          onClick={() => {
                            if (window.confirm(`Remover vídeo da aula "${aula.title}"?`)) {
                              updateLesson(aula.id, { videoUrl: '' });
                            }
                          }}
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', color: 'var(--status-danger)' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Personalização & Seleção de Tema Visual */}
        <ThemeSelector />

        {/* Modal: Add Module */}
        {showAddModuleModal && (
          <div className="bfa-inline-editor-modal" onClick={() => setShowAddModuleModal(false)}>
            <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1rem' }}>
                📁 Criar Novo Módulo
              </h3>
              <form onSubmit={handleCreateModule}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Trilha / Disciplina:</label>
                  <select value={modSubjKey} onChange={e => setModSubjKey(e.target.value)} className="bfa-input" style={{ width: '100%' }}>
                    <option value="financas">Finanças & Investimentos</option>
                    <option value="matematica">Matemática Aplicada</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Título do Módulo:</label>
                  <input type="text" value={modTitle} onChange={e => setModTitle(e.target.value)} placeholder="Ex: Mercado de Derivativos e Opções" className="bfa-input" style={{ width: '100%' }} required autoFocus />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="bfa-btn bfa-btn--ghost" onClick={() => setShowAddModuleModal(false)}>Cancelar</button>
                  <button type="submit" className="bfa-btn bfa-btn--azul">Salvar Módulo 💾</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add News */}
        {showAddNewsModal && (
          <div className="bfa-inline-editor-modal" onClick={() => setShowAddNewsModal(false)}>
            <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1rem' }}>
                📰 Publicar Notícia Macro
              </h3>
              <form onSubmit={handleCreateNews}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Título da Notícia:</label>
                  <input type="text" value={newsTitle} onChange={e => setNewsTitle(e.target.value)} placeholder="Ex: Banco Central Altera Metodologia de Cálculo..." className="bfa-input" style={{ width: '100%' }} required autoFocus />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Categoria:</label>
                  <select value={newsCat} onChange={e => setNewsCat(e.target.value)} className="bfa-input" style={{ width: '100%' }}>
                    <option value="Macroeconomia">Macroeconomia</option>
                    <option value="Equity Research">Equity Research</option>
                    <option value="Mercado Financeiro">Mercado Financeiro</option>
                    <option value="Educação Financeira">Educação Financeira</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Resumo executivo:</label>
                  <textarea value={newsSummary} onChange={e => setNewsSummary(e.target.value)} rows="3" className="bfa-textarea" style={{ width: '100%' }} required></textarea>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="bfa-btn bfa-btn--ghost" onClick={() => setShowAddNewsModal(false)}>Cancelar</button>
                  <button type="submit" className="bfa-btn bfa-btn--ouro">Publicar Notícia 🚀</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Exercise */}
        {showAddExModal && (
          <div className="bfa-inline-editor-modal" onClick={() => setShowAddExModal(false)}>
            <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1rem' }}>
                ✏️ Cadastrar Exercício (PBL)
              </h3>
              <form onSubmit={handleCreateExercise}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>Aba do Hub:</label>
                    <select value={exCategory} onChange={e => setExCategory(e.target.value)} className="bfa-input" style={{ width: '100%' }}>
                      <option value="fixacao">Fixação Conceitual</option>
                      <option value="calculo">Cálculo Financeiro</option>
                      <option value="pbl">Casos Reais (PBL)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>Dificuldade:</label>
                    <select value={exDifficulty} onChange={e => setExDifficulty(e.target.value)} className="bfa-input" style={{ width: '100%' }}>
                      <option value="Fácil">Fácil</option>
                      <option value="Médio">Médio</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Módulo Relacionado:</label>
                  <input type="text" value={exModule} onChange={e => setExModule(e.target.value)} className="bfa-input" style={{ width: '100%' }} required />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Título do Exercício:</label>
                  <input type="text" value={exTitle} onChange={e => setExTitle(e.target.value)} placeholder="Ex: Análise da Taxa de Retorno Real..." className="bfa-input" style={{ width: '100%' }} required />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Enunciado da Questão:</label>
                  <textarea value={exQuestion} onChange={e => setExQuestion(e.target.value)} rows="3" className="bfa-textarea" style={{ width: '100%' }} required></textarea>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>Resolução Passo a Passo (Gabarito):</label>
                  <textarea value={exAnswer} onChange={e => setExAnswer(e.target.value)} rows="3" className="bfa-textarea" style={{ width: '100%' }} required></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" className="bfa-btn bfa-btn--ghost" onClick={() => setShowAddExModal(false)}>Cancelar</button>
                  <button type="submit" className="bfa-btn bfa-btn--verde">Cadastrar Exercício 💾</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

window.AdminLogin = AdminLogin;
window.AdminDashboard = AdminDashboard;
