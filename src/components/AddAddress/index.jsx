import React from 'react'
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useSelector } from 'react-redux';

const AddAddress = () => {

    const address = useSelector(state => state.address.data);

    console.log("Test Address : ", address);
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md >
                    <Col md className='mb-3'>
                        <FloatingLabel controlId="nama" label="Nama">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>

                    <Col md className='mb-3'>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Provinsi"
                        >
                            <Form.Select aria-label="Floating label select example">
                                <option>Pilih Provinsi</option>
                                {
                                    address.map((state, index) => {
                                        return (
                                            <option key={index} value={state.nama}>{state.nama}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col md className='mb-3'>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Kota/Kabupaten"
                        >
                            <Form.Select aria-label="Floating label select example">
                                <option>Pilih Kota/Kabupaten</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col md className='mb-3'>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Kecamatan"
                        >
                            <Form.Select aria-label="Floating label select example">
                                <option>Pilih Kecamatan</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col md className='mb-3'>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Kelurahan.Desa"
                        >
                            <Form.Select aria-label="Floating label select example">
                                <option>Pilih Kelurahan/Desa</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md className='mb-3'>
                        <FloatingLabel controlId="detailAlamat" label="Detail Alamat">
                            <Form.Control
                                as="textarea"
                                placeholder="Jl. Mandiri No.3" />
                        </FloatingLabel>
                    </Col>
                </Col>
            </Row>
        </Container >
    )
}

export default AddAddress;