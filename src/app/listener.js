import { saveCart } from "./api/cart";
import store from "./store";

let currentAuth;
let currentCart;
const listener = () => {
    let previousAuth = currentAuth;
    let previousCart = currentCart;

    currentAuth = store.getState().auth;
    currentCart = store.getState().cart;

    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    // if (currentAuth !== previousAuth) {
    //     saveCart(token, currentCart);
    // }

    if (currentCart !== previousCart) {
        localStorage.setItem('cart', JSON.stringify(currentCart));
        saveCart(token, currentCart);
    }
}

export const listen = () => {
    store.subscribe(listener);
}