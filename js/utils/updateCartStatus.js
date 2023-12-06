import { getCartItems } from "./getCartItems.js";
const cartNumberOfItems = document.querySelector(".cart-status");
export function updateCartStatus() {
    const currentCartItems = getCartItems();
    const windowInnerWidth  = window.innerWidth;
    if ( windowInnerWidth < 824) {
        cartNumberOfItems.innerHTML = `<p>${currentCartItems.length}</p>`; 
    } else {
        cartNumberOfItems.innerHTML = `<p>${currentCartItems.length} item(s)</p>`;
    }
 };