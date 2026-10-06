# Login com Google, Apple e Facebook

Os botões "Continuar com..." da tela de login **só aparecem para os provedores ligados no Supabase**. Enquanto nenhum estiver ligado, a tela mostra apenas o login por e-mail.

Endereço de retorno (callback) que os três provedores pedem:

```
https://wvcjjwvauibsculmqhxi.supabase.co/auth/v1/callback
```

## 1. Google
1. Acesse https://console.cloud.google.com, crie um projeto e vá em **APIs e serviços > Tela de consentimento OAuth**. Preencha o nome "BRHSIC Academy" e o e-mail de suporte.
2. Em **Credenciais > Criar credenciais > ID do cliente OAuth**, escolha *Aplicativo da Web* e cole o callback acima em *URIs de redirecionamento autorizados*.
3. Copie o **Client ID** e o **Client Secret**.
4. No Supabase, vá em **Authentication > Providers > Google**, ligue e cole os dois valores.

## 2. Facebook
1. Acesse https://developers.facebook.com, clique em **Criar app** e escolha *Autenticar e solicitar dados dos usuários com o Login do Facebook*.
2. Em **Login do Facebook > Configurações**, cole o callback em *URIs de redirecionamento do OAuth válidos*.
3. Em **Configurações do app > Básico**, copie o **ID do app** e a **Chave secreta**.
4. No Supabase, vá em **Authentication > Providers > Facebook**, ligue e cole os dois valores.
5. Para pessoas de fora da equipe conseguirem entrar, coloque o app do Facebook em modo **Ativo**.

## 3. Apple
Precisa de uma conta paga do Apple Developer (US$ 99 por ano).
1. Em https://developer.apple.com/account, crie um **App ID** com *Sign in with Apple*.
2. Crie um **Services ID**. Ele é o Client ID. Configure o domínio `wvcjjwvauibsculmqhxi.supabase.co` e o callback acima.
3. Crie uma **Key** com *Sign in with Apple* e baixe o arquivo `.p8`.
4. No Supabase, vá em **Authentication > Providers > Apple**, ligue e preencha o Services ID e o segredo gerado a partir da chave `.p8`. O próprio painel explica como gerar.

## 4. Conferir no Supabase
- **Authentication > URL Configuration**: o *Site URL* deve ser `https://atlas-c2i.pages.dev` e as *Redirect URLs* devem incluir `https://atlas-c2i.pages.dev/**`. Para testar no PC, inclua também `http://localhost:3000/**`.
- Quem entra pela primeira vez por um provedor vira **aluno**. Para dar acesso de equipe, mude o papel da pessoa na tabela `profiles` (veja `MANUAL_ADMIN_CHIEF.md`). Depois disso, ela já entra direto no painel.

## Salvar senha no navegador
O formulário de e-mail e senha já usa os campos que o Chrome, o Safari e os gerenciadores de senha reconhecem (`username`, `current-password`, `new-password` e `one-time-code` para o código por e-mail). Depois de um login bem-sucedido, o site também pede ao navegador para salvar a senha (Credential Management API, no Chrome e no Android).
