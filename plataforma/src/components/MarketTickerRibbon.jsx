const { useState, useEffect, useMemo } = React;

function MarketTickerRibbon() {
  const indicators = useMemo(() => [
    { label: "SELIC META", value: "10,50%", unit: "a.a.", change: "0,00%", isUp: null, tag: "Banco Central" },
    { label: "CDI DIÁRIO", value: "10,40%", unit: "a.a.", change: "+0,01%", isUp: true, tag: "Renda Fixa" },
    { label: "IPCA INFLAÇÃO (12M)", value: "4,23%", unit: "acum.", change: "-0,05%", isUp: false, tag: "IBGE" },
    { label: "IBOVESPA", value: "136.880", unit: "pts", change: "+0,84%", isUp: true, tag: "B3" },
    { label: "DÓLAR PTAX", value: "R$ 5,42", unit: "", change: "-0,32%", isUp: false, tag: "Câmbio" },
    { label: "TESOURO IPCA+ 2035", value: "6,18%", unit: "a.a.", change: "+0,04%", isUp: true, tag: "Tesouro Direto" },
    { label: "IFIX (FIIs)", value: "3.385", unit: "pts", change: "+0,12%", isUp: true, tag: "Fundos Imob." },
    { label: "S&P 500", value: "5.648", unit: "pts", change: "+0,45%", isUp: true, tag: "Global" }
  ], []);

  return (
    <div className="bfa-ticker-bar" aria-label="Indicadores Macroeconômicos em Tempo Real">
      <div className="bfa-ticker-header">
        <span className="bfa-ticker-pulse" />
        <span className="bfa-ticker-title">MERCADO & INDICADORES</span>
      </div>

      <div className="bfa-ticker-track-wrapper">
        <div className="bfa-ticker-track">
          {/* Repeat list twice for seamless marquee loop */}
          {[...indicators, ...indicators].map((item, idx) => (
            <div key={`${item.label}-${idx}`} className="bfa-ticker-item">
              <span className="bfa-ticker-item__label">{item.label}</span>
              <span className="bfa-ticker-item__value">
                {item.value} {item.unit && <small>{item.unit}</small>}
              </span>
              {item.change && (
                <span className={`bfa-ticker-item__change ${item.isUp === true ? 'up' : item.isUp === false ? 'down' : 'neutral'}`}>
                  {item.isUp === true ? '▲' : item.isUp === false ? '▼' : '●'} {item.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.MarketTickerRibbon = MarketTickerRibbon;
