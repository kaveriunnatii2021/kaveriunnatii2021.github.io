/* =========================================================
   KAVERI UNNATII APARTMENT
   CORRECTED GALLERY SCRIPT
   ========================================================= */

const KAVERI_IMAGES = {
  apartment: "images/Gallery/Our%20Apartment/kaveri-apartment.webp",
  brochure: "images/Gallery/Our%20Apartment/kaveri-brochure.jpg",

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

    photos: [
      {
        src: KAVERI_IMAGES.apartment,
        caption: "Kaveri Unnatii Apartment"
      },

      {
        src: KAVERI_IMAGES.brochure,
        caption: "Kaveri Unnatii Apartment brochure"
      },

      {
        src: KAVERI_IMAGES.archive1,
        caption: "Kaveri Unnatii community memory"
      },

      {
        src: KAVERI_IMAGES.archive2,
        caption: "Kaveri Unnatii community memory"
      }
    ]
  },


  "sankranti-2023": {
    title: "Sankranti 2023",

    photos: [
      {
        src:
          "images/Gallery/2023-sankranti/community-feast-01.webp",
        caption: "Sankranti community feast"
      },

      {
        src:
          "images/Gallery/2023-sankranti/community-feast-02.webp",
        caption: "Sankranti community feast"
      },

      {
        src:
          "images/Gallery/2023-sankranti/community-group-01.webp",
        caption: "Sankranti community gathering"
      },

      {
        src:
          "images/Gallery/2023-sankranti/community-group-02.webp",
        caption: "Sankranti community gathering"
      }
    ]
  },


  "holi-2023": {
    title: "Holi 2023",

    photos: [
      {
        src:
          "images/Gallery/2023-holi/family-01.webp",
        caption: "Holi family celebration"
      },

      {
        src:
          "images/Gallery/2023-holi/holi-community-01.webp",
        caption: "Holi community celebration"
      },

      {
        src:
          "images/Gallery/2023-holi/holi-fun-01.webp",
        caption: "Holi celebrations at Kaveri Unnatii"
      }
    ]
  },


  "community-2023": {
    title: "Community Memories 2023",

    photos: [
      {
        src:
          "images/Gallery/2023-community/campus-visit-01.webp",
        caption: "Community memory 2023"
      },

      {
        src:
          "images/Gallery/2023-community/families-01.webp",
        caption: "Kaveri Unnatii families"
      }
    ]
  },


  "events-2026": {
    title: "Community Events 2026",

    photos: [
      {
        src:
          "images/Gallery/2026-events/event-photo-01.webp",
        caption: "Community event 2026"
      },

      {
        src:
          "images/Gallery/2026-events/event-photo-02.webp",
        caption: "Community event 2026"
      }
    ]
  }

};


/* =========================================================
   GALLERY VARIABLES
   ========================================================= */

let galleryModal = null;
let galleryModalTitle = null;
let galleryModalImage = null;
let galleryModalCaption = null;
let galleryModalCounter = null;
let galleryModalClose = null;
let galleryPrev = null;
let galleryNext = null;
let galleryThumbnails = null;

let currentAlbum = null;
let currentPhotoIndex = 0;


/* =========================================================
   GET GALLERY ELEMENTS
   ========================================================= */

function getGalleryElements() {

  galleryModal =
    document.getElementById("galleryModal");

  galleryModalTitle =
    document.getElementById("galleryModalTitle");

  galleryModalImage =
    document.getElementById("galleryModalImage");

  galleryModalCaption =
    document.getElementById("galleryModalCaption");

  galleryModalCounter =
    document.getElementById("galleryModalCounter");

  galleryModalClose =
    document.getElementById("galleryModalClose");

  galleryPrev =
    document.getElementById("galleryPrev");

  galleryNext =
    document.getElementById("galleryNext");

  galleryThumbnails =
    document.getElementById("galleryThumbnails");
}


/* =========================================================
   RESTORE HOME BACKGROUND
   ========================================================= */

function restoreHomeBackground() {

  const hero =
    document.querySelector(".hero");

  if (!hero) {
    return;
  }

  hero.style.backgroundImage =
    'linear-gradient(90deg, rgba(39,24,13,.82), rgba(39,24,13,.52), rgba(39,24,13,.20)), url("images/Gallery/Our%20Apartment/kaveri-apartment.webp")';
}


/* =========================================================
   REPAIR OLD IMAGE PATHS
   ========================================================= */

function repairOldImagePaths() {

  const replacements = {

    "images/kaveri-apartment.webp":
      KAVERI_IMAGES.apartment,

    "images/kaveri-brochure.jpg":
      KAVERI_IMAGES.brochure,

    "images/ak_1636_1434620735-1636795039_700x700%20(1).jpeg":
      KAVERI_IMAGES.archive1,

    "images/ak_1636_1434620735-1636795039_700x700 (1).jpeg":
      KAVERI_IMAGES.archive1,

    "images/ak_284_410379319-1567147494_300x300.png":
      KAVERI_IMAGES.archive2
  };


  document
    .querySelectorAll("img")
    .forEach(img => {

      const src =
        img.getAttribute("src");

      if (
        src &&
        replacements[src]
      ) {

        img.setAttribute(
          "src",
          replacements[src]
        );

      }

    });
}


