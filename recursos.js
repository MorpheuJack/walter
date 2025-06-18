// =========================================
// JAVASCRIPT PARA PÁGINA DE RECURSOS
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // SEÇÃO 1: SELEÇÃO DE ELEMENTOS
    // =========================================
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    // Elementos de exercício de respiração
    let breathingInterval;
    let breathingCycle = 0;
    let isBreathingActive = false;
    let breathingPhase = 'prepare'; // prepare, inhale, hold, exhale
    
    // =========================================
    // SEÇÃO 2: SISTEMA DE FILTROS
    // =========================================
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            // Filtra os cards
            filterCards(category);
        });
    });
    
    function filterCards(category) {
        resourceCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                // Animação de entrada
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // =========================================
    // SEÇÃO 3: MENU MOBILE (REUTILIZADO)
    // =========================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    function showMobileMenu() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');
            }
        }
    }
    
    function hideMobileMenu() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
            }
        }
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (sidebar && sidebar.classList.contains('active')) {
                hideMobileMenu();
            } else {
                showMobileMenu();
            }
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', hideMobileMenu);
    }
    
    // Fecha menu ao redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && sidebar && sidebar.classList.contains('active')) {
            hideMobileMenu();
        }
    });
    
    // =========================================
    // SEÇÃO 4: CONTROLE DE MODAIS
    // =========================================
    
    // Controle por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
            if (sidebar && sidebar.classList.contains('active')) {
                hideMobileMenu();
            }
        }
    });
    
    function closeAllModals() {
        const modals = document.querySelectorAll('.exercise-modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        
        // Para exercício de respiração se estiver ativo
        if (isBreathingActive) {
            stopBreathingExercise();
        }
    }
});

// =========================================
// SEÇÃO 5: FUNÇÕES DOS EXERCÍCIOS
// =========================================

// Função para abrir modal genérico
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar modal específico
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
        
        // Para exercício de respiração se for o modal de respiração
        if (modalId === 'breathingModal' && window.isBreathingActive) {
            stopBreathingExercise();
        }
    }
}

// =========================================
// EXERCÍCIO DE RESPIRAÇÃO 4-7-8
// =========================================

function openBreathingExercise() {
    openModal('breathingModal');
    resetBreathingExercise();
}

function startBreathingExercise() {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const startBtn = document.getElementById('startBreathing');
    const pauseBtn = document.getElementById('pauseBreathing');
    const cycleCounter = document.getElementById('cycleCount');
    
    if (!circle || !text) return;
    
    window.isBreathingActive = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    
    let currentCycle = 0;
    let phase = 0; // 0: inhale, 1: hold, 2: exhale, 3: pause
    const phases = [
        { name: 'Inspire', duration: 4000, class: 'inhale' },
        { name: 'Segure', duration: 7000, class: 'hold' },
        { name: 'Expire', duration: 8000, class: 'exhale' },
        { name: 'Pausa', duration: 2000, class: '' }
    ];
    
    function runPhase() {
        if (!window.isBreathingActive) return;
        
        const currentPhase = phases[phase];
        text.textContent = currentPhase.name;
        circle.className = 'breathing-circle ' + currentPhase.class;
        
        window.breathingTimeout = setTimeout(() => {
            phase = (phase + 1) % phases.length;
            
            if (phase === 0) {
                currentCycle++;
                cycleCounter.textContent = currentCycle;
                
                if (currentCycle >= 5) {
                    completeBreatheingExercise();
                    return;
                }
            }
            
            runPhase();
        }, currentPhase.duration);
    }
    
    // Countdown inicial
    let countdown = 3;
    text.textContent = `Prepare-se... ${countdown}`;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            text.textContent = `Prepare-se... ${countdown}`;
        } else {
            clearInterval(countdownInterval);
            runPhase();
        }
    }, 1000);
}

function pauseBreathingExercise() {
    const startBtn = document.getElementById('startBreathing');
    const pauseBtn = document.getElementById('pauseBreathing');
    
    window.isBreathingActive = false;
    if (window.breathingTimeout) {
        clearTimeout(window.breathingTimeout);
    }
    
    startBtn.style.display = 'inline-flex';
    pauseBtn.style.display = 'none';
    
    const text = document.getElementById('breathingText');
    const circle = document.getElementById('breathingCircle');
    
    if (text) text.textContent = 'Pausado';
    if (circle) circle.className = 'breathing-circle';
}

function resetBreathingExercise() {
    window.isBreathingActive = false;
    if (window.breathingTimeout) {
        clearTimeout(window.breathingTimeout);
    }
    
    const startBtn = document.getElementById('startBreathing');
    const pauseBtn = document.getElementById('pauseBreathing');
    const text = document.getElementById('breathingText');
    const circle = document.getElementById('breathingCircle');
    const cycleCounter = document.getElementById('cycleCount');
    
    if (startBtn) startBtn.style.display = 'inline-flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (text) text.textContent = 'Prepare-se';
    if (circle) circle.className = 'breathing-circle';
    if (cycleCounter) cycleCounter.textContent = '0';
}

