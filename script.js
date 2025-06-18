// =========================================
// CÓDIGO JAVASCRIPT PARA PÁGINA DE TERAPIA
// =========================================

// Aguarda o carregamento completo da página antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // SEÇÃO 1: SELEÇÃO DE ELEMENTOS DO DOM
    // =========================================
    // Aqui capturamos todos os elementos HTML que vamos manipular
    
    // Elementos do tutorial/overlay
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    const howItWorksBtn = document.getElementById('howItWorks');
    const closeTutorial = document.getElementById('closeTutorial');
    const closeTutorialBtn = document.getElementById('closeTutorialBtn');
    const startNowTutorial = document.getElementById('startNowTutorial');
    
    // Elementos do formulário de terapia
    const therapyFormContainer = document.getElementById('therapyFormContainer');
    const therapyForm = document.getElementById('therapyForm');
    
    // Elementos de navegação e interação
    const navItems = document.querySelectorAll('.nav-item');
    const exploreBtn = document.getElementById('exploreBtn');
    const textContent = document.querySelector('.text-content');
    const heroImage = document.querySelector('.hero-image');

    // Elementos do modal de sucesso
    const successModalOverlay = document.getElementById('successModalOverlay');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
    const understoodSuccessBtn = document.getElementById('understoodSuccessBtn');
    
    // Elementos do menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    // NOTA: Variáveis do exercício de respiração foram removidas (comentadas no código original)
    
    // Variável de controle para o botão de expansão
    let isExpanded = false;

    // =========================================
    // SEÇÃO 2: FUNCIONALIDADES DO TUTORIAL
    // =========================================
    // Controla a exibição e ocultação do overlay de tutorial
    
    /**
     * Mostra o overlay do tutorial na tela
     * Bloqueia o scroll da página enquanto o tutorial estiver ativo
     */
    function showTutorial() {
        if (tutorialOverlay) {
            tutorialOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Impede scroll da página
        }
    }

    /**
     * Esconde o overlay do tutorial
     * Restaura o scroll normal da página
     */
    function hideTutorial() {
        if (tutorialOverlay) {
            tutorialOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaura scroll
        }
    }

    // Event Listeners para o tutorial
    if (howItWorksBtn) howItWorksBtn.addEventListener('click', function(e) { 
        e.preventDefault(); 
        showTutorial(); 
    });
    
    if (closeTutorial) closeTutorial.addEventListener('click', hideTutorial);
    if (closeTutorialBtn) closeTutorialBtn.addEventListener('click', hideTutorial);
    
    // Fecha tutorial ao clicar fora dele (no overlay)
    if (tutorialOverlay) {
        tutorialOverlay.addEventListener('click', function(e) {
            if (e.target === tutorialOverlay) hideTutorial();
        });
    }
    
    // Botão "Começar Agora" do tutorial
    if (startNowTutorial) {
        startNowTutorial.addEventListener('click', function() {
            hideTutorial(); // Fecha o tutorial
            
            // Rola suavemente até o formulário e destaca-o
            if (therapyFormContainer) {
                therapyFormContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Adiciona efeito de destaque temporário
                therapyFormContainer.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.5), 0 20px 40px rgba(0, 0, 0, 0.1)';
                
                // Remove o destaque após 2 segundos
                setTimeout(() => {
                    therapyFormContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }, 2000);
            }
        });
    }
    
    // Controle por teclado (tecla ESC)
    document.addEventListener('keydown', function(e) {
        // Fecha tutorial com ESC
        if (e.key === 'Escape' && tutorialOverlay && tutorialOverlay.classList.contains('active')) {
            hideTutorial();
        }
        // Fecha modal de sucesso com ESC
        if (e.key === 'Escape' && successModalOverlay && successModalOverlay.classList.contains('active')) {
            hideSuccessModal();
        }
        // Fecha menu mobile com ESC
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            hideMobileMenu();
        }
    });

    // =========================================
    // SEÇÃO 2.5: FUNCIONALIDADES DO MENU MOBILE
    // =========================================
    // Controla a abertura e fechamento do menu mobile
    
    /**
     * Mostra o menu mobile
     */
    function showMobileMenu() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Muda ícone do botão para X
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');
            }
        }
    }

    /**
     * Esconde o menu mobile
     */
    function hideMobileMenu() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Muda ícone do botão para hambúrguer
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
            }
        }
    }

    // Event Listeners para o menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (sidebar && sidebar.classList.contains('active')) {
                hideMobileMenu();
            } else {
                showMobileMenu();
            }
        });
    }

    // Fecha menu ao clicar no overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', hideMobileMenu);
    }

    // Fecha menu ao clicar em um item de navegação no mobile
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Verifica se está no mobile (sidebar ativa)
            if (sidebar && sidebar.classList.contains('active')) {
                hideMobileMenu();
            }
        });
    });

    // Fecha menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && sidebar && sidebar.classList.contains('active')) {
            hideMobileMenu();
        }
    });

    // =========================================
    // SEÇÃO 3: MODAL DE SUCESSO
    // =========================================
    // Controla o modal que aparece após envio bem-sucedido do formulário
    
    /**
     * Exibe o modal de sucesso com animação suave
     */
    function showSuccessModal() {
        if (successModalOverlay) {
            successModalOverlay.style.display = 'flex';
            
            // Pequeno delay para garantir que a animação CSS funcione
            setTimeout(() => { 
                successModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }, 10);
            
            // NOTA: Chamada para resetBreathingExercise() foi removida
        }
    }

    /**
     * Esconde o modal de sucesso com animação
     */
    function hideSuccessModal() {
        if (successModalOverlay) {
            successModalOverlay.classList.remove('active');
            
            // Aguarda a animação terminar antes de esconder completamente
            setTimeout(() => {
                successModalOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                // NOTA: Chamada para resetBreathingExercise() foi removida
            }, 500); 
        }
    }
    
    // NOTA: Funções startBreathingCycle e resetBreathingExercise foram removidas

    // Event Listeners para o modal de sucesso
    if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener('click', hideSuccessModal);
    if (understoodSuccessBtn) understoodSuccessBtn.addEventListener('click', hideSuccessModal);
    
    // Fecha modal ao clicar fora dele
    if (successModalOverlay) {
        successModalOverlay.addEventListener('click', function(e) {
            if (e.target === successModalOverlay) hideSuccessModal();
        });
    }

    // =========================================
    // SEÇÃO 4: INTERAÇÃO DOS ITENS DE NAVEGAÇÃO
    // =========================================
    // Adiciona efeitos visuais aos itens do menu de navegação
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove classe 'active' de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adiciona classe 'active' ao item clicado
            this.classList.add('active');
            
            // Efeito de animação: move o item para a direita e volta
            this.style.transform = 'translateX(10px)';
            setTimeout(() => { 
                this.style.transform = 'translateX(5px)'; 
            }, 150);
        });
    });

    // =========================================
    // SEÇÃO 5: ENVIO DO FORMULÁRIO
    // =========================================
    // Processa o formulário de terapia e envia dados para webhook
    
    if (therapyForm) {
        therapyForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário
            
            // Captura os valores dos campos
            const emailInput = document.getElementById('email');
            const problemInput = document.getElementById('problem');
            const email = emailInput ? emailInput.value : '';
            const problem = problemInput ? problemInput.value : '';
            
            // Verifica se ambos os campos estão preenchidos
            if (email && problem) {
                const submitBtn = therapyForm.querySelector('.submit-btn');
                const originalText = submitBtn ? submitBtn.innerHTML : '';
                
                // Muda o visual do botão para "carregando"
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
                    submitBtn.disabled = true;
                }

                // URL do webhook n8n (serviço de automação)
                const n8nWebhookUrl = 'https://7eef-191-251-95-191.ngrok-free.app/webhook/8e1b3a4a-174a-4f47-8223-2a20840d0f9b';

                // Prepara os dados para envio
                const dataToSend = {
                    email: email,
                    problem: problem,
                    submittedAt: new Date().toISOString() // Timestamp do envio
                };

                fetch(n8nWebhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify(dataToSend),
})
.then(response => {
    if (!response.ok) {
        return response.text().then(text => { 
            throw new Error(text || `A resposta da rede não foi 'ok': ${response.statusText}`) 
        });
    }
    return response.json();
})
.then(data => {
    console.log('Sucesso! Enviado para o n8n:', data);
    showSuccessModal(); // Mostra modal de sucesso
})
.catch((error) => {
    console.error('Erro ao enviar dados para o n8n:', error);
    alert('Houve um problema ao enviar seus dados. Detalhe: ' + error.message);
})
.finally(() => {
    // Restaura o botão de envio ao estado original
    if (submitBtn) {
        submitBtn.innerHTML = originalText; // Restaura texto original
        submitBtn.disabled = false; // Habilita novamente o botão
    }
});
    }
});
    }
    

    // =========================================
    // SEÇÃO 6: BOTÃO "EXPLORAR"
    // =========================================
    // Adiciona interatividade ao botão de exploração
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efeito visual: botão "salta" quando clicado
            this.style.transform = 'translateY(-5px) scale(1.05)';
            setTimeout(() => { 
                this.style.transform = 'translateY(-2px)'; 
            }, 200);
            
            // Após a animação, rola até o formulário
            setTimeout(() => {
                if(therapyFormContainer) {
                    therapyFormContainer.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 300);
        });
    }

    // =========================================
    // SEÇÃO 7: FUNCIONALIDADE DE TELA CHEIA
    // =========================================
    // Controla o botão de expandir/comprimir para tela cheia
    
    if (expandBtn) {
        expandBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Entra em tela cheia (suporte para diferentes navegadores)
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
                
                // Muda ícone para "comprimir"
                this.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
                isExpanded = true;
            } else {
                // Sai da tela cheia
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                
                // Muda ícone para "expandir"
                this.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
                isExpanded = false;
            }
        });
    }

    /**
     * Detecta quando o usuário sai da tela cheia (por ESC ou F11)
     * e atualiza o estado do botão accordingly
     */
    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (expandBtn) expandBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
            isExpanded = false;
        }
    }
    
    // Event listeners para diferentes navegadores
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    // =========================================
    // SEÇÃO 8: EFEITO PARALLAX
    // =========================================
    // Rastreia a posição do mouse para efeitos visuais
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        // Converte posição do mouse para porcentagem da tela
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    // =========================================
    // SEÇÃO 9: ANIMAÇÕES DE ENTRADA
    // =========================================
    // Cria efeitos de "fade in" suaves para elementos principais
    
    // Animação para o texto principal
    if (textContent) {
        textContent.style.opacity = '0';
        textContent.style.transform = 'translateY(30px)';
        textContent.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            textContent.style.opacity = '1';
            textContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animação para a imagem hero (com delay maior)
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateY(30px)';
        heroImage.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 600); // Delay maior para criar sequência
    }
});

