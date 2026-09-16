document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       KAVERI UNNATII APARTMENT
       Main JavaScript
       ========================================================= */

    /* ---------------------------------------------------------
       MOBILE NAVIGATION
       --------------------------------------------------------- */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu when a navigation link is clicked
        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                nav.classList.contains("open") &&
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                nav.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");
            }
        });

        // Close mobile menu with Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                nav.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }


    /* ---------------------------------------------------------
       GALLERY DATA
       --------------------------------------------------------- */

    const galleryDataElement = document.getElementById("galleryData");

    let galleryData = {};

    if (galleryDataElement) {
        try {
            galleryData = JSON.parse(galleryDataElement.textContent);
        } catch (error) {
            console.error("Unable to read gallery data:", error);
            galleryData = {};
        }
    }


    /* ---------------------------------------------------------
       GALLERY FILTERS
       --------------------------------------------------------- */

    const filterButtons = document.querySelectorAll(".gallery-filter");
    const albumCards = document.querySelectorAll(".album-card");
    const galleryEmpty = document.getElementById("galleryEmpty");

    function filterGallery(filter) {
        let visibleCount = 0;

        albumCards.forEach((card) => {
            const year = card.dataset.year || "";
            const category = card.dataset.category || "";

            let showCard = false;

            if (filter === "all") {
                showCard = true;
            } else if (filter === "2023") {
                showCard = year === "2023";
            } else if (filter === "2026") {
                showCard = year === "2026";
            } else if (filter === "community") {
                showCard = category === "community";
            } else if (filter === "festival") {
                showCard = category === "festival";
            }

            if (showCard) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (galleryEmpty) {
            galleryEmpty.hidden = visibleCount !== 0;
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter || "all";

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            filterGallery(filter);
        });
    });


    /* ---------------------------------------------------------
       GALLERY MODAL ELEMENTS
       --------------------------------------------------------- */

    const galleryModal = document.getElementById("galleryModal");
    const galleryModalTitle = document.getElementById("galleryModalTitle");
    const galleryModalCounter = document.getElementById("galleryModalCounter");
    const galleryModalClose = document.getElementById("galleryModalClose");
    const galleryPrev = document.getElementById("galleryPrev");
    const galleryNext = document.getElementById("galleryNext");
    const galleryModalImage = document.getElementById("galleryModalImage");
    const galleryModalCaption = document.getElementById("galleryModalCaption");
    const galleryThumbnails = document.getElementById("galleryThumbnails");

    let currentAlbum = null;
    let currentIndex = 0;
    let previousFocusedElement = null;


    /* ---------------------------------------------------------
       GET ALBUM PHOTOS
       --------------------------------------------------------- */

    function getAlbumPhotos(albumId) {
        if (!galleryData || !albumId) {
            return [];
        }

        const album = galleryData[albumId];

        if (!album || !Array.isArray(album.photos)) {
            return [];
        }

        return album.photos;
    }


    /* ---------------------------------------------------------
       NORMALIZE PHOTO DATA
       --------------------------------------------------------- */

    function normalizePhoto(photo) {
        if (typeof photo === "string") {
            return {
                src: photo,
                caption: ""
            };
        }

        if (photo && typeof photo === "object") {
            return {
                src: photo.src || photo.image || "",
                caption: photo.caption || photo.title || ""
            };
        }

        return {
            src: "",
            caption: ""
        };
    }


    /* ---------------------------------------------------------
       UPDATE GALLERY IMAGE
       --------------------------------------------------------- */

    function updateGalleryImage(useTransition = true) {
        if (!currentAlbum || !galleryModalImage) {
            return;
        }

        const photos = getAlbumPhotos(currentAlbum);

        if (!photos.length) {
            return;
        }

        if (currentIndex < 0) {
            currentIndex = photos.length - 1;
        }

        if (currentIndex >= photos.length) {
            currentIndex = 0;
        }

        const photo = normalizePhoto(photos[currentIndex]);

        if (!photo.src) {
            console.warn("Gallery photo has no image source.");
            return;
        }

        if (useTransition) {
            galleryModalImage.classList.add("is-changing");

            window.setTimeout(() => {
                galleryModalImage.src = photo.src;
                galleryModalImage.alt = photo.caption || currentAlbum.title || "Kaveri Unnatii Apartment photo";

                galleryModalImage.onload = () => {
                    galleryModalImage.classList.remove("is-changing");
                };

                // Remove transition class even if the image fails to load
                window.setTimeout(() => {
                    galleryModalImage.classList.remove("is-changing");
                }, 500);
            }, 100);
        } else {
            galleryModalImage.src = photo.src;
            galleryModalImage.alt = photo.caption || currentAlbum.title || "Kaveri Unnatii Apartment photo";
        }

        if (galleryModalCounter) {
            galleryModalCounter.textContent =
                `${currentIndex + 1} / ${photos.length}`;
        }

        if (galleryModalCaption) {
            galleryModalCaption.textContent = photo.caption || "";
        }

        updateThumbnailState();
        updateGalleryButtons();
    }


    /* ---------------------------------------------------------
       THUMBNAILS
       --------------------------------------------------------- */

    function renderThumbnails() {
        if (!galleryThumbnails || !currentAlbum) {
            return;
        }

        const photos = getAlbumPhotos(currentAlbum);

        galleryThumbnails.innerHTML = "";

        photos.forEach((photoData, index) => {
            const photo = normalizePhoto(photoData);

            const thumbnailButton = document.createElement("button");

            thumbnailButton.type = "button";
            thumbnailButton.className = "gallery-thumb";
            thumbnailButton.dataset.index = String(index);
            thumbnailButton.setAttribute(
                "aria-label",
                `View photo ${index + 1}`
            );

            const thumbnailImage = document.createElement("img");

            thumbnailImage.src = photo.src;
            thumbnailImage.alt = photo.caption || `Photo ${index + 1}`;
            thumbnailImage.loading = "lazy";

            thumbnailButton.appendChild(thumbnailImage);

            thumbnailButton.addEventListener("click", () => {
                currentIndex = index;
                updateGalleryImage();
            });

            galleryThumbnails.appendChild(thumbnailButton);
        });

        updateThumbnailState();
    }


    function updateThumbnailState() {
        if (!galleryThumbnails) {
            return;
        }

        const thumbnails =
            galleryThumbnails.querySelectorAll(".gallery-thumb");

        thumbnails.forEach((thumbnail, index) => {
            const active = index === currentIndex;

            thumbnail.classList.toggle("active", active);
            thumbnail.setAttribute(
                "aria-current",
                active ? "true" : "false"
            );
        });
    }


    /* ---------------------------------------------------------
       PREVIOUS / NEXT BUTTONS
       --------------------------------------------------------- */

    function updateGalleryButtons() {
        if (!currentAlbum) {
            return;
        }

        const photos = getAlbumPhotos(currentAlbum);
        const hasMultiplePhotos = photos.length > 1;

        if (galleryPrev) {
            galleryPrev.disabled = !hasMultiplePhotos;
            galleryPrev.setAttribute(
                "aria-disabled",
                hasMultiplePhotos ? "false" : "true"
            );
        }

        if (galleryNext) {
            galleryNext.disabled = !hasMultiplePhotos;
            galleryNext.setAttribute(
                "aria-disabled",
                hasMultiplePhotos ? "false" : "true"
            );
        }
    }


    function showPreviousPhoto() {
        if (!currentAlbum) {
            return;
        }

        const photos = getAlbumPhotos(currentAlbum);

        if (photos.length <= 1) {
            return;
        }

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = photos.length - 1;
        }

        updateGalleryImage();
    }


    function showNextPhoto() {
        if (!currentAlbum) {
            return;
        }

        const photos = getAlbumPhotos(currentAlbum);

        if (photos.length <= 1) {
            return;
        }

        currentIndex++;

        if (currentIndex >= photos.length) {
            currentIndex = 0;
        }

        updateGalleryImage();
    }

    if (galleryPrev) {
        galleryPrev.addEventListener("click", showPreviousPhoto);
    }

    if (galleryNext) {
        galleryNext.addEventListener("click", showNextPhoto);
    }


    /* ---------------------------------------------------------
       OPEN GALLERY
       --------------------------------------------------------- */

    function openGallery(albumId) {
        if (!galleryModal) {
            return;
        }

        const album = galleryData[albumId];

        if (!album) {
            console.warn(`Gallery album not found: ${albumId}`);
            return;
        }

        const photos = getAlbumPhotos(albumId);

        if (!photos.length) {
            console.warn(`No photos found for album: ${albumId}`);
            return;
        }

        currentAlbum = album;
        currentAlbum.id = albumId;
        currentIndex = 0;

        previousFocusedElement = document.activeElement;

        if (galleryModalTitle) {
            galleryModalTitle.textContent =
                album.title || "Kaveri Unnatii Apartment Gallery";
        }

        galleryModal.classList.add("is-open");
        galleryModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("no-scroll");

        renderThumbnails();
        updateGalleryImage(false);

        // Focus close button for keyboard accessibility
        window.setTimeout(() => {
            if (galleryModalClose) {
                galleryModalClose.focus();
            }
        }, 50);
    }


    /* ---------------------------------------------------------
       CLOSE GALLERY
       --------------------------------------------------------- */

    function closeGallery() {
        if (!galleryModal) {
            return;
        }

        galleryModal.classList.remove("is-open");
        galleryModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("no-scroll");

        currentAlbum = null;
        currentIndex = 0;

        if (galleryModalImage) {
            galleryModalImage.src = "";
        }

        if (galleryModalCaption) {
            galleryModalCaption.textContent = "";
        }

        if (galleryThumbnails) {
            galleryThumbnails.innerHTML = "";
        }

        if (
            previousFocusedElement &&
            typeof previousFocusedElement.focus === "function"
        ) {
            previousFocusedElement.focus();
        }

        previousFocusedElement = null;
    }


    if (galleryModalClose) {
        galleryModalClose.addEventListener("click", closeGallery);
    }


    /* ---------------------------------------------------------
       CLOSE WHEN CLICKING MODAL BACKDROP
       --------------------------------------------------------- */

    if (galleryModal) {
        galleryModal.addEventListener("click", (event) => {
            const closeTarget = event.target.closest(
                "[data-gallery-close]"
            );

            if (closeTarget) {
                closeGallery();
            }
        });
    }


    /* ---------------------------------------------------------
       ALBUM CARD CLICK
       --------------------------------------------------------- */

    albumCards.forEach((card) => {
        const albumId = card.dataset.album;

        if (!albumId) {
            return;
        }

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", () => {
            openGallery(albumId);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(albumId);
            }
        });
    });


    /* ---------------------------------------------------------
       KEYBOARD CONTROLS
       --------------------------------------------------------- */

    document.addEventListener("keydown", (event) => {
        if (!galleryModal || !galleryModal.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            closeGallery();
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreviousPhoto();
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showNextPhoto();
            return;
        }
    });


    /* ---------------------------------------------------------
       TOUCH / SWIPE SUPPORT
       --------------------------------------------------------- */

    let touchStartX = 0;
    let touchStartY = 0;

    if (galleryModalImage) {
        galleryModalImage.addEventListener(
            "touchstart",
            (event) => {
                if (!event.touches || !event.touches.length) {
                    return;
                }

                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
            },
            { passive: true }
        );

        galleryModalImage.addEventListener(
            "touchend",
            (event) => {
                if (!event.changedTouches || !event.changedTouches.length) {
                    return;
                }

                const touchEndX = event.changedTouches[0].clientX;
                const touchEndY = event.changedTouches[0].clientY;

                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;

                // Only treat mostly-horizontal gestures as swipes
                if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX > 0) {
                        showPreviousPhoto();
                    } else {
                        showNextPhoto();
                    }
                }

                touchStartX = 0;
                touchStartY = 0;
            },
            { passive: true }
        );
    }


    /* ---------------------------------------------------------
       BACK TO TOP BUTTON
       --------------------------------------------------------- */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        const updateBackToTop = () => {
            if (window.scrollY > 450) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        };

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ---------------------------------------------------------
       SMOOTH SCROLL FOR INTERNAL LINKS
       --------------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, "", targetId);
            }
        });
    });


    /* ---------------------------------------------------------
       IMAGE ERROR HANDLING
       --------------------------------------------------------- */

    document.querySelectorAll("img").forEach((image) => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });
    });


    /* ---------------------------------------------------------
       INITIAL GALLERY STATE
       --------------------------------------------------------- */

    filterGallery("all");


    /* ---------------------------------------------------------
       CONSOLE MESSAGE
       --------------------------------------------------------- */

    console.log(
        "Kaveri Unnatii Apartment website loaded successfully."
    );
});
