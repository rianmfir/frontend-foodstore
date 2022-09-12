import './navigation.scss';

import {
    Container,
    FormControl,
    InputGroup,
    Nav, Navbar,
    Dropdown,
    Form,
    Button,
    NavDropdown,
    Offcanvas,
    Col
} from 'react-bootstrap';
// import { Button } from '../atoms'

import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { BsFilter, BsPersonCircle } from "react-icons/bs";
import { MdClose, MdOutlineDashboard, MdShoppingBasket, MdShoppingCart } from 'react-icons/md'
import { CgNotes, CgShoppingCart } from 'react-icons/cg'
import { IoMdLogOut } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { userLogout } from '../../app/features/Auth/actions';
import { getCategories, getTagsByCategory, setCategory, setKeyword } from '../../app/features/Product/actions';
import Logo from '../atoms/Logo';
import { AiOutlineUser } from 'react-icons/ai';
import { totalItemCart } from '../../utils';
import { MenuBar, ShoppingCart } from '../atoms';
import Footer from '../Footer';
import { clearOrder } from '../../app/features/Order/actions';
import FilterCategories from '../FilterCategories';
import FilterTags from '../FilterTags';

const Navigation = () => {

    const dispatch = useDispatch();

    // let cart = useSelector((state) => state.cart);
    const { keyword } = useSelector(state => state.products)

    const [key, setKey] = useState('');

    const auth = JSON.parse(localStorage.getItem('auth'));

    const windowResolution = window.innerWidth;
    // console.log("Resolution : ", windowResolution)

    const {
        categories,
        tags,
        category,
        tag
    } = useSelector(state => state.products);


    // useEffect(() => {
    //     const navs = [
    //         {
    //             name: "Dashboard",
    //             path: "/user/dashboard",
    //             icon: <MdOutlineDashboard strokeWidth='0.5' size="1em" color='#fbd560' className="me-1 " />

    //         },
    //         {
    //             name: "Account",
    //             path: "/user/account",
    //             icon: <AiOutlineUser strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

    //         },
    //         {
    //             name: "Orders",
    //             path: "/user/order",
    //             icon: <CgNotes strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

    //         }
    //     ];
    //     setNavLinks(navs);
    //     setQty(totalItemCart(cart));
    //     }, [cart, keyword, windowResolution])
    // }, [cart])

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setKeyword(key.keywords));
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
    }

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTagsByCategory(category));
    }, [dispatch, category, tag]);

    return (
        <>
            <Navbar
                collapseOnSelect expand="md"
                sticky="top"
                className="p-3 shadow-sm rounded opacity-100 bg-Navbar" >
                <Container>
                    <Navbar.Brand as={Link} to={"/"} className="d-none d-md-block">
                        <Logo type={windowResolution < 768 ? "md" : ""} />
                    </Navbar.Brand>

                    <>
                        <Navbar key={'md'} bg="light" expand={'md'} className="mb-3">
                            <Container fluid>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-sm`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                                    placement="end"
                                >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                            <span className="d-flex" size="1.5 rem">
                                                <BsFilter />
                                                <h4 >
                                                    FILTER
                                                </h4>
                                            </span>
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">

                                            <Col md={2} >
                                                <div>
                                                    <FilterCategories
                                                        categories={categories}
                                                        category={category}
                                                        onFilterCategory={(category) => { dispatch(setCategory(category)) }}
                                                    />
                                                    <FilterTags
                                                        tags={tags}
                                                    />
                                                </div>
                                            </Col>

                                        </Nav>


                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>

                    </>

                    <Form className="search-bar ms-auto">
                        <InputGroup>
                            <Form.Control
                                className='me-3'
                                type="search"
                                placeholder='ex. pizza, martabak, lemon tea'
                                onChange={(e) => {
                                    const keywords = e.target.value;
                                    setKey({ ...key, keywords });
                                }}
                                onKeyPress={e => {
                                    if (e.key === "Enter") {
                                        handleSearch(e);
                                    }
                                }}
                            />
                            <Button
                                onClick={(e) => handleSearch(e)}
                            >
                                <FaSearch size="24px" color='white' />
                            </Button>
                        </InputGroup>
                    </Form>


                    {/* Basket */}
                    <ShoppingCart />
                    {/* Akhir Basket */}


                    {/* Profile/Account */}
                    {
                        auth && auth.user?.full_name ?
                            <MenuBar />
                            :
                            <Nav className='ms-auto'>

                                <Button as={Link} to="/login" className="px-4 ms-2" style={{ backgroundColor: "white", border: '2px solid #FF7C57' }}>
                                    <span className="fw-bold " style={{ color: "#FF7C57", fontSize: '1.3em' }}>Login</span>
                                </Button>
                                {/* <span style={{ border: '1px #d1caca solid', height: '2rem' }} className="my-auto"></span> */}
                                <Button as={Link} to="/register" className="px-3 ms-2 btn-outline-warning" style={{ backgroundColor: "#FF7C57" }}>
                                    <span className="fw-bold " style={{ color: "white", fontSize: '1.3em' }}>Register</span>
                                </Button>
                            </Nav>
                    }

                    {/* Akhir Profile/Account */}

                </Container>
            </Navbar>
            {/* <div style={{ minHeight: '100vh', height: '100%' }}> */}
            <div>
                <Outlet />
            </div>
            <Footer />

        </>

    )
}
export default Navigation;