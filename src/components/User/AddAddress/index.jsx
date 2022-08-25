import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form, Col, Container, Row, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createAddress, getKabupaten, getKecamatan, getKelurahan, getProvinsi, setFormAddress } from '../../../app/features/Address/actions';
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

    const {
        data,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        error,
        form } = useSelector(state => state.address)

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
                dispatch(createAddress(form));
                // console.log("FORM : ", form)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                toggleShow();
            }

            // setWilayah({});

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

    // useEffect(() => {

    //     dispatch(setFormAddress("nama", dataAddress.nama))
    //     dispatch(setFormAddress("provinsi", dataAddress.provinsi))
    //     dispatch(setFormAddress("kabupaten", dataAddress.kabupaten))
    //     dispatch(setFormAddress("kecamatan", dataAddress.kecamatan))
    //     dispatch(setFormAddress("kelurahan", dataAddress.kelurahan))
    //     dispatch(setFormAddress("detail", dataAddress.detail))
    //     console.log("DI HIT")
    //     // dispatch(setForm(dataAddress))
    // }, [dispatch, dataAddress, dataAddress._id, error])

    useEffect(() => {
        dispatch(getProvinsi());
    }, [dispatch, form])

    useEffect(() => {
        if (provinsi.length) {
            provinsi.filter(val => {
                return val.name === form.provinsi && dispatch(getKabupaten(val.id))
            }
            )
        } else {
            console.log("Data Provinsi Belum Ada")
        }

    }, [dispatch, provinsi, form, form.provinsi])

    useEffect(() => {
        if (kabupaten.length) {
            kabupaten.filter(val => {
                return val.name === form.kabupaten && dispatch(getKecamatan(val.id))
            }
            )
        } else {
            console.log("Data Kabupaten Belum Ada")
        }

    }, [dispatch, form.kabupaten, form, kabupaten])

    useEffect(() => {
        if (kecamatan.length) {
            kecamatan.filter(val => {
                return val.name === form.kecamatan && dispatch(getKelurahan(val.id))
            }
            )
        } else {
            console.log("Data Kecamatan Belum Ada")
        }

    }, [dispatch, kecamatan, form, form.kecamatan])

    console.table(form);

    // useEffect(() => {
    //     handleWilayah()
    // }, [dispatch, wilayah.provinsi?.id, wilayah.kabupaten?.id, wilayah.kecamatan?.id, error])

    // console.log("Provinsi ", provinsi);
    // console.log("Kota/Kabupaten ", kabupaten);
    // console.log("Kecamatan ", kecamatan);
    // console.log("Kelurahan ", kelurahan);

    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mb-3">
                        {/* <Col md={6} className="d-flex flex-column gap-3">
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
                        </Col> */}
                        <Col md={6} className="d-flex flex-column gap-3">

                            <Input
                                label={"Nama"}
                                customType='input'
                                type="teks"
                                placeholder="ex. Rumah"
                                required
                                value={form.nama}
                                // onChange={(e) => ()}

                                onChange={(e) => {
                                    // const nama = e.target.value;
                                    // setWilayah({ ...wilayah, ...{ nama } });
                                    dispatch(setFormAddress("nama", e.target.value));
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
                                value={form.detail}
                                onChange={(e) => {
                                    // const detail = e.target.value;
                                    // setWilayah({ ...wilayah, ...{ detail } });
                                    // setDetail(detail)
                                    dispatch(setFormAddress("detail", e.target.value));
                                }}
                            />
                        </Col>
                        <Col md={6} className="d-flex flex-column gap-3">

                            <Input
                                customType='optionInput'
                                label={'Provinsi'}
                                options={provinsi}
                                value={form.provinsi}
                                onChange={(e) => {
                                    dispatch(setFormAddress("provinsi", e.target.value))
                                }}
                            />
                            <Input
                                customType='optionInput'
                                label={'Kabupaten'}
                                options={kabupaten}
                                value={form.kabupaten}
                                onChange={(e) => {
                                    dispatch(setFormAddress("kabupaten", e.target.value))
                                }}
                            />
                            <Input
                                customType='optionInput'
                                label={'Kecamatan'}
                                options={kecamatan}
                                value={form.kecamatan}
                                onChange={(e) => {
                                    dispatch(setFormAddress("kecamatan", e.target.value))
                                }}
                            />
                            <Input
                                customType='optionInput'
                                label={'Kelurahan'}
                                options={kelurahan}
                                value={form.kelurahan}
                                onChange={(e) => {
                                    dispatch(setFormAddress("kelurahan", e.target.value))
                                }}
                            />

                            {/* <Input
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
                            /> */}

                        </Col>
                    </Row>
                    <Button type="submit" title={'Simpan'} onClick={handleSubmit} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddAddress;