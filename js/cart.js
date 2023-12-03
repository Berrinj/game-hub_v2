import { getCartItems } from "./utils/getCartItems.js";
import { handleRemoveButtonClick } from "./utils/removebutton.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

const itemsInCart = getCartItems();
const main = document.querySelector("main");
const cartHeader = document.querySelector(".shopping-cart-header");
const cartContainer = document.querySelector(".shopping-cart");
const totalSum =  document.querySelector(".total");
const deleteItem = document.querySelectorAll("p.deleteitem");
const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();


try {
    cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteitem")) {
          handleRemoveButtonClick(event);
        }
      });
cartContainer.innerHTML = "";

if(itemsInCart.length === 0) {
    cartContainer.innerHTML = `<p class="nofavs">No items in cart.</p>`
};


cartHeader.innerHTML += `<h1>Cart</h1>
                        <h4>${itemsInCart.length} item(s)</h4>`;

let total = 0;
itemsInCart.forEach(inCart => {


    cartContainer.innerHTML += `<li>
                                        <div class="cartItem-container" data-game-id="${inCart.id}">
                                        <a href="productpage.html?id=${inCart.id}">
                                        <div class="cartinfo">
                                        <img src="${inCart.image}" alt="${inCart.title} cover"></a>
                                        <h2>${inCart.title}</h2>
                                        <p>-Available for PS4, PS5, Nintendo Switch, XBOX One & XBOXSeries X</p>
                                        <p>-Instant download</p>
                                        </p>
                                        <p class="price">Price: $${inCart.price}</p>
                                        <button class="deleteitem"><i class="fa-regular fa-trash-can"></i>Remove ${inCart.title}</button>
                                    </div>
                                    </div>
                                    </li>`;
                                    
    let itemPrice = +inCart.price;
    total += itemPrice;
    
});

total = total.toFixed(2);

totalSum.innerHTML =    `<h3>Total</h3>
                        <h3>$${total}</h3>`;



} catch(error) {
    main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
    console.log(error, `Sorry, an error occured`);
  };