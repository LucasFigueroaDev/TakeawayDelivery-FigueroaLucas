import { calcularImporteTotal } from "./utils.js";
import { eliminarProducto } from "./utils.js";
import { crearNotificacion } from "./utils.js";
import { notificacionCarrito } from "./utils.js";
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let totalCarrito = 0;
// Crear lista de carrito
const crearCarrito = (producto, contenedorCarrito) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    li.classList.add('carrito_contenedor_lista_li');

    h3.textContent = producto.nombre;

    p.textContent = `Precio: $${producto.precio}`;

    btn.textContent = 'Eliminar producto';
    btn.classList.add('carrito_contenedor_lista_li_btn');
    btn.setAttribute('id', producto.id);

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(btn);
    li.appendChild(div);

    contenedorCarrito.appendChild(li);
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

    agregarEventosEliminar();
    totalCarrito = calcularImporteTotal(carrito);
    actualizarTotal();
    notificacionCarrito(carrito.length);
}

// Total de los productos
const actualizarTotal = () => {
    const total = document.querySelector('.carrito_contenedor_total-boton_total');
    total.textContent = `Total: $${totalCarrito}`;
};

// Evento eliminar 
const agregarEventosEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.carrito_contenedor_lista_li_btn');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = e.target.id;
            const carritoActualizado = eliminarProducto(productoId);
            actualizarCarrito(carritoActualizado);
            crearNotificacion('Pedido eliminado con exito');
        });
    });
};


// Vaciar carrito
const vaciar = document.getElementById('carrito_vaciar');
vaciar.addEventListener('click', (e) => {
    carrito = [];
    actualizarCarrito(carrito);
});

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
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const select = document.createElement('select');
        const selectLugar = document.createElement('select');
        const btnAceptar = document.createElement('button');
        const btnCancelar = document.createElement('button');
        const opcion1 = document.createElement('option');
        const opcion2 = document.createElement('option');
        const opcionLugar = document.createElement('option');
        const input = document.createElement('input');

        input.classList.add('contenedor_finalizar_input');
        input.setAttribute('placeholder', 'Ingrese su dirección');
        input.setAttribute('id', 'direccion');
        div.classList.add('contenedor_finalizar');
        h3.classList.add('contenedor_finalizar_titulo');
        select.classList.add('contenedor_finalizar_select');
        selectLugar.classList.add('contenedor_finalizar_select');
        opcion1.setAttribute('value', 'opcion1');
        opcion2.setAttribute('value', 'opcion2');
        opcionLugar.setAttribute('value', 'vcp');
        btnAceptar.classList.add('contenedor_finalizar_btn');
        btnAceptar.setAttribute('id', 'aceptar');
        btnCancelar.classList.add('contenedor_finalizar_btn');
        btnCancelar.setAttribute('id', 'cancelar');

        h3.textContent = 'Finalizar compra';
        p.textContent = `El total de tu compra es: $${totalCarrito}`;
        opcion1.textContent = 'Retiro por el local';
        opcion2.textContent = 'Envio a domicilio';
        opcionLugar.textContent = 'Villa Carlos Paz';
        selectLugar.style.display = 'none';
        btnAceptar.textContent = 'Aceptar compra';
        btnCancelar.textContent = 'Cancelar compra';

        select.appendChild(opcion1);
        select.appendChild(opcion2);
        selectLugar.appendChild(opcionLugar);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(select);
        div.appendChild(selectLugar);
        div.appendChild(input);

        div.appendChild(btnAceptar);
        div.appendChild(btnCancelar);

        document.body.appendChild(div);

        const opcion = document.querySelector('.contenedor_finalizar_select');
        let opcionElegida = "";
        opcion.addEventListener('change', (e) => {
            opcionElegida = e.target.value;
            if (opcionElegida === 'opcion2') {
                const totalConEnvio = totalCarrito + 2000;
                console.log(totalConEnvio);
                p.textContent = `El total de tu compra mas envio es: $${totalConEnvio}`;
                input.style.display = 'block';
                selectLugar.style.display = 'block';
            } else {
                input.style.display = 'none';
                selectLugar.style.display = 'none';
                p.textContent = `El total de tu compra es: $${totalCarrito} podras retirarlo por nuestro local en 20 minutos.`;
            }
        });


        let direccion = document.getElementById('direccion');
        btnAceptar.addEventListener('click', (e) => {
            if (opcionElegida === 'opcion2'){
                if (direccion.value.trim() === "") {
                    crearNotificacion('Por favor rellena tu dirección');
                }else {
                    crearNotificacion('Gracias por la compra en breve te enviamos tu pedido');
                    carrito = [];
                    actualizarCarrito(carrito);
                    actualizarTotal();
                    setTimeout(() => {
                        div.style.display = 'none';
                    }, 2000);
                }
            } else {
                    crearNotificacion('Gracias por la compra podras retirar tu pedido en 20 minutos por nuestro local');
                    carrito = [];
                    actualizarCarrito(carrito);
                    actualizarTotal();
                    setTimeout(() => {
                        div.style.display = 'none';
                    }, 2000);
            }
        });

        btnCancelar.addEventListener('click', (e) => {
            carrito = [];
            actualizarCarrito(carrito);
            actualizarTotal();
            div.style.display = 'none';
        });
    } else {
        crearNotificacion('No agregaste ningun pedido');
    }
});
actualizarCarrito(carrito);