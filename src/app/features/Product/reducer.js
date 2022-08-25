import {
    GET_PRODUCT,
    GET_TAGS,
    GET_CATEGORIES,
    SET_PAGE,
    SET_CATEGORY,
    SET_TAG,
    SET_KEYWORD,
    CREATE_PRODUCT,
    SUCCESS,
    LOADING,
    CLEAR_ITEM,
    SET_IMAGE_PREVIEW,
    SET_FORM_PRODUCT,
    CREATE_CATEGORY,
    ERROR,
    SET_FORM_DEFAULT,
} from "./constants";


const productState = {
    data: '',
    product: [],
    categories: [],
    tags: [],
    form: {
        name: '',
        price: '',
        category: '',
        tags: ''
    },
    imagePreview: '',
    perPage: 8,
    totalItems: 0,
    currentPage: 1,
    category: '',
    tag: '',
    keyword: '',
    loading: false,
    error: false
}

const productReducer = (state = productState, { type, payload, formValue, formData }) => {
    switch (type) {
        case SET_FORM_PRODUCT:
            return {
                ...state,
                form: {
                    ...state.form,
                    [formValue]: formData,
                },
            };
        case SET_IMAGE_PREVIEW:
            return {
                ...state,
                imagePreview: payload,
            };
        case SET_FORM_DEFAULT:
            return {
                ...state,
                form: {
                    name: '',
                    price: '',
                    category: '',
                    tags: []
                },
                imagePreview: '',
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                data: payload,
                error: false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload.data,
                totalItems: payload.count

            };
        case CREATE_CATEGORY:
            return {
                ...state,
                data: payload,
                error: false
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };

        case GET_TAGS:
            return {
                ...state,
                tags: payload
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
        case SUCCESS:
            return {
                ...state,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case ERROR:
            return {
                ...state,
                error: true,
                data: payload
            };

        case CLEAR_ITEM:
            return []
        default:
            return state;
    }
}

export default productReducer;