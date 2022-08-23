import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { Col, Button, Image, OverlayTrigger, Row, Tooltip, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCategories, getProducts, setPage } from '../../../app/features/Product/actions';
import { dummyImage } from '../../../assets/images';
import { formatRupiah } from '../../../utils';
import AddAddress from '../../User/AddAddress';
import { Gap } from '../../atoms';
import CustomButton from '../../atoms/Button';
import Paginate from '../../Paginate';
import './adminProduct.scss';
import AddProduct from '../AddProduct';

const AdminProducts = () => {

    const dispatch = useDispatch();
    const baseURL = axios.defaults.baseURL;

    const {
        product,
        categories,
        tags,
        currentPage,
        totalItems,
        perPage,
        keyword,
        category,
        tag
    } = useSelector(state => state.products);



    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(show => !show);

    const [modalForm, setModalForm] = useState('');
    const handleClose = () => setShow(false);

    const handleShow = (children) => {
        setShow(true);
        setModalForm(children)
    }

    const handleTambah = () => {
        handleShow(<AddProduct />)
    }

    const handleEdit = () => {
        handleShow(<AddProduct />)
    }

    const showModal = (children) => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Woohoo, you're reading this text in a modal! */}
                    {children}
                </Modal.Body>

                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <CustomButton onClick={handleClose} title={'Simpan'} />

                </Modal.Footer> */}
            </Modal>
        )
    }

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());

    }, [dispatch, currentPage, modalForm])

    let no = 1;
    const columns = [
        {
            name: <span className='fw-bolder'>No</span>,
            selector: row => no

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
            selector: row => row.category.name
        },
        {
            name: <span className='fw-bolder'>Tags</span>,
            cell: row => (<div>
                {
                    row.tags.map((e, i) => {
                        return (
                            <div >
                                <span key={i}>{e.name}</span>
                                <br />
                            </div>
                        )
                    })
                }

            </div>),
        },
        {
            name: <span className='ms-4 fw-bolder'>Aksi</span>,
            // button: true,
            // allowOverflow: true,
            cell: () => (
                <div className="">

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                        <Button onClick={handleEdit} variant='warning' className='me-2'>
                            <span><GrEdit /></span>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Hapus</Tooltip>}>
                        <Button onClick={handleEdit} variant='danger' >
                            <span><FaTrash /></span>
                        </Button>
                    </OverlayTrigger>
                </div>
            )
        }

    ]


    return (
        <div id="body" >
            <h3 className="color-primary fw-bold mb-5">Products</h3>
            <Col md={2}>
                <CustomButton title={'Tambah Produk'} width="50" onClick={handleTambah} />
            </Col>
            <Gap height={30} />
            <DataTable
                data={product}
                columns={columns}
            />
            <Gap height={15} />
            <div className='d-flex justify-content-center'>
                <Paginate
                    activePage={currentPage}
                    total={Math.ceil(totalItems / perPage)}
                    onPageChange={(page) => dispatch(setPage(page))}
                    coba={tags}
                />
            </div>

            <>
                {/* {showModal(modalForm)} */}
                <AddProduct show={show} toggleShow={toggleShow} />
            </>
        </div>
    )
}

export default AdminProducts;