# Diagnóstico do Supabase — 2026-11-21

Projeto: `wvcjjwvauibsculmqhxi`. Leitura feita pela Management API
(`GET /config/auth` e `POST /database/query` em modo somente leitura).
Nenhuma configuração de autenticação nem dado do banco foi alterado.
Contagens apenas; nenhum e-mail de usuário é listado aqui.

## Resumo

Há dois defeitos que, juntos, explicam "o cadastro não funciona" e
"o e-mail não chega":

1. **O SMTP está configurado com valores inválidos.** O campo `smtp_host`
   contém uma URL do site (`https://atlas-c2i.pages.dev/#/confirmacao`), e não
   o endereço de um servidor SMTP. Como há SMTP próprio "ligado", o Supabase
   não usa o servidor padrão e tenta conectar nesse host inexistente: todo
   envio (confirmação, código de acesso, recuperação de senha) falha com
   "Error sending ... email".
2. **O trigger que cria o perfil no cadastro quebra todo cadastro novo.**
   `on_auth_user_created` chama `criar_perfil_aluno()`, que insere em
   `public.student_profiles`. Essa tabela não existe no banco. Qualquer
   cadastro novo (senha, código por e-mail ou Google) é desfeito com
   "Database error saving new user". O último cadastro registrado é de
   2026-09-09; não houve nenhum nos últimos 30 dias.

Há ainda uma falha de segurança: qualquer usuário autenticado pode trocar o
próprio `role` (até `admin_chief`) pelo cliente, porque a política de UPDATE
de `profiles` não restringe a coluna e o próprio site faz `upsert` com `role`.

## Autenticação (`/config/auth`)

| Item | Valor encontrado | Observação |
|---|---|---|
| SMTP próprio | ligado, mas inválido | `smtp_host` = URL do site; porta 465; usuário e remetente de teste (nome de pessoa, não "BRHSIC Academy") |
| `smtp_max_frequency` | 60 s | intervalo mínimo entre e-mails ao mesmo endereço |
| `site_url` | `https://atlas-c2i.pages.dev` | confirmar se é o domínio de produção |
| `uri_allow_list` | `https://atlas-c2i.pages.dev/**`, `http://localhost:5173/**`, `http://localhost:3000/**` | falta o domínio de produção se for outro, e o de prévia do branch `preview` |
| `mailer_autoconfirm` | `false` | confirmação de e-mail exigida |
| `rate_limit_email_sent` | 30 por hora | só vale com SMTP próprio funcionando; o padrão do Supabase é bem menor |
| `rate_limit_otp` / `rate_limit_verify` | 30 / 30 | |
| `mailer_otp_length` / `mailer_otp_exp` | 8 dígitos / 3600 s | o campo do site aceita 8 dígitos (`maxLength={8}`); ok |
| `password_min_length` | 6 | coerente com a mensagem do site |
| `disable_signup` | `false` | cadastro aberto |
| Provedores externos | Google, Apple e Facebook **desligados**; só e-mail | o site não exibe botão de Google hoje |
| Modelos de e-mail | **já aplicados** | os 6 modelos de `supabase/templates/*.html` são idênticos ao que está no projeto, com os assuntos em português |

Os avisos de "senha alterada", "e-mail alterado" etc. (notificações) ainda
têm assunto em inglês; são opcionais e estão desligados por padrão.

## Banco

- Tabelas em `public`: `certificates`, `comments`, `lesson_progress`,
  `pending_edits`, `profiles`, `publish_history`, `quiz_attempts`,
  `site_content`. Todas com RLS ligado. **Não existe `student_profiles`**,
  embora o site (`useStudentAuth.js`, `LoginPage.jsx`) tente usá-la e caia no
  plano B (`profiles`).
- `profiles`: `id`, `email`, `full_name`, `role` (enum `student`, `teacher`,
  `collaborator`, `admin_chief`, `admin`; padrão `student`), `school_class`,
  `avatar_url`, `created_at`, `updated_at`.
- Usuários: 7 em `auth.users`, 7 com perfil, 0 sem perfil, 0 sem e-mail
  confirmado. Todos com provedor `email`. Papéis: 7 `admin_chief` (nenhum
  aluno cadastrado ainda; consistente com o cadastro quebrado).
- Contagens: `site_content` 1 linha, `pending_edits` 3 (todas aprovadas),
  `lesson_progress` 1, `quiz_attempts` 0.

### Políticas RLS relevantes

- `profiles`: cada um lê e edita o próprio perfil; admin lê todos.
  **Problema:** o UPDATE não protege `role` (privilégio `UPDATE` na coluna
  `role` concedido a `authenticated`).
- `site_content`: leitura pública (há **duas** políticas SELECT idênticas);
  INSERT/UPDATE só para `eh_admin()`. Ok.
- `pending_edits`: autor cria e lê as próprias; admin lê todas; só admin
  aprova (UPDATE). Não há DELETE (autor não consegue retirar a sugestão; ok
  por enquanto).
- `lesson_progress`, `quiz_attempts`, `certificates`: aluno lê e grava só o
  que é dele; admin lê tudo. Ok.
- `publish_history`: leitura limitada a três e-mails fixos na política.
  Funciona, mas é frágil; melhor usar o papel.
- `eh_admin()` considera `admin` e `admin_chief`.

## Recomendações

