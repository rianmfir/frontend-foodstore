import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, Image, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, getCategories, getTags } from '../../../app/features/Product/actions';
import { Button, Input } from '../../atoms';


const AddProduct = ({ show, toggleShow }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        categories,
        tags,

    } = useSelector(state => state.products);


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [inputProduct, setInputProduct] = useState({});

    // const [wilayah, setWilayah] = useState({})

    // const { provinsi, kotaKab } = useSelector(state => state.address)

    // const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();


        try {
            dispatch(createProduct(inputProduct));
            // window.location.reload();
            toggleShow();
        } catch (error) {
            console.log(error.message);
        }

    }

    // const handleWilayah = (e) => {
    //     e.preventDefault();
    //     console.table(wilayah)
    //     console.table(inputProduct)
    //     console.log("Panjang wilayah : ", wilayah.provinsi)
    // }

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getTags())
        // dispatch(getProvinsi());
        // dispatch(getKotaKab(""))

    }, [dispatch, image, inputProduct])

    // useEffect(() => {
    //     if (wilayah.provinsi) {
    //         dispatch(getKotaKab(wilayah.provinsi?.id));
    //     }
    // }, [dispatch, wilayah.provinsi?.id])


    return (
        <Modal show={show} onHide={toggleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Produk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Woohoo, you're reading this text in a modal! */}
                <Container>
                    <Row className='justify-content-center'>
                        <Col md >
                            <Col md className='mb-3 d-flex flex-column gap-3'>
                                {/* <FloatingLabel controlId="nama" label="Nama">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel> */}
                                <Input
                                    label={"Nama Produk"}
                                    customType='input'
                                    type="teks"
                                    placeholder="Kentang Goreng"
                                    required
                                    // onChange={(e) => {
                                    //     setName(e.target.value);
                                    // }}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setInputProduct({ ...inputProduct, ...{ name } });
                                    }}
                                />
                                <Input
                                    label={"Harga"}
                                    customType='input'
                                    type="number"
                                    placeholder="Rp. 100.000,00"
                                    required
                                    // onChange={e => setPrice(e.target.value)}
                                    onChange={(e) => {
                                        const price = JSON.parse(e.target.value);
                                        setInputProduct({ ...inputProduct, ...{ price } });
                                    }}
                                />

                                <Input
                                    label={"Kategori"}
                                    customType='optionInput'
                                    options={categories}
                                    placeholder="Makanan"
                                    required
                                    // onChange={e => setCategory(e.target.value)}
                                    onChange={(e) => {
                                        const category = JSON.parse(e.target.value);
                                        setInputProduct({ ...inputProduct, ...{ category } });
                                    }}
                                />
                                <Input
                                    label={"Tags"}
                                    customType='optionInput'
                                    options={tags}
                                    placeholder="Manis Kopi ...."
                                    required
                                    // onChange={e => seTag(e.target.value)}
                                    onChange={(e) => {
                                        const tags = JSON.parse(e.target.value)
                                        setInputProduct({ ...inputProduct, ...{ tags } });
                                    }}

                                />

                                <div>
                                    {imagePreview &&
                                        <Image src={imagePreview} alt="" className='mb-4' style={{ width: '200px' }} roundedCircle />
                                    }
                                    <Input
                                        label={"Pilih Gambar"}
                                        customType='file'
                                        // onChange={e => onImageUpload(e)}
                                        onChange={(e) => {
                                            const image = e.target.files[0];
                                            setImagePreview(URL.createObjectURL(image));
                                            setInputProduct({ ...inputProduct, ...{ image } });
                                        }}
                                    />
                                </div>
                                {/* <Button type="submit" title={'Simpan'} onClick={() => dispatch(createProduct(inputProduct))} /> */}
                                <Button type="submit" title={'Simpan'} onClick={handleSubmit} />
                            </Col>
                        </Col>
                    </Row>
                </Container >
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

export default AddProduct;