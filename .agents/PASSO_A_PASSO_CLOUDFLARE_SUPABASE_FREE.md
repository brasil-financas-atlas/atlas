# 🚀 Guia Passo a Passo: Cloudflare Pages + Supabase (Infraestrutura 100% Gratuita R$ 0,00/mês)
**Plataforma Brasil Finanças Atlas (BFA)** — *EEMTI Dragão do Mar / NIF*

---

## 1. Visão Geral da Arquitetura Gratuita na Edge (Cloudflare + Supabase + GitHub)

```
+---------------------------------------------------------------------------------------+
|                                ARQUITETURA CLOUDFLARE & SUPABASE                      |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|   [ Repositório GitHub ] <--- (git push / auto_sync.py) --- [ Seu Computador / Local ]|
|            |                                                                          |
|            +---> [ Cloudflare Pages ] (Hospedagem SPA na Edge de Fortaleza-CE)        |
|            |        - Banda Ilimitada Grátis                                          |
|            |        - SSL HTTPS Automático                                            |
|            |        - URL Pública: https://atlas-bfa.pages.dev                        |
|            |                                                                          |
|            +---> [ Supabase BaaS ] (Banco de Dados PostgreSQL Relacional)             |
|                     - 50.000 Usuários Ativos/Mês Grátis                               |
|                     - Autenticação de Estudantes                                      |
|                     - Tabela de Progresso, Quizzes e Certificados                      |
|                     - Regras de Segurança Row Level Security (RLS)                    |
|                                                                                       |
+---------------------------------------------------------------------------------------+
```

---

## 2. ETAPA 1: Configurar o Banco de Dados Gratuito no Supabase

1. **Criar Conta e Projeto**:
   - Acesse [https://supabase.com/](https://supabase.com/) e faça login com sua conta GitHub.
   - Clique em **New Project**.
   - **Name**: `brasil-financas-atlas`
   - **Database Password**: Escolha uma senha forte (guarde em local seguro).
   - **Region**: Selecione **South America (São Paulo)** (`sa-east-1`).
   - **Pricing Plan**: Selecione **Free Tier ($0/mo)**.
   - Clique em **Create new project** e aguarde ~2 minutos enquanto o PostgreSQL é provisionado.

2. **Executar o Script SQL do Banco (1-Clique)**:
   - No menu lateral esquerdo do Supabase, clique em **SQL Editor**.
   - Abra o arquivo [plataforma/src/data/schema.sql](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/schema.sql) no seu projeto local, copie todo o texto.
   - Cole o código na janela do SQL Editor no Supabase e clique em **Run**.
   - As 6 tabelas (`profiles`, `lesson_progress`, `quiz_attempts`, `comments`, `certificates`, `cms_overrides`), os índices e as políticas de segurança RLS serão ativados automaticamente.

3. **Obter as Chaves da API**:
   - No menu lateral esquerdo, vá em **Project Settings** ➔ **API**.
   - Copie os dois valores exibidos:
     1. **Project URL**: (ex: `https://xyzabcdefg.supabase.co`)
     2. **API Key (anon public)**: (ex: `eyJhbGciOiJIUzI1Ni...`)

---

## 3. ETAPA 2: Configurar a Hospedagem Gratuita Ilimitada no Cloudflare Pages

1. **Criar Conta no Cloudflare**:
   - Acesse [https://dash.cloudflare.com/](https://dash.cloudflare.com/) e crie sua conta gratuita.

2. **Conectar o Repositório GitHub no Cloudflare Pages**:
   - No menu lateral esquerdo, clique em **Workers & Pages**.
   - Clique na guia **Pages** -> clique no botão **Create application** -> **Connect to Git**.
   - Autorize o Cloudflare a acessar sua conta GitHub e selecione o repositório `brasil-financas-atlas/atlas`.

3. **Definir as Configurações de Build**:
   - **Project name**: `brasil-financas-atlas` (ou o nome que preferir).
   - **Production branch**: `main`
   - **Framework preset**: Selecione **None**.
   - **Build command**: *(Deixe em branco)*.
   - **Build output directory**: `plataforma`
   - **Root directory**: `plataforma`

4. **Adicionar as Variáveis de Ambiente do Supabase**:
   - Expanda a seção **Environment variables (advanced)**.
   - Adicione as duas variáveis copiadas do Supabase no Passo 2:
     - `VITE_SUPABASE_URL` = `https://xyzabcdefg.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1Ni...`

5. **Finalizar Deploy**:
   - Clique em **Save and Deploy**. Em menos de 60 segundos a Cloudflare construirá e distribuirá sua plataforma na Edge global.
   - Sua URL pública gratuita estará ativa (ex: `https://brasil-financas-atlas.pages.dev`).

---

## 4. ETAPA 3: Ativar o Roteamento de Página Única (SPA) no Cloudflare

Como a plataforma React é uma Single Page Application (SPA), precisamos garantir que qualquer recarga de página (F5) em subrotas como `/matematica` ou `/financas` continue funcionando perfeitamente:

1. No diretório `plataforma/`, crie um arquivo simples chamado `_routes.json` ou `_redirects` com o seguinte conteúdo:
   ```text
   /*  /index.html  200
   ```
2. O arquivo [netlify.toml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/netlify.toml) e as regras do Cloudflare assumirão automaticamente o roteamento sem erros 404.

---

## 5. ETAPA 4: Ativar a Sincronização Automática Local (`auto_sync.py`)

1. Abra o arquivo [.env](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.env) na raiz do projeto e certifique-se de que seu token GitHub PAT com escopo `workflow` está presente:
   ```env
   GITHUB_PAT=ghp_SeuTokenGeradoNoGitHub
   ```
2. Para iniciar o monitoramento em segundo plano enquanto você desenvolve:
   ```powershell
   pythonw auto_sync.py
   ```
3. Sempre que você alterar um arquivo localmente ou via painel admin, o `auto_sync.py` fará `git push` e a Cloudflare publicará as atualizações na web em ~30 segundos.

---

## 6. Resumo da Fatura de Custos Mensal

| Serviço | Plano Escolhido | Capacidade Incluída | Custo Mensal |
| :--- | :--- | :--- | :---: |
| **Cloudflare Pages** | Free Tier | Banda ILIMITADA / Deploys ilimitados | **R$ 0,00** |
| **Supabase Database** | Free Tier | 500 MB DB / 50.000 Alunos Ativos/mês | **R$ 0,00** |
| **GitHub Actions / Repositório** | Free Tier | Repositório privado + 2.000 min/mês CI | **R$ 0,00** |
| **Certificado SSL HTTPS** | Cloudflare SSL | Criptografia automatizada | **R$ 0,00** |
| **CUSTO TOTAL DA PLATAFORMA** | — | — | **R$ 0,00/mês** |
