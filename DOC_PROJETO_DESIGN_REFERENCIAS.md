# Brasil Finanças Atlas (BFA) — Documento de Projeto, Design e Referências

## 1. Visão Geral e Propósito do Projeto Brasil Finanças Atlas (BFA)

### 1.1 Origem e Missão Institucional
O **Brasil Finanças Atlas (BFA)** é uma plataforma educacional aberta e gratuita de matemática aplicada e finanças, nascida no **Núcleo de Inteligência Financeira (NIF)** da escola pública **EEMTI Dragão do Mar**, localizada em Fortaleza-CE. Como documentado no [README.md](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/README.md) e na página institucional em [ExtraPages.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/ExtraPages.jsx), o projeto foi criado com a missão de universalizar a educação financeira de alto nível para estudantes do ensino médio em todo o Brasil.

A premissa fundamental do BFA é eliminar as barreiras socioeconômicas no acesso ao conhecimento sobre dinheiro, economia e mercado financeiro, oferecendo um material rigoroso, livre de jargões bancários corporativos e construído do zero absoluto até a análise profissional de investimentos.

### 1.2 Público-Alvo e Objetivos Pedagógicos
- **Estudantes do Ensino Médio**: Alunos que desejam aprender a gerir suas finanças pessoais, compreender conceitos de juros, inflação e investimentos, e desenvolver o raciocínio matemático aplicado à vida real.
- **Participantes de Competições e Olimpíadas**: Estudantes em preparação para competições acadêmicas e de investimentos, como a **BRHSIC (Brazil High School Investment Competition)**.
- **Professores e Educadores**: Docentes que buscam planos de aula, listas de exercícios, simuladores interativos e material didático aberto para uso em sala de aula.

### 1.3 Estrutura Curricular e Trilhas de Estudo
O projeto organiza o conhecimento em duas trilhas principais e uma trilha especial de competição, registradas nas configurações do [mkdocs.yml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/mkdocs.yml) e nos dados da plataforma React em [Home.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/Home.jsx):

1. **Matemática Aplicada a Finanças** (4 Módulos • 29 Aulas):
   - *Módulo 1 — Álgebra do Zero*: Operações básicas, frações, decimais, porcentagem na vida real, regra de três, potências, raízes, notação científica e equações de 1º grau.
   - *Módulo 2 — Matemática Financeira Aplicada*: Variação percentual, juros simples vs. compostos, inflação e juros reais (Equação de Fisher), rentabilidade líquida e comparativos CDI/Selic.
   - *Módulo 3 — Funções, Progressões e Probabilidade*: Funções exponenciais, logaritmos, progressões aritméticas (PA), progressões geométricas (PG), somatório ($\Sigma$), produtório ($\Pi$), probabilidade e valor esperado em cenários de investimento.
   - *Módulo 4 — Estatística e Regressão Linear*: População e amostra, medidas de tendência central (média, mediana, moda), variância, desvio padrão, $z$-score, covariância, correlação e regressão linear simples.

2. **Finanças & Investimentos** (3 Módulos • 26 Aulas):
   - *Módulo 1 — Fundamentos em Finanças*: Funcionamento do mercado financeiro, Sistema Financeiro Nacional (SFN), Tesouro Direto, CDB/LCI/LCA/FGC, renda variável (Ações, ETFs, FIIs), binômio risco-retorno e macroeconomia para investidores.
   - *Módulo 2 — Análise Fundamentalista de Empresas*: Leitura de Demonstrações Financeiras (Balanço Patrimonial, DRE, Demonstração do Fluxo de Caixa - DFC), indicadores de rentabilidade (ROE, ROIC, margens), liquidez, endividamento, múltiplos de valuation ($P/L$, $EV/EBITDA$, $P/VP$) e Valuation por Fluxo de Caixa Descontado (DCF).
   - *Módulo 3 — Montagem de Portfólio e Investimento*: Alocação de ativos, perfil de risco, correlação de classes, teoria moderna de portfólio, rebalanceamento, tributação e custos operacionais.

3. **Preparação BRHSIC**:
   - Trilha de alta performance com guias para elaboração de relatórios de *Equity Research*, modelagem financeira e técnicas de *Pitch* verbal para bancas examinadoras ([ExtraPages.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/ExtraPages.jsx)).

