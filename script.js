document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos necessários uma única vez
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang]');
    const infoIcons = document.querySelectorAll('.reveal-info');
    const allLinkCards = document.querySelectorAll('.link-card');
    
    // Pega o idioma salvo no navegador ou usa 'pt' como padrão
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';

    // Função principal para definir o idioma da página
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

    // Adiciona o evento de clique para cada botão de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.setLang);
        });
    });

    // Adiciona o evento de clique para cada ícone de informação '?'
    infoIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault(); 
            event.stopPropagation();
            
            const parentCard = this.closest('.link-card');
            const secretInfo = parentCard.querySelector('.secret-info');
            
            if (secretInfo) {
                secretInfo.classList.toggle('visible');
            }
        });
    });

    // LÓGICA PARA TORNAR LOGO E TÍTULO CLICÁVEIS
    allLinkCards.forEach(card => {
        const clickableAreas = card.querySelectorAll('.clickable-area');
        const targetLinkElement = card.querySelector('.action-link');

        if (targetLinkElement) {
            const url = targetLinkElement.href;
            clickableAreas.forEach(area => {
                area.addEventListener('click', (event) => {
                    event.stopPropagation();
                    window.open(url, '_blank');
                });
            });
        }
    });

    // Define o idioma inicial assim que a página carrega
    setLanguage(savedLang);
});
