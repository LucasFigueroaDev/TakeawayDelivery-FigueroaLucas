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
    { id: "categorias", href: "#categories", name: "Categorias" },
    { id: "clientes", href: "#customers", name: "Clientes" },
    { id: "nosotros", href: "#us", name: "Nosotros" }
];

export { msjAlert, menuHamburguesa, confirmacion, linksNav };