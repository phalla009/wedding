// ============================================================
// LANGUAGE SWITCHER
// ============================================================
let currentLang = localStorage.getItem("lang") || "en";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("data-lang", lang);

  document.querySelectorAll("[data-en], [data-km]").forEach((el) => {
    const text = el.getAttribute("data-" + lang);
    if (!text) return;
    if (text.includes("<br") || text.includes("&amp;") || text.includes("&")) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
    if (el.tagName === "TITLE") document.title = text;
  });

  document.getElementById("btn-en").classList.toggle("active", lang === "en");
  document.getElementById("btn-km").classList.toggle("active", lang === "km");

  const musicLabel = document.getElementById("musicLabel");
  if (musicLabel) {
    const playing = music && !music.paused;
    musicLabel.textContent = playing
      ? lang === "km"
        ? "បញ្ឈប់តន្ត្រី"
        : "Stop Music"
      : lang === "km"
        ? "ចាក់តន្ត្រី"
        : "Play Music";
  }

  document.body.classList.remove("lang-fade");
  void document.body.offsetWidth;
  document.body.classList.add("lang-fade");
  setTimeout(() => document.body.classList.remove("lang-fade"), 450);

  restartTypewriter(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  if (currentLang !== "en") setLang(currentLang);
});

// ============================================================
// COUNTDOWN
// ============================================================
const weddingDate = new Date("2026-09-14T16:00:00");

function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(
      (id) => (document.getElementById(id).textContent = "00"),
    );
    return;
  }
  const vals = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
  Object.entries(vals).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const newText = String(val).padStart(2, "0");
    if (el.textContent !== newText) {
      el.classList.add("flip");
      setTimeout(() => {
        el.textContent = newText;
        el.classList.remove("flip");
      }, 150);
    }
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ============================================================
// COPY ACCOUNT NUMBER
// ============================================================
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.getAttribute("data-" + currentLang) || btn.textContent;
    btn.textContent = currentLang === "km" ? "បានចម្លង!" : "Copied!";
    btn.style.background = "var(--rose)";
    btn.style.color = "var(--ivory)";
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = "";
      btn.style.color = "var(--gold)";
    }, 2000);
  });
}

// ============================================================
// MOBILE NAV
// ============================================================
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("is-active");
});
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("is-active");
  }
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("is-active");
  });
});

// ============================================================
// FALLING SNOWFLAKES
// ============================================================
function createSnowflake() {
  const snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 5 + 2 + "px";
  snow.style.width = size;
  snow.style.height = size;
  snow.style.opacity = Math.random();
  const duration = Math.random() * 5 + 7;
  snow.style.animationDuration = duration + "s";
  document.body.appendChild(snow);
  setTimeout(() => snow.remove(), duration * 1000);
}
setInterval(createSnowflake, 150);

// ============================================================
// FALLING JASMINE FLOWERS
// ============================================================
function createJasmineFlower() {
  const jasmine = document.createElement("div");
  jasmine.classList.add("jasmine-petal");
  const images = [
    "/image/qr/flower.png",
    "/image/qr/flower3.png",
    "/image/qr/flower1.png",
    "/image/qr/flower2.png",
  ];
  jasmine.style.backgroundImage = `url('${images[Math.floor(Math.random() * images.length)]}')`;
  jasmine.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 20 + 15 + "px";
  jasmine.style.width = size;
  jasmine.style.height = size;
  const duration = Math.random() * 7 + 8;
  jasmine.style.animationDuration = duration + "s";
  jasmine.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(jasmine);
  setTimeout(() => jasmine.remove(), (duration + 5) * 1000);
}
setInterval(createJasmineFlower, 500);

// ============================================================
// BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTopBtn.classList.toggle("visible", window.scrollY > 400);
});

// ============================================================
// MUSIC PLAYER
// ============================================================
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");
music.volume = 0.5;

function setPlayingUI(playing) {
  if (playing) {
    musicIcon.textContent = "♪";
    musicIcon.classList.add("playing");
    musicLabel.textContent =
      currentLang === "km" ? "បញ្ឈប់តន្ត្រី" : "Stop Music";
    musicBtn.style.background = "var(--rose)";
  } else {
    musicIcon.textContent = "♪";
    musicIcon.classList.remove("playing");
    musicLabel.textContent =
      currentLang === "km" ? "ចាក់តន្ត្រី" : "Play Music";
    musicBtn.style.background = "";
  }
}
musicBtn.addEventListener("click", function () {
  if (!music.paused) {
    music.pause();
    music.currentTime = 0;
    setPlayingUI(false);
  } else {
    music
      .play()
      .then(() => setPlayingUI(true))
      .catch((err) => console.warn("Play failed:", err));
  }
});
music.addEventListener("ended", () => setPlayingUI(false));

