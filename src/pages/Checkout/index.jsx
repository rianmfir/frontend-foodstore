import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, Image, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses } from '../../app/features/Address/actions';
import { clearItem } from '../../app/features/Cart/actions';
import AddAddress from '../../components/AddAddress';
import { Gap } from '../../components/atoms';
import { formatRupiah, sumPrice } from '../../utils';
import { dummyImage } from '../../assets/images'
import { owner } from '../../assets/owner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { createOrder } from '../../app/api/order';
import { createOrder } from '../../app/features/Order/actions';

const Checkout = () => {
    const dispatch = useDispatch();

    const baseURL = axios.defaults.baseURL;
    const navigate = useNavigate();

    const address = useSelector(state => state.address.data);
    const cart = useSelector(state => state.cart);
    const order = useSelector(state => state.order);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [notSelect, setNotSelect] = useState(true);

    const [select, setSelect] = useState(false);

    const fee = owner.data.ongkir;


    useEffect(() => {
        dispatch(getAddresses())

    }, [dispatch])

    const handleAddress = row => {
        if (row.selectedCount > 0) {
            setSelectedAddress(row.selectedRows[0]);
            setNotSelect(!notSelect);
            setSelect(!select);
        } else {
            setNotSelect(true);
        }
    }

    const addressMenu = () => {
        setSelect(!select);
    }

    const handleSubmit = () => {
        let payload = {
            delivery_address: selectedAddress._id,
            delivery_fee: owner.data.ongkir
        }
        if (!order.data?.error) {
            dispatch(createOrder(payload));
            navigate(`/invoices`)
            dispatch(clearItem());
        }

    }

    let a = sumPrice(cart);
    let b = owner.data.ongkir;
    console.log("Total : ", (parseInt(a) + parseInt(b)));
    console.log(b);
    // console.log('Address : ', selectedAddress);
    // console.log('Select : ', select);

    // console.log("Data Owner : ", owner)
    // console.log("Order : ", order)

    return (

        <Container>
            <Row>
                <Col lg="8">
                    <Row className="shadow-lg p-3 mb-4 bg-body rounded">
                        <Col style={{ cursor: "pointer" }} onClick={addressMenu}>
                            {
                                selectedAddress
                                    ?
                                    <span>{`${selectedAddress.nama}, ${selectedAddress.detail}, ${selectedAddress.kelurahan}, ${selectedAddress.kecamatan}, ${selectedAddress.kabupaten}, ${selectedAddress.provinsi}`}</span>
                                    :
                                    <span >Pilih Alamat Pengiriman</span>
                            }

                        </Col>
                    </Row>
                    {
                        select
                            ?
                            <Row as={Card} style={{ zIndex: "1", position: "absolute" }}>
                                <Col lg="12">
                                    <>
                                        <DataTable
                                            columns={[
                                                {
                                                    name: 'Nama',
                                                    selector: row => row.nama
                                                },
                                                {
                                                    name: 'Detail',
                                                    cell: row => `${row.detail}, ${row.kelurahan}, ${row.kecamatan}, ${row.kabupaten}, ${row.provinsi}`
                                                }
                                            ]}
                                            data={address}
                                            onSelectedRowsChange={handleAddress}
                                            selectableRows
                                            selectableRowsSingle={true}
                                            selectableRowsHighlight={true}
                                        />
                                    </>
                                </Col>
                            </Row>
                            :
                            ""
                    }

                    <Gap height={20} />
                    <Row>
                        <Container>
                            <Card >
                                <Card.Header className="bg-warning fw-bolder ">Keranjang Belanja</Card.Header>
                                <Card.Body >
                                    <DataTable
                                        columns={[
                                            {
                                                name: <span className='mx-auto fw-bolder'>Produk</span>,
                                                cell: row =>
                                                    <div className="d-flex flex-wrap py-3 mx-auto">
                                                        <Image
                                                            src={`${baseURL}images/products/${row.image_url}`} rounded
                                                            width="90"
                                                            height="90"
                                                            roundedCircle
                                                        />
                                                        <Gap width={10} />
                                                        <div className='d-flex flex-column align-item-center justify-content-center '>
                                                            <span className=''>{row.name}</span>
                                                            <span className=''>{formatRupiah(row.price)}</span>
                                                        </div>

                                                    </div>
                                            },
                                            {
                                                name: <span className='mx-auto fw-bolder'>Quantity</span>,
                                                cell: row =>
                                                    <div className='mx-auto'>
                                                        {row.qty}
                                                    </div>
                                            },
                                            {
                                                name: <span className='mx-auto fw-bolder'>Subtotal</span>,
                                                cell: row =>
                                                    <div className='mx-auto'>
                                                        {formatRupiah(row.qty * row.price)}
                                                    </div>
                                            },

                                        ]}
                                        data={cart}
                                        center='true'
                                    />

                                </Card.Body>
                            </Card>
                        </Container>
                    </Row>

                </Col>

                <Col lg="4">
                    <Row>
                        <Col lg="12">
                            <Card
                                className='rounded'
                                style={{ background: '#f3f3f3' }} >
                                <div>
                                    <ul type="none" className='container'>
                                        <li className="d-flex pt-3">
                                            <p>Subtotal</p>
                                            <p className='ms-auto fw-bolder'>{formatRupiah(sumPrice(cart))}</p>
                                        </li>
                                        <hr style={{ color: 'green' }} className='mt-0' />

                                        <li className="d-flex">
                                            <p>Ongkos Kirim</p>
                                            <span className='ms-auto fw-bolder'>
                                                {
                                                    selectedAddress ? formatRupiah(fee) : "-"
                                                }
                                            </span>
                                        </li>
                                        <hr style={{ color: 'green' }} className='mt-0' />

                                        <li className="d-flex">
                                            <p>Bank Transfer</p>
                                            <p className='ms-auto fw-bolder'>{owner.data.bank}</p>
                                        </li>
                                        <hr style={{ color: 'green' }} className='mt-0' />

                                        <li className="d-flex">
                                            <p>No. Rekening</p>
                                            <p className='ms-auto fw-bolder'>{owner.data.noRekening}</p>
                                        </li>
                                        <hr style={{ color: 'green' }} className='mt-0' />

                                        <li className="d-flex">
                                            <p>Nama Penerima</p>
                                            <p className='ms-auto fw-bolder'>{owner.data.nama}</p>
                                        </li>
                                        <hr style={{ color: 'green' }} className='mt-0' />

                                        <li className="d-flex">
                                            <p>Total</p>
                                            <p className='ms-auto fw-bolder'>
                                                {
                                                    selectedAddress
                                                        // ? formatRupiah(sumPrice(cart) + parseInt(owner.data.ongkir))
                                                        ? formatRupiah(parseInt(sumPrice(cart) + (owner.data.ongkir)))
                                                        : "-"
                                                }
                                            </p>

                                        </li>
                                        <hr style={{ color: 'green' }} className='mt-0' />

                                        <Button
                                            className="btn text-light rounded-pill"
                                            variant="warning"
                                            style={{ background: 'orange', width: '100%' }}
                                            disabled={!selectedAddress}
                                            onClick={handleSubmit}
                                        >
                                            <span style={{ color: 'white' }}>
                                                Bayar Sekarang
                                            </span>
                                        </Button>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default Checkout;
