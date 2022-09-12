import { Container, Col, Row, Card, Placeholder, Image } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, CardProduct, Gap, FilterCategories, FilterTags, Tag, Button, CardProductPlaceholder, BreadCrumb } from "../../components";
import { getCategories, getProducts, getTags, getTagsByCategory, setCategory, setPage } from '../../app/features/Product/actions';
import { getCartItem } from '../../app/api/cart';
import Paginate from '../../components/Paginate';
import { BsFilter } from 'react-icons/bs';
import { clearOrder, setOrderId } from '../../app/features/Order/actions';
import './home.scss';
import { getCartItems, saveCarts } from '../../app/features/Cart/actions';

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
        tag,
        loading
    } = useSelector(state => state.products);

    const auth = useSelector(state => state.auth.user);

    const cart = useSelector(state => state.cart);

    // let { token } = localStorage.getItem("auth")
    //     ? JSON.parse(localStorage.getItem("auth"))
    //     : {};

    // let userID = auth !== null ? auth.user._id : auth;



    // console.log("Auth : ", cart);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
        dispatch(getTags());
        // dispatch(getCartItem(token, userID));
        dispatch(clearOrder());
    }, [dispatch, currentPage, keyword]);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getTagsByCategory(category));
    }, [dispatch, category, tag, category])

    useEffect(() => {
        if (auth?.token) {
            dispatch(getCartItems())
        }
    }, [dispatch])

    useEffect(() => {
        if (auth?.token) {
            localStorage.setItem('cart', JSON.stringify(cart));
            saveCarts(cart);
            console.log('CART TERINPUT');
        }
    }, [cart])

    const breadcrumb = [
        { label: 'Home', path: '/' },
    ];

    return (
        <Container fluid style={{ backgroundColor: "#f9f9f9" }} >
            <Gap height={30} />
            <Container>
                <Col md={9} className="me-auto">
                    <BreadCrumb items={breadcrumb} />
                </Col>
            </Container>
            <Gap height={30} />
            <Row className="justify-content-center">
                <Col md={2} className='filter'>
                    <div >
                        <span className="d-flex" size="1.5 rem">
                            <BsFilter />
                            <h4 >
                                FILTER
                            </h4>
                        </span>
                        <FilterCategories
                            categories={categories}
                            category={category}
                        />
                        <FilterTags
                            tags={tags}
                            tag={tag}
                            category={category}
                        />
                    </div>
                </Col>

                <Col md={9} >

                    <h4 className="text-center">
                        PRODUCT
                    </h4>

                    <Row className='ms-5 mx-auto'>
                        {
                            loading
                                ?
                                <CardProductPlaceholder perPage={perPage} />
                                :
                                <CardProduct products={product} />

                        }
                    </Row>
                    <Row>
                        <div className='d-flex justify-content-center my-5'>
                            <Paginate
                                activePage={currentPage}
                                total={Math.ceil(totalItems / perPage)}
                                onPageChange={(page) => dispatch(setPage(page))}
                                coba={tags}
                            />
                        </div>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default Home;