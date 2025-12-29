const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.navbar');
const icon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    // 切換 icon
    if (navLinks.classList.contains('open')) {
        icon.classList.replace('ri-menu-line', 'ri-close-line');
    } else {
        icon.classList.replace('ri-close-line', 'ri-menu-line');
    }
});
