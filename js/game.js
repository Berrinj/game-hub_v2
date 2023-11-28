import { getExistingFavs } from "./utils/favFunctions.js";
import { getCartItems } from "./utils/getCartItems.js";


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const breadcrumbsPage = document.querySelector(".breadcrumbspage");

const url = "https://api.noroff.dev/api/v1/gamehub/" + id;
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
                                        <img class="mainimg" src="${result.image}" alt="${result.title} cover photo">
                                        <h1>${result.title}</h1>
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
                                    </div>
                                </div>`;

// Cart icon
        const cartButton = document.querySelector(".productpagecontainer i.fa-cart-shopping");
        cartButton.addEventListener("click", cartIconChange);
        const cartIconColor = document.querySelector(".fa-cart-shopping");
        const goToCartButton = document.querySelector(".buy");

        function cartIconChange() {

            const idLocalStorage = this.dataset.id;
            const titleLocalStorage = this.dataset.name;
            const imageLocalStorage = this.dataset.image;
            const priceLocalStorage = this.dataset.price;

            const currentCartItems = getCartItems();

            const productExists = currentCartItems.find(function(cart) {
                return cart.id === idLocalStorage;
            });

            
            if (!productExists) {
                const product = {title: titleLocalStorage, id: idLocalStorage, image: imageLocalStorage, price: priceLocalStorage};
                currentCartItems.push(product);
                saveCartItem(currentCartItems);

                cartIconColor.style.color = "green";
                goToCartButton.innerHTML = "<b>Added!</b>";
                cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;

                setTimeout(() => {
                    cartIconColor.style.color = "";
                    goToCartButton.innerHTML = "<b>Go to cart</b>";
                }, 2000);

            } else {
                const newcartItem = currentCartItems.filter((cart) => cart.id !== idLocalStorage);
                saveCartItem(newcartItem);
                goToCartButton.innerHTML = "<b>Removed.</b>";
                cartIconColor.style.color = "red";

                setTimeout(() => {
                    cartIconColor.style.color = "";
                    goToCartButton.innerHTML = "<b>Go to cart</b>";
                }, 2000);

            };

        };

        getCartItems();

        function saveCartItem(incart) {
            localStorage.setItem("incart", JSON.stringify(incart));
        };


//Favorite icon // tried import export but here I just couldn't make it work.
        const favButton = document.querySelectorAll(".productpagecontainer i.fa-heart");
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
                const newFavs = currentFavs.filter((fav) => fav.id !== idLocalStorage);
                saveFavorites(newFavs);
            };
        
        };
        
        getExistingFavs();

        function saveFavorites(favs) {
            localStorage.setItem("favorites", JSON.stringify(favs));
        };


} catch(error) {
    main.innerHTML = `<div class="error">We are so sorry, an error occured while loading this page.</div>`;
    console.log(error, `Sorry, an error occured`);
}
};
getGame();




