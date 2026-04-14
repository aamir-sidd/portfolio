// Theme Toggling Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    htmlElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Typewriter Animation Core
async function typeWriter(element, text, speed = 60) {
    element.classList.add('typing-cursor');
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    // Small pause then remove cursor
    await new Promise(resolve => setTimeout(resolve, 1000));
    element.classList.remove('typing-cursor');
}

// Hero Animation (Name only)
async function initHeroAnimation() {
    const h1 = document.querySelector('.hero h1');
    if (!h1) return;

    const nameText = h1.innerText;
    h1.innerText = ''; // Clear initially
    await typeWriter(h1, nameText, 70);
    
    // Smoothly reveal the rest of the hero
    document.querySelector('.hero .cta-group').classList.add('visible');
}

// Section Title Observer
function initSectionAnimations() {
    const titles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                if (!title.dataset.animated) {
                    title.dataset.animated = "true";
                    const originalText = title.innerText;
                    typeWriter(title, originalText, 50);
                }
            }
        });
    }, { threshold: 0.1 });

    titles.forEach(title => observer.observe(title));
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initSectionAnimations();
});
