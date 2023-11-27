export function handleRemoveButtonClick(event) {
    const cartContainer = document.querySelector(".shopping-cart");
    const cartItem = event.target.closest(".cartItem-container");
    let inCart = JSON.parse(localStorage.getItem("incart")) || [];
    if (cartItem) {
      const itemIdToRemove = cartItem.getAttribute("data-game-id");
  
      let newInCart = [];
      for (let i = 0; i < inCart.length; i++) {
        if (inCart[i].id !== itemIdToRemove) {
          newInCart.push(inCart[i]);
        }
      }
      inCart = newInCart;
  
      localStorage.setItem("incart", JSON.stringify(inCart));
      cartItem.remove();

      updateTotalSum(inCart);
    }
    if (inCart.length === 0) {
      cartContainer.innerHTML = `<p class="nofavs">No items in cart.</p>`;
    }
  }

  function updateTotalSum(items) {
    
    let total = 0;

    
    items.forEach(inCart => {
        let itemPrice = +inCart.price;
        total += itemPrice;
    });

    total = total.toFixed(2);

    const totalSum = document.querySelector(".total");
    if (totalSum) {
        totalSum.innerHTML = `<h3>Total</h3>
                            <h3>$${total}</h3>`;
    }
}