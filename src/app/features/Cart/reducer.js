import { useSelector } from "react-redux";
import {
    ADD_TO_CART,
    ADD_CART,
    REMOVE_ITEM,
    GET_ITEM,
    ADD_CART_EXAMPLE
} from "./constants";

const initialState = {
    data: [],
}


const cartReducer = (state = [], { type, payload }) => {
    let doesItemExist;
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                data: payload
            }

        case ADD_CART_EXAMPLE:
            doesItemExist = false;
            const newState = state.map((item) => {
                if (item.id === payload.id) {
                    item.quantity += 1;
                    doesItemExist = true;
                }
                return item;
            });
            if (doesItemExist) {
                return newState;
            }

            return [...state, { ...payload, quantity: 1 }];


        case GET_ITEM:
            return {
                ...state,
                data: payload
            }
        // return [...state, { ...payload }];

        default:
            return state;
    }
}


export default cartReducer;