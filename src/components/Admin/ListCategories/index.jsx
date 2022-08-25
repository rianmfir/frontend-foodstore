import React from 'react'
import { useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../app/features/Product/actions';

const ListCategories = () => {
    // const { categories, data } = useSelector(state => state.auth.products);
    // const dispatch = useDispatch();

    // const handleEdit = () => {

    // }
    // const handleDelete = () => {

    // }

    // useEffect(() => {
    //     dispatch(getCategories())
    // }, [dispatch, data])

    // const columns = [
    //     {
    //         name: <span className='fw-bolder'>Kategori</span>,
    //         selector: row => row.name
    //     },

    //     {
    //         name: <span className='ms-4 fw-bolder'>Aksi</span>,
    //         cell: row => (
    //             <div className="justify-content-between">

    //                 <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
    //                     <Button onClick={handleEdit} variant='warning' className='me-2'>
    //                         <span><FaEdit color="white" size={22} /></span>
    //                     </Button>
    //                 </OverlayTrigger>

    //                 <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Hapus</Tooltip>}>
    //                     <Button onClick={handleDelete} variant='danger'>
    //                         <span><FaTrash /></span>
    //                     </Button>
    //                 </OverlayTrigger>
    //             </div>
    //         )
    //     }
    // ]
    return (
        <div>ListCategories</div>
        // <>
        //     <DataTable
        //         columns={columns}
        //         data={categories}
        //     />
        // </>
    )
}


export default ListCategories;