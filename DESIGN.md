# Guia de Design do BFA

Manual para mexer no visual do site **sem saber programar**.
Feito para o Guima, o Herton e quem mais entrar no projeto.

---

## Parte 1 — Ver o site na sua máquina (faça isto uma vez)

Sem isso você muda uma cor e só descobre o resultado depois de publicar. Com isso,
você salva o arquivo e **o site atualiza sozinho na hora**, no seu navegador. É o
que torna possível ajustar design sem depender de ninguém.

### 1. Instalar o Python

1. Baixe em **[python.org/downloads](https://www.python.org/downloads/)**.
2. Ao abrir o instalador, **marque a caixinha “Add Python to PATH”** antes de
   clicar em Install. É o erro nº 1 de quem instala — sem isso o computador não
   acha o Python depois.
3. Termine a instalação e **feche todos os terminais abertos**.

### 2. Instalar o programa que monta o site

Abra o PowerShell e rode:

```powershell
cd "C:\Users\lucas\OneDrive\Documentos\AI cérebro\segundo-cerebro-starter\platform\bfa"
```

```powershell
python -m pip install -r requirements.txt
```

Isso baixa o MkDocs Material (o motor do site). Demora um ou dois minutos e só
precisa ser feito uma vez.

> **Por que `python -m pip` e não só `pip`?**
> No Windows, o instalador nem sempre coloca os programas do Python numa pasta que
> o sistema conhece. Se você digitar só `pip` ou `mkdocs`, aparece o erro
> *"The term 'mkdocs' is not recognized..."*. O `python -m` diz "Python, roda esse
> programa que está dentro de você" — e funciona sempre. **Use sempre com `python -m`.**

### 3. Ligar o preview

```powershell
python -m mkdocs serve
```

Vai aparecer algo como `Serving on http://127.0.0.1:8000/`. Abra esse endereço no
navegador — é o site rodando na sua máquina.

**Deixe essa janela do PowerShell aberta enquanto trabalha.** Toda vez que você
salvar um arquivo, a página recarrega sozinha. Para desligar: `Ctrl + C`.

> Ninguém além de você enxerga esse endereço. É um site privado, só seu, para
> testar à vontade antes de publicar.

---

## Parte 2 — Onde fica cada coisa

```
platform/bfa/
├── mkdocs.yml                  ← menu do site e configurações
├── docs/
│   ├── index.md                ← a página inicial
│   ├── financas/               ← conteúdo de finanças
│   ├── matematica-.../         ← conteúdo de matemática
│   └── stylesheets/
│       ├── design.css          ← 🎨 CORES E FORMATOS (mexa aqui!)
│       └── extra.css           ← ⚙️ engrenagem (só com CSS)
└── DESIGN.md                   ← este guia
```

Regra: **quase tudo de visual se resolve no `design.css`.**

---

## Parte 3 — Mudar as cores

Abra `docs/stylesheets/design.css`. Ele é só uma lista de cores com nome em
português. Exemplo:

```css
--bfa-cor-principal:  #011e50;   /* azul-marinho */
--bfa-cor-destaque:   #ca9e43;   /* dourado */
```

Troque o código da cor, salve, e o site muda na hora.

**Para escolher cores:**

- [coolors.co](https://coolors.co) — gera paletas combinando (aperte espaço).
- [htmlcolorcodes.com/color-picker](https://htmlcolorcodes.com/color-picker/) —
  escolhe uma cor específica e te dá o código.

**O que cada cor faz:**

| Variável | Onde aparece |
|---|---|
| `--bfa-cor-principal` | Topo do site, títulos, botões |
| `--bfa-cor-destaque` | Links, hover, detalhes, botão do banner |
| `--bfa-cor-fundo` | Fundo cinza atrás do conteúdo |
| `--bfa-cor-caixa` | Fundo branco das caixas e cards |
| `--bfa-cor-matematica` / `-financas` / `-brhsic` | Barrinha colorida do topo de cada card |
| `--bfa-arredondamento` | Quão redondos são os cantos |
| `--bfa-levantar-hover` | Quanto o card “pula” com o mouse em cima |

O arquivo tem duas seções de cor: uma para o **modo claro** e outra para o
**modo escuro** (o botãozinho de lua no topo do site). Se mudar uma, lembre de
olhar a outra.

---

## Parte 4 — Receitas de copiar e colar

Isto vai **dentro dos arquivos `.md`** (as páginas de conteúdo).

### Botão

```markdown
[Texto do botão](caminho/da/pagina.md){ .md-button }
```

Botão preenchido (mais chamativo):

```markdown
[Texto do botão](caminho/da/pagina.md){ .md-button .md-button--primary }
```

### Bloco de cards

```markdown
<div class="grid cards" markdown>

-   <span class="bfa-card__icone">📈</span> **Título do card**
    { .card-financas }

    ---

    Uma ou duas frases explicando o que tem aqui dentro.

    [Texto do link](destino.md)

-   <span class="bfa-card__icone">🔢</span> **Outro card**
    { .card-matematica }

    ---

    Outra descrição curta.

    [Texto do link](destino.md)

</div>
```

Detalhes:

- `{ .card-matematica }`, `{ .card-financas }`, `{ .card-brhsic }` mudam a cor da
  barrinha. Se omitir, fica dourado.
- O emoji dentro do `<span>` é o ícone. Troque por qualquer emoji.
- Os três tracinhos `---` separam o título da descrição. Não apague.
- A linha em branco entre os itens é obrigatória.

### Selo de status

```markdown
<span class="selo-pronto">4 módulos</span>
<span class="selo-construcao">Em breve</span>
```

### Caixa de destaque

```markdown
!!! note "Título da caixa"
    Texto de dentro, com quatro espaços de recuo.
```

### Resposta escondida (o aluno clica para abrir)

```markdown
??? note "Gabarito"
    A resposta vai aqui, com quatro espaços de recuo.
```

---

## Parte 5 — Mudar o menu do site

O menu lateral vem do `mkdocs.yml`, na parte `nav:`. Para adicionar uma página:

```yaml
      - "Aula 10: Nome da aula": financas/modulo-1-fundamentos/aula-10-nome.md
```

Cuidados:
- **Espaços importam.** Alinhe com a linha de cima, e use espaços, nunca Tab.
- O arquivo `.md` precisa existir nesse caminho, senão o site não monta.

---

## Parte 6 — Publicar

Quando estiver satisfeito no preview:

```powershell
git add -A
```

```powershell
git commit -m "design: descricao curta do que mudou"
```

```powershell
git push origin main
```

Em 1–2 minutos o site público atualiza sozinho.

---

## Parte 7 — Quando algo quebra

**"The term 'mkdocs' is not recognized..."** Você esqueceu o `python -m` na frente.
O certo é `python -m mkdocs serve`.

**O preview mostra texto vermelho no PowerShell.** Nem todo texto vermelho é erro —
o PowerShell pinta de vermelho até mensagens informativas do MkDocs. Procure a
palavra `ERROR` ou `WARNING`. Se terminar com *"Documentation built in X seconds"*,
deu certo. Erro de verdade mais comum: caminho de arquivo errado no `mkdocs.yml`.

**A página ficou estranha ou sumiu formatação.** Provavelmente faltou uma linha em
branco ou os espaços de recuo saíram do lugar no Markdown.

**Quero voltar tudo como estava.** Desfazer as mudanças de um arquivo específico:

```powershell
git checkout docs/stylesheets/design.css
```

Isso apaga as alterações não salvas no Git e volta ao último estado publicado.
`Ctrl + Z` no editor também resolve os casos simples.

---

## Regras do time

1. **Cor e formato:** `design.css`. Qualquer um mexe.
2. **Estrutura visual nova (componente que não existe):** `extra.css`. Precisa de CSS.
3. **Sempre olhe no preview antes do push** — e olhe também no celular
   (aperte F12 no navegador e ative o modo celular).
4. **Um commit por mudança**, com mensagem dizendo o que mudou. Fica fácil desfazer.
