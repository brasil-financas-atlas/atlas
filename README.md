# Brasil Finanças Atlas (BFA)

Trilha aberta de educação financeira e matemática aplicada para estudantes do ensino médio — do zero absoluto até análise de investimentos e valuation.

**🌐 Site oficial:** https://brasil-financas-atlas.netlify.app/ — deploy do Guima, publicado deste repositório.

**🔧 Deploy do David:** https://4fb76633.atlas-c2i.pages.dev — ambiente de desenvolvimento dele, do mesmo código.

**📖 Versão MkDocs:** https://brasil-financas-atlas.github.io/bfa/ — mesma trilha em formato de documentação, gerada de [brasil-financas-atlas/bfa](https://github.com/brasil-financas-atlas/bfa).

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
