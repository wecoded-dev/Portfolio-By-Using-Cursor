/* Core interactions, scroll, and library initializations */
(function(){
  const $doc = $(document);
  const $win = $(window);

  // Update year
  $('#year').text(new Date().getFullYear());

  // Smooth scroll for nav links
  $doc.on('click', 'a.nav-link, .btn[href^="#"]', function(e){
    const target = $(this).attr('href');
    if (!target || !target.startsWith('#')) return;
    e.preventDefault();
    const $el = $(target);
    if ($el.length) {
      $('html, body').velocity('scroll', {
        duration: 800,
        easing: 'easeInOutQuad',
        offset: $el.offset().top - 80
      });
    }
  });

  // Scrollspy style active state
  const sections = $('section[id], header#hero');
  const navLinks = $('nav a.nav-link');
  function setActiveLink(){
    const scrollPos = $win.scrollTop() + 120;
    let activeId = 'hero';
    sections.each(function(){
      const top = $(this).offset().top;
      if (scrollPos >= top) activeId = this.id;
    });
    navLinks.removeClass('active');
    navLinks.filter(`[href="#${activeId}"]`).addClass('active');
  }
  setActiveLink();
  $win.on('scroll', setActiveLink);

  // Intro animations with anime.js
  anime.timeline({ easing: 'easeOutQuad' })
    .add({ targets: '[data-anime="fade-title"]', translateY: [24,0], opacity: [0,1], duration: 700 })
    .add({ targets: '[data-anime="fade-copy"]', translateY: [16,0], opacity: [0,1], duration: 600 }, '-=350')
    .add({ targets: '[data-anime="fade-cta"]', translateY: [12,0], opacity: [0,1], duration: 600 }, '-=350');

  // Parallax orb using Velocity.js
  const $orb = $('.hero-visual');
  $win.on('mousemove', function(e){
    const x = (e.clientX / $win.width() - 0.5) * 30;
    const y = (e.clientY / $win.height() - 0.5) * 30;
    $orb.velocity({ translateX: x, translateY: y }, { duration: 400, easing: 'easeOutQuad' });
  });

  // Mo.js burst on CTA click
  const ctaButtons = document.querySelectorAll('.btn');
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      const burst = new mojs.Burst({
        left: ev.pageX, top: ev.pageY,
        radius:   { 0: 60 },
        count:    8,
        children: {
          shape:      'circle',
          radius:     6,
          fill:       'white',
          opacity:    { 0.7: 0 },
          duration:   900,
          easing:     'cubic.out'
        }
      });
      burst.play();
    });
  });

  // Subtle hover for work cards
  $('.work-card').on('mouseenter', function(){
    $(this).velocity({ scale: 1.02 }, { duration: 280, easing: 'easeOutQuad' });
  }).on('mouseleave', function(){
    $(this).velocity({ scale: 1.0 }, { duration: 300, easing: 'easeOutQuad' });
  });

  // Form validation feedback
  $('.needs-validation').on('submit', function(e){
    const form = this;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    $(form).addClass('was-validated');
  });
})();
