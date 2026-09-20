/* =========================================================
   KAVERI UNNATII APARTMENT
   Gallery + Lightbox + Navigation
   ========================================================= */


/* =========================================================
   PHOTO ALBUM DATA
   ========================================================= */

const galleryData = {

  "our-apartment": {
    title: "Our Apartment",
    kicker: "Kaveri Unnatii",
    category: "apartment",

    images: [

      {
        src: "images/04-Our-Apartment/kaveri-apartment.webp",
        title: "Kaveri Unnatii Apartment",
        caption: "A view of our beautiful apartment community."
      },

      {
        src: "images/04-Our-Apartment/kaveri-brochure.jpg",
        title: "Apartment Brochure",
        caption: "Kaveri Unnatii Apartment."
      },

      {
        src: "images/04-Our-Apartment/ak_1636_1434620735-1636795039_700x700%20(1).jpeg",
        title: "Apartment View",
        caption: "A glimpse of Kaveri Unnatii."
      },

      {
        src: "images/04-Our-Apartment/ak_284_410379319-1567147494_300x300.png",
        title: "Community View",
        caption: "Our apartment and surrounding community."
      }

    ]
  },


  "new-year-2023-24": {

    title: "New Year Celebration 2023–24",
    kicker: "Festival Memories",
    category: "festival 2023",

    images: Array.from(
      { length: 7 },
      (_, i) => ({

        src:
          `images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-${String(i + 1).padStart(2, "0")}.jpg`,

        title:
          `New Year Celebration — Photo ${i + 1}`,

        caption:
          "New Year celebration memories from Kaveri Unnatii."

      })
    )
  },


  "sankranti-2024": {

    title: "Sankranti Celebration 2024",
    kicker: "Festival Memories",
    category: "festival 2024",

    images: Array.from(
      { length: 20 },
      (_, i) => ({

        src:
          `images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-${String(i + 1).padStart(2, "0")}.jpg`,

        title:
          `Sankranti Celebration — Photo ${i + 1}`,

        caption:
          "Sankranti celebration memories from Kaveri Unnatii."

      })
    )
  },


  "holi-2024": {

    title: "Holi Celebration",
    kicker: "Festival Memories",
    category: "festival 2024",

    images: Array.from(
      { length: 20 },
      (_, i) => ({

        src:
          `images/03-Holi-Celebration/holi-celebration-${String(i + 1).padStart(2, "0")}.jpg`,

        title:
          `Holi Celebration — Photo ${i + 1}`,

        caption:
          "Colourful Holi memories from Kaveri Unnatii."

      })
    )
  }

};


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


/* =========================================================
   HOME PAGE BACKGROUND
   ========================================================= */

function setHomeBackground() {

  const hero = document.querySelector(".hero");

  if (!hero) return;

  hero.style.backgroundImage =
    'url("images/04-Our-Apartment/kaveri-apartment.webp")';

  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center center";
  hero.style.backgroundRepeat = "no-repeat";
}


/* =========================================================
   FIX OLD IMAGE PATHS
   ========================================================= */

function fixExistingImagePaths() {

  document.querySelectorAll("img").forEach(
    (img) => {

      const src = img.getAttribute("src");

      if (!src) return;


      const replacements = {

        "images/Gallery/Our%20Apartment/kaveri-apartment.webp":
          "images/04-Our-Apartment/kaveri-apartment.webp",

        "images/Gallery/Our%20Apartment/kaveri-brochure.jpg":
          "images/04-Our-Apartment/kaveri-brochure.jpg",

        "images/Gallery/Our%20Apartment/ak_1636_1434620735-1636795039_700x700%20(1).jpeg":
          "images/04-Our-Apartment/ak_1636_1434620735-1636795039_700x700%20(1).jpeg",

        "images/Gallery/Our%20Apartment/ak_284_410379319-1567147494_300x300.png":
          "images/04-Our-Apartment/ak_284_410379319-1567147494_300x300.png"

      };


      if (replacements[src]) {

        img.setAttribute(
          "src",
          replacements[src]
        );

      }

    }
  );
}


/* =========================================================
   BUILD ORGANIZED GALLERY
   ========================================================= */

