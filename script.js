/* =========================================================
   KAVERI UNNATII APARTMENT
   Gallery & Navigation Script
   =========================================================

   IMPORTANT:
   - This script does NOT modify the Home page background.
   - Your existing Home/hero background remains controlled by
     your HTML/CSS.
   ========================================================= */


/* =========================================================
   GALLERY DATA
   ========================================================= */

const galleryData = {

    /* -----------------------------------------------------
       OUR APARTMENT
       ----------------------------------------------------- */
    "our-apartment": {
        title: "Our Apartment",
        photos: [
            {
                src: "images/Gallery/Our%20Apartment/kaveri-apartment.webp",
                caption: "Kaveri Unnatii Apartment"
            },
            {
                src: "images/Gallery/Our%20Apartment/kaveri-brochure.jpg",
                caption: "Kaveri Unnatii Apartment brochure"
            },
            {
                src: "images/Gallery/Our%20Apartment/ak_1636_1434620735-1636795039_700x700%20(1).jpeg",
                caption: "Kaveri Unnatii community memory"
            },
            {
                src: "images/Gallery/Our%20Apartment/ak_284_410379319-1567147494_300x300.png",
                caption: "Kaveri Unnatii community memory"
            }
        ]
    },


    /* -----------------------------------------------------
       SANKRANTI 2023
       ----------------------------------------------------- */
    "sankranti-2023": {
        title: "Sankranti 2023",
        photos: [
            {
                src: "images/Gallery/2023-sankranti/community-feast-01.webp",
                caption: "Sankranti community feast"
            },
            {
                src: "images/Gallery/2023-sankranti/community-feast-02.webp",
                caption: "Sankranti community feast"
            },
            {
                src: "images/Gallery/2023-sankranti/community-group-01.webp",
                caption: "Sankranti community gathering"
            },
            {
                src: "images/Gallery/2023-sankranti/community-group-02.webp",
                caption: "Sankranti community gathering"
            }
        ]
    },


    /* -----------------------------------------------------
       HOLI 2023
       ----------------------------------------------------- */
    "holi-2023": {
        title: "Holi 2023",
        photos: [
            {
                src: "images/Gallery/2023-holi/family-01.webp",
                caption: "Holi family celebration"
            },
            {
                src: "images/Gallery/2023-holi/holi-community-01.webp",
                caption: "Holi community celebration"
            },
            {
                src: "images/Gallery/2023-holi/holi-fun-01.webp",
                caption: "Holi celebrations at Kaveri Unnatii"
            }
        ]
    },


    /* -----------------------------------------------------
       COMMUNITY MEMORIES 2023
       ----------------------------------------------------- */
    "community-2023": {
        title: "Community Memories 2023",
        photos: [
            {
                src: "images/Gallery/2023-community/campus-visit-01.webp",
                caption: "Community memory 2023"
            },
            {
                src: "images/Gallery/2023-community/families-01.webp",
                caption: "Kaveri Unnatii families"
            }
        ]
    },


    /* -----------------------------------------------------
       COMMUNITY EVENTS 2026
       ----------------------------------------------------- */
    "events-2026": {
        title: "Community Events 2026",
        photos: [
            {
                src: "images/Gallery/2026-events/event-photo-01.webp",
                caption: "Community event 2026"
            },
            {
                src: "images/Gallery/2026-events/event-photo-02.webp",
                caption: "Community event 2026"
            }
        ]
    }

};


/* =========================================================
   GALLERY MODAL ELEMENTS
   ========================================================= */

const galleryModal =
    document.getElementById("galleryModal");

const galleryModalTitle =
    document.getElementById("galleryModalTitle");

const galleryModalImage =
    document.getElementById("galleryModalImage");

const galleryModalCaption =
    document.getElementById("galleryModalCaption");

const galleryModalClose =
    document.getElementById("galleryModalClose");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");

const galleryThumbnails =
    document.getElementById("galleryThumbnails");


/* =========================================================
   GALLERY STATE
   ========================================================= */

let currentAlbum = null;
let currentPhotoIndex = 0;


/* =========================================================
   OPEN GALLERY
   ========================================================= */

