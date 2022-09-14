import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses, setFormDefault } from '../../app/features/Address/actions';
import { clearItem } from '../../app/features/Cart/actions';
import { Button as CustomButton, Gap } from '../../components/atoms';
import { formatRupiah, sumPrice } from '../../utils';
import { owner } from '../../assets/owner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createOrder, setOrderId } from '../../app/features/Order/actions';
import { BreadCrumb } from '../../components';
import { FormAddress } from '../../components/User';

const Checkout = () => {
    const dispatch = useDispatch();

    const baseURL = axios.defaults.baseURL;
    const navigate = useNavigate();

    // const { address, data } = useSelector(state => state.address);
    const address = useSelector(state => state.address);
    const { data } = useSelector(state => state.order);
    const cart = useSelector(state => state.cart);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [notSelect, setNotSelect] = useState(true);

    const [select, setSelect] = useState(false);

    const fee = owner.data.ongkir;

    useEffect(() => {
        dispatch(getAddresses())

    }, [dispatch, address.data])

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
        try {
            dispatch(createOrder(payload));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (data?._id) {
            dispatch(setOrderId(data._id));
            navigate(`/invoices`);
            dispatch(clearItem());
        }
    }, [dispatch, navigate, data?._id])


    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(false);
        dispatch(setFormDefault());
    }

    const handleShow = () => {
        setShow(true);
    }


    const breadcrumb = [
        { label: 'Home', path: '/' },
        { label: 'Checkout', path: 'checkout' },
    ];

    return (
        <div>
            <Container >
                <Gap height={30} />
                <Col md={9}>
                    <BreadCrumb items={breadcrumb} />
                </Col>
                <Row>
                    <Col lg="8">
                        <Col md={3} className="ms-auto my-3">
                            {/* <CustomButton onClick={handleShowAdd} title={'Tambah Alamat'} /> */}
                            <CustomButton onClick={handleShow} title={'Tambah Alamat'} />
                        </Col>
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
                                                data={address.address}
                                                onSelectedRowsChange={handleAddress}
                                                selectableRows
                                                selectableRowsSingle={true}
                                                selectableRowsHighlight={true}
                                            />
                                        </>
                                    </Col>
                                </Row>
                                :
                                null
                        }

                        <Gap height={20} />

                        <Row>
                            <Container>
                                <Card className='mb-5'>
                                    <Card.Header className="bg-warning fw-bolder ">Keranjang Belanja</Card.Header>
                                    <Card.Body >
                                        <DataTable
                                            columns={[
                                                {
                                                    name: <span className='mx-auto fw-bolder'>Produk</span>,
                                                    cell: row =>
                                                        <div className="d-flex flex-row py-4">
                                                            <Image
                                                                src={`${baseURL}images/products/${row.image_url}`}
                                                                width="90"
                                                                height="90"
                                                                roundedCircle
                                                                className="border border-grey"
                                                            />
                                                            <Gap width={10} />
                                                            <div className='d-flex flex-column align-item-center justify-content-center mx-auto'>
                                                                <span>{row.name}</span>
                                                                <span>{formatRupiah(row.price)}</span>
                                                            </div>

                                                        </div>
                                                },
                                                {
                                                    name: <span className='mx-auto fw-bolder'>Quantity</span>,
                                                    cell: row =>
                                                        <div className='mx-auto border'>
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

                                            <li className="d-flex justify-content-between">
                                                <p>Nama Penerima</p>
                                                <p className='fw-bolder text-end'>{owner.data.nama}</p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>Total</p>
                                                <p className='ms-auto fw-bolder'>
                                                    {
                                                        selectedAddress
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

                <>
                    <FormAddress show={show} toggleShow={toggleShow} />
                </>

            </Container >
        </div>
    )
}

export default Checkout;
