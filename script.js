document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Mobile navigation
  // -----------------------------
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });

    // Close menu when clicking outside it
    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // -----------------------------
  // Gallery filtering
  // -----------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      galleryItems.forEach((item) => {
        const categories = (item.dataset.category || "").split(/\s+/);
        const shouldShow =
          filter === "all" || categories.includes(filter);

        if (shouldShow) {
          item.style.display = "";

          requestAnimationFrame(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          });
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.96)";

          setTimeout(() => {
            if (item.style.opacity === "0") {
              item.style.display = "none";
            }
          }, 220);
        }
      });
    });
  });

  // -----------------------------
  // Gallery lightbox
  // -----------------------------
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeLightbox = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  let currentIndex = 0;
  let lastFocusedPhoto = null;

  const getCurrentItems = () =>
    Array.from(galleryItems).filter(
      (item) =>
        window.getComputedStyle(item).display !== "none"
    );

  const getPhotoData = (item) => {
    const image = item.querySelector("img");

    if (!image) return null;

    return {
      src: image.currentSrc || image.src,

      alt:
        image.alt ||
        "Kaveri Unnatii Apartment gallery photo",

      caption:
        item.dataset.caption ||
        image.dataset.caption ||
        image.alt ||
        "Kaveri Unnatii Apartment"
    };
  };

  const showPhoto = (index) => {
    const items = getCurrentItems();

    if (!items.length || !lightbox || !lightboxImg) {
      return;
    }

    currentIndex =
      (index + items.length) % items.length;

    const data = getPhotoData(items[currentIndex]);

    if (!data) return;

    // Fade image while changing
    lightboxImg.style.opacity = "0";

    // Set onload before changing src
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = "1";
    };

    lightboxImg.onerror = () => {
      lightboxImg.style.opacity = "1";
      lightboxImg.alt = "Unable to load this image";
    };

    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;

    if (lightboxCaption) {
      lightboxCaption.textContent = data.caption;
    }

    if (prevButton) {
      prevButton.disabled = items.length <= 1;
    }

    if (nextButton) {
      nextButton.disabled = items.length <= 1;
    }
  };

  const openLightbox = (item) => {
    if (!lightbox) return;

    const items = getCurrentItems();
    const index = items.indexOf(item);

    if (index < 0) return;

    lastFocusedPhoto =
      item.querySelector("img") || item;

    showPhoto(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");

    if (closeLightbox) {
      closeLightbox.focus();
    }
  };

  const hideLightbox = () => {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");

    if (
      lastFocusedPhoto &&
      typeof lastFocusedPhoto.focus === "function"
    ) {
      lastFocusedPhoto.focus();
    }

    lastFocusedPhoto = null;
  };

  // Make gallery photos clickable and accessible
  galleryItems.forEach((item) => {
    const image = item.querySelector("img");

    if (image && !image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

    item.addEventListener("click", () => {
      openLightbox(item);
    });

    item.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openLightbox(item);
      }
    });

    if (image && !item.hasAttribute("tabindex")) {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");

      item.setAttribute(
        "aria-label",
        image.alt
          ? `Open ${image.alt}`
          : "Open gallery image"
      );
    }
  });

  // Close button
  if (closeLightbox) {
    closeLightbox.addEventListener(
      "click",
      hideLightbox
    );
  }

  // Previous button
  if (prevButton) {
    prevButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showPhoto(currentIndex - 1);
    });
  }

  // Next button
  if (nextButton) {
    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showPhoto(currentIndex + 1);
    });
  }

  // Click outside image to close
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        hideLightbox();
      }
    });
  }

  // -----------------------------
  // Keyboard controls
  // -----------------------------
  document.addEventListener("keydown", (event) => {

    // Escape closes mobile menu
    if (
      event.key === "Escape" &&
      nav &&
      nav.classList.contains("open")
    ) {
      nav.classList.remove("open");

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );
      }

      return;
    }

    // Lightbox controls
    if (
      !lightbox ||
      !lightbox.classList.contains("open")
    ) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      hideLightbox();
    }

    else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    }

    else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    }
  });

  // -----------------------------
  // Touch swipe for lightbox
  // -----------------------------
  let touchStartX = 0;
  let touchStartY = 0;

  if (lightbox) {

    lightbox.addEventListener(
      "touchstart",
      (event) => {
        const touch =
          event.changedTouches[0];

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (event) => {
        const touch =
          event.changedTouches[0];

        const deltaX =
          touch.clientX - touchStartX;

        const deltaY =
          touch.clientY - touchStartY;

        // Only process mostly-horizontal swipes
        if (
          Math.abs(deltaX) < 50 ||
          Math.abs(deltaX) < Math.abs(deltaY)
        ) {
          return;
        }

        if (deltaX < 0) {
          showPhoto(currentIndex + 1);
        } else {
          showPhoto(currentIndex - 1);
        }
      },
      { passive: true }
    );
  }

  // -----------------------------
  // Back to top button
  // -----------------------------
  const backToTop =
    document.querySelector(".back-to-top");

  if (backToTop) {

    const updateBackToTop = () => {
      backToTop.classList.toggle(
        "show",
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      updateBackToTop,
      { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener(
      "click",
      (event) => {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    );
  }

  // -----------------------------
  // Smooth internal navigation
  // -----------------------------
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          // Close mobile menu
          if (nav && menuToggle) {
            nav.classList.remove("open");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            menuToggle.setAttribute(
              "aria-label",
              "Open menu"
            );
          }
        }
      );
    });

  // -----------------------------
  // Image error fallback
  // -----------------------------
  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {
          image.classList.add("image-error");

          image.setAttribute(
            "alt",
            "Image unavailable"
          );
        }
      );
    });

  // -----------------------------
  // Website initialized
  // -----------------------------
  console.log(
    "Kaveri Unnatii Apartment website initialized."
  );
});
