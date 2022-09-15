import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createProduct, getCategories, getTags, setForm, setImagePreview, updateProduct } from '../../../app/features/Product/actions';
import { Button, Input } from '../../atoms';
import Select, { components } from 'react-select';
import './formProduct.scss';


const FormProduct = ({ show, toggleShow, updateData }) => {

    const dispatch = useDispatch();
    const baseURL = axios.defaults.baseURL;

    const {
        categories,
        tags,
        form,
        imagePreview
    } = useSelector(state => state.products);

    const [validated, setValidated] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        dispatch(setForm("image", file))
        dispatch(setImagePreview(URL.createObjectURL(file)));
    }

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTags());
        if (updateData?._id) {
            dispatch(setForm('name', updateData.name));
            dispatch(setForm('price', updateData.price));
            dispatch(setForm('category', updateData.category));
            dispatch(setForm('tags', options(updateData.tags)));
            dispatch(setImagePreview(`${baseURL}images/products/${updateData.image_url}`));
            setIsUpdate(true);

            return () => {
                setIsUpdate(false);
            }
        }
    }, [dispatch, baseURL, updateData])

    useEffect(() => {
        setValidated(false)
    }, [show])

    const onSubmit = (event) => {
        event.preventDefault();
        const formValidation = event.currentTarget;

        if (isUpdate) {
            try {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(updateProduct(updateData._id, form))
                        setIsUpdate(false)
                        toggleShow();
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

            if (formValidation.checkValidity() === false) {
                event.stopPropagation();
                setValidated(true);
            } else {
                if (form.tags.length === 0) {
                    setValidated(true)
                } else {
                    dispatch(createProduct(form));
                    try {
                        setValidated(false)
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.table(form);
                        toggleShow();
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

        }

    };

    const options = state => {
        return state.map((data, index) => {
            return {
                label: data.name,
                value: data.name,
                key: index
            }
        })
    }

    const handleChanges = (e) => {
        dispatch(setForm('tags', e));
    };


    const Control = (props) => {
        const Co = components.Control;
        return (
            <>
                <div>
                    <span className='ps-2 text-muted' style={{ fontSize: '0.9rem' }}>Tags</span>
                    <Co {...props} required />
                </div>
            </>
        );
    };

    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{isUpdate ? 'Update' : 'Tambah'} Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={onSubmit}>

                        <Row className="mb-3">
                            <Col className="d-flex flex-column gap-3">
                                <Input
                                    autoFocus
                                    label={"Nama Produk"}
                                    customType='input'
                                    type="teks"
                                    placeholder="Kentang Goreng"
                                    value={form?.name}
                                    onChange={(e) => {
                                        dispatch(setForm("name", e.target.value))
                                    }}
                                />
                                <Input
                                    label={"Harga"}
                                    customType='input'
                                    type="number"
                                    placeholder="100000"
                                    value={form?.price}
                                    onChange={(e) => {
                                        dispatch(setForm("price", e.target.value))

                                    }}
                                />
                                <Input
                                    label={"Kategori"}
                                    customType='optionInput'
                                    options={categories}
                                    required
                                    value={form?.category?.name}
                                    placeholder="Makanan"
                                    onChange={(e) => {
                                        dispatch(setForm("category", e.target.value))

                                    }}
                                />
                                <div>
                                    <Select
                                        placeholder={'Pilih Tags'}
                                        components={{ Control }}
                                        closeMenuOnSelect={false}
                                        isMulti
                                        name="tags"
                                        options={options(tags)}
                                        value={form.tags}
                                        required
                                        onChange={(e) => {
                                            handleChanges(e);
                                        }}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                cursor: 'pointer',
                                                border: 'none',
                                                boxShadow: 'none',
                                            }),
                                            container: (base, state) => ({
                                                ...base,
                                                border: state.isFocused
                                                    ? '3px solid #e8b988c9'
                                                    : form.tags.length === 0 && validated
                                                        ? '1px solid #dc3545'
                                                        : '1px solid #ced4da',
                                                borderRadius: "12px",
                                                padding: "2px",
                                            })
                                        }}
                                    />
                                    {
                                        form.tags.length === 0 && validated
                                            ?
                                            <span style={{ fontSize: '14px', color: '#dc3545' }} className="pt-0">
                                                Tags harus dipilih
                                            </span>
                                            : ''
                                    }

                                </div>


                                <div>
                                    {imagePreview &&
                                        <Image src={imagePreview} alt="" className='mb-4' style={{ width: '200px' }} roundedCircle />
                                    }
                                    <Input
                                        label={"Pilih Gambar"}
                                        customType='file'
                                        required
                                        onChange={(e) => {
                                            onImageUpload(e);
                                        }}
                                    />
                                </div>

                            </Col>
                        </Row>
                        <Button type="submit" title={isUpdate ? 'Update' : 'Simpan'} />
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default FormProduct;