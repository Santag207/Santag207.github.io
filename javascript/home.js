// Inicializa el Spline en el canvas
function initializeSpline() {
    const canvas = document.getElementById('canvas3d');
    if (canvas) {
        const app = new window.Spline.Application(canvas);
        app.load('https://prod.spline.design/R66pP8fFpIYgIHF6/scene.splinecode');
    }
}

// Carga las traducciones de la página de inicio
function loadHomeTranslations(lang) {
    fetch(`../languages/home/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('welcome-message').textContent = data.welcomeMessage;
            document.getElementById('links-heading').textContent = data.linksHeading;
            document.getElementById('name').textContent = data.name;
            document.getElementById('git-name').textContent = data.gitName;
            document.getElementById('career').textContent = data.career;
        })
        .catch(error => console.error('Error loading home translations:', error));
}

// Listener para cambiar el idioma desde el menú del navbar
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('navbar', '../html/navbar.html').then(() => {
        const englishLink = document.getElementById('english-link');
        const spanishLink = document.getElementById('spanish-link');

        if (englishLink && spanishLink) {
            englishLink.addEventListener('click', function() {
                changeLanguage('en');
            });

            spanishLink.addEventListener('click', function() {
                changeLanguage('es');
            });

            // Inicializa la página con el idioma guardado o predeterminado
            const savedLanguage = getSavedLanguage();
            loadHomeTranslations(savedLanguage);
        } else {
            console.error('No se encontraron los enlaces de idioma en el DOM.');
        }
    }).catch(error => {
        console.error('Error loading navbar:', error);
    });

    // Inicializa Spline si el canvas está presente
    initializeSpline();
});



// Cambia el idioma de la página home y guarda la preferencia
function changeLanguage(language) {
    loadHomeTranslations(language);
    saveLanguagePreference(language);
}

// Guarda la preferencia de idioma en localStorage
function saveLanguagePreference(language) {
    localStorage.setItem('selectedLanguage', language);
}

// Obtiene el idioma guardado de localStorage
function getSavedLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}