1. **Aplicar a migration** `supabase/migrations/20261121120000_corrigir_cadastro_e_proteger_papel.sql`
   (revisar antes). Ela:
   - remove de `criar_perfil_aluno()` o insert em `student_profiles` e lê o
     nome de `full_name` ou `name` (Google manda `full_name`);
   - cria perfil para usuários que estejam sem (hoje nenhum);
   - adiciona o trigger `proteger_papel_perfil`, que mantém o papel antigo
     quando quem altera não é `admin_chief` (sem gerar erro);
   - troca os e-mails fixos de `publish_history` por `eh_admin_chefe()`;
   - remove a política SELECT duplicada de `site_content`.
2. **Corrigir o SMTP** (passo a passo abaixo). Até lá, uma saída temporária
   é desligar o SMTP próprio no painel: o servidor padrão do Supabase volta
   a funcionar, mas só entrega para membros da equipe do projeto e com
   limite baixo por hora (serve para testes, não para alunos).
3. Incluir em `uri_allow_list` o domínio de produção real e o de prévia
   (ex.: `https://preview.atlas-c2i.pages.dev/**`), e conferir `site_url`.
4. O site hoje não mostra botão "Entrar com Google". Se ele for adicionado,
   antes é preciso ligar o provedor Google (Client ID e Secret do Google
   Cloud) e incluir o domínio em `uri_allow_list`.
5. Mais tarde: decidir se `student_profiles` deve existir. Se não, remover
   as tentativas no código (`useStudentAuth.js`, `LoginPage.jsx`), que hoje
   só geram erros 404 no console.

## SMTP passo a passo

Exige uma conta no provedor e um domínio próprio verificado (o remetente
precisa ser desse domínio, por exemplo `nao-responda@seudominio.com.br`).

### Opção A: Resend

1. Crie a conta em resend.com, vá em Domains, adicione o domínio e crie os
   registros DNS (SPF, DKIM) que ele mostrar. Espere ficar "Verified".
2. Em API Keys, crie uma chave com permissão "Sending access".
3. No Supabase: Authentication > Emails > SMTP Settings, ligue
   "Enable Custom SMTP" e preencha:
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: a API key criada
   - Sender email: `nao-responda@seudominio.com.br`
   - Sender name: `BRHSIC Academy`

### Opção B: Brevo

1. Crie a conta em brevo.com, em Senders & Domains adicione e autentique o
   domínio (registros DNS).
2. Em SMTP & API > SMTP, gere uma "SMTP key".
3. No Supabase, mesmos campos:
   - Host: `smtp-relay.brevo.com`
   - Port: `465`
   - Username: o login SMTP mostrado na página da Brevo
   - Password: a SMTP key
   - Sender email: endereço do domínio autenticado
   - Sender name: `BRHSIC Academy`

Depois de salvar, em Authentication > Rate Limits ajuste "emails sent per
hour" (30 hoje) conforme o plano do provedor. Teste com "Acesso sem senha"
num e-mail que não seja da equipe.

## Efeito no site (branch `preview`)

- O site agora traduz "Database error saving new user" para uma mensagem
  clara, e as chamadas de login têm tempo limite (8 s; 15 s nas que enviam
  e-mail), com a mensagem "Sem conexão com o servidor".
- Isso não resolve os dois defeitos acima: eles só somem com a migration e
  com o SMTP corrigido.

## Mudanças ao vivo

Os modelos de e-mail já estavam aplicados, então
`node supabase/templates/aplicar.mjs` não foi necessário.

Registro de 2026-11-21:

- A migration `20261121120000_corrigir_cadastro_e_proteger_papel.sql` foi
  aplicada pela equipe no SQL Editor. Conferido: a função
  `criar_perfil_aluno()` não usa mais `student_profiles` e o trigger
  `proteger_papel_perfil` existe. Um cadastro novo gerou perfil `student`.
- SMTP sem domínio próprio: Gmail dedicado da plataforma com senha de app
  (remetente "BRHSIC Academy"), configurado pela equipe no painel.
- O campo `smtp_host` continuava com a URL do site; corrigido pela
  Management API, com autorização do usuário no chat, para
  `smtp.gmail.com` (porta 465). `rate_limit_email_sent` reduzido de 30
  para 20 por hora, para ficar abaixo do limite diário do Gmail.
- Teste: `POST /auth/v1/otp` para o próprio Gmail da plataforma voltou
  HTTP 200 (servidor de e-mail aceitou o envio).
- Modelos de e-mail redesenhados (`supabase/templates/gerar.mjs`) e
  aplicados com `aplicar.mjs`. Observação: o serviço de autenticação do
  Supabase pode levar vários minutos para passar a usar modelos e assuntos
  novos; uma alteração pequena posterior forçou a recarga.
- Testes com e-mails temporários (mail.tm): cadastro com senha pela tela
  (e-mail em cerca de 1 s, link confirma a conta e cria perfil `student`),
  "Acesso sem senha" para conta nova e para conta existente, com o código
  digitado na tela (aceito também com espaço) e verificado com sucesso.
  As contas de teste usam o domínio `euploading.com`.
- Spam: o envio está autenticado (DKIM de gmail.com, servidor do Google). Os
  modelos foram enxugados contra filtros: sem imagem externa, sem texto
  escondido de enchimento, sem trechos de marketing e com menos links.
  Aplicados ao vivo. Próximo passo, depois de publicar o `preview` no
  `main`: `node supabase/templates/aplicar.mjs --link-proprio`, que troca o
  link `supabase.co/auth/v1/verify` por um link do próprio site.

