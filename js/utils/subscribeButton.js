// export const subscribeButton = document.querySelector(".subscribe");
const placeholder = document.querySelector(".testinputemail");

// subscribeButton.addEventListener("click", subscriptionThanks);

export function subscriptionThanks() {
    placeholder.value = "";
    placeholder.placeholder = "Thank you for subscribing, check your email.";
}

// const newsletter = document.querySelector(".newsletterall");

// const email = document.getElementById("mail");

// newsletter.addEventListener("submit", e => {
//     e.preventDefault();

//    if (validateEmailInput()) {
//     subscriptionThanks();
//    };

// });

// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorMessage = inputControl.querySelector(".form-error");

//     errorMessage.innerText = message;
// }

// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorMessage = inputControl.querySelector(".form-error");

//     errorMessage.innerText = "";
//     inputControl.classList.add("success")
//     inputControl.classList.remove("form-error")
// }

// const isEmailValid = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// };

// const validateEmailInput = () => {
//     let isValid = true;
//     const emailValue = email.value.trim();

//     if( emailValue === "") {
//         setError(email, "Email is required");
//         isValid = false;
//     } else if (!isEmailValid(emailValue)) {
//         setError(email, "Provide a valid email address");
//         isValid = false;
//     } else {
//         setSuccess(email);
//     }

//     return true;
// }