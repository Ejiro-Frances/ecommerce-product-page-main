"use strict";

const headerCart = document.querySelector("#header--cart");
const userCartBox = document.querySelector("#user-cart-box");

headerCart.addEventListener("click", () => {
  userCartBox.classList.toggle("user-cart--active");
  console.log("work");
});
