document.addEventListener('DOMContentLoaded', function() {
    loadComponent('navbar', '../html/navbar.html').then(() => {
        const englishLink = document.getElementById('english-link');
        const spanishLink = document.getElementById('spanish-link');
        const dropdown = document.querySelector('.dropdown');
        const dropdownContent = document.querySelector('.dropdown-content');
        const navbarContainer = document.querySelector('.navbar-container');

        if (englishLink && spanishLink) {
            englishLink.addEventListener('click', function() {
                changeLanguage('en');
            });

            spanishLink.addEventListener('click', function() {
                changeLanguage('es');
            });

            const savedLanguage = getSavedLanguage();
            changeLanguage(savedLanguage);
        } else {
            console.error('No se encontraron los enlaces de idioma en el DOM.');
        }

        // Verificar si dropdown existe
        if (dropdown) {
            // Evento para mostrar las opciones del dropdown y expandir el navbar
            dropdown.addEventListener('click', function(event) {
                event.stopPropagation();  
                dropdown.classList.toggle('open');  
                if (dropdown.classList.contains('open')) {
                    navbarContainer.classList.add('expanded');
                } else {
                    navbarContainer.classList.remove('expanded');
                }
            });

            // Cerrar el dropdown si se hace clic fuera de él
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('open');
                    navbarContainer.classList.remove('expanded'); 
                }
            });

            // Asegurar que el dropdown se cierre cuando se haga clic en un enlace
            dropdownContent.addEventListener('click', function(event) {
                dropdown.classList.remove('open');
                navbarContainer.classList.remove('expanded'); 
            });
        } else {
            console.error('El elemento .dropdown no se encontró en el DOM.');
        }

        // Cargar traducciones y resaltar el enlace activo
        const savedLanguage = getSavedLanguage(); 
        loadNavbarTranslations(savedLanguage);
        highlightActiveLink();
        addNavLinkListeners();
    });
});

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
                loadComponentWithAnimation('content', `../html/${targetSection}.html`);
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
