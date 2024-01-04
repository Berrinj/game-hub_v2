import { getCartItems } from "./utils/getCartItems.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
import { updateCartStatus } from "./utils/updateCartStatus.js";

const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

const main = document.querySelector("main");
const productContainer = document.querySelector(".checkout-items");
const itemsInCart = getCartItems();
const totalSum =  document.querySelector(".checkout-total");
const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();
const checkoutButton = document.querySelector("#placeorder");

productContainer.innerHTML = "";

try {

window.addEventListener("resize", updateCartStatus);

updateCartStatus();


if(itemsInCart.length === 0) {
    productContainer.innerHTML = `<p>No items in cart.</p>`;
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

let total = 0;
itemsInCart.forEach(inCart => {

productContainer.innerHTML += `<div class="checkout-item">
                                <img src="${inCart.image}" alt="${inCart.name} cover" class="checkout-img">
                                <p><b>Title:</b>${inCart.name}</p>
                                <p><b>Price:</b>${inCart.price}</p>
                                </div>`;

    let itemPrice = +inCart.price;
    total += itemPrice;
});

total = total.toFixed(2);

totalSum.innerHTML =    `<h4>Total sum:</h4>
                        <p>${total} NOK</p>`;


} catch (error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
        console.log(error, `Sorry, an error occured`);
};

const checkoutForm = document.querySelector(".checkout-form");
const nameOnCard = document.getElementById("name");
const cardNumber = document.getElementById("cardnumber");
const expDate = document.getElementById("experationdate");
const cvc = document.getElementById("cvc");
const email = document.getElementById("email");
const terms = document.getElementById("terms");

function clearCart() {
    localStorage.setItem("incart", JSON.stringify([])); 
}

checkoutForm.addEventListener("submit", e => {
    e.preventDefault();

   if (validateInputs()) {
    clearCart();
    window.location.replace("/confirmation.html");
   };

});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");

    errorMessage.innerText = message;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");

    errorMessage.innerText = "";
    inputControl.classList.add("success")
    inputControl.classList.remove("form-error")
}

const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    let isValid = true;
    const nameValue = nameOnCard.value.trim();
    const cardValue = cardNumber.value.trim();
    const expDateValue = expDate.value.trim();
    const cvcValue = cvc.value.trim();
    const emailValue = email.value.trim();

    if (nameValue === "") {
        setError(nameOnCard, "You must enter a valid name");
        isValid = false;
    } else {
        setSuccess(nameOnCard);
    }

    if (emailValue === "") {
        setError(email, "Email is required");
        isValid = false;
    } else if (!isEmailValid(emailValue)) {
        setError(email, "Provide a valid email address");
        isValid = false;
    }else {
        setSuccess(email);
    }

    if (cardValue === "") {
        setError(cardNumber, "You need to enter your card number");
        isValid = false;
    } else if (cardValue.length < 16) {
        setError(cardNumber, "A 16 digit number is required");
        isValid = false;
    } else {
        setSuccess(cardNumber);
    }

    if (expDateValue === "") {
        setError(expDate, "You need to enter your cards expiration date");
        isValid = false;
    } else if (expDateValue.length < 5) {
        setError(expDate, "You need to provide it in this format: xx/xx");
        isValid = false;
    } else {
        setSuccess(expDate);
    }
    if (cvcValue === "") {
        setError(cvc, "Your cards CVC number is required");
        isValid = false;
    } else if (cvcValue.length < 3) {
        setError(cvc, "3 letters are required");
        isValid = false;
    } else {
        setSuccess(cvc);
    }

    if (!terms.checked) {
        setError(terms, "You must accept the T&C by checking the checkbox");
        isValid = false;
    } else {
        setSuccess(terms);
    }

    return isValid;
   
};