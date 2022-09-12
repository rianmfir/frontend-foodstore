import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct, getProducts, setFormDefault, setPage } from '../../../app/features/Product/actions';
import { formatRupiah } from '../../../utils';
import { Button as CustomButton } from '../../atoms';
import Paginate from '../../Paginate';
import FormProduct from '../FormProduct';

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

    const [updateData, setUpdateData] = useState();

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
                        {/* <Link to={`${row._id}`}> */}
                        <Button onClick={() => handleEdit(row)} variant='warning' className='me-2'>
                            <span><FaEdit color="white" size={22} /></span>
                        </Button>
                        {/* </Link> */}
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Hapus</Tooltip>}>
                        <Button onClick={() => handleDelete(row._id)} variant='danger'>
                            <span><FaTrash /></span>
                        </Button>
                    </OverlayTrigger>
                </div>
            )
        }
    ]

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(false);
        dispatch(setFormDefault());
        setUpdateData("");
    }
    const handleShow = () => {
        setShow(true);
        setUpdateData("");
    }

    const handleEdit = (e) => {
        handleShow();
        setUpdateData(e)
    }

    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    dispatch(deleteProduct(id))
                    // console.log(id)
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                // text: 'Something went wrong!',
                text: error.message,
            })
        }

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
                    <Card className="border-0">
                        <Card.Header className='bg-white'>
                            <Col md={3} className="ms-auto py-3">
                                <CustomButton title={'Tambah Produk'} width="50" value={"product"} onClick={(e) => handleShow(e.target.value)} />
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <DataTable
                                columns={columns}
                                data={product}
                            />
                            <div className='d-flex justify-content-center'>
                                <Paginate
                                    activePage={currentPage}
                                    total={Math.ceil(totalItems / perPage)}
                                    onPageChange={(page) => dispatch(setPage(page))}
                                // coba={tags}
                                />
                            </div>
                        </Card.Body>
                    </Card>
            }
            {<FormProduct show={show} toggleShow={toggleShow} updateData={updateData} />}
        </>
    )
}

export default ListProduct;