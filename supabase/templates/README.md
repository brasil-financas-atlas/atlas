# Modelos de e-mail do login (Supabase)

E-mails que o Supabase envia aos alunos, com a marca **BRHSIC Academy**:

| Arquivo | Quando é enviado |
| :--- | :--- |
| `confirmation.html` | Cadastro novo, e primeiro acesso pelo login sem senha (traz botão **e** código de 6 dígitos) |
| `magic_link.html` | Login sem senha de quem já tem conta (código de 6 dígitos + botão) |
| `recovery.html` | Redefinir senha |
| `email_change.html` | Troca do e-mail da conta |
| `invite.html` | Convite enviado pelo painel do Supabase |
| `reauthentication.html` | Código para confirmar uma ação sensível |

**Não edite os `.html` à mão.** Textos, cores e assuntos ficam em `gerar.mjs`. Depois de mudar, rode:

```bash
node supabase/templates/gerar.mjs
```

## Como aplicar no Supabase

**Opção 1: script (aplica os 6 de uma vez)**

1. Crie um token pessoal em https://supabase.com/dashboard/account/tokens
2. Rode:
   ```bash
   SUPABASE_ACCESS_TOKEN=sbp_seu_token node supabase/templates/aplicar.mjs
   ```
   No Windows (PowerShell):
   ```powershell
   $env:SUPABASE_ACCESS_TOKEN="sbp_seu_token"; node supabase/templates/aplicar.mjs
   ```
   Use `--dry-run` para conferir antes, sem alterar nada. Nunca coloque o token no repositório.

**Opção 2: manual**

No painel do Supabase, vá em **Authentication > Email Templates**. Para cada aba, cole o assunto (que está em `gerar.mjs`) e o conteúdo do `.html` correspondente.

## Conferir depois de aplicar

- **Authentication > URL Configuration**: o *Site URL* deve ser `https://atlas-c2i.pages.dev` e a lista de *Redirect URLs* deve incluir `https://atlas-c2i.pages.dev/**`. Sem isso, os botões dos e-mails levam para o endereço errado.
- **Nome do remetente**: no SMTP padrão do Supabase, o remetente é fixo (`Supabase Auth`) e há limite baixo de envios por hora. Para aparecer "BRHSIC Academy" como remetente, configure um SMTP próprio em **Authentication > Emails > SMTP Settings** (por exemplo Resend, Brevo ou SendGrid), com *Sender name* = `BRHSIC Academy`.
