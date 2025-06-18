const navList = document.querySelector(".navbar__list");
const navItems = document.querySelectorAll(".navbar__item");

// Select all product cards
const productCards = document.querySelectorAll(".collection__product-card");
const collectionSection = document.querySelector(".collection");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  // Trigger reflow to apply preload state
  void parent.offsetWidth;

  root.classList.remove("is-preload");

  initScrollAnimations;
});

const handleActive = (e) => {
  if (e.target.classList.contains("active")) return;
  navItems.forEach((item) => item.classList.remove("active"));
  e.target.classList.add("active");
};

navList.addEventListener("click", handleActive);

const initScrollAnimations = () => {
  // Set initial state for each card
  productCards.forEach((card, index) => {
    card.style.transform = "translate(100px, 60vh)";
    card.style.opacity = "0";
    card.style.transition = `
      transform 0.6s ease-out ${index * 0.15}s, 
      opacity 0.4s ease-out ${index * 0.15}s
    `;
    card.style.willChange = "transform, opacity";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find all cards within the intersected section
          const cardsInSection = entry.target.querySelectorAll(
            ".collection__product-card"
          );
          cardsInSection.forEach((card) => {
            card.style.transform = "translate(0)";
            card.style.opacity = "1";
          });
        }
      });
    },
    {
      threshold: 1,
    }
  );

  observer.observe(collectionSection);
};

initScrollAnimations();
