// === INTRO SCREEN DETECTION (TAP / GESER DIMANA SAJA) ===
const introScreen = document.getElementById('intro-screen');
let startX, startY;
let hasInteracted = false; // mencegah double trigger

// Deteksi sentuhan awal (mobile)
window.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

// Deteksi arah geser
window.addEventListener('touchend', e => {
  if (hasInteracted) return;
  if (!startX || !startY) return;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  // Jika geseran cukup jauh (lebih dari 50px)
  if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
    hasInteracted = true;
    triggerSlideEffect();
  }
});

// Deteksi klik atau tap di mana saja
window.addEventListener('click', () => {
  if (hasInteracted) return;
  hasInteracted = true;
  triggerSlideEffect();
});

// Fungsi animasi geser palsu
function triggerSlideEffect() {
  // Tambahkan efek "geser" agar terlihat hidup
  introScreen.classList.add('intro-slide');
  
  // Delay sebelum benar-benar masuk website
  setTimeout(() => {
    closeIntro();
  }, 800);
}

// Fungsi animasi keluar layar intro
function closeIntro() {
  introScreen.classList.add('hidden');
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 800); // sesuai durasi transition di CSS
}

// Animasi fade-in saat elemen masuk ke layar
const sections = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

sections.forEach(section => observer.observe(section));

// Simulasi pengiriman pesan
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Terima kasih! Pesan Anda telah terkirim.');
  this.reset();
});

const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Simpan preferensi tema di localStorage
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggleButton.textContent = '🌞';
}

toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    toggleButton.textContent = '🌞';
    localStorage.setItem('theme', 'light');
  } else {
    toggleButton.textContent = '🌛';
    localStorage.setItem('theme', 'dark');
  }
});

// Sembunyikan stiker setelah klik tombol
const pointer = document.querySelector('.pointer-sticker');

toggleButton.addEventListener('click', () => {
  pointer.style.display = 'none';
});