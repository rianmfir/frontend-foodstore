import './navigation.scss';

import {
    Container,
    Form,
    FormControl,
    InputGroup,
    Nav, Navbar,
    NavDropdown,
    Button,
    Modal,
    Dropdown
} from 'react-bootstrap';

import { useEffect, useRef, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { MdShoppingCart } from 'react-icons/md'
import { CgNotes } from 'react-icons/cg'
import { IoMdLogOut } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { userLogout } from '../../app/features/Auth/actions';
import axios from 'axios';



const Navigation = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const auth = JSON.parse(localStorage.getItem('token'));

    const [Qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());

    }

    // Tampilan menu account reload dengan data terbaru
    // ?????????

    // console.log("Username : ", auth.user.full_name);
    return (
        <>
            {/* <Navbar style={{ backgroundColor: '#f9a825' }} variant="dark" className="p-3"> */}
            <Navbar sticky="top" className="p-3 shadow-sm mb-5 rounded opacity-100 bg-Navbar " >
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        <strong><span style={{ color: '#f9a825' }}>Food</span> <span style={{ color: '#9eeb47f7' }}>Store</span></strong>
                    </Navbar.Brand>
                    <Nav className="w-50 ms-auto">
                        <InputGroup>
                            <FormControl className="rounded-pill position-relative" type="text" placeholder="Cari Apa..." />
                            <Button variant="none" className="position-absolute top-0 end-0 me-2 rounded-circle"><FaSearch size="1rem" /></Button>
                        </InputGroup>
                    </Nav>

                    {/* Basket */}
                    <>
                        <Nav.Link className='ms-auto' onClick={handleShow}>
                            <MdShoppingCart size="2em" color='black' />
                            {
                                Qty ?
                                    <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                                        {Qty}
                                    </span>
                                    :
                                    ""
                            }
                        </Nav.Link>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>List Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                I will not close if you click outside me. Don't even try to press
                                escape key.
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary">Checkout</Button>
                            </Modal.Footer>
                        </Modal>
                    </>

                    {/* Account */}
                    <>
                        {
                            auth && auth.user.full_name ?
                                <Dropdown className="ms-auto">
                                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#f9a825' }}>
                                        <span style={{ fontSize: '16px' }}> Hi, {auth.user.full_name}  </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align={"end"} className="shadow mt-2 rounded">
                                        <Dropdown.Item href="#">
                                            <BsPersonCircle strokeWidth='0.5' size="1em" color='#f9a825' className="me-1 " />
                                            <span style={{ fontSize: '14px' }}> My Account </span>
                                        </Dropdown.Item>
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

                                    <Link to='/login' style={{ color: 'dark', fontSize: '1.5em' }}>
                                        Login
                                    </Link>
                                    <span style={{ border: '1px #d1caca solid', height: '2rem' }} className="my-auto"></span>
                                    <Button href="/register" className="px-3 ms-2" style={{ backgroundColor: "#9eeb47f7" }}>
                                        <span className="fw-bold " style={{ color: "white", fontSize: '1.3em' }}>Sign Up</span>
                                    </Button>
                                </Nav>
                        }
                    </>

                </Container>
            </Navbar>
        </>

    )
}
export default Navigation;