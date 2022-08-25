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
    Offcanvas
} from 'react-bootstrap';
// import { Button } from '../atoms'

import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { MdClose, MdOutlineDashboard, MdShoppingBasket, MdShoppingCart } from 'react-icons/md'
import { CgNotes, CgShoppingCart } from 'react-icons/cg'
import { IoMdLogOut } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { userLogout } from '../../app/features/Auth/actions';
import { setKeyword } from '../../app/features/Product/actions';
import Logo from '../atoms/Logo';
import { AiOutlineUser } from 'react-icons/ai';
import { totalItemCart } from '../../utils';
import { MenuBar, ShoppingCart } from '../atoms';

const Navigation = () => {

    const dispatch = useDispatch();

    // let cart = useSelector((state) => state.cart);
    const { keyword } = useSelector(state => state.products)

    // const [navLinks, setNavLinks] = useState([]);
    // const [Qty, setQty] = useState();
    const [key, setKey] = useState('');

    const auth = JSON.parse(localStorage.getItem('auth'));

    const windowResolution = window.innerWidth;
    console.log("Resolution : ", windowResolution)


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
        // console.log("Test : ", key.keywords);
        dispatch(setKeyword(key.keywords));
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
    }

    console.log("Keyword : ", key.keywords);

    return (
        <>
            <Navbar
                collapseOnSelect expand="sm"
                sticky="top"
                className="p-3 shadow-sm rounded opacity-100 bg-Navbar" >
                <Container>

                    <Navbar.Brand as={Link} to={"/"} className="d-flex">
                        {/* <MdShoppingBasket size={30} className="me-1 text-success" />
                        <strong><span style={{ color: '#f9a825' }}>Food</span> <span style={{ color: '#9eeb47f7' }}>Store</span></strong> */}
                        <Logo type={windowResolution < 768 ? "md" : ""} />
                    </Navbar.Brand>


                    <Form className="search-bar">
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

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* Basket */}
                        <ShoppingCart />
                        {/* <Nav className='ms-auto '>
                            <NavLink to="/cart" className="">
                                <div className="d-flex justify-content-start align-items-center">

                                    <button className="nav-btn cart">
                                        <CgShoppingCart size="2em" />
                                        {

                                            Qty ?
                                                <span
                                                    className="position-absolute translate-middle badge rounded-pill"
                                                    style={{ backgroundColor: "#fbd560" }}>
                                                    {Qty}
                                                </span>
                                                :
                                                ""
                                        }
                                    </button>
                                </div>
                            </NavLink>

                        </Nav> */}
                        {/* Akhir Basket */}


                        {/* Profile/Account */}


                        {
                            auth && auth.user?.full_name ?
                                <MenuBar />
                                // auth ?
                                // <Dropdown
                                //     className="ms-auto"
                                //     show={show}
                                //     onMouseEnter={showDropdown}
                                //     onMouseLeave={hideDropdown}
                                // >
                                //     <Dropdown.Toggle id="dropdown-basic" variant="none"
                                //         style={{
                                //             boxShadow: 'none',
                                //             outline: 'none',
                                //         }}>
                                //         <span style={{ fontSize: '16px' }} className="mx-auto">
                                //             <span className='fw-bolder'>Hi, {auth.user.full_name}</span>
                                //             <BsPersonCircle size="2rem" color='fbd560' className='ms-2' />
                                //         </span>
                                //     </Dropdown.Toggle>

                                //     <Dropdown.Menu align={"end"} className="shadow rounded-3">
                                //         {
                                //             navLinks.map((nav, i) => {
                                //                 return (
                                //                     <Dropdown.Item as={Link} to={nav.path} key={i}>
                                //                         {nav.icon}
                                //                         <span style={{ fontSize: '14px' }}> {nav.name} </span>
                                //                     </Dropdown.Item>
                                //                 )
                                //             })
                                //         }

                                //         < hr />
                                //         <Dropdown.Item as={Link} to={"/logout"}>
                                //             <IoMdLogOut strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1" />
                                //             <span style={{ fontSize: '14px' }}> logout </span>
                                //         </Dropdown.Item>
                                //     </Dropdown.Menu>
                                // </Dropdown>

                                :
                                <Nav className='ms-auto'>
                                    <Link to='/login' style={{ color: 'dark', fontSize: '1.5em' }} className="link-dark text-decoration-none">
                                        Login
                                    </Link>
                                    <span style={{ border: '1px #d1caca solid', height: '2rem' }} className="my-auto"></span>
                                    <Button as={Link} to="/register" className="px-3 ms-2 btn-outline-success" style={{ backgroundColor: "#9eeb47f7" }}>
                                        <span className="fw-bold " style={{ color: "white", fontSize: '1.3em' }}>Sign Up</span>
                                    </Button>
                                </Nav>
                        }

                        {/* Akhir Profile/Account */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <Outlet />
            </div>
        </>

    )
}
export default Navigation;