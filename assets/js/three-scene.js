/* Minimal Three.js animated background */
(function(){
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const geometry = new THREE.IcosahedronGeometry(1.2, 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.7,
    roughness: 0.15,
    transparent: true,
    opacity: 0.35,
    emissive: 0x111111,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const light1 = new THREE.PointLight(0xffffff, 1.2, 0, 2);
  light1.position.set(3, 3, 3);
  const light2 = new THREE.PointLight(0xffffff, 0.6, 0, 2);
  light2.position.set(-3, -2, 1);
  scene.add(light1, light2);

  function onResize(){
    const w = window.innerWidth; const h = window.innerHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  let time = 0;
  function animate(){
    time += 0.005;
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.004;
    mesh.position.y = Math.sin(time) * 0.2;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
