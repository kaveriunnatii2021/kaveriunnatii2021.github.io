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
        caption:
          "A view of our beautiful apartment community."
      },
      {
        src: KAVERI_IMAGES.brochure,
        title: "Apartment Brochure",
        caption:
          "Kaveri Unnatii Apartment."
      },
      {
        src: KAVERI_IMAGES.archive1,
        title: "Apartment View",
        caption:
          "A glimpse of Kaveri Unnatii."
      },
      {
        src: KAVERI_IMAGES.archive2,
        title: "Community View",
        caption:
          "Our apartment and surrounding community."
      }
    ]
  },


  "sankranti-2023": {
    title: "Sankranti 2023",
    kicker: "Festival Memories",
    category: "festival",

    images: [
      {
        src:
          "images/Gallery/2023-sankranti/community-feast-01.webp",
        title: "Community Feast",
        caption:
          "Residents coming together for Sankranti celebrations."
      },
      {
        src:
          "images/Gallery/2023-sankranti/community-feast-02.webp",
        title: "Sankranti Celebration",
        caption:
          "A memorable celebration with our apartment community."
      },
      {
        src:
          "images/Gallery/2023-sankranti/community-group-01.webp",
        title: "Community Gathering",
        caption:
          "Residents celebrating together."
      },
      {
        src:
          "images/Gallery/2023-sankranti/community-group-02.webp",
        title: "Festival Gathering",
        caption:
          "Wonderful memories from Sankranti 2023."
      }
    ]
  },


  "holi-2023": {
    title: "Holi 2023",
    kicker: "Festival Memories",
    category: "festival",

    images: [
      {
        src:
          "images/Gallery/2023-holi/family-01.webp",
        title: "Holi with Family",
        caption:
          "Celebrating the festival of colours together."
      },
      {
        src:
          "images/Gallery/2023-holi/holi-community-01.webp",
        title: "Holi Community Celebration",
        caption:
          "Residents enjoying Holi together."
      },
      {
        src:
          "images/Gallery/2023-holi/holi-fun-01.webp",
        title: "Holi Fun",
        caption:
          "Colourful memories from Holi 2023."
      }
    ]
  },


  "community-2023": {
    title: "Community 2023",
    kicker: "Community Life",
    category: "community",

    images: [
      {
        src:
          "images/Gallery/2023-community/campus-visit-01.webp",
        title: "Community Visit",
        caption:
          "A memorable community activity."
      },
      {
        src:
          "images/Gallery/2023-community/families-01.webp",
        title: "Our Families",
        caption:
          "Residents and families of Kaveri Unnatii."
      }
    ]
  },


  "events-2026": {
    title: "Events 2026",
    kicker: "Latest Memories",
    category: "2026",

    images: [
      {
        src:
          "images/Gallery/2026-events/event-photo-01.webp",
        title: "Community Event",
        caption:
          "One of our memorable events in 2026."
      },
      {
        src:
          "images/Gallery/2026-events/event-photo-02.webp",
        title: "Residents Together",
        caption:
          "Celebrating community spirit at Kaveri Unnatii."
      }
    ]
  }

};


/* =========================================================
   HERO IMAGE
   ========================================================= */

function setHeroBackground() {

  const hero =
    document.querySelector(".hero");

  if (!hero) return;

  hero.style.backgroundImage =
    `linear-gradient(
      rgba(0,0,0,.35),
      rgba(0,0,0,.45)
    ),
    url("${KAVERI_IMAGES.apartment}")`;
}


/* =========================================================
   GALLERY VARIABLES
   ========================================================= */

let currentAlbum = null;
let currentImageIndex = 0;

let galleryModal = null;
let galleryModalImage = null;
let galleryModalTitle = null;
let galleryModalCaption = null;
let galleryModalCounter = null;
let galleryModalKicker = null;
let galleryThumbnails = null;
let galleryPrev = null;
let galleryNext = null;
let galleryModalClose = null;

let galleryTouchStartX = 0;
let galleryTouchEndX = 0;


/* =========================================================
   CACHE GALLERY ELEMENTS
   ========================================================= */

