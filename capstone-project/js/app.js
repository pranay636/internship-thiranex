const featuredProducts = document.getElementById("featured-products");
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Add product to cart
function addToCart(id) {

    const product = products.find(product => product.id === id);

    cart.push(product);

    saveCart();

    alert(product.name + " added to cart!");

}

// Create product card
function createProductCard(product) {

    return `

    <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <div class="price">

                $${product.price}

            </div>

            <button
                class="add-btn"
                onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

    </div>

    `;

}

// Home page featured products
if (featuredProducts) {

    featuredProducts.innerHTML = "";

    products.slice(0,4).forEach(product => {

        featuredProducts.innerHTML += createProductCard(product);

    });

}

// Products page
if (productList) {

    displayProducts(products);

}

// Display products
function displayProducts(productArray){

    productList.innerHTML = "";

    productArray.forEach(product => {

        productList.innerHTML += createProductCard(product);

    });

}

// Search
const search = document.getElementById("search");

if(search){

search.addEventListener("keyup",()=>{

const value = search.value.toLowerCase();

const filtered = products.filter(product =>

product.name.toLowerCase().includes(value)

);

displayProducts(filtered);

});

}

// Category Filter

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

const category = button.dataset.category;

if(category==="All"){

displayProducts(products);

}
else{

const filtered = products.filter(product=>product.category===category);

displayProducts(filtered);

}

});

});

updateCartCount();