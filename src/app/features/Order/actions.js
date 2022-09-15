import axios from "axios"
import {
    CLEAR_ORDER,
    CREATE_ORDER,
    GET_INVOICES,
    GET_ORDERS,
    SET_ORDER_ID,
    LOADING,
    GET_TOTAL_SELL,
    SET_PAGE,
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

export const getOrders = () => {

    return async (dispatch, getState) => {
        let { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        let perPage = getState().order.perPage || 10;
        let currentPage = getState().order.currentPage || 1;

        const params = {
            limit: perPage,
            skip: (currentPage * perPage) - perPage,
        }

        await axios
            .get(`api/orders?limit=${params.limit}&skip=${params.skip}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                dispatch({
                    type: GET_ORDERS,
                    payload: res,
                });
            })
            .catch(err => {
                console.log(err.message);
            })
    }
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
            console.log(err.message);
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
            console.log(err.message);
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

export const setPage = (page = 1) => ({
    type: SET_PAGE,
    payload: {
        currentPage: page
    }
})