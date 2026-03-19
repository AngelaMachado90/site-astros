#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = ROOT;
const DATA_DIR = path.join(ROOT, 'data');
const SCORE_FILE = path.join(DATA_DIR, 'compatibilidade-scores.json');

const SIGNS = [
  {
    slug: 'aries',
    nome: 'Áries',
    elemento: 'Fogo',
    modalidade: 'Cardinal',
    regente: 'Marte',
    simbolo: 'Carneiro',
    essencia: 'iniciativa, coragem e impulso de ação',
    amor: 'ama com intensidade e espontaneidade, valorizando verdade e presença',
    amizade: 'é leal, direto e sempre topa novos desafios',
    trabalho: 'atua com ritmo rápido, liderança e foco em resultados',
    pontosFortes: ['coragem', 'autenticidade', 'iniciativa', 'energia'],
    desafios: ['impulsividade', 'impaciência', 'teimosia em discussões'],
    dica: 'Respirar antes de agir aumenta muito a sua potência.'
  },
  {
    slug: 'touro',
    nome: 'Touro',
    elemento: 'Terra',
    modalidade: 'Fixo',
    regente: 'Vênus',
    simbolo: 'Touro',
    essencia: 'estabilidade, prazer e construção consistente',
    amor: 'ama com constância, carinho e desejo de segurança emocional',
    amizade: 'é firme, confiável e presente nos momentos importantes',
    trabalho: 'cresce em ambientes estáveis e foco de longo prazo',
    pontosFortes: ['constância', 'lealdade', 'praticidade', 'sensualidade'],
    desafios: ['apego', 'resistência a mudanças', 'ciúmes pontuais'],
    dica: 'Flexibilidade emocional preserva vínculos sem perder segurança.'
  },
  {
    slug: 'gemeos',
    nome: 'Gêmeos',
    elemento: 'Ar',
    modalidade: 'Mutável',
    regente: 'Mercúrio',
    simbolo: 'Gêmeos',
    essencia: 'curiosidade, comunicação e versatilidade',
    amor: 'se conecta por conversa, humor e estímulo intelectual',
    amizade: 'é sociável, leve e ótimo para trocas de ideias',
    trabalho: 'brilha em contextos dinâmicos e comunicação estratégica',
    pontosFortes: ['adaptação', 'criatividade', 'comunicação', 'inteligência'],
    desafios: ['dispersão', 'inconstância', 'ansiedade mental'],
    dica: 'Foco por ciclos curtos ajuda a manter constância.'
  },
  {
    slug: 'cancer',
    nome: 'Câncer',
    elemento: 'Água',
    modalidade: 'Cardinal',
    regente: 'Lua',
    simbolo: 'Caranguejo',
    essencia: 'cuidado, memória afetiva e proteção emocional',
    amor: 'ama com profundidade, acolhimento e senso de pertencimento',
    amizade: 'é empático, sensível e altamente protetor',
    trabalho: 'se destaca em ambientes com confiança e cooperação',
    pontosFortes: ['empatia', 'cuidado', 'intuição', 'compromisso afetivo'],
    desafios: ['sensibilidade excessiva', 'carência', 'dificuldade de desapego'],
    dica: 'Limites claros protegem sua energia e seus vínculos.'
  },
  {
    slug: 'leao',
    nome: 'Leão',
    elemento: 'Fogo',
    modalidade: 'Fixo',
    regente: 'Sol',
    simbolo: 'Leão',
    essencia: 'brilho, generosidade e liderança criativa',
    amor: 'ama com intensidade, orgulho positivo e demonstração clara',
    amizade: 'é divertido, protetor e inspirador para o grupo',
    trabalho: 'lidera com carisma e foco em reconhecimento meritocrático',
    pontosFortes: ['carisma', 'lealdade', 'criatividade', 'presença'],
    desafios: ['orgulho', 'centralização', 'drama emocional em excesso'],
    dica: 'Escuta ativa torna seu brilho ainda mais magnético.'
  },
  {
    slug: 'virgem',
    nome: 'Virgem',
    elemento: 'Terra',
    modalidade: 'Mutável',
    regente: 'Mercúrio',
    simbolo: 'Virgem',
    essencia: 'organização, discernimento e melhoria contínua',
    amor: 'demonstra afeto em cuidado prático e atenção aos detalhes',
    amizade: 'é confiável, prestativo e muito observador',
    trabalho: 'entrega qualidade, método e eficiência técnica',
    pontosFortes: ['organização', 'análise', 'responsabilidade', 'dedicação'],
    desafios: ['autocrítica', 'perfeccionismo', 'controle'],
    dica: 'Trocar cobrança por consistência gera mais fluidez.'
  },
  {
    slug: 'libra',
    nome: 'Libra',
    elemento: 'Ar',
    modalidade: 'Cardinal',
    regente: 'Vênus',
    simbolo: 'Balança',
    essencia: 'equilíbrio, diplomacia e conexão relacional',
    amor: 'ama com romantismo, diálogo e busca por harmonia',
    amizade: 'é sociável, justo e ótimo mediador de conflitos',
    trabalho: 'atua bem em parceria, estética e negociação',
    pontosFortes: ['diplomacia', 'charme', 'senso estético', 'cooperação'],
    desafios: ['indecisão', 'evitar conflitos', 'agradar demais'],
    dica: 'Escolhas claras fortalecem sua paz interna.'
  },
  {
    slug: 'escorpiao',
    nome: 'Escorpião',
    elemento: 'Água',
    modalidade: 'Fixo',
    regente: 'Plutão (tradicional: Marte)',
    simbolo: 'Escorpião',
    essencia: 'intensidade, estratégia e transformação',
    amor: 'ama com profundidade, lealdade e grande entrega emocional',
    amizade: 'é reservado, fiel e protetor com quem confia',
    trabalho: 'rende muito em análise, estratégia e gestão de crise',
    pontosFortes: ['profundidade', 'resiliência', 'foco', 'intuição'],
    desafios: ['desconfiança', 'controle', 'ciúme'],
    dica: 'Vulnerabilidade com discernimento cria vínculos mais sólidos.'
  },
  {
    slug: 'sagitario',
    nome: 'Sagitário',
    elemento: 'Fogo',
    modalidade: 'Mutável',
    regente: 'Júpiter',
    simbolo: 'Arqueiro',
    essencia: 'expansão, liberdade e visão de futuro',
    amor: 'ama com entusiasmo, franqueza e espírito aventureiro',
    amizade: 'é otimista, divertido e excelente parceiro de jornadas',
    trabalho: 'se destaca em ambientes dinâmicos e estratégicos',
    pontosFortes: ['otimismo', 'coragem', 'espontaneidade', 'visão ampla'],
    desafios: ['impulsividade verbal', 'inconstância', 'pressa'],
    dica: 'Direção + liberdade = crescimento real.'
  },
  {
    slug: 'capricornio',
    nome: 'Capricórnio',
    elemento: 'Terra',
    modalidade: 'Cardinal',
    regente: 'Saturno',
    simbolo: 'Cabra-do-Mar',
    essencia: 'disciplina, maturidade e realização',
    amor: 'ama com lealdade, compromisso e construção de longo prazo',
    amizade: 'é confiável, discreto e muito presente quando necessário',
    trabalho: 'tem visão estratégica e entrega consistente',
    pontosFortes: ['disciplina', 'foco', 'resiliência', 'responsabilidade'],
    desafios: ['autocobrança', 'rigidez', 'dificuldade em mostrar vulnerabilidade'],
    dica: 'Leveza também faz parte da produtividade saudável.'
  },
  {
    slug: 'aquario',
    nome: 'Aquário',
    elemento: 'Ar',
    modalidade: 'Fixo',
    regente: 'Urano (tradicional: Saturno)',
    simbolo: 'Portador de Água',
    essencia: 'inovação, independência e visão coletiva',
    amor: 'ama com liberdade, diálogo e conexão mental',
    amizade: 'é leal, original e ótimo em redes e projetos',
    trabalho: 'brilha em inovação, tecnologia e inteligência coletiva',
    pontosFortes: ['originalidade', 'autonomia', 'visão de futuro', 'humanitarismo'],
    desafios: ['distanciamento emocional', 'teimosia mental', 'impaciência'],
    dica: 'Sentir e pensar juntos torna suas relações mais profundas.'
  },
  {
    slug: 'peixes',
    nome: 'Peixes',
    elemento: 'Água',
    modalidade: 'Mutável',
    regente: 'Netuno (tradicional: Júpiter)',
    simbolo: 'Dois Peixes',
    essencia: 'sensibilidade, empatia e espiritualidade',
    amor: 'ama com romantismo, compaixão e entrega emocional',
    amizade: 'é acolhedor, intuitivo e afetivamente generoso',
    trabalho: 'rende melhor com propósito e ambiente colaborativo',
    pontosFortes: ['empatia', 'intuição', 'criatividade', 'compaixão'],
    desafios: ['idealização', 'falta de limites', 'dispersão'],
    dica: 'Limites claros preservam sua luz e seu coração.'
  }
];

