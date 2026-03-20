# FUTURAS MELHORIAS - AURORA SCORPIO

Atualizado em: **19/03/2026**

Backlog recomendado para evolucao do projeto com menor risco de regressao.

## 1) Backlog Priorizado

| Prioridade | Area | Problema atual | Sugestao | Impacto esperado |
|---|---|---|---|---|
| Alta | Performance CSS | muito estilo concentrado em `index.css` + CSS inline grande em `index.html` | mover CSS inline para arquivos por componente e reduzir duplicidade | melhora de manutencao e carregamento |
| Alta | Modularizacao JavaScript | `index.js` e `schedule.js` sao extensos e acoplados | quebrar em modulos ES6 (`posts`, `signos`, `cookies`, `calendar`) | menor risco em alteracoes futuras |
| Alta | Consistencia de assets | muitos HTMLs apontam para `/assets/images/...` mas arquivos reais estao em `/assets/img/...` | padronizar caminho unico e aplicar script de migracao | reducao de links quebrados (favicon/OG) |
| Alta | Rotas institucionais | paginas em `/pages/` coexistem com links apontando para `/sobre.html`, `/contato.html` etc | consolidar estrategia de URL (rewrite oficial ou mover arquivos para raiz) | navegação mais previsivel e SEO consistente |
| Alta | API de agenda global | codigo referencia `window.AuroraSchedule` sem definicao clara no proprio `schedule.js` | criar modulo oficial com contrato unico (`getTodayISO`, `isPostAvailable` etc) | elimina erros silenciosos e melhora confiabilidade |
| Media | SEO avancado | schema basico na home, sem sitemap/robots no repo | adicionar `robots.txt`, `sitemap.xml`, Schema `Article`/`Breadcrumb`/`WebSite` | melhora indexacao organica |
| Media | Acessibilidade | ausencia de padrao ARIA completo e foco em alguns componentes | revisar labels, `aria-*`, navegacao por teclado e contraste | melhor UX e conformidade WCAG |
| Media | Imagens otimizadas | imagens PNG pesadas sem estrategia clara de lazy-load global | converter para WebP/AVIF e aplicar `loading="lazy"` quando apropriado | melhora Core Web Vitals |
| Media | Newsletter backend | `newsletter/cadastrar.php` aparenta incompleto e com variaveis nao definidas | finalizar fluxo de validacao/sanitizacao/log e enviar confirmacao robusta | captacao de leads com menor erro |
| Media | Testes automatizados | validacoes sao manuais | criar scripts para verificar links, paths e metadados SEO | deteccao precoce de quebra |
| Baixa | Limpeza de legado | coexistencia de `signo-*`, `signos/*.html` e canonicos | manter por transicao e planejar desativacao gradual monitorada | reduz complexidade de roteamento |
| Baixa | `signo.js` | arquivo existe mas nao esta referenciado nas paginas atuais | remover ou reintegrar com arquitetura clara | codigo mais limpo |

## 2) Melhorias Solicitadas (Roadmap funcional)

### 2.1 Performance CSS

- unificar estrategia mobile-first
- manter tokens em um unico arquivo base
- eliminar placeholders vazios quando nao necessarios

### 2.2 JavaScript modular

- separar responsabilidades:
  - modulo de calendario
  - modulo de posts
  - modulo de previsoes
  - modulo de consentimento/cookies
- incluir camada de utilitarios compartilhados

### 2.3 SEO e Conteudo

- reforcar links canonicos em todas as paginas
- padronizar H1 unico por pagina
- revisar meta descriptions duplicadas
- adicionar breadcrumbs estruturados

### 2.4 Qualidade de conteudo

- padronizar acentuacao em arquivos e textos
- evitar nomes de arquivo com caracteres especiais
- automatizar validacao de tamanho minimo de conteudo dos posts

## 3) Sugestao de Execucao por Fases

### Fase 1 (curto prazo)

1. corrigir inconsistencias de path de imagem
2. formalizar modulo `AuroraSchedule`
3. implementar script de validacao de links internos

### Fase 2 (medio prazo)

1. modularizar `index.js` e `schedule.js`
2. reduzir CSS inline e reorganizar estilos por componente
3. melhorar acessibilidade base

### Fase 3 (longo prazo)

1. SEO tecnico avancado (sitemap, schema expandido)
2. limpeza gradual de legado de rotas
3. observabilidade (monitor de erro JS e pagina quebrada)
