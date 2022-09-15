import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    GET_USERS,
    SET_TITLE_DASHBOARD,
    SET_PAGE,
    CLEAR_AUTH,
} from "./constants";

const auth = localStorage.getItem('auth');
const user = JSON.parse(auth);
const initState = auth
    ? { isLoggedIn: true, user, data: [], titleDashboard: '', perPage: 10, totalItems: 0, currentPage: 1 }
    : { isLoggedIn: false, user: null, data: [], titleDashboard: '', perPage: 10, totalItems: 0, currentPage: 1 };

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                data: payload,
                totalItems: payload.count
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
                user: payload,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                data: [],
                user: null,
                titleDashboard: ''
            }
        case SET_TITLE_DASHBOARD:
            return {
                ...state,
                titleDashboard: payload,
            }
        case CLEAR_AUTH:
            return {
                ...state,
                user: null
            }
        case SET_PAGE:
            return {
                ...state,
                currentPage: payload.currentPage
            }
        default:
            return state;
    }
}

export default authReducer;