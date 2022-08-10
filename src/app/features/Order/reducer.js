import { CREATE_ORDER, GET_INVOICES } from "./constants";

const productState = {
    order: [],
    invoices: ''
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
                invoices: payload
            };
        default:
            return state;
    }
}

export default orderReducer;