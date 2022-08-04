import axios from 'axios';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { addToCart, removeItem } from '../../app/features/Cart/actions';

const CartItem = () => {
    const baseURL = axios.defaults.baseURL;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();

    const data = JSON.parse(localStorage.getItem('cart'));

    const handlePlus = (item) => {
        console.log("Ditambah");
        console.log("Cart From Basket", item);
        dispatch(addToCart(item))
    };

    const handleMinus = (item) => {
        console.log("Dikurang");
        dispatch(removeItem(item));
    };


    function sumPrice(items) {
        return items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    }

    return (
        <div className='container'>

            {
                cart.length === 0
                    ? <div>
                        Your Cart Is Empty <Link to="/">Go Back</Link>
                    </div>
                    :
                    <>
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
                                    cart.map((item, index) => {
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
                                                    <button onClick={() => handleMinus(item)}>
                                                        -
                                                    </button>
                                                    {/* {' '} <span>{item.quantity}</span> {' '} */}
                                                    {' '} <span>{item.qty}</span> {' '}
                                                    <button onClick={() => handlePlus(item)}>
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
                        </table>
                        <div>
                            <div className='d-flex col-md-6 ms-auto'>
                                <div className='ms-auto'>
                                    <h3>Sub Total : Rp {sumPrice(data)}</h3>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='ms-auto'>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => navigate('/cart/checkout')}>
                                        Checkout <BsArrowRight size={'1.5em'} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </>


            }

        </div >
    )
}

export default CartItem;
