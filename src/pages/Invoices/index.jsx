import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { CgArrowLongLeftR } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInvoices } from '../../app/features/Order/actions';
import { owner } from '../../assets/owner';
import { Button, Gap } from '../../components';
import { formatRupiah, sumPrice } from '../../utils';

const Invoices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, invoices } = useSelector(state => state.order);

    const [invoice, setInvoice] = useState([]);

    const invoiceDate = () => {
        let date = new Date(invoices?.createdAt);
        return (`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`)
    }
    console.log("InvoiceDate", invoiceDate());

    const invoiceAddress = () => {
        return (
            `${invoices.delivery_address?.detail}, ${invoices.delivery_address?.kelurahan}, ${invoices.delivery_address?.kecamatan},${invoices.delivery_address?.kabupaten}, ${invoices.delivery_address?.provinsi}`
        )
    }
    console.log("Order : ", data);


    const invoiceData = useCallback((data) => {
        return [
            { label: 'No. Invoice', value: `INV/${invoiceDate()}/FSEDW/${invoices?.order?.order_number}` },
            { label: 'Status', value: invoices.payment_status },
            {
                label: 'Toko', value: <div>
                    <Gap height={5} />
                    <strong>a/n. {owner.data.nama}</strong>
                    <Gap height={1} />
                    {owner.data.bank}
                    <Gap height={1} />
                    {owner.data.noRekening}
                    <Gap height={5} />
                </div>
            },
            {
                label: 'Tagihan kepada', value: <div>
                    <Gap height={5} />
                    <strong>{invoices.user?.name}</strong>
                    <Gap height={1} />
                    {invoices.user?.email}
                    <Gap height={5} />
                    {invoiceAddress()}
                    <Gap height={5} />
                </div>
            },
            {
                label: 'Produk',
                value:
                    <div>
                        <Gap height={5} />

                        {/* {invoiceProduk()} */}
                        <span>Jus Alpukat (2 x Rp 20.000)</span>
                        <Gap height={1} />
                        <span>Jus Alpukat (2 x Rp 20.000)</span>
                        <Gap height={1} />
                        <span>Jus Alpukat (2 x Rp 20.000)</span>
                        <Gap height={1} />

                        <Gap height={5} />
                    </div>
            },
            {
                label: <div>
                    <div >
                        <Gap height={10} />
                        <span>Subtotal</span>
                        <Gap height={5} />
                        <span>Ongkos Kirim</span>
                        <Gap height={5} />
                    </div>
                    <span className='fs-5'>Total Amount</span>
                    <Gap height={10} />
                </div>,
                value:
                    <div>
                        <div style={{ borderBottom: '1.5px dashed' }}>
                            <Gap height={10} />



                            <span>{formatRupiah(invoices.sub_total)}</span>
                            <Gap height={5} />
                            <span>{formatRupiah(invoices.delivery_fee)}</span>
                            <Gap height={5} />
                        </div>
                        <span className='fs-5'>{formatRupiah(invoices.total)}</span>
                        <Gap height={10} />

                    </div >
            },
        ]
    }, [invoiceDate(),
    invoiceAddress(),
    ]);

    useEffect(() => {
        dispatch(getInvoices(data?._id));
        setInvoice(invoiceData);

    }, [dispatch, data?._id, invoiceData])

    console.log("Invoices : ", invoices);

    return (

        <Container className="d-flex justify-content-center">
            <Col sm={12} md={8} className="pt-5 ">
                <Card>
                    <Card.Header className="text-center" >
                        <strong >
                            Invoices
                        </strong>
                    </Card.Header>
                    <Card.Body>
                        <DataTable
                            className='text-center'
                            data={invoice}
                            columns={[
                                { selector: row => row.label },
                                { cell: row => row.value }
                            ]}
                        />
                    </Card.Body>
                </Card >
                <Card.Footer>
                    <Button
                        title={"Selesai"}
                        onClick={() => navigate("/")}
                    />
                </Card.Footer>
            </Col >
        </Container >
        // <div className="text-center">
        //     <p>Ini Id Ordernya</p>
        //     <h2>{invoices?.order?.order_number}</h2>
        // </div>

    )
}

export default Invoices;