function buildOrganizedGallery() {

  const grid =
    document.getElementById("galleryGrid");

  if (!grid) return;


  const albums = [

    {
      id: "our-apartment",
      category: "apartment",
      className: "gallery-tile-featured",
      kicker: "Kaveri Unnatii",
      title: "Our Apartment"
    },

    {
      id: "new-year-2023-24",
      category: "festival 2023",
      className: "gallery-tile-wide",
      kicker: "Festival • 2023–24",
      title: "New Year Celebration"
    },

    {
      id: "sankranti-2024",
      category: "festival 2024",
      className: "gallery-tile-tall",
      kicker: "Festival • 2024",
      title: "Sankranti Celebration"
    },

    {
      id: "holi-2024",
      category: "festival 2024",
      className: "gallery-tile",
      kicker: "Festival • 2024",
      title: "Holi Celebration"
    }

  ];


  grid.innerHTML = "";


  albums.forEach(
    (album) => {

      const data =
        galleryData[album.id];

      const cover =
        data.images[0];


      const button =
        document.createElement("button");


      button.type = "button";


      button.className =
        `gallery-tile ${album.className}`;


      button.dataset.galleryItem = "";


      button.dataset.album =
        album.id;


      button.dataset.index = "0";


      button.dataset.category =
        album.category;


      button.setAttribute(
        "aria-label",
        `Open ${data.title} album`
      );


      button.innerHTML = `

        <img
          src="${cover.src}"
          alt="${data.title}"
          loading="lazy"
        >

        <span class="gallery-tile-content">

          <span class="gallery-tile-kicker">
            ${album.kicker}
          </span>

          <span class="gallery-tile-title">
            ${album.title}
          </span>

          <span class="gallery-tile-description">
            ${data.images.length}
            ${data.images.length === 1 ? "photo" : "photos"}
          </span>

        </span>

        <span
          class="gallery-tile-icon"
          aria-hidden="true"
        >
          ↗
        </span>

      `;


      grid.appendChild(button);

    }
  );


  /* -----------------------------------------
     UPDATE FILTER BUTTONS
     ----------------------------------------- */

  const filters =
    document.querySelector(
      ".gallery-filters"
    );


  if (filters) {

    filters.innerHTML = `

      <button
        class="gallery-filter active"
        type="button"
        data-filter="all"
        aria-selected="true"
      >
        All
      </button>


      <button
        class="gallery-filter"
        type="button"
        data-filter="apartment"
        aria-selected="false"
      >
        Our Apartment
      </button>


      <button
        class="gallery-filter"
        type="button"
        data-filter="festival"
        aria-selected="false"
      >
        Festivals
      </button>


      <button
        class="gallery-filter"
        type="button"
        data-filter="2023"
        aria-selected="false"
      >
        2023–24
      </button>


      <button
        class="gallery-filter"
        type="button"
        data-filter="2024"
        aria-selected="false"
      >
        2024
      </button>

    `;

  }

}


/* =========================================================
   CREATE LIGHTBOX
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


        <div class="gallery-lightbox-header-right">

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


      <div class="gallery-lightbox-caption">

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
   CACHE LIGHTBOX ELEMENTS
   ========================================================= */

function cacheGalleryElements() {

  galleryModal =
    document.getElementById(
      "galleryModal"
    );


  galleryModalImage =
    document.getElementById(
      "galleryModalImage"
    );


  galleryModalTitle =
    document.getElementById(
      "galleryModalTitle"
    );


  galleryModalCaption =
    document.getElementById(
      "galleryModalCaption"
    );


  galleryModalCounter =
    document.getElementById(
      "galleryModalCounter"
    );


  galleryModalKicker =
    document.getElementById(
      "galleryModalKicker"
    );


  galleryThumbnails =
    document.getElementById(
      "galleryThumbnails"
    );


  galleryPrev =
    document.getElementById(
      "galleryPrev"
    );


  galleryNext =
    document.getElementById(
      "galleryNext"
    );


  galleryModalClose =
    document.getElementById(
      "galleryModalClose"
    );

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


  currentAlbum =
    albumId;


  currentImageIndex =
    Number.isFinite(
      imageIndex
    )
      ? imageIndex
      : 0;


  if (
    currentImageIndex < 0 ||
    currentImageIndex >=
      album.images.length
  ) {

    currentImageIndex = 0;

  }


  renderGalleryImage();


  renderGalleryThumbnails();


  galleryModal.classList.add(
    "open"
  );


  galleryModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "gallery-modal-open"
  );


  document.body.style.overflow =
    "hidden";


  if (galleryModalClose) {

    galleryModalClose.focus();

  }

}


/* =========================================================
   CLOSE GALLERY
   ========================================================= */

function closeGallery() {

  if (!galleryModal) return;


  galleryModal.classList.remove(
    "open"
  );


  galleryModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "gallery-modal-open"
  );


  document.body.style.overflow =
    "";


  currentAlbum = null;


  currentImageIndex = 0;

}


/* =========================================================
   SHOW CURRENT IMAGE
   ========================================================= */

