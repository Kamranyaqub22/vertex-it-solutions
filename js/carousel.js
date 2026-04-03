/* ============================================
   CAROUSEL — Testimonial Slider
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel__track');
        const slides = carousel.querySelectorAll('.carousel__slide');
        const dotsContainer = carousel.querySelector('.carousel__dots');

        if (!track || slides.length === 0) return;

        let currentIndex = 0;
        let autoPlayInterval;
        const autoPlayDelay = 5000;

        // Create dots
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel__dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                if (index === 0) dot.classList.add('is-active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update dots
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
                    dot.classList.toggle('is-active', i === currentIndex);
                });
            }

            // Restart autoplay
            resetAutoPlay();
        }

        function nextSlide() {
            goToSlide((currentIndex + 1) % slides.length);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Start autoplay
        startAutoPlay();

        // Pause on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left → next
                    goToSlide((currentIndex + 1) % slides.length);
                } else {
                    // Swipe right → prev
                    goToSlide((currentIndex - 1 + slides.length) % slides.length);
                }
            }
        }, { passive: true });
    });
});
