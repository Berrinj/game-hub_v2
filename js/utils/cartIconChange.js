import { getCartItems } from "./getCartItems.js";

export function cartIconChange() {
    const cartIconColor = document.querySelector(".fa-cart-shopping");
    const goToCartButton = document.querySelector(".buy");
    const cartNumberOfItems = document.querySelector(".cart-status");

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

function saveCartItem(incart) {
    localStorage.setItem("incart", JSON.stringify(incart));
};
