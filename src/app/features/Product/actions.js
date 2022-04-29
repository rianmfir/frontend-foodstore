import axios from "axios"
import { GET_PRODUCT_SUCCESS, GET_TAG_SUCCESS } from "./constants";

export const getProducts = (product) => {
    return async (dispatch) => {
        await axios.get('/api/products', product)
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: GET_PRODUCT_SUCCESS,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}
export const getTags = (tags) => {
    return async (dispatch) => {
        await axios.get('/api/tags', tags)
            .then(res => {
                let { data } = res
                // console.log(data);
                dispatch({
                    type: GET_TAG_SUCCESS,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}


