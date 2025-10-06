/* ===================================
   INITIALIZATION
   =================================== */
$(document).ready(function() {
    // Hide loader after page loads
    setTimeout(() => {
        $('.loader-wrapper').addClass('hidden');
    }, 2000);
    
    // Initialize all components
    initThreeJS();
    initParticles();
    initScrollAnimations();
    initNavigation();
    initCounters();
    initMoJS();
    initVelocityAnimations();
    initFormAnimations();
});

/* ===================================
   THREE.JS BACKGROUND
   =================================== */
function initThreeJS() {
    const container = document.getElementById('three-canvas');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    camera.position.z = 5;
    
    // Create geometric shapes
    const geometries = [
        new THREE.TorusGeometry(1, 0.4, 16, 100),
        new THREE.OctahedronGeometry(1.5),
        new THREE.IcosahedronGeometry(1.2),
        new THREE.TetrahedronGeometry(1.5)
    ];
    
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    
    const meshes = [];
    
    geometries.forEach((geometry, index) => {
        const mesh = new THREE.Mesh(geometry, material.clone());
        mesh.position.x = (index - 1.5) * 3;
        mesh.position.y = Math.random() * 2 - 1;
        meshes.push(mesh);
        scene.add(mesh);
    });
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        meshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.001 * (index + 1);
            mesh.rotation.y += 0.002 * (index + 1);
            mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
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
    
    // Mouse movement parallax
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        camera.position.x = mouseX * 0.5;
        camera.position.y = mouseY * 0.5;
    });
}

/* ===================================
   PARTICLES.JS CONFIGURATION
   =================================== */
function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    
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
                value: '#ffffff'
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
                    size_min: 0.1,
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
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
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
                    mode: 'grab'
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
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

/* ===================================
   ANIME.JS SCROLL ANIMATIONS
   =================================== */
function initScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Animate cards on scroll
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        observer.observe(card);
    });
}

function animateElement(element) {
    if (typeof anime === 'undefined') return;
    
    // Section animations
    if (element.tagName === 'SECTION') {
        anime({
            targets: element.querySelectorAll('.section-title, .section-subtitle'),
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: element.querySelectorAll('.glass-card'),
            opacity: [0, 1],
            translateY: [80, 0],
            scale: [0.8, 1],
            duration: 1200,
            delay: anime.stagger(150, {start: 300}),
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    // Card animations
    if (element.classList.contains('glass-card')) {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
}

/* ===================================
   NAVIGATION
   =================================== */
function initNavigation() {
    const nav = $('.glass-nav');
    const scrollTopBtn = $('#scroll-top');
    
    // Smooth scroll for navigation links
    $('.nav-link').on('click', function(e) {
        const href = $(this).attr('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            
            if (target.length) {
                // Update active state
                $('.nav-link').removeClass('active');
                $(this).addClass('active');
                
                // Smooth scroll with velocity
                if (typeof Velocity !== 'undefined') {
                    Velocity(target[0], 'scroll', {
                        duration: 1000,
                        easing: 'easeInOutQuart',
                        offset: -80
                    });
                } else {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                }
                
                // Close mobile menu
                $('.navbar-collapse').collapse('hide');
            }
        }
    });
    
    // Scroll event handler
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop();
        
        // Add scrolled class to nav
        if (scrollPos > 50) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }
        
        // Show/hide scroll to top button
        if (scrollPos > 300) {
            scrollTopBtn.addClass('visible');
        } else {
            scrollTopBtn.removeClass('visible');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        $('section').each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionId = $(this).attr('id');
            if (scrollPos >= sectionTop) {
                current = sectionId;
            }
        });
        
        $('.nav-link').removeClass('active');
        $(`.nav-link[href="#${current}"]`).addClass('active');
    });
    
    // Scroll to top functionality
    scrollTopBtn.on('click', function() {
        if (typeof Velocity !== 'undefined') {
            Velocity(document.body, 'scroll', {
                duration: 1000,
                easing: 'easeInOutQuart'
            });
        } else {
            $('html, body').animate({ scrollTop: 0 }, 1000);
        }
    });
}

