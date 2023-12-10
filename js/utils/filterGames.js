import { getProducts } from "./getProducts.js";
import { GAMEHUB_API_URL } from "../common/commons.js";
import { getExistingFavs } from "./favFunctions.js";
import { getCartItems } from "./getCartItems.js";
import { heartIconChange } from "./heartIconChange.js";
let selectHeading = document.querySelector(".cat h2");
let container = document.querySelector(".gamesrow");
let selectSortBy = document.querySelector("#sort-games-by");

export function sortGames() {    
    let selectedValue = selectSortBy.value;
    console.log("Selected Value:", selectedValue);
    switch (selectedValue) {
        // case "all":
        //     selectHeading.textContent = "All games";
        //     break;
        case "3+":
            selectHeading.textContent = "All games";
            break;
        case "12+":
            selectHeading.textContent = "PEGI 12 games";
            break;
        case "16+":
            selectHeading.textContent = "PEGI 16 games";
            break;
        case "18+":
            selectHeading.textContent = "PEGI 18 games";
            break;
        case "Sports":
            selectHeading.textContent = "Sports games";
            break;
        case "Horror":
            selectHeading.textContent = "Horror games";
            break;
        case "Action":
            selectHeading.textContent = "Action games";
            break;
        case "Adventure":
            selectHeading.textContent = "Adventure games";
            break;
        case "onSale":
            selectHeading.textContent = "On sale games";
            break;
        default:
            selectHeading.textContent = "All games";
    }
}