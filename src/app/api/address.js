import axios from "axios"

export const addAddress = async (data) => {
    const { token } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};
    return await axios.post('/api/delivery-address', data, {
        headers:
        {
            authorization: `Bearer ${token}`
        }
    })
}