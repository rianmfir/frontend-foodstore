import React from 'react'
import { DashboardCard } from '../atoms';
import { Card, Col, Row } from 'react-bootstrap';
import { IoFastFoodOutline } from "react-icons/io5";
import { AiOutlineTransaction, AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { formatRupiah } from '../../utils';
import { useEffect } from 'react';
import { getUsers } from '../../app/features/Auth/actions';

const Dashboards = () => {

    const users = useSelector(state => state.auth.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const adminDashboard =
        [
            {
                label: 'Products',
                count: users.count,
                icon: <IoFastFoodOutline size='5em' color='#FF7C57' />
            },
            {
                label: 'Users',
                count: users.count,
                icon: <AiOutlineUser size='5em' color='#FF7C57' />
            },
            {
                label: 'Sells',
                count: formatRupiah(users.count),
                icon: <AiOutlineTransaction size='5em' color='#FF7C57' />
            }
        ]

    return (
        // <div>
        //     <h4>
        //         Dashboard
        //     </h4>
        //     <DashboardCard />
        // </div>
        <Row>
            <h4>
                Dashboard
            </h4>
            <Col md={4} className='mb-5'>
                <Card style={{
                    borderRadius: '50px',
                    background: 'white',
                    boxShadow: '6px 6px 12px #c89e92, -6px -6px 12px #fffffc',
                    width: '15rem'
                }}>
                    <Card.Body>
                        <Row className="px-3 gap-2">
                            <div className='justify-content-start'>
                                <IoFastFoodOutline size='5em' color='#FF7C57' />
                            </div>
                            <span style={{ fontSize: '16px' }} className='color-secondary '>Total Products</span>
                            <span style={{ fontSize: '24px' }} className='fw-500 .color-primary '>42</span>
                        </Row>
                    </Card.Body>
                </Card >
            </Col>
            {
                adminDashboard.map((state, index) => {
                    return (
                        <DashboardCard key={index} label={state.label} icon={state.icon} count={state.count} />
                    )
                })
            }
        </Row>
    )
}

export default Dashboards;