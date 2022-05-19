import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
} from "./constants";

const auth = localStorage.getItem('auth');
const initState = auth
    ? { isLoggedIn: true, user: JSON.stringify(auth) }
    : { isLoggedIn: false, user: null };

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: payload
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
                isLoggedIn: false,
                message: payload
            }
        default:
            return state;
    }
}


// const authReducer = (state = authState, action) => {

//     switch (action.type) {
//         case AuthActionType.REGISTER_SUCCESS:
//             return {
//                 isLoggedIn: true,
//                 user: action.payload,
//                 token: action.token
//             }
//         case AuthActionType.REGISTER_FAIL:
//             return state
//         default:
//             return state;
//     }
// }


export default authReducer;