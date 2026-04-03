/* ============================================
   NAV — Sticky scroll, Mobile Menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.navbar__toggle');
    const links = document.querySelector('.navbar__links');

    // ---- Sticky scroll effect ----
    if (navbar) {
        const scrollThreshold = 80;

        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on load
    }

    // ---- Mobile menu toggle ----
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-open');
            links.classList.toggle('is-open');
            document.body.style.overflow = links.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close menu on link click
        links.querySelectorAll('.navbar__link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('is-open');
                links.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && links.classList.contains('is-open')) {
                toggle.classList.remove('is-open');
                links.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    }

    // ---- Active page link ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('is-active');
        }
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
