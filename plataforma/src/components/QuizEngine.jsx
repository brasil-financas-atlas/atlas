const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

const DEFAULT_FIXATION_QUESTIONS = [
  {
    pergunta: "Qual instituição define a taxa Selic?",
    alternativas: [
      "Banco Central do Brasil (COPOM)",
      "Comissão de Valores Mobiliários (CVM)",
      "Ministério da Fazenda",
      "B3 - Brasil, Bolsa, Balcão"
    ],
    correta: 0,
    explicacao: "O COPOM (Comitê de Política Monetária do Banco Central) é a autoridade monetária responsável por definir a meta da taxa Selic a cada 45 dias."
  },
  {
    pergunta: "O que é o COPOM?",
    alternativas: [
      "Conselho Operacional de Proteção à Moeda",
      "Comitê de Política Monetária do Banco Central do Brasil",
      "Comissão de Planejamento Orçamentário",
      "Conselho Privado de Operadores de Mercado"
    ],
    correta: 1,
    explicacao: "O COPOM é o órgão do Banco Central que estabelece a diretriz da taxa básica de juros e analisa o relatório de inflação no Brasil."
  },
  {
    pergunta: "Qual a diferença entre B3 e corretora?",
    alternativas: [
      "A B3 cobra juros e a corretora empresta dinheiro",
      "A B3 é a bolsa oficial onde os ativos são liquidados e custodiados; a corretora é a intermediária que conecta o investidor à B3",
      "Não há diferença, ambas são bancos comerciais",
      "A corretora emite ações e a B3 regula os impostos"
    ],
    correta: 1,
    explicacao: "A B3 é o mercado organizado onde ocorrem as negociações e a custódia centralizada dos ativos, enquanto a corretora atua como ponte credenciada de acesso para os investidores."
  },
  {
    pergunta: "Se uma empresa listada fraudar seus resultados, qual instituição investiga?",
    alternativas: [
      "Fundo Garantidor de Créditos (FGC)",
      "Comissão de Valores Mobiliários (CVM)",
      "Secretaria da Receita Federal apenas",
      "Banco Interamericano de Desenvolvimento (BID)"
    ],
    correta: 1,
    explicacao: "A CVM (Comissão de Valores Mobiliários) é a autarquia vinculada ao Ministério da Fazenda que disciplina, fiscaliza e pune irregularidades praticadas por companhias abertas no mercado de valores mobiliários."
  },
  {
    pergunta: "O que o FGC garante ao investidor?",
    alternativas: [
      "Garante lucro fixo em ações e fundos de investimento",
      "Garante a devolução de até R$ 250 mil por CPF e instituição financeira em caso de liquidação/falência bancária de títulos elegíveis (ex: CDB, LCI, LCA)",
      "Garante isenção permanente de Imposto de Renda em operações de Day Trade",
      "Garante reembolso de perdas causadas por volatilidade na bolsa"
    ],
    correta: 1,
    explicacao: "O Fundo Garantidor de Créditos (FGC) protege o correntista/investidor contra insolvência de instituições financeiras associadas, até o limite de R$ 250 mil por CPF/CNPJ por instituição (teto global de R$ 1 milhão a cada 4 anos)."
  }
];

