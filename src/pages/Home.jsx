import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';
import BfaIcon from '../components/Icons';
import MarketTickerRibbon from '../components/MarketTickerRibbon';
import { FOTOS_NIF, LINKS_NIF } from '../data/parceriaNif';

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

      {/* ── 2. Numeros (contam ao aparecer na tela) ─────────────────────── */}
      <section className="stats-section">
        <div className="stats__container">
          <ContadorAnimado valor={55} rotulo="Aulas completas" />
          <ContadorAnimado valor={7} rotulo="Módulos de formação" />
          <ContadorAnimado valor={100} sufixo="%" rotulo="Gratuito e livre" />
          <ContadorAnimado valor={400} prefixo="+" rotulo="Alunos alcançados" />
        </div>
      </section>

      {/* ── 3. Indicadores de mercado em movimento ──────────────────────── */}
      <MarketTickerRibbon />

      {/* ── 4. Parceria NIF ─────────────────────────────────────────────── */}
      <section className="home-nif" aria-labelledby="home-nif-titulo">
        <div className="home-wrap home-nif__grid">
          <div className="home-nif__texto bfa-reveal">
            <div className="eyebrow">REDE ACADEMY · NIF</div>
            <h2 id="home-nif-titulo" className="home-h2">Parceiros dos Núcleos de Inteligência Financeira.</h2>
            <p className="home-lead">
              O Atlas nasceu dentro do NIF e é a plataforma de estudo da rede Academy. Os núcleos levam educação
              financeira para dentro das escolas, com jovens ensinando jovens, e usam as trilhas daqui para se
              preparar para a BRHSIC.
            </p>
            <ul className="home-nif__pontos">
              <li><BfaIcon name="nav-teacher" size={18} /> Material pronto para encontros e oficinas</li>
              <li><BfaIcon name="nav-exercises" size={18} /> Exercícios com gabarito para treinar em grupo</li>
              <li><BfaIcon name="nav-brhsic" size={18} /> Preparação direta para a competição</li>
            </ul>
            <div className="home-nif__acoes">
              <a href={LINKS_NIF.rede} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Conhecer a rede Academy <BfaIcon name="nav-external" size={14} />
              </a>
              <a href={LINKS_NIF.contato} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Levar um NIF para minha escola
              </a>
            </div>
          </div>

          <div className="home-nif__mosaico">
            {FOTOS_NIF.map((foto, i) => (
              <FotoNif key={foto.src} foto={foto} destaque={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Trilhas ──────────────────────────────────────────────────── */}
      <section className="process-section" id="trilhas" style={{ backgroundColor: 'var(--bg-surface-blue)' }}>
        <div className="process__container">
          <div className="process__header">
            <div className="eyebrow">COMO FUNCIONA · TRILHAS ACADEMY</div>
            <h2 className="process__title">A base estruturada para dominar o mercado.</h2>
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
              <p>O guia de estudos para a Olimpíada Nacional de Investimentos. Valuation, Equity Research e Pitch.</p>
              <span className="home-trilha__cta">Acessar guia <span aria-hidden="true">→</span></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. Jornada do aluno ─────────────────────────────────────────── */}
      <section className="home-jornada" aria-labelledby="home-jornada-titulo">
        <div className="home-wrap">
          <div className="eyebrow">SUA JORNADA</div>
          <h2 id="home-jornada-titulo" className="home-h2">Do primeiro cálculo à tese na banca.</h2>
          <ol className="home-jornada__passos">
            {JORNADA.map((passo, i) => (
              <li key={passo.titulo} className="home-passo bfa-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="home-passo__num">{i + 1}</span>
                <h3>{passo.titulo}</h3>
                <p>{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 7. Recursos ─────────────────────────────────────────────────── */}
      <section className="process-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="process__container">
          <div className="process__header">
            <div className="eyebrow">RECURSOS PRÁTICOS</div>
            <h2 className="process__title">Tudo o que você precisa em um só lugar.</h2>
          </div>

          <div className="process__grid">
            <div className="module-card home-recurso">
              <span className="home-trilha__icone"><BfaIcon name="calculator" size={22} /></span>
              <h3>Simulador de Juros & Carteira</h3>
              <p>Ferramentas interativas para testar aportes, rentabilidade e juros compostos em tempo real.</p>
            </div>
            <a href="#/exercicios" className="module-card home-recurso">
              <span className="home-trilha__icone"><BfaIcon name="nav-exercises" size={22} /></span>
              <h3>Caderno de Exercícios</h3>
              <p>Exercícios matemáticos e financeiros com gabaritos completos passo a passo.</p>
            </a>
            <a href="#/login" className="module-card home-recurso">
              <span className="home-trilha__icone"><BfaIcon name="award" size={22} /></span>
              <h3>Certificação Digital</h3>
              <p>Crie sua conta, acompanhe seu progresso aula a aula e emita seu certificado de conclusão.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Chamada final ────────────────────────────────────────────── */}
      <section className="home-cta">
        <div className="home-wrap home-cta__box">
          <div className="eyebrow">ACESSO LIVRE E GRATUITO</div>
          <h2 className="home-cta__titulo">Sua próxima tese começa aqui.</h2>
          <p className="home-cta__texto">Comece pela trilha de Matemática ou vá direto ao guia da BRHSIC.</p>
          <div className="home-cta__acoes">
            <a href="#/matematica" className="btn-primary">Começar agora</a>
            <a href={LINKS_NIF.competicao} target="_blank" rel="noopener noreferrer" className="btn-secondary">Conhecer a BRHSIC</a>
          </div>
        </div>
      </section>

    </div>
  );
}

const JORNADA = [
  { titulo: 'Aprenda a base', texto: 'Matemática do zero: porcentagem, juros e inflação explicados com exemplos do dia a dia.' },
  { titulo: 'Entenda o mercado', texto: 'Como funcionam bancos, Tesouro, ações e fundos, e como ler o balanço de uma empresa.' },
  { titulo: 'Pratique', texto: 'Quizzes em cada aula e um banco de exercícios com resolução passo a passo.' },
  { titulo: 'Monte sua tese', texto: 'Valuation, Equity Research e pitch para competir na BRHSIC com o seu NIF.' },
];

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

// Foto do NIF com reserva: se o arquivo ainda nao existir, mostra uma
// ilustracao da marca em vez de imagem quebrada.
function FotoNif({ foto, destaque }) {
  const [falhou, setFalhou] = useState(false);
  return (
    <figure className={`home-foto${destaque ? ' home-foto--destaque' : ''} bfa-reveal`}>
      {falhou ? (
        <div className="home-foto__reserva" aria-hidden="true">
          <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`g-${foto.src}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#002B4D" />
                <stop offset="1" stopColor="#00A6DF" />
              </linearGradient>
            </defs>
            <rect width="120" height="80" fill={`url(#g-${foto.src})`} />
            <polyline points="0,62 22,50 40,56 62,34 82,40 120,14" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="62" cy="34" r="3" fill="#FFFFFF" />
          </svg>
        </div>
      ) : (
        <img src={foto.src} alt={foto.alt} loading="lazy" onError={() => setFalhou(true)} />
      )}
      <figcaption>{foto.legenda}</figcaption>
    </figure>
  );
}

export default Home;





