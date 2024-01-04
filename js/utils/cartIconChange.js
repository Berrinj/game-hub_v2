import { getCartItems } from "./getCartItems.js";
import { updateCartStatus } from "./updateCartStatus.js";


export function cartIconChange() {
    const cartIconColor = document.querySelector(".fa-cart-plus");
    const goToCartButton = document.querySelector(".buy");
    const cartNumberOfItems = document.querySelector(".cart-status");
    const addedToCart = document.querySelector(".added-to-cart");

    const idLocalStorage = this.dataset.id;
    const titleLocalStorage = this.dataset.name;
    const imageLocalStorage = this.dataset.image;
    const priceLocalStorage = this.dataset.price;

    const windowInnerWidth  = window.innerWidth;

    const currentCartItems = getCartItems();

    const productExists = currentCartItems.find(function(cart) {
        return cart.id === idLocalStorage;
    });

    
    if (!productExists) {
        const product = {name: titleLocalStorage, id: idLocalStorage, image: imageLocalStorage, price: priceLocalStorage};
        currentCartItems.push(product);
        saveCartItem(currentCartItems);

        cartIconColor.style.color = "green";
        goToCartButton.innerHTML = "<b>Added to cart</b>";
        // addedToCart.innerHTML = "<i>Added to cart</i>";
        // cartNumberOfItems.innerHTML = `<p class="cart-status">${currentCartItems.length} item(s)</p>`;
        // if ( windowInnerWidth < 824) {
        //     cartNumberOfItems.innerHTML = `<p>${currentCartItems.length}</p>`; 
        // } else {
        //     cartNumberOfItems.innerHTML = `<p>${currentCartItems.length} item(s)</p>`;
        // }
        updateCartStatus();

        setTimeout(() => {
            cartIconColor.style.color = "";
            // addedToCart.innerHTML = "";
            goToCartButton.innerHTML = "<b>Go to cart</b>";
        }, 2000);

    } else {
        const newcartItem = currentCartItems.filter((cart) => cart.id !== idLocalStorage);
        saveCartItem(newcartItem);
        addedToCart.innerHTML = "<i>Removed from cart</i>";
        // goToCartButton.innerHTML = "<b>Removed.</b>";
        cartIconColor.style.color = "red";
        updateCartStatus();

        setTimeout(() => {
            cartIconColor.style.color = "";
            addedToCart.innerHTML = "";
            // goToCartButton.innerHTML = "<b>Go to cart</b>";
        }, 2000);

    };

};
function saveCartItem(incart) {
    localStorage.setItem("incart", JSON.stringify(incart));
};
