document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA TROCAR O IDIOMA (COM MEMÓRIA) ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang]');
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';

    function setLanguage(lang) {
        translatableElements.forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
            el.style.display = 'block';
        });
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.setLang === lang);
        });
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.setLang);
        });
    });

    setLanguage(savedLang);

    // --- LÓGICA PARA DESBLOQUEAR O CARD ---
    const allLinkCards = document.querySelectorAll('.link-card');

    allLinkCards.forEach(card => {
        const revealButton = card.querySelector('.reveal-info');
        const clickableArea = card.querySelector('.clickable-area');
        
        // Função unificada para abrir/fechar a seção de detalhes
        function toggleUnlock(event) {
            event.stopPropagation(); // Impede que o clique se propague
            card.classList.toggle('unlocked');
        }

        // O botão "Desbloquear" e a área do cabeçalho fazem a mesma coisa
        if (revealButton) {
            revealButton.addEventListener('click', toggleUnlock);
        }
        if (clickableArea) {
            clickableArea.addEventListener('click', toggleUnlock);
        }
    });

});
