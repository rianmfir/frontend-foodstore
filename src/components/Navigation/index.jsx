import './navigation.scss';

import {
    Container,
    FormControl,
    InputGroup,
    Nav, Navbar,
    Button,
    Dropdown,
    Form,
    NavDropdown,
    Offcanvas
} from 'react-bootstrap';

import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { MdShoppingBasket, MdShoppingCart } from 'react-icons/md'
import { CgNotes, CgShoppingCart } from 'react-icons/cg'
import { IoMdLogOut } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { userLogout } from '../../app/features/Auth/actions';
import { setKeyword } from '../../app/features/Product/actions';
import Logo from '../atoms/Logo';

const Navigation = () => {

    const dispatch = useDispatch();

    let cart = useSelector((state) => state.cart);
    const { keyword } = useSelector(state => state.products)

    const [navLinks, setNavLinks] = useState([]);
    const [Qty, setQty] = useState();
    const [key, setKey] = useState('');

    const auth = JSON.parse(localStorage.getItem('auth'));

    const windowResolution = window.innerWidth;
    console.log("Resolution : ", windowResolution)

    const totalItemCart = items => {
        return items.reduce((acc, curr) => acc + curr.qty, 0);
    }

    useEffect(() => {
        const navs = [
            {
                name: "My Account",
                path: "/user/account",
                icon: <BsPersonCircle strokeWidth='0.5' size="1em" color='#f9a825' className="me-1 " />

            }
        ];
        setNavLinks(navs);
        setQty(totalItemCart(cart));
    }, [cart, keyword, windowResolution])

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

                    <Nav className="w-50 ms-auto">
                        <InputGroup className=''>
                            <Form.Control
                                type="search"
                                placeholder='ex. Pizza, Martabak, Lemon Tea, etc...'
                                aria-label="Search"
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
                                className="position-absolute end-0"
                                variant="outline-success"
                                onClick={(e) => handleSearch(e)}
                                style={{ zIndex: 4 }}
                            >
                                <FaSearch size="1rem" />
                            </Button>
                        </InputGroup>
                    </Nav>


                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* Basket */}
                        <Nav className='ms-auto '>
                            <NavLink to="/cart" className="">
                                <div class="d-flex justify-content-start align-items-center">

                                    <button class="nav-btn cart" onclick="toggleRightSidebar()">
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

                                {/* <div className="nav-btn cart">
                                    <CgShoppingCart size="2em" color='black' />
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
                                </div> */}
                            </NavLink>

                        </Nav>
                        {/* Akhir Basket */}


                        {/* Profile/Account */}

                        {
                            auth && auth.user?.full_name ?
                                // auth ?
                                <Dropdown className="ms-auto">
                                    <Dropdown.Toggle id="dropdown-basic"
                                        style={{
                                            backgroundColor: '#f9a825'
                                        }}>
                                        <span style={{ fontSize: '16px' }}> Hi, {auth.user.full_name}  </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align={"end"} className="shadow mt-2 rounded">
                                        {
                                            navLinks.map((nav, i) => {
                                                return (
                                                    <Dropdown.Item as={Link} to={nav.path} key={i}>
                                                        {nav.icon}
                                                        <span style={{ fontSize: '14px' }}> {nav.name} </span>
                                                    </Dropdown.Item>
                                                )
                                            })

                                        }
                                        <Dropdown.Item href="#">
                                            <CgNotes strokeWidth='1' size="1em" color='#f9a825' className="me-1 " />
                                            <span style={{ fontSize: '14px' }}> My Orders </span>
                                        </Dropdown.Item>

                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#" onClick={handleLogout}>
                                            <IoMdLogOut strokeWidth='5' size="1em" color='#f9a825' className="me-1 " />
                                            <span style={{ fontSize: '14px' }}> Logout </span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

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