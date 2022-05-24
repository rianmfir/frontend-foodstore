import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "./constants";

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
    let { token } = JSON.parse(localStorage.getItem("auth"));
    return async (dispatch) => {
        await axios.post('auth/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                localStorage.removeItem('auth');
                localStorage.removeItem('cart');
                let { data } = res;
                if (data.error === 0) {
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        payload: data.message
                    })
                }
                console.log(data);
                window.location.href = "/";


            })
            .catch(err => {
                console.log(err);
            })
    }
}

export { userRegister, userLogin, userLogout };