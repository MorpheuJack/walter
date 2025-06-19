// ===== MENU MOBILE E SIDEBAR (igual ao index) =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navItems = document.querySelectorAll('.nav-item');

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
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (sidebar && sidebar.classList.contains('active')) {
                hideMobileMenu();
            }
        });
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && sidebar && sidebar.classList.contains('active')) {
            hideMobileMenu();
        }
    });
});

// Base de dados dos livros
        const livros = [
            {
                id: 1,
                titulo: "O Futuro da Tecnologia",
                autor: "Maria Silva",
                categoria: "tecnologia",
                icone: "fas fa-robot",
                cor: "linear-gradient(45deg, #667eea, #764ba2)",
                conteudo: {
                    capitulos: [
                        {
                            titulo: "Capítulo 1: A Era da Inteligência Artificial",
                            texto: `
                                <p>Vivemos em uma época de transformações extraordinárias, onde a inteligência artificial não é mais ficção científica, mas uma realidade que permeia nosso cotidiano. Desde os assistentes virtuais em nossos smartphones até os algoritmos que recomendam filmes e produtos, a IA está redefinindo como interagimos com a tecnologia.</p>
                                
                                <p>Esta revolução silenciosa começou décadas atrás, nos laboratórios de universidades e empresas visionárias. Pesquisadores trabalharam incansavelmente para criar máquinas capazes de pensar, aprender e tomar decisões de forma autônoma. O que antes era considerado impossível agora é parte integral de nossas vidas.</p>
                                
                                <p>A inteligência artificial moderna baseia-se em redes neurais profundas, inspiradas no funcionamento do cérebro humano. Estas redes podem processar quantidades massivas de dados, identificar padrões complexos e fazer previsões com precisão impressionante.</p>
                            `
                        },
                        {
                            titulo: "Capítulo 2: Impactos na Sociedade",
                            texto: `
                                <p>Os impactos da tecnologia moderna na sociedade são profundos e multifacetados. Desde a democratização do acesso à informação até a transformação dos modelos de trabalho, estamos testemunhando uma revolução sem precedentes.</p>
                                
                                <p>A educação, por exemplo, foi completamente reimaginada. Plataformas de aprendizado online permitem que pessoas em qualquer lugar do mundo tenham acesso a conhecimento de alta qualidade. A personalização do ensino, auxiliada por algoritmos inteligentes, está tornando a educação mais eficaz e acessível.</p>
                                
                                <p>No mundo dos negócios, a automação está otimizando processos e liberando os trabalhadores para tarefas mais criativas e estratégicas. Embora isso gere desafios, também cria oportunidades para o desenvolvimento de novas habilidades e profissões.</p>
                            `
                        }
                    ]
                }
            },
            {
                id: 2,
                titulo: "Jornada ao Centro da Terra",
                autor: "Júlio Verne",
                categoria: "ficção",
                icone: "fas fa-mountain",
                cor: "linear-gradient(45deg, #f093fb, #f5576c)",
                conteudo: {
                    capitulos: [
                        {
                            titulo: "Capítulo 1: A Descoberta",
                            texto: `
                                <p>Era uma manhã ensolarada quando o Professor Lidenbrock irrompeu em sua casa com uma descoberta extraordinária. Em suas mãos tremia um pergaminho antigo, repleto de runas misteriosas que prometiam revelar segredos há muito perdidos.</p>
                                
                                <p>"Axel!" gritou ele para seu sobrinho, "Venha ver isto! Este documento pode mudar tudo o que sabemos sobre nosso planeta!" O jovem Axel correu para ver o que havia deixado seu tio em tal estado de agitação.</p>
                                
                                <p>O pergaminho, amarelado pelo tempo, continha símbolos que pareciam formar um mapa. Após horas de decifração, a mensagem ficou clara: havia uma passagem para o centro da Terra através de uma cratera vulcânica na Islândia.</p>
                            `
                        },
                        {
                            titulo: "Capítulo 2: Preparativos para a Aventura",
                            texto: `
                                <p>A preparação para uma jornada tão extraordinária exigia cuidado meticuloso. O Professor Lidenbrock não era homem de deixar nada ao acaso, e cada item de equipamento foi escolhido com precisão científica.</p>
                                
                                <p>Instrumentos de navegação, cordas resistentes, lanternas especiais, provisões para semanas de viagem - tudo foi cuidadosamente empacotado. Axel observava os preparativos com uma mistura de admiração e apreensão, sabendo que em breve embarcaria na aventura de sua vida.</p>
                                
                                <p>Hans, o guia islandês, juntou-se à expedição. Homem de poucas palavras, mas de grande experiência nas montanhas e vulcões da região, ele seria essencial para o sucesso da missão.</p>
                            `
                        }
                    ]
                }
            },
            {
                id: 3,
                titulo: "Estratégias de Liderança",
                autor: "Carlos Santos",
                categoria: "negócios",
                icone: "fas fa-crown",
                cor: "linear-gradient(45deg, #4facfe, #00f2fe)",
                conteudo: {
                    capitulos: [
                        {
                            titulo: "Capítulo 1: Os Pilares da Liderança Moderna",
                            texto: `
                                <p>A liderança do século XXI exige uma abordagem fundamentalmente diferente daquela praticada em décadas passadas. Não se trata mais de comando e controle, mas de inspiração e empoderamento. Os líderes modernos devem ser catalisadores de mudança, facilitadores de crescimento e visionários do futuro.</p>
                                
                                <p>O primeiro pilar da liderança moderna é a autenticidade. Líderes autênticos são aqueles que permanecem fiéis aos seus valores e princípios, mesmo quando enfrentam pressões para agir de forma contrária. Esta autenticidade cria confiança e respeito, elementos fundamentais para qualquer relação de liderança bem-sucedida.</p>
                                
                                <p>O segundo pilar é a adaptabilidade. Em um mundo em constante mudança, líderes devem ser capazes de se ajustar rapidamente a novas circunstâncias, aprender com os erros e pivotar quando necessário. A rigidez é o inimigo da liderança eficaz.</p>
                            `
                        },
                        {
                            titulo: "Capítulo 2: Construindo Times de Alto Desempenho",
                            texto: `
                                <p>A construção de times de alto desempenho é uma arte que combina ciência comportamental, estratégia organizacional e intuição humana. Líderes excepcionais entendem que o todo é sempre maior que a soma das partes, e trabalham incansavelmente para criar sinergia entre os membros de sua equipe.</p>
                                
                                <p>O primeiro elemento para construir um time de alto desempenho é a seleção cuidadosa de talentos. Não se trata apenas de contratar as pessoas mais qualificadas tecnicamente, mas de encontrar indivíduos que compartilhem os valores da organização e tenham a mentalidade colaborativa necessária para o trabalho em equipe.</p>
                                
                                <p>Após a formação do time, o desenvolvimento contínuo torna-se crucial. Isso inclui treinamentos regulares, feedback construtivo, definição clara de objetivos e criação de oportunidades para que cada membro possa contribuir com seus pontos fortes únicos.</p>
                            `
                        }
                    ]
                }
            },
            {
                id: 4,
                titulo: "Mindset de Crescimento",
                autor: "Ana Costa",
                categoria: "autoajuda",
                icone: "fas fa-seedling",
                cor: "linear-gradient(45deg, #43e97b, #38f9d7)",
                conteudo: {
                    capitulos: [
                        {
                            titulo: "Capítulo 1: A Mentalidade que Transforma",
                            texto: `
                                <p>O conceito de mindset de crescimento revolucionou nossa compreensão sobre o potencial humano. Desenvolvido pela psicóloga Carol Dweck, este conceito sugere que nossas habilidades e inteligência não são fixas, mas podem ser desenvolvidas através de dedicação, trabalho duro e aprendizado contínuo.</p>
                                
                                <p>Pessoas com mindset de crescimento veem desafios como oportunidades de aprendizado, abraçam o esforço como caminho para a maestria e encontram inspiração no sucesso dos outros. Elas entendem que o fracasso não é uma reflexão de sua capacidade, mas sim uma etapa natural do processo de crescimento.</p>
                                
                                <p>Em contraste, aqueles com mindset fixo acreditam que suas qualidades são traços estáticos. Eles tendem a evitar desafios, desistem facilmente quando enfrentam obstáculos e veem o esforço como sinal de inadequação. Esta mentalidade limita significativamente o potencial de crescimento pessoal e profissional.</p>
                            `
                        },
                        {
                            titulo: "Capítulo 2: Desenvolvendo Resiliência",
                            texto: `
                                <p>A resiliência é talvez a qualidade mais importante para navegar pelas complexidades da vida moderna. Não se trata de ser inquebrantável, mas de ter a capacidade de se recuperar, aprender e crescer a partir das adversidades. É a diferença entre ser derrotado por um obstáculo ou usá-lo como trampolim para o próximo nível.</p>
                                
                                <p>Desenvolver resiliência começa com a mudança de perspectiva sobre os problemas. Em vez de ver dificuldades como ameaças, pessoas resilientes as veem como desafios a serem superados. Esta mudança mental fundamental transforma a experiência emocional e abre caminho para soluções criativas.</p>
                                
                                <p>A prática da gratidão também desempenha um papel crucial no desenvolvimento da resiliência. Quando focamos no que temos de positivo em nossas vidas, criamos uma base emocional sólida que nos sustenta durante tempos difíceis. Esta não é uma negação dos problemas, mas sim uma estratégia para manter equilíbrio e perspectiva.</p>
                            `
                        }
                    ]
                }
            },
            {
                id: 5,
                titulo: "Algoritmos e Estruturas de Dados",
                autor: "Roberto Lima",
                categoria: "tecnologia",
                icone: "fas fa-code",
                cor: "linear-gradient(45deg, #fa709a, #fee140)",
                conteudo: {
                    capitulos: [
                        {
                            titulo: "Capítulo 1: Fundamentos dos Algoritmos",
                            texto: `
                                <p>Algoritmos são a essência da ciência da computação e da programação moderna. Eles representam sequências finitas de instruções bem definidas que resolvem problemas específicos ou executam tarefas computacionais. Compreender algoritmos é fundamental para qualquer pessoa que deseje dominar a arte da programação.</p>
                                
                                <p>A eficiência algorítmica é medida principalmente através da análise de complexidade temporal e espacial. A notação Big O nos permite comparar algoritmos de forma objetiva, ajudando-nos a escolher a melhor solução para cada situação específica. Um algoritmo O(n) será sempre mais eficiente que um O(n²) para grandes conjuntos de dados.</p>
                                
                                <p>Algoritmos de ordenação, como QuickSort e MergeSort, ilustram perfeitamente a importância da eficiência. Enquanto algoritmos simples como BubbleSort têm complexidade O(n²), algoritmos mais sofisticados conseguem atingir O(n log n), uma diferença que se torna crucial ao trabalhar com milhões de registros.</p>
                            `
                        },
                        {
                            titulo: "Capítulo 2: Estruturas de Dados Fundamentais",
                            texto: `
                                <p>Estruturas de dados são formas organizadas de armazenar e acessar informações em um programa. A escolha da estrutura de dados adequada pode significar a diferença entre um programa eficiente e um que consome recursos desnecessariamente. Arrays, listas ligadas, pilhas, filas, árvores e grafos são as estruturas fundamentais que todo programador deve dominar.</p>
                                
                                <p>Arrays oferecem acesso rápido por índice (O(1)), mas inserções e remoções no meio da estrutura são custosas (O(n)). Listas ligadas facilitam inserções e remoções (O(1) se tivermos a referência), mas o acesso a elementos específicos requer percorrer a lista (O(n)).</p>
                                
                                <p>Estruturas mais complexas como árvores binárias de busca combinam as vantagens de arrays e listas ligadas, oferecendo operações de busca, inserção e remoção em O(log n) quando balanceadas. Hash tables levam essa eficiência ainda mais longe, proporcionando operações O(1) na média.</p>
                            `
                        }
                    ]
                }
            },
            {
                id: 6,
                titulo: "O Mistério da Casa Vitoriana",
                autor: "Elena Rodriguez",
                categoria: "ficção",
                icone: "fas fa-home",
                cor: "linear-gradient(45deg, #a8edea, #fed6e3)",
                conteudo: {
                    capitulos: [
                        {
                            titulo: "Capítulo 1: A Herança Inesperada",
                            texto: `
                                <p>Sarah nunca imaginou que receberia uma ligação que mudaria sua vida para sempre. A voz do advogado ao telefone parecia distante e formal: "Srta. Morgan, a senhora herdou uma propriedade de sua tia-avó Margaret, que faleceu recentemente. É uma casa vitoriana em Salem, Massachusetts."</p>
                                
                                <p>Margaret era uma figura misteriosa na família, uma tia-avô que Sarah conhecia apenas através de histórias sussurradas durante reuniões familiares. Diziam que ela era excêntrica, que vivia isolada em sua grande casa, rodeada de livros antigos e artefatos curiosos.</p>
                                
                                <p>Duas semanas depois, Sarah encontrou-se diante de uma imponente casa vitoriana de três andares, com janelas em arco e uma torre que se estendia em direção ao céu cinzento. A tinta descascada e os jardins selvagens contavam a história de anos de abandono, mas ainda assim havia uma majestade inegável na estrutura.</p>
                                
                                <p>Ao abrir a porta da frente com a chave antiga que o advogado lhe havia entregue, Sarah foi recebida pelo cheiro de madeira velha e algo mais - uma fragrância floral quase imperceptível que parecia flutuar pelos corredores escuros.</p>
                            `
                        },
                        {
                            titulo: "Capítulo 2: Segredos nos Papéis de Parede",
                            texto: `
                                <p>A exploração da casa revelou camadas de história em cada cômodo. No escritório do segundo andar, Sarah descobriu uma biblioteca impressionante, com milhares de livros organizados em estantes que iam do chão ao teto. Era como se Margaret tivesse criado seu próprio mundo de conhecimento e mistério.</p>
                                
                                <p>Foi enquanto movia alguns livros que Sarah notou algo estranho - uma seção do papel de parede atrás da estante principal parecia diferente. Ao pressionar suavemente, descobriu que era na verdade uma porta secreta que se abria para um compartimento oculto.</p>
                                
                                <p>Dentro do compartimento, Sarah encontrou um diário encadernado em couro vermelho e uma coleção de fotografias antigas. As primeiras páginas do diário continham a letra elegante de Margaret, relatando eventos que pareciam impossíveis - encontros com figuras históricas, viagens a lugares que não existiam em mapas convencionais.</p>
                            `
                        }
                    ]
                }
            }
        ];

        // Estado atual dos filtros
        let categoriaAtiva = 'todos';

        // Inicialização da página
        document.addEventListener('DOMContentLoaded', function() {
            renderizarLivros();
            configurarEventListeners();
        });

        // Função para renderizar os livros
        function renderizarLivros() {
            const grid = document.getElementById('livrosGrid');
            const livrosFiltrados = categoriaAtiva === 'todos' 
                ? livros 
                : livros.filter(livro => livro.categoria === categoriaAtiva);

            grid.innerHTML = '';

            livrosFiltrados.forEach((livro, index) => {
                const card = document.createElement('div');
                card.className = 'livro-card';
                card.style.animationDelay = `${index * 0.1}s`;
                card.dataset.livroId = livro.id;

                card.innerHTML = `
                    <div class="livro-cover" style="background: ${livro.cor}">
                        <i class="${livro.icone}"></i>
                    </div>
                    <div class="livro-info">
                        <h3>${livro.titulo}</h3>
                        <p class="autor">por ${livro.autor}</p>
                        <span class="categoria">${livro.categoria.charAt(0).toUpperCase() + livro.categoria.slice(1)}</span>
                    </div>
                `;

                card.addEventListener('click', () => abrirLivro(livro));
                grid.appendChild(card);
            });
        }

        // Função para configurar event listeners
        function configurarEventListeners() {
            // Filtros
            const filtros = document.querySelectorAll('.filtro-btn');
            filtros.forEach(filtro => {
                filtro.addEventListener('click', function() {
                    filtros.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                    categoriaAtiva = this.dataset.categoria;
                    renderizarLivros();
                });
            });

            // Fechar popup
            document.getElementById('closeBtn').addEventListener('click', fecharPopup);
            document.getElementById('popupOverlay').addEventListener('click', function(e) {
                if (e.target === this) {
                    fecharPopup();
                }
            });

            // Fechar popup com ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    fecharPopup();
                }
            });
        }

        // Função para abrir o popup de leitura
        function abrirLivro(livro) {
            const popup = document.getElementById('popupOverlay');
            const titulo = document.getElementById('popupTitle');
            const autor = document.getElementById('popupAutor');
            const corpo = document.getElementById('popupBody');

            titulo.textContent = livro.titulo;
            autor.textContent = `por ${livro.autor}`;

            // Renderizar conteúdo do livro
            let conteudoHTML = '';
            livro.conteudo.capitulos.forEach(capitulo => {
                conteudoHTML += `
                    <div class="capitulo">
                        <h4>${capitulo.titulo}</h4>
                        ${capitulo.texto}
                    </div>
                `;
            });

            corpo.innerHTML = conteudoHTML;
            
            // Mostrar popup com animação
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Função para fechar o popup
        function fecharPopup() {
            const popup = document.getElementById('popupOverlay');
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Animação de entrada dos cards
        function animarCards() {
            const cards = document.querySelectorAll('.livro-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }

        // Efeito parallax suave nas shapes de fundo
        document.addEventListener('mousemove', function(e) {
            const shapes = document.querySelectorAll('.shape');
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX * speed);
                const y = (mouseY * speed);
                
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
