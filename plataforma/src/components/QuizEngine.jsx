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

    const formatted = rawList.map(q => {
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
          explicacao: q.resposta ? `Resolução analítica: ${q.resposta}` : 'Gabarito oficial de resolução.'
        };
      }
      return {
        pergunta: q.pergunta || q.question || q.questao || '',
        alternativas: q.alternativas || q.opcoes || q.options || [],
        correta: q.correta !== undefined ? q.correta : (q.respostaCorreta !== undefined ? q.respostaCorreta : 0),
        explicacao: q.explicacao || q.explanation || q.resposta || ''
      };
    });

    // Deduplicação estrita por texto da pergunta (evita duplicações entre miniQuiz e lista de problemas)
    const seen = new Set();
    return formatted.filter(q => {
      const key = (q.pergunta || '').trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [cmsData, lessonId, questions]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Quiz Modal state (Admin)
  const [showModal, setShowModal] = useState(false);
  const [editingQuestionIdx, setEditingQuestionIdx] = useState(null);
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
      explicacao: qExpl.trim() || 'Explicação pedagógica.'
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
      <div className="bfa-tech-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>
          Quiz de Fixação
        </h4>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}>Esta aula ainda não possui questões cadastradas.</p>
        {isAuthenticated && inlineEditActive && (
          <button
            type="button"
            className="bfa-btn bfa-btn--ouro bfa-btn--sm"
            onClick={openAddModal}
          >
            + Cadastrar Questão (Admin)
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
      <div className="bfa-tech-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <span className="mono-tag" style={{ color: pct >= 70 ? 'var(--track-finance)' : 'var(--track-brhsic)', fontWeight: 800 }}>
          {pct >= 70 ? 'DESEMPENHO APROVADO' : 'REVISÃO RECOMENDADA'}
        </span>
        <h3 className="headline-punch" style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--foreground)' }}>
          Resultado do Quiz de Fixação
        </h3>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Você acertou <strong>{finalScore}</strong> de <strong>{quizQuestions.length}</strong> questões ({pct}% de aproveitamento).
        </p>

        <div style={{ height: '8px', width: '100%', background: 'var(--surface-strong)', borderRadius: '999px', overflow: 'hidden', marginBottom: '2rem' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: pct >= 70 ? 'var(--track-finance)' : 'var(--track-brhsic)', borderRadius: '999px' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleRestart}
            className="bfa-btn bfa-btn--verde"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}
          >
            Refazer Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bfa-tech-card" style={{ padding: '2rem' }}>
      {/* Header do Quiz */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
        <div>
          <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.72rem' }}>
            QUIZ DE FIXAÇÃO · KHAN STYLE
          </span>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '2px' }}>
            Questão {currentIdx + 1} de {quizQuestions.length}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated && inlineEditActive && (
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                type="button"
                className="bfa-btn bfa-btn--ouro bfa-btn--sm"
                onClick={() => openEditModal(currentIdx)}
                style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
              >
                Editar Questão
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={openAddModal}
                style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem' }}
              >
                + Nova
              </button>
              <button
                type="button"
                className="bfa-btn bfa-btn--ghost bfa-btn--sm"
                onClick={() => handleDeleteQuestion(currentIdx)}
                style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', color: '#EF4444' }}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Progresso */}
      <div style={{ height: '4px', width: '100%', background: 'var(--surface-strong)', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.75rem' }}>
        <div style={{ height: '100%', width: `${((currentIdx + (submitted ? 1 : 0)) / quizQuestions.length) * 100}%`, background: 'var(--track-math)', transition: 'width 0.3s ease' }} />
      </div>

      {/* Pergunta */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        {currentQ.pergunta}
      </h3>

      {/* Alternativas */}
      <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '1.5rem' }}>
        {currentQ.alternativas.map((alt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correta;

          let bg = 'var(--surface-strong)';
          let border = '1px solid var(--border)';
          let color = 'var(--foreground)';

          if (submitted) {
            if (isCorrect) {
              bg = 'rgba(16, 185, 129, 0.12)';
              border = '1px solid #10B981';
              color = 'var(--foreground)';
            } else if (isSelected && !isCorrect) {
              bg = 'rgba(239, 68, 68, 0.12)';
              border = '1px solid #EF4444';
              color = 'var(--foreground)';
            }
          } else if (isSelected) {
            bg = 'rgba(37, 99, 235, 0.08)';
            border = '1px solid var(--track-math)';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={submitted}
              onClick={() => handleSelectOption(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: bg,
                border: border,
                color: color,
                textAlign: 'left',
                cursor: submitted ? 'default' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: isSelected ? 700 : 500,
                transition: 'all 0.15s ease'
              }}
            >
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  minWidth: '24px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--track-math)' : 'var(--card)',
                  color: isSelected ? '#FFFFFF' : 'var(--muted-foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: '1px solid var(--border)'
                }}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{alt}</span>
            </button>
          );
        })}
      </div>

      {/* Explicação Pedagógica após envio */}
      {submitted && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: selectedOption === currentQ.correta ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            borderLeft: `4px solid ${selectedOption === currentQ.correta ? '#10B981' : '#EF4444'}`,
            marginBottom: '1.5rem',
            fontSize: '0.88rem',
            lineHeight: 1.6
          }}
        >
          <div style={{ fontWeight: 800, color: selectedOption === currentQ.correta ? '#059669' : '#DC2626', marginBottom: '0.25rem' }}>
            {selectedOption === currentQ.correta ? 'Correto!' : 'Incorreto.'}
          </div>
          <div style={{ color: 'var(--foreground)' }}>
            {currentQ.explicacao}
          </div>
        </div>
      )}

      {/* Ações Inferiores */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        {!submitted ? (
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className="bfa-btn bfa-btn--azul"
            style={{ padding: '0.65rem 1.4rem', opacity: selectedOption === null ? 0.5 : 1 }}
          >
            Verificar Resposta
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="bfa-btn bfa-btn--verde"
            style={{ padding: '0.65rem 1.4rem' }}
          >
            {currentIdx + 1 < quizQuestions.length ? 'Próxima Questão →' : 'Ver Resultado Final'}
          </button>
        )}
      </div>

      {/* Modal Admin */}
      {showModal && (
        <div className="bfa-inline-editor-modal" onClick={() => setShowModal(false)}>
          <div className="bfa-inline-editor-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
              {editingQuestionIdx !== null ? 'Editar Questão do Quiz' : 'Nova Questão do Quiz'}
            </h3>
            <form onSubmit={handleSaveQuestion}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--foreground)' }}>
                Enunciado da Pergunta:
              </label>
              <textarea
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)', marginBottom: '1rem', outline: 'none' }}
                required
              />

              <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Alternativa A"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Alternativa B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Alternativa C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)' }}
                />
                <input
                  type="text"
                  placeholder="Alternativa D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--foreground)' }}>
                  Alternativa Correta:
                </label>
                <select
                  value={correctIdx}
                  onChange={(e) => setCorrectIdx(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)' }}
                >
                  <option value={0}>Alternativa A</option>
                  <option value={1}>Alternativa B</option>
                  <option value={2}>Alternativa C</option>
                  <option value={3}>Alternativa D</option>
                </select>
              </div>

              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--foreground)' }}>
                Explicação / Gabarito Comentado:
              </label>
              <textarea
                value={qExpl}
                onChange={(e) => setQExpl(e.target.value)}
                rows={2}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface-strong)', color: 'var(--foreground)', marginBottom: '1.25rem', outline: 'none' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="bfa-btn bfa-btn--ghost bfa-btn--sm" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="bfa-btn bfa-btn--verde bfa-btn--sm">Salvar Questão</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

window.QuizEngine = QuizEngine;
