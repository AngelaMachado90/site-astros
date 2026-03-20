# Aurora Scorpio - Blog de Astrologia

Documentação base do projeto **Aurora Scorpio** (snapshot técnico em **19/03/2026**).

## Visão Geral

O projeto é um site estático/semidinâmico focado em astrologia, com:

- Home com previsões, arquivo de posts e filtro por signos
- Arquivo de posts diários 2026 em subpastas por mês
- Páginas individuais de signos (`/signos/<slug>/`)
- Páginas de compatibilidade entre signos
- Estrutura de newsletter (PHP + templates)

## Estrutura Principal

```text
.
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── icons/
│   ├── img/
│   └── email/
├── posts/
│   ├── 01-Janeiro/
│   ├── 02-Fevereiro/
│   ├── 03-Marco/
│   └── 04-Abril/
├── signos/
├── signo-*/                # rotas legadas (redirect)
├── compatibilidade/
├── tag/
├── pages/
├── data/
├── newsletter/
├── scripts/
└── docs/
```

## Tecnologias

- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap 5.3.2 (CDN)
- Bootstrap Icons 1.11.3 (CDN)
- Google Fonts (Cinzel, Playfair Display, Poppins)
- Google Analytics (`G-L35SD7P8VS`)
- Google AdSense (`ca-pub-9709698776174284`)

## Como Executar Localmente

1. Acesse a pasta do projeto:

```bash
cd /storage/disk1/projects/projeto-blogs/blog-astrologia
```

2. Sirva com um servidor estático (recomendado):

```bash
python3 -m http.server 8080
```

3. Abra no navegador:

```text
http://localhost:8080
```

## Documentação Detalhada

- [Documentação Completa](docs/DOCUMENTACAO.md)
- [Manual de Manutenção](docs/MANUAL-DE-MANUTENCAO.md)
- [Backlog de Melhorias](docs/FUTURAS-MELHORIAS.md)
- [Design System Atual](docs/design-system.md)

## Observações Importantes

- O projeto possui estruturas legadas e redirecionamentos coexistindo com a estrutura nova.
- Antes de alterar rotas, links de posts ou scripts globais, consulte o manual de manutenção.
- Há forte dependência entre `index.html`, `assets/js/index.js`, `assets/js/schedule.js` e o padrão de arquivos em `posts/`.
