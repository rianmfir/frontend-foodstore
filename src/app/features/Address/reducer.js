import {
    CLEAR_ITEM,
    CREATE_ADDRESS,
    DELETE_ADDRESS,
    ERROR,
    GET_ADDRESS,
    GET_KECAMATAN,
    GET_KELURAHAN,
    GET_KABUPATEN,
    GET_PROVINSI,
    LOADING, SUCCESS,
    UPDATE_ADDRESS,
    SET_FORM_ADDRESS
} from "./constants";

const productState = {
    data: '',
    address: [],
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
    loading: false,
    error: false,
    form:
    {
        nama: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
        detail: ""
    }
}

const addressReducer = (state = productState, { type, payload, formValue, formData }) => {
    switch (type) {
        case SET_FORM_ADDRESS:
            return {
                ...state,
                form: {
                    ...state.form,
                    [formValue]: formData,
                },
            };
        case CREATE_ADDRESS:
            return {
                ...state,
                data: payload,
            };
        case UPDATE_ADDRESS:
            return {
                ...state,
                data: payload,
            };
        case GET_ADDRESS:
            return {
                ...state,
                address: payload,
            };
        case GET_PROVINSI:
            return {
                ...state,
                provinsi: payload
            };
        case GET_KABUPATEN:
            return {
                ...state,
                kabupaten: payload
            };
        case GET_KECAMATAN:
            return {
                ...state,
                kecamatan: payload
            };
        case GET_KELURAHAN:
            return {
                ...state,
                kelurahan: payload
            };
        case DELETE_ADDRESS:
            return {
                ...state,
                data: payload
            };
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            };
        case SUCCESS:
            return {
                ...state,
                loading: false
            };
        case ERROR:
            return {
                ...state,
                error: true,
                data: payload
            };
        case CLEAR_ITEM:
            return {
                ...state,
                data: "",
                kabupaten: [],
                kecamatan: [],
                kelurahan: [],
                form:
                {
                    nama: "",
                    provinsi: "",
                    kabupaten: "",
                    kecamatan: "",
                    kelurahan: "",
                    detail: ""
                },
                loading: false,
                error: false
            }
        default:
            return state;
    }
}

export default addressReducer;