/* ============================================
   FORM — Contact Form Validation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
        name: {
            element: form.querySelector('#field-name'),
            validate: (v) => v.trim().length >= 2,
            message: 'Please enter your full name (at least 2 characters)'
        },
        email: {
            element: form.querySelector('#field-email'),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: 'Please enter a valid email address'
        },
        phone: {
            element: form.querySelector('#field-phone'),
            validate: (v) => v.trim() === '' || /^[\d\s\+\-\(\)]{7,}$/.test(v),
            message: 'Please enter a valid phone number'
        },
        company: {
            element: form.querySelector('#field-company'),
            validate: () => true, // Optional
            message: ''
        },
        service: {
            element: form.querySelector('#field-service'),
            validate: (v) => v !== '',
            message: 'Please select a service you\'re interested in'
        },
        message: {
            element: form.querySelector('#field-message'),
            validate: (v) => v.trim().length >= 10,
            message: 'Please enter a message (at least 10 characters)'
        }
    };

    // Real-time validation on blur
    Object.values(fields).forEach(field => {
        if (!field.element) return;

        field.element.addEventListener('blur', () => {
            validateField(field);
        });

        field.element.addEventListener('input', () => {
            const group = field.element.closest('.form-group');
            if (group && group.classList.contains('has-error')) {
                validateField(field);
            }
        });
    });

    function validateField(field) {
        if (!field.element) return true;
        
        const group = field.element.closest('.form-group');
        const errorEl = group?.querySelector('.form-error');
        const value = field.element.value;
        const isValid = field.validate(value);

        if (!isValid) {
            group?.classList.add('has-error');
            if (errorEl) errorEl.textContent = field.message;
        } else {
            group?.classList.remove('has-error');
        }

        return isValid;
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;

        Object.values(fields).forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show success message
            const formContent = form.querySelector('.form-content');
            const successMsg = form.querySelector('.form-success');

            if (formContent) formContent.style.display = 'none';
            if (successMsg) successMsg.classList.add('is-visible');

            // In production, this would submit to a backend
            console.log('Form submitted successfully');
        }
    });
});