// ============================================================
// BOOK FLIP PAGES
// ============================================================
let currentPage = 1;
const totalPages = 3;

function goToPage(next) {
  if (next === currentPage || next < 1 || next > totalPages) return;
  const prevEl = document.getElementById("page" + currentPage);
  const nextEl = document.getElementById("page" + next);
  const goingForward = next > currentPage;

  prevEl.style.transition = "opacity 0.35s ease, transform 0.35s ease";
  prevEl.style.opacity = "0";
  prevEl.style.transform = goingForward
    ? "translateX(-55px) scale(0.97)"
    : "translateX(55px) scale(0.97)";
  prevEl.style.position = "absolute";
  prevEl.style.pointerEvents = "none";

  nextEl.style.transition = "none";
  nextEl.style.opacity = "0";
  nextEl.style.transform = goingForward
    ? "translateX(55px) scale(0.97)"
    : "translateX(-55px) scale(0.97)";
  nextEl.style.position = "relative";

  setTimeout(() => {
    nextEl.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    nextEl.style.opacity = "1";
    nextEl.style.transform = "translateX(0) scale(1)";
    nextEl.style.pointerEvents = "auto";
    setTimeout(() => {
      prevEl.classList.remove("active");
      prevEl.style.cssText = "";
      nextEl.classList.add("active");
      nextEl.style.cssText = "";
    }, 370);
  }, 20);

  document.getElementById("dot" + currentPage).classList.remove("active");
  document.getElementById("dot" + next).classList.add("active");
  currentPage = next;
}

(function () {
  const stack = document.getElementById("pagesStack");
  if (!stack) return;
  let startX = 0;
  stack.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  stack.addEventListener(
    "touchend",
    (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50)
        goToPage(diff > 0 ? currentPage + 1 : currentPage - 1);
    },
    { passive: true },
  );
})();

// ============================================================
// TEXT ANIMATION 1: TYPEWRITER
// ============================================================
const typewriterPhrases = {
  en: [
    '"Two souls, one heart, forever intertwined."',
    "September 14 · Phnom Penh, Cambodia",
    "Forever Begins\u2026",
    '"Love is the greatest adventure."',
  ],
  km: [
    '"ពីរដួងវិញ្ញាណ ចិត្តតែមួយ ស្នេហ៍ពេញអស់ជាតិ"',
    "១៤ កញ្ញា · ភ្នំពេញ កម្ពុជា",
    "ចាប់ផ្តើមស្នេហ៍\u2026",
    '"ស្នេហ៍ គឺជាដំណើរដ៏អស្ចារ្យបំផុត"',
  ],
};

let twTimer = null,
  twPi = 0,
  twCi = 0,
  twDeleting = false;
let twCursor = null,
  twEl = null;

function restartTypewriter(lang) {
  if (twTimer) clearTimeout(twTimer);
  twPi = 0;
  twCi = 0;
  twDeleting = false;
  twEl = document.querySelector(".hero-tagline");
  if (!twEl) return;
  if (!twCursor) {
    twCursor = document.createElement("span");
    twCursor.className = "typewriter-cursor";
  }
  twEl.textContent = "";
  twEl.appendChild(twCursor);
  typeItFn(lang);
}

function typeItFn(lang) {
  const phrases = typewriterPhrases[lang] || typewriterPhrases.en;
  const phrase = phrases[twPi];
  twEl.textContent = phrase.slice(0, twCi);
  twEl.appendChild(twCursor);

  if (!twDeleting) {
    twCi++;
    if (twCi > phrase.length) {
      twDeleting = true;
      twTimer = setTimeout(() => typeItFn(lang), 2200);
      return;
    }
  } else {
    twCi--;
    if (twCi < 0) {
      twCi = 0;
      twDeleting = false;
      twPi = (twPi + 1) % phrases.length;
      twTimer = setTimeout(() => typeItFn(lang), 400);
      return;
    }
  }
  twTimer = setTimeout(() => typeItFn(lang), twDeleting ? 38 : 78);
}

setTimeout(() => restartTypewriter(currentLang), 1400);

// ============================================================
// TEXT ANIMATION 2: SHIMMER — footer names
// ============================================================
document.querySelector(".footer-names")?.classList.add("shimmer-gold");

