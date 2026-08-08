# 📖 GUIA MESTRE DEFINITIVO DE CONFIGURAÇÃO E IMPLANTAÇÃO COMPLETA
**Plataforma Brasil Finanças Atlas (BFA)** — *Custo Total: R$ 0,00/mês*

---

Este é o **passo a passo único e ultra-detalhado** contendo todas as ações que você precisa realizar para que a plataforma **Brasil Finanças Atlas (BFA)** funcione 100% no ar, com banco de dados, sincronização automática no GitHub, edição in-context para professores e hospedagem global ilimitada no Cloudflare Pages.

---

## 📑 ÍNDICE DAS ETAPAS

1. [Etapa 1: Repositório & Token de Permissão no GitHub (PAT)](#etapa-1-repositório--token-de-permissão-no-github-pat)
2. [Etapa 2: Banco de Dados PostgreSQL & Auth no Supabase (Free Tier)](#etapa-2-banco-de-dados-postgresql--auth-no-supabase-free-tier)
3. [Etapa 3: Hospedagem Ilimitada na Edge com Cloudflare Pages](#etapa-3-hospedagem-ilimitada-na-edge-com-cloudflare-pages)
4. [Etapa 4: Ativação do Auto-Sync Local no Computador (`auto_sync.py`)](#etapa-4-ativação-do-auto-sync-local-no-computador-auto_syncpy)
5. [Etapa 5: Teste da Área do Professor & Edição In-Context (Admin CMS)](#etapa-5-teste-da-área-do-professor--edição-in-context-admin-cms)
6. [Etapa 6: Checklist Final de Funcionamento](#etapa-6-checklist-final-de-funcionamento)

---

## ETAPA 1: Repositório & Token de Permissão no GitHub (PAT)

Como o projeto possui fluxos automatizados do GitHub Actions na pasta `.github/workflows/`, o seu token de acesso no GitHub **DEVE obrigatoriamente** ter a permissão de `workflow`.

### 1.1 Gerar o Personal Access Token (PAT)
1. Acesse o GitHub e entre com sua conta: [https://github.com/](https://github.com/)
2. No canto superior direito, clique na sua foto de perfil ➔ **Settings** (Configurações).
3. No menu lateral esquerdo (role até o final), clique em **Developer Settings**.
4. Clique em **Personal Access Tokens** ➔ selecione **Tokens (classic)**.
   - *Link direto*: [https://github.com/settings/tokens](https://github.com/settings/tokens)
5. Clique no botão **Generate new token** ➔ selecione **Generate new token (classic)**.
6. Preencha os campos:
   - **Note**: Digite `BFA Token - Producao`
   - **Expiration**: Escolha `No expiration` (ou 90 dias).
7. **Marque obrigatoriamente estas duas caixas de seleção**:
   - [x] **`repo`** (Full control of private repositories).
   - [x] **`workflow`** (Update GitHub Action workflows).
8. Role a página até o final e clique no botão verde **Generate token**.
9. **Copie imediatamente a chave gerada** (formato: `ghp_xxxxxxxxxxxxxxxxxxxx`). *Atenção: Ela não será mostrada novamente!*

### 1.2 Configurar o Arquivo `.env` Local
1. No seu computador, abra a pasta raiz do projeto (`D:\Users\LuisFerro\Downloads\atlas-main\atlas-main`).
2. Abra ou crie o arquivo chamado [`.env`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.env).
3. Cole a linha abaixo substituindo pelo seu token copiado:
   ```env
   GITHUB_PAT=ghp_ColeSeuTokenAqui
   ```
4. Salve o arquivo. *(O `.env` já está no `.gitignore` e não será enviado publicamente)*.

---

## ETAPA 2: Banco de Dados PostgreSQL & Auth no Supabase (Free Tier)

O Supabase proverá o banco de dados PostgreSQL relacional gratuito com capacidade para até 50.000 alunos ativos por mês.

### 2.1 Criar a Conta e o Projeto
1. Acesse [https://supabase.com/](https://supabase.com/) e clique em **Start your project** (faça login com o GitHub).
2. Clique no botão **New Project**.
3. Preencha as configurações:
   - **Name**: `brasil-financas-atlas`
   - **Database Password**: Digite uma senha forte e guarde-a.
   - **Region**: Escolha **South America (São Paulo)** (`sa-east-1`).
   - **Pricing Plan**: Selecione **Free Tier ($0/mo)**.
4. Clique em **Create new project** e aguarde ~2 minutos enquanto o banco é criado.

### 2.2 Executar o Script SQL de Criação das Tabelas
1. No painel do Supabase, clique no menu lateral esquerdo no ícone **SQL Editor** (ou pressione `s`).
2. Abra no seu computador o arquivo [plataforma/src/data/schema.sql](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/schema.sql) e copie **todo o conteúdo**.
3. Cole o código SQL dentro da janela do SQL Editor no Supabase.
4. Clique no botão **Run** (ou pressione `Ctrl + Enter`).
5. Aparecerá a mensagem `Success. No rows returned`. Todas as tabelas (`profiles`, `lesson_progress`, `quiz_attempts`, `comments`, `certificates`, `cms_overrides`), os índices e as políticas de segurança RLS já estão ativas!

### 2.3 Obter as Chaves de Conexão da API
1. No menu lateral esquerdo do Supabase, vá em **Project Settings** (ícone de engrenagem) ➔ **API**.
2. Copie e guarde em um bloco de notas os dois valores:
   - **Project URL**: Exemplo `https://abcdefghijklm.supabase.co`
   - **Project API keys (anon public)**: Exemplo `eyJhbGciOiJIUzI1NiIsInR5cCI6...`

---

## ETAPA 3: Hospedagem Ilimitada na Edge com Cloudflare Pages

O Cloudflare Pages hospedará o frontend com largura de banda ilimitada e certificado SSL gratuito.

### 3.1 Criar a Conta e Conectar ao GitHub
1. Acesse [https://dash.cloudflare.com/](https://dash.cloudflare.com/) e crie sua conta gratuita.
2. No menu lateral esquerdo, vá em **Workers & Pages**.
3. Clique na guia **Pages** ➔ clique no botão **Create application** ➔ selecione **Connect to Git**.
4. Clique em **Connect GitHub** e selecione o repositório `brasil-financas-atlas/atlas`.

### 3.2 Configurar os Parâmetros de Build
1. **Project name**: `brasil-financas-atlas`
2. **Production branch**: `main`
3. **Framework preset**: Selecione **None**
4. **Build command**: *(Deixe totalmente em branco)*
5. **Build output directory**: `plataforma`
6. **Root directory**: `plataforma`

### 3.3 Adicionar as Variáveis de Ambiente do Supabase
1. Na mesma tela, clique para expandir a opção **Environment variables (advanced)**.
2. Adicione duas variáveis utilizando as chaves copiadas na Etapa 2.3:
   - **Variable name**: `VITE_SUPABASE_URL` | **Value**: `https://abcdefghijklm.supabase.co`
   - **Variable name**: `VITE_SUPABASE_ANON_KEY` | **Value**: `eyJhbGciOiJIUzI...`
3. Clique no botão **Save and Deploy**.
4. Em menos de 60 segundos o Cloudflare compilará o projeto e exibirá a sua **URL Pública Gratuita** (exemplo: `https://brasil-financas-atlas.pages.dev`).

---

## ETAPA 4: Ativação do Auto-Sync Local no Computador (`auto_sync.py`)

Para que qualquer alteração que você fizer no seu computador seja enviada automaticamente para o GitHub e atualizada no Cloudflare sem que você precise usar comandos do Git:

### 4.1 Testar a Conexão do Auto-Sync
1. No seu computador, abra o PowerShell na raiz do projeto (`D:\Users\LuisFerro\Downloads\atlas-main\atlas-main`).
2. Execute o comando de teste:
   ```powershell
   python -c "import auto_sync; syncer = auto_sync.GitAutoSync(auto_sync.REPO_DIR, auto_sync.BRANCH, pat=auto_sync.GITHUB_PAT); syncer.sync()"
   ```
3. O terminal deverá retornar: `[AUTO-SYNC] SUCESSO! Alteracoes sincronizadas no GitHub.`

### 4.2 Iniciar o Monitoramento em Segundo Plano
1. Para manter o script monitorando sua pasta silenciosamente em segundo plano:
   ```powershell
   pythonw auto_sync.py
   ```
2. Pronto! Sempre que você salvar um arquivo localmente, ele aguardará 3 segundos e enviará o commit para o GitHub. A Cloudflare atualizará o site público em ~30 segundos.

---

## ETAPA 5: Teste da Área do Professor & Edição In-Context (Admin CMS)

1. Abra no navegador a sua URL do Cloudflare Pages (ou `http://localhost:8080` localmente).
2. Vá no final da URL e digite `/#/admin/login` (ou clique no botão **🔒 Admin** no topo do site).
3. Faça login com as credenciais padrão de professores:
   - **Usuário**: `admin`
   - **Senha**: `bfa@2024`
4. Após o login, você verá a barra de ferramentas do Admin ativa no topo do site.
5. Navegue por qualquer aula: você poderá editar textos de aulas, alterar vídeos do YouTube e cadastrar novas perguntas de quizzes diretamente na página!
6. Para salvar e enviar suas edições para todos os alunos na web, clique no botão **🚀 Publicar no GitHub** no topo da tela.

---

## ETAPA 6: Checklist Final de Funcionamento

Verifique se todas as etapas estão com **[X] OK**:

| # | Etapa / Item | Status |
| :- | :--- | :---: |
| **01** | Token GitHub PAT gerado com permissões **`repo`** e **`workflow`**. | [ ] |
| **02** | Arquivo [`.env`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.env) criado com a linha `GITHUB_PAT=ghp_...`. | [ ] |
| **03** | Banco de dados Supabase criado em São Paulo e script [`schema.sql`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/schema.sql) executado. | [ ] |
| **04** | Cloudflare Pages conectado ao GitHub com Root/Output `plataforma` e variáveis do Supabase ativas. | [ ] |
| **05** | Teste de conexão `python auto_sync.py` executado com mensagem de SUCESSO. | [ ] |
| **06** | Site público acessível na URL `.pages.dev` com certificado SSL HTTPS ativo. | [ ] |
| **07** | Login de Admin (`admin` / `bfa@2024`) funcionando com publicação direta via navegador. | [ ] |
| **08** | **Fatura Total de Custos**: Confirmada em **R$ 0,00/mês**. | [ ] |

---

*Guia Mestre gerado para acompanhamento da equipe da Plataforma Brasil Finanças Atlas (BFA).*