function QuizEngine({ questions, lessonId }) {
  const { isAuthenticated, inlineEditActive, cmsData, updateLesson } = useContext(AdminContext || createContext({}));
  const { saveQuizScore, getQuizScore } = useContext(ProgressContext || createContext({}));

  const quizQuestions = useMemo(() => {
    let rawList = null;
    if (cmsData?.lessons?.[lessonId]?.customQuiz && cmsData.lessons[lessonId].customQuiz.length > 0) {
      rawList = cmsData.lessons[lessonId].customQuiz;
    } else if (cmsData?.quizzes?.[lessonId] && cmsData.quizzes[lessonId].length > 0) {
      rawList = cmsData.quizzes[lessonId];
    } else if (questions && questions.length > 0) {
      rawList = questions;
    } else {
      rawList = DEFAULT_FIXATION_QUESTIONS;
    }

    return rawList.map(q => {
      if (q.questao && !q.alternativas && !q.opcoes && !q.options) {
        return {
          pergunta: q.questao,
          alternativas: [
            q.resposta,
            "Requer dados adicionais para determinação exata.",
            "Nenhuma das alternativas anteriores.",
            "O resultado depende de variação cambial não informada."
          ],
          correta: 0,
          explicacao: q.resposta ? `Resolução oficial: ${q.resposta}` : 'Gabarito oficial de resolução.'
        };
      }
      return {
        pergunta: q.pergunta || q.question || q.questao || '',
        alternativas: q.alternativas || q.opcoes || q.options || [],
        correta: q.correta !== undefined ? q.correta : (q.respostaCorreta !== undefined ? q.respostaCorreta : 0),
        explicacao: q.explicacao || q.explanation || q.resposta || ''
      };
    });
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
      <div className="bfa-quiz bfa-quiz--empty" style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-strong)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--foreground)' }}>
          <BfaIcon name="target" size={20} color="var(--color-azul)" /> Quiz de Fixação (Khan Academy Style)
        </h4>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}>Esta aula ainda não possui questões interativas cadastradas.</p>
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
        <div className="bfa-quiz__result-icon" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--surface-strong)', margin: '0 auto 1rem auto' }}>
          <BfaIcon name={pct >= 80 ? "trophy" : pct >= 50 ? "thumbsUp" : "book"} size={48} color="var(--gold-deep)" />
        </div>
        <h3 style={{ color: 'var(--foreground)' }}>Resultado do Quiz de Fixação</h3>
        <div className="bfa-quiz__score-display">
          <span className="bfa-quiz__score-num">{finalScore} / {quizQuestions.length}</span>
          <span className="bfa-quiz__score-pct">{pct}% de acertos</span>
        </div>

        {pct >= 80 && (
          <div className="bfa-quiz__badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold-deep)', fontWeight: 700 }}>
            <BfaIcon name="sparkles" size={16} color="var(--gold-deep)" /> Dominado! Você assimilou perfeitamente os conceitos.
          </div>
        )}

        {previousHighScore !== null && (
          <p className="bfa-quiz__prev-score" style={{ color: 'var(--muted-foreground)' }}>
            Sua melhor pontuação anterior: {previousHighScore} acertos
          </p>
        )}

        <button onClick={handleRestart} className="bfa-btn bfa-btn--ouro" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <BfaIcon name="refresh" size={16} /> Reiniciar Fixação
        </button>
      </div>
    );
  }

  return (
    <div className="bfa-quiz">
      <div className="bfa-quiz__progress-bar-wrap" style={{ height: '6px', background: 'var(--surface-strong)', borderRadius: '999px', overflow: 'hidden', marginBottom: '1rem' }}>
        <div
          className="bfa-quiz__progress-bar-fill"
          style={{
            height: '100%',
            width: `${Math.round(((currentIdx + (submitted ? 1 : 0)) / quizQuestions.length) * 100)}%`,
            background: 'linear-gradient(90deg, var(--track-finance) 0%, var(--gold) 100%)',
            borderRadius: '999px',
            transition: 'width 350ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>

      <div className="bfa-quiz__header">
        <div className="bfa-quiz__title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground)', fontWeight: 700 }}>
            <BfaIcon name="target" size={20} color="var(--track-math)" /> Quiz de Fixação (Khan Academy Style)
          </span>
          <span className="bfa-quiz__progress-text" style={{ color: 'var(--muted-foreground)' }}>
            Questão {currentIdx + 1} de {quizQuestions.length} ({Math.round(((currentIdx + 1) / quizQuestions.length) * 100)}%)
          </span>
        </div>

        {/* Visual Progress Pills Khan Academy */}
        <div className="bfa-quiz__pills">
          {quizQuestions.map((_, i) => {
            const ans = answers.find(a => a.question === i);
            let pClass = '';
            if (i === currentIdx) pClass = 'active';
            else if (ans) pClass = ans.isCorrect ? 'correct' : 'wrong';
            return <div key={i} className={`bfa-quiz__pill ${pClass}`} />;
          })}
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
        <div className={`bfa-quiz__feedback ${selectedOption === currentQ.correta ? 'success' : 'error'}`} style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: selectedOption === currentQ.correta ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: selectedOption === currentQ.correta ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div className="bfa-quiz__feedback-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 800 }}>
            {selectedOption === currentQ.correta ? (
              <><BfaIcon name="checkCircle" size={20} color="#059669" /> Resposta Correta!</>
            ) : (
              <><BfaIcon name="close" size={20} color="#DC2626" /> Resposta Incorreta</>
            )}
          </div>
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(15, 23, 42, 0.1)' }}>
            <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.35rem' }}>
              <BfaIcon name="book" size={14} color="var(--track-math)" /> Gabarito Comentado (Alternativa {String.fromCharCode(65 + currentQ.correta)}):
            </span>
            <p className="bfa-quiz__explanation" style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--foreground)' }}>
              {currentQ.explicacao}
            </p>
          </div>
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
