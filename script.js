/* =========================================================
   KAVERI UNNATII APARTMENT
   Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuBtn.textContent = isOpen ? "×" : "☰";

    });


    /* Close menu after selecting a section */

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        menuBtn.textContent = "☰";

      });

    });

  }


  /* =======================================================
     GALLERY
  ======================================================= */

  const galleryGrid = document.getElementById("galleryGrid");
  const filterButtons =
    document.querySelectorAll(".gallery-filter");

  let galleryItems = [];
  let visibleItems = [];

  if (galleryGrid) {

    galleryItems =
      Array.from(
        galleryGrid.querySelectorAll(".photo-card")
      );

    visibleItems = [...galleryItems];

  }


  /* =======================================================
     GALLERY FILTERS
  ======================================================= */

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter =
        button.dataset.filter || "all";


      /* Update active button */

      filterButtons.forEach(btn => {

        btn.classList.remove("active");

      });

      button.classList.add("active");


      /* Filter photos */

      galleryItems.forEach(item => {

        const categories =
          (item.dataset.category || "")
            .toLowerCase()
            .split(/\s+/);

        const shouldShow =
          filter === "all" ||
          categories.includes(filter.toLowerCase());

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

          }, 180);

        }

      });


      visibleItems =
        galleryItems.filter(item => {

          const categories =
            (item.dataset.category || "")
              .toLowerCase()
              .split(/\s+/);

          return (
            filter === "all" ||
            categories.includes(filter.toLowerCase())
          );

        });

    });

  }


  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImg =
    document.getElementById("lightboxImg");

  const closeLightbox =
    document.getElementById("closeLightbox");

  const lightboxPrev =
    document.getElementById("lightboxPrev");

  const lightboxNext =
    document.getElementById("lightboxNext");


  let currentIndex = 0;


  function getCurrentItems() {

    return visibleItems.filter(item => {

      return (
        item.style.display !== "none"
      );

    });

  }


  function showPhoto(index) {

    const items =
      getCurrentItems();

    if (!items.length) {
      return;
    }

    if (index < 0) {
      index = items.length - 1;
    }

    if (index >= items.length) {
      index = 0;
    }

    currentIndex = index;

    const item = items[currentIndex];

    const fullImage =
      item.dataset.full ||
      item.querySelector("img")?.src;

    const thumbnail =
      item.querySelector("img");

    if (!fullImage || !lightboxImg) {
      return;
    }

    lightboxImg.src = fullImage;

    lightboxImg.alt =
      thumbnail?.alt ||
      "Kaveri Unnatii community photograph";

  }


  function openLightbox(index) {

    const items =
      getCurrentItems();

    if (!items.length || !lightbox) {
      return;
    }

    currentIndex = index;

    showPhoto(currentIndex);

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";

    closeLightbox?.focus();

  }


  function closePhotoViewer() {

    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

    if (lightboxImg) {
      lightboxImg.src = "";
    }

  }


  /* Open photo when card is clicked */

  galleryItems.forEach(item => {

    item.addEventListener("click", () => {

      const items =
        getCurrentItems();

      const index =
        items.indexOf(item);

      openLightbox(
        index >= 0 ? index : 0
      );

    });

  });


  /* Previous */

  lightboxPrev?.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      const items =
        getCurrentItems();

      if (!items.length) {
        return;
      }

      showPhoto(currentIndex - 1);

    }
  );


  /* Next */

  lightboxNext?.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      const items =
        getCurrentItems();

      if (!items.length) {
        return;
      }

      showPhoto(currentIndex + 1);

    }
  );


  /* Close button */

  closeLightbox?.addEventListener(
    "click",
    closePhotoViewer
  );


  /* Click outside image */

  lightbox?.addEventListener(
    "click",
    event => {

      if (
        event.target === lightbox
      ) {

        closePhotoViewer();

      }

    }
  );


  /* =======================================================
     KEYBOARD CONTROLS
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        lightbox &&
        lightbox.classList.contains("open")
      ) {

        if (event.key === "Escape") {

          closePhotoViewer();

        }

        if (event.key === "ArrowLeft") {

          showPhoto(currentIndex - 1);

        }

        if (event.key === "ArrowRight") {

          showPhoto(currentIndex + 1);

        }

      }

    }
  );


  /* =======================================================
     TOUCH / SWIPE SUPPORT
  ======================================================= */

  let touchStartX = 0;
  let touchEndX = 0;


  lightbox?.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  lightbox?.addEventListener(
    "touchend",
    event => {

      touchEndX =
        event.changedTouches[0].screenX;

      const difference =
        touchStartX - touchEndX;


      if (Math.abs(difference) < 50) {
        return;
      }


      if (difference > 0) {

        showPhoto(currentIndex + 1);

      } else {

        showPhoto(currentIndex - 1);

      }

    },
    { passive: true }
  );


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backToTop =
    document.getElementById("backToTop");


  function updateBackToTop() {

    if (!backToTop) {
      return;
    }

    if (window.scrollY > 500) {

      backToTop.classList.add("show");

    } else {

      backToTop.classList.remove("show");

    }

  }


  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );


  updateBackToTop();


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

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

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document.querySelectorAll(
    "img"
  ).forEach(img => {

    img.addEventListener(
      "error",
      () => {

        img.style.opacity = "0.35";

        console.warn(
          "Image could not be loaded:",
          img.src
        );

      }
    );

  });


  /* =======================================================
     INITIALIZE
  ======================================================= */

  console.log(
    "Kaveri Unnatii website initialized."
  );

  console.log(
    `${galleryItems.length} gallery photos loaded.`
  );

});
