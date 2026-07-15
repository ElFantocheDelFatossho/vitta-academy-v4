const root = document.getElementById("root");

const el = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

/* ---------- ícones inline (stroke herda currentColor) ---------- */
const ICONS = {
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  screen:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  lock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
  trending:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  battery:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="17" height="9" rx="2"/><path d="M22 11v3M6 11.5v2M10 11.5v2M14 11.5v2"/></svg>',
  chevron:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  user:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
};

const WHATSAPP_ICON =
  '<svg class="w-5 h-5 mr-2.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.42a9.87 9.87 0 004.63 1.18h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7-1.87-1.87-4.35-2.86-6.99-2.86zm0 18.02h-.01a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 01-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.42 5.83c0 4.55-3.7 8.18-8.27 8.18zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>';

function icon(name, cls) {
  return `<span class="${cls || "w-5 h-5"} inline-block" aria-hidden="true">${ICONS[name] || ""}</span>`;
}

function ctaButton(text, extraClass, padYOverride) {
  const style = padYOverride ? ` style="padding-top:${padYOverride};padding-bottom:${padYOverride};"` : "";
  return `
    <a href="${content.ctaHref}" target="_blank" rel="noopener noreferrer"${style}
      class="cta-btn group inline-flex items-center justify-center px-7 ${padYOverride ? "" : "py-4"} md:px-9 rounded-xl font-sans font-bold text-[13px] md:text-[15px] tracking-wide uppercase ${extraClass || ""}">
      ${WHATSAPP_ICON}${text}
    </a>
  `;
}

function trustLine(cls, marginTopOverride) {
  const style = marginTopOverride ? ` style="margin-top:${marginTopOverride};"` : "";
  return `<p class="text-[11px] md:text-xs ${cls || "text-v4-muted"} tracking-wide ${marginTopOverride ? "" : "mt-3"}"${style}>${content.trustLine}</p>`;
}

function countdown(idPrefix, compact) {
  const units = [
    { key: "d", label: "dias" },
    { key: "h", label: "horas" },
    { key: "m", label: "min" },
    { key: "s", label: "seg" },
  ];
  const chips = units
    .map(
      (u) => `
      <div class="count-chip flex flex-col items-center min-w-[40px] sm:min-w-[64px] px-1.5 sm:px-3 ${compact ? "py-1.5" : "py-1.5 sm:py-2.5"}">
        <span id="${idPrefix}-${u.key}" class="count-num font-display font-semibold ${compact ? "text-lg" : "text-base sm:text-2xl md:text-3xl"}">--</span>
        <span class="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-v4-muted">${u.label}</span>
      </div>`
    )
    .join("");
  return `<div class="flex items-center justify-center gap-1 sm:gap-2 md:gap-3" data-countdown="${idPrefix}">${chips}</div>`;
}

