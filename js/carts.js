import { cartProducts } from "./utils.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartProducts(cart);
const sectionCart = document.querySelector('.section-cart');
const calcularTotal = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const txtTotal = document.getElementById('total');
    txtTotal.textContent = `Total: $${total}`;
    return total;
}
const finalizar = () => {
    const finalizar = document.createElement('button');
    finalizar.classList.add('section-cart_container_box_finalizar');
    finalizar.textContent = 'Finalizar compra';
    finalizar.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        // funcion para finalizar compra
    });
    return finalizar;
}
const vaciarCart = () => {
    const vaciar = document.createElement('button');
    vaciar.classList.add('section-cart_container_box_vaciar');
    vaciar.textContent = 'Vaciar carrito';
    vaciar.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
        renderCart();
    });
    return vaciar;
}
const addTotal = () =>{
    const txtTotal = document.createElement('p');
    txtTotal.setAttribute('id', 'total');
    txtTotal.classList.add('section-cart_container_box_total');
    return txtTotal;
}
if (cart.length >= 1) {
    sectionCart.appendChild(addTotal());
    sectionCart.appendChild(finalizar());
    sectionCart.appendChild(vaciarCart());
} else {
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('section-cart_empty-message');
    emptyMessage.textContent = 'El carrito esta vacio';
    sectionCart.appendChild(emptyMessage);
}
const createCardsProducts = (product) => {
    const div = document.createElement('div');
    div.classList.add('section-cart_container_box_card_product');
    const h3 = document.createElement('h3');
    h3.textContent = product.title;
    h3.classList.add('section-cart_container_box_card_product_title');
    const txt = document.createElement('p');
    txt.textContent = `Precio: $${product.price}`;
    txt.classList.add('section-cart_container_box_card_product_price');
    const quantity = document.createElement('p');
    quantity.classList.add('section-cart_container_box_card_product_quantity');
    quantity.textContent = `Cantidad: ${product.quantity}`;
    div.appendChild(h3);
    div.appendChild(txt);
    div.appendChild(quantity);
    div.appendChild(buttonAddQuantity(product));
    div.appendChild(buttonRemoveQuantity(product));
    return div;
}
const renderCart = () => {
    const containerCart = document.getElementById('container-cart');
    containerCart.innerHTML = '';
    if (cart.length >= 1) {
        for (const product of cart) {
            const card = createCardsProducts(product);
            containerCart.appendChild(card);
        }
    }
    calcularTotal();
};

const buttonAddQuantity = (product) => {
    const button = document.createElement('button');
    button.classList.add('section-cart_container_box_card_product_add');
    button.textContent = '+';
    button.addEventListener('click', () => {
        console.log('antes de sumar', product);

        product.quantity += 1;
        console.log('despues de sumar', product);

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    })
    return button;
}

const buttonRemoveQuantity = (product) => {
    const button = document.createElement('button');
    button.classList.add('section-cart_container_box_card_product_remove');
    button.textContent = '-';
    button.addEventListener('click', () => {
        if (product.quantity > 1) {
            product.quantity--;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    })
    return button;
}

renderCart();

