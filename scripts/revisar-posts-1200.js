#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BASE_DIR = '/storage/disk1/projects/projeto-blogs/blog-astrologia/posts';
const MIN_CHARS = 1200;
const MARKER = '<!-- complemento-conteudo-1200 -->';

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(filePath, out);
    } else if (entry.isFile()) {
      out.push(filePath);
    }
  }
  return out;
}

function isRedirectHtml(content) {
  return /http-equiv\s*=\s*"refresh"/i.test(content) || /location\.replace\(/i.test(content);
}

function applyWordMap(text) {
  const map = [
    ['Astrologia Mistica', 'Astrologia Mística'],
    ['Misterios', 'Mistérios'],
    ['Zodiaco', 'Zodíaco'],
    ['Inicio', 'Início'],
    ['Previsoes', 'Previsões'],
    ['Posts Diarios', 'Posts Diários'],
    ['Mercurio', 'Mercúrio'],
    ['Jupiter', 'Júpiter'],
    ['Plutao', 'Plutão'],
    ['Saturno', 'Saturno'],
    ['Netuno', 'Netuno'],
    ['Cancer', 'Câncer'],
    ['Leao', 'Leão'],
    ['Escorpiao', 'Escorpião'],
    ['Sagitario', 'Sagitário'],
    ['Capricornio', 'Capricórnio'],
    ['Aquario', 'Aquário'],
    ['intuicao', 'intuição'],
    ['intuicao.', 'intuição.'],
    ['emocao', 'emoção'],
    ['consciencia', 'consciência'],
    ['intencao', 'intenção'],
    ['respiracoes', 'respirações'],
    ['percepcao', 'percepção'],
    ['proposito', 'propósito'],
    ['relacoes', 'relações'],
    ['equilibrio', 'equilíbrio'],
    ['possivel', 'possível'],
    ['ceu', 'céu'],
    ['Mistica', 'Mística'],
    ['autoconhecimento', 'autoconhecimento']
  ];

  let out = text;
  for (const [from, to] of map) {
    out = out.replace(new RegExp(from, 'g'), to);
  }

  // Correções de espaços duplos acidentais em texto corrido.
  out = out.replace(/\s{2,}/g, ' ');
  return out;
}

function fixTextNodes(html) {
  const tagRegex = /(<[^>]+>)/g;
  const parts = html.split(tagRegex);
  let inScript = false;
  let inStyle = false;

  for (let i = 0; i < parts.length; i += 1) {
    const token = parts[i];

    if (token.startsWith('<')) {
      const lower = token.toLowerCase();
      if (lower.startsWith('<script')) inScript = true;
      if (lower.startsWith('</script')) inScript = false;
      if (lower.startsWith('<style')) inStyle = true;
      if (lower.startsWith('</style')) inStyle = false;
      continue;
    }

    if (!inScript && !inStyle) {
      parts[i] = applyWordMap(token);
    }
  }

  return parts.join('');
}

function findPostContentRange(html) {
  const openMatch = html.match(/<div[^>]*class="[^"]*post-content[^"]*"[^>]*>/i);
  if (!openMatch || openMatch.index === undefined) {
    return null;
  }

  const openStart = openMatch.index;
  const openTag = openMatch[0];
  const openEnd = openStart + openTag.length;

  let depth = 1;
  let cursor = openEnd;

  while (cursor < html.length) {
    const nextOpen = html.indexOf('<div', cursor);
    const nextClose = html.indexOf('</div', cursor);

    if (nextClose === -1) {
      return null;
    }

    if (nextOpen !== -1 && nextOpen < nextClose) {
      const openTagEnd = html.indexOf('>', nextOpen);
      if (openTagEnd === -1) return null;
      depth += 1;
      cursor = openTagEnd + 1;
    } else {
      const closeTagEnd = html.indexOf('>', nextClose);
      if (closeTagEnd === -1) return null;
      depth -= 1;
      if (depth === 0) {
        return {
          openStart,
          openEnd,
          closeStart: nextClose,
          closeEnd: closeTagEnd + 1
        };
      }
      cursor = closeTagEnd + 1;
    }
  }

  return null;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(html, regex, fallback) {
  const m = html.match(regex);
  if (!m || !m[1]) return fallback;
  return m[1].replace(/<[^>]+>/g, '').trim();
}

function makeComplement(lua, sol, neededChars) {
  const blocks = [
    `<h2>Direcionamento prático do dia</h2>
<p>A combinação de Lua em ${lua} com Sol em ${sol} pede presença, discernimento e constância. Em vez de tentar resolver tudo de uma vez, organize o dia em três prioridades simples: o que precisa ser concluído, o que pode ser ajustado e o que merece ser encerrado com serenidade. Essa postura diminui ansiedade, melhora decisões e transforma a energia astrológica em ação concreta.</p>`,
    `<p>Nas relações, o convite é escutar antes de reagir. Uma conversa objetiva, com respeito e verdade, pode evitar ruídos e abrir espaço para acordos mais maduros. No trabalho e nos estudos, favoreça tarefas que exigem foco e planejamento, sem perfeccionismo excessivo. Lembre-se: pequenos avanços consistentes sustentam resultados maiores do que movimentos impulsivos.</p>`,
    `<p>Para fechar o dia com equilíbrio, reserve alguns minutos para revisar aprendizados, agradecer o que funcionou e redefinir a intenção para amanhã. Quando você une consciência emocional com atitude prática, o céu deixa de ser apenas inspiração e se torna direção de vida.</p>`
  ];

  let out = `${MARKER}\n`;
  let idx = 0;
  while (stripHtml(out).length < neededChars + 100 && idx < blocks.length) {
    out += `${blocks[idx]}\n`;
    idx += 1;
  }

  return out;
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  if (isRedirectHtml(html)) {
    return { changed: false, skippedRedirect: true, chars: 0, complemented: false };
  }

  const before = html;
  html = fixTextNodes(html);

  const range = findPostContentRange(html);
  if (!range) {
    if (html !== before) {
      fs.writeFileSync(filePath, html, 'utf8');
      return { changed: true, skippedRedirect: false, chars: 0, complemented: false };
    }
    return { changed: false, skippedRedirect: false, chars: 0, complemented: false };
  }

  const contentHtml = html.slice(range.openEnd, range.closeStart);
  const contentChars = stripHtml(contentHtml).length;

  let complemented = false;
  if (contentChars < MIN_CHARS && !contentHtml.includes(MARKER)) {
    const lua = firstMatch(html, /Lua em\s*([^<\n\.]+)/i, 'equilíbrio');
    const sol = firstMatch(html, /Sol em\s*([^<\n\.]+)/i, 'clareza');
    const complement = makeComplement(lua, sol, MIN_CHARS - contentChars);

    const updatedContent = `${contentHtml}\n${complement}`;
    html = `${html.slice(0, range.openEnd)}${updatedContent}${html.slice(range.closeStart)}`;
    complemented = true;
  }

  if (html !== before) {
    fs.writeFileSync(filePath, html, 'utf8');
    const newRange = findPostContentRange(html);
    const newChars = newRange
      ? stripHtml(html.slice(newRange.openEnd, newRange.closeStart)).length
      : contentChars;
    return { changed: true, skippedRedirect: false, chars: newChars, complemented };
  }

  return { changed: false, skippedRedirect: false, chars: contentChars, complemented: false };
}

function run() {
  const files = walk(BASE_DIR)
    .filter((filePath) => /\/diario-.*\.html$/i.test(filePath))
    .sort();

  let changed = 0;
  let redirected = 0;
  let complemented = 0;
  let processed = 0;
  let belowMinAfter = 0;

  for (const filePath of files) {
    const result = processFile(filePath);

    if (result.skippedRedirect) {
      redirected += 1;
      continue;
    }

    processed += 1;
    if (result.changed) changed += 1;
    if (result.complemented) complemented += 1;
    if (result.chars > 0 && result.chars < MIN_CHARS) belowMinAfter += 1;
  }

  console.log('✅ Revisão concluída');
  console.log(`Arquivos diário encontrados: ${files.length}`);
  console.log(`Redirecionamentos ignorados: ${redirected}`);
  console.log(`Posts processados: ${processed}`);
  console.log(`Arquivos alterados: ${changed}`);
  console.log(`Complementos adicionados (< ${MIN_CHARS} chars): ${complemented}`);
  console.log(`Ainda abaixo de ${MIN_CHARS} chars: ${belowMinAfter}`);
}

run();
