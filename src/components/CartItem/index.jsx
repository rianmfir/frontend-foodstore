import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItem, removeItem, } from '../../app/features/Cart/actions';

const CartItem = () => {
    const baseURL = axios.defaults.baseURL;
    const dispatch = useDispatch();
    let data = useSelector((state) => state.cart);
    console.log("Ini Data Cart : ", data);

    const [count, setCount] = useState(1);

    const handlePlus = () => {
        // e.preventDefault();
        // dispatch(addToCart({ product: data.product, qty: data.qty + 1 }));
        // setCount(data.qty);
        console.log("Ditambah");
    };

    const handleMinus = () => {
        // e.preventDefault();
        // dispatch(addToCart({ product: data.product, qty: data.qty - 1 }));
        // setCount(data.qty);
        console.log("Dikurang");

    };

    // useEffect(() => {
    //     dispatch(getCartItem())
    // }, [dispatch])

    // let cart = useSelector((state) => state.cart);

    // console.log("Cart Data : ", cart)


    function sumPrice(items) {
        return items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    }

    return (
        <div className='container'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quality</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className="card" style={{ width: "5rem" }}>
                                            <img src={`${baseURL}images/products/${item.image}`} className="card-img-top" alt="..." />
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={handleMinus}>
                                            -
                                        </button>
                                        {' '} <span>{item.quantity}</span> {' '}
                                        <button onClick={handlePlus}>
                                            +
                                        </button>
                                    </td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>

                            )
                        })
                    }
                </tbody>
                <>
                    <tr className='mx-auto'>
                        <td>
                            <h6 className='text-center'>Total</h6>
                        </td>
                        <td>
                            <h6 className='text-center'>
                                {sumPrice(data)}
                            </h6>
                        </td>
                    </tr>
                </>
            </table>
        </div >
    )
}

export default CartItem;
