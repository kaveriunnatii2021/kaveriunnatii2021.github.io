/* =========================================================
   KAVERI UNNATII APARTMENT
   FINAL WEBSITE SCRIPT
   =========================================================
   Includes:
   - Correct Gallery image paths
   - Gallery album popup
   - Gallery filters
   - Previous / Next photo
   - Gallery thumbnails
   - Keyboard controls
   - Smooth navigation
   - Mobile navigation menu
   - Automatic repair of old image paths
   - Correct Home hero background
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
   GALLERY VARIABLES
   ========================================================= */

let galleryModal = null;
let galleryModalTitle = null;
let galleryModalImage = null;
let galleryModalCaption = null;
let galleryModalClose = null;
let galleryPrev = null;
let galleryNext = null;
let galleryThumbnails = null;

let currentAlbum = null;
let currentPhotoIndex = 0;


/* =========================================================
   HOME HERO BACKGROUND
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


    document.querySelectorAll("img").forEach(img => {

        const src = img.getAttribute("src");

        if (src && replacements[src]) {
            img.setAttribute("src", replacements[src]);
        }

    });


    document
        .querySelectorAll("[style*='kaveri-apartment']")
        .forEach(element => {

            const style = element.getAttribute("style");

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

function openGallery(albumId, photoIndex = 0) {

    const album = galleryData[albumId];

    if (!album || !album.photos.length) {
        console.warn("Gallery album not found:", albumId);
        return;
    }

    currentAlbum = albumId;
    currentPhotoIndex = photoIndex;

    if (galleryModalTitle) {
        galleryModalTitle.textContent = album.title;
    }

    renderGalleryThumbnails();
    showGalleryPhoto(photoIndex);

    if (galleryModal) {

        galleryModal.classList.add("active");
        galleryModal.classList.add("open");

        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );
    }

    document.body.classList.add("gallery-modal-open");
    document.body.classList.add("no-scroll");
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

    const photo = album.photos[index];

    if (galleryModalImage) {

        galleryModalImage.src = photo.src;

        galleryModalImage.alt =
            photo.caption || album.title;
    }

    if (galleryModalCaption) {
        galleryModalCaption.textContent =
            photo.caption || "";
    }

    updateGalleryCounter();
    updateGalleryThumbnails();
}


/* =========================================================
   COUNTER
   ========================================================= */

function updateGalleryCounter() {

    const counter =
        document.getElementById("galleryModalCounter");

    if (!counter || !currentAlbum) {
        return;
    }

    const album = galleryData[currentAlbum];

    if (!album) {
        return;
    }

    counter.textContent =
        `${currentPhotoIndex + 1} / ${album.photos.length}`;
}


/* =========================================================
   NEXT PHOTO
   ========================================================= */

function nextGalleryPhoto() {

    if (!currentAlbum) {
        return;
    }

    showGalleryPhoto(
        currentPhotoIndex + 1
    );
}


/* =========================================================
   PREVIOUS PHOTO
   ========================================================= */

function previousGalleryPhoto() {

    if (!currentAlbum) {
        return;
    }

    showGalleryPhoto(
        currentPhotoIndex - 1
    );
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
   RENDER THUMBNAILS
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

        const thumbnail =
            document.createElement("button");

        thumbnail.type = "button";

        thumbnail.className =
            "gallery-thumb";

        thumbnail.setAttribute(
            "aria-label",
            `Open photo ${index + 1}`
        );

        const image =
            document.createElement("img");

        image.src = photo.src;

        image.alt =
            photo.caption || "";

        image.loading = "lazy";

        thumbnail.appendChild(image);

        thumbnail.addEventListener(
            "click",
            () => {
                showGalleryPhoto(index);
            }
        );

        galleryThumbnails.appendChild(
            thumbnail
        );
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
            ".gallery-thumb"
        );

    thumbnails.forEach(
        (thumbnail, index) => {

            const active =
                index === currentPhotoIndex;

            thumbnail.classList.toggle(
                "active",
                active
            );

            if (active) {

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

    albumCards.forEach(card => {

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
            () => {

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
    });
}


/* =========================================================
   GALLERY FILTERS
   IMPORTANT:
   HTML uses data-filter
   ========================================================= */

function initializeGalleryFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".gallery-filter"
        );

    const albumCards =
        document.querySelectorAll(
            ".album-card"
        );

    if (!filterButtons.length) {
        return;
    }


    filterButtons.forEach(button => {

        if (
            button.dataset.filterReady ===
            "true"
        ) {
            return;
        }

        button.dataset.filterReady =
            "true";


        button.addEventListener(
            "click",
            () => {

                const filter =
                    (
                        button.dataset.filter ||
                        "all"
                    ).toLowerCase();


                /* Update active button */

                filterButtons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                    item.setAttribute(
                        "aria-pressed",
                        "false"
                    );
                });


                button.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );


                /* Filter album cards */

                albumCards.forEach(card => {

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


                    let show = false;


                    if (filter === "all") {

                        show = true;

                    } else if (
                        filter === "apartment"
                    ) {

                        show =
                            categories.includes(
                                "apartment"
                            );

                    } else if (
                        filter === "community"
                    ) {

                        show =
                            categories.includes(
                                "community"
                            );

                    } else if (
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

                    } else if (
                        filter === "2023" ||
                        filter === "2026"
                    ) {

                        show =
                            year === filter;

                    } else {

                        show =
                            categories.includes(
                                filter
                            ) ||
                            year === filter;
                    }


                    card.style.display =
                        show ? "" : "none";
                });
            }
        );
    });
}


