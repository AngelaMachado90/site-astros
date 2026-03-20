# MANUAL DE MANUTENCAO SEGURA - AURORA SCORPIO

Atualizado em: **19/03/2026**

## Objetivo

Fornecer um procedimento padrao para alterar o site sem quebrar:

- estrutura de posts
- paginas de signo
- links internos
- SEO e rastreamento

## 1) Preparacao Obrigatoria

1. Fazer backup antes de alterar:

```bash
cp -a /storage/disk1/projects/projeto-blogs/blog-astrologia \
      /storage/disk1/projects/projeto-blogs/blog-astrologia-backup-$(date +%Y%m%d-%H%M)
```

2. Criar branch de trabalho (quando usar git):

```bash
git checkout -b chore/manutencao-$(date +%Y%m%d)
```

3. Registrar escopo da mudanca (arquivo, motivo e impacto esperado).

## 2) Sequencia Segura de Alteracao

1. Alterar **apenas** os arquivos necessarios.
2. Validar links e paths locais.
3. Testar responsividade.
4. Revisar console do navegador.
5. Revisar SEO minimo.
6. Publicar somente depois do checklist final.

## 3) Checklist de Teste (Obrigatorio)

### 3.1 Visual/Responsivo

- testar em `375px`, `768px`, `1280px`
- validar menu, cards, calendario e rodape
- confirmar legibilidade de titulos e botoes

### 3.2 Funcional

- home:
  - filtro por mes
  - busca de posts
  - calendario
  - cards de previsao por signo
- arquivo diario:
  - `/posts/diarios.html`
  - busca por texto e `#tag`
- signos:
  - abrir 3 paginas em `/signos/<slug>/`
- posts:
  - abrir 1 URL de janeiro, fevereiro e marco

### 3.3 Console

- abrir DevTools e garantir ausencia de erros JS bloqueantes
- confirmar que `fetch('/data/previsoes-diarias.json')` responde

### 3.4 Links e rotas

- validar links internos no HTML
- validar redirects legados de signos

## 4) Pontos Criticos (Nao Alterar Sem Revisao)

1. **Mapeamento de posts no JS**
   - arquivos: `assets/js/index.js`, `assets/js/schedule.js`, `assets/js/diarios.js`
   - risco: cards e calendario apontarem para links inexistentes

2. **Padrao de caminho dos posts**
   - formato atual: `posts/MM-Mes/diario-MM-DD-AAAA.html`
   - risco: quebrar navegacao historica

3. **Redirects de signos**
   - arquivos: `.htaccess`, `signos/<slug>.html`, `signo-<slug>/index.html`
   - risco: perda de SEO e links externos quebrados

4. **Consentimento de cookies / Analytics**
   - arquivo: `assets/js/index.js`
   - risco: coleta indevida ou perda de medicao

5. **Referencias de assets de imagem**
   - inconsistencia atual: varios HTMLs usam `/assets/images/...` e arquivos reais estao em `/assets/img/...`
   - risco: favicon/OG image quebrados

## 5) Procedimentos de Manutencao por Tipo

### 5.1 Novo post diario

1. Criar arquivo em `posts/MM-Mes/diario-MM-DD-AAAA.html`.
2. Manter includes de `post-diario.css` e `schedule.js`.
3. Incluir guard de data futura no head.
4. Atualizar listagens em JS (home/arquivo) quando necessario.
5. Testar URL direta e exibicao na home/arquivo.

### 5.2 Nova pagina de signo

1. Criar `signos/<slug>/index.html`.
2. Garantir canonical para `/signos/<slug>/`.
3. Criar/atualizar redirect legado `signos/<slug>.html`.
4. Validar regra `.htaccess` para historico `signo-<slug>.html`.
5. Testar as tres rotas.

### 5.3 Ajustes de estilo

1. Priorizar `index.css`, `signo.css` e `post-diario.css`.
2. Nao criar duplicidade de regra em inline CSS sem necessidade.
3. Reaproveitar variaveis `:root` existentes.

## 6) Comandos Uteis de Verificacao

### 6.1 Conferir posts esperados por mes

```bash
cd /storage/disk1/projects/projeto-blogs/blog-astrologia
for d in posts/01-Janeiro posts/02-Fevereiro posts/03-Marco; do
  echo "## $d"
  find "$d" -maxdepth 1 -type f -name 'diario-*.html' | wc -l
done
```

### 6.2 Encontrar referencias legadas de path de post

```bash
rg "posts/diario-" index.html assets/js
```

### 6.3 Encontrar referencias de imagem potencialmente quebradas

```bash
rg "assets/images/" index.html pages/*.html posts/*/*.html signos/*/index.html
```

### 6.4 Verificar estrutura de signos

```bash
find signos -maxdepth 2 -type f | sort
find signo-* -maxdepth 2 -type f | sort
```

## 7) Regra de Ouro para Deploy

Publicar somente se:

1. links principais funcionarem
2. console estiver limpo de erros criticos
3. responsivo aprovado em 3 larguras
4. pagina inicial, arquivo de posts e signos abrirem corretamente
5. checklist desta pagina estiver 100% concluido

## 8) Plano de Rollback

Se algo quebrar apos deploy:

1. reverter imediatamente para backup/commit anterior
2. comparar diff da release
3. corrigir em branch separada
4. repetir checklist completo antes de novo deploy
