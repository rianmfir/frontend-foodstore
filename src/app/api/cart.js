import axios from "axios"
import { getCartDBSuccess } from "../features/Cart/actions"

// let { token } = localStorage.getItem("auth")
//     ? JSON.parse(localStorage.getItem("auth"))
//     : {};


export const saveCart = async (token, cart) => {
    return await axios
        .put(
            `/api/carts`, { items: cart },
            {
                headers:
                {
                    authorization: `Bearer ${token}`
                }
            },
        )
}


export const getCartDBAPI = (token) => {
    // let { token } = localStorage.getItem("auth")
    //     ? JSON.parse(localStorage.getItem("auth"))
    //     : {};
    const { user } = JSON.parse(localStorage.getItem('auth'));
    const cartItems = [];

    return async (dispatch) => {
        // dispatch buat loading awalan
        await axios.get('/api/carts',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const { data } = res;
                dispatch(getCartDBSuccess(data));
                console.log("Ini Dari DB API: ", data)
            })

            .catch(err => {
                console.log(err);
            })
    }
}