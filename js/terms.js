import { updateCartStatus } from "./utils/updateCartStatus.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

window.addEventListener("resize", updateCartStatus);

    updateCartStatus();