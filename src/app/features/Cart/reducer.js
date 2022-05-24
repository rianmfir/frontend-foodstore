import {
    ADD_TO_CART,
    GET_CART,
    ADD_CART_EXAMPLE,
    GET_ITEM,
    GET_CART_DB,
    REMOVE_ITEM,
    ADD_ITEM,
} from "./constants";


const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            // state.find(item =>
            //     console.log("(1) Intial State item._id : ", item.product._id),
            //     console.log("(1) New Input payload.item._id : ", payload._id)
            // )
            // state.map(item => (
            //     console.log("Ada Check Lagi "),
            //     console.log("(2) Intial State item._id : ", item.product._id),
            //     console.log("(2) New Input payload.item._id : ", payload.product._id),
            //     console.log("____________________________________")
            // ))

            if (state.find(item => item.product._id === payload.product._id)) {

                return state.map(item => ({
                    ...item,
                    qty: item.product._id === payload.product._id
                        ? item.qty + 1
                        : item.qty

                }));

            } else {
                return [...state, { ...payload, qty: 1 }]
            }

        case GET_CART:
            return (
                payload
            )

        case REMOVE_ITEM:
            return state
                .map(item => ({ ...item, qty: item._id === payload.item._id ? item.qty - 1 : item.qty }))
                .filter(item => item.qty > 0);

        default:
            return state;
    }
}


export default cartReducer;