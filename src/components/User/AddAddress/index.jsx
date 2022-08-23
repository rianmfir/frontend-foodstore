import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form, Col, Container, Row, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createAddress, getKabupaten, getKecamatan, getKelurahan, getProvinsi } from '../../../app/features/Address/actions';
import { Button, Input } from '../../atoms';

const AddAddress = ({ show, toggleShow }) => {

    const dispatch = useDispatch();

    const [nama, setNama] = useState('');
    const [detail, setDetail] = useState('');
    const [provinsis, setProvinsi] = useState('');
    // const [kabupaten, setKabupaten] = useState('');
    const [kecamatans, setKecamatan] = useState('');
    const [kelurahans, setKelurahan] = useState('');

    const [wilayah, setWilayah] = useState({})

    const { data, provinsi, kabupaten, kecamatan, kelurahan, error } = useSelector(state => state.address)

    const handleWilayah = () => {
        dispatch(getProvinsi());

        if (wilayah.provinsi) {
            dispatch(getKabupaten(wilayah.provinsi?.id));
        }
        if (wilayah.kabupaten) {
            dispatch(getKecamatan(wilayah.kabupaten?.id));
        }
        if (wilayah.kecamatan) {
            dispatch(getKelurahan(wilayah.kecamatan?.id));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('nama', nama);
        // formData.append('kelurahan', kelurahans.name);
        // formData.append('kecamatan', kecamatans.name);
        // formData.append('kabupaten', kabupaten.name);
        // formData.append('provinsi', provinsis.name);
        // formData.append('detail', detail);

        try {


            console.log("Isi Wilayah : ", wilayah)
            console.log("Data : ", data)

            if (!error) {
                dispatch(createAddress(wilayah));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                toggleShow();
            }

            setWilayah({});

            // console.log("Isi Payload : ", formData)
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

    useEffect(() => {
        handleWilayah()
    }, [dispatch, wilayah.provinsi?.id, wilayah.kabupaten?.id, wilayah.kecamatan?.id, error])

    console.log("Provinsi ", provinsi);
    console.log("Kota/Kabupaten ", kabupaten);
    console.log("Kecamatan ", kecamatan);
    console.log("Kelurahan ", kelurahan);

    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mb-3">
                        <Col md={6} className="d-flex flex-column gap-3">
                            <Input
                                label={"Nama"}
                                customType='input'
                                type="teks"
                                placeholder="ex. Rumah"
                                required
                                isInvalid={data.fields?.nama}

                                onChange={(e) => {
                                    const name = e.target.value;
                                    setWilayah({ ...wilayah, ...{ name } });
                                    // setNama(name)
                                }}
                            />
                            <Input
                                label={"Masukan Detail Alamat"}
                                customType='input'
                                placeholder="ex. Jl.Negara No. 2"
                                type="text"
                                as="textarea"
                                required
                                onChange={(e) => {
                                    const detail = e.target.value;
                                    setWilayah({ ...wilayah, ...{ detail } });
                                    // setDetail(detail)
                                }}
                            />
                        </Col>
                        <Col md={6} className="d-flex flex-column gap-3">

                            <Input
                                label={"Provinsi"}
                                customType='optionInput'
                                options={provinsi}
                                // placeholder="Manis Kopi ...."
                                onChange={(e) => {
                                    const provinsi = JSON.parse(e.target.value);
                                    setWilayah({ ...wilayah, ...{ provinsi } });
                                    // setProvinsi(provinsi);
                                }}
                            />
                            <Input
                                label={"Kota/Kabupaten"}
                                customType='optionInput'
                                options={kabupaten}
                                // placeholder="Manis Kopi ...."
                                required
                                onChange={(e) => {
                                    const kabupaten = JSON.parse(e.target.value);
                                    setWilayah({ ...wilayah, ...{ kabupaten } });
                                    // setKabupaten(kabupaten);
                                }}
                            />
                            <Input
                                label={"Kecamatan"}
                                customType='optionInput'
                                options={kecamatan}
                                // placeholder="Manis Kopi ...."
                                required
                                onChange={(e) => {
                                    const kecamatan = JSON.parse(e.target.value);
                                    setWilayah({ ...wilayah, ...{ kecamatan } });
                                    // setKecamatan(kecamatan);
                                }}
                            />
                            <Input
                                label={"Kelurahan"}
                                customType='optionInput'
                                options={kelurahan}
                                // placeholder="Manis Kopi ...."
                                required
                                onChange={(e) => {
                                    const kelurahan = JSON.parse(e.target.value);
                                    setWilayah({ ...wilayah, ...{ kelurahan } });
                                    // setKelurahan(kelurahan);
                                }}
                            />

                        </Col>
                    </Row>
                    <Button type="submit" title={'Simpan'} onClick={handleSubmit} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddAddress;