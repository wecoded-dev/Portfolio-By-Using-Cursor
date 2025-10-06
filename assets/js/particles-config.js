/* Particles.js overlay configuration */
(function(){
  if (typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.25, random: true },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 130, color: '#ffffff', opacity: 0.12, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 3 } }
    },
    retina_detect: true
  });
})();
