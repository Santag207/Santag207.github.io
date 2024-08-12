function loadComponent(id, file) {
    return fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const content = document.getElementById(id);
            if (content) {
                content.classList.remove('slide-in');
                content.classList.add('slide-out');
                setTimeout(() => {
                    content.innerHTML = data;
                    content.classList.remove('slide-out');
                    content.classList.add('hidden');
                    setTimeout(() => {
                        content.classList.remove('hidden');
                        content.classList.add('slide-in');
                    }, 100);

                    const savedLanguage = getSavedLanguage();
                    loadTranslations(savedLanguage);  // Aplica las traducciones al nuevo contenido
                }, 500);
            } else {
                console.error(`El elemento con id "${id}" no se encontró en el DOM.`);
            }
        })
        .catch(error => console.error('Error loading component:', error));
}
