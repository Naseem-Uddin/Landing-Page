document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const images = Array.from(carousel.children);
    let currentIndex = 0;

    function updateSlides() {
        images.forEach((img, i) => {
            if (i === currentIndex) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlides();
    }

    // Auto-rotate carousel
    let autoRotateInterval;
    
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    }
    
    // Start auto-rotate and stop on hover
    startAutoRotate();
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);

    // Initialize first slide
    updateSlides();
    
    // Add entrance animation
    setTimeout(() => {
        carousel.style.opacity = '1';
    }, 100);
});

// Additional animation utilities
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Smooth reveal animations for content sections
function revealContent() {
    const sections = document.querySelectorAll('.content-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Initialize content reveal
document.addEventListener('DOMContentLoaded', revealContent);

