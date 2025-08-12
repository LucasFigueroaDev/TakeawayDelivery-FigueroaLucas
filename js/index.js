import { cartProducts } from "./utils.js";
let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const appearOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;

        faders.forEach(fader => {
            const faderTop = fader.getBoundingClientRect().top;

            if (faderTop < triggerBottom) {
                fader.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', appearOnScroll);
    appearOnScroll(); // para que aparezcan si ya están visibles al cargar
});


cartProducts(cart);