/* =========================================================
   UPDATE PHOTO COUNTER
   ========================================================= */

function updateCounter() {

  if (
    !galleryModalCounter ||
    !currentAlbum
  ) {
    return;
  }

  const album =
    galleryData[currentAlbum];

  galleryModalCounter.textContent =
    `${currentPhotoIndex + 1} / ${album.photos.length}`;
}


/* =========================================================
   SHOW PHOTO
   ========================================================= */

function showGalleryPhoto(index) {

  if (!currentAlbum) {
    return;
  }

  const album =
    galleryData[currentAlbum];

  if (
    !album ||
    !album.photos ||
    !album.photos.length
  ) {
    return;
  }


  if (index < 0) {

    index =
      album.photos.length - 1;
  }


  if (
    index >= album.photos.length
  ) {

    index = 0;
  }


  currentPhotoIndex =
    index;


  const photo =
    album.photos[currentPhotoIndex];


  if (galleryModalImage) {

    galleryModalImage.src =
      photo.src;

    galleryModalImage.alt =
      photo.caption ||
      album.title;
  }


  if (galleryModalCaption) {

    galleryModalCaption.textContent =
      photo.caption || "";
  }


  updateCounter();

  updateGalleryThumbnails();
}


/* =========================================================
   RENDER THUMBNAILS
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


  galleryThumbnails.innerHTML =
    "";


  album.photos.forEach(
    (photo, index) => {

      const button =
        document.createElement("button");


      button.type =
        "button";


      button.className =
        "gallery-thumb";


      button.setAttribute(
        "aria-label",
        `Open photo ${index + 1}`
      );


      const image =
        document.createElement("img");


      image.src =
        photo.src;


      image.alt =
        photo.caption || "";


      image.loading =
        "lazy";


      button.appendChild(
        image
      );


      button.addEventListener(
        "click",
        () => {

          showGalleryPhoto(index);

        }
      );


      galleryThumbnails.appendChild(
        button
      );

    }
  );


  updateGalleryThumbnails();
}


/* =========================================================
   UPDATE ACTIVE THUMBNAIL
   ========================================================= */

function updateGalleryThumbnails() {

  if (!galleryThumbnails) {
    return;
  }


  galleryThumbnails
    .querySelectorAll(".gallery-thumb")
    .forEach(
      (button, index) => {

        const active =
          index === currentPhotoIndex;


        button.classList.toggle(
          "active",
          active
        );


        if (active) {

          button.setAttribute(
            "aria-current",
            "true"
          );

        } else {

          button.removeAttribute(
            "aria-current"
          );

        }

      }
    );
}


/* =========================================================
   OPEN GALLERY
   ========================================================= */

function openGallery(
  albumId,
  photoIndex = 0
) {

  const album =
    galleryData[albumId];


  if (
    !album ||
    !album.photos ||
    !album.photos.length
  ) {

    console.error(
      "Gallery album not found:",
      albumId
    );

    return;
  }


  currentAlbum =
    albumId;


  currentPhotoIndex =
    photoIndex;


  if (galleryModalTitle) {

    galleryModalTitle.textContent =
      album.title;
  }


  renderGalleryThumbnails();

  showGalleryPhoto(
    photoIndex
  );


  if (galleryModal) {

    galleryModal.classList.add(
      "active",
      "open"
    );

    galleryModal.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  document.body.classList.add(
    "no-scroll",
    "gallery-modal-open"
  );
}


/* =========================================================
   CLOSE GALLERY
   ========================================================= */

function closeGallery() {

  if (!galleryModal) {
    return;
  }


  galleryModal.classList.remove(
    "active",
    "open"
  );


  galleryModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "no-scroll",
    "gallery-modal-open"
  );


  currentAlbum =
    null;


  currentPhotoIndex =
    0;
}


/* =========================================================
   ALBUM CARDS
   ========================================================= */

function initializeAlbumCards() {

  document
    .querySelectorAll(".album-card")
    .forEach(card => {

      if (
        card.dataset.galleryReady ===
        "true"
      ) {
        return;
      }


      card.dataset.galleryReady =
        "true";


      const open =
        () => {

          const albumId =
            card.dataset.album;


          if (albumId) {

            openGallery(
              albumId,
              0
            );

          }
        };


      card.addEventListener(
        "click",
        open
      );


      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            open();

          }

        }
      );

    });
}


/* =========================================================
   GALLERY FILTERS
   ========================================================= */

