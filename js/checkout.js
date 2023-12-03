import { getCartItems } from "./utils/getCartItems.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

const main = document.querySelector("main");
const productContainer = document.querySelector(".checkout-items");
const itemsInCart = getCartItems();
const totalSum =  document.querySelector(".checkout-total");
const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();
const checkoutButton = document.querySelector("#placeorder");
const checkoutForm = document.querySelector(".checkout-form");


productContainer.innerHTML = "";

try {

    cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

if(itemsInCart.length === 0) {
    productContainer.innerHTML = `<p>No items in cart.</p>`;
};

let total = 0;
itemsInCart.forEach(inCart => {

productContainer.innerHTML += `<div class="checkout-item">
                                <img src="${inCart.image}" alt="${inCart.title} cover" class="checkout-img">
                                <p><b>Title:</b>${inCart.title}</p>
                                <p><b>Price:</b>${inCart.price}</p>
                                </div>`;

    let itemPrice = +inCart.price;
    total += itemPrice;
});

total = total.toFixed(2);

totalSum.innerHTML =    `<h4>Total sum:</h4>
                        <p>$${total}</p>`;


} catch (error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
        console.log(error, `Sorry, an error occured`);
};

checkoutButton.addEventListener("click", clearCart);

function clearCart() {
    localStorage.setItem("incart", JSON.stringify([])); 
}