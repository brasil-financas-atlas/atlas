# Brasil Finanças Atlas (BFA)

Trilha aberta de educação financeira e matemática aplicada para estudantes do ensino médio — do zero absoluto até análise de investimentos e valuation.

**🌐 Site oficial:** https://atlas-c2i.pages.dev — Cloudflare Pages, publica automaticamente a cada push na `main`.

**📖 Versão MkDocs:** https://brasil-financas-atlas.github.io/bfa/ — mesma trilha em formato de documentação, gerada de [brasil-financas-atlas/bfa](https://github.com/brasil-financas-atlas/bfa), que é onde o conteúdo em Markdown é escrito.

> ⚠️ O endereço `brasil-financas-atlas.netlify.app` **está desatualizado.** Ele foi um envio manual de pasta, não está ligado a este repositório e por isso não recebe as correções — inclusive não tem o conserto da matemática. Não divulgue esse link; ver o passo 7 abaixo.

---

## ✅ Próximos passos

> Se você está voltando ao projeto depois de alguns dias, leia primeiro
> **[MUDANCAS.md](MUDANCAS.md)** — o que mudou em agosto, por quê, e o que
> depende de você.

Roteiro do que falta, na ordem. **A ordem importa** — há um passo que depende dos anteriores e, se for antecipado, derruba o acesso de administrador.

### ~~1. Consertar a renderização de matemática~~ ✅ feito

Mergeado no PR #3 e confirmado no ar. Eram três bugs somados que quebravam a
matemática em 43 das 55 unidades sem gerar um único erro no console: o marcador
de proteção das fórmulas era comido pelo Markdown (511 `MATH_TOK_0` apareciam
como texto para o aluno), as fórmulas em destaque eram rebaixadas para
fórmulas em linha (84 no conteúdo, zero renderizadas), e o `$` como
delimitador colidia com o `R$` de dinheiro, transformando prosa em fórmula.

### 2. Criar as tabelas no Supabase

1. Abra o painel do Supabase → barra lateral → **SQL Editor** (ícone `>_`).
2. Copie **todo** o conteúdo de [`plataforma/src/data/schema.sql`](plataforma/src/data/schema.sql) — o botão "Copy raw file" fica no canto superior direito da caixa de código no GitHub.
3. Cole e clique em **Run** (ou `Ctrl+Enter`).

**Cuidados:**

- **Não deixe texto selecionado.** Com uma seleção ativa, o Supabase executa apenas a seleção e o schema entra pela metade. Em dúvida, `Ctrl+A` antes.
- Vai aparecer aviso de operação destrutiva — é esperado, o arquivo remove as políticas antigas para pôr as corrigidas no lugar. Confirme.
- Terminar com "Success. No rows returned" **é sucesso**: o arquivo cria estrutura, não devolve dados.
- Pode rodar quantas vezes quiser; é idempotente.
- **Não apague nada antes.** O arquivo corrige por cima e preserva os dados existentes.

### 3. Ligar o site ao banco

No Supabase, em **Project Settings → API**, copie:

- **Project URL** → cole em `BFA_SUPABASE_URL`
- chave **anon public** → cole em `BFA_SUPABASE_ANON_KEY`

As duas constantes ficam no topo de `plataforma/src/utils/env.js` (o arquivo já
existe na branch do passo 5; até lá, o campo é o mesmo).

> A chave `anon` **pode** ficar no repositório: ela é pública por natureza, vai
> no navegador de todo visitante em qualquer aplicação Supabase, e não concede
> permissão por si só. Quem controla o que cada pessoa lê e escreve são as
> políticas de RLS criadas no passo 2. A chave que **nunca** pode entrar aqui é
> a `service_role`, que ignora o RLS inteiro.

Antes disso, as credenciais só existiam no navegador de quem as digitava — por
isso o banco aparecia como desconectado em produção.

### 4. Criar o primeiro administrador

Ninguém nasce administrador e **não existe tela para virar administrador** — de
propósito, senão isso seria um caminho para escalar privilégio. O primeiro é
promovido à mão, uma única vez:

