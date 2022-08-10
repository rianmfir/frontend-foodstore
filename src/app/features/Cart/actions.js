import {
    ADD_TO_CART,
    REMOVE_ITEM,
    GET_CART,
    CLEAR_ITEM
} from "./constants";


export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: {
            ...item,
            product: item.product || item
        }
    }
}

export const getCart = (item) => {
    return {
        type: GET_CART,
        payload: item
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
