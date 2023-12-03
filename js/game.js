import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartItems } from "./utils/getCartItems.js";
import { GAMEHUB_API_URL } from "./common/commons.js";
import { getProducts } from "./utils/getProducts.js";
import { heartIconChange } from "./utils/heartIconChange.js";
import { cartIconChange } from "./utils/cartIconChange.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const breadcrumbsPage = document.querySelector(".breadcrumbspage");

const url =`${GAMEHUB_API_URL}/${id}`;
const main = document.querySelector("main");
const productContainer = document.querySelector(".productpagecontainer");
const cartNumberOfItems = document.querySelector(".cart-status");

const favorites = getExistingFavs();
const currentCartItems = getCartItems();


async function getGame() {
    try {
    const response = await fetch(url);
    const result = await response.json();

    productContainer.innerHTML = ``;
    document.title = `Game Hub - Product Page - ${result.title}`;
    let saleFont = "";
    if (result.onSale === true) {
        result.price = result.discountedPrice;
        
        saleFont = "red";
    };

    let cssClass = "far";

    const doesObjectExist = favorites.find(function(fav) {


        return fav.id === result.id;
    });

    if (doesObjectExist) {
        cssClass = "fa-solid";
    };

    cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

    breadcrumbsPage.innerHTML += `<b class="breadcrumbspage">${result.title}</b>`;
    productContainer.innerHTML += `<div class"productpagecontainer">
                                    <div class="productquickinfo">
                                        <h1>${result.title}</h1>
                                        <img class="mainimg" src="${result.image}" alt="${result.title} cover photo">
                                        <p class="pp-p-one">${result.description}</p>
                                        <p class="availablefor">Genre: ${result.genre}</p>
                                        <p id="instantdownload">-Instant download</p>
                                        <p class="released">Released: ${result.released}</p>
                                        <h2 style="color: ${saleFont}">Price: $${result.price}</h2>
                                        <div class="cartbuyheart">
                                        <button class="cart">
                                        <i class="fa-solid fa-cart-shopping fa-2xl" data-id="${result.id}" data-name="${result.title}" data-image="${result.image}" data-price="${result.price}"></i>
                                        </button>
                                        <a href="cart.html" class="buy">
                                        <b>Go to cart</b>
                                        </a>
                                        <button class="heart">
                                        <i class="${cssClass} fa-heart fa-2xl gameheart" data-id="${result.id}" data-name="${result.title}" data-image="${result.image}" data-price="${result.price}"></i>
                                        </button>
                                        </div>
                                    <p class="added-to-cart"></p>
                                    </div>
                                </div>`;

// Cart icon
        const cartButton = document.querySelector(".productpagecontainer i.fa-cart-shopping");
        cartButton.addEventListener("click", cartIconChange);
        
        getCartItems();

        const favButton = document.querySelectorAll(".productpagecontainer i.fa-heart");
        favButton.forEach((button) => {
            button.addEventListener("click", heartIconChange);
        });
        getExistingFavs();


} catch(error) {
    main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
    console.log(error, `Sorry, an error occured`);
}
};
getGame();




// function CreateProductInfo(game) {
//     const productInfo = document.createElement(`div`);
//     productInfo.classList.add(`product-page-container`);
//     let cssClass = "far";
//     let saleFont = "";
//     cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

//     if (game.onSale === true) {
//         game.price = game.discountedPrice;
//         saleFont = "red";
//     };

//     const doesObjectExist = favorites.find(function(fav) {
//         return fav.id === game.id;
//     });

//     if (doesObjectExist) {
//         cssClass = "fa-solid";
//     };

//     productInfo.innerHTML = `
//                     <img class="mainimg" src="${game.image}" alt="${game.title} cover photo">
//                     <h1>${game.title}</h1>
//                     <p class="pp-p-one">${game.description}</p>
//                     <p class="availablefor">Genre: ${game.genre}</p>
//                     <p id="instantdownload">-Instant download</p>
//                     <p class="released">Released: ${game.released}</p>
//                     <h2 style="color: ${saleFont}">Price: $${game.price}</h2>
//                     <div class="cartbuyheart">
//                     <button class="cart">
//                     <i class="fa-solid fa-cart-shopping fa-2xl" 
//                     data-id="${game.id}" 
//                     data-name="${game.title}" 
//                     data-image="${game.image}" 
//                     data-price="${game.price}">
//                     </i>
//                     </button>
//                     <a href="cart.html" class="buy">
//                     <b>Go to cart</b>
//                     </a>
//                     <button class="heart">
//                     <i class="${cssClass} fa-heart fa-2xl gameheart" data-id="${game.id}" data-name="${game.title}" data-image="${game.image}" data-price="${game.price}"></i>
//                     </button>
//                 </div>
//                 `;
//     return productInfo;
// }

// export async function renderProduct() {
//     const game = await getProducts(url); 
//     const productContainer = document.querySelector(".productpagecontainer");
//     productContainer.innerHTML = ``;
 
//  }
 
//  renderProduct();