const { useState, useEffect, useRef } = React;

/* ==========================================================================
   VISUAL ENGINE 1: Topografia de Ondas Exponenciais (Kinetic Waves)
   ========================================================================== */
function renderWavesEngine(ctx, width, height, time, mouse) {
  ctx.globalCompositeOperation = 'screen';
  const numLines = 26;
  const stepX = width / 34;
  const mouseInfluenceX = (mouse.x / width - 0.5) * 50;
  const mouseInfluenceY = (mouse.y / height - 0.5) * 40;

  for (let i = 0; i < numLines; i++) {
    const lineProgress = i / numLines;
    const baseY = height * 0.22 + lineProgress * (height * 0.68) + mouseInfluenceY * (1 - lineProgress);

    ctx.beginPath();
    const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
    if (i % 3 === 0) {
      lineGrad.addColorStop(0, 'rgba(16, 185, 129, 0.0)');
      lineGrad.addColorStop(0.35, 'rgba(16, 185, 129, 0.65)');
      lineGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.8)');
      lineGrad.addColorStop(1, 'rgba(245, 158, 11, 0.2)');
    } else if (i % 3 === 1) {
      lineGrad.addColorStop(0, 'rgba(6, 182, 212, 0.0)');
      lineGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.7)');
      lineGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.5)');
      lineGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
    } else {
      lineGrad.addColorStop(0, 'rgba(245, 158, 11, 0.0)');
      lineGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.45)');
      lineGrad.addColorStop(0.9, 'rgba(6, 182, 212, 0.35)');
      lineGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    }

    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1.3 + (1 - lineProgress) * 1.5;

    for (let x = -20; x <= width + 20; x += stepX) {
      const normX = x / width;
      const expFactor = Math.pow(normX, 2.2) * 55;
      const wave1 = Math.sin(normX * 5.2 + time * 1.2 + i * 0.18) * (22 + i * 1.1);
      const wave2 = Math.cos(normX * 8.0 - time * 0.8 + i * 0.12) * (12 + i * 0.8);
      const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y);
      const mouseDisplacement = Math.exp(-distToMouse / 110) * 32;

      const y = baseY - expFactor + wave1 + wave2 - mouseDisplacement;
      if (x === -20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

/* ==========================================================================
   VISUAL ENGINE 2: Vórtice Gravitacional de Partículas (Fibonacci Vortex)
   ========================================================================== */
function renderVortexEngine(ctx, width, height, time, mouse, stateRef) {
  if (!stateRef.current.vortexParticles || stateRef.current.vortexParticles.length === 0) {
    stateRef.current.vortexParticles = Array.from({ length: 420 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * (Math.min(width, height) * 0.55) + 15,
      speed: Math.random() * 0.015 + 0.008,
      size: Math.random() * 2.2 + 0.8,
      z: Math.random() * 2 - 1,
      color: Math.random() > 0.4 ? '#10B981' : (Math.random() > 0.5 ? '#06B6D4' : '#F59E0B')
    }));
  }

  ctx.globalCompositeOperation = 'screen';
  const cx = width * 0.5 + (mouse.x - width * 0.5) * 0.15;
  const cy = height * 0.5 + (mouse.y - height * 0.5) * 0.15;

  stateRef.current.vortexParticles.forEach((p) => {
    p.angle += p.speed;
    p.radius += Math.sin(time * 2 + p.angle * 3) * 0.35;
    if (p.radius < 10) p.radius = Math.min(width, height) * 0.55;

    // Golden spiral exponential distribution
    const spiralRadius = p.radius * Math.exp(0.04 * Math.sin(p.angle * 2));
    const x = cx + Math.cos(p.angle) * spiralRadius;
    const y = cy + Math.sin(p.angle) * spiralRadius * 0.65; // Perspective flattening

    const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
    const glow = Math.max(0.2, 1 - distToMouse / 220);

    ctx.beginPath();
    ctx.arc(x, y, p.size * (1 + glow * 0.8), 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.min(1.0, 0.4 + glow * 0.6);
    ctx.fill();

    // Particle streak trail
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - Math.sin(p.angle) * 8, y + Math.cos(p.angle) * 5);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.25;
    ctx.stroke();
  });
}

