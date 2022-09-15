import React, { useState } from 'react'
import { Dropdown, Nav } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { IoMdLogOut } from 'react-icons/io';
import { IoFastFoodOutline } from "react-icons/io5"
import { MdOutlineDashboard } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import './menubar.scss';

const MenuBar = ({ type }) => {

    let { role } = useSelector(state => state.auth.user?.user)
    const navigate = useNavigate();
    const auth = JSON.parse(localStorage.getItem('auth'));
    const [show, setShow] = useState(false);

    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
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
                    icon: <IoFastFoodOutline strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                },
                {
                    name: "Users",
                    path: "/admin/users",
                    icon: <AiOutlineUser strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1 " />

                },
            ],
    }

    let navLinks = role === 'admin' ? navs.admin : navs.user;

    return (
        <Nav>
            {
                type === 'home' ?
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
                                            <span className='icon-menu-bar'>
                                                {nav.icon}
                                            </span>
                                            <span style={{ fontSize: '14px' }}> {nav.name} </span>
                                        </Dropdown.Item>
                                    )
                                })
                            }

                            < hr />
                            <Dropdown.Item onClick={() => navigate('/logout')}>
                                <IoMdLogOut strokeWidth='0.5' size="1.2em" color='#fbd560' className="me-1" />
                                <span style={{ fontSize: '14px' }}> logout </span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <span style={{ fontSize: '16px' }} className="px-2 my-auto mx-3">
                        <span className='fw-bolder '>Hi, {auth.user?.full_name}</span>
                        <BsPersonCircle size="2.5rem" color='fbd560' className='ms-2' />
                    </span>
            }

        </Nav>


    )
}



export default MenuBar;