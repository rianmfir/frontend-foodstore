import axios from "axios"
import { CREATE_ORDER, GET_INVOICES } from "./constants";

export const createOrder = (payload) => {
    return async (dispatch) => {

        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
        await axios
            .post('/api/orders', payload,
                {
                    headers:
                    {
                        authorization: `Bearer ${token}`
                    }
                },
            )
            .then(res => {
                dispatch({
                    type: CREATE_ORDER,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}


export const getInvoices = (id) => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    await axios
        .get(`api/invoices/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_INVOICES,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log(err.response);
        })
};