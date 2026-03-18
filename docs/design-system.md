# Design System — Aurora Scorpio Astrologia

## Objetivo
Identidade visual profissional, mística e moderna para o blog **Mistérios do Zodíaco**, com base em cosmos, contraste elegante e leitura acessível.

## Tokens visuais

### Cores
- `--cosmic-purple`: `#4C2A85`
- `--midnight-blue`: `#1B1F3B`
- `--lavender-mystic`: `#A78BFA`
- `--soft-gold`: `#D4AF37`
- `--moon-white`: `#F5F5F7`
- `--success`: `#2C7865`
- `--warning`: `#C97C5D`
- `--error`: `#B43E3E`
- `--text-soft`: `#8A8FA8`
- `--border-light`: `#E0D9F0`

### Gradientes
- `--gradient-cosmic`: `linear-gradient(135deg, #4C2A85 0%, #1B1F3B 100%)`
- `--gradient-lavender`: `linear-gradient(135deg, #A78BFA 0%, #4C2A85 100%)`
- `--gradient-gold`: `linear-gradient(135deg, #D4AF37 0%, #A78BFA 100%)`

### Tipografia
- Logo / marca: **Cinzel**
- Títulos: **Playfair Display**
- Texto, botões e meta: **Poppins**

## Componentes aplicados
- Navegação: `.mystic-nav`
- Botão principal: `.mystic-btn`
- Botão outline: `.mystic-btn-outline`
- Card principal: `.mystic-card`
- Sidebar: `.sidebar-widget`
- Tag: `.mystic-tag`
- Chamada de formulário: `.mystic-input`

## Diretrizes
- Header e footer com fundo escuro e acentos dourados.
- Estrelas animadas de forma sutil (baixa intensidade, sem poluição visual).
- Contraste entre títulos em Playfair e textos em Poppins.
- Motion suave em hover (leve elevação e brilho dourado).
- Mobile first: títulos responsivos para `<=768px`.
- Animações cósmicas em camadas leves (estrela, translação, rotação e pulsos).

## Status de implementação no projeto
- `index.html` atualizado com:
  - Variáveis CSS no `:root`
  - Importação das fontes Google
  - Header/navegação/cards/botões/tags com tokens novos
  - Animações cósmicas (`starTwinkle`, `planetFloat`, `cosmicSpin`, `auroraGlow`, `cosmicReveal`)  

## 11. Animações Cósmicas (módulo dedicado)
Arquivo: `assets/css/cosmic-animations.css`  

### Conceitos representados
- `starTwinkle`: brilho e piscamento de estrelas.
- `planetFloat`: flutuação suave de blocos e elementos orbitais.
- `cosmicSpin` / `cosmicSpinReverse`: rotação contínua em sentido normal e reverso.
- `auroraGlow`: respiro luminoso de destaque em marcas e títulos.
- `cosmicWave`: onda de propagação e expansão suave.
- `meteorShower`: partículas de rastro de meteoros.
- `cosmicPulse`: leve pulso de presença para CTAs e cards.
- `cosmicReveal`: entrada suave de seções no carregamento.

### Estruturas e utilitários principais
- Header cósmico: `.cosmic-header`, `.orbiting-planet`
- Cards vivos: `.mystic-card`, `.card-star`
- Botões com energia: `.btn-cosmic`
- Navegação estelar: `.nav-link` + estado `.active`
- Footer galáctico: `.cosmic-footer`
- Fundo animado: `.starry-bg`, `.nebula-bg`, `.shooting-star`
- Partículas de céu: `.cosmic-particles`
- Separadores: `.cosmic-divider`
- Citações: `.mystic-quote`
- Utilitários de animação:
  - `animate-twinkle`, `animate-float`, `animate-spin`, `animate-spin-reverse`, `animate-glow`, `animate-pulse-cosmic`, `animate-wave`, `animate-nebula`
  - `delay-1` a `delay-5`
  - `duration-slow`, `duration-medium`, `duration-fast`
- Postos criados em `posts/` preservando o padrão editorial atual do projeto.
