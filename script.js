/* =========================================================
   KAVERI UNNATII APARTMENT
   FINAL GALLERY SCRIPT
   =========================================================

   This version:
   1. Uses the CURRENT GitHub Gallery image locations.
   2. Restores the Home hero background automatically.
   3. Supports the existing Gallery cards.
   4. Supports the new album structure.
   5. Uses .gallery-thumb to match the website CSS.
   6. Does not remove or replace any Home page content.
   ========================================================= */


/* =========================================================
   IMAGE PATHS
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
   RESTORE HOME PAGE BACKGROUND
   =========================================================

   The old CSS points to:

       images/kaveri-apartment.webp

   That file is no longer at that location.

   The actual current file is:

       images/Gallery/Our Apartment/kaveri-apartment.webp

   We correct the path here without changing the visual
   design, overlay, position or size.
   ========================================================= */

function restoreHomeBackground() {

    const hero = document.querySelector(".hero");

    if (!hero) {
        return;
    }

    hero.style.backgroundImage =
        'url("images/Gallery/Our%20Apartment/kaveri-apartment.webp")';

}


/* =========================================================
   FIX OLD IMAGE REFERENCES
   =========================================================

   This also repairs old cards/images if the current
   index.html still contains the previous paths.
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

            const original =
                img.getAttribute("src");

            if (!original) {
                return;
            }

            if (replacements[original]) {

                img.setAttribute(
                    "src",
                    replacements[original]
                );

            }

        });


    /* Repair inline background images */

    document
        .querySelectorAll("[style*='kaveri-apartment']")
        .forEach(element => {

            const style =
                element.getAttribute("style");

            if (!style) {
                return;
            }

            element.setAttribute(
                "style",
                style.replace(
                    /images\/kaveri-apartment\.webp/g,
                    KAVERI_IMAGES.apartment
                )
            );

        });

}


/* =========================================================
   MODAL ELEMENTS
   ========================================================= */

let galleryModal;
let galleryModalTitle;
let galleryModalImage;
let galleryModalCaption;
let galleryModalClose;
let galleryPrev;
let galleryNext;
let galleryThumbnails;


/* =========================================================
   GALLERY STATE
   ========================================================= */

let currentAlbum = null;
let currentPhotoIndex = 0;


/* =========================================================
   GET MODAL ELEMENTS
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
        console.warn(
            "Gallery album not found:",
            albumId
        );

        return;
    }


    currentAlbum = albumId;

    currentPhotoIndex = photoIndex;


    if (galleryModalTitle) {

        galleryModalTitle.textContent =
            album.title;

    }


    renderGalleryThumbnails();

    showGalleryPhoto(
        currentPhotoIndex
    );


    if (galleryModal) {

        galleryModal.classList.add("active");

        galleryModal.classList.add("open");

        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    document.body.classList.add(
        "gallery-modal-open"
    );

    document.body.classList.add(
        "no-scroll"
    );

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


    currentPhotoIndex = index;


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


    updateGalleryThumbnails();

}


/* =========================================================
   NEXT
   ========================================================= */

