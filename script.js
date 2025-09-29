// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Smooth scroll to target
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150; // Offset for better accuracy
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                
                // Add animation delay for staggered effect
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Per favore, compila tutti i campi richiesti.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Per favore, inserisci un indirizzo email valido.');
        return;
    }
    
    // Show success message (in a real scenario, you would send this to a server)
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
    submitBtn.style.background = '#28a745';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
    
    // In a real application, you would send the form data to your server here
    console.log('Form submitted:', { name, email, subject, message });
});

// Smooth reveal animations on scroll
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
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero CTA button scroll to portfolio
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    const offsetTop = portfolioSection.offsetTop - 80;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Add loading animation to portfolio items
function addPortfolioLoadingAnimation() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100); // Staggered animation
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to portfolio
    setTimeout(addPortfolioLoadingAnimation, 500);
    
    // Set initial active nav link
    updateActiveNavLink();
});

// Utility function to replace video placeholders with actual YouTube embeds
function replaceVideoPlaceholders() {
    // Example function to replace placeholders with actual YouTube videos
    // You would call this function with your actual YouTube video IDs
    
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    // Example YouTube video IDs (replace with your actual video IDs)
    const videoIds = [
        'dQw4w9WgXcQ', // Replace with actual video IDs
        'dQw4w9WgXcQ',
        'dQw4w9WgXcQ',
        'dQw4w9WgXcQ',
        'dQw4w9WgXcQ'
    ];
    
    videoPlaceholders.forEach((placeholder, index) => {
        if (videoIds[index]) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoIds[index]}`;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            placeholder.parentNode.replaceChild(iframe, placeholder);
        }
    });
}

// Call this function when you have your YouTube video IDs ready
// replaceVideoPlaceholders();

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add smooth hover effects to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images (when you add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();