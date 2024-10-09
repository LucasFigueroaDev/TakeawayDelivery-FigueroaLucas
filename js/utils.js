// fetch ('json/productos.json')
// .then(respuesta => respuesta.json())
// .then(data => console.log(data))
// .catch(err => console.error('error', err))

export let productos;


fetch('json/productos.json')
.then(respuesta => respuesta.json())
.then(datos => {
    productos = datos
})
.catch(error => console.error('Error:', error));

console.log(productos);




// // Crear productos y manejos posibles errores
// const crearProducto = () => {
//     if (!productos || !productos.length) { // validar que no este vacio
//         throw new Error("Error cargar productos");
//     }
//     return productos.map((producto) => {
//         if (typeof producto.id != "number") { // Valida que sea un número
//             throw new Error("Error, el id debe ser un número");
//         }
//         if (typeof producto.nombre != "string") { // Valida que sea un string
//             throw new Error("Error, el nombre no es valido");
//         }
//         if (producto.precio <= 0) { // Valida que sea número positivo
//             throw new Error("El precio debe ser número positivo");
//         }
//         return new ProductoConImg(producto.id, producto.nombre, producto.precio, producto.imagen);
//     });
// };

// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + (array.precio * array.cantidad), 0);
};

// Funcion que muestra la cantidad de producto en el carrito
function notificacionCarrito(cantidad) {
    const cantidadProducto = document.querySelector('.inicio_nav_carrito_notificacion');
    if (cantidad > 0) {
        cantidadProducto.textContent = cantidad;
        cantidadProducto.style.display = 'block';
    } else {
        cantidadProducto.style.display = 'none';
    }
}

// Funcion de sweetalert
function msjAlert(msj) {
    Swal.fire({
        position: "top-end",
        title: msj,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
            title: 'title',
            popup: 'popup'
        }
    });
};

// Funcion que crea el menu hamburguesa
function menuHamburguesa() {
    const selectorMenu = document.querySelector('.inicio_nav_menu-hamburguesa');
    const navMenu = document.querySelector('.inicio_nav_contenido');
    selectorMenu.addEventListener('click', () => {
        navMenu.classList.toggle('activo');
    });
};


export { calcularImporteTotal, notificacionCarrito, msjAlert, menuHamburguesa };