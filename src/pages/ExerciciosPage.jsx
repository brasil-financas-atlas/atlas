import React, { useState, useMemo, useContext, createContext, useRef } from 'react';
import { AdminContext } from '../context/AdminContext';
import EditableBlock from '../components/EditableBlock';
import BfaIcon from '../components/Icons';
import { embaralharAlternativas } from '../components/QuizEngine';
import { matematicaData } from '../data/matematicaData';
import { financasData } from '../data/financasData';
import { EXACT_CONTENT } from '../data/contentData';

/* ==========================================================================
   Banco de exercicios: reune as questoes de todas as aulas (com filtro por
   trilha, modulo e busca) e os problemas resolvidos cadastrados pela equipe.
   ========================================================================== */

const POR_PAGINA = 10;
const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];

const TRILHAS = [
  { key: 'matematica', rotulo: 'Matemática', dados: matematicaData },
  { key: 'financas', rotulo: 'Finanças', dados: financasData },
];

const PROBLEMAS_PADRAO = [
  { id: 'f1', category: 'fixacao', module: 'Álgebra do Zero', difficulty: 'Fácil', title: 'Calculando porcentagem real em descontos', question: 'Um produto de R$ 250,00 recebeu um desconto sucessivo de 10% e depois mais 5%. Qual o valor final pago pelo comprador?', answer: 'Primeiro desconto: R$ 250 x 0,90 = R$ 225,00. Segundo desconto: R$ 225 x 0,95 = R$ 213,75. O desconto total acumulado foi de 14,5%, e não de 15%, porque o segundo desconto incide sobre um valor já menor.' },
  { id: 'f2', category: 'fixacao', module: 'Matemática Financeira', difficulty: 'Médio', title: 'Equação de Fisher e juros reais', question: 'Se a taxa de juros nominal é de 12% ao ano e a inflação medida pelo IPCA foi de 4%, qual a rentabilidade real aproximada?', answer: 'Pela Equação de Fisher, (1 + r_real) = (1 + r_nominal) / (1 + inflação). (1,12 / 1,04) - 1 = 7,69% ao ano. A conta direta 12% - 4% = 8% superestima a rentabilidade real.' },
  { id: 'c1', category: 'calculo', module: 'Juros Compostos', difficulty: 'Médio', title: 'Quanto rende o capital inicial', question: 'Um investimento inicial de R$ 1.000,00 aplicado a 1% ao mês durante 24 meses acumula quanto de juros?', answer: 'VF = VP x (1 + i)^n = 1000 x (1,01)^24 = R$ 1.269,73. Juros acumulados: R$ 269,73.' },
  { id: 'p1', category: 'pbl', module: 'Análise Fundamentalista', difficulty: 'Avançado', title: 'Estudo de caso: margem e ROIC de uma indústria', question: 'Por que um ROIC consistentemente acima de 20% indica vantagem competitiva sustentável em empresas industriais?', answer: 'O ROIC (retorno sobre o capital investido) mede a eficiência em gerar lucro operacional com todo o capital alocado por acionistas e credores. Quando ele fica sistematicamente acima do custo de capital (WACC), a empresa cria valor econômico real, sinal de uma vantagem que concorrentes não conseguem copiar com facilidade.' },
];

const CATEGORIAS = [
  { key: 'todas', rotulo: 'Todos' },
  { key: 'fixacao', rotulo: 'Fixação conceitual' },
  { key: 'calculo', rotulo: 'Cálculo financeiro' },
  { key: 'pbl', rotulo: 'Casos reais' },
];

