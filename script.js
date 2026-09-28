// Change this to the inbox where quote requests should go.
const CONTACT_EMAIL = "eagle@work2base.com";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
const setMenu = (open) => {
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
};
toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal: fade/slide elements in as they enter the viewport
const revealables = document.querySelectorAll(".reveal, .tile-lg");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Stagger siblings that appear together
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 80}ms`;
      el.classList.add("in");
      if (el.id === "device") countUp(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add("in"));
}

// Hero device: flattens from a tilted angle as you scroll
const device = document.getElementById("device");
if (!reduceMotion) {
  let ticking = false;
  const update = () => {
    const rect = device.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, 1 - (rect.top - 80) / (window.innerHeight * 0.7)));
    device.style.setProperty("--tilt", `${18 * (1 - progress)}deg`);
    device.style.setProperty("--scale", (0.94 + 0.06 * progress).toFixed(3));
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

// KPI numbers count up once the dashboard is visible
function countUp(root) {
  root.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec || "0", 10);
    const { prefix = "", suffix = "" } = el.dataset;
    const start = performance.now();
    const duration = 1600;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = (target * eased).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      el.textContent = `${prefix}${value}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// Contact form: validates, then opens the visitor's email app with the message filled in.
// To receive submissions without an email app, point the form at a service like Formspree (see README).
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");

  if (!data.name?.trim() || !emailOk || !data.message?.trim()) {
    status.textContent = "Please add your name, a valid email and a message.";
    status.className = "form-status error";
    return;
  }

  const subject = `Quote request: ${data.service}`;
  const body = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.message}`;
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = "Thanks! Your email app should open with your message ready to send.";
  status.className = "form-status ok";
  form.reset();
});
