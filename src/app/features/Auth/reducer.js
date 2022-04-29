import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
} from "./constants";

// let token = JSON.parse(localStorage.getItem("token"));


const authState = {
    isLoggedIn: false,
    user: {}
}

// const authState = token
//     ? { isLoggedIn: true, role: token.user.role, token }
//     : { user: null, token: null, isLoggedIn: false };

const authReducer = (state = authState, { type, payload }) => {
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
                // token: config
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                message: payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                message: payload.message
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