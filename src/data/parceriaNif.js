// Conteudo da parceria com a rede Academy / NIF na pagina inicial.
// Textos e numeros tirados do material oficial da BRHSIC Academy
// (docs-internos/brhsic-academy-*.pdf). Fotos em public/assets/images/nif/.
const PASTA = '/assets/images/nif';

export const FOTOS_NIF = {
  destaque: { src: `${PASTA}/hero-documental-v2.webp`, w: 2560, h: 1441, alt: 'Estudantes apresentando uma análise para a turma em um encontro do NIF', legenda: 'Alunos ensinando alunos' },
  galeria: [
    { src: `${PASTA}/aula-valuation.webp`, w: 2400, h: 3200, alt: 'Estudante resolvendo no quadro uma conta de valuation', legenda: 'Aula de valuation' },
    { src: `${PASTA}/aula-nif.webp`, w: 2560, h: 1920, alt: 'Encontro do NIF com conteúdo projetado no quadro', legenda: 'Encontro semanal' },
    { src: `${PASTA}/certificado-nif.webp`, w: 1600, h: 2132, alt: 'Três estudantes segurando um certificado do NIF', legenda: 'Entrega de certificado' },
    { src: `${PASTA}/aula-renda-fixa.webp`, w: 2400, h: 3200, alt: 'Estudante apontando para uma tabela de renda fixa projetada', legenda: 'Aula de renda fixa' },
    { src: `${PASTA}/aula-auditorio.webp`, w: 1920, h: 2560, alt: 'Estudante falando para uma plateia de alunos em um auditório', legenda: 'Aula aberta no auditório' },
  ],
  origem: { src: `${PASTA}/nif-auditorio.webp`, w: 2560, h: 1406, alt: 'Auditório cheio no primeiro NIF, no Colégio La Salle Canoas', legenda: 'La Salle Canoas' },
};

export const NUMEROS_REDE = [
  { valor: 55, rotulo: 'Aulas na plataforma' },
  { valor: 9, rotulo: 'Núcleos ativos' },
  { valor: 5, rotulo: 'Estados conectados' },
  { valor: 400, prefixo: '+', rotulo: 'Alunos alcançados' },
];

export const PILARES_NIF = [
  { titulo: 'Economia e cenário macro', texto: 'Entender o que move o mundo antes de olhar um ativo.' },
  { titulo: 'Investimentos e risco', texto: 'Analisar decisões, hipóteses e consequências.' },
  { titulo: 'Relatórios e projetos', texto: 'Transformar curiosidade em pesquisa bem construída.' },
  { titulo: 'Educação financeira real', texto: 'Levar o conhecimento para a vida e para a comunidade.' },
];

export const PASSOS_LIDER = [
  { titulo: 'Converse com a gente', texto: 'Entendemos sua escola, seus objetivos e por onde começar.' },
  { titulo: 'Receba a estrutura', texto: 'Conteúdo, formação, apoio e contato com outros líderes.' },
  { titulo: 'Multiplique localmente', texto: 'Reúna jovens, conduza encontros e faça o núcleo ganhar vida.' },
];

export const LINKS_NIF = {
  rede: 'https://brhsic-academy.vercel.app',
  contato: 'https://wa.me/5551995654746',
  competicao: 'https://brhsic.com',
};
