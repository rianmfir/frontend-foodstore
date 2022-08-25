import React, { useEffect, useState } from 'react'
import { Image, Nav } from 'react-bootstrap';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { IoMdLogOut } from "react-icons/io";

import { dummyImage } from '../../assets/images';
import { Link, NavLink } from 'react-router-dom';


import './sideBar.scss';
import { useSelector } from 'react-redux';
import { SideBarMenu } from '../../config/navigation';


const SideBar = () => {

    const { full_name, role } = useSelector(state => state.auth.user.user);
    const { user, admin } = SideBarMenu;
    const [menu, setMenu] = useState(role === admin ? admin : user);

    useEffect(() => {
        if (role === "admin") {
            setMenu(admin)
        }
        if (role === "user") {
            setMenu(user)
        }
    }, [menu])

    // console.log("Admin : ", menu);
    return (
        // <Nav id="nav-sidebar" className="sidebar">
        <div>
            <div className="d-flex flex-column align-items-center my-5">
                {/* <BsPersonCircle size="5em" color='#f9a825' className="mx-auto" /> */}
                <NavLink to={'/'}>
                    <Image
                        src={dummyImage}
                        alt="Photo Profile"
                        className='rounded-circle'
                        width="90"
                        height="90"
                    />
                </NavLink>
                <span className="color-primary mt-3 fw-bold">{full_name}</span>
                <span className="color-secondary">{role}</span>
            </div>
            <div className="menus">
                {
                    menu.map((state, index) => {
                        return (
                            <NavLink to={state.pages} className="item-menu" key={index}>
                                <div className='icon-menu'>
                                    {state.icon}
                                </div>
                                <span>{state.label}</span>
                            </NavLink>
                        )
                    })
                }

                <NavLink to={`/user/checkout`} className="item-menu">
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
                </NavLink>

            </div>

        </div >
    )
}

export default SideBar;