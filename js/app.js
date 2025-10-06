/* global anime, Velocity, mojs, particlesJS, THREE */
(function(){
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function(){
    // Year
    var yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // Smooth scroll with Velocity
    var navLinks = document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"]');
    navLinks.forEach(function(link){
      link.addEventListener('click', function(e){
        var targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        var targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        Velocity(targetEl, 'scroll', {
          duration: 800,
          easing: 'easeInOutCubic',
          offset: -72
        });
      });
    });

    // Active link on scroll
    var sectionIds = ['#hero','#about','#work','#blogs','#testimonials','#contact'];
    var sections = sectionIds.map(function(id){ return document.querySelector(id); });
    var nav = document.querySelector('.navbar');
    var navHeight = nav ? nav.offsetHeight : 80;
    window.addEventListener('scroll', function(){
      var pos = window.scrollY + navHeight + 8;
      for (var i = sectionIds.length - 1; i >= 0; i--){
        var s = sections[i];
        if (s && pos >= s.offsetTop){
          document.querySelectorAll('.nav-link').forEach(function(n){ n.classList.remove('active'); });
          var active = document.querySelector('.nav-link[href="' + sectionIds[i] + '"]');
          if (active) active.classList.add('active');
          break;
        }
      }
      // Navbar subtle background on scroll
      if (nav){
        if (window.scrollY > 24) nav.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))';
        else nav.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))';
      }
    });

    // Anime.js: hero entrance
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle){
      // Split letters
      var text = heroTitle.innerHTML;
      var letters = text.replace(/([\w\S])/g, '<span class="hero-letter">$1</span>');
      heroTitle.innerHTML = letters;
      anime.timeline({ autoplay: true })
        .add({
          targets: '.hero-card',
          opacity: [0,1], translateY: [24, 0], duration: 900, easing: 'easeOutCubic'
        })
        .add({
          targets: '.hero-letter',
          opacity: [0,1], translateY: [20,0], delay: anime.stagger(10), duration: 450, easing: 'easeOutCubic'
        }, '-=400')
        .add({
          targets: '.badge-glass',
          opacity: [0,1], translateY: [12,0], duration: 500, easing: 'easeOutCubic'
        }, '-=600');
    }

    // Intersection reveals
    var revealEls = [].slice.call(document.querySelectorAll('.reveal-up'));
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            anime({ targets: entry.target, opacity: [0,1], translateY: [24,0], duration: 600, easing: 'easeOutCubic' });
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      // Fallback
      revealEls.forEach(function(el){ el.style.opacity = 1; el.style.transform = 'none'; });
    }

    // Work tilt hover
    document.querySelectorAll('.work-card').forEach(function(card){
      var meta = card.querySelector('.work-meta');
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        var rx = (e.clientY - rect.top - rect.height/2) / rect.height;
        var ry = (e.clientX - rect.left - rect.width/2) / rect.width;
        card.style.transform = 'rotateX(' + (-rx*6) + 'deg) rotateY(' + (ry*8) + 'deg)';
        if (meta) meta.style.transform = 'translateZ(24px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = 'none';
        if (meta) meta.style.transform = 'none';
      });
    });

    // Particles.js configuration
    if (window.particlesJS){
      particlesJS('particles-js', {
        particles: {
          number: { value: 90, density: { enable: true, value_area: 900 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.18, random: true },
          size: { value: 2.2, random: true },
          line_linked: { enable: false },
          move: { enable: true, speed: 0.6, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: false }, resize: true },
          modes: { repulse: { distance: 90, duration: 0.4 } }
        },
        retina_detect: true
      });
    }

    // Mo.js burst on contact submit
    var contactForm = document.getElementById('contactForm');
    if (contactForm){
      contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        var burst = new mojs.Burst({
          parent: '#contactBurst', left: 0, top: 0, x: 0, y: 0,
          radius:   { 0: 90 },
          count: 12,
          children: { shape: 'polygon', points: 6, fill: 'white', duration: 900, easing: 'cubic.out' }
        });
        burst.tune({ x: window.innerWidth/2, y: contactForm.getBoundingClientRect().top + (contactForm.offsetHeight/2) + window.scrollY }).replay();
        anime({ targets: contactForm, scale: [1, 1.01, 1], duration: 450, easing: 'easeOutCubic' });
      });
    }

    // Initialize Three.js scene
    if (typeof initThree === 'function') {
      initThree({ container: '#three-bg' });
    }
  });
})();
