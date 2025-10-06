// ===== MAIN APPLICATION ===== 
$(document).ready(function() {
    // Initialize all components
    initParticles();
    initThreeJS();
    initScrollAnimations();
    initNavigation();
    initHeroAnimations();
    initStatsCounter();
    initTestimonialSlider();
    initContactForm();
    initMoJSAnimations();
    initVelocityAnimations();
    initInteractiveElements();
    
    // Add loading animation
    $('body').addClass('fade-in');
});

// ===== PARTICLES.JS CONFIGURATION =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ffffff', '#cccccc', '#999999']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===== THREE.JS BACKGROUND =====
function initThreeJS() {
    if (typeof THREE !== 'undefined') {
        const container = document.getElementById('three-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.ConeGeometry(0.7, 1.5, 8),
            new THREE.OctahedronGeometry(0.8)
        ];
        
        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0xffffff, 
                wireframe: true, 
                transparent: true, 
                opacity: 0.1 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xcccccc, 
                wireframe: true, 
                transparent: true, 
                opacity: 0.08 
            })
        ];
        
        const meshes = [];
        
        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = (Math.random() - 0.5) * 50;
            mesh.position.y = (Math.random() - 0.5) * 50;
            mesh.position.z = (Math.random() - 0.5) * 50;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatRange: Math.random() * 2 + 1
            };
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        camera.position.z = 30;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += mesh.userData.rotationSpeed.x;
                mesh.rotation.y += mesh.userData.rotationSpeed.y;
                mesh.rotation.z += mesh.userData.rotationSpeed.z;
                
                mesh.position.y += Math.sin(Date.now() * mesh.userData.floatSpeed + index) * 0.01;
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// ===== NAVIGATION ANIMATIONS =====
function initNavigation() {
    const nav = $('#mainNav');
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    $('.nav-link, .glass-btn[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutCubic');
        }
    });
    
    // Mobile menu animation
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.navbar-collapse',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    });
}

// ===== HERO SECTION ANIMATIONS =====
function initHeroAnimations() {
    if (typeof anime !== 'undefined') {
        // Animate hero elements on load
        anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
        })
        .add({
            targets: '.greeting',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 200
        })
        .add({
            targets: '.name',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 100
        }, '-=800')
        .add({
            targets: '.role',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 100
        }, '-=700')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 100
        }, '-=600')
        .add({
            targets: '.hero-buttons',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 100
        }, '-=500');
        
        // Floating elements animation
        anime({
            targets: '.floating-element',
            translateY: [
                { value: -20, duration: 2000 },
                { value: 0, duration: 2000 }
            ],
            rotate: [
                { value: 5, duration: 2000 },
                { value: -5, duration: 2000 },
                { value: 0, duration: 2000 }
            ],
            loop: true,
            easing: 'easeInOutSine',
            delay: anime.stagger(500)
        });
    }
    
    // Scroll indicator animation
    $('.scroll-indicator').click(function() {
        $('html, body').animate({
            scrollTop: $('#about').offset().top - 80
        }, 1000, 'easeInOutCubic');
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('slide-up');
                
                // Trigger specific animations based on element type
                if (element.classList.contains('glass-card')) {
                    animateGlassCard(element);
                }
                
                if (element.classList.contains('work-card')) {
                    animateWorkCard(element);
                }
                
                if (element.classList.contains('blog-card')) {
                    animateBlogCard(element);
                }
            }
        });
    }, observerOptions);
    
    // Observe all glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
    
    // Section title animations
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
}

// ===== GLASS CARD ANIMATIONS =====
function animateGlassCard(element) {
    if (typeof anime !== 'undefined') {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutCubic',
            delay: Math.random() * 200
        });
    }
}

// ===== WORK CARD ANIMATIONS =====
function animateWorkCard(element) {
    if (typeof anime !== 'undefined') {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [30, 0],
            rotateY: [10, 0],
            duration: 600,
            easing: 'easeOutCubic',
            delay: Math.random() * 300
        });
    }
}

