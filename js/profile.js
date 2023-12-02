import { getCartItems } from "./utils/getCartItems.js";

const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();

cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

const loginButton = document.querySelector(".login-button");
const signupForm = document.querySelector(".signup-form-container")
signupForm.style.display = "none";

loginButton.addEventListener("click", openSignupForm);

function openSignupForm() {
    loginButton.style.display = "none";
    signupForm.style.display = "block";
}