/* ===================================
   COUNTER ANIMATION
   =================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    
    if (typeof anime === 'undefined') {
        counter.textContent = target;
        return;
    }
    
    const obj = { count: 0 };
    anime({
        targets: obj,
        count: target,
        duration: 2000,
        easing: 'easeOutExpo',
        round: 1,
        update: function() {
            counter.textContent = obj.count + '+';
        }
    });
}

/* ===================================
   MO.JS ANIMATIONS
   =================================== */
function initMoJS() {
    if (typeof mojs === 'undefined') return;
    
    // Button click burst animation
    const buttons = document.querySelectorAll('.btn-glass, .btn-glass-outline');
    
    buttons.forEach(button => {
        const burst = new mojs.Burst({
            parent: button,
            radius: { 0: 100 },
            count: 8,
            children: {
                shape: 'circle',
                fill: ['#ffffff', '#cccccc', '#999999'],
                radius: { 10: 0 },
                duration: 600,
                easing: 'cubic.out'
            }
        });
        
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            burst
                .tune({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                })
                .replay();
        });
    });
    
    // Card hover animations
    const cards = document.querySelectorAll('.work-card, .blog-card');
    
    cards.forEach(card => {
        const circle = new mojs.Shape({
            parent: card,
            shape: 'circle',
            fill: 'transparent',
            stroke: 'rgba(255, 255, 255, 0.5)',
            strokeWidth: { 2: 0 },
            radius: { 0: 100 },
            duration: 600,
            easing: 'cubic.out',
            isShowStart: true
        });
        
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            circle
                .tune({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                })
                .replay();
        });
    });
    
    // Form input focus animation
    const inputs = document.querySelectorAll('.glass-input');
    
    inputs.forEach(input => {
        const ripple = new mojs.Shape({
            parent: input.parentElement,
            shape: 'circle',
            fill: 'rgba(255, 255, 255, 0.2)',
            radius: { 0: 50 },
            duration: 400,
            opacity: { 1: 0 },
            easing: 'cubic.out',
            isShowStart: true
        });
        
        input.addEventListener('focus', function() {
            ripple
                .tune({
                    x: 0,
                    y: 0
                })
                .replay();
        });
    });
}

/* ===================================
   VELOCITY.JS ANIMATIONS
   =================================== */
function initVelocityAnimations() {
    if (typeof Velocity === 'undefined') return;
    
    // Hero section entrance
    setTimeout(() => {
        Velocity($('.hero-title')[0], 
            { opacity: [1, 0], translateY: [0, 50] }, 
            { duration: 1200, easing: 'easeOutExpo' }
        );
        
        Velocity($('.hero-subtitle')[0], 
            { opacity: [1, 0], translateY: [0, 30] }, 
            { duration: 1200, delay: 200, easing: 'easeOutExpo' }
        );
        
        Velocity($('.hero-buttons')[0], 
            { opacity: [1, 0], translateY: [0, 30] }, 
            { duration: 1200, delay: 400, easing: 'easeOutExpo' }
        );
    }, 2200);
    
    // Floating elements animation
    $('.float-element').each(function(index) {
        const speed = $(this).data('speed') || 2;
        
        function floatAnimation() {
            Velocity(this, 
                { translateY: '-=20px' }, 
                { 
                    duration: 2000 * speed,
                    easing: 'easeInOutSine',
                    complete: function() {
                        Velocity(this, 
                            { translateY: '+=20px' }, 
                            { 
                                duration: 2000 * speed,
                                easing: 'easeInOutSine',
                                complete: floatAnimation.bind(this)
                            }
                        );
                    }
                }
            );
        }
        
        setTimeout(() => floatAnimation.call(this), index * 300);
    });
    
    // Work cards hover effect
    $('.work-card').hover(
        function() {
            Velocity($(this).find('.work-overlay')[0], 
                { opacity: 1 }, 
                { duration: 300 }
            );
            Velocity($(this).find('.work-link')[0], 
                { scale: 1.1, rotateZ: 360 }, 
                { duration: 400, easing: 'spring' }
            );
        },
        function() {
            Velocity($(this).find('.work-overlay')[0], 
                { opacity: 0 }, 
                { duration: 300 }
            );
            Velocity($(this).find('.work-link')[0], 
                { scale: 1, rotateZ: 0 }, 
                { duration: 400 }
            );
        }
    );
    
    // Blog cards hover effect
    $('.blog-card').hover(
        function() {
            Velocity(this, 
                { translateY: -15, scale: 1.02 }, 
                { duration: 400, easing: 'easeOutCubic' }
            );
        },
        function() {
            Velocity(this, 
                { translateY: 0, scale: 1 }, 
                { duration: 400, easing: 'easeOutCubic' }
            );
        }
    );
    
    // Testimonial cards entrance
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    Velocity(entry.target, 
                        { 
                            opacity: [1, 0],
                            translateX: [0, -50],
                            rotateY: [0, -15]
                        }, 
                        { 
                            duration: 800,
                            easing: 'easeOutExpo'
                        }
                    );
                }, index * 150);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    $('.testimonial-card').each(function() {
        testimonialObserver.observe(this);
    });
}

