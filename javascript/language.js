// Función para cargar las traducciones de una sección específica
function loadSectionTranslations(lang, section) {
    console.log(`Loading translations for section: ${section}, lang: ${lang}`);
    
    // El navbar y el footer son componentes comunes que pueden estar en subcarpetas o en la raíz
    // Pero en nuestro SPA, todo se carga desde index.html en la raíz.
    const basePath = '';

    return fetch(`${basePath}languages/${section}/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${section}`);
            }
            return response.json();
        })
        .then(data => {
            for (const key in data) {
                const element = document.getElementById(key);
                if (element) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = data[key];
                    } else {
                        element.textContent = data[key];
                    }
                }
            }
            return data;
        })
        .catch(error => console.error(`Error loading ${section} translations:`, error));
}

// Función principal para cargar todas las traducciones necesarias
function loadTranslations(lang) {
    // Cargar navbar siempre
    loadSectionTranslations(lang, 'navbar');

    // Determinar qué contenido principal está cargado
    // En nuestro SPA, miramos el contenido de 'content' o alguna otra pista.
    // Por ahora, intentamos cargar home o cv si existen elementos característicos
    if (document.getElementById('home-content')) {
        loadSectionTranslations(lang, 'home');
    }
    if (document.getElementById('content-container')) { // El contenedor de CV
        loadSectionTranslations(lang, 'cv');
    }
    if (document.getElementById('pruebas-container')) {
        loadSectionTranslations(lang, 'pruebas');
    }

    // También cargar index por si acaso hay elementos en el shell
    loadSectionTranslations(lang, 'index');
}

// Función para cambiar el idioma y persistirlo
function changeLanguage(language) {
    localStorage.setItem('selectedLanguage', language);
    loadTranslations(language);
}

// Obtener idioma guardado
function getSavedLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}

// Configurar los listeners del navbar
function setupLanguageListeners() {
    const langMap = {
        'english-link': 'en',
        'spanish-link': 'es',
        'italian-link': 'it',
        'french-link': 'fr',
        'japanese-link': 'ja'
    };

    for (const [id, code] of Object.entries(langMap)) {
        const link = document.getElementById(id);
        if (link) {
            link.onclick = (e) => {
                e.preventDefault();
                changeLanguage(code);
            };
        }
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = getSavedLanguage();
    // La carga inicial es manejada por index.html y components.js
});
