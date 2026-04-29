console.log('%c Built by Antonio G. Artero ', 'background: #111; color: #fff; padding: 6px 12px; font-size: 12px; letter-spacing: 2px;');
console.log('%c https://www.linkedin.com/in/antoniogartero ', 'color: #999; font-size: 11px; letter-spacing: 1px;');

// ===============================
// LOGO + NAV SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"], #logo-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.id === 'logo-link') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});



// ===============================
// PARALLAX ENGINE (UNCHANGED EFFECT)
// ===============================
let ticking = false;

function updateParallax() {
    const images = document.querySelectorAll(".comparison-box img");

    const windowHeight = window.innerHeight;

    images.forEach(img => {
        const rect = img.getBoundingClientRect();

        if (rect.top < windowHeight && rect.bottom > 0) {
            const shift = (rect.top - windowHeight / 2) * 0.1;
            img.style.transform = `translateY(${shift}px)`;
        }
    });

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

window.addEventListener("load", updateParallax);

// ===============================
// SCROLL BREATHING SYSTEM
// ===============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => observer.observe(section));

// ===============================
// SLIDER REVEAL
// ===============================
document.querySelectorAll('.slider-reveal').forEach(slider => {
    let dragging = false;

    function setPosition(x) {
        const rect = slider.getBoundingClientRect();
        let pct = ((x - rect.left) / rect.width) * 100;
        pct = Math.min(Math.max(pct, 2), 98);

        slider.querySelector('.slider-before').style.clipPath = 
            `inset(0 ${100 - pct}% 0 0)`;
        slider.querySelector('.slider-handle').style.left = `${pct}%`;
    }

    // Mouse
    slider.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); });
    window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);

    // Touch
    slider.addEventListener('touchstart', e => { dragging = true; setPosition(e.touches[0].clientX); });
    window.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); });
    window.addEventListener('touchend', () => dragging = false);
});