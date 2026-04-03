/* ============================================
   SERVICES DATA — Populates accordion sections
   on services.html dynamically
   ============================================ */

const SERVICES_DATA = {
    'accordion-managed-it': [
        {
            num: '01', title: 'CRM Solutions', subtitle: 'Customer relationship management',
            desc: 'We implement, customise, and support leading CRM platforms to help you manage customer relationships, streamline sales pipelines, and improve retention.',
            features: ['CRM platform selection & setup', 'Data migration & integration', 'Custom workflow automation', 'User training & adoption', 'Ongoing support & updates']
        },
        {
            num: '02', title: 'Microsoft & Telephony Licenses', subtitle: 'Licensing & communications',
            desc: 'As a Microsoft Partner, we provide the full suite of Microsoft 365, Azure, and Teams licensing along with enterprise telephony solutions.',
            features: ['Microsoft 365 & Azure licensing', 'Teams voice & telephony', 'Licence optimisation & cost savings', 'User provisioning & management', 'Migration from legacy systems']
        },
        {
            num: '03', title: 'Managed IT Services', subtitle: 'Proactive IT management',
            desc: 'Our fully managed IT service gives you a complete IT department without the overhead. We proactively monitor, maintain, and support your entire infrastructure.',
            features: ['24/7 monitoring & alerting', 'Helpdesk & remote support', 'Patch management & updates', 'Backup & disaster recovery', 'Strategic IT roadmapping']
        },
        {
            num: '04', title: 'Call Centre Services', subtitle: 'Communication infrastructure',
            desc: 'We design and deploy complete call centre solutions from software and hardware to networking and telephony.',
            features: ['VoIP & SIP trunk setup', 'Call routing & IVR systems', 'Recording & analytics', 'CRM integration', 'Headsets & hardware']
        },
        {
            num: '05', title: 'Software Support', subtitle: 'Application management',
            desc: 'Expert software support covering installation, configuration, troubleshooting, and training across all major business applications.',
            features: ['Application troubleshooting', 'Software deployment & updates', 'User training & documentation', 'Licence management', 'Third-party vendor liaison']
        }
    ],
    'accordion-cyber': [
        {
            num: '01', title: 'Cyber Security Services', subtitle: 'Threat protection',
            desc: 'Comprehensive cyber security services to protect your organisation from evolving threats. We assess vulnerabilities, implement defences, and provide ongoing monitoring.',
            features: ['Threat assessment & analysis', 'Endpoint protection', 'Email & web security', 'Security awareness training', 'Incident response planning']
        },
        {
            num: '02', title: 'Penetration Testing & Audits', subtitle: 'Vulnerability assessment',
            desc: 'Professional penetration testing to identify weaknesses before attackers do. Our certified testers simulate real-world attacks and deliver actionable reports.',
            features: ['Network penetration testing', 'Web application testing', 'Social engineering assessments', 'Detailed remediation reports', 'Re-testing & verification']
        },
        {
            num: '03', title: 'Disaster Recovery Testing', subtitle: 'Business continuity',
            desc: 'Ensure your business can recover from any disruption. We design, test, and maintain disaster recovery plans that guarantee rapid restoration.',
            features: ['DR plan development', 'Failover testing & simulation', 'RTO/RPO optimisation', 'Backup validation', 'Business continuity consulting']
        },
        {
            num: '04', title: 'ISO Certifications', subtitle: '27001 · 14001 · 9001',
            desc: 'Complete compliance management for ISO 27001 (Information Security), ISO 14001 (Environmental), and ISO 9001 (Quality). We guide you from gap analysis through certification.',
            features: ['Gap analysis & readiness review', 'Policy & procedure development', 'Staff training & awareness', 'Internal audit management', 'Certification body liaison']
        },
        {
            num: '05', title: 'Ongoing Compliance Support', subtitle: 'Continuous governance',
            desc: 'Certification is just the start. We provide ongoing compliance support to ensure you maintain standards and pass surveillance audits.',
            features: ['Ongoing risk assessments', 'Surveillance audit preparation', 'Policy review & updates', 'Compliance dashboards', 'Regulatory change monitoring']
        }
    ],
    'accordion-cloud': [
        {
            num: '01', title: 'Cloud-Based Services & Licensing', subtitle: 'SaaS & IaaS solutions',
            desc: 'We help you migrate to the cloud and leverage the best SaaS, IaaS, and PaaS solutions. From Azure to AWS, we handle architecture, migration, and management.',
            features: ['Cloud strategy & planning', 'Migration & deployment', 'Cloud cost optimisation', 'Hybrid cloud solutions', 'Ongoing cloud management']
        },
        {
            num: '02', title: 'Fleet Management Solutions', subtitle: 'Vehicle & asset tracking',
            desc: 'GPS-based fleet management and asset tracking solutions to optimise routes, reduce fuel costs, and improve driver safety.',
            features: ['GPS tracking & geofencing', 'Route optimisation', 'Driver behaviour monitoring', 'Maintenance scheduling', 'Compliance reporting']
        },
        {
            num: '03', title: 'Custom / Bespoke Solutions', subtitle: 'Tailored to your needs',
            desc: 'When off-the-shelf doesn\'t cut it, we build bespoke solutions tailored to your exact requirements.',
            features: ['Requirements analysis', 'Custom software development', 'System integration', 'Bespoke infrastructure design', 'Ongoing support & iteration']
        }
    ],
    'accordion-infra': [
        {
            num: '01', title: 'Hardware Procurement', subtitle: 'PC · Laptops · Networking · Mobiles',
            desc: 'We source, configure, and deploy hardware for your entire organisation. Everything arrives preconfigured and ready to use.',
            features: ['PCs, laptops & workstations', 'Networking equipment', 'Mobile devices & landlines', 'Pre-configuration & imaging', 'Bulk & scheduled rollouts']
        },
        {
            num: '02', title: 'Boardroom & Meeting Room Solutions', subtitle: 'AV & collaboration',
            desc: 'Transform your meeting spaces with state-of-the-art AV equipment, video conferencing, interactive displays, and room booking systems.',
            features: ['Video conferencing systems', 'Interactive displays & screens', 'Audio & speaker systems', 'Room booking integration', 'Wireless presentation tools']
        },
        {
            num: '03', title: 'Wireless Connectivity', subtitle: 'Rural & broadband alternatives',
            desc: 'High-speed internet where traditional broadband isn\'t available. We deploy 4G/5G, satellite, point-to-point wireless, and mesh networking.',
            features: ['4G/5G fixed wireless solutions', 'Point-to-point links', 'Satellite broadband', 'Wi-Fi mesh networking', 'Site surveys & feasibility']
        },
        {
            num: '04', title: 'Electrical & Engineering Works', subtitle: 'Physical infrastructure',
            desc: 'From structured cabling and server room builds to power distribution. Our qualified engineers handle all physical infrastructure requirements.',
            features: ['Structured cabling (Cat6/Fibre)', 'Server room design & build', 'Power & UPS installation', 'Cable management & containment', 'Electrical testing & certification']
        }
    ],
    'accordion-security': [
        {
            num: '01', title: 'CCTV Camera Systems', subtitle: 'Surveillance & monitoring',
            desc: 'Professional CCTV installation, from single-camera setups to multi-site enterprise systems. HD and 4K cameras with remote viewing and analytics.',
            features: ['HD & 4K camera systems', 'Remote viewing & mobile apps', 'Motion detection & alerts', 'NVR/DVR storage solutions', 'Maintenance contracts']
        },
        {
            num: '02', title: 'Fire & Safety Equipment', subtitle: 'Fire protection systems',
            desc: 'Complete fire safety solutions including alarm systems, suppression equipment, emergency lighting, and signage. Full UK fire safety compliance.',
            features: ['Fire alarm installation', 'Suppression systems', 'Emergency lighting', 'Fire risk assessments', 'Annual testing & compliance']
        },
        {
            num: '03', title: 'Access Control Systems', subtitle: 'Entry management',
            desc: 'Secure your premises with modern access control — key card, biometric, and smart lock systems with full audit trails.',
            features: ['Key card & fob systems', 'Biometric readers', 'Intercom & video entry', 'Visitor management', 'Audit & reporting']
        }
    ],
    'accordion-repair': [
        {
            num: '01', title: 'Mobile, TV & Electronics Repair', subtitle: 'Device repair services',
            desc: 'Professional repair services for mobile phones, tablets, TVs, and business electronics. Fast turnaround with genuine parts.',
            features: ['Screen & battery replacement', 'Water damage recovery', 'TV & display repairs', 'Data recovery services', 'Bulk repair contracts']
        },
        {
            num: '02', title: 'Maintenance Contracts', subtitle: 'Preventative care',
            desc: 'Proactive maintenance contracts to extend equipment life and prevent costly downtime. Scheduled servicing with priority support.',
            features: ['Scheduled preventative maintenance', 'Priority repair response', 'Equipment health monitoring', 'Replacement parts included', 'Annual equipment reviews']
        },
        {
            num: '03', title: 'Hardware Lifecycle Management', subtitle: 'End-to-end device management',
            desc: 'Manage your hardware from procurement to secure disposal. Warranty tracking, refresh cycles, and compliant WEEE disposal.',
            features: ['Asset tracking & inventory', 'Warranty management', 'Refresh cycle planning', 'Secure data destruction', 'WEEE compliant disposal']
        }
    ]
};

