import { GET_ADDRESS } from "./constants";

const productState = {
    address: [],
}

const addressReducer = (state = productState, { type, payload }) => {
    switch (type) {
        case GET_ADDRESS:
            return {
                ...state,
                data: payload
            };
        default:
            return state;
    }
}

export default addressReducer;