1. Supabase → **Authentication → Users → Add user**, com "Auto Confirm User" marcado.
2. No SQL Editor:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
```

3. Confira:

```sql
SELECT email, role FROM public.profiles ORDER BY created_at;
```

### 5. Mergear o PR `sem-token-e-rls`

**Só depois dos passos 2, 3 e 4.** Este PR remove as senhas que estavam
escritas no código, então se ele entrar antes de existir uma conta no Supabase,
ninguém consegue entrar na área do professor.

O que ele traz: o schema corrigido, o login por conta real e a publicação de
conteúdo sem token — o botão "Publicar" passa a gravar no banco, e quem
autoriza é a política de RLS, não uma checagem no navegador.

### 6. Testar o fluxo inteiro

Com o PR mergeado e o deploy publicado, no site oficial:

1. Entre em `/#/admin/login` com a conta criada no passo 4.
2. Ligue o modo de edição e altere um texto qualquer.
3. Clique em **🚀 Publicar alterações**.
4. Abra o site em uma janela anônima e confirme que a alteração aparece **sem estar logado**.

O passo 4 é o teste que importa. Ele é exatamente o que nunca funcionou antes:
a edição ficava só no navegador de quem editou e o público continuava vendo o
texto original.

### 7. Desligar o site antigo da Netlify

O `brasil-financas-atlas.netlify.app` é uma cópia congelada e já mostra
conteúdo errado. Duas opções no painel da Netlify: apagar o site, ou trocar o
conteúdo por uma página de redirecionamento para o endereço oficial. A segunda
é melhor se o link já foi enviado para alguém.

### 8. Mergear o PR `protege-auto-sync`

Conserta o `auto_sync.py`, que hoje publica mesmo quando o rebase falha — foi
assim que ele sobrescreveu correções que já estavam na `main`. Independente do
merge: **rode `git pull` antes de ligar o script.**

### 9. Revogar o token do GitHub

O `.env` com um `GITHUB_PAT` real foi commitado. O arquivo já saiu do
rastreamento, mas **isso não invalida o token** — ele continua no histórico do
git. A única coisa que resolve é revogar em *Settings → Developer settings →
Personal access tokens* e gerar outro. Ação do David, dono da conta.

### 10. Domínio próprio

Deixe para o fim. O Cloudflare vende a preço de custo e é barato, mas domínio é
o que transforma "link de teste" em "site que aluno usa" — não vale comprar
antes de o cadastro funcionar de ponta a ponta (passo 6).

---

## 🚀 Como Executar o Projeto Localmente no seu PC

Depois de baixar os arquivos do repositório (via botão **Code ➔ Download ZIP** no GitHub ou clonando via `git clone`), siga os passos abaixo para abrir a plataforma interativa no seu computador:

### Opção 1: Via Python (Recomendado — Sem necessidade de instalar Node.js)

Se você já tem o Python instalado no Windows, Mac ou Linux:

1. Abra o **Terminal** ou **Prompt de Comando (cmd)** na pasta do projeto.
2. Execute o comando abaixo para iniciar o servidor local:

```bash
python -m http.server 8080 --directory plataforma
```

3. Abra o seu navegador e acesse o endereço:
👉 **`http://localhost:8080/`**

---

### Opção 2: Abrindo diretamente no Navegador

1. Abra a pasta `plataforma/` do projeto baixado.
2. Dê um duplo clique no arquivo `index.html`.
3. O site abrirá diretamente no seu navegador padrão (Chrome, Edge, Firefox, Safari).

---

### Opção 3: Via VS Code (Extensão Live Server)

1. Abra a pasta do projeto no **VS Code**.
2. Clique com o botão direito sobre o arquivo `plataforma/index.html`.
3. Selecione **Open with Live Server**.

---

## 🔒 Área do Professor (Admin)

O acesso é por **conta de verdade**, criada no Supabase. Não existe usuário nem
senha escritos no código — e não existe token para colar em lugar nenhum.

Antes valia o contrário: quatro pares usuário/senha viviam dentro do
`AdminContext.jsx`, e publicar exigia colar um Personal Access Token do GitHub
na tela. Como este site é servido como arquivo estático, qualquer pessoa podia
ler as senhas; e o token ficava guardado no navegador de quem o digitasse. As
duas coisas foram removidas.

### Como funciona hoje

1. **Entrar:** `/#/admin/login`, com o e-mail e a senha da sua conta do
   Supabase.
