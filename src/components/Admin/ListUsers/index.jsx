import React from 'react'
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, setTitleDashboard } from '../../../app/features/Auth/actions';
import './listUsers.scss';

function ListUsers() {

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.auth.data)

    const status = (status) => {
        if (status === 1) {
            return "Online"
        } else {
            return "Offline"
        }
    }
    const columns = [
        {
            name: <span className='fw-bolder'>Customer_Id</span>,
            cell: row => row.customer_id
        },
        {
            name: <span className='fw-bolder'>Email</span>,
            selector: row => row.email
        },
        {
            name: <span className='fw-bolder'>Status</span>,
            selector: row => (<span className={status(row.status)}>{status(row.status)}</span>)
        },
        {
            name: <span className='fw-bolder'>Role</span>,
            selector: row => row.role
        },

    ]

    useEffect(() => {
        dispatch(getUsers())
        dispatch(setTitleDashboard('Users'));
    }, [dispatch])

    return (
        <>
            <Card>
                <DataTable
                    columns={columns}
                    data={users}
                />
            </Card>
        </>
    )
}

export default ListUsers;