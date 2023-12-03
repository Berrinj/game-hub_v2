import { getCartItems } from "./utils/getCartItems.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();

cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;