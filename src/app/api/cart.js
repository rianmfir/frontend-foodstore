import axios from "axios"
import { getCart } from "../features/Cart/actions"


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

export const getCartItem = (token, userID) => {
    return async (dispatch) => {
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

                if (userID) {
                    dispatch(getCart(data))
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}