function renderGalleryImage() {

  if (!currentAlbum) return;


  const album =
    galleryData[currentAlbum];


  const image =
    album &&
    album.images[
      currentImageIndex
    ];


  if (!image) return;


  galleryModalImage.src =
    image.src;


  galleryModalImage.alt =
    image.title ||
    album.title;


  galleryModalTitle.textContent =
    image.title ||
    album.title;


  galleryModalCaption.textContent =
    image.caption ||
    "";


  galleryModalKicker.textContent =
    album.kicker ||
    "";


  galleryModalCounter.textContent =
    `${currentImageIndex + 1} / ${album.images.length}`;


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
    !album.images.length
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
    !album.images.length
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
   NAVIGATION BUTTONS
   ========================================================= */

function updateGalleryNavigation() {

  if (!currentAlbum) return;


  const album =
    galleryData[currentAlbum];


  if (!album) return;


  const multiple =
    album.images.length > 1;


  if (galleryPrev) {

    galleryPrev.disabled =
      !multiple;

  }


  if (galleryNext) {

    galleryNext.disabled =
      !multiple;

  }

}


/* =========================================================
   THUMBNAILS
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


  galleryThumbnails.innerHTML =
    "";


  album.images.forEach(
    (image, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "gallery-thumbnail";


      if (
        index ===
        currentImageIndex
      ) {

        button.classList.add(
          "active"
        );

      }


      button.setAttribute(
        "aria-label",
        `Open image ${index + 1}: ${image.title || ""}`
      );


      const img =
        document.createElement(
          "img"
        );


      img.src =
        image.src;


      img.alt =
        image.title || "";


      img.loading =
        "lazy";


      button.appendChild(
        img
      );


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
        index ===
          currentImageIndex
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
   FILTER GALLERY
   ========================================================= */

function filterGallery(
  filter = "all"
) {

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


      let visible;


      /*
        "festival" should match:
        festival 2023
        festival 2024
      */

      if (
        filter ===
        "festival"
      ) {

        visible =
          categories.includes(
            "festival"
          ) ||
          categories.some(
            (category) =>
              category.startsWith(
                "festival"
              )
          );

      }


      /*
        2023 filter
      */

      else if (
        filter === "2023"
      ) {

        visible =
          categories.includes(
            "2023"
          ) ||
          categories.includes(
            "festival"
          ) &&
          categories.includes(
            "2023"
          );

      }


      /*
        2024 filter
      */

      else if (
        filter === "2024"
      ) {

        visible =
          categories.includes(
            "2024"
          );

      }


      /*
        All
      */

      else if (
        filter === "all"
      ) {

        visible = true;

      }


      /*
        Normal category
      */

      else {

        visible =
          categories.includes(
            filter
          );

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


  document
    .querySelectorAll(
      ".gallery-filter"
    )
    .forEach(
      (button) => {

        const active =
          button.dataset.filter ===
          filter;


        button.classList.toggle(
          "active",
          active
        );


        button.setAttribute(
          "aria-selected",
          active
            ? "true"
            : "false"
        );

      }
    );

}


/* =========================================================
   GALLERY TILE EVENTS
   ========================================================= */

function setupGalleryTiles() {

  const items =
    document.querySelectorAll(
      "[data-gallery-item]"
    );


  items.forEach(
    (item) => {

      item.setAttribute(
        "tabindex",
        "0"
      );


      item.setAttribute(
        "role",
        "button"
      );


      item.addEventListener(
        "click",
        () => {

          const albumId =
            item.dataset.album;


          const index =
            Number.parseInt(
              item.dataset.index ||
                "0",
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


      item.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key ===
              "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();


            const albumId =
              item.dataset.album;


            const index =
              Number.parseInt(
                item.dataset.index ||
                  "0",
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
   FILTER BUTTON EVENTS
   ========================================================= */

function setupGalleryFilters() {

  const buttons =
    document.querySelectorAll(
      ".gallery-filter"
    );


  buttons.forEach(
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


  filterGallery("all");

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
        !galleryModal.classList.contains(
          "open"
        )
      ) {

        return;

      }


      switch (
        event.key
      ) {

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
   MOBILE SWIPE
   ========================================================= */

function setupGallerySwipe() {

  if (!galleryModal) return;


  galleryModal.addEventListener(
    "touchstart",
    (event) => {

      if (
        event.touches &&
        event.touches.length
      ) {

        galleryTouchStartX =
          event.touches[0].clientX;

      }

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


      const endX =
        event.changedTouches[0]
          .clientX;


      const distance =
        endX -
        galleryTouchStartX;


      if (
        Math.abs(distance) <
        50
      ) {

        return;

      }


      if (
        distance < 0
      ) {

        showNextGalleryImage();

      }

      else {

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


  nav.querySelectorAll(
    "a"
  ).forEach(
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


  document.addEventListener(
    "click",
    (event) => {

      if (
        !nav.contains(
          event.target
        ) &&
        !menuButton.contains(
          event.target
        )
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

      if (
        window.scrollY >
        500
      ) {

        button.classList.add(
          "show"
        );

      }

      else {

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
   IMAGE ERROR HANDLING
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

  /*
    Set new home page background.
  */

  setHomeBackground();


  /*
    Fix old apartment image paths.
  */

  fixExistingImagePaths();


  /*
    Build the new organized gallery.
  */

  buildOrganizedGallery();


  /*
    Create lightbox.
  */

  createGalleryModal();


  /*
    Find lightbox elements.
  */

  cacheGalleryElements();


  /*
    Enable gallery.
  */

  setupGalleryTiles();

  setupGalleryFilters();

  setupGalleryModal();

  setupGalleryKeyboard();

  setupGallerySwipe();


  /*
    Mobile navigation.
  */

  setupMobileNavigation();


  /*
    Back to top.
  */

  setupBackToTop();


  /*
    Image error handling.
  */

  setupImageErrorHandling();

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

}

else {

  initializeKaveriWebsite();

}
