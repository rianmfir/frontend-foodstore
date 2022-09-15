import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_ITEM,
    GET_CART,
    CLEAR_ITEM,
} from "./constants";

export const saveCarts = async (cart) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
    return await axios
        .put(`/api/carts`, { items: cart },
            {
                headers:
                {
                    authorization: `Bearer ${token}`
                }
            },
        )
}

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: {
            ...item,
            product: item.product || item
        }
    }
}

export const getCartItems = () => {
    return async (dispatch) => {
        let { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        await axios.get('/api/carts',
            {
                headers:
                {
                    authorization: `Bearer ${token}`
                }
            },
        )
            .then(res => {
                let { data } = res

                dispatch({
                    type: GET_CART,
                    payload: data,
                });
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM,
        payload: {
            item: item
        }
    }
}

export function clearItem() {
    return {
        type: CLEAR_ITEM
    }
}
