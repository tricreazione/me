/**
 * triCreazione - Main JavaScript
 */

// Mark document as JS-enabled for progressive enhancement CSS
document.documentElement.classList.add('js');

class TriCreazione {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupPageLoad();
        this.setupParallax();
        this.setupCounterAnimation();
        // Initial update for navbar
        this.updateActiveNavLink();
    }

    setupPageLoad() {
        // Smooth fade-in animation on page load
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    }

    setupParallax() {
        // Parallax effect for hero circles
        const circles = document.querySelectorAll('.hero-circles .circle');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            circles.forEach((circle, index) => {
                const speed = 0.3 + (index * 0.1); // Different speeds for each circle
                const yPos = -(scrolled * speed);
                circle.style.transform = `translateY(calc(-50% + ${yPos}px))`;
            });
        });
    }

    setupCounterAnimation() {
        // Counter animation for stat numbers
        const statNumbers = document.querySelectorAll('.stat-number');
        const animatedCounters = new Set();

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
                    animatedCounters.add(entry.target);
                    this.animateCounter(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.match(/\d+/)[0]);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16); // ~60fps
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    setupScrollEffects() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            this.updateActiveNavLink();
        });

        // Scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');
        
        // Get scroll position with offset for navbar
        const scrollPosition = window.scrollY + 250;

        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        // If we're at the top of the page, activate home
        if (window.scrollY < 100) {
            currentSection = 'home';
        }

        // Update navbar data attribute for gradient bar
        if (navbar && currentSection) {
            navbar.setAttribute('data-active', currentSection);
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.triCreazione = new TriCreazione();
});
