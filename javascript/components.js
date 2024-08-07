function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const content = document.getElementById(id);
            content.classList.remove('slide-in');
            content.classList.add('slide-out');
            setTimeout(() => {
                fetch(file)
                    .then(response => response.text())
                    .then(newData => {
                        content.innerHTML = newData;
                        if (id === 'navbar') {
                            highlightActiveLink();
                            addNavLinkListeners();
                        }
                        if (id === 'content' && file.includes('home.html')) {
                            initializeSpline();
                        }
                        content.classList.remove('slide-out');
                        content.classList.add('hidden');
                        setTimeout(() => {
                            content.classList.remove('hidden');
                            content.classList.add('slide-in');
                        }, 100);
                    })
                    .catch(error => console.error('Error loading component:', error));
            }, 500);
        })
        .catch(error => console.error('Error loading component:', error));
}
