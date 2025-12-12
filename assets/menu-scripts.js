// Cart management
let cart = [];

// Get all add to cart buttons
const addToCartBtns = document.querySelectorAll(".menu__btn");

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));

    addToCart(name, price);
  });
});

function addToCart(name, price) {
  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateInvoice();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateInvoice();
}

function updateInvoice() {
  const invoiceItemsDiv = document.getElementById("invoiceItems");
  const subtotalSpan = document.getElementById("subtotal");
  const taxSpan = document.getElementById("tax");
  const totalSpan = document.getElementById("total");

  // Clear previous items
  invoiceItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    invoiceItemsDiv.innerHTML = '<p class="invoice__empty">No items added yet</p>';
    subtotalSpan.textContent = "$0.00";
    taxSpan.textContent = "$0.00";
    totalSpan.textContent = "$0.00";
    return;
  }

  // Add items to invoice
  let subtotal = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const itemHTML = `
      <div class="invoice__item">
        <div class="invoice__item-info">
          <div class="invoice__item-name">${item.name}</div>
          <div class="invoice__item-qty">Qty: ${item.quantity}</div>
        </div>
        <span class="invoice__item-price">$${itemTotal.toFixed(2)}</span>
        <button class="invoice__item-remove" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;

    invoiceItemsDiv.innerHTML += itemHTML;
  });

  // Calculate tax and total
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
  taxSpan.textContent = `$${tax.toFixed(2)}`;
  totalSpan.textContent = `$${total.toFixed(2)}`;
}

// Checkout button
const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Please add items to your cart first!");
    return;
  }

  const total = document.getElementById("total").textContent;
  alert(
    `Order Confirmed!\n\nTotal: ${total}\n\nThank you for your purchase!\n\nThis is a demo. Payment processing coming soon.`
  );
  cart = [];
  updateInvoice();
});

// Clear cart button
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
  cart = [];
  updateInvoice();
});