/* ==========================================================================
   VISUAL ENGINE 3: Rede Geodésica de Mercados 3D (Global Capital Mesh)
   ========================================================================== */
function renderMeshEngine(ctx, width, height, time, mouse, stateRef) {
  if (!stateRef.current.meshNodes || stateRef.current.meshNodes.length === 0) {
    const nodes = [];
    const numNodes = 48;
    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      nodes.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        origZ: Math.cos(phi)
      });
    }
    stateRef.current.meshNodes = nodes;
  }

  ctx.globalCompositeOperation = 'screen';
  const cx = width * 0.5;
  const cy = height * 0.5;
  const radius = Math.min(width, height) * 0.38;

  // 3D rotation angles with mouse tilt
  const rotY = time * 0.6 + (mouse.x / width - 0.5) * 1.5;
  const rotX = Math.sin(time * 0.4) * 0.3 + (mouse.y / height - 0.5) * 1.2;

  const projectedNodes = stateRef.current.meshNodes.map((n) => {
    // Y-axis rotation
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    let x1 = n.x * cosY + n.z * sinY;
    let z1 = -n.x * sinY + n.z * cosY;

    // X-axis rotation
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    let y1 = n.y * cosX - z1 * sinX;
    let z2 = n.y * sinX + z1 * cosX;

    const scale = 300 / (300 + z2 * radius);
    return {
      x: cx + x1 * radius * scale,
      y: cy + y1 * radius * scale,
      z: z2
    };
  });

  // Connect close nodes with glowing laser lines
  for (let i = 0; i < projectedNodes.length; i++) {
    for (let j = i + 1; j < projectedNodes.length; j++) {
      const p1 = projectedNodes[i];
      const p2 = projectedNodes[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

      if (dist < radius * 0.72) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        const alpha = (1 - dist / (radius * 0.72)) * 0.45 * ((p1.z + p2.z) * 0.5 + 1.2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0, Math.min(0.8, alpha))})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
    }
  }

  // Draw node points
  projectedNodes.forEach((p, idx) => {
    const size = Math.max(1.5, (p.z + 1.2) * 2.5);
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = idx % 4 === 0 ? '#F59E0B' : (idx % 2 === 0 ? '#06B6D4' : '#10B981');
    ctx.globalAlpha = Math.max(0.3, Math.min(1.0, (p.z + 1.2) * 0.6));
    ctx.fill();
  });
}

/* ==========================================================================
   VISUAL ENGINE 4: Matriz Cyber-Trading 3D (Neon Candlesticks & Depth)
   ========================================================================== */
