import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts, setPage } from '../../../app/features/Product/actions';
import { formatRupiah } from '../../../utils';
import Paginate from '../../Paginate';

const ListProduct = () => {

    const baseURL = axios.defaults.baseURL;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data,
        product,
        categories,
        tags,
        currentPage,
        totalItems,
        perPage,
        keyword,
        category,
        tag,
        loading
    } = useSelector(state => state.products);

    const columns = [
        {
            name: <span className='fw-bolder'>No.</span>,
            cell: (row, index) => (perPage * (currentPage - 1)) + index + 1
        },
        {
            name: <span className='ms-5 fw-bolder'>Gambar</span>,
            selector: row =>
                <Image
                    style={{ height: '5rem', width: '5rem' }}
                    src={`${baseURL}/images/products/${row.image_url}`}
                    className="my-2 ms-4"
                    roundedCircle
                />
        },
        {
            name: <span className='fw-bolder'>Produk</span>,
            selector: row => row.name
        },
        {
            name: <span className='fw-bolder'>Harga</span>,
            selector: row => formatRupiah(row.price)
        },
        {
            name: <span className='fw-bolder'>Kategori</span>,
            selector: row => row.category?.name
        },
        {
            name: <span className='fw-bolder'>Tags</span>,
            cell: row => (<div>
                {
                    row.tags.map((e, i) => {
                        return (
                            <div key={i}>
                                <span >{e.name}</span>
                                <br />
                            </div>
                        )
                    })
                }
            </div>),
        },
        {
            name: <span className='ms-4 fw-bolder'>Aksi</span>,
            cell: row => (
                <div className="justify-content-between">

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                        <Button onClick={handleEdit} variant='warning' className='me-2'>
                            <span><FaEdit color="white" size={22} /></span>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Hapus</Tooltip>}>
                        <Button onClick={handleDelete} variant='danger'>
                            <span><FaTrash /></span>
                        </Button>
                    </OverlayTrigger>
                </div>
            )
        }
    ]

    const handleEdit = (e) => {
        e.preventDefault();
    }

    const handleDelete = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(getProducts());

    }, [dispatch, data, currentPage])

    return (
        <>
            {
                loading
                    ? <p className="text-center">L O A D I N G . . . . .</p>
                    :
                    <>
                        <DataTable
                            columns={columns}
                            data={product}
                        />
                        <div className='d-flex justify-content-center'>
                            <Paginate
                                activePage={currentPage}
                                total={Math.ceil(totalItems / perPage)}
                                onPageChange={(page) => dispatch(setPage(page))}
                                coba={tags}
                            />
                        </div>
                    </>
            }
        </>
    )
}

export default ListProduct;