function cacheGalleryElements() {

  galleryModal =
    document.getElementById("galleryModal");

  galleryModalImage =
    document.getElementById("galleryModalImage");

  galleryModalTitle =
    document.getElementById("galleryModalTitle");

  galleryModalCaption =
    document.getElementById("galleryModalCaption");

  galleryModalCounter =
    document.getElementById("galleryModalCounter");

  galleryModalKicker =
    document.getElementById("galleryModalKicker");

  galleryThumbnails =
    document.getElementById("galleryThumbnails");

  galleryPrev =
    document.getElementById("galleryPrev");

  galleryNext =
    document.getElementById("galleryNext");

  galleryModalClose =
    document.getElementById("galleryModalClose");
}


/* =========================================================
   OPEN GALLERY
   ========================================================= */

function openGallery(
  albumId,
  imageIndex = 0
) {

  const album =
    galleryData[albumId];

  if (!album) return;

  if (!galleryModal) {
    createGalleryModal();
    cacheGalleryElements();
  }

  if (!galleryModal) return;

  currentAlbum = albumId;

  currentImageIndex =
    Number.isFinite(imageIndex)
      ? imageIndex
      : 0;

  if (
    currentImageIndex < 0 ||
    currentImageIndex >= album.images.length
  ) {
    currentImageIndex = 0;
  }

  renderGalleryImage();

  galleryModal.classList.add("open");

  galleryModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "gallery-modal-open"
  );

  document.body.style.overflow = "hidden";

  renderGalleryThumbnails();

  if (galleryModalClose) {
    galleryModalClose.focus();
  }
}


/* =========================================================
   CLOSE GALLERY
   ========================================================= */

function closeGallery() {

  if (!galleryModal) return;

  galleryModal.classList.remove("open");

  galleryModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "gallery-modal-open"
  );

  document.body.style.overflow = "";

  currentAlbum = null;
  currentImageIndex = 0;
}


/* =========================================================
   DISPLAY CURRENT IMAGE
   ========================================================= */

