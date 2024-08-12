document.addEventListener('DOMContentLoaded', function() {
    function highlightActiveLink() {
        const currentLocation = window.location.href;
        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            if (currentLocation.includes(link.getAttribute('href')) || 
                (currentLocation.endsWith('#home') && link.getAttribute('data-target') === 'home') || 
                (currentLocation.endsWith('#cv') && link.getAttribute('data-target') === 'cv') || 
                (currentLocation.endsWith('#pruebas') && link.getAttribute('data-target') === 'pruebas') || 
                (!window.location.hash && link.getAttribute('data-target') === 'home')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function addNavLinkListeners() {
        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetSection = this.getAttribute('data-target');
                if (targetSection) {
                    loadComponentWithAnimation('content', `html/${targetSection}.html`);
                    updateURL(targetSection);
                    setActiveLink(this);
                }
            });
        });
    }

    function loadNavbarTranslations(lang) {
        fetch(`../languages/navbar/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                const siteName = document.getElementById('site-name');
                if (siteName) siteName.textContent = data.siteName;

                const homeLink = document.getElementById('home-link');
                if (homeLink) homeLink.textContent = data.homeLink;

                const cvLink = document.getElementById('cv-link');
                if (cvLink) cvLink.textContent = data.cvLink;

                const pruebasLink = document.getElementById('pruebas-link');
                if (pruebasLink) pruebasLink.textContent = data.pruebasLink;

                const languageLink = document.getElementById('language-link');
                if (languageLink) languageLink.textContent = data.languageLink;

                const englishLink = document.getElementById('english-link');
                if (englishLink) englishLink.textContent = data.englishLink;

                const spanishLink = document.getElementById('spanish-link');
                if (spanishLink) spanishLink.textContent = data.spanishLink;
            })
            .catch(error => console.error('Error loading navbar translations:', error));
    }

    // Evita cargar el navbar si ya está presente en el DOM
    if (!document.getElementById('navbar')) {
        loadComponent('navbar', 'html/navbar.html');
    }

    const savedLanguage = getSavedLanguage();
    loadNavbarTranslations(savedLanguage);
    highlightActiveLink();
    addNavLinkListeners();
});
