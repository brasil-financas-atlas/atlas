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
  { valor: 55, rotulo: 'Aulas completas' },
  { valor: 7, rotulo: 'Módulos de formação' },
  { valor: 100, sufixo: '%', rotulo: 'Gratuito e livre' },
  { valor: 400, prefixo: '+', rotulo: 'Alunos alcançados' },
];

// O que a plataforma oferece (foco no Atlas, nao no NIF)
export const RECURSOS_PLATAFORMA = [
  { titulo: 'Trilhas do zero ao avançado', texto: 'Matemática financeira, mercado e análise de empresas, em aulas curtas com exemplos do dia a dia.' },
  { titulo: 'Exercícios com gabarito', texto: 'Quiz em cada aula e um banco de exercícios com resolução passo a passo.' },
  { titulo: 'Guia oficial da BRHSIC', texto: 'Valuation, Equity Research e pitch para competir na olimpíada de investimentos.' },
  { titulo: 'Progresso salvo e certificado', texto: 'Crie sua conta, continue de qualquer aparelho e emita o certificado ao concluir.' },
];

// Como a plataforma ajuda quem lidera um NIF
export const APOIO_NUCLEOS = [
  { titulo: 'Material pronto para os encontros', texto: 'Cada aula já vem com explicação, exemplos e fórmulas para projetar na sala.' },
  { titulo: 'Exercícios para treinar em grupo', texto: 'Listas por tema e dificuldade, com gabarito para conferir junto com a turma.' },
  { titulo: 'Preparação para a competição', texto: 'O guia da BRHSIC organiza o caminho até a tese de investimento do núcleo.' },
];

export const LINKS_NIF = {
  rede: 'https://brhsic-academy.vercel.app',
  contato: 'https://wa.me/5551995654746',
  competicao: 'https://brhsic.com',
};
