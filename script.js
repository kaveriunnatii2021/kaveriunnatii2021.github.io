/* =========================================================
   KAVERI UNNATII APARTMENT
   Main Website JavaScript
   Gallery + Lightbox + Navigation
   ========================================================= */

/* =========================================================
   GALLERY IMAGE PATHS
   ========================================================= */

const KAVERI_IMAGES = {
  apartment:
    "images/Gallery/Our%20Apartment/kaveri-apartment.webp",

  brochure:
    "images/Gallery/Our%20Apartment/kaveri-brochure.jpg",

  archive1:
    "images/Gallery/Our%20Apartment/ak_1636_1434620735-1636795039_700x700%20(1).jpeg",

  archive2:
    "images/Gallery/Our%20Apartment/ak_284_410379319-1567147494_300x300.png"
};


/* =========================================================
   GALLERY DATA
   ========================================================= */

const galleryData = {
  "our-apartment": {
    title: "Our Apartment",
    kicker: "Kaveri Unnatii",
    category: "apartment",
    images: [
      {
        src: KAVERI_IMAGES.apartment,
        title: "Kaveri Unnatii Apartment",
        caption: "A view of our beautiful apartment community."
      },
      {
        src: KAVERI_IMAGES.brochure,
        title: "Apartment Brochure",
        caption: "Kaveri Unnatii Apartment."
      },
      {
        src: KAVERI_IMAGES.archive1,
        title: "Apartment View",
        caption: "A glimpse of Kaveri Unnatii."
      },
      {
        src: KAVERI_IMAGES.archive2,
        title: "Community View",
        caption: "Our apartment and surrounding community."
      }
    ]
  },

  "sankranti-2023": {
    title: "Sankranti 2023",
    kicker: "Festival Memories",
    category: "festival",
    images: [
      {
        src: "images/Gallery/2023-sankranti/community-feast-01.webp",
        title: "Community Feast",
        caption: "Residents coming together for Sankranti celebrations."
      },
      {
        src: "images/Gallery/2023-sankranti/community-feast-02.webp",
        title: "Sankranti Celebration",
        caption: "A memorable celebration with our apartment community."
      },
      {
        src: "images/Gallery/2023-sankranti/community-group-01.webp",
        title: "Community Gathering",
        caption: "Residents celebrating together."
      },
      {
        src: "images/Gallery/2023-sankranti/community-group-02.webp",
        title: "Festival Gathering",
        caption: "Wonderful memories from Sankranti 2023."
      }
    ]
  },

  "holi-2023": {
    title: "Holi 2023",
    kicker: "Festival Memories",
    category: "festival",
    images: [
      {
        src: "images/Gallery/2023-holi/family-01.webp",
        title: "Holi with Family",
        caption: "Celebrating the festival of colours together."
      },
      {
        src: "images/Gallery/2023-holi/holi-community-01.webp",
        title: "Holi Community Celebration",
        caption: "Residents enjoying Holi together."
      },
      {
        src: "images/Gallery/2023-holi/holi-fun-01.webp",
        title: "Holi Fun",
        caption: "Colourful memories from Holi 2023."
      }
    ]
  },

  "community-2023": {
    title: "Community 2023",
    kicker: "Community Life",
    category: "community",
    images: [
      {
        src: "images/Gallery/2023-community/campus-visit-01.webp",
        title: "Community Visit",
        caption: "A memorable community activity."
      },
      {
        src: "images/Gallery/2023-community/families-01.webp",
        title: "Our Families",
        caption: "Residents and families of Kaveri Unnatii."
      }
    ]
  },

  "events-2026": {
    title: "Events 2026",
    kicker: "Latest Memories",
    category: "2026",
    images: [
      {
        src: "images/Gallery/2026-events/event-photo-01.webp",
        title: "Community Event",
        caption: "One of our memorable events in 2026."
      },
      {
        src: "images/Gallery/2026-events/event-photo-02.webp",
        title: "Residents Together",
        caption: "Celebrating community spirit at Kaveri Unnatii."
      }
    ]
  }
};


/* =========================================================
   HERO IMAGE
   ========================================================= */

