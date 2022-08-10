import React from 'react'
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'
import { CgNotes } from 'react-icons/cg'
import { FaFileInvoice } from 'react-icons/fa'

export const SideBarMenu = {
    user: [
        {
            label: "Account",
            icon: <AiOutlineUser strokeWidth='3' size="2em" color='#f9a825' className="me-2" />,
            pages: '/user/account'
        },
        {
            label: "Order",
            icon: <CgNotes strokeWidth='1' size="2em" color='#f9a825' className="me-2" />,
            pages: '/user/order'
        },
        {
            label: "Invoice",
            icon: <FaFileInvoice strokeWidth='1' size="2em" color='#f9a825' className="me-2" />,
            pages: '/user/invoice'
        }
    ],

    admin: [
        {
            label: "Dashboard",
            icon: <AiOutlineDashboard
                strokeWidth='3'
                size="2em"
                color='#f9a825'
                className="me-2" />,
            pages: "/user"
        },
        {
            label: "User",
            icon: <AiOutlineUser strokeWidth='3' size="2em" color='#f9a825' className="me-2" />,
            pages: "/register"
        }
    ]
}

