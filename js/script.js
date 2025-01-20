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
});

// Update cart content
cartButton.addEventListener("click", () => {
  const quantity = Number(quantityInput.value);
  const productName = document.getElementById("product-name").textContent;
  const productPrice = Number(
    document.getElementById("product-price").textContent
  );
  const totalPrice = quantity * productPrice;

  // Clear existing content
  userCartBox.innerHTML = `
    <header class="user-cart__header">Cart</header>
    <section class="user-cart__holder">
 `;
  if (quantity >= 1) {
    // remove empty text
    document.querySelector(".empty-cart").classList.add("hidden");
    // Add product details to the cart
    userCartBox.innerHTML += `
      <div class="user-cart__product--img">
        <img src="./images/image-product-1-thumbnail.jpg" alt="${productName}" />
      </div>
      <div>
        <p class="user-cart__product--name">${productName}</p>
        <p class="user-cart__product--cost">
          $${productPrice} x ${quantity}
          <strong class="user-cart__product-total">$${totalPrice.toFixed(
            2
          )}</strong>
        </p>
      </div>
      <div class="user-cart__product--delete">
        <img src="./images/icon-delete.svg" alt="Delete items button" />
      </div>
      <button class="user-cart__product--checkout">
        <a href="#">Checkout</a>
      </button>
    `;
  }

  // Close the section tag
  userCartBox.innerHTML += `</section>`;
});

// Increase and reduce quantity
minusQuantity.addEventListener("click", () => {
  let currentQuantity = Number(quantityInput.value);
  if (currentQuantity > 0) {
    currentQuantity -= 1;
  }
  quantityInput.value = currentQuantity;
});

addQuantity.addEventListener("click", () => {
  let currentQuantity = Number(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
});

// mine
// Check if quantity is zero

// if (quantity !== 0) {

// userCartBox.innerHTML += `

//   <div class="empty-cart__holder">
//       <p class="empty-cart">Your cart is empty</p>
//     </div>
// `;

//   const productName = "Fall Limited Edition Sneakers";
//   const productPrice = 125.0;
//   const totalPrice = quantity * productPrice;
//   const cartItems = `
//           <div>
//             <img src="./images/image-product-1-thumbnail.jpg" alt="" />
//           </div>
//           <div>
//             <p">
//               ${productName}
//             </p>
//             <p>
//               $${productPrice} x ${quantity}
//               <strong>$${totalPrice}</strong>
//             </p>
//           </div>
//           <div>
//             <img src="./images/icon-delete.svg" alt="delete items button" />
//           </div>
//   `;
//   userCartBox.innerHTML = cartItems;
// });

// // increase and reduce quantity

// minusQuantity.addEventListener("click", () => {
//   let currentQuantity = Number(quantityInput.value);
//   currentQuantity != 0 ? (currentQuantity -= 1) : currentQuantity == 0;
//   quantityInput.value = currentQuantity;
// });

// addQuantity.addEventListener("click", () => {
//   let currentQuantity = Number(quantityInput.value);
//   currentQuantity += 1;
//   quantityInput.value = currentQuantity;
// });

// ---------------------------------------------

// GALLERY
const mainImages = document.querySelectorAll(".container__product__img img");
const thumbnails = document.querySelectorAll(
  ".container__product__thumbnail .product--thumbnail"
);
const lightboxMainImages = document.querySelectorAll(
  ".lightbox .container__product__img img"
);
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox .container__product__thumbnail .product--thumbnail"
);
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.querySelector(".lightbox-container");
const closeLightBox = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");

// begin

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
