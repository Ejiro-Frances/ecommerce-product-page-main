"use strict";

const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuNav = document.querySelector("#mobile-nav-links");

const headerCart = document.querySelector("#header--cart");
const userCartBox = document.querySelector("#user-cart-box");
const cartButton = document.querySelector("#cart-btn");
const cartCount = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".user-cart__holder");
const checkout = document.querySelector(".checkout");

const addQuantityEl = document.querySelector("#quantity-increase");
const minusQuantityEl = document.querySelector("#quantity-reduce");
const quantityInputEl = document.querySelector(".quantity");

const mainImages = document.querySelectorAll(".default-gallery .product-img");
const thumbnails = document.querySelectorAll(
  ".default-gallery .product--thumbnail .product-img"
);
const lightboxMainImages = document.querySelectorAll(".lightbox .product-img");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox .product--thumbnail .product-img"
);
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.querySelector(".lightbox-container");
const closeLightBox = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");

// toggle mobile menu
mobileMenu.addEventListener("click", () => {
  mobileMenuNav.classList.toggle("nav-open");
  mobileMenu.classList.toggle("nav-open");
});

// toggle cart visibility
headerCart.addEventListener("click", () => {
  userCartBox.classList.toggle("user-cart--active");
});

// CART SECTION
let count = 0;
let totalQty = 0;
cartCount.style.display = "none";

const updateCount = (newCount) => {
  count = newCount;
  quantityInputEl.value = count;
};
minusQuantityEl.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

addQuantityEl.addEventListener("click", () => {
  updateCount(count + 1);
});

// Event listener for manual input in the quantity field
quantityInputEl.addEventListener("input", (event) => {
  const inputValue = parseInt(event.target.value, 10);
  if (!isNaN(inputValue) && inputValue >= 0) {
    updateCount(inputValue);
  } else {
    updateCount(0); // Reset to 0 if input is invalid
  }
});

// Ensure increment and decrement buttons respect the input value
quantityInputEl.addEventListener("change", () => {
  const inputValue = parseInt(quantityInputEl.value, 10);
  if (!isNaN(inputValue) && inputValue >= 0) {
    count = inputValue; // Sync the count with the current input value
  } else {
    updateCount(0); // Reset to 0 if input is invalid
  }
});

// update cart count
const updateTotalQty = () => {
  const cartItemsList = document.querySelectorAll(".cart-item");
  totalQty = 0;
  cartItemsList.forEach((item) => {
    totalQty += parseInt(item.dataset.quantity);
  });
  cartCount.style.display = "flex";
  cartCount.innerHTML = `<span>${totalQty}</span>`;
};

//remove from cart
const removeItemFromCart = (cartItem) => {
  cartItem.remove();
  updateTotalQty();

  if (cartContainer.children.length === 1) {
    cartContainer.classList.add("empty");
    checkout.classList.add("empty");
    cartCount.style.display = "none";
  }
};

// Add to cart
const addItemtoCart = (name, price, imgSrc) => {
  const totalPrice = price * count;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.dataset.quantity = count;
  cartItem.innerHTML = `
  <div>
    <img src="${imgSrc}" alt="${name}"/>
  </div>

  <div>
  <p class="user-cart__product--name">
          ${name}
           </p>
           <p>
           $${price} x ${count} =
           <span><strong class="total-price">$${totalPrice.toFixed(
             2
           )}</strong></span>
           </p>
           </div>

           <div>
           <button class="delete">
           <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
           </button>
           </div>
    
    `;

  cartContainer.appendChild(cartItem);
  updateTotalQty();

  // attach event listener to remove button from cart

  const deleteButton = cartItem.querySelector(".delete");
  deleteButton.addEventListener("click", (event) => {
    const cartItem = event.target.closest(".cart-item");
    removeItemFromCart(cartItem);
  });
};

cartButton.addEventListener("click", () => {
  if (count === 0) return;

  const productName = document.querySelector("#product-name").textContent;

  const productPrice = document.querySelector("#current-price").textContent;

  const productImg = document
    .querySelector(".default-gallery .product-img")
    .getAttribute("src");

  // add item
  cartContainer.classList.remove("empty");
  addItemtoCart(productName, productPrice, productImg);
  cartContainer.classList.add("active");
  checkout.classList.remove("empty");

  updateCount(0);
});

// GALLERY

let currentIndex = 0;
const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });

  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");

  currentIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxContainer.classList.add("active");
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

closeLightBox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxContainer.classList.remove("active");
});

iconPrev.addEventListener("click", () => {
  if (currentIndex <= 0) {
    changeImage(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentIndex - 1, lightboxMainImages, lightboxThumbnails);
  }
});

iconNext.addEventListener("click", () => {
  if (currentIndex >= mainImages.length - 1) {
    changeImage(0, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentIndex + 1, lightboxMainImages, lightboxThumbnails);
  }
});