function renderGalleryImage() {

  if (!currentAlbum) return;

  const album =
    galleryData[currentAlbum];

  if (!album) return;

  const image =
    album.images[currentImageIndex];

  if (!image) return;


  if (galleryModalImage) {

    galleryModalImage.src =
      image.src;

    galleryModalImage.alt =
      image.title ||
      album.title;
  }


  if (galleryModalTitle) {

    galleryModalTitle.textContent =
      image.title ||
      album.title;
  }


  if (galleryModalCaption) {

    galleryModalCaption.textContent =
      image.caption || "";
  }


  if (galleryModalKicker) {

    galleryModalKicker.textContent =
      album.kicker || "";
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

  const album =
    galleryData[currentAlbum];

  if (
    !album ||
    album.images.length === 0
  ) {
    return;
  }

  currentImageIndex =
    (
      currentImageIndex -
      1 +
      album.images.length
    ) %
    album.images.length;

  renderGalleryImage();
}


/* =========================================================
   NEXT IMAGE
   ========================================================= */

function showNextGalleryImage() {

  if (!currentAlbum) return;

  const album =
    galleryData[currentAlbum];

  if (
    !album ||
    album.images.length === 0
  ) {
    return;
  }

  currentImageIndex =
    (
      currentImageIndex +
      1
    ) %
    album.images.length;

  renderGalleryImage();
}


/* =========================================================
   NAVIGATION BUTTON STATE
   ========================================================= */

function updateGalleryNavigation() {

  if (!currentAlbum) return;

  const album =
    galleryData[currentAlbum];

  if (!album) return;

  const hasMultipleImages =
    album.images.length > 1;


  if (galleryPrev) {

    galleryPrev.disabled =
      !hasMultipleImages;
  }


  if (galleryNext) {

    galleryNext.disabled =
      !hasMultipleImages;
  }
}


/* =========================================================
   CREATE THUMBNAILS
   ========================================================= */

function renderGalleryThumbnails() {

  if (
    !galleryThumbnails ||
    !currentAlbum
  ) {
    return;
  }

  const album =
    galleryData[currentAlbum];

  if (!album) return;

  galleryThumbnails.innerHTML = "";


  album.images.forEach(
    (image, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "gallery-thumbnail";


      if (
        index === currentImageIndex
      ) {
        button.classList.add("active");
      }


      button.setAttribute(
        "aria-label",
        `Open image ${index + 1}: ${image.title || ""}`
      );


      const img =
        document.createElement("img");

      img.src =
        image.src;

      img.alt =
        image.title || "";


      button.appendChild(img);


      button.addEventListener(
        "click",
        () => {

          currentImageIndex =
            index;

          renderGalleryImage();
        }
      );


      galleryThumbnails.appendChild(
        button
      );
    }
  );
}


/* =========================================================
   ACTIVE THUMBNAIL
   ========================================================= */

function updateActiveThumbnail() {

  if (!galleryThumbnails) return;

  const thumbnails =
    galleryThumbnails.querySelectorAll(
      ".gallery-thumbnail"
    );


  thumbnails.forEach(
    (thumbnail, index) => {

      thumbnail.classList.toggle(
        "active",
        index === currentImageIndex
      );
    }
  );


  const activeThumbnail =
    galleryThumbnails.querySelector(
      ".gallery-thumbnail.active"
    );

  if (activeThumbnail) {

    activeThumbnail.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }
}


/* =========================================================
   IMPROVED GALLERY FILTER
   =========================================================
   
   Supports:
   - all
   - apartment
   - festival
   - community
   - 2026
   
   Also allows a gallery item to have multiple
   categories separated by spaces.
   Example:
   
   data-category="community 2026"
   
   ========================================================= */

function filterGallery(filter = "all") {

  const items =
    document.querySelectorAll(
      "[data-gallery-item]"
    );


  items.forEach(
    (item) => {

      const categoryString =
        (
          item.dataset.category ||
          ""
        ).trim();


      const categories =
        categoryString
          .split(/\s+/)
          .filter(Boolean);


      let visible = false;


      if (filter === "all") {

        visible = true;

      } else {

        visible =
          categories.includes(filter);
      }


      item.style.display =
        visible
          ? ""
          : "none";


      item.setAttribute(
        "aria-hidden",
        visible
          ? "false"
          : "true"
      );
    }
  );


  const filterButtons =
    document.querySelectorAll(
      ".gallery-filter"
    );


  filterButtons.forEach(
    (button) => {

      const isActive =
        button.dataset.filter ===
        filter;


      button.classList.toggle(
        "active",
        isActive
      );


      button.setAttribute(
        "aria-selected",
        isActive
          ? "true"
          : "false"
      );
    }
  );


  /* Smoothly reposition the gallery
     after filtering. */

  const gallery =
    document.querySelector(
      ".gallery-mosaic"
    );

  if (gallery) {

    gallery.style.opacity = "0.75";

    requestAnimationFrame(
      () => {

        gallery.style.opacity = "1";
      }
    );
  }
}


/* =========================================================
   GALLERY TILE CLICK
   ========================================================= */

function setupGalleryTiles() {

  const items =
    document.querySelectorAll(
      "[data-gallery-item]"
    );


  items.forEach(
    (item) => {

      item.addEventListener(
        "click",
        () => {

          const albumId =
            item.dataset.album;

          const index =
            Number.parseInt(
              item.dataset.index || "0",
              10
            );


          openGallery(
            albumId,
            Number.isNaN(index)
              ? 0
              : index
          );
        }
      );


      item.setAttribute(
        "tabindex",
        "0"
      );


      item.setAttribute(
        "role",
        "button"
      );


      item.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            const albumId =
              item.dataset.album;

            const index =
              Number.parseInt(
                item.dataset.index || "0",
                10
              );


            openGallery(
              albumId,
              Number.isNaN(index)
                ? 0
                : index
            );
          }
        }
      );
    }
  );
}


/* =========================================================
   GALLERY FILTER BUTTONS
   ========================================================= */

