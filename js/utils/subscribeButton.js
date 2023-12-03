// export const subscribeButton = document.querySelector(".subscribe");
const placeholder = document.querySelector(".testinputemail");

// subscribeButton.addEventListener("click", subscriptionThanks);

export function subscriptionThanks() {
    placeholder.value = "";
    placeholder.placeholder = "Thank you for subscribing, check your email.";
}