document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       KAVERI UNNATII APARTMENT
       Gallery + Website JavaScript
       ========================================================= */


    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {
            const open = nav.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =========================================================
       GALLERY DATA
       ========================================================= */

    const galleryData = {

        "sankranti-2023": {
            title: "Sankranti 2023",
            photos: [
                {
                    src: "images/Gallery/2023-sankranti/community-group-01.webp",
                    caption: "Sankranti 2023 — Community celebration"
                },
                {
                    src: "images/Gallery/2023-sankranti/community-group-02.webp",
                    caption: "Sankranti 2023 — Residents together"
                },
                {
                    src: "images/Gallery/2023-sankranti/community-feast-01.webp",
                    caption: "Sankranti 2023 — Community feast"
                },
                {
                    src: "images/Gallery/2023-sankranti/community-feast-02.webp",
                    caption: "Sankranti 2023 — Community feast and togetherness"
                }
            ]
        },

        "holi-2023": {
            title: "Holi 2023",
            photos: [
                {
                    src: "images/Gallery/2023-holi/holi-community-01.webp",
                    caption: "Holi 2023 — Community celebration"
                },
                {
                    src: "images/Gallery/2023-holi/holi-fun-01.webp",
                    caption: "Holi 2023 — Fun and colours"
                },
                {
                    src: "images/Gallery/2023-holi/family-01.webp",
                    caption: "Holi 2023 — Family memories"
                }
            ]
        },

        "community-2023": {
            title: "Community Memories 2023",
            photos: [
                {
                    src: "images/Gallery/2023-community/families-01.webp",
                    caption: "Kaveri Unnatii — Community families"
                },
                {
                    src: "images/Gallery/2023-community/campus-visit-01.webp",
                    caption: "Kaveri Unnatii — Community visit"
                }
            ]
        },

        "events-2026": {
            title: "Community Events 2026",
            photos: [
                {
                    src: "images/Gallery/2026-events/event-photo-01.webp",
                    caption: "Kaveri Unnatii — Community event 2026"
                },
                {
                    src: "images/Gallery/2026-events/event-photo-02.webp",
                    caption: "Kaveri Unnatii — Community event 2026"
                }
            ]
        },

        "about-kaveri": {
            title: "About Kaveri Unnatii",
            photos: [
                {
                    src: "images/kaveri-apartment.webp",
                    caption: "Kaveri Unnatii Apartment"
                }
            ]
        }

    };


    /* =========================================================
       FILTERS
       ========================================================= */

    const filterButtons =
        document.querySelectorAll(".gallery-filter");

    const albumCards =
        document.querySelectorAll(".album-card");

    const galleryEmpty =
        document.getElementById("galleryEmpty");


    function filterGallery(filter) {

        let visible = 0;

        albumCards.forEach(card => {

            const year =
                card.dataset.year || "";

            const category =
                card.dataset.category || "";

            let show = false;

            if (filter === "all") {
                show = true;
            }

            if (filter === "2023") {
                show = year === "2023";
            }

            if (filter === "2026") {
                show = year === "2026";
            }

            if (filter === "community") {
                show = category === "community";
            }

            if (filter === "festival") {
                show = category === "festival";
            }

            card.style.display = show ? "" : "none";

            if (show) {
                visible++;
            }
        });

        if (galleryEmpty) {
            galleryEmpty.hidden = visible !== 0;
        }
    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            filterGallery(
                button.dataset.filter || "all"
            );
        });

    });


    /* =========================================================
       GALLERY MODAL
       ========================================================= */

    const modal =
        document.getElementById("galleryModal");

    const modalTitle =
        document.getElementById("galleryModalTitle");

    const modalCounter =
        document.getElementById("galleryModalCounter");

    const modalImage =
        document.getElementById("galleryModalImage");

    const modalCaption =
        document.getElementById("galleryModalCaption");

    const thumbnails =
        document.getElementById("galleryThumbnails");

    const closeButton =
        document.getElementById("galleryModalClose");

    const previousButton =
        document.getElementById("galleryPrev");

    const nextButton =
        document.getElementById("galleryNext");


    let currentAlbumId = null;
    let currentIndex = 0;


    /* =========================================================
       SHOW PHOTO
       ========================================================= */

    function showPhoto(index) {

        if (!currentAlbumId) {
            return;
        }

        const album =
            galleryData[currentAlbumId];

        if (!album || !album.photos.length) {
            return;
        }

        const total =
            album.photos.length;

        if (index < 0) {
            index = total - 1;
        }

        if (index >= total) {
            index = 0;
        }

        currentIndex = index;

        const photo =
            album.photos[currentIndex];


        /* -----------------------------------------
           IMPORTANT:
           Directly assign the image source.
           ----------------------------------------- */

        modalImage.onload = () => {

            modalImage.style.display = "block";

        };

        modalImage.onerror = () => {

            console.error(
                "Unable to load gallery image:",
                photo.src
            );

            modalImage.alt =
                "Unable to load this photo";
        };


        modalImage.src = photo.src;

        modalImage.alt =
            photo.caption || album.title;


        if (modalTitle) {
            modalTitle.textContent =
                album.title;
        }

        if (modalCounter) {
            modalCounter.textContent =
                `${currentIndex + 1} / ${total}`;
        }

        if (modalCaption) {
            modalCaption.textContent =
                photo.caption || "";
        }


        /* -----------------------------------------
           Previous / Next
           ----------------------------------------- */

        if (previousButton) {
            previousButton.disabled =
                total <= 1;
        }

        if (nextButton) {
            nextButton.disabled =
                total <= 1;
        }


        /* -----------------------------------------
           Thumbnail state
           ----------------------------------------- */

        if (thumbnails) {

            thumbnails
                .querySelectorAll(".gallery-thumb")
                .forEach((thumb, i) => {

                    thumb.classList.toggle(
                        "active",
                        i === currentIndex
                    );

                });
        }

    }


    /* =========================================================
       CREATE THUMBNAILS
       ========================================================= */

    function createThumbnails() {

        if (!thumbnails || !currentAlbumId) {
            return;
        }

        const album =
            galleryData[currentAlbumId];

        thumbnails.innerHTML = "";


        album.photos.forEach((photo, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "gallery-thumb";


            const image =
                document.createElement("img");

            image.src =
                photo.src;

            image.alt =
                photo.caption || `Photo ${index + 1}`;

            image.loading = "lazy";


            button.appendChild(image);


            button.addEventListener(
                "click",
                () => {
                    showPhoto(index);
                }
            );


            thumbnails.appendChild(button);

        });

    }


    /* =========================================================
       OPEN GALLERY
       ========================================================= */

    function openGallery(albumId) {

        const album =
            galleryData[albumId];

        if (!album) {

            console.error(
                "Gallery album not found:",
                albumId
            );

            return;
        }

        if (!album.photos.length) {

            console.error(
                "No photos in album:",
                albumId
            );

            return;
        }


        currentAlbumId =
            albumId;

        currentIndex = 0;


        createThumbnails();

        showPhoto(0);


        if (modal) {

            modal.classList.add("is-open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "no-scroll"
            );
        }

    }


    /* =========================================================
       CLOSE GALLERY
       ========================================================= */

    function closeGallery() {

        if (!modal) {
            return;
        }

        modal.classList.remove("is-open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );

        currentAlbumId = null;
    }


    /* =========================================================
       ALBUM CLICK
       ========================================================= */

    albumCards.forEach(card => {

        const albumId =
            card.dataset.album;

        card.addEventListener(
            "click",
            () => {
                openGallery(albumId);
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

                    openGallery(albumId);
                }

            }
        );

    });


    /* =========================================================
       BUTTONS
       ========================================================= */

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeGallery
        );
    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                showPhoto(
                    currentIndex - 1
                );

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                showPhoto(
                    currentIndex + 1
                );

            }
        );

    }


    /* =========================================================
       CLOSE BY BACKDROP
       ========================================================= */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal ||
                    event.target.hasAttribute(
                        "data-gallery-close"
                    )
                ) {

                    closeGallery();
                }

            }
        );

    }


    /* =========================================================
       KEYBOARD
       ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !modal ||
                !modal.classList.contains("is-open")
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeGallery();
            }

            if (event.key === "ArrowLeft") {
                showPhoto(currentIndex - 1);
            }

            if (event.key === "ArrowRight") {
                showPhoto(currentIndex + 1);
            }

        }
    );


    /* =========================================================
       INITIAL FILTER
       ========================================================= */

    filterGallery("all");

});
