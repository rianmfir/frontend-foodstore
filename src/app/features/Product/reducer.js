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
    SET_IMAGE_PREVIEW,
    SET_FORM_PRODUCT,
    CREATE_CATEGORY,
    ERROR,
    SET_FORM_DEFAULT,
    GET_TAGS_BY_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    CREATE_TAG,
    UPDATE_TAG,
    DELETE_TAG,
    DELETE_PRODUCT,
    SET_TITLE,
    UPDATE_PRODUCT,
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
        tags: [],
        image: '',
    },
    imagePreview: '',
    perPage: 12,
    totalItems: 0,
    currentPage: 1,
    category: '',
    tag: '',
    keyword: '',
    loading: false,
    error: false,
    title: '',
}

const productReducer = (state = productState, { type, payload, formValue, formData }) => {
    switch (type) {
        case SET_TITLE:
            return {
                ...state,
                title: payload,
            };
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
                    tags: [],
                    image: '',
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
        case UPDATE_PRODUCT:
            return {
                ...state,
                data: payload
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                data: payload
            };

        case CREATE_CATEGORY:
            return {
                ...state,
                data: payload,
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                data: payload
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                data: payload
            };

        case CREATE_TAG:
            return {
                ...state,
                data: payload,
            };
        case GET_TAGS:
            return {
                ...state,
                tags: payload
            };
        case GET_TAGS_BY_CATEGORY:
            return {
                ...state,
                tags: payload
            };
        case UPDATE_TAG:
            return {
                ...state,
                data: payload
            };
        case DELETE_TAG:
            return {
                ...state,
                data: payload
            };

        case SET_PAGE:
            return {
                ...state,
                currentPage: payload.currentPage
            };
        case SET_CATEGORY:
            return {
                ...state,
                category: payload,
                currentPage: 1,
            };
        case SET_TAG:
            return {
                ...state,
                tag: payload,
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
                loading: false,
                error: false
            };
        case LOADING:
            return {
                ...state,
                // data: '',
                loading: true,
            };
        case ERROR:
            return {
                ...state,
                error: true,
                data: payload
            };
        default:
            return state;
    }
}

export default productReducer;