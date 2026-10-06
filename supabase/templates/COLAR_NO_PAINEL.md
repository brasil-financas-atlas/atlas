# Colar manualmente no painel do Supabase

Painel: **Authentication > Emails > Templates** (ou *Email Templates*).
Para cada aba abaixo: cole o **assunto** no campo *Subject* e o conteúdo do arquivo `.html` no campo *Message body* (aba *Source*, não a *Preview*).

| Aba no Supabase | Assunto (Subject) | Arquivo |
| :--- | :--- | :--- |
| Confirm sign up | `Confirme seu e-mail na BRHSIC Academy` | `confirmation.html` |
| Magic Link | `Seu código de acesso: {{ .Token }}` | `magic_link.html` |
| Reset Password | `Redefinir sua senha da BRHSIC Academy` | `recovery.html` |
| Change Email Address | `Confirme a troca de e-mail na BRHSIC Academy` | `email_change.html` |
| Invite user | `Você foi convidado para a BRHSIC Academy` | `invite.html` |
| Reauthentication | `Código de confirmação: {{ .Token }}` | `reauthentication.html` |

Não troque os trechos entre chaves (`{{ .Token }}`, `{{ .ConfirmationURL }}`, `{{ .Email }}`, `{{ .NewEmail }}`): o Supabase os substitui ao enviar.

Depois, em **Authentication > URL Configuration**:
- *Site URL*: `https://atlas-c2i.pages.dev`
- *Redirect URLs*: adicionar `https://atlas-c2i.pages.dev/**`

Teste: crie uma conta de teste e peça "Acesso sem senha" na tela de login.