/* =========================================================
   GALLERY MODAL EVENTS
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


    /* Close when clicking backdrop */

    const backdrop =
        document.querySelector(
            ".gallery-modal-backdrop"
        );

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeGallery
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

            /* Gallery controls */

            const galleryOpen =
                galleryModal &&
                (
                    galleryModal.classList.contains(
                        "active"
                    ) ||
                    galleryModal.classList.contains(
                        "open"
                    )
                );


            if (galleryOpen) {

                if (event.key === "Escape") {

                    closeGallery();

                    return;
                }

                if (event.key === "ArrowRight") {

                    nextGalleryPhoto();

                    return;
                }

                if (event.key === "ArrowLeft") {

                    previousGalleryPhoto();

                    return;
                }
            }


            /* Mobile menu */

            if (event.key === "Escape") {

                closeMobileMenu();
            }
        }
    );
}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    navLinks.forEach(link => {

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


                let target;

                try {

                    target =
                        document.querySelector(
                            targetId
                        );

                } catch (error) {

                    return;
                }


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /* Close mobile menu */

                closeMobileMenu();
            }
        );
    });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

let mobileMenuButton = null;
let mobileNavigation = null;


function getMobileMenuElements() {

    /*
     * Your current HTML uses:
     *
     * button#menuBtn
     * nav#nav
     */

    mobileMenuButton =
        document.getElementById(
            "menuBtn"
        );

    mobileNavigation =
        document.getElementById(
            "nav"
        );


    /* Fallback support */

    if (!mobileMenuButton) {

        mobileMenuButton =
            document.querySelector(
                ".menu-btn, .menu-toggle, .mobile-menu-toggle, #menuToggle"
            );
    }


    if (!mobileNavigation) {

        mobileNavigation =
            document.querySelector(
                ".mobile-menu, #mobileMenu"
            );
    }
}


/* =========================================================
   OPEN MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    if (
        !mobileMenuButton ||
        !mobileNavigation
    ) {
        return;
    }


    mobileNavigation.classList.add(
        "active"
    );

    mobileNavigation.classList.add(
        "open"
    );


    mobileMenuButton.classList.add(
        "active"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );


    document.body.classList.add(
        "mobile-menu-open"
    );
}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    if (
        !mobileMenuButton ||
        !mobileNavigation
    ) {
        return;
    }


    mobileNavigation.classList.remove(
        "active"
    );

    mobileNavigation.classList.remove(
        "open"
    );


    mobileMenuButton.classList.remove(
        "active"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    document.body.classList.remove(
        "mobile-menu-open"
    );
}


/* =========================================================
   TOGGLE MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

    if (
        !mobileMenuButton ||
        !mobileNavigation
    ) {
        return;
    }


    const isOpen =
        mobileNavigation.classList.contains(
            "active"
        ) ||
        mobileNavigation.classList.contains(
            "open"
        );


    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();
    }
}


/* =========================================================
   INITIALIZE MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    getMobileMenuElements();


    if (
        !mobileMenuButton ||
        !mobileNavigation
    ) {

        console.warn(
            "Mobile navigation elements not found."
        );

        return;
    }


    if (
        mobileMenuButton.dataset.mobileMenuReady ===
        "true"
    ) {
        return;
    }


    mobileMenuButton.dataset.mobileMenuReady =
        "true";


    mobileMenuButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            toggleMobileMenu();
        }
    );


    /* Close menu when navigation link is clicked */

    mobileNavigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();
                }
            );
        });


    /* Close if user clicks outside */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileNavigation.classList.contains(
                    "active"
                ) &&
                !mobileNavigation.classList.contains(
                    "open"
                )
            ) {
                return;
            }


            if (
                mobileNavigation.contains(
                    event.target
                ) ||
                mobileMenuButton.contains(
                    event.target
                )
            ) {
                return;
            }


            closeMobileMenu();
        }
    );
}


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Home */

        restoreHomeBackground();


        /* Repair old image links */

        repairOldImagePaths();


        /* Gallery */

        getGalleryElements();

        initializeAlbumCards();

        initializeGalleryFilters();

        initializeGalleryModal();


        /* Keyboard */

        initializeKeyboardControls();


        /* Navigation */

        initializeNavigation();


        /* Mobile menu */

        initializeMobileMenu();

    }
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */
