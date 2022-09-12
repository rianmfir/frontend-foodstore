import { CLEAR_ORDER, CREATE_ORDER, GET_INVOICES, GET_ORDERS, GET_TOTAL_SELL, LOADING, SET_ORDER_ID } from "./constants";

const productState = {
    orders: [],
    invoices: [],
    loading: false,
    data: [],
    id: '',
    totalSells: ''
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
        case SET_ORDER_ID:
            return {
                ...state,
                id: payload
            };
        case GET_ORDERS:
            return {
                ...state,
                orders: payload
                // loading: false
            };
        case GET_TOTAL_SELL:
            return {
                ...state,
                totalSells: payload
            };
        case CLEAR_ORDER:
            return {
                ...state,
                data: [],
                invoices: [],
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