import re

with open("src/pages/AdminPages.jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("<ThemeSelector />", "")

replacement = """          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {Object.entries(
              allLessons.reduce((acc, aula) => {
                const key = `${aula.subjectLabel} - ${aula.module}`;
                if (!acc[key]) acc[key] = [];
                acc[key].push(aula);
                return acc;
              }, {})
            ).map(([groupName, aulas]) => (
              <div key={groupName} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{groupName} ({aulas.length} aulas)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {aulas.map((aula) => {
                    const cmsOverride = cmsData?.lessons?.[aula.id] || {};
                    const isDone = !!cmsOverride.isDone;
                    const doneBy = cmsOverride.doneBy || null;
                    const isReviewed = !!cmsOverride.isReviewed;
                    const reviewedBy = cmsOverride.reviewedBy || null;
                    const currentUserStr = adminUser?.user_metadata?.full_name || adminUser?.email || 'Admin';

                    return (
                      <div
                        key={aula.id}
                        style={{
                          background: 'var(--surface-strong)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{aula.title}</strong>
                          
                          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', opacity: isDone ? 1 : 0.7 }}>
                              <input 
                                type="checkbox" 
                                checked={isDone}
                                onChange={(e) => updateLesson(aula.id, { isDone: e.target.checked, doneBy: e.target.checked ? currentUserStr : null })}
                              />
                              <span style={{ color: isDone ? 'var(--track-math)' : 'var(--text-secondary)', fontWeight: isDone ? 700 : 500 }}>
                                {isDone ? `Feito por: ${doneBy}` : 'Marcar como Feito'}
                              </span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', opacity: isReviewed ? 1 : 0.7 }}>
                              <input 
                                type="checkbox" 
                                checked={isReviewed}
                                onChange={(e) => updateLesson(aula.id, { isReviewed: e.target.checked, reviewedBy: e.target.checked ? currentUserStr : null })}
                              />
                              <span style={{ color: isReviewed ? 'var(--accent-green)' : 'var(--text-secondary)', fontWeight: isReviewed ? 700 : 500 }}>
                                {isReviewed ? `Revisado por: ${reviewedBy}` : 'Marcar Revisão'}
                              </span>
                            </label>
                          </div>
                        </div>

                        {editingVideoLessonId === aula.id ? (
                          <form onSubmit={handleSaveVideoUrl} style={{ marginTop: '0.5rem' }}>
                            <input
                              type="url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              value={videoUrlInput}
                              onChange={(e) => setVideoUrlInput(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.4rem 0.6rem',
                                fontSize: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-app)',
                                color: 'var(--text-primary)',
                                marginBottom: '0.5rem'
                              }}
                              autoFocus
                            />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button type="submit" className="btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Salvar Vídeo</button>
                              <button type="button" className="btn-secondary" onClick={() => setEditingVideoLessonId(null)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Cancelar</button>
                            </div>
                          </form>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', background: 'var(--bg-app)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                            <span className="mono-tag" style={{ color: aula.videoUrl ? 'var(--market)' : 'var(--text-secondary)', fontSize: '0.7rem' }}>
                              {aula.videoUrl ? 'Vídeo configurado' : 'Sem vídeo'}
                            </span>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => {
                                  setEditingVideoLessonId(aula.id);
                                  setVideoUrlInput(aula.videoUrl || '');
                                }}
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                              >
                                {aula.videoUrl ? 'Editar Vídeo' : '+ Vídeo'}
                              </button>
                              {aula.videoUrl && (
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  onClick={() => {
                                    if (window.confirm(`Remover vídeo da aula "${aula.title}"?`)) {
                                      updateLesson(aula.id, { videoUrl: '' });
                                    }
                                  }}
                                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', color: 'var(--status-danger)', border: 'none' }}
                                >
                                  Remover
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>"""

pattern = re.compile(r"          <div style=\{\{ display: 'grid'.*?\{allLessons\.map\(\(aula\) => \(.*?\)\)\}\n          </div>", re.DOTALL)
content = pattern.sub(replacement, content)

with open("src/pages/AdminPages.jsx", "w", encoding="utf-8") as f:
    f.write(content)
