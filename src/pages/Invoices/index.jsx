import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { CgArrowLongLeftR } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvoices, getOrders, setOrderId } from '../../app/features/Order/actions';
import { owner } from '../../assets/owner';
import { Button, Gap } from '../../components';
import { formatRupiah, sumPrice } from '../../utils';

const Invoices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, invoices, id, loading } = useSelector(state => state.order);

    const [invoice, setInvoice] = useState([]);
    const orderId = id === "" ? data?._id : id;

    console.log("Data : ", data)
    console.log("Invoices : ", invoices)
    console.log("ID : ", orderId);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])

    const invoiceDate = () => {
        let date = new Date(invoices?.createdAt);
        return (`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`)
    }
    // console.log("InvoiceDate", invoiceDate());

    const invoiceAddress = () => {
        return (
            `${invoices.delivery_address?.detail}, ${invoices.delivery_address?.kelurahan}, ${invoices.delivery_address?.kecamatan},${invoices.delivery_address?.kabupaten}, ${invoices.delivery_address?.provinsi}`
        )
    }

    const invoiceData = useCallback((data) => {
        return [
            { label: 'No. Invoice', value: `INV/${invoiceDate()}/FSEDW/${invoices?.order?.order_number}` },
            { label: 'Status', value: invoices?.payment_status },
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
                    <strong>{data?.user?.name}</strong>
                    <Gap height={1} />
                    {data?.user?.email}
                    <Gap height={5} />
                    {invoiceAddress()}
                    <Gap height={5} />
                </div>
            },
            {
                label: 'Produk',
                value:
                    <div className='gap-5'>
                        <Gap height={5} />
                        {
                            data.order?.order_items.map((e, index) => {
                                return (
                                    <div key={index}>
                                        <span>{e.name} ({e.qty} x {formatRupiah(e.price)})</span>
                                        <Gap height={1} />
                                    </div>
                                )
                            })
                        }


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
                    <span className='fs-5'>Total Harga</span>
                    <Gap height={10} />
                </div>,
                value:
                    <div>
                        <div style={{ borderBottom: '1.5px dashed' }}>
                            <Gap height={10} />
                            <span>{formatRupiah(data.sub_total)}</span>
                            <Gap height={5} />
                            <span>{formatRupiah(data.delivery_fee)}</span>
                            <Gap height={5} />
                        </div>
                        <span className='fs-5'>{formatRupiah(data.total)}</span>
                        <Gap height={10} />

                    </div >
            },
        ]
    }, [invoiceDate(),
    invoiceAddress(),
    ]);

    useEffect(() => {
        dispatch(getInvoices(orderId));
        setInvoice(invoiceData(invoices));
    }, [dispatch, orderId, invoiceData])


    return (

        <Container className="d-flex justify-content-center">

            {
                loading
                    ?
                    <p>Loading ...</p>
                    :
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
                            {
                                data?._id &&
                                <Button
                                    title={"Selesai"}
                                    onClick={() => navigate("/")}
                                />
                            }

                        </Card.Footer>
                    </Col >

            }

        </Container >
    )
}

export default Invoices;