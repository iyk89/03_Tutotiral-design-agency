// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize background blobs
    const blobs = document.querySelectorAll('.gradient-blob');
    blobs.forEach((blob, index) => {
        blob.style.left = `${Math.random() * 100}vw`;
        blob.style.top = `${Math.random() * 100}vh`;
        
        anime({
            targets: blob,
            translateX: () => anime.random(-200, 200),
            translateY: () => anime.random(-200, 200),
            scale: () => anime.random(0.8, 1.2),
            duration: () => anime.random(3000, 5000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    });

    // Split text for animation
    const gradientText = document.querySelector('.gradient-text');
    gradientText.innerHTML = gradientText.textContent.split(' ').map(word => 
        `<span class="letter-animation">${word}</span>`
    ).join(' ');

    // Animate logo letters
    const logoText = document.querySelector('.ml-letters');
    logoText.innerHTML = logoText.textContent.split('').map(letter => 
        `<span class="letter">${letter}</span>`
    ).join('');

    // Initial animation timeline
    const timeline = anime.timeline({
        easing: 'easeOutExpo'
    });

    // Add animations to timeline
    timeline
        .add({
            targets: '.logo-icon',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 800
        })
        .add({
            targets: '.ml-letters .letter',
            translateY: [-30, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(50)
        }, '-=400')
        .add({
            targets: '.nav-links a, .social-links a, .btn-signin, .btn-signup',
            translateY: [10, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(100)
        }, '-=600')
        .add({
            targets: '.animated-heart',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1200
        }, '-=400')
        .add({
            targets: '.letter-animation',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(100)
        }, '-=800')
        .add({
            targets: '.subtitle',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=600')
        .add({
            targets: '.prompt-box',
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 800
        }, '-=600')
        .add({
            targets: '.action-pill',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(100)
        }, '-=600');

    // Continuous heart animation
    anime({
        targets: '.animated-heart',
        scale: [1, 1.1],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
    });

    // Gradient text animation
    let hue = 0;
    function animateGradient() {
        hue = (hue + 1) % 360;
        gradientText.style.background = `linear-gradient(45deg, 
            hsl(${hue}, 100%, 70%),
            hsl(${(hue + 60) % 360}, 100%, 70%),
            hsl(${(hue + 120) % 360}, 100%, 70%)
        )`;
        gradientText.style.webkitBackgroundClip = 'text';
        gradientText.style.backgroundClip = 'text';
        requestAnimationFrame(animateGradient);
    }
    animateGradient();

    // Prompt box interactions
    const promptBox = document.querySelector('.prompt-box');
    const promptInput = promptBox.querySelector('input');

    promptInput.addEventListener('focus', () => {
        anime({
            targets: promptBox,
            scale: 1.02,
            boxShadow: '0 0 30px rgba(0, 198, 255, 0.2)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    promptInput.addEventListener('blur', () => {
        anime({
            targets: promptBox,
            scale: 1,
            boxShadow: '0 0 0 rgba(0, 198, 255, 0)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    // Parallax effect for the hero section
    document.addEventListener('mousemove', (e) => {
        const heart = document.querySelector('.animated-heart');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        anime({
            targets: heart,
            translateX: xAxis,
            translateY: yAxis,
            duration: 400,
            easing: 'easeOutQuad'
        });
    });

    // Mobile App Animation
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Web Interface Animation
    const animatedElements = document.querySelectorAll('.animated-element');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });

    // Micro-interactions Demo
    const demoButton = document.querySelector('.demo-button');
    const notificationBadge = document.querySelector('.notification-badge');
    
    demoButton.addEventListener('click', () => {
        demoButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            demoButton.style.transform = 'translateY(-2px)';
        }, 200);

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        demoButton.appendChild(ripple);
        
        const rect = demoButton.getBoundingClientRect();
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });

    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.showcase-item').forEach(item => {
        observer.observe(item);
    });
});

// Add these styles to your CSS
const styles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.7);
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .showcase-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .showcase-item.in-view {
        opacity: 1;
        transform: translateY(0);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 