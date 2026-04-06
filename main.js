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
      // Flip animation on change
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
    const orig = btn.textContent;
    btn.textContent = "Copied!";
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
  const jasmineImages = [
    "/image/qr/flower.png",
    "/image/qr/flower3.png",
    "/image/qr/flower1.png",
    "/image/qr/flower2.png",
  ];
  const randomImage =
    jasmineImages[Math.floor(Math.random() * jasmineImages.length)];
  jasmine.style.backgroundImage = `url('${randomImage}')`;
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
setInterval(createJasmineFlower, 1000);

// ============================================================
// BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
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
    musicLabel.textContent = "Stop Music";
    musicBtn.style.background = "var(--rose)";
  } else {
    musicIcon.textContent = "♪";
    musicIcon.classList.remove("playing");
    musicLabel.textContent = "Play Music";
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
// BOOK — FLIP PAGES
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

// Swipe support for mobile
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
      if (Math.abs(diff) > 50) {
        goToPage(diff > 0 ? currentPage + 1 : currentPage - 1);
      }
    },
    { passive: true },
  );
})();

// ============================================================
// TEXT ANIMATION 1: TYPEWRITER — hero tagline
// ============================================================
(function () {
  const taglineEl = document.querySelector(".hero-tagline");
  if (!taglineEl) return;

  const phrases = [
    '"Two souls, one heart, forever intertwined."',
    "September 14 · Phnom Penh, Cambodia",
    "Forever Begins…",
    '"Love is the greatest adventure."',
  ];

  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  taglineEl.textContent = "";
  taglineEl.appendChild(cursor);

  let pi = 0,
    ci = 0,
    deleting = false;

  function typeIt() {
    const phrase = phrases[pi];
    const current = phrase.slice(0, ci);
    taglineEl.textContent = current;
    taglineEl.appendChild(cursor);

    if (!deleting) {
      ci++;
      if (ci > phrase.length) {
        deleting = true;
        setTimeout(typeIt, 2200);
        return;
      }
    } else {
      ci--;
      if (ci < 0) {
        ci = 0;
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(typeIt, 400);
        return;
      }
    }
    setTimeout(typeIt, deleting ? 38 : 78);
  }

  // Start after hero animation delay
  setTimeout(typeIt, 1400);
})();

// ============================================================
// TEXT ANIMATION 2: SHIMMER — footer names
// ============================================================
(function () {
  const footerNames = document.querySelector(".footer-names");
  if (!footerNames) return;
  footerNames.classList.add("shimmer-gold");
})();

// ============================================================
// TEXT ANIMATION 3: WAVE LETTERS — hero names (Me & Crush)
// ============================================================
(function () {
  // Apply wave to the hero-amp (&) and the two name spans
  const heroNames = document.querySelector(".hero-names");
  if (!heroNames) return;

  // Wrap each letter inside .hero-names > span elements
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
// TEXT ANIMATION 4: WORD FADE-IN — gift intro paragraph
// ============================================================
(function () {
  const giftIntro = document.querySelector(".gift-intro");
  if (!giftIntro) return;

  const words = giftIntro.textContent.trim().split(/\s+/);
  giftIntro.innerHTML = words
    .map((w) => `<span class="fade-word">${w}</span>`)
    .join(" ");

  const wordObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        giftIntro.querySelectorAll(".fade-word").forEach((el, i) => {
          setTimeout(() => el.classList.add("visible"), i * 100);
        });
        wordObserver.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  wordObserver.observe(giftIntro);
})();

// ============================================================
// TEXT ANIMATION 5: GOLDEN GLOW — countdown label
// ============================================================
(function () {
  const label = document.querySelector(".countdown-label");
  if (label) label.classList.add("glow-gold");
})();

// ============================================================
// TEXT ANIMATION 6: BREATHE — hero date
// ============================================================
(function () {
  const heroDate = document.querySelector(".hero-date");
  if (heroDate) heroDate.classList.add("breathe-text");
})();

// ============================================================
// TEXT ANIMATION 7: STAGGERED CHAR REVEAL — section titles
// ============================================================
(function () {
  function splitIntoChars(el) {
    // Skip elements that have child elements (e.g. with <em> inside)
    // Instead wrap text nodes only
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
        // For <em> and other inline elements, wrap their text too
        const innerText = node.textContent;
        node.textContent = "";
        [...innerText].forEach((ch) => {
          const s = document.createElement("span");
          s.className = "char";
          s.textContent = ch === " " ? "\u00a0" : ch;
          node.appendChild(s);
        });
      }
    });
  }

  const titles = document.querySelectorAll(".section-title");
  titles.forEach((title) => {
    splitIntoChars(title);

    const charObs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const chars = title.querySelectorAll(".char");
          chars.forEach((ch, i) => {
            setTimeout(() => ch.classList.add("visible"), i * 40);
          });
          charObs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    charObs.observe(title);
  });
})();

// ============================================================
// TEXT ANIMATION 8: LABEL SLIDE SHIMMER — section labels
// ============================================================
(function () {
  document.querySelectorAll(".section-label").forEach((el) => {
    el.classList.add("label-slide");
  });
})();

// ============================================================
// TEXT ANIMATION 9: FLOATING QUOTE — story quote
// ============================================================
(function () {
  document.querySelectorAll(".story-quote, .end-quote").forEach((el) => {
    el.classList.add("float-quote");
  });
})();

// ============================================================
// TEXT ANIMATION 10: HERO EYEBROW — stagger letter opacity
// ============================================================
(function () {
  const eyebrow = document.querySelector(".hero-eyebrow");
  if (!eyebrow) return;
  const text = eyebrow.textContent;
  eyebrow.textContent = "";
  [...text].forEach((ch, i) => {
    const s = document.createElement("span");
    s.style.cssText = `
      display: inline-block;
      opacity: 0;
      animation: fadeUpIn 0.5s ${1.0 + i * 0.06}s ease forwards;
    `;
    s.textContent = ch === " " ? "\u00a0" : ch;
    eyebrow.appendChild(s);
  });
  // Remove the parent animation since we're handling it per-letter
  eyebrow.style.animation = "none";
  eyebrow.style.opacity = "1";
})();

// ============================================================
// BONUS: NAV LOGO wave on hover
// ============================================================
(function () {
  const logo = document.querySelector(".nav-logo");
  if (!logo) return;

  const originalText = logo.textContent;

  logo.addEventListener("mouseenter", () => {
    logo.textContent = "";
    [...originalText].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "wave-letter";
      s.textContent = ch === " " ? "\u00a0" : ch;
      s.style.animationDelay = i * 0.06 + "s";
      logo.appendChild(s);
    });
  });

  logo.addEventListener("mouseleave", () => {
    logo.textContent = originalText;
  });
})();

// ============================================================
// BONUS: EVENT CARD names — shimmer on hover
// ============================================================
(function () {
  document.querySelectorAll(".event-name").forEach((el) => {
    const orig = el.textContent;
    el.closest(".event-card").addEventListener("mouseenter", () => {
      el.classList.add("shimmer-gold");
    });
    el.closest(".event-card").addEventListener("mouseleave", () => {
      el.classList.remove("shimmer-gold");
    });
  });
})();
