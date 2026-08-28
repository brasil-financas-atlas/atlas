const { useState } = React;

/* ==========================================================================
   STATIC ARTWORK 1: Infográfico Arquitetônico de Convexidade (Stripe Press)
   ========================================================================== */
function StaticArtworkConvexity() {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="curveGlow1" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="areaFill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* Dark Isometric Grid Background */}
      <g opacity="0.15" stroke="#94A3B8" strokeWidth="0.75">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h-${i}`} x1="40" y1={40 + i * 26} x2="460" y2={40 + i * 26} strokeDasharray="3 3" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v-${i}`} x1={40 + i * 32} y1="40" x2={40 + i * 32} y2="330" strokeDasharray="3 3" />
        ))}
      </g>

      {/* Coordinate Axes */}
      <line x1="40" y1="330" x2="470" y2="330" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="40" y2="330" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Linear Baseline (Dashed Amber) */}
      <line x1="40" y1="330" x2="460" y2="170" stroke="#F59E0B" strokeWidth="1.75" strokeDasharray="6 6" opacity="0.6" />
      <text x="360" y="160" fill="#F59E0B" fontSize="10" fontFamily="var(--font-mono)" opacity="0.8">
        f(t) = C · (1 + i·t) [Linear]
      </text>

      {/* Compounding Exponential Area */}
      <path
        d="M 40 330 Q 180 325, 290 220 T 460 50 L 460 330 Z"
        fill="url(#areaFill1)"
      />

      {/* Main Exponential Curve */}
      <path
        d="M 40 330 Q 180 325, 290 220 T 460 50"
        fill="none"
        stroke="url(#curveGlow1)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Secondary Harmonic Wave */}
      <path
        d="M 40 310 C 120 280, 200 320, 280 250 S 400 130, 460 90"
        fill="none"
        stroke="#06B6D4"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.5"
      />

      {/* Mathematical Key Points */}
      <circle cx="290" cy="220" r="14" fill="url(#nodeGlow)" />
      <circle cx="290" cy="220" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="305" y="224" fill="#E2E8F0" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">
        t* = Inflection Point
      </text>

      <circle cx="460" cy="50" r="18" fill="url(#nodeGlow)" />
      <circle cx="460" cy="50" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
      <text x="340" y="45" fill="#34D399" fontSize="12" fontWeight="800" fontFamily="var(--font-mono)">
        M(t) = C · e^(r·t)
      </text>

      {/* Tangent Slope Vector */}
      <line x1="230" y1="260" x2="350" y2="180" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
      <text x="210" y="275" fill="#94A3B8" fontSize="9" fontFamily="var(--font-mono)">
        dM/dt = r · M(t)
      </text>

      {/* Bottom Axis Labels */}
      <text x="40" y="350" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono)">t = 0</text>
      <text x="280" y="350" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono)">t = n/2</text>
      <text x="445" y="350" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono)">t = N (Perpetuidade)</text>
    </svg>
  );
}

/* ==========================================================================
   STATIC ARTWORK 2: Espiral de Fibonacci & Proporção Áurea dos Mercados
   ========================================================================== */
function StaticArtworkFibonacci() {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="goldSpiralGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Grid Pattern */}
      <g opacity="0.1" stroke="#FFFFFF" strokeWidth="0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx="260" cy="190" r={20 + i * 22} fill="none" />
        ))}
        <line x1="40" y1="190" x2="480" y2="190" />
        <line x1="260" y1="20" x2="260" y2="360" />
      </g>

      {/* Golden Rectangles Hierarchy */}
      <rect x="70" y="50" width="360" height="222" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
      <rect x="292" y="50" width="138" height="222" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />
      <rect x="292" y="188" width="138" height="84" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />
      <rect x="292" y="188" width="54" height="84" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.2" />

      {/* Golden Spiral Logarithmic Curve */}
      <path
        d="M 70 272 A 222 222 0 0 1 292 50 A 138 138 0 0 1 430 188 A 84 84 0 0 1 346 272 A 54 54 0 0 1 292 218 A 32 32 0 0 1 324 186"
        fill="none"
        stroke="url(#goldSpiralGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Geometric Fibonacci Annotations */}
      <text x="85" y="80" fill="#F59E0B" fontSize="16" fontWeight="800" fontFamily="var(--font-mono)">
        φ = 1,618033...
      </text>
      <text x="85" y="100" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono)">
        Proporção Áurea & Sequência de Fibonacci
      </text>

      <text x="305" y="175" fill="#34D399" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">
        r = a · e^(b·θ)
      </text>

      <g transform="translate(85, 310)">
        <text x="0" y="0" fill="#E2E8F0" fontSize="11" fontWeight="700">Sequência Construtiva:</text>
        <text x="0" y="18" fill="#38BDF8" fontSize="10" fontFamily="var(--font-mono)">
          1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377...
        </text>
      </g>
    </svg>
  );
}