const ELEMENT_MATRIX = {
  Fogo: {
    Fogo: { amor: 8.2, amizade: 8.6, trabalho: 7.6, dinamica: 'muito entusiasmo, atitude e movimento' },
    Terra: { amor: 6.4, amizade: 6.9, trabalho: 7.1, dinamica: 'energia alta com necessidade de ritmo mais estável' },
    Ar: { amor: 8.5, amizade: 8.2, trabalho: 7.9, dinamica: 'troca mental intensa e estímulo constante' },
    Água: { amor: 6.8, amizade: 6.5, trabalho: 6.6, dinamica: 'intensidade emocional com estilos diferentes de expressão' }
  },
  Terra: {
    Fogo: { amor: 6.4, amizade: 6.8, trabalho: 7.0, dinamica: 'segurança e ousadia em equilíbrio desafiador' },
    Terra: { amor: 7.8, amizade: 8.1, trabalho: 8.5, dinamica: 'solidez, consistência e construção de longo prazo' },
    Ar: { amor: 6.9, amizade: 7.1, trabalho: 7.4, dinamica: 'praticidade encontra ideias e estratégia' },
    Água: { amor: 8.0, amizade: 7.7, trabalho: 7.2, dinamica: 'cuidado emocional com base concreta' }
  },
  Ar: {
    Fogo: { amor: 8.4, amizade: 8.3, trabalho: 7.9, dinamica: 'inspiração, aventura e comunicação em alta' },
    Terra: { amor: 6.9, amizade: 7.1, trabalho: 7.5, dinamica: 'racionalidade com foco em resultado' },
    Ar: { amor: 8.1, amizade: 8.7, trabalho: 7.8, dinamica: 'afinidade intelectual e grande sociabilidade' },
    Água: { amor: 6.6, amizade: 6.8, trabalho: 6.9, dinamica: 'mente e emoção aprendendo a dialogar' }
  },
  Água: {
    Fogo: { amor: 6.9, amizade: 6.6, trabalho: 6.5, dinamica: 'coração e impulso buscando um ritmo comum' },
    Terra: { amor: 8.0, amizade: 7.6, trabalho: 7.2, dinamica: 'sensibilidade com estabilidade prática' },
    Ar: { amor: 6.6, amizade: 6.9, trabalho: 6.8, dinamica: 'emoções profundas e necessidade de clareza mental' },
    Água: { amor: 8.3, amizade: 7.8, trabalho: 7.0, dinamica: 'conexão emocional intensa e intuitiva' }
  }
};