/* ---------- Tela 1 — Hero (grid assimétrico premium) ---------- */
function renderSection1() {
  const { section1, event } = content;
  const sp = section1.speaker;
  return el(`
    <header class="hero bg-v4-ink" aria-label="Além dos Plantões — aula ao vivo para médicos">

      <!-- Faixa de topo: só no desktop/tablet. No mobile o selo vira parte da foto (ver abaixo). -->
      <div class="no-defer hidden md:block relative z-20 px-5 sm:px-8 lg:px-12 xl:px-16 pt-4 pb-3 md:pt-6">
        <p class="hero-eyebrow !text-[10px] md:!text-[11px]">${event.audienceLabel}</p>
      </div>

      <!-- FOTO MOBILE — altura em clamp(vh): encolhe suavemente em telas curtas
           (barra de navegador real come espaço) sem quebrar em telas altas. -->
      <div class="md:hidden relative w-full overflow-hidden" style="height:clamp(180px,40vh,340px);">
        <picture>
          <source srcset="${sp.heroPhotoMobile}.webp" type="image/webp" />
          <img src="${sp.heroPhotoMobile}.jpg" fetchpriority="high" decoding="async"
            class="w-full h-full object-cover"
            style="object-position:center 78%;"
            alt="${sp.name}, especialista em restauração capilar" />
        </picture>
        <!-- Sombra só na faixa final (blend com o painel) — não cobre mais o rosto -->
        <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-v4-ink to-transparent pointer-events-none"></div>

        <!-- Selo "Exclusivo para médicos" sobreposto no topo da própria foto -->
        <p class="no-defer hero-eyebrow !text-[10px] absolute left-5 z-10" style="top:clamp(10px,2vh,20px);">${event.audienceLabel}</p>

        <!-- Headline ocupa a faixa vazia à esquerda da foto (sem invadir o rosto), letra maior -->
        <h1 class="no-defer absolute inset-y-0 left-0 z-10 flex items-center
          font-display font-bold text-v4-text pl-5 pr-2"
          style="font-size:clamp(22px,7.2vw,32px);line-height:1.08;letter-spacing:-0.015em;max-width:48%;text-shadow:0 2px 14px rgba(0,0,0,.65);">
          ${section1.headline.split("\n").join("<br />")}
        </h1>
      </div>

      <div class="hero-grid max-w-[1440px] mx-auto relative">

        <!-- PAINEL DE TEXTO — no mobile o h1 já está sobre a foto, então o
             painel só respira normalmente a partir daqui (sem overlap). Espaços
             em clamp(vh) para comprimir suavemente em telas curtas. -->
        <div class="hero-panel px-5 sm:px-8 lg:px-12 xl:px-16 md:pt-6 md:pb-10 lg:pt-8 lg:pb-16 relative z-20"
          style="padding-top:clamp(10px,3vh,28px);padding-bottom:clamp(16px,4vh,40px);">
          <h1 class="no-defer hidden md:block font-display font-semibold text-v4-text mb-3 md:mb-5"
            style="font-size:clamp(26px,7vw,52px);line-height:1.08;letter-spacing:-0.02em;">
            ${section1.headline.split("\n").join("<br />")}
          </h1>

          <p class="no-defer font-display text-[16px] sm:text-[17px] lg:text-[20px] leading-[1.4] text-v4-muted max-w-lg"
            style="margin-bottom:clamp(8px,2.5vh,24px);">
            ${section1.subtitle} <span class="text-gold">${section1.subtitleAccent}</span>
          </p>

          <p class="no-defer hidden lg:block text-v4-muted text-[15px] leading-relaxed mb-7 max-w-lg">${section1.subheadline}</p>

          <div class="no-defer hero-meta" style="margin-bottom:clamp(8px,2.5vh,24px);">
            <span class="hero-meta-item">${icon("calendar", "w-[16px] h-[16px]")}<span class="text-[13px] md:text-sm">${event.dateLong} · ${event.time}</span></span>
            <span class="hero-meta-sep hidden sm:block"></span>
            <span class="hero-meta-item">${icon("screen", "w-[16px] h-[16px]")}<span class="text-[13px] md:text-sm">${event.format}</span></span>
          </div>

          <!-- Countdown mobile: compacto, ID próprio (o JS varre [data-countdown]) -->
          <div class="no-defer md:hidden" style="margin-bottom:clamp(8px,2.5vh,24px);">${countdown("cd-hero-mob", true)}</div>

          <div class="no-defer flex flex-col items-stretch sm:items-start">
            ${ctaButton(section1.ctaText, "w-full sm:w-auto !text-[14px] md:!text-[15px]", "clamp(10px,1.8vh,16px)")}
            ${trustLine("text-v4-muted", "clamp(6px,1vh,12px)")}
          </div>

          <div class="no-defer mt-8 hidden md:block">${countdown("cd-hero-desk", false)}</div>
        </div>

        <!-- FOTO (tablet/desktop) -->
        <div class="hero-media hidden md:block">
          <picture>
            <source media="(max-width: 1279px)" srcset="${sp.heroPhotoMobile}.webp" type="image/webp" />
            <source media="(max-width: 1279px)" srcset="${sp.heroPhotoMobile}.jpg" type="image/jpeg" />
            <source srcset="${sp.heroPhoto}.webp" type="image/webp" />
            <img src="${sp.heroPhoto}.jpg" width="950" height="900" fetchpriority="high" decoding="async"
              alt="${sp.name}, especialista em restauração capilar, retratado no consultório e em cirurgia de transplante capilar" />
          </picture>
          <div class="no-defer hero-nameplate">
            <span class="w-2 h-2 rounded-full bg-v4-gold shrink-0"></span>
            <div>
              <p class="font-display font-semibold text-v4-text text-sm leading-none">${sp.name}</p>
              <p class="text-[11px] text-v4-gold mt-1 tracking-wide">${sp.credentials}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  `);
}

