import { calcularImporteTotal, msjAlert } from "./utils.js";
import { notificacionCarrito } from "./utils.js";

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


// Manejo de eventos sumar/restar productos
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
vaciar.addEventListener('click', (e) => {
    carrito = [];
    actualizarCarrito(carrito);
});


//     if (carrito.length >= 1) {
//         const div = document.createElement('div');
//         const h3 = document.createElement('h3');
//         const p = document.createElement('p');
//         const select = document.createElement('select');
//         const selectLugar = document.createElement('select');
//         const btnAceptar = document.createElement('button');
//         const btnCancelar = document.createElement('button');
//         const opcion1 = document.createElement('option');
//         const opcion2 = document.createElement('option');
//         const opcionLugar = document.createElement('option');
//         const inputDireccion = document.createElement('input');
//         const inputNombre = document.createElement('input');

//         inputDireccion.classList.add('contenedor_finalizar_input');
//         inputDireccion.setAttribute('placeholder', 'Ingrese su dirección');
//         inputDireccion.setAttribute('id', 'direccion');
//         inputNombre.setAttribute('id', 'input-nombre');
//         inputNombre.classList.add('contenedor_finalizar_input');
//         inputNombre.setAttribute('placeholder', 'Ingresa tu nombre');
//         div.classList.add('contenedor_finalizar');
//         h3.classList.add('contenedor_finalizar_titulo');
//         select.classList.add('contenedor_finalizar_select');
//         selectLugar.classList.add('contenedor_finalizar_select');
//         opcion1.setAttribute('value', 'opcion1');
//         opcion2.setAttribute('value', 'opcion2');
//         opcionLugar.setAttribute('value', 'vcp');
//         btnAceptar.classList.add('contenedor_finalizar_btn');
//         btnAceptar.setAttribute('id', 'aceptar');
//         btnCancelar.classList.add('contenedor_finalizar_btn');
//         btnCancelar.setAttribute('id', 'cancelar');

//         h3.textContent = 'Finalizar compra';
//         p.textContent = `El total de tu compra es: $${totalCarrito}`;
//         opcion1.textContent = 'Retiro por el local';
//         opcion2.textContent = 'Envio a domicilio';
//         opcionLugar.textContent = 'Villa Carlos Paz';
//         selectLugar.style.display = 'none';
//         btnAceptar.textContent = 'Aceptar compra';
//         btnCancelar.textContent = 'Cancelar compra';

//         select.appendChild(opcion1);
//         select.appendChild(opcion2);
//         selectLugar.appendChild(opcionLugar);
//         div.appendChild(h3);
//         div.appendChild(p);
//         div.appendChild(select);
//         div.appendChild(selectLugar);
//         div.appendChild(inputNombre);
//         div.appendChild(inputDireccion);
//         div.appendChild(btnAceptar);
//         div.appendChild(btnCancelar);

//         document.body.appendChild(div);

//         const opcion = document.querySelector('.contenedor_finalizar_select');
//         let opcionElegida = "";
//         opcion.addEventListener('change', (e) => {
//             opcionElegida = e.target.value;
//             if (opcionElegida === 'opcion2') {
//                 const totalConEnvio = totalCarrito + 2000;
//                 p.textContent = `El total de tu compra mas envio es: $${totalConEnvio}`;
//                 inputNombre.style.display = 'block';
//                 inputDireccion.style.display = 'block';
//                 selectLugar.style.display = 'block';
//             } else {
//                 inputNombre.style.display = 'none';
//                 inputDireccion.style.display = 'none';
//                 selectLugar.style.display = 'none';
//                 p.textContent = `El total de tu compra es: $${totalCarrito} podras retirarlo por nuestro local en 20 minutos.`;
//             }
//         });


//         let direccion = document.getElementById('direccion');
//         let nombre = document.getElementById('input-nombre');
//         btnAceptar.addEventListener('click', (e) => {
//             if (opcionElegida === 'opcion2') {
//                 if (direccion.value.trim() === "" || nombre.value.trim() === "" ) {
//                     crearNotificacion('Por favor rellena los datos');
//                 } else {
//                     crearNotificacion('Gracias por la compra en breve te enviamos tu pedido');
//                     carrito = [];
//                     actualizarCarrito(carrito);
//                     actualizarTotal();
//                     setTimeout(() => {
//                         div.style.display = 'none';
//                     }, 2000);
//                 }
//             } else {
//                 crearNotificacion('Gracias por la compra podras retirar tu pedido en 20 minutos por nuestro local');
//                 carrito = [];
//                 actualizarCarrito(carrito);
//                 actualizarTotal();
//                 setTimeout(() => {
//                     div.style.display = 'none';
//                 }, 2000);
//             }
//         });

//         btnCancelar.addEventListener('click', (e) => {
//             carrito = [];
//             actualizarCarrito(carrito);
//             actualizarTotal();
//             div.style.display = 'none';
//         });
//     } else {
//         crearNotificacion('No agregaste ningun pedido');
//     }
// });


