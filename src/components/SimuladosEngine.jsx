import { SIMULADOS_DATA } from '../data/simuladosData';
import BfaIcon from './Icons';
import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';


function SimuladosEngine() {
  const simuladosList = SIMULADOS_DATA || [];
  const [selectedSimuladoId, setSelectedSimuladoId] = useState('simulado-oficial-1');
  const [examState, setExamState] = useState('intro'); // 'intro' | 'running' | 'finished'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Formulário de submissão ao ranking
  const [rankingName, setRankingName] = useState(() => localStorage.getItem('bfa_student_name') || '');
  const [rankingSchool, setRankingSchool] = useState(() => localStorage.getItem('bfa_student_school') || '');
  const [rankingUF, setRankingUF] = useState(() => localStorage.getItem('bfa_student_uf') || 'SP');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeSimulado = useMemo(() => {
    return simuladosList.find(s => s.id === selectedSimuladoId) || simuladosList[0];
  }, [selectedSimuladoId, simuladosList]);

  // Contagem regressiva
  useEffect(() => {
    let timer = null;
    if (examState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examState, timeLeft]);

  const startExam = (simuladoId) => {
    setSelectedSimuladoId(simuladoId);
    const chosen = simuladosList.find(s => s.id === simuladoId) || simuladosList[0];
    setTimeLeft(chosen.duracaoMinutos * 60);
    setAnswers({});
    setFlags({});
    setCurrentIdx(0);
    setStartTime(Date.now());
    setIsSubmitted(false);
    setExamState('running');
    window.scrollTo(0, 0);
  };

  const finishExam = () => {
    const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    setTimeSpentSeconds(elapsed);
    setExamState('finished');
    setIsConfirmOpen(false);
    window.scrollTo(0, 0);

    // Salvar progresso de badges no LocalStorage
    try {
      const storedAttempts = JSON.parse(localStorage.getItem('bfa_simulados_attempts') || '[]');
      const score = Object.entries(answers).filter(([qId, ansIdx]) => {
        const q = activeSimulado.questoes.find(item => item.id === parseInt(qId, 10));
        return q && q.correta === ansIdx;
      }).length;

      storedAttempts.push({
        simuladoId: activeSimulado.id,
        score,
        total: activeSimulado.questoes.length,
        date: new Date().toISOString(),
        timeSpent: elapsed
      });
      localStorage.setItem('bfa_simulados_attempts', JSON.stringify(storedAttempts));
    } catch (e) {
      console.warn('Erro ao salvar tentativa local:', e);
    }
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const toggleFlag = (qId) => {
    setFlags(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Estatísticas e Relatório Pós-Prova
  const examStats = useMemo(() => {
    if (!activeSimulado) return { score: 0, percentage: 0, byCompetence: {} };

    let correctCount = 0;
    const byComp = {};

    activeSimulado.questoes.forEach(q => {
      const isAnswered = answers[q.id] !== undefined;
      const isCorrect = isAnswered && answers[q.id] === q.correta;
      if (isCorrect) correctCount++;

      if (!byComp[q.competencia]) {
        byComp[q.competencia] = {
          name: q.competenciaNome,
          total: 0,
          correct: 0
        };
      }
      byComp[q.competencia].total++;
      if (isCorrect) byComp[q.competencia].correct++;
    });

    const total = activeSimulado.questoes.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      correctCount,
      total,
      percentage,
      byCompetence: byComp
    };
  }, [activeSimulado, answers]);

  // Formatação de Tempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Submissão do resultado ao Ranking Leaderboard
  const handleSubmitRanking = (e) => {
    e.preventDefault();
    if (!rankingName.trim()) return;

    localStorage.setItem('bfa_student_name', rankingName.trim());
    localStorage.setItem('bfa_student_school', rankingSchool.trim());
    localStorage.setItem('bfa_student_uf', rankingUF);

    const newEntry = {
      id: 'entry-' + Date.now(),
      name: rankingName.trim(),
      school: rankingSchool.trim() || 'Colégio Estadual',
      uf: rankingUF,
      simuladoTitulo: activeSimulado.titulo,
      score: examStats.correctCount,
      total: examStats.total,
      percentage: examStats.percentage,
      timeFormatted: formatTime(timeSpentSeconds),
      date: new Date().toLocaleDateString('pt-BR')
    };

    try {
      const storedLeaderboard = JSON.parse(localStorage.getItem('bfa_leaderboard_entries') || '[]');
      storedLeaderboard.push(newEntry);
      localStorage.setItem('bfa_leaderboard_entries', JSON.stringify(storedLeaderboard));
      setIsSubmitted(true);
    } catch (err) {
      console.error('Erro ao registrar no ranking:', err);
    }
  };

  // TELA 1: Seleção e Introdução de Simulados
  if (examState === 'intro') {
    return (
      <div className="bfa-card" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
            <span className="bfa-badge bfa-badge--ouro">
              <BfaIcon name="trophy" size={14} color="var(--color-ouro)" /> Preparatório Oficial BRHSIC
            </span>
            <span className="bfa-badge bfa-badge--verde">Cronometrado</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
            Centro de Simulados da Olimpíada
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            Treine em condições reais de prova da <strong>1ª Fase da BRHSIC</strong>. Resolva questões cronometradas, marque dúvidas para revisão e analise seu relatório por competência com gabarito comentado.
          </p>
        </div>

        {/* Grade de Simulados Disponíveis */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {simuladosList.map(simulado => (
            <div
              key={simulado.id}
              className="bfa-bento-card card-lift"
              style={{
                borderTop: '4px solid var(--color-ouro)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--surface-strong)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="mono-tag" style={{ color: 'var(--color-ouro)', background: 'rgba(245, 158, 11, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                    {simulado.nivel}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BfaIcon name="clock" size={14} /> {simulado.duracaoMinutos} min
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {simulado.titulo}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {simulado.subtitulo}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {simulado.totalQuestoes} Questões
                </span>
                <button
                  type="button"
                  onClick={() => startExam(simulado.id)}
                  className="bfa-btn bfa-btn--ouro"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Iniciar Simulado</span>
                  <BfaIcon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instruções Oficiais */}
        <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BfaIcon name="lightbulb" size={18} color="var(--color-ouro)" /> Regras & Instruções da Prova:
          </h4>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>O cronômetro regressivo começa assim que você clica em <strong>Iniciar Simulado</strong>.</li>
            <li>Você pode navegar livremente entre as questões pela barra lateral e marcar itens para revisão.</li>
            <li>Ao final do tempo limite, o sistema encerra automaticamente e gera seu relatório diagnóstico.</li>
            <li>Sua pontuação pode ser registrada no <strong>Ranking Nacional de Escolas da BRHSIC</strong>.</li>
          </ul>
        </div>
      </div>
    );
  }

  // TELA 2: Prova em Andamento (Interface Cronometrada)
  if (examState === 'running') {
    const q = activeSimulado.questoes[currentIdx];
    const isAnswered = answers[q.id] !== undefined;
    const isFlagged = flags[q.id] || false;
    const answeredCount = Object.keys(answers).length;
    const totalQ = activeSimulado.questoes.length;

    return (
      <div className="bfa-simulado-running" style={{ padding: '1rem 0 3rem 0' }}>
        {/* Top Header com Timer e Ações */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--surface-strong)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--color-ouro)', fontWeight: 800 }}>PROVA OFICIAL EM ANDAMENTO</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0 0 0' }}>{activeSimulado.titulo}</h3>
          </div>

          {/* Cronômetro */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: timeLeft <= 300 ? 'rgba(239, 68, 68, 0.15)' : 'var(--card)',
            color: timeLeft <= 300 ? '#EF4444' : 'var(--text-primary)',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            border: `1px solid ${timeLeft <= 300 ? '#EF4444' : 'var(--border-color)'}`,
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <BfaIcon name="timer" size={18} color={timeLeft <= 300 ? "#EF4444" : "var(--color-ouro)"} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Botão de Finalizar */}
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="bfa-btn bfa-btn--verde"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Finalizar Prova</span>
            <BfaIcon name="arrowRight" size={14} />
          </button>
        </div>

        {/* Layout Grid: Questão + Grade Lateral */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Coluna da Questão Atual */}
          <div className="bfa-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="bfa-badge bfa-badge--azul">Questão {currentIdx + 1} de {totalQ}</span>
                <span className="mono-tag" style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                  {q.competenciaNome}
                </span>
              </div>

              {/* Botão de Flag / Revisão */}
              <button
                type="button"
                onClick={() => toggleFlag(q.id)}
                style={{
                  background: isFlagged ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                  border: isFlagged ? '1px solid var(--color-ouro)' : '1px solid var(--border-color)',
                  color: isFlagged ? 'var(--color-ouro)' : 'var(--text-secondary)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <BfaIcon name="bookmark" size={14} color={isFlagged ? "var(--color-ouro)" : "currentColor"} />
                <span>{isFlagged ? 'Marcada p/ Revisão' : 'Marcar p/ Revisão'}</span>
              </button>
            </div>

            {/* Enunciado */}
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500, marginBottom: '2rem' }}>
              {q.enunciado}
            </p>

            {/* Alternativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {q.alternativas.map((alt, idx) => {
                const isSelected = answers[q.id] === idx;
                const letter = String.fromCharCode(65 + idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectAnswer(q.id, idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--color-verde-dark)' : '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'var(--card)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--color-verde-dark)' : 'var(--surface-strong)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {letter}
                    </span>
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {alt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Navegação Entre Questões */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="bfa-btn bfa-btn--outline"
                style={{ opacity: currentIdx === 0 ? 0.4 : 1, cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
              >
                ◀ Questão Anterior
              </button>

              <button
                type="button"
                disabled={currentIdx === totalQ - 1}
                onClick={() => setCurrentIdx(prev => Math.min(totalQ - 1, prev + 1))}
                className="bfa-btn bfa-btn--ouro"
                style={{ opacity: currentIdx === totalQ - 1 ? 0.4 : 1, cursor: currentIdx === totalQ - 1 ? 'not-allowed' : 'pointer' }}
              >
                Próxima Questão ▶
              </button>
            </div>
          </div>

          {/* Coluna Lateral: Mapa de Navegação */}
          <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Grade de Questões
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
              {activeSimulado.questoes.map((item, idx) => {
                const answered = answers[item.id] !== undefined;
                const flagged = !!flags[item.id];
                const isActive = currentIdx === idx;

                let bg = 'var(--card)';
                let borderColor = 'var(--border-color)';
                let textColor = 'var(--text-primary)';

                if (answered) {
                  bg = 'rgba(16, 185, 129, 0.15)';
                  borderColor = 'var(--color-verde-dark)';
                  textColor = 'var(--color-verde-dark)';
                }
                if (flagged) {
                  bg = 'rgba(245, 158, 11, 0.2)';
                  borderColor = 'var(--color-ouro)';
                }
                if (isActive) {
                  borderColor = 'var(--color-azul-accent)';
                  borderWidth = '2px';
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    style={{
                      height: '38px',
                      borderRadius: '6px',
                      background: bg,
                      border: `1px solid ${borderColor}`,
                      color: textColor,
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      position: 'relative',
                      outline: isActive ? '2px solid var(--color-azul-accent)' : 'none'
                    }}
                  >
                    {idx + 1}
                    {flagged && (
                      <span style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '10px' }}>🚩</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legenda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--color-verde-dark)' }} /> Respondida
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid var(--color-ouro)' }} /> Marcada p/ Revisão
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--card)', border: '1px solid var(--border-color)' }} /> Em Branco
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Confirmação de Finalização */}
        {isConfirmOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
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
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Deseja finalizar o simulado?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Você respondeu <strong>{answeredCount}</strong> de <strong>{totalQ}</strong> questões.
                {totalQ - answeredCount > 0 && (
                  <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.4rem', fontWeight: 600 }}>
                    <BfaIcon name="alert" size={14} color="#EF4444" />
                    <span>Atenção: {totalQ - answeredCount} questão(ões) continuam em branco!</span>
                  </span>
                )}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(false)}
                  className="bfa-btn bfa-btn--outline"
                >
                  Voltar à Prova
                </button>
                <button
                  type="button"
                  onClick={finishExam}
                  className="bfa-btn bfa-btn--verde"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Confirmar e Ver Gabarito</span>
                  <BfaIcon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // TELA 3: Relatório Diagnóstico & Gabarito Comentado
  return (
    <div className="bfa-card" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
      {/* Cabeçalho do Resultado */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <span className="bfa-badge bfa-badge--ouro" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <BfaIcon name="trophy" size={16} color="var(--color-ouro)" />
          <span>Resultado Oficial — Simulado BRHSIC</span>
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.35rem 0' }}>
          {examStats.correctCount} / {examStats.total} Acertos ({examStats.percentage}%)
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Tempo gasto: <strong>{formatTime(timeSpentSeconds)}</strong> · Nível: <strong>{activeSimulado.nivel}</strong>
        </p>
      </div>

      {/* Grid de Desempenho por Competência */}
      <div style={{ background: 'var(--surface-strong)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BfaIcon name="math" size={18} color="var(--color-ouro)" /> Diagnóstico por Competência da BRHSIC
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(examStats.byCompetence).map(([key, data]) => {
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.name}</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: pct >= 70 ? 'var(--color-verde-dark)' : '#EF4444' }}>
                    {data.correct}/{data.total} ({pct}%)
                  </span>
                </div>
                <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: pct >= 70 ? 'var(--color-verde-dark)' : (pct >= 40 ? 'var(--color-ouro)' : '#EF4444'), transition: 'width 0.3s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submissão ao Ranking Nacional */}
      <div style={{ background: 'linear-gradient(135deg, var(--card) 0%, var(--surface-strong) 100%)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-ouro)', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BfaIcon name="award" size={20} color="var(--color-ouro)" /> Registrar Resultado no Ranking Nacional BRHSIC
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Veja sua posição entre estudantes de todo o Brasil e represente sua escola!
            </p>
          </div>
          <a href="#/ranking" className="bfa-btn bfa-btn--outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>Ver Leaderboard Completo</span>
            <BfaIcon name="arrowRight" size={12} />
          </a>
        </div>

        {isSubmitted ? (
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--color-verde-dark)', borderRadius: 'var(--radius-md)', color: 'var(--color-verde-dark)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="check" size={16} color="var(--color-verde-dark)" />
            <span>Pontuação registrada com sucesso no Ranking Nacional!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmitRanking} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>Seu Nome:</label>
              <input
                type="text"
                required
                placeholder="Ex: Ana Clara Silva"
                value={rankingName}
                onChange={(e) => setRankingName(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--card)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>Escola / Colégio:</label>
              <input
                type="text"
                placeholder="Ex: Colégio Militar / EEEP"
                value={rankingSchool}
                onChange={(e) => setRankingSchool(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--card)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>Estado (UF):</label>
              <select
                value={rankingUF}
                onChange={(e) => setRankingUF(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--card)', color: 'var(--text-primary)' }}
              >
                {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bfa-btn bfa-btn--ouro"
              style={{ padding: '0.55rem 1.25rem', height: '38px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Publicar no Ranking</span>
              <BfaIcon name="arrowRight" size={14} />
            </button>
          </form>
        )}
      </div>

      {/* Gabarito Comentado Questão a Questão */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BfaIcon name="fileText" size={20} color="var(--color-verde-dark)" /> Gabarito Comentado & Resolução Passo a Passo
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {activeSimulado.questoes.map((item, idx) => {
          const userAns = answers[item.id];
          const isCorrect = userAns === item.correta;
          const isBlank = userAns === undefined;

          return (
            <div
              key={item.id}
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: isCorrect ? '1px solid var(--color-verde-dark)' : '1px solid #EF4444',
                background: isCorrect ? 'rgba(16, 185, 129, 0.03)' : 'rgba(239, 68, 68, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ fontSize: '0.95rem', color: isCorrect ? 'var(--color-verde-dark)' : '#EF4444', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <BfaIcon name={isCorrect ? "check" : (isBlank ? "circle" : "close")} size={14} />
                  <span>Questão {idx + 1} · {isCorrect ? 'Acertou' : (isBlank ? 'Em Branco' : 'Errou')}</span>
                </strong>
                <span className="mono-tag" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  {item.competenciaNome}
                </span>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 500 }}>
                {item.enunciado}
              </p>

              {/* Alternativas com Destaque de Correção */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {item.alternativas.map((alt, optIdx) => {
                  const isThisCorrect = optIdx === item.correta;
                  const isThisUserAns = optIdx === userAns;

                  let optBg = 'var(--card)';
                  let optBorder = 'var(--border-color)';
                  let optColor = 'var(--text-primary)';

                  if (isThisCorrect) {
                    optBg = 'rgba(16, 185, 129, 0.12)';
                    optBorder = 'var(--color-verde-dark)';
                    optColor = 'var(--color-verde-dark)';
                  } else if (isThisUserAns && !isThisCorrect) {
                    optBg = 'rgba(239, 68, 68, 0.12)';
                    optBorder = '#EF4444';
                    optColor = '#EF4444';
                  }

                  return (
                    <div
                      key={optIdx}
                      style={{
                        padding: '0.65rem 0.95rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${optBorder}`,
                        background: optBg,
                        fontSize: '0.88rem',
                        color: optColor,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>
                        <strong>{String.fromCharCode(65 + optIdx)})</strong> {alt}
                      </span>
                      {isThisCorrect && <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Gabarito Oficial</span>}
                      {isThisUserAns && !isThisCorrect && <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Sua Escolha</span>}
                    </div>
                  );
                })}
              </div>

              {/* Resolução Comentada */}
              <div style={{ padding: '0.85rem', background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-secondary)', borderLeft: '3px solid var(--color-ouro)' }}>
                <strong style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.2rem' }}>
                  <BfaIcon name="lightbulb" size={15} color="var(--color-ouro)" />
                  <span>Resolução Comentada:</span>
                </strong>
                {item.explicacao}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botões de Ação Final */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setExamState('intro')}
          className="bfa-btn bfa-btn--outline"
        >
          Voltar aos Simulados
        </button>
        <button
          type="button"
          onClick={() => startExam(activeSimulado.id)}
          className="bfa-btn bfa-btn--ouro"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <span>Refazer este Simulado</span>
          <BfaIcon name="arrowRight" size={14} />
        </button>
        <a href="#/conquistas" className="bfa-btn bfa-btn--verde" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>Ver Conquistas & Badges</span>
          <BfaIcon name="award" size={14} />
        </a>
      </div>
    </div>
  );
}


export default SimuladosEngine;
