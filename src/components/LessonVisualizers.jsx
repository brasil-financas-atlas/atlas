const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

/* ==========================================================================
   1. Visualizador de Juros Simples vs. Compostos (Curva Exponencial)
   ========================================================================== */
function VisualizadorJurosCompostos() {
  const [capital, setCapital] = useState(5000);
  const [aporte, setAporte] = useState(500);
  const [taxaAnual, setTaxaAnual] = useState(11.5);
  const [anos, setAnos] = useState(20);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const dadosCalculados = useMemo(() => {
    const meses = anos * 12;
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    
    const labels = [];
    const serieInvestido = [];
    const serieSimples = [];
    const serieCompostos = [];

    let saldoComposto = capital;
    let totalInvestido = capital;
    let totalJurosSimples = 0;

    for (let ano = 0; ano <= anos; ano++) {
      labels.push(`Ano ${ano}`);
      if (ano === 0) {
        serieInvestido.push(capital);
        serieSimples.push(capital);
        serieCompostos.push(capital);
      } else {
        for (let m = 1; m <= 12; m++) {
          saldoComposto = saldoComposto * (1 + taxaMensal) + aporte;
          totalInvestido += aporte;
          totalJurosSimples += capital * (taxaAnual / 100 / 12) + (aporte * (taxaAnual / 100 / 12) * (12 - m));
        }
        serieInvestido.push(Math.round(totalInvestido));
        serieSimples.push(Math.round(totalInvestido + totalJurosSimples));
        serieCompostos.push(Math.round(saldoComposto));
      }
    }

    const montanteFinal = serieCompostos[serieCompostos.length - 1];
    const totalAportado = serieInvestido[serieInvestido.length - 1];
    const jurosGanhos = montanteFinal - totalAportado;

    return { labels, serieInvestido, serieSimples, serieCompostos, montanteFinal, totalAportado, jurosGanhos };
  }, [capital, aporte, taxaAnual, anos]);

  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: dadosCalculados.labels,
        datasets: [
          {
            label: 'Juros Compostos (Exponencial)',
            data: dadosCalculados.serieCompostos,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointRadius: 2
          },
          {
            label: 'Total Investido (Aportes)',
            data: dadosCalculados.serieInvestido,
            borderColor: '#94A3B8',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 14, font: { family: 'Plus Jakarta Sans', weight: 600, size: 12 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: R$ ${Number(ctx.raw).toLocaleString('pt-BR')}`
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(150, 150, 150, 0.1)' },
            ticks: {
              callback: (v) => `R$ ${(v / 1000).toFixed(0)}k`,
              font: { family: 'JetBrains Mono', size: 11 }
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [dadosCalculados]);

  return (
    <div className="bfa-tech-card" style={{ padding: '1.75rem 2rem', margin: '2rem 0', borderTop: '4px solid var(--track-finance)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <div>
          <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800, fontSize: '0.75rem' }}>
            SIMULAÇÃO INTERATIVA DE CAPITALIZAÇÃO
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.2rem 0 0 0' }}>
            O Poder dos Juros Compostos no Tempo
          </h3>
        </div>
      </div>

      {/* Controles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'var(--surface-strong)', padding: '1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Capital Inicial: <strong>R$ {capital.toLocaleString('pt-BR')}</strong>
          </label>
          <input type="range" min="0" max="50000" step="500" value={capital} onChange={e => setCapital(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Aporte Mensal: <strong>R$ {aporte.toLocaleString('pt-BR')}</strong>
          </label>
          <input type="range" min="0" max="5000" step="50" value={aporte} onChange={e => setAporte(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Taxa Anual: <strong>{taxaAnual}% a.a.</strong>
          </label>
          <input type="range" min="2" max="25" step="0.5" value={taxaAnual} onChange={e => setTaxaAnual(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Prazo: <strong>{anos} anos</strong>
          </label>
          <input type="range" min="1" max="40" step="1" value={anos} onChange={e => setAnos(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Cards de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Total Investido</div>
          <div className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.2rem' }}>
            R$ {dadosCalculados.totalAportado.toLocaleString('pt-BR')}
          </div>
        </div>
        <div style={{ padding: '0.85rem', background: 'rgba(16, 185, 129, 0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>Juros Acumulados (Lucro)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
            R$ {dadosCalculados.jurosGanhos.toLocaleString('pt-BR')}
          </div>
        </div>
        <div style={{ padding: '0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Montante Final</div>
          <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.2rem' }}>
            R$ {dadosCalculados.montanteFinal.toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Canvas do Gráfico */}
      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Visualizador de Distribuição Normal e Volatilidade (Curva de Gauss)
   ========================================================================== */
function VisualizadorDistribuicaoNormal() {
  const [media, setMedia] = useState(10);
  const [desvioPadrao, setDesvioPadrao] = useState(15);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const dadosGauss = useMemo(() => {
    const labels = [];
    const dataPoints = [];
    const minX = media - 3.5 * desvioPadrao;
    const maxX = media + 3.5 * desvioPadrao;
    const step = (maxX - minX) / 60;

    for (let x = minX; x <= maxX; x += step) {
      labels.push(x.toFixed(1) + '%');
      const exponent = -Math.pow(x - media, 2) / (2 * Math.pow(desvioPadrao, 2));
      const y = (1 / (desvioPadrao * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      dataPoints.push(Number((y * 100).toFixed(3)));
    }

    const faixa1sMin = (media - desvioPadrao).toFixed(1);
    const faixa1sMax = (media + desvioPadrao).toFixed(1);
    const faixa2sMin = (media - 2 * desvioPadrao).toFixed(1);
    const faixa2sMax = (media + 2 * desvioPadrao).toFixed(1);

    return { labels, dataPoints, faixa1sMin, faixa1sMax, faixa2sMin, faixa2sMax };
  }, [media, desvioPadrao]);

  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: dadosGauss.labels,
        datasets: [
          {
            label: 'Densidade de Probabilidade dos Retornos',
            data: dadosGauss.dataPoints,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Probabilidade relativa: ${ctx.raw}%`
            }
          }
        },
        scales: {
          y: { display: false },
          x: {
            grid: { display: false },
            ticks: { maxTicksLimit: 9, font: { family: 'JetBrains Mono', size: 11 } }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [dadosGauss]);

  return (
    <div className="bfa-tech-card" style={{ padding: '1.75rem 2rem', margin: '2rem 0', borderTop: '4px solid var(--track-math)' }}>
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.75rem' }}>
          MODELO ESTATÍSTICO DE RISCO (GAUSS)
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.2rem 0 0 0' }}>
          Dispersão, Desvio Padrão e Regra Empírica
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'var(--surface-strong)', padding: '1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Retorno Médio Esperado (μ): <strong>{media}% ao ano</strong>
          </label>
          <input type="range" min="-10" max="30" step="1" value={media} onChange={e => setMedia(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Volatilidade / Desvio Padrão (σ): <strong>{desvioPadrao}% ao ano</strong>
          </label>
          <input type="range" min="3" max="40" step="1" value={desvioPadrao} onChange={e => setDesvioPadrao(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Bandas Empíricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.85rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(37, 99, 235, 0.25)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--track-math)' }}>Faixa de 68.3% (±1σ)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.2rem' }}>
            {dadosGauss.faixa1sMin}% a {dadosGauss.faixa1sMax}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>Em ~2 de cada 3 anos o retorno cai nesta faixa</div>
        </div>

        <div style={{ padding: '0.85rem', background: 'rgba(234, 179, 8, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(234, 179, 8, 0.25)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#CA8A04' }}>Faixa de 95.4% (±2σ)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.2rem' }}>
            {dadosGauss.faixa2sMin}% a {dadosGauss.faixa2sMax}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>Faixa de segurança estatística extrema</div>
        </div>
      </div>

      <div style={{ position: 'relative', height: '250px', width: '100%' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. Visualizador Cascata de DRE (Demonstração do Resultado)
   ========================================================================== */
function VisualizadorDREWaterfall() {
  const [receitaBruta, setReceitaBruta] = useState(100);
  const [impostosPct, setImpostosPct] = useState(18);
  const [cpvPct, setCpvPct] = useState(42);
  const [despesasPct, setDespesasPct] = useState(15);
  const [daPct, setDaPct] = useState(5);
  const [jurosPct, setJurosPct] = useState(4);

  const dre = useMemo(() => {
    const impostos = receitaBruta * (impostosPct / 100);
    const recLiquida = receitaBruta - impostos;
    const cpv = receitaBruta * (cpvPct / 100);
    const lucroBruto = recLiquida - cpv;
    const despesas = receitaBruta * (despesasPct / 100);
    const ebitda = lucroBruto - despesas;
    const da = receitaBruta * (daPct / 100);
    const ebit = ebitda - da;
    const juros = receitaBruta * (jurosPct / 100);
    const lair = ebit - juros;
    const irCsll = lair > 0 ? lair * 0.34 : 0;
    const lucroLiquido = lair - irCsll;

    return {
      receitaBruta,
      impostos,
      recLiquida,
      cpv,
      lucroBruto,
      despesas,
      ebitda,
      da,
      ebit,
      juros,
      lair,
      irCsll,
      lucroLiquido,
      margemBruta: ((lucroBruto / recLiquida) * 100).toFixed(1),
      margemEbitda: ((ebitda / recLiquida) * 100).toFixed(1),
      margemLiquida: ((lucroLiquido / recLiquida) * 100).toFixed(1)
    };
  }, [receitaBruta, impostosPct, cpvPct, despesasPct, daPct, jurosPct]);

  return (
    <div className="bfa-tech-card" style={{ padding: '1.75rem 2rem', margin: '2rem 0', borderTop: '4px solid var(--track-finance)' }}>
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800, fontSize: '0.75rem' }}>
          ANÁLISE CONTÁBIL & DEMONSTRAÇÃO DE RESULTADOS
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.2rem 0 0 0' }}>
          Cascata de Formação do Lucro (DRE Interativa)
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Margem Bruta</div>
          <div className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.2rem' }}>
            {dre.margemBruta}%
          </div>
        </div>
        <div style={{ padding: '0.85rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(37, 99, 235, 0.25)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--track-math)', fontWeight: 700 }}>Margem EBITDA</div>
          <div className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--track-math)', marginTop: '0.2rem' }}>
            {dre.margemEbitda}%
          </div>
        </div>
        <div style={{ padding: '0.85rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>Margem Líquida</div>
          <div className="tabular-numbers" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
            {dre.margemLiquida}%
          </div>
        </div>
      </div>

      {/* Estrutura Passo a Passo da DRE em Ledger */}
      <div style={{ background: 'var(--surface-strong)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.65rem 1rem', fontWeight: 700 }}>Receita Operacional Bruta</td>
              <td className="tabular-numbers" style={{ padding: '0.65rem 1rem', textAlign: 'right', fontWeight: 800 }}>R$ {dre.receitaBruta.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
              <td style={{ padding: '0.5rem 1rem' }}>(-) Impostos e Deduções sobre Vendas ({impostosPct}%)</td>
              <td className="tabular-numbers" style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>- R$ {dre.impostos.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.03)', fontWeight: 700 }}>
              <td style={{ padding: '0.65rem 1rem' }}>(=) Receita Operacional Líquida</td>
              <td className="tabular-numbers" style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>R$ {dre.recLiquida.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
              <td style={{ padding: '0.5rem 1rem' }}>(-) Custo dos Produtos Vendidos (CPV) ({cpvPct}%)</td>
              <td className="tabular-numbers" style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>- R$ {dre.cpv.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
              <td style={{ padding: '0.65rem 1rem' }}>(=) Lucro Bruto</td>
              <td className="tabular-numbers" style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>R$ {dre.lucroBruto.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
              <td style={{ padding: '0.5rem 1rem' }}>(-) Despesas Operacionais (Vendas, Gerais e Adm) ({despesasPct}%)</td>
              <td className="tabular-numbers" style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>- R$ {dre.despesas.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(37, 99, 235, 0.06)', fontWeight: 800, color: 'var(--track-math)' }}>
              <td style={{ padding: '0.65rem 1rem' }}>(=) EBITDA (Geração Operacional de Caixa)</td>
              <td className="tabular-numbers" style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>R$ {dre.ebitda.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
              <td style={{ padding: '0.5rem 1rem' }}>(-) Depreciação e Amortização ({daPct}%)</td>
              <td className="tabular-numbers" style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>- R$ {dre.da.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
              <td style={{ padding: '0.65rem 1rem' }}>(=) EBIT (Lucro Operacional)</td>
              <td className="tabular-numbers" style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>R$ {dre.ebit.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
              <td style={{ padding: '0.5rem 1rem' }}>(-) Despesas Financeiras Líquidas ({jurosPct}%)</td>
              <td className="tabular-numbers" style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>- R$ {dre.juros.toFixed(1)}M</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
              <td style={{ padding: '0.5rem 1rem' }}>(-) Provisão para IR e CSLL (34%)</td>
              <td className="tabular-numbers" style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>- R$ {dre.irCsll.toFixed(1)}M</td>
            </tr>
            <tr style={{ background: 'rgba(16, 185, 129, 0.08)', fontWeight: 800, color: '#059669' }}>
              <td style={{ padding: '0.85rem 1rem', fontSize: '0.95rem' }}>(=) LUCRO LÍQUIDO DO EXERCÍCIO</td>
              <td className="tabular-numbers" style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '1.1rem' }}>R$ {dre.lucroLiquido.toFixed(1)}M</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. Visualizador de Balanço Patrimonial (Ativo = Passivo + PL)
   ========================================================================== */
function VisualizadorBalancoPatrimonial() {
  const [caixa, setCaixa] = useState(30);
  const [estoque, setEstoque] = useState(40);
  const [imobilizado, setImobilizado] = useState(130);
  const [passivoCirculante, setPassivoCirculante] = useState(60);
  const [passivoNaoCirculante, setPassivoNaoCirculante] = useState(50);

  const ativoCirculante = caixa + estoque;
  const ativoNaoCirculante = imobilizado;
  const totalAtivo = ativoCirculante + ativoNaoCirculante;
  const totalPassivo = passivoCirculante + passivoNaoCirculante;
  const patrimonioLiquido = totalAtivo - totalPassivo;
  const liquidezCorrente = (ativoCirculante / passivoCirculante).toFixed(2);
  const endividamento = ((totalPassivo / totalAtivo) * 100).toFixed(1);

  return (
    <div className="bfa-tech-card" style={{ padding: '1.75rem 2rem', margin: '2rem 0', borderTop: '4px solid var(--track-finance)' }}>
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-finance)', fontWeight: 800, fontSize: '0.75rem' }}>
          ESTRUTURA PATRIMONIAL & EQUAÇÃO FUNDAMENTAL
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.2rem 0 0 0' }}>
          Balanço Patrimonial Interativo (Ativo = Passivo + PL)
        </h3>
      </div>

      {/* Controles de Simulação */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-strong)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Caixa & Aplicações: R$ {caixa}M</label>
          <input type="range" min="5" max="100" step="5" value={caixa} onChange={e => setCaixa(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Estoques / Clientes: R$ {estoque}M</label>
          <input type="range" min="10" max="100" step="5" value={estoque} onChange={e => setEstoque(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Imobilizado / Fábricas: R$ {imobilizado}M</label>
          <input type="range" min="20" max="250" step="10" value={imobilizado} onChange={e => setImobilizado(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Dívida Curto Prazo: R$ {passivoCirculante}M</label>
          <input type="range" min="10" max="120" step="5" value={passivoCirculante} onChange={e => setPassivoCirculante(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Dívida Longo Prazo: R$ {passivoNaoCirculante}M</label>
          <input type="range" min="10" max="150" step="5" value={passivoNaoCirculante} onChange={e => setPassivoNaoCirculante(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Indicadores Chave */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.75rem 1rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Liquidez Corrente (AC / PC)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.3rem', fontWeight: 800, color: Number(liquidezCorrente) >= 1 ? '#059669' : '#EF4444', marginTop: '0.2rem' }}>
            {liquidezCorrente}x
          </div>
        </div>
        <div style={{ padding: '0.75rem 1rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Endividamento Geral</div>
          <div className="tabular-numbers" style={{ fontSize: '1.3rem', fontWeight: 800, color: Number(endividamento) < 60 ? '#059669' : '#F59E0B', marginTop: '0.2rem' }}>
            {endividamento}%
          </div>
        </div>
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(37, 99, 235, 0.25)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--track-math)', fontWeight: 700 }}>Patrimônio Líquido (PL)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--track-math)', marginTop: '0.2rem' }}>
            R$ {patrimonioLiquido}M
          </div>
        </div>
      </div>

      {/* Visual Ledger de Duas Colunas (Ativo vs Passivo + PL) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Coluna da Esquerda: ATIVO */}
        <div style={{ background: 'var(--surface-strong)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '2px solid #059669', paddingBottom: '0.4rem' }}>
            <strong style={{ fontSize: '1.05rem', color: '#059669' }}>ATIVO TOTAL (Aplicações)</strong>
            <strong className="tabular-numbers" style={{ fontSize: '1.15rem', color: 'var(--foreground)' }}>R$ {totalAtivo}M</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '0.65rem 0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Ativo Circulante</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Caixa (R$ {caixa}M) + Estoque (R$ {estoque}M)</div>
              </div>
              <strong className="tabular-numbers" style={{ color: 'var(--foreground)' }}>R$ {ativoCirculante}M</strong>
            </div>
            <div style={{ padding: '0.65rem 0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Ativo Não Circulante</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Imobilizado, Máquinas & Instalações</div>
              </div>
              <strong className="tabular-numbers" style={{ color: 'var(--foreground)' }}>R$ {ativoNaoCirculante}M</strong>
            </div>
          </div>
        </div>

        {/* Coluna da Direita: PASSIVO + PL */}
        <div style={{ background: 'var(--surface-strong)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '2px solid #2563EB', paddingBottom: '0.4rem' }}>
            <strong style={{ fontSize: '1.05rem', color: '#2563EB' }}>PASSIVO + PL (Origens)</strong>
            <strong className="tabular-numbers" style={{ fontSize: '1.15rem', color: 'var(--foreground)' }}>R$ {totalPassivo + patrimonioLiquido}M</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '0.55rem 0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Passivo Circulante (Curto Prazo)</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Fornecedores, Salários & Empréstimos &lt; 1 ano</div>
              </div>
              <strong className="tabular-numbers" style={{ color: 'var(--foreground)' }}>R$ {passivoCirculante}M</strong>
            </div>
            <div style={{ padding: '0.55rem 0.85rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Passivo Não Circulante (Longo Prazo)</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Debêntures & Financiamentos Bancários</div>
              </div>
              <strong className="tabular-numbers" style={{ color: 'var(--foreground)' }}>R$ {passivoNaoCirculante}M</strong>
            </div>
            <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(37, 99, 235, 0.3)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--track-math)' }}>Patrimônio Líquido (Capital Próprio)</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Capital Social + Lucros Retidos Acumulados</div>
              </div>
              <strong className="tabular-numbers" style={{ color: 'var(--track-math)', fontSize: '1.05rem', fontWeight: 800 }}>R$ {patrimonioLiquido}M</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. Visualizador de Valuation por Fluxo de Caixa Descontado (DCF)
   ========================================================================== */
function VisualizadorDCFValuation() {
  const [fcfInicial, setFcfInicial] = useState(500); // R$ 500M
  const [crescimento5Anos, setCrescimento5Anos] = useState(12); // 12% a.a.
  const [wacc, setWacc] = useState(11.5); // 11.5% a.a.
  const [crescimentoPerpetuo, setCrescimentoPerpetuo] = useState(4.5); // 4.5% a.a.
  const [dividaLiquida, setDividaLiquida] = useState(1200); // R$ 1.200M
  const [numAcoes, setNumAcoes] = useState(100); // 100M de ações

  const dcf = useMemo(() => {
    const projecoes = [];
    let somaVPL = 0;
    let fcfAtual = fcfInicial;

    for (let ano = 1; ano <= 5; ano++) {
      fcfAtual = fcfAtual * (1 + crescimento5Anos / 100);
      const fatorDesconto = Math.pow(1 + wacc / 100, ano);
      const vp = fcfAtual / fatorDesconto;
      somaVPL += vp;
      projecoes.push({ ano, fcf: Math.round(fcfAtual), vp: Math.round(vp) });
    }

    // Valor Residual (Perpetuidade de Gordon): VR = FCF_6 / (WACC - g)
    const fcfAno6 = fcfAtual * (1 + crescimentoPerpetuo / 100);
    const taxaDiferenca = (wacc - crescimentoPerpetuo) / 100;
    const valorPerpetuidade = taxaDiferenca > 0 ? fcfAno6 / taxaDiferenca : 0;
    const vpValorPerpetuidade = valorPerpetuidade / Math.pow(1 + wacc / 100, 5);

    const enterpriseValue = Math.round(somaVPL + vpValorPerpetuidade);
    const equityValue = enterpriseValue - dividaLiquida;
    const precoJusto = (equityValue / numAcoes).toFixed(2);

    return {
      projecoes,
      somaVPL: Math.round(somaVPL),
      vpValorPerpetuidade: Math.round(vpValorPerpetuidade),
      enterpriseValue,
      equityValue,
      precoJusto
    };
  }, [fcfInicial, crescimento5Anos, wacc, crescimentoPerpetuo, dividaLiquida, numAcoes]);

  return (
    <div className="bfa-tech-card" style={{ padding: '1.75rem 2rem', margin: '2rem 0', borderTop: '4px solid #059669' }}>
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <span className="mono-tag" style={{ color: '#059669', fontWeight: 800, fontSize: '0.75rem' }}>
          EQUITY RESEARCH & VALUATION PROFISSIONAL
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.2rem 0 0 0' }}>
          Modelo DCF (Fluxo de Caixa Descontado) Interativo
        </h3>
      </div>

      {/* Controles de Parâmetros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-strong)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>FCF Ano 0: R$ {fcfInicial}M</label>
          <input type="range" min="100" max="2000" step="50" value={fcfInicial} onChange={e => setFcfInicial(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Cresc. 5 Anos: {crescimento5Anos}% a.a.</label>
          <input type="range" min="2" max="30" step="1" value={crescimento5Anos} onChange={e => setCrescimento5Anos(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>WACC (Taxa de Desconto): {wacc}%</label>
          <input type="range" min="8" max="18" step="0.5" value={wacc} onChange={e => setWacc(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.2rem' }}>Crescimento Perpétuo (g): {crescimentoPerpetuo}%</label>
          <input type="range" min="2" max="7" step="0.5" value={crescimentoPerpetuo} onChange={e => setCrescimentoPerpetuo(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Resultados de Valuation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Enterprise Value (Firma)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '0.2rem' }}>
            R$ {dcf.enterpriseValue.toLocaleString('pt-BR')}M
          </div>
        </div>
        <div style={{ padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Equity Value (Acionistas)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2563EB', marginTop: '0.2rem' }}>
            R$ {dcf.equityValue.toLocaleString('pt-BR')}M
          </div>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.4)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800 }}>Preço Alvo Estimado (Target Price)</div>
          <div className="tabular-numbers" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
            R$ {dcf.precoJusto} / ação
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. Visualizador de Regressão Linear e Dispersão (y = a + bx)
   ========================================================================== */
function VisualizadorRegressaoLinear() {
  const [inclinacao, setInclinacao] = useState(1.25); // beta
  const [intercepto, setIntercepto] = useState(2.0); // alfa
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const dadosRegressao = useMemo(() => {
    // 10 pontos dispersos baseados na reta com ruído determinístico
    const rawX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ruidos = [0.8, -0.6, 1.2, -1.1, 0.4, 1.5, -0.9, 0.7, -1.4, 0.5];
    
    const scatterPoints = rawX.map((x, i) => ({
      x,
      y: Number((intercepto + inclinacao * x + ruidos[i]).toFixed(2))
    }));

    const linePoints = [
      { x: 0, y: Number(intercepto.toFixed(2)) },
      { x: 10, y: Number((intercepto + inclinacao * 10).toFixed(2)) }
    ];

    const r2 = 0.91;

    return { scatterPoints, linePoints, r2 };
  }, [inclinacao, intercepto]);

  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new window.Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Dados Amostrais Observados',
            data: dadosRegressao.scatterPoints,
            backgroundColor: '#2563EB',
            borderColor: '#2563EB',
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            type: 'line',
            label: `Reta de Regressão: y = ${intercepto.toFixed(1)} + ${inclinacao.toFixed(2)}x`,
            data: dadosRegressao.linePoints,
            borderColor: '#10B981',
            borderWidth: 3,
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', weight: 600 } } }
        },
        scales: {
          x: { min: 0, max: 11, title: { display: true, text: 'Variável Independente (X)' } },
          y: { min: 0, max: Math.max(15, intercepto + inclinacao * 10 + 3), title: { display: true, text: 'Variável Dependente (Y)' } }
        }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [dadosRegressao]);

  return (
    <div className="bfa-tech-card" style={{ padding: '1.75rem 2rem', margin: '2rem 0', borderTop: '4px solid var(--track-math)' }}>
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <span className="mono-tag" style={{ color: 'var(--track-math)', fontWeight: 800, fontSize: '0.75rem' }}>
          MODELAGEM ECONOMÉTRICA & AJUSTE DE MÍNIMOS QUADRADOS
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)', margin: '0.2rem 0 0 0' }}>
          Regressão Linear Simples Interativa (OLS)
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'var(--surface-strong)', padding: '1.15rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Coeficiente Angular (β / Sensibilidade): <strong>{inclinacao.toFixed(2)}</strong>
          </label>
          <input type="range" min="0.2" max="2.5" step="0.05" value={inclinacao} onChange={e => setInclinacao(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.35rem' }}>
            Intercepto (α / Constante): <strong>{intercepto.toFixed(1)}</strong>
          </label>
          <input type="range" min="-2.0" max="8.0" step="0.5" value={intercepto} onChange={e => setIntercepto(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ position: 'relative', height: '280px', width: '100%' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

/* ==========================================================================
   7. Orquestrador Automático de Visualizadores nas Aulas
   ========================================================================== */
function LessonVisualizerRouter({ lessonSlug }) {
  if (!lessonSlug) return null;

  if (lessonSlug === 'aula-02-juros-simples-e-compostos' || lessonSlug === 'aula-02-funcao-exponencial') {
    return <VisualizadorJurosCompostos />;
  }

  if (lessonSlug === 'aula-04-dispersao' || lessonSlug === 'aula-05-coeficiente-variacao-zscore') {
    return <VisualizadorDistribuicaoNormal />;
  }

  if (lessonSlug === 'aula-04-dre' || lessonSlug === 'aula-06-indicadores-de-rentabilidade') {
    return <VisualizadorDREWaterfall />;
  }

  if (lessonSlug === 'aula-03-balanco-patrimonial' || lessonSlug === 'aula-07-endividamento-e-liquidez') {
    return <VisualizadorBalancoPatrimonial />;
  }

  if (lessonSlug === 'aula-05-fluxo-de-caixa' || lessonSlug === 'aula-09-valuation-fluxo-de-caixa-descontado') {
    return <VisualizadorDCFValuation />;
  }

  if (lessonSlug === 'aula-07-regressao-linear' || lessonSlug === 'aula-06-covariancia-correlacao') {
    return <VisualizadorRegressaoLinear />;
  }

  return null;
}

window.VisualizadorJurosCompostos = VisualizadorJurosCompostos;
window.VisualizadorDistribuicaoNormal = VisualizadorDistribuicaoNormal;
window.VisualizadorDREWaterfall = VisualizadorDREWaterfall;
window.VisualizadorBalancoPatrimonial = VisualizadorBalancoPatrimonial;
window.VisualizadorDCFValuation = VisualizadorDCFValuation;
window.VisualizadorRegressaoLinear = VisualizadorRegressaoLinear;
window.LessonVisualizerRouter = LessonVisualizerRouter;
