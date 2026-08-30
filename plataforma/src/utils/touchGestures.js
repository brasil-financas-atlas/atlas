// Utilitários de Gestos de Toque e Feedback Háptico para Mobile (BFA)
const { useState, useEffect, useRef, useCallback } = React;

/**
 * Hook para feedback tátil (vibração) em dispositivos móveis compatíveis
 */
function useHaptics() {
  const isSupported = typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator;

  const trigger = useCallback((pattern) => {
    if (isSupported) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignora silenciosamente se o browser bloquear
      }
    }
  }, [isSupported]);

  const hapticTap = useCallback(() => trigger(12), [trigger]);
  const hapticSuccess = useCallback(() => trigger([20, 30, 25]), [trigger]);
  const hapticError = useCallback(() => trigger([45, 30, 45]), [trigger]);
  const hapticMilestone = useCallback(() => trigger([30, 40, 30, 40, 60]), [trigger]);

  return {
    isSupported,
    hapticTap,
    hapticSuccess,
    hapticError,
    hapticMilestone
  };
}

/**
 * Hook para detecção de gestos de swipe horizontal (deslizar abas, avançar aulas)
 */
function useSwipeGesture({ onSwipeLeft, onSwipeRight, threshold = 55, maxVerticalOffset = 65 }) {
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const [swiping, setSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const onTouchStart = useCallback((e) => {
    if (e.touches && e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      touchMoveRef.current = { x: touch.clientX, y: touch.clientY };
      setSwiping(true);
      setSwipeOffset(0);
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!swiping || !e.touches || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    // Se o movimento for predominantemente vertical, não consideramos swipe horizontal
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 30) {
      setSwiping(false);
      setSwipeOffset(0);
      return;
    }

    touchMoveRef.current = { x: touch.clientX, y: touch.clientY };
    // Damping effect no arrasto
    setSwipeOffset(diffX * 0.35);
  }, [swiping]);

  const onTouchEnd = useCallback(() => {
    if (!swiping) return;
    setSwiping(false);
    setSwipeOffset(0);

    const diffX = touchMoveRef.current.x - touchStartRef.current.x;
    const diffY = touchMoveRef.current.y - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    // Apenas se o deslocamento vertical for aceitável e o horizontal atingir o limiar
    if (Math.abs(diffY) <= maxVerticalOffset && duration < 600) {
      if (diffX < -threshold && onSwipeLeft) {
        onSwipeLeft();
      } else if (diffX > threshold && onSwipeRight) {
        onSwipeRight();
      }
    }
  }, [swiping, threshold, maxVerticalOffset, onSwipeLeft, onSwipeRight]);

  return {
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    },
    swiping,
    swipeOffset
  };
}

/**
 * Hook para detectar direção do scroll e controlar auto-hide da barra inferior
 */
function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        return;
      }

      if (currentScrollY <= 20) {
        setScrollDirection('up');
      } else if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [threshold]);

  return { scrollDirection, scrollY, isHidden: scrollDirection === 'down' && scrollY > 80 };
}

window.useHaptics = useHaptics;
window.useSwipeGesture = useSwipeGesture;
window.useScrollDirection = useScrollDirection;
