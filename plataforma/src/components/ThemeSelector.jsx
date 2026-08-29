const { useState, useEffect, useContext, createContext } = React;

function ThemeSelector() {
  const { currentTheme, setTheme, availableThemes } = useContext(AdminContext || createContext({}));

  if (!availableThemes || availableThemes.length === 0) {
    return null;
  }

  return (
    <div className="bfa-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0 }}>
            Configuração de Temas Visuais
          </h3>
          <p className="bfa-text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Alterne o tema de design da plataforma em tempo real. A preferência é salva automaticamente no LocalStorage (<code>bfa_theme_preference</code>).
          </p>
        </div>
        <span className="bfa-badge bfa-badge--verde">
          Tema Ativo: {availableThemes.find(t => t.id === currentTheme)?.name || currentTheme}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {availableThemes.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <div
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              style={{
                backgroundColor: isActive ? 'var(--color-slate-50)' : 'var(--bg-surface)',
                border: isActive ? '2px solid var(--color-verde)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transform: isActive ? 'translateY(-2px)' : 'none'
              }}
              className="bfa-theme-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {theme.name}
                </h4>
                {isActive && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-verde)' }} title="Tema Selecionado">
                    <BfaIcon name="check" size={16} color="var(--color-verde)" />
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', minHeight: '38px', lineHeight: '1.4' }}>
                {theme.description}
              </p>

              {/* Color Swatches */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Paleta:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {theme.colors.map((colorHex, idx) => (
                    <div
                      key={idx}
                      title={colorHex}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: colorHex,
                        border: '1px solid rgba(0,0,0,0.15)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`bfa-btn bfa-btn--block bfa-btn--sm ${isActive ? 'bfa-btn--verde' : 'bfa-btn--ghost'}`}
                style={{ marginTop: '1rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(theme.id);
                }}
              >
                {isActive ? '✓ Ativo' : 'Aplicar Tema'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
