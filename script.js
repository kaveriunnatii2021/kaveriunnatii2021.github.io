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

  renderGalleryThumbnails();

  document.body.style.overflow = "hidden";
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
        `Open image ${index + 1}`
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
}


/* =========================================================
   GALLERY FILTER
   ========================================================= */

function filterGallery(filter = "all") {

  const items =
    document.querySelectorAll(
      "[data-gallery-item]"
    );


  items.forEach(
    (item) => {

      const category =
        item.dataset.category;

      let visible = false;


      if (filter === "all") {

        visible = true;

      } else if (
        filter === category
      ) {

        visible = true;
      }


      item.style.display =
        visible ? "" : "none";
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


  galleryModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        galleryModal
      ) {

        closeGallery();
      }


      if (
        event.target.classList.contains(
          "gallery-lightbox-backdrop"
        )
      ) {

        closeGallery();
      }
    }
  );
}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function setupGalleryKeyboard() {

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !galleryModal ||
        !galleryModal.classList.contains(
          "open"
        )
      ) {
        return;
      }


      if (event.key === "Escape") {

        event.preventDefault();

        closeGallery();

        return;
      }


      if (
        event.key === "ArrowLeft"
      ) {

        event.preventDefault();

        showPreviousGalleryImage();
      }


      if (
        event.key === "ArrowRight"
      ) {

        event.preventDefault();

        showNextGalleryImage();
      }
    }
  );
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
        event.changedTouches[0]
          .screenX;
    },
    {
      passive: true
    }
  );


  galleryModalImage.addEventListener(
    "touchend",
    (event) => {

      galleryTouchEndX =
        event.changedTouches[0]
          .screenX;

      handleGallerySwipe();
    },
    {
      passive: true
    }
  );
}


function handleGallerySwipe() {

  const distance =
    galleryTouchEndX -
    galleryTouchStartX;


  const minimumSwipeDistance =
    50;


  if (
    Math.abs(distance) <
    minimumSwipeDistance
  ) {
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

  const menuBtn =
    document.getElementById(
      "menuBtn"
    );

  const nav =
    document.getElementById(
      "nav"
    );


  if (!menuBtn || !nav) {
    return;
  }


  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );


  menuBtn.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle(
          "open"
        );


      menuBtn.setAttribute(
        "aria-expanded",
        isOpen
          ? "true"
          : "false"
      );
    }
  );


  const navLinks =
    nav.querySelectorAll("a");


  navLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );


          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      );
    }
  );
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {

  const backToTop =
    document.getElementById(
      "backToTop"
    );


  if (!backToTop) return;


  window.addEventListener(
    "scroll",
    () => {

      if (
        window.scrollY > 400
      ) {

        backToTop.classList.add(
          "show"
        );

      } else {

        backToTop.classList.remove(
          "show"
        );
      }
    },
    {
      passive: true
    }
  );


  backToTop.addEventListener(
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

    <div class="gallery-lightbox-backdrop"></div>

    <div
      class="gallery-lightbox-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="galleryModalTitle"
    >

      <div class="gallery-lightbox-header">

        <div class="gallery-lightbox-heading">

          <div
            id="galleryModalKicker"
            class="gallery-lightbox-kicker"
          ></div>

          <h3
            id="galleryModalTitle"
          ></h3>

        </div>


        <div
          id="galleryModalCounter"
          class="gallery-lightbox-counter"
        ></div>


        <button
          type="button"
          id="galleryModalClose"
          class="gallery-lightbox-close"
          aria-label="Close gallery"
        >
          &times;
        </button>

      </div>


      <div class="gallery-lightbox-main">

        <button
          type="button"
          id="galleryPrev"
          class="gallery-lightbox-nav gallery-lightbox-prev"
          aria-label="Previous image"
        >
          &#10094;
        </button>


        <div class="gallery-lightbox-image-wrap">

          <img
            id="galleryModalImage"
            src=""
            alt=""
          />

          <p
            id="galleryModalCaption"
            class="gallery-lightbox-caption"
          ></p>

        </div>


        <button
          type="button"
          id="galleryNext"
          class="gallery-lightbox-nav gallery-lightbox-next"
          aria-label="Next image"
        >
          &#10095;
        </button>

      </div>


      <div
        id="galleryThumbnails"
        class="gallery-thumbnails"
        aria-label="Gallery thumbnails"
      ></div>

    </div>
  `;


  document.body.appendChild(
    modal
  );
}


/* =========================================================
   FALLBACK: CREATE MODERN GALLERY
   =========================================================
   This allows the new script to work even if the old
   Gallery HTML is still present in index.html.
   ========================================================= */

function createModernGalleryFromData() {

  const oldGallery =
    document.querySelector(
      ".album-grid"
    );


  if (!oldGallery) return;


  /*
   * If the new gallery already exists,
   * do nothing.
   */

  if (
    document.querySelector(
      ".gallery-mosaic"
    )
  ) {
    return;
  }


  const mosaic =
    document.createElement("div");


  mosaic.className =
    "gallery-mosaic";


  let globalIndex = 0;


  Object.entries(
    galleryData
  ).forEach(
    ([albumId, album]) => {

      album.images.forEach(
        (image, imageIndex) => {

          const tile =
            document.createElement(
              "button"
            );


          tile.type =
            "button";


          tile.className =
            "gallery-tile";


          if (
            globalIndex === 0
          ) {

            tile.classList.add(
              "gallery-tile-featured"
            );

          } else if (
            globalIndex % 5 === 0
          ) {

            tile.classList.add(
              "gallery-tile-wide"
            );

          } else if (
            globalIndex % 3 === 0
          ) {

            tile.classList.add(
              "gallery-tile-tall"
            );
          }


          tile.setAttribute(
            "data-gallery-item",
            ""
          );


          tile.dataset.album =
            albumId;


          tile.dataset.index =
            imageIndex;


          tile.dataset.category =
            album.category;


          tile.innerHTML = `

            <span class="gallery-tile-image">

              <img
                src="${image.src}"
                alt="${image.title}"
                loading="lazy"
              />

            </span>

            <span class="gallery-tile-overlay">

              <span class="gallery-tile-kicker">
                ${album.title}
              </span>

              <span class="gallery-tile-title">
                ${image.title}
              </span>

            </span>

          `;


          mosaic.appendChild(
            tile
          );


          globalIndex++;
        }
      );
    }
  );


  /*
   * Replace old album grid.
   */

  oldGallery.replaceWith(
    mosaic
  );
}


/* =========================================================
   INITIALIZE
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

  /*
   * Default Gallery filter.
   */

  filterGallery("all");
}


/* =========================================================
   START WEBSITE
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
