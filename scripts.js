// Initialize Particles.js
particlesJS("particles-js",
  {
    "particles": {
      "number": {
        "value": 150,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#00c6ff", "#0072ff", "#00ff85"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
      },
      "opacity": {
        "value": 0.6,
        "random": true,
        "anim": {
          "enable": false,
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00ff85",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "repulse": {
          "distance": 100,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  }
);

// Initialize Lottie Animation for the Logo
const logoContainer = document.getElementById('logo-container');
const logoAnimation = lottie.loadAnimation({
    container: logoContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/logo.json' // Path to your Lottie JSON file
});

// GSAP Animations for Social Buttons
const socialButtons = document.querySelectorAll('.social-button');

socialButtons.forEach(button => {
    // Fly-in Animation
    gsap.from(button, {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 1,
        ease: "back.out(1.7)"
    });

    // Hover Animation
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "power1.out"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power1.out"
        });
    });
});

// 3D Logo with Three.js (Alternative to Lottie if preferred)
let scene, camera, renderer, model;

function initThreeJS() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, logoContainer.clientWidth / logoContainer.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
    logoContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Load 3D Model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/logo.glb', function(gltf){
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        scene.add(model);
        animate();
    }, undefined, function(error){
        console.error(error);
    });

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = logoContainer.clientWidth / logoContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
    });
}

function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);
    if (model) {
        model.rotation.y += 0.005;
        model.rotation.x += 0.002;
    }
    renderer.render(scene, camera);
}

// Uncomment below to use Three.js instead of Lottie
// initThreeJS();
// animateThreeJS();

// Scroll Animations with GSAP
gsap.registerPlugin(ScrollTrigger);

// Fade-in Animation for Social Buttons
gsap.from(".social-button", {
    scrollTrigger: {
        trigger: ".social-media",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
});

// Click Animation for Social Buttons
socialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(button, {
            scale: 0.9,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        });
        // Open link after animation
        setTimeout(() => {
            window.open(button.href, '_blank');
        }, 400);
    });
});

// Optional: Add more interactive animations as needed

// Analytics Integration Placeholder
// Implement your preferred analytics here
