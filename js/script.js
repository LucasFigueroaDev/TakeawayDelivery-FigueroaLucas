import { notificacionCarrito, msjAlert, menuHamburguesa } from "./utils.js";

let productos;

// Funcion para cargar productos del archivo json
const url = 'json/productos.json';
async function cargarProductos() {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        productos = datos;
        if (productos.length === 0 ){
            msjAlert('No hay productos disponibles');
        }
    } catch (error) {
        msjAlert('Error al cargar los productos');
    }
}
cargarProductos();

// Variables del DOM
const menu = document.getElementById('menu');
const contenedor = document.getElementById('contenedor');
const linkMenu = document.getElementById('link-menu');


// Crear div con los producto
const divProducto = (producto) => {
    // Crear elementos
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    // agregar clases
    div.classList.add('activo_cards_card');
    img.classList.add('activo_cards_card_img');
    p.classList.add('activo_cards_card_txt');
    btn.classList.add('activo_cards_card_btn');
    // agregar id
    btn.setAttribute('id', producto.id);
    // agregar contenido
    img.setAttribute('src', `assets/img-productos/producto${producto.id}.webp`);
    img.setAttribute('alt', `${producto.nombre}`);
    h3.textContent = producto.nombre;
    p.textContent = `Precio: $${producto.precio}`;
    btn.textContent = 'Agregar pedido';
    // agregar al html
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(btn);
    return div;
};

// Evento donde muestra los productos en el html
linkMenu.addEventListener('click', async () => {
    menu.classList.add('activo');
    contenedor.innerHTML = '';

    if(!productos){
        await cargarProductos();
    }

    productos.forEach((producto) => {
        const contenido = divProducto(producto);
        contenedor.appendChild(contenido);
    });

});

// Crear carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
notificacionCarrito(carrito.length);

// Funcion para seleccionar productos segun id
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('activo_cards_card_btn')) {
        const productoId = parseInt(e.target.id);
        const productoSeleccionado = productos.find((producto) =>
            producto.id === productoId);
        if (productoSeleccionado) {
            // Verificar si el producto ya está en el carrito
            const productoEnCarrito = carrito.find(item => item.id === productoId);

            if (productoEnCarrito) {
                // Si el producto ya está en el carrito, incrementar su cantidad
                productoEnCarrito.cantidad += 1;
            } else {
                // Si no está en el carrito, agregarlo con cantidad inicial de 1
                carrito.push({ ...productoSeleccionado, cantidad: 1 });
            }
            notificacionCarrito(carrito.length);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            msjAlert('pedido agregado');
        }
    }
});

menuHamburguesa();