const sections = document.querySelectorAll(".nav__list-item");

sections.forEach((section) => {
  section.addEventListener("click", function (e) {
    const link = section.querySelector("a");
    const href = link ? link.getAttribute("href") : null;
    
    // Only prevent default for anchor links (starting with #)
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For external pages like menu.html, allow normal navigation
  });
});

// ==================== HERO CAROUSEL ====================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero__slide");
  let currentSlide = 0;
  let autoSlideInterval;
  let isTransitioning = false;

  if (slides.length === 0) return;

  function goToSlide(n, direction = "next") {
    if (isTransitioning) return;
    isTransitioning = true;

    const nextSlide = (n + slides.length) % slides.length;

    // Remove all classes from all slides first
    slides.forEach(slide => {
      slide.classList.remove("active", "prev", "next");
    });

    // Current slide exits based on direction
    if (direction === "next") {
      slides[currentSlide].classList.add("prev"); // Exit left
    } else {
      slides[currentSlide].classList.add("next"); // Exit right
    }

    // Next slide enters
    slides[nextSlide].classList.add("active");

    // Update current index
    currentSlide = nextSlide;

    // Clean up after animation
    setTimeout(() => {
      slides.forEach(slide => {
        slide.classList.remove("prev", "next");
      });
      isTransitioning = false;
    }, 800);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1, "next");
  }

  // Initialize first slide
  slides[0].classList.add("active");

  // Auto-slide every 4 seconds
  autoSlideInterval = setInterval(nextSlide, 4000);
});

// Mobile menu toggle
const toggleIcon = document.getElementById("navToggle");
const navList = document.getElementById("navList");
const navItems = document.querySelectorAll(".nav__list-item");

toggleIcon.addEventListener("click", () => {
  navList.classList.toggle("nav__toggle");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navList.classList.remove("nav__toggle");
  });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll(".nav__list-item a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Allow external page navigation (like menu.html), only prevent default for anchors
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For external pages like menu.html, allow normal navigation
  });
});

// Contact form submission
const contactForm = document.querySelector(".contact__form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formInputs = this.querySelectorAll("input, textarea");
    let isValid = true;

    formInputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
      }
    });

    if (isValid) {
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// Visit us button
const visitBtn = document.querySelector(".hero__btn");

if (visitBtn) {
  visitBtn.addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
}

// ==================== SHOPPING CART FUNCTIONALITY ====================
let cart = [];
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");

// Create cart elements in HTML if they don't exist
function initializeCart() {
  if (!document.getElementById("cartIcon")) {
    const navContainer = document.querySelector(".nav__container");
    const cartHTML = `
      <div class="cart-icon-container">
        <button id="cartIcon" class="cart-icon" aria-label="Shopping Cart">
          <i class="fas fa-shopping-cart"></i>
          <span id="cartCount" class="cart-count">0</span>
        </button>
      </div>
    `;
    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = cartHTML;
    navContainer.appendChild(cartDiv.firstElementChild);
    
    const cartModalHTML = `
      <dialog id="cartModal" class="cart-modal">
        <div class="cart-modal-content">
          <div class="cart-header">
            <h2>Shopping Cart</h2>
            <button id="closeCartBtn" class="close-cart-btn" aria-label="Close">&times;</button>
          </div>
          <div id="cartItems" class="cart-items"></div>
          <div class="cart-footer">
            <div class="cart-total-container">
              <span>Total:</span>
              <span id="cartTotal" class="cart-total">$0.00</span>
            </div>
            <div class="cart-button-group">
              <button id="clearCartBtn" class="cart-btn-clear">Clear</button>
              <button id="confirmCartBtn" class="cart-btn-confirm">Confirm</button>
            </div>
          </div>
        </div>
      </dialog>
    `;
    document.body.insertAdjacentHTML("beforeend", cartModalHTML);
  }
}

// Add item to cart
function addToCart(itemName, itemPrice) {
  const existingItem = cart.find(item => item.name === itemName);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: itemName,
      price: parseFloat(itemPrice),
      quantity: 1
    });
  }
  
  updateCart();
  showCartNotification(`${itemName} added to cart!`);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const cartCountElement = document.getElementById("cartCount");
  
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotalElement.textContent = "$0.00";
    cartCountElement.textContent = "0";
    return;
  }
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItemHTML = `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeQuantity(${index}, -1)">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
  });
  
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
  cartCountElement.textContent = cart.length;
}

function changeQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    } else {
      updateCart();
    }
  }
}

function showCartNotification(message) {
  // Remove any existing notification
  const existing = document.querySelector(".cart-notification");
  if (existing) existing.remove();
  
  const notification = document.createElement("div");
  notification.className = "cart-notification show";
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Cart modal toggle
document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
  
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const confirmCartBtn = document.getElementById("confirmCartBtn");
  
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      cartModal.showModal();
    });
  }
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cartModal.close();
    });
  }
  
  if (cartModal) {
    cartModal.addEventListener("cancel", (e) => {
      e.preventDefault();
    });
  }
  
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      updateCart();
      cartModal.close();
    });
  }
  
  if (confirmCartBtn) {
    confirmCartBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      const total = document.getElementById("cartTotal").textContent;
      const itemCount = cart.length;
      alert(`Order Confirmed!\n\nItems: ${itemCount}\nTotal: ${total}\n\nThank you for your purchase!`);
      cart = [];
      updateCart();
      cartModal.close();
    });
  }
  
  // Menu order buttons
  const orderBtns = document.querySelectorAll(".menu__btn");
  orderBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const menuCard = this.closest(".menu__card");
      const itemName = menuCard.querySelector(".menu__item").textContent;
      const itemPrice = this.getAttribute("data-price") || "5.99";
      addToCart(itemName, itemPrice);
    });
  });
});

// Menu page search (only runs if input exists)
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("menuSearchInput");
  if (!searchInput) return;

  const cards = Array.from(document.querySelectorAll(".menu__card"));
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    cards.forEach(card => {
      const name = card.querySelector(".menu__item")?.textContent.toLowerCase() || "";
      const desc = card.querySelector(".menu__desc")?.textContent.toLowerCase() || "";
      const match = !q || name.includes(q) || desc.includes(q);
      card.style.display = match ? "" : "none";
    });
  });
});
