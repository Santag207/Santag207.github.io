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
                    if (typeof initScrollAnimations === 'function') {
                        initScrollAnimations();
                    }

                    // Initialize CV component if loaded
                    if (file.includes('cv.html') && typeof window.initCVComponent === 'function') {
                        window.initCVComponent();
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

function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}