function semAcento(texto) {
  return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

// Alguns textos vieram do Markdown com "\$"; na tela fica so "$".
const limpar = (t) => String(t || '').replace(/\\\$/g, '$');

function montarBanco() {
  const banco = [];
  TRILHAS.forEach(({ key, rotulo, dados }) => {
    const titulosAula = {};
    (EXACT_CONTENT?.[key]?.modulos || []).forEach((m) => (m.aulas || []).forEach((a) => { titulosAula[`${m.slug}/${a.slug}`] = a.titulo; }));
    (dados?.modulos || []).forEach((mod, mIdx) => {
      (mod.aulas || []).forEach((aula) => {
        const vistos = new Set();
        (aula.quiz || []).forEach((q, i) => {
          const alternativas = (q.alternativas || q.opcoes || []).map(limpar);
          const pergunta = limpar(q.pergunta || q.question);
          const chave = semAcento(pergunta);
          if (!pergunta || alternativas.length < 2 || vistos.has(chave)) return;
          vistos.add(chave);
          const lessonId = `${key}-${mod.slug}-${aula.slug}`;
          const base = { pergunta, alternativas, correta: q.correta ?? q.respostaCorreta ?? 0 };
          const embaralhada = embaralharAlternativas(base, `${lessonId}#banco${i}`);
          banco.push({
            id: `${lessonId}#${i}`,
            trilha: key,
            trilhaRotulo: rotulo,
            moduloSlug: mod.slug,
            moduloNumero: mIdx + 1,
            moduloTitulo: String(mod.titulo || mod.title || '').replace(/^Módulo \d+:\s*/, ''),
            aulaTitulo: titulosAula[`${mod.slug}/${aula.slug}`] || aula.titulo || aula.title || '',
            aulaUrl: `#/${key}/${mod.slug}/${aula.slug}`,
            pergunta,
            alternativas: embaralhada.alternativas,
            correta: embaralhada.correta,
            explicacao: limpar(q.explicacao || q.explanation || ''),
            busca: semAcento(`${pergunta} ${aula.titulo || ''} ${mod.titulo || ''}`),
          });
        });
      });
    });
  });
  return banco;
}

function Chip({ ativo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className="ex-chip"
      style={{
        padding: '0.5rem 0.95rem',
        borderRadius: '999px',
        border: `1px solid ${ativo ? 'var(--text-primary)' : 'var(--border-color)'}`,
        background: ativo ? 'var(--text-primary)' : 'var(--bg-app)',
        color: ativo ? 'var(--bg-app)' : 'var(--text-primary)',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

function CartaoQuestao({ q, resposta, onResponder, numero, destaque }) {
  const respondida = resposta !== undefined;
  const acertou = respondida && resposta === q.correta;
  return (
    <article
      className="module-card"
      id={`questao-${numero}`}
      style={{ padding: '1.75rem', outline: destaque ? '2px solid var(--primary)' : 'none', outlineOffset: '2px' }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 0.75rem', alignItems: 'center', marginBottom: '0.9rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.02em' }}>
        <span style={{ color: 'var(--primary)' }}>{q.trilhaRotulo.toUpperCase()} · MÓDULO {q.moduloNumero}</span>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{q.aulaTitulo}</span>
      </div>

      <p style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500, margin: '0 0 1.25rem 0', whiteSpace: 'pre-line' }}>
        {q.pergunta}
      </p>

      <div role="radiogroup" aria-label="Alternativas" style={{ display: 'grid', gap: '0.6rem' }}>
        {q.alternativas.map((alt, idx) => {
          const escolhida = resposta === idx;
          const ehCorreta = idx === q.correta;
          let borda = 'var(--border-color)';
          let fundo = 'var(--bg-app)';
          if (respondida && ehCorreta) { borda = '#047857'; fundo = 'var(--ex-ok-bg, #E7F6EF)'; }
          else if (respondida && escolhida) { borda = '#B91C1C'; fundo = 'var(--ex-erro-bg, #FDECEC)'; }
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={escolhida}
              disabled={respondida}
              onClick={() => onResponder(q.id, idx)}
              className="ex-alternativa"
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem', width: '100%', textAlign: 'left',
                padding: '0.8rem 0.95rem', borderRadius: 'var(--radius-md)', border: `1.5px solid ${borda}`,
                background: fundo, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5,
                cursor: respondida ? 'default' : 'pointer',
              }}
            >
              <span style={{
                flexShrink: 0, width: '1.6rem', height: '1.6rem', borderRadius: '6px', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800,
                background: respondida && ehCorreta ? '#047857' : respondida && escolhida ? '#B91C1C' : 'var(--bg-surface-blue)',
                color: respondida && (ehCorreta || escolhida) ? '#FFFFFF' : 'var(--text-primary)',
              }}>
                {respondida && ehCorreta ? <BfaIcon name="check" size={13} color="#FFFFFF" /> : LETRAS[idx]}
              </span>
              <span style={{ paddingTop: '0.1rem' }}>{alt}</span>
            </button>
          );
        })}
      </div>

      {respondida && (
        <div role="status" style={{ marginTop: '1.1rem', padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-blue)', borderLeft: `4px solid ${acertou ? '#047857' : '#B91C1C'}` }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.35rem', color: acertou ? 'var(--ex-ok-fg, #047857)' : 'var(--ex-erro-fg, #B91C1C)' }}>
            {acertou ? 'Resposta certa' : `Não foi dessa vez. A correta é a ${LETRAS[q.correta]}.`}
          </div>
          {q.explicacao && (
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>{q.explicacao}</p>
          )}
          <a href={q.aulaUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '0.75rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            <BfaIcon name="book" size={14} /> Estudar a aula: {q.aulaTitulo}
          </a>
        </div>
      )}
    </article>
  );
}

function ExerciciosPage() {
  const { isAuthenticated, inlineEditActive, cmsData, deleteExercise } = useContext(AdminContext || createContext({}));
  const banco = useMemo(montarBanco, []);

  const [trilha, setTrilha] = useState('todas');
  const [modulo, setModulo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [limite, setLimite] = useState(POR_PAGINA);
  const [respostas, setRespostas] = useState({});
  const [destaque, setDestaque] = useState(null);
  const [categoria, setCategoria] = useState('todas');
  const [abertoId, setAbertoId] = useState(null);
  const listaRef = useRef(null);

  const modulosDaTrilha = useMemo(() => {
    if (trilha === 'todas') return [];
    const vistos = new Map();
    banco.filter((q) => q.trilha === trilha).forEach((q) => {
      if (!vistos.has(q.moduloSlug)) vistos.set(q.moduloSlug, { slug: q.moduloSlug, numero: q.moduloNumero, titulo: q.moduloTitulo, total: 0 });
      vistos.get(q.moduloSlug).total += 1;
    });
    return [...vistos.values()];
  }, [banco, trilha]);

  const filtradas = useMemo(() => {
    const termo = semAcento(busca);
    return banco.filter((q) =>
      (trilha === 'todas' || q.trilha === trilha) &&
      (modulo === 'todos' || q.moduloSlug === modulo) &&
      (!termo || q.busca.includes(termo))
    );
  }, [banco, trilha, modulo, busca]);

  const visiveis = filtradas.slice(0, limite);
  const respondidas = Object.keys(respostas).length;
  const acertos = banco.filter((q) => respostas[q.id] === q.correta).length;

  const contagem = (key) => banco.filter((q) => key === 'todas' || q.trilha === key).length;

  const trocarTrilha = (key) => { setTrilha(key); setModulo('todos'); setLimite(POR_PAGINA); setDestaque(null); };

  const responder = (id, idx) => setRespostas((prev) => (prev[id] !== undefined ? prev : { ...prev, [id]: idx }));

  const sortear = () => {
    const pendentes = filtradas.filter((q) => respostas[q.id] === undefined);
    const fonte = pendentes.length ? pendentes : filtradas;
    if (!fonte.length) return;
    const escolhida = fonte[Math.floor(Math.random() * fonte.length)];
    const pos = filtradas.indexOf(escolhida);
    if (pos >= limite) setLimite(pos + 1);
    setDestaque(escolhida.id);
    setTimeout(() => {
      const el = document.getElementById(`questao-${pos}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const problemas = useMemo(() => {
    const doPainel = (cmsData?.exercises || []).map((e) => ({ ...e, category: e.category || 'fixacao' }));
    return [...doPainel, ...PROBLEMAS_PADRAO].filter((e) => categoria === 'todas' || e.category === categoria);
  }, [cmsData, categoria]);

  return (
    <div className="site-wrapper">
      <section className="hero" style={{ padding: '4.5rem 0 3rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary)' }}>BANCO DE QUESTÕES</span>
          <EditableBlock id="ex-hero-title" as="h1" className="hero__title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Exercícios para praticar
          </EditableBlock>
          <EditableBlock id="ex-hero-sub" as="p" className="hero__subtitle" style={{ margin: '0 auto', maxWidth: '680px' }}>
            Todas as questões das aulas em um só lugar. Filtre por trilha e módulo, responda aqui mesmo e veja a explicação de cada resposta.
          </EditableBlock>
          <div className="ex-stats" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
            {[
              [banco.length, 'questões com explicação'],
              [contagem('matematica'), 'de Matemática'],
              [contagem('financas'), 'de Finanças'],
            ].map(([n, r]) => (
              <div key={r} style={{ padding: '0.75rem 1.25rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-app)', minWidth: '150px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>{n}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" style={{ paddingTop: '2.5rem' }}>
        <div className="site-container" style={{ maxWidth: '880px' }} ref={listaRef}>
          {/* Filtros */}
          <div className="ex-filtros" style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.9rem' }}>
              {[['todas', 'Todas'], ['matematica', 'Matemática'], ['financas', 'Finanças']].map(([key, rotulo]) => (
                <Chip key={key} ativo={trilha === key} onClick={() => trocarTrilha(key)}>
                  {rotulo} <span style={{ opacity: 0.75, fontWeight: 500 }}>({contagem(key)})</span>
                </Chip>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'stretch' }}>
              <label style={{ flex: '1 1 240px', position: 'relative', display: 'flex' }}>
                <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', display: 'inline-flex' }}>
                  <BfaIcon name="search" size={15} />
                </span>
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => { setBusca(e.target.value); setLimite(POR_PAGINA); setDestaque(null); }}
                  placeholder="Buscar: juros, porcentagem, ações..."
                  aria-label="Buscar questões"
                  style={{ width: '100%', padding: '0.7rem 0.9rem 0.7rem 2.3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                />
              </label>
              {trilha !== 'todas' && (
                <select
                  value={modulo}
                  onChange={(e) => { setModulo(e.target.value); setLimite(POR_PAGINA); setDestaque(null); }}
                  aria-label="Filtrar por módulo"
                  style={{ flex: '1 1 220px', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                >
                  <option value="todos">Todos os módulos</option>
                  {modulosDaTrilha.map((m) => (
                    <option key={m.slug} value={m.slug}>Módulo {m.numero}: {m.titulo} ({m.total})</option>
                  ))}
                </select>
              )}
              <button type="button" className="btn-secondary" onClick={sortear} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                <BfaIcon name="refresh" size={14} /> Questão aleatória
              </button>
            </div>
          </div>

          {/* Placar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>
              {filtradas.length === 0 ? 'Nenhuma questão encontrada' : `Mostrando ${visiveis.length} de ${filtradas.length} questões`}
            </span>
            {respondidas > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                Nesta visita: {acertos} de {respondidas} certas ({Math.round((acertos / respondidas) * 100)}%)
                <button type="button" onClick={() => setRespostas({})} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--text-secondary)', textDecoration: 'underline', fontSize: '0.85rem' }}>
                  zerar
                </button>
              </span>
            )}
          </div>

          {filtradas.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)' }}>
              <p style={{ margin: '0 0 1rem 0' }}>Nenhuma questão com "{busca}". Tente outra palavra ou limpe os filtros.</p>
              <button type="button" className="btn-secondary" onClick={() => { setBusca(''); trocarTrilha('todas'); }}>Limpar filtros</button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {visiveis.map((q, i) => (
              <CartaoQuestao key={q.id} q={q} numero={i} resposta={respostas[q.id]} onResponder={responder} destaque={destaque === q.id} />
            ))}
          </div>

          {visiveis.length < filtradas.length && (
            <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
              <button type="button" className="btn-primary" onClick={() => setLimite((l) => l + POR_PAGINA)}>
                Mostrar mais {Math.min(POR_PAGINA, filtradas.length - visiveis.length)} questões
              </button>
            </div>
          )}

          {/* Problemas resolvidos */}
          <div style={{ marginTop: '4.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
            <span className="eyebrow" style={{ color: 'var(--primary)' }}>PROBLEMAS RESOLVIDOS</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.75rem 0 0.5rem 0' }}>
              Do conceito ao caso real
            </h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem 0', maxWidth: '640px' }}>
              Problemas abertos com resolução comentada. Tente resolver no papel antes de abrir a resposta.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {CATEGORIAS.map((c) => (
                <Chip key={c.key} ativo={categoria === c.key} onClick={() => setCategoria(c.key)}>{c.rotulo}</Chip>
              ))}
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {problemas.map((ex) => {
                const aberto = abertoId === ex.id;
                return (
                  <article key={ex.id} className="module-card" style={{ padding: '1.5rem 1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem' }}>
                        {(CATEGORIAS.find((c) => c.key === ex.category)?.rotulo || '').toUpperCase()} · {ex.module}
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', backgroundColor: 'var(--bg-surface-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                          {ex.difficulty}
                        </span>
                        {isAuthenticated && inlineEditActive && deleteExercise && (
                          <button type="button" onClick={() => deleteExercise(ex.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#B91C1C', border: 'none', background: 'none', cursor: 'pointer' }}>
                            Excluir
                          </button>
                        )}
                      </div>
                    </div>
                    <EditableBlock id={`ex-${ex.id}-title`} as="h3" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.6rem 0' }}>
                      {ex.title}
                    </EditableBlock>
                    <EditableBlock id={`ex-${ex.id}-q`} as="p" style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: '0 0 1.1rem 0', lineHeight: 1.6 }}>
                      {ex.question}
                    </EditableBlock>
                    <button type="button" onClick={() => setAbertoId(aberto ? null : ex.id)} className="btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }} aria-expanded={aberto}>
                      {aberto ? 'Ocultar resolução' : 'Ver resolução passo a passo'}
                    </button>
                    {aberto && (
                      <div style={{ marginTop: '1.1rem', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-blue)', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ color: 'var(--text-primary)', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.875rem' }}>Resolução</div>
                        <EditableBlock id={`ex-${ex.id}-ans`} as="p" style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                          {ex.answer}
                        </EditableBlock>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExerciciosPage;
