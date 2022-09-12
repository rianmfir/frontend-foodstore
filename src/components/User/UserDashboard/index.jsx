import React from 'react'
import { Card, Row } from 'react-bootstrap';
import { MdOutlineSell } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { formatRupiah, sumPrice } from '../../../utils';
import { DashboardCard } from '../../atoms';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getOrders } from '../../../app/features/Order/actions';
import { setTitleDashboard } from '../../../app/features/Auth/actions';

const UserDashboard = () => {
    const { orders } = useSelector(state => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
        console.log('UserDashboard');
        dispatch(setTitleDashboard('Dashboard'));
    }, [dispatch])

    console.log(orders);

    const userDashboard =
        [
            {
                label: 'Items',
                count: orders.totalItems,
                icon: <IoFastFoodOutline size='5em' color='#FF7C57' />
            },
            {
                label: 'Orders',
                count: orders.data?.length,
                icon: <MdOutlineSell size='5em' color='#FF7C57' />
            },
            {
                label: 'Payment',
                count: formatRupiah(orders.totalPayment),
                icon: <MdOutlineSell size='5em' color='#FF7C57' />
            },
        ]

    return (
        <Row>
            {
                userDashboard.map((state, index) => {
                    return (
                        <DashboardCard key={index} label={state.label} icon={state.icon} count={state.count} />
                    )
                })
            }
        </Row>
    )
}
export default UserDashboard;