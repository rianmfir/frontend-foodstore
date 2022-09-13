import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SideBarMenu } from '../../config/navigation';
import { Logo } from '../atoms';

import './sideBar.scss';

const SideBar = () => {

    const { role } = useSelector(state => state.auth.user.user);
    const { user, admin } = SideBarMenu;
    let menu = role === 'admin' ? admin : user;

    return (
        <div className='border' style={{ height: '100vh' }}>
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
                <NavLink to={'/logout'} className="item-menu" style={{ cursor: 'pointer', bottom: 0 }}>
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