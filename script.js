const combos = [
    { id: 1, nombre: "Lomitos2x1", precio: 9500 },
    { id: 2, nombre: "Hamburguesas2x1", precio: 8500 },
    { id: 3, nombre: "Hamburguesa+bebida", precio: 5500 },
    { id: 4, nombre: "2 Muzzarella", precio: 10500 },
    { id: 5, nombre: "Muzza+especial", precio: 13500 },
    { id: 6, nombre: "1/2 Doc. empanadas", precio: 4000 },
    { id: 7, nombre: "1 Doc. empanadas, precio", precio: 7800 }
];

const extras = [
    { id: 1, nombre: "Extra papas fritas", precio: 2000 },
    { id: 2, nombre: "Pote de mayonesa casera", precio: 800 },
    { id: 3, nombre: "Pote de salsa picante", precio: 1200 },
];

const bebidas = [
    { id: 1, nombre: "Coca Cola 1.5Lt", precio: 1500 },
    { id: 2, nombre: "Sprite 1.5Lt", precio: 1500 },
    { id: 3, nombre: "Fanta 1.5Lt", precio: 1500 },
    { id: 4, nombre: "Lata de cerveza", precio: 1800 }
];

let bienvenido = prompt('BIENVENIDO, ¿Te gustaria ver nuestros combos?');
let envio = 2000;

if (bienvenido == 'si' || bienvenido == 'Si' || bienvenido == 'SI') {
    mostrarCombos();
} else console.log('No te olvides de visitar nuestros combos y aprovechar nuestras ofertas');