// Finalizar compra
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
        Swal.fire({
            title: 'Tus datos para el pedido',
            html:
                '<input id="swal-input-nombre" class="swal2-input dato" placeholder="Nombre">' +
                '<input id="swal-input-telefono" class="swal2-input dato" placeholder="Teléfono">' +
                '<select id="swal-input-select" class="swal2-input select-vcp">' +
                '<option value="">Selecciona una opción</option>' +
                '<option value="opcion1">Villa Carlos Paz</option>' +
                '</select>' +
                '<input id="swal-input-domicilio" class="swal2-input dato" placeholder="Domicilio">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            customClass: {
                title: 'datos',
                popup: 'box',
                confirmButton: 'btn-sweet',
                cancelButton: 'btn-sweet'
            },
            preConfirm: () => {
                const nombre = document.getElementById('swal-input-nombre').value;
                const telefono = document.getElementById('swal-input-telefono').value;
                const domicilio = document.getElementById('swal-input-domicilio').value;

                if (!nombre || !telefono || !domicilio) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false; // Evita que la alerta se cierre si falta algún campo
                }

                return { nombre: nombre, telefono: telefono, domicilio: domicilio };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre, telefono, domicilio } = result.value;
                Swal.fire({
                    title: 'Tus datos',
                    html: `Nombre ${nombre} <br>
                                Telefono: ${telefono} <br>
                                Dirección: ${domicilio}`,
                    customClass: {
                        title: 'datos',
                        popup: 'box',
                        confirmButton: 'btn-sweet'
                    }
                });
                carrito = [];
                actualizarCarrito(carrito);
                actualizarTotal();
                msjAlert('Gracias por su compra');

            } else {
                carrito = [];
                actualizarCarrito(carrito);
                actualizarTotal();
            }
        });


    } else msjAlert('No agregaste ningun pedido');

});

// function mostrarAlerta() {
//     Swal.fire({
//         title: '¿Cómo prefieres recibir tu pedido?',
//         input: 'select',
//         inputOptions: {
//             'domicilio': 'Enviar a domicilio',
//             'local': 'Retirarlo por el local'
//         },
//         inputPlaceholder: 'Selecciona una opción',
//         showCancelButton: true,
//         confirmButtonText: 'Continuar',
//         cancelButtonText: 'Cancelar',
//         preConfirm: (opcion) => {
//             if (opcion === 'domicilio') {
//                 mostrarFormularioDomicilio();
//             } else if (opcion === 'local') {
//                 mostrarFormularioLocal();
//             } else {
//                 Swal.showValidationMessage('Debes seleccionar una opción');
//             }
//         }
//     });
// }

// function mostrarFormularioDomicilio() {
//     Swal.fire({
//         title: 'Datos para Envío a Domicilio',
//         html:
//             '<input id="swal-nombre" class="swal2-input" placeholder="Nombre">' +
//             '<input id="swal-direccion" class="swal2-input" placeholder="Dirección">' +
//             '<input id="swal-telefono" class="swal2-input" placeholder="Teléfono">',
//         focusConfirm: false,
//         showCancelButton: true,
//         confirmButtonText: 'Enviar',
//         preConfirm: () => {
//             const nombre = document.getElementById('swal-nombre').value;
//             const direccion = document.getElementById('swal-direccion').value;
//             const telefono = document.getElementById('swal-telefono').value;

//             if (!nombre || !direccion || !telefono) {
//                 Swal.showValidationMessage('Todos los campos son obligatorios');
//             } else {
//                 return { nombre, direccion, telefono };
//             }
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 'Pedido confirmado',
//                 `El pedido será enviado a ${result.value.direccion}. ¡Gracias, ${result.value.nombre}!`,
//                 'success'
//             );
//         }
//     });
// }

// function mostrarFormularioLocal() {
//     Swal.fire({
//         title: 'Datos para Retiro en el Local',
//         html:
//             '<input id="swal-nombre" class="swal2-input" placeholder="Nombre">' +
//             '<input id="swal-horario" class="swal2-input" placeholder="Horario estimado de retiro">',
//         focusConfirm: false,
//         showCancelButton: true,
//         confirmButtonText: 'Confirmar',
//         preConfirm: () => {
//             const nombre = document.getElementById('swal-nombre').value;
//             const horario = document.getElementById('swal-horario').value;

//             if (!nombre || !horario) {
//                 Swal.showValidationMessage('Todos los campos son obligatorios');
//             } else {
//                 return { nombre, horario };
//             }
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 'Retiro confirmado',
//                 `El pedido estará listo para que lo retires en el horario: ${result.value.horario}. ¡Gracias, ${result.value.nombre}!`,
//                 'success'
//             );
//         }
//     });
// }
actualizarCarrito(carrito);