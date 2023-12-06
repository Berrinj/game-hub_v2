export function RemoveWishlistItem(event) {
    const wishlistContainer = document.querySelector(".nofavs");
    const wishlistItem = event.target.closest(".wishlist1");
    let inWishlist = JSON.parse(localStorage.getItem("favorites")) || [];
    if (wishlistItem) {
      const itemIdToRemove = wishlistItem.getAttribute("data-game-id");
  
      let newInWishlist = [];
      for (let i = 0; i < inWishlist.length; i++) {
        if (inWishlist[i].id !== itemIdToRemove) {
          newInWishlist.push(inWishlist[i]);
        }
      }
      inWishlist = newInWishlist;
  
      localStorage.setItem("favorites", JSON.stringify(inWishlist));
      wishlistItem.remove();

      updateTotalSum(inWishlist);
    }
    // if (inWishlist.length === 0) {
    //     wishlistContainer.innerHTML = `<p class="nofavs">No favorites to show here. Go add some and spoil yourself, you deserve it!</p>`;
    // }
  }

  function updateTotalSum(items) {
    
    let total = 0;

    
    items.forEach(inWishlist => {
        let itemPrice = +inWishlist.price;
        total += itemPrice;
    });

    total = total.toFixed(2);

    const totalSum = document.querySelector(".total");
    if (totalSum) {
        totalSum.innerHTML = `<h3>Total</h3>
                            <h3>$${total}</h3>`;
    }
}