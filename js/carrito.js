import { calcularImporteTotal, msjAlert, notificacionCarrito, menuHamburguesa } from "./utils.js";

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let totalCarrito = 0;

// Crear lista de carrito
const crearCarrito = (producto, contenedorCarrito) => {
    let productoLi = document.getElementById(`producto-${producto.id}`);
    if (productoLi) {
        // Si ya existe, solo actualizamos la cantidad
        const cantidadElem = productoLi.querySelector('.cantidad-producto');
        const precioElem = productoLi.querySelector('.precio-producto');
        cantidadElem.textContent = `Cantidad: ${producto.cantidad}`;
        precioElem.textContent = `Precio: $${producto.precio * producto.cantidad}`;
    } else {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const precio = document.createElement('p');
        const cantidad = document.createElement('p');
        const btnSumar = document.createElement('button');
        const btnRestar = document.createElement('button');

        li.classList.add('carrito_contenedor_lista_li');
        li.setAttribute('id', `producto-${producto.id}`);

        precio.classList.add('precio-producto');
        precio.textContent = `Precio: $${producto.precio * producto.cantidad}`;

        cantidad.classList.add('cantidad-producto');
        cantidad.textContent = `Cantidad: ${producto.cantidad}`;

        h3.textContent = producto.nombre;

        btnSumar.textContent = '+';
        btnRestar.textContent = '-';
        btnSumar.classList.add('carrito_contenedor_lista_li_btn-sumar');
        btnRestar.classList.add('carrito_contenedor_lista_li_btn-restar');
        btnSumar.setAttribute('id', `${producto.id}`);
        btnRestar.setAttribute('id', `${producto.id}`);

        div.appendChild(h3);
        div.appendChild(cantidad);
        div.appendChild(precio);
        div.appendChild(btnSumar);
        div.appendChild(btnRestar);
        li.appendChild(div);

        contenedorCarrito.appendChild(li);
    };
};

// Actualiza el carrito
const actualizarCarrito = (carrito) => {
    const contenedorCarrito = document.getElementById('carrito_lista');
    contenedorCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        totalCarrito = 0;
        actualizarTotal();
        notificacionCarrito(0);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        return;
    }

    carrito.forEach(producto => {
        crearCarrito(producto, contenedorCarrito);
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));

    sumarRestarProductos();
    totalCarrito = calcularImporteTotal(carrito);
    actualizarTotal();
    notificacionCarrito(carrito.length);
};


// Manejo de eventos sumar o restar productos
const manejarCambiosCantidad = (productoId, operacion) => {
    carrito = carrito.map(producto => {
        if (producto.id === parseInt(productoId)) {
            if (operacion === 'sumar') {
                producto.cantidad += 1;
                msjAlert('Cantidad aumenteda con exitos')
            } else if (operacion === 'restar' && producto.cantidad >= 1) {
                producto.cantidad -= 1;
                msjAlert('Cantidad reducida con exito');
            }
        }
        const productoLi = document.getElementById(`producto-${producto.id}`);
        const precioElem = productoLi.querySelector('.precio-producto');
        const cantidadElem = productoLi.querySelector('.cantidad-producto');

        cantidadElem.textContent = `Cantidad: ${producto.cantidad}`;
        precioElem.textContent = `Precio: $${producto.precio * producto.cantidad}`;

        return producto;
    }).filter(producto => producto.cantidad > 0);

    actualizarCarrito(carrito);
};

const sumarRestarProductos = () => {
    const botonesSumar = document.querySelectorAll('.carrito_contenedor_lista_li_btn-sumar');
    const botonesRestar = document.querySelectorAll('.carrito_contenedor_lista_li_btn-restar');

    botonesSumar.forEach(boton => {
        boton.addEventListener('click', (e) => manejarCambiosCantidad(e.target.id, 'sumar'));
    });

    botonesRestar.forEach(boton => {
        boton.addEventListener('click', (e) => manejarCambiosCantidad(e.target.id, 'restar'));
    });
};

// Total de los productos
const actualizarTotal = () => {
    const total = document.querySelector('.carrito_contenedor_total-boton_total');
    total.textContent = `Total: $${totalCarrito}`;
};

