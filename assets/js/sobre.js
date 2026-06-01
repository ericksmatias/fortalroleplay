
        gsap.registerPlugin(ScrollTrigger);

        // Data no header
        (function(){
            const now = new Date();
            const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
            document.getElementById('header-weekday').textContent = days[now.getDay()];
            document.getElementById('header-daynum').textContent = now.getDate();
        })();

        // Dark mode
        const toggle = document.getElementById('theme-toggle');
        const toggleMobile = document.getElementById('theme-toggle-mobile');
        const tabThemeLabel = document.getElementById('tab-theme-label');
        const themeLabel = document.getElementById('theme-label');

        function applyTheme(dark, save) {
            document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
            toggle.checked = dark;
            if (toggleMobile) toggleMobile.checked = dark;
            if (tabThemeLabel) tabThemeLabel.textContent = dark ? 'Escuro' : 'Claro';
            if (themeLabel) themeLabel.textContent = dark ? 'Escuro' : 'Claro';
            if (save) localStorage.setItem('frp-theme', dark ? 'dark' : 'light');
        }
        toggle.addEventListener('change', e => applyTheme(e.target.checked, true));
        if (toggleMobile) toggleMobile.addEventListener('change', e => applyTheme(e.target.checked, true));
        const savedTheme = localStorage.getItem('frp-theme');
        const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme ? savedTheme === 'dark' : sysDark, false);

        // GSAP
        const isMobile = window.innerWidth <= 768;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (isMobile) {
            tl.to('#main-header', { opacity: 1, y: 0, duration: 0.55 });
            gsap.set('#sidebar', { opacity: 1, x: 0, clearProps: 'transform' });
            gsap.set('#content-wrapper', { opacity: 1, clearProps: 'opacity' });
        } else {
            tl.to('#main-header', { opacity: 1, y: 0, duration: 0.55 })
              .to('#sidebar', { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
              .to('#content-wrapper', { opacity: 1, duration: 0.5 }, '-=0.3');
        }

        document.querySelectorAll('.doc-section').forEach(section => {
            gsap.to(section, {
                opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    scroller: '#content-wrapper',
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Nav scroll spy
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.doc-section');
        const wrapper = document.getElementById('content-wrapper');

        function setActiveLink(id) {
            navLinks.forEach(link => {
                const isActive = link.dataset.target === id;
                link.classList.toggle('active', isActive);
                if (isActive && isMobile) {
                    link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = document.getElementById(link.dataset.target);
                if (target) {
                    wrapper.scrollTo({ top: target.offsetTop - 32, behavior: 'smooth' });
                    setActiveLink(link.dataset.target);
                }
            });
        });

        wrapper.addEventListener('scroll', () => {
            let current = sections[0].id;
            sections.forEach(section => {
                if (wrapper.scrollTop + 120 >= section.offsetTop) current = section.id;
            });
            setActiveLink(current);
        }, { passive: true });

        // Nav hover
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.addEventListener('mouseenter', () => gsap.to(link, { y: -1, duration: 0.12 }));
            link.addEventListener('mouseleave', () => gsap.to(link, { y: 0, duration: 0.12 }));
        });

        // Contact card hover
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.02, duration: 0.18, ease: 'power2.out' }));
            card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.18 }));
        });
    