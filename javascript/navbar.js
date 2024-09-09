function highlightActiveLink() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentLocation = window.location.href;
    let homeLinkSet = false;

    // Primero, elimina la clase 'active' de todos los enlaces
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Ahora, verifica cuál debe estar activo
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const target = link.getAttribute('data-target');

        // Si no hay hash en la URL, activa el enlace de "Home"
        if (!window.location.hash && target === 'home' && !homeLinkSet) {
            link.classList.add('active');
            homeLinkSet = true; // Asegúrate de que sólo se active una vez
        }

        // Si el hash coincide con el data-target del enlace, actívalo
        if (window.location.hash === `#${target}`) {
            link.classList.add('active');
        }
    });
}

function addNavLinkListeners() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
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

function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    highlightActiveLink();
    addNavLinkListeners();
});
