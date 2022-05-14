import axios from "axios";
import { useNavigate } from "react-router-dom";
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

    return async (dispatch) => {
        await axios.post('/auth/login', user)
            .then(res => {
                let { data } = res;
                localStorage.setItem('auth', JSON.stringify(data));
                dispatch({
                    // type: data.error ? LOGIN_FAIL : LOGIN_SUCCESS,
                    type: LOGIN_SUCCESS,
                    payload: data

                })
            })
            .catch(err => {
                // const message =
                // (
                // err.response &&
                // err.response.data &&
                // err.response.data.message) ||
                // err
                // err.toString();
                // )
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err,
                });

                // console.log(err.message);
                // dispatch({
                //     type: LOGIN_FAIL,
                //     payload: err
                // })
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
                let { data } = res;
                if (data.error === 0) {
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        payload: data.message
                    })
                }
                console.log(data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export { userRegister, userLogin, userLogout };