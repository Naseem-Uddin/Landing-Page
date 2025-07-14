document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const images = Array.from(carousel.children);
    let currentIndex = 1; // middle image is center by default
    let isAnimating = false;

    function updateClasses() {
        if (isAnimating) return;
        
        images.forEach((img, i) => {
            img.className = 'slide'; // reset class

            if (i === currentIndex) {
                img.classList.add('center');
            } 
            else if (i === (currentIndex - 1 + images.length) % images.length) {
                img.classList.add('left');
            } 
            else if (i === (currentIndex + 1) % images.length) {
                img.classList.add('right');
            }
            else {
                img.classList.add('hidden');
            }
        });
    }

    function rotate(direction) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        if (direction === 'left') {
            currentIndex = (currentIndex + 1) % images.length;
        } 
        else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        updateClasses();
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    // Click handlers for carousel navigation
    carousel.addEventListener('click', (e) => {
        if (e.target.classList.contains('left')) {
            rotate('right');
        } 
        else if (e.target.classList.contains('right')) {
            rotate('left');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            rotate('right');
        } else if (e.key === 'ArrowRight') {
            rotate('left');
        }
    });

    // Auto-rotate carousel
    let autoRotateInterval;
    
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            rotate('left');
        }, 5000); // Rotate every 5 seconds
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

    // Initialize positions
    updateClasses();
    
    // Add entrance animation
    setTimeout(() => {
        carousel.style.opacity = '1';
        carousel.style.transform = 'translateY(0)';
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

