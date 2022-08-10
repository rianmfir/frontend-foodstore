import React from 'react'
import { Image, Nav } from 'react-bootstrap';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { IoMdLogOut } from "react-icons/io";

import { dummyImage } from '../../assets/images';
import { Link } from 'react-router-dom';

// import './sideBar.css';

const SideBar = () => {
    return (
        // <Nav id="nav-sidebar" className="sidebar">
        <div>
            <div className="d-flex flex-column align-items-center my-5">
                {/* <BsPersonCircle size="5em" color='#f9a825' className="mx-auto" /> */}
                <Image
                    src={dummyImage}
                    alt="Photo Profile"
                    className='rounded-circle'
                    width="90"
                    height="90"
                />
                <span className="color-primary mt-3 fw-bold">Rian Muhammad</span>
                <span className="color-secondary">User</span>
            </div>
            <div className="menus">
                <Link to="#" className="item-menu active">
                    <div className='icon-menu'>
                        <AiOutlineUser
                            strokeWidth='2px'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            size={24}
                        />
                    </div>
                    <span>Account</span>
                </Link>
                <Link to="#" className="item-menu">
                    <div className='icon-menu'>
                        <AiOutlineDashboard
                            strokeWidth='2px'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            size={24}
                        />
                    </div>
                    <span>Dashboard</span>
                </Link>
                <Link to="#" className="item-menu">
                    <div className='icon-menu'>
                        <AiOutlineUser
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            size={24}
                            color={'currentColor'}
                        />
                    </div>
                    <span>Account</span>
                </Link>
                <Link to="#" className="item-menu">
                    <div className='icon-menu'>
                        <AiOutlineDashboard
                            strokeWidth='2px'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            size={24}
                        />
                    </div>
                    <span>Dashboard</span>
                </Link>
                <Link to="#" className="item-menu">
                    <div className='icon-menu'>
                        <AiOutlineUser
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            size={24}
                            color={'currentColor'}
                        />
                    </div>
                    <span>Account</span>
                </Link>

                <Link to="#" className="item-menu">
                    <div className='icon-menu'>
                        <IoMdLogOut
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            size={24}
                            color={'currentColor'}
                        />
                    </div>
                    <span>Logout</span>
                </Link>

            </div>

        </div>
    )
}

export default SideBar