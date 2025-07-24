document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA TROCAR O IDIOMA ---
    const languageButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang]');

    // Define o idioma inicial com base no botão ativo
    const initialLang = document.querySelector('.lang-btn.active')?.dataset.setLang || 'pt';
    switchLanguage(initialLang);
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.setLang;
            
            // Remove a classe 'active' de todos os botões
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');
            
            // Chama a função para trocar o idioma
            switchLanguage(selectedLang);
        });
    });

    function switchLanguage(lang) {
        translatableElements.forEach(element => {
            if (element.dataset.lang === lang) {
                element.style.display = 'block'; // ou 'inline', 'flex', etc., dependendo do elemento
            } else {
                element.style.display = 'none';
            }
        });
        // Garante que elementos com o mesmo texto (como os títulos) não fiquem sobrepostos
        const subtitles = document.querySelectorAll('.subtitle');
        subtitles.forEach(el => el.style.display = (el.dataset.lang === lang) ? 'block' : 'none');
    }


    // --- LÓGICA PARA DESBLOQUEAR O CARD ---
    const revealButtons = document.querySelectorAll('.reveal-info');
    const clickableAreas = document.querySelectorAll('.clickable-area');

    function toggleUnlock(cardElement) {
        if (cardElement) {
            cardElement.classList.toggle('unlocked');
        }
    }

    revealButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique se propague para outros elementos
            const card = button.closest('.link-card');
            toggleUnlock(card);
        });
    });
    
    // Adiciona funcionalidade de clique na área do cabeçalho do card
    clickableAreas.forEach(area => {
        area.addEventListener('click', () => {
            const card = area.closest('.link-card');
            toggleUnlock(card);
        });
    });

});
