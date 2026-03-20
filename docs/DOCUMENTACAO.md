# DOCUMENTACAO TECNICA - AURORA SCORPIO

Atualizado em: **19/03/2026**
Base analisada: `/storage/disk1/projects/projeto-blogs/blog-astrologia/`

## 1) Estrutura de Diretorios

### 1.1 Arvore (pastas principais)

```text
blog-astrologia/
├── assets/
│   ├── css/               # estilos globais e por pagina
│   ├── js/                # scripts de interface
│   ├── icons/             # icones SVG dos signos
│   ├── img/               # imagens reais usadas em pagina
│   ├── images/            # pasta atualmente vazia (legado)
│   └── email/             # SVGs usados em templates de email
├── compatibilidade/       # 144 paginas de combinacao signo x signo
├── data/                  # fontes JSON consumidas no front
├── docs/                  # documentacao
├── includes/              # reservado (vazio no snapshot)
├── live-ano-novo-astrologico/ # rota de redirect para #previsoes
├── newsletter/            # backend PHP + templates de email
├── pages/                 # paginas institucionais
├── posts/                 # arquivo de posts diarios e legado
│   ├── 01-Janeiro/
│   ├── 02-Fevereiro/
│   ├── 03-Marco/
│   └── 04-Abril/
├── scripts/               # automacoes Node
├── signo-*/               # rotas legadas (redirect para /signos/)
├── signos/                # estrutura atual de signos
└── tag/                   # paginas de tags
```

### 1.2 Mapeamento de pastas e finalidade

| Pasta | Finalidade | Estado atual |
|---|---|---|
| `assets/css/` | CSS principal (home, signos, posts) e arquivos por pagina | 20 arquivos; varios placeholders de 1 linha |
| `assets/js/` | Scripts da home, agenda, arquivo diario, signos e ads | 5 arquivos |
| `assets/icons/signos/` | SVG de cada signo | 12 icones |
| `assets/img/` | imagens usadas de fato (`favicon`, logos, avatar) | ativa |
| `assets/images/` | caminho referenciado em varios HTMLs | vazia (inconsistencia) |
| `compatibilidade/` | paginas SEO de compatibilidade | 144 paginas |
| `data/` | JSON de previsoes e pontuacoes | 2 arquivos |
| `newsletter/` | captura/confirmacao por email (PHP) | estrutura presente |
| `pages/` | conteudo institucional e pagina de espera | 5 arquivos |
| `posts/01-Janeiro/` | diarios de janeiro/2026 | 31 arquivos |
| `posts/02-Fevereiro/` | diarios de fevereiro/2026 | 28 arquivos |
| `posts/03-Marco/` | diarios de marco/2026 + `diarios.html` de redirect | 32 arquivos |
| `posts/04-Abril/` | reservado para novos posts | vazio |
| `signos/<slug>/` | pagina canonica por signo | 12 paginas |
| `signos/<slug>.html` | redirect legado para `/signos/<slug>/` | 12 arquivos |
| `signo-<slug>/` | redirect legado antigo | 12 pastas |
| `tag/` | landing pages por tag | 8 paginas |
| `scripts/` | geradores e utilitarios | 3 arquivos |
| `docs/` | documentacao do projeto | ativo |

## 2) Arquivos CSS

Formato solicitado: `nome_arquivo | localizacao | proposito | breakpoints`

| Nome | Localizacao | Proposito | Breakpoints |
|---|---|---|---|
| `index.css` | `assets/css/` | Base visual principal da home (tokens, componentes, utilitarios) | `max-width: 992, 768, 767.98, 576, 480, 359.98` |
| `index-tablet.css` | `assets/css/` | Ajustes para tablet da home | `min-width: 768` |
| `index-desktop.css` | `assets/css/` | Ajustes para desktop da home | `min-width: 992` |
| `signo.css` | `assets/css/` | Base das paginas individuais de signo | `max-width: 768` |
| `signo-tablet.css` | `assets/css/` | Ajustes tablet das paginas de signo | `min-width: 768` |
| `signo-desktop.css` | `assets/css/` | Ajustes desktop das paginas de signo | `min-width: 992` |
| `post-diario.css` | `assets/css/` | Layout e tipografia dos posts diarios e arquivo de diarios | `max-width: 768, 576, 480` + `prefers-reduced-motion` |
| `cosmic-animations.css` | `assets/css/` | Animacoes cosmicas utilitarias | `prefers-reduced-motion` |
| `contato.css` | `assets/css/` | Placeholder pagina contato | sem media query (1 linha) |
| `contato-tablet.css` | `assets/css/` | Placeholder tablet contato | sem media query (1 linha) |
| `contato-desktop.css` | `assets/css/` | Placeholder desktop contato | sem media query (1 linha) |
| `sobre.css` | `assets/css/` | Placeholder pagina sobre | sem media query (1 linha) |
| `sobre-tablet.css` | `assets/css/` | Placeholder tablet sobre | sem media query (1 linha) |
| `sobre-desktop.css` | `assets/css/` | Placeholder desktop sobre | sem media query (1 linha) |
| `termos-de-uso.css` | `assets/css/` | Placeholder termos | sem media query (1 linha) |
| `termos-de-uso-tablet.css` | `assets/css/` | Placeholder tablet termos | sem media query (1 linha) |
| `termos-de-uso-desktop.css` | `assets/css/` | Placeholder desktop termos | sem media query (1 linha) |
| `politica-privacidade.css` | `assets/css/` | Placeholder politica | sem media query (1 linha) |
| `politica-privacidade-tablet.css` | `assets/css/` | Placeholder tablet politica | sem media query (1 linha) |
| `politica-privacidade-desktop.css` | `assets/css/` | Placeholder desktop politica | sem media query (1 linha) |