// =========================================
// SEÇÃO 10: PARTÍCULAS FLUTUANTES (FUNDO)
// =========================================
// Cria efeito visual de partículas animadas no fundo

/**
 * Cria pequenas partículas flutuantes para efeito visual de fundo
 */
function createFloatingParticles() {
    const container = document.querySelector('.main-container');
    if (!container) return;
    
    // Cria 20 partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        
        // Configurações visuais da partícula
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px'; // Tamanho aleatório
        particle.style.height = particle.style.width; // Mantém formato circular
        particle.style.background = 'rgba(255, 255, 255, 0.1)'; // Branco semi-transparente
        particle.style.borderRadius = '50%'; // Formato circular
        particle.style.left = Math.random() * 100 + '%'; // Posição horizontal aleatória
        particle.style.top = Math.random() * 100 + '%'; // Posição vertical aleatória
        particle.style.pointerEvents = 'none'; // Não interfere com cliques
        particle.style.zIndex = '1'; // Fica atrás do conteúdo
        
        // Configurações de animação
        particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's'; // Delay aleatório
        
        container.appendChild(particle);
    }
}

// =========================================
// SEÇÃO 11: DEFINIÇÃO DA ANIMAÇÃO CSS
// =========================================
// Cria a animação CSS para as partículas dinamicamente

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


