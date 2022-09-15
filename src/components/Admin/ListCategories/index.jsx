import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createCategory, deleteCategory, getCategories, setForm, setFormDefault, updateCategory } from '../../../app/features/Product/actions';
import { Button as CustomButton, Input } from '../../atoms';

const ListCategories = () => {

    const { categories, data, form } = useSelector(state => state.products);
    const [isUpdate, setIsUpdate] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const handleEdit = (data) => {
        dispatch(setForm('category', data));
        setIsUpdate(true);
    };

    const handleCancel = () => {
        setIsUpdate(false);
        dispatch(setFormDefault());
    }

    const columns = [
        {
            name: <span className='fw-bolder'>No.</span>,
            cell: (row, index) => index + 1
        },
        {
            name: <span className='fw-bolder'>Category</span>,
            selector: row => row.name
        },
        {
            name: <span className='ms-4 fw-bolder'>Aksi</span>,
            cell: row => (
                <div className="justify-content-between">

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                        <Link to={`${row._id}`}>
                            <Button onClick={() => handleEdit(row.name)} variant='warning' className='me-2'>
                                <span><FaEdit color="white" size={22} /></span>
                            </Button>
                        </Link>
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

    const [validated, setValidated] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        if (id) {
            try {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(updateCategory(id, form.category))
                        setIsUpdate(false)
                        navigate('/admin/products/category')
                        Swal.fire('Saved!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })

            } catch (err) {
                console.log(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }


        } else {
            dispatch(createCategory(form.category))
            try {
                if (data?.error === 1 || form.category === "") {
                    const formValidation = event.currentTarget;
                    if (formValidation.checkValidity() === false) {
                        event.stopPropagation();
                    }
                    setValidated(true);
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            } catch (err) {
                console.log(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }
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
                    dispatch(deleteCategory(id))
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
        dispatch(getCategories())
    }, [dispatch, data])

    useEffect(() => {
        dispatch(setFormDefault());
    }, [dispatch])

    useEffect(() => {
        if (id) {
            setIsUpdate(true)
        }
    }, [id])


    return (
        <Card className="border-0">
            <Card.Header className="bg-white">
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Row className="justify-content-start">
                        <Col md={7}>
                            <Input
                                label={"Category"}
                                customType='input'
                                type="teks"
                                placeholder="Makanan"
                                value={form.category}
                                onChange={(e) => {
                                    dispatch(setForm("category", e.target.value))
                                }}
                            />
                        </Col>
                        <Col md={3} className="my-auto">
                            <CustomButton title={isUpdate ? "Update" : "Simpan"} width="50" value={"kategori"} onClick={onSubmit} />
                        </Col>
                        {
                            isUpdate
                                ?
                                <Col md={2} className="my-auto">
                                    <CustomButton style={{ backgroundColor: `grey` }} title={'Batal'} width="50" value={"kategori"} onClick={handleCancel} />
                                </Col>
                                :
                                ""
                        }
                    </Row>
                </Form>
            </Card.Header>
            <Card.Body>
                <DataTable
                    columns={columns}
                    data={categories}
                />
            </Card.Body>
        </Card >
    )
}


export default ListCategories;