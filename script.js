/**
 * KIMI TRẦN — PERSONAL PORTFOLIO INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const toastContainer = document.getElementById('toastContainer');

  // 1. Theme Toggle (Dark / Light)
  const savedTheme = localStorage.getItem('kimi_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('kimi_theme', next);
      showToast(next === 'light' ? '☀️ Đã chuyển sang giao diện Sáng' : '🌙 Đã chuyển sang giao diện Tối');
    });
  }

  // 2. Mobile Menu Toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Toast Notification Helper
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  // 4. Floating Particle Effect
  function spawnParticles(x, y, emojis = ['💖', '✨', '🌸', '☀️', '🪷']) {
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span');
      el.className = 'floating-particle';
      el.textContent = emojis[i % emojis.length];
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.5;
      const dist = 60 + Math.random() * 90;
      const tx = Math.cos(angle) * dist + 'px';
      const ty = Math.sin(angle) * dist - 40 + 'px';
      const rot = (Math.random() - 0.5) * 60 + 'deg';

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.setProperty('--tx', tx);
      el.style.setProperty('--ty', ty);
      el.style.setProperty('--rot', rot);

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1400);
    }
  }

  // 5. "Gửi lời chào" Button
  const sendWaveBtn = document.getElementById('sendWaveBtn');
  if (sendWaveBtn) {
    sendWaveBtn.addEventListener('click', (e) => {
      const rect = sendWaveBtn.getBoundingClientRect();
      const cx = e.clientX || rect.left + rect.width / 2;
      const cy = e.clientY || rect.top + rect.height / 2;
      spawnParticles(cx, cy, ['👋', '💖', '✨', '🌻', '🪷']);
      showToast('👋 Kimi Trần gửi lời chào và chúc bạn một ngày tràn đầy năng lượng!');
    });
  }

  // 6. Interactive 9-Sticker Wall
  const stickerItems = document.querySelectorAll('.sticker-item');
  const stickerMsgTitle = document.getElementById('stickerMsgTitle');
  const stickerMsgBody = document.getElementById('stickerMsgBody');

  stickerItems.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      stickerItems.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const title = btn.getAttribute('data-title');
      const msg = btn.getAttribute('data-msg');
      const emoji = btn.getAttribute('data-emoji') || '✨';

      if (stickerMsgTitle) stickerMsgTitle.textContent = `${title} ${emoji}`;
      if (stickerMsgBody) stickerMsgBody.textContent = msg;

      const rect = btn.getBoundingClientRect();
      const cx = e.clientX || rect.left + rect.width / 2;
      const cy = e.clientY || rect.top + rect.height / 2;
      spawnParticles(cx, cy, [emoji, '💖', '✨', '🌸']);
    });
  });

  // 7. Gallery Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 8. Lightbox Modal for Images
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxFbLink = document.getElementById('lightboxFbLink');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentIndex = (index + lightboxTriggers.length) % lightboxTriggers.length;
    const target = lightboxTriggers[currentIndex];
    const src = target.getAttribute('data-lightbox');
    const caption = target.getAttribute('data-caption') || '';
    const fbUrl = target.getAttribute('data-fb-url') || 'https://www.facebook.com/profile.php?id=61585364303028';

    lightboxImg.src = src;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxFbLink) lightboxFbLink.href = fbUrl;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  lightboxTriggers.forEach((el, idx) => {
    el.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => openLightbox(currentIndex + 1));

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  });

  // 9. Copy Profile Link Button
  const copyBtn = document.getElementById('copyProfileLinkBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const url = copyBtn.getAttribute('data-url') || 'https://www.facebook.com/profile.php?id=61585364303028';
      try {
        await navigator.clipboard.writeText(url);
        if (copyBtnText) copyBtnText.textContent = 'Đã sao chép liên kết!';
        showToast('✅ Đã sao chép đường dẫn Facebook của Kimi Trần!');
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Sao chép liên kết Facebook';
        }, 2500);
      } catch {
        showToast('🔗 Link: ' + url);
      }
    });
  }
});
