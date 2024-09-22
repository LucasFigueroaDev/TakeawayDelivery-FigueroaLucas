import { calcularImporteTotal } from "./utils.js";
import { eliminarProducto } from "./utils.js";
import { crearNotificacion } from "./utils.js";
import { notificacionCarrito } from "./utils.js";
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
        actualizarTotal(0);
        notificacionCarrito(0);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        return;
    }

    carrito.forEach(producto => {
        crearCarrito(producto, contenedorCarrito);
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));

    agregarEventosEliminar();
    actualizarTotal(carrito);
    notificacionCarrito(carrito.length);
}

// Evento eliminar 
const agregarEventosEliminar = () => {
    const botonesEliminar = document.querySelectorAll('.carrito_contenedor_lista_li_btn');
    const tituloNtf = 'Producto eliminado con exito';
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = e.target.id;
            const carritoActualizado = eliminarProducto(productoId);
            actualizarCarrito(carritoActualizado);
            crearNotificacion(tituloNtf);
        });
    });
};

// Total de los productos
const actualizarTotal = (carrito) => {
    const totalCarrito = carrito.length > 0 ? calcularImporteTotal(carrito) : 0;
    const total = document.querySelector('.carrito_contenedor_total-boton_total');
    total.textContent = `Total: $${totalCarrito}`;
};

// Vaciar carrito
const vaciar = document.getElementById('carrito_vaciar');
const tituloVaciar = 'Productos eliminado con exito';
vaciar.addEventListener('click', (e) => {
    carrito = [];
    actualizarCarrito(carrito);
});

actualizarCarrito(carrito);