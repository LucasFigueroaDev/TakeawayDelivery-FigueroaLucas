import { cartProducts, createButton, calcularTotal } from "./utils.js";
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartProducts(cart);
let clienteData = {};

const cardProducts = (product) => {
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('section-cart_content_card');
    cartContainer.innerHTML = `
    <h3 class="section-cart_content_card_title">${product.name}</h3>
    <p class="section-cart_content_card_price">Precio: $${product.price}</p>
    <p class="section-cart_content_card_quantity">Cantidad: ${product.quantity}</p>
    `;
    const addProduct = createButton('section-cart_content_card_button', 'add', '+');
    addProduct.addEventListener('click', () => {
        product.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    })
    const removeProduct = createButton('section-cart_content_card_button', 'remove', '-');
    removeProduct.addEventListener('click', () => {
        product.quantity -= 1;
        if (product.quantity <= 0) {
            const index = cart.indexOf(product);
            if (index > -1) { cart.splice(index, 1) };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    })
    cartContainer.appendChild(addProduct);
    cartContainer.appendChild(removeProduct);
    return cartContainer;
}

const renderCart = () => {
    const containerCartProducts = document.getElementById('productsCart');
    const content = document.createElement('div');
    content.classList.add('section-cart_content_buttons');
    const totalCart = document.createElement('p');
    const total = calcularTotal(cart).toFixed(2);
    const finishPurchaseButton = createButton('section-cart_content_buttons_finpurchase', 'Finalizar compra', 'Finalizar compra');
    const emptyCartButton = createButton('section-cart_content_buttons_empty-cart', 'vaciar carrito', 'Vaciar carrito');
    totalCart.classList.add('section-cart_content_buttons_total');
    totalCart.textContent = `Total a pagar $${total}`;
    finishPurchaseButton.addEventListener('click', () => {
        formPay();
        // cart = [];
        // localStorage.setItem('cart', JSON.stringify(cart));
        // renderCart();
    })
    emptyCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
        renderCart();
    })
    content.appendChild(totalCart);
    content.appendChild(finishPurchaseButton);
    content.appendChild(emptyCartButton);
    containerCartProducts.innerHTML = '';
    if (cart.length >= 1) {
        for (const product of cart) {
            const card = cardProducts(product);
            containerCartProducts.appendChild(card);
        }
        containerCartProducts.appendChild(content);
    } else {
        const emptyCart = document.createElement('p');
        emptyCart.innerHTML = 'Tu carrito esta vacio';
        containerCartProducts.appendChild(emptyCart);
    }
};
const formPay = () => {
    Swal.fire({
        title: 'Completa tus datos',
        html: `
        <label>Tu nombre completo</label>
        <input class="inputswal" type="text" id="name">
        <label>Tu email</label>
        <input class="inputswal" type="email" id="email">
        <label>Tu telefono</label>
        <input class="inputswal" type="text" id="telefono">
        <label>Domicilio</label>
        <input class="inputswal" type="text" id="domicilio">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        customClass: {
            htmlContainer: 'htmlContainer',
            popup: 'popup',
            input: 'inputswal'
        },
        preConfirm: () => {
            const name = document.getElementById('name').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            if (!name || !telefono || !email) {
                Swal.showValidationMessage('Debes completar todos los datos');
                return false;
            }
            return { name, telefono, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            clienteData = result.value;
            paymentMethod();
        }
    })
}

const paymentMethod = () => {
    Swal.fire({
        title: 'Metodo de pago y envio',
        html: `<label>Método de pago:</label>
                <select class="inputswal" id="paymentMethod">
                <option class="inputswal" value="tarjeta">Tarjeta de crédito/débito</option>
                <option class="inputswal" value="transferencia">Transferencia</option>
                </select>
                <label>Tipo de entrega:</label>
                <select class="inputswal" id="deliveryMethod">
                <option value="local">Retirar por local</option>
                <option value="domicilio">Enviar a domicilio</option>
                </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        customClass:{
            htmlContainer: 'htmlContainer'
        },
        preConfirm: () => {
            const paymentMethod = document.getElementById('paymentMethod').value;
            const deliveryMethod = document.getElementById('deliveryMethod').value;
            if (!paymentMethod || !deliveryMethod) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false
            }
            return { paymentMethod, deliveryMethod }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { paymentMethod, deliveryMethod } = result.value;
            requestData(paymentMethod, deliveryMethod);
        }
    })
}
const requestData = (paymentMethod, deliveryMethod) => {
    if (paymentMethod === 'tarjeta') {
        // Mostrar formulario para datos de tarjeta
        Swal.fire({
            title: 'Datos de la tarjeta',
            html: `
                <label>Número de tarjeta</label>
                <input class="inputswal" type="text" id="cardNumber" maxlength="19" placeholder="1234 5678 9012 3456">
                <label>Fecha de vencimiento</label>
                <input class="inputswal" type="text" id="expiry" maxlength="5" placeholder="MM/AA">
                <label>CVV</label>
                <input class="inputswal" type="password" id="cvv" maxlength="4" placeholder="123">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const cardNumber = document.getElementById('cardNumber').value.trim();
                const expiry = document.getElementById('expiry').value.trim();
                const cvv = document.getElementById('cvv').value.trim();

                if (!cardNumber || !expiry || !cvv) {
                    Swal.showValidationMessage('Completa todos los campos de la tarjeta');
                    return false;
                }
                // Podés agregar validaciones extras acá (regex, longitudes, etc)
                return { cardNumber, expiry, cvv };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí iría la lógica real de pago (API, backend, etc)
                Swal.fire('¡Pago exitoso!', `Gracias por tu compra, ${clienteData.name}`, 'success');
                // Limpiar carrito
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });
    } else if (paymentMethod === 'transferencia') {
        // Mostrar mensaje con instrucciones
        let mensajeEntrega = deliveryMethod === 'domicilio'
            ? 'Tu compra será enviada a la dirección indicada.'
            : 'Podés retirar tu compra en nuestro local.';

        Swal.fire({
            icon: 'info',
            title: 'Instrucciones para transferencia',
            html: `
                <p>Los datos para realizar la transferencia serán enviados al email <strong>${clienteData.email}</strong>.</p>
                <p>${mensajeEntrega}</p>
            `,
            confirmButtonText: 'Cerrar'
        }).then(() => {
            Swal.fire('Gracias por tu compra!', '', 'success');
            // Limpiar carrito
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    }
}
renderCart();

