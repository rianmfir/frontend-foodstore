import React, { useEffect, useState } from 'react'
import { Dropdown, Nav } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { IoMdLogOut } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogout } from '../../../app/features/Auth/actions';
import { totalItemCart } from '../../../utils';

const MenuBar = () => {

    const dispatch = useDispatch();

    let cart = useSelector((state) => state.cart);
    let { role } = useSelector(state => state.auth.user?.user)
    const [navLinks, setNavLinks] = useState([]);
    const [Qty, setQty] = useState();
    const [key, setKey] = useState('');

    const auth = JSON.parse(localStorage.getItem('auth'));

    const windowResolution = window.innerWidth;
    console.log("Resolution : ", windowResolution)

    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
    }

    const navs = {
        user:
            [
                {
                    name: "Dashboard",
                    path: "/user/dashboard",
                    icon: <MdOutlineDashboard strokeWidth='0.5' size="1em" color='#fbd560' className="me-1 " />

                },
                {
                    name: "Account",
                    path: "/user/account",
                    icon: <AiOutlineUser strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                },
                {
                    name: "Orders",
                    path: "/user/order",
                    icon: <CgNotes strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                }
            ],
        admin:
            [
                {
                    name: "Dashboard",
                    path: "/admin/dashboard",
                    icon: <MdOutlineDashboard strokeWidth='0.5' size="1em" color='#fbd560' className="me-1 " />

                },
                {
                    name: "Product",
                    path: "/admin/products",
                    icon: <AiOutlineUser strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                },
                {
                    name: "Users",
                    path: "/admin/users",
                    icon: <AiOutlineUser strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                },
                {
                    name: "Transaction",
                    path: "/admin/orders",
                    icon: <CgNotes strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                }
            ],
    }

    useEffect(() => {
        if (role === 'admin') {
            setNavLinks(navs.admin);
        }
        if (role === 'user') {
            setNavLinks(navs.user);
        }
        // setQty(totalItemCart(cart));
    }, [])


    return (
        <Nav>
            <Dropdown
                className="ms-auto"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
            >
                <Dropdown.Toggle id="dropdown-basic" variant="none"
                    style={{
                        boxShadow: 'none',
                        outline: 'none',
                    }}>
                    <span style={{ fontSize: '16px' }} className="mx-auto">
                        <span className='fw-bolder'>Hi, {auth.user?.full_name}</span>
                        <BsPersonCircle size="2.5rem" color='fbd560' className='ms-2' />
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu align={"end"} className="shadow rounded-3">
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

                    < hr />
                    <Dropdown.Item onClick={handleLogout}>
                        <IoMdLogOut strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1" />
                        <span style={{ fontSize: '14px' }}> logout </span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </Nav>


    )
}



export default MenuBar;