const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function QuizEngine({ questions, lessonId }) {
  const { isAuthenticated, inlineEditActive, cmsData, updateLesson } = useContext(AdminContext || createContext({}));
  const { saveQuizScore, getQuizScore } = useContext(ProgressContext || createContext({}));

  const quizQuestions = useMemo(() => {
    if (cmsData?.lessons?.[lessonId]?.customQuiz && cmsData.lessons[lessonId].customQuiz.length > 0) {
      return cmsData.lessons[lessonId].customQuiz;
    }
    if (cmsData?.quizzes?.[lessonId] && cmsData.quizzes[lessonId].length > 0) {
      return cmsData.quizzes[lessonId];
    }
    return questions || [];
  }, [cmsData, lessonId, questions]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Quiz Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingQuestionIdx, setEditingQuestionIdx] = useState(null); // null = new, number = edit
  const [qText, setQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [qExpl, setQExpl] = useState('');

  const openAddModal = () => {
    setEditingQuestionIdx(null);
    setQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectIdx(0);
    setQExpl('');
    setShowModal(true);
  };

  const openEditModal = (idx) => {
    const q = quizQuestions[idx];
    if (!q) return;
    setEditingQuestionIdx(idx);
    setQText(q.pergunta || '');
    setOptA(q.alternativas?.[0] || '');
    setOptB(q.alternativas?.[1] || '');
    setOptC(q.alternativas?.[2] || '');
    setOptD(q.alternativas?.[3] || '');
    setCorrectIdx(q.correta !== undefined ? q.correta : 0);
    setQExpl(q.explicacao || '');
    setShowModal(true);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!qText.trim() || !optA.trim() || !optB.trim()) return;

    const newQuestionObj = {
      pergunta: qText.trim(),
      alternativas: [optA.trim(), optB.trim(), optC.trim() || 'N.D.A.', optD.trim() || 'N.D.A.'],
      correta: parseInt(correctIdx, 10),
      explicacao: qExpl.trim() || 'Explicação do professor.'
    };

    let updatedList;
    if (editingQuestionIdx !== null) {
      updatedList = quizQuestions.map((q, i) => (i === editingQuestionIdx ? newQuestionObj : q));
    } else {
      updatedList = [...quizQuestions, newQuestionObj];
    }

    if (updateLesson) {
      updateLesson(lessonId, { customQuiz: updatedList });
    }

    setShowModal(false);
  };

  const handleDeleteQuestion = (idx) => {
    if (!window.confirm("Deseja realmente excluir esta questão do quiz?")) return;

    const updatedList = quizQuestions.filter((_, i) => i !== idx);
    if (updateLesson) {
      updateLesson(lessonId, { customQuiz: updatedList });
    }

    if (currentIdx >= updatedList.length) {
      setCurrentIdx(Math.max(0, updatedList.length - 1));
    }
  };

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="bfa-quiz bfa-quiz--empty" style={{ padding: '2rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <BfaIcon name="target" size={20} color="var(--color-azul)" /> Quiz de Fixação
        </h4>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Esta aula ainda não possui questões interativas cadastradas.</p>
        {isAuthenticated && inlineEditActive && (
          <button
            type="button"
            className="bfa-btn bfa-btn--ouro bfa-btn--sm"
            onClick={openAddModal}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <BfaIcon name="pencil" size={14} /> + Cadastrar Primeira Questão (Admin)
          </button>
        )}
      </div>
    );
  }

  const currentQ = quizQuestions[currentIdx] || quizQuestions[0];
  const previousHighScore = getQuizScore ? getQuizScore(lessonId) : null;

  const handleSelectOption = (idx) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correta;
    const newAnswers = [...answers, { question: currentIdx, isCorrect, selected: selectedOption }];
    setAnswers(newAnswers);
    setSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      if (saveQuizScore) {
        saveQuizScore(lessonId, score, quizQuestions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const finalScore = score;
    const pct = Math.round((finalScore / quizQuestions.length) * 100);

    return (
      <div className="bfa-quiz bfa-quiz--finished">
        <div className="bfa-quiz__result-icon" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--color-ouro-light)', margin: '0 auto 1rem auto' }}>
          <BfaIcon name={pct >= 80 ? "trophy" : pct >= 50 ? "thumbsUp" : "book"} size={48} color="var(--color-ouro-dark)" />
        </div>
        <h3>Resultado do Quiz</h3>
        <div className="bfa-quiz__score-display">
          <span className="bfa-quiz__score-num">{finalScore} / {quizQuestions.length}</span>
          <span className="bfa-quiz__score-pct">{pct}% de acertos</span>
        </div>

        {pct >= 80 && (
          <div className="bfa-quiz__badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BfaIcon name="sparkles" size={16} color="var(--color-ouro-dark)" /> Excelente! Você dominou os conceitos desta aula.
          </div>
        )}

        {previousHighScore !== null && (
          <p className="bfa-quiz__prev-score">
            Sua melhor pontuação anterior: {previousHighScore} acertos
          </p>
        )}

        <button onClick={handleRestart} className="bfa-btn bfa-btn--ouro" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <BfaIcon name="refresh" size={16} /> Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bfa-quiz">
      <div className="bfa-quiz__header">
        <div className="bfa-quiz__title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BfaIcon name="target" size={20} color="var(--color-azul)" /> Quiz Interativo
          </span>
          <span className="bfa-quiz__progress-text">
            Questão {currentIdx + 1} de {quizQuestions.length}
          </span>
        </div>
        <div className="bfa-quiz__bar">
          <div
            className="bfa-quiz__bar-fill"
            style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bfa-quiz__question">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <h4>{currentQ.pergunta}</h4>
          {isAuthenticated && inlineEditActive && (
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => openEditModal(currentIdx)}
                title="Editar esta questão"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
              >
                <BfaIcon name="pencil" size={13} /> Editar
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => handleDeleteQuestion(currentIdx)}
                title="Excluir esta questão"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', color: 'var(--status-danger)' }}
              >
                <BfaIcon name="trash" size={13} /> Excluir
              </button>
            </div>
          )}
        </div>

        <div className="bfa-quiz__options">
          {currentQ.alternativas && currentQ.alternativas.map((opt, i) => {
            let stateClass = '';
            if (submitted) {
              if (i === currentQ.correta) stateClass = 'correct';
              else if (i === selectedOption) stateClass = 'wrong';
            } else if (selectedOption === i) {
              stateClass = 'selected';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(i)}
                className={`bfa-quiz__option ${stateClass}`}
                disabled={submitted}
              >
                <span className="bfa-quiz__option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="bfa-quiz__option-text">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {submitted && (
        <div className={`bfa-quiz__feedback ${selectedOption === currentQ.correta ? 'success' : 'error'}`}>
          <div className="bfa-quiz__feedback-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {selectedOption === currentQ.correta ? (
              <><BfaIcon name="checkCircle" size={18} color="var(--color-verde)" /> Resposta Correta!</>
            ) : (
              <><BfaIcon name="close" size={18} color="var(--status-danger)" /> Resposta Incorreta</>
            )}
          </div>
          <p className="bfa-quiz__explanation">{currentQ.explicacao}</p>
        </div>
      )}

      <div className="bfa-quiz__actions">
        {isAuthenticated && inlineEditActive && (
          <button
            type="button"
            className="bfa-btn bfa-btn--ouro bfa-btn--sm"
            onClick={openAddModal}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginRight: 'auto' }}
          >
            <BfaIcon name="pencil" size={14} /> + Adicionar Questão (Admin)
          </button>
        )}

        {!submitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="bfa-btn bfa-btn--verde"
          >
            Confirmar Resposta
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="bfa-btn bfa-btn--ouro" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            {currentIdx + 1 < quizQuestions.length ? 'Próxima Questão ➔' : <><BfaIcon name="trophy" size={16} /> Ver Resultado Final</>}
          </button>
        )}
      </div>

      {showModal && (
        <div className="bfa-inline-editor-modal" onClick={() => setShowModal(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-azul-dark)', marginBottom: '1rem' }}>
              {editingQuestionIdx !== null ? `✏️ Editar Questão #${editingQuestionIdx + 1}` : '➕ Cadastrar Nova Questão no Quiz'}
            </h3>
            <form onSubmit={handleSaveQuestion}>
              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Pergunta:</label>
                <input type="text" value={qText} onChange={e => setQText(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.6rem' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa A:</label>
                  <input type="text" value={optA} onChange={e => setOptA(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} required />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa B:</label>
                  <input type="text" value={optB} onChange={e => setOptB(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} required />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa C:</label>
                  <input type="text" value={optC} onChange={e => setOptC(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ fontWeight: 700, fontSize: '0.8rem' }}>Alternativa D:</label>
                  <input type="text" value={optD} onChange={e => setOptD(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </div>
              <div className="bfa-form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Alternativa Correta:</label>
                <select value={correctIdx} onChange={e => setCorrectIdx(e.target.value)} className="bfa-input" style={{ width: '100%', padding: '0.5rem' }}>
                  <option value={0}>A</option>
                  <option value={1}>B</option>
                  <option value={2}>C</option>
                  <option value={3}>D</option>
                </select>
              </div>
              <div className="bfa-form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Explicação do Gabarito:</label>
                <textarea value={qExpl} onChange={e => setQExpl(e.target.value)} className="bfa-textarea" rows="2" style={{ width: '100%', padding: '0.5rem' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="bfa-btn bfa-btn--ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="bfa-btn bfa-btn--verde">Salvar Questão 💾</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
