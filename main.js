const navList = document.querySelector(".navbar__list");
const navItems = document.querySelectorAll(".navbar__link");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const bodyElement = document.body;
  // Trigger reflow to apply preload state
  void parent.offsetWidth;

  root.classList.remove("is-preload");

  setTimeout(() => {
    bodyElement.classList.remove("body-hidden");
  }, 800);

  initScrollAnimations();
  initHorizontalScroll();
});

const handleActive = (e) => {
  if (e.target.classList.contains("active")) return;
  navItems.forEach((item) => item.classList.remove("active"));
  e.target.classList.add("active");
};

navList.addEventListener("click", handleActive);

const initScrollAnimations = () => {
  // Select all product cards
  const productCards = document.querySelectorAll(".collection__product-card");
  const collectionSection = document.querySelector(".collection");

  // Set initial state for each card
  productCards.forEach((card, index) => {
    card.style.transform = "translate(100%, 60vh)";
    card.style.opacity = "0";
    card.style.transition = `
      transform 0.6s ease-out ${index * 0.15}s, 
      opacity 0.4s ease-out ${index * 0.15}s `;
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
      threshold: 0.8,
      rootMargin: "0% 0% -100px 0% ",
    }
  );

  observer.observe(collectionSection);
};

const initHorizontalScroll = () => {
  const scrollSection = document.querySelector(".collection__scroll");
  const stickySection = document.getElementById("collection__sticky");
  const content = document.querySelector(".collection__content");
  const products = document.querySelector(".collection__products");

  // Create indicator reference
  const indicator = document.querySelector(".collection-scroll-indicator__bar");

  // 1. Calculate scroll distances
  const getScrollDistance = () => {
    const scrollY = window.scrollY;
    const sectionTop = scrollSection.offsetTop;
    const sectionHeight = scrollSection.offsetHeight - window.innerHeight;
    const scrollProgress = Math.min(
      Math.max((scrollY - sectionTop) / sectionHeight, 0),
      1
    );

    return scrollProgress;
  };

  // 2. Set up scroll animation
  const animateOnScroll = () => {
    const progress = getScrollDistance();
    const maxScrollWidth = products.scrollWidth - window.innerWidth;
    const translateX = -progress * maxScrollWidth;
    console.log(window.innerWidth);

    products.style.transform = `translateX(${translateX}px)`;

    // Update progress bar
    if (indicator) {
      indicator.style.width = `${progress * 100}%`;
    }
  };

  // 3. Initialize dimensions
  const initDimensions = () => {
    const productsWidth = products.scrollWidth;
    const viewportWidth = window.innerWidth;

    // Set scroll section height based on content width
    const heightRatio = stickySection.offsetHeight / viewportWidth;
    scrollSection.style.minHeight = `${
      stickySection.offsetHeight + productsWidth * heightRatio
    }px`;
  };

  // 4. Set up event listeners
  window.addEventListener("load", () => {
    initDimensions();
    animateOnScroll();
  });

  window.addEventListener("scroll", () => {
    animateOnScroll();
  });

  window.addEventListener("resize", () => {
    initDimensions();
    animateOnScroll();
  });
};
