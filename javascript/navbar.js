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
