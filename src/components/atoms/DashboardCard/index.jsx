import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { IoFastFoodOutline } from "react-icons/io5";
import { AiOutlineTransaction, AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getOrders } from '../../../app/features/Order/actions';


function DashboardCard({ label, icon, count }) {

    // const totalTransaction = useSelector(state => state.order)
    // const dispatch = useDispatch();

    // console.log('Order : ', totalTransaction)

    // useEffect(() => {
    //     dispatch(getOrders())
    // }, []);

    return (
        // <Row>
        <Col md={4} className='mb-5'>
            <Card style={{
                borderRadius: '50px',
                background: 'white',
                boxShadow: '6px 6px 12px #c89e92, -6px -6px 12px #fffffc',
                // width: '15rem'
            }}>
                <Card.Body>
                    <Row className="px-3 gap-2">
                        <div className='justify-content-start'>
                            {/* <IoFastFoodOutline size='5em' color='#FF7C57' /> */}
                            {icon}
                        </div>
                        <span style={{ fontSize: '16px' }} className='color-secondary '>Total {label}</span>
                        <span style={{ fontSize: '24px' }} className='fw-500 .color-primary '>{count}</span>
                    </Row>
                </Card.Body>
            </Card >
        </Col>

        // </Row>
    )
}

export default DashboardCard;
