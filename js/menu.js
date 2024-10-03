// Selector de clase y agregar evento
const selectorMenu = document.querySelector('.inicio_nav_menu-hamburguesa');
const navMenu = document.querySelector('.inicio_nav_contenido');

selectorMenu.addEventListener('click', () => {
    navMenu.classList.toggle('activo');
});