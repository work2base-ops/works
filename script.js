// Change this to the inbox where quote requests should go.
const CONTACT_EMAIL = "hello@example.com";

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: validates, then opens the visitor's email app with the message filled in.
// To receive submissions without an email app, point the form at a service like Formspree (see README).
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");

  if (!data.name?.trim() || !emailOk || !data.message?.trim()) {
    status.textContent = "Please fill in your name, a valid email, and a message.";
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
