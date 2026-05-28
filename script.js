const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const pillarCards = document.querySelectorAll(".pillar-grid .pillar-card");
const revealTargets = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("[data-section]");

if (navToggle && siteHeader) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

pillarCards.forEach((card) => {
  card.addEventListener("toggle", () => {
    if (!card.open) {
      return;
    }

    pillarCards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.removeAttribute("open");
      }
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        const matches = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("is-active", matches);
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.2,
  }
);

sections.forEach((section) => navObserver.observe(section));
