import axios from "axios"
import {
    GET_PRODUCT,
    GET_TAGS,
    GET_CATEGORIES,
    SET_PAGE,
    SET_CATEGORY,
    SET_TAG,
    SET_KEYWORD,
    CREATE_PRODUCT,
    LOADING,
    SUCCESS,
    SET_FORM_PRODUCT,
    SET_IMAGE_PREVIEW,
    CREATE_CATEGORY,
    ERROR,
    SET_FORM_DEFAULT,
    GET_TAGS_BY_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    CREATE_TAG,
    DELETE_TAG,
    UPDATE_TAG,
    DELETE_PRODUCT,
    TITLE,
    SET_TITLE,
    UPDATE_PRODUCT
} from "./constants";

export const createProduct = (data) => {

    let payload = new FormData();
    payload.append("name", data.name);
    payload.append("price", data.price);
    payload.append("category", data.category);
    // payload.append("tags", data.tags.value);
    for (let i = 0; i < data.tags.length; i++) {
        payload.append("tags", data.tags[i].value);
    }
    payload.append("image", data.image);



    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        // dispatch({
        //     type: LOADING
        // })
        await axios
            .post('/api/products', payload, {
                headers: {
                    "content-type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                const { data } = res;
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: CREATE_PRODUCT,
                    payload: data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })

            })
            .catch(err => {
                dispatch({
                    type: ERROR
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
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

        dispatch({ type: LOADING })

        await axios.get('/api/products', { params })
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: SUCCESS
                })
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
export const deleteProduct = (id) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios.delete(`/api/products/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                let { data } = res
                console.log(data);
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: data
                });
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}
export const updateProduct = (id, data) => {

    let payload = new FormData();
    payload.append("name", data.name);
    payload.append("price", data.price);
    payload.append("category", data.category);
    for (let i = 0; i < data.tags.length; i++) {
        payload.append("tags", data.tags[i].value);
    }
    payload.append("image", data.image);

    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios
            .put(`/api/products/${id}`, payload, {
                headers: {
                    "content-type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                const { data } = res;
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })

            })
            .catch(err => {
                dispatch({
                    type: ERROR
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
                console.log(err.message);
            })
    }
}

export const createCategory = (data) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        dispatch({
            type: LOADING
        })
        await axios
            .post('/api/categories', new URLSearchParams({ name: data }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: `Bearer ${token}`,
                    },
                })
            .then(res => {
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: CREATE_CATEGORY,
                    payload: res.data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR
                })
                console.log(err.message);
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
export const updateCategory = (id, data) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        dispatch({
            type: LOADING
        })

        const payload = new URLSearchParams();
        payload.append('name', data);

        await axios
            .put(`/api/categories/${id}`, payload,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: `Bearer ${token}`,
                    },
                })
            .then(res => {
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: UPDATE_CATEGORY,
                    payload: res.data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR
                })
                console.log(err.message);
            })
    }
}
export const deleteCategory = (id) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios.delete(`/api/categories/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                let { data } = res
                console.log(data);
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: data
                });
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}

export const createTag = (data) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        dispatch({
            type: LOADING
        })
        await axios
            .post('/api/tags', new URLSearchParams({ name: data }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: `Bearer ${token}`,
                    },
                })
            .then(res => {
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: CREATE_TAG,
                    payload: res.data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR
                })
                console.log(err.message);
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
export const getTagsByCategory = (category) => {

    return async (dispatch) => {

        await axios.get(`/api/tags/${category}`)
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: GET_TAGS_BY_CATEGORY,
                    payload: data
                })
                // dispatch({
                //     type: SUCCESS,
                // })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}
export const updateTag = (id, data) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        dispatch({
            type: LOADING
        })

        const payload = new URLSearchParams();
        payload.append('name', data);

        await axios
            .put(`/api/tags/${id}`, payload,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: `Bearer ${token}`,
                    },
                })
            .then(res => {
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: UPDATE_TAG,
                    payload: res.data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR
                })
                console.log(err.message);
            })
    }
}
export const deleteTag = (id) => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios.delete(`/api/tags/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                let { data } = res
                console.log(data);
                dispatch({
                    type: DELETE_TAG,
                    payload: data
                });
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
    payload: category,
})

export const setTag = (tag) => ({
    type: SET_TAG,
    payload: tag
})

export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: {
        keyword: keyword
    }
})

export const loading = () => ({
    type: LOADING
})

export const success = () => ({
    type: SUCCESS
})

export const setFormDefault = () => {
    return {
        type: SET_FORM_DEFAULT
    };
};

export const setForm = (formValue, formData) => {
    return {
        type: SET_FORM_PRODUCT,
        formValue,
        formData
    };
};

export const setImagePreview = (image) => ({
    type: SET_IMAGE_PREVIEW,
    payload: image
})

export const setTitle = (title) => ({
    type: SET_TITLE,
    payload: title
})
