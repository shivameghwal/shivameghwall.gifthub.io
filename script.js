/* =========================
   CART SYSTEM
========================= */

let cart = [];


/* ADD PRODUCT */

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");

}


/* UPDATE CART */

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    displayCart();

}


/* DISPLAY CART */

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price} ×
                        ${item.quantity}
                    </p>

                </div>

                <div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                    <br>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

}


/* REMOVE PRODUCT */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();


        if (productName.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* =========================
   CATEGORY FILTER
========================= */

function filterProducts() {

    const category =
        document
            .getElementById("categoryFilter")
            .value;


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* =========================
   CONTACT FORM
========================= */

function sendMessage(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;

    const phone =
        document.getElementById("phone").value;

    const message =
        document.getElementById("message").value;


    /*
       IMPORTANT:
       Replace XXXXXXXXXX below with
       your real WhatsApp number.
    */

    const whatsappNumber =
        "91XXXXXXXXXX";


    const text =
        `Hello Shiva Marble!

Name: ${name}

Phone: ${phone}

Enquiry:
${message}`;


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(text);


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let orderText =
        "Hello Shiva Marble!%0A%0A" +
        "I want to order:%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        orderText +=
            `${item.name} - ${item.quantity} × ₹${item.price} = ₹${itemTotal}%0A`;

    });


    orderText +=
        `%0ATotal: ₹${total}%0A%0A` +
        "Please share availability and delivery details.";


    /*
       Replace XXXXXXXXXX with
       your actual WhatsApp number.
    */

    const whatsappNumber =
        "91XXXXXXXXXX";


    const url =
        `https://wa.me/${whatsappNumber}?text=${orderText}`;


    window.open(url, "_blank");

}


/* =========================
   CLOSE CART WHEN CLICKING
   OUTSIDE THE BOX
========================= */

document
    .getElementById("cartModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeCart();

        }

    });
