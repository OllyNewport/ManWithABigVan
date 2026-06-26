const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuButton && navMenu) {
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const quoteForm = document.querySelector(".quote-form-card");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const message = [
      "Hi Liam, I'd like a free quote.",
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Subject: ${formData.get("subject") || ""}`,
      `Message: ${formData.get("message") || ""}`,
    ].join("\n");

    window.location.href = `https://wa.me/447359025919?text=${encodeURIComponent(
      message
    )}`;
  });
}

const reviewTrack = document.querySelector(".review-track");
const reviewCards = document.querySelectorAll(".review-card");
const reviewPrev = document.querySelector(".review-prev");
const reviewNext = document.querySelector(".review-next");

if (reviewTrack && reviewCards.length && reviewPrev && reviewNext) {
  let reviewIndex = 0;
  let reviewTimer;

  const updateReviews = () => {
    const maxIndex = Math.max(reviewCards.length - 1, 0);
    reviewIndex = Math.min(reviewIndex, maxIndex);
    const cardWidth = reviewCards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(reviewTrack).gap) || 0;
    reviewTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
  };

  const goToNextReview = () => {
    reviewIndex = (reviewIndex + 1) % reviewCards.length;
    updateReviews();
  };

  const startReviewTimer = () => {
    window.clearInterval(reviewTimer);
    reviewTimer = window.setInterval(goToNextReview, 4500);
  };

  reviewPrev.addEventListener("click", () => {
    reviewIndex = (reviewIndex - 1 + reviewCards.length) % reviewCards.length;
    updateReviews();
    startReviewTimer();
  });

  reviewNext.addEventListener("click", () => {
    goToNextReview();
    startReviewTimer();
  });

  window.addEventListener("resize", updateReviews);
  reviewTrack.addEventListener("mouseenter", () => window.clearInterval(reviewTimer));
  reviewTrack.addEventListener("mouseleave", startReviewTimer);
  updateReviews();
  startReviewTimer();
}
