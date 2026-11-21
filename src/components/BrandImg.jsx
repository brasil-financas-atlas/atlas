import React, { useState } from 'react';

// Logo da BRHSIC carregado do site principal. Se a imagem falhar (host fora do
// ar ou bloqueado), mostra o nome em texto no lugar, com a mesma altura.
const LOGOS = {
  lockup: 'https://brhsic-main.vercel.app/brand/brhsic-lockup.png',
  symbol: 'https://brhsic-main.vercel.app/brand/brhsic-symbol.png',
};

export default function BrandImg({ variant = 'lockup', alt = 'BRHSIC', className, style }) {
  const [falhou, setFalhou] = useState(false);
  if (falhou) {
    const altura = (style && style.height) || '1.5rem';
    return (
      <span
        className={className}
        role="img"
        aria-label={alt}
        style={{
          ...style,
          height: altura,
          width: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '0.06em',
          fontSize: `calc(${altura} * 0.62)`,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        BRHSIC
      </span>
    );
  }
  return (
    <img
      src={LOGOS[variant] || LOGOS.lockup}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFalhou(true)}
    />
  );
}
