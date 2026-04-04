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
  document.getElementById("days").textContent = String(
    Math.floor(diff / 86400000),
  ).padStart(2, "0");
  document.getElementById("hours").textContent = String(
    Math.floor((diff % 86400000) / 3600000),
  ).padStart(2, "0");
  document.getElementById("minutes").textContent = String(
    Math.floor((diff % 3600000) / 60000),
  ).padStart(2, "0");
  document.getElementById("seconds").textContent = String(
    Math.floor((diff % 60000) / 1000),
  ).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// SCROLL REVEAL
// ============================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

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
setInterval(createJasmineFlower, 500);

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
// MUSIC PLAYER — simple & reliable
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

// Single source of truth — read from audio element directly
musicBtn.addEventListener("click", function () {
  if (!music.paused) {
    // Currently playing → stop it
    music.pause();
    music.currentTime = 0;
    setPlayingUI(false);
  } else {
    // Currently stopped → play it
    music
      .play()
      .then(() => setPlayingUI(true))
      .catch((err) => console.warn("Play failed:", err));
  }
});

music.addEventListener("ended", () => setPlayingUI(false));
