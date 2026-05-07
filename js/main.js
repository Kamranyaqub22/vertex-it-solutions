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

// ── CRM Lead Capture + Email Notification ────────────────────────────────────
// CRM_ENDPOINT / CRM_API_KEY  → your live CRM API
// WEB3FORMS_KEY               → free key from https://web3forms.com
//                               Enter info@citsglobal.co.uk there to get one.
(function () {
  var CRM_ENDPOINT   = 'https://my-crm-zeta-neon.vercel.app/api/public/leads';
  var CRM_API_KEY    = 'cits-crm-leads-2026';
  var WEB3FORMS_KEY  = '4d3df768-33b5-485b-8703-c7ce1df223be';

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
        firstName: (form.querySelector('[name="first_name"]') || {}).value || '',
        lastName:  (form.querySelector('[name="last_name"]')  || {}).value || '',
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

      // Build a plain-text summary for the email notification
      var emailSubject = 'New enquiry from ' + (data.firstName || '') + ' ' + (data.lastName || '') + (data.company ? ' (' + data.company + ')' : '');
      var emailBody    = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');

      var crmRequest = fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CRM_API_KEY
        },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error('server_error');
        return res.json();
      });

      // Email notification via Web3Forms
      var emailRequest = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key:   WEB3FORMS_KEY,
          subject:      emailSubject,
          message:      emailBody,
          from_name:    (data.firstName || '') + ' ' + (data.lastName || ''),
          replyto:      data.email || '',
          botcheck:     ''
        })
      })
      .then(function (res) { return res.json(); })
      .then(function (res) {
        if (!res.success) console.warn('Web3Forms error:', res.message);
      })
      .catch(function (err) { console.warn('Web3Forms fetch failed:', err); });

      Promise.all([crmRequest, emailRequest])
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
        msg.textContent = 'Something went wrong. Please try again or call us on 0208 638 6438.';
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
