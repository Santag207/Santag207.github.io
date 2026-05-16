function initCVInteractions() {
    const techCards = document.querySelectorAll('.tech-card, .interest-tag');
    let detailWindow = document.querySelector('.cv-detail-window');

    if (!detailWindow) {
        detailWindow = document.createElement('div');
        detailWindow.className = 'cv-detail-window';
        document.body.appendChild(detailWindow);
    }

    techCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Use textContent to avoid issues with text-transform: uppercase
            const name = (card.querySelector('span')?.textContent || card.textContent).trim();

            const data = getTechData(name);

            if (data) {
                let projectsHTML = '';
                if (data.projects && data.projects.length > 0) {
                    projectsHTML = `<div class="projects-list">
                        ${data.projects.map(p => `<span>${p}</span>`).join('')}
                    </div>`;
                }

                let mediaHTML = '';
                if (data.media) {
                    if (data.media.endsWith('.mp4') || data.media.endsWith('.webm') || data.media.endsWith('.ogg')) {
                        mediaHTML = `<video src="${data.media}" class="cv-detail-media" autoplay loop muted playsinline></video>`;
                    } else {
                        mediaHTML = `<img src="${data.media}" class="cv-detail-media" alt="${name} detail">`;
                    }
                }

                detailWindow.innerHTML = `
                    <h4>${name}</h4>
                    <p>${data.description}</p>
                    ${projectsHTML}
                    ${mediaHTML}
                `;
                detailWindow.classList.add('active');
            }

            card.style.borderColor = 'var(--accent-orange)';
        });

        card.addEventListener('mousemove', (e) => {
            const x = e.clientX + 20;
            const y = e.clientY + 20;

            // Boundary checks to keep window within viewport
            const winWidth = detailWindow.offsetWidth;
            const winHeight = detailWindow.offsetHeight;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let finalX = x;
            let finalY = y;

            if (x + winWidth > screenWidth) finalX = e.clientX - winWidth - 20;
            if (y + winHeight > screenHeight) finalY = e.clientY - winHeight - 20;

            detailWindow.style.left = `${finalX}px`;
            detailWindow.style.top = `${finalY}px`;
        });

        card.addEventListener('mouseleave', () => {
            detailWindow.classList.remove('active');
            card.style.borderColor = 'var(--accent-cyan)';
        });
    });
}

// Hook for SPA component loading system
window.initCVComponent = function() {
    initCVInteractions();
    if (window.observeReveals) {
        window.observeReveals();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.tech-card')) {
        initCVInteractions();
    }
});