function renderTradingEngine(ctx, width, height, time, mouse) {
  ctx.globalCompositeOperation = 'screen';
  const numBars = 22;
  const barWidth = width / (numBars * 1.5);
  const startX = (width - numBars * barWidth * 1.4) * 0.5;
  const mouseInfluence = (mouse.y / height - 0.5) * 35;

  for (let i = 0; i < numBars; i++) {
    const progress = i / numBars;
    const x = startX + i * barWidth * 1.4;
    
    // Wave of price oscillation
    const heightMod = Math.sin(progress * 7.0 + time * 2.0 + i * 0.2) * 55 + Math.cos(progress * 4.0 - time) * 35;
    const barHeight = Math.max(30, 90 + heightMod + Math.pow(progress, 1.8) * 80);
    const y = height * 0.72 - barHeight + mouseInfluence * (progress - 0.5);

    const isBull = Math.sin(time + i * 0.5) > -0.2;
    const color = isBull ? '#10B981' : '#F59E0B';

    // Wick
    ctx.beginPath();
    ctx.moveTo(x + barWidth * 0.5, y - 18);
    ctx.lineTo(x + barWidth * 0.5, y + barHeight + 18);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.5;
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.rect(x, y, barWidth, barHeight);
    const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
    grad.addColorStop(0, isBull ? 'rgba(16, 185, 129, 0.85)' : 'rgba(245, 158, 11, 0.85)');
    grad.addColorStop(1, isBull ? 'rgba(6, 182, 212, 0.2)' : 'rgba(239, 68, 68, 0.2)');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // Neon Exponential Moving Average (EMA Ribbon)
  ctx.beginPath();
  for (let i = 0; i < numBars; i++) {
    const progress = i / numBars;
    const x = startX + i * barWidth * 1.4 + barWidth * 0.5;
    const heightMod = Math.sin(progress * 7.0 + time * 2.0 + i * 0.2) * 55 + Math.cos(progress * 4.0 - time) * 35;
    const barHeight = Math.max(30, 90 + heightMod + Math.pow(progress, 1.8) * 80);
    const y = height * 0.72 - barHeight - 12 + mouseInfluence * (progress - 0.5);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.9;
  ctx.stroke();
}

/* ==========================================================================
   VISUAL ENGINE 5: Superfície 3D de Volatilidade Black-Scholes (Manifold)
   ========================================================================== */
function renderManifoldEngine(ctx, width, height, time, mouse) {
  ctx.globalCompositeOperation = 'screen';
  const gridX = 22;
  const gridY = 16;
  const cx = width * 0.5;
  const cy = height * 0.52;

  const tiltX = (mouse.y / height - 0.5) * 0.8 + 0.55;
  const tiltY = (mouse.x / width - 0.5) * 0.8;

  const get3DPoint = (gx, gy) => {
    const normX = (gx / gridX - 0.5) * 2;
    const normY = (gy / gridY - 0.5) * 2;

    // Volatility Smile & Compounding Crest Surface Formula
    const strike = normX * 1.6;
    const maturity = (normY + 1) * 1.2;
    const volSmile = Math.pow(strike, 2) * 0.35 + Math.sin(maturity * 2.5 + time * 1.5) * 0.25;
    const expSlope = Math.exp(strike * 0.4) * 0.4;
    const z = (volSmile + expSlope) * 70;

    // Isometric projection with mouse rotation
    const isoX = (normX * Math.cos(tiltY) - normY * Math.sin(tiltY)) * (width * 0.38);
    const isoY = (normX * Math.sin(tiltY) + normY * Math.cos(tiltY)) * (height * 0.22) * Math.sin(tiltX) - z;

    return { x: cx + isoX, y: cy + isoY, z };
  };

  // Render Grid Lines (X-direction)
  for (let gy = 0; gy <= gridY; gy++) {
    ctx.beginPath();
    for (let gx = 0; gx <= gridX; gx++) {
      const pt = get3DPoint(gx, gy);
      if (gx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    const alpha = (gy / gridY) * 0.65 + 0.15;
    ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }

  // Render Grid Lines (Y-direction)
  for (let gx = 0; gx <= gridX; gx++) {
    ctx.beginPath();
    for (let gy = 0; gy <= gridY; gy++) {
      const pt = get3DPoint(gx, gy);
      if (gy === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    const alpha = (gx / gridX) * 0.5 + 0.2;
    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }
}

/* ==========================================================================
   VISUAL ENGINE 6: Caleidoscópio Geométrico Fractal (Golden Geometry)
   ========================================================================== */
function renderFractalEngine(ctx, width, height, time, mouse) {
  ctx.globalCompositeOperation = 'screen';
  const cx = width * 0.5 + (mouse.x - width * 0.5) * 0.12;
  const cy = height * 0.5 + (mouse.y - height * 0.5) * 0.12;
  const numRings = 14;

  for (let i = 1; i <= numRings; i++) {
    const ringRadius = Math.pow(i / numRings, 1.4) * (Math.min(width, height) * 0.48);
    const rotation = time * (0.35 / i) * (i % 2 === 0 ? 1 : -1);
    const sides = 6 + (i % 3) * 2; // Hexagons and octagons

    ctx.beginPath();
    for (let s = 0; s <= sides; s++) {
      const angle = (s / sides) * Math.PI * 2 + rotation;
      const x = cx + Math.cos(angle) * ringRadius;
      const y = cy + Math.sin(angle) * ringRadius;

      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    const grad = ctx.createLinearGradient(cx - ringRadius, cy, cx + ringRadius, cy);
    if (i % 3 === 0) {
      grad.addColorStop(0, 'rgba(245, 158, 11, 0.7)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0.4)');
    } else if (i % 3 === 1) {
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0.5)');
    } else {
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.7)');
      grad.addColorStop(1, 'rgba(245, 158, 11, 0.3)');
    }

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.2 + (i / numRings) * 1.4;
    ctx.stroke();
  }
}

/* ==========================================================================
   Master Component: FinancialKineticCanvas (com Seletor Interativo)
   ========================================================================== */
function FinancialKineticCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({});
  const [activeEngine, setActiveEngine] = useState('waves');

  const engines = [
    { id: 'waves', label: '🌊 Ondas Exponenciais', desc: 'Fitas de juros contínuos e superfície de liquidez' },
    { id: 'vortex', label: '🌀 Vórtice de Partículas', desc: 'Espiral logarítmica de Fibonacci e atrator' },
    { id: 'mesh', label: '🌐 Rede Geodésica 3D', desc: 'Malha geométrica de interconexão global' },
    { id: 'trading', label: '📊 Candlestick Neon', desc: 'Profundidade cibernética de mercado e fita EMA' },
    { id: 'manifold', label: '🏔️ Superfície 3D', desc: 'Topografia de volatilidade Black-Scholes' },
    { id: 'fractal', label: '❄️ Fractais Dourados', desc: 'Geometria sagrada e expansão proporcional' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 440);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 440;
    };

    window.addEventListener('resize', handleResize);

    let mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width * 0.5;
      mouse.targetY = height * 0.5;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.018;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Deep Obsidian background with subtle radial glow
      const bgGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        20,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.09)');
      bgGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0.98)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Active Engine
      switch (activeEngine) {
        case 'waves':
          renderWavesEngine(ctx, width, height, time, mouse);
          break;
        case 'vortex':
          renderVortexEngine(ctx, width, height, time, mouse, stateRef);
          break;
        case 'mesh':
          renderMeshEngine(ctx, width, height, time, mouse, stateRef);
          break;
        case 'trading':
          renderTradingEngine(ctx, width, height, time, mouse);
          break;
        case 'manifold':
          renderManifoldEngine(ctx, width, height, time, mouse);
          break;
        case 'fractal':
          renderFractalEngine(ctx, width, height, time, mouse);
          break;
        default:
          renderWavesEngine(ctx, width, height, time, mouse);
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeEngine]);

  const currentMeta = engines.find(e => e.id === activeEngine) || engines[0];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '460px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.8)',
        background: '#030712'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'crosshair'
        }}
      />

      {/* Top Floating Engine Switcher Pills */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          zIndex: 10,
          scrollbarWidth: 'none'
        }}
      >
        {engines.map((eng) => (
          <button
            key={eng.id}
            type="button"
            onClick={() => setActiveEngine(eng.id)}
            style={{
              background: activeEngine === eng.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(10px)',
              border: activeEngine === eng.id ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.12)',
              color: activeEngine === eng.id ? '#FFFFFF' : '#94A3B8',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: activeEngine === eng.id ? 800 : 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: activeEngine === eng.id ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
            }}
          >
            {eng.label}
          </button>
        ))}
      </div>

      {/* Bottom Floating Info Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem 0.95rem',
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F1F5F9' }}>
            {currentMeta.desc}
          </span>
        </div>
        <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
          60 FPS · Mova o mouse
        </span>
      </div>
    </div>
  );
}

window.FinancialKineticCanvas = FinancialKineticCanvas;
