import { crearProducto } from "./utils.js";
const productos = crearProducto();
const menu = document.getElementById('menu');
const contenedor = document.getElementById('contenedor');
const linkMenu = document.getElementById('link-menu');
// Crear div con los producto
const divProducto = (producto) => {
    // Crear elementos
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    // agregar clases
    div.classList.add('activo_cards_card');
    p.classList.add('activo_cards_card_txt');
    btn.classList.add('activo_cards_card_btn');
    // agregar id
    btn.setAttribute('id', producto.id);
    // agregar contenido
    h3.textContent = producto.nombre;
    p.textContent = `Precio: $${producto.precio}`;
    btn.textContent = 'Agregar pedido';
    // agregar al html
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(btn);

    return div;
};
// Evento donde muestra los productos en el html
linkMenu.addEventListener('click', () => {
    menu.classList.add('activo');
    contenedor.innerHTML = '';

    productos.forEach((producto) => {
        const contenido = divProducto(producto);
        contenedor.appendChild(contenido);
    });

});
// Crear carrito
let carrito = [];
// Funcion para seleccionar productos segun id
contenedor.addEventListener('click', (e)=>{ //Se agrega un evento al contenedor de los pedidos
    if (e.target.classList.contains('activo_cards_card_btn')){ // Se busca todos los botones con la clase activo_cards_card_btn
        const productoId = parseInt(e.target.id); // Se seleciona el id que selecciona el usuario y se convierte a entero para poder compararlo
        const productoSeleccionado = productos.find((producto) =>
            producto.id === productoId);
        carrito.push(productoSeleccionado); 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log(carrito);   
    }
});





// // función enviar a domicilio
// let envio = 2000;
// let domicilio = "";
// let total = "";
// const enviarADomicilio = () => {
//     domicilio = prompt('¿Cual es su domicilio?');
//     for (const producto of productosSeleccionados) {
//         console.log(`${producto.nombre}`);
//         console.log(`${producto.precio}`);
//     }
//     alert(`Se enviara a ${domicilio} y el total es: ${total + envio}`);
// };

// //Funcion mostrar productos seleccionados
// const mostrarProductosSeleccionados = () => {
//     productosSeleccionados = idProducto.map(indice => productos[indice]);
//     total = calcularImporteTotal(productosSeleccionados);
//     console.log(productosSeleccionados);
//     enviarADomicilio();
// };










