const images = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'flex';
  lightboxImg.src = images[currentIndex].src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function changeImage(direction) {
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  lightboxImg.src = images[currentIndex].src;
}

document.addEventListener('keydown', function (e) {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      changeImage(1);
    } 
    else if (e.key === 'ArrowLeft') {
      changeImage(-1);
    } 
    else if (e.key === 'Escape') {
      closeLightbox();
    }
  }
});

function filterImages(category) {
  images.forEach(img => {
    img.style.display =
      category === 'all' || img.classList.contains(category)
        ? 'block'
        : 'none';
  });
}
