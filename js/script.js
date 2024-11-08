import { msjAlert, menuHamburguesa } from "./utils.js";
// Variable
let productos;
let productosCargados = false;
let totalCarrito = 0;
const categories = document.getElementById('categories');

// Crear carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// notificacionCarrito(carrito.length);

// Funcion para cargar productos del archivo json
const url = 'json/productos.json';
async function cargarProductos() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Error al cargar los productos" + respuesta.status + respuesta.statusText);
        }
        productos = await respuesta.json();
        productosCargados = true;
    } catch (error) {
        msjAlert(`Error al cargar los productos`);
    }
}
await cargarProductos();

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
    image.addEventListener('click', () => {
        if (!productosCargados) return msjAlert('Error: Productos no estan cargados');
        showCategory(productos, title);
    });
};

// Cargar por categorias
const showCategory = (productos, nombreCategoria) => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('categoryContainer');
    categoryContainer.setAttribute('id', 'categoryContainer');

    const btnClose = document.createElement('button');
    btnClose.classList.add('categoryContainer_btn-close');
    btnClose.textContent = 'X';
    categoryContainer.appendChild(btnClose);
    btnClose.addEventListener('click', () => {
        categoryContainer.style.display = 'none';
    })

    const categoryProducts = productos[nombreCategoria];
    if (!categoryProducts || categoryProducts.length === 0) {
        msjAlert(`No se encontraron productos en la categoría de ${nombreCategoria}`);
        return;
    }

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('categoryContainer_title');
    categoryTitle.textContent = nombreCategoria.charAt(0).toUpperCase() + nombreCategoria.slice(1);
    categoryContainer.appendChild(categoryTitle);
    categoryProducts.forEach((product) => {
        const contenido = divProducto(product);
        categoryContainer.appendChild(contenido);
    });
    categories.appendChild(categoryContainer);

    categoryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('categoryContainer_container-products_btn')) {
            const productoId = parseInt(e.target.id);

            const productoSeleccionado = categoryProducts.find((producto) =>
                producto.id === productoId);

            if (productoSeleccionado) {
                const productoEnCarrito = carrito.find(item => item.id === productoId);
                if (productoEnCarrito) {
                    productoEnCarrito.cantidad += 1;
                } else {
                    carrito.push({ ...productoSeleccionado, cantidad: 1 });
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
                msjAlert('pedido agregado');
                productCartWindow();
            }
        }
    })
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
const title = document.createElement('h2');
title.classList.add('categories_title');
title.textContent = 'Categorías';
categories.appendChild(title);
// Secciones
createCategory('pizzas', 1);
createCategory('lomos', 9);
createCategory('empanadas', 13);
createCategory('bebidas', 17);
createCategory('ensaladas', 22);

const divProducto = (producto) => {
    // Crear elementos
    const div = document.createElement('div');
    div.classList.add('categoryContainer_container-products')
    const img = document.createElement('img');
    img.classList.add('categoryContainer_container-products_image');
    const h3 = document.createElement('h3');
    h3.classList.add('categoryContainer_container-products_title');
    const p = document.createElement('p');
    p.classList.add('categoryContainer_container-products_txt');
    const btn = document.createElement('button');
    btn.classList.add('categoryContainer_container-products_btn');
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

// Crear modal carrito
const productCartWindow = () => {

    let boxSelectedProducts = document.getElementById('selectedProducts');
    if (!boxSelectedProducts) {
        boxSelectedProducts = document.createElement('div');
        boxSelectedProducts.setAttribute('id', 'selectedProducts');
        boxSelectedProducts.classList.add('selectedProducts-disable');

        const boxTitle = document.createElement('h2');
        boxTitle.classList.add('selectedProducts_title');
        boxTitle.textContent = 'Carrito de compras';

        const boxTxt = document.createElement('p');
        boxTxt.classList.add('selectedProducts_txt');
        boxTxt.textContent = 'Productos agregados';

        const productList = document.createElement('ul');
        productList.classList.add('selectedProducts_list');

        const emptyCart = document.createElement('button');
        emptyCart.classList.add('selectedProducts_emptyCart');
        emptyCart.textContent = 'Vaciar carrito';
        emptyCart.addEventListener('click', () => {
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            updateCartList();
        });

        const closeButton = document.createElement('button');
        closeButton.classList.add('selectedProducts_close-btn');
        closeButton.textContent = 'Cerrar carrito';
        closeButton.addEventListener('click', () => {
            boxSelectedProducts.classList.remove('selectedProducts');
            boxSelectedProducts.classList.add('selectedProducts-disable');
        });

        boxSelectedProducts.appendChild(boxTitle);
        boxSelectedProducts.appendChild(boxTxt);
        boxSelectedProducts.appendChild(productList);
        boxSelectedProducts.appendChild(emptyCart);
        boxSelectedProducts.appendChild(closeButton);
        categories.appendChild(boxSelectedProducts);
    }

    if (carrito && carrito.length >= 1) {
        updateCartList();
        boxSelectedProducts.classList.remove('selectedProducts-disable');
        boxSelectedProducts.classList.add('selectedProducts');
    }
};

const updateCartList = () => {
    const productList = document.querySelector('.selectedProducts_list');
    productList.innerHTML = '';

    carrito.forEach((item) => {
        const productItem = document.createElement('li');
        productItem.classList.add('selectedProducts_list_item');
        productItem.textContent = `${item.nombre} - Cantindad ${item.cantidad}`;

        const addButton = document.createElement('button');
        addButton.classList.add('selectedProducts_list_button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            item.cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            updateCartList(); // Actualizar lista tras el cambio
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('selectedProducts_list_button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => {
            if (item.cantidad > 1) {
                item.cantidad -= 1;
            } else {
                const index = carrito.findIndex(producto => producto.id === item.id);
                if (index !== -1) {
                    carrito.splice(index, 1); // Elimina el producto si su cantidad es 1
                }
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            updateCartList();
        });

        productList.appendChild(productItem);
        productList.appendChild(addButton);
        productList.appendChild(removeButton);
    });
};

console.log(carrito);

// menuHamburguesa();
