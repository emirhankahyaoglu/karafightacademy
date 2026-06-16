// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking overlay
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown parent
        if (!link.nextElementSibling || !link.nextElementSibling.classList.contains('dropdown')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Mobile dropdown toggle - handle arrow clicks and parent links
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = link.parentElement;
            
            // Close other dropdowns
            document.querySelectorAll('.has-dropdown').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('dropdown-active');
                    const otherArrow = item.querySelector('.dropdown-icon');
                    if (otherArrow) {
                        otherArrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current dropdown
            parent.classList.toggle('dropdown-active');
            
            // Rotate arrow icon
            const arrow = link.querySelector('.dropdown-icon');
            if (arrow) {
                arrow.style.transform = parent.classList.contains('dropdown-active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }
    });
});

// Custom Scrollbar Animation
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollGlove = document.querySelector('.scroll-glove');
    if (scrollGlove) {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const rotation = scrollPercentage * 360;
        
        // Smooth rotation based on scroll direction
        if (window.scrollY > lastScrollY) {
            // Scrolling down
            scrollGlove.style.transform = `rotate(${rotation}deg) scale(${1 + scrollPercentage * 0.2})`;
        } else {
            // Scrolling up
            scrollGlove.style.transform = `rotate(${rotation}deg) scale(${1 + scrollPercentage * 0.2})`;
        }
        
        lastScrollY = window.scrollY;
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        contactForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .program-card, .trainer-card, .branch-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    target.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, 30);
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Auto-update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Burak Fight Akademi. Tüm hakları saklıdır.`;
    }
});
