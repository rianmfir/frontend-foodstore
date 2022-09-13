import axios from "axios";
import {
    CLEAR_ADDRESS,
    CREATE_ADDRESS,
    DELETE_ADDRESS,
    ERROR,
    GET_ADDRESS,
    GET_KECAMATAN,
    GET_KELURAHAN,
    GET_KABUPATEN,
    GET_PROVINSI,
    LOADING,
    SUCCESS,
    UPDATE_ADDRESS,
    SET_FORM_ADDRESS,
    SET_FORM_DEFAULT
} from "./constants"

export const createAddress = (data) => {

    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios
            .post('/api/delivery-addresses', new URLSearchParams({
                nama: data.nama,
                detail: data.detail,
                provinsi: data.provinsi,
                kabupaten: data.kabupaten,
                kecamatan: data.kecamatan,
                kelurahan: data.kelurahan
            }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: `Bearer ${token}`,
                    },
                })
            .then(res => {
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: CREATE_ADDRESS,
                    payload: res.data
                })
                dispatch({
                    type: SET_FORM_DEFAULT
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err.message
                })
                console.log("ERROR : ", err.message);
            })
    }
}

export const getAddresses = () => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
    dispatch({
        type: LOADING
    })
    await axios
        .get("/api/delivery-addresses", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch({
                type: SUCCESS
            })
            dispatch({
                type: GET_ADDRESS,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log(err.response);
        })
};

export const updateAddress = (id, data) => {

    return async (dispatch) => {
        const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

        await axios
            .put(`/api/delivery-addresses/${id}`, new URLSearchParams({
                nama: data.nama,
                detail: data.detail,
                provinsi: data.provinsi,
                kabupaten: data.kabupaten,
                kecamatan: data.kecamatan,
                kelurahan: data.kelurahan
            }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: `Bearer ${token}`,
                    },
                })
            .then(res => {
                dispatch({
                    type: SUCCESS
                })
                dispatch({
                    type: UPDATE_ADDRESS,
                    payload: res.data
                })
                dispatch({
                    type: CLEAR_ADDRESS
                })
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err.message
                })
                console.log("ERROR : ", err.message);
            })
    }
}

export const getProvinsi = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    await axios
        .get(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then(res => {
            // console.log("Daftar Provinsi : ", res.data)
            dispatch({
                type: GET_PROVINSI,
                payload: res.data
            }
            )
        })
        .catch(err => {
            console.log(err.response);
        })
}

export const getKabupaten = (id) => async (dispatch) => {
    await axios
        .get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`)
        .then(res => {
            // console.log("Daftar Kota/Kabupaten : ", res.data)
            dispatch({
                type: GET_KABUPATEN,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response);
        })
}
export const getKecamatan = (id) => async (dispatch) => {
    await axios
        .get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`)
        .then(res => {
            // console.log("Daftar Kecamatan : ", res.data)
            dispatch({
                type: GET_KECAMATAN,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response);
        })
}

export const getKelurahan = (id) => async (dispatch) => {
    await axios
        .get(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`)
        .then(res => {
            console.log("Daftar Kelurahan : ", res.data)
            dispatch({
                type: GET_KELURAHAN,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response);
        })
}

export const deleteAddress = (id) => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    await axios
        .delete(`/api/delivery-addresses/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log("Data Yang Di Hapus : ", res.data)

            dispatch({
                type: DELETE_ADDRESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response);
        })
};

export const clearItem = () => {
    return {
        type: CLEAR_ADDRESS
    }
}

export const setFormAddress = (formValue, formData) => {

    return {
        type: SET_FORM_ADDRESS,
        formValue,
        formData
    };
};

export const setFormDefault = () => {
    return {
        type: SET_FORM_DEFAULT
    };
};
