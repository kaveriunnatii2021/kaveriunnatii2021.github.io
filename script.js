const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.full;
    lightboxImg.alt = card.querySelector('img').alt;
    lightbox.classList.add('open');
  });
});

function closeViewer() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

closeLightbox.addEventListener('click', closeViewer);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeViewer();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeViewer();
});
