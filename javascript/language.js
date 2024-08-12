// Función para cargar las traducciones del idioma seleccionado
function loadTranslations(lang) {
    // Determina la sección actual a partir de la URL
    const currentPage = window.location.pathname.split('/').pop().split('.').shift();
    
    fetch(`../languages/${currentPage}/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            for (const key in data) {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = data[key];
                }
            }
        })
        .catch(error => console.error('Error loading translations:', error));
}

// Función para cambiar el idioma y recargar la página con el nuevo idioma
function changeLanguage(language) {
    localStorage.setItem('selectedLanguage', language);  // Guarda el idioma en localStorage
    loadTranslations(language);  // Carga las traducciones para la página actual
}

// Función para obtener el idioma guardado o establecer uno por defecto
function getSavedLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';  // 'en' como idioma por defecto
}

document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí...
    const englishLink = document.getElementById('english-link');
    const spanishLink = document.getElementById('spanish-link');

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
});