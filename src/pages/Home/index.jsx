import { Container, Col, Row } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, CardProduct, ListCategories, ListTags, Tag } from "../../components";
import { getCategories, getProducts, getTags, setCategory, setPage } from '../../app/features/Product/actions';
import { getCartItem } from '../../app/api/cart';
import Paginate from '../../components/Paginate';
import { useCallback } from 'react';
import { BsFilter } from 'react-icons/bs';

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
    }, [currentPage, category, tag, keyword]);

    let tanggalWaktu = "2022-03-24T10:01:18.716Z";
    let date = new Date(tanggalWaktu);

    console.log("Tanggal : ", date.getDate());
    console.log("Bulan : ", date.getMonth());
    console.log("Tahun : ", date.getFullYear());

    return (
        <Container fluid style={{ backgroundColor: "#f9f9f9" }}>
            <Row className="justify-content-center pt-5" >
                <Col md={2} >
                    <div>

                        <span className="d-flex" size="1.5 rem">
                            <BsFilter />
                            <h4 >
                                FILTER
                            </h4>
                        </span>
                        <ListCategories
                            categories={categories}
                            category={category}
                            onFilterCategory={(category) => { dispatch(setCategory(category)) }}
                        />
                        <ListTags
                            tags={tags}
                        />
                    </div>
                </Col>

                <Col md={9} >

                    <h4 className="text-center">
                        <strong>Produk</strong>
                    </h4>
                    <Row >
                        <CardProduct products={product} />
                    </Row>

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

                    {/* {
                        totalItems > 0
                            ?
                            <>
                                <Row >
                                    <CardProduct products={product} />
                                </Row>

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
                            </>
                            :
                            <Alert paragraph={"Produk ditemukan"} />
                    } */}

                </Col>
            </Row>
        </Container >
    )
}

export default Home;