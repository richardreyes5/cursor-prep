document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('[data-section]');
  const backBtn = document.querySelector('.back-to-top');

  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-section');
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backBtn?.classList.add('visible');
    } else {
      backBtn?.classList.remove('visible');
    }
  });

  backBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
