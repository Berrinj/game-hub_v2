import { getCartItems } from "./utils/getCartItems.js";
import { handleRemoveButtonClick } from "./utils/removebutton.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
import { updateCartStatus } from "./utils/updateCartStatus.js";

const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

const itemsInCart = getCartItems();
const main = document.querySelector("main");
const cartHeader = document.querySelector(".shopping-cart-header");
const cartContainer = document.querySelector(".shopping-cart");
const totalSum =  document.querySelector(".total");
const checkoutButton = document.querySelector(".gotopaymentbutton");
const deleteItem = document.querySelectorAll("p.deleteitem");
const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();


try {
  window.addEventListener("resize", updateCartStatus);

  updateCartStatus();  

  

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteitem")) {
          handleRemoveButtonClick(event);
          updateCartStatus();
          
        }
      });
cartContainer.innerHTML = "";

if(itemsInCart.length === 0) {
    cartContainer.innerHTML = `<p class="nofavs">No items in cart.</p>`
    checkoutButton.classList.add("disabled-button");
    checkoutButton.addEventListener("click", function (event) {
        event.preventDefault();
});
} else {
  checkoutButton.classList.remove("disabled-button");
    checkoutButton.removeEventListener("click", function (event) {
        event.preventDefault();
        updateCartStatus(); 
    });
};

cartHeader.innerHTML = `<h1>Cart</h1>
                        <h4>${itemsInCart.length} item(s)</h4>`;

let total = 0;
itemsInCart.forEach(inCart => {


    cartContainer.innerHTML += `<li>
                                        <div class="cartItem-container" data-game-id="${inCart.id}">
                                        <a href="productpage.html?id=${inCart.id}" aria-label="product link" title="product link">
                                        <div class="cartinfo">
                                        <img src="${inCart.image}" alt="${inCart.name} cover"></a>
                                        <h2>${inCart.name}</h2>
                                        <p>-Available for PS4, PS5, Nintendo Switch, XBOX One & XBOXSeries X</p>
                                        <p>-Instant download</p>
                                        </p>
                                        <p class="price">Price: ${inCart.price} NOK</p>
                                        <button class="deleteitem"><i class="fa-regular fa-trash-can"></i>Remove ${inCart.name}</button>
                                    </div>
                                    </div>
                                    </li>`;
                                    
    let itemPrice = +inCart.price;
    total += itemPrice;
    
});

total = total.toFixed(2);

totalSum.innerHTML =    `<h3>Total</h3>
                        <h3>${total} NOK</h3>`;



} catch(error) {
    main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
    console.log(error, `Sorry, an error occured`);
  };