2. **Editar:** com o modo de edição ligado, clique no texto e altere.
3. **Publicar:** botão **🚀 Publicar alterações**. Não pede credencial: a
   permissão é verificada pelo próprio banco, pela política
   `Somente admin altera conteúdo`. Se a conta não for administradora, a
   gravação é recusada lá — e não por uma checagem no navegador, que qualquer
   pessoa poderia burlar.

O conteúdo publicado vai para a tabela `site_content` e todo visitante o
recebe no carregamento da página.

### Primeira configuração (uma vez só)

**1. Criar o banco.** No painel do Supabase, abra o **SQL Editor**, cole todo o
conteúdo de `plataforma/src/data/schema.sql` e execute. Pode rodar de novo
quando quiser: o arquivo é idempotente.

**2. Ligar o site ao banco.** Em *Project Settings → API*, copie a **Project
URL** e a chave **anon public**, e preencha as duas constantes no topo de
`plataforma/src/utils/env.js`.

> A chave `anon` é pública por natureza — ela vai no navegador de todo
> visitante em qualquer aplicação Supabase, e não concede permissão por si só.
> Quem controla o que cada pessoa lê e escreve são as políticas de RLS do
> `schema.sql`. A chave que **nunca** pode entrar no repositório é a
> `service_role`, que ignora o RLS inteiro.

**3. Criar o primeiro administrador.** Ninguém nasce admin, e não existe botão
para virar admin — de propósito, senão isso seria um caminho para escalar
privilégio. Então o primeiro é promovido à mão:

- *Authentication → Users → Add user*, com "Auto Confirm User" marcado.
- No SQL Editor:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
```

Daí em diante, promover alguém é sempre por aqui.

---

## 🔄 Sincronizar arquivos do seu PC com o GitHub

Para editar **conteúdo** (as unidades em Markdown), o caminho normal é o
repositório de conteúdo — veja
[brasil-financas-atlas/bfa](https://github.com/brasil-financas-atlas/bfa), que
tem um botão de lápis em cada página do site.

Para mexer no **código** da plataforma, use git direto:

```bash
git pull origin main
git add .
git commit -m "descreva o que mudou"
git push origin main
```

Existe também o `auto_sync.py`, que observa a pasta e publica sozinho a cada
arquivo salvo. Ele é conveniente e perigoso na mesma medida: já sobrescreveu
correções que estavam no repositório porque publicou uma cópia local
desatualizada. Se for usar, rode `git pull` antes de ligar.

---


## Deploy

O site vai ao ar pelo **Cloudflare Pages**, a partir da branch `main` deste
repositorio. Nao ha etapa de build: o `plataforma/` e publicado como esta.

| Configuracao | Valor |
|---|---|
| Build command | *(vazio)* |
| Build output directory | `plataforma` |
| Branch de producao | `main` |

O arquivo `plataforma/_redirects` (`/* /index.html 200`) faz o Cloudflare
devolver o `index.html` para qualquer caminho, o que a aplicacao precisa por
ser de pagina unica.

**Por que Cloudflare e nao Netlify:** a Netlify passou a exigir plano pago para
conectar repositorio privado pertencente a uma organizacao do GitHub, que e
exatamente o caso deste repo. No Cloudflare Pages isso entra no plano gratuito.

Cada push na `main` gera um deploy novo automaticamente.

---


## 📚 Estrutura das Trilhas de Estudo

**🔢 Matemática Aplicada a Finanças**
- Módulo 1 — Álgebra do Zero (7 Aulas)
- Módulo 2 — Matemática Financeira Aplicada (5 Aulas)
- Módulo 3 — Funções, Progressões e Probabilidade (9 Aulas)
- Módulo 4 — Estatística e Regressão Linear (8 Aulas)

**📈 Finanças & Investimentos**
- Módulo 1 — Fundamentos em Finanças (9 Aulas)
- Módulo 2 — Análise Fundamentalista de Empresas (9 Aulas)
- Módulo 3 — Montagem de Portfólio e Investimento (8 Aulas)

**🏆 Preparação BRHSIC**
- Guia de Equity Research, Valuation (DCF) e Apresentação de Pitch.

---

## 💡 Sobre o Projeto

O **Brasil Finanças Atlas** nasceu no Núcleo de Inteligência Financeira (NIF) fundado na Escola Pública Dragão do Mar, em Fortaleza-CE. É uma iniciativa 100% gratuita, aberta e acessível para qualquer estudante do Brasil.
