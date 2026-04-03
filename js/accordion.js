/* ============================================
   ACCORDION — Expand / Collapse
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion__item');

        items.forEach(item => {
            const trigger = item.querySelector('.accordion__trigger');
            const body = item.querySelector('.accordion__body');

            if (!trigger || !body) return;

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                // Close all items in this accordion
                items.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('is-open');
                        const otherBody = otherItem.querySelector('.accordion__body');
                        if (otherBody) otherBody.style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (isOpen) {
                    item.classList.remove('is-open');
                    body.style.maxHeight = null;
                } else {
                    item.classList.add('is-open');
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            });
        });
    });
});
