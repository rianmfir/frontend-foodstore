import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearOrder, getOrders, setOrderId } from '../../../app/features/Order/actions';
import Invoices from '../../../pages/Invoices';
import { formatRupiah, sumPrice, totalItemCart } from '../../../utils';
import { Button } from '../../atoms';
import './userOrder.scss';

const UserOrder = () => {

    const dispatch = useDispatch();

    const { orders, id } = useSelector(state => state.order)

    const [show, setShow] = useState(false);

    const handleShow = (id) => {
        setShow(true);
        dispatch(setOrderId(id));
    }
    const toggleShow = () => {
        setShow(action => !action);
        dispatch(clearOrder());
    }

    console.log(orders);
    console.log("Order ID : ", id)

    useEffect(() => {
        dispatch(getOrders())

    }, [dispatch, id])


    const formatDate = (d) => {
        let date = new Date(d);
        return (`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`)
    }

    const columns = [

        {
            name: <span className='fw-bolder'>Tanggal</span>,
            selector: row => formatDate(row.updatedAt)
        },
        {
            name: <span className='fw-bolder'>Total Item</span>,
            selector: row => totalItemCart(row.order_items)
        },
        {
            name: <span className='fw-bolder'>Total Harga</span>,
            // selector: row => formatRupiah(parseInt(sumPrice(row.order_items) + (row.delivery_fee)))
            selector: row => formatRupiah(parseInt(sumPrice(row.order_items)))

        },
        {
            name: <span className='fw-bolder ms-4'>Invoices</span>,
            selector: row => (<div>
                <Button title={"Detail"} onClick={() => handleShow(row._id)} />
            </div>)

        },

    ]
    console.log("Fee : ", orders.data)
    const ExpandedComponent = ({ data }) =>
        <Row className='justify-content-center gap-1 mt-2'>
            {
                data.order_items.map((e, index) => {
                    return (
                        <Col md={11} className="border-bottom border-warning fs-12 fw-bold" key={index}>
                            <p>{e.name} ( {e.qty} X {formatRupiah(e.price)} )</p>
                        </Col>
                    )
                })
            }
        </Row>


    return (
        <>
            <h3 className="color-primary fw-bold mb-5">My Order</h3>
            <Card>
                <Card.Header>
                </Card.Header>
                <Card.Body>

                    <DataTable
                        columns={columns}
                        data={orders.data}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                    />
                </Card.Body>
            </Card>

            <Modal show={show} size="lg" onHide={toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Invoices />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default UserOrder;