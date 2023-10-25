document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const cartItemsList = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const searchInput = document.getElementById("searchInput");
    const clearCartButton = document.getElementById("clearCart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let products = [
        { name: "Monster Energy Anana", price: 1100 },
        { name: "Monster Energy Mango Loco", price: 790 },
        { name: "Monster Energy Valentino Rossi", price: 750},
        { name: "Monster Energy Clasica", price: 600},
    ];

    function updateCart() {
        cartItemsList.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(item => {
            createCartItem(item);
            totalPrice += item.price;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: productPrice });
        updateCart();
    }

    function removeItemFromCart(productName) {
        const itemIndex = cart.findIndex(item => item.name === productName);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            updateCart();
        }
    }

    function createProductCard(productData) {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <h2>${productData.name}</h2>
            <p>Precio: $${productData.price}</p>
            <button class="add-to-cart">Añadir al carrito</button>
        `;
        productsContainer.appendChild(productCard);

        const addToCartButton = productCard.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => {
            addToCart(productData.name, productData.price);
        });
    }

    function createCartItem(productData) {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <span>${productData.name} - $${productData.price}</span>
            <button class="remove-from-cart" data-name="${productData.name}">Eliminar</button>
        `;
        cartItemsList.appendChild(cartItem);

        const removeButton = cartItem.querySelector(".remove-from-cart");
        removeButton.addEventListener("click", () => {
            removeItemFromCart(productData.name);
        });
    }

    function searchProducts(query) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
        productsContainer.innerHTML = "";

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = "<p>No se encontraron productos.</p>";
        } else {
            filteredProducts.forEach(createProductCard);
        }
    }

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value;
        searchProducts(searchTerm);
    });

    clearCartButton.addEventListener("click", () => {
        if (cart.length > 0 && confirm("¿Estás seguro de que deseas borrar el carrito?")) {
            cart = [];
            updateCart();
        }
    });

    products.forEach(createProductCard);
    updateCart();
});
