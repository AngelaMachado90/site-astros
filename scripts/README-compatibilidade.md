# Gerador Programático de Compatibilidade entre Signos

Arquivo principal: `scripts/generate-compatibilidade-pages.js`

## O que ele gera

- 144 páginas HTML no formato:
  - `/<signo1>-com-<signo2>.html`
  - Exemplo: `/aries-com-touro.html`, `/libra-com-escorpiao.html`
- Arquivo de scores:
  - `data/compatibilidade-scores.json`

## Como executar

No diretório `blog-astrologia`:

```bash
node scripts/generate-compatibilidade-pages.js
```

## Estrutura gerada em cada página

- H1 no padrão: `Signo1 e Signo2: combinação no amor, amizade e relacionamento`
- Seções:
  1. Introdução
  2. Compatibilidade no amor ❤️
  3. Compatibilidade na amizade 🤝
  4. Compatibilidade no trabalho 💼
  5. Pontos fortes da relação
  6. Desafios do casal
  7. Dicas para dar certo
  8. Compatibilidade geral (nota de 0 a 10)
- Score visual: Amor, Amizade e Trabalho
- SEO: `title`, `description`, `keywords`, Open Graph, `canonical`, Schema `Article`
- Interlinking: links para os dois signos da página + signos relacionados
- 3 blocos AdSense: topo, meio e final

## Personalizações rápidas

No arquivo `generate-compatibilidade-pages.js` você pode ajustar:

- `SIGNS`: dados base de cada signo (tom, traços, textos)
- `ELEMENT_MATRIX`: base de compatibilidade por elemento
- `scorePair()`: lógica de cálculo de score
- `renderPage()`: template HTML final

## Observação

Se quiser evitar sobrescrever páginas já editadas manualmente, adapte o script para gravar em uma pasta dedicada (ex.: `/compatibilidade/`) ou adicione validação antes de salvar.
