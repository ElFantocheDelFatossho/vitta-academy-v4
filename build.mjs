/**
 * Build da V4 (PageSpeed): injeta no index.html, entre marcadores,
 *  1. o CSS crítico inline (css/tailwind.css + css/styles.css minificado) —
 *     remove ~1s de render-block de 2 viagens de rede no 4G lento;
 *  2. o herói estático (partials/hero-static.html) dentro de #root —
 *     o LCP pinta sem esperar content.js/render.js (o render.js sobrescreve
 *     o #root ao rodar, com markup idêntico).
 *
 * QUANDO RODAR: depois de QUALQUER edição em css/*.css (lembrando que o
 * tailwind.css em si é gerado por: npx tailwindcss@3 -i tailwind-input.css
 * -o css/tailwind.css --minify) ou no herói (regenerar partials/hero-static:
 * abrir a página local e copiar document.querySelector('header').outerHTML).
 *
 * Uso: node build.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const INDEX = 'index.html';

// Minificação simples e segura de CSS (comentários + espaço estrutural).
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function inject(html, startMark, endMark, payload, label) {
  const start = html.indexOf(startMark);
  const end = html.indexOf(endMark);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Marcadores de ${label} não encontrados no ${INDEX}.`);
  }
  return html.slice(0, start + startMark.length) + '\n' + payload + '\n' + html.slice(end);
}

let html = readFileSync(INDEX, 'utf8');

const tailwind = readFileSync('css/tailwind.css', 'utf8').trim();
const styles = minifyCss(readFileSync('css/styles.css', 'utf8'));
const css = `<style id="critical-css">${tailwind}\n${styles}</style>`;
html = inject(html, '<!-- BUILD:CRITICAL-CSS-START -->', '<!-- BUILD:CRITICAL-CSS-END -->', css, 'CSS crítico');

const hero = readFileSync('partials/hero-static.html', 'utf8').trim();
html = inject(html, '<!-- BUILD:HERO-STATIC-START -->', '<!-- BUILD:HERO-STATIC-END -->', hero, 'herói estático');

writeFileSync(INDEX, html);
console.log(`OK: CSS crítico ${(css.length / 1024).toFixed(1)}KB + herói ${(hero.length / 1024).toFixed(1)}KB inlined em ${INDEX}.`);
