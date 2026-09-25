const { useState, useEffect } = React;

function MarketTickerRibbon() {
  const [indicators, setIndicators] = useState([
    { label: "SELIC META", value: "10,50%", unit: "a.a.", change: null, isUp: null, tag: "Banco Central" },
    { label: "IPCA (12M)", value: "4,23%", unit: "acum.", change: null, isUp: null, tag: "IBGE" },
    { label: "IBOVESPA", value: "136.880", unit: "pts", change: null, isUp: true, tag: "B3" },
    { label: "DÓLAR COMERCIAL", value: "R$ 5,42", unit: "", change: null, isUp: null, tag: "Câmbio" },
    { label: "EURO", value: "R$ 6,05", unit: "", change: null, isUp: null, tag: "Câmbio" },
    { label: "BITCOIN", value: "R$ 350.000", unit: "", change: null, isUp: true, tag: "Cripto" }
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resAwe = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
        const dataAwe = await resAwe.json();
        
        const resSelic = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
        const dataSelic = await resSelic.json();

        const resIpca = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json');
        const dataIpca = await resIpca.json();
        
        setIndicators(prev => {
          const newInd = [...prev];
          
          if(dataSelic && dataSelic[0]) {
             newInd[0].value = parseFloat(dataSelic[0].valor).toLocaleString('pt-BR', {minimumFractionDigits:2}) + "%";
          }
          if(dataIpca && dataIpca[0]) {
             newInd[1].value = parseFloat(dataIpca[0].valor).toLocaleString('pt-BR', {minimumFractionDigits:2}) + "%";
          }
          
          if(dataAwe.USDBRL) {
             const val = parseFloat(dataAwe.USDBRL.ask);
             const pct = parseFloat(dataAwe.USDBRL.pctChange);
             newInd[3].value = "R$ " + val.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
             newInd[3].change = (pct > 0 ? "+" : "") + pct.toLocaleString('pt-BR') + "%";
             newInd[3].isUp = pct > 0 ? true : pct < 0 ? false : null;
          }
          if(dataAwe.EURBRL) {
             const val = parseFloat(dataAwe.EURBRL.ask);
             const pct = parseFloat(dataAwe.EURBRL.pctChange);
             newInd[4].value = "R$ " + val.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
             newInd[4].change = (pct > 0 ? "+" : "") + pct.toLocaleString('pt-BR') + "%";
             newInd[4].isUp = pct > 0 ? true : pct < 0 ? false : null;
          }
          if(dataAwe.BTCBRL) {
             const val = parseFloat(dataAwe.BTCBRL.ask);
             const pct = parseFloat(dataAwe.BTCBRL.pctChange);
             newInd[5].value = "R$ " + val.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
             newInd[5].change = (pct > 0 ? "+" : "") + pct.toLocaleString('pt-BR') + "%";
             newInd[5].isUp = pct > 0 ? true : pct < 0 ? false : null;
          }
          return newInd;
        });
      } catch (err) {
        console.error("Erro ao buscar dados de mercado:", err);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bfa-ticker-bar" aria-label="Indicadores Macroeconômicos em Tempo Real">
      <div className="bfa-ticker-header">
        <span className="bfa-ticker-pulse" />
        <span className="bfa-ticker-title">MERCADO & INDICADORES</span>
      </div>

      <div className="bfa-ticker-track-wrapper">
        <div className="bfa-ticker-track">
          {[...indicators, ...indicators].map((item, idx) => (
            <div key={${item.label}- + idx} className="bfa-ticker-item">
              <span className="bfa-ticker-item__label">{item.label}</span>
              <span className="bfa-ticker-item__value">
                {item.value} {item.unit && <small>{item.unit}</small>}
              </span>
              {item.change && (
                <span className={fa-ticker-item__change }>
                  {item.isUp === true ? '▲' : item.isUp === false ? '▼' : '━'} {item.change}
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
