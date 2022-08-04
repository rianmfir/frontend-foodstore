

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'), { delivery_fee: 15000 })
    : [];

