// Initialize Particles.js
particlesJS("particles-js",
  {
    "particles": {
      "number": {
        "value": 120,
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
        "value": 0.5,
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
        "speed": 4,
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

// Initialize Three.js for 3D Logo
let scene, camera, renderer, logo;

function initThreeJS() {
    const container = document.getElementById('logo-container');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Load 3D Model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/logo.glb', function(gltf){
        logo = gltf.scene;
        logo.scale.set(2, 2, 2);
        scene.add(logo);
        animate();
    }, undefined, function(error){
        console.error(error);
    });

    // Responsive Renderer
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (logo) {
        logo.rotation.y += 0.005;
        logo.rotation.x += 0.002;
    }
    renderer.render(scene, camera);
}

initThreeJS();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Fade-in Sections
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });
});

// Navbar Background Change on Scroll
gsap.to('.navbar', {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    scrollTrigger: {
        trigger: 'header',
        start: 'bottom top',
        toggleActions: 'play reverse play reverse'
    }
});

// Social Button Hover Animations with GSAP
const socialButtons = document.querySelectorAll('.social-button');

socialButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3, ease: 'power1.out' });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: 'power1.out' });
    });
});

// Testimonial Slider with GSAP
const testimonials = document.querySelectorAll('.testimonial');
let testimonialIndex = 0;

function showTestimonial(index) {
    gsap.to('.testimonial-slider', {
        x: -index * (testimonials[0].clientWidth + 30),
        duration: 1,
        ease: 'power2.inOut'
    });
}

setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
}, 7000);

// Contact Form Submission (Placeholder)
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Implement form submission logic here (e.g., via EmailJS, Formspree, etc.)
    gsap.from('.contact-form', { opacity: 0, y: -50, duration: 0.5 });
    alert('Thank you for your message!');
    contactForm.reset();
});

// Optional: Add More Interactive Elements as Needed
