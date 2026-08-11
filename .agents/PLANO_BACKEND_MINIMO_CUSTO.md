# 🚀 Plano de Execução da Arquitetura Backend de Custo Zero (Zero-Cost Strategy)
**Plataforma Brasil Finanças Atlas (BFA)**

---

## 1. Visão Geral da Arquitetura de Custo Zero (Git-as-a-CMS + Free Static Hosting + Local Auto-Sync)

A infraestrutura da plataforma **Brasil Finanças Atlas (BFA)** foi projetada para operar com **custo zero permanente (R$ 0,00/mês)**, eliminando completamente a dependência de bancos de dados gerenciados pagos (PostgreSQL, MongoDB, Supabase Pro), servidores de aplicação dedicados (EC2, Heroku, DigitalOcean) ou assinaturas de Headless CMS (Strapi, Contentful, Sanity).

```
+-----------------------------------------------------------------------------------+
|                              FLUXO DE DADOS CUSTO ZERO                            |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ Professor / Editor ]                                                           |
|          |                                                                        |
|          v (Edição In-Context no Navegador)                                       |
|  [ AdminContext.jsx ] ---> [ overrides.json (Local) ]                             |
|          |                                                                        |
|          v (Clique em "Sincronizar" via GitHubSyncModal.jsx)                       |
|  [ githubSync.js ] --- (REST API REST / PUT) ---> [ GitHub Repo ]                 |
|                                                          |                        |
|                                                          +--> [ GitHub Actions ]  |
|                                                          |    (content-sync)      |
|                                                          |                        |
|                                                          +--> [ Netlify / CDN ]   |
|                                                               (Auto Build/Deploy) |
|                                                                        |          |
|  [ Aluno / Leitor ] <--- (Acesso ao Site Atualizado) <------------------+          |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Pilares Fundamentais da Arquitetura:

1. **Git-as-a-CMS (GitHub REST API)**: O repositório oficial no GitHub (`brasil-financas-atlas/atlas`) atua como a única fonte de verdade (*Single Source of Truth*). Todas as modificações de conteúdo (textos de aulas, vídeos incorporados, quizzes interativos, notícias) são consolidadas no arquivo de estado [overrides.json](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/overrides.json).
2. **Hospedagem Estática Gratuita (Netlify / Cloudflare Pages / Vercel)**: A plataforma web é um aplicativo de página única (SPA) totalmente estático, distribuído globalmente via CDN edge gratuita com certificados SSL/TLS automáticos. O deploy ocorre via webhooks disparados a cada commit na branch `main`.
3. **Serviço de Sincronização Local Automática (`auto_sync.py`)**: Um daemon Python rodando localmente no computador do desenvolvedor/professor monitora em tempo real a pasta do projeto (via `watchdog`), realizando commits automáticos, resolução de conflitos (`git fetch` + `git rebase`) e enviando atualizações para o GitHub sem intervenção manual.

---

## 2. Passos que o Agente/Automação realiza (Gestão de overrides.json, Versionamento Git, CI/CD)

O agente e os scripts automatizados garantem a integridade dos dados e a esteira contínua de entrega sem necessidade de manutenção manual complexa.

### 2.1. Gestão do `overrides.json` & Edição In-Context
* **Carregamento de Estado**: Ao inicializar a plataforma, o [AdminContext.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/context/AdminContext.jsx) executa uma requisição `fetch('src/data/overrides.json?v=' + Date.now())`. Se o timestamp `lastUpdated` do repositório for mais recente que o armazenamento local (`localStorage`), o estado do repositório prevalece.
* **Captura de Mudanças**: Componentes como `EditableBlock.jsx` e `QuizEngine.jsx` chamam `saveOverride(id, content)` ou `updateLesson(id, data)`, atualizando o estado do CMS e gerando a marca temporal ISO `lastUpdated`.
* **Envio via API REST do GitHub**: O módulo [githubSync.js](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/utils/githubSync.js) e o modal [GitHubSyncModal.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/GitHubSyncModal.jsx) convertem os dados para UTF-8 Base64 e realizam um `PUT` direto na API (`https://api.github.com/repos/brasil-financas-atlas/atlas/contents/plataforma/src/data/overrides.json`), atualizando o arquivo remoto e disparando a infraestrutura de deploy.

