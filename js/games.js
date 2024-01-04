import { GAMEHUB_API_URL } from "./common/commons.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { sortGames } from "./utils/filterGames.js";
import { getCartItems } from "./utils/getCartItems.js";
import { getProducts } from "./utils/getProducts.js";
import { heartIconChange } from "./utils/heartIconChange.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
import { updateCartStatus } from "./utils/updateCartStatus.js";

const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);
// export const url = "https://api.noroff.dev/api/v1/gamehub/";
// export const gameContainer = document.querySelector(".games-container");
// export const gamesRow = document.querySelector(".gamesrow");
export const priceBox = document.querySelector(".price-box");
const main = document.querySelector("main");

// const favButton = document.querySelectorAll(".games-container i");

const favorites = getExistingFavs();

window.addEventListener("resize", updateCartStatus);

updateCartStatus();



let selectSortBy = document.querySelector("#sort-games-by");
selectSortBy.addEventListener("change", function() {
    sortGames();
    renderProducts(selectSortBy.value);
});

function createProductCard(game) {
    try {
    const productCard = document.createElement(`div`);
    productCard.dataset.productId = game.id;
    productCard.classList.add(`games-container`);
    let saleMessage = "";
    let cssClass = "far";


    if (game.on_sale === true) {
        // game.price = game.discountedPrice;
        saleMessage = "On sale!";
        };

        const doesObjectExist = favorites.find(function(fav) {
         return parseInt(fav.id) === parseInt(game.id);
        });

        if (doesObjectExist) {
            cssClass = "fa-solid";
        };
        
        let price = `${game.prices.price / 100}`;
    productCard.innerHTML = `   <a href="productpage.html?id=${game.id}">
                                <img class="productimg" src="${game.images[0].src}" alt="${game.title} product image">
                                <h3>${game.name}</h3>
                                <p>-Available for PS4, XBOX One and PC</p>
                                <p>-Instant download</p>
                                <p>Genre: ${game.categories[0].name}</p>
                                <div class="price-info">
                                <div class="price-box">
                                <h4>${price} ${game.prices.currency_code}</h4>
                                
                                </div>
                                <p class="on-sale-message">${saleMessage}</p>
                                </div>
                                </a>
                                <i class="${cssClass} fa-heart fa-2xl add-to-wishlist" data-id="${game.id}" data-name="${game.name}" data-image="${game.images[0].src}" data-price="${price}"></i>`
    
    return productCard;
    } catch (error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
        console.log(error, `Sorry, an error occurred`);
}
}


export async function renderProducts(selectedValue = "3+") {
   let games = await getProducts(GAMEHUB_API_URL); 
   console.log("Games Data:", games);
   const gameContainer = document.querySelector(".gamesrow");
if (selectedValue !== "3+") {
    if (selectedValue === "16+") {
        games = games.filter((game) => game.ageRating === selectedValue);
    } else if (selectedValue === "18+") {
        games = games.filter((game) => game.ageRating === selectedValue);   
    } else if (selectedValue === "12+") {
        games = games.filter((game) => game.ageRating === selectedValue);   
    } else if (selectedValue === "onSale"){
        games = games.filter((game) => game.on_sale);
    } else if (selectedValue === "3+"){
        games = games.filter((game) => game.ageRating === selectedValue);
    } else {
         games = games.filter((game) => game.categories[0].name === selectedValue);
    }
   }
    
    console.log("Games Data (After Filtering):", games);

   gameContainer.innerHTML = ``;

    games.forEach((game) => {
        const productCard = createProductCard(game);
        gameContainer.appendChild(productCard);
    });

    const favButton = document.querySelectorAll(".games-container i");
    favButton.forEach((button) => {
        button.addEventListener("click", heartIconChange);
    });
    getExistingFavs();
}


// export async function renderProducts() {
//     const games = await getProducts(GAMEHUB_API_URL); 
//     const gameContainer = document.querySelector(".gamesrow");
//     gameContainer.innerHTML = ``;
 
//      games.forEach((game) => {
//          const productCard = createProductCard(game);
//          gameContainer.appendChild(productCard);
//      });
 
//      const favButton = document.querySelectorAll(".games-container i");
//      favButton.forEach((button) => {
//          button.addEventListener("click", heartIconChange);
//      });
//      getExistingFavs();
//  }

renderProducts();

// async function getGames() {

//     try {
//     const response = await fetch(url);
//     const result = await response.json();

//     gamesRow.innerHTML = "";
    

//     for(let i = 0; i < result.length; i++){
//         let saleFont = "";
//         let cssClass = "far";
//         let saleMessage = "";

//         if (result[i].onSale === true) {
//             result[i].price = result[i].discountedPrice;
//             // saleFont = "red";
//             saleMessage = "On sale!"
//         };

//         const doesObjectExist = favorites.find(function(fav) {

//             return fav.id === result[i].id;
//         });


//         if (doesObjectExist) {
//             cssClass = "fa-solid";
//         };
//         cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

//         gamesRow.innerHTML += `<div class="games-container">
//                                     <a href="productpage.html?id=${result[i].id}">
//                                     <img class="productimg" src="${result[i].image}">
//                                     <h3>${result[i].title}</h3>
//                                     <p>-Available for PS4, XBOX One and PC</p>
//                                     <p>-Instant download</p>
//                                     <div class="price-info">
//                                     <div class="price-box">
//                                     <h4 style="color: ${saleFont}">$${result[i].price}</h4>
//                                     </div>
//                                     <p class="on-sale-message">${saleMessage}</p>
//                                     </div>
//                                     </a>
//                                     <i class="${cssClass} fa-heart fa-2xl" data-id="${result[i].id}" data-name="${result[i].title}" data-image="${result[i].image}" data-price="${result[i].price}"></i>
//                                     </div>
//                                     `                 
//     };

//     const favButton = document.querySelectorAll(".games-container i");

//     favButton.forEach((button) => {
//         button.addEventListener("click", heartIconChange);
//     });

    // function heartIconChange() {
    //     this.classList.toggle("fa-regular");
    //     this.classList.toggle("fa-solid");
        
    //     const idLocalStorage = this.dataset.id;
    //     const titleLocalStorage = this.dataset.name;
    //     const imageLocalStorage = this.dataset.image;
    //     const priceLocalStorage = this.dataset.price;
    
    //     const currentFavs = getExistingFavs();

    //     const productExists = currentFavs.find(function(fav) {
    //         return fav.id === idLocalStorage;
    //     });

    //     if (!productExists) {
    //         const product = {title: titleLocalStorage, id: idLocalStorage, image: imageLocalStorage, price: priceLocalStorage};
    //         currentFavs.push(product);
    //         saveFavorites(currentFavs);
    //     } else {
    //         const newFavs = currentFavs.filter((fav) => fav.id != idLocalStorage);
    //         saveFavorites(newFavs);
    //     };

    // }

//     getExistingFavs();
    
//     function saveFavorites(favs) {
//         localStorage.setItem("favorites", JSON.stringify(favs));
//     };
    

//     } catch (error) {
//         main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
//         console.log(error, `Sorry, an error occured`);
//     };
// };

// getGames();