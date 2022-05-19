import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartDBAPI, saveCart } from '../../app/api/cart';

const CartItem = () => {
    const baseURL = axios.defaults.baseURL;
    const dispatch = useDispatch();

    const data = JSON.parse(localStorage.getItem('cart'));

    const handlePlus = () => {
        console.log("Ditambah");
    };

    const handleMinus = () => {
        console.log("Dikurang");
    };


    function sumPrice(items) {
        return items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    }

    // let { token } = localStorage.getItem("auth")
    //     ? JSON.stringify(localStorage.getItem("auth"))
    //     : {}

    // console.log("Token : ", token)
    // useEffect(() => {
    //     dispatch(getCartDBAPI(token));
    // }, [dispatch])

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
                                            {/* <img src={`${baseURL}images/products/${item.image}`} className="card-img-top" alt="..." /> */}
                                            <img src={`${baseURL}images/products/${item.image_url}`} className="card-img-top" alt="..." />
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={handleMinus}>
                                            -
                                        </button>
                                        {/* {' '} <span>{item.quantity}</span> {' '} */}
                                        {' '} <span>{item.qty}</span> {' '}
                                        <button onClick={handlePlus}>
                                            +
                                        </button>
                                    </td>
                                    {/* <td>{item.price * item.quantity}</td> */}
                                    <td>{item.price * item.qty}</td>
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
