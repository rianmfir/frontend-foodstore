import axios from 'axios';
import React from 'react'
import { Button, Container, Image } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { BsArrowRight } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { addToCart, removeItem } from '../../app/features/Cart/actions';
import { formatRupiah, sumPrice } from '../../utils';
import { BackPage, Gap, Button as CheckOutButton } from '../atoms';

const CartItem = () => {
    const baseURL = axios.defaults.baseURL;
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlus = (item) => {
        // console.log("Ditambah");
        // console.log("Cart From Basket", item);
        dispatch(addToCart(item))
    };

    const handleMinus = (item) => {
        // console.log("Dikurang");
        dispatch(removeItem(item));
    };

    const columns = [
        {
            name: 'Gambar',
            selector: row => <Image style={{ height: '5rem', width: '5rem' }} src={`${baseURL}images/products/${row.image_url}`} roundedCircle className='my-2' />
        },
        {
            name: 'Produk',
            selector: row => row.name
        },
        {
            name: 'Harga',
            selector: row => formatRupiah(row.price)
        },
        {
            name: 'Quantity',
            cell: row => (<div>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleMinus(row)}
                    className="rounded-circle">
                    <FaMinus />
                </Button>
                <span className="mx-4">{row.qty}</span>
                <Button
                    variant="dark"
                    size="sm"
                    onClick={() => handlePlus(row)}
                    className="rounded-circle">
                    <FaPlus />
                </Button>
            </div>),
            center: true
        },
        {
            name: 'Jumlah',
            selector: row => formatRupiah(row.price * row.qty)
        },
    ]

    return (

        <Container>
            <Gap height={50} />
            {
                cart.length === 0
                    ? <div>

                        <BackPage paragraph={"Keranjang Anda kosong"} title={"Kembali"} to={"/"} />
                    </div>
                    :
                    <>
                        <DataTable
                            title={`Subtotal: ${formatRupiah(sumPrice(cart))}`}
                            columns={columns}
                            data={cart}
                        // grow={100}
                        />
                        <div className="mt-5 float-end">
                            <CheckOutButton
                                onClick={() => navigate('/cart/checkout')}
                                title={"Checkout"}
                                icon={<BsArrowRight size={'1.5em'} />}
                            />
                        </div>
                    </>
            }
        </Container>
    )
}

export default CartItem;
