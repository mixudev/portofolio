// Load komponen saat build: gunakan import.meta.glob agar Vite
// menyertakan file HTML komponen ke dalam output build.
const componentsMap = import.meta.glob('../components/*.html', { as: 'raw', eager: true });

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
    await loadComponent('header', 'header-component');
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
    // Smooth scroll untuk navigasi
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile menu toggle (jika ada)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Form submission handler
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form berhasil dikirim! (Ini adalah demo)');
            this.reset();
        });
    }

    console.log('✅ Semua components berhasil dimuat dan diinisialisasi!');
}