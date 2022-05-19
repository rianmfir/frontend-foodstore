import { getCartDBAPI, saveCart } from "./api/cart";
import store from "./store";

let currentCart;
const listener = () => {
    let previousCart = currentCart;
    currentCart = store.getState().cart;

    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    if (currentCart !== previousCart) {
        localStorage.setItem('cart', JSON.stringify(currentCart));
        saveCart(token, currentCart);
    }
    // getCartDBAPI(token);
}

export const listen = () => {
    store.subscribe(listener);
}