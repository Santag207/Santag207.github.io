function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const content = document.getElementById(id);

            // Aplicar animación de salida
            content.classList.remove('slide-in');
            content.classList.add('slide-out');

            // Esperar a que la animación de salida termine
            setTimeout(() => {
                // Actualizar el contenido solo una vez
                content.innerHTML = data;

                // Si es el navbar, actualizar los enlaces
                if (id === 'navbar') {
                    highlightActiveLink();
                    addNavLinkListeners();
                }

                // Remover la clase de salida y aplicar la clase oculta brevemente
                content.classList.remove('slide-out');
                content.classList.add('hidden');

                // Después de un breve retraso, mostrar el contenido con la animación de entrada
                setTimeout(() => {
                    content.classList.remove('hidden');
                    content.classList.add('slide-in');
                }, 100);
            }, 500); // Tiempo para la animación de salida
        })
        .catch(error => console.error('Error loading component:', error));
}
