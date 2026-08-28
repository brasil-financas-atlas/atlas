# Plan: Pesquisa Desenviesada & Diretrizes de Recursos Visuais no Hero de Big Techs

- **ID / Slug**: `pesquisa-hero-visual-bigtechs`
- **Status**: `draft`
- **Created**: 2026-08-28
- **Target Component / Scope**: `plataforma/src/pages/Home.jsx`, `plataforma/src/styles/components.css`

## 1. Goal & Context
- **Goal**: Substituir o gráfico fechado com botões do Hero por um artefato visual de padrão Big Tech (Stripe, Cloudflare, Linear, Brilliant) sem bordas de caixa rígidas, integrado naturalmente ao gradiente e à iluminação do fundo.
- **Why it matters**: O Hero é o primeiro ponto de contato do visitante; um gráfico com botões e números isolados em uma caixa cinza parece um "adesivo colado" fora de contexto e prejudica a autoridade visual do BFA.
- **Non-Goals**: Não alterar a estrutura das seções inferiores dos 3 pilares ou ferramentas, focando estritamente no elemento visual da metade direita do Hero.

## 2. Architectural Approach & Options
- **Diretriz 1 (Sem caixas fechadas)**: Usar `mask-image` de dissolução e iluminação radial difusa ($120\text{px}+$ blur) em vez de cards com bordas rígidas de 1px.
- **Diretriz 2 (Compreensão Imediata)**: Auto-explicativo em 3 segundos sem forçar o visitante a clicar em botões de simulação prematuros.
- **Opções Formuladas**:
  - **Opção 1 (Stripe / Linear)**: Camadas flutuantes translúcidas (curva suave ao fundo + card de fórmula KaTeX + chip ao vivo Selic/B3).
  - **Opção 2 (Cloudflare)**: Pipeline topológico em SVG interconectando BACEN -> B3 -> Análise do Aluno com pulsos de luz.
  - **Opção 3 (Brilliant)**: Balança visual de equivalência geométrica comparando crescimento linear vs exponencial.

## 3. Atomic Implementation Tasks
- [ ] **Step 1: Seleção do Conceito pelo Usuário**
  - **Action**: Usuário escolhe entre Opção 1 (Camadas Stripe), Opção 2 (Pipeline Cloudflare) ou Opção 3 (Balança Brilliant).
- [ ] **Step 2: Construção do Componente Visual sem Moldura Rígida**
  - **Files**: `plataforma/src/pages/Home.jsx`, `plataforma/src/styles/components.css`
  - **Action**: Criar o novo componente com `radial-gradient` de iluminação ambiente e gradiente de máscara.
- [ ] **Step 3: Validação de Compilação Babel Standalone**
  - **Verification**: `node scratch/test_babel.js` (29/29 scripts passando com 0 erros).
- [ ] **Step 4: Publicação na Branch `design`**
  - **Verification**: `git push origin design` e validação em `http://localhost:8080/`.

## 4. Acceptance Criteria & Definition of Done (DoD)
- [ ] Hero visual harmoniza 100% com o fundo do Hero sem sensação de caixa recortada.
- [ ] Tipografia estritamente em `Plus Jakarta Sans` e `JetBrains Mono`.
- [ ] Zero erros de compilação JSX.
