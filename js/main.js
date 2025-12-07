const componentsMap = import.meta.glob('../components/*.html', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
});

const componentsList = [
    'navbar',
    'hero',
    'about',
    'skills',
    'projects',
    'contact',
    'footer'
];

function getComponentHtml(componentName) {
    const key = `../components/${componentName}.html`;
    return componentsMap[key] || null;
}

async function loadComponent(componentName) {
    try {
        const html = getComponentHtml(componentName);
        if (html !== null) {
            return html;
        }

        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
        return '';
    }
}

async function loadAllComponents() {
    const app = document.getElementById('app');
    let allHtml = '';

    for (const componentName of componentsList) {
        const html = await loadComponent(componentName);
        allHtml += html;
    }

    app.innerHTML = allHtml;
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadAllComponents();
    initializeComponents();
});

function initializeComponents() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuItems = document.querySelectorAll('.menu-item');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-visible');
        } else {
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-visible');
        }
        
        lastScrollTop = scrollTop;
    });

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
    });

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

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    console.log('Done!');
}