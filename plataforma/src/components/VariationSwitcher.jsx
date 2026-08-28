const { useState, useEffect } = React;

/**
 * VariationSwitcher
 * Barra flutuante de navegação rápida para alternar entre as 4 variações de design.
 */
function VariationSwitcher() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHash = () => setCurrentHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const links = [
    { label: '🏛️ Galeria', hash: '#/galeria' },
    { label: '📊 V1: Terminal Macro', hash: '#/v1' },
    { label: '📐 V2: Caderno Brilliant', hash: '#/v2' },
    { label: '🏆 V3: Equity Research', hash: '#/v3' },
    { label: '📰 V4: Editorial Stripe', hash: '#/v4' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'rgba(9, 13, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 'var(--radius-full)',
        padding: '0.35rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
        maxWidth: '94vw',
        overflowX: 'auto'
      }}
    >
      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94A3B8', padding: '0 0.5rem', fontFamily: 'var(--font-mono)' }}>
        DESIGN LAB:
      </span>

      {links.map((lnk) => {
        const isActive = currentHash === lnk.hash;
        return (
          <a
            key={lnk.hash}
            href={lnk.hash}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              fontWeight: isActive ? 800 : 600,
              borderRadius: 'var(--radius-full)',
              background: isActive ? '#10B981' : 'transparent',
              color: isActive ? '#FFFFFF' : '#CBD5E1',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {lnk.label}
          </a>
        );
      })}
    </div>
  );
}

window.VariationSwitcher = VariationSwitcher;