/* ==========================================================================
   STATIC ARTWORK 3: Topografia Isométrica da Estrutura a Termo (Yield Curve)
   ========================================================================== */
function StaticArtworkTopography() {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="topoGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Isometric Grid Floor */}
      <g opacity="0.15" stroke="#FFFFFF" strokeWidth="0.75">
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 200 + i * 16;
          return <line key={i} x1="50" y1={y} x2="450" y2={y} />;
        })}
      </g>

      {/* Topographic Contour Elevation Ribbons */}
      {Array.from({ length: 7 }).map((_, i) => {
        const offsetY = 60 + i * 36;
        const alpha = 0.3 + (i / 7) * 0.7;
        return (
          <g key={i} opacity={alpha}>
            <path
              d={`M 50 ${offsetY + 90} Q 150 ${offsetY - 20}, 260 ${offsetY + 40} T 450 ${offsetY - 10}`}
              fill="none"
              stroke="url(#topoGrad)"
              strokeWidth={i === 6 ? '3.5' : '1.5'}
            />
            {i === 6 && (
              <path
                d={`M 50 ${offsetY + 90} Q 150 ${offsetY - 20}, 260 ${offsetY + 40} T 450 ${offsetY - 10} L 450 330 L 50 330 Z`}
                fill="rgba(16, 185, 129, 0.08)"
              />
            )}
          </g>
        );
      })}

      {/* Labels */}
      <text x="60" y="45" fill="#34D399" fontSize="13" fontWeight="800" fontFamily="var(--font-mono)">
        ESTRUTURA A TERMO DAS TAXAS DE JUROS (ETTF)
      </text>
      <text x="60" y="65" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono)">
        Curva Zero-Cupom & Superfície de Volatilidade de Nelson-Siegel
      </text>

      <g transform="translate(60, 345)">
        <text x="0" y="0" fill="#E2E8F0" fontSize="10" fontFamily="var(--font-mono)">Vértice 1M (Over-Selic)</text>
        <text x="170" y="0" fill="#E2E8F0" fontSize="10" fontFamily="var(--font-mono)">Vértice 5Y (DI1 / NTN-F)</text>
        <text x="320" y="0" fill="#E2E8F0" fontSize="10" fontFamily="var(--font-mono)">Vértice 30Y (NTN-B)</text>
      </g>
    </svg>
  );
}

/* ==========================================================================
   STATIC ARTWORK 4: Diagrama de Arquitetura do Sistema Financeiro (SFN)
   ========================================================================== */
