const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;
function VideoPlayer({ videoUrl, onTimeUpdate, playerRef }) {
  const iframeRef = useRef(null);

  // Extract YouTube ID if valid
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getYouTubeId(videoUrl);

  if (!videoUrl || !ytId) {
    return (
      <div className="bfa-video-placeholder">
        <div className="bfa-video-placeholder__content">
          <div className="bfa-video-placeholder__icon" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--color-azul-light)', margin: '0 auto 0.75rem auto' }}>
            <BfaIcon name="video" size={48} color="var(--color-azul)" />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', margin: '0 0 0.35rem 0' }}>
            Material Didático Completo
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', margin: '0 0 0.75rem 0' }}>
            Esta aula possui fundamentação teórica analítica, demonstrações matemáticas e verificação de aprendizagem abaixo.
          </p>
          <span className="bfa-badge bfa-badge--gold">Brasil Finanças Atlas</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bfa-video-wrapper">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1`}
        title="Videoaula BFA"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function ForumTimestamps({ lessonId }) {
  const { comments, addComment, addReply } = useContext(ProgressContext || createContext({}));
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [timestampMinutes, setTimestampMinutes] = useState(0);
  const [timestampSeconds, setTimestampSeconds] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyText, setReplyText] = useState('');

  const lessonComments = (comments && comments[lessonId]) || [];

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const totalSecs = (parseInt(timestampMinutes) || 0) * 60 + (parseInt(timestampSeconds) || 0);

    addComment(lessonId, {
      author: newAuthor.trim() || 'Estudante',
      text: newText.trim(),
      timestamp: totalSecs
    });

    setNewText('');
  };

  const handleCreateReply = (commentId) => {
    if (!replyText.trim()) return;

    addReply(lessonId, commentId, {
      author: replyAuthor.trim() || 'Estudante',
      text: replyText.trim()
    });

    setReplyText('');
    setReplyingTo(null);
  };

  const formatSecs = (totalSecs) => {
    const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const s = (totalSecs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bfa-forum">
      <div className="bfa-forum__header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BfaIcon name="chat" size={22} color="var(--color-azul)" /> Fórum de Dúvidas & Comentários ({lessonComments.length})
        </h3>
        <p>Faça uma pergunta e marque o minuto exato da aula!</p>
      </div>

      <form onSubmit={handleCreateComment} className="bfa-forum__form">
        <div className="bfa-forum__form-row">
          <input
            type="text"
            placeholder="Seu nome ou apelido"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="bfa-input"
          />
          <div className="bfa-timestamp-picker">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <BfaIcon name="clock" size={14} color="var(--text-secondary)" /> Minuto:
            </span>
            <input
              type="number"
              min="0"
              placeholder="00"
              value={timestampMinutes}
              onChange={(e) => setTimestampMinutes(e.target.value)}
              className="bfa-input bfa-input--num"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="00"
              value={timestampSeconds}
              onChange={(e) => setTimestampSeconds(e.target.value)}
              className="bfa-input bfa-input--num"
            />
          </div>
        </div>
        <textarea
          placeholder="Escreva sua dúvida ou observação sobre esta aula..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="bfa-textarea"
          rows="3"
          required
        ></textarea>
        <button type="submit" className="bfa-btn bfa-btn--verde">
          Publicar comentário
        </button>
      </form>

      <div className="bfa-forum__threads">
        {lessonComments.length === 0 ? (
          <div className="bfa-forum__empty">
            Nenhuma dúvida registrada ainda. Seja o primeiro a comentar!
          </div>
        ) : (
          lessonComments.map((c) => (
            <div key={c.id} className="bfa-forum__card">
              <div className="bfa-forum__card-header">
                <span className="bfa-forum__author" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <BfaIcon name="user" size={14} color="var(--color-azul)" /> {c.author}
                </span>
                <span className="bfa-forum__timestamp" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <BfaIcon name="clock" size={14} color="var(--color-ouro-dark)" /> {formatSecs(c.timestamp || 0)}
                </span>
                <span className="bfa-forum__date">
                  {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="bfa-forum__card-text">{c.text}</p>

              <button
                className="bfa-btn-link"
                onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
              >
                Responder
              </button>

              {/* Nested replies */}
              {c.replies && c.replies.length > 0 && (
                <div className="bfa-forum__replies">
                  {c.replies.map((r) => (
                    <div key={r.id} className="bfa-forum__reply">
                      <div className="bfa-forum__reply-header">
                        <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <BfaIcon name="user" size={13} color="var(--color-azul)" /> {r.author}
                        </strong>
                        <span>{new Date(r.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <p>{r.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyingTo === c.id && (
                <div className="bfa-forum__reply-form">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={replyAuthor}
                    onChange={(e) => setReplyAuthor(e.target.value)}
                    className="bfa-input"
                  />
                  <textarea
                    placeholder="Escreva sua resposta..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="bfa-textarea"
                    rows="2"
                  ></textarea>
                  <div className="bfa-btn-group">
                    <button
                      type="button"
                      className="bfa-btn bfa-btn--sm bfa-btn--azul"
                      onClick={() => handleCreateReply(c.id)}
                    >
                      Enviar Resposta
                    </button>
                    <button
                      type="button"
                      className="bfa-btn bfa-btn--sm bfa-btn--ghost"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
