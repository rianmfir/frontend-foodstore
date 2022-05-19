import './dashboard.css'
import { useEffect, useState } from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { Link, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { Account, Home, Login, Register } from "..";
import { FaFileInvoice } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';

const Dashboard = () => {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const [menu, setMenu] = useState([]);
    const [pages, setPages] = useState("");
    const role = "user";

    const sideBar = () => {
        if (role === "admin") {
            return (
                setMenu(
                    [
                        {
                            label: "Dashboard",
                            icon: <AiOutlineDashboard strokeWidth='3' size="2em" color='#f9a825' className="me-2" />,
                            pages: "/account"
                        },
                        {
                            label: "User",
                            icon: <AiOutlineUser strokeWidth='3' size="2em" color='#f9a825' className="me-2" />,
                            pages: "/register"
                        }
                    ]
                ))
        } else if (role === "user") {
            return (
                setMenu(
                    [
                        {
                            label: "Account",
                            icon: <AiOutlineUser strokeWidth='3' size="2em" color='#f9a825' className="me-2" />,
                            pages: '/account/dashboard'
                        },
                        {
                            label: "Order",
                            icon: <CgNotes strokeWidth='1' size="2em" color='#f9a825' className="me-2" />,
                            pages: '/account/order'
                        },
                        {
                            label: "Invoice",
                            icon: <FaFileInvoice strokeWidth='1' size="2em" color='#f9a825' className="me-2" />,
                            pages: '/account/invoice'
                        }
                    ]

                )
            )
        } else {
            return (
                setMenu(
                    [
                        {
                            label: "Tes Menu",
                            icon: <AiOutlineDashboard strokeWidth='3' size="2em" color='#f9a825' className="me-2" />,
                            pages: ""
                        }
                    ]
                )
            )
        }
    }

    useEffect(() => {
        sideBar();
    }, [])

    console.log(auth)

    return (

        <div className="row">
            {/* Side Bar Menu */}
            <div className="col-3">
                <div div className="d-flex">
                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none  mx-auto">
                            <div className='d-flex flex-column'>
                                <BsPersonCircle size="5em" color='#f9a825' className="mx-auto" />
                                <div className='d-flex flex-column text-center' >
                                    <span className="fw-semibold ">
                                        {auth.user?.full_name}
                                        {/* Rian */}
                                    </span>
                                    <span className="lh-tight " >
                                        {auth.user?.role}
                                        {/* User */}
                                    </span>
                                </div>
                            </div>
                        </a>

                        <hr />

                        <ul className="nav nav-pills flex-column mb-auto" >

                            {
                                menu.map((value, index) => {
                                    return (
                                        <li key={index}>

                                            <NavLink to={value.pages} className="nav-link link-dark">
                                                {value.icon}
                                                {value.label}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <hr />
                        <a href="#" className="nav-link link-dark">
                            <IoMdLogOut strokeWidth='3' size="2em" color='#f9a825' className="me-1 " />
                            Logout
                        </a>

                    </div >
                    <div className="divider"></div>
                </div>
            </div>
            {/* Akhir Side Bar Menu */}

            <div className="col-9 p-3">
                <Outlet />
            </div>
        </div>


    )
}

export default Dashboard;