import BfaIcon from './Icons';
import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';


// Dados de base representativos do ranking nacional BRHSIC
const BASELINE_LEADERBOARD = [
  { id: 'b1', name: 'Gabriel Siqueira Costa', school: 'Colégio Militar de Fortaleza', uf: 'CE', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 20, total: 20, percentage: 100, timeFormatted: '42:15', date: '26/08/2026' },
  { id: 'b2', name: 'Beatriz Vasconcelos', school: 'Colégio Bandeirantes', uf: 'SP', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 19, total: 20, percentage: 95, timeFormatted: '45:30', date: '26/08/2026' },
  { id: 'b3', name: 'Lucas Mendes Prado', school: 'Colégio Santo Agostinho', uf: 'MG', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 19, total: 20, percentage: 95, timeFormatted: '48:10', date: '25/08/2026' },
  { id: 'b4', name: 'Mariana Duarte Farias', school: 'Colégio Ipiranga', uf: 'RS', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 18, total: 20, percentage: 90, timeFormatted: '41:20', date: '25/08/2026' },
  { id: 'b5', name: 'Matheus Henrique Lins', school: 'Colégio São Bento', uf: 'RJ', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 18, total: 20, percentage: 90, timeFormatted: '49:05', date: '24/08/2026' },
  { id: 'b6', name: 'Camila Rocha Nogueira', school: 'Colégio Santa Cecília', uf: 'CE', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 17, total: 20, percentage: 85, timeFormatted: '38:50', date: '24/08/2026' },
  { id: 'b7', name: 'Felipe Alencar Pinto', school: 'Colégio Positivo', uf: 'PR', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 17, total: 20, percentage: 85, timeFormatted: '44:12', date: '23/08/2026' },
  { id: 'b8', name: 'Larissa Albuquerque', school: 'Colégio Marista', uf: 'PE', simuladoTitulo: 'Simulado Geral Oficial — 1ª Fase BRHSIC 2026', score: 16, total: 20, percentage: 80, timeFormatted: '51:00', date: '23/08/2026' }
];

