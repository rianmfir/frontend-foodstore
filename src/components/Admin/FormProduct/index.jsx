import React, { useEffect, useState } from 'react'
import { Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createProduct, getCategories, getTags, setForm, setImagePreview } from '../../../app/features/Product/actions';
import { Button, Input } from '../../atoms';


const FormProduct = ({ show, toggleShow }) => {

    const dispatch = useDispatch();

    const {
        categories,
        tags,
        data,
        error,
        form,
        imagePreview
    } = useSelector(state => state.products);

    const [validated, setValidated] = useState(false);
    const [isInvalidName, setIsInvalidName] = useState(false)

    const validateForm = () => {
        const { name, price } = form;
        const newErrors = {}

        if (!name || name === "") newErrors.name = 'nama harus di isi';
        if (!price || price === "") newErrors.price = 'harga harus di isi';

        return newErrors
    }

    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        // event.preventDefault();
        let newErrors = {};

        //name field
        if (!form.name) newErrors.name = "Namas harus diisi";
        if (!form.price) newErrors.price = "Harga harus diisi";

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleError = (e) => {
        e.preventDefault();
        validate();
    }


    const handleError2 = (event) => {
        event.preventDefault();
        const formValidity = event.currentTarget;
        if (formValidity.checkValidity() === false) {
            event.stopPropagation();
            setValidated(false);
        }

        setValidated(true);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            // console.table(inputProduct)
            console.log("Error : ", error)
            console.table(form);

            dispatch(createProduct(form)).then(data => console.log(data))
            if (data.error === 1) {
                console.log("Data : ", Object.keys(data.fields));
                // setValidated(false);
                const errorFields = Object.keys(data.fields);
                if (errorFields.includes('name')) {
                    setIsInvalidName(true)
                }


            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                toggleShow();
            }

        } catch (err) {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }



    }

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        dispatch(setForm("image", file));
        dispatch(setImagePreview(URL.createObjectURL(file)));
    }

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTags());

    }, [dispatch])

    useEffect(() => {
        setIsInvalidName(false)
    }, [show])


    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                    <Row className="mb-3">
                        <Col className="d-flex flex-column gap-3">
                            <Input
                                label={"Nama Produk"}
                                customType='input'
                                type="teks"
                                placeholder="Kentang Goreng"
                                value={form.name}
                                isInvalid={isInvalidName}
                                required
                                onChange={(e) => {
                                    dispatch(setForm("name", e.target.value))
                                    // const name = e.target.value;
                                    // setInputProduct({ ...inputProduct, ...{ name } });
                                }}

                            />
                            <Input
                                label={"Harga"}
                                customType='input'
                                type="number"
                                placeholder="100000"
                                value={form.price}
                                required
                                onChange={(e) => {
                                    dispatch(setForm("price", e.target.value))
                                    // const price = e.target.value;
                                    // setInputProduct({ ...inputProduct, ...{ price } });
                                }}
                            />
                            <Input
                                label={"Kategori"}
                                customType='optionInput'
                                options={categories}
                                required
                                value={form.category}
                                placeholder="Makanan"
                                onChange={(e) => {
                                    dispatch(setForm("category", e.target.value))
                                    // const category = e.target.value;
                                    // setInputProduct({ ...inputProduct, ...{ category } });
                                }}
                            />

                            <Input
                                label={"Tag"}
                                customType='optionInput'
                                options={tags}
                                required
                                value={form.tags}
                                placeholder="Makanan"
                                // value={inputProduct?.tags}
                                onChange={(e) => {
                                    dispatch(setForm("tags", e.target.value))
                                    // const tags = e.target.value
                                    // setInputProduct({ ...inputProduct, ...{ tags } });
                                }}
                            />

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
                                        // const image = e.target.files[0];
                                        // setImagePreview(URL.createObjectURL(image));
                                        // setInputProduct({ ...inputProduct, ...{ image } });
                                    }}
                                />
                            </div>

                        </Col>

                    </Row>
                    {/* <Button type="submit" title={'Simpan'} /> */}
                    <Button type="submit" title={'Simpan'} onClick={handleSubmit} />
                    {/* </Form> */}
                </Modal.Body>
            </Modal>

        </>
    )
}

export default FormProduct;