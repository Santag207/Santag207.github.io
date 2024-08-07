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
                        content.classList.add('hidden'); // Mantener oculto mientras se carga
                        setTimeout(() => {
                            content.classList.remove('hidden');
                            content.classList.add('slide-in');
                        }, 100); // Breve retraso antes de mostrar el nuevo contenido
                    })
                    .catch(error => console.error('Error loading component:', error));
            }, 500); // Tiempo para la animación de salida
        })
        .catch(error => console.error('Error loading component:', error));
}

function highlightActiveLink() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if (currentLocation.includes(link.getAttribute('href')) || (currentLocation.endsWith('#home') && link.getAttribute('data-target') === 'home') || (!window.location.hash && link.getAttribute('data-target') === 'home')) {
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

function loadComponentWithAnimation(id, file) {
    const content = document.getElementById(id);
    content.classList.add('slide-out');
    setTimeout(() => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
                content.classList.remove('slide-out');
                content.classList.add('hidden'); // Mantener oculto mientras se carga
                setTimeout(() => {
                    content.classList.remove('hidden');
                    content.classList.add('slide-in');
                    if (file.includes('home.html')) {
                        initializeSpline();
                    }
                }, 100); // Breve retraso antes de mostrar el nuevo contenido
            })
            .catch(error => console.error('Error loading component:', error));
    }, 500); // Tiempo para la animación de salida
}

function updateURL(targetSection) {
    window.history.pushState({}, '', `#${targetSection}`);
}

function setActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function initializeSpline() {
    const canvas = document.getElementById('canvas3d');
    if (canvas) {
        const app = new window.Spline.Application(canvas);
        app.load('https://prod.spline.design/R66pP8fFpIYgIHF6/scene.splinecode');
    }
}

function changeStyle(styleSheet) {
    const content = document.getElementById('content');
    content.classList.add('slide-out-down');
    setTimeout(() => {
        document.getElementById('cv-stylesheet').href = `../css/${styleSheet}`;
        content.classList.remove('slide-out-down');
        content.classList.add('hidden');
        setTimeout(() => {
            content.classList.remove('hidden');
            content.classList.add('slide-in-up');
        }, 100);
    }, 500);
}

// Inicializar listeners al cargar los componentes
document.addEventListener('DOMContentLoaded', function () {
    const style1Btn = document.getElementById('style1');
    const style2Btn = document.getElementById('style2');
    const contentContainer = document.getElementById('content-container');
    const styleSheet = document.getElementById('cv-stylesheet');

    function changeStyle(sheet) {
        contentContainer.classList.add('slide-out-down');
        setTimeout(() => {
            styleSheet.setAttribute('href', '../css/' + sheet);
            setTimeout(() => {
                contentContainer.classList.remove('slide-out-down');
                contentContainer.classList.add('hidden');
                setTimeout(() => {
                    contentContainer.classList.remove('hidden');
                    contentContainer.classList.add('slide-in-up');
                }, 100);
            }, 100);
        }, 500);
    }

    style1Btn.addEventListener('click', () => changeStyle('cv-styles.css'));
    style2Btn.addEventListener('click', () => changeStyle('cv-styles-ats.css'));
});