### 1.4 Recursos Interativos e Funcionalidades da Plataforma
A plataforma inclui um ecossistema completo de ferramentas pedagógicas e de usabilidade:
- **Simulador Interativo de Juros Compostos**: Desenvolvido em [CalculadoraJurosCompostos.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/CalculadoraJurosCompostos.jsx), permitindo ajustar capital inicial, aportes mensais, taxa e tempo via sliders com gráficos comparativos em tempo real.
- **Motor de Quizzes Interativos**: Localizado em [QuizEngine.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/QuizEngine.jsx), fornecendo feedback imediato, estatísticas de acerto e explicações detalhadas por questão.
- **Fórum de Dúvidas com Timestamps**: Implementado em [VideoAndForum.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/VideoAndForum.jsx), conectando comentários a momentos exatos das videoaulas.
- **Leitor de Áudio Text-to-Speech**: Componente em [AudioReader.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/AudioReader.jsx) para narração em português e acessibilidade.
- **Gerador de Certificados Digitais**: Presente em [CertificadoGenerator.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/CertificadoGenerator.jsx), gerando documentos de conclusão com QR Code SVG e código de verificação alfanumérico.
- **Gerador de Cronograma de Estudos**: Ferramenta em [ExtraPages.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/ExtraPages.jsx) que calcula metas diárias de aula com base na data limite definida pelo estudante.
- **Portal de Notícias & Análises do Mercado**: Hub de artigos em [ExtraPages.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/ExtraPages.jsx) relacionando acontecimentos macroeconômicos reais ao conteúdo teórico.

### 1.5 Arquitetura Tecnológica: Git-as-a-CMS e Zero-Build Environment
Conforme detalhado no [HANDOVER.md](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/HANDOVER.md) e no [README.md](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/README.md), o BFA adota decisões arquiteturais focadas em facilidade de manutenção e custo zero de infraestrutura:
- **Zero Build Tooling no Frontend**: O sistema utiliza React 18 e Babel Standalone via CDN em [index.html](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/index.html), permitindo execução imediata via servidor HTTP nativo do Python (`python -m http.server 8080 --directory plataforma`).
- **Git-as-a-CMS**: Alterações feitas pelos professores via painel admin in-context ([EditableBlock.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/EditableBlock.jsx), [QuizEngine.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/QuizEngine.jsx)) geram um estado gravado em `overrides.json`, sincronizado diretamente no repositório GitHub via [GitHubSyncModal.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/GitHubSyncModal.jsx) e API REST do GitHub.
- **Auto-Sync Local**: O script Python [auto_sync.py](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/auto_sync.py) utiliza a biblioteca `watchdog` para monitorar edições locais e realizar `git pull --rebase` e `git push` automáticos em segundo plano.
- **Dualidade com MkDocs Material**: Além da aplicação React SPA em `plataforma/`, a documentação em Markdown é compilada com MkDocs Material ([mkdocs.yml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/mkdocs.yml)), oferecendo uma versão alternativa de leitura estática rápida.

---

## 2. Arquitetura e Escolhas de Design

### 2.1 Paleta de Cores e Temas Visuais
A identidade visual do Brasil Finanças Atlas foi desenvolvida para transmitir elegância, sobriedade financeira e brasilidade. O sistema dispõe de quatro temas visuais selecionáveis em tempo real via [ThemeSelector.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/ThemeSelector.jsx) e codificados em [globals.css](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/styles/globals.css) e [themes.css](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/styles/themes.css):

| Tema Visual | Cores Primárias / Hexadecimal | Proposta e Atmosfera |
|---|---|---|
| **Brasil Atlas Classic** (Padrão) | Verde (`#1B6B3A`), Azul Marinho (`#1B3A5C`), Dourado (`#C8963E`) | Identidade nacional refinada com alto contraste visual sobre fundo claro (`#F4F6F9`). |
| **Executive Financial / B3 Corporate** | Azul Escuro (`#0A2540`), Grafite (`#1A1F36`), Ciano/Verde Água (`#00D4B2`) | Estilo corporativo de mercado de capitais e plataformas institucionais financeiras. |
| **Khan Minimalist Academy** | Azul Acadêmico (`#0056B3`), Verde Escuro (`#108548`), Amarelo (`#E0A800`) | Interface ultra-limpa com foco total na leitura e aprendizado livre de distrações. |
| **Dark Obsidian Pro** | Grafite Escuro (`#0D1117`), Verde Esmeralda (`#10B981`), Âmbar (`#D97706`) | Modo escuro de alta legibilidade para estudo noturno e baixa fadiga visual. |

No sistema de documentação MkDocs, as regras de cores são controladas pelo arquivo [design.css](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/docs/stylesheets/design.css), que define variáveis CSS amigáveis em português (`--bfa-cor-principal`, `--bfa-cor-destaque`, `--bfa-cor-matematica`, `--bfa-cor-financas`, `--bfa-cor-brhsic`), facilitando o ajuste de design por membros da equipe sem conhecimento em programação como orienta o guia em [DESIGN.md](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/DESIGN.md).

