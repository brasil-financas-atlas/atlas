const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

const BADGES_LIST = [
  {
    id: 'badge-iniciado',
    title: 'Estudante Olímpico',
    category: 'Participação',
    iconName: 'award',
    color: '#D97706',
    desc: 'Concluiu seu primeiro simulado cronometrado oficial da BRHSIC.',
    criteria: 'Completar 1 simulado qualquer no sistema.'
  },
  {
    id: 'badge-renda-fixa',
    title: 'Mestre da Renda Fixa',
    category: 'Especialidade',
    iconName: 'medal',
    color: '#06B6D4',
    desc: 'Dominou Tesouro Direto, taxa Selic, inflação e marcação a mercado.',
    criteria: 'Acertar 100% das questões da competência Renda Fixa em uma prova.'
  },
  {
    id: 'badge-valuation',
    title: 'Analista de Equity Research',
    category: 'Especialidade',
    iconName: 'trophy',
    color: '#10B981',
    desc: 'Capacidade comprovada de valuation, múltiplos de mercado e DDM.',
    criteria: 'Acertar 100% das questões da competência Ações & Valuation.'
  },
  {
    id: 'badge-carteira',
    title: 'Gestor de Portfólio',
    category: 'Prática',
    iconName: 'shield',
    color: '#6366F1',
    desc: 'Construiu carteira equilibrada e concluiu os desafios no Simulador.',
    criteria: 'Completar os desafios interativos do Simulador de Carteira.'
  },
  {
    id: 'badge-velocista',
    title: 'Velocista Olímpico',
    category: 'Agilidade',
    iconName: 'zap',
    color: '#F59E0B',
    desc: 'Velocidade e precisão: prova finalizada em tempo recorde com alto aproveitamento.',
    criteria: 'Terminar um simulado em menos de 50% do tempo com mais de 80% de acerto.'
  },
  {
    id: 'badge-gabarito',
    title: 'Gabarito Perfeito',
    category: 'Excelência',
    iconName: 'crown',
    color: '#EC4899',
    desc: 'Desempenho impecável de 100% de acerto na prova da 1ª Fase.',
    criteria: 'Atingir 100% de acerto no Simulado Geral da 1ª Fase BRHSIC.'
  },
  {
    id: 'badge-ranking',
    title: 'Top 10 Nacional',
    category: 'Competição',
    iconName: 'trophy',
    color: '#8B5CF6',
    desc: 'Registrou sua marca no Leaderboard Nacional de Escolas da BRHSIC.',
    criteria: 'Submeter um resultado oficial no Ranking Nacional.'
  },
  {
    id: 'badge-lenda',
    title: 'Lenda das Finanças',
    category: 'Grão-Mestre',
    iconName: 'sparkles',
    color: '#F59E0B',
    desc: 'Completou todas as conquistas do programa oficial preparatório.',
    criteria: 'Desbloquear todas as outras 7 conquistas.'
  }
];

