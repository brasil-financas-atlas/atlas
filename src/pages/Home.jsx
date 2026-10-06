import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';
import BfaIcon from '../components/Icons';
import { FOTOS_NIF, NUMEROS_REDE, RECURSOS_PLATAFORMA, APOIO_NUCLEOS, LINKS_NIF } from '../data/parceriaNif';

/* ==========================================================================
   Home Page — BRHSIC Academy Official Learning Platform
   Estética 100% alinhada com brhsic-academy.vercel.app e brhsic-main.vercel.app
   ========================================================================== */
function Home() {
  
  return (
    <div className="site-wrapper">
      
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="hero" id="inicio">
        <div className="hero__container">
          <div className="hero__content">
            <div className="eyebrow">PLATAFORMA EDUCACIONAL OFICIAL</div>
            <h1 className="hero__title">
              Educação financeira e matemática para quem quer ir <span style={{ color: 'var(--blue)' }}>além</span>.
            </h1>
            <p className="hero__subtitle">
              A base estruturada do básico ao avançado para dominar matemática financeira, mercado de capitais e se destacar na olimpíada nacional de investimentos. Tudo gratuito e aberto.
            </p>
            <div className="hero__actions">
              <a
                href="#trilhas"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('trilhas')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Começar a Estudar →
              </a>
              <a href="https://brhsic.com" target="_blank" rel="noreferrer" className="btn-secondary">
                Portal BRHSIC ↗
              </a>
            </div>
          </div>
          
          <div className="hero__visual">
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-app)', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--blue)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink)' }}>ACADEMY 2026</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--on-paper, var(--blue-deep))', background: 'var(--paper)', border: '1px solid var(--line)', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontWeight: 700 }}>ACESSO LIVRE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="#/matematica"
                  style={{
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg-surface)',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)', fontSize: '1rem' }}>
                      01. Matemática Financeira
                    </strong>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      4 Módulos · 29 Aulas
                    </span>
                  </div>
                  <span style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 700, marginLeft: '1rem' }}>→</span>
                </a>

                <a
                  href="#/financas"
                  style={{
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg-surface)',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)', fontSize: '1rem' }}>
                      02. Mercado de Capitais
                    </strong>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      3 Módulos · 26 Aulas
                    </span>
                  </div>
                  <span style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 700, marginLeft: '1rem' }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Numeros da rede (contam ao aparecer na tela) ────────────── */}
      <section className="stats-section">
        <div className="stats__container">
          {NUMEROS_REDE.map((n) => (
            <ContadorAnimado key={n.rotulo} valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} rotulo={n.rotulo} />
          ))}
        </div>
      </section>

      {/* ── 4. A plataforma em uso ─────────────────────────────────────────── */}
      <section className="hn-sec" aria-labelledby="hn-nif-titulo">
        <div className="hn-wrap">
          <div className="hn-cabeca">
            <p className="hn-rotulo">A PLATAFORMA EM USO</p>
            <h2 id="hn-nif-titulo" className="hn-titulo">Para estudar sozinho ou em grupo.</h2>
            <p className="hn-texto">
              O Atlas reúne trilhas, exercícios e o guia da BRHSIC em um só lugar, de graça para qualquer
              estudante. É também o material de apoio dos NIFs, os Núcleos de Inteligência Financeira da rede
              Academy, que levam as aulas daqui para dentro das escolas.
            </p>
          </div>

          <figure className="hn-foto hn-foto--larga bfa-reveal">
            <FotoNif foto={FOTOS_NIF.destaque} prioridade />
          </figure>

          <div className="hn-galeria">
            {FOTOS_NIF.galeria.map((foto) => (
              <figure key={foto.src} className="hn-foto bfa-reveal">
                <FotoNif foto={foto} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Origem da plataforma ───────────────────────────────────── */}
      <section className="hn-sec hn-sec--alt" aria-labelledby="hn-origem-titulo">
        <div className="hn-wrap hn-duas">
          <div>
            <p className="hn-rotulo">NASCEU NA SALA DE AULA</p>
            <h2 id="hn-origem-titulo" className="hn-titulo">Feita por quem ensina e aprende junto.</h2>
            <p className="hn-texto">O Atlas foi desenvolvido no âmbito do NIF, que começou no Colégio La Salle Canoas com aulas semanais e alunos ensinando alunos.</p>
            <p className="hn-texto">Organizamos esse conteúdo em trilhas para que qualquer estudante, em qualquer escola, possa seguir o mesmo caminho, no seu ritmo.</p>
            <p className="hn-texto hn-texto--forte">Da escola para o Brasil, sem custo para ninguém.</p>
          </div>
          <figure className="hn-foto hn-foto--origem bfa-reveal">
            <FotoNif foto={FOTOS_NIF.origem} />
            <figcaption className="hn-legenda-bloco">
              <span>PRIMEIRO NIF</span>
              <strong>La Salle Canoas</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── 6. Trilhas ──────────────────────────────────────────────────── */}
      <section className="process-section" id="trilhas" style={{ backgroundColor: 'var(--bg-app)' }}>
        <div className="process__container">
          <div className="process__header">
            <p className="hn-rotulo">TRILHAS DO ATLAS</p>
            <h2 className="hn-titulo">A base estruturada para dominar o mercado.</h2>
          </div>

          <div className="process__grid">
            <a href="#/matematica" className="module-card home-trilha">
              <span className="home-trilha__icone"><BfaIcon name="nav-math" size={22} /></span>
              <div className="step-number">01 · 29 AULAS</div>
              <h3>Matemática Financeira & Modelagem</h3>
              <p>Juros compostos, séries uniformes, amortização (SAC/Price), inflação e taxa real. A fundação quantitativa essencial.</p>
              <span className="home-trilha__cta">Explorar aulas <span aria-hidden="true">→</span></span>
            </a>
            <a href="#/financas" className="module-card home-trilha">
              <span className="home-trilha__icone"><BfaIcon name="nav-finance" size={22} /></span>
              <div className="step-number">02 · 26 AULAS</div>
              <h3>Finanças Corporativas & Mercado</h3>
              <p>Renda fixa (Tesouro, CDBs), renda variável (Ações B3, FIIs) e análise contábil. Entenda como empresas funcionam por dentro.</p>
              <span className="home-trilha__cta">Explorar aulas <span aria-hidden="true">→</span></span>
            </a>
            <a href="#/preparacao-brhsic" className="module-card home-trilha">
              <span className="home-trilha__icone"><BfaIcon name="nav-brhsic" size={22} /></span>
              <div className="step-number">03 · GUIA OFICIAL</div>
              <h3>Preparação Oficial BRHSIC</h3>
              <p>O guia de estudos para a maior competição de investimentos para estudantes do ensino médio da América Latina.</p>
              <span className="home-trilha__cta">Acessar guia <span aria-hidden="true">→</span></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. O que a plataforma oferece ─────────────────────────────────── */}
      <section className="hn-sec hn-sec--alt" aria-labelledby="hn-pilares-titulo">
        <div className="hn-wrap hn-duas hn-duas--topo">
          <div>
            <p className="hn-rotulo">O QUE VOCÊ ENCONTRA AQUI</p>
            <h2 id="hn-pilares-titulo" className="hn-titulo">Tudo o que um estudante precisa em um só lugar.</h2>
            <p className="hn-texto">A plataforma oficial de estudo da BRHSIC Academy, vertente da BRHSIC, a maior competição de investimentos para estudantes do ensino médio da América Latina.</p>
          </div>
          <ListaNumerada itens={RECURSOS_PLATAFORMA} />
        </div>
      </section>

      {/* ── 8. Como a plataforma ajuda os nucleos ────────────────────────────────── */}
      <section className="hn-sec" aria-labelledby="hn-lider-titulo">
        <div className="hn-wrap hn-duas hn-duas--topo">
          <div>
            <p className="hn-rotulo">PARA QUEM LIDERA UM NIF</p>
            <h2 id="hn-lider-titulo" className="hn-titulo">A plataforma trabalha junto com o núcleo.</h2>
            <p className="hn-texto">Líderes de núcleo usam o Atlas para preparar encontros, passar exercícios e levar a turma até a BRHSIC.</p>
            <a href={LINKS_NIF.contato} target="_blank" rel="noopener noreferrer" className="hn-link">
              Quero levar um NIF para minha escola <BfaIcon name="nav-external" size={14} />
            </a>
          </div>
          <ListaNumerada itens={APOIO_NUCLEOS} />
        </div>
      </section>

      {/* ── 9. Chamada final ────────────────────────────────────────────── */}
      <section className="hn-final">
        <div className="hn-wrap">
          <p className="hn-rotulo hn-rotulo--claro">GRATUITO, SEM EXCEÇÃO.</p>
          <h2 className="hn-final__titulo">Sua próxima tese começa aqui.</h2>
          <div className="hn-acoes">
            <a href="#/matematica" className="hn-btn hn-btn--cheio">
              Começar a estudar <span aria-hidden="true">→</span>
            </a>
            <a href="#/login" className="hn-btn">Criar minha conta <span aria-hidden="true">→</span></a>
            <a href={LINKS_NIF.rede} target="_blank" rel="noopener noreferrer" className="hn-link">
              Conhecer a rede Academy <BfaIcon name="nav-external" size={14} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function ListaNumerada({ itens }) {
  return (
    <ol className="hn-lista">
      {itens.map((item, i) => (
        <li key={item.titulo} className="hn-lista__item bfa-reveal">
          <span className="hn-lista__num">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Numero que conta de 0 ate o valor quando entra na tela (sem animacao para
// quem pediu menos movimento no sistema).
function ContadorAnimado({ valor, prefixo = '', sufixo = '', rotulo }) {
  const ref = useRef(null);
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    const reduzir = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduzir || typeof IntersectionObserver === 'undefined') return undefined;

    setAtual(0);
    let quadro = null;
    const obs = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      obs.disconnect();
      const inicio = performance.now();
      const duracao = 1200;
      const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / duracao);
        setAtual(Math.round(valor * (1 - Math.pow(1 - t, 3))));
        if (t < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); if (quadro) cancelAnimationFrame(quadro); };
  }, [valor]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-value" aria-label={`${prefixo}${valor}${sufixo}`}>{prefixo}{atual}{sufixo}</span>
      <span className="stat-label">{rotulo}</span>
    </div>
  );
}

// Foto com legenda sobreposta. Se o arquivo faltar, o espaco fica com a cor
// de fundo da marca em vez de mostrar imagem quebrada.
function FotoNif({ foto, prioridade = false }) {
  const [falhou, setFalhou] = useState(false);
  return (
    <>
      {!falhou && (
        <img
          src={foto.src}
          alt={foto.alt}
          width={foto.w}
          height={foto.h}
          loading={prioridade ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFalhou(true)}
        />
      )}
      {foto.legenda && <span className="hn-foto__legenda">{foto.legenda}</span>}
    </>
  );
}

export default Home;