## 3) Arquivos JavaScript

Formato solicitado: `nome_arquivo | localizacao | dependencias | funcoes principais`

### 3.1 Runtime do site

| Nome | Localizacao | Dependencias | Funcoes principais |
|---|---|---|---|
| `index.js` | `assets/js/` | `window.AuroraSchedule`, Bootstrap (tooltips), `fetch`, `localStorage`, `gtag` (se presente) | monta `todosPosts`, filtros de mes/busca, calendario da home, previsoes de signos, consentimento de cookies, newsletter simulada |
| `schedule.js` | `assets/js/` | DOM da home e de posts, `localStorage`, `gtag`; referencia `window.AuroraSchedule` | funcoes utilitarias e logica extensa de listagem/previsoes/cookies; **depende de API global AuroraSchedule nao declarada no proprio arquivo** |
| `diarios.js` | `assets/js/` | DOM de `posts/diarios.html` | monta arquivo completo 2026, busca por texto/tag, filtro por mes, ordem, calendario navegavel |
| `signo.js` | `assets/js/` | `data-signo` no elemento `#previsao-signo` | render simples de resumo do signo por slug |
| `adsense-visibility.js` | `assets/js/` | `MutationObserver`, slots `.ads-shell`/`ins.adsbygoogle` | mostra/oculta shells de anuncio conforme preenchimento |

### 3.2 Scripts de automacao

| Nome | Localizacao | Dependencias | Funcoes principais |
|---|---|---|---|
| `generate-compatibilidade-pages.js` | `scripts/` | Node.js (`fs`, `path`) | gera paginas de compatibilidade e `data/compatibilidade-scores.json` |
| `revisar-posts-1200.js` | `scripts/` | Node.js (`fs`, `path`) | corrige acentuacao textual e complementa posts para minimo de caracteres |

## 4) Padroes de Nomenclatura

Convencoes observadas e recomendadas:

- Arquivos HTML gerais: predominio de `kebab-case`.
- Arquivos de posts diarios: `diario-MM-DD-AAAA.html` em `posts/MM-Mes/`.
- Pastas de mes: `MM-NomeMes` (ex.: `03-Marco`).
- Classes CSS: predominantemente `kebab-case` (`.cosmic-nav`, `.mystic-footer`, `.card-dia`).
- IDs HTML: misto de `kebab-case` (`posts-grid`, `lista-previsoes-signos`) e `camelCase` (`cookieConsent`, `cookieConfigPanel`).
- Funcoes JS: majoritariamente `camelCase` (`renderizarPrevisoesSignos`, `filtrarPosts`).
- Slugs de signo: minusculo sem acento (`aries`, `escorpiao`, `capricornio`).

Excecoes legadas a evitar em novos arquivos:

- nomes com acentos em arquivo (`previsão-semanal-02-08fev.html`)
- rotas antigas duplicadas (`signo-<slug>/`, `signos/<slug>.html`)

## 5) Componentes Principais (Home)

Formato solicitado: `nome, localizacao no HTML, dependencias, como modificar`

