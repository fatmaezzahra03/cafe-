const sections = document.querySelectorAll(".nav__list-item");

sections.forEach((section) => {
  section.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = section.textContent.toLowerCase();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
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
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
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

// Menu order buttons
const orderBtns = document.querySelectorAll(".menu__btn");

orderBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const itemName = this.parentElement.querySelector(".menu__item").textContent;
    alert(`You've selected: ${itemName}\n\nThis is a demo. Integration with a payment system coming soon!`);
  });
});
