// =========================================
// SISTEMA DE PARTÍCULAS INTERATIVAS
// =========================================

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        // Cria canvas para as partículas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.6';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.createParticles();
        this.animate();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 200 // Tons de azul/roxo
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Movimento das partículas
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Interação com o mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Limites da tela
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mantém dentro dos limites
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Desenha a partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 70%, ${particle.opacity})`;
            this.ctx.fill();
            
            // Conecta partículas próximas
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `hsla(${particle.hue}, 70%, 70%, ${0.1 * (1 - distance / 80)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// =========================================
// SISTEMA DE ONDAS DE ÁUDIO VISUAL
// =========================================

class AudioWaves {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerY = this.canvas.height / 2;
        const amplitude = 30;
        const frequency = 0.01;
        
        // Desenha múltiplas ondas
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, centerY);
            
            for (let x = 0; x <= this.canvas.width; x += 2) {
                const y = centerY + Math.sin(x * frequency + this.time + i * Math.PI / 3) * amplitude * (1 - i * 0.3);
                this.ctx.lineTo(x, y);
            }
            
            this.ctx.strokeStyle = `hsla(${220 + i * 20}, 70%, 70%, ${0.3 - i * 0.1})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        
        this.time += 0.02;
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// =========================================
// INICIALIZAÇÃO DO SISTEMA
// =========================================

let particleSystem = null;
let audioWaves = null;

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário prefere menos movimento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Inicializa sistemas de animação apenas se o usuário não preferir menos movimento
        particleSystem = new ParticleSystem();
        audioWaves = new AudioWaves();
    }
    
    // Cleanup ao sair da página
    window.addEventListener('beforeunload', function() {
        if (particleSystem) particleSystem.destroy();
        if (audioWaves) audioWaves.destroy();
    });
});

// =========================================
// EFEITOS DE PERFORMANCE E OTIMIZAÇÃO
// =========================================

// Pausa animações quando a aba não está ativa
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausa animações
        if (particleSystem && particleSystem.animationId) {
            cancelAnimationFrame(particleSystem.animationId);
            particleSystem.animationId = null;
        }
        if (audioWaves && audioWaves.animationId) {
            cancelAnimationFrame(audioWaves.animationId);
            audioWaves.animationId = null;
        }
    } else {
        // Retoma animações
        if (particleSystem && !particleSystem.animationId) {
            particleSystem.animate();
        }
        if (audioWaves && !audioWaves.animationId) {
            audioWaves.animate();
        }
    }
});

// Otimização para dispositivos móveis
if (window.innerWidth <= 768) {
    // Reduz a complexidade das animações em dispositivos móveis
    document.documentElement.style.setProperty('--particle-count', '20');
    document.documentElement.style.setProperty('--animation-duration', '25s');
}