// ===== BLOG CARD ANIMATIONS =====
function animateBlogCard(element) {
    if (typeof anime !== 'undefined') {
        anime({
            targets: element,
            opacity: [0, 1],
            translateX: [30, 0],
            duration: 700,
            easing: 'easeOutCubic',
            delay: Math.random() * 200
        });
    }
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCounter(stat, target);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-card');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function animateCounter(element, target) {
    if (typeof anime !== 'undefined') {
        const obj = { count: 0 };
        
        anime({
            targets: obj,
            count: target,
            duration: 2000,
            easing: 'easeOutCubic',
            update: function() {
                element.textContent = Math.floor(obj.count);
            },
            complete: function() {
                element.textContent = target;
            }
        });
    }
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    let currentSlide = 0;
    const slides = $('.testimonial-item');
    const totalSlides = slides.length;
    
    if (totalSlides > 1) {
        // Auto-slide functionality
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 5000);
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        $('.testimonials-slider').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].clientX;
        });
        
        $('.testimonials-slider').on('touchend', function(e) {
            endX = e.originalEvent.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    currentSlide = (currentSlide + 1) % totalSlides;
                } else {
                    // Swipe right - previous slide
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                showSlide(currentSlide);
            }
        }
    }
    
    function showSlide(index) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.testimonial-item',
                opacity: 0,
                translateX: -50,
                duration: 300,
                easing: 'easeOutCubic',
                complete: function() {
                    slides.hide();
                    $(slides[index]).show();
                    
                    anime({
                        targets: slides[index],
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                }
            });
        }
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const button = $(this).find('button[type="submit"]');
        const originalText = button.find('span').text();
        
        // Animate button
        button.find('span').text('Sending...');
        button.prop('disabled', true);
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: button[0],
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutCubic'
            });
        }
        
        // Simulate form submission
        setTimeout(() => {
            button.find('span').text('Message Sent!');
            button.removeClass('primary-btn').addClass('success-btn');
            
            // Reset form
            setTimeout(() => {
                this.reset();
                button.find('span').text(originalText);
                button.prop('disabled', false);
                button.removeClass('success-btn').addClass('primary-btn');
            }, 2000);
        }, 1500);
    });
    
    // Input focus animations
    $('.glass-input').on('focus', function() {
        if (typeof anime !== 'undefined') {
            anime({
                targets: this,
                scale: [1, 1.02, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    });
}

// ===== MO.JS ANIMATIONS =====
function initMoJSAnimations() {
    if (typeof mojs !== 'undefined') {
        // Button click animations
        $('.glass-btn').each(function() {
            const button = this;
            
            const burst = new mojs.Burst({
                parent: button,
                radius: { 0: 50 },
                angle: { 0: 45 },
                count: 6,
                children: {
                    shape: 'circle',
                    radius: { 6: 0 },
                    fill: '#ffffff',
                    opacity: { 0.6: 0 },
                    duration: 700,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }
            });
            
            $(button).on('click', function(e) {
                burst.replay();
            });
        });
        
        // Social link hover effects
        $('.social-link').each(function() {
            const link = this;
            
            const circle = new mojs.Shape({
                parent: link,
                shape: 'circle',
                radius: { 0: 30 },
                fill: 'transparent',
                stroke: '#ffffff',
                strokeWidth: { 2: 0 },
                opacity: { 0.8: 0 },
                duration: 600,
                easing: mojs.easing.ease.out
            });
            
            $(link).on('mouseenter', function() {
                circle.replay();
            });
        });
    }
}

// ===== VELOCITY.JS ANIMATIONS =====
function initVelocityAnimations() {
    if (typeof Velocity !== 'undefined') {
        // Skill items hover animation
        $('.skill-item').on('mouseenter', function() {
            Velocity(this, {
                scale: 1.05,
                rotateY: 5
            }, {
                duration: 300,
                easing: 'easeOutCubic'
            });
            
            Velocity($(this).find('i'), {
                rotateZ: 360
            }, {
                duration: 500,
                easing: 'easeOutCubic'
            });
        });
        
        $('.skill-item').on('mouseleave', function() {
            Velocity(this, {
                scale: 1,
                rotateY: 0
            }, {
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        // Work card hover animations
        $('.work-card').on('mouseenter', function() {
            Velocity($(this).find('.work-image img'), {
                scale: 1.1
            }, {
                duration: 400,
                easing: 'easeOutCubic'
            });
            
            Velocity($(this).find('.work-overlay'), {
                opacity: 1
            }, {
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        $('.work-card').on('mouseleave', function() {
            Velocity($(this).find('.work-image img'), {
                scale: 1
            }, {
                duration: 400,
                easing: 'easeOutCubic'
            });
            
            Velocity($(this).find('.work-overlay'), {
                opacity: 0
            }, {
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    }
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    // Parallax effect for floating elements
    $(window).on('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        $('.floating-element').each(function(index) {
            const speed = $(this).data('speed') || 1;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    translateX: x,
                    translateY: y,
                    duration: 1000,
                    easing: 'easeOutCubic'
                });
            }
        });
    });
    
    // Glass card tilt effect
    $('.glass-card').on('mousemove', function(e) {
        const card = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: this,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    });
    
    $('.glass-card').on('mouseleave', function() {
        if (typeof anime !== 'undefined') {
            anime({
                targets: this,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    });
    
    // Cursor trail effect
    let mouseTrail = [];
    const trailLength = 10;
    
    $(document).on('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY });
        
        if (mouseTrail.length > trailLength) {
            mouseTrail.shift();
        }
        
        updateCursorTrail();
    });
    
    function updateCursorTrail() {
        $('.cursor-trail').remove();
        
        mouseTrail.forEach((point, index) => {
            const trail = $('<div class="cursor-trail"></div>');
            const opacity = (index + 1) / trailLength * 0.5;
            const size = (index + 1) / trailLength * 10;
            
            trail.css({
                position: 'fixed',
                left: point.x - size / 2,
                top: point.y - size / 2,
                width: size,
                height: size,
                background: 'rgba(255, 255, 255, ' + opacity + ')',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'all 0.1s ease'
            });
            
            $('body').append(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 100);
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Custom easing function for jQuery
$.easing.easeInOutCubic = function(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimized scroll handler
const optimizedScroll = throttle(function() {
    // Handle scroll-based animations here
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    
    // Update navigation state
    if (scrollTop > 100) {
        $('#mainNav').addClass('scrolled');
    } else {
        $('#mainNav').removeClass('scrolled');
    }
    
    // Parallax effects
    $('.hero-section').css('transform', `translateY(${scrollTop * 0.5}px)`);
    
}, 16); // ~60fps

$(window).on('scroll', optimizedScroll);

// ===== LOADING SCREEN =====
$(window).on('load', function() {
    // Hide loading screen if exists
    $('.loading-screen').fadeOut(500);
    
    // Start entrance animations
    if (typeof anime !== 'undefined') {
        anime({
            targets: 'body',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutCubic'
        });
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.warn('Animation library not loaded:', e.message);
    // Fallback to CSS animations if JS libraries fail
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
$(document).ready(function() {
    // Keyboard navigation support
    $('.glass-btn, .nav-link, .work-link, .social-link').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
    
    // Focus indicators
    $('.glass-btn, .nav-link, .glass-input').on('focus', function() {
        $(this).addClass('focus-visible');
    }).on('blur', function() {
        $(this).removeClass('focus-visible');
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable complex animations for users who prefer reduced motion
        $('*').css({
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important'
        });
    }
});

// ===== RESPONSIVE ADJUSTMENTS =====
function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    if (isMobile) {
        // Disable some heavy animations on mobile
        $('.floating-element').css('animation', 'none');
        $('.hero-card').css('animation', 'none');
    }
    
    // Adjust particle count based on device
    if (typeof pJSDom !== 'undefined' && pJSDom[0]) {
        const particleCount = isMobile ? 30 : isTablet ? 50 : 80;
        pJSDom[0].pJS.particles.number.value = particleCount;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}

$(window).on('resize', debounce(handleResponsive, 250));
$(document).ready(handleResponsive);