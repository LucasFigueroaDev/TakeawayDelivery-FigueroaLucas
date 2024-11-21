import { msjAlert, menuHamburguesa, linksNav, confirmacion } from "./utils.js";
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
    });

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
            addProductCart(productoId, categoryProducts);
        }
    });
};
// agregar producto al carrito
const addProductCart = (productoId, categoryProducts) => {
    const productoSeleccionado = categoryProducts.find((producto) => producto.id === productoId);
    if (productoSeleccionado) {
        const productoEnCarrito = carrito.find(item => item.id === productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }
        updateLocalStorage();
        msjAlert('Pedido agregado');
        productCartWindow();
        calculateTotalCart();
    }
}
// Creacion del header
const header = document.getElementById('header');
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
    div.classList.add('categoryContainer_container-products');

    const img = document.createElement('img');
    img.classList.add('categoryContainer_container-products_image');
    img.src = `assets/img-productos/producto${producto.id}.webp`;
    img.alt = `${producto.nombre}`;
    img.width = '800';
    img.height = '800';

    const h3 = document.createElement('h3');
    h3.classList.add('categoryContainer_container-products_title');
    h3.textContent = producto.nombre;

    const p = document.createElement('p');
    p.classList.add('categoryContainer_container-products_txt');
    p.textContent = `Precio: $${producto.precio}`;

    const btn = document.createElement('button');
    btn.classList.add('categoryContainer_container-products_btn');
    btn.setAttribute('id', producto.id);
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
        boxSelectedProducts = createContainerSelectedProducts();
    }

    if (carrito && carrito.length >= 1) {
        boxSelectedProducts.classList.replace('selectedProducts-disable', 'selectedProducts');
        updateCartList();
    }
    categories.appendChild(boxSelectedProducts);
};
// crear contenedor de productos seleccionados
const createContainerSelectedProducts = () => {
    const boxSelectedProducts = document.createElement('div');
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

    const emptyCart = createEmptyCart();

    const closeButton = createCloseButton();
    closeButton.addEventListener('click', () => {
        boxSelectedProducts.classList.remove('selectedProducts');
        boxSelectedProducts.classList.add('selectedProducts-disable');
    });

    const totalCart = document.createElement('p');
    totalCart.classList.add('selectedProducts_total');

    const buttonFinistOrden = createFinishButton();

    boxSelectedProducts.appendChild(boxTitle);
    boxSelectedProducts.appendChild(boxTxt);
    boxSelectedProducts.appendChild(productList);
    boxSelectedProducts.appendChild(totalCart);
    boxSelectedProducts.appendChild(buttonFinistOrden);
    boxSelectedProducts.appendChild(emptyCart);
    boxSelectedProducts.appendChild(closeButton);

    return boxSelectedProducts;
};
// crear boton finalizar compra
const createFinishButton = () => {
    const finishOrder = document.createElement('button');
    finishOrder.classList.add('selectedProducts_finish');
    finishOrder.textContent = 'Finalizar compra';
    finishOrder.addEventListener('click', ()=> {
        if (carrito.length >= 1){
            formPay();
        }else {
            msjAlert('¡El carrito esta vacio!')
        }
    });
    return finishOrder;
};
// crear boton vaciar carrito
const createEmptyCart = () => {
    const emptyCart = document.createElement('button');
    emptyCart.classList.add('selectedProducts_emptyCart');
    emptyCart.textContent = 'Vaciar carrito';
    emptyCart.addEventListener('click', () => {
        carrito = [];
        updateLocalStorage();
        updateCartList();
    });
    return emptyCart;
};
// crear boton cerrar modal
const createCloseButton = () => {
    const closeButton = document.createElement('button');
    closeButton.classList.add('selectedProducts_close-btn');
    closeButton.textContent = 'Cerrar carrito';
    return closeButton;
};
// actualizar lista de carrito
const updateCartList = () => {
    const productList = document.querySelector('.selectedProducts_list');
    if (!productList) {
        return
    }
    productList.innerHTML = '';

    carrito.forEach((item) => {
        const productItem = createProductItemElement(item);
        productList.appendChild(productItem);
    });

    calculateTotalCart();
};
// crear elemento de artículo de producto
const createProductItemElement = (item) => {
    const productItem = document.createElement('li');
    productItem.classList.add('selectedProducts_list_item');
    productItem.textContent = `${item.nombre} - Cantindad ${item.cantidad}`;

    const addButton = createAddButton(item);
    const removeButton = createRemoveButton(item);

    productItem.appendChild(addButton);
    productItem.appendChild(removeButton);

    return productItem;
};
// crear boton agregar
const createAddButton = (item) => {
    const addButton = document.createElement('button');
    addButton.classList.add('selectedProducts_list_button');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        item.cantidad += 1;
        updateLocalStorage();
        updateCartList();
    });
    return addButton;
};
// crear boton remover
const createRemoveButton = (item) => {
    const removeButton = document.createElement('button');
    removeButton.classList.add('selectedProducts_list_button');
    removeButton.textContent = '-';
    removeButton.addEventListener('click', () => {
        if (item.cantidad > 1) {
            item.cantidad -= 1;
        } else {
            const index = carrito.findIndex(producto => producto.id === item.id);
            if (index !== -1) {
                carrito.splice(index, 1);
            }
        }
        updateCartList();
    });
    return removeButton;
};
// actualizar almacenamiento local
const updateLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Calcular total
const calculateTotalCart = () => {
    totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const totalCartElement = document.querySelector('.selectedProducts_total');
    if (totalCartElement) {
        totalCartElement.textContent = `Total: $${totalCarrito}`;
    }
};
// formulario finalizar orden
const formPay = () => {
    const category = document.getElementById('categoryContainer');
    category.style.display = 'none';
    const cartProducts = document.getElementById('selectedProducts');
    cartProducts.classList.replace('selectedProducts', 'selectedProducts-disable');
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
                updateCartList();
                calculateTotalCart();
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
                confirmacion(`¡Pago aprobado con exitos! Su pedido se entregara a tu domicilio. ¡Muchas Gracias!`);
            } else if (metodoDeEntrega === 'local') {
                confirmacion(`¡Pago aprobado con exitos! Podras retirarlo en 30 minutos por nuestro local. ¡Muchas Gracias!`);
            }
        }
        carrito = [];
        updateCartList();
        calculateTotalCart();
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
            let direccion = document.getElementById('direccion').value;
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
            updateCartList();
            calculateTotalCart();
        }
    });
};
// menuHamburguesa();
