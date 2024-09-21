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
    { id: 21, nombre: 'Cerveza Quilmes 1Lt', precio: 3200 },
    { id: 22, nombre: 'Cerveza Los Andes 1Lt', precio: 4000 },
];

const crearProducto = () => {
    // validar que no sea un array vacio
    if (!productos || !productos.length) {
        throw new Error("Error cargar productos");
    }
    return productos.map((producto) => {
        //validar que el id sea un número
        if (typeof producto.id != "number") {
            throw new Error("Error, el id debe ser un número");
        }
        // validar que el nombre sea un string
        if (typeof producto.nombre != "string") {
            throw new Error("Error, el nombre no es valido");
        }
        // validad que el precio sea positivo
        if (producto.precio <= 0) {
            throw new Error("El precio debe ser número positivo");
        }
        return new Producto(producto.id, producto.nombre, producto.precio);
    });
};

// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + array.precio, 0);
};

// Funcion para eliminar producto
function eliminarProducto(id) {
    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Buscar el índice del producto que coincide con el id
    const index = carrito.findIndex((producto) => producto.id === parseInt(id));
    
    // Si index es diferente a -1, significa que se encontró el producto
    if (index !== -1) {
        // Eliminar el producto del carrito usando splice
        carrito.splice(index, 1);
        
        // Actualizar el carrito en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    // Retornar el carrito actualizado
    return carrito;
};

export { crearProducto, calcularImporteTotal, eliminarProducto};