function hashString(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, value));
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function scorePair(a, b) {
  const base = ELEMENT_MATRIX[a.elemento][b.elemento];
  let amor = base.amor;
  let amizade = base.amizade;
  let trabalho = base.trabalho;

  if (a.modalidade === b.modalidade) {
    amor += 0.3;
    amizade += 0.4;
    trabalho += 0.3;
  }

  if (a.slug === b.slug) {
    amor += 0.7;
    amizade += 0.8;
    trabalho += 0.9;
  }

  const seed = hashString(`${a.slug}|${b.slug}`);
  const varAmor = ((seed % 11) - 5) * 0.08;
  const varAmizade = (((seed >> 2) % 11) - 5) * 0.08;
  const varTrabalho = (((seed >> 4) % 11) - 5) * 0.08;

  amor = clamp(amor + varAmor);
  amizade = clamp(amizade + varAmizade);
  trabalho = clamp(trabalho + varTrabalho);

  const geral = clamp((amor * 0.4 + amizade * 0.25 + trabalho * 0.35));

  return {
    amor: Number(amor.toFixed(1)),
    amizade: Number(amizade.toFixed(1)),
    trabalho: Number(trabalho.toFixed(1)),
    geral: Number(geral.toFixed(1))
  };
}

function pick(seed, options) {
  return options[hashString(seed) % options.length];
}

