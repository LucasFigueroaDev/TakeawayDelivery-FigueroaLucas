import { crearProducto } from "./productos.js";
const productos = crearProducto();


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









