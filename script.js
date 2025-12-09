// Particle System for Ember Effect
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    update(mouseX, mouseY) {
        this.y -= this.speedY;
        if (this.y < 0) {
            this.y = canvas.height + Math.random() * 100;
            this.x = Math.random() * canvas.width;
        }

        // React to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.x += dx * 0.01;
            this.y += dy * 0.01;
        }
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ff3b00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

initParticles();
animateParticles();

// Parallax Effect on Hero
window.addEventListener('mousemove', (e) => {
    const heroBg = document.getElementById('hero-bg');
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    heroBg.style.transform = translate(${x}px, ${y}px);
});

// Audio Control
const audio = document.getElementById('kecak-audio');
const playBtn = document.getElementById('play-audio');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = 'Putar Audio';
    } else {
        audio.play();
        audio.volume = 0.25;
        playBtn.textContent = 'Pause Audio';
    }
    isPlaying = !isPlaying;
});

// Glow Effect on Audio Play
audio.addEventListener('play', () => {
    playBtn.style.boxShadow = '0 0 20px #ffae00';
});
audio.addEventListener('pause', () => {
    playBtn.style.boxShadow = '0 0 10px #ff3b00';
});

// Lokasi Buttons - Open Google Maps
document.querySelectorAll('.lokasi-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        window.open(https://www.google.com/maps/search/${encodeURIComponent(location)}, '_blank');
    });
});

// Scroll Reveal Animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .content-text, .timeline-item, .bullet-list li, .fakta-item').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Resize Canvas
window