function buildRelatedLinks(a, b) {
  const fixed = ['aries', 'touro'];
  const relatedByElement = SIGNS.filter(
    (s) => s.elemento === a.elemento || s.elemento === b.elemento
  ).map((s) => s.slug);

  const unique = [...new Set([a.slug, b.slug, ...fixed, ...relatedByElement])]
    .filter(Boolean)
    .slice(0, 8);

  return unique
    .map((slug) => {
      const sign = SIGNS.find((s) => s.slug === slug);
      return `<a class="btn-cosmic" href="/signos/${slug}.html">${sign.nome}</a>`;
    })
    .join('\n              ');
}

function renderPage(a, b) {
  const score = scorePair(a, b);
  const matrix = ELEMENT_MATRIX[a.elemento][b.elemento];

  const introTone = pick(`${a.slug}-${b.slug}-intro`, [
    'Essa combinação reúne duas forças com estilos diferentes, mas potencial real de crescimento.',
    'Quando esses signos se encontram, a relação ganha aprendizados valiosos e muita evolução.',
    'A dinâmica entre esses signos pode ser surpreendente: há química, contraste e construção.'
  ]);

  const lovePositive = pick(`${a.slug}-${b.slug}-love-positive`, [
    `No amor, ${a.nome} e ${b.nome} podem construir uma conexão forte quando existe respeito ao tempo de cada um.`,
    `A relação amorosa tende a crescer com sinceridade, diálogo e espaço para amadurecimento emocional.`,
    `Existe potencial para um romance marcante, principalmente quando o casal escolhe parceria de verdade.`
  ]);

  const loveChallenge = pick(`${a.slug}-${b.slug}-love-challenge`, [
    `O maior desafio está em equilibrar expectativas e linguagem afetiva, sem jogos emocionais.`,
    `Conflitos aparecem quando um tenta impor ritmo ao outro; acordos claros evitam desgaste.`,
    `Ciúmes, orgulho ou silêncio podem pesar, então a comunicação precisa ser prioridade.`
  ]);

  const friendshipFlow = pick(`${a.slug}-${b.slug}-friendship`, [
    `Na amizade, essa dupla pode funcionar muito bem em momentos de apoio, diversão e troca honesta.`,
    `Como amigos, ${a.nome} e ${b.nome} tendem a se complementar, especialmente em fases de mudança.`,
    `A amizade ganha força quando ambos valorizam lealdade, escuta e flexibilidade.`
  ]);

  const workFlow = pick(`${a.slug}-${b.slug}-work`, [
    `No trabalho, a combinação rende quando metas estão claras e cada um ocupa o papel em que mais performa.`,
    `Profissionalmente, a parceria cresce com organização, confiança e divisão inteligente de tarefas.`,
    `A dupla pode entregar bons resultados quando transforma diferença de estilo em estratégia.`
  ]);

  const strengthList = [
    `Química de ${matrix.dinamica}.`,
    `Capacidade de aprender com os contrastes entre ${a.nome} e ${b.nome}.`,
    `Potencial para vínculo leal quando há transparência emocional.`,
    `Boa margem para evolução no amor, na amizade e na rotina do casal.`,
    `A soma entre ${a.pontosFortes[0]} e ${b.pontosFortes[0]} fortalece a parceria.`
  ];

  const challengeList = [
    `Diferenças entre ${a.desafios[0]} e ${b.desafios[0]} podem gerar ruídos.`,
    `Conflitos de ritmo entre ${a.modalidade.toLowerCase()} e ${b.modalidade.toLowerCase()} exigem negociação.`,
    `Excesso de cobrança diminui a leveza do vínculo.`,
    `Falta de comunicação direta pode ampliar mal-entendidos.`,
    `Rotina sem alinhamento emocional tende a desgastar a conexão.`
  ];

  const tips = [
    `Criem acordos claros sobre tempo, espaço e expectativas no relacionamento.`,
    `Valorizem o melhor de cada signo: ${a.nome} traz ${a.essencia} e ${b.nome} traz ${b.essencia}.`,
    `Evitem discussões no calor do momento; conversem com objetivo de construir.`,
    `Celebrem pequenas evoluções da relação para manter motivação mútua.`,
    `${a.dica} ${b.dica}`
  ];

  const loveScore = Math.round(score.amor);
  const friendshipScore = Math.round(score.amizade);
  const workScore = Math.round(score.trabalho);

  const title = `${a.nome} e ${b.nome} combinam? Amor e compatibilidade`;
  const description = `Descubra se ${a.nome} e ${b.nome} combinam no amor, amizade e trabalho.`;
  const h1 = `${a.nome} e ${b.nome}: combinação no amor, amizade e relacionamento`;
  const canonical = `https://www.aurorascorpio.com.br/${a.slug}-com-${b.slug}.html`;
  const relatedLinks = buildRelatedLinks(a, b);

  return `<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Aurora Scorpio" />
    <meta name="robots" content="index, follow" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${a.nome.toLowerCase()} e ${b.nome.toLowerCase()}, compatibilidade ${a.nome.toLowerCase()}, compatibilidade ${b.nome.toLowerCase()}, astrologia amor" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="/assets/images/aurora-scorpio-real.png" />
    <meta property="og:url" content="${canonical}" />

    <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
    <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/png" />
    <link rel="canonical" href="${canonical}" />

    <title>${title}</title>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L35SD7P8VS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-L35SD7P8VS');
    </script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9709698776174284" crossorigin="anonymous"></script>

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${h1}",
        "description": "${description}",
        "author": {"@type": "Person", "name": "Aurora Scorpio"},
        "publisher": {"@type": "Organization", "name": "Aurora Scorpio"},
        "inLanguage": "pt-BR",
        "mainEntityOfPage": "${canonical}",
        "datePublished": "2026-03-18",
        "dateModified": "2026-03-18"
      }
    </script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;500;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/css/signo.css" />
    <link rel="stylesheet" href="/assets/css/signo-tablet.css" />
    <link rel="stylesheet" href="/assets/css/signo-desktop.css" />
  </head>
  <body>
    <a href="#main-content" class="skip-link" title="Pular para o conteúdo principal" aria-label="Pular para o conteúdo principal">Pular para conteúdo principal</a>

    <div class="cosmic-bg">
      <header class="site-header">
        <div class="container text-center">
          <p class="mb-1 text-uppercase" style="letter-spacing: 2px; color: rgba(245, 245, 247, 0.85)">Mistérios do Zodíaco</p>
          <p class="logo">Aurora <span class="accent">Scorpio</span></p>
          <p class="site-subtitle">Astrologia Mística & Autoconhecimento</p>
        </div>
      </header>

      <nav class="cosmic-nav">
        <div class="container">
          <div class="d-flex justify-content-center flex-wrap py-2">
            <a class="nav-link-cosmic" href="/index.html"><i class="bi bi-house"></i> Início</a>
            <a class="nav-link-cosmic" href="/index.html#previsoes"><i class="bi bi-stars"></i> Previsões</a>
            <a class="nav-link-cosmic" href="/index.html#signos"><i class="bi bi-gem"></i> Signos</a>
            <a class="nav-link-cosmic" href="/index.html#posts-diarios"><i class="bi bi-calendar-week"></i> Posts Diários</a>
            <a class="nav-link-cosmic" href="/sobre.html"><i class="bi bi-person"></i> Sobre</a>
          </div>
        </div>
      </nav>

      <main class="container content-shell" id="main-content" tabindex="-1">
        <article>
          <header class="mystic-card featured-card p-4 p-lg-5 mb-4">
            <span class="hero-kicker">Compatibilidade Astral</span>
            <h1 class="mt-3 mb-3">${h1}</h1>
            <p class="hero-subtitle mb-4">
              ${a.nome} e ${b.nome} unem ${a.essencia} com ${b.essencia}. Esta análise mostra como a relação funciona no amor, amizade e trabalho.
            </p>
            <div class="d-flex flex-wrap gap-2">
              <span class="meta-chip"><i class="bi bi-heart-fill"></i> Amor: ${loveScore}/10</span>
              <span class="meta-chip"><i class="bi bi-people-fill"></i> Amizade: ${friendshipScore}/10</span>
              <span class="meta-chip"><i class="bi bi-briefcase-fill"></i> Trabalho: ${workScore}/10</span>
            </div>
          </header>

          <section class="mystic-card ad-shell p-4 mb-4" aria-label="Espaço publicitário no topo">
            <p class="small text-muted mb-3">Publicidade</p>
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9709698776174284" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="introducao">
            <h2 class="cosmic-title">1. Introdução</h2>
            <p>${introTone}</p>
            <p>${a.nome} é um signo de ${a.elemento.toLowerCase()} com forte tendência a ${a.essencia}, enquanto ${b.nome} expressa ${b.essencia}. A dinâmica geral costuma trazer ${matrix.dinamica}.</p>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="amor">
            <h2 class="cosmic-title">2. Compatibilidade no amor ❤️</h2>
            <p>${lovePositive}</p>
            <p>${loveChallenge}</p>
            <ul class="mystic-list">
              <li><strong>Como funciona:</strong> ${a.nome} ${a.amor} e ${b.nome} ${b.amor}.</li>
              <li><strong>Pontos positivos:</strong> conexão, admiração e potencial de crescimento mútuo.</li>
              <li><strong>Desafios:</strong> alinhar ritmo, limites e expectativas afetivas.</li>
            </ul>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="amizade">
            <h2 class="cosmic-title">3. Compatibilidade na amizade 🤝</h2>
            <p>${friendshipFlow}</p>
            <p>Na prática, ${a.nome} ${a.amizade}, enquanto ${b.nome} ${b.amizade}. Essa combinação tende a criar uma amizade de suporte real quando existe respeito pelas diferenças.</p>
          </section>

          <section class="mystic-card ad-shell p-4 mb-4" aria-label="Espaço publicitário no meio">
            <p class="small text-muted mb-3">Publicidade</p>
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9709698776174284" data-ad-slot="1234567891" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="trabalho">
            <h2 class="cosmic-title">4. Compatibilidade no trabalho 💼</h2>
            <p>${workFlow}</p>
            <p>${a.nome} ${a.trabalho}. Já ${b.nome} ${b.trabalho}. Em projetos conjuntos, a dupla pode crescer muito com metas claras e comunicação objetiva.</p>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="pontos-fortes">
            <h2 class="cosmic-title">5. Pontos fortes da relação</h2>
            <ul class="mystic-list">
              ${strengthList.map((item) => `<li>${item}</li>`).join('\n              ')}
            </ul>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="desafios-casal">
            <h2 class="cosmic-title">6. Desafios do casal</h2>
            <ul class="mystic-list">
              ${challengeList.map((item) => `<li>${item}</li>`).join('\n              ')}
            </ul>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="dicas">
            <h2 class="cosmic-title">7. Dicas para dar certo</h2>
            <ul class="mystic-list">
              ${tips.map((item) => `<li>${item}</li>`).join('\n              ')}
            </ul>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="compatibilidade-geral">
            <h2 class="cosmic-title">8. Compatibilidade geral (nota de 0 a 10)</h2>
            <p><strong>Amor:</strong> ${loveScore}/10</p>
            <p><strong>Amizade:</strong> ${friendshipScore}/10</p>
            <p><strong>Trabalho:</strong> ${workScore}/10</p>
            <p><strong>Nota geral:</strong> ${score.geral}/10</p>
            <p>
              A combinação ${a.nome} + ${b.nome} tem potencial para funcionar muito bem com maturidade,
              comunicação e disposição para evoluir juntos.
            </p>
          </section>

          <section class="mystic-card p-4 p-lg-5 mb-4" id="interlinking">
            <h2 class="cosmic-title">Veja também outros signos</h2>
            <div class="d-flex flex-wrap gap-2">
              ${relatedLinks}
            </div>
            <p class="mt-3 mb-0">
              Explore também: <a href="/${a.slug}-com-${b.slug}.html">${a.nome} com ${b.nome}</a>,
              <a href="/${b.slug}-com-${a.slug}.html">${b.nome} com ${a.nome}</a> e
              outras combinações no portal Aurora Scorpio.
            </p>
          </section>

          <section class="mystic-card ad-shell p-4 mb-4" aria-label="Espaço publicitário no final">
            <p class="small text-muted mb-3">Publicidade</p>
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9709698776174284" data-ad-slot="1234567892" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </section>
        </article>
      </main>

      <footer class="mystic-footer mt-5">
        <div class="container position-relative" style="z-index: 2">
          <div class="row text-center text-md-start">
            <div class="col-md-4 mb-4">
              <h4 style="font-family: 'Cinzel', serif; color: var(--soft-gold)">Aurora Scorpio</h4>
              <p style="opacity: 0.9">Astrologia, espiritualidade e autoconhecimento através de uma linguagem mística e acolhedora.</p>
            </div>
            <div class="col-md-4 mb-4">
              <h4 style="color: var(--soft-gold)">Navegação</h4>
              <ul class="list-unstyled">
                <li><a href="/index.html" style="color: var(--moon-white); text-decoration: none">Início</a></li>
                <li><a href="/index.html#previsoes" style="color: var(--moon-white); text-decoration: none">Previsões</a></li>
                <li><a href="/index.html#signos" style="color: var(--moon-white); text-decoration: none">Signos</a></li>
                <li><a href="/index.html#posts-diarios" style="color: var(--moon-white); text-decoration: none">Posts Diários</a></li>
              </ul>
            </div>
            <div class="col-md-4 mb-4">
              <h4 style="color: var(--soft-gold)">Comunidade</h4>
              <ul class="list-unstyled">
                <li><a href="https://instagram.com/aurorascorpio" target="_blank" rel="noopener noreferrer" style="color: var(--moon-white); text-decoration: none"><i class="bi bi-instagram"></i> @aurorascorpio</a></li>
                <li><a href="https://www.youtube.com/@aurorascorpio" target="_blank" rel="noopener noreferrer" style="color: var(--moon-white); text-decoration: none"><i class="bi bi-youtube"></i> Aurora Scorpio</a></li>
                <li><a href="https://t.me/aurorascorpio" target="_blank" rel="noopener noreferrer" style="color: var(--moon-white); text-decoration: none"><i class="bi bi-telegram"></i> Telegram</a></li>
              </ul>
            </div>
          </div>
          <div class="text-center mt-4 pt-3 border-top border-secondary">
            <p class="mb-1">© 2026 Mistérios do Zodíaco by Aurora Scorpio. Todos os direitos reservados.</p>
            <p class="small" style="color: var(--lavender-mystic)">Desenvolvimento realizado pela koddahub.com.br</p>
          </div>
        </div>
      </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>`;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function run() {
  ensureDir(DATA_DIR);

  const scoreIndex = {};
  let pageCount = 0;

  SIGNS.forEach((signA) => {
    SIGNS.forEach((signB) => {
      const fileName = `${signA.slug}-com-${signB.slug}.html`;
      const outputPath = path.join(OUTPUT_DIR, fileName);
      const html = renderPage(signA, signB);
      const score = scorePair(signA, signB);

      fs.writeFileSync(outputPath, html, 'utf8');
      scoreIndex[`${signA.slug}-com-${signB.slug}`] = score;
      pageCount += 1;
    });
  });

  fs.writeFileSync(SCORE_FILE, JSON.stringify(scoreIndex, null, 2), 'utf8');

  console.log(`✅ ${pageCount} páginas de compatibilidade geradas em ${OUTPUT_DIR}`);
  console.log(`📊 Scores salvos em ${SCORE_FILE}`);
}

run();