function setupGalleryFilters() {

  const filterButtons =
    document.querySelectorAll(
      ".gallery-filter"
    );


  filterButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          filterGallery(
            button.dataset.filter ||
            "all"
          );
        }
      );
    }
  );


  /* Make sure the gallery starts
     with "All" selected. */

  const activeButton =
    document.querySelector(
      ".gallery-filter.active"
    );

  filterGallery(
    activeButton
      ? activeButton.dataset.filter
      : "all"
  );
}


/* =========================================================
   LIGHTBOX EVENTS
   ========================================================= */

function setupGalleryModal() {

  if (!galleryModal) return;


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


  /* Clicking the dark background closes
     the lightbox, but clicking the content
     does not. */

  galleryModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        galleryModal
      ) {
        closeGallery();
      }
    }
  );
}


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

function setupGalleryKeyboard() {

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !galleryModal ||
        !galleryModal.classList.contains("open")
      ) {
        return;
      }


      switch (event.key) {

        case "Escape":

          closeGallery();

          break;


        case "ArrowLeft":

          event.preventDefault();

          showPreviousGalleryImage();

          break;


        case "ArrowRight":

          event.preventDefault();

          showNextGalleryImage();

          break;
      }
    }
  );
}


/* =========================================================
   TOUCH / SWIPE NAVIGATION
   ========================================================= */

function setupGallerySwipe() {

  if (!galleryModal) return;


  galleryModal.addEventListener(
    "touchstart",
    (event) => {

      if (
        !event.touches ||
        !event.touches.length
      ) {
        return;
      }

      galleryTouchStartX =
        event.touches[0].clientX;
    },
    {
      passive: true
    }
  );


  galleryModal.addEventListener(
    "touchend",
    (event) => {

      if (
        !event.changedTouches ||
        !event.changedTouches.length
      ) {
        return;
      }

      galleryTouchEndX =
        event.changedTouches[0].clientX;


      const distance =
        galleryTouchEndX -
        galleryTouchStartX;


      const minimumSwipe =
        50;


      if (
        Math.abs(distance) <
        minimumSwipe
      ) {
        return;
      }


      if (distance < 0) {

        showNextGalleryImage();

      } else {

        showPreviousGalleryImage();
      }
    },
    {
      passive: true
    }
  );
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupMobileNavigation() {

  const menuButton =
    document.querySelector(
      ".menu-btn"
    );

  const nav =
    document.querySelector(
      "nav"
    );


  if (
    !menuButton ||
    !nav
  ) {
    return;
  }


  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle(
          "open"
        );


      menuButton.setAttribute(
        "aria-expanded",
        isOpen
          ? "true"
          : "false"
      );


      menuButton.textContent =
        isOpen
          ? "✕"
          : "☰";
    }
  );


  /* Close mobile menu after
     selecting a navigation link. */

  nav.querySelectorAll("a")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            nav.classList.remove(
              "open"
            );

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

            menuButton.textContent =
              "☰";
          }
        );
      }
    );


  /* Close menu when clicking outside. */

  document.addEventListener(
    "click",
    (event) => {

      if (
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        nav.classList.remove(
          "open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.textContent =
          "☰";
      }
    }
  );
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {

  const button =
    document.getElementById(
      "backToTop"
    );


  if (!button) return;


  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 500) {

        button.classList.add(
          "show"
        );

      } else {

        button.classList.remove(
          "show"
        );
      }
    },
    {
      passive: true
    }
  );


  button.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );
}


/* =========================================================
   CREATE GALLERY MODAL
   ========================================================= */

