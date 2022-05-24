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
                let cart = [];


                if (userID) {
                    data.forEach(item => {
                        if (item.user === userID) {
                            cart.push(item);
                        }
                    });
                    dispatch(getCart(data))
                    // console.log("USER ID : ", userID)
                }
                else {
                    // console.log("USER ID : ", userID)
                }
                // console.log("Filter : ", cart);

                // console.log("data From DB : 'bea' ", data)
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}