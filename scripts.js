// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Button Animations on Click
const socialButtons = document.querySelectorAll('.social-button');

socialButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 300);
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

setInterval(() => {
    testimonials[currentTestimonial].scrollIntoView({ behavior: 'smooth' });
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
}, 5000);

// Dynamic Background Interaction (Heartbeat Effect)
document.body.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.body.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
});

// Analytics Integration Placeholder
// You can integrate Google Analytics or any other analytics service here.
// Example for Google Analytics (replace 'YOUR_TRACKING_ID' with actual ID):
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

 ga('create', 'YOUR_TRACKING_ID', 'auto');
 ga('send', 'pageview');
*/
