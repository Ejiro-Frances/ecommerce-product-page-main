"use strict";

const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuNav = document.querySelector("#mobile-nav-links");

const headerCart = document.querySelector("#header--cart");
const userCartBox = document.querySelector("#user-cart-box");
const cartButton = document.querySelector("#cart-btn");

const addQuantity = document.querySelector("#quantity-increase");
const minusQuantity = document.querySelector("#quantity-reduce");
const quantityInput = document.querySelector(".quantity");

// toggle mobile menu
mobileMenu.addEventListener("click", () => {
  mobileMenuNav.classList.toggle("nav-open");
  mobileMenu.classList.toggle("nav-open");
});

// toggle cart visibility
headerCart.addEventListener("click", () => {
  userCartBox.classList.toggle("user-cart--active");
  console.log("work");
});
// when add cart btn is clicked
cartButton.addEventListener("click", () => {
  const quantity = Number(quantityInput.value);

  const productName = document.getElementById("product-name").textContent;
  const productPrice = document.getElementById("product-price").textContent;
  const totalPrice = quantity * productPrice;

  const cartItems = `
  <div>
<img src="./images/image-product-1.jpg" alt=""limited edition sneakers>
</div>
<div>
<p>${productName}</p>
<p>$${productPrice} x ${quantity} = $${totalPrice}</p>
</div>
  `;
  userCartBox.innerHTML = cartItems;

  console.log(quantity, productName, productPrice, totalPrice);
});

// increase and reduce quantity

minusQuantity.addEventListener("click", () => {
  let currentQuantity = Number(quantityInput.value);
  currentQuantity != 0 ? (currentQuantity -= 1) : currentQuantity == 0;
  quantityInput.value = currentQuantity;
});

addQuantity.addEventListener("click", () => {
  let currentQuantity = Number(quantityInput.value);
  currentQuantity += 1;
  quantityInput.value = currentQuantity;
});
