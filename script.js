// Funcion que muestra los combos
const mostrarProductos = () => {
    console.log('NUESTRAS COMIDAS SON:');
    productos.forEach(producto => {
        console.log(`${producto.id} - ${producto.nombre} - $${producto.precio}`);
    });
    seleccionarIdProducto()
};
// Funcion para seleccionar productos segun id
const seleccionarIdProducto = () => {
    let eleccion;
    do {
        eleccion = prompt('Elige un producto (ingresando un número) o escribe "fin" para terminar');
        if (eleccion === null || eleccion === 'fin') {
            break;
        } else if (!isNaN(eleccion)) {
            idProducto.push(eleccion);
        } else if (eleccion !== 'fin') {
            alert('Por favor, introduce un número valido')
        }
    } while (true);
    return idProducto;
};

// Funcion para hacer el pedido
// function hacerPedido() {
//     while (true) {
//         const eleccion = prompt('Elige un combo (ingresa el número) o escribe "fin" para terminar:');
//         if (eleccion === 'fin' || eleccion === null) {
//             break;
//         };
//         const comboElegido = combos[eleccion - 1];
//         if (comboElegido) {
//             combosElegidos.push(comboElegido);
//             console.log(`Combo agregado: ${comboElegido.nombre}`);
//         } else {
//             console.log('Combo no encontrado, intenta de nuevo.');
//         }
//     };
//     total = calcularImporteTotal(combosElegidos);
//     enviar = confirm(`¿Quiere que se lo enviemos a su domicilio?. El envio cuesta $${envio}`);
//     if (enviar == true) {
//         enviarADomicilio();
//     } else alert(`En total es $${total}, estara listo en 20 minutos y podras retirarlo por nuestro local, Muchas gracias.`);

// };

// // función enviar a domicilio
// function enviarADomicilio() {
//     domicilio = prompt('¿Cual es su domicilio?');
//     for (const combo of combosElegidos) {
//         console.log(`Su pedido es: ${combo.nombre} $${combo.precio}`);
//     }
//     alert(`Se enviara a ${domicilio} y el total es: ${total + envio}`);
// };

// // Funcion que calcula el importe total
// function calcularImporteTotal(array) {
//     return array.reduce((total, array) => total + array.precio, 0);
// };

// // Combos 
// const combos = [
//     { id: 1, nombre: "Lomitos2x1", precio: 9500 },
//     { id: 2, nombre: "Hamburguesas2x1", precio: 8500 },
//     { id: 3, nombre: "Hamburguesa+bebida", precio: 5500 },
//     { id: 4, nombre: "2 Muzzarella", precio: 10500 },
//     { id: 5, nombre: "Muzza+especial", precio: 13500 },
//     { id: 6, nombre: "1/2 Doc. empanadas", precio: 4000 },
//     { id: 7, nombre: "1 Doc. empanadas", precio: 7800 }
// ];
class Producto {
    constructor(id, nombre, precio,) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }
}
// Pizzas
let producto = new Producto(1, "Pizza Muzzarella", 6000);
let producto1 = new Producto(2, "Pizza Especial", 8500);
let producto2 = new Producto(3, "Pizza Napolitana", 10000);
let producto3 = new Producto(4, "Pizza Palmitos", 12500);
let producto4 = new Producto(5, "Pizza Cuatro Quesos", 9500);
let producto5 = new Producto(6, "Pizza Americana", 13500);
// Lomos - Sanguches
let producto6 = new Producto(7, "Lomo Simple", 4000);
let producto7 = new Producto(8, "Lomo Completo", 5500);
let producto8 = new Producto(9, "Lomo Vegetariano", 6000);
let producto9 = new Producto(10, "Lomo de Pollo", 5000);
let producto10 = new Producto(11, "Lomo de Cerdo", 5000);
// Empanadas
let producto11 = new Producto(12, "Empanadas Criollas", 1500);
let producto12 = new Producto(13, "Empanadas Arabes", 2000);
let producto13 = new Producto(14, "Empanadas Jamon y Queso", 1500);
let producto14 = new Producto(15, "Empanadas de Pollo", 1500);
let producto15 = new Producto(16, "Empanadas Choclo", 1500);
let producto16 = new Producto(17, "Empanadas Atun", 1500);
// Bebidas
let producto17 = new Producto(18, "Coca Cola 1.5Lt", 2100);
let producto18 = new Producto(19, "Sprite 1.5Lt", 2100);
let producto19 = new Producto(20, "Fanta", 2100);
let producto20 = new Producto(21, "Cerveza Quilmes 1Lt", 3200);
let producto21 = new Producto(22, "Cervaza Los Andes 1Lt", 4000);
// Arrays
let productos = [producto, producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21];

alert('Bienvenido a La casa de comida - Lo Más Rico');
let idProducto = [];
let total = "";
let envio = 2000;
let combosElegidos = [];
let domicilio = "";
let pedido = confirm('¿Quiere realizar algún pedido?');
if (pedido == true) {
    mostrarProductos();
} else {
    console.log('Tenemos varias ofertas para vos, APROVECHALAS!!!!');
};

// REVISAAAR
// const productosEncontrados = productos.filter((producto) => idProducto.includes((productos.id)));
// console.log(productosEncontrados);

  






