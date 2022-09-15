import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createAddress, getKabupaten, getKecamatan, getKelurahan, getProvinsi, setFormAddress, updateAddress } from '../../../app/features/Address/actions';
import { Button, Input } from '../../atoms';

function FormAddress({ show, toggleShow, updateData }) {

    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const {
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        form } = useSelector(state => state.address)

    useEffect(() => {
        dispatch(getProvinsi());
        if (updateData?._id) {
            setIsUpdate(true);
            // console.log("Ada Data Update")
            dispatch(setFormAddress("nama", updateData.nama))
            dispatch(setFormAddress("provinsi", updateData.provinsi))
            dispatch(setFormAddress("kabupaten", updateData.kabupaten))
            dispatch(setFormAddress("kecamatan", updateData.kecamatan))
            dispatch(setFormAddress("kelurahan", updateData.kelurahan))
            dispatch(setFormAddress("detail", updateData.detail))
            // console.table(updateData);
        }

        return () => {
            setIsUpdate(false);
        }
    }, [dispatch, updateData])

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
                        dispatch(updateAddress(updateData._id, form))
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
                // console.log("Ada Yang Kosong");
            } else {
                // console.log("Submit")
                dispatch(createAddress(form));
                // console.log("TAMBAH DATA");
                try {
                    setValidated(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
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
    };

    // Get Provinsi
    useEffect(() => {
        if (provinsi.length) {
            provinsi.filter(val => {
                return val.name === form.provinsi && dispatch(getKabupaten(val.id))
            }
            )
        } else {
            console.log("Data Provinsi Belum Ada")
        }

    }, [dispatch, form, provinsi, form.provinsi])

    // Get Kota/Kabupaten
    useEffect(() => {
        if (kabupaten.length) {
            kabupaten.filter(val => {
                return val.name === form.kabupaten && dispatch(getKecamatan(val.id))
            }
            )
        } else {
            console.log("Data Kabupaten Belum Ada")
        }

    }, [dispatch, form, kabupaten, form.kabupaten])

    // Get Kecamatan
    useEffect(() => {
        if (kecamatan.length) {
            kecamatan.filter(val => {
                return val.name === form.kecamatan && dispatch(getKelurahan(val.id))
            }
            )
        } else {
            console.log("Data Kecamatan Belum Ada")
        }

    }, [dispatch, form, kecamatan, form.kecamatan])

    // console.table(form);

    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{isUpdate ? 'Update' : 'Tambah'} Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Col md={6} className="d-flex flex-column gap-3 mb-3">
                                <Input
                                    label={"Nama"}
                                    customType='input'
                                    type="teks"
                                    placeholder="ex. Rumah"
                                    required
                                    value={form.nama}
                                    onChange={(e) => {
                                        dispatch(setFormAddress("nama", e.target.value));
                                    }}
                                />
                                <Input
                                    label={"Masukan Detail Alamat"}
                                    customType='input'
                                    placeholder="ex. Jl.Negara No. 2"
                                    type="text"
                                    as="textarea"
                                    style={{ height: '13rem' }}
                                    value={form.detail}
                                    onChange={(e) => {
                                        dispatch(setFormAddress("detail", e.target.value));
                                    }} />
                            </Col>
                            <Col md={6} className="d-flex flex-column gap-3">

                                <Input
                                    customType='optionInput'
                                    label={'Provinsi'}
                                    options={provinsi}
                                    value={form?.provinsi}
                                    onChange={(e) => {
                                        dispatch(setFormAddress("provinsi", e.target.value))
                                    }}
                                />
                                <Input
                                    customType='optionInput'
                                    label={'Kabupaten'}
                                    options={kabupaten}
                                    value={form?.kabupaten}
                                    onChange={(e) => {
                                        dispatch(setFormAddress("kabupaten", e.target.value))
                                    }}
                                />
                                <Input
                                    customType='optionInput'
                                    label={'Kecamatan'}
                                    options={kecamatan}
                                    value={form?.kecamatan}
                                    onChange={(e) => {
                                        dispatch(setFormAddress("kecamatan", e.target.value))
                                    }}
                                />
                                <Input
                                    customType='optionInput'
                                    label={'Kelurahan'}
                                    options={kelurahan}
                                    value={form?.kelurahan}
                                    onChange={(e) => {
                                        dispatch(setFormAddress("kelurahan", e.target.value))
                                    }}
                                />
                            </Col>
                        </Row>
                        <Button type="submit" title={isUpdate ? 'Update' : 'Simpan'} />
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )

}

export default FormAddress;