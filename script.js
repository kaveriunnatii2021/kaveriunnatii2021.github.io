/* Kaveri Unnatii — Gallery + Navigation */
const galleryData = {
  "new-year": { title: 'New Year Celebration — 31 Dec 2023', kicker: 'Community Celebration', category: "new-year", images: [
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-01.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 1', caption: 'New Year Celebration — 31 Dec 2023.' },
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-02.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 2', caption: 'New Year Celebration — 31 Dec 2023.' },
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-03.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 3', caption: 'New Year Celebration — 31 Dec 2023.' },
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-04.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 4', caption: 'New Year Celebration — 31 Dec 2023.' },
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-05.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 5', caption: 'New Year Celebration — 31 Dec 2023.' },
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-06.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 6', caption: 'New Year Celebration — 31 Dec 2023.' },
    { src: "images/01-New-Year-Celebration-2023-24/new-year-celebration-2023-24-07.jpg", title: 'New Year Celebration — 31 Dec 2023 — Photo 7', caption: 'New Year Celebration — 31 Dec 2023.' },
  ] },
  "sankranti": { title: 'Sankranti Celebration — 15 Jan 2024', kicker: 'Festival Memories', category: "sankranti", images: [
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-01.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 1', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-02.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 2', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-03.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 3', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-04.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 4', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-05.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 5', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-06.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 6', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-07.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 7', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-08.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 8', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-09.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 9', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-10.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 10', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-11.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 11', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-12.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 12', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-13.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 13', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-14.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 14', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-15.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 15', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-16.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 16', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-17.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 17', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-18.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 18', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-19.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 19', caption: 'Sankranti Celebration — 15 Jan 2024.' },
    { src: "images/02-Sankranti-Celebration-2024/sankranti-celebration-2024-20.jpg", title: 'Sankranti Celebration — 15 Jan 2024 — Photo 20', caption: 'Sankranti Celebration — 15 Jan 2024.' },
  ] },
  "holi": { title: 'Holi Celebration', kicker: 'Festival Memories', category: "holi", images: [
    { src: "images/03-Holi-Celebration/holi-celebration-01.jpg", title: 'Holi Celebration — Photo 1', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-02.jpg", title: 'Holi Celebration — Photo 2', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-03.jpg", title: 'Holi Celebration — Photo 3', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-04.jpg", title: 'Holi Celebration — Photo 4', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-05.jpg", title: 'Holi Celebration — Photo 5', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-06.jpg", title: 'Holi Celebration — Photo 6', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-07.jpg", title: 'Holi Celebration — Photo 7', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-08.jpg", title: 'Holi Celebration — Photo 8', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-09.jpg", title: 'Holi Celebration — Photo 9', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-10.jpg", title: 'Holi Celebration — Photo 10', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-11.jpg", title: 'Holi Celebration — Photo 11', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-12.jpg", title: 'Holi Celebration — Photo 12', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-13.jpg", title: 'Holi Celebration — Photo 13', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-14.jpg", title: 'Holi Celebration — Photo 14', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-15.jpg", title: 'Holi Celebration — Photo 15', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-16.jpg", title: 'Holi Celebration — Photo 16', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-17.jpg", title: 'Holi Celebration — Photo 17', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-18.jpg", title: 'Holi Celebration — Photo 18', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-19.jpg", title: 'Holi Celebration — Photo 19', caption: 'Holi Celebration.' },
    { src: "images/03-Holi-Celebration/holi-celebration-20.jpg", title: 'Holi Celebration — Photo 20', caption: 'Holi Celebration.' },
  ] },
};

let currentAlbum=null,currentImageIndex=0;
let galleryModal=null,galleryModalImage=null,galleryModalTitle=null,galleryModalCaption=null,galleryModalCounter=null,galleryModalKicker=null,galleryThumbnails=null,galleryPrev=null,galleryNext=null,galleryModalClose=null;

