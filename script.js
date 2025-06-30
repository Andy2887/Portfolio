// ===========================================
// INTRO ANIMATION CONTROLLER
// ===========================================

// Intro animation sequence
document.addEventListener('DOMContentLoaded', function() {
    const introOverlay = document.getElementById('introOverlay');
    const introText = document.getElementById('introText');
    const body = document.body;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if intro has already been shown in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    // Skip intro if user prefers reduced motion or has already seen it
    if (prefersReducedMotion || hasSeenIntro) {
        introOverlay.style.display = 'none';
        body.classList.remove('intro-active');
        return;
    }
    
    // Prevent scrolling during intro
    body.classList.add('intro-active');
    
    // Start the animation sequence
    function startIntroAnimation() {
        // Step 1: Text animation is handled by CSS animation (4 seconds)
        // Step 2: After 3.5 seconds, start fading out the background
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
        }, 3500);
        
        // Step 3: After 4.5 seconds, remove the overlay completely and restore scroll
        setTimeout(() => {
            introOverlay.style.display = 'none';
            body.classList.remove('intro-active');
            // Mark intro as seen for this session
            sessionStorage.setItem('hasSeenIntro', 'true');
        }, 4500);
    }
    
    // Start the animation immediately when page loads
    startIntroAnimation();
});

// ===========================================
// NAVIGATION FUNCTIONALITY
// ===========================================

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Scroll animations and modern interactions
document.addEventListener('DOMContentLoaded', function() {
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0ea5e9, #14b8a6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // // Intersection Observer for scroll animations
    // const observerOptions = {
    //     threshold: 0.1,
    //     rootMargin: '0px 0px -50px 0px'
    // };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.style.opacity = '1';
    //             entry.target.style.transform = 'translateY(0)';
    //         }
    //     });
    // }, observerOptions);

    // // Add scroll animations to elements
    // const animatedElements = document.querySelectorAll('.experience-card, .project-item, .about-text, .skill-item');
    // animatedElements.forEach((el, index) => {
    //     el.style.opacity = '0';
    //     el.style.transform = 'translateY(30px)';
    //     el.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
    //     observer.observe(el);
    // });

    // Typewriter effect for profile text
    const typewriterElement = document.querySelector('.profile_text_h1');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        typewriterElement.style.borderRight = '3px solid #0ea5e9';
        typewriterElement.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            typewriterElement.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                    typewriterElement.style.animation = 'none';
                }, 1000);
            }
        }, 100);
    }


    // Smooth scrolling for navigation links
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

    // Dynamic navbar styling on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    
    @keyframes blink {
        0%, 50% { border-color: #0ea5e9; }
        51%, 100% { border-color: transparent; }
    }
    
    .experience-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .skill-item {
        transition: all 0.3s ease;
        cursor: default;
    }
    
`;
document.head.appendChild(style);