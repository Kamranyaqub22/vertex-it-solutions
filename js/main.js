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

// ── CRM Lead Capture ─────────────────────────────────────────────────────────
// Replace the two placeholder values below:
//   CRM_ENDPOINT  → your live API URL, e.g. https://crm.citsglobal.co.uk/api/leads
//                   or http://localhost:3000/api/leads for local testing
//   CRM_API_KEY   → the value of LEAD_CAPTURE_API_KEY from your CRM's .env file
(function () {
  var CRM_ENDPOINT = 'https://my-crm-zeta-neon.vercel.app/deals';
  var CRM_API_KEY  = 'YOUR_LEAD_CAPTURE_API_KEY';

  function handleLeadForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: reject if bot filled the hidden checkbox
      var botcheck = form.querySelector('[name="botcheck"]');
      if (botcheck && botcheck.checked) return;

      var btn = form.querySelector('[type="submit"]');
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Remove any previous feedback
      var existing = form.querySelector('.form-feedback');
      if (existing) existing.remove();

      // Build payload — only first_name and last_name are required
      var data = {
        first_name: (form.querySelector('[name="first_name"]') || {}).value || '',
        last_name:  (form.querySelector('[name="last_name"]')  || {}).value || '',
        company:    (form.querySelector('[name="company"]')    || {}).value || undefined,
        email:      (form.querySelector('[name="email"]')      || {}).value || undefined,
        phone:      (form.querySelector('[name="phone"]')      || {}).value || undefined,
        service:    (form.querySelector('[name="service"]')    || {}).value || undefined,
        employees:  (form.querySelector('[name="employees"]')  || {}).value || undefined,
        message:    (form.querySelector('[name="message"]')    || {}).value || undefined,
        source_url: window.location.href
      };

      // Strip empty optional fields so the CRM doesn't see empty strings
      Object.keys(data).forEach(function (k) {
        if (data[k] === '' || data[k] === undefined) delete data[k];
      });

      fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CRM_API_KEY
        },
        body: JSON.stringify(data)
      })
      .then(function (res) {
        if (!res.ok) throw new Error('server_error');
        return res.json();
      })
      .then(function () {
        var msg = document.createElement('p');
        msg.className = 'form-feedback form-feedback--ok';
        msg.textContent = 'Thank you — we\'ll be in touch within one working day.';
        form.reset();
        form.appendChild(msg);
      })
      .catch(function () {
        var msg = document.createElement('p');
        msg.className = 'form-feedback form-feedback--err';
        msg.textContent = 'Something went wrong. Please try again or call us on 0800 000 0000.';
        form.appendChild(msg);
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = originalText;
      });
    });
  }

  // Attach to every enquiry form on the page
  document.querySelectorAll('form.crm-form').forEach(handleLeadForm);
})();
