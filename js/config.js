/* ============================================
   SITE CONFIGURATION
   Edit company details here — changes apply 
   site-wide via JavaScript injection.
   ============================================ */

const SITE_CONFIG = {
    // Company
    companyName: 'NexusTech',
    companyNameAccent: 'Solutions',
    companyTagline: 'Complete IT Solutions. Engineered for Your Business.',
    companyDescription: 'We deliver end-to-end IT solutions including managed services, cyber security, compliance, cloud infrastructure, and physical security for businesses of all sizes.',

    // Contact (Placeholders — replace with real details)
    phone: '+44 (0)20 7946 0958',
    phoneDisplay: '+44 (0)20 7946 0958',
    email: 'info@nexutechsolutions.co.uk',
    emailSupport: 'support@nexutechsolutions.co.uk',
    address: {
        line1: '123 Technology Park',
        line2: 'Innovation Drive',
        city: 'London',
        postcode: 'EC2A 4NE',
        country: 'United Kingdom'
    },

    // Business Hours
    hours: {
        weekday: 'Mon – Fri: 8:00 AM – 6:00 PM',
        weekend: 'Sat: 9:00 AM – 1:00 PM',
        emergency: '24/7 Emergency Support Available'
    },

    // Social Media (Placeholders)
    social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#',
    },

    // Stats  
    stats: {
        clients: 200,
        years: 15,
        uptime: 99.9,
        support: '24/7',
        projects: 500
    },

    // Copyright
    copyrightYear: new Date().getFullYear(),
};

// Make config available globally
window.SITE_CONFIG = SITE_CONFIG;
