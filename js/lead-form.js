/**
 * Modal de captura de leads — intercepta os CTAs do WhatsApp (os 5: 4 via
 * ctaButton + sticky mobile) e abre o formulário antes do grupo.
 * Fluxo: CTA → modal → POST /lead (timeout curto) → obrigado.html → grupo.
 * Progressive enhancement: os anchors mantêm o href do WhatsApp; se este
 * script falhar, o clique cai direto no grupo como antes.
 * Todo texto vem de content.leadForm (content-config-separation).
 */

(function () {
  // "content" é const de escopo global (script clássico) — não vira window.content.
  if (typeof content === "undefined" || !content.leadForm) return;

  var lf = content.leadForm;

  /* ---------- UTMs capturadas da URL de aterrissagem ---------- */
  var utm = {};
  try {
    var params = new URLSearchParams(location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (key) {
      var value = params.get(key);
      if (value) utm[key] = value;
    });
  } catch (_) { /* URLSearchParams indisponível: segue sem UTMs */ }

  function pushEvent(name) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name });
  }

  /* ---------- Máscara de telefone (00) 00000-0000 ---------- */
  function formatPhone(digits) {
    digits = digits.slice(0, 11);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return "(" + digits;
    if (digits.length <= 6) return "(" + digits.slice(0, 2) + ") " + digits.slice(2);
    if (digits.length <= 10) {
      return "(" + digits.slice(0, 2) + ") " + digits.slice(2, 6) + "-" + digits.slice(6);
    }
    return "(" + digits.slice(0, 2) + ") " + digits.slice(2, 7) + "-" + digits.slice(7);
  }

  /* ---------- Monta o modal 1x ---------- */
  var el = function (html) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  };

  function fieldBlock(name, type, extraAttrs) {
    var f = lf.fields[name];
    return (
      '<div class="lead-field">' +
      '<label class="lead-label" for="lead-' + name + '">' + f.label + ' <span aria-hidden="true">*</span></label>' +
      '<input class="lead-input" id="lead-' + name + '" name="' + name + '" type="' + type + '" placeholder="' + f.placeholder + '" required aria-describedby="lead-' + name + '-error" ' + (extraAttrs || "") + " />" +
      '<p class="lead-error" id="lead-' + name + '-error" hidden>' + lf.errors[name] + "</p>" +
      "</div>"
    );
  }

  var overlay = el(
    '<div class="lead-modal-overlay" hidden>' +
      '<div class="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-heading" data-lenis-prevent>' +
        '<button type="button" class="lead-close" aria-label="' + lf.closeLabel + '">&times;</button>' +
        '<h2 class="lead-heading" id="lead-heading">' + lf.heading + "</h2>" +
        '<form class="lead-form" novalidate>' +
          fieldBlock("nome", "text", 'autocomplete="name" maxlength="120"') +
          fieldBlock("email", "email", 'autocomplete="email" maxlength="160"') +
          fieldBlock("telefone", "tel", 'autocomplete="tel" inputmode="numeric" maxlength="16"') +
          '<div class="lead-field">' +
            '<div class="lead-crm-row">' +
              '<div>' +
                '<label class="lead-label" for="lead-crm">' + lf.fields.crm.label + ' <span aria-hidden="true">*</span></label>' +
                '<input class="lead-input" id="lead-crm" name="crm" type="text" placeholder="' + lf.fields.crm.placeholder + '" required inputmode="numeric" maxlength="10" aria-describedby="lead-crm-error" />' +
              "</div>" +
              '<div class="lead-uf-field">' +
                '<label class="lead-label" id="lead-uf-label">' + lf.fields.uf.label + ' <span aria-hidden="true">*</span></label>' +
                '<button type="button" class="lead-input lead-uf-trigger" id="lead-uf-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="lead-uf-label lead-uf-trigger" aria-describedby="lead-uf-error">' +
                  '<span class="lead-uf-value" data-empty="true">' + lf.fields.uf.placeholder + "</span>" +
                  '<svg class="lead-uf-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' +
                "</button>" +
                '<input type="hidden" id="lead-uf" name="uf" value="" tabindex="-1" />' +
              "</div>" +
            "</div>" +
            '<p class="lead-error" id="lead-crm-error" hidden>' + lf.errors.crm + "</p>" +
            '<p class="lead-error" id="lead-uf-error" hidden>' + lf.errors.uf + "</p>" +
          "</div>" +
          // Honeypot: invisível pra humanos; bots preenchem e o backend descarta.
          '<input class="lead-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
          '<button type="submit" class="cta-btn lead-submit">' + lf.submitText + "</button>" +
          '<p class="lead-privacy">' + lf.privacyNote + "</p>" +
        "</form>" +
      "</div>" +
    "</div>"
  );
  document.body.appendChild(overlay);

  var modal = overlay.querySelector(".lead-modal");
  var form = overlay.querySelector(".lead-form");
  var submitBtn = overlay.querySelector(".lead-submit");
  var phoneInput = overlay.querySelector("#lead-telefone");
  var crmInput = overlay.querySelector("#lead-crm");
  var lastInvoker = null;

  phoneInput.addEventListener("input", function () {
    var digits = phoneInput.value.replace(/\D/g, "");
    phoneInput.value = formatPhone(digits);
  });
  crmInput.addEventListener("input", function () {
    crmInput.value = crmInput.value.replace(/\D/g, "").slice(0, 10);
  });

  /* ---------- UF: dropdown custom ----------
     O <select> nativo abria uma lista que cobria o modal (ver print). Esta
     lista escura é filha do overlay (fora do overflow:auto do card, e fora do
     transform do card), então não é clipada; abre pra baixo ou pra cima
     conforme o espaço. Teclado (setas/Enter/Esc/Home/End/type-ahead), touch e
     ARIA (listbox/option). O valor vai pra um input hidden #lead-uf, então a
     validação e o envio continuam idênticos. */
  var ufTrigger = overlay.querySelector("#lead-uf-trigger");
  var ufValue = ufTrigger.querySelector(".lead-uf-value");
  var ufHidden = overlay.querySelector("#lead-uf");
  var ufList = document.createElement("ul");
  ufList.className = "lead-uf-pop";
  ufList.setAttribute("role", "listbox");
  ufList.setAttribute("aria-label", lf.fields.uf.label);
  ufList.tabIndex = -1;
  ufList.hidden = true;
  ufList.innerHTML = lf.ufOptions
    .map(function (uf) {
      return '<li class="lead-uf-opt" role="option" data-value="' + uf + '" aria-selected="false">' + uf + "</li>";
    })
    .join("");
  overlay.appendChild(ufList);
  var ufOpts = Array.prototype.slice.call(ufList.querySelectorAll(".lead-uf-opt"));
  var ufActive = -1;

  function positionUfList() {
    var r = ufTrigger.getBoundingClientRect();
    ufList.style.left = r.left + "px";
    ufList.style.width = r.width + "px";
    ufList.style.top = "auto";
    var listH = Math.min(ufList.scrollHeight, 240);
    var spaceBelow = window.innerHeight - r.bottom;
    if (spaceBelow < listH + 12 && r.top > spaceBelow) {
      ufList.style.top = Math.max(8, r.top - listH - 6) + "px";
    } else {
      ufList.style.top = r.bottom + 6 + "px";
    }
  }
  function setUfActive(i) {
    if (i < 0 || i >= ufOpts.length) return;
    if (ufActive >= 0 && ufOpts[ufActive]) ufOpts[ufActive].classList.remove("is-active");
    ufActive = i;
    ufOpts[i].classList.add("is-active");
    ufOpts[i].scrollIntoView({ block: "nearest" });
  }
  function openUf() {
    ufList.hidden = false;
    positionUfList();
    ufTrigger.setAttribute("aria-expanded", "true");
    var sel = -1;
    ufOpts.forEach(function (o, i) { if (o.getAttribute("aria-selected") === "true") sel = i; });
    setUfActive(sel >= 0 ? sel : 0);
    ufList.focus();
    document.addEventListener("click", onUfOutside, true);
    window.addEventListener("resize", closeUf);
    modal.addEventListener("scroll", closeUf);
  }
  function closeUf() {
    if (ufList.hidden) return;
    ufList.hidden = true;
    ufTrigger.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", onUfOutside, true);
    window.removeEventListener("resize", closeUf);
    modal.removeEventListener("scroll", closeUf);
  }
  function onUfOutside(e) {
    if (ufList.contains(e.target) || ufTrigger.contains(e.target)) return;
    closeUf();
  }
  function selectUf(i) {
    var opt = ufOpts[i];
    if (!opt) return;
    ufOpts.forEach(function (o) { o.setAttribute("aria-selected", "false"); });
    opt.setAttribute("aria-selected", "true");
    var v = opt.getAttribute("data-value");
    ufHidden.value = v;
    ufValue.textContent = v;
    ufValue.setAttribute("data-empty", "false");
    setFieldError("uf", false);
    closeUf();
    ufTrigger.focus();
  }
  ufTrigger.addEventListener("click", function () {
    if (ufList.hidden) openUf();
    else closeUf();
  });
  ufTrigger.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openUf();
    }
  });
  ufList.addEventListener("click", function (e) {
    var opt = e.target.closest ? e.target.closest(".lead-uf-opt") : null;
    if (opt) selectUf(ufOpts.indexOf(opt));
  });
  ufList.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setUfActive(Math.min(ufActive + 1, ufOpts.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setUfActive(Math.max(ufActive - 1, 0)); }
    else if (e.key === "Home") { e.preventDefault(); setUfActive(0); }
    else if (e.key === "End") { e.preventDefault(); setUfActive(ufOpts.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectUf(ufActive); }
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeUf(); ufTrigger.focus(); }
    else if (e.key === "Tab") { closeUf(); }
    else if (/^[a-z]$/i.test(e.key)) {
      var k = e.key.toLowerCase();
      var idx = -1;
      ufOpts.forEach(function (o, i) { if (idx === -1 && o.getAttribute("data-value").charAt(0).toLowerCase() === k) idx = i; });
      if (idx >= 0) setUfActive(idx);
    }
  });

  /* ---------- Abrir / fechar ---------- */
  var submitting = false;
  var cancelled = false;

  var reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function openModal(invoker) {
    lastInvoker = invoker || null;
    cancelled = false;
    overlay.hidden = false;
    // Força reflow pra transição de opacidade rodar após remover [hidden].
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    document.documentElement.classList.add("modal-open");
    if (window.lenisInstance) window.lenisInstance.stop();
    var first = overlay.querySelector("#lead-nome");
    if (first) first.focus();
    pushEvent("lead_form_open");
  }

  function closeModal() {
    closeUf(); // não deixar a lista de UF pendurada ao fechar o modal
    // Fechar durante o envio cancela a navegação pro obrigado — o usuário
    // desistiu; não teletransportar segundos depois.
    if (submitting) {
      cancelled = true;
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = lf.submitText;
    }
    pushEvent("lead_form_close");
    overlay.classList.remove("is-open");
    // Saída com fade curto (lente de contenção: exit mais rápido que enter,
    // mas nunca um snap de 0ms num overlay de tela cheia).
    if (reducedMotion) {
      overlay.hidden = true;
    } else {
      var done = false;
      var hide = function () {
        if (done) return;
        done = true;
        overlay.hidden = true;
      };
      overlay.addEventListener("transitionend", hide, { once: true });
      setTimeout(hide, 250); // segurança caso transitionend não dispare
    }
    document.documentElement.classList.remove("modal-open");
    if (window.lenisInstance) window.lenisInstance.start();
    if (lastInvoker && lastInvoker.focus) lastInvoker.focus();
  }

  overlay.querySelector(".lead-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  // Focus-trap simples: Tab circula dentro do modal enquanto aberto.
  overlay.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || overlay.hidden) return;
    var focusables = Array.prototype.filter.call(
      overlay.querySelectorAll("button, input, select, [href]"),
      function (node) { return !node.disabled && node.tabIndex !== -1; }
    );
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---------- Interceptação delegada dos CTAs ---------- */
  document.addEventListener("click", function (e) {
    var anchor = e.target && e.target.closest ? e.target.closest("a.cta-btn") : null;
    if (!anchor) return;
    if (overlay.contains(anchor)) return; // nada dentro do próprio modal
    if (anchor.getAttribute("href") !== content.ctaHref) return;
    e.preventDefault();
    openModal(anchor);
  });

  /* ---------- Validação + submit ---------- */
  function setFieldError(name, hasError) {
    var input = name === "uf"
      ? overlay.querySelector("#lead-uf-trigger")
      : overlay.querySelector("#lead-" + name);
    var error = overlay.querySelector("#lead-" + name + "-error");
    if (input) input.setAttribute("aria-invalid", hasError ? "true" : "false");
    if (error) error.hidden = !hasError;
  }

  function validate() {
    var values = {
      nome: overlay.querySelector("#lead-nome").value.trim(),
      email: overlay.querySelector("#lead-email").value.trim(),
      telefone: phoneInput.value.replace(/\D/g, ""),
      crm: crmInput.value.replace(/\D/g, ""),
      uf: overlay.querySelector("#lead-uf").value,
    };
    var checks = {
      nome: values.nome.length >= 2 && values.nome.length <= 120,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email) && values.email.length <= 160,
      telefone: values.telefone.length >= 10 && values.telefone.length <= 11,
      crm: values.crm.length >= 1 && values.crm.length <= 10,
      uf: lf.ufOptions.indexOf(values.uf) !== -1,
    };
    var ok = true;
    var firstBad = null;
    Object.keys(checks).forEach(function (name) {
      setFieldError(name, !checks[name]);
      if (!checks[name]) {
        ok = false;
        if (!firstBad) firstBad = name;
      }
    });
    if (firstBad) {
      var badInput = firstBad === "uf"
        ? overlay.querySelector("#lead-uf-trigger")
        : overlay.querySelector("#lead-" + firstBad);
      if (badInput) badInput.focus();
    }
    return ok ? values : null;
  }

  function goToObrigado() {
    // Preserva a query string (UTMs) — o pageview do obrigado é a conversão
    // no GTM e precisa manter a atribuição de campanha.
    window.location.href = "obrigado.html" + location.search;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var values = validate();
    if (!values) return;

    submitting = true;
    cancelled = false;
    submitBtn.disabled = true;
    submitBtn.textContent = lf.submittingText;
    pushEvent("lead_form_submit");

    var payload = {
      nome: values.nome,
      email: values.email,
      telefone: values.telefone,
      crm: values.crm,
      uf: values.uf,
      website: overlay.querySelector(".lead-hp").value,
      utm: utm,
      pageUrl: location.href.slice(0, 300),
    };

    // Falha do backend NUNCA bloqueia o funil: timeout curto + keepalive e
    // navegação pro obrigado aconteça o que acontecer.
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = controller
      ? setTimeout(function () { controller.abort(); }, (content.leadApi && content.leadApi.timeoutMs) || 4000)
      : null;

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      if (timer) clearTimeout(timer);
      submitting = false;
      if (cancelled) return; // usuário fechou o modal durante o envio
      goToObrigado();
    }

    try {
      fetch(content.leadApi.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: controller ? controller.signal : undefined,
      })
        .then(function (res) {
          if (!res.ok) pushEvent("lead_form_error");
        })
        .catch(function () {
          pushEvent("lead_form_error");
        })
        .then(finish, finish);
    } catch (_) {
      pushEvent("lead_form_error");
      finish();
    }
  });
})();
