import { Container, Col, Row, Alert } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct, Gap, FilterCategories, FilterTags, CardProductPlaceholder, BreadCrumb } from "../../components";
import { getCategories, getProducts, getTags, getTagsByCategory, setPage } from '../../app/features/Product/actions';
import Paginate from '../../components/Paginate';
import { BsFilter } from 'react-icons/bs';
import { clearOrder } from '../../app/features/Order/actions';
import './home.scss';

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

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTags());
        dispatch(clearOrder());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getTagsByCategory(category));
    }, [dispatch, category, tag, keyword, currentPage])

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



                    {
                        product.length !== 0
                            ?
                            <>
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
                            </>
                            :
                            <Alert key={'danger'} variant={'danger'} className="border align-items-center">
                                Data Tidak Ditemukan!
                            </Alert>
                    }
                </Col>
            </Row >
        </Container >
    )
}

export default Home;