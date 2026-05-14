function highlightActiveLink() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentLocation.includes(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function addNavLinkListeners() {
    const navLinks = document.querySelectorAll('nav ul li a:not([data-lang])');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const target = this.getAttribute('data-target');
            if (target && target !== 'English' && target !== 'Español') {
                event.preventDefault();
                const basePath = window.location.pathname.includes('html/') ? '' : 'html/';
                loadComponent('content', `${basePath}${target}.html`);
                setActiveLink(this);
            }
        });
    });
}

function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// El navbar lo carga index.html, no necesitamos duplicar la lógica aquí si ya está en index.html
// Pero parece que cada página (home.html, cv.html) también intenta cargarlo.
