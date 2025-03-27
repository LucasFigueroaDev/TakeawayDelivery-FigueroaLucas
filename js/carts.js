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
    finishOrder.addEventListener('click', () => {
        if (carrito.length >= 1) {
            formPay();
        } else {
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
    productItem.textContent = `${item.nombre} - Cantidad ${item.cantidad}`;

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
    const category = document.querySelector('.categoryContainer');
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