### 2.2. Sincronização Automática Local (`auto_sync.py`)
* **Detecção em Tempo Real**: O script [auto_sync.py](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/auto_sync.py) utiliza a biblioteca `watchdog` com *debouncing* de 3 segundos para ignorar alterações intermediárias rápidas.
* **Filtros de Exclusão**: Arquivos como `.git/`, `node_modules/`, `.venv/`, `.env`, `auto_sync.log` e temporários do SO são totalmente ignorados para evitar loops de commit.
* **Segurança na Execução do Git**: O script injeta `GIT_TERMINAL_PROMPT=0` e `GIT_OPTIONAL_LOCKS=0` nas chamadas `subprocess.run`, impedindo travamento de processos por pedidos interativos de senha.
* **Fluxo de Sincronização Segura**:
  1. `git add -A` e `git commit -m "chore(auto-sync): atualiza arquivos locais [YYYY-MM-DD HH:MM:SS]"`
  2. `git fetch https://x-access-token:<PAT>@github.com/brasil-financas-atlas/atlas.git main`
  3. `git rebase FETCH_HEAD` (com rollback automático `git rebase --abort` em caso de conflitos)
  4. `git push https://x-access-token:<PAT>@github.com/brasil-financas-atlas/atlas.git main`

### 2.3. Pipelines de CI/CD Integradas
* **Validação de Conteúdo**: O workflow [.github/workflows/content-sync-deploy.yml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.github/workflows/content-sync-deploy.yml) é acionado a cada alterações em `overrides.json` ou na pasta `docs/**`, executando o script [build_exact_data.py](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/build_exact_data.py) para reconstruir os datasets de aulas.
* **Documentação MkDocs**: O workflow [.github/workflows/deploy.yml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.github/workflows/deploy.yml) compila e publica a documentação pedagógica no GitHub Pages.
* **Redirecionamento SPA**: O arquivo [netlify.toml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/netlify.toml) garante que qualquer rota acessada (`/*`) redirecione com código HTTP 200 para `/index.html`, mantendo a navegação do cliente React 100% funcional.

---

## 3. Passos que o USUÁRIO precisa realizar (Guia Detalhado Passo a Passo)

Siga estas instruções ordenadas para preparar sua conta GitHub, token de acesso, ambiente local e hospedagem gratuita.

---

### Passo 3.1: Geração do Personal Access Token (PAT) no GitHub

Como o repositório contém workflows do GitHub Actions na pasta `.github/workflows/`, seu token de acesso **DEVE obrigatoriamente** possuir a permissão de `workflow`.

