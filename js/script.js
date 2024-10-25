import { notificacionCarrito, msjAlert, menuHamburguesa } from "./utils.js";
let productos;
// Funcion para cargar productos del archivo json
const url = 'json/productos.json';
async function cargarProductos() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Error al cargar los productos" + respuesta.status + respuesta.statusText);
        }
        const datos = await respuesta.json();

        productos = datos;
    } catch (error) {
        msjAlert(`Error al cargar los productos`);
    }
}
cargarProductos();
// Funcion crear categoria de productos
function createCategory(title, img) {
    const div = document.createElement('div');
    div.classList.add('categories_containerCategories');
    const h3 = document.createElement('h3');
    h3.classList.add('categories_containerCategories_title');
    h3.textContent = title;
    const image = document.createElement('img');
    image.classList.add('categories_containerCategories_image');
    image.src = `assets/img-productos/producto${img}.webp`
    image.alt = `imagen de ${title}`;
    image.width = '800';
    image.height = '800';
    div.appendChild(h3);
    div.appendChild(image);
    categories.appendChild(div);
    image.addEventListener('click', async () => { 
        await cargarProductos();
        showCategory(productos, title);
    });
};
// Cargar por categorias
const showCategory = (productos, nombreCategoria) => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('categoryContainer');
    const categoryProducts = productos[nombreCategoria];
    if (!categoryProducts || categoryProducts.length === 0) {
        msjAlert(`No se encontraron productos en la categoría de ${nombreCategoria}`);
        return;
    }
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = nombreCategoria.charAt(0).toUpperCase() + nombreCategoria.slice(1);
    categoryContainer.appendChild(categoryTitle);
    categoryProducts.forEach((product) => {
        const contenido = divProducto(product);
        categoryContainer.appendChild(contenido);
    });
    categories.appendChild(categoryContainer);
};
// Creacion del header
const header = document.getElementById('header');
const linksNav = [
    {
        id: "home",
        href: "index.html",
        name: "Home"
    },
    {
        id: "categorias",
        href: "#categorias",
        name: "Categorias"
    },
    {
        id: "clientes",
        href: "#clientes",
        name: "Clientes"
    },
    {
        id: "nosotros",
        href: "#nosotros",
        name: "Nosotros"
    },
    {
        id: "hacerPedido",
        href: "./html/hacerpedido.html",
        name: "Hacer pedido"
    }
];
const containerHeader = document.createElement('div');
containerHeader.classList.add('containerHeader');
function createNav(linksNav) {
    const nav = document.createElement('nav');
    const h1 = document.createElement('h1');
    nav.classList.add('containerHeader_nav');
    h1.classList.add('containerHeader_nav_title');
    h1.textContent = 'Fast Food';
    const ul = document.createElement('ul');
    ul.classList.add('containerHeader_nav_ul');
    linksNav.forEach(link => {
        const li = document.createElement('li');
        li.classList.add('containerHeader_nav_ul_li');
        const a = document.createElement('a');
        a.classList.add('containerHeader_nav_ul_li_a');
        a.textContent = link.name;
        a.href = link.href;
        li.appendChild(a);
        ul.appendChild(li);
    });
    nav.appendChild(h1);
    nav.appendChild(ul);
    containerHeader.appendChild(nav);
    header.appendChild(containerHeader);
};
createNav(linksNav);
const containerDescription = document.createElement('div');
containerDescription.classList.add('containerHeader_description');
const divText = document.createElement('div');
const textOne = document.createElement('p');
textOne.classList.add('containerHeader_description_textOne');
textOne.textContent = 'Delivery or Takeaway Food';
const textTwo = document.createElement('p');
textTwo.classList.add('containerHeader_description_textTwo');
textTwo.textContent = 'Un Restaurant con sabores unicos';
divText.appendChild(textOne);
divText.appendChild(textTwo);
containerDescription.appendChild(divText);
const divImage = document.createElement('div');
const imgDelivery = document.createElement('img');
imgDelivery.classList.add('containerHeader_description_imgDelivery');
imgDelivery.src = 'assets/header.png';
imgDelivery.alt = 'Imagen de delivery';
imgDelivery.width = '1024';
imgDelivery.height = '800';
divImage.appendChild(imgDelivery);
containerDescription.appendChild(divImage);
containerHeader.appendChild(containerDescription);
// Seccion categorias
const categories = document.getElementById('categories');
const title = document.createElement('h2');
title.classList.add('categories_title');
title.textContent = 'Categorías';
categories.appendChild(title);
// Seccion pizzas
createCategory('pizzas', 1);
// Seccion lomos
createCategory('lomos', 9);
// Seccion empanadas
createCategory('empanadas', 13);
// Seccion bebidas
createCategory('bebidas', 17);
// Seccion ensaladas
createCategory('ensaladas', 22);
// Crear div con los producto
const divProducto = (producto) => {
    // Crear elementos
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    btn.setAttribute('id', producto.id);
    img.src = `assets/img-productos/producto${producto.id}.webp`;
    img.alt = `${producto.nombre}`;
    img.width = '800';
    img.height = '800';
    h3.textContent = producto.nombre;
    p.textContent = `Precio: $${producto.precio}`;
    btn.textContent = 'Agregar pedido';
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(btn);
    return div;
};


// // Crear carrito
// let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// notificacionCarrito(carrito.length);

// // Funcion para seleccionar productos segun id, si existe el producto le suma la cantidad
// contenedor.addEventListener('click', (e) => {
//     if (e.target.classList.contains('activo_cards_card_btn')) {
//         const productoId = parseInt(e.target.id);
//         const productoSeleccionado = productos.find((producto) =>
//             producto.id === productoId);
//         if (productoSeleccionado) {
//             const productoEnCarrito = carrito.find(item => item.id === productoId);
//             if (productoEnCarrito) {
//                 productoEnCarrito.cantidad += 1;
//             } else {
//                 carrito.push({ ...productoSeleccionado, cantidad: 1 });
//             }
//             notificacionCarrito(carrito.length);
//             localStorage.setItem('carrito', JSON.stringify(carrito));
//             msjAlert('pedido agregado');
//         }
//     }
// });

// menuHamburguesa();