const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector(".contact-form");
const hero = document.querySelector(".hero");
const header = document.querySelector(".site-header");

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "Guest";
  const email = formData.get("email")?.toString().trim() || "No email provided";
  const message = formData.get("message")?.toString().trim() || "";

  const subject = encodeURIComponent(`Vagabonds query from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:query@vagabondsband.com?subject=${subject}&body=${body}`;

  contactForm.reset();
});

let lastScrollY = 0;
window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;

  if (hero) {
    hero.style.setProperty("--hero-offset", `${Math.min(lastScrollY, 180)}`);
  }

  if (header) {
    header.classList.toggle("scrolled", lastScrollY > 24);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