1. Acesse o GitHub e entre com sua conta.
2. Vá em **Settings** (Configurações da conta) -> no menu esquerdo inferior, clique em **Developer Settings**.
3. Clique em **Personal Access Tokens** -> selecione **Tokens (classic)**.
   * *Link direto*: [https://github.com/settings/tokens](https://github.com/settings/tokens)
4. Clique no botão **Generate new token** -> escolha **Generate new token (classic)**.
5. No campo **Note**, digite um nome descritivo (ex.: `BFA Auto-Sync Token - Notebook Prof`).
6. Defina a **Expiration** (Ex.: 90 dias ou No expiration).
7. Marque **obrigatoriamente** as seguintes caixas de seleção (Escopos):
   * [x] **`repo`** (Controle total de repositórios privados/públicos, acesso a código e commits).
   * [x] **`workflow`** (Permite atualizar fluxos de trabalho do GitHub Actions).
8. Role até o final da página e clique em **Generate token**.
9. **IMPORTANTE**: Copie a chave gerada imediatamente (formato `ghp_xxxxxxxxxxxxxxxxxxxx`). Ela não será exibida novamente!

---

### Passo 3.2: Configuração do Arquivo `.env` Local

1. No diretório raiz do projeto (`D:\Users\LuisFerro\Downloads\atlas-main\atlas-main`), crie ou edite o arquivo chamado [.env](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.env).
2. Adicione a seguinte linha contendo o token gerado no Passo 3.1:
   ```env
   GITHUB_PAT=ghp_SEU_TOKEN_COPIADO_AQUI
   ```
3. Certifique-se de que o arquivo [.gitignore](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.gitignore) possui a entrada `.env` para evitar o vazamento acidental da sua chave para o GitHub.

---

### Passo 3.3: Execução e Validação do Auto-Sync Local

1. Abra o terminal (CMD ou PowerShell) na raiz do repositório.
2. Execute o teste de conexão inicial para validar as permissões da chave:
   ```bash
   python -c "import auto_sync; syncer = auto_sync.GitAutoSync(auto_sync.REPO_DIR, auto_sync.BRANCH, pat=auto_sync.GITHUB_PAT); syncer.sync()"
   ```
3. Verifique se a saída informa `[AUTO-SYNC] SUCESSO! Alteracoes sincronizadas no GitHub.`
4. Para manter o monitoramento automático ativo em segundo plano enquanto você trabalha, execute:
   ```bash
   pythonw auto_sync.py
   ```
   *(Consulte o arquivo [auto_sync.log](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/auto_sync.log) a qualquer momento para acompanhar os logs de execução).*

---

### Passo 3.4: Sincronização In-Context via Navegador (Modal de Sync)

Quando um professor ou editor realiza modificações de texto, vídeos ou quizzes diretamente no navegador:

1. Clique no botão de engrenagem/painel no canto inferior ou cabeçalho e selecione **"Sincronizar com GitHub & Netlify"**.
2. Na janela modal ([GitHubSyncModal.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/GitHubSyncModal.jsx)), preencha os campos:
   * **PAT Token**: Cole a sua chave `ghp_...` gerada no Passo 3.1.
   * **Dono do Repositório (Owner)**: `brasil-financas-atlas`
   * **Nome do Repositório (Repo)**: `atlas`
3. Clique em **🚀 Publicar no GitHub & Netlify**.
4. O modal fará o comit direto via REST API e exibirá o link para o commit gerado.

---

### Passo 3.5: Configuração da Hospedagem Gratuita (Netlify, Cloudflare Pages ou Vercel)

Você pode publicar o site gratuitamente em qualquer uma das plataformas de hosting estático abaixo:

#### Opção A: Netlify (Recomendado - Pré-configurado via netlify.toml)
1. Acesse [https://app.netlify.com/](https://app.netlify.com/) e faça login com sua conta GitHub.
2. Clique em **Add new site** -> **Import an existing project**.
3. Selecione **GitHub** e escolha o repositório `brasil-financas-atlas/atlas`.
4. Configure os parâmetros do Build:
   * **Branch to deploy**: `main`
   * **Publish directory**: `plataforma`
   * **Build command**: *(Deixe em branco para SPA estática ou `npm run build` se aplicável)*
5. Clique em **Deploy atlas**. O Netlify detectará as regras de redirecionamento no [netlify.toml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/netlify.toml) automaticamente.

#### Opção B: Cloudflare Pages
1. Acesse [https://dash.cloudflare.com/](https://dash.cloudflare.com/) -> vá em **Workers & Pages**.
2. Clique em **Create application** -> guia **Pages** -> **Connect to Git**.
3. Selecione o repositório `brasil-financas-atlas/atlas`.
4. Configure: Root Directory: `plataforma`, Build command: *(vazio)*, Build output directory: `.`.
5. Clique em **Save and Deploy**.

#### Opção C: Vercel
1. Acesse [https://vercel.com/](https://vercel.com/) -> clique em **Add New...** -> **Project**.
2. Importe o repositório `brasil-financas-atlas/atlas`.
3. Em **Root Directory**, edite e selecione a pasta `plataforma`.
4. Clique em **Deploy**.

---

## 4. Checklist de Verificação da Infraestrutura Gratuita

Utilize a tabela abaixo para garantir que todas as etapas foram concluídas com sucesso e que a operação está 100% livre de custos.

| Item | Componente / Etapa | Critério de Aceitação / Verificação | Status |
| :--- | :--- | :--- | :---: |
| **01** | Token de Acesso GitHub | Personal Access Token gerado com as permissões **`repo`** e **`workflow`** ativas. | [ ] |
| **02** | Variáveis de Ambiente | Arquivo [.env](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.env) criado na raiz com a chave `GITHUB_PAT` válida. | [ ] |
| **03** | Proteção de Credenciais | `.env` e `auto_sync.log` devidamente listados no [.gitignore](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.gitignore). | [ ] |
| **04** | Auto-Sync Local | Script [auto_sync.py](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/auto_sync.py) executa sem erros e efetua push automático. | [ ] |
| **05** | Estado CMS Local | [overrides.json](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/data/overrides.json) mantido como estrutura JSON válida com campo `lastUpdated`. | [ ] |
| **06** | Edição In-Context | Modal [GitHubSyncModal.jsx](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/plataforma/src/components/GitHubSyncModal.jsx) realiza commit remoto via API REST com sucesso. | [ ] |
| **07** | CI/CD GitHub Actions | Workflows [.github/workflows/content-sync-deploy.yml](file:///D:/Users/LuisFerro/Downloads/atlas-main/atlas-main/.github/workflows/content-sync-deploy.yml) rodando sem erros de permissão. | [ ] |
| **08** | Hospedagem Estática | Projeto conectado ao Netlify/Cloudflare/Vercel com deploy automático ativo na branch `main`. | [ ] |
| **09** | Roteamento SPA | Redirecionamento `/* -> /index.html 200` funcionando em recargas de página F5 em subrotas. | [ ] |
| **10** | Fatura de Custos | Custo total da infraestrutura confirmado em **R$ 0,00/mês**. | [ ] |

---

*Documento gerado para orientação das equipes de Engenharia, Design e Pedagógica da Plataforma Brasil Finanças Atlas (BFA).*
