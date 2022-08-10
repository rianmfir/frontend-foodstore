import {
    GET_PRODUCT,
    GET_TAGS,
    GET_CATEGORIES,
    SET_PAGE,
    SET_CATEGORY,
    SET_TAG,
    SET_KEYWORD
} from "./constants";


const productState = {
    product: [],
    categories: [],
    tags: [],
    perPage: 8,
    totalItems: 0,
    currentPage: 1,
    category: '',
    tag: '',
    keyword: '',
}

const productReducer = (state = productState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT:
            return {
                ...state,
                product: payload.data,

                totalItems: payload.count

            };
        case GET_TAGS:
            return {
                ...state,
                tags: payload
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };

        case SET_PAGE:
            return {
                ...state,
                currentPage: payload.currentPage
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: payload.category,
                currentPage: 1,

            };
        case SET_TAG:
            return {
                ...state,
                tag: payload.tag,
                currentPage: 1,
            };
        case SET_KEYWORD:
            return {
                ...state,
                keyword: payload.keyword,
                currentPage: 1,
            };

        default:
            return state;
    }
}

export default productReducer;