/* ===================================
   FORM ANIMATIONS
   =================================== */
function initFormAnimations() {
    const form = $('#contact-form');
    
    // Input focus animations
    $('.glass-input').on('focus', function() {
        if (typeof anime !== 'undefined') {
            anime({
                targets: this,
                scale: [1, 1.02, 1],
                duration: 400,
                easing: 'easeOutElastic(1, .5)'
            });
        }
    });
    
    // Form submission
    form.on('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = $(this).find('.submit-btn');
        const originalText = submitBtn.html();
        
        // Disable button and show loading
        submitBtn.prop('disabled', true);
        submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...');
        
        // Simulate form submission
        setTimeout(() => {
            // Show success animation
            if (typeof mojs !== 'undefined') {
                const burst = new mojs.Burst({
                    parent: submitBtn[0],
                    radius: { 0: 150 },
                    count: 15,
                    children: {
                        shape: 'circle',
                        fill: ['#ffffff', '#cccccc'],
                        radius: { 15: 0 },
                        duration: 800,
                        easing: 'cubic.out'
                    }
                });
                burst.replay();
            }
            
            // Reset form
            form[0].reset();
            submitBtn.prop('disabled', false);
            submitBtn.html(originalText);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
        }, 2000);
    });
}

/* ===================================
   NOTIFICATION SYSTEM
   =================================== */
function showNotification(message, type = 'success') {
    const notification = $(`
        <div class="notification glass-card ${type}">
            <span class="material-icons">
                ${type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>${message}</span>
        </div>
    `);
    
    $('body').append(notification);
    
    // Add notification styles if not already added
    if (!$('#notification-styles').length) {
        $('head').append(`
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 30px;
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    z-index: 10000;
                    min-width: 300px;
                    animation: slideInRight 0.4s ease;
                }
                .notification.success {
                    border-left: 4px solid #00ff00;
                }
                .notification.error {
                    border-left: 4px solid #ff0000;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            </style>
        `);
    }
    
    // Animate in with Velocity if available
    if (typeof Velocity !== 'undefined') {
        Velocity(notification[0], 
            { opacity: [1, 0], translateX: [0, 400] }, 
            { duration: 400, easing: 'easeOutExpo' }
        );
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (typeof Velocity !== 'undefined') {
            Velocity(notification[0], 
                { opacity: 0, translateX: 400 }, 
                { 
                    duration: 400,
                    complete: function() {
                        notification.remove();
                    }
                }
            );
        } else {
            notification.css('animation', 'slideOutRight 0.4s ease');
            setTimeout(() => notification.remove(), 400);
        }
    }, 3000);
}

/* ===================================
   PARALLAX EFFECTS
   =================================== */