function createGalleryModal() {

  if (
    document.getElementById(
      "galleryModal"
    )
  ) {
    return;
  }


  const modal =
    document.createElement("div");

  modal.id =
    "galleryModal";

  modal.className =
    "gallery-lightbox";

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `

    <div class="gallery-lightbox-dialog">

      <div class="gallery-lightbox-header">

        <div>
          <span
            class="gallery-lightbox-kicker"
            id="galleryModalKicker"
          ></span>

          <h3
            id="galleryModalTitle"
          ></h3>
        </div>

        <div
          class="gallery-lightbox-header-right"
        >

          <span
            id="galleryModalCounter"
          ></span>

          <button
            type="button"
            class="gallery-lightbox-close"
            id="galleryModalClose"
            aria-label="Close gallery"
          >
            ✕
          </button>

        </div>

      </div>


      <div class="gallery-lightbox-main">

        <button
          type="button"
          class="gallery-lightbox-nav gallery-lightbox-prev"
          id="galleryPrev"
          aria-label="Previous image"
        >
          ‹
        </button>


        <div class="gallery-lightbox-image-wrap">

          <img
            id="galleryModalImage"
            src=""
            alt=""
          >

        </div>


        <button
          type="button"
          class="gallery-lightbox-nav gallery-lightbox-next"
          id="galleryNext"
          aria-label="Next image"
        >
          ›
        </button>

      </div>


      <div
        class="gallery-lightbox-caption"
      >

        <p
          id="galleryModalCaption"
        ></p>

      </div>


      <div
        class="gallery-thumbnails"
        id="galleryThumbnails"
        aria-label="Gallery thumbnails"
      ></div>

    </div>

  `;


  document.body.appendChild(
    modal
  );
}


/* =========================================================
   LEGACY GALLERY FALLBACK
   =========================================================
   
   Keeps compatibility with older versions
   of the page if an old album grid exists.

   ========================================================= */

function createModernGalleryFromData() {

  const oldGallery =
    document.querySelector(
      ".album-grid"
    );


  if (!oldGallery) {
    return;
  }


  /* Do not replace an already
     modern gallery. */

  if (
    document.querySelector(
      ".gallery-mosaic"
    )
  ) {
    return;
  }


  const mosaic =
    document.createElement(
      "div"
    );

  mosaic.className =
    "gallery-mosaic";


  let globalIndex = 0;


  Object.entries(
    galleryData
  ).forEach(
    ([albumId, album]) => {

      album.images.forEach(
        (image, imageIndex) => {

          const button =
            document.createElement(
              "button"
            );

          button.type =
            "button";

          button.className =
            "gallery-tile";

          button.dataset.galleryItem =
            "";

          button.dataset.album =
            albumId;

          button.dataset.index =
            imageIndex;

          button.dataset.category =
            `${album.category} ${album.category === "2026" ? "community" : ""}`.trim();


          /* Create visual variation
             throughout the mosaic. */

          if (globalIndex === 0) {

            button.classList.add(
              "gallery-tile-featured"
            );

          } else if (
            globalIndex === 1 ||
            globalIndex === 5
          ) {

            button.classList.add(
              "gallery-tile-tall"
            );

          } else if (
            globalIndex === 3 ||
            globalIndex === 7
          ) {

            button.classList.add(
              "gallery-tile-wide"
            );
          }


          button.innerHTML = `

            <img
              src="${image.src}"
              alt="${image.title || album.title}"
              loading="lazy"
            >

            <span
              class="gallery-tile-overlay"
            >

              <span>
                <strong>
                  ${image.title || album.title}
                </strong>

                <small>
                  ${album.kicker || ""}
                </small>
              </span>

            </span>

          `;


          mosaic.appendChild(
            button
          );


          globalIndex++;
        }
      );
    }
  );


  oldGallery.replaceWith(
    mosaic
  );
}


/* =========================================================
   LAZY IMAGE ERROR HANDLING
   ========================================================= */

function setupImageErrorHandling() {

  document
    .querySelectorAll(
      "img"
    )
    .forEach(
      (image) => {

        image.addEventListener(
          "error",
          () => {

            image.classList.add(
              "image-load-error"
            );

            image.setAttribute(
              "data-image-error",
              "true"
            );
          }
        );
      }
    );
}


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

function initializeKaveriWebsite() {

  setHeroBackground();

  createModernGalleryFromData();

  createGalleryModal();

  cacheGalleryElements();

  setupGalleryTiles();

  setupGalleryFilters();

  setupGalleryModal();

  setupGalleryKeyboard();

  setupGallerySwipe();

  setupMobileNavigation();

  setupBackToTop();

  setupImageErrorHandling();
}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeKaveriWebsite
  );

} else {

  initializeKaveriWebsite();
}