| Componente | Localizacao no HTML | Dependencias | Como modificar com seguranca |
|---|---|---|---|
| `navbar` | `.cosmic-nav` | classes CSS da home + menu ativo no JS | manter links absolutos e testar item ativo em rotas internas |
| `hero-section` | `.header-mistico` | `index.css` + estilo inline de `index.html` | evitar remover variaveis de cor usadas no inline |
| `post-destaque` | `section.post-dia#previsoes` | `index.js` (`atualizarPostDinamico`) + `todosPosts` | manter IDs (`post-titulo`, `post-subtitulo`, etc.) para nao quebrar render |
| `previsoes-signos` | `section#signos`, `#seletor-signos`, `#lista-previsoes-signos` | `index.js` + `data/previsoes-diarias.json` | preservar `data-signo` e botoes de filtro |
| `calendario-posts` | `#calendario` e botoes de mes | `index.js`/`schedule.js` | manter formato ISO de datas e mapeamento de pastas |
| `newsletter` | formulario principal (`#form-newsletter`) | `index.js` (`bindNewsletterForm`) | hoje e simulacao client-side; se integrar backend, manter fallback visual |
| `footer` | `.mystic-footer` | CSS base da home | pode editar conteudo textual sem impacto funcional |
| `chatbot-kodassauro` | nao ha markup fixo no HTML (somente referencia em JS: `.kodassauro`) | cookies funcionais em `index.js` | se for habilitar, inserir elemento com classe `.kodassauro` e controlar carregamento por consentimento |

## 6) API e Dados

Fontes de dados usadas pelo site:

- `data/previsoes-diarias.json`
- `data/compatibilidade-scores.json`
- estruturas internas (fallback) em `assets/js/index.js` e `assets/js/schedule.js`

### 6.1 `previsoes-diarias.json`

Estrutura:

```json
{
  "data": "2026-03-15",
  "signos": [
    {
      "nome": "Áries",
      "elemento": "Fogo",
      "previsao": "...",
      "areas": ["amor", "dinheiro"],
      "dica": "...",
      "lua": "Áries",
      "sol": "Peixes"
    }
  ]
}
```

Uso:

- `index.js` faz `fetch('/data/previsoes-diarias.json')` com `cache: 'no-store'`.
- Em falha, usa fallback interno (conteudo em JS).

### 6.2 `compatibilidade-scores.json`

- chave no formato: `signo1-com-signo2`
- valores numericos: `amor`, `amizade`, `trabalho`, `geral`
- consumido pelo fluxo de geracao das paginas de compatibilidade

## 7) Breakpoints Responsivos

Formato solicitado: `breakpoint | dispositivo | arquivo CSS`

| Breakpoint | Dispositivo | Arquivo |
|---|---|---|
| `max-width: 359.98px` | mobile muito pequeno | `assets/css/index.css` |
| `max-width: 480px` | mobile pequeno | `assets/css/index.css`, `assets/css/post-diario.css` |
| `max-width: 576px` | mobile | `assets/css/index.css`, `assets/css/post-diario.css` |
| `max-width: 767.98px` | mobile/tablet pequeno | `assets/css/index.css` |
| `max-width: 768px` | mobile/tablet | `assets/css/index.css`, `assets/css/post-diario.css`, `assets/css/signo.css` |
| `max-width: 992px` | tablet/desktop compacto | `assets/css/index.css` |
| `min-width: 768px` | tablet+ | `assets/css/index-tablet.css`, `assets/css/signo-tablet.css` |
| `min-width: 992px` | desktop | `assets/css/index-desktop.css`, `assets/css/signo-desktop.css` |
| `prefers-reduced-motion` | acessibilidade motion | `assets/css/post-diario.css`, `assets/css/cosmic-animations.css` |

## 8) SEO Atual

Implementado:

- `meta description`, `meta keywords`, `meta author`, `meta robots` em paginas principais
- JSON-LD (`Blog`) na home
- Open Graph em paginas de signo
- canonicidade em paginas de signo (`/signos/<slug>/`)
- URLs amigaveis de signos (`/signos/nome/`)
- redirects legados via `.htaccess` e HTML (`meta refresh` + `location.replace`)

Pontos de atencao:

- nao foi encontrado `robots.txt` nem `sitemap.xml` no projeto
- `pages/politica-privacidade.html` redireciona para `/termos-de-uso.html`
- referencias recorrentes a `/assets/images/...` com pasta `assets/images/` vazia

## 9) Funcionalidades JS Implementadas

Formato solicitado: `funcionalidade | arquivo | como testar`

| Funcionalidade | Arquivo | Como testar |
|---|---|---|
| Renderizacao de previsoes por signo na home | `assets/js/index.js` | abrir home e validar cards em `#lista-previsoes-signos` |
| Filtro de posts por mes (home) | `assets/js/index.js` | clicar botoes `.month-btn` e observar `#posts-grid` |
| Busca de posts (home) | `assets/js/index.js` | digitar no input de busca e conferir contador/lista |
| Calendario interativo da home | `assets/js/index.js` | clicar dias no bloco `#calendario` |
| Arquivo de diarios com filtros e calendario | `assets/js/diarios.js` | abrir `/posts/diarios.html`, usar mes/tag/data |
| Newsletter (simulacao UI) | `assets/js/index.js` | enviar email no formulario e verificar mensagem de sucesso |
| Cookie consent/configuracao | `assets/js/index.js` | limpar `localStorage` e recarregar home |
| Controle de visibilidade de AdSense | `assets/js/adsense-visibility.js` | abrir paginas de signo e observar shells de anuncio |
| Render de resumo de signo por `data-signo` | `assets/js/signo.js` | atualmente sem referencias em HTML; testar manualmente com elemento `#previsao-signo` |
| Chatbot (hook de consentimento) | `assets/js/index.js` | somente referencia `.kodassauro`; exige embed real para validar |
| Back to top button | n/a | nao identificado no snapshot atual |

