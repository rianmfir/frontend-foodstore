import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct, ListCategories, ListTags, Tag } from "../../components";
import { getCategories, getProducts, getTags, setCategory, setPage } from '../../app/features/Product/actions';
import { addToCart } from '../../app/features/Cart/actions';
import { getCartItem } from '../../app/api/cart';
import { getAddresses } from '../../app/features/Address/actions';
import Paginate from '../../components/Paginate';
import { useCallback } from 'react';

const Home = () => {

    const dispatch = useDispatch();
    const {
        product,
        categories,
        tags,
        currentPage,
        totalItems,
        perPage,
        keyword,
        category,
        tag
    } = useSelector(state => state.products);

    const test = useSelector(state => state.products);

    const auth = useSelector(state => state.auth.user);

    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    let userID = auth !== null ? auth.user._id : auth;

    // console.log("Reduce Product : ", test)

    const getProduct = useCallback(() => {
        dispatch(getProducts());
        dispatch(getCategories());
        dispatch(getTags());
        dispatch(getCartItem(token, userID));
    }, [dispatch]);

    useEffect(() => {
        getProduct();
        // dispatch(getProducts());
        // dispatch(getTags());
        // dispatch(getCartItem(token, userID));
        // dispatch(getAddresses(token));
        // }, [dispatch]);
    }, [currentPage, category, tag]);



    // console.log("Category : ", category);
    // console.log('Tags Home: ', tags);


    // console.log("Tag Product : ",)


    // console.log("Tag Product : ", FilterTags)
    // console.log("Total Items : ", totalItems)
    return (
        <div >
            <Container fluid>
                <Row className="justify-content-center">

                    <Col md={2} >

                        <h4 >
                            <span>
                                FILTER
                            </span>
                        </h4>

                        <ListCategories
                            categories={categories}
                            category={category}
                            onFilterCategory={(category) => { dispatch(setCategory(category)) }}

                        />

                        <ListTags
                            tags={tags}
                        />

                    </Col>

                    <Col md={9} className="text-center ">
                        <h4>
                            <strong>Daftar Produk</strong>
                        </h4>
                        <hr />

                        <Row >
                            <CardProduct products={product} />
                        </Row>

                        {/* Pagination */}
                        <Row>
                            <div className='d-flex justify-content-center mt-5'>

                                <Paginate
                                    activePage={currentPage}
                                    total={Math.ceil(totalItems / perPage)}
                                    onPageChange={(page) => dispatch(setPage(page))}
                                    coba={tags}
                                />

                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Home;