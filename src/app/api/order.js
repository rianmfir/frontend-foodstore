import axios from "axios"

export const createOrder = async (payload) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios
        .post('/api/orders', payload,
            {
                headers:
                {
                    authorization: `Bearer ${token}`
                }
            },
        )
}
