const { useState, useEffect, useRef, useCallback } = React;

// Global event bus para o audio player flutuante
window.BfaAudioBus = {
  listeners: new Set(),
  state: {
    isPlaying: false,
    title: '',
    subject: '',
    progress: 0,
    currentTime: 0,
    duration: 0,
    voice: null,
    text: '',
    speed: 1.0,
    visible: false
  },
  emit(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  },
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  },
  togglePlay() {
    if (window.speechSynthesis) {
      if (speechSynthesis.speaking) {
        if (speechSynthesis.paused) {
          speechSynthesis.resume();
          this.emit({ isPlaying: true });
        } else {
          speechSynthesis.pause();
          this.emit({ isPlaying: false });
        }
      } else if (this.state.text) {
        this.playText(this.state.text, this.state.title, this.state.subject);
      }
    }
  },
  stop() {
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
    }
    this.emit({ isPlaying: false, visible: false, progress: 0 });
  },
  playText(text, title, subject) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();

    const cleanText = text.replace(/#+\s/g, '').replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = this.state.speed || 1.0;

    const voices = speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR') || v.lang.includes('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    let charCount = 0;
    const totalChars = cleanText.length || 1;

    utterance.onboundary = (event) => {
      charCount = event.charIndex;
      const progress = Math.min(100, Math.round((charCount / totalChars) * 100));
      this.emit({ progress });
    };

    utterance.onend = () => {
      this.emit({ isPlaying: false, progress: 100 });
      setTimeout(() => {
        if (!this.state.isPlaying) {
          this.emit({ visible: false, progress: 0 });
        }
      }, 3000);
    };

    utterance.onerror = (err) => {
      console.warn('[AUDIO] Erro na síntese:', err);
      this.emit({ isPlaying: false });
    };

    speechSynthesis.speak(utterance);
    this.emit({
      isPlaying: true,
      visible: true,
      title: title || 'Leitura da Aula',
      subject: subject || 'Brasil Finanças Atlas',
      text: cleanText,
      progress: 0
    });
  }
};

function FloatingAudioBar() {
  const [audioState, setAudioState] = useState(window.BfaAudioBus.state);
  const { hapticTap } = (window.useHaptics ? window.useHaptics() : { hapticTap: () => {} });

  useEffect(() => {
    return window.BfaAudioBus.subscribe(setAudioState);
  }, []);

  if (!audioState.visible) return null;

  return (
    <div className="bfa-floating-audio-bar" aria-label="Mini-player de áudio">
      {/* Barra de progresso superior */}
      <div className="bfa-floating-audio-bar__progress-track">
        <div
          className="bfa-floating-audio-bar__progress-fill"
          style={{ width: `${audioState.progress}%` }}
        />
      </div>

      <div className="bfa-floating-audio-bar__body">
        <div className="bfa-floating-audio-bar__wave-icon">
          <span className={`bfa-audio-bar-wave ${audioState.isPlaying ? 'bfa-audio-bar-wave--anim' : ''}`} />
          <span className={`bfa-audio-bar-wave ${audioState.isPlaying ? 'bfa-audio-bar-wave--anim' : ''}`} />
          <span className={`bfa-audio-bar-wave ${audioState.isPlaying ? 'bfa-audio-bar-wave--anim' : ''}`} />
        </div>

        <div className="bfa-floating-audio-bar__info">
          <div className="bfa-floating-audio-bar__title">{audioState.title}</div>
          <div className="bfa-floating-audio-bar__sub">
            {audioState.isPlaying ? 'Ouvindo agora' : 'Pausado'} • {audioState.progress}%
          </div>
        </div>

        <div className="bfa-floating-audio-bar__controls">
          <button
            className="bfa-floating-audio-bar__play-btn"
            onClick={() => {
              hapticTap();
              window.BfaAudioBus.togglePlay();
            }}
            aria-label={audioState.isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            <BfaIcon name={audioState.isPlaying ? 'pause' : 'play'} size={16} />
          </button>

          <button
            className="bfa-floating-audio-bar__close-btn"
            onClick={() => {
              hapticTap();
              window.BfaAudioBus.stop();
            }}
            aria-label="Fechar player"
          >
            <BfaIcon name="close" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

window.FloatingAudioBar = FloatingAudioBar;