function openGallery(albumId, photoIndex = 0) {

    const album = galleryData[albumId];

    if (!album || !album.photos || !album.photos.length) {
        return;
    }

    currentAlbum = albumId;
    currentPhotoIndex = photoIndex;

    if (galleryModalTitle) {
        galleryModalTitle.textContent = album.title;
    }

    renderGalleryThumbnails();

    showGalleryPhoto(currentPhotoIndex);

    if (galleryModal) {
        galleryModal.classList.add("active");
        galleryModal.classList.add("open");

        galleryModal.setAttribute("aria-hidden", "false");
    }

    document.body.classList.add("gallery-modal-open");
}


/* =========================================================
   SHOW PHOTO
   ========================================================= */

function showGalleryPhoto(index) {

    if (!currentAlbum) {
        return;
    }

    const album = galleryData[currentAlbum];

    if (!album || !album.photos.length) {
        return;
    }

    if (index < 0) {
        index = album.photos.length - 1;
    }

    if (index >= album.photos.length) {
        index = 0;
    }

    currentPhotoIndex = index;

    const photo = album.photos[currentPhotoIndex];

    if (galleryModalImage) {
        galleryModalImage.src = photo.src;
        galleryModalImage.alt = photo.caption || album.title;
    }

    if (galleryModalCaption) {
        galleryModalCaption.textContent =
            photo.caption || "";
    }

    updateGalleryThumbnails();
}


/* =========================================================
   NEXT PHOTO
   ========================================================= */

function nextGalleryPhoto() {

    if (!currentAlbum) {
        return;
    }

    const album = galleryData[currentAlbum];

    if (!album) {
        return;
    }

    showGalleryPhoto(currentPhotoIndex + 1);
}


/* =========================================================
   PREVIOUS PHOTO
   ========================================================= */

function previousGalleryPhoto() {

    if (!currentAlbum) {
        return;
    }

    const album = galleryData[currentAlbum];

    if (!album) {
        return;
    }

    showGalleryPhoto(currentPhotoIndex - 1);
}


/* =========================================================
   CLOSE GALLERY
   ========================================================= */

function closeGallery() {

    if (!galleryModal) {
        return;
    }

    galleryModal.classList.remove("active");
    galleryModal.classList.remove("open");

    galleryModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("gallery-modal-open");

    currentAlbum = null;
    currentPhotoIndex = 0;
}


/* =========================================================
   THUMBNAILS
   ========================================================= */

function renderGalleryThumbnails() {

    if (!galleryThumbnails || !currentAlbum) {
        return;
    }

    const album = galleryData[currentAlbum];

    if (!album) {
        return;
    }

    galleryThumbnails.innerHTML = "";

    album.photos.forEach((photo, index) => {

        const thumbnail = document.createElement("button");

        thumbnail.type = "button";

        thumbnail.className = "gallery-thumbnail";

        thumbnail.setAttribute(
            "aria-label",
            "Open photo " + (index + 1)
        );

        const image = document.createElement("img");

        image.src = photo.src;

        image.alt = photo.caption || "";

        image.loading = "lazy";

        thumbnail.appendChild(image);

        thumbnail.addEventListener("click", () => {
            showGalleryPhoto(index);
        });

        galleryThumbnails.appendChild(thumbnail);
    });
}


/* =========================================================
   UPDATE ACTIVE THUMBNAIL
   ========================================================= */

function updateGalleryThumbnails() {

    if (!galleryThumbnails) {
        return;
    }

    const thumbnails =
        galleryThumbnails.querySelectorAll(
            ".gallery-thumbnail"
        );

    thumbnails.forEach((thumbnail, index) => {

        thumbnail.classList.toggle(
            "active",
            index === currentPhotoIndex
        );

        if (index === currentPhotoIndex) {
            thumbnail.setAttribute(
                "aria-current",
                "true"
            );
        } else {
            thumbnail.removeAttribute(
                "aria-current"
            );
        }
    });
}


/* =========================================================
   ALBUM CARD CLICK HANDLING
   ========================================================= */

