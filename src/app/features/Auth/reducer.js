import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    GET_USERS,
    SET_TITLE_DASHBOARD,
} from "./constants";

const auth = localStorage.getItem('auth');
const user = JSON.parse(auth);
const initState = auth
    ? { isLoggedIn: true, user, data: [], titleDashboard: '' }
    : { isLoggedIn: false, user: null, data: [], titleDashboard: '' };

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                data: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: payload,
                isLoggedIn: true,
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: payload,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                // isLoggedIn: false,
                message: payload
            }
        case SET_TITLE_DASHBOARD:
            return {
                ...state,
                titleDashboard: payload,
            }
        default:
            return state;
    }
}

export default authReducer;