/* ---------- Tela 2 — O Custo Invisível ---------- */
function renderSection2() {
  const { section2 } = content;
  return el(`
    <section class="relative grain bg-v4-plum pt-16 pb-6 md:pt-24 md:pb-14 px-6 md:px-8 overflow-hidden" aria-label="O custo invisível dos plantões">
      <div class="max-w-5xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h2 class="reveal font-display font-semibold leading-[1.18] text-v4-text mb-6" style="font-size:clamp(26px,3.05vw + 14.6px,38px);">“${section2.headline}”</h2>
            <p class="reveal text-v4-muted leading-relaxed mb-5">${section2.intro}</p>
            <p class="reveal text-v4-muted leading-relaxed">${section2.body}</p>
          </div>
          <div class="reveal flex justify-center">
            <div class="phone-frame p-5" style="width:clamp(200px,11.97vw + 164px,256px);">
              <div class="flex items-center gap-2 pb-3 mb-3 border-b border-white/5">
                <span class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-v4-text">F</span>
                <div>
                  <p class="text-[11px] font-semibold text-v4-text leading-none">Família ❤</p>
                  <p class="text-[9px] text-v4-muted mt-0.5">hoje às 19:47</p>
                </div>
              </div>
              <div class="float-notif flex justify-end">
                <div class="chat-bubble-out px-4 py-2.5 max-w-[85%]">
                  <p class="text-[13px] leading-snug">${section2.whatsappMockup.message}</p>
                  <p class="text-[9px] text-right opacity-60 mt-1">19:47 ✓✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <blockquote class="reveal max-w-3xl mx-auto mt-12 border-l-2 border-v4-gold pl-5 md:pl-6">
          <p class="font-display text-lg md:text-2xl text-v4-text leading-snug">${section2.impactLine}</p>
        </blockquote>
      </div>
    </section>
  `);
}

/* ---------- Tela 3 — O Xeque-Mate do Tempo ---------- */
function renderSection3() {
  const { section3 } = content;
  return el(`
    <section class="relative grain bg-v4-ink pt-6 pb-16 md:pt-14 md:pb-24 px-6 md:px-8 overflow-hidden" aria-label="O impacto do tempo">
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <div class="reveal mb-8">
          <svg width="104" height="104" viewBox="0 0 100 100" class="mx-auto" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#2A3242" stroke-width="2"></circle>
            <line x1="50" y1="12" x2="50" y2="18" stroke="#2A3242" stroke-width="2"></line>
            <line x1="50" y1="82" x2="50" y2="88" stroke="#2A3242" stroke-width="2"></line>
            <line x1="12" y1="50" x2="18" y2="50" stroke="#2A3242" stroke-width="2"></line>
            <line x1="82" y1="50" x2="88" y2="50" stroke="#2A3242" stroke-width="2"></line>
            <line x1="50" y1="50" x2="50" y2="32" stroke="#EDEFF4" stroke-width="2.5" stroke-linecap="round" class="clock-hand clock-hand-hour"></line>
            <line x1="50" y1="50" x2="50" y2="20" stroke="#EDEFF4" stroke-width="2" stroke-linecap="round" class="clock-hand clock-hand-min"></line>
            <circle cx="50" cy="50" r="2.5" fill="#C9A667"></circle>
          </svg>
        </div>
        <h2 class="reveal font-display font-semibold leading-[1.15] text-v4-text mb-6 text-balance" style="font-size:clamp(26px,3.56vw + 12.6px,40px);">${section3.headline}</h2>
        <p class="reveal text-v4-muted leading-relaxed max-w-xl mx-auto mb-10">${section3.body}</p>
        <blockquote class="reveal border-l-2 border-v4-gold pl-5 md:pl-6 text-left max-w-xl mx-auto mb-8">
          <p class="font-display italic leading-[1.35] text-v4-text" style="font-size:clamp(20px,2.04vw + 12.4px,28px);">“${section3.quote}”</p>
        </blockquote>
        <p class="reveal text-v4-muted italic mb-12">${section3.closing}</p>

        <div class="reveal rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-7 md:px-10 md:py-8">
          <p class="font-display text-lg md:text-xl text-v4-text mb-5">${content.midCta.text}</p>
          ${ctaButton(content.midCta.ctaText, "w-full sm:w-auto")}
          ${trustLine("text-v4-muted")}
        </div>
      </div>
    </section>
  `);
}

