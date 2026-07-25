/* ==========================================================================
   NATHANIA ANABEL — PORTFOLIO SCRIPT
   Vanilla JavaScript — no dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------- */
  /* 1. FOOTER YEAR                     */
  /* ---------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------- */
  /* 2. STICKY NAVBAR ON SCROLL         */
  /* ---------------------------------- */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------------------------------- */
  /* 3. MOBILE NAV TOGGLE               */
  /* ---------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu whenever a nav link is clicked
    navMenu.querySelectorAll('.navbar__link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (event) => {
      const clickedInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
      if (!clickedInsideNav && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------- */
  /* 4. SMOOTH SCROLL FOR ANCHOR LINKS  */
  /* ---------------------------------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();

      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const navHeight = navbar ? navbar.offsetHeight : 0;

      window.scrollTo({
        top: targetPosition - navHeight + 1,
        behavior: 'smooth'
      });
    });
  });

  /* ---------------------------------- */
  /* 5. SCROLL REVEAL ANIMATION         */
  /* ---------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: reveal everything immediately if IntersectionObserver is unsupported
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------- */
  /* 6. ACTIVE NAV LINK ON SCROLL       */
  /* ---------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 40;

    let currentSectionId = '';
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute('href').replace('#', '');
      link.classList.toggle('is-active-link', linkTarget === currentSectionId);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------------------------------- */
  /* 7. BACK TO TOP BUTTON              */
  /* ---------------------------------- */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 480);
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});