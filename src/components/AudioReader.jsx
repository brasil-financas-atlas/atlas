import BfaIcon from './Icons';
import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';


function AudioReader({ markdownContent, lessonTitle }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [supported, setSupported] = useState(true);

  const utteranceRef = useRef(null);

  // Strip Markdown symbols for clean Text-to-Speech narration
  const spokenText = useMemo(() => {
    if (!markdownContent) return '';
    
    let text = markdownContent;
    // Remove code blocks
    text = text.replace(/```[\s\S]*?```/g, ' Exemplo de código omitido da leitura áudio. ');
    // Remove inline code
    text = text.replace(/`([^`]+)`/g, '$1');
    // Remove headers markup
    text = text.replace(/^#+\s+/gm, '');
    // Remove bold and italic
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
    // Remove links
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    // Remove KaTeX blocks & inline math formulas
    text = text.replace(/\$\$(.*?)\$\$/gs, ' Fórmula matemática. ');
    text = text.replace(/\$(.*?)\$/g, ' fórmula ');
    // Remove blockquotes and list symbols
    text = text.replace(/^\s*>[>]*\s*/gm, '');
    text = text.replace(/^\s*[-*+]\s+/gm, '');
    text = text.replace(/^\s*\d+\.\s+/gm, '');
    // Clean excessive spaces and newlines
    text = text.replace(/\n+/g, ' ');

    return text.trim();
  }, [markdownContent]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      setVoices(availVoices);

      // Prefer pt-BR voices (e.g. Luciana, Daniel, Google português, Microsoft Maria, etc.)
      const ptVoice = availVoices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') ||
                      availVoices.find(v => v.lang.startsWith('pt'));
      if (ptVoice) {
        setSelectedVoice(ptVoice);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!supported || !spokenText) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = lessonTitle ? `${lessonTitle}. ${spokenText}` : spokenText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.lang = 'pt-BR';
    utterance.rate = rate;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
      setIsPlaying(false);
    };

    utterance.onresume = () => {
      setIsPaused(false);
      setIsPlaying(true);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!supported) return;
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleChangeSpeed = (newRate) => {
    setRate(newRate);
    if (isPlaying || isPaused) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      // Restart playback with new rate
      setTimeout(() => {
        const textToSpeak = lessonTitle ? `${lessonTitle}. ${spokenText}` : spokenText;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'pt-BR';
        utterance.rate = newRate;
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
        utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }, 100);
    }
  };

  if (!supported) {
    return (
      <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-surface)', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BfaIcon name="alert" size={14} color="var(--text-secondary)" />
        <span>Recurso de síntese de voz indisponível neste navegador.</span>
      </div>
    );
  }

  return (
    <div className="bfa-audio-reader" style={{
      background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--color-slate-50) 100%)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '0.85rem 1.25rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Label / Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <span style={{
          display: 'inline-flex',
          padding: '0.45rem',
          borderRadius: '50%',
          background: isPlaying ? 'var(--color-verde-light)' : 'var(--color-slate-100)',
          color: isPlaying ? 'var(--color-verde-dark)' : 'var(--color-slate-600)'
        }}>
          <BfaIcon name="reader" size={18} />
        </span>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-azul-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Ouvir Aula em Áudio (pt-BR)
            {isPlaying && (
              <span className="bfa-badge bfa-badge--verde" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <BfaIcon name="play" size={10} /> Lendo...
              </span>
            )}
            {isPaused && (
              <span className="bfa-badge bfa-badge--ouro" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <BfaIcon name="pause" size={10} /> Pausado
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Acessibilidade com Text-to-Speech nativo
          </span>
        </div>
      </div>

      {/* Controls Group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Main Transport Buttons */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="bfa-btn bfa-btn--verde bfa-btn--sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Iniciar / Retomar Leitura"
            >
              <BfaIcon name="play" size={12} />
              <span>{isPaused ? 'Continuar' : 'Ouvir Aula'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bfa-btn bfa-btn--ouro bfa-btn--sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Pausar Leitura"
            >
              <BfaIcon name="pause" size={12} />
              <span>Pausar</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="bfa-btn bfa-btn--ghost bfa-btn--sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--status-danger)' }}
              title="Parar Leitura"
            >
              <BfaIcon name="stop" size={12} />
              <span>Parar</span>
            </button>
          )}
        </div>

        {/* Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-surface)', padding: '0.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          {[0.75, 1, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              onClick={() => handleChangeSpeed(speed)}
              style={{
                background: rate === speed ? 'var(--color-azul)' : 'transparent',
                color: rate === speed ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.2rem 0.45rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


export default AudioReader;
