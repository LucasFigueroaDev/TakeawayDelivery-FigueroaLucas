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
const productos = [producto, producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21];

// Funcion que muestra los combos
const mostrarProductos = () => {
    console.log('NUESTRAS COMIDAS SON:');
    productos.forEach(producto => {
        console.log(`${producto.id} - ${producto.nombre} - $${producto.precio}`);
    });
    seleccionarIdProducto()
};
// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + array.precio, 0);
};
// Funcion para seleccionar productos segun id
let idProducto = [];
let productosSeleccionados = [];
const seleccionarIdProducto = () => {
    let eleccion;
    do {
        eleccion = prompt('Elige un producto (ingresando un número) o escribe "fin" para terminar');
        if (eleccion === null || eleccion === 'fin') {
            break;
        } else if (!isNaN(eleccion)) {
            const indice = parseInt(eleccion) - 1;
            if (indice >= 0 && indice < productos.length) {
                idProducto.push(indice);
            } else {
                alert(`El producto con ID ${eleccion} no existe`);
            }
        } else if (eleccion !== 'fin') {
            alert('Por favor, introduce un número válido');
        }
    } while (true);
    mostrarProductosSeleccionados();
    return idProducto;
};

// función enviar a domicilio
let envio = 2000;
let domicilio = "";
let total = "";
const enviarADomicilio = () => {
    domicilio = prompt('¿Cual es su domicilio?');
    for (const producto of productosSeleccionados) {
        console.log(`${producto.nombre}`);
        console.log(`${producto.precio}`);
    }
    alert(`Se enviara a ${domicilio} y el total es: ${total + envio}`);
};

//Funcion mostrar productos seleccionados
const mostrarProductosSeleccionados = () => {
    productosSeleccionados = idProducto.map(indice => productos[indice]);
    total = calcularImporteTotal(productosSeleccionados);
    console.log(productosSeleccionados);
    enviarADomicilio();
};
// Inicio
let pedido = confirm('¿Quiere realizar algún pedido?');
if (pedido == true) {
    mostrarProductos();
} else {
    console.log('Tenemos varias ofertas para vos, APROVECHALAS!!!!');
};









