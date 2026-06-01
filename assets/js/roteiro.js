// ── Dark mode ──
(function() {
    const saved = localStorage.getItem('frp-theme');
    const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : sysDark;
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    const t1 = document.getElementById('theme-toggle');
    const t2 = document.getElementById('theme-toggle-mobile');
    const lbl1 = document.getElementById('theme-label');
    const lbl2 = document.getElementById('tab-theme-label');
    if (t1) t1.checked = dark;
    if (t2) t2.checked = dark;
    if (lbl1) lbl1.textContent = dark ? 'Escuro' : 'Claro';
    if (lbl2) lbl2.textContent = dark ? 'Escuro' : 'Claro';

    function applyTheme(d, save) {
        document.body.setAttribute('data-theme', d ? 'dark' : 'light');
        if (t1) t1.checked = d;
        if (t2) t2.checked = d;
        if (lbl1) lbl1.textContent = d ? 'Escuro' : 'Claro';
        if (lbl2) lbl2.textContent = d ? 'Escuro' : 'Claro';
        if (save) localStorage.setItem('frp-theme', d ? 'dark' : 'light');
    }
    if (t1) t1.addEventListener('change', e => applyTheme(e.target.checked, true));
    if (t2) t2.addEventListener('change', e => applyTheme(e.target.checked, true));
})();

// ── Date in header ──
(function() {
    const now = new Date();
    const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const wd = document.getElementById('header-weekday');
    const dn = document.getElementById('header-daynum');
    if (wd) wd.textContent = days[now.getDay()];
    if (dn) dn.textContent = now.getDate();
})();

// ── Stop card hover micro-animation ──
document.querySelectorAll('.stop-card').forEach(card => {
    card.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { scale: 0.97 }, { scale: 1, duration: 0.22, ease: 'back.out(1.5)' });
        }
        const gmaps = card.dataset.gmaps;
        if (gmaps) window.open(gmaps, '_blank');
    });
});

// ── GSAP entrance ──
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('header', { opacity:0, y:-10, duration:0.5, ease:'power3.out' });
    gsap.from('.roteiro-hero', { opacity:0, y:20, duration:0.7, delay:0.2, ease:'power3.out' });
    gsap.from('.roteiro-meta', { opacity:0, y:16, duration:0.6, delay:0.35, ease:'power3.out' });
    gsap.from('.roteiro-intro', { opacity:0, y:12, duration:0.6, delay:0.45, ease:'power3.out' });
    document.querySelectorAll('.stop-card').forEach((card, i) => {
        gsap.from(card, {
            opacity:0, y:14, duration:0.5, ease:'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
            delay: i * 0.04
        });
    });
}
