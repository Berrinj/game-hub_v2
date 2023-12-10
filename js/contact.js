import { updateCartStatus } from "./utils/updateCartStatus.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

window.addEventListener("resize", updateCartStatus);

updateCartStatus();

const form = document.getElementById("form");
const contactForm = document.querySelector(".contact-form")
const fieldset = document.querySelector("fieldset");
const name = document.getElementById("name");
const email = document.getElementById("email");
// const OrderNumber = document.getElementById("order_number");
const regarding = document.getElementById("regarding");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", e => {
    e.preventDefault();

    if(validateInputs()) {
        form.reset();
        fieldset.style.background = "#a1ca77";
        fieldset.innerHTML = `<p class="success-form-message">Thank you, your enquiry was successfully submitted. We'll get back to you within 24 hours</p>`;
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
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    // const OrderNumberValue = OrderNumber.value.trim();
    const regardingValue = regarding.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    if (nameValue === "") {
        setError(name, "Name is required");
        isValid = false;
    } else {
        setSuccess(name);
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

    if (regardingValue === "") {
        setError(regarding, "You need to choose an option in the dropdown menu");
        isValid = false;
    } else {
        setSuccess(regarding);
    }

    if (subjectValue === "") {
        setError(subject, "A topic is required");
        isValid = false;
    } else {
        setSuccess(subject);
    }
    if (messageValue === "") {
        setError(message, "A message to us is required");
        isValid = false;
    } else if (messageValue.length < 10) {
        setError(message, "A message with over 10 characters is required");
        isValid = false;
    } else {
        setSuccess(message);
    }

    return isValid;
   
};

// JavaScript form validation learning: https://www.youtube.com/watch?v=CYlNJpltjMM
