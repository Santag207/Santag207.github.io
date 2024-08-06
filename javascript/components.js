function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            highlightActiveLink();
            addNavLinkListeners();
        });
}

function highlightActiveLink() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if (currentLocation.includes(link.getAttribute('href'))) {
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
            const targetPage = this.getAttribute('href');
            animateTransition(targetPage);
        });
    });
}

function animateTransition(targetPage) {
    const nav = document.querySelector('nav');
    nav.style.transition = 'transform 0.5s ease';
    nav.style.transform = 'scale(0)';
    setTimeout(() => {
        window.location.href = targetPage;
    }, 500);
}

// Inicializar listeners al cargar los componentes
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveLink();
    addNavLinkListeners();
});
