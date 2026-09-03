# Manual Oficial: Cadastro e Configuração de Administrador Chefe (`admin_chief`)

Este manual detalha o procedimento passo a passo para cadastrar um usuário no Supabase e promovê-lo a **Administrador Chefe (`admin_chief`)** na plataforma **Brasil Finanças Atlas (BFA)**.

---

## 🏛️ 1. Hierarquia de Papéis e Permissões

O banco de dados do BFA (`schema.sql`) opera com Row Level Security (RLS) e 5 papéis (`user_role`):

| Papel (`role`) | Descrição | Permissões no CMS e Plataforma |
| :--- | :--- | :--- |
| **`admin_chief`** | **Administrador Chefe / Master** | **Acesso irrestrito.** Aprova ou rejeita pendências (`pendingEdits`), publica alterações definitivas diretamente no banco (`site_content`), gerencia outros administradores e modera todo o fórum. |
| **`admin`** | Administrador Operacional | Edita in-context, cria aulas/questões/notícias. Suas edições geram pendências para revisão do `admin_chief`. Modera comentários. |
| **`teacher`** | Professor / Educador | Acesso ao modo de sugestão pedagógica e criação de exercícios (gera pendência). |
| **`collaborator`** | Colaborador / Revisor | Sugere melhorias de texto e correção de bugs conceituais (gera pendência). |
| **`student`** | Aluno (Padrão) | Estuda, responde quizzes interativos, emite certificados e comenta nas aulas. |

> 🔒 **Regra de Segurança Inviolável:** Ninguém nasce administrador e **não existe botão na interface para criar ou promover administradores**. Todo privilégio administrativo é concedido manualmente via SQL no Supabase para impedir qualquer vetor de escalada de privilégios.

---

## 🚀 2. Passo a Passo para Criar e Definir o `admin_chief`

### Passo 1: Criar o Usuário no Supabase Auth

1. Acesse o [Painel do Supabase](https://supabase.com/dashboard) e selecione o projeto do BFA.
2. No menu lateral esquerdo, clique em **Authentication** (ícone de cadeado/usuários) → **Users**.
3. Clique no botão **Add user** (ou **Create user**) no canto superior direito.
4. Preencha os campos:
   - **Email:** Digite o e-mail do administrador (ex: `admin@brasilfinancasatlas.com.br`).
   - **Password:** Defina uma senha forte.
   - **Auto Confirm User:** ✅ **Marque esta opção** (isso ativa a conta imediatamente, sem exigir envio de e-mail de confirmação).
5. Clique em **Create user**.

*(Neste instante, a trigger automática `ao_criar_usuario` no PostgreSQL criará a linha correspondente na tabela `public.profiles` com o papel padrão `student`).*

---

### Passo 2: Promover o Usuário para `admin_chief` via SQL

1. No menu lateral esquerdo do Supabase, clique em **SQL Editor** (ícone `>_`).
2. Clique em **+ New query**.
3. Cole o seguinte comando SQL, **substituindo o e-mail** pelo e-mail que você acabou de cadastrar:

```sql
UPDATE public.profiles
SET role = 'admin_chief'::user_role
WHERE email = 'seu-email@exemplo.com';
```

4. Clique no botão **Run** (ou pressione `Ctrl + Enter`).
5. A mensagem **"Success. No rows returned"** (ou 1 row affected) confirmará a alteração.

---

### Passo 3: Conferir a Promoção no Banco de Dados

Para validar que o papel foi atribuído corretamente, execute a consulta abaixo no SQL Editor:

```sql
SELECT id, email, full_name, role, created_at
FROM public.profiles
WHERE email = 'seu-email@exemplo.com';
```

O resultado deverá exibir a coluna `role` preenchida com **`admin_chief`**.

---

### Passo 4: Fazer Login e Acessar o Painel de Administração

1. Acesse a plataforma no navegador:
   - **Local:** [http://localhost:8080/#/admin/login](http://localhost:8080/#/admin/login)
   - **Produção:** [https://atlas-c2i.pages.dev/#/admin/login](https://atlas-c2i.pages.dev/#/admin/login)
2. Insira o e-mail e a senha cadastrados.
3. Clique em **Entrar como Administrador**.

---

## 🎯 3. Recursos Disponíveis para o `admin_chief`

Ao efetuar o login como `admin_chief`, você terá acesso imediato a:

1. **Modo de Edição In-Context:**
   - Botão flutuante na tela para editar qualquer título, parágrafo ou fórmula matemática diretamente na página da aula.
2. **Publicação Definitiva:**
   - Botão **🚀 Publicar Alterações** no cabeçalho, gravando instantaneamente as modificações na tabela `public.site_content` para todos os visitantes do site.
3. **Fila de Moderação e Aprovação (`/#/admin/pending`):**
   - Painel exclusivo para revisar, aprovar (`approvePendingEdit`) ou rejeitar (`rejectPendingEdit`) sugestões enviadas por outros administradores, professores e colaboradores.
4. **Gerenciador de Vídeos da Aula:**
   - Vincular ou alterar links de vídeos do YouTube diretamente na sala de aula.
5. **Moderação de Comentários do Fórum:**
   - Ocultar, destacar ou apagar mensagens de alunos.

---

## 🛠️ 4. Cheat Sheet SQL (Comandos Úteis de Gestão)

### Listar todos os administradores e chefes ativos:
```sql
SELECT email, full_name, role, created_at
FROM public.profiles
WHERE role IN ('admin', 'admin_chief')
ORDER BY created_at ASC;
```

### Promover um usuário para Administrador Operacional (`admin`):
```sql
UPDATE public.profiles
SET role = 'admin'::user_role
WHERE email = 'editor@exemplo.com';
```

### Promover um usuário para Professor (`teacher`):
```sql
UPDATE public.profiles
SET role = 'teacher'::user_role
WHERE email = 'professor@escola.edu.br';
```

### Rebaixar ou revogar acesso de um usuário de volta para Aluno (`student`):
```sql
UPDATE public.profiles
SET role = 'student'::user_role
WHERE email = 'antigo-admin@exemplo.com';
```
