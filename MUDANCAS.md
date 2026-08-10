# O que mudou e por quê — agosto/2026

Este arquivo existe para o David não precisar reconstituir o raciocínio a
partir do diff. Cada mudança está aqui com o motivo, o que foi medido antes e
depois, e o que ainda depende dele.

Trabalho feito pelo Guima com o Claude Code, no repositório
`brasil-financas-atlas/atlas`.

---

## Resumo em 30 segundos

| | Estado |
|---|---|
| **1 PR já mergeado** | conserto da matemática (PR #3) — está no ar |
| **2 PRs abertos** | `sem-token-e-rls` e `protege-auto-sync` — esperando você |
| **1 coisa só você pode fazer** | revogar o PAT que foi commitado no `.env` |
| **Arquitetura** | intacta. Continua React por CDN + Babel, sem build, sem Node |

Nada foi apagado sem estar listado na seção "O que eu removi" no fim.

---

## Primeiro, o que estava certo no seu trabalho

Vale registrar, porque o resto do arquivo é sobre defeitos e isso desequilibra
a leitura:

- **A troca para Cloudflare Pages foi a decisão certa.** A Netlify passou a
  exigir plano pago para repositório privado de organização, que é exatamente
  o nosso caso. No Cloudflare isso entra no plano gratuito.
- **O `_redirects` está correto** para aplicação de página única.
- **Nenhuma credencial do Supabase foi commitada.** O `env.js` lia de
  `localStorage` e nascia vazio. Depois do episódio do `.env`, isso é
  aprendizado aplicado.
- **RLS ligado nas 6 tabelas, com política por usuário no progresso.** Muita
  gente lança sem isso. Os furos descritos abaixo são de mecânica do Postgres,
  não de descuido.

---

## 1. Já mergeado — a matemática estava quebrada em 43 das 55 unidades

**PR #3, no ar.** Um arquivo, `LessonContent.jsx`.

Eram três bugs somados, e o pior deles é que **nenhum gerava erro**: o console
ficava limpo e o KaTeX não reclamava, porque a matemática quebrada nunca
chegava até ele. Sem sintoma no console, ninguém tinha motivo para suspeitar.

**Bug 1 — o marcador era comido pelo Markdown.**
O código protegia as fórmulas com `___MATH_TOK_n___`. Em Markdown,
`___texto___` é negrito com itálico: o marcador virava
`<em><strong>MATH_TOK_0</strong></em>`, a string original deixava de existir, e
o `replace` do fim falhava calado.
Medido: **511 `MATH_TOK_n` aparecendo como texto cru para o aluno, em 31
unidades.** A pior era `regressao-linear`, com 64.

Detalhe irônico: o marcador só sobrevivia quando estava colado a uma letra —
isto é, exatamente no caso `R$...R$`. O esquema falhava onde a fórmula era real
e funcionava onde o pareamento era espúrio.

**Bug 2 — `$$` virava `$` na recolocação.**
`parsedHtml.replace(str, tok)` usa `tok` como *string de substituição*, e nela
`$$` significa "um `$` literal". Toda fórmula em destaque era rebaixada para
fórmula em linha.
Medido: **84 blocos `$$` no conteúdo, zero renderizados em destaque no site.**

**Bug 3 — `$` como delimitador colide com `R$`.**
Em texto brasileiro isso é fatal: cada `R$` abre uma fórmula, e o texto entre
dois `R$` virava matemática. O aluno lia, no DRE:

> "a cada R100𝑣𝑒𝑛𝑑𝑖𝑑𝑜𝑠,𝑅100vendidos,R 40 sobram depois de fabricar o sorvete..."

Como a tokenização rodava antes do `marked`, o `|` separador de célula também
era engolido: **11 linhas de tabela quebradas em 5 unidades.**
Medido: **92 trechos de prosa renderizados como fórmula, em 31 unidades.**

**A correção** mudou a abordagem: a matemática passa a ser convertida em HTML
dentro do próprio render, com `katex.renderToString`, em vez de deixar `$...$`
no DOM para o `renderMathInElement` varrer depois. Assim nenhum cifrão de
dinheiro chega a ser interpretado como delimitador. O marcador virou
`@@BFAMATHn@@`, que o Markdown ignora, e a recolocação usa função em vez de
string.

A sanitização roda **antes** de injetar o KaTeX: o HTML das fórmulas é gerado
por nós, não vem do usuário, e passar pelo DOMPurify só arriscaria perder parte
da marcação matemática. O conteúdo do autor continua sanitizado.

**O conteúdo em `docs/` não tinha um erro.** Já escrevia `R\$` escapado dentro
das fórmulas. O defeito era 100% do renderizador.

Depois do merge, medido no site no ar: 0 marcadores vazados, 0 prosa como
fórmula, 0 erros de KaTeX, fórmulas em destaque de volta.

---

## 2. Esperando review — `sem-token-e-rls`

Dois assuntos no mesmo PR porque um depende do outro.

### 2a. Quatro furos nas regras do banco

Os quatro têm a mesma raiz, e ela é contraintuitiva:

> **O RLS do Postgres filtra LINHA, não COLUNA.** E permissão de coluna é
> **aditiva**: se o papel tem `UPDATE` na tabela inteira, um
> `REVOKE UPDATE (coluna)` não tira nada. O Supabase concede no nível da tabela
> por padrão.

Eu quase errei isso também — escrevi o arquivo com `REVOKE UPDATE (role)` e
tive que corrigir para revogar a tabela e conceder coluna por coluna.

**Furo 1 — `profiles` era legível por qualquer um.**
`FOR SELECT USING (true)` numa tabela com `email`, `full_name`, `school_class` e
`birth_date` de **menores de idade**. A chave anon é pública por definição
(está no navegador de todo visitante), então qualquer pessoa listava a turma
inteira. A política se chamava "leitura pública de perfis básicos", mas não
existe como limitar coluna no RLS — o "básicos" não tinha efeito.
Este era o mais grave: risco real de LGPD, não teórico.

**Furo 2 — qualquer aluno podia se tornar admin.**
A política de UPDATE autorizava a própria linha, e `role` tem `admin` no enum.
Uma requisição `PATCH` com `{"role":"admin"}` resolvia.

**Furo 3 — aprovação de edição sem porteiro.**
A política chamada "Admin Chief atualiza status" usava
`auth.role() = 'authenticated'`. Esse `auth.role()` é o papel do **token**, que
vale `authenticated` para todo usuário logado — não tem relação com
`profiles.role`. O nome prometia um porteiro que não existia.

**Furo 4 — `certificates` aberto.**
`FOR SELECT USING (true)` para permitir validação por código libera a tabela
inteira, com os nomes dos alunos, não a linha do código consultado. Virou a
função `validar_certificado(codigo)`, que devolve no máximo uma linha.

**E o que estava silenciosamente quebrado:**

- **`quiz_attempts` tinha RLS ligado e zero políticas.** RLS sem política nega
  tudo, sem erro visível: todo `saveQuizAttempt` falhava calado.
- **Não havia gatilho de criação de perfil.** Sem política de INSERT em
  `profiles` e sem gatilho em `auth.users`, o cadastro nunca criava perfil.
- **Não existia função de `signUp`** em lugar nenhum. Aluno não conseguia criar
  conta.

**`birth_date` foi removida.** A plataforma não usa a data para nada, e o dado
que não existe não vaza nem gera obrigação.

**Não criei visão pública de `profiles`.** Mesmo expondo só o nome, ela
permitiria enumerar todos os alunos. O nome de quem comenta vai gravado na
linha do comentário.

Não consegui executar o arquivo — não tenho Postgres aqui. Conferi a estrutura,
mas a validação de verdade é rodar no SQL Editor. Se der erro de sintaxe, é
nessa primeira execução que aparece.

### 2b. Token do GitHub → login de admin

**O que havia:** quatro pares usuário/senha dentro do `AdminContext.jsx`
(`admin/bfa@2024` e companhia) e publicação exigindo colar um PAT do GitHub na
tela. Como o site é servido como arquivo estático, "escrito no código"
significa "publicado na internet". E o token ficava guardado no `localStorage`
de quem o digitasse.

**O que passou a valer:** login pelo Supabase Auth, com conta de verdade.
Publicar é um botão que grava na tabela `site_content` — e **quem autoriza é o
banco**, pela política "Somente admin altera conteúdo". Não é uma checagem no
navegador, que qualquer pessoa poderia burlar.

Duas mudanças menos óbvias, ambas de segurança:

- **A sessão deixou de ser lida do `localStorage`.** Se o papel viesse de lá,
  bastaria editar o navegador para se declarar admin. Agora o papel vem do
  banco a cada carregamento.
- **`logout` agora encerra a sessão de verdade.** Antes o token de acesso
  continuava válido depois de "sair".

**Uma correção importante no `env.js`:** as credenciais só existiam no
`localStorage`, ou seja, o banco funcionava **apenas na máquina de quem as
digitou**. Era por isso que `isConfigured()` retornava `false` em produção.
Agora vão no arquivo — e a chave `anon` **pode** ficar no repositório: ela é
pública por natureza e não concede permissão por si só; quem protege os dados é
o RLS. A que nunca pode entrar é a `service_role`.

---

## 3. Esperando review — `protege-auto-sync`

O `auto_sync.py` **publicava mesmo quando o rebase falhava.** O bloco do rebase
registrava um aviso, chamava `rebase --abort`, e a execução seguia direto para
o `git push`. Ou seja: exatamente no caso em que os dois lados mexeram no mesmo
arquivo, ele empurrava a cópia local por cima.

Foi o que aconteceu em 06/08. Três correções que já estavam na `main` voltaram
atrás — o `justify-content` com hífen no `AudioReader` (que derruba o app
inteiro em tela branca), o carregamento do `overrides.json` e a ordem do
`lastUpdated` no modal — e o conteúdo do `overrides.json` foi substituído por
uma versão mais antiga, levando junto o teste `123456789`.

O PR faz três coisas: `fetch` primeiro e sem `fetch` não sincroniza; conflito
no rebase **cancela o push** e devolve a decisão para a pessoa; e o token sai de
tudo que vai para o log — o remote autenticado carrega o PAT dentro da própria
URL, e o git repete essa URL nas mensagens de erro, então um push que falhava
gravava o token em texto puro no `auto_sync.log`.

**Independente do merge: rode `git pull` antes de ligar o script.**

---

## 4. Só você pode fazer — revogar o token

O `.env` com um `GITHUB_PAT` real foi commitado (2 commits). Eu tirei o arquivo
do rastreamento, mas **isso não invalida o token**: ele continua no histórico do
git, em qualquer clone que exista.

Revogar em *Settings → Developer settings → Personal access tokens → Revoke*, e
gerar outro. Se for token clássico com escopo `repo`, ele dá acesso a **todos**
os seus repositórios privados, não só a este.

O `.env` continua no seu disco, então o `auto_sync` segue funcionando depois que
você trocar o valor.

---

## 5. O que eu removi, e por quê

Listado para nada parecer que sumiu sozinho:

| Arquivo | Motivo |
|---|---|
| `plataforma/src/components/GitHubSyncModal.jsx` | é a tela que pedia o PAT; manter um componente que pede token contradiz a mudança e convida a religar |
| `plataforma/src/utils/githubSync.js` | serviço que fazia o commit via API; sem o modal, ficou sem uso |
| `build_full_edit_and_css_fix.py` | script morto que guardava as quatro senhas e **reescreveria o `AdminContext.jsx`** se alguém o rodasse |
| `INITIAL_ADMIN_USERS` (em `AdminContext.jsx`) | a lista de usuário/senha |
| coluna `birth_date` (em `profiles`) | dado de menor que a plataforma não usa |
| lista de senhas no `README.md` e no guia de `.agents/` | estavam em texto puro |
| passo a passo de gerar PAT no guia de `.agents/` | ensinava token clássico com escopo `repo` total e sem expiração |

Sobre os outros scripts na raiz (`apply_edit_icon_and_block_fixes.py`,
`fix_all_blank_screen_issues.py`, `upgrade_css.py`, etc.): **não toquei**, mas
vale saber que eles são do mesmo tipo — guardam um retrato antigo do código e o
reescrevem se rodados. Decisão sua se apaga.

---

## 6. O que eu NÃO mexi

- **A arquitetura.** Continua React por CDN + Babel Standalone, sem build e sem
  Node. Não tentei converter para Vite nem nada do tipo.
- **O visual.** Nenhum CSS, nenhuma cor, nenhum layout.
- **O pipeline de conteúdo** (`build_exact_data.py` → `contentData.js`). Ele
  ainda escreve `export const`, que em Babel Standalone não funciona e daria
  tela branca se rodasse — a correção está numa branch antiga
  (`consertos-sincronizacao`), se você quiser.
- **O `docs/`.** Já está com as 55 unidades atualizadas.

---

## 7. Uma observação sobre a arquitetura, sem token no meio

Não é crítica à escolha, é consequência dela: como o Babel roda no navegador,
**não existe erro de compilação — existe site fora do ar.** Um
`justify-content` com hífen dentro de um objeto de estilo derrubou a plataforma
inteira, e um `)}` sobrando fez o mesmo, sem nenhum aviso antes do deploy.

Enquanto for assim, vale abrir o site no navegador com o F12 antes de dar push.
São dez segundos e pegam a classe inteira de problema.
