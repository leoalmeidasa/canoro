// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;
let autoSlideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    startAutoSlide();
});

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('mobileNav');
        nav.classList.remove('active');
    });
});

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

// Form submission
function submitForm() {
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    document.querySelector('.contact-form div').reset();
}

// Animation on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .about-content, .contact-content').forEach(item => {
    observer.observe(item);
});

// Pause carousel on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    const services = document.querySelector('.services');
    const contact = document.querySelector('.contact');

    const scrollPosition = window.scrollY;

    // Hero parallax
    hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;

    // About section parallax
    if (about.getBoundingClientRect().top < window.innerHeight) {
        about.style.backgroundPositionY = `${(scrollPosition - about.offsetTop) * 0.2}px`;
    }

    // Services section parallax
    if (services.getBoundingClientRect().top < window.innerHeight) {
        services.style.backgroundPositionY = `${(scrollPosition - services.offsetTop) * 0.15}px`;
    }

    // Contact section parallax
    if (contact.getBoundingClientRect().top < window.innerHeight) {
        contact.style.backgroundPositionY = `${(scrollPosition - contact.offsetTop) * 0.1}px`;
    }
});