import { getExistingFavs } from "./favFunctions.js";
export  function heartIconChange() {
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
        const product = {
            title: titleLocalStorage, 
            id: idLocalStorage, 
            image: imageLocalStorage, 
            price: priceLocalStorage
        };
        currentFavs.push(product);
        saveFavorites(currentFavs);
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id != idLocalStorage);
        saveFavorites(newFavs);
    };

}
function saveFavorites(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
};
