import {
    ADD_TO_CART,
    GET_CART_SUCCESS,
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
            if (state.find(item => item._id === payload.item._id)) {
                return state.map(item => ({
                    ...item,
                    qty: item._id === payload.item._id
                        ? item.qty + 1
                        : item.qty
                }));
            } else {
                return [...state, { ...payload.item, qty: 1 }]
            }

        case GET_CART_SUCCESS:
            return (
                // ...state,
                payload
            )

        case REMOVE_ITEM:
            return state
                .map(item => ({ ...item, qty: item._id === payload.item._id ? item.qty - 1 : item.qty }))
                .filter(item => item.qty > 0);

        case GET_ITEM:
            return {
                ...state,
                data: payload
            }

        case GET_CART_DB:
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}


export default cartReducer;