const loader = document.querySelector(".site-loader");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const faqItems = document.querySelectorAll(".faq-item");
const toggleButtons = document.querySelectorAll(".toggle-btn");
const pricingLabels = document.querySelectorAll(".plan-price span");
const sliderCards = document.querySelectorAll(".testimonial-card");
const sliderNext = document.querySelector(".slider-arrow.next");
const sliderPrev = document.querySelector(".slider-arrow.prev");
const contactForm = document.querySelector(".contact-form");
const scene = document.querySelector(".orbital-scene");
let activeSlide = 0;

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("hidden"), 700);
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach(item => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target || 0);
      const duration = 1600;
      const start = performance.now();

      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = Math.floor(progress * target).toString();

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = target.toString();
        }
      };

      window.requestAnimationFrame(step);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));

navToggle?.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  document.body.classList.toggle("nav-open");
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

faqItems.forEach(item => {
  const button = item.querySelector(".faq-question");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    faqItems.forEach(entry => entry.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

toggleButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    toggleButtons.forEach(entry => entry.classList.toggle("active", entry === button));
    pricingLabels.forEach(label => {
      label.textContent = label.dataset[mode] || label.textContent;
    });
  });
});

const showSlide = index => {
  sliderCards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === index);
  });
};

const nextSlide = increment => {
  activeSlide = (activeSlide + increment + sliderCards.length) % sliderCards.length;
  showSlide(activeSlide);
};

sliderNext?.addEventListener("click", () => nextSlide(1));
sliderPrev?.addEventListener("click", () => nextSlide(-1));

if (sliderCards.length > 1) {
  window.setInterval(() => nextSlide(1), 6000);
}

contactForm?.addEventListener("submit", event => {
  event.preventDefault();
  const button = contactForm.querySelector("button[type='submit']");
  if (!button) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const businessType = String(formData.get("business-type") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const packageName = String(formData.get("package") || "").trim();
  const requirements = String(formData.get("requirements") || "").trim();
  const whatsappNumber = "917385861327";
  const message = [
    "Hello Chavan Brothers Studio, I want a free consultation.",
    "",
    `Name: ${name || "Not provided"}`,
    `Business Type: ${businessType || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Package: ${packageName || "Not provided"}`,
    `Requirements: ${requirements || "Not provided"}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const originalText = button.textContent;
  button.textContent = "Opening WhatsApp...";
  button.setAttribute("disabled", "true");
  window.open(whatsappUrl, "_blank", "noopener");

  window.setTimeout(() => {
    button.textContent = originalText;
    button.removeAttribute("disabled");
  }, 1600);
});

document.addEventListener("mousemove", event => {
  if (!scene || window.innerWidth < 821) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 12;
  const y = (event.clientY / window.innerHeight - 0.5) * 12;
  scene.style.transform = `rotateX(${-y * 0.15}deg) rotateY(${x * 0.15}deg)`;
});
