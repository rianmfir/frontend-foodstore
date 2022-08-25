import React from 'react'
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'
import { CgNotes } from 'react-icons/cg'
import { RiFileList2Line } from "react-icons/ri";
import { IoMdLogOut } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import './navMenu.scss';

export const SideBarMenu = {
    user: [
        {
            label: "Dashboard",
            icon: <MdOutlineDashboard className='icon' />,
            pages: "/user/dashboard"
        },
        {
            label: "Account",
            icon: <AiOutlineUser className='icon' />,
            pages: "/user/account"
        },
        {
            label: "Orders",
            icon: <CgNotes className='icon' />,
            pages: '/user/order'
        },

    ],

    admin: [
        {
            label: "Dashboard",
            icon: <MdOutlineDashboard className='icon' />,
            pages: "/admin/dashboard"
        },
        {
            label: "Products",
            icon: <AiOutlineUser className='icon' />,
            pages: "/admin/products"
        },
        {
            label: "Users",
            icon: <AiOutlineUser className='icon' />,
            pages: "/admin/users"
        },
        // {
        //     label: "Transactions",
        //     icon: <AiOutlineUser className='icon' />,
        //     pages: "/user/cart"
        // },
    ],

    logout: [
        {
            label: "Logout",
            icon: <IoMdLogOut className='icon' />,
            pages: "/user/cart"
        },
    ]
}

