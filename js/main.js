/* CITS — main.js
 * Shared runtime: cookie banner, scroll reveal, mobile navigation
 * ─────────────────────────────────────────────────────────────── */

// Cookie banner: hide if already accepted
(function () {
  var banner = document.getElementById('cookie-banner');
  if (banner && localStorage.getItem('cits_cookies')) {
    banner.style.display = 'none';
  }
})();

// Scroll reveal via IntersectionObserver
(function () {
  if (!window.IntersectionObserver) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -48px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();

// Mobile navigation: burger toggle, dropdowns, escape, click-away, active page
(function () {
  var burger = document.querySelector('.nav__burger');
  var nav    = document.querySelector('.nav');
  if (!burger || !nav) return;

  function closePill(open) {
    var pill = document.querySelector('.pill-strip');
    if (pill) pill.style.visibility = open ? 'hidden' : '';
  }

  // Burger open/close
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label',    open ? 'Close menu' : 'Open menu');
    closePill(open);
  });

  // Escape key closes menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      closePill(false);
      burger.focus();
    }
  });

  // Click outside closes menu
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target)) {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      closePill(false);
    }
  });

  // Mobile: tap dropdown parent to expand sub-menu
  document.querySelectorAll('.nav__dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        var li      = this.closest('.nav__dropdown');
        var wasOpen = li.classList.contains('open');
        document.querySelectorAll('.nav__dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
        if (!wasOpen) li.classList.add('open');
      }
    });
  });

  // Mark current page link as active
  var path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    // Normalise: treat both /about and about.html style hrefs
    if (href && (path.endsWith(href) || ('/' + href) === path)) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
