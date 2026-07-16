/**
 * Página de obrigado: preenche os textos a partir do content.js (fonte única
 * de copy — o link do grupo continua definido só em content.ctaHref) e
 * redireciona automático pro grupo após alguns segundos, com botão manual
 * como fallback. O pageview desta página é o gatilho de conversão no GTM.
 */

(function () {
  // "content" é const de escopo global (script clássico) — não vira window.content.
  if (typeof content === "undefined") return;

  var page = content.obrigadoPage || {};
  var groupUrl = content.ctaHref;

  var headline = document.getElementById("ob-headline");
  var subline = document.getElementById("ob-subline");
  var loading = document.getElementById("ob-loading");
  var manual = document.getElementById("ob-manual");

  if (headline && page.headline) headline.textContent = page.headline;
  if (subline && page.subline) subline.textContent = page.subline;
  if (loading && page.loadingText) loading.textContent = page.loadingText;
  if (manual) {
    if (page.manualCtaText) manual.textContent = page.manualCtaText;
    manual.setAttribute("href", groupUrl);
  }
  if (page.title) document.title = page.title;

  var seconds = typeof page.redirectSeconds === "number" ? page.redirectSeconds : 4;
  // Sincroniza a barra de progresso determinística com o tempo real até o
  // redirect (a animação CSS usa var(--ob-redirect); fallback 4000ms).
  document.documentElement.style.setProperty("--ob-redirect", seconds * 1000 + "ms");
  setTimeout(function () {
    window.location.href = groupUrl;
  }, seconds * 1000);
})();
