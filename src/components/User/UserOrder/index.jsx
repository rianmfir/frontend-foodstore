import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setTitleDashboard } from '../../../app/features/Auth/actions';
import { clearOrder, getOrders, setOrderId, setPage } from '../../../app/features/Order/actions';
import Invoices from '../../../pages/Invoices';
import { formatRupiah, sumPrice, totalItemCart } from '../../../utils';
import { Button } from '../../atoms';
import Paginate from '../../Paginate';
import './userOrder.scss';

const UserOrder = () => {

    const dispatch = useDispatch();

    const { orders, id, perPage, totalItems, currentPage } = useSelector(state => state.order)

    const [show, setShow] = useState(false);

    const handleShow = (id) => {
        setShow(true);
        dispatch(setOrderId(id));
    }
    const toggleShow = () => {
        setShow(action => !action);
        dispatch(clearOrder());
    }

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch, id, currentPage])

    useEffect(() => {
        dispatch(setTitleDashboard('Orders'));
    }, [dispatch])


    const formatDate = (d) => {
        let date = new Date(d);
        return (`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`)
    }

    const columns = [

        {
            name: <span className='fw-bolder'>No</span>,
            selector: (row, index) => (perPage * (currentPage - 1)) + index + 1
        },
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
            selector: row => formatRupiah(parseInt(sumPrice(row.order_items)))

        },
        {
            name: <span className='fw-bolder ms-4'>Invoices</span>,
            selector: row => (<div>
                <Button title={"Detail"} onClick={() => handleShow(row._id)} />
            </div>)

        },

    ]

    const ExpandedComponent = ({ data }) =>
        <Row className='justify-content-center gap-1 mt-2'>
            {
                data.order_items.map((e, index) => {
                    return (
                        <Col md={11} className="border-bottom border-warning fs-12" key={index}>
                            <p>{e.name} ( {e.qty} X {formatRupiah(e.price)} )</p>
                        </Col>
                    )
                })
            }
        </Row>


    return (
        <>
            <Card>
                <Card.Body>
                    <DataTable
                        columns={columns}
                        data={orders.data}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                    />
                    <Row>
                        <div className='d-flex justify-content-center my-5'>
                            <Paginate
                                activePage={currentPage}
                                total={Math.ceil(totalItems / perPage)}
                                onPageChange={(page) => dispatch(setPage(page))}
                            />
                        </div>
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={show} size="lg" onHide={toggleShow} style={{ maxHeight: '80vh' }} >
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