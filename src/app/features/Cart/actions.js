import axios from "axios"
import { useSelector } from "react-redux";
import {
    ADD_TO_CART,
    GET_CART_DB,
    GET_ITEM,
    REMOVE_ITEM,
} from "./constants";

let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};



export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: {
            item: {
                ...item,
                product: item.product || item
            }
        }
    }
}
export const getCartDBSuccess = (item) => {
    return {
        type: GET_CART_DB,
        payload: {
            ...item
        }
    }
}


export const getCartItem = () => {
    return async (dispatch) => {
        await axios.get('/api/carts',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                dispatch({
                    type: GET_ITEM,
                    payload: res.data
                })
                // console.log("Ini data dari getCartItem: ", res)
            })
            .catch(err => {
                console.log(err)
            })

    }
}

// export { getCartItem };