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
            img.style.transform = `translateY(${shift}px) scale(1.1)`;
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