import { subscriptionThanks } from "./utils/subscribeButton.js";
import { updateCartStatus } from "./utils/updateCartStatus.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);
const newUserSignUp = document.querySelector(".new-user");
const profileMenu = document.querySelector(".profile-menu");
const userGreeting = document.querySelector(".user-greeting");
const exampleUserImage = document.querySelector(".profile-pic-example-user");
const profilePicture = document.querySelector(".profilepic");

window.addEventListener("resize", updateCartStatus);

updateCartStatus();

const loginButton = document.querySelector(".login-button");
const signupForm = document.querySelector(".signup-form-container")
const loginForm = document.querySelector(".login-form-container")
loginForm.style.display = "none";
profileMenu.style.display = "none";
userGreeting.innerHTML = `Hello, Guest!`;

loginButton.addEventListener("click", openLoginForm);

function openLoginForm() {
    userGreeting.innerHTML = "";
    loginButton.style.display = "none";
    loginForm.style.display = "block";
    userGreeting.innerHTML += `Welcome back!`;
    // newUserSignUp.style.display = "none";

}

const signinButton = document.querySelector(".signin-button");
signinButton.addEventListener("click", signinAccount);

function signinAccount() {
    userGreeting.innerHTML = "";
    userGreeting.innerHTML = "Hi, Jane Doe";
    loginForm.style.display = "none";
    newUserSignUp.style.display = "none";
    profileMenu.style.display = "flex";
    exampleUserImage.style.display = "block";
    profilePicture.style.display = "none";
}