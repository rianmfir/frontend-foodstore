import React from 'react'
import { useEffect } from 'react';
import { Card, Row, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setTitleDashboard } from '../../app/features/Auth/actions';

const Products = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelect = (eventKey) => {
        let route;
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

    useEffect(() => {
        dispatch(setTitleDashboard('Products'));
    }, [dispatch])

    return (
        <>
            <Card>
                <Card.Body>
                    <Row className="justify-content-center" >
                        <Tabs
                            onSelect={(e) => handleSelect(e)}
                            justify
                            variant="tabs"
                            defaultActiveKey="product"
                            className="mb-3 p-0"
                        >
                            <Tab eventKey="product" title="Product">
                            </Tab>
                            <Tab eventKey="category" title="Category">

                            </Tab>
                            <Tab eventKey="tag" title="Tag">

                            </Tab>
                        </Tabs>
                        <Outlet />
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default Products;