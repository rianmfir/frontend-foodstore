import axios from "axios";
import { GET_USERS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, SET_TITLE_DASHBOARD } from "./constants";

const userRegister = (user) => {

    return async (dispatch) => {
        await axios.post('/auth/register', user)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err.response);
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
                console.log("Ini Pesan Errornya : ", err)



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
                // if (data.error === 0) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: data.message
                })
                // }
                // window.location.pathname = '/';
                // window.location.replace = '/';
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const getUsers = () => {
    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios.get(`/auth/users`, {
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

export {
    userRegister,
    userLogin,
    userLogout,
    getUsers
};