function StaticArtworkSFN() {
  return (
    <svg viewBox="0 0 500 380" style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Node 1: CMN / BACEN */}
      <g transform="translate(60, 60)">
        <rect width="160" height="60" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#10B981" strokeWidth="1.5" />
        <text x="14" y="24" fill="#34D399" fontSize="11" fontWeight="800" fontFamily="var(--font-mono)">
          BACEN · BANCO CENTRAL
        </text>
        <text x="14" y="42" fill="#E2E8F0" fontSize="9">
          Copom / Taxa Selic 10,50%
        </text>
      </g>

      {/* Node 2: CVM & B3 */}
      <g transform="translate(280, 60)">
        <rect width="160" height="60" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#06B6D4" strokeWidth="1.5" />
        <text x="14" y="24" fill="#38BDF8" fontSize="11" fontWeight="800" fontFamily="var(--font-mono)">
          CVM & BOLSA B3
        </text>
        <text x="14" y="42" fill="#E2E8F0" fontSize="9">
          Ações, FIIs e Derivativos
        </text>
      </g>

      {/* Connector lines with pulses */}
      <line x1="140" y1="120" x2="140" y2="180" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="360" y1="120" x2="360" y2="180" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="140" y1="180" x2="360" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

      {/* Node 3: Transmissão / Renda Fixa */}
      <g transform="translate(60, 180)">
        <rect width="160" height="60" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="14" y="24" fill="#FBBF24" fontSize="11" fontWeight="800" fontFamily="var(--font-mono)">
          TESOURO NACIONAL
        </text>
        <text x="14" y="42" fill="#E2E8F0" fontSize="9">
          Selic, Prefixado, IPCA+
        </text>
      </g>

      {/* Node 4: Mercado Corporativo */}
      <g transform="translate(280, 180)">
        <rect width="160" height="60" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#A855F7" strokeWidth="1.5" />
        <text x="14" y="24" fill="#C084FC" fontSize="11" fontWeight="800" fontFamily="var(--font-mono)">
          EQUITY RESEARCH
        </text>
        <text x="14" y="42" fill="#E2E8F0" fontSize="9">
          Valuation DCF & Múltiplos
        </text>
      </g>

      {/* Final Destination: O Aluno do Atlas */}
      <g transform="translate(130, 280)">
        <rect width="240" height="65" rx="10" fill="rgba(5, 150, 105, 0.15)" stroke="#10B981" strokeWidth="2" />
        <text x="16" y="26" fill="#FFFFFF" fontSize="12" fontWeight="800">
          🎓 BRASIL FINANÇAS ATLAS
        </text>
        <text x="16" y="46" fill="#34D399" fontSize="10" fontFamily="var(--font-mono)">
          55 Aulas · Simulações · BRHSIC
        </text>
      </g>
    </svg>
  );
}

/* ==========================================================================
   Master Component: FinancialKineticCanvas (Galeria de Obras Estáticas)
   ========================================================================== */
function FinancialKineticCanvas() {
  const [activeArtwork, setActiveArtwork] = useState('convexity');

  const artworks = [
    { id: 'convexity', label: '📐 Infográfico Convexidade', title: 'Curva Exponencial & Cálculo de Juros' },
    { id: 'fibonacci', label: '🌀 Espiral de Fibonacci', title: 'Proporção Áurea & Geometria Financeira' },
    { id: 'topography', label: '🏔️ Topografia de Taxas', title: 'Estrutura a Termo da Curva de Juros' },
    { id: 'sfn', label: '🏛️ Arquitetura do Mercado', title: 'Mapeamento do Sistema Financeiro Nacional' }
  ];

  const currentMeta = artworks.find(a => a.id === activeArtwork) || artworks[0];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '450px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.8)',
        background: '#040813',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Static Switcher Pills */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          padding: '10px 12px 6px 12px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          zIndex: 10
        }}
      >
        {artworks.map((art) => (
          <button
            key={art.id}
            type="button"
            onClick={() => setActiveArtwork(art.id)}
            style={{
              background: activeArtwork === art.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
              border: activeArtwork === art.id ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
              color: activeArtwork === art.id ? '#FFFFFF' : '#94A3B8',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: activeArtwork === art.id ? 800 : 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {art.label}
          </button>
        ))}
      </div>

      {/* SVG Canvas Content (100% Static & Print-Shop Quality) */}
      <div style={{ flex: 1, padding: '1rem', position: 'relative' }}>
        {activeArtwork === 'convexity' && <StaticArtworkConvexity />}
        {activeArtwork === 'fibonacci' && <StaticArtworkFibonacci />}
        {activeArtwork === 'topography' && <StaticArtworkTopography />}
        {activeArtwork === 'sfn' && <StaticArtworkSFN />}
      </div>

      {/* Bottom Footer Info */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(11, 15, 25, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.45rem 1rem'
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399' }}>
          {currentMeta.title}
        </span>
        <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
          Ilustração Editorial Estática
        </span>
      </div>
    </div>
  );
}

window.FinancialKineticCanvas = FinancialKineticCanvas;
