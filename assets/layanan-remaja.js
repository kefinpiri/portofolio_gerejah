// ===================================
// LAYANAN REMAJA - JAVASCRIPT
// ===================================

console.log('📱 Layanan Remaja page loaded');

// ===== SETUP COMPONENTS (Navbar & Footer embedded in HTML) =====
function loadComponents() {
    // Navbar and Footer are now embedded directly in HTML
    // Just initialize their functionality
    setupHamburgerMenu();
    setActiveMenu();
}

// ===== HAMBURGER MENU SETUP =====
function setupHamburgerMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const dropBtn = document.getElementById('drop-btn');
    const dropMenu = document.getElementById('drop-menu');
    const dropIcon = document.getElementById('drop-icon');

    if (menuBtn && menu) {
        menuBtn.onclick = () => {
            menu.classList.toggle('hidden');
            menuBtn.classList.toggle('active');
        };
    }

    if (dropBtn && dropMenu) {
        dropBtn.onclick = () => {
            dropMenu.classList.toggle('hidden');
            dropIcon.classList.toggle('rotate-180');
        };
    }
}

// ===== SET ACTIVE MENU =====
function setActiveMenu() {
    const navLinks = document.querySelectorAll('nav a[href]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();

        // Highlight Remaja link
        if ((href === 'layanan-remaja.html' || href === 'remaja.html') &&
            (currentPage === 'layanan-remaja.html' || currentPage === 'remaja.html')) {
            link.classList.add('menu-active');
            link.style.backgroundColor = 'rgba(201, 168, 118, 0.3)';
        }
        // Highlight Pelayanan > Remaja dropdown
        else if (currentPage === 'layanan-remaja.html' && href === 'pelayanan.html#remaja') {
            link.classList.add('border-l-amber-500');
            link.style.borderLeft = '4px solid #f59e0b';
            link.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.program-card, .mentor-card, .benefit-item').forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(elem);
    });
}

// ===== SMOOTH SCROLL ANCHOR LINKS =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== COUNT ANIMATE (untuk stats jika ada) =====
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// ===== CARD HOVER EFFECTS =====
function setupCardHovers() {
    const cards = document.querySelectorAll('.program-card, .mentor-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ===== BUTTON RIPPLE EFFECT =====
function setupButtonRipples() {
    const buttons = document.querySelectorAll('a[href="kontak.html"], a[href="index.html"]');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== HERO FADE IN =====
function setupHeroAnimation() {
    const heroText = document.querySelector('.hero-remaja');
    if (heroText) {
        // Hero already visible by CSS
        const element = heroText.querySelector('div');
        if (element) {
            element.style.animation = 'fadeUp 1s ease-out forwards';
        }
    }
}

// ===== HANDLE PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    setupHeroAnimation();
    setTimeout(() => {
        setupScrollAnimations();
        setActiveMenu();
    }, 500);
    setupSmoothScroll();
    setupCardHovers();
    setupButtonRipples();
    animateCounters();
});

// ===== HANDLE WINDOW RESIZE =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const menu = document.getElementById('menu');
        if (menu) {
            menu.classList.add('hidden');
            const menuBtn = document.getElementById('menu-btn');
            if (menuBtn) menuBtn.classList.remove('active');
        }
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close menu on Escape key
    if (e.key === 'Escape') {
        const menu = document.getElementById('menu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            const menuBtn = document.getElementById('menu-btn');
            if (menuBtn) menuBtn.classList.remove('active');
        }
    }
});

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✅ Layanan Remaja JS - All functions initialized');
