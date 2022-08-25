import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Image, OverlayTrigger, Row, Tab, Tabs, Tooltip, Button, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, Route, Routes, useMatch, useNavigate, useParams } from 'react-router-dom';
import { getCategories, getProducts, setPage } from '../../app/features/Product/actions';
import { Home } from '../../pages';
import { formatRupiah } from '../../utils';
import { FormCategory, FormProduct } from '../Admin';
import { Button as CustomButton } from '../atoms'
import Dashboards from '../Dashboards';
import Paginate from '../Paginate';

const Products = () => {

    const dispatch = useDispatch();
    // const match = useMatch();
    const baseURL = axios.defaults.baseURL;

    const {
        data,
        product,
        categories,
        tags,
        currentPage,
        totalItems,
        perPage,
        keyword,
        category,
        tag,
        loading
    } = useSelector(state => state.products);

    // const { active_tab } = useParams();
    const navigate = useNavigate();

    const [modal, setModal] = useState("");
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(false);
    }

    const handleSelect = (eventKey) => {
        let route;
        // Switch cases based on eventKeys
        switch (eventKey) {
            case "product":
                route = '/admin/products/product';
                break;
            case "category":
                route = '/admin/products/category';
                break;
            case "tag":
                route = '/admin/products/tag';
                break;
            default:
                route = '/admin/products';
        }
        return navigate(route)
    }

    const handleShow = (event) => {
        setShow(true);
        switch (event) {
            case "product":
                return setModal("product");
                break;
            case "category":
                return setModal("category");
                break;
            case "tag":
                return setModal("tag");
                break;
            default:

        }
    }

    return (
        <>
            <Card>
                <Card.Header>
                    <h1 className="color-primary fw-bold mb-5">Products</h1>
                </Card.Header>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Tabs
                            onSelect={(e) => handleSelect(e)}
                            justify
                            variant="tabs"
                            defaultActiveKey="product"
                            className="mb-1 p-0"
                        >

                            <Tab eventKey="product" title="Product">
                                <Col md={2} className="ms-auto py-3">
                                    <CustomButton title={'Tambah Produk'} width="50" value={"product"} onClick={(e) => handleShow(e.target.value)} />
                                </Col>
                            </Tab>
                            <Tab eventKey="category" title="Category">
                                <Col md={2} className="ms-auto py-3">
                                    <CustomButton title={'Tambah Kategori'} width="50" value={"category"} onClick={(e) => handleShow(e.target.value)} />
                                </Col>
                            </Tab>
                            <Tab eventKey="tag" title="Tag">
                                <Col md={3} className="ms-auto py-3">
                                    <CustomButton title={'Tambah Tag'} width="50" value={"tag"} onClick={(e) => handleShow(e.target.value)} />
                                </Col>
                            </Tab>
                        </Tabs>
                        <Outlet />
                    </Row>
                </Card.Body>
            </Card>

            {modal === "product" && <FormProduct show={show} toggleShow={toggleShow} />}
            {modal === "category" && <FormCategory show={show} toggleShow={toggleShow} />}
            {/* {menu === "tag" && <FormProduct show={show} toggleShow={toggleShow} />} */}

        </>
    )
}

export default Products;