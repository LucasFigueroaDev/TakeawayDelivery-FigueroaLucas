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

export { cartProducts };