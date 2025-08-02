document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE MÚLTIPLOS IDIOMAS (Sem alterações) ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang]');
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';

    function setLanguage(lang) {
        translatableElements.forEach(el => {
            el.style.display = 'none';
        });
        
        document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
            const displayStyle = (el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'SPAN') ? 'inline-block' : 'block';
            el.style.display = displayStyle;

            if (el.classList.contains('card-footer-base')) {
                el.style.display = 'flex';
            }
            if (el.parentElement.style.display !== 'none' && el.tagName === 'SPAN') {
                 el.style.display = 'inline';
            }
        });
        
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.setLang === lang);
        });

        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }
    
    setLanguage(savedLang);

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.setLang);
        });
    });

    // --- NOVA LÓGICA DE DESBLOQUEIO PERMANENTE COM DIRECT LINK ---

    // 1. Defina seu Direct Link da Adsterra aqui
    const adsterraDirectLink = 'https://www.profitableratecpm.com/f2tswgnah?key=1ffb3a6a53e1fcd54e81097d1af7e4e2';

    const allLinkCards = document.querySelectorAll('.link-card');

    // 2. Função que verifica o localStorage e desbloqueia os cards ao carregar a página
    function checkUnlockedCards() {
        const unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
        unlockedCards.forEach(cardId => {
            const cardToUnlock = document.querySelector(`.link-card[data-id="${cardId}"]`);
            if (cardToUnlock) {
                cardToUnlock.classList.add('unlocked');
            }
        });
    }

    // 3. Loop para adicionar o evento de clique em cada botão de desbloqueio
    allLinkCards.forEach(card => {
        const unlockButton = card.querySelector('.info-cta');
        const cardId = card.dataset.id; // Pega o ID único do card (ex: "chembal")

        if (unlockButton) {
            unlockButton.addEventListener('click', (event) => {
                event.stopPropagation();

                // Abre o Direct Link em uma nova aba
                window.open(adsterraDirectLink, '_blank');

                // Adiciona a classe 'unlocked' para mostrar a dica e o link da App Store
                card.classList.add('unlocked');

                // Salva o ID deste card no localStorage para que ele permaneça desbloqueado
                let unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
                if (!unlockedCards.includes(cardId)) {
                    unlockedCards.push(cardId);
                    localStorage.setItem('unlockedCards', JSON.stringify(unlockedCards));
                }
            });
        }
    });

    // 4. Executa a verificação assim que a página carrega
    checkUnlockedCards();
});
