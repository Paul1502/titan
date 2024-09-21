// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const titanLogo = document.querySelector('.titan-logo-animation img');

  // Register GSAP ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  // GSAP Animation for Loading Screen Logo
  gsap.to(titanLogo, { rotation: 360, duration: 2, repeat: -1, ease: 'linear' });

  // Handle Loading Screen Fade Out
  window.addEventListener('load', () => {
    gsap.to(loadingScreen, { opacity: 0, duration: 1.5, ease: 'power2.out', onComplete: () => {
      loadingScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      animateBackground(); // Start background animation after loading
      startButtonAnimations(); // Initiate button animations
    }});
  });

  // Initialize Three.js for Animated Background
  function animateBackground() {
    const canvas = document.getElementById('animated-background');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create Particles
    const particlesCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x7289da,
      size: 0.3,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animate Particles
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // Custom Cursor Variables
  const cursorCanvas = document.getElementById('cursor-canvas');
  const ctxCursor = cursorCanvas.getContext('2d');
  let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let cursorTrail = [];
  const maxTrail = 150;

  // Resize Canvas
  function resizeCursorCanvas() {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCursorCanvas);
  resizeCursorCanvas();

  // Mouse Move Event
  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    if (cursorTrail.length > maxTrail) cursorTrail.shift();
  });

  // Cursor Trail Animation
  function animateCursorTrail() {
    ctxCursor.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    ctxCursor.beginPath();
    for (let i = 0; i < cursorTrail.length; i++) {
      const point = cursorTrail[i];
      ctxCursor.lineTo(point.x, point.y);
    }
    ctxCursor.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctxCursor.lineWidth = 2;
    ctxCursor.stroke();
    requestAnimationFrame(animateCursorTrail);
  }
  animateCursorTrail();

  // Change Cursor Color on Hover
  const linkButtons = document.querySelectorAll('.link-button');
  let cursorColor = 'rgba(255, 255, 255, 0.8)';

  linkButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const id = button.id;
      switch(id) {
        case 'discord':
          cursorColor = 'rgba(114, 137, 218, 0.8)';
          break;
        case 'tiktok':
          cursorColor = 'rgba(105, 201, 208, 0.8)';
          break;
        case 'telegram':
          cursorColor = 'rgba(0, 136, 204, 0.8)';
          break;
        default:
          cursorColor = 'rgba(255, 255, 255, 0.8)';
      }
    });

    button.addEventListener('mouseleave', () => {
      cursorColor = 'rgba(255, 255, 255, 0.8)';
    });

    // Click Event for Particle Burst and Navigation
    button.addEventListener('click', (e) => {
      e.preventDefault();
      createParticleBurst(button);
      const linkMap = {
        discord: 'https://discord.gg/XgmY98jtFF',
        tiktok: 'https://www.tiktok.com/@xititan',
        telegram: 'https://t.me/+dM1kgpArxyM3MDE6'
      };
      window.open(linkMap[button.id], '_blank');
    });
  });

  // Initialize Cursor Color
  let currentCursorColor = 'rgba(255, 255, 255, 0.8)';

  // Draw Custom Cursor
  function drawCustomCursor() {
    ctxCursor.beginPath();
    ctxCursor.arc(cursor.x, cursor.y, 10, 0, Math.PI * 2);
    ctxCursor.fillStyle = cursorColor;
    ctxCursor.fill();
    requestAnimationFrame(drawCustomCursor);
  }
  drawCustomCursor();

  // Create Particle Burst Effect on Click
  function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;
    
    for(let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${burstX}px`;
      particle.style.top = `${burstY}px`;
      particle.style.background = getBurstColor(element.id);
      particle.style.width = '8px';
      particle.style.height = '8px';
      document.body.appendChild(particle);
      
      gsap.to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  // Generate Burst Color Based on Button ID
  function getBurstColor(id) {
    const colors = {
      discord: '#7289da',
      tiktok: '#69C9D0',
      telegram: '#0088cc'
    };
    return colors[id] || '#ffffff';
  }

  // GSAP Scroll Animations for Link Buttons
  function startButtonAnimations() {
    gsap.from(".link-button", {
      scrollTrigger: {
        trigger: ".links-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5
    });

    gsap.to(".link-button", {
      rotation: 360,
      repeat: -1,
      duration: 60,
      ease: "linear",
      transformOrigin: "center center"
    });
  }

  // Parallax Effect on Mouse Move
  const mainContentSection = document.getElementById('main-content');

  mainContentSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    gsap.to(mainContentSection, {
      rotateY: deltaX * 5,
      rotateX: -deltaY * 5,
      duration: 0.5,
      ease: "power3.out"
    });
  });

  mainContentSection.addEventListener('mouseleave', () => {
    gsap.to(mainContentSection, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out"
    });
  });
});
