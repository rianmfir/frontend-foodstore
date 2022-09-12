import axios from "axios"
import {
    CLEAR_ORDER,
    CREATE_ORDER,
    GET_INVOICES,
    GET_ORDERS,
    SET_ORDER_ID,
    LOADING,
    GET_TOTAL_SELL
} from "./constants";

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

export const getOrders = () => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    await axios
        .get(`api/orders`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log(err.response);
        })
};

export const getTotalSell = () => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
    await axios
        .get(`/api/sells`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_TOTAL_SELL,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log(err.response);
        })
};
export const getInvoices = (order_id) => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
    dispatch({ type: LOADING })
    await axios
        .get(`api/invoices/${order_id}`, {
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

export const setOrderId = (id) => {
    return {
        type: SET_ORDER_ID,
        payload: id
    }
}

export function clearOrder() {
    return {
        type: CLEAR_ORDER
    }
}