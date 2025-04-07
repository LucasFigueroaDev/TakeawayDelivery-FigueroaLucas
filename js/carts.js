import { cartProducts } from "./utils.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);

cartProducts(cart);

const renderCart = () => {
    const containerCart = document.getElementById('container-cart');

    cart.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('section-cart_container_box_card_product');
        div.innerHTML = `
            <div class="section-cart_container_box_card_product_content">
                <h3 class="section-cart_container_box_card_product_content_title">${product.title}</h3>
                <p class="section-cart_container_box_card_product_content_price">Precio: $${product.price}</p>
                <p class="section-cart_container_box_card_product_content_quantity">Cantidad: ${product.quantity}</p>
                <p class="section-cart_container_box_card_product_content_total">Total: $${product.price * product.quantity}</p>
            </div>
        `;
        containerCart.appendChild(div);
    })
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalElement = document.createElement('p');
    totalElement.classList.add('section-cart_container_box_total');
    totalElement.textContent = `Total: $${total}`;
    containerCart.appendChild(totalElement);

}

renderCart();

