import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useRouter } from '../router';
import BfaIcon from '../components/Icons';
import { EXACT_CONTENT } from '../data/contentData';

function ThemeSelector() {
  const { themePreference, setThemePreference } = useContext(AdminContext || createContext({}));

  const themes = [
    { id: 'brasil-atlas', name: 'Brasil Atlas Classic', desc: 'Verde Floresta & Azul Marinho' },
    { id: 'b3-corporate', name: 'B3 Corporate Executive', desc: 'Grafite & Azul B3' },
    { id: 'khan-minimalist', name: 'Academic Minimalist', desc: 'Azul Acadêmico & Branco' },
    { id: 'dark-obsidian', name: 'Dark Obsidian Pro', desc: 'Modo Escuro com Emerald' }
  ];

  return (
    <div className="tool-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        Configuração Visual da Plataforma
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
              color: themePreference === t.id ? '#FFFFFF' : 'var(--text-primary)'
            }}
          >
            <strong style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {themePreference === t.id && <BfaIcon name="check" size={14} color="#FFFFFF" />}
              <span>{t.name}</span>
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
  const [carregando, setCarregando] = useState(false);

  if (isAuthenticated && adminUser) {
    return (
      <div className="bfa-container" style={{ padding: '4rem 1.5rem', maxWidth: '500px', margin: '0 auto' }}>
        <div className="tool-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ margin: '0 auto 1rem auto', display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.15)' }}>
            <BfaIcon name="check" size={32} color="#059669" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Sessão Ativa: <strong>{adminUser.name || adminUser.email}</strong>
          </h2>
          <p style={{ margin: '0.75rem 0 0.5rem 0', color: 'var(--text-secondary)' }}>
            Papel no sistema: <strong>{adminUser.role}</strong>
          </p>
          <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Você está autenticado no Painel Admin do BFA.
          </p>
          <a href="#/admin" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Acessar Painel de Controle CMS →
          </a>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setCarregando(true);
    try {
      const res = await login(username, password);
      if (res && res.success) {
        if (window.BfaSupabase?.savePasswordCredential) {
          window.BfaSupabase.savePasswordCredential(username, password, 'Professor / Admin BFA');
        }
        navigate('/admin');
      } else {
        setErrorMsg((res && res.error) || 'Credenciais inválidas.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bfa-container" style={{ padding: '4rem 1.5rem', maxWidth: '480px', margin: '0 auto' }}>
      <div className="tool-card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Área do Professor</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Acesso de edição e moderação do Brasil Finanças Atlas</p>
        </div>

        {errorMsg && (
          <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#F87171', fontSize: '0.875rem' }}>
            {errorMsg}
          </div>
        )}

        <iframe
          name="bfa_admin_auth_iframe"
          id="bfa_admin_auth_iframe"
          style={{ display: 'none', width: 0, height: 0, border: 0 }}
          tabIndex={-1}
          aria-hidden="true"
          src="about:blank"
          title="bfa-admin-auth"
        />

        <form
          target="bfa_admin_auth_iframe"
          method="POST"
          action="about:blank"
          onSubmit={handleLoginSubmit}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="admin-page-username" style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', display: 'block', color: 'var(--text-primary)' }}>E-mail:</label>
            <input
              id="admin-page-username"
              name="username"
              type="email"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu-email@exemplo.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="admin-page-password" style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', display: 'block', color: 'var(--text-primary)' }}>Senha:</label>
            <input
              id="admin-page-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={carregando}>
            {carregando ? 'Autenticando...' : 'Entrar no Painel CMS →'}
          </button>
        </form>
      </div>
    </div>
  );
}

const TIPOS_EDICAO = { lesson: 'Aula', news: 'Notícia', override: 'Texto', module: 'Módulo', exercise: 'Exercício' };

function resumoEdicao(edit) {
  const tipo = edit.resourceType || edit.resource_type || 'override';
  const alvo = edit.resourceId || edit.resource_id || edit.block_id || '';
  const autor = edit.authorName || edit.submitted_by_name || edit.author_name || 'Colaborador';
  const data = edit.createdAt || edit.created_at;
  const mudancas = edit.changesJson || edit.changes_json;
  let texto = edit.new_content || '';
  if (!texto && mudancas) {
    texto = typeof mudancas === 'string' ? mudancas : (mudancas.text || mudancas.title || mudancas.titulo || JSON.stringify(mudancas));
  }
  return { tipo: TIPOS_EDICAO[tipo] || 'Conteúdo', alvo, autor, data, texto };
}

const ROTULOS_PAPEL = { admin_chief: 'Administrador chefe', admin: 'Administrador', teacher: 'Professor', collaborator: 'Colaborador' };

function AdminDashboard() {
  const { isAuthenticated, adminUser, isAdmin, logout, cmsData, publicarConteudo, statusPublicacao, erroPublicacao, approvePendingEdit, rejectPendingEdit, updateLesson, addModule, addNews, addExercise } = useContext(AdminContext || createContext({}));

  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem('bfa_admin_tab') || 'visao'; } catch (e) { return 'visao'; }
  });
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todas');
  const [subjFilter, setSubjFilter] = useState('todas');
  const [openGroup, setOpenGroup] = useState(null);
  const [historyLimit, setHistoryLimit] = useState(10);

  const [editingVideoLessonId, setEditingVideoLessonId] = useState(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');

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

  const [publishHistory, setPublishHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const isChief = adminUser?.role === 'admin_chief';
  const isSuperAdmin = adminUser?.email === 'davidholandaferro@gmail.com' || adminUser?.email === 'lucasguimaraes.app@gmail.com' || adminUser?.email === 'hertonfilho2000@gmail.com';
  const pendingEdits = cmsData?.pendingEdits || [];

  useEffect(() => {
    if (isSuperAdmin && window.BfaSupabase?.fetchPublishHistory) {
      setLoadingHistory(true);
      window.BfaSupabase.fetchPublishHistory()
        .then((data) => setPublishHistory(data || []))
        .finally(() => setLoadingHistory(false));
    }
  }, [isSuperAdmin]);

  if (!isAuthenticated) {
    return (
      <div className="adm-wrap adm-denied">
        <h2>Acesso não autorizado</h2>
        <p>Entre com uma conta de professor ou administrador para abrir o painel.</p>
        <a href="#/admin/login" className="btn-primary">Fazer login</a>
      </div>
    );
  }

  // Abas disponiveis dependem do papel: cada uma mostra so uma coisa por vez, sem rolagem longa
  const tabs = [
    { id: 'visao', label: 'Visão geral', icon: 'nav-dashboard' },
    ...(isChief ? [{ id: 'pendencias', label: 'Pendências', icon: 'clock', count: pendingEdits.length }] : []),
    { id: 'conteudo', label: 'Aulas e vídeos', icon: 'video' },
    ...(isSuperAdmin ? [{ id: 'historico', label: 'Histórico', icon: 'refresh' }] : []),
  ];
  const activeTab = tabs.some((t) => t.id === tab) ? tab : 'visao';
  const goTab = (id) => {
    setTab(id);
    try { localStorage.setItem('bfa_admin_tab', id); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Todas as aulas, agrupadas por modulo
  const groups = [];
  if (EXACT_CONTENT) {
    Object.keys(EXACT_CONTENT).forEach((subjKey) => {
      const subj = EXACT_CONTENT[subjKey];
      if (!subj || !Array.isArray(subj.modulos)) return;
      subj.modulos.forEach((mod) => {
        if (!mod || !Array.isArray(mod.aulas)) return;
        const aulas = mod.aulas.map((aula) => {
          const id = `${subjKey}-${mod.slug}-${aula.slug}`;
          const override = cmsData?.lessons?.[id] || {};
          return {
            id,
            title: aula.titulo,
            videoUrl: override.videoUrl !== undefined ? override.videoUrl : (aula.videoUrl || ''),
            isDone: !!override.isDone,
            doneBy: override.doneBy || null,
            isReviewed: !!override.isReviewed,
            reviewedBy: override.reviewedBy || null,
          };
        });
        groups.push({
          key: `${subjKey}-${mod.slug}`,
          subject: subjKey,
          subjectLabel: subjKey === 'matematica' ? 'Matemática' : 'Finanças',
          module: mod.titulo,
          aulas,
        });
      });
    });
  }
  const allLessons = groups.flatMap((g) => g.aulas);
  const totals = {
    aulas: allLessons.length,
    comVideo: allLessons.filter((a) => a.videoUrl).length,
    feitas: allLessons.filter((a) => a.isDone).length,
    revisadas: allLessons.filter((a) => a.isReviewed).length,
  };

  const q = query.trim().toLowerCase();
  const filtering = q !== '' || statusFilter !== 'todas' || subjFilter !== 'todas';
  const matches = (aula) => {
    if (q && !aula.title.toLowerCase().includes(q)) return false;
    if (statusFilter === 'sem-video' && aula.videoUrl) return false;
    if (statusFilter === 'nao-feitas' && aula.isDone) return false;
    if (statusFilter === 'nao-revisadas' && aula.isReviewed) return false;
    return true;
  };
  const visibleGroups = groups
    .filter((g) => subjFilter === 'todas' || g.subject === subjFilter)
    .map((g) => ({ ...g, visibles: g.aulas.filter(matches) }))
    .filter((g) => !filtering || g.visibles.length > 0);

  const currentUserStr = adminUser?.user_metadata?.full_name || adminUser?.name || adminUser?.email || 'Admin';
  const roleLabel = ROTULOS_PAPEL[adminUser?.role] || 'Colaborador CMS';

  const handleSaveVideoUrl = (e) => {
    e.preventDefault();
    if (!editingVideoLessonId) return;
    updateLesson(editingVideoLessonId, { videoUrl: videoUrlInput.trim() });
    setEditingVideoLessonId(null);
    setVideoUrlInput('');
  };

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
      answer: exAnswer.trim(),
    });
    setExTitle('');
    setExQuestion('');
    setExAnswer('');
    setShowAddExModal(false);
  };

  const publishLabel =
    statusPublicacao === 'publicando' ? 'Publicando...' :
    statusPublicacao === 'publicado' ? 'Publicado para todos' :
    statusPublicacao === 'erro' ? 'Erro ao publicar' : 'Publicar alterações';

  const renderLesson = (aula) => (
    <li key={aula.id} className="adm-lesson">
      <div className="adm-lesson__row">
        <span className="adm-lesson__title">{aula.title}</span>

        <div className="adm-lesson__checks">
          <label className={`adm-check${aula.isDone ? ' adm-check--on' : ''}`}>
            <input
              type="checkbox"
              checked={aula.isDone}
              onChange={(e) => updateLesson(aula.id, { isDone: e.target.checked, doneBy: e.target.checked ? currentUserStr : null })}
            />
            <span>{aula.isDone ? `Feita${aula.doneBy ? ` · ${aula.doneBy}` : ''}` : 'Marcar feita'}</span>
          </label>
          <label className={`adm-check${aula.isReviewed ? ' adm-check--on' : ''}`}>
            <input
              type="checkbox"
              checked={aula.isReviewed}
              onChange={(e) => updateLesson(aula.id, { isReviewed: e.target.checked, reviewedBy: e.target.checked ? currentUserStr : null })}
            />
            <span>{aula.isReviewed ? `Revisada${aula.reviewedBy ? ` · ${aula.reviewedBy}` : ''}` : 'Marcar revisada'}</span>
          </label>
        </div>

        <div className="adm-lesson__video">
          <span className={`adm-pill${aula.videoUrl ? ' adm-pill--ok' : ''}`}>{aula.videoUrl ? 'Com vídeo' : 'Sem vídeo'}</span>
          <button
            type="button"
            className="adm-btn adm-btn--sm"
            onClick={() => { setEditingVideoLessonId(aula.id); setVideoUrlInput(aula.videoUrl || ''); }}
          >
            {aula.videoUrl ? 'Editar' : 'Adicionar'}
          </button>
          {aula.videoUrl && (
            <button
              type="button"
              className="adm-btn adm-btn--sm adm-btn--danger"
              aria-label={`Remover vídeo da aula ${aula.title}`}
              title="Remover vídeo"
              onClick={() => {
                if (window.confirm(`Remover vídeo da aula "${aula.title}"?`)) updateLesson(aula.id, { videoUrl: '' });
              }}
            >
              <BfaIcon name="trash" size={14} />
            </button>
          )}
        </div>
      </div>

      {editingVideoLessonId === aula.id && (
        <form onSubmit={handleSaveVideoUrl} className="adm-lesson__form">
          <input
            type="url"
            className="adm-input"
            placeholder="https://www.youtube.com/watch?v=..."
            aria-label="Link do vídeo no YouTube"
            value={videoUrlInput}
            onChange={(e) => setVideoUrlInput(e.target.value)}
            autoFocus
          />
          <div className="adm-actions">
            <button type="submit" className="adm-btn adm-btn--primary adm-btn--sm">Salvar vídeo</button>
            <button type="button" className="adm-btn adm-btn--sm" onClick={() => setEditingVideoLessonId(null)}>Cancelar</button>
          </div>
        </form>
      )}
    </li>
  );

  return (
    <div className="adm">
      <header className="adm-head">
        <div className="adm-wrap adm-head__row">
          <div className="adm-head__id">
            <span className="adm-role">{roleLabel}</span>
            <h1 className="adm-title">Painel de administração</h1>
            <p className="adm-sub">{adminUser?.name || adminUser?.email}</p>
          </div>
          <div className="adm-actions">
            {isAdmin && (
              <button
                type="button"
                className="adm-btn adm-btn--primary"
                onClick={publicarConteudo}
                disabled={statusPublicacao === 'publicando'}
              >
                <BfaIcon name="nav-publish" size={16} /> {publishLabel}
              </button>
            )}
            <button type="button" className="adm-btn" onClick={logout}>Sair</button>
          </div>
        </div>
        {statusPublicacao === 'erro' && erroPublicacao && (
          <div className="adm-wrap"><p className="adm-error" role="alert">{erroPublicacao}</p></div>
        )}
      </header>

      <nav className="adm-tabs" aria-label="Seções do painel">
        <div className="adm-wrap adm-tabs__row" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTab === t.id}
              className={`adm-tab${activeTab === t.id ? ' adm-tab--active' : ''}`}
              onClick={() => goTab(t.id)}
            >
              <BfaIcon name={t.icon} size={16} />
              <span>{t.label}</span>
              {t.count > 0 && <span className="adm-tab__count">{t.count}</span>}
            </button>
          ))}
        </div>
      </nav>

      <main className="adm-wrap adm-main">
        {activeTab === 'visao' && (
          <>
            <section aria-label="Resumo" className="adm-stats">
              <div className="adm-stat"><span className="adm-stat__value">{totals.aulas}</span><span className="adm-stat__label">Aulas</span></div>
              <div className="adm-stat"><span className="adm-stat__value">{totals.comVideo}</span><span className="adm-stat__label">Com vídeo</span></div>
              <div className="adm-stat"><span className="adm-stat__value">{totals.feitas}</span><span className="adm-stat__label">Feitas</span></div>
              <div className="adm-stat"><span className="adm-stat__value">{totals.revisadas}</span><span className="adm-stat__label">Revisadas</span></div>
              {isChief && (
                <button type="button" className="adm-stat adm-stat--link" onClick={() => goTab('pendencias')}>
                  <span className="adm-stat__value">{pendingEdits.length}</span>
                  <span className="adm-stat__label">Pendências</span>
                </button>
              )}
            </section>

            <section aria-label="Cadastrar conteúdo">
              <h2 className="adm-h2">Cadastrar</h2>
              <div className="adm-quick">
                <button type="button" className="adm-quick__card" onClick={() => setShowAddModuleModal(true)}>
                  <BfaIcon name="layers" size={22} />
                  <strong>Novo módulo</strong>
                  <span>Adicionar um módulo a uma trilha</span>
                </button>
                <button type="button" className="adm-quick__card" onClick={() => setShowAddNewsModal(true)}>
                  <BfaIcon name="nav-news" size={22} />
                  <strong>Nova notícia</strong>
                  <span>Publicar na página de notícias</span>
                </button>
                <button type="button" className="adm-quick__card" onClick={() => setShowAddExModal(true)}>
                  <BfaIcon name="nav-exercises" size={22} />
                  <strong>Novo exercício</strong>
                  <span>Cadastrar no banco de exercícios</span>
                </button>
              </div>
            </section>

            <section aria-label="Atalhos">
              <h2 className="adm-h2">Ir para</h2>
              <div className="adm-links">
                <button type="button" className="adm-btn" onClick={() => goTab('conteudo')}>Aulas e vídeos</button>
                <a className="adm-btn" href="#/matematica">Ver trilha Matemática</a>
                <a className="adm-btn" href="#/financas">Ver trilha Finanças</a>
              </div>
            </section>
          </>
        )}

        {activeTab === 'pendencias' && isChief && (
          <section aria-label="Edições pendentes">
            <h2 className="adm-h2">Edições pendentes de aprovação</h2>
            <p className="adm-muted">Revise o que colaboradores enviaram antes de irem ao ar.</p>
            {pendingEdits.length === 0 ? (
              <div className="adm-empty">Nenhuma edição pendente. Tudo foi revisado.</div>
            ) : (
              <ul className="adm-list">
                {pendingEdits.map((edit) => {
                  const r = resumoEdicao(edit);
                  return (
                    <li key={edit.id || edit._id} className="adm-card">
                      <div className="adm-card__meta">
                        <span className="adm-pill">{r.tipo}</span>
                        <span className="adm-muted">{r.autor}{r.data ? ` · ${new Date(r.data).toLocaleDateString('pt-BR')}` : ''}</span>
                      </div>
                      {r.alvo && <code className="adm-code">{r.alvo}</code>}
                      {r.texto && <div className="adm-quote">{r.texto}</div>}
                      <div className="adm-actions">
                        <button type="button" className="adm-btn adm-btn--primary adm-btn--sm" onClick={() => approvePendingEdit(edit.id || edit._id)}>Aprovar</button>
                        <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => rejectPendingEdit(edit.id || edit._id)}>Rejeitar</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}

        {activeTab === 'conteudo' && (
          <section aria-label="Aulas e vídeos">
            <h2 className="adm-h2">Aulas e vídeos</h2>
            <p className="adm-muted">Abra um módulo para marcar o andamento e configurar o vídeo do YouTube de cada aula.</p>

            <div className="adm-filters">
              <input
                type="search"
                className="adm-input adm-filters__search"
                placeholder="Buscar aula pelo título"
                aria-label="Buscar aula"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select className="adm-input" aria-label="Filtrar por trilha" value={subjFilter} onChange={(e) => setSubjFilter(e.target.value)}>
                <option value="todas">Todas as trilhas</option>
                <option value="matematica">Matemática</option>
                <option value="financas">Finanças</option>
              </select>
              <select className="adm-input" aria-label="Filtrar por situação" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="todas">Todas as situações</option>
                <option value="sem-video">Sem vídeo</option>
                <option value="nao-feitas">Não feitas</option>
                <option value="nao-revisadas">Não revisadas</option>
              </select>
            </div>

            {visibleGroups.length === 0 ? (
              <div className="adm-empty">Nenhuma aula encontrada com esses filtros.</div>
            ) : (
              <div className="adm-groups">
                {visibleGroups.map((g) => {
                  const open = filtering || openGroup === g.key;
                  const feitas = g.aulas.filter((a) => a.isDone).length;
                  const revisadas = g.aulas.filter((a) => a.isReviewed).length;
                  return (
                    <div key={g.key} className={`adm-group${open ? ' adm-group--open' : ''}`}>
                      <button
                        type="button"
                        className="adm-group__head"
                        aria-expanded={open}
                        onClick={() => setOpenGroup(openGroup === g.key ? null : g.key)}
                      >
                        <span className="adm-group__name">
                          <span className="adm-group__trail">{g.subjectLabel}</span>
                          {g.module}
                        </span>
                        <span className="adm-group__progress">{feitas}/{g.aulas.length} feitas · {revisadas} revisadas</span>
                        <span className="adm-group__chevron" aria-hidden="true">{open ? '−' : '+'}</span>
                      </button>
                      {open && <ul className="adm-lessons">{g.visibles.map(renderLesson)}</ul>}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === 'historico' && isSuperAdmin && (
          <section aria-label="Histórico de publicações">
            <h2 className="adm-h2">Histórico de publicações</h2>
            <p className="adm-muted">Visível apenas para os administradores com acesso ao registro.</p>
            {loadingHistory ? (
              <div className="adm-empty">Carregando histórico...</div>
            ) : publishHistory.length === 0 ? (
              <div className="adm-empty">Nenhuma publicação registrada desde a ativação do registro.</div>
            ) : (
              <>
                <ul className="adm-list">
                  {publishHistory.slice(0, historyLimit).map((log) => (
                    <li key={log.id} className="adm-card adm-card--row">
                      <div>
                        <strong>{log.profiles?.full_name || log.profiles?.email || 'Administrador desconhecido'}</strong>
                        <span className="adm-muted adm-block">{log.profiles?.email}</span>
                      </div>
                      <span className="adm-time">{new Date(log.published_at).toLocaleString('pt-BR')}</span>
                    </li>
                  ))}
                </ul>
                {publishHistory.length > historyLimit && (
                  <div className="adm-more">
                    <button type="button" className="adm-btn" onClick={() => setHistoryLimit(historyLimit + 20)}>
                      Mostrar mais ({publishHistory.length - historyLimit})
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </main>

      {showAddModuleModal && (
        <div className="adm-modal" onClick={() => setShowAddModuleModal(false)}>
          <form className="adm-modal__card" onClick={(e) => e.stopPropagation()} onSubmit={handleCreateModule} role="dialog" aria-modal="true" aria-label="Criar novo módulo">
            <h3 className="adm-modal__title">Novo módulo</h3>
            <label className="adm-field">
              <span>Trilha</span>
              <select value={modSubjKey} onChange={(e) => setModSubjKey(e.target.value)} className="adm-input">
                <option value="financas">Finanças e Investimentos</option>
                <option value="matematica">Matemática Aplicada</option>
              </select>
            </label>
            <label className="adm-field">
              <span>Título do módulo</span>
              <input type="text" value={modTitle} onChange={(e) => setModTitle(e.target.value)} placeholder="Ex: Mercado de Derivativos e Opções" className="adm-input" required autoFocus />
            </label>
            <div className="adm-actions adm-actions--end">
              <button type="button" className="adm-btn" onClick={() => setShowAddModuleModal(false)}>Cancelar</button>
              <button type="submit" className="adm-btn adm-btn--primary">Salvar módulo</button>
            </div>
          </form>
        </div>
      )}

      {showAddNewsModal && (
        <div className="adm-modal" onClick={() => setShowAddNewsModal(false)}>
          <form className="adm-modal__card" onClick={(e) => e.stopPropagation()} onSubmit={handleCreateNews} role="dialog" aria-modal="true" aria-label="Publicar notícia">
            <h3 className="adm-modal__title">Nova notícia</h3>
            <label className="adm-field">
              <span>Título</span>
              <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="Ex: Banco Central altera metodologia de cálculo" className="adm-input" required autoFocus />
            </label>
            <label className="adm-field">
              <span>Categoria</span>
              <select value={newsCat} onChange={(e) => setNewsCat(e.target.value)} className="adm-input">
                <option value="Macroeconomia">Macroeconomia</option>
                <option value="Equity Research">Equity Research</option>
                <option value="Mercado Financeiro">Mercado Financeiro</option>
                <option value="Educação Financeira">Educação Financeira</option>
              </select>
            </label>
            <label className="adm-field">
              <span>Resumo executivo</span>
              <textarea value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} rows="3" className="adm-input" required></textarea>
            </label>
            <div className="adm-actions adm-actions--end">
              <button type="button" className="adm-btn" onClick={() => setShowAddNewsModal(false)}>Cancelar</button>
              <button type="submit" className="adm-btn adm-btn--primary">Publicar notícia</button>
            </div>
          </form>
        </div>
      )}

      {showAddExModal && (
        <div className="adm-modal" onClick={() => setShowAddExModal(false)}>
          <form className="adm-modal__card adm-modal__card--wide" onClick={(e) => e.stopPropagation()} onSubmit={handleCreateExercise} role="dialog" aria-modal="true" aria-label="Cadastrar exercício">
            <h3 className="adm-modal__title">Novo exercício</h3>
            <div className="adm-grid2">
              <label className="adm-field">
                <span>Aba do hub</span>
                <select value={exCategory} onChange={(e) => setExCategory(e.target.value)} className="adm-input">
                  <option value="fixacao">Fixação conceitual</option>
                  <option value="calculo">Cálculo financeiro</option>
                  <option value="pbl">Casos reais (PBL)</option>
                </select>
              </label>
              <label className="adm-field">
                <span>Dificuldade</span>
                <select value={exDifficulty} onChange={(e) => setExDifficulty(e.target.value)} className="adm-input">
                  <option value="Fácil">Fácil</option>
                  <option value="Médio">Médio</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </label>
            </div>
            <label className="adm-field">
              <span>Módulo relacionado</span>
              <input type="text" value={exModule} onChange={(e) => setExModule(e.target.value)} className="adm-input" required />
            </label>
            <label className="adm-field">
              <span>Título do exercício</span>
              <input type="text" value={exTitle} onChange={(e) => setExTitle(e.target.value)} placeholder="Ex: Análise da taxa de retorno real" className="adm-input" required />
            </label>
            <label className="adm-field">
              <span>Enunciado</span>
              <textarea value={exQuestion} onChange={(e) => setExQuestion(e.target.value)} rows="3" className="adm-input" required></textarea>
            </label>
            <label className="adm-field">
              <span>Resolução passo a passo (gabarito)</span>
              <textarea value={exAnswer} onChange={(e) => setExAnswer(e.target.value)} rows="3" className="adm-input" required></textarea>
            </label>
            <div className="adm-actions adm-actions--end">
              <button type="button" className="adm-btn" onClick={() => setShowAddExModal(false)}>Cancelar</button>
              <button type="submit" className="adm-btn adm-btn--primary">Salvar exercício</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export { AdminLogin };
export default AdminDashboard;
