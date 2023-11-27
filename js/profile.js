import { getCartItems } from "./utils/getCartItems.js";

const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();

cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;