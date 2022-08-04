import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../app/api/order';
import { getAddresses } from '../../app/features/Address/actions';
import { clearItem } from '../../app/features/Cart/actions';

const Checkout = () => {
    const dispatch = useDispatch();

    const address = useSelector(state => state.address.data);
    const cart = useSelector(state => state.cart);
    const [fee, setFee] = useState(15000);

    const [selectedAddress, setSelectedAddress] = useState("");
    const [notSelect, setNotSelect] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    function sumPrice(items) {
        return items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    }

    useEffect(() => {
        dispatch(getAddresses())

    }, [dispatch])

    const handleAddress = row => {
        // console.log('Selected Address :', selectedAddress._id);

        if (row.selectedCount > 0) {
            setSelectedAddress(row.selectedRows[0]);
            setNotSelect(false);
        } else {
            setNotSelect(true);
        }

    }

    const handleSubmit = () => {
        let payload = {
            delivery_address: selectedAddress._id,
            delivery_fee: fee,
        }
        createOrder(payload);
        dispatch(clearItem());
        console.log("Sukses");
    }

    function sumPrice(items) {
        return items.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    }

    return (
        <section className="">
            <div className="container">
                <div className="row">
                    {
                        isLoading ? 'Loading . . . .'
                            :
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-12">
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
                                                title="Pilih Alamat Pengiriman"
                                            />




                                            {/* <Form>
                                                {address.map((data, index) => (
                                                    <div key={index} className="mb-3">
                                                        <Form.Check
                                                            inline
                                                            label={data.nama}
                                                            name="group1"
                                                            type={'radio'}
                                                            // id={`inline-radio-1`}
                                                            value={data}
                                                        />
                                                    </div>
                                                ))}
                                            </Form> */}
                                        </>
                                    </div>
                                </div>
                            </div>
                    }

                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div
                                    className="card rounded-2"
                                    style={{ background: '#f3f3f3' }}
                                >

                                    <div>
                                        <ul type="none" className='container'>

                                            <li className="d-flex mt-3">
                                                <p>ID Transaction </p>
                                                <p className='ms-auto'>SH12000%</p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>Subtotal</p>
                                                <p className='ms-auto fw-bolder'>Rp.{sumPrice(cart)}</p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>Ongkos Kirim</p>
                                                <span className='ms-auto fw-bolder'>
                                                    {
                                                        notSelect ? "-" : "Rp.15.000,00"
                                                    }

                                                </span>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>Bank Transfer</p>
                                                <p className='ms-auto fw-bolder'>BRI</p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>No. Rekening</p>
                                                <p className='ms-auto fw-bolder'>1122333445342</p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>Nama Penerima</p>
                                                <p className='ms-auto fw-bolder'>Wahyudi</p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <li className="d-flex">
                                                <p>Total</p>
                                                <p className='ms-auto fw-bolder'>
                                                    sum
                                                </p>
                                            </li>
                                            <hr style={{ color: 'green' }} className='mt-0' />

                                            <Button
                                                className="btn text-light"
                                                variant="warning"
                                                style={{ background: 'orange', width: '100%' }}
                                                disabled={notSelect}
                                                onClick={handleSubmit}
                                            >
                                                <span style={{ color: 'white' }}>
                                                    PAY
                                                </span>
                                            </Button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Checkout;
