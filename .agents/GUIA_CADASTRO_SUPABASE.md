# 🗄️ Guia de Cadastramento e Configuração do Supabase — Brasil Finanças Atlas (BFA)

Este guia detalha o passo a passo completo para cadastrar a plataforma **Brasil Finanças Atlas (BFA)** no **Supabase** (PostgreSQL BaaS Gratuito — R$ 0/mês), conectar o banco de dados e habilitar o sistema de logins para colaboradores e Admin Chief.

---

## 1. Criar a Conta e o Projeto no Supabase

1. Acesse **[supabase.com](https://supabase.com)** e clique em **"Start your project"**.
2. Faça login usando sua conta do **GitHub**.
3. No painel inicial do Supabase, clique em **"+ New Project"**.
4. Preencha os dados do projeto:
   - **Name**: `brasil-financas-atlas` (ou o nome de sua preferência)
   - **Database Password**: Escolha uma senha forte para o banco PostgreSQL e guarde-a com segurança.
   - **Region**: Selecione `South America (São Paulo)` para menor latência no Brasil.
   - **Pricing Plan**: Escolha **Free Tier** (R$ 0/mês — 50.000 usuários ativos e 500 MB de banco de dados).
5. Clique em **"Create new project"** e aguarde cerca de 1 a 2 minutos enquanto o banco PostgreSQL é provisionado.

---

## 2. Obter a URL e a Chave Pública (Anon Key)

1. No menu lateral do projeto no Supabase, navegue até **Project Settings** (ícone de engrenagem) ➔ **API**.
2. Na seção **Project API keys**, copie duas informações essenciais:
   - **Project URL**: `https://<seu-projeto-id>.supabase.co`
   - **`anon` `public` key**: `eyJhbGciOiJIUzI1Ni...` (chave pública para o cliente frontend)

---

## 3. Executar o Script SQL do Banco de Dados

1. No menu lateral do Supabase, clique no ícone **SQL Editor** (ou acesse a aba SQL Editor).
2. Clique em **"+ New query"**.
3. Abra o arquivo [`plataforma/src/data/schema.sql`](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/schema.sql) deste repositório, copie todo o seu conteúdo e cole na caixa de texto do SQL Editor.
4. Clique em **"Run"** (ou pressione `Ctrl + Enter`).
5. O script criará automaticamente:
   - Os tipos de função de usuário (`admin_chief`, `collaborator`, `teacher`, `student`).
   - A tabela `profiles` (perfis de usuários integrados ao Supabase Auth).
   - A tabela `lesson_progress` (progresso por aula e módulo).
   - A tabela `quiz_attempts` (histórico de tentativas nos quizzes).
   - A tabela `comments` (fórum de dúvidas com timestamps).
   - A tabela `certificates` (certificados emitidos com hash de verificação).
   - A tabela `pending_edits` (fila de aprovação para edições de colaboradores).
   - Todas as políticas de **Row Level Security (RLS)** e índices de alta performance.

---

## 4. Configurar as Variáveis de Ambiente no Projeto

### A. No Ambiente Local (`.env`):
Abra o arquivo `.env` na raiz do projeto (ou crie um se não existir) e adicione:
```env
VITE_SUPABASE_URL=https://<seu-projeto-id>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1Ni...
```

### B. No Cloudflare Pages (Deploy de Produção):
1. Acesse o painel do **[Cloudflare Dashboard](https://dash.cloudflare.com/)** ➔ **Workers & Pages**.
2. Selecione o projeto `atlas`.
3. Vá em **Settings** ➔ **Environment variables**.
4. Adicione as duas variáveis:
   - `VITE_SUPABASE_URL` = `https://<seu-projeto-id>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1Ni...`
5. Clique em **Save and Deploy**.

---

## 5. Cadastrar Usuários e Atribuir Papéis (Admin Chief e Colaboradores)

Para cadastrar um colaborador ou Admin Chief com login via e-mail e senha no Supabase:

1. No menu do Supabase, vá em **Authentication** ➔ **Users** ➔ **"Add user"** ➔ **"Create user"**.
2. Digite o e-mail e a senha do membro do projeto (ex: `admin@bfa.org` ou `lucas@bfa.org`).
3. Após criar o usuário, abra a aba **Table Editor** ➔ tabela `profiles`.
4. Encontre o registro do usuário criado e defina a coluna `role`:
   - Para o Administrador Principal: selecione `admin_chief`.
   - Para Editores/Alunos do Dragão do Mar: selecione `collaborator`.
   - Para Professores: selecione `teacher`.
5. Salve a alteração no Table Editor.

---

## 6. Testar o Login e o Fluxo de Aprovação no Site

1. Acesse a plataforma no navegador e vá em **`/#/admin/login`**.
2. Insira as credenciais do colaborador cadastrado.
3. Quando o colaborador editar qualquer aula ou quiz, a alteração será salva como **Edição Pendente**.
4. Quando o **Admin Chief** fizer login, a aba **👑 Edições Pendentes de Aprovação** estará visível no Painel Admin com os botões **Aprovar Edição** e **Rejeitar**.
5. Ao aprovar, o conteúdo é incorporado ao site principal e pode ser sincronizado com o GitHub via botão **🚀 Publicar**.
