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
  const restartTimerRef = useRef(null);
  const rateRef = useRef(1);
  const voiceRef = useRef(null);

  // Remove a marcacao do Markdown para a leitura em voz alta
  const spokenText = useMemo(() => {
    if (!markdownContent) return '';

    let text = markdownContent;
    // Blocos de codigo
    text = text.replace(/```[\s\S]*?```/g, ' Exemplo de código omitido da leitura áudio. ');
    // Codigo em linha
    text = text.replace(/`([^`]+)`/g, '$1');
    // Titulos
    text = text.replace(/^#+\s+/gm, '');
    // Negrito e italico
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
    // Links
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    // Valores em reais ("R$ 4.000", "R$4.000") viram "4.000 reais" antes de
    // tratar o LaTeX, para o "$" da moeda nao ser lido como formula.
    // (o caractere antes do R evita pegar "IR$" do fim de uma formula)
    text = text.replace(/(^|[^\w\\{])R\$\s*(\d(?:[\d.,]*\d)?(?:\s*(?:mil|milh(?:ão|ões)|bilh(?:ão|ões)))?)/gi, '$1$2 reais');
    text = text.replace(/(^|[^\w\\{])R\$/g, '$1reais');
    // Formulas KaTeX: bloco $$...$$ e em linha $...$ (sem espaco logo depois
    // do primeiro $ nem logo antes do ultimo)
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, ' Fórmula matemática. ');
    text = text.replace(/\$(?=\S)([^$\n]*?\S)\$/g, ' fórmula ');
    // Citacoes e marcadores de lista
    text = text.replace(/^\s*>[>]*\s*/gm, '');
    text = text.replace(/^\s*[-*+]\s+/gm, '');
    text = text.replace(/^\s*\d+\.\s+/gm, '');
    // Espacos e quebras de linha
    text = text.replace(/\n+/g, ' ');

    return text.trim();
  }, [markdownContent]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
      return undefined;
    }

    const loadVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      setVoices(availVoices);

      // Prefere vozes pt-BR
      const ptVoice = availVoices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') ||
                      availVoices.find(v => v.lang.startsWith('pt'));
      if (ptVoice) {
        voiceRef.current = ptVoice;
        setSelectedVoice(ptVoice);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      clearTimeout(restartTimerRef.current);
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Trocou o conteudo (outra aula ou edicao): para a leitura antiga.
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    clearTimeout(restartTimerRef.current);
    utteranceRef.current = null;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, [spokenText, lessonTitle]);

  const falar = () => {
    const textToSpeak = lessonTitle ? `${lessonTitle}. ${spokenText}` : spokenText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    utterance.rate = rateRef.current;
    if (voiceRef.current) utterance.voice = voiceRef.current;

    // Eventos de uma fala ja substituida sao ignorados.
    const atual = () => utteranceRef.current === utterance;
    utterance.onend = () => {
      if (!atual()) return;
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = (e) => {
      if (!atual()) return;
      if (e && e.error !== 'interrupted' && e.error !== 'canceled') console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onpause = () => {
      if (!atual()) return;
      setIsPaused(true);
      setIsPlaying(false);
    };
    utterance.onresume = () => {
      if (!atual()) return;
      setIsPaused(false);
      setIsPlaying(true);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePlay = () => {
    if (!supported || !spokenText) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    clearTimeout(restartTimerRef.current);
    utteranceRef.current = null;
    window.speechSynthesis.cancel();
    falar();
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
    clearTimeout(restartTimerRef.current);
    utteranceRef.current = null;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleChangeSpeed = (newRate) => {
    rateRef.current = newRate;
    setRate(newRate);
    const tocando = isPlaying || isPaused || restartTimerRef.current !== null;
    if (!supported || !tocando) return;
    // Cliques rapidos: so a ultima velocidade vale. O temporizador anterior
    // e cancelado e a fala recomeca lendo a velocidade atual da ref.
    clearTimeout(restartTimerRef.current);
    utteranceRef.current = null;
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setIsPaused(false);
    restartTimerRef.current = setTimeout(() => {
      restartTimerRef.current = null;
      falar();
    }, 120);
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
      background: 'var(--bg-surface)',
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
