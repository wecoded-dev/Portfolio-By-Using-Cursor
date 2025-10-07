// Advanced Portfolio JavaScript with Multiple Animation Libraries
$(document).ready(function() {
    'use strict';

    // Initialize all components
    initializePortfolio();

    function initializePortfolio() {
        // Show loading screen
        showLoadingScreen();
        
        // Initialize particles
        initParticles();
        
        // Initialize Three.js scene
        initThreeJS();
        
        // Initialize animations
        initAnimations();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize testimonials carousel
        initTestimonialsCarousel();
        
        // Initialize form handling
        initFormHandling();
        
        // Initialize skill bars
        initSkillBars();
        
        // Initialize Mo.js animations
        initMoAnimations();
        
        // Hide loading screen after everything is loaded
        setTimeout(() => {
            hideLoadingScreen();
        }, 2000);
    }

    // Loading Screen
    function showLoadingScreen() {
        $('body').prepend(`
            <div class="loading" id="loadingScreen">
                <div class="loader"></div>
            </div>
        `);
    }

    function hideLoadingScreen() {
        $('#loadingScreen').addClass('hidden');
        setTimeout(() => {
            $('#loadingScreen').remove();
        }, 500);
    }

    // Particles.js Configuration
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
                        value: '#6366f1'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#6366f1',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
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
                            distance: 400,
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
                            distance: 200,
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

    // Three.js Scene
    function initThreeJS() {
        if (typeof THREE !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            
            // Add Three.js canvas to hero section
            $('.hero-visual').append(renderer.domElement);
            
            // Create floating geometry
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x6366f1, 
                transparent: true, 
                opacity: 0.6 
            });
            
            const spheres = [];
            for (let i = 0; i < 10; i++) {
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.x = (Math.random() - 0.5) * 10;
                sphere.position.y = (Math.random() - 0.5) * 10;
                sphere.position.z = (Math.random() - 0.5) * 10;
                spheres.push(sphere);
                scene.add(sphere);
            }
            
            camera.position.z = 5;
            
            function animate() {
                requestAnimationFrame(animate);
                
                spheres.forEach((sphere, index) => {
                    sphere.rotation.x += 0.01;
                    sphere.rotation.y += 0.01;
                    sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
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

    // Anime.js Animations
    function initAnimations() {
        if (typeof anime !== 'undefined') {
            // Hero title animation
            anime.timeline({
                easing: 'easeOutExpo',
                duration: 1000
            })
            .add({
                targets: '.title-line',
                translateY: [50, 0],
                opacity: [0, 1],
                delay: anime.stagger(200)
            })
            .add({
                targets: '.hero-subtitle',
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800
            }, '-=400')
            .add({
                targets: '.hero-buttons',
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800
            }, '-=200');

            // Floating shapes animation
            anime({
                targets: '.shape',
                translateY: [0, -20],
                rotate: [0, 180],
                duration: 6000,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: anime.stagger(1000)
            });

            // Glass card hover animations
            $('.glass-card').hover(
                function() {
                    anime({
                        targets: this,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                },
                function() {
                    anime({
                        targets: this,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            );

            // Button click animations
            $('.glass-btn, .glass-btn-outline').click(function(e) {
                e.preventDefault();
                anime({
                    targets: this,
                    scale: [1, 0.95, 1],
                    duration: 200,
                    easing: 'easeInOutQuad'
                });
            });
        }
    }

    // Smooth Scrolling
    function initSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            const target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'easeInOutCubic');
            }
        });
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars when about section is visible
                    if (entry.target.classList.contains('about-section')) {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        $('.about-section, .work-section, .blogs-section, .testimonials-section, .contact-section').each(function() {
            observer.observe(this);
        });

        // Add animation classes
        $('.about-section').addClass('fade-in');
        $('.work-section').addClass('fade-in');
        $('.blogs-section').addClass('fade-in');
        $('.testimonials-section').addClass('fade-in');
        $('.contact-section').addClass('fade-in');
    }

    // Skill Bars Animation
    function initSkillBars() {
        $('.skill-progress').each(function() {
            const width = $(this).data('width');
            $(this).css('width', '0%');
        });
    }

    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const width = $(this).data('width');
            $(this).animate({
                width: width
            }, 2000, 'easeOutCubic');
        });
    }

    // Testimonials Carousel
    function initTestimonialsCarousel() {
        let currentTestimonial = 0;
        const testimonials = $('.testimonial-item');
        const totalTestimonials = testimonials.length;

        function showTestimonial(index) {
            testimonials.removeClass('active').eq(index).addClass('active');
            
            // Animate testimonial change
            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.testimonial-item.active',
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }

        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);
        
        // Show first testimonial
        showTestimonial(0);
    }

    // Form Handling
    function initFormHandling() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            // Animate form submission
            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.contact-form',
                    scale: [1, 0.98, 1],
                    duration: 200,
                    easing: 'easeInOutQuad'
                });
            }
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
        });

        // Input focus animations
        $('.glass-input').on('focus', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            }
        }).on('blur', function() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            }
        });
    }

    // Mo.js Animations
    function initMoAnimations() {
        if (typeof mo !== 'undefined') {
            // Create burst animation for buttons
            $('.glass-btn').on('click', function(e) {
                const burst = new mo.Burst({
                    parent: this,
                    radius: { 0: 100 },
                    angle: { 0: 180 },
                    count: 10,
                    children: {
                        shape: 'circle',
                        radius: 5,
                        fill: '#6366f1',
                        duration: 1000
                    }
                });
                burst.play();
            });

            // Create floating animation for work cards
            $('.work-card').on('mouseenter', function() {
                const tween = new mo.Tween({
                    duration: 1000,
                    onUpdate: function(progress) {
                        $(this.target).css('transform', `translateY(${-10 * progress}px) scale(${1 + 0.02 * progress})`);
                    }
                });
                tween.play();
            });
        }
    }

    // Velocity.js Animations
    function initVelocityAnimations() {
        if (typeof Velocity !== 'undefined') {
            // Navbar scroll effect
            $(window).on('scroll', function() {
                const scrollTop = $(this).scrollTop();
                if (scrollTop > 100) {
                    $('.glass-nav').velocity({
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(30px)'
                    }, 300);
                } else {
                    $('.glass-nav').velocity({
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(20px)'
                    }, 300);
                }
            });

            // Parallax effect for hero section
            $(window).on('scroll', function() {
                const scrolled = $(this).scrollTop();
                const parallax = $('.hero-section');
                const speed = scrolled * 0.5;
                parallax.velocity({
                    translateY: speed
                }, 0);
            });
        }
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `);
        
        $('body').append(notification);
        
        // Animate in
        if (typeof anime !== 'undefined') {
            anime({
                targets: notification[0],
                translateX: [300, 0],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        // Auto remove
        setTimeout(() => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: notification[0],
                    translateX: [0, 300],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: function() {
                        notification.remove();
                    }
                });
            } else {
                notification.remove();
            }
        }, 3000);
    }

    // Initialize Velocity animations
    initVelocityAnimations();

    // Add custom easing functions
    if (typeof jQuery !== 'undefined' && typeof jQuery.easing !== 'undefined') {
        $.easing.easeInOutCubic = function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        };
    }

    // Add notification styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: 15px;
                padding: 15px 20px;
                color: var(--text-primary);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                box-shadow: var(--shadow-medium);
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-info {
                border-left: 4px solid #6366f1;
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification-success i {
                color: #10b981;
            }
            .notification-info i {
                color: #6366f1;
            }
        `)
        .appendTo('head');

    // Performance optimization
    let ticking = false;
    
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    $(window).on('scroll', updateOnScroll);

    // Preload critical images
    function preloadImages() {
        const images = [
            // Add any critical image URLs here
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();

    // Add loading states for better UX
    $('a[href^="#"]').on('click', function() {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').velocity('scroll', {
                duration: 1000,
                easing: 'easeInOutCubic',
                offset: target.offset().top - 80
            });
        }
    });

    // Initialize tooltips for better UX
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Add keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            $('.modal').modal('hide');
        }
    });

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    $(document).on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
        touchStartY = e.originalEvent.touches[0].clientY;
    });
    
    $(document).on('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.originalEvent.changedTouches[0].clientX;
        const touchEndY = e.originalEvent.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Swipe left/right for testimonials
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next testimonial
                $('.testimonial-item').trigger('next');
            } else {
                // Swipe right - previous testimonial
                $('.testimonial-item').trigger('prev');
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });

    console.log('Advanced Portfolio initialized successfully!');
});
