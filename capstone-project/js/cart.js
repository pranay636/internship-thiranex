const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");
const cartCounter = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart counter
function updateCartCounter() {
    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

// Display cart items
function displayCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-item">
                <h3>Your cart is empty.</h3>
            </div>
        `;

        cartTotal.textContent = "Total : $0";

        return;

    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <strong>$${product.price}</strong>

            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    cartTotal.textContent = "Total : $" + total;

}

// Remove one item
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}

// Clear entire cart
if (clearCartButton) {

    clearCartButton.addEventListener("click", () => {

        if (confirm("Clear the cart?")) {

            cart = [];

            saveCart();

            displayCart();

        }

    });

}

updateCartCounter();

displayCart();