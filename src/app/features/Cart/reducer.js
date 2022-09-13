import {
    ADD_TO_CART,
    GET_CART,
    REMOVE_ITEM,
    CLEAR_ITEM,
} from "./constants";


const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
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

        case CLEAR_ITEM:
            return []

        default:
            return state;
    }
}


export default cartReducer;