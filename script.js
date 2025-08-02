document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE MÚLTIPLOS IDIOMAS (Sem alterações) ---
    // (O código do seletor de idiomas continua o mesmo aqui)
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang]');
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';

    function setLanguage(lang) {
        translatableElements.forEach(el => { el.style.display = 'none'; });
        document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
            const displayStyle = (el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'SPAN') ? 'inline-block' : 'block';
            el.style.display = displayStyle;
            if (el.classList.contains('card-footer-base')) { el.style.display = 'flex'; }
            if (el.parentElement.style.display !== 'none' && el.tagName === 'SPAN') { el.style.display = 'inline'; }
        });
        langButtons.forEach(btn => { btn.classList.toggle('active', btn.dataset.setLang === lang); });
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }
    setLanguage(savedLang);
    langButtons.forEach(button => { button.addEventListener('click', () => { setLanguage(button.dataset.setLang); }); });

    // --- NOVA LÓGICA DE DESBLOQUEIO COM ANÚNCIO DINÂMICO ---

    // 1. Defina seu Direct Link da Adsterra
    const adsterraDirectLink = 'https://www.profitableratecpm.com/f2tswgnah?key=1ffb3a6a53e1fcd54e81097d1af7e4e2';

    // 2. Pega a referência do container do anúncio nativo que está no final da página
    const nativeAdContainer = document.getElementById('container-a9897e04ae61d9316737fed4ac68d971');

    const allLinkCards = document.querySelectorAll('.link-card');

    function checkUnlockedCards() {
        const unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
        unlockedCards.forEach(cardId => {
            const cardToUnlock = document.querySelector(`.link-card[data-id="${cardId}"]`);
            if (cardToUnlock) {
                cardToUnlock.classList.add('unlocked');
            }
        });
    }

    allLinkCards.forEach(card => {
        const unlockButton = card.querySelector('.info-cta');
        const cardId = card.dataset.id;
        const secretInfoDiv = card.querySelector('.secret-info'); // Onde o anúncio será inserido

        if (unlockButton && secretInfoDiv) {
            unlockButton.addEventListener('click', (event) => {
                event.stopPropagation();
                
                // Se o card já estiver desbloqueado, não faz nada
                if (card.classList.contains('unlocked')) return;

                // Abre o Direct Link em uma nova aba
                window.open(adsterraDirectLink, 'blank');

                // Adiciona a classe 'unlocked' para mostrar a dica
                card.classList.add('unlocked');

                // 3. MOVE O CONTAINER DO ANÚNCIO para dentro do card que foi clicado
                // Ele aparecerá logo após a dica (link-card-instruction)
                const instructionDiv = secretInfoDiv.querySelector('.link-card-instruction');
                if (instructionDiv) {
                    nativeAdContainer.style.display = 'block'; // Garante que o anúncio fique visível
                    instructionDiv.parentNode.insertBefore(nativeAdContainer, instructionDiv.nextSibling);
                }

                // Salva o estado no localStorage
                let unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
                if (!unlockedCards.includes(cardId)) {
                    unlockedCards.push(cardId);
                    localStorage.setItem('unlockedCards', JSON.stringify(unlockedCards));
                }
            });
        }
    });

    checkUnlockedCards();
});
