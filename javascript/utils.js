function loadComponentWithAnimation(id, file) {
    const content = document.getElementById(id);
    content.classList.add('slide-out');
    setTimeout(() => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
                content.classList.remove('slide-out');
                content.classList.add('hidden');
                setTimeout(() => {
                    content.classList.remove('hidden');
                    content.classList.add('slide-in');
                    if (file.includes('home.html')) {
                        initializeSpline();
                    }
                }, 100);
            })
            .catch(error => console.error('Error loading component:', error));
    }, 500);
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
