import { getExistingFavs } from "./favFunctions.js";

export  function heartIconChange() {
    this.classList.toggle("fa-regular");
    this.classList.toggle("fa-solid");
    
    const idLocalStorage = this.dataset.id;
    const titleLocalStorage = this.dataset.name;
    const imageLocalStorage = this.dataset.image;
    const priceLocalStorage = this.dataset.price;
    console.log(idLocalStorage, titleLocalStorage);

    const currentFavs = getExistingFavs();

    const productExists = currentFavs.find(function(fav) {
        return fav.id === idLocalStorage;
    });
    const heartIconColor = document.querySelector(".fa-heart.gameheart");
    if (!productExists) {
        const product = {
            name: titleLocalStorage, 
            id: idLocalStorage, 
            image: imageLocalStorage, 
            price: priceLocalStorage
        };
        currentFavs.push(product);
        saveFavorites(currentFavs);

        this.style.color = "red";

        setTimeout(() => {
            this.style.color = "";
        }, 2000);
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id != idLocalStorage);
        saveFavorites(newFavs);
        this.style.color = "";
    };

}
function saveFavorites(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
};
