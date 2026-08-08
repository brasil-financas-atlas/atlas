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

## 🔒 Acesso à Área Restrita de Professores (Admin CMS)

Para acessar o painel de administração e testar a edição in-context das aulas, acesse no navegador a rota `/#/admin/login` e utilize um dos usuários cadastrados:

- **Usuário:** `admin` | **Senha:** `bfa@2024`
- **Usuário:** `lucas` | **Senha:** `dragaodoomar`
- **Usuário:** `nif` | **Senha:** `investir123`
- **Usuário:** `professor` | **Senha:** `brhsic2024`

---

## ⚙️ Pré-requisitos & Configuração Prévia do Git / GitHub (Sincronização)

Para permitir que a edição in-context de textos, videoaulas e quizzes seja salva diretamente no repositório do GitHub e publicada automaticamente no Netlify, siga as configurações prévias abaixo:

### 1. Configurar Usuário e E-mail no Git Local
Abra o seu terminal/cmd e garanta que o Git está identificado:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### 2. Gerar o Token Seguro de Acesso Granular (Fine-Grained Token)
Para garantir **100% de segurança** e **impedir qualquer acesso a outros repositórios privados** da sua conta:

1. Acesse no GitHub: **Settings ➔ Developer Settings ➔ Personal Access Tokens ➔ Fine-grained tokens**.
2. Clique no botão **Generate new token**.
3. Em **Token name**, digite `BFA Sync Token`.
4. Em **Repository access**, marque a opção **`Only select repositories`** e selecione exclusivamente o repositório **`atlas`** (ou o repositório da plataforma).
5. Na seção **Permissions ➔ Repository permissions**, procure por **Contents** e altere para **`Read and write`**.
6. Clique em **Generate token** no final da página e copie a chave gerada (ela começa com `github_pat_...`).

> 🔒 **Segurança Total**: Com este token granular, a plataforma BFA terá acesso **exclusivamente ao repositório do BFA**, ficando **totalmente bloqueada** de visualizar ou acessar qualquer outro repositório privado da sua conta.

### 3. Vincular o Token na Plataforma
1. Faça login na plataforma como Admin.
2. Clique no botão **`🚀 Publicar no GitHub`** no menu superior.
3. Cole a sua chave `github_pat_...` (o Dono vem preenchido como `brasil-financas-atlas` e o Repositório como `atlas`).
4. Pronto! Suas alterações serão salvas diretamente no repositório do GitHub e o Netlify atualizará o site em ~30 segundos.

---

## 🔄 Guia Completo de Sincronização (Site e Arquivos Locais do PC)

A plataforma conta com um sistema de **Git-as-a-CMS** para sincronizar as edições pedagógicas (`plataforma/src/data/overrides.json`) e alterações de código com o repositório oficial no GitHub (`https://github.com/brasil-financas-atlas/atlas`).

---

## ☁️ Guia de Deploy Contínuo e Gratuito Sincronizado com GitHub

Com o fluxo de **Auto-Sync** ativo (PC ➔ GitHub), qualquer alteração salva no seu computador é enviada para a branch `main` do repositório no GitHub. Para ter o site publicado na web automaticamente e de graça, você pode conectar o repositório a uma das plataformas cloud recomendadas:

### 1. Opção Recomendada: Netlify (Free Tier)
> 📌 *Atualmente utilizado nos links da plataforma (`brasil-financas-atlas.netlify.app`).*