function nextGalleryPhoto() {

    if (!currentAlbum) {
        return;
    }


    const album =
        galleryData[currentAlbum];


    if (!album) {
        return;
    }


    showGalleryPhoto(
        currentPhotoIndex + 1
    );

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function previousGalleryPhoto() {

    if (!currentAlbum) {
        return;
    }


    const album =
        galleryData[currentAlbum];


    if (!album) {
        return;
    }


    showGalleryPhoto(
        currentPhotoIndex - 1
    );

}


/* =========================================================
   CLOSE
   ========================================================= */

function closeGallery() {

    if (!galleryModal) {
        return;
    }


    galleryModal.classList.remove(
        "active"
    );

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

    document.body.classList.remove(
        "no-scroll"
    );


    currentAlbum = null;

    currentPhotoIndex = 0;

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


    if (!album) {
        return;
    }


    galleryThumbnails.innerHTML = "";


    album.photos.forEach(
        (photo, index) => {

            const thumbnail =
                document.createElement(
                    "button"
                );


            thumbnail.type =
                "button";


            /*
             * IMPORTANT:
             * Use gallery-thumb because
             * this matches the website CSS.
             */

            thumbnail.className =
                "gallery-thumb";


            thumbnail.setAttribute(
                "aria-label",
                "Open photo " +
                (index + 1)
            );


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                photo.src;


            image.alt =
                photo.caption || "";


            image.loading =
                "lazy";


            thumbnail.appendChild(
                image
            );


            thumbnail.addEventListener(
                "click",
                () => {

                    showGalleryPhoto(
                        index
                    );

                }
            );


            galleryThumbnails.appendChild(
                thumbnail
            );

        }
    );

}


/* =========================================================
   ACTIVE THUMBNAIL
   ========================================================= */

function updateGalleryThumbnails() {

    if (!galleryThumbnails) {
        return;
    }


    const thumbnails =
        galleryThumbnails.querySelectorAll(
            ".gallery-thumb"
        );


    thumbnails.forEach(
        (thumbnail, index) => {

            thumbnail.classList.toggle(
                "active",
                index ===
                currentPhotoIndex
            );


            if (
                index ===
                currentPhotoIndex
            ) {

                thumbnail.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                thumbnail.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}


/* =========================================================
   ALBUM CARDS
   ========================================================= */

function initializeAlbumCards() {

    const albumCards =
        document.querySelectorAll(
            ".album-card"
        );


    albumCards.forEach(
        card => {

            /*
             * Prevent duplicate listeners
             * if the script is accidentally
             * initialized more than once.
             */

            if (
                card.dataset.galleryReady ===
                "true"
            ) {
                return;
            }


            card.dataset.galleryReady =
                "true";


            card.addEventListener(
                "click",
                event => {

                    /*
                     * Ignore clicks on actual
                     * links/buttons inside card
                     * when appropriate.
                     */

                    const albumId =
                        card.dataset.album;


                    if (!albumId) {
                        return;
                    }


                    openGallery(
                        albumId,
                        0
                    );

                }
            );


            card.addEventListener(
                "keydown",
                event => {

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


                        openGallery(
                            albumId,
                            0
                        );

                    }

                }
            );

        }
    );

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
                            button.dataset
                                .galleryFilter ||
                            "all"
                        ).toLowerCase();


                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );


                            item.setAttribute(
                                "aria-selected",
                                "false"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    button.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    albumCards.forEach(
                        card => {

                            const categories =
                                (
                                    card.dataset
                                        .category ||
                                    ""
                                )
                                .toLowerCase()
                                .split(/\s+/)
                                .filter(Boolean);


                            const year =
                                (
                                    card.dataset
                                        .year ||
                                    ""
                                )
                                .toLowerCase();


                            let show =
                                false;


                            if (
                                filter === "all"
                            ) {

                                show = true;

                            }


                            else if (
                                filter ===
                                "apartment"
                            ) {

                                show =
                                    categories.includes(
                                        "apartment"
                                    );

                            }


                            else if (
                                filter ===
                                "community"
                            ) {

                                show =
                                    categories.includes(
                                        "community"
                                    );

                            }


                            else if (
                                filter ===
                                "festivals"
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

                        }
                    );

                }
            );

        }
    );

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


    if (galleryModal) {

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
                (
                    !galleryModal.classList.contains(
                        "active"
                    ) &&
                    !galleryModal.classList.contains(
                        "open"
                    )
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

                nextGalleryPhoto();

            }


            else if (
                event.key === "ArrowLeft"
            ) {

                previousGalleryPhoto();

            }

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navLinks.forEach(
        link => {

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

        }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    /*
     * Your existing website uses .menu-btn.
     * Support that as well as the previous names.
     */

    const menuButton =
        document.querySelector(
            ".menu-btn, .menu-toggle, .mobile-menu-toggle, #menuToggle"
        );


    const mobileMenu =
        document.querySelector(
            ".mobile-menu, #mobileMenu"
        );


    if (
        !menuButton ||
        !mobileMenu
    ) {

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
                isOpen
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * FIRST:
         * Restore Home background.
         */

        restoreHomeBackground();


        /*
         * SECOND:
         * Repair old image references.
         */

        repairOldImagePaths();


        /*
         * THIRD:
         * Prepare Gallery.
         */

        getGalleryElements();

        initializeAlbumCards();

        initializeGalleryFilters();

        initializeGalleryModal();

        initializeKeyboardControls();

        initializeNavigation();

        initializeMobileMenu();

    }
);


/* =========================================================
   END
   ========================================================= */