function initializeAlbumCards() {

    const albumCards =
        document.querySelectorAll(".album-card");

    albumCards.forEach(card => {

        card.addEventListener("click", () => {

            const albumId =
                card.dataset.album;

            if (!albumId) {
                return;
            }

            openGallery(albumId, 0);
        });

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const albumId =
                    card.dataset.album;

                if (!albumId) {
                    return;
                }

                openGallery(albumId, 0);
            }
        });
    });
}


/* =========================================================
   GALLERY FILTERS
   ========================================================= */

function initializeGalleryFilters() {

    const filterButtons =
        document.querySelectorAll(
            "[data-gallery-filter]"
        );

    const albumCards =
        document.querySelectorAll(
            ".album-card"
        );

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                (
                    button.dataset.galleryFilter ||
                    "all"
                ).toLowerCase();

            filterButtons.forEach(item => {

                item.classList.remove("active");

                item.setAttribute(
                    "aria-selected",
                    "false"
                );
            });

            button.classList.add("active");

            button.setAttribute(
                "aria-selected",
                "true"
            );


            albumCards.forEach(card => {

                const categories =
                    (card.dataset.category || "")
                        .toLowerCase()
                        .split(/\s+/)
                        .filter(Boolean);

                const year =
                    (
                        card.dataset.year || ""
                    ).toLowerCase();

                let show = false;


                /* -----------------------------
                   ALL
                   ----------------------------- */

                if (filter === "all") {
                    show = true;
                }


                /* -----------------------------
                   APARTMENT
                   ----------------------------- */

                else if (filter === "apartment") {
                    show =
                        categories.includes(
                            "apartment"
                        );
                }


                /* -----------------------------
                   COMMUNITY
                   ----------------------------- */

                else if (filter === "community") {
                    show =
                        categories.includes(
                            "community"
                        );
                }


                /* -----------------------------
                   FESTIVALS
                   ----------------------------- */

                else if (filter === "festivals") {
                    show =
                        categories.includes(
                            "festival"
                        );
                }


                /* -----------------------------
                   2023 / 2026
                   ----------------------------- */

                else if (
                    filter === "2023" ||
                    filter === "2026"
                ) {
                    show = year === filter;
                }


                /* -----------------------------
                   DEFAULT CATEGORY
                   ----------------------------- */

                else {
                    show =
                        categories.includes(
                            filter
                        ) ||
                        year === filter;
                }


                card.style.display =
                    show ? "" : "flex";
            });
        });
    });
}


/* =========================================================
   MODAL EVENTS
   ========================================================= */

function initializeGalleryModal() {

    if (galleryModalClose) {

        galleryModalClose.addEventListener(
            "click",
            closeGallery
        );
    }


    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            nextGalleryPhoto
        );
    }


    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            previousGalleryPhoto
        );
    }


    /* Close when clicking outside image/content */

    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === galleryModal
                ) {
                    closeGallery();
                }
            }
        );
    }


    /* Keyboard controls */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !galleryModal ||
                !galleryModal.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {
                closeGallery();
            }


            if (event.key === "ArrowRight") {
                nextGalleryPhoto();
            }


            if (event.key === "ArrowLeft") {
                previousGalleryPhoto();
            }
        }
    );
}


/* =========================================================
   GENERAL NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

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
        });
    });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(
            ".menu-toggle, .mobile-menu-toggle, #menuToggle"
        );

    const mobileMenu =
        document.querySelector(
            ".mobile-menu, #mobileMenu"
        );

    if (!menuButton || !mobileMenu) {
        return;
    }

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle(
                    "active"
                );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        }
    );
}


/* =========================================================
   INITIALIZE EVERYTHING
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeAlbumCards();

        initializeGalleryFilters();

        initializeGalleryModal();

        initializeNavigation();

        initializeMobileMenu();

    }
);


/* =========================================================
   HOMEPAGE BACKGROUND — PRESERVED
   =========================================================

   IMPORTANT:
   This JavaScript does NOT set, replace, remove,
   or modify the Home page background image.

   Your existing Home page background remains controlled
   by the original HTML/CSS.

   ========================================================= */
