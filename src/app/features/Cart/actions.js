import axios from "axios"
import { useSelector } from "react-redux";
import {
    ADD_TO_CART,
    GET_ITEM,
    REMOVE_ITEM,
    GET_CART
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