function initializeGalleryFilters() {

  /*
   * IMPORTANT:
   *
   * index.html uses:
   *
   * data-filter="2023"
   *
   * NOT:
   *
   * data-gallery-filter
   *
   */

  const filterButtons =
    document.querySelectorAll(
      ".gallery-filter"
    );


  const albumCards =
    document.querySelectorAll(
      ".album-card"
    );


  const emptyMessage =
    document.getElementById(
      "galleryEmpty"
    );


  filterButtons.forEach(
    button => {

      if (
        button.dataset.galleryReady ===
        "true"
      ) {
        return;
      }


      button.dataset.galleryReady =
        "true";


      button.addEventListener(
        "click",
        () => {

          const filter =
            (
              button.dataset.filter ||
              "all"
            ).toLowerCase();


          let visibleCount =
            0;


          /*
           * Update active button
           */

          filterButtons.forEach(
            item => {

              const active =
                item === button;


              item.classList.toggle(
                "active",
                active
              );


              item.setAttribute(
                "aria-pressed",
                active
                  ? "true"
                  : "false"
              );

            }
          );


          /*
           * Filter albums
           */

          albumCards.forEach(
            card => {

              const categories =
                (
                  card.dataset.category ||
                  ""
                )
                .toLowerCase()
                .split(/\s+/)
                .filter(Boolean);


              const year =
                (
                  card.dataset.year ||
                  ""
                ).toLowerCase();


              let show =
                false;


              if (
                filter === "all"
              ) {

                show = true;

              }


              else if (
                filter === "apartment"
              ) {

                show =
                  categories.includes(
                    "apartment"
                  );

              }


              else if (
                filter === "community"
              ) {

                show =
                  categories.includes(
                    "community"
                  );

              }


              else if (
                filter === "festival" ||
                filter === "festivals"
              ) {

                show =
                  categories.includes(
                    "festival"
                  ) ||
                  categories.includes(
                    "festivals"
                  );

              }


              else if (
                filter === "2023" ||
                filter === "2026"
              ) {

                show =
                  year === filter;

              }


              else {

                show =
                  categories.includes(
                    filter
                  ) ||
                  year === filter;

              }


              card.style.display =
                show
                  ? ""
                  : "none";


              if (show) {

                visibleCount++;

              }

            }
          );


          /*
           * Empty message
           */

          if (emptyMessage) {

            emptyMessage.hidden =
              visibleCount !== 0;

          }

        }
      );

    }
  );
}


/* =========================================================
   MODAL CONTROLS
   ========================================================= */

function initializeGalleryModal() {

  if (!galleryModal) {
    return;
  }


  /*
   * Close button
   */

  if (galleryModalClose) {

    galleryModalClose.addEventListener(
      "click",
      closeGallery
    );

  }


  /*
   * Next button
   */

  if (galleryNext) {

    galleryNext.addEventListener(
      "click",
      () => {

        showGalleryPhoto(
          currentPhotoIndex + 1
        );

      }
    );

  }


  /*
   * Previous button
   */

  if (galleryPrev) {

    galleryPrev.addEventListener(
      "click",
      () => {

        showGalleryPhoto(
          currentPhotoIndex - 1
        );

      }
    );

  }


  /*
   * Backdrop
   */

  const backdrop =
    galleryModal.querySelector(
      ".gallery-modal-backdrop"
    );


  if (backdrop) {

    backdrop.addEventListener(
      "click",
      closeGallery
    );

  }


  /*
   * Extra modal background close
   */

  galleryModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        galleryModal
      ) {

        closeGallery();

      }

    }
  );


  /*
   * Image loading error
   */

  if (galleryModalImage) {

    galleryModalImage.addEventListener(
      "error",
      () => {

        if (galleryModalCaption) {

          galleryModalCaption.textContent =
            "Unable to load this photo. Please check the image path.";

        }

      }
    );

  }
}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function initializeKeyboardControls() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        !galleryModal ||
        !galleryModal.classList.contains(
          "open"
        )
      ) {

        return;
      }


      if (
        event.key === "Escape"
      ) {

        closeGallery();

      }


      else if (
        event.key === "ArrowRight"
      ) {

        showGalleryPhoto(
          currentPhotoIndex + 1
        );

      }


      else if (
        event.key === "ArrowLeft"
      ) {

        showGalleryPhoto(
          currentPhotoIndex - 1
        );

      }

    }
  );
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      if (
        link.dataset.navigationReady ===
        "true"
      ) {

        return;
      }


      link.dataset.navigationReady =
        "true";


      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;
          }


          const target =
            document.querySelector(
              targetId
            );


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
}


/* =========================================================
   INITIALIZE EVERYTHING
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    restoreHomeBackground();

    repairOldImagePaths();

    getGalleryElements();

    initializeAlbumCards();

    initializeGalleryFilters();

    initializeGalleryModal();

    initializeKeyboardControls();

    initializeNavigation();

  }
);


/* =========================================================
   END
   ========================================================= */
