import { GET_PRODUCT_SUCCESS, GET_TAG_SUCCESS } from "./constants";

const productState = {
    product: [],
    // category: '',
    tags: [],
}

const productReducer = (state = productState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.data
                // category: payload.category.name,
                // tags: payload.tags.name
            };
        case GET_TAG_SUCCESS:
            return {
                ...state,
                tags: payload
                // category: payload.category.name,
                // tags: payload.tags.name
            };
        default:
            return state;
    }
}

export default productReducer;