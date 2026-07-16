/**
 * Animações e interações da V4.
 * Regras (pesquisa CRO): reveals sutis de ~350ms, uma única vez, herói sem
 * delay; urgência real via countdown para a data do evento; sticky CTA no
 * mobile após o herói sair de tela. Tudo respeita prefers-reduced-motion.
 */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

/* ---------- Smooth scroll (Lenis) ---------- */
function initLenis() {
  if (reducedMotion || typeof Lenis === "undefined") return;
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
  window.lenisInstance = lenis; // lead-form.js pausa/retoma o scroll no modal
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  if (hasGsap) {
    lenis.on("scroll", ScrollTrigger.update);
  }
}

/* ---------- Reveals ---------- */
function initReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (reducedMotion) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    items.forEach((item) => {
      item.classList.add("is-visible");
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        }
      );
    });
    return;
  }

  // Fallback sem GSAP: IntersectionObserver + classe CSS.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((item) => observer.observe(item));
}

/* ---------- Countdown (alvo real: 06/08 20h Brasília) ---------- */
function initCountdown() {
  const target = new Date(content.countdownTarget).getTime();
  if (Number.isNaN(target)) return;
  const groups = document.querySelectorAll("[data-countdown]");
  if (!groups.length) return;

  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = target - Date.now();
    groups.forEach((group) => {
      const prefix = group.dataset.countdown;
      const set = (unit, value) => {
        const node = document.getElementById(`${prefix}-${unit}`);
        if (node) node.textContent = value;
      };
      if (diff <= 0) {
        set("d", "00"); set("h", "00"); set("m", "00"); set("s", "00");
        return;
      }
      set("d", pad(Math.floor(diff / 86400000)));
      set("h", pad(Math.floor((diff % 86400000) / 3600000)));
      set("m", pad(Math.floor((diff % 3600000) / 60000)));
      set("s", pad(Math.floor((diff % 60000) / 1000)));
    });
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- Pista de scroll do hero ---------- */
function initScrollCue() {
  const btn = document.querySelector("[data-scroll-next]");
  const hero = document.querySelector("header");
  if (!btn || !hero) return;
  btn.addEventListener("click", () => {
    const target = hero.nextElementSibling;
    if (target) target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });
}

/* ---------- Sticky CTA mobile ---------- */
function initStickyCta() {
  const bar = document.getElementById("sticky-cta");
  const hero = document.querySelector("header");
  if (!bar || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle("is-on", !entry.isIntersecting);
    },
    { rootMargin: "-60px 0px 0px 0px" }
  );
  observer.observe(hero);
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const btn = item.querySelector("[data-faq-btn]");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

initLenis();
initReveals();
initCountdown();
initScrollCue();
initStickyCta();
initFaq();
