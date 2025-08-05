document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE MÚLTIPLOS IDIOMAS ---
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

    // --- LÓGICA SIMPLES PARA DESBLOQUEAR O CARD (SEM ANÚNCIOS) ---
    const allLinkCards = document.querySelectorAll('.link-card');

    allLinkCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const ctaButton = card.querySelector('.info-cta');

        function toggleUnlock(event) {
            event.stopPropagation();
            card.classList.toggle('unlocked');
        }
        
        // Adiciona o evento de clique tanto no cabeçalho quanto no botão do card
        if (header) header.addEventListener('click', toggleUnlock);
        if (ctaButton) ctaButton.addEventListener('click', toggleUnlock);
    });
});
