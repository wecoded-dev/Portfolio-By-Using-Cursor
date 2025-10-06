/* global THREE, anime */
(function(){
  'use strict';

  window.initThree = function initThree(options){
    var selector = options && options.container || '#three-bg';
    var container = document.querySelector(selector);
    if (!container || !window.THREE) return;

    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100);
    camera.position.set(0, 0, 6);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    var hemi = new THREE.HemisphereLight(0xffffff, 0x111122, 0.6);
    scene.add(hemi);
    var dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(2, 3, 4);
    scene.add(dir);

    // Glassy material
    var material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.0,
      transmission: 1.0,
      thickness: 1.2,
      reflectivity: 1.0,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 1.0
    });

    // Geometry: torus knot feels playful and glassy
    var geo = new THREE.TorusKnotGeometry(1.2, 0.38, 320, 16);
    var mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // Backdrop plane to catch refraction
    var bgGeo = new THREE.PlaneGeometry(20, 20);
    var bgMat = new THREE.MeshBasicMaterial({ color: 0x0b0b10 });
    var bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.set(0, 0, -6);
    scene.add(bg);

    // Animation loop
    var clock = new THREE.Clock();
    function animate(){
      var t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.25;
      mesh.rotation.y = t * 0.2;
      camera.position.z = 6 + Math.sin(t * 0.3) * 0.15;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Subtle entrance
    if (window.anime){
      mesh.scale.set(0.9,0.9,0.9);
      anime({ targets: mesh.scale, x: 1, y: 1, z: 1, duration: 1200, easing: 'easeOutCubic' });
    }

    // Resize handler
    window.addEventListener('resize', function(){
      var w = container.clientWidth || window.innerWidth;
      var h = container.clientHeight || window.innerHeight;
      camera.aspect = w/h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  };
})();
