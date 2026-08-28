const { useState, useEffect, useRef } = React;

/**
 * FinancialKineticCanvas
 * Uma escultura visual generativa de alta fidelidade baseada em superfícies
 * de volatilidade e ondas de crescimento exponencial contínuo.
 * 
 * - Renderizado em Canvas 2D com blend aditivo (glow estético).
 * - Sem números ou eixos chatos: puramente visual, fluido e hipnótico.
 * - Reage organicamente ao movimento do mouse com ondas de distorção.
 */
function FinancialKineticCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 420;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for organic parallax
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

    // Ambient floating financial particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? '#10B981' : '#06B6D4'
    }));

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with dark obsidian gradient backdrop
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      bgGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 2 + p.x));
        ctx.fill();
      });

      // Enable additive blending for glowing aesthetic
      ctx.globalCompositeOperation = 'screen';

      const numLines = 28;
      const stepX = width / 36;
      const mouseInfluenceX = (mouse.x / width - 0.5) * 60;
      const mouseInfluenceY = (mouse.y / height - 0.5) * 40;

      for (let i = 0; i < numLines; i++) {
        const lineProgress = i / numLines;
        const baseY = height * 0.25 + lineProgress * (height * 0.65) + mouseInfluenceY * (1 - lineProgress);

        ctx.beginPath();

        // Create fluid gradient for each ribbon
        const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
        if (i % 3 === 0) {
          lineGrad.addColorStop(0, 'rgba(16, 185, 129, 0.0)');
          lineGrad.addColorStop(0.3, 'rgba(16, 185, 129, 0.6)');
          lineGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.8)');
          lineGrad.addColorStop(1, 'rgba(245, 158, 11, 0.2)');
        } else if (i % 3 === 1) {
          lineGrad.addColorStop(0, 'rgba(6, 182, 212, 0.0)');
          lineGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.7)');
          lineGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.5)');
          lineGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
        } else {
          lineGrad.addColorStop(0, 'rgba(245, 158, 11, 0.0)');
          lineGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.4)');
          lineGrad.addColorStop(0.9, 'rgba(6, 182, 212, 0.3)');
          lineGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
        }

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.2 + (1 - lineProgress) * 1.5;

        for (let x = -20; x <= width + 20; x += stepX) {
          const normX = x / width;

          // Mathematical wave function: exponential compound curve + harmonic ripples
          const expFactor = Math.pow(normX, 2.2) * 55; // Exponential compounding slope
          const wave1 = Math.sin(normX * 5.5 + time * 1.2 + i * 0.18) * (24 + i * 1.2);
          const wave2 = Math.cos(normX * 8.2 - time * 0.8 + i * 0.12) * (14 + i * 0.8);
          const wave3 = Math.sin(normX * 12.0 + time * 2.0) * 6;

          // Interactive mouse gravity deformation
          const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y);
          const mouseDisplacement = Math.exp(-distToMouse / 120) * 35;

          const y = baseY - expFactor + wave1 + wave2 + wave3 - mouseDisplacement;

          if (x === -20) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      // Subtle ambient overlay badge in top corner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '600 10px JetBrains Mono, monospace';
      ctx.fillText('FINANCIAL TOPOGRAPHY · 60FPS GENERATIVE MESH', 18, 24);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
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
      {/* Floating Glassmorphic Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-full)',
          padding: '0.4rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none'
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E2E8F0', fontFamily: 'var(--font-mono)' }}>
          Interativo · Mova o cursor
        </span>
      </div>
    </div>
  );
}

window.FinancialKineticCanvas = FinancialKineticCanvas;
