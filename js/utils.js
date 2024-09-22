class Producto {
    constructor(id, nombre, precio) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }
};

const productos = [
    { id: 1, nombre: 'Pizza Muzzarella', precio: 6000 },
    { id: 2, nombre: 'Pizza Especial', precio: 8500 },
    { id: 3, nombre: 'Pizza Napolitana', precio: 10000 },
    { id: 4, nombre: 'Pizza Palmitos', precio: 12500 },
    { id: 5, nombre: 'Pizza Cuatro Quesos', precio: 9500 },
    { id: 6, nombre: 'Pizza Americana', precio: 13500 },
    { id: 7, nombre: 'Lomo Simple', precio: 4000 },
    { id: 8, nombre: 'Lomo Completo', precio: 5500 },
    { id: 9, nombre: 'Lomo Vegetariano', precio: 6000 },
    { id: 10, nombre: 'Lomo de Pollo', precio: 5000 },
    { id: 11, nombre: 'Lomo De Cerdo', precio: 5000 },
    { id: 12, nombre: 'Empanada Criollas', precio: 1500 },
    { id: 13, nombre: 'Empanada Arabes', precio: 2000 },
    { id: 14, nombre: 'Empanada Jamon y Queso', precio: 1500 },
    { id: 15, nombre: 'Empanada De Pollo', precio: 1500 },
    { id: 16, nombre: 'Empanada De Choclo', precio: 1500 },
    { id: 17, nombre: 'Coca Cola 1.5Lt', precio: 2500 },
    { id: 18, nombre: 'Sprite 1.5Lt', precio: 2500 },
    { id: 19, nombre: 'Fanta 1.5Lt', precio: 2500 },
    { id: 20, nombre: 'Cerveza Quilmes Lata', precio: 1700 },
    { id: 21, nombre: 'Cerveza Los Andes ', precio: 2000 },
];

class ProductoConImg extends Producto {
    constructor(id, nombre, precio, imagen) {
        super(id, nombre, precio);
        this.imagen = imagen
    }
};
// Crear productos y manejos posibles errores
const crearProducto = () => {
    if (!productos || !productos.length) { // validar que no este vacio
        throw new Error("Error cargar productos");
    }
    return productos.map((producto) => {
        if (typeof producto.id != "number") { // Valida que sea un número
            throw new Error("Error, el id debe ser un número");
        }
        if (typeof producto.nombre != "string") { // Valida que sea un string
            throw new Error("Error, el nombre no es valido");
        }
        if (producto.precio <= 0) { // Valida que sea número positivo
            throw new Error("El precio debe ser número positivo");
        }
        return new ProductoConImg(producto.id, producto.nombre, producto.precio, producto.imagen);
    });
};

// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + array.precio, 0);
};

// Funcion para eliminar producto
function eliminarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex((producto) => producto.id === parseInt(id));

    // Si index es diferente a -1, significa que se encontró el producto
    if (index !== -1) {
        carrito.splice(index, 1);
        // Actualizar el carrito en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    return carrito;
};

function crearNotificacion(titulo) {
    const notificacion = document.createElement('div');
    const notificacionTitulo = document.createElement('h4');

    notificacion.classList.add('notificacion');
    notificacion.classList.add('animate__animated');
    notificacion.classList.add('animate__slideInRight');
    notificacionTitulo.classList.add('notificacion_titulo');

    notificacionTitulo.textContent = titulo;

    notificacion.appendChild(notificacionTitulo);

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);

};

function notificacionCarrito(cantidad) {
    const cantidadProducto = document.querySelector('.inicio_nav_carrito_notificacion');
    if (cantidad > 0) {
        cantidadProducto.textContent = cantidad;
        cantidadProducto.style.display = 'block';
    }else {
        cantidadProducto.style.display = 'none';
    }
}

export { crearProducto, calcularImporteTotal, eliminarProducto, crearNotificacion, notificacionCarrito};