/* ---------- Tela 4 — Ponto de Virada + Autoridade ---------- */
function renderSection4() {
  const { section4 } = content;
  return el(`
    <section class="relative bg-v4-paper pt-6 pb-10 md:pt-10 md:pb-14 px-6 md:px-8" aria-label="O ponto de virada">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="reveal font-display font-semibold leading-[1.15] text-v4-navy mb-6 text-balance" style="font-size:clamp(26px,3.56vw + 12.6px,40px);">${section4.headline}</h2>
        <p class="reveal text-v4-paper-muted leading-relaxed max-w-xl mx-auto">${section4.body}</p>
      </div>

      <article class="reveal max-w-3xl mx-auto mt-12 bg-white rounded-3xl border border-v4-navy/10 shadow-xl p-7 md:p-10">
        <div class="flex flex-col md:flex-row gap-7 md:gap-8 items-center md:items-start">
          <picture class="aspect-[2/3] rounded-2xl overflow-hidden border border-v4-navy/15 shrink-0 block" style="width:clamp(160px,8.14vw + 129.5px,192px);">
            <source srcset="${section4.authority.photo}.webp" type="image/webp" />
            <img src="${section4.authority.photo}.jpg" alt="${section4.authority.name}" loading="lazy" decoding="async"
              class="w-full h-full object-cover object-top" />
          </picture>
          <div class="text-center md:text-left">
            <p class="font-display font-semibold text-xl text-v4-navy">${section4.authority.name}</p>
            <p class="text-sm text-v4-gold font-medium mb-1">${section4.authority.credentials}</p>
            <p class="text-xs text-v4-paper-muted mb-4">${section4.authority.bioLine}</p>
            <blockquote class="border-l-2 border-v4-navy/20 pl-4 text-left">
              <p class="text-v4-navy-2 italic leading-relaxed text-[15px]">“${section4.authority.quote}”</p>
            </blockquote>
          </div>
        </div>
      </article>
    </section>
  `);
}

/* ---------- Tela 4.5 — Para quem é esta aula ---------- */
function renderAudienceFit() {
  const { audienceFit } = content;
  const cards = audienceFit.items
    .map(
      (item) => `
      <div class="reveal bg-white rounded-2xl border border-v4-navy/10 shadow-sm p-6 md:p-7">
        <span class="inline-flex w-10 h-10 rounded-xl bg-v4-navy/8 text-v4-navy items-center justify-center mb-4">${icon("user", "w-5 h-5")}</span>
        <p class="font-display font-semibold text-v4-navy text-lg mb-2">${item.title}</p>
        <p class="text-v4-paper-muted text-sm leading-relaxed">${item.description}</p>
      </div>`
    )
    .join("");

  return el(`
    <section class="bg-v4-paper pt-14 pb-14 md:pt-20 md:pb-20 px-6 md:px-8" aria-label="Para quem é esta aula">
      <div class="max-w-5xl mx-auto">
        <h2 class="reveal font-display font-semibold leading-[1.2] text-v4-navy text-center mb-10 max-w-2xl mx-auto text-balance" style="font-size:clamp(24px,2.04vw + 16.4px,32px);">${audienceFit.title}</h2>
        <div class="grid md:grid-cols-3 gap-5 md:gap-6">${cards}</div>
      </div>
    </section>
  `);
}

/* ---------- Tela 5 — Nova Realidade + logística ---------- */
function renderPillar(pillar) {
  return `
    <div class="reveal bg-white rounded-2xl border border-v4-navy/10 shadow-sm p-6 md:p-7">
      <span class="inline-flex w-10 h-10 rounded-xl bg-v4-navy/8 text-v4-navy items-center justify-center mb-4">${icon(pillar.icon, "w-5 h-5")}</span>
      <p class="font-display font-semibold text-v4-navy text-lg mb-2">${pillar.title}</p>
      <p class="text-v4-paper-muted text-sm leading-relaxed">${pillar.description}</p>
    </div>
  `;
}

function renderSection5() {
  const { section5 } = content;
  const pillars = section5.pillars.map(renderPillar).join("");
  const eventItems = section5.eventCard.items
    .map(
      (item) => `
      <li class="flex items-start gap-3">
        <span class="inline-flex w-9 h-9 rounded-lg bg-white/10 text-white/85 items-center justify-center shrink-0 mt-0.5">${icon(item.icon, "w-[18px] h-[18px]")}</span>
        <div>
          <p class="text-[11px] uppercase tracking-[0.15em] text-white/50">${item.label}</p>
          <p class="text-[15px] font-semibold text-white">${item.value}</p>
        </div>
      </li>`
    )
    .join("");

  return el(`
    <section class="bg-v4-paper py-14 md:py-20 px-6 md:px-8" aria-label="A nova realidade e detalhes da aula">
      <div class="max-w-5xl mx-auto">
        <h2 class="reveal font-display font-semibold leading-[1.15] text-v4-navy text-center mb-10 text-balance" style="font-size:clamp(26px,3.05vw + 14.6px,38px);">${section5.title}</h2>
        <div class="grid md:grid-cols-3 gap-5 md:gap-6 mb-14">${pillars}</div>

        <div class="reveal rounded-3xl bg-v4-navy text-white p-7 md:p-10 shadow-2xl overflow-hidden relative">
          <div class="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center relative z-10">
            <div>
              <p class="text-v4-gold font-semibold uppercase tracking-[0.18em] text-xs mb-4">${section5.eventCard.title}</p>
              <ul class="space-y-4">${eventItems}</ul>
              <p class="text-white/60 text-xs mt-5">${section5.eventCard.note}</p>
            </div>
            <div class="text-center">
              <div class="mb-5">${countdown("cd-card", false)}</div>
              ${ctaButton(section5.ctaText, "w-full")}
              ${trustLine("text-white/50")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `);
}

