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
    gsap.to(loadingScreen, { opacity: 0, duration: 1, onComplete: () => {
      loadingScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
    }});
  });

  // Custom Cursor Variables
  const cursorCanvas = document.getElementById('cursor-canvas');
  const ctxCursor = cursorCanvas.getContext('2d');
  let cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const particles = [];
  const maxParticles = 100;

  // Resize Canvas
  function resizeCanvas() {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Mouse Move Event
  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    particles.push(new Particle(e.clientX, e.clientY));
    if (particles.length > maxParticles) particles.shift();
  });

  // Particle Class for Cursor Trail
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.alpha = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.01;
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
          ctxCursor.fillStyle = 'rgba(114, 137, 218, 0.8)';
          break;
        case 'tiktok':
          ctxCursor.fillStyle = 'rgba(105, 201, 208, 0.8)';
          break;
        case 'telegram':
          ctxCursor.fillStyle = 'rgba(0, 136, 204, 0.8)';
          break;
        default:
          ctxCursor.fillStyle = 'rgba(255, 255, 255, 0.8)';
      }
    });

    button.addEventListener('mouseleave', () => {
      ctxCursor.fillStyle = 'rgba(255, 255, 255, 0.8)';
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

  // Create Particle Burst Effect on Click
  function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;
    
    for(let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${burstX}px`;
      particle.style.top = `${burstY}px`;
      particle.style.background = getRandomColor();
      document.body.appendChild(particle);
      
      gsap.to(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power1.out",
        onComplete: () => particle.remove()
      });
    }
  }

  // Generate Random Color for Particles
  function getRandomColor() {
    const colors = ['#7289da', '#69C9D0', '#E1306C', '#0088cc'];
    return colors[Math.floor(Math.random() * colors.length)];
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
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
  });

  // Parallax Effect on Mouse Move
  const mainContentSection = document.getElementById('main-content');

  mainContentSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    mainContentSection.style.transform = `rotateY(${deltaX * 5}deg) rotateX(${ -deltaY * 5}deg)`;
  });

  mainContentSection.addEventListener('mouseleave', () => {
    mainContentSection.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });
});