// ============================================================
// TEXT ANIMATION 3: WAVE LETTERS — hero names
// ============================================================
(function () {
  const heroNames = document.querySelector(".hero-names");
  if (!heroNames) return;
  heroNames.querySelectorAll("span:not(.hero-amp)").forEach((span) => {
    const text = span.textContent;
    span.textContent = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "wave-letter";
      s.textContent = ch === " " ? "\u00a0" : ch;
      s.style.animationDelay = i * 0.08 + "s";
      span.appendChild(s);
    });
  });
})();

// ============================================================
// TEXT ANIMATION 4: WORD FADE-IN — gift intro
// ============================================================
(function () {
  const giftIntro = document.querySelector(".gift-intro");
  if (!giftIntro) return;
  const wordObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const text =
          giftIntro.getAttribute("data-" + currentLang) ||
          giftIntro.textContent.trim();
        const words = text.split(/\s+/);
        giftIntro.innerHTML = words
          .map((w) => `<span class="fade-word">${w}</span>`)
          .join(" ");
        giftIntro.querySelectorAll(".fade-word").forEach((el, i) => {
          setTimeout(() => el.classList.add("visible"), i * 100);
        });
        wordObs.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  wordObs.observe(giftIntro);
})();

// ============================================================
// TEXT ANIMATION 5–6: GLOW + BREATHE
// ============================================================
document.querySelector(".countdown-label")?.classList.add("glow-gold");
document.querySelector(".hero-date")?.classList.add("breathe-text");

// ============================================================
// TEXT ANIMATION 7: STAGGERED CHAR REVEAL — section titles
// ============================================================
(function () {
  function splitChars(el) {
    el.classList.add("char-reveal");
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        [...node.textContent].forEach((ch) => {
          const s = document.createElement("span");
          s.className = "char";
          s.textContent = ch === " " ? "\u00a0" : ch;
          frag.appendChild(s);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const inner = node.textContent;
        node.textContent = "";
        [...inner].forEach((ch) => {
          const s = document.createElement("span");
          s.className = "char";
          s.textContent = ch === " " ? "\u00a0" : ch;
          node.appendChild(s);
        });
      }
    });
  }
  document.querySelectorAll(".section-title").forEach((title) => {
    splitChars(title);
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          title.querySelectorAll(".char").forEach((ch, i) => {
            setTimeout(() => ch.classList.add("visible"), i * 40);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(title);
  });
})();

// ============================================================
// TEXT ANIMATION 8–9: LABEL SLIDE + FLOATING QUOTE
// ============================================================
document
  .querySelectorAll(".section-label")
  .forEach((el) => el.classList.add("label-slide"));
document
  .querySelectorAll(".story-quote, .end-quote")
  .forEach((el) => el.classList.add("float-quote"));

// ============================================================
// TEXT ANIMATION 10: HERO EYEBROW stagger
// ============================================================
(function () {
  const eyebrow = document.querySelector(".hero-eyebrow");
  if (!eyebrow) return;
  const text =
    eyebrow.getAttribute("data-" + currentLang) || eyebrow.textContent;
  eyebrow.textContent = "";
  [...text].forEach((ch, i) => {
    const s = document.createElement("span");
    s.style.cssText = `display:inline-block;opacity:0;animation:fadeUpIn 0.5s ${1.0 + i * 0.06}s ease forwards;`;
    s.textContent = ch === " " ? "\u00a0" : ch;
    eyebrow.appendChild(s);
  });
  eyebrow.style.animation = "none";
  eyebrow.style.opacity = "1";
})();

// ============================================================
// BONUS: NAV LOGO wave on hover
// ============================================================
(function () {
  const logo = document.querySelector(".nav-logo");
  if (!logo) return;
  const inner = logo.querySelector("span") || logo;
  inner.addEventListener("mouseenter", () => {
    const text = inner.textContent;
    inner.textContent = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "wave-letter";
      s.textContent = ch === " " ? "\u00a0" : ch;
      s.style.animationDelay = i * 0.06 + "s";
      inner.appendChild(s);
    });
  });
  inner.addEventListener("mouseleave", () => {
    inner.textContent = currentLang === "km" ? "ខ្ញុំ & ស្នេហា" : "ME & Crush";
  });
})();

// ============================================================
// BONUS: EVENT CARD shimmer on hover
// ============================================================
document.querySelectorAll(".event-name").forEach((el) => {
  const card = el.closest(".event-card");
  if (!card) return;
  card.addEventListener("mouseenter", () => el.classList.add("shimmer-gold"));
  card.addEventListener("mouseleave", () =>
    el.classList.remove("shimmer-gold"),
  );
});
