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
    gsap.to(loadingScreen, { opacity: 0, duration: 1, ease: 'power2.out', onComplete: () => {
      loadingScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      animateBackground(); // Start background animation after loading
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
    const particlesCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x7289da,
      size: 0.1,
      transparent: true,
      opacity: 0.7
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
  const particles = [];
  const maxParticles = 150;

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
    particles.push(new CursorParticle(e.clientX, e.clientY));
    if (particles.length > maxParticles) particles.shift();
  });

  // Cursor Particle Class
  class CursorParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.alpha = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.015;
    }

    draw() {
      ctxCursor.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctxCursor.beginPath();
      ctxCursor.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxCursor.fill();
    }
  }

  // Animation Loop for Cursor Trail
  function animateCursor() {
    ctxCursor.fillStyle = 'rgba(14, 14, 14, 0.1)';
    ctxCursor.fillRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    particles.forEach((p, index) => {
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        particles.splice(index, 1);
      }
    });
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Change Cursor Color on Hover
  const linkButtons = document.querySelectorAll('.link-button');

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
  let cursorColor = 'rgba(255, 255, 255, 0.8)';

  // Modify Cursor Particle Class to Use Dynamic Color
  class CursorParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.alpha = 1;
      this.color = cursorColor;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.015;
    }

    draw() {
      ctxCursor.fillStyle = `rgba(${hexToRgb(this.color)}, ${this.alpha})`;
      ctxCursor.beginPath();
      ctxCursor.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxCursor.fill();
    }
  }

  // Function to Convert RGBA to RGB for Particle Colors
  function hexToRgb(hex) {
    // Remove the 'rgba' part
    let parts = hex.substring(hex.indexOf('(')+1, hex.indexOf(')')).split(',');
    return `${parseInt(parts[0])}, ${parseInt(parts[1])}, ${parseInt(parts[2])}`;
  }

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
      particle.style.background = getRandomColor();
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

  // Generate Random Color for Burst Particles Based on Button
  function getRandomColor() {
    const colors = {
      discord: '#7289da',
      tiktok: '#69C9D0',
      telegram: '#0088cc'
    };
    const activeButton = document.querySelector('.link-button:hover');
    if (activeButton) {
      return colors[activeButton.id] || '#ffffff';
    }
    return '#ffffff';
  }

  // GSAP Scroll Animations for Link Buttons
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
    duration: 1.2,
    ease: "power3.out",
    delay: 0.5
  });

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
