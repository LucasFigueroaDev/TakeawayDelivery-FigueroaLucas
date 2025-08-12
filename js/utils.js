function cartProducts(cart) {
    let cartContainer = document.getElementById('count');
    const cartCount = cart.length;

    if (cartCount >= 1) {
        cartContainer.textContent = cartCount;
        cartContainer.style.display = 'inline';
    } else {
        cartContainer.style.display = 'none';
    }
}

function createButton(className, value, textContent) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.value = value;
    button.textContent = textContent;
    return button;
}

function calcularTotal(cart) {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total;
}

export { cartProducts, createButton, calcularTotal };