## 10) Dependencias Externas

Formato solicitado: `recurso | versao | CDN | funcao`

| Recurso | Versao/ID | Origem | Funcao |
|---|---|---|---|
| Bootstrap | 5.3.2 | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/` | base de layout e componentes |
| Bootstrap Icons | 1.11.3 | `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/` | iconografia |
| Google Fonts | Cinzel, Playfair Display, Poppins | `https://fonts.googleapis.com/...` | tipografia |
| Google Analytics | `G-L35SD7P8VS` | `https://www.googletagmanager.com/gtag/js` | analytics e eventos |
| Google AdSense | `ca-pub-9709698776174284` | `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` | monetizacao |

## 11) Variaveis CSS Atuais

Tokens principais observados no `:root` de `index.css`, `signo.css`, `post-diario.css`:

- `--cosmic-purple: #4c2a85`
- `--midnight-blue: #1b1f3b`
- `--lavender-mystic: #a78bfa`
- `--soft-gold: #d4af37`
- `--moon-white: #f5f5f7`
- `--text-light: #8a8fa8`
- `--border-light: #e0d9f0`

Diretriz:

- usar sempre os tokens acima para manter consistencia visual entre home, posts e signos

## 12) Como Adicionar Novo Post Diario

### 12.1 Padrao atual

- pasta: `posts/MM-NomeMes/`
- arquivo: `diario-MM-DD-AAAA.html`
- exemplo: `posts/03-Marco/diario-03-20-2026.html`

### 12.2 Passo a passo

1. Criar o HTML do dia na pasta do mes.
2. Manter include de CSS e JS de post:
   - `/assets/css/post-diario.css`
   - `/assets/js/schedule.js`
3. Incluir chamada de protecao de data futura (padrao existente):
   - `window.AuroraSchedule.redirectIfFuturePost("YYYY-MM-DD", "futuro.html");`
4. Validar links do dia anterior/proximo dentro do post.
5. Atualizar dados de listagem:
   - `assets/js/index.js` (home)
   - `assets/js/schedule.js` (home/posts)
   - `assets/js/diarios.js` (arquivo de diarios, se incluir novo mes)
6. Testar:
   - home
   - `/posts/diarios.html`
   - URL direta do novo post

## 13) Como Adicionar ou Alterar Pagina de Signo

### 13.1 Estrutura alvo

- pagina canonica: `signos/<slug>/index.html`
- redirect legado adicional: `signos/<slug>.html`
- redirect legado antigo: `signo-<slug>/index.html`

### 13.2 Passo a passo

1. Criar/editar `signos/<slug>/index.html`.
2. Garantir canonical para `/signos/<slug>/`.
3. Confirmar referencia aos CSS de signo:
   - `/assets/css/signo.css`
   - `/assets/css/signo-tablet.css`
   - `/assets/css/signo-desktop.css`
4. Atualizar links da home para `/signos/<slug>/`.
5. Se novo slug, incluir regra de legado quando necessario (`.htaccess` e redirects HTML).
6. Testar navegacao e canonical:
   - `/signos/<slug>/`
   - `/signos/<slug>.html`
   - `/signo-<slug>/`

## 14) Areas Sensiveis (Nao Mexer Sem Cuidado)

1. **Geracao de links de posts** em `assets/js/index.js` e `assets/js/schedule.js`.
2. **Padrao de caminho dos diarios** (`posts/MM-Mes/diario-MM-DD-AAAA.html`).
3. **Redirects legados de signo** (`.htaccess`, `signos/*.html`, `signo-*/index.html`).
4. **Consentimento de cookies** (`localStorage` + chamada `gtag('consent', ...)`).
5. **Dados JSON consumidos por fetch** (`data/previsoes-diarias.json`).
6. **Referencias de assets** (`/assets/images/` vs `/assets/img/`) para nao ampliar links quebrados.

## 15) Checklist Rapido de Validacao apos Mudancas

1. Abrir home e verificar console sem erros JS.
2. Testar layout em 375px, 768px e 1280px.
3. Clicar filtros de mes e busca.
4. Abrir ao menos 1 post de cada mes.
5. Testar 3 paginas de signo e 2 URLs legadas.
6. Conferir se canonical/meta description continuam corretos.
