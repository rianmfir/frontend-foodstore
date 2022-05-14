import axios from "axios"
import { useSelector } from "react-redux";
import { ADD_TO_CART, ADD_CART_EXAMPLE, GET_ITEM, REMOVE_ITEM } from "./constants";

let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

const addToCart = (product) => {

    let cart = [];

    cart.push(product);
    return async (dispatch) => {
        await axios
            .put(
                `/api/carts`, { items: cart },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(res => {
                console.log(res.data);
                // localStorage.setItem(res.data)
                dispatch({
                    type: ADD_TO_CART,
                    payload: res.data,
                });
                console.log("Response : ", res);
            })
            .catch(err => {
                console.log(err);
            })
    }

}

export const addCartExample = (item) => {
    return {
        type: ADD_CART_EXAMPLE,
        payload:
        {
            id: item._id,
            image: item.image_url,
            name: item.name,
            price: item.price
        }
    }
}



const getCartItem = () => {
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
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
}

export { addToCart, getCartItem };