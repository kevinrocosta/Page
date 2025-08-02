document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA PARA TROCAR O IDIOMA ---
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

    // --- LÓGICA SIMPLIFICADA PARA DESBLOQUEAR O CARD (SEM MONETIZAÇÃO) ---
    const allLinkCards = document.querySelectorAll('.link-card');

    allLinkCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const ctaButton = card.querySelector('.info-cta');

        function toggleUnlock(event) {
            // Impede que o clique se propague para outros elementos
            event.stopPropagation();
            
            // Simplesmente alterna a classe 'unlocked' para mostrar/esconder a dica
            card.classList.toggle('unlocked');
        }
        
        // Adiciona o evento de clique tanto no cabeçalho quanto no botão do card
        if (header) header.addEventListener('click', toggleUnlock);
        if (ctaButton) ctaButton.addEventListener('click', toggleUnlock);
    });
});
