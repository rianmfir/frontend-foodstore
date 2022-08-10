import axios from "axios"
import {
    GET_PRODUCT,
    GET_TAGS,
    GET_CATEGORIES,
    SET_PAGE,
    SET_CATEGORY,
    SET_TAG,
    SET_KEYWORD
} from "./constants";

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