function completeBreatheingExercise() {
    const text = document.getElementById('breathingText');
    const circle = document.getElementById('breathingCircle');
    
    window.isBreathingActive = false;
    
    if (text) text.textContent = 'Parabéns! ✨';
    if (circle) circle.className = 'breathing-circle';
    
    // Mostra mensagem de conclusão
    setTimeout(() => {
        if (text) text.textContent = 'Exercício Concluído';
    }, 2000);
    
    resetBreathingExercise();
}

function stopBreathingExercise() {
    window.isBreathingActive = false;
    if (window.breathingTimeout) {
        clearTimeout(window.breathingTimeout);
    }
}

// =========================================
// OUTRAS FUNÇÕES DOS EXERCÍCIOS
// =========================================

function openMeditationGuide() {
    alert('🧘‍♀️ Funcionalidade em desenvolvimento!\n\nEm breve você terá acesso a meditações guiadas personalizadas.');
}

function openGratitudeJournal() {
    openModal('gratitudeModal');
}

function openMuscleRelaxation() {
    alert('💆‍♀️ Funcionalidade em desenvolvimento!\n\nEm breve você terá acesso a exercícios de relaxamento muscular progressivo.');
}

function openEmergencyKit() {
    openModal('emergencyModal');
}

function openGroundingExercise() {
    alert('🌱 Técnica 5-4-3-2-1 em desenvolvimento!\n\nEm breve você terá acesso a exercícios de grounding interativos.');
}

function openMoodTracker() {
    alert('📊 Funcionalidade em desenvolvimento!\n\nEm breve você poderá rastrear seu humor diariamente.');
}

function openBoxBreathing() {
    alert('📦 Respiração Box em desenvolvimento!\n\nEm breve você terá acesso a mais técnicas de respiração.');
}

function openBodyScan() {
    alert('🔍 Body Scan em desenvolvimento!\n\nEm breve você terá acesso a meditações de escaneamento corporal.');
}

// =========================================
// FUNÇÕES DO KIT DE EMERGÊNCIA
// =========================================

function startEmergencyBreathing() {
    closeModal('emergencyModal');
    setTimeout(() => {
        openBreathingExercise();
        // Inicia automaticamente
        setTimeout(() => {
            startBreathingExercise();
        }, 500);
    }, 500);
}

function startGroundingNow() {
    alert('🌱 Técnica 5-4-3-2-1\n\nVamos começar:\n\n5 coisas que você pode VER\n4 coisas que você pode TOCAR\n3 coisas que você pode OUVIR\n2 coisas que você pode CHEIRAR\n1 coisa que você pode SABOREAR\n\nRespire fundo e se concentre no presente.');
}

function showAffirmations() {
    const affirmations = [
        "Você é mais forte do que imagina",
        "Este momento difícil vai passar",
        "Você merece amor e cuidado",
        "Está tudo bem não estar bem agora",
        "Você já superou desafios antes",
        "Você não está sozinho nesta jornada",
        "Cada respiração te traz mais calma",
        "Você tem o poder de se cuidar"
    ];
    
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    alert(`💝 Afirmação para você:\n\n"${randomAffirmation}"\n\nRepita esta frase algumas vezes e respire profundamente.`);
}

function showEmergencyContacts() {
    alert('📞 Contatos de Emergência:\n\n🇧🇷 CVV (Centro de Valorização da Vida)\n📱 188 (24h, gratuito)\n💬 www.cvv.org.br\n\n🏥 SAMU\n📱 192\n\n🚨 Emergência\n📱 190 (Polícia) / 193 (Bombeiros)\n\n💙 Lembre-se: Buscar ajuda é um ato de coragem!');
}

// =========================================
// DIÁRIO DE GRATIDÃO
// =========================================

function saveGratitude() {
    const textareas = document.querySelectorAll('#gratitudeModal textarea');
    let gratitudeEntries = [];
    let hasContent = false;
    
    textareas.forEach((textarea, index) => {
        const value = textarea.value.trim();
        if (value) {
            gratitudeEntries.push(`${index + 1}. ${value}`);
            hasContent = true;
        }
    });
    
    if (!hasContent) {
        alert('💝 Escreva pelo menos uma coisa pela qual você é grato!');
        return;
    }
    
    // Salva no localStorage (simulação)
    const today = new Date().toLocaleDateString('pt-BR');
    const gratitudeData = {
        date: today,
        entries: gratitudeEntries
    };
    
    // Simula salvamento
    localStorage.setItem(`gratitude_${today}`, JSON.stringify(gratitudeData));
    
    // Feedback positivo
    alert(`💝 Gratidão salva com sucesso!\n\n${gratitudeEntries.join('\n')}\n\nSua prática de gratidão foi registrada para ${today}. Continue cultivando pensamentos positivos! ✨`);
    
    // Limpa o formulário
    textareas.forEach(textarea => textarea.value = '');
    
    closeModal('gratitudeModal');
}

// =========================================
// ANIMAÇÕES E EFEITOS VISUAIS
// =========================================

// Animação de entrada dos cards
function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.resource-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Executa animação quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateCardsOnLoad, 300);
});

// Efeito de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});