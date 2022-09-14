import React from 'react'
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, setPage, setTitleDashboard } from '../../../app/features/Auth/actions';
import Paginate from '../../Paginate';
import './listUsers.scss';

function ListUsers() {

    const dispatch = useDispatch();
    // const { users } = useSelector(state => state.auth.data)
    const {
        data,
        currentPage,
        totalItems,
        perPage
    } = useSelector(state => state.auth)

    const status = (status) => {
        if (status === 1) {
            return "Online"
        } else {
            return "Offline"
        }
    }
    const columns = [
        {
            name: <span className='fw-bolder'>No</span>,
            selector: (row, index) => (perPage * (currentPage - 1)) + index + 1
        },

        {
            name: <span className='fw-bolder'>Email</span>,
            selector: row => row.email
        },
        {
            name: <span className='fw-bolder'>Customer_Id</span>,
            cell: row => row.customer_id
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
    }, [dispatch, currentPage])

    return (
        <>
            <Card>
                <DataTable
                    columns={columns}
                    data={data.users}
                />
                <div className='d-flex justify-content-center'>
                    <Paginate
                        activePage={currentPage}
                        total={Math.ceil(totalItems / perPage)}
                        onPageChange={(page) => dispatch(setPage(page))}
                    />
                </div>
            </Card>
        </>
    )
}

export default ListUsers;