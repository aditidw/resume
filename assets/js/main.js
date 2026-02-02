document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', () => {
      header.classList.toggle('mobile-open');
      toggle.querySelector('i').classList.toggle('bx-menu');
      toggle.querySelector('i').classList.toggle('bx-x');
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          header?.classList.remove('mobile-open');
        }
      }
    });
  });

  // Contact form handler for Formspree
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.textContent = 'Sending...';
      status.className = 'form-status';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          status.textContent = 'Thanks! Your message was sent.';
          status.classList.add('success');
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please try again.';
          status.classList.add('error');
        }
      } catch (error) {
        status.textContent = 'Network error. Please try again.';
        status.classList.add('error');
      }
    });
  }

  // AOS init
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out',
      once: true,
    });
  }
});
