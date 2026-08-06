# Brasil Finanças Atlas (BFA)

Trilha aberta de educação financeira e matemática aplicada para estudantes do ensino médio — do zero absoluto até análise de investimentos e valuation.

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

## 🔄 Guia Completo de Sincronização de Arquivos e GitHub

A plataforma conta com um sistema de **Git-as-a-CMS**, sincronizando as edições dos conteúdos pedagógicos (`plataforma/src/data/overrides.json`) e do código-fonte diretamente com o repositório oficial (`https://github.com/brasil-financas-atlas/atlas`).

### Método 1: Sincronização Direta do Navegador (Git-as-a-CMS)
Toda alteração feita via CMS in-context na interface (textos, vídeos, questões de quizzes) pode ser enviada diretamente para o GitHub:
1. No painel admin, clique em **🚀 Publicar no GitHub**.
2. Digite seu Personal Access Token (PAT) do GitHub.
3. O sistema fará um commit direto no arquivo `plataforma/src/data/overrides.json` da branch `main` da organização `brasil-financas-atlas`.

### Método 2: Sincronização Manual pelo Terminal
Para sincronizar alterações locais feitas no código com o repositório oficial:
```bash
# Caso precise atualizar o remote após a mudança de proprietário:
git remote set-url origin https://github.com/brasil-financas-atlas/atlas.git

# Para commitar e enviar alterações:
git add .
git commit -m "chore: sincroniza alterações locais com o github"
git push origin main
```

### Método 3: Sincronização Automática em Tempo Real (Background Watcher)
Ao editar localmente o arquivo `plataforma/src/data/overrides.json`, você pode ativar o monitorador automático em Python:
```bash
python auto_sync.py
```
*O script detecta modificações a cada 3 segundos e realiza `commit` + `push` para o GitHub automaticamente.*

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
