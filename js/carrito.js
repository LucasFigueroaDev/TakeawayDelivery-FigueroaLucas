import { calcularImporteTotal } from "./utils.js";
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaCarrito = document.getElementById('carrito_lista');
// Crear lista de carrito
const liCarrito = (producto) => {
    const liContenido = document.createElement('li');
    liContenido.innerHTML = `<h3 class="carrito_lista_titulo">${producto.nombre}</h3> 
    <p class="carrito_lista_txt">Precio: $${producto.precio}</p> <button class="carrito_lista_btn">Eliminar pedido</button>`;
    return liContenido;
};
carrito.forEach((producto) => {
    const li = liCarrito(producto);
    listaCarrito.appendChild(li);
});

const total = calcularImporteTotal(carrito);
console.log(total);
