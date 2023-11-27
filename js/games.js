import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartItems } from "./utils/getCartItems.js";



export const url = "https://api.noroff.dev/api/v1/gamehub/";

export const gameContainer = document.querySelector(".games-container");

export const gamesRow = document.querySelector(".gamesrow");

export const priceBox = document.querySelector(".price-box");

const main = document.querySelector("main");
const cartNumberOfItems = document.querySelector(".cart-status");
const favorites = getExistingFavs();
const currentCartItems = getCartItems();
const dropdown = document.querySelector("select");



async function getGames() {

    try {
    const response = await fetch(url);
    const result = await response.json();

    gamesRow.innerHTML = "";
    

    for(let i = 0; i < result.length; i++){
        let saleFont = "";
        let cssClass = "far";
        let saleMessage = "";

        if (result[i].onSale === true) {
            result[i].price = result[i].discountedPrice;
            // saleFont = "red";
            saleMessage = "On sale!"
        };

        const doesObjectExist = favorites.find(function(fav) {

            return fav.id === result[i].id;
        });


        if (doesObjectExist) {
            cssClass = "fa-solid";
        };
        cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

        gamesRow.innerHTML += `<div class="games-container">
                                    <a href="productpage.html?id=${result[i].id}">
                                    <img class="productimg" src="${result[i].image}">
                                    <h3>${result[i].title}</h3>
                                    <p>-Available for PS4, XBOX One and PC</p>
                                    <p>-Instant download</p>
                                    <div class="price-info">
                                    <div class="price-box">
                                    <h4 style="color: ${saleFont}">$${result[i].price}</h4>
                                    </div>
                                    <p class="on-sale-message">${saleMessage}</p>
                                    </div>
                                    </a>
                                    <i class="${cssClass} fa-heart fa-2xl" data-id="${result[i].id}" data-name="${result[i].title}" data-image="${result[i].image}" data-price="${result[i].price}"></i>
                                    </div>
                                    `                 
    };

    const favButton = document.querySelectorAll(".games-container i");

    favButton.forEach((button) => {
        button.addEventListener("click", heartIconChange);
    });

    function heartIconChange() {
        this.classList.toggle("fa-regular");
        this.classList.toggle("fa-solid");
        
        const idLocalStorage = this.dataset.id;
        const titleLocalStorage = this.dataset.name;
        const imageLocalStorage = this.dataset.image;
        const priceLocalStorage = this.dataset.price;
    
        const currentFavs = getExistingFavs();

        const productExists = currentFavs.find(function(fav) {
            return fav.id === idLocalStorage;
        });

        if (!productExists) {
            const product = {title: titleLocalStorage, id: idLocalStorage, image: imageLocalStorage, price: priceLocalStorage};
            currentFavs.push(product);
            saveFavorites(currentFavs);
        } else {
            const newFavs = currentFavs.filter((fav) => fav.id != idLocalStorage);
            saveFavorites(newFavs);
        };

    }

    getExistingFavs();
    
    function saveFavorites(favs) {
        localStorage.setItem("favorites", JSON.stringify(favs));
    };
    

    } catch (error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
        console.log(error, `Sorry, an error occured`);
    };
};

getGames();