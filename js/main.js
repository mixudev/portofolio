// Load komponen saat build: gunakan import.meta.glob agar Vite
// menyertakan file HTML komponen ke dalam output build.
const componentsMap = import.meta.glob('../components/*.html', { query: '?raw', import: 'default', eager: true });

function getComponentHtml(componentName) {
    const key = `../components/${componentName}.html`;
    return componentsMap[key] || null;
}

async function loadComponent(componentName, targetId) {
    try {
        // Coba ambil dari map yang sudah di-bundle
        const html = getComponentHtml(componentName);
        if (html !== null) {
            document.getElementById(targetId).innerHTML = html;
            return;
        }

        // Fallback ke fetch (mis. saat struktur file berbeda)
        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedHtml = await response.text();
        document.getElementById(targetId).innerHTML = fetchedHtml;
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
}

// Load semua components saat halaman dimuat
document.addEventListener('DOMContentLoaded', async function() {
    // Load components secara berurutan
    await loadComponent('navbar', 'navbar-component');
    await loadComponent('hero', 'hero-component');
    await loadComponent('about', 'about-component');
    await loadComponent('skills', 'skills-component');
    await loadComponent('projects', 'projects-component');
    await loadComponent('contact', 'contact-component');
    await loadComponent('footer', 'footer-component');
    
    // Setelah semua component dimuat, jalankan fungsi init jika ada
    initializeComponents();
});

// Fungsi untuk inisialisasi setelah components dimuat
function initializeComponents() {
        
        let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuItems = document.querySelectorAll('.menu-item');

        // Scroll animation
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.classList.add('nav-hidden');
                navbar.classList.remove('nav-visible');
            } else {
                // Scrolling up
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('nav-visible');
            }
            
            lastScrollTop = scrollTop;
        });

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
        });

        // Active menu item on scroll
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });

    console.log('✅ Semua components berhasil dimuat dan diinisialisasi!');
}