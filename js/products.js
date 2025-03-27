import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Crear carrito en el localstorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funcion para cargar productos del archivo json
const url = '../Db/productos.json';
const containerProducts = document.getElementById('container-products');
const categorySelect = document.getElementById('category-select');

async function uploadProducts() {
    try {
        const response = await fetch(url);
        if (!response) throw new Error("No se pudo cargar los productos");
        const data = await response.json();
        const categories = new Set(data.map(product => product.category));

        // Mostrar categorias
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        renderProducts(data);

    } catch (error) {
        throw new Error("Error al cargar los productos");
    }
}

function renderProducts(products) {
    containerProducts.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('categories_card-product');
        div.innerHTML = `
            <h3 class="categories_card-product_title">${product.title}</h3>
            <div class="categories_card-product_img">
                <img src="${product.img}" alt="${product.title}">
            </div>
            <div class="categories_card-product_content">
                <p class="categories_card-product_content_price">Precio: $${product.price}</p>
                ${product.description ? `<p class="categories_card-product_content_description">${product.description}</p>` : ''}
                <button class="categories_card-product_content_button-add-to-cart" data-product-id="${uuidv4()}">Agregar pedido</button>
            </div>
        `;
        containerProducts.appendChild(div);
    })
    addCartEventListener();
};

categorySelect.addEventListener('change', async () => {
    const response = await fetch(url);
    const data = await response.json();
    const selectedCategory = categorySelect.value;
    if (selectedCategory === 'all') {
        renderProducts(data);
    } else {
        const filteredProducts = data.filter(product => product.category === selectedCategory);
        renderProducts(filteredProducts);
    }
});
function addCartEventListener() {
    const addToCartButtons = document.querySelectorAll('.categories_card-product_content_button-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            const product = cart.find(product => product.id === productId);

            if (product) {
                product.quantity++;
            } else {
                cart.push({
                    id: productId,
                    quantity: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
            
        });
    });
}
console.log(cart);

uploadProducts();