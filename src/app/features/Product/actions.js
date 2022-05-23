import axios from "axios"
import { GET_PRODUCT_SUCCESS, GET_TAG_SUCCESS } from "./constants";

export const getProducts = () => {
    return async (dispatch) => {
        await axios.get('/api/products')
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
export const getTags = () => {
    return async (dispatch) => {
        await axios.get('/api/tags')
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