/* ---------- Tela 6 — CTA Final + FAQ ---------- */
function renderFaqItem(item, index) {
  return `
    <div data-faq-item class="border-b border-white/10">
      <button type="button" data-faq-btn aria-expanded="false" aria-controls="faq-panel-${index}"
        class="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span class="font-semibold text-[15px] md:text-base text-white">${item.question}</span>
        <span class="faq-chevron w-5 h-5 text-v4-gold shrink-0">${ICONS.chevron}</span>
      </button>
      <div class="faq-panel-wrap" id="faq-panel-${index}">
        <div class="faq-panel-inner">
          <p class="text-white/65 text-sm leading-relaxed pb-5 pr-8">${item.answer}</p>
        </div>
      </div>
    </div>
  `;
}

function renderSection6() {
  const { section6 } = content;
  const faqItems = section6.faq.items.map(renderFaqItem).join("");
  return el(`
    <section class="bg-v4-navy py-16 md:py-24 px-6 md:px-8" aria-label="Garanta sua vaga">
      <div class="max-w-2xl mx-auto text-center">
        <div class="reveal inline-flex items-center gap-2 mb-4">
          <span class="inline-flex rounded-full h-2 w-2 bg-v4-green shrink-0"></span>
          <p class="font-bold text-v4-gold tracking-[0.2em] uppercase text-xs md:text-sm">${section6.eyebrow}</p>
        </div>
        <h2 class="reveal font-display font-semibold text-white mb-5 leading-[1.12] text-balance" style="font-size:clamp(28px,3.56vw + 14.6px,42px);">${section6.headline}</h2>
        <p class="reveal text-white/70 leading-relaxed mb-9 max-w-xl mx-auto">${section6.subtitle}</p>
        <div class="reveal">
          ${ctaButton(section6.ctaText, "w-full sm:w-auto")}
          <p class="text-white/55 text-xs mt-4 max-w-md mx-auto">${section6.scarcityNote}</p>
        </div>
      </div>

      <div class="max-w-2xl mx-auto mt-16 md:mt-20">
        <h3 class="reveal font-display font-semibold text-white mb-2 text-center" style="font-size:clamp(20px,1.02vw + 16.2px,24px);">${section6.faq.title}</h3>
        <div class="reveal">${faqItems}</div>
      </div>
    </section>
  `);
}

function renderFooter() {
  const { brand } = content;
  return el(`
    <footer class="bg-v4-navy border-t border-white/10 py-10 text-center pb-24 md:pb-10">
      <p class="font-display font-semibold text-v4-gold">${brand.name}</p>
      <p class="text-white/40 text-[11px] tracking-[0.2em] uppercase mt-1">${brand.parentBrand}</p>
    </footer>
  `);
}

/* ---------- Sticky CTA (mobile) ---------- */
function renderStickyCta() {
  return el(`
    <aside class="sticky-cta md:hidden px-4 py-3" id="sticky-cta" aria-label="Garantir vaga">
      <div class="flex items-center gap-3">
        <div class="shrink-0">
          <p class="text-[10px] uppercase tracking-[0.15em] text-v4-gold font-bold leading-none">${content.event.dateShort} · 20h</p>
          <p class="text-[10px] text-white/60 leading-none mt-1">Aula ao vivo</p>
        </div>
        <a href="${content.ctaHref}" target="_blank" rel="noopener noreferrer"
          class="cta-btn flex-1 inline-flex items-center justify-center px-4 py-3 rounded-lg font-bold text-[12px] tracking-wide uppercase">
          GARANTIR MINHA VAGA
        </a>
      </div>
    </aside>
  `);
}

/* pontes de gradiente entre blocos — sem corte seco */
const bridge = (cls) => el(`<div class="${cls}" aria-hidden="true"></div>`);

root.append(
  renderSection1(),
  bridge("bridge-to-plum"),
  renderSection2(),
  bridge("bridge-to-ink"),
  renderSection3(),
  bridge("bridge-dawn"),
  renderSection4(),
  renderAudienceFit(),
  renderSection5(),
  bridge("bridge-to-navy"),
  renderSection6(),
  renderFooter(),
  renderStickyCta()
);
