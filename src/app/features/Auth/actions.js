import axios from "axios";
import {
    CLEAR_AUTH,
    GET_USERS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_PAGE,
    SET_TITLE_DASHBOARD
} from "./constants";

const userRegister = (user) => {

    return async (dispatch) => {
        dispatch({
            type: CLEAR_AUTH
        })
        await axios.post('/auth/register', user)
            .then(res => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err.message);
                dispatch({
                    type: REGISTER_FAIL,
                    payload: {}
                })

            })
    }
}

const userLogin = (user) => {
    return (dispatch) => {
        axios.post('/auth/login', user)
            .then(res => {
                let { data } = res;

                if (data.error) {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: data
                    })
                    localStorage.setItem('auth', JSON.stringify(data));
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

const userLogout = () => {
    return async (dispatch) => {
        let { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};
        await axios
            .post('auth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                localStorage.removeItem('auth');
                localStorage.removeItem('cart');
                let { data } = res;
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: data.message
                })

            })
            .catch(err => {
                console.log(err.message);
            })
    }
}

const getUsers = () => {
    return async (dispatch, getState) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        let perPage = getState().auth.perPage || 10;
        let currentPage = getState().auth.currentPage || 1;

        const params = {
            limit: perPage,
            skip: (currentPage * perPage) - perPage,
        }

        await axios.get(`auth/users?limit=${params.limit}&skip=${params.skip}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                const { data } = res;
                dispatch({
                    type: GET_USERS,
                    payload: data
                });
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export const setTitleDashboard = (title) => ({
    type: SET_TITLE_DASHBOARD,
    payload: title
})

export const setPage = (page = 1) => ({
    type: SET_PAGE,
    payload: {
        currentPage: page
    }
})

export {
    getUsers,
    userLogin,
    userLogout,
    userRegister,
};