export function getCartItems() {
    const cartItems = localStorage.getItem("incart");

    if (!cartItems) {
        return [];
    } else {
        return JSON.parse(cartItems);
    };
};