function setHeroBackground() {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  hero.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.45)), url("${KAVERI_IMAGES.apartment}")`;
}


/* =========================================================
   GALLERY VARIABLES
   ========================================================= */

let currentAlbum = null;
let currentImageIndex = 0;

const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryModalCaption = document.getElementById("galleryModalCaption");
const galleryModalCounter = document.getElementById("galleryModalCounter");
const galleryModalKicker = document.getElementById("galleryModalKicker");
const galleryThumbnails = document.getElementById("galleryThumbnails");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryModalClose = document.getElementById("galleryModalClose");


/* =========================================================
   OPEN GALLERY
   ========================================================= */

function openGallery(albumId, imageIndex = 0) {
  const album = galleryData[albumId];

  if (!album || !galleryModal) return;

  currentAlbum = albumId;
  currentImageIndex = imageIndex;

  renderGalleryImage();

  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("gallery-modal-open");

  renderGalleryThumbnails();
}


/* =========================================================
   CLOSE GALLERY
   ========================================================= */

function closeGallery() {
  if (!galleryModal) return;

  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("gallery-modal-open");

  currentAlbum = null;
  currentImageIndex = 0;
}


/* =========================================================
   DISPLAY CURRENT IMAGE
   ========================================================= */

function renderGalleryImage() {
  if (!currentAlbum) return;

  const album = galleryData[currentAlbum];

  if (!album) return;

  const image = album.images[currentImageIndex];

  if (!image) return;

  if (galleryModalImage) {
    galleryModalImage.src = image.src;
    galleryModalImage.alt = image.title || album.title;
  }

  if (galleryModalTitle) {
    galleryModalTitle.textContent = image.title || album.title;
  }

  if (galleryModalCaption) {
    galleryModalCaption.textContent = image.caption || "";
  }

  if (galleryModalKicker) {
    galleryModalKicker.textContent = album.kicker || "";
  }

  if (galleryModalCounter) {
    galleryModalCounter.textContent =
      `${currentImageIndex + 1} / ${album.images.length}`;
  }

  updateGalleryNavigation();
  updateActiveThumbnail();
}


/* =========================================================
   PREVIOUS IMAGE
   ========================================================= */

function showPreviousGalleryImage() {
  if (!currentAlbum) return;

  const album = galleryData[currentAlbum];

  if (!album || album.images.length === 0) return;

  currentImageIndex =
    (currentImageIndex - 1 + album.images.length) %
    album.images.length;

  renderGalleryImage();
}


/* =========================================================
   NEXT IMAGE
   ========================================================= */

function showNextGalleryImage() {
  if (!currentAlbum) return;

  const album = galleryData[currentAlbum];

  if (!album || album.images.length === 0) return;

  currentImageIndex =
    (currentImageIndex + 1) %
    album.images.length;

  renderGalleryImage();
}


/* =========================================================
   NAVIGATION BUTTON STATE
   ========================================================= */

function updateGalleryNavigation() {
  if (!currentAlbum) return;

  const album = galleryData[currentAlbum];

  if (!album) return;

  const hasMultipleImages = album.images.length > 1;

  if (galleryPrev) {
    galleryPrev.disabled = !hasMultipleImages;
  }

  if (galleryNext) {
    galleryNext.disabled = !hasMultipleImages;
  }
}


/* =========================================================
   CREATE THUMBNAILS
   ========================================================= */

function renderGalleryThumbnails() {
  if (!galleryThumbnails || !currentAlbum) return;

  const album = galleryData[currentAlbum];

  if (!album) return;

  galleryThumbnails.innerHTML = "";

  album.images.forEach((image, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "gallery-thumbnail";

    if (index === currentImageIndex) {
      button.classList.add("active");
    }

    button.setAttribute(
      "aria-label",
      `Open image ${index + 1}`
    );

    const img = document.createElement("img");

    img.src = image.src;
    img.alt = image.title || "";

    button.appendChild(img);

    button.addEventListener("click", () => {
      currentImageIndex = index;
      renderGalleryImage();
    });

    galleryThumbnails.appendChild(button);
  });
}


/* =========================================================
   ACTIVE THUMBNAIL
   ========================================================= */

function updateActiveThumbnail() {
  if (!galleryThumbnails) return;

  const thumbnails =
    galleryThumbnails.querySelectorAll(".gallery-thumbnail");

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.classList.toggle(
      "active",
      index === currentImageIndex
    );
  });
}


/* =========================================================
   GALLERY FILTER
   ========================================================= */

function filterGallery(filter) {
  const items =
    document.querySelectorAll("[data-gallery-item]");

  items.forEach((item) => {
    const category = item.dataset.category;

    let visible = false;

    if (filter === "all") {
      visible = true;
    } else if (filter === category) {
      visible = true;
    }

    item.style.display = visible ? "" : "none";
  });

  const filterButtons =
    document.querySelectorAll(".gallery-filter");

  filterButtons.forEach((button) => {
    const isActive =
      button.dataset.filter === filter;

    button.classList.toggle("active", isActive);
    button.setAttribute(
      "aria-selected",
      isActive ? "true" : "false"
    );
  });
}


/* =========================================================
   GALLERY TILE CLICK
   ========================================================= */

function setupGalleryTiles() {
  const items =
    document.querySelectorAll("[data-gallery-item]");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const albumId = item.dataset.album;
      const index =
        Number.parseInt(item.dataset.index || "0", 10);

      openGallery(
        albumId,
        Number.isNaN(index) ? 0 : index
      );
    });
  });
}


/* =========================================================
   GALLERY FILTER BUTTONS
   ========================================================= */

function setupGalleryFilters() {
  const filterButtons =
    document.querySelectorAll(".gallery-filter");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterGallery(button.dataset.filter || "all");
    });
  });
}


/* =========================================================
   LIGHTBOX EVENTS
   ========================================================= */

function setupGalleryModal() {
  if (galleryModalClose) {
    galleryModalClose.addEventListener(
      "click",
      closeGallery
    );
  }

  if (galleryPrev) {
    galleryPrev.addEventListener(
      "click",
      showPreviousGalleryImage
    );
  }

  if (galleryNext) {
    galleryNext.addEventListener(
      "click",
      showNextGalleryImage
    );
  }

  /* Close when clicking backdrop */

  if (galleryModal) {
    galleryModal.addEventListener("click", (event) => {
      if (
        event.target.classList.contains(
          "gallery-lightbox-backdrop"
        )
      ) {
        closeGallery();
      }
    });
  }
}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function setupGalleryKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (!galleryModal ||
        !galleryModal.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showPreviousGalleryImage();
    }

    if (event.key === "ArrowRight") {
      showNextGalleryImage();
    }
  });
}


/* =========================================================
   TOUCH / SWIPE SUPPORT
   ========================================================= */

let galleryTouchStartX = 0;
let galleryTouchEndX = 0;

function setupGallerySwipe() {
  if (!galleryModalImage) return;

  galleryModalImage.addEventListener(
    "touchstart",
    (event) => {
      galleryTouchStartX =
        event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  galleryModalImage.addEventListener(
    "touchend",
    (event) => {
      galleryTouchEndX =
        event.changedTouches[0].screenX;

      handleGallerySwipe();
    },
    { passive: true }
  );
}


function handleGallerySwipe() {
  const distance =
    galleryTouchEndX - galleryTouchStartX;

  const minimumSwipeDistance = 50;

  if (Math.abs(distance) < minimumSwipeDistance) {
    return;
  }

  if (distance > 0) {
    showPreviousGalleryImage();
  } else {
    showNextGalleryImage();
  }
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupMobileNavigation() {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const isOpen =
      nav.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  });

  /* Close menu after selecting a link */

  const navLinks =
    nav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {
  const backToTop =
    document.getElementById("backToTop");

  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function setupSmoothScroll() {
  const links =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
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
    });
  });
}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

function setupImageErrorHandling() {
  document.addEventListener(
    "error",
    (event) => {
      const image = event.target;

      if (!(image instanceof HTMLImageElement)) {
        return;
      }

      image.classList.add("image-load-error");
    },
    true
  );
}


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setHeroBackground();

    setupGalleryTiles();
    setupGalleryFilters();
    setupGalleryModal();
    setupGalleryKeyboard();
    setupGallerySwipe();

    setupMobileNavigation();
    setupBackToTop();
    setupSmoothScroll();
    setupImageErrorHandling();

    /* Show all gallery images initially */

    filterGallery("all");
  }
);


/* =========================================================
   PREVENT BACKGROUND SCROLL WHILE LIGHTBOX IS OPEN
   ========================================================= */

window.addEventListener("wheel", (event) => {
  if (
    galleryModal &&
    galleryModal.classList.contains("open")
  ) {
    const target =
      event.target.closest(
        ".gallery-lightbox-dialog"
      );

    if (!target) {
      event.preventDefault();
    }
  }
}, { passive: false });


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener("resize", () => {
  /*
     Keep the page stable when changing between
     desktop and mobile layouts.
  */

  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");

  if (
    window.innerWidth > 720 &&
    nav &&
    menuBtn
  ) {
    nav.classList.remove("open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }
});
