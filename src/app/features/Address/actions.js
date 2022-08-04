import axios from "axios";
import { GET_ADDRESS } from "./constants"

export const getAddresses = () => async (dispatch) => {
    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    await axios
        .get("api/delivery-addresses", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_ADDRESS,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log(err.response);
        })
};