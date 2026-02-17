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

// ===== SHOW TAB BY ID =====
function showTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');

    // Hide all tabs
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });

    // Show target tab
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.remove('hidden');

        // Smooth scroll to content
        setTimeout(() => {
            targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// ===== TAB SWITCHING FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Show target tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }

            // Smooth scroll to content
            setTimeout(() => {
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });

    // ===== HANDLE HASH URL (e.g., #remaja) =====
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove #

        if (hash && (hash === 'sekolah-minggu' || hash === 'remaja' || hash === 'pemuda' || hash === 'diakonia')) {
            showTab(hash);
        } else if (tabButtons.length > 0) {
            // Set first tab as active by default
            tabButtons[0].classList.add('active');
            showTab('sekolah-minggu');
        }
    }

    // Handle hash on page load
    handleHashChange();

    // Handle hash changes (back/forward button)
    window.addEventListener('hashchange', handleHashChange);

    // Set first tab as active by default if no hash
    if (!window.location.hash && tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('btn-scroll-hero');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        const heroSection = document.getElementById('hero-pelayanan');
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===== LOAD COMPONENTS =====
fetch('components/navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
        setupHamburgerMenu();
    });

fetch('components/footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);

