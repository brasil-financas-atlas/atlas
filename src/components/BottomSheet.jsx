import { useHaptics } from '../utils/touchGestures';
import BottomSheet from './BottomSheet';
import BfaIcon from './Icons';
import React, { useState, useEffect, useRef, useCallback } from 'react';


/**
 * BottomSheet nativa e deslizante para Mobile com suporte a arrastar para fechar
 */
function BottomSheet({ isOpen, onClose, title, subtitle, children, maxHeight = '85vh', showHandle = true }) {
  const [touchStartY, setTouchStartY] = useState(0);
  const [currentTranslateY, setCurrentTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef(null);
  const { hapticTap } = (useHaptics());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrentTranslateY(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches || e.touches.length !== 1) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY;
    // Apenas permite arrastar para baixo (valores positivos)
    if (deltaY > 0) {
      setCurrentTranslateY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Se arrastou mais de 80px para baixo, fecha a BottomSheet
    if (currentTranslateY > 80) {
      hapticTap();
      onClose();
    } else {
      setCurrentTranslateY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bfa-bottom-sheet-overlay" onClick={onClose}>
      <div
        ref={sheetRef}
        className={`bfa-bottom-sheet ${isDragging ? 'bfa-bottom-sheet--dragging' : ''}`}
        style={{
          maxHeight: maxHeight,
          transform: currentTranslateY > 0 ? `translateY(${currentTranslateY}px)` : 'translateY(0)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showHandle && (
          <div
            className="bfa-bottom-sheet__handle-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="bfa-bottom-sheet__handle" />
          </div>
        )}

        {(title || subtitle) && (
          <div className="bfa-bottom-sheet__header">
            <div>
              {title && <h3 className="bfa-bottom-sheet__title">{title}</h3>}
              {subtitle && <p className="bfa-bottom-sheet__subtitle">{subtitle}</p>}
            </div>
            <button
              className="bfa-bottom-sheet__close-btn"
              onClick={() => {
                hapticTap();
                onClose();
              }}
              aria-label="Fechar gaveta"
            >
              <BfaIcon name="close" size={16} />
            </button>
          </div>
        )}

        <div className="bfa-bottom-sheet__content">
          {children}
        </div>
      </div>
    </div>
  );
}


export default BottomSheet;