function createGalleryModal(){
 if(document.getElementById("galleryModal")) return;
 const modal=document.createElement("div"); modal.id="galleryModal"; modal.className="gallery-lightbox"; modal.setAttribute("aria-hidden","true");
 modal.innerHTML=`<div class="gallery-lightbox-dialog"><div class="gallery-lightbox-header"><div><span class="gallery-lightbox-kicker" id="galleryModalKicker"></span><h3 id="galleryModalTitle"></h3></div><div class="gallery-lightbox-header-right"><span id="galleryModalCounter"></span><button type="button" class="gallery-lightbox-close" id="galleryModalClose" aria-label="Close gallery">✕</button></div></div><div class="gallery-lightbox-main"><button type="button" class="gallery-lightbox-nav gallery-lightbox-prev" id="galleryPrev" aria-label="Previous image">‹</button><div class="gallery-lightbox-image-wrap"><img id="galleryModalImage" src="" alt=""></div><button type="button" class="gallery-lightbox-nav gallery-lightbox-next" id="galleryNext" aria-label="Next image">›</button></div><div class="gallery-lightbox-caption"><p id="galleryModalCaption"></p></div><div class="gallery-thumbnails" id="galleryThumbnails" aria-label="Gallery thumbnails"></div></div>`;
 document.body.appendChild(modal);
}
function cacheGalleryElements(){ galleryModal=document.getElementById("galleryModal"); galleryModalImage=document.getElementById("galleryModalImage"); galleryModalTitle=document.getElementById("galleryModalTitle"); galleryModalCaption=document.getElementById("galleryModalCaption"); galleryModalCounter=document.getElementById("galleryModalCounter"); galleryModalKicker=document.getElementById("galleryModalKicker"); galleryThumbnails=document.getElementById("galleryThumbnails"); galleryPrev=document.getElementById("galleryPrev"); galleryNext=document.getElementById("galleryNext"); galleryModalClose=document.getElementById("galleryModalClose"); }
function renderGalleryImage(){ const a=galleryData[currentAlbum],i=a?.images[currentImageIndex]; if(!i)return; galleryModalImage.src=i.src; galleryModalImage.alt=i.title||a.title; galleryModalTitle.textContent=i.title||a.title; galleryModalCaption.textContent=i.caption||""; galleryModalKicker.textContent=a.kicker||""; galleryModalCounter.textContent=`${currentImageIndex+1} / ${a.images.length}`; galleryPrev.disabled=a.images.length<2; galleryNext.disabled=a.images.length<2; updateActiveThumbnail(); }
function renderGalleryThumbnails(){ if(!galleryThumbnails||!currentAlbum)return; const a=galleryData[currentAlbum]; galleryThumbnails.innerHTML=""; a.images.forEach((im,idx)=>{ const b=document.createElement("button"); b.type="button"; b.className="gallery-thumbnail"; b.setAttribute("aria-label",`Open image ${idx+1}`); const img=document.createElement("img"); img.src=im.src; img.alt=im.title||""; b.appendChild(img); b.addEventListener("click",()=>{currentImageIndex=idx;renderGalleryImage();}); galleryThumbnails.appendChild(b); }); updateActiveThumbnail(); }
function updateActiveThumbnail(){ if(!galleryThumbnails)return; galleryThumbnails.querySelectorAll(".gallery-thumbnail").forEach((b,i)=>b.classList.toggle("active",i===currentImageIndex)); const a=galleryThumbnails.querySelector(".gallery-thumbnail.active"); if(a)a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}); }
function openGallery(album,index=0){ if(!galleryModal){createGalleryModal();cacheGalleryElements();setupGalleryModal();} currentAlbum=album; currentImageIndex=Math.max(0,Math.min(index,galleryData[album].images.length-1)); renderGalleryImage(); renderGalleryThumbnails(); galleryModal.classList.add("open"); galleryModal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; galleryModalClose?.focus(); }
function closeGallery(){ if(!galleryModal)return; galleryModal.classList.remove("open"); galleryModal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; currentAlbum=null; }
function showPreviousGalleryImage(){ if(!currentAlbum)return; const n=galleryData[currentAlbum].images.length; currentImageIndex=(currentImageIndex-1+n)%n; renderGalleryImage(); }
function showNextGalleryImage(){ if(!currentAlbum)return; const n=galleryData[currentAlbum].images.length; currentImageIndex=(currentImageIndex+1)%n; renderGalleryImage(); }
function setupGalleryModal(){ if(!galleryModal)return; galleryModalClose?.addEventListener("click",closeGallery); galleryPrev?.addEventListener("click",showPreviousGalleryImage); galleryNext?.addEventListener("click",showNextGalleryImage); galleryModal.addEventListener("click",e=>{if(e.target===galleryModal)closeGallery();}); }
function setupGalleryTiles(){ document.querySelectorAll("[data-gallery-item]").forEach(item=>{ const open=()=>openGallery(item.dataset.album,parseInt(item.dataset.index||"0",10)||0); item.addEventListener("click",open); item.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}}); item.setAttribute("tabindex","0"); }); }
function filterGallery(filter="all"){ let visibleCount=0; document.querySelectorAll("[data-gallery-item]").forEach(item=>{const cats=(item.dataset.category||"").split(/\s+/);const show=filter==="all"||cats.includes(filter);item.style.display=show?"":"none";item.setAttribute("aria-hidden",show?"false":"true");if(show)visibleCount++;});document.querySelectorAll(".gallery-filter").forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle("active",active);b.setAttribute("aria-selected",active?"true":"false");});const empty=document.getElementById("galleryEmpty");if(empty)empty.hidden=visibleCount!==0;}
function setupGalleryFilters(){document.querySelectorAll(".gallery-filter").forEach(b=>b.addEventListener("click",()=>filterGallery(b.dataset.filter||"all")));filterGallery("all");}
function setupMobileNavigation(){const btn=document.querySelector(".menu-btn"),nav=document.querySelector("nav");if(!btn||!nav)return;btn.addEventListener("click",()=>{const open=nav.classList.toggle("open");btn.setAttribute("aria-expanded",open);btn.textContent=open?"✕":"☰";});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");btn.setAttribute("aria-expanded","false");btn.textContent="☰";}));}
function setupBackToTop(){const b=document.getElementById("backToTop");if(!b)return;window.addEventListener("scroll",()=>b.classList.toggle("show",window.scrollY>500),{passive:true});b.addEventListener("click",e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});});}
function setupKeyboard(){document.addEventListener("keydown",e=>{if(!galleryModal?.classList.contains("open"))return;if(e.key==="Escape")closeGallery();else if(e.key==="ArrowLeft")showPreviousGalleryImage();else if(e.key==="ArrowRight")showNextGalleryImage();});}
function setupSwipe(){if(!galleryModal)return;let sx=0;galleryModal.addEventListener("touchstart",e=>{sx=e.touches?.[0]?.clientX||0},{passive:true});galleryModal.addEventListener("touchend",e=>{const ex=e.changedTouches?.[0]?.clientX||0,d=ex-sx;if(Math.abs(d)>=50)(d<0?showNextGalleryImage:showPreviousGalleryImage)();},{passive:true});}
function setupImageErrors(){document.querySelectorAll("img").forEach(img=>img.addEventListener("error",()=>img.classList.add("image-load-error")));}
function initializeKaveriWebsite(){createGalleryModal();cacheGalleryElements();setupGalleryModal();setupGalleryTiles();setupGalleryFilters();setupKeyboard();setupSwipe();setupMobileNavigation();setupBackToTop();setupImageErrors();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initializeKaveriWebsite);else initializeKaveriWebsite();
