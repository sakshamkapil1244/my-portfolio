document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const mainNav = document.getElementById('mainNav');
    const logoNav = document.querySelector('.logo-nav-logic');
    const scrollTopBtn = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mailForm = document.getElementById('mailForm'); // Form element

    // 2. COMBINED SCROLL LOGIC
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const isHidden = currentScrollY > 80;

        mainNav.classList.toggle('nav-hidden', isHidden);
        logoNav?.classList.toggle('nav-hidden', isHidden);
        scrollTopBtn?.classList.toggle('show', currentScrollY > 400);

        const scrollPos = currentScrollY + 300;
        sections.forEach(section => {
            const id = section.getAttribute('id');
            const offset = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= offset && scrollPos < offset + height) {
                document.body.classList.remove('bg-home', 'bg-about', 'bg-skills');
                if (['home', 'about', 'skills'].includes(id)) {
                    document.body.classList.add('bg-' + id);
                }
            }
        });
    }, { passive: true });

    // 3. EMAIL JS LOGIC (Adding this back for you)
    if (mailForm) {
        mailForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Sending...";
            btn.disabled = true;


            emailjs.sendForm('service_h9l36ei', 'template_qhwbdo7', this)
                .then(() => {
                    alert('Success! Saksham will get back to you soon.');
                    this.reset();
                })
                .catch((err) => {
                    alert('Oops! Kuch galat ho gaya. Please try again.');
                    console.error(err);
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }

    // 4. TYPING EFFECT
    if (document.getElementById('typing-text')) {
        new Typed('#typing-text', {
            strings: [
                'B.Tech Final Year Student','Full Stack Developer', 'Java Specialist', 'DSA Problem Solver', 'Software Engineer'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 1500  // last ka time
        });
    }

    // 5. THEME TOGGLE
    themeToggle?.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
        }
    });

    // 6. SCROLL REVEAL & OTHER LOGIC
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .skill-card, .project-card').forEach(el => observer.observe(el));

    scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// --- STARFIELD LOGIC ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 400 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
    }));
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawStars();
// 7. TOUCH SUPPORT FOR MOBILE (Hover alternative)
document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        // Kisi aur card se active class hatana (optional)
        document.querySelectorAll('.skill-card, .project-card').forEach(c => c.classList.remove('active-touch'));
        // Current card ko highlight karna
        this.classList.add('active-touch');
    });
});