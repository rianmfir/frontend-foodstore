import React, { useEffect } from 'react'
import { Card, Row } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineSell } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setTitleDashboard } from '../../../app/features/Auth/actions';
import { getTotalSell } from '../../../app/features/Order/actions';
import { getProducts } from '../../../app/features/Product/actions';
import { formatRupiah } from '../../../utils';
import { DashboardCard } from '../../atoms';

const AdminDashboard = () => {
    const users = useSelector(state => state.auth.data);
    const { totalItems } = useSelector(state => state.products);
    const { totalSells } = useSelector(state => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getProducts());
        dispatch(getTotalSell());
        dispatch(setTitleDashboard('Dashboard'));
    }, [dispatch])

    const adminDashboard =
        [
            {
                label: 'Products',
                count: totalItems,
                icon: <IoFastFoodOutline size='5em' color='#FF7C57' />
            },
            {
                label: 'Users',
                count: users.count,
                icon: <AiOutlineUser size='5em' color='#FF7C57' />
            },
            {
                label: 'Sells',
                count: formatRupiah(totalSells),
                icon: <MdOutlineSell size='5em' color='#FF7C57' />
            }
        ]

    return (
        <Row>
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
export default AdminDashboard;