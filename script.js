document.addEventListener('DOMContentLoaded', function() {
            // --- Elements ---
            const tutorialOverlay = document.getElementById('tutorialOverlay');
            const howItWorksBtn = document.getElementById('howItWorks');
            const closeTutorial = document.getElementById('closeTutorial');
            const closeTutorialBtn = document.getElementById('closeTutorialBtn');
            const startNowTutorial = document.getElementById('startNowTutorial');
            const therapyFormContainer = document.getElementById('therapyFormContainer');
            const navItems = document.querySelectorAll('.nav-item');
            const therapyForm = document.getElementById('therapyForm');
            const exploreBtn = document.getElementById('exploreBtn');
            const expandBtn = document.getElementById('expandBtn');
            const textContent = document.querySelector('.text-content');
            const heroImage = document.querySelector('.hero-image');

            // Success Modal Elements
            const successModalOverlay = document.getElementById('successModalOverlay');
            const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
            const understoodSuccessBtn = document.getElementById('understoodSuccessBtn');
            // REMOVIDAS VARIÁVEIS DO EXERCÍCIO DE RESPIRAÇÃO:
            // const startBreathingExerciseBtn = document.getElementById('startBreathingExerciseBtn');
            // const breathingCircle = document.getElementById('breathingCircle');
            // const breathingInstruction = document.getElementById('breathingInstruction');
            // let breathingInterval;
            let isExpanded = false; // For expand button

            // --- Tutorial Overlay Logic ---
            function showTutorial() {
                if (tutorialOverlay) {
                    tutorialOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }

            function hideTutorial() {
                if (tutorialOverlay) {
                    tutorialOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }

            if (howItWorksBtn) howItWorksBtn.addEventListener('click', function(e) { e.preventDefault(); showTutorial(); });
            if (closeTutorial) closeTutorial.addEventListener('click', hideTutorial);
            if (closeTutorialBtn) closeTutorialBtn.addEventListener('click', hideTutorial);
            if (tutorialOverlay) {
                tutorialOverlay.addEventListener('click', function(e) {
                    if (e.target === tutorialOverlay) hideTutorial();
                });
            }
            if (startNowTutorial) {
                startNowTutorial.addEventListener('click', function() {
                    hideTutorial();
                    if (therapyFormContainer) {
                        therapyFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        therapyFormContainer.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.5), 0 20px 40px rgba(0, 0, 0, 0.1)';
                        setTimeout(() => {
                            therapyFormContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                        }, 2000);
                    }
                });
            }
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && tutorialOverlay && tutorialOverlay.classList.contains('active')) {
                    hideTutorial();
                }
                if (e.key === 'Escape' && successModalOverlay && successModalOverlay.classList.contains('active')) {
                    hideSuccessModal();
                }
            });

            // --- Success Modal Logic ---
            function showSuccessModal() {
                if (successModalOverlay) {
                    successModalOverlay.style.display = 'flex';
                     setTimeout(() => { 
                        successModalOverlay.classList.add('active');
                        document.body.style.overflow = 'hidden'; 
                    }, 10);
                    // REMOVIDA CHAMADA A resetBreathingExercise();
                }
            }

            function hideSuccessModal() {
                if (successModalOverlay) {
                    successModalOverlay.classList.remove('active');
                    setTimeout(() => {
                        successModalOverlay.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        // REMOVIDA CHAMADA A resetBreathingExercise();
                    }, 500); 
                }
            }
            
            // REMOVIDAS FUNÇÕES startBreathingCycle e resetBreathingExercise

            if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener('click', hideSuccessModal);
            if (understoodSuccessBtn) understoodSuccessBtn.addEventListener('click', hideSuccessModal);
            // REMOVIDO EVENT LISTENER para startBreathingExerciseBtn

            if (successModalOverlay) {
                successModalOverlay.addEventListener('click', function(e) {
                    if (e.target === successModalOverlay) hideSuccessModal();
                });
            }

            // --- Navigation Items Interaction ---
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    navItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    this.style.transform = 'translateX(10px)';
                    setTimeout(() => { this.style.transform = 'translateX(5px)'; }, 150);
                });
            });

            // --- Handle Form Submission ---
            if (therapyForm) {
                therapyForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = document.getElementById('email');
                    const problemInput = document.getElementById('problem');
                    const email = emailInput ? emailInput.value : '';
                    const problem = problemInput ? problemInput.value : '';
                    
                    if (email && problem) {
                        const submitBtn = therapyForm.querySelector('.submit-btn');
                        const originalText = submitBtn ? submitBtn.innerHTML : '';
                        
                        if (submitBtn) {
                            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
                            submitBtn.disabled = true;
                        }

                        const n8nWebhookUrl = 'https://96fe-179-179-179-145.ngrok-free.app/webhook-test/1e041a43-981b-497f-9756-7ec3a4efae56'; 

                        const dataToSend = {
                            email: email,
                            problem: problem,
                            submittedAt: new Date().toISOString() 
                        };

                        fetch(n8nWebhookUrl, {
                 // O método da requisição: estamos ENVIANDO dados.
                    method: 'POST',

    // Os cabeçalhos: informações extras sobre a requisição.
                    headers: {
        // Avisa ao servidor que estamos enviando dados em formato JSON.
                        'Content-Type': 'application/json',

        // O cabeçalho especial para pular a tela de aviso do ngrok.
                        'ngrok-skip-browser-warning': 'true'
        },

    // O corpo da requisição: os dados em si, convertidos para texto JSON.
                    body: JSON.stringify(dataToSend),
})
.then(response => {
    if (!response.ok) {
        return response.text().then(text => { throw new Error(text || `A resposta da rede não foi 'ok': ${response.statusText}`) });
    }
    return response.json();
})
.then(data => {
    console.log('Sucesso! Enviado para o n8n:', data);
    // Sua lógica de sucesso aqui...
    showSuccessModal(); 
})
.catch((error) => {
    console.error('Erro ao enviar dados para o n8n:', error);
    alert('Houve um problema ao enviar seus dados. Detalhe: ' + error.message);
    // Sua lógica de erro aqui...
});
                    }
                });
            }

            // --- Explore Button Interaction ---
            if (exploreBtn) {
                exploreBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                    setTimeout(() => { this.style.transform = 'translateY(-2px)'; }, 200);
                    setTimeout(() => {
                        if(therapyFormContainer) therapyFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                });
            }

            // --- Expand Button Functionality ---
            if (expandBtn) {
                expandBtn.addEventListener('click', function() {
                    if (!isExpanded) {
                        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
                        else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen();
                        else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();
                        this.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
                        isExpanded = true;
                    } else {
                        if (document.exitFullscreen) document.exitFullscreen();
                        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                        else if (document.msExitFullscreen) document.msExitFullscreen();
                        this.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
                        isExpanded = false;
                    }
                });
            }

            function handleFullscreenChange() {
                if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    if (expandBtn) expandBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
                    isExpanded = false;
                }
            }
            document.addEventListener('fullscreenchange', handleFullscreenChange);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.addEventListener('msfullscreenchange', handleFullscreenChange);

            // --- Parallax Effect ---
            let mouseX = 0;
            let mouseY = 0;
            document.addEventListener('mousemove', function(e) {
                mouseX = (e.clientX / window.innerWidth) * 100;
                mouseY = (e.clientY / window.innerHeight) * 100;
            });

            // --- Smooth Entrance Animation ---
            if (textContent) {
                textContent.style.opacity = '0';
                textContent.style.transform = 'translateY(30px)';
                textContent.style.transition = 'all 0.8s ease';
                setTimeout(() => {
                    textContent.style.opacity = '1';
                    textContent.style.transform = 'translateY(0)';
                }, 300);
            }
            if (heroImage) {
                heroImage.style.opacity = '0';
                heroImage.style.transform = 'translateY(30px)';
                heroImage.style.transition = 'all 0.8s ease';
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                    heroImage.style.transform = 'translateY(0)';
                }, 600);
            }
        });

        // --- Add Dynamic Background Animation ---
        function createFloatingParticles() {
            const container = document.querySelector('.main-container');
            if (!container) return;
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = 'rgba(255, 255, 255, 0.1)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1'; 
                particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`;
                particle.style.animationDelay = Math.random() * 10 + 's';
                
                container.appendChild(particle);
            }
        }

        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes particleFloat {
                0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                25% { transform: translateY(${Math.random()*20-10}px) translateX(${Math.random()*20-10}px) rotate(90deg); }
                50% { transform: translateY(${Math.random()*20-10}px) translateX(${Math.random()*20-10}px) rotate(180deg); }
                75% { transform: translateY(${Math.random()*20-10}px) translateX(${Math.random()*20-10}px) rotate(270deg); }
                100% { transform: translateY(0px) translateX(0px) rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createFloatingParticles);
        } else {
            createFloatingParticles();
        }