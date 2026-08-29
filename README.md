# 🇧🇷 Brasil Finanças Atlas (BFA)

> **Plataforma aberta, gratuita e de alta densidade educacional para o domínio de matemática financeira, contabilidade prática, valuation e macroeconomia.**  
> *Iniciativa nascida no Núcleo de Inteligência Financeira (NIF) — EEMTI Dragão do Mar, Fortaleza-CE.*

---

## 🌐 Links Oficiais de Acesso

| Ambiente | Provedor / Tecnologia | URL Pública de Acesso | Finalidade |
| :--- | :--- | :--- | :--- |
| **⚡ Plataforma Principal** | **Cloudflare Pages** | 🔗 **[https://atlas-c2i.pages.dev/](https://atlas-c2i.pages.dev/)** | Aplicação interativa em React com Quizzes, Simuladores, Gráficos e KaTeX |
| **📖 Documentação MkDocs** | **GitHub Pages** | 🔗 **[https://brasil-financas-atlas.github.io/bfa/](https://brasil-financas-atlas.github.io/bfa/)** | Ementa editorial, material de apoio estático e notas de estudo |
| **💻 Ambiente Local** | **Python HTTP Server** | 🔗 **[http://localhost:8080/](http://localhost:8080/)** | Pré-visualização local instantânea de desenvolvimento |

---

## 🚀 Como Executar o Projeto Localmente

Você não precisa de ferramentas pesadas de build (como npm/webpack complexos) para rodar o projeto localmente:

### Opção 1: Via Servidor Python (Recomendado)

1. Abra o Terminal ou Prompt de Comando na raiz deste repositório:
```bash
python -m http.server 8080 --directory plataforma
```
*(Ou execute `python -m http.server 8080` na raiz)*

2. Acesse no seu navegador:
👉 **`http://localhost:8080/`**

---

### Opção 2: Visualizar a Documentação MkDocs

Se desejar compilar e visualizar o material original via MkDocs:

```bash
pip install -r requirements.txt
mkdocs serve
```
Acesse: 👉 **`http://127.0.0.1:8000/`**

---

## 📂 Arquitetura do Repositório

```
brasil-financas-atlas/
├── plataforma/                  # Código-fonte da aplicação interativa React (Cloudflare Pages)
│   ├── index.html               # Ponto de entrada SPA (Tailwind + Babel Standalone + KaTeX)
│   ├── 404.html                 # Roteamento de fallback SPA
│   ├── _redirects               # Regra de roteamento da Edge Cloudflare (/* /index.html 200)
│   └── src/
│       ├── components/          # QuizEngine, LessonContent, LessonVisualizers, NavbarFooter...
│       ├── context/             # AdminContext e ProgressContext (Supabase / LocalStorage)
│       ├── data/                # contentData.js, matematicaData.js, financasData.js, schema.sql
│       ├── pages/               # Home.jsx, DisciplinaOverview.jsx, AulaPage.jsx, ExtraPages.jsx
│       ├── styles/              # typography.css, components.css, globals.css, themes.css
│       └── utils/               # helpers.js, supabaseClient.js, env.js
│
├── docs/                        # Conteúdo integral e ementas em Markdown (MkDocs)
│   ├── matematica-aplicada-a-financas/  # Módulos 1, 2, 3 e 4
│   ├── financas/                        # Módulos 1, 2 e 3
│   ├── exercicios/                      # Listas de fixação e desafios
│   └── preparacao-brhsic/               # Guia de Equity Research & Valuation
│
├── mkdocs.yml                   # Configuração editorial do MkDocs Material
├── netlify.toml                 # Configuração de redirecionamento Netlify (legado)
└── auto_sync.py                 # Script de sincronização automática com o repositório remoto
```

---

## ⚙️ Configurações de Deploy

### 1. Cloudflare Pages (Produção Principal)
- **Framework preset:** `None`
- **Build command:** *(deixar em branco)*
- **Build output directory:** `plataforma`
- **Root directory:** `plataforma`
- **Variáveis de Ambiente:**
  - `VITE_SUPABASE_URL` = URL do projeto no Supabase
  - `VITE_SUPABASE_ANON_KEY` = Chave pública anon do Supabase

### 2. GitHub Pages (Documentação MkDocs)
- Configurado via GitHub Actions em `.github/workflows/deploy.yml` para compilar `docs/` e publicar na branch `gh-pages`.

---

## 📚 Matriz Curricular do Atlas

### 🔢 1. Matemática Aplicada a Finanças
- **Módulo 1 — Álgebra do Zero (7 Aulas):** Aritmética, Frações, Regra de Três, Potenciação e Equações de 1º Grau.
- **Módulo 2 — Matemática Financeira Aplicada (5 Aulas):** Juros Simples e Compostos, Inflação, IPCA, Selic vs CDI e Rentabilidade Líquida.
- **Módulo 3 — Funções, Progressões e Probabilidade (9 Aulas):** Funções Exponenciais, Logaritmos, SAC/Price, Somatório ($\Sigma$) e Valor Esperado ($E[X]$).
- **Módulo 4 — Estatística e Regressão Linear (8 Aulas):** Médias, Desvio Padrão, Z-Score, Covariância, Correlação e Regressão Linear.

### 📈 2. Finanças & Investimentos
- **Módulo 1 — Fundamentos do Sistema Financeiro (9 Aulas):** Topologia do SFN, Tesouro Direto, CDB/LCI/LCA, Mercado de Ações, FIIs e Macroeconomia.
- **Módulo 2 — Análise Fundamentalista de Empresas (9 Aulas):** Balanço Patrimonial, Escada da DRE, Fluxo de Caixa, ROE/ROIC, Múltiplos e Valuation por FCD.
- **Módulo 3 — Montagem de Portfólio & Gestão de Risco (8 Aulas):** Classes de Ativos, Matriz de Correlação, Alocação Tática e Rebalanceamento por Bandas.

---

## 📜 Licença

Distribuído sob licença aberta com fins estritamente educacionais para benefício dos estudantes brasileiros.