function RankingLeaderboard() {
  const [selectedUF, setSelectedUF] = useState('TODOS');
  const [searchFilter, setSearchFilter] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    try {
      const localEntries = JSON.parse(localStorage.getItem('bfa_leaderboard_entries') || '[]');
      // Unir entradas locais com a base inicial, ordenando por % desc e tempo asc
      const combined = [...localEntries, ...BASELINE_LEADERBOARD].sort((a, b) => {
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage;
        }
        return a.timeFormatted.localeCompare(b.timeFormatted);
      });
      setEntries(combined);
    } catch (e) {
      setEntries(BASELINE_LEADERBOARD);
    }
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter(item => {
      const matchUF = selectedUF === 'TODOS' || item.uf === selectedUF;
      const matchSearch = !searchFilter.trim() ||
        item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.school.toLowerCase().includes(searchFilter.toLowerCase());
      return matchUF && matchSearch;
    });
  }, [entries, selectedUF, searchFilter]);

  const top3 = filteredEntries.slice(0, 3);
  const ufsList = ['TODOS', 'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  return (
    <div className="bfa-card" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="bfa-badge bfa-badge--ouro" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="trophy" size={14} color="var(--color-ouro)" /> Competição Oficial BRHSIC
            </span>
            <span className="bfa-badge bfa-badge--verde">Ranking Nacional</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', margin: 0 }}>
            Leaderboard Nacional de Estudantes
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.35rem', maxWidth: '650px' }}>
            Classificação atualizada dos melhores desempenhos nos simulados oficiais da <strong>Olimpíada Brasileira de Investimentos</strong>.
          </p>
        </div>

        <a href="#/simulados" className="bfa-btn bfa-btn--ouro" style={{ padding: '0.65rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <BfaIcon name="timer" size={16} />
          <span>Fazer Simulado Agora</span>
          <BfaIcon name="arrowRight" size={14} />
        </a>
      </div>

      {/* Pódio Olímpico Top 3 */}
      {top3.length >= 3 && selectedUF === 'TODOS' && !searchFilter && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem', alignItems: 'end' }}>
          {/* 2º Lugar (Prata) */}
          <div className="bfa-bento-card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '4px solid #94A3B8', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.15)', marginBottom: '0.5rem' }}>
              <BfaIcon name="medal" size={32} color="#94A3B8" />
            </div>
            <div>
              <span className="mono-tag" style={{ color: '#94A3B8', fontWeight: 800 }}>2º LUGAR NACIONAL</span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.5rem 0 0.2rem 0' }}>{top3[1].name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{top3[1].school} · {top3[1].uf}</p>
            <div style={{ marginTop: '0.75rem', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-verde-dark)', fontFamily: 'var(--font-mono)' }}>
              {top3[1].score}/{top3[1].total} ({top3[1].percentage}%)
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.35rem' }}>
              <BfaIcon name="clock" size={12} />
              <span>{top3[1].timeFormatted}</span>
            </span>
          </div>

          {/* 1º Lugar (Ouro - Destaque Central) */}
          <div className="bfa-bento-card" style={{ textAlign: 'center', padding: '2rem 1.5rem', borderTop: '4px solid var(--color-ouro)', background: 'var(--bg-surface)', transform: 'scale(1.03)', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'inline-flex', padding: '0.65rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', marginBottom: '0.5rem' }}>
              <BfaIcon name="crown" size={36} color="var(--color-ouro)" />
            </div>
            <div>
              <span className="mono-tag" style={{ color: 'var(--color-ouro)', fontWeight: 800, background: 'rgba(245, 158, 11, 0.15)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                1º LUGAR NACIONAL (OURO)
              </span>
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.6rem 0 0.2rem 0' }}>{top3[0].name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{top3[0].school} · {top3[0].uf}</p>
            <div style={{ marginTop: '0.85rem', fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-ouro)', fontFamily: 'var(--font-mono)' }}>
              {top3[0].score}/{top3[0].total} ({top3[0].percentage}%)
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.35rem' }}>
              <BfaIcon name="clock" size={12} />
              <span>{top3[0].timeFormatted}</span>
            </span>
          </div>

          {/* 3º Lugar (Bronze) */}
          <div className="bfa-bento-card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '4px solid #D97706', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '50%', background: 'rgba(217, 119, 6, 0.15)', marginBottom: '0.5rem' }}>
              <BfaIcon name="award" size={32} color="#D97706" />
            </div>
            <div>
              <span className="mono-tag" style={{ color: '#D97706', fontWeight: 800 }}>3º LUGAR NACIONAL</span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.5rem 0 0.2rem 0' }}>{top3[2].name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{top3[2].school} · {top3[2].uf}</p>
            <div style={{ marginTop: '0.75rem', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-verde-dark)', fontFamily: 'var(--font-mono)' }}>
              {top3[2].score}/{top3[2].total} ({top3[2].percentage}%)
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.35rem' }}>
              <BfaIcon name="clock" size={12} />
              <span>{top3[2].timeFormatted}</span>
            </span>
          </div>
        </div>
      )}

      {/* Barra de Filtros */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
        {/* Busca por Nome/Escola */}
        <div style={{ flex: '1', minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Buscar por estudante ou colégio..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--card)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* Filtro por UF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Estado (UF):</span>
          <select
            value={selectedUF}
            onChange={(e) => setSelectedUF(e.target.value)}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--card)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 700
            }}
          >
            {ufsDisponiveis.map(uf => (
              <option key={uf} value={uf}>{uf === 'TODOS' ? 'Todo o Brasil (Geral)' : uf}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Classificação */}
      <div style={{ overflowX: 'auto', background: 'var(--card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface)', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '0.85rem 0.5rem', textAlign: 'center', width: '60px' }}>Pos.</th>
              <th style={{ padding: '0.85rem' }}>Estudante</th>
              <th style={{ padding: '0.85rem' }}>Escola / Instituição</th>
              <th style={{ padding: '0.85rem', textAlign: 'center' }}>UF</th>
              <th style={{ padding: '0.85rem', textAlign: 'center' }}>Acertos (%)</th>
              <th style={{ padding: '0.85rem', textAlign: 'center' }}>Tempo</th>
              <th style={{ padding: '0.85rem', textAlign: 'center' }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((item, idx) => {
              const isTop1 = idx === 0 && selectedUF === 'TODOS' && !searchFilter;
              const isTop2 = idx === 1 && selectedUF === 'TODOS' && !searchFilter;
              const isTop3 = idx === 2 && selectedUF === 'TODOS' && !searchFilter;

              let badgePos = `#${idx + 1}`;
              if (isTop1) badgePos = '1º';
              if (isTop2) badgePos = '2º';
              if (isTop3) badgePos = '3º';

              return (
                <tr
                  key={item.id || idx}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--card)'
                  }}
                >
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', fontWeight: 800, color: isTop1 ? 'var(--color-ouro)' : 'var(--text-primary)' }}>
                    {badgePos}
                  </td>
                  <td style={{ padding: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-secondary)' }}>
                    {item.school}
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'center' }}>
                    <span className="mono-tag" style={{ background: 'var(--card)', padding: '0.2rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 700 }}>
                      {item.uf}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-mono)', color: item.percentage >= 80 ? 'var(--color-verde-dark)' : 'var(--text-primary)' }}>
                    {item.score}/{item.total} ({item.percentage}%)
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {item.timeFormatted}
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {item.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default RankingLeaderboard;
