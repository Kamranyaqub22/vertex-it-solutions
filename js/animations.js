/* ============================================
   ANIMATIONS — IntersectionObserver reveals,
   Counter animation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal with IntersectionObserver ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything if no IntersectionObserver
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(element) {
        const target = parseFloat(element.dataset.counter);
        const suffix = element.dataset.counterSuffix || '';
        const prefix = element.dataset.counterPrefix || '';
        const duration = 2000;
        const isDecimal = target % 1 !== 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;

            if (isDecimal) {
                element.textContent = prefix + current.toFixed(1) + suffix;
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (isDecimal) {
                    element.textContent = prefix + target.toFixed(1) + suffix;
                } else {
                    element.textContent = prefix + target + suffix;
                }
            }
        }

        requestAnimationFrame(updateCounter);
    }
});