### 2.2 Tipografia e Notação Científica/Matemática
Como estabelecido em [typography.css](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/styles/typography.css) e no [mkdocs.yml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/mkdocs.yml):
- **Família Tipográfica Principal (Sans-serif)**: `Plus Jakarta Sans`, complementada por `Inter`. Apresenta excelente legibilidade em telas digitais, proporções humanas e desenho geométrico moderno.
- **Tipografia Monoespaçada (Code & Data)**: `JetBrains Mono`. Utilizada em blocos de código, hashes de certificação, variáveis numéricas e tabelas financeiras.
- **Renderização Matemática (KaTeX / MathJax)**: Fórmulas matemáticas em linha e em bloco ($$ \text{VF} = \text{VP} \cdot (1 + i)^n $$) são destacadas visualmente com fundo suave (`--color-azul-light`) e borda lateral distintiva (`border-left: 4px solid var(--color-azul)`).

### 2.3 Hierarquia Visual, Componentes e Estilização
- **Banners Hero**: Gradientes direcionais (`linear-gradient(135deg, ...)`) aplicados nos topos das páginas para conferir profundidade e autoridade institucional.
- **Cards e Grids Responsivos**: Utilização de layouts em grid adaptável (`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`) com elevação visual no estado hover (`transform: translateY(-4px)` e sombras suaves `--shadow-md`).
- **Selos e Badges**: Elementos ovais (`.bfa-badge`) com cantos arredondados (`border-radius: 9999px`) e bordas semi-transparentes para categorização rápida de módulos, temas e níveis.
- **Caixas "Napkin" (Resumos Visuais)**: Blocos `.bfa-napkin-card` desenhados para destacar intuições teóricas principais antes da dedução matemática formal.
- **Admonitions e Callouts**: Caixas informativas com códigos de cores funcionais (azul para informação, verde para dicas, amarelo para avisos e vermelho para perigos) baseadas nas extensões pymdownx do MkDocs.

### 2.4 Usabilidade e Experiência do Usuário (UX)
- **Navegação Lateral Colapsável (Sidebar)**: Em [AulaPage.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/AulaPage.jsx), o menu lateral recolhível preserva o contexto da trilha completa enquanto maximiza a área de leitura no desktop e dispositivo móvel.
- **Design Inclusivo e Acessibilidade**: O leitor de áudio em [AudioReader.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/AudioReader.jsx) higieniza a sintaxe Markdown (removendo símbolos técnicos) antes da síntese de voz nativa.
- **Interatividade Imediata**: As calculadoras e quizzes reagem instantaneamente aos inputs do usuário sem necessidade de recarregamento de página.

---

## 3. Referências Visuais, Pedagógicas e de Plataformas de Ensino/Finanças

O projeto Brasil Finanças Atlas é explicitamente fundamentado na síntese de três grandes referências visuais, técnicas e pedagógicas:

### 3.1 Khan Academy (Referência de Arquitetura Pedagógica)
- **Modelagem Visual e Estrutural**: O BFA adota o padrão da Khan Academy para a navegação de aulas, com menu lateral estruturado em árvore (Disciplina ➔ Módulo ➔ Aula), indicadores de status de conclusão (ícones de check em verde) e barra de progresso do aluno.
- **Sequenciamento de Aprendizado**: Teoria expositiva curta seguida imediatamente por verificação de aprendizagem via quiz interativo e espaço para debate de dúvidas.

### 3.2 Napkin Finance (Referência de Comunicação Teórica e Intuição Visual)
- **Abordagem "De Guardanapo"**: Inspiração direta na metodologia da *Napkin Finance*, focada em explicar conceitos financeiros extremamente complexos (como Juros Compostos, Regressão Linear ou DCF) através de um esquema visual simples e intuitivo antes da formalidade matemática.
- **Componentes Napkin no BFA**: O componente `.bfa-napkin-card` presente em [Home.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/Home.jsx) e [AulaPage.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/AulaPage.jsx) sintetiza o conceito central da aula em 3 pontos lógicos curtos.

### 3.3 B3 & Plataformas do Mercado Financeiro (Referência Profissional e Corporativa)
- **Linguagem Visual e Terminologia Real**: O tema *B3 Corporate* e o layout de tabelas financeiras refletem o rigor e a estética das plataformas de Equity Research e análise de mercado de capitais.
- **Trilha BRHSIC e Casos Reais**: Os estudos de caso (como análise da WEG em [ExtraPages.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/pages/ExtraPages.jsx)) conectam o aprendizado de sala de aula ao padrão exigido em avaliações corporativas e competições nacionais.

### 3.4 Filosofia Open Educational Resources (OER) & Git-as-a-CMS
- **Acessibilidade Universal**: Inspirado no movimento mundial de Recursos Educacionais Abertos (REA/OER), garantindo que todo o conteúdo seja público, versionado no GitHub e facilmente implantado em serviços cloud gratuitos (Netlify, Vercel, Cloudflare Pages).
