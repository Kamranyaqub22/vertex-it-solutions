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

// ── Floating WhatsApp Button ──────────────────────────────────────────────────
(function () {
  var WA_NUMBER  = '442086386438'; // +44 208 638 6438
  var WA_MESSAGE = encodeURIComponent('Hi, I\'d like to enquire about your IT services.');
  var link = document.createElement('a');
  link.className   = 'wa-float';
  link.href        = 'https://wa.me/' + WA_NUMBER + '?text=' + WA_MESSAGE;
  link.target      = '_blank';
  link.rel         = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Chat with us on WhatsApp');
  link.innerHTML   =
    '<svg class="wa-float__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
      '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
      '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
      '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
      '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
      '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2' +
      ' 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719' +
      ' 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
      '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.507' +
      'A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818' +
      'a9.8 9.8 0 0 1-5.006-1.374l-.36-.214-3.724.885.916-3.617-.235-.372' +
      'A9.795 9.795 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12' +
      ' 17.43 21.818 12 21.818z"/>' +
    '</svg>' +
    '<span class="wa-float__label">WhatsApp Us</span>';
  document.body.appendChild(link);
})();