$(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    
    // Parallax effect for hero section
    $('.hero-visual').css('transform', `translateY(${scrolled * 0.5}px)`);
    
    // Parallax for floating elements
    $('.float-element').each(function() {
        const speed = $(this).data('speed') || 1;
        $(this).css('transform', `translateY(${scrolled * speed * 0.05}px)`);
    });
    
    // Fade effect for hero content
    const heroOpacity = 1 - (scrolled / 500);
    $('.hero-content').css('opacity', Math.max(0, heroOpacity));
});

/* ===================================
   CURSOR FOLLOW EFFECT
   =================================== */
const cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: null,
    $outline: null,
    
    init: function() {
        // Create cursor elements
        this.$dot = $('<div class="cursor-dot"></div>');
        this.$outline = $('<div class="cursor-outline"></div>');
        
        $('body').append(this.$dot, this.$outline);
        
        // Add cursor styles
        if (!$('#cursor-styles').length) {
            $('head').append(`
                <style id="cursor-styles">
                    .cursor-dot {
                        position: fixed;
                        width: 8px;
                        height: 8px;
                        background: rgba(255, 255, 255, 0.8);
                        border-radius: 50%;
                        z-index: 99999;
                        pointer-events: none;
                        transition: opacity 0.3s ease;
                    }
                    .cursor-outline {
                        position: fixed;
                        width: 30px;
                        height: 30px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        z-index: 99998;
                        pointer-events: none;
                        transition: all 0.15s ease, opacity 0.3s ease;
                    }
                    .cursor-enlarged .cursor-outline {
                        transform: scale(1.5);
                        background: rgba(255, 255, 255, 0.1);
                    }
                    * {
                        cursor: none !important;
                    }
                    @media (max-width: 768px) {
                        .cursor-dot, .cursor-outline {
                            display: none;
                        }
                        * {
                            cursor: auto !important;
                        }
                    }
                </style>
            `);
        }
        
        this.setupEventListeners();
        this.animateDotOutline();
    },
    
    setupEventListeners: function() {
        const self = this;
        
        // Mouse move
        $(document).on('mousemove', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.css({
                top: e.pageY + 'px',
                left: e.pageX + 'px'
            });
        });
        
        // Mouse enter/leave
        $(document).on('mouseenter', 'a, button, .work-card, .blog-card, input, textarea', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        
        $(document).on('mouseleave', 'a, button, .work-card, .blog-card, input, textarea', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
        
        // Click effect
        $(document).on('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        
        $(document).on('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
    },
    
    animateDotOutline: function() {
        const self = this;
        
        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        
        self.$outline.css({
            top: self._y + 'px',
            left: self._x + 'px'
        });
        
        requestAnimationFrame(this.animateDotOutline.bind(this));
    },
    
    toggleCursorSize: function() {
        if (this.cursorEnlarged) {
            $('body').addClass('cursor-enlarged');
        } else {
            $('body').removeClass('cursor-enlarged');
        }
    },
    
    toggleCursorVisibility: function() {
        if (this.cursorVisible) {
            this.$dot.css('opacity', 1);
            this.$outline.css('opacity', 1);
        } else {
            this.$dot.css('opacity', 0);
            this.$outline.css('opacity', 0);
        }
    }
};

// Initialize cursor on desktop only
if (window.innerWidth > 768) {
    cursor.init();
}

/* ===================================
   ADDITIONAL ANIME.JS EFFECTS
   =================================== */
// Animate section titles on load
if (typeof anime !== 'undefined') {
    // Hero elements animation
    anime.timeline()
        .add({
            targets: '.hero-glass',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 2200
        });
    
    // Skill items stagger animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target.querySelectorAll('.skill-item'),
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    duration: 600,
                    delay: anime.stagger(100),
                    easing: 'easeOutQuad'
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.skills-grid').forEach(grid => {
        skillObserver.observe(grid);
    });
}

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */
// Throttle scroll events
let ticking = false;
$(window).on('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            ticking = false;
        });
        ticking = true;
    }
});

// Lazy load images (if any are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c Portfolio Loaded Successfully! ', 'background: #000; color: #fff; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%c Made with ❤️ and lots of animations ', 'background: #fff; color: #000; padding: 5px; font-size: 12px;');
