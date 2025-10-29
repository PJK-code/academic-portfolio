// Academic Portfolio JavaScript
// Enhanced functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initSidebarToggle();
    initProjectCards();
    initContactForm();
    initTypingEffect();
    initActiveNavigation();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile sidebar if open
                const sidebar = document.getElementById('sidebar');
                const mobileOverlay = document.getElementById('mobileOverlay');
                if (sidebar && sidebar.classList.contains('show')) {
                    sidebar.classList.remove('show');
                    mobileOverlay.classList.remove('show');
                }
                
                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.project-card, .contact-content, .section-title, .section-subtitle');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Sidebar toggle functionality
function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (sidebarToggle && sidebar && mobileOverlay) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            mobileOverlay.classList.toggle('show');
        });
        
        mobileOverlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            mobileOverlay.classList.remove('show');
        });
    }
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNavigation(targetId) {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Enhanced project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect with scale
        card.classList.add('scale-hover');
        
        // Add parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
    });
}

// Contact form functionality (placeholder)
function initContactForm() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle different types of contact links
            if (href === '#' || href === '') {
                e.preventDefault();
                
                const contactType = this.textContent.trim();
                
                if (contactType.includes('email') || contactType.includes('@')) {
                    showContactAlert('Email', 'Please replace with your actual email address in the HTML.');
                } else if (contactType.includes('Resume') || contactType.includes('CV')) {
                    showContactAlert('Resume', 'Please add a link to your actual resume/CV file.');
                } else if (contactType.includes('LinkedIn')) {
                    showContactAlert('LinkedIn', 'Please add your LinkedIn profile URL.');
                } else if (contactType.includes('ORCID')) {
                    showContactAlert('ORCID', 'Please add your ORCID profile URL.');
                }
            }
        });
    });
}

// Show contact alert
function showContactAlert(type, message) {
    const alertContent = `
        <div class="alert alert-warning alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 1050; max-width: 400px;" 
             role="alert">
            <strong>${type}:</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertContent);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-warning');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 5000;
    
    let i = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = originalText.substring(0, i);
        heroTitle.textContent = currentText;
        
        if (!isDeleting && i < originalText.length) {
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && i > 0) {
            i--;
            setTimeout(typeWriter, deletingSpeed);
        } else if (!isDeleting && i === originalText.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
        } else if (isDeleting && i === 0) {
            setTimeout(() => {
                isDeleting = false;
                typeWriter();
            }, 500);
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'btn btn-primary position-fixed';
    scrollTopBtn.style.cssText = `
        bottom: 2rem;
        right: 2rem;
        z-index: 1000;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: none;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(preloader);
    
    // Remove preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 300);
        }, 500);
    });
}

// Initialize preloader
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
});

// Export functions for potential external use
window.portfolioJS = {
    scrollToTop,
    showContactAlert
};