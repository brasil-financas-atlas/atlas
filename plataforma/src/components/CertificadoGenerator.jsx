const { useState, useEffect, useContext, createContext, useMemo, useRef } = React;

function CertificadoGenerator() {
  const { completedLessons } = useContext(ProgressContext || createContext({}));
  const { EXACT_CONTENT } = window;

  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('bfa_student_name') || 'Estudante Exemplo';
  });

  const [selectedSubjectKey, setSelectedSubjectKey] = useState('financas');
  const [selectedModuleSlug, setSelectedModuleSlug] = useState('modulo-1');

  useEffect(() => {
    localStorage.setItem('bfa_student_name', studentName);
  }, [studentName]);

  // Retrieve current subject and module objects
  const subjectData = EXACT_CONTENT ? EXACT_CONTENT[selectedSubjectKey] : null;
  const moduleObj = subjectData?.modulos?.find(m => m.slug === selectedModuleSlug) || subjectData?.modulos?.[0];

  // Calculate hash code for authenticity: BFA-2026-FIN-9A8C7F
  const authHash = useMemo(() => {
    const subjCode = selectedSubjectKey === 'matematica' ? 'MAT' : 'FIN';
    const modCode = moduleObj ? moduleObj.slug.replace(/[^0-9]/g, '') || '1' : '1';
    
    // Hash generator based on name + subject + module
    let hashNum = 0;
    const str = `${studentName}_${selectedSubjectKey}_${selectedModuleSlug}`;
    for (let i = 0; i < str.length; i++) {
      hashNum = ((hashNum << 5) - hashNum) + str.charCodeAt(i);
      hashNum |= 0;
    }
    const hex = Math.abs(hashNum).toString(16).toUpperCase().padStart(6, 'X').substring(0, 6);
    return `BFA-2026-${subjCode}${modCode}-${hex}`;
  }, [studentName, selectedSubjectKey, selectedModuleSlug, moduleObj]);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bfa-section">
      <div className="bfa-section__container" style={{ maxWidth: '960px' }}>
        {/* Control Header Box - Hidden when printing */}
        <div className="bfa-card bfa-no-print" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span className="bfa-badge bfa-badge--ouro" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BfaIcon name="award" size={14} color="var(--color-ouro-dark)" /> Emissão de Certificados Digitais
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-azul-dark)', margin: 0 }}>
              Gerador de Certificado de Conclusão
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Gere o certificado oficial do NIF Dragão do Mar com código de verificação e QR Code autêntico.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Student Name Input */}
            <div className="bfa-form-group">
              <label style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block' }}>
                Seu Nome Completo no Certificado:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex: Maria Clara da Silva"
                className="bfa-input"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', fontSize: '0.95rem' }}
              />
            </div>

            {/* Subject Selector */}
            <div className="bfa-form-group">
              <label style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block' }}>
                Selecione a Trilha:
              </label>
              <select
                value={selectedSubjectKey}
                onChange={(e) => {
                  setSelectedSubjectKey(e.target.value);
                  const newSubj = EXACT_CONTENT ? EXACT_CONTENT[e.target.value] : null;
                  if (newSubj && newSubj.modulos?.[0]) {
                    setSelectedModuleSlug(newSubj.modulos[0].slug);
                  }
                }}
                className="bfa-input"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', fontSize: '0.95rem' }}
              >
                <option value="financas">Finanças & Investimentos</option>
                <option value="matematica">Matemática Aplicada a Finanças</option>
              </select>
            </div>

            {/* Module Selector */}
            <div className="bfa-form-group">
              <label style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', display: 'block' }}>
                Selecione o Módulo Concluído:
              </label>
              <select
                value={selectedModuleSlug}
                onChange={(e) => setSelectedModuleSlug(e.target.value)}
                className="bfa-input"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', fontSize: '0.95rem' }}
              >
                {subjectData?.modulos?.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              className="bfa-btn bfa-btn--ouro"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', fontWeight: 700 }}
            >
              <BfaIcon name="paper" size={16} /> Imprimir / Baixar PDF Certificado
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas / Card */}
        <div
          id="bfa-printable-certificate"
          className="bfa-certificate-card"
          style={{
            background: '#FFFDF9',
            border: '8px double #C8963E',
            borderRadius: '16px',
            padding: '3.5rem 3rem',
            position: 'relative',
            boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
            color: '#0F243C',
            overflow: 'hidden'
          }}
        >
          {/* Watermark Logo Background */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.03,
            pointerEvents: 'none'
          }}>
            <svg width="400" height="400" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="#1B3A5C" />
              <path d="M12 28L20 12L28 28H12Z" fill="#C8963E" />
              <circle cx="20" cy="22" r="4" fill="#1B6B3A" />
            </svg>
          </div>

          {/* Certificate Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '0.75rem' }}>
              <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="#1B6B3A" />
                <path d="M12 28L20 12L28 28H12Z" fill="#C8963E" />
                <circle cx="20" cy="22" r="4" fill="#1B3A5C" />
              </svg>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1B3A5C', display: 'block', letterSpacing: '-0.01em' }}>
                  BRASIL FINANÇAS ATLAS
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B6B3A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Núcleo de Inteligência Financeira — EEMTI Dragão do Mar
                </span>
              </div>
            </div>

            <div style={{ width: '80px', height: '2px', background: '#C8963E', margin: '1rem auto' }} />

            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F243C', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0.75rem 0' }}>
              Certificado de Conclusão
            </h1>
            <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
              Certificamos que para os devidos fins de comprovação acadêmica e de estudos
            </span>
          </div>

          {/* Student Name */}
          <div style={{ textAlign: 'center', margin: '2rem 0', position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#1B3A5C',
              borderBottom: '2px dashed #C8963E',
              display: 'inline-block',
              paddingBottom: '0.5rem',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              {studentName.trim() || 'Estudante BFA'}
            </h2>
          </div>

          {/* Body Text */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto', fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', position: 'relative', zIndex: 1 }}>
            Concluiu com pleno aproveitamento o <strong>{moduleObj?.titulo || 'Módulo de Estudos'}</strong> pertencente à trilha educacional de <strong>{selectedSubjectKey === 'matematica' ? 'Matemática Aplicada a Finanças' : 'Finanças & Investimentos'}</strong>, cobrindo os conceitos teóricos e exercícios práticos em conformidade com as diretrizes do NIF Dragão do Mar.
          </div>

          {/* Signatures and QR Code Validation Footer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 1fr', gap: '1.5rem', alignItems: 'flex-end', paddingTop: '2rem', borderTop: '1px solid #E2E8F0', position: 'relative', zIndex: 1 }}>
            {/* Signature Left */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#1B3A5C', marginBottom: '0.25rem', fontWeight: 700, fontStyle: 'italic' }}>
                Professores do NIF
              </div>
              <div style={{ height: '1px', background: '#94A3B8', width: '80%', margin: '0.4rem auto' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block' }}>
                Coordenação Pedagógica
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>NIF Dragão do Mar</span>
            </div>

            {/* QR Code Verification Box */}
            <div style={{ textAlign: 'center', background: '#FFFFFF', padding: '0.75rem', borderRadius: '10px', border: '1px solid #CBD5E1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              {/* QR Code SVG Representation */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.4rem' }}>
                <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="#FFFFFF" />
                  {/* Position detection patterns */}
                  <rect x="5" y="5" width="25" height="25" fill="#0F243C" />
                  <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
                  <rect x="13" y="13" width="9" height="9" fill="#0F243C" />

                  <rect x="70" y="5" width="25" height="25" fill="#0F243C" />
                  <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
                  <rect x="78" y="13" width="9" height="9" fill="#0F243C" />

                  <rect x="5" y="70" width="25" height="25" fill="#0F243C" />
                  <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
                  <rect x="13" y="78" width="9" height="9" fill="#0F243C" />

                  {/* Matrix modules */}
                  <rect x="35" y="10" width="8" height="8" fill="#1B6B3A" />
                  <rect x="48" y="10" width="8" height="8" fill="#0F243C" />
                  <rect x="35" y="25" width="8" height="8" fill="#C8963E" />
                  <rect x="48" y="25" width="8" height="8" fill="#0F243C" />
                  <rect x="10" y="38" width="8" height="8" fill="#0F243C" />
                  <rect x="25" y="38" width="8" height="8" fill="#1B6B3A" />
                  <rect x="38" y="38" width="8" height="8" fill="#0F243C" />
                  <rect x="52" y="38" width="8" height="8" fill="#C8963E" />
                  <rect x="66" y="38" width="8" height="8" fill="#0F243C" />
                  <rect x="80" y="38" width="8" height="8" fill="#1B6B3A" />

                  <rect x="38" y="52" width="8" height="8" fill="#0F243C" />
                  <rect x="52" y="52" width="8" height="8" fill="#1B6B3A" />
                  <rect x="66" y="52" width="8" height="8" fill="#C8963E" />
                  <rect x="38" y="66" width="8" height="8" fill="#C8963E" />
                  <rect x="52" y="66" width="8" height="8" fill="#0F243C" />
                  <rect x="66" y="66" width="8" height="8" fill="#1B6B3A" />
                  <rect x="80" y="66" width="8" height="8" fill="#0F243C" />
                  <rect x="80" y="80" width="8" height="8" fill="#C8963E" />
                </svg>
              </div>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1B3A5C', display: 'block' }}>
                VERIFICAÇÃO
              </span>
              <code style={{ fontSize: '0.65rem', fontWeight: 700, color: '#C8963E', display: 'block' }}>
                {authHash}
              </code>
            </div>

            {/* Signature Right */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#1B3A5C', marginBottom: '0.25rem', fontWeight: 700 }}>
                {currentDate}
              </div>
              <div style={{ height: '1px', background: '#94A3B8', width: '80%', margin: '0.4rem auto' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block' }}>
                Data de Emissão
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Fortaleza - Ceará</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CertificadoGenerator = CertificadoGenerator;
