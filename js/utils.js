// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + (array.precio * array.cantidad), 0);
};

// // Funcion que muestra la cantidad de producto en el carrito
// function notificacionCarrito(cantidad) {
//     const cantidadProducto = document.querySelector('.inicio_nav_carrito_notificacion');
//     if (cantidad > 0) {
//         cantidadProducto.textContent = cantidad;
//         cantidadProducto.style.display = 'block';
//     } else {
//         cantidadProducto.style.display = 'none';
//     }
// }

// Funcion de sweetalert notificación con tiempo
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

// Funcion de sweetAlert2 comfirma pago realizado
function confirmacion(msj) {
    Swal.fire({
        title: msj,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        customClass: {
            title: 'title',
            popup: 'popup',
            confirmButton: 'sweet-btn'
        }
    })
};

// Funcion que crea el menu hamburguesa
function menuHamburguesa() {
    const selectorMenu = document.querySelector('.inicio_nav_menu-hamburguesa');
    const navMenu = document.querySelector('.inicio_nav_contenido');
    selectorMenu.addEventListener('click', () => {
        navMenu.classList.toggle('activo');
    });
};

const linksNav = [
    { id: "home", href: "index.html", name: "Home" },
    { id: "categorias", href: "#categorias", name: "Categorias" },
    { id: "clientes", href: "#clientes", name: "Clientes" },
    { id: "nosotros", href: "#nosotros", name: "Nosotros" },
    { id: "hacerPedido", href: "./html/hacerpedido.html", name: "Hacer pedido" }
];

export { calcularImporteTotal, msjAlert, menuHamburguesa, confirmacion, linksNav };