// Render accordions from data
document.addEventListener('DOMContentLoaded', () => {
    Object.entries(SERVICES_DATA).forEach(([containerId, services]) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        services.forEach(service => {
            const item = document.createElement('div');
            item.className = 'accordion__item';
            item.innerHTML = `
                <button class="accordion__trigger">
                    <div class="accordion__trigger-content">
                        <span class="accordion__num">${service.num}</span>
                        <span class="accordion__title">${service.title}</span>
                        <span class="accordion__subtitle">${service.subtitle}</span>
                    </div>
                    <i data-lucide="plus" class="accordion__icon"></i>
                </button>
                <div class="accordion__body">
                    <div class="accordion__body-inner">
                        <div class="service-desc">
                            <p>${service.desc}</p>
                        </div>
                        <div class="service-features">
                            <ul>
                                ${service.features.map(f => `<li><i data-lucide="check"></i> ${f}</li>`).join('')}
                            </ul>
                            <a href="contact.html" class="btn btn--secondary btn--sm">Get a Quote</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    });

    // Re-init icons after dynamic content
    if (window.lucide) lucide.createIcons();

    // Re-init accordions for dynamically added items
    document.querySelectorAll('.accordion').forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion__item');
        items.forEach(item => {
            const trigger = item.querySelector('.accordion__trigger');
            const body = item.querySelector('.accordion__body');
            if (!trigger || !body) return;

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');
                items.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('is-open');
                        const ob = other.querySelector('.accordion__body');
                        if (ob) ob.style.maxHeight = null;
                    }
                });
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
