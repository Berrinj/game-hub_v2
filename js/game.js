import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartItems } from "./utils/getCartItems.js";
import { GAMEHUB_API_URL } from "./common/commons.js";
import { getProducts } from "./utils/getProducts.js";
import { heartIconChange } from "./utils/heartIconChange.js";
import { cartIconChange } from "./utils/cartIconChange.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
import { updateCartStatus } from "./utils/updateCartStatus.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

window.addEventListener("resize", updateCartStatus);
updateCartStatus();


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const breadcrumbsPage = document.querySelector(".breadcrumbspage");

const url =`${GAMEHUB_API_URL}/${id}`;
const main = document.querySelector("main");
const productContainer = document.querySelector(".productpagecontainer");



const favorites = getExistingFavs();


async function getGame() {
    try {
    const response = await fetch(url);
    const result = await response.json();

    productContainer.innerHTML = ``;
    document.title = `Game Hub - Product Page - ${result.title}`;
    let saleFont = "";
    let saleText = document.querySelector(".sale-text");
    let saleMessage = "";
    
    if (result.on_sale === true) {
        // result.price = result.discountedPrice;
        saleMessage = "On sale!";
        saleFont = "#C5312D";
    };

    let cssClass = "far";

    const doesObjectExist = favorites.find(function(fav) {
        console.log(typeof fav.id, typeof result.id)
        return parseInt(fav.id, 10) === parseInt(result.id, 10);
    });

    if (doesObjectExist) {
        cssClass = "fa-solid";
    };

    let price = `${result.prices.price / 100}`;
    let category = `${result.categories[0].name}`;
    breadcrumbsPage.innerHTML += `<b class="breadcrumbspage">${result.name}</b>`;
    productContainer.innerHTML += `<div class="productquickinfo">
                                        <h1>${result.name}</h1>
                                        <img class="mainimg" src="${result.images[0].src}" alt="${result.title} cover photo">
                                        <p class="pp-p-one">${result.description}</p>
                                        <p class="availablefor">Genre: ${category}</p>
                                        <p id="instantdownload">-Instant download</p>
                                        <div class="sale">
                                        <h2>Price: ${price} ${result.prices.currency_code}</h2>
                                        <p style="color: ${saleFont}">${saleMessage}</p></div>
                                        <div class="cartbuyheart">
                                        <button class="cart" aria-label="Add to cart button" title="Add to cart button">
                                        <i class="fa-solid fa-cart-plus fa-2xl gamecart" data-id="${result.id}" data-name="${result.name}" data-image="${result.images[0].src}" data-price="${price}"></i>
                                        </button>
                                        <button class="heart" aria-label="Add to wishlist button" title="Add to wishlist button">
                                        <i class="${cssClass} fa-heart fa-2xl gameheart" data-id="${result.id}" data-name="${result.name}" data-image="${result.images[0].src}" data-price="${price}"></i>
                                        </button>
                                        <a href="cart.html" class="buy">
                                        <b>View cart</b>
                                        </a>
                                        </div>
                                    <p class="added-to-cart"></p>
                                    </div>
                                `;
{/* <p class="released">Released: ${result.released}</p> */}
// Cart icon
        const cartButton = document.querySelector(".productpagecontainer i.fa-cart-plus");
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