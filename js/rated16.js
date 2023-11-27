import { getCartItems } from "./utils/getCartItems.js";

const url = "https://api.noroff.dev/api/v1/gamehub/";

const gameContainer = document.querySelector(".games-container");

const gamesRow = document.querySelector(".gamesrow");

const priceBox = document.querySelector(".price-box");
const main = document.querySelector("main");
const cartNumberOfItems = document.querySelector(".cart-status");
const currentCartItems = getCartItems();

async function ratedSixteen() {

    try{
    const response = await fetch(url);
    const result = await response.json();

    gamesRow.innerHTML = "";
    cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

    const ageRatingToTarget = "16+";
        const filteredAge = result.filter(age => age.ageRating === ageRatingToTarget);

    for (let i = 0; i < filteredAge.length; i++){
            gamesRow.innerHTML += `<a href="productpage.html?id=${filteredAge[i].id}">
            <div class="games-container">
            <img class="productimg" src="${filteredAge[i].image}">
            <h3>${filteredAge[i].title}</h3>
            <p>-Available for PS4, XBOX One and PC</p>
            <p>-instant download</p>
            <div class="price-box">
            <h4>${filteredAge[i].price}</h4>
            </div>
            </a>`
}
} catch (error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
        console.log(error, `Sorry, an error occured`);
}

}

ratedSixteen();

