import axios from "axios"
import {
    GET_PRODUCT,
    GET_TAGS,
    GET_CATEGORIES,
    SET_PAGE,
    SET_CATEGORY,
    SET_TAG,
    SET_KEYWORD,
    CREATE_PRODUCT
} from "./constants";

export const createProduct = (data) => {

    let payload = new FormData();
    payload.append("name", data.name);
    payload.append("price", data.price);
    payload.append("category", data.category);
    payload.append("tags", data.tags);
    payload.append("image", data.image);
    // for (let i = 0; i < form.tags.length; i++) {
    //   data.append("tags", form.tags[i]);
    // }

    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        await axios
            .post('/api/products', payload, {
                headers: {
                    "content-type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                dispatch({
                    type: CREATE_PRODUCT,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}

export const getProducts = () => {

    return async (dispatch, getState) => {

        let perPage = getState().products.perPage || 8;
        let currentPage = getState().products.currentPage || 1;
        let category = getState().products.category || '';
        let tags = getState().products.tag || '';
        let keyword = getState().products.keyword || '';

        const params = {
            limit: perPage,
            skip: (currentPage * perPage) - perPage,
            category: category,
            tags: tags,
            q: keyword
        }

        await axios.get('/api/products', { params })
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: GET_PRODUCT,
                    payload: data
                    // payload: data.sort((a, b) => a.name.localeCompare(b.name))
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}
export const getTags = () => {
    return async (dispatch) => {
        await axios.get('/api/tags')
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: GET_TAGS,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        await axios.get('/api/categories')
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: GET_CATEGORIES,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const setPage = (page = 1) => ({
    type: SET_PAGE,
    payload: {
        currentPage: page
    }
})

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: {
        category: category
    }
})

export const setTag = (tag) => ({
    type: SET_TAG,
    payload: {
        tag: tag
    }
})

export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: {
        keyword: keyword
    }
})

