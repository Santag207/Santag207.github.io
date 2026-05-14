function loadComponent(id, file) {
    console.log(`Loading component: ${id} from ${file}`);
    return fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(id);
            if (container) {
                // Si el archivo es un documento HTML completo, extraemos solo el contenido relevante
                if (data.includes('<main') && data.includes('</main>')) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const mainContent = doc.querySelector('main');
                    if (mainContent) {
                        container.innerHTML = mainContent.innerHTML;
                    } else {
                        container.innerHTML = data;
                    }
                } else {
                    container.innerHTML = data;
                }

                const savedLanguage = getSavedLanguage();

                // Determinar qué sección cargar basándonos en el nombre del archivo
                let section = file.split('/').pop().split('.').shift();

                // Mapear nombres de archivo a secciones de traducción si es necesario
                if (section === 'navbar' || section === 'footer' || section === 'home' || section === 'cv' || section === 'pruebas') {
                    loadSectionTranslations(savedLanguage, section);
                }

                if (id === 'navbar') {
                    setupLanguageListeners();
                    highlightActiveLink();
                    addNavLinkListeners();
                }
            } else {
                console.error(`El elemento con id "${id}" no se encontró en el DOM.`);
            }
        })
        .catch(error => console.error('Error loading component:', error));
}
