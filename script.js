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
            const displayStyle = el.classList.contains('action-link') ? 'inline-block' : 'block';
            el.style.display = displayStyle;
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

    // --- LÓGICA PARA DESBLOQUEAR O CARD (com monetização) ---
    const allLinkCards = document.querySelectorAll('.link-card');

    allLinkCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const ctaButton = card.querySelector('.info-cta');

        function toggleUnlock(event) {
            event.stopPropagation();
            
            // Abre o anúncio SOMENTE na primeira vez que o card for desbloqueado
            if (!card.classList.contains('unlocked')) {
                const monetagDirectLink = "https://otieu.com/4/9628559"; // SEU LINK DIRETO
                window.open(monetagDirectLink, '_blank');
            }
            
            // Adiciona ou remove a classe .unlocked para o CSS fazer a animação
            card.classList.toggle('unlocked');
        }
        
        if (header) header.addEventListener('click', toggleUnlock);
        if (ctaButton) ctaButton.addEventListener('click', toggleUnlock);
    });
});
