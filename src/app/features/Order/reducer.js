import { CLEAR_ORDER, CREATE_ORDER, GET_INVOICES, GET_ORDERS, LOADING, SET_ORDER_ID } from "./constants";

const productState = {
    orders: [],
    invoices: [],
    loading: false,
    data: [],
    id: '',
}

const orderReducer = (state = productState, { type, payload }) => {
    switch (type) {
        case CREATE_ORDER:
            return {
                ...state,
                data: payload
            };
        case GET_INVOICES:
            return {
                ...state,
                invoices: payload,
                loading: false
            };
        case GET_ORDERS:
            return {
                ...state,
                orders: payload
                // loading: false
            };
        case SET_ORDER_ID:
            return {
                ...state,
                id: payload
            };
        case CLEAR_ORDER:
            return {
                ...state,
                data: [],
                id: '',
            }
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default orderReducer;