function BadgesConquistas() {
  const [unlockedBadges, setUnlockedBadges] = useState({});
  const [selectedBadge, setSelectedBadge] = useState(null);
  const studentName = localStorage.getItem('bfa_student_name') || 'Estudante BRHSIC';

  useEffect(() => {
    try {
      const attempts = JSON.parse(localStorage.getItem('bfa_simulados_attempts') || '[]');
      const leaderboards = JSON.parse(localStorage.getItem('bfa_leaderboard_entries') || '[]');

      const status = {};

      // 1. Concluiu pelo menos 1 simulado
      if (attempts.length >= 1) {
        status['badge-iniciado'] = true;
      }

      // 2 & 3: Checar 100% de acerto em competencias específicas
      attempts.forEach(att => {
        if (att.categoriaBreakdown) {
          if (att.categoriaBreakdown['Renda Fixa'] && att.categoriaBreakdown['Renda Fixa'].pct === 100) {
            status['badge-renda-fixa'] = true;
          }
          if (att.categoriaBreakdown['Ações & Valuation'] && att.categoriaBreakdown['Ações & Valuation'].pct === 100) {
            status['badge-valuation'] = true;
          }
        }
        // 5: Velocista (< 50% do tempo e > 80% de acerto)
        if (att.scorePct >= 80 && att.timeSpentSeconds && att.durationMinutes) {
          const totalAllowedSec = att.durationMinutes * 60;
          if (att.timeSpentSeconds <= totalAllowedSec / 2) {
            status['badge-velocista'] = true;
          }
        }
        // 6: Gabarito Perfeito na 1a Fase
        if (att.simuladoId === 'sim-brhsic-2024-fase1' && att.scorePct === 100) {
          status['badge-gabarito'] = true;
        }
      });

      // 4: Carteira (verificar no localStorage flag da carteira)
      if (localStorage.getItem('bfa_carteira_completed') === 'true') {
        status['badge-carteira'] = true;
      }

      // 7: Top 10 Nacional
      if (leaderboards.length > 0) {
        status['badge-ranking'] = true;
      }

      // 8: Lenda das Finanças (se tem as 7 anteriores)
      const count = Object.keys(status).length;
      if (count >= 7) {
        status['badge-lenda'] = true;
      }

      setUnlockedBadges(status);
    } catch (e) {
      console.warn("Erro ao calcular conquistas:", e);
    }
  }, []);

  const unlockedCount = Object.keys(unlockedBadges).length;

  return (
    <div className="bfa-badges-page" style={{ padding: '2rem 0' }}>
      {/* Header & Progresso */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="mono-tag" style={{ color: 'var(--color-ouro)', fontWeight: 800 }}>
          SISTEMA DE CONQUISTAS & PASSAPORTE OLÍMPICO
        </span>
        <h1 className="headline-punch" style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0' }}>
          Conquistas & Medalhas BRHSIC
        </h1>
        <p style={{ color: 'var(--muted-foreground)', maxWidth: '650px', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Resolva simulados, alcance alta precisão e desbloqueie as credenciais oficiais que atestam seu domínio em finanças e matemática aplicada.
        </p>

        {/* Barra de Progresso Geral */}
        <div style={{ marginTop: '1.5rem', background: 'var(--surface-strong)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', maxWidth: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <span>Medalhas Conquistadas</span>
            <span style={{ color: 'var(--color-ouro)' }}>{unlockedCount} de {BADGES_LIST.length}</span>
          </div>
          <div style={{ height: '8px', background: 'var(--border)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${(unlockedCount / BADGES_LIST.length) * 100}%`, height: '100%', background: 'var(--color-ouro)', transition: 'width 0.3s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-verde-dark)', fontWeight: 600 }}>
            {Math.round((unlockedCount / BADGES_LIST.length) * 100)}% Desbloqueado
          </span>
        </div>
      </div>

      {/* Grid de Badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {BADGES_LIST.map(badge => {
          const isUnlocked = !!unlockedBadges[badge.id];

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className="bfa-bento-card card-lift"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: isUnlocked ? `2px solid ${badge.color}` : '1px solid var(--border)',
                background: isUnlocked ? 'var(--surface-strong)' : 'var(--card)',
                opacity: isUnlocked ? 1 : 0.6,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: 'var(--radius-md)', background: isUnlocked ? `${badge.color}22` : 'var(--surface-strong)' }}>
                    <BfaIcon name={badge.iconName} size={28} color={badge.color} />
                  </span>
                  <span className="mono-tag" style={{
                    color: isUnlocked ? badge.color : 'var(--muted-foreground)',
                    background: isUnlocked ? 'rgba(255, 255, 255, 0.08)' : 'var(--border)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <BfaIcon name={isUnlocked ? "check" : "lock"} size={12} />
                    <span>{isUnlocked ? 'Desbloqueado' : 'Bloqueado'}</span>
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                  {badge.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {badge.desc}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                <strong>Critério:</strong> {badge.criteria}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal do Certificado / Badge Oficial */}
      {selectedBadge && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'var(--card)',
            maxWidth: '480px',
            width: '100%',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            border: `2px solid ${selectedBadge.color}`,
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: `${selectedBadge.color}22`, marginBottom: '1rem' }}>
              <BfaIcon name={selectedBadge.iconName} size={48} color={selectedBadge.color} />
            </div>
            <div>
              <span className="mono-tag" style={{ color: selectedBadge.color, background: 'var(--surface-strong)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontWeight: 800 }}>
                BRHSIC OFFICIAL BADGE
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.75rem 0 0.4rem 0' }}>
              {selectedBadge.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
              {selectedBadge.desc}
            </p>

            <div style={{ background: 'var(--surface-strong)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.82rem' }}>
              <div style={{ color: 'var(--muted-foreground)', marginBottom: '0.2rem' }}>Concedido a:</div>
              <strong style={{ color: 'var(--foreground)', fontSize: '0.95rem' }}>{studentName}</strong>
              <div style={{ marginTop: '0.5rem', color: 'var(--muted-foreground)' }}>
                Status: <strong style={{ color: unlockedBadges[selectedBadge.id] ? 'var(--color-verde-dark)' : '#EF4444' }}>{unlockedBadges[selectedBadge.id] ? 'AUTENTICADO' : 'NÃO CONCLUÍDO'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="bfa-btn bfa-btn--outline"
              >
                Fechar
              </button>
              <a href="#/simulados" className="bfa-btn bfa-btn--ouro" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Fazer Simulado</span>
                <BfaIcon name="arrowRight" size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.BadgesConquistas = BadgesConquistas;