1. **Criar Conta**: Acesse [netlify.com](https://www.netlify.com/) e faça login usando a sua conta do GitHub.
2. **Importar Repositório**:
   - Clique em **Add new site ➔ Import an existing project**.
   - Escolha o provedor **GitHub**.
   - Selecione a organização **`brasil-financas-atlas`** e o repositório **`atlas`**.
3. **Configurações de Build**:
   - **Branch de deploy**: `main`
   - **Publish directory**: `plataforma` *(ou `.` dependendo da estrutura do app)*
   - **Build command**: Deixe em branco (para sites HTML/JS estáticos) ou `npm run build` (caso use Vite/React).
4. **Deploy Automático**: Clique em **Deploy atlas**.
   - A partir deste momento, sempre que o `auto_sync.py` ou a área Admin enviarem um commit para o GitHub, o Netlify atualizará a URL do site em **~30 segundos**.

---

### 2. Opção Alternativa: Vercel (Free Hobby Tier)

1. Acesse [vercel.com](https://vercel.com/) e faça login com o GitHub.
2. Clique em **Add New... ➔ Project**.
3. Selecione o repositório `brasil-financas-atlas/atlas`.
4. Defina a pasta raiz do projeto em **Root Directory** como `plataforma` (se aplicável).
5. Clique em **Deploy**. As atualizações serão publicadas automaticamente a cada `git push`.

---

### 3. Opção de Altíssima Performance: Cloudflare Pages (Free Tier)

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com/) ➔ **Workers & Pages**.
2. Clique em **Create Application ➔ Pages ➔ Connect to Git**.
3. Escolha o repositório `brasil-financas-atlas/atlas`.
4. Defina o **Build output directory** como `plataforma`.
5. Clique em **Save and Deploy**. Oferece 100.000 requisições diárias sem taxa de tráfego.

---


### 🌐 1. Sincronização pelo Site (Área Admin / Navegador)

Para salvar edições de aulas, vídeos e quizzes feitas diretamente na interface web e atualizar a nuvem:

1. Faça login na plataforma em `/#/admin/login` (ex: usuário `admin` e senha `bfa@2024`).
2. Faça as edições desejadas nas aulas (textos, vídeos, questões).
3. No topo da página, clique no botão verde **`🚀 Publicar no GitHub`**.
4. Insira o seu **Personal Access Token (PAT)** do GitHub (o dono `brasil-financas-atlas` e repositório `atlas` já vêm preenchidos).
5. Clique em **Publicar**. As alterações serão gravadas diretamente no repositório GitHub e o Netlify atualizará o site público automaticamente.

---

### 💻 2. Sincronização Automática de Arquivos Locais do seu PC (Passo a Passo Detalhado)

Se você edita os arquivos do projeto no seu computador (via VS Code, bloco de notas ou edita scripts de aula diretamente no PC), o serviço **Auto-Sync (`auto_sync.py`)** envia todas as suas alterações em tempo real para o GitHub sem travar ou pedir senha.

#### 📌 Passo 1: Instalar a Biblioteca de Monitoramento (Executar uma única vez)
Abra o Terminal / CMD na pasta do projeto e execute:
```bash
pip install watchdog
```

#### 📌 Passo 2: Configurar o seu Token de Acesso (PAT) no arquivo `.env`
Para que o script faça `git push` automaticamente em segundo plano para o repositório privado da organização (`brasil-financas-atlas/atlas`):

1. Na raiz da pasta do projeto, crie um arquivo chamado **`.env`** (ou abra o `.env` existente).
2. Adicione a linha abaixo substituindo pela sua chave Personal Access Token do GitHub:
   ```env
   GITHUB_PAT=github_pat_seu_token_aqui
   ```
   *(Como gerar o PAT: GitHub Settings ➔ Developer Settings ➔ Personal Access Tokens ➔ Tokens classic com escopo `repo`, ou Fine-Grained Token apontando para a org `brasil-financas-atlas`)*.

#### 📌 Passo 3: Iniciar o Sincronizador Automático
No terminal da pasta do projeto (`C:\codigos\bfa-main`), execute:
```bash
python auto_sync.py
```

- **Como funciona:** O script ativa o detector nativo de alterações em tempo real no Windows (`watchdog`). Sempre que você editar e salvar qualquer arquivo no PC, o script aguarda 3 segundos de inatividade (debounce) e executa automaticamente:
  1. `git pull --rebase origin main` (para fundir edições feitas no site sem conflitos).
  2. `git add -A` e `git commit -m "chore(auto-sync): atualiza arquivos locais [data/hora]"`.
  3. `git push` direto para a branch `main` do GitHub `brasil-financas-atlas/atlas`.

#### 📌 Passo 4: Como Rodar em Background Silencioso no Windows (Opcional)
Se você não quiser manter a janela do prompt de comando aberta:
- Execute via `pythonw` (sem janela de terminal):
  ```cmd
  pythonw auto_sync.py
  ```
- Todas as mensagens de sucesso ou erros serão gravadas no arquivo de log **`auto_sync.log`** na pasta do projeto.

---

#### 🛠️ Opção Alternativa: Sincronização Manual via Comandos Git
Caso prefira fazer commits manuais sem o script automático:
```bash
# 1. Atualizar o repositório remoto para a organização:
git remote set-url origin https://github.com/brasil-financas-atlas/atlas.git

# 2. Adicionar alterações e commitar:
git add .
git commit -m "chore: sincroniza alterações locais do PC com o GitHub"

# 3. Enviar para o GitHub:
git push origin main
```

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
