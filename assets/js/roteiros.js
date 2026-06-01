
        gsap.registerPlugin(ScrollTrigger);

        // Data no header
        (function(){
            const now = new Date();
            const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
            document.getElementById('header-weekday').textContent = days[now.getDay()];
            document.getElementById('header-daynum').textContent = now.getDate();
            const opts = { weekday: 'long', day: 'numeric', month: 'long' };
            document.getElementById('current-date').textContent =
                now.toLocaleDateString('pt-BR', opts).toUpperCase();
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

        // Image lazy load
        document.querySelectorAll('[data-img]').forEach(el => {
            const src = el.getAttribute('data-img');
            const img = new Image();
            img.onload = () => { el.style.backgroundImage = `url('${src}')`; };
            img.src = src;
        });

        // Auto-scroll + dots
        function setupAutoScroll(rowId, dotsId) {
            const row = document.getElementById(rowId);
            const dotsContainer = document.getElementById(dotsId);
            if (!row) return;
            const cards = Array.from(row.children);
            const total = cards.length;
            if (total === 0) return;

            if (dotsContainer) {
                cards.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
                    dot.addEventListener('click', () => { clearInterval(timer); goTo(i); resumeTimer(); });
                    dotsContainer.appendChild(dot);
                });
            }

            const dots = dotsContainer ? dotsContainer.querySelectorAll('.scroll-dot') : [];
            let current = 0, isPaused = false, resumeTimeout;

            function updateDots(idx) { dots.forEach((d,i) => d.classList.toggle('active', i === idx)); }
            function getCardWidth() {
                if (!cards[0]) return 0;
                return cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(row).gap) || 16);
            }
            function goTo(idx) {
                current = Math.max(0, Math.min(idx, total - 1));
                row.scrollTo({ left: current * getCardWidth(), behavior: 'smooth' });
                updateDots(current);
            }
            function advance() { if (!isPaused) goTo((current + 1) % total); }
            let timer = setInterval(advance, 3500);
            function pauseTimer() { isPaused = true; clearTimeout(resumeTimeout); }
            function resumeTimer() { resumeTimeout = setTimeout(() => { isPaused = false; }, 5000); }

            row.addEventListener('touchstart', pauseTimer, { passive: true });
            row.addEventListener('mousedown', pauseTimer);
            row.addEventListener('touchend', resumeTimer, { passive: true });
            row.addEventListener('mouseup', resumeTimer);
            row.addEventListener('scroll', () => {
                const cw = getCardWidth();
                if (cw > 0) { const idx = Math.round(row.scrollLeft / cw); if (idx !== current) { current = idx; updateDots(current); } }
            }, { passive: true });
            updateDots(0);
        }

        setupAutoScroll('row-1', 'dots-1');
        setupAutoScroll('row-2', 'dots-2');
        setupAutoScroll('row-4', 'dots-4');

        // GSAP
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to('#main-header', { opacity: 1, y: 0, duration: 0.55 })
          .to('#page-header', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

        ['#sec-1','#sec-2','#sec-3','#sec-4'].forEach(id => {
            gsap.to(id, {
                opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: id, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });
        gsap.to('#cta-banner', {
            opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: '#cta-banner', start: 'top 90%', toggleActions: 'play none none none' }
        });

        // Nav hover
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.addEventListener('mouseenter', () => gsap.to(link, { y: -1, duration: 0.12 }));
            link.addEventListener('mouseleave', () => gsap.to(link, { y: 0, duration: 0.12 }));
        });

        // Card click micro-animation
        document.querySelectorAll('.card-hero, .card-wide, .card-list-item, .card-grid').forEach(card => {
            card.addEventListener('click', () => {
                gsap.fromTo(card, { scale: 0.97 }, { scale: 1, duration: 0.25, ease: 'back.out(1.5)' });
            });
        });
    