// Vaciar carrito
const vaciar = document.getElementById('carrito_vaciar');
vaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito(carrito);
});

// Funcion de preguntar si se envia el pedido o lo retira por el local
const enviarORetirar = () => {
    Swal.fire({
        title: '¿Enviamos tu pedido o lo retiras por el local?',
        input: 'select',
        inputOptions: {
            'domicilio': 'Enviar a domicilio',
            'local': 'Retirarlo por el local'
        },
        inputPlaceholder: 'Selecciona una opción',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        customClass: {
            title: 'title',
            popup: 'popup',
            input: 'input',
            confirmButton: 'sweet-btn',
            cancelButton: 'sweet-btn'
        },
        preConfirm: (opcion) => {
            if (opcion === 'domicilio') {
                enviarADomicilio();
            } else if (opcion === 'local') {
                retirarPorLocal();
            } else {
                Swal.showValidationMessage('Debes seleccionar una opción');
            }
        }
    });
};

// Funcion de enviar pedido a domicilio
const enviarADomicilio = () => {
    Swal.fire({
        title: 'Rellena tus datos',
        html:
            '<input id="swal-nombre" class="swal2-input" placeholder="Nombre">' +
            '<input id="swal-direccion" class="swal2-input" placeholder="Dirección">' +
            '<input id="swal-telefono" class="swal2-input" placeholder="Teléfono">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        customClass: {
            title: 'title',
            popup: 'popup',
            input: 'input',
            confirmButton: 'sweet-btn',
            cancelButton: 'sweet-btn'
        },
        preConfirm: () => {
            const nombre = document.getElementById('swal-nombre').value;
            const direccion = document.getElementById('swal-direccion').value;
            const telefono = document.getElementById('swal-telefono').value;

            if (!nombre || !direccion || !telefono) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
            } else {
                return { nombre, direccion, telefono };
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Pedido confirmado',
                html: `<p class="sweet-p">El pedido será enviado a ${result.value.direccion}. ¡Gracias, ${result.value.nombre}!</p>`,
                customClass: {
                    title: 'title',
                    popup: 'popup-confirm'
                }
            });
            carrito = [];
            actualizarCarrito(carrito);
            actualizarTotal();
        }
    });
};

// Funcion retirar por el local
const retirarPorLocal = () => {
    Swal.fire({
        title: 'Rellena los datos',
        html: '<input id="swal-nombre" class="swal2-input" placeholder="Nombre">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        customClass: {
            title: 'title',
            popup: 'popup',
            input: 'input',
            confirmButton: 'sweet-btn',
            cancelButton: 'sweet-btn'
        },
        preConfirm: () => {
            const nombre = document.getElementById('swal-nombre').value;

            if (!nombre) {
                Swal.showValidationMessage('El campo es obligatorio');
            } else {
                return { nombre };
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Pedido confirmado',
                html: `<p class="sweet-p">El pedido estará listo en 20 minutos y podras retirarlo. ¡Gracias, ${result.value.nombre}!</p>`,
                customClass: {
                    title: 'title',
                    popup: 'popup-confirm'
                }
            });
            carrito = [];
            actualizarCarrito(carrito);
            actualizarTotal();
        }
    });
};

// Boton finalizar compra
const finCompra = document.getElementById('seccion_carrito');
const finCompraContenedor = document.createElement('div');
finCompraContenedor.classList.add('carrito_finalizar');
const btnfinalizar = document.createElement('button');
btnfinalizar.classList.add('contenedor_finalizar_btn');
btnfinalizar.setAttribute('id', 'finalizar_compra');
btnfinalizar.textContent = 'Finalizar Compra';
finCompraContenedor.appendChild(btnfinalizar);
finCompra.appendChild(finCompraContenedor);
btnfinalizar.addEventListener('click', (e) => {
    if (carrito.length >= 1) {
        enviarORetirar();
    } else {
        msjAlert('No agregaste ningun pedido');
    }
});

menuHamburguesa();
actualizarCarrito(carrito);