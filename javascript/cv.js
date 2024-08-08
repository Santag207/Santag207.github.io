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

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.style-buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            changeStyle(this.getAttribute('onclick').split("'")[1]);
        });
    });

    // Mark "Style Dry Martini" as active on page load and apply style
    const defaultStyleButton = document.getElementById('style1');
    if (defaultStyleButton) {
        defaultStyleButton.classList.add('active');
        defaultStyleButton.disabled = true;
        changeStyle('../css/cv/cv-styles-dry-martini.css');
    }
});
