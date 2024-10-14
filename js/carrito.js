import { calcularImporteTotal, msjAlert, notificacionCarrito, menuHamburguesa, confirmacion } from "./utils.js";
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let totalCarrito = 0;

// Crear lista de carrito
const crearCarrito = (producto, contenedorCarrito) => {
    let productoLi = document.getElementById(`producto-${producto.id}`);
    if (productoLi) {
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

// Formulario de metodo de pago y envio
const formCompra = () => {
    Swal.fire({
        title: 'Metodo de pago y envio',
        html: `
            <label class="inputLabel" for="metodoDePago">Método de pago:</label>
            <select id="metodoDePago" class="swal2-select input">
            <option value="tarjeta">Tarjeta de crédito/débito</option>
            <option value="efectivo">Efectivo</option>
            </select>
            <label class="inputLabel" for="metodoDeEntrega">Tipo de entrega:</label>
            <select id="metodoDeEntrega" class="swal2-select input">
            <option value="local">Retirar por local</option>
            <option value="domicilio">Enviar a domicilio</option>
            </select>`,
        focusConfirm: false,
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
        preConfirm: () => {
            const metodoDePago = document.getElementById('metodoDePago').value;
            const metodoDeEntrega = document.getElementById('metodoDeEntrega').value;
            if (!metodoDePago || !metodoDeEntrega) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false
            }
            return { metodoDeEntrega, metodoDePago }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const metodoDeEntrega = result.value.metodoDeEntrega;
            const metodoDePago = result.value.metodoDePago;
            if (metodoDePago === 'tarjeta' && metodoDeEntrega === 'local') {
                solicitarDatos(metodoDeEntrega, metodoDePago);
            } else if (metodoDePago === 'tarjeta' && metodoDeEntrega === 'domicilio') {
                solicitarDatosDomicilio(metodoDePago, metodoDeEntrega);
            } else if (metodoDePago === 'efectivo' && metodoDeEntrega === 'domicilio') {
                solicitarDatosDomicilio(metodoDePago);
            } else if (metodoDeEntrega === 'local') {
                solicitarDatos(metodoDeEntrega, metodoDePago);
            }
        }
    })
};

// Funcion solicitar datos
const solicitarDatos = (metodoDeEntrega, metodoDePago) => {
    Swal.fire({
        title: 'Ingresa tu nombre',
        html: `
            <label class="inputLabel" for="nombreCompleto">Tu nombre completo:</label>
            <input type="text" class="swal2-input" id="nombreCompleto" placeholder="Tu nombre">
            <label class="inputLabel" for="cel">Tu telefono:</label>
            <input type="number" class="swal2-input" id="cel" placeholder="Tu telefono">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        customClass: {
            htmlContainer: 'htmlContainer',
            title: 'title',
            popup: 'popup',
            input: 'input',
            confirmButton: 'sweet-btn',
            cancelButton: 'sweet-btn'
        },
        preConfirm: () => {
            const nombreCompleto = document.getElementById('nombreCompleto').value;
            const telefono = document.getElementById('cel').value;
            if (!nombreCompleto || !telefono) {
                Swal.showValidationMessage('Debes completar los datos');
                return false;
            }
            return { nombreCompleto, telefono };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (metodoDePago === 'efectivo') {
                confirmacion('Pedido registrado. Podras retirarlo en 30 minutos por nuestro local. ¡Muchas Gracias!');
                carrito = [];
                actualizarCarrito(carrito);
                actualizarTotal(carrito);
            } else if (metodoDePago === 'tarjeta' && metodoDeEntrega === 'local') {
                solicitarDatosTarjeta(metodoDeEntrega);
            } else if (metodoDePago === 'tarjeta' && metodoDeEntrega === 'domicilio') {
                solicitarDatosDomicilio(metodoDePago)
            }
        }
    });
};

// Funcion solicitar datos de tarjeta
const solicitarDatosTarjeta = (metodoDeEntrega) => {
    Swal.fire({
        title: 'Ingresa los datos de la tarjeta',
        html: `
        <label class="inputLabel" for="numeroTarjeta">Número de tarjeta:</label>
        <input type="number" id="numeroTarjeta" class="swal2-input inputNumber" placeholder="1234 5678 9012 3456">
        <label class="inputLabel" for="fechaExpiracion">Fecha de expiración:</label>
        <input type="text" id="fechaExpiracion" class="swal2-input" placeholder="MM/AA">
        <label class="inputLabel" for="cvv">CVV:</label>
        <input type="number" id="cvv" class="swal2-input inputNumber" placeholder="123">
        <label class="inputLabel" for="titular">Titular de la tarjeta:</label>
        <input type="text" class="swal2-input" id="titular" placeholder="Titular de la tarjeta">
        <label class="inputLabel" for="dni">DNI:</label>
        <input type="number" class="swal2-input" id="dni" placeholder="Tu dni">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Pagar',
        customClass: {
            htmlContainer: 'htmlContainer',
            title: 'title',
            popup: 'popup',
            input: 'input',
            confirmButton: 'sweet-btn',
            cancelButton: 'sweet-btn'
        },
        preConfirm: () => {
            const numeroTarjeta = document.getElementById('numeroTarjeta').value;
            const fechaExpiracion = document.getElementById('fechaExpiracion').value;
            const cvv = document.getElementById('cvv').value;
            const titular = document.getElementById('titular').value;
            const dni = document.getElementById('dni').value;
            if (!numeroTarjeta || !fechaExpiracion || !cvv || !titular || !dni) {
                Swal.showValidationMessage('Debes completar todos los campos de la tarjeta');
                return false;
            } else if (numeroTarjeta === Number && dni === Number) {
                Swal.showValidationMessage('Debes ingresar número de tarjeta valido');
            }
            return { numeroTarjeta, fechaExpiracion, cvv, titular, dni };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (metodoDeEntrega === 'domicilio') {
                confirmacion(`¡Pago aprobado con exitos! Su pedido se entregara a domicilio. ¡Muchas Gracias!`);
            } else if (metodoDeEntrega === 'local') {
                confirmacion(`¡Pago aprobado con exitos! Podras retirarlo en 30 minutos por nuestro local. ¡Muchas Gracias!`);
            }
        }
        carrito = [];
        actualizarCarrito(carrito);
        actualizarTotal(carrito);
    });
};

// Funcion solicitar datos del domicilio
const solicitarDatosDomicilio = (metodoDePago, metodoDeEntrega) => {
    Swal.fire({
        title: 'Ingresa los datos de envío',
        html: `
                <label class="inputLabel" for="nombre">Tu nombre:</label>
                <input type="text" id="nombre" class="swal2-input" placeholder="Tu nombre">
                <label class="inputLabel" for="direccion">Dirección:</label>
                <input type="text" id="direccion" class="swal2-input" placeholder="Domicilio de entrega">
                <label class="inputLabel" for="telefono">Teléfono:</label>
                <input type="number" id="telefono" class="swal2-input" placeholder="Tu telefono">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Envío',
        customClass: {
            htmlContainer: 'htmlContainer',
            title: 'title',
            popup: 'popup',
            input: 'input-dom',
            confirmButton: 'sweet-btn',
            cancelButton: 'sweet-btn'
        },
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value;
            const direccion = document.getElementById('direccion').value;
            const telefono = document.getElementById('telefono').value;
            if (!nombre || !direccion || !telefono) {
                Swal.showValidationMessage('Debes completar todos los campos de envío');
                return false;
            }
            return { nombre, direccion, telefono };
        }
    }).then((result) => {
        if (metodoDePago === 'tarjeta') {
            solicitarDatosTarjeta(metodoDeEntrega);
        } else {
            confirmacion(`¡Envío registrado! Su pedido se entregará en ${result.value.direccion}. Podrás abonarlo cuando llegue el cadete. ¡Gracias por la compra!`);
            carrito = [];
            actualizarCarrito(carrito);
            actualizarTotal(carrito);
        }
    });
};

// Total de los productos
const actualizarTotal = () => {
    const total = document.querySelector('.carrito_contenedor_total-boton_total');
    total.textContent = `Total: $${totalCarrito}`;
};

// Boton vaciar carrito
const carritoContenedor = document.querySelector('.carrito_contenedor');
const divBtnVaciar = document.createElement('div');
divBtnVaciar.classList.add('carrito_contenedor_total-boton');
const txtTotal = document.createElement('p');
txtTotal.classList.add('carrito_contenedor_total-boton_total');
const btnVaciar = document.createElement('button');
btnVaciar.classList.add('carrito_contenedor_total-boton_vaciar');
btnVaciar.setAttribute('id', 'carrito_vaciar');
btnVaciar.textContent = 'Vaciar carrito';
divBtnVaciar.appendChild(txtTotal);
divBtnVaciar.appendChild(btnVaciar);
carritoContenedor.appendChild(divBtnVaciar);

// Vaciar carrito
const vaciar = document.getElementById('carrito_vaciar');
vaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito(carrito);
});

// Boton finalizar compra
const seccionCarrito = document.getElementById('seccion_carrito');
const finCompraContenedor = document.createElement('div');
finCompraContenedor.classList.add('carrito_finalizar');
const btnfinalizar = document.createElement('button');
btnfinalizar.classList.add('contenedor_finalizar_btn');
btnfinalizar.setAttribute('id', 'finalizar_compra');
btnfinalizar.textContent = 'Finalizar Compra';
finCompraContenedor.appendChild(btnfinalizar);
seccionCarrito.appendChild(finCompraContenedor);
btnfinalizar.addEventListener('click', (e) => {
    if (carrito.length >= 1) {
        formCompra();
    } else {
        msjAlert('No agregaste ningun pedido');
    }
});

menuHamburguesa();
actualizarCarrito(carrito);