import React, { useEffect, useState } from 'react'
import { Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getKabupaten, getKecamatan, getKelurahan, getProvinsi, setFormAddress, updateAddress } from '../../../app/features/Address/actions';
import { Button, Input } from '../../atoms';

const UpdateAddress = ({ dataAddress, show, toggleShow }) => {

    const dispatch = useDispatch();

    const [getNama, setNama] = useState('');
    const [getDetail, setDetail] = useState('');
    const [getDataProvinsi, setProvinsi] = useState('');
    const [getDataKabupaten, setKabupaten] = useState('');
    const [getDataKecamatan, setKecamatan] = useState('');
    const [getDataKelurahan, setKelurahan] = useState('');

    const [myValue, setMyValue] = useState("");

    const [wilayah, setWilayah] = useState({})

    console.log("TES DATA : ", dataAddress);
    const {
        data,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        error,
        form,
        loading
    } = useSelector(state => state.address)

    const handleWilayah = () => {
        dispatch(getProvinsi());

        if (form.provinsi?.id) {
            dispatch(getKabupaten(form.provinsi?.id));
        }
        if (form.kabupaten?.id) {
            dispatch(getKecamatan(form.kabupaten?.id));
        }
        if (form.kecamatan?.id) {
            dispatch(getKelurahan(form.kecamatan?.id));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            if (!error) {

                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        // console.log("Datanya Wilayahs : ", wilayahs.nama)
                        dispatch(updateAddress(dataAddress._id, form))

                        console.log("IDnya 1 : ", dataAddress._id);
                        Swal.fire('Saved!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                toggleShow();
            }

            setWilayah({});

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

        dispatch(setFormAddress("nama", dataAddress.nama))
        dispatch(setFormAddress("provinsi", dataAddress.provinsi))
        dispatch(setFormAddress("kabupaten", dataAddress.kabupaten))
        dispatch(setFormAddress("kecamatan", dataAddress.kecamatan))
        dispatch(setFormAddress("kelurahan", dataAddress.kelurahan))
        dispatch(setFormAddress("detail", dataAddress.detail))
        console.log("DI HIT")
        // dispatch(setForm(dataAddress))
    }, [dispatch, dataAddress, dataAddress._id, error])

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
    //     if (form.provinsi) {
    //         provinsi.filter(
    //             (val) =>
    //                 val.nama === form.provinsi
    //                 &&
    //                 dispatch(getKabupaten(val.id))

    //         );
    //     }
    // }, [dispatch, form.provinsi]);


    // useEffect(() => {
    //     dispatch(getProvinsi());
    // }, [dispatch]);

    // useEffect(() => {
    //     if (provinsi.length) {
    //         provinsi.filter(
    //             (val) =>
    //                 val.nama === dataAddress.provinsi &&
    //                 dispatch(getKabupaten(val.id))
    //         );
    //     }
    // }, [dispatch, provinsi]);

    //   useEffect(() => {
    //     dispatch(getProvinsi());
    //   }, [dispatch]);

    // if (loading) {
    //     <p>Loading . . . . .</p>
    // }
    return (
        <>
            <Modal show={show} fullscreen={'xl-down'} onHide={toggleShow} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Alamat</Modal.Title>
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
                            {/* 
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Works with selects"

                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        value={form.provinsi}
                                        disabled={provinsi.length === 0}
                                        onChange={(e) => {
                                            dispatch(setFormAddress("provinsi", e.target.value))
                                        }}>
                                        <option value="">Open this select menu</option>
                                        {
                                            provinsi.map((e, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={e.name}
                                                    >
                                                        {e.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Form.Select>

                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Works with selects"

                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        value={form.kabupaten}
                                        disabled={kabupaten.length === 0}
                                        onChange={(e) => {
                                            dispatch(setFormAddress("kabupaten", e.target.value))
                                        }}>
                                        <option value="">Open this select menu</option>
                                        {
                                            kabupaten.map((e, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={e.name}
                                                    >
                                                        {e.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Works with selects"

                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        value={form.kecamatan}
                                        disabled={kecamatan.length === 0}
                                        onChange={(e) => {
                                            dispatch(setFormAddress("kecamatan", e.target.value))
                                        }}>
                                        <option value="">Open this select menu</option>
                                        {
                                            kecamatan.map((e, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={e.name}
                                                    >
                                                        {e.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Works with selects"

                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        value={form.kelurahan}
                                        disabled={kelurahan.length === 0}
                                        onChange={(e) => {
                                            dispatch(setFormAddress("kelurahan", e.target.value))
                                        }}>
                                        <option value="">Open this select menu</option>
                                        {
                                            kelurahan.map((e, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={e.name}
                                                    >
                                                        {e.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </FloatingLabel>

 */}



                            {/* <Input
                                label={"Provinsi"}
                                customType='optionInput'
                                options={provinsi}
                                // placeholder="Manis Kopi ...."
                                defaultValue={dataAddress.provinsi}
                                onChange={(e) => {
                                    const provinsi = JSON.parse(e.target.value);
                                    // setWilayah({ ...wilayah, ...{ provinsi } });
                                    // setProvinsi(provinsi);
                                    dispatch(setFormAddress("provinsi", JSON.parse(e.target.value)));
                                }}
                            /> */}
                            {/* <Input
                                label={"Kota/Kabupaten"}
                                customType='optionInput'
                                options={kabupaten}
                                // placeholder="Manis Kopi ...."
                                required
                                defaultValue={dataAddress.kabupaten}
                                onChange={(e) => {
                                    // const kabupaten = JSON.parse(e.target.value);
                                    // setWilayah({ ...wilayah, ...{ kabupaten } });
                                    // setKabupaten(kabupaten);
                                    dispatch(setFormAddress("kabupaten", JSON.parse(e.target.value)));
                                }}
                            />
                            <Input
                                label={"Kecamatan"}
                                customType='optionInput'
                                options={kecamatan}
                                // placeholder="Manis Kopi ...."
                                defaultValue={dataAddress.kecamatan}
                                required
                                onChange={(e) => {
                                    // const kecamatan = JSON.parse(e.target.value);
                                    // setWilayah({ ...wilayah, ...{ kecamatan } });
                                    // setKecamatan(kecamatan);
                                    dispatch(setFormAddress("kecamatan", JSON.parse(e.target.value)));
                                }}
                            />
                            <Input
                                label={"Kelurahan"}
                                customType='optionInput'
                                options={kelurahan}
                                // placeholder="Manis Kopi ...."
                                required
                                onChange={(e) => {
                                    // const kelurahan = JSON.parse(e.target.value);
                                    // setWilayah({ ...wilayah, ...{ kelurahan } });
                                    // setKelurahan(kelurahan);
                                    dispatch(setFormAddress("kelurahan", JSON.parse(e.target.value)));
                                }}
                            /> */}

                        </Col>
                    </Row>
                    <Button type="submit" title={'Update'} onClick={handleSubmit} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default UpdateAddress;

