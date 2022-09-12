import React, { useEffect, useState } from 'react'
import { Button, Image, Nav } from 'react-bootstrap';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { IoMdLogOut } from "react-icons/io";

import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SideBarMenu } from '../../config/navigation';
import { Logo } from '../atoms';
import './sideBar.scss';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../app/features/Auth/actions';


const SideBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { role } = useSelector(state => state.auth.user.user);
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

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
        try {
            navigate('/');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <div className="pt-2 my-5 ">
                <Logo type="md" />
            </div>
            <div className="menus">
                {
                    menu.map((state, index) => {
                        return (
                            <NavLink to={state.pages} className="item-menu" key={index} >
                                <div className='icon-menu'>
                                    {state.icon}
                                </div>
                                <span>{state.label}</span>
                            </NavLink>
                        )
                    })
                }
                <Nav className="item-menu" onClick={handleLogout}>
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
                </Nav>

            </div>

        </div >
    )
}

export default SideBar;