import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createCategory, getCategories } from '../../../app/features/Product/actions';
import { Button, Input } from '../../atoms';

const FormCategory = ({ categoryData, show, toggleShow }) => {

    const dispatch = useDispatch();

    const { error } = useSelector(state => state.products);

    const { category, setCategory } = useState(categoryData);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            console.table(category)

            if (!error) {
                dispatch(createCategory(category));
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
            })
        }

    }

    // useEffect(() => {
    //     dispatch(getCategories())
    // }, [dispatch, data]);

    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mb-3">

                        <Col className="d-flex flex-column gap-3">

                            <Input
                                label={"Nama Kategori"}
                                customType='input'
                                type="teks"
                                placeholder="Makanan"
                                value={category}
                                required
                                onPageChange={(e) => setCategory(e.target.value)}
                            />
                        </Col>

                    </Row>
                    <Button type="submit" title={'Simpan'} onClick={handleSubmit} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default FormCategory;