// Función para cambiar el estilo del CV
function changeStyle(sheet) {
    const contentContainer = document.getElementById('content-container');
    const buttons = document.querySelectorAll('.style-buttons button');

    // Remove 'active' class from all buttons and enable them
    buttons.forEach(button => {
        button.classList.remove('active');
        button.disabled = false;
    });

    // Add 'active' class to the clicked button and disable it
    const activeButton = Array.from(buttons).find(button => button.getAttribute('onclick').includes(sheet));
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.disabled = true;
    }

    contentContainer.classList.add('slide-out-down');
    setTimeout(() => {
        document.getElementById('cv-stylesheet').href = sheet;
        contentContainer.classList.remove('slide-out-down');
        contentContainer.classList.add('hidden');
        setTimeout(() => {
            contentContainer.classList.remove('hidden');
            contentContainer.classList.add('slide-in-up');
        }, 100);
    }, 500);
}

// Función para cargar las traducciones del CV
function loadCVTranslations(lang) {
    fetch(`../languages/cv/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('cvTitle').textContent = data.cvTitle;
            document.getElementById('name').textContent = data.name;
            document.getElementById('career').textContent = data.career;
            document.getElementById('contactHeading').textContent = data.contactHeading;
            document.getElementById('address').textContent = data.address;
            document.getElementById('email1').textContent = data.email1;
            document.getElementById('email2').textContent = data.email2;
            document.getElementById('phone').textContent = data.phone;
            document.getElementById('githubLink').textContent = data.githubLink;
            document.getElementById('githubLink').href = data.githubUrl;
            document.getElementById('linkedinLink').textContent = data.linkedinLink;
            document.getElementById('linkedinLink').href = data.linkedinUrl;
            document.getElementById('educationHeading').textContent = data.educationHeading;
            document.getElementById('highSchool').textContent = data.highSchool;
            document.getElementById('highSchoolYears').innerHTML = data.highSchoolYears;
            document.getElementById('highSchoolDetails').innerHTML = data.highSchoolDetails;
            document.getElementById('degree').textContent = data.degree;
            document.getElementById('degreeYears').innerHTML = data.degreeYears;
            document.getElementById('degreeDetails').innerHTML = data.degreeDetails;
            document.getElementById('degreeStatus').textContent = data.degreeStatus;
            document.getElementById('languagesHeading').textContent = data.languagesHeading;
            document.getElementById('spanish').textContent = data.spanish;
            document.getElementById('english').textContent = data.english;
            document.getElementById('italian').textContent = data.italian;
            document.getElementById('profileHeading').textContent = data.profileHeading;
            document.getElementById('profileDescription').textContent = data.profileDescription;
            document.getElementById('experienceHeading').textContent = data.experienceHeading;
            document.getElementById('job1Title').textContent = data.job1Title;
            document.getElementById('job1Company').textContent = data.job1Company;
            document.getElementById('job1Description').textContent = data.job1Description;
            document.getElementById('job2Title').textContent = data.job2Title;
            document.getElementById('job2Company').textContent = data.job2Company;
            document.getElementById('job2Description').textContent = data.job2Description;
            document.getElementById('skillsHeading').textContent = data.skillsHeading;
            document.getElementById('skill1').textContent = data.skill1;
            document.getElementById('skill2').textContent = data.skill2;
            document.getElementById('skill3').textContent = data.skill3;
            document.getElementById('skill4').textContent = data.skill4;
            document.getElementById('skill5').textContent = data.skill5;
            document.getElementById('skill6').textContent = data.skill6;
        })
        .catch(error => console.error('Error loading CV translations:', error));
}

// Inicializa la página con el idioma guardado o el predeterminado
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('navbar', '../html/navbar.html').then(() => {
        const englishLink = document.getElementById('english-link');
        const spanishLink = document.getElementById('spanish-link');

        if (englishLink && spanishLink) {
            englishLink.addEventListener('click', function() {
                changeLanguage('en');
            });

            spanishLink.addEventListener('click', function() {
                changeLanguage('es');
            });

            // Inicializa la página con el idioma guardado o predeterminado
            const savedLanguage = getSavedLanguage();
            loadCVTranslations(savedLanguage);
        } else {
            console.error('No se encontraron los enlaces de idioma en el DOM.');
        }
    }).catch(error => {
        console.error('Error loading navbar:', error);
    });

});



// Cambia el idioma de la página home y guarda la preferencia
function changeLanguage(language) {
    loadCVTranslations(language);
    saveLanguagePreference(language);
}

// Guarda la preferencia de idioma en localStorage
function saveLanguagePreference(language) {
    localStorage.setItem('selectedLanguage', language);
}

// Obtiene el idioma guardado de localStorage
function getSavedLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}
