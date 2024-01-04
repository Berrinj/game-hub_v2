import { getExistingFavs } from "./utils/favFunctions.js";
import { updateCartStatus } from "./utils/updateCartStatus.js";
import { subscriptionThanks } from "./utils/subscribeButton.js";
import { heartIconChange } from "./utils/heartIconChange.js";
import { RemoveWishlistItem } from "./utils/removeWishButton.js";
const subscribeButton = document.querySelector(".subscribe");
subscribeButton.addEventListener("click", subscriptionThanks);

const favorites = getExistingFavs();

const main = document.querySelector("main");
const favoritesContainer = document.querySelector(".wishlistgames");
const noMoreItems = document.querySelector(".nomoreitems");

try {

    window.addEventListener("resize", updateCartStatus);

    updateCartStatus();

    favoritesContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("trash")) {
          RemoveWishlistItem(event);
          updateCartStatus();
          
        }
      });

if(favorites.length === 0) {
    // favoritesContainer.innerHTML = `<p class="nofavs">No favorites to show here.</p>`
    noMoreItems.innerHTML = `<p class="nofavs">No favorites to show here. <a href="index.html">Go add some</a> and spoil yourself, you deserve it!</p>`;
};


favoritesContainer.innerHTML = "";

favorites.forEach(favorite => {
    let cssClass = "far";

const doesObjectExist = favorites.find(function(fav) {
    return fav.id === favorite.id;
   });

   if (doesObjectExist) {
       cssClass = "fa-solid";
   };
    
    favoritesContainer.innerHTML += `<li><div class="wishlist1" data-game-id="${favorite.id}">
                                        <a href="productpage.html?id=${favorite.id}">
                                        <img src="${favorite.image}" alt="${favorite.image} product image">
                                        
                                        <div class="nameheart">
                                            <h2>${favorite.name}</h2>
                                        </div>
                                        
                                        <p>-Available for PS4, PS5, Nintendo Switch, XBOX One & XBOX
                                            Series X </p>
                                        <p>-Instant download</p></a>
                                        <h3>Price: ${favorite.price} NOK</h3>
                                        <button class="trash"><i class="fa-regular fa-trash-can"></i> Remove item</button>
                                    </div></li>`

                                    // <button class="wishlist-button add-item-cart">Add to cart</button>
                                    // <button class="delete-wishlist-button">Remove item</button>
//fav icon
const favButton = document.querySelectorAll(".wishlistpagecontainer i.fa-heart");
    favButton.forEach((button) => {
        button.addEventListener("click", heartIconChange);
    });
    getExistingFavs();


});



} catch(error) {
    main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
